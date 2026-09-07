import type {StudioElement,RoomZone} from './types'

export type P2={x:number;y:number}
export const dist=(a:P2,b:P2)=>Math.hypot(b.x-a.x,b.y-a.y)
export const snapGrid=(p:P2,step=.05):P2=>({x:Math.round(p.x/step)*step,y:Math.round(p.y/step)*step})
export function wallEnds(e:StudioElement):[P2,P2]{
 const L=e.size.x/2,a=e.rotation.z,c=Math.cos(a),s=Math.sin(a)
 return [{x:e.position.x-L*c,y:e.position.y-L*s},{x:e.position.x+L*c,y:e.position.y+L*s}]
}
export function nearestSnap(p:P2,elements:StudioElement[],mode:string,tol=.22):P2{
 if(mode==='Grid')return snapGrid(p)
 const walls=elements.filter(e=>e.type==='wall')
 const pts:P2[]=[]
 for(const w of walls){const [a,b]=wallEnds(w);pts.push(a,b);if(mode==='Midpoint')pts.push({x:(a.x+b.x)/2,y:(a.y+b.y)/2})}
 let best=p,bd=tol
 for(const q of pts){const d=dist(p,q);if(d<bd){best=q;bd=d}}
 if(mode==='Intersection'){
  for(let i=0;i<walls.length;i++)for(let j=i+1;j<walls.length;j++){
   const x=segmentIntersection(...wallEnds(walls[i]),...wallEnds(walls[j]))
   if(x&&dist(p,x)<bd){best=x;bd=dist(p,x)}
  }
 }
 return best
}
export function segmentIntersection(a:P2,b:P2,c:P2,d:P2):P2|null{
 const den=(a.x-b.x)*(c.y-d.y)-(a.y-b.y)*(c.x-d.x);if(Math.abs(den)<1e-9)return null
 const t=((a.x-c.x)*(c.y-d.y)-(a.y-c.y)*(c.x-d.x))/den
 const u=-((a.x-b.x)*(a.y-c.y)-(a.y-b.y)*(a.x-c.x))/den
 if(t<-.001||t>1.001||u<-.001||u>1.001)return null
 return{x:a.x+t*(b.x-a.x),y:a.y+t*(b.y-a.y)}
}
export function makeWall(a:P2,b:P2,level:string,elevation:number,height:number,thickness:number,material:any,snap:string):StudioElement{
 const L=Math.max(.02,dist(a,b)),ang=Math.atan2(b.y-a.y,b.x-a.x)
 return{id:`WALL-${Date.now()}-${Math.random().toString(36).slice(2,7)}`,name:'Parede BIM desenhada',type:'wall',category:'Alvenarias',level,
 position:{x:(a.x+b.x)/2,y:(a.y+b.y)/2,z:elevation+height/2},rotation:{x:0,y:0,z:ang},size:{x:L,y:thickness,z:height},material,source:'RJP CAD 2D',
 properties:{phase:'Novo',smartWall:true,joinMode:'auto',snap,authoring:'click-to-click',startX:+a.x.toFixed(3),startY:+a.y.toFixed(3),endX:+b.x.toFixed(3),endY:+b.y.toFixed(3)}}
}
const key=(p:P2,t=.12)=>`${Math.round(p.x/t)},${Math.round(p.y/t)}`
export function detectClosedRooms(elements:StudioElement[],level:string):RoomZone[]{
 const walls=elements.filter(e=>e.type==='wall'&&(!level||e.level===level))
 if(walls.length<3)return[]
 const nodes=new Map<string,{p:P2;edges:Set<string>}>()
 const add=(p:P2,q:P2)=>{const k=key(p),j=key(q);if(!nodes.has(k))nodes.set(k,{p,edges:new Set});nodes.get(k)!.edges.add(j)}
 for(const w of walls){const[a,b]=wallEnds(w);add(a,b);add(b,a)}
 const cycles:P2[][]=[],seen=new Set<string>()
 for(const [start,n] of nodes)for(const next of n.edges){
  const path=[start,next];let prev=start,cur=next
  for(let guard=0;guard<64;guard++){
   const cn=nodes.get(cur);if(!cn)break
   if(cur===start&&path.length>3){const pts=path.slice(0,-1).map(k=>nodes.get(k)!.p);const sig=pts.map(key).sort().join('|');if(!seen.has(sig)){seen.add(sig);cycles.push(pts)};break}
   const choices=[...cn.edges].filter(x=>x!==prev);if(!choices.length)break
   const nxt=choices[0];prev=cur;cur=nxt;path.push(cur)
  }
 }
 const area=(p:P2[])=>Math.abs(p.reduce((s,a,i)=>{const b=p[(i+1)%p.length];return s+a.x*b.y-b.x*a.y},0))/2
 const peri=(p:P2[])=>p.reduce((s,a,i)=>s+dist(a,p[(i+1)%p.length]),0)
 return cycles.filter(p=>area(p)>.5).slice(0,50).map((p,i)=>({id:`ROOM-${Date.now()}-${i}`,name:`Compartimento ${i+1}`,level,area:+area(p).toFixed(2),perimeter:+peri(p).toFixed(2),source:'CAD',polygon:p}))
}

