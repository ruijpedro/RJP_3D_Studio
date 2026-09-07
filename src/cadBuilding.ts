import type {RoomZone,SourceDrawing,StudioProject} from './types'
import {build3DProjectFromCad,type Cad3DReport,type Cad3DOptions} from './cadProject'

export interface CadLevelPlan{drawingId:string;drawingName:string;level:string;elevation:number;height:number;enabled:boolean}
export interface CadBuildingReport{floors:number;walls:number;openings:number;columns:number;slabs:number;rooms:number;reports:Cad3DReport[];warnings:string[]}
const norm=(s:string)=>s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'')
export function inferCadLevel(name:string,index=0,height=2.8):CadLevelPlan{
 const s=norm(name);let level=`Piso ${index}`,elevation=index*height
 if(/cave|basement|subsolo|piso[\s_-]*-1/.test(s)){level='Cave';elevation=-height}
 else if(/cobertura|roof|telhado|atico|sotao/.test(s)){level='Cobertura';elevation=Math.max(height,index*height)}
 else if(/(^|[^0-9])(rc|r\/c|res[\s_-]*do[\s_-]*chao|ground|piso[\s_-]*0)([^0-9]|$)/.test(s)){level='Piso 0';elevation=0}
 else{const m=s.match(/piso[\s_-]*(\d+)|(?:^|[^0-9])(\d+)\s*(?:o|º|andar)/);if(m){const n=Number(m[1]||m[2]);level=`Piso ${n}`;elevation=n*height}}
 return{drawingId:'',drawingName:name,level,elevation,height,enabled:true}
}
export function createCadBuildingPlan(drawings:SourceDrawing[],height=2.8){
 const plans=drawings.filter(d=>d.cadSegments?.length).map((d,i)=>({...inferCadLevel(d.name,i,height),drawingId:d.id,drawingName:d.name}))
 const seen=new Map<string,number>()
 return plans.map(p=>{const c=seen.get(p.level)||0;seen.set(p.level,c+1);return c?{...p,level:`${p.level} · ${c+1}`,elevation:p.elevation+c*p.height}:p}).sort((a,b)=>a.elevation-b.elevation)
}
export function buildBuildingFromCad(current:StudioProject,drawings:SourceDrawing[],plans:CadLevelPlan[],base:Omit<Cad3DOptions,'level'|'elevation'|'height'>):{project:StudioProject;rooms:RoomZone[];report:CadBuildingReport}{
 let project=current;const allRooms:RoomZone[]=[];const reports:Cad3DReport[]=[];const warnings:string[]=[];const byId=new Map(drawings.map(d=>[d.id,d]))
 for(const p of plans.filter(x=>x.enabled).sort((a,b)=>a.elevation-b.elevation)){
  const d=byId.get(p.drawingId);if(!d||!d.cadSegments?.length){warnings.push(`${p.drawingName}: sem geometria CAD utilizável.`);continue}
  const r=build3DProjectFromCad(project,d,{...base,level:p.level,elevation:p.elevation,height:p.height,replaceCadLevel:true})
  const prefix=`${d.id}-${p.level.replace(/\W+/g,'-')}`,imported=r.project.elements.filter(e=>e.level===p.level&&e.properties.cadImported3D===true),idMap=new Map(imported.map((e,i)=>[e.id,`${prefix}-${i}`]))
  project={...r.project,elements:r.project.elements.map(e=>!idMap.has(e.id)?e:{...e,id:idMap.get(e.id)!,properties:{...e.properties,hostWallId:idMap.get(String(e.properties.hostWallId||''))||e.properties.hostWallId,cadBatch:true,cadBuildingLevel:p.level,cadBuildingElevation:p.elevation}})}
  allRooms.push(...r.rooms.map(room=>({...room,id:`${prefix}-${room.id}`})));reports.push(r.report);warnings.push(...r.report.warnings.map(w=>`${p.level}: ${w}`))
 }
 return{project,rooms:allRooms,report:{floors:reports.length,walls:reports.reduce((s,r)=>s+r.walls,0),openings:reports.reduce((s,r)=>s+r.openings,0),columns:reports.reduce((s,r)=>s+r.columns,0),slabs:reports.reduce((s,r)=>s+r.floors,0),rooms:reports.reduce((s,r)=>s+r.rooms,0),reports,warnings}}
}
