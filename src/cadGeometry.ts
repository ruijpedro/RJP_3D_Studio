import type {CadSegment} from './types'
export type XY={x:number;y:number}
export interface TwoPointAlignment{offsetX:number;offsetY:number;rotation:number;scale:number}
const d=(a:XY,b:XY)=>Math.hypot(b.x-a.x,b.y-a.y)
export function alignmentFromTwoPoints(srcA:XY,srcB:XY,dstA:XY,dstB:XY):TwoPointAlignment{
 const sa=Math.atan2(srcB.y-srcA.y,srcB.x-srcA.x), da=Math.atan2(dstB.y-dstA.y,dstB.x-dstA.x)
 const rotation=(da-sa)*180/Math.PI, scale=d(dstA,dstB)/Math.max(1e-9,d(srcA,srcB))
 const r=rotation*Math.PI/180,c=Math.cos(r),s=Math.sin(r)
 const tx=dstA.x-(srcA.x*c-srcA.y*s)*scale,ty=dstA.y-(srcA.x*s+srcA.y*c)*scale
 return{offsetX:tx,offsetY:ty,rotation,scale}
}
export function transformPoint(p:XY,a:TwoPointAlignment):XY{
 const r=a.rotation*Math.PI/180,c=Math.cos(r),s=Math.sin(r)
 return{x:(p.x*c-p.y*s)*a.scale+a.offsetX,y:(p.x*s+p.y*c)*a.scale+a.offsetY}
}
const key=(p:XY,t=.02)=>`${Math.round(p.x/t)}:${Math.round(p.y/t)}`
export function detectClosedContours(segments:CadSegment[],tol=.02):XY[][]{
 const unused=segments.map((s,i)=>({i,a:{x:s.x1,y:s.y1},b:{x:s.x2,y:s.y2}})),out:XY[][]=[]
 while(unused.length){
  const first=unused.shift()!,poly=[first.a,first.b];let end=first.b,guard=0
  while(unused.length&&guard++<10000){
   const k=key(end,tol);const j=unused.findIndex(e=>key(e.a,tol)===k||key(e.b,tol)===k)
   if(j<0)break
   const e=unused.splice(j,1)[0],next=key(e.a,tol)===k?e.b:e.a;poly.push(next);end=next
   if(key(end,tol)===key(poly[0],tol)){if(poly.length>=4)out.push(poly);break}
  }
 }
 return out
}
export function polygonArea(poly:XY[]){let a=0;for(let i=0;i<poly.length-1;i++)a+=poly[i].x*poly[i+1].y-poly[i+1].x*poly[i].y;return Math.abs(a)/2}
