import {parsePdfPlan} from './planPdf'
import type {CadLayer,CadLayerRole,CadSegment,RJPStudioStructurePackage,SourceDrawing,StudioElement,StudioProject} from './types'
import {materials} from './library'
import {parseDwgBrowser} from './dwg'
const num=(v:unknown,d=0)=>Number.isFinite(Number(v))?Number(v):d
const node=(p:RJPStudioStructurePackage,id?:number)=>p.nodes.find(n=>n.id===id)
export function projectFromStrut(p:RJPStudioStructurePackage):StudioProject{
 const els:StudioElement[]=[]
 for(const e of p.members){const a=node(p,e.a),b=node(p,e.b);const vertical=e.kind==='column'||(a&&b&&Math.abs(a.x-b.x)<1e-7);const x1=a?.x??0,z1=a?.y??0,x2=b?.x??x1+num(e.geometry.length,1),z2=b?.y??z1;const L=Math.hypot(x2-x1,z2-z1)||num(e.geometry.length,1);els.push({id:e.id,name:e.kind==='column'?`Pilar ${e.id}`:`Viga ${e.id}`,type:e.kind,category:'Estrutura',position:{x:(x1+x2)/2,y:0,z:(z1+z2)/2},rotation:{x:0,y:vertical?0:0,z:vertical?0:Math.atan2(z2-z1,x2-x1)},size:vertical?{x:.35,y:.45,z:L}:{x:L,y:.25,z:.5},material:e.material||materials[0],source:'SmartStruct RJP',properties:{nodeA:e.a??null,nodeB:e.b??null,reinforcement:e.reinforcement??null},results:e.results})}
 for(const f of p.foundations){const n=node(p,f.node),B=num(f.geometry.B_m,1.8),L=num(f.geometry.L_m,B),h=num(f.geometry.h_m,.5);els.push({id:f.id,name:`Fundação ${f.id}`,type:'footing',category:'Estrutura',position:{x:n?.x??0,y:0,z:-h/2},rotation:{x:0,y:0,z:0},size:{x:B,y:L,z:h},material:materials[0],source:'SmartStruct RJP',properties:{node:f.node,reinforcement:f.reinforcement??null,...f.actions},results:f.results})}
 const now=new Date().toISOString();return{id:`RJP-${Date.now()}`,name:String(p.project.name||'Projeto importado'),location:String(p.project.location||''),solution:'traditional',elements:els,createdAt:now,updatedAt:now}
}
function pairs(text:string){const ls=text.replace(/\r/g,'').split('\n'),out:Array<[string,string]>=[];for(let i=0;i+1<ls.length;i+=2)out.push([ls[i].trim(),ls[i+1].trim()]);return out}
export function parseDxf(text:string){const p=pairs(text),segments:CadSegment[]=[];let i=0;while(i<p.length){if(p[i][0]==='0'&&p[i][1]==='LINE'){i++;let layer='0',x1=0,y1=0,x2=0,y2=0;while(i<p.length&&p[i][0]!=='0'){const[c,v]=p[i++];if(c==='8')layer=v;if(c==='10')x1=num(v);if(c==='20')y1=num(v);if(c==='11')x2=num(v);if(c==='21')y2=num(v)};if(Math.hypot(x2-x1,y2-y1)>1e-9)segments.push({x1,y1,x2,y2,layer,entity:'LINE'});continue}
 if(p[i][0]==='0'&&p[i][1]==='LWPOLYLINE'){i++;let layer='0',closed=false;const pts:Array<{x:number;y:number}>=[];let cur:{x:number;y:number}|null=null;while(i<p.length&&p[i][0]!=='0'){const[c,v]=p[i++];if(c==='8')layer=v;if(c==='70')closed=(Number(v)&1)===1;if(c==='10'){cur={x:num(v),y:0};pts.push(cur)}if(c==='20'&&cur)cur.y=num(v)}for(let k=1;k<pts.length;k++)segments.push({x1:pts[k-1].x,y1:pts[k-1].y,x2:pts[k].x,y2:pts[k].y,layer,entity:'LWPOLYLINE'});if(closed&&pts.length>2)segments.push({x1:pts[pts.length-1].x,y1:pts[pts.length-1].y,x2:pts[0].x,y2:pts[0].y,layer,entity:'LWPOLYLINE'});continue}i++}
 return finishSegments(segments)}
