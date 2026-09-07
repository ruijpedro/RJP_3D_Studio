export type V=string|number|boolean|null
export interface StudioMaterial{id:string;name:string;family:string;properties?:Record<string,V>;texture?:string}
export interface StudioElement{id:string;name:string;type:string;category:string;level?:string;position:{x:number;y:number;z:number};rotation:{x:number;y:number;z:number};size:{x:number;y:number;z:number};material:StudioMaterial;source:string;properties:Record<string,V>;results?:Record<string,V>}
export interface StudioLevel{id:string;name:string;elevation:number;height:number;visible:boolean}
export type ProjectPhase='Existente'|'Demolir'|'Novo'
export interface StudioProject{id:string;name:string;location:string;solution:'traditional'|'lsf'|'timber';elements:StudioElement[];levels?:StudioLevel[];createdAt:string;updatedAt:string}
export interface RJPStudioStructurePackage{schema:'RJP-STUDIO-STRUCTURE/1.0';source:{app:string;version:string;exportedAt:string};project:Record<string,V>;nodes:Array<{id:number;x:number;y:number;z?:number}>;members:Array<{id:string;kind:string;a?:number;b?:number;geometry:Record<string,V>;material?:StudioMaterial;results?:Record<string,V>;reinforcement?:string|null}>;foundations:Array<{id:string;node:number;kind:string;geometry:Record<string,V>;actions:Record<string,V>;results:Record<string,V>;reinforcement?:string|null}>;steelSchedule:any[];notes:string[]}
export interface WorkItem{id:string;code:string;chapter:string;description:string;unit:string;qty:number;unitPrice:number;duration:number;start:number;source:string;elementId?:string;level?:string;phase?:ProjectPhase;progress?:number;predecessor?:string;status?:'Não iniciado'|'Em execução'|'Concluído';notes?:string}
export interface Measurement{id:string;workId:string;autoNo:number;previous:number;current:number;date:string;note:string}
export interface CadSegment{x1:number;y1:number;x2:number;y2:number;layer:string;entity?:string}
export type CadLayerRole='Parede'|'Vão'|'Pilar'|'Eixo'|'Referência'|'Ignorar'
export interface CadLayer{name:string;count:number;visible:boolean;role:CadLayerRole}
export interface PlanAnalysis{engine:'pdf-vector'|'pdf-raster'|'cad';page:number;confidence:number;vectorSegments:number;rasterSegments:number;scaleCalibrated?:boolean;knownDistance?:number;warnings:string[]}
export interface SourceDrawing{id:string;name:string;kind:'pdf'|'dwg'|'dxf'|'dwf'|'dwfx'|'image'|'other';size:number;info:string;url?:string;cadSegments?:CadSegment[];cadBounds?:{minX:number;minY:number;maxX:number;maxY:number};layers?:CadLayer[];dwgVersion?:string;parseStatus?:'ready'|'parsing'|'error'|'reference';parseError?:string;planAnalysis?:PlanAnalysis}

export interface SiteEntry{id:string;date:string;title:string;kind:'Diário'|'Ocorrência'|'Inspeção'|'Entrega'|'Reunião';note:string;status:'Aberto'|'Resolvido'}
export interface RoomZone{id:string;name:string;level:string;area:number;perimeter:number;source:'CAD'|'Manual';cadLayer?:string;polygon?:Array<{x:number;y:number}>}
export interface DrawingSheet{id:string;number:string;title:string;size:'A4'|'A3'|'A2'|'A1'|'A0';scale:string;view:'Planta'|'Frente'|'Direita'|'3D';level:string;revision:string}
