import type {CadSegment} from './types'

const p2=(v:any)=>({x:Number(v?.x??v?.[0]??0)||0,y:Number(v?.y??v?.[1]??0)||0})
const layerOf=(o:any)=>String(o?.layer??o?.layerName??o?.properties?.layer??o?.entity?.layer??'0')
const typeOf=(o:any)=>String(o?.type??o?.className??o?.dxfName??o?.entityType??o?.name??'').toUpperCase()
function addSeg(out:CadSegment[],a:any,b:any,layer:string,entity='LINE'){
 const A=p2(a),B=p2(b);if(Math.hypot(B.x-A.x,B.y-A.y)>1e-9)out.push({x1:A.x,y1:A.y,x2:B.x,y2:B.y,layer,entity})
}
function entitySegments(o:any,out:CadSegment[]){
 if(!o||typeof o!=='object')return false
 const t=typeOf(o),layer=layerOf(o)
 if(t.includes('LINE')&&!t.includes('POLY')){const a=o.startPoint??o.start??o.p1??o.from,b=o.endPoint??o.end??o.p2??o.to;if(a&&b){addSeg(out,a,b,layer,'LINE');return true}}
 if(t.includes('POLYLINE')||t.includes('LWPOLYLINE')){const pts=o.vertices??o.points??o.vertexes??o.controlPoints;if(Array.isArray(pts)&&pts.length>1){for(let i=1;i<pts.length;i++)addSeg(out,pts[i-1],pts[i],layer,'POLYLINE');if(o.closed||o.isClosed)addSeg(out,pts[pts.length-1],pts[0],layer,'POLYLINE');return true}}
 return false
}
function walk(o:any,out:CadSegment[],seen:Set<any>,depth=0){if(!o||typeof o!=='object'||seen.has(o)||depth>12)return;seen.add(o);if(entitySegments(o,out))return;if(Array.isArray(o)){for(const x of o)walk(x,out,seen,depth+1);return}for(const [k,v] of Object.entries(o)){if(['parent','owner','database'].includes(k))continue;walk(v,out,seen,depth+1)}}
export async function parseDwgBrowser(file:File):Promise<{segments:CadSegment[];version?:string;warning?:string}>{
 const {LibreDwg,Dwg_File_Type}=await import('@mlightcad/libredwg-web') as any
 const wasmPath=new URL('cad-wasm/',document.baseURI).href
 const wasmUrl=new URL('libredwg-web.wasm',wasmPath).href
 const wasmCheck=await fetch(wasmUrl,{method:'HEAD'}).catch(()=>null)
 if(!wasmCheck?.ok) throw new Error(`Motor DWG indisponível: ${wasmUrl} não foi publicado no build.`)
 const libredwg=await LibreDwg.create(wasmPath)
 const bytes=await file.arrayBuffer();let dwg:any
 try{dwg=libredwg.dwg_read_data(bytes,Dwg_File_Type.DWG);const version=libredwg.dwg_get_version_type?.(dwg);const result=libredwg.convertEx?libredwg.convertEx(dwg):{database:libredwg.convert(dwg)};const segments:CadSegment[]=[];walk(result.database,segments,new Set());return{segments,version:String(version?.hdr??version??''),warning:segments.length?'':'DWG aberto, mas não foram encontradas LINE/POLYLINE convertíveis.'}}
 finally{if(dwg)try{libredwg.dwg_free(dwg)}catch{}}
}