function roleFor(name:string):CadLayerRole{const s=name.toLowerCase();if(/door|porta|window|janela|vao|vão/.test(s))return'Vão';if(/column|pilar|pilare/.test(s))return'Pilar';if(/axis|eixo|grid/.test(s))return'Eixo';if(/wall|parede|alven|muro/.test(s))return'Parede';if(/cota|dim|text|hatch|mob|furn|sanit|equip/.test(s))return'Ignorar';return'Referência'}
function finishSegments(segments:CadSegment[]){const xs=segments.flatMap(s=>[s.x1,s.x2]),ys=segments.flatMap(s=>[s.y1,s.y2]);const names=Array.from(new Set(segments.map(s=>s.layer))).sort((a,b)=>a.localeCompare(b));const layers:CadLayer[]=names.map(name=>({name,count:segments.filter(s=>s.layer===name).length,visible:true,role:roleFor(name)}));return{segments,bounds:segments.length?{minX:Math.min(...xs),minY:Math.min(...ys),maxX:Math.max(...xs),maxY:Math.max(...ys)}:undefined,layers}}
export async function inspectDrawing(file:File):Promise<SourceDrawing>{const b=new Uint8Array(await file.slice(0,64).arrayBuffer());const text=new TextDecoder('latin1').decode(b);const ext=file.name.split('.').pop()?.toLowerCase()||'';let kind:SourceDrawing['kind']='other',info='Ficheiro de referência',cadSegments:CadSegment[]|undefined,cadBounds:SourceDrawing['cadBounds'],layers:CadLayer[]|undefined,dwgVersion:string|undefined,parseStatus:SourceDrawing['parseStatus']='reference',parseError:string|undefined
 if(ext==='pdf'||text.startsWith('%PDF')){kind='pdf';parseStatus='parsing';try{const parsed=await parsePdfPlan(file,1);cadSegments=parsed.segments;cadBounds=parsed.bounds;layers=parsed.layers;parseStatus='ready';info=`PDF interpretado pelo RJP Plan Engine: ${cadSegments.length} segmentos · confiança ${Math.round(parsed.analysis.confidence*100)}% · ${parsed.analysis.engine==='pdf-vector'?'vetorial':'imagem/scan'}.`;return{id:`DRAW-${Date.now()}`,name:file.name,kind,size:file.size,info,url:URL.createObjectURL(file),cadSegments,cadBounds,layers,parseStatus,planAnalysis:parsed.analysis}}catch(e){parseStatus='error';parseError=e instanceof Error?e.message:String(e);info=`PDF reconhecido, mas a interpretação automática falhou. Pode continuar a usá-lo como base gráfica. Erro: ${parseError}`}}
 else if(ext==='dxf'){kind='dxf';const parsed=parseDxf(await file.text());cadSegments=parsed.segments;cadBounds=parsed.bounds;layers=parsed.layers;parseStatus='ready';info=`DXF ASCII: ${cadSegments.length} segmentos reconhecidos em ${layers.length} layers.`}
 else if(ext==='dwg'||text.startsWith('AC10')){kind='dwg';parseStatus='parsing';try{const parsed=await parseDwgBrowser(file);const f=finishSegments(parsed.segments);cadSegments=f.segments;cadBounds=f.bounds;layers=f.layers;dwgVersion=parsed.version;parseStatus='ready';info=`DWG ${dwgVersion||text.slice(0,6)} aberto localmente no browser: ${cadSegments.length} segmentos em ${layers.length} layers. ${parsed.warning||''}`.trim()}catch(e){parseStatus='error';parseError=e instanceof Error?e.message:String(e);info=`DWG reconhecido, mas o motor WebAssembly não conseguiu interpretar este ficheiro. Pode usar DXF/IFC como fallback. Erro: ${parseError}`}}
 else if(ext==='dwf'){kind='dwf';info='DWF reconhecido: referência anexada; geometria nativa fica reservada para o motor DWF.'}
 else if(ext==='dwfx'){kind='dwfx';info='DWFx reconhecido: pacote anexado; geometria nativa fica reservada para o motor DWFx.'}
 else if(['png','jpg','jpeg','webp'].includes(ext)){kind='image';info='Imagem: pré-visualização direta suportada; pode servir como base gráfica.'}
 return{id:`DRAW-${Date.now()}`,name:file.name,kind,size:file.size,info,url:URL.createObjectURL(file),cadSegments,cadBounds,layers,dwgVersion,parseStatus,parseError}}
