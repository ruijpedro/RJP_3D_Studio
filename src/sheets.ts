import type {DrawingSheet,RoomZone,StudioProject} from './types'
export type SheetViewport={id:string;title:string;view:'Planta'|'Frente'|'Direita'|'3D';level:string;scale:number;x:number;y:number;w:number;h:number}
export type ProductionSheet=DrawingSheet&{viewports?:SheetViewport[];notes?:string[]}
export const paperMM:Record<DrawingSheet['size'],[number,number]>={A4:[297,210],A3:[420,297],A2:[594,420],A1:[841,594],A0:[1189,841]}
const scaleNumber=(s:string)=>Math.max(1,Number(String(s).split(':').pop())||100)
export function defaultViewport(sheet:DrawingSheet):SheetViewport{
 const [W,H]=paperMM[sheet.size]
 return{id:`VP-${Date.now()}`,title:`${sheet.view} · ${sheet.level}`,view:sheet.view,level:sheet.level,scale:scaleNumber(sheet.scale),x:18,y:18,w:W-36,h:H-55}
}
export function sheetSVG(sheet:ProductionSheet,project:StudioProject,rooms:RoomZone[],dims:any[]=[]){
 const [W,H]=paperMM[sheet.size],vp=(sheet.viewports&&sheet.viewports[0])||defaultViewport(sheet)
 const els=project.elements.filter(e=>vp.level==='Todos'||e.level===vp.level),walls=els.filter(e=>e.type==='wall')
 const pts=walls.flatMap(w=>{const L=w.size.x/2,a=w.rotation.z,c=Math.cos(a),s=Math.sin(a);return[[w.position.x-L*c,w.position.y-L*s],[w.position.x+L*c,w.position.y+L*s]]})
 const xs=pts.map(p=>p[0]),ys=pts.map(p=>p[1]),minx=Math.min(...xs,0),maxx=Math.max(...xs,10),miny=Math.min(...ys,0),maxy=Math.max(...ys,10),sx=vp.w/Math.max(1,maxx-minx),sy=vp.h/Math.max(1,maxy-miny),sc=Math.min(sx,sy)*.88
 const X=(x:number)=>vp.x+vp.w/2+(x-(minx+maxx)/2)*sc,Y=(y:number)=>vp.y+vp.h/2-(y-(miny+maxy)/2)*sc
 const wallSvg=walls.map(w=>{const L=w.size.x/2,a=w.rotation.z,c=Math.cos(a),s=Math.sin(a),a1=[w.position.x-L*c,w.position.y-L*s],b=[w.position.x+L*c,w.position.y+L*s];return`<line x1="${X(a1[0])}" y1="${Y(a1[1])}" x2="${X(b[0])}" y2="${Y(b[1])}" stroke="black" stroke-width="${Math.max(.4,w.size.y*sc)}"/>`}).join('')
 const roomSvg=rooms.filter(r=>r.level===vp.level&&r.polygon).map(r=>{const p=r.polygon!,cx=p.reduce((s,q)=>s+q.x,0)/p.length,cy=p.reduce((s,q)=>s+q.y,0)/p.length;return`<text x="${X(cx)}" y="${Y(cy)}" font-size="3" text-anchor="middle">${esc(r.name)} · ${r.area.toFixed(2)} m²</text>`}).join('')
 const dimSvg=dims.filter((d:any)=>d.level===vp.level).map((d:any)=>`<g><line x1="${X(d.a.x)}" y1="${Y(d.a.y)}" x2="${X(d.b.x)}" y2="${Y(d.b.y)}" stroke="#555" stroke-width=".25"/><text x="${(X(d.a.x)+X(d.b.x))/2}" y="${(Y(d.a.y)+Y(d.b.y))/2-1}" font-size="2.8" text-anchor="middle">${esc(d.text)}</text></g>`).join('')
 return`<svg xmlns="http://www.w3.org/2000/svg" width="${W}mm" height="${H}mm" viewBox="0 0 ${W} ${H}"><rect width="${W}" height="${H}" fill="white"/><rect x="8" y="8" width="${W-16}" height="${H-16}" fill="none" stroke="black" stroke-width=".35"/><rect x="${vp.x}" y="${vp.y}" width="${vp.w}" height="${vp.h}" fill="none" stroke="#777" stroke-width=".2"/>${wallSvg}${roomSvg}${dimSvg}<g font-family="Arial"><rect x="${W-118}" y="${H-42}" width="110" height="34" fill="white" stroke="black" stroke-width=".3"/><text x="${W-114}" y="${H-34}" font-size="5" font-weight="bold">RJP 3D STUDIO</text><text x="${W-114}" y="${H-27}" font-size="3.5">${esc(project.name)}</text><text x="${W-114}" y="${H-20}" font-size="3.2">${esc(sheet.number)} · ${esc(sheet.title)} · Rev. ${esc(sheet.revision)}</text><text x="${W-114}" y="${H-13}" font-size="3.2">${esc(sheet.scale)} · ${esc(vp.level)} · ${esc(sheet.size)}</text></g></svg>`
}
const esc=(s:any)=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]||c))
export function downloadSheetSVG(sheet:ProductionSheet,project:StudioProject,rooms:RoomZone[],dims:any[]=[]){const svg=sheetSVG(sheet,project,rooms,dims),b=new Blob([svg],{type:'image/svg+xml'}),a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=`${sheet.number}_${sheet.title}.svg`;a.click();URL.revokeObjectURL(a.href)}
export function printSheet(sheet:ProductionSheet,project:StudioProject,rooms:RoomZone[],dims:any[]=[]){const w=window.open('','_blank');if(!w)return;w.document.write(`<html><head><title>${sheet.number}</title><style>@page{size:${sheet.size} landscape;margin:0}body{margin:0}svg{display:block}</style></head><body>${sheetSVG(sheet,project,rooms,dims)}<script>onload=()=>print()</script></body></html>`);w.document.close()}
