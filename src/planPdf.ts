import * as pdfjs from 'pdfjs-dist'
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url'
import type {CadLayer,CadSegment,PlanAnalysis,SourceDrawing} from './types'

pdfjs.GlobalWorkerOptions.workerSrc=workerUrl

type P={x:number;y:number}
const len=(s:CadSegment)=>Math.hypot(s.x2-s.x1,s.y2-s.y1)
const near=(a:number,b:number,t=.35)=>Math.abs(a-b)<=t

function boundsOf(segs:CadSegment[]):SourceDrawing['cadBounds']{
 if(!segs.length)return undefined
 const xs=segs.flatMap(s=>[s.x1,s.x2]),ys=segs.flatMap(s=>[s.y1,s.y2])
 return{minX:Math.min(...xs),minY:Math.min(...ys),maxX:Math.max(...xs),maxY:Math.max(...ys)}
}
function dedupe(segs:CadSegment[]){
 const seen=new Set<string>(),out:CadSegment[]=[]
 for(const s of segs){
  if(len(s)<.5)continue
  const a=[s.x1,s.y1,s.x2,s.y2],b=[s.x2,s.y2,s.x1,s.y1]
  const key=(v:number[])=>v.map(x=>Math.round(x*10)/10).join(':')
  const k1=key(a),k2=key(b),k=k1<k2?k1:k2
  if(!seen.has(k)){seen.add(k);out.push(s)}
 }
 return out
}
function classifyPdfSegments(segs:CadSegment[]):CadSegment[]{
 // PDF has no CAD layers. We infer pseudo-layers from geometry.
 return segs.map(s=>{
  const L=len(s),dx=Math.abs(s.x2-s.x1),dy=Math.abs(s.y2-s.y1)
  const orth=dx<.7||dy<.7
  const layer=L>12&&orth?'PDF_WALL_CANDIDATE':L>4&&orth?'PDF_ARCH':'PDF_REFERENCE'
  return{...s,layer}
 })
}
function makeLayers(segs:CadSegment[]):CadLayer[]{
 const m=new Map<string,number>()
 segs.forEach(s=>m.set(s.layer,(m.get(s.layer)||0)+1))
 return [...m].map(([name,count])=>({name,count,visible:true,role:name==='PDF_WALL_CANDIDATE'?'Parede':name==='PDF_ARCH'?'Referência':'Ignorar'}))
}

function transformPoint(m:number[],x:number,y:number):P{
 return{x:m[0]*x+m[2]*y+m[4],y:m[1]*x+m[3]*y+m[5]}
}
function mul(a:number[],b:number[]){return[
 a[0]*b[0]+a[2]*b[1],a[1]*b[0]+a[3]*b[1],
 a[0]*b[2]+a[2]*b[3],a[1]*b[2]+a[3]*b[3],
 a[0]*b[4]+a[2]*b[5]+a[4],a[1]*b[4]+a[3]*b[5]+a[5]
]}

async function vectorSegments(page:any):Promise<CadSegment[]>{
 const ops=await page.getOperatorList(),OPS=(pdfjs as any).OPS
 let ctm=[1,0,0,1,0,0],stack:number[][]=[],path:P[]=[]
 const segs:CadSegment[]=[]
 const flush=(close=false)=>{
  if(close&&path.length>2)path.push(path[0])
  for(let i=1;i<path.length;i++)segs.push({x1:path[i-1].x,y1:path[i-1].y,x2:path[i].x,y2:path[i].y,layer:'PDF_VECTOR',entity:'PDF_PATH'})
  path=[]
 }
 for(let i=0;i<ops.fnArray.length;i++){
  const fn=ops.fnArray[i],args=ops.argsArray[i]||[]
  if(fn===OPS.save)stack.push([...ctm])
  else if(fn===OPS.restore){ctm=stack.pop()||[1,0,0,1,0,0]}
  else if(fn===OPS.transform)ctm=mul(ctm,args as number[])
  else if(fn===OPS.constructPath){
   const [fnArray,fnArgs]=args as [number[],number[]];let k=0
   for(const pf of fnArray){
    if(pf===OPS.moveTo){flush();path=[transformPoint(ctm,fnArgs[k++],fnArgs[k++])]}
    else if(pf===OPS.lineTo){path.push(transformPoint(ctm,fnArgs[k++],fnArgs[k++]))}
    else if(pf===OPS.rectangle){const x=fnArgs[k++],y=fnArgs[k++],w=fnArgs[k++],h=fnArgs[k++],a=transformPoint(ctm,x,y),b=transformPoint(ctm,x+w,y),c=transformPoint(ctm,x+w,y+h),d=transformPoint(ctm,x,y+h);flush();path=[a,b,c,d,a]}
    else if(pf===OPS.curveTo){k+=6} else if(pf===OPS.curveTo2){k+=4} else if(pf===OPS.curveTo3){k+=4} else if(pf===OPS.closePath)flush(true)
   }
  } else if(fn===OPS.stroke||fn===OPS.closeStroke||fn===OPS.fillStroke||fn===OPS.eoFillStroke)flush(fn===OPS.closeStroke)
 }
 flush()
 return dedupe(segs)
}