export function updateLayer(d:SourceDrawing,name:string,patch:Partial<CadLayer>):SourceDrawing{return{...d,layers:(d.layers||[]).map(l=>l.name===name?{...l,...patch}:l)}}
export function modelFromCad(d:SourceDrawing,scale=1,height=2.8,thickness=.2,level='Piso 0'):StudioElement[]{
 const roles=new Map((d.layers||[]).map(l=>[l.name,l])),ss=(d.cadSegments||[]).filter(s=>{const l=roles.get(s.layer);return !l||(l.visible&&l.role!=='Ignorar'&&l.role!=='Referência'&&l.role!=='Eixo')}),b=d.cadBounds
 if(!ss.length||!b)return[]
 const brick=materials.find(m=>m.id==='brick')||materials[0],concrete=materials.find(m=>m.id==='concrete')||materials[0],aluminium=materials.find(m=>m.id==='aluminium')||materials[0],stamp=Date.now()
 const out:StudioElement[]=[]
 ss.filter(s=>Math.hypot(s.x2-s.x1,s.y2-s.y1)>1e-6).forEach((seg,i)=>{
  const role=roles.get(seg.layer)?.role||'Parede',x1=(seg.x1-b.minX)*scale,y1=(seg.y1-b.minY)*scale,x2=(seg.x2-b.minX)*scale,y2=(seg.y2-b.minY)*scale,L=Math.hypot(x2-x1,y2-y1),a=Math.atan2(y2-y1,x2-x1)
  let el:StudioElement
  if(role==='Pilar')el={id:`CAD-COLUMN-${stamp}-${i}`,name:`Pilar CAD · ${seg.layer}`,type:'column',category:'Estrutura',level,position:{x:(x1+x2)/2,y:(y1+y2)/2,z:height/2},rotation:{x:0,y:0,z:a},size:{x:Math.max(thickness,L),y:thickness,z:height},material:concrete,source:`CAD/${d.kind.toUpperCase()} · ${d.name}`,properties:{cadLayer:seg.layer,cadSource:d.name,cadRole:'Pilar'}}
  else if(role==='Vão')el={id:`CAD-OPENING-${stamp}-${i}`,name:`Vão CAD · ${seg.layer}`,type:/porta|door/i.test(seg.layer)?'door':'window',category:'Vãos',level,position:{x:(x1+x2)/2,y:(y1+y2)/2,z:/porta|door/i.test(seg.layer)?1.05:1.5},rotation:{x:0,y:0,z:a},size:{x:Math.max(.4,L),y:Math.max(.05,thickness*.5),z:/porta|door/i.test(seg.layer)?2.10:1.20},material:aluminium,source:`CAD/${d.kind.toUpperCase()} · ${d.name}`,properties:{cadLayer:seg.layer,cadSource:d.name,cadRole:'Vão',hostPending:true}}
  else el={id:`CAD-WALL-${stamp}-${i}`,name:`Parede CAD · ${seg.layer}`,type:'wall',category:'Arquitetura',level,position:{x:(x1+x2)/2,y:(y1+y2)/2,z:height/2},rotation:{x:0,y:0,z:a},size:{x:L,y:thickness,z:height},material:brick,source:`CAD/${d.kind.toUpperCase()} · ${d.name}`,properties:{cadLayer:seg.layer,cadSource:d.name,cadRole:'Parede'}}
  out.push(el)
 })
 return out
}
export const wallsFromCad=modelFromCad

