import type {ProjectPhase,RoomZone,SourceDrawing,StudioElement,StudioLevel,StudioProject,V} from './types'
import {materials} from './library'
import {detectClosedRooms} from './geometry'
import {smartModelFromCad} from './importers'

export interface Cad3DOptions{
 scale:number;height:number;defaultThickness:number;level:string;elevation:number;
 phase:ProjectPhase;detectDoubleLines:boolean;detectRooms:boolean;createFloor:boolean;replaceCadLevel:boolean
}
export interface Cad3DReport{
 walls:number;openings:number;columns:number;floors:number;rooms:number;ignored:number;layers:number;
 warnings:string[];level:string;source:string
}
const mat=(id:string)=>materials.find(m=>m.id===id)||materials[0]

function hostOpenings(elements:StudioElement[]){
 const walls=elements.filter(e=>e.type==='wall')
 return elements.map(e=>{
  if(!['door','window'].includes(e.type))return e
  let host=walls.find(w=>String(e.properties.hostWallId||'')===w.id)
  if(!host)host=walls.filter(w=>w.level===e.level).sort((a,b)=>Math.hypot(a.position.x-e.position.x,a.position.y-e.position.y)-Math.hypot(b.position.x-e.position.x,b.position.y-e.position.y))[0]
  if(!host)return e
  const z0=host.position.z-host.size.z/2
  const isDoor=e.type==='door'
  const sill=isDoor?0:Number(e.properties.sillHeight??.9)
  return {...e,position:{...e.position,z:z0+sill+e.size.z/2},rotation:{...host.rotation},properties:{...e.properties,phase:'Novo',hostWallId:host.id,openingCut:true,openingWidth:e.size.x,openingHeight:e.size.z,openingSill:sill}}
 })
}

function createFloorFromBounds(d:SourceDrawing,o:Cad3DOptions):StudioElement|null{
 const b=d.cadBounds;if(!b)return null
 const w=(b.maxX-b.minX)*o.scale,h=(b.maxY-b.minY)*o.scale
 if(w<=.2||h<=.2)return null
 return{id:`CAD-FLOOR-${Date.now()}`,name:`Laje base · ${o.level}`,type:'slab',category:'Estrutura',level:o.level,
 position:{x:w/2,y:h/2,z:o.elevation-.10},rotation:{x:0,y:0,z:0},size:{x:w,y:h,z:.20},material:mat('concrete'),
 source:`CAD/${d.kind.toUpperCase()} · ${d.name}`,properties:{phase:o.phase,cadSource:d.name,cadRole:'Base 3D',generatedFromBounds:true}}
}

export function build3DProjectFromCad(current:StudioProject,d:SourceDrawing,o:Cad3DOptions):{project:StudioProject;rooms:RoomZone[];report:Cad3DReport}{
 const raw=smartModelFromCad(d,o.scale,o.height,o.defaultThickness,o.level,o.detectDoubleLines)
 let els=raw.map(e=>({...e,level:o.level,position:{...e.position,z:e.type==='wall'||e.type==='column'?o.elevation+e.size.z/2:o.elevation+e.position.z},properties:{...e.properties,phase:o.phase,cadImported3D:true,cadImportVersion:'2.5'}} as StudioElement))
 els=hostOpenings(els)
 const floor=o.createFloor?createFloorFromBounds(d,o):null
 if(floor)els.push(floor)
 const keep=o.replaceCadLevel?current.elements.filter(e=>!(e.level===o.level&&e.properties.cadImported3D===true)):current.elements
 const level:StudioLevel={id:`CAD-L-${o.level.replace(/\W+/g,'-')}`,name:o.level,elevation:o.elevation,height:o.height,visible:true}
 const levels=[...(current.levels||[]).filter(l=>l.name!==o.level),level].sort((a,b)=>a.elevation-b.elevation)
 const project={...current,levels,elements:[...keep,...els],updatedAt:new Date().toISOString()}
 const rooms=o.detectRooms?detectClosedRooms(project.elements,o.level):[]
 const active=(d.layers||[]).filter(l=>l.visible)
 const accepted=new Set(['Parede','Vão','Pilar'])
 const ignored=active.filter(l=>!accepted.has(l.role)).reduce((s,l)=>s+l.count,0)
 const report:Cad3DReport={
  walls:els.filter(e=>e.type==='wall').length,
  openings:els.filter(e=>e.type==='door'||e.type==='window').length,
  columns:els.filter(e=>e.type==='column').length,
  floors:floor?1:0,rooms:rooms.length,ignored,layers:active.length,level:o.level,source:d.name,warnings:[]
 }
 if(!report.walls)report.warnings.push('Não foram geradas paredes. Reveja as layers classificadas como Parede.')
 if(report.openings&&els.filter(e=>['door','window'].includes(e.type)&&!e.properties.hostWallId).length)report.warnings.push('Existem vãos sem parede hospedeira.')
 if(!rooms.length&&o.detectRooms)report.warnings.push('Não foram encontrados compartimentos fechados; pode fechar encontros no editor CAD e voltar a detetar.')
 return{project,rooms,report}
}