async function rasterSegments(page:any):Promise<CadSegment[]>{
 // Lightweight image fallback for scanned PDFs: long horizontal/vertical dark runs.
 const viewport=page.getViewport({scale:1.5}),max=1800,ratio=Math.min(1,max/Math.max(viewport.width,viewport.height))
 const vp=page.getViewport({scale:1.5*ratio}),canvas=document.createElement('canvas')
 canvas.width=Math.ceil(vp.width);canvas.height=Math.ceil(vp.height)
 const ctx=canvas.getContext('2d',{willReadFrequently:true})!
 await page.render({canvasContext:ctx,viewport:vp}).promise
 const img=ctx.getImageData(0,0,canvas.width,canvas.height),w=canvas.width,h=canvas.height
 const dark=(x:number,y:number)=>{const i=(y*w+x)*4;return (img.data[i]+img.data[i+1]+img.data[i+2])/3<105}
 const out:CadSegment[]=[]
 const minRun=Math.max(25,Math.floor(Math.min(w,h)*.035)),step=2
 for(let y=0;y<h;y+=step){let st=-1;for(let x=0;x<=w;x++){const on=x<w&&dark(x,y);if(on&&st<0)st=x;if((!on||x===w)&&st>=0){if(x-st>=minRun)out.push({x1:st,y1:h-y,x2:x-1,y2:h-y,layer:'PDF_RASTER',entity:'RASTER_LINE'});st=-1}}}
 for(let x=0;x<w;x+=step){let st=-1;for(let y=0;y<=h;y++){const on=y<h&&dark(x,y);if(on&&st<0)st=y;if((!on||y===h)&&st>=0){if(y-st>=minRun)out.push({x1:x,y1:h-st,x2:x,y2:h-(y-1),layer:'PDF_RASTER',entity:'RASTER_LINE'});st=-1}}}
 return dedupe(out)
}

export async function parsePdfPlan(file:File,pageNo=1):Promise<{segments:CadSegment[];bounds:SourceDrawing['cadBounds'];layers:CadLayer[];analysis:PlanAnalysis}>{
 const bytes=new Uint8Array(await file.arrayBuffer()),doc=await pdfjs.getDocument({data:bytes}).promise,page=await doc.getPage(Math.min(Math.max(1,pageNo),doc.numPages))
 let vector=await vectorSegments(page),raster:CadSegment[]=[]
 let engine:PlanAnalysis['engine']='pdf-vector'
 if(vector.length<12){raster=await rasterSegments(page);engine='pdf-raster'}
 const raw=vector.length>=12?vector:raster,segments=classifyPdfSegments(raw),confidence=vector.length>=12?Math.min(.95,.48+Math.log10(vector.length+1)*.16):Math.min(.72,.28+Math.log10(raster.length+1)*.14)
 const analysis:PlanAnalysis={engine,page:pageNo,confidence:+confidence.toFixed(2),vectorSegments:vector.length,rasterSegments:raster.length,warnings:[]}
 if(engine==='pdf-raster')analysis.warnings.push('PDF tratado como imagem: calibre uma distância conhecida antes de gerar BIM.')
 if(segments.length<20)analysis.warnings.push('Pouca geometria reconhecida; use a planta como referência e confirme manualmente.')
 return{segments,bounds:boundsOf(segments),layers:makeLayers(segments),analysis}
}

export function calibratePdfDrawing(d:SourceDrawing,knownDistance:number,measuredDrawingDistance:number):SourceDrawing{
 if(!d.cadSegments?.length||knownDistance<=0||measuredDrawingDistance<=0)return d
 const k=knownDistance/measuredDrawingDistance
 const segs=d.cadSegments.map(s=>({...s,x1:s.x1*k,y1:s.y1*k,x2:s.x2*k,y2:s.y2*k}))
 return{...d,cadSegments:segs,cadBounds:boundsOf(segs),planAnalysis:d.planAnalysis?{...d.planAnalysis,scaleCalibrated:true,knownDistance}:d.planAnalysis,info:`${d.info} Escala PDF calibrada por distância conhecida: ${knownDistance} m.`}
}