function anglePi(s:CadSegment){let a=Math.atan2(s.y2-s.y1,s.x2-s.x1);while(a<0)a+=Math.PI;while(a>=Math.PI)a-=Math.PI;return a}
function aDiff(a:number,b:number){const d=Math.abs(a-b);return Math.min(d,Math.PI-d)}
function segLen(s:CadSegment){return Math.hypot(s.x2-s.x1,s.y2-s.y1)}
function mid(s:CadSegment){return{x:(s.x1+s.x2)/2,y:(s.y1+s.y2)/2}}
function wallFromLine(s:CadSegment,b:NonNullable<SourceDrawing['cadBounds']>,scale:number,height:number,thickness:number,level:string,d:SourceDrawing,id:string,props:Record<string,any>={}):StudioElement{
 const brick=materials.find(m=>m.id==='brick')||materials[0],x1=(s.x1-b.minX)*scale,y1=(s.y1-b.minY)*scale,x2=(s.x2-b.minX)*scale,y2=(s.y2-b.minY)*scale,L=Math.hypot(x2-x1,y2-y1),a=Math.atan2(y2-y1,x2-x1)
 return{id,name:`Parede BIM · ${s.layer}`,type:'wall',category:'Arquitetura',level,position:{x:(x1+x2)/2,y:(y1+y2)/2,z:height/2},rotation:{x:0,y:0,z:a},size:{x:L,y:thickness,z:height},material:brick,source:`CAD/${d.kind.toUpperCase()} · ${d.name}`,properties:{cadLayer:s.layer,cadSource:d.name,cadRole:'Parede',...props}}
}
/** V1.8: tenta fundir pares de linhas paralelas do mesmo layer numa parede BIM única. */
export function smartModelFromCad(d:SourceDrawing,scale=1,height=2.8,defaultThickness=.2,level='Piso 0',detectDoubleLines=true):StudioElement[]{
 const roles=new Map((d.layers||[]).map(l=>[l.name,l])),b=d.cadBounds;if(!b)return[]
 const wallSegs=(d.cadSegments||[]).filter(s=>{const l=roles.get(s.layer);return l?.visible&&l.role==='Parede'&&segLen(s)>1e-6})
 const other={...d,cadSegments:(d.cadSegments||[]).filter(s=>{const l=roles.get(s.layer);return l?.visible&&['Vão','Pilar'].includes(l.role)})}
 const out:StudioElement[]=[];const used=new Set<number>();const stamp=Date.now()
 if(detectDoubleLines){
  for(let i=0;i<wallSegs.length;i++){if(used.has(i))continue;const a=wallSegs[i],la=segLen(a),aa=anglePi(a),ma=mid(a);let best=-1,bestScore=Infinity,bestSep=0
   for(let j=i+1;j<wallSegs.length;j++){if(used.has(j))continue;const c=wallSegs[j];if(c.layer!==a.layer)continue;const lc=segLen(c);if(Math.min(la,lc)/Math.max(la,lc)<.72||aDiff(aa,anglePi(c))>Math.PI/36)continue;const mc=mid(c),sep=Math.abs((mc.x-ma.x)*Math.sin(aa)-(mc.y-ma.y)*Math.cos(aa))*scale;if(sep<.06||sep>.65)continue;const along=Math.abs((mc.x-ma.x)*Math.cos(aa)+(mc.y-ma.y)*Math.sin(aa))*scale;if(along>Math.max(1,la*scale*.35))continue;const score=sep+along*.2;if(score<bestScore){best=j;bestScore=score;bestSep=sep}}
   if(best>=0){const c=wallSegs[best];used.add(i);used.add(best);const A=[{x:a.x1,y:a.y1},{x:a.x2,y:a.y2}],C=[{x:c.x1,y:c.y1},{x:c.x2,y:c.y2}];const direct=Math.hypot(A[0].x-C[0].x,A[0].y-C[0].y)+Math.hypot(A[1].x-C[1].x,A[1].y-C[1].y),cross=Math.hypot(A[0].x-C[1].x,A[0].y-C[1].y)+Math.hypot(A[1].x-C[0].x,A[1].y-C[0].y);const c0=cross<direct?C[1]:C[0],c1=cross<direct?C[0]:C[1];const center:CadSegment={x1:(A[0].x+c0.x)/2,y1:(A[0].y+c0.y)/2,x2:(A[1].x+c1.x)/2,y2:(A[1].y+c1.y)/2,layer:a.layer,entity:'DOUBLELINE'};out.push(wallFromLine(center,b,scale,height,bestSep,level,d,`CAD-SMART-WALL-${stamp}-${i}`,{cadRecognition:'double-line',detectedThickness:+bestSep.toFixed(3)}));continue}
  }
 }
 for(let i=0;i<wallSegs.length;i++)if(!used.has(i))out.push(wallFromLine(wallSegs[i],b,scale,height,defaultThickness,level,d,`CAD-WALL-${stamp}-${i}`,{cadRecognition:'centerline'}))
 const extras=modelFromCad(other,scale,height,defaultThickness,level)
 // Associa vãos à parede BIM mais próxima para manter relação de hospedagem.
 for(const e of extras){if(e.type==='window'){let host:StudioElement|undefined,dist=Infinity;for(const w of out){const dx=e.position.x-w.position.x,dy=e.position.y-w.position.y,dd=Math.hypot(dx,dy);if(dd<dist){dist=dd;host=w}}if(host&&dist<Math.max(1.5,host.size.x*.55))e.properties={...e.properties,hostWallId:host.id,hostDistance:+dist.toFixed(3)}}out.push(e)}
 return out
}

export function inferLayerRole(name:string):CadLayerRole{const n=name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');if(/porta|door|janela|window|vao|opening|caixilho/.test(n))return 'Vão';if(/pilar|column|coluna/.test(n))return 'Pilar';if(/parede|wall|alven|muro|partition|fachada/.test(n))return 'Parede';if(/eixo|axis|grid/.test(n))return 'Eixo';if(/cota|dim|texto|text|hatch|trama|mobil|furniture|sanit|equip/.test(n))return 'Ignorar';return 'Referência'}
export function autoClassifyCadLayers(d:SourceDrawing):SourceDrawing{return{...d,layers:(d.layers||[]).map(l=>{const role=inferLayerRole(l.name);return{...l,role,visible:role!=='Ignorar'}})}}