export type Dim2D={id:string;a:P2;b:P2;text:string;value:number;level:string;associative:boolean}
export const angle=(a:P2,b:P2)=>Math.atan2(b.y-a.y,b.x-a.x)
export function offsetSegment(a:P2,b:P2,d:number):[P2,P2]{const L=dist(a,b)||1,nx=-(b.y-a.y)/L,ny=(b.x-a.x)/L;return[{x:a.x+nx*d,y:a.y+ny*d},{x:b.x+nx*d,y:b.y+ny*d}]}
export function mirrorPoint(p:P2,a:P2,b:P2):P2{const dx=b.x-a.x,dy=b.y-a.y,L=dx*dx+dy*dy||1,t=((p.x-a.x)*dx+(p.y-a.y)*dy)/L,q={x:a.x+t*dx,y:a.y+t*dy};return{x:2*q.x-p.x,y:2*q.y-p.y}}
export function trimWallToIntersection(w:StudioElement,target:StudioElement):Partial<StudioElement>|null{
 const [a,b]=wallEnds(w),[c,d]=wallEnds(target),p=segmentIntersectionInfinite(a,b,c,d);if(!p)return null
 const da=dist(a,p),db=dist(b,p),keep=da>db?a:b,mid={x:(keep.x+p.x)/2,y:(keep.y+p.y)/2},L=dist(keep,p)
 return{position:{...w.position,x:mid.x,y:mid.y},rotation:{...w.rotation,z:angle(keep,p)},size:{...w.size,x:L},properties:{...w.properties,joinMode:'trimmed'}}
}
export function extendWallToIntersection(w:StudioElement,target:StudioElement):Partial<StudioElement>|null{return trimWallToIntersection(w,target)}
export function segmentIntersectionInfinite(a:P2,b:P2,c:P2,d:P2):P2|null{
 const den=(a.x-b.x)*(c.y-d.y)-(a.y-b.y)*(c.x-d.x);if(Math.abs(den)<1e-9)return null
 const t=((a.x-c.x)*(c.y-d.y)-(a.y-c.y)*(c.x-d.x))/den
 return{x:a.x+t*(b.x-a.x),y:a.y+t*(b.y-a.y)}
}
export function autoJoinWalls(elements:StudioElement[],tol=.18):StudioElement[]{
 const out=elements.map(e=>({...e,position:{...e.position},rotation:{...e.rotation},size:{...e.size},properties:{...e.properties}}))
 const walls=out.filter(e=>e.type==='wall')
 for(let i=0;i<walls.length;i++)for(let j=i+1;j<walls.length;j++){
  const wi=walls[i],wj=walls[j],[a,b]=wallEnds(wi),[c,d]=wallEnds(wj),p=segmentIntersectionInfinite(a,b,c,d);if(!p)continue
  const ei=[a,b].sort((x,y)=>dist(x,p)-dist(y,p))[0],ej=[c,d].sort((x,y)=>dist(x,p)-dist(y,p))[0]
  if(dist(ei,p)<=tol&&dist(ej,p)<=tol){wi.properties={...wi.properties,joinMode:'auto-L/T/X'};wj.properties={...wj.properties,joinMode:'auto-L/T/X'}}
 }
 return out
}
export function makeDimension(a:P2,b:P2,level:string):Dim2D{const v=dist(a,b);return{id:`DIM-${Date.now()}`,a,b,value:v,text:`${v.toFixed(2)} m`,level,associative:true}}
