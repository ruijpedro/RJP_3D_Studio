import type {StudioElement,StudioMaterial} from './types'
export const materials:StudioMaterial[]=[
{id:'conc-c30',name:'Betão C30/37',family:'Betão',texture:'concrete'},
{id:'steel-s275',name:'Aço S275',family:'Aço',texture:'steel'},
{id:'timber-c24',name:'Madeira C24',family:'Madeira',texture:'wood'},
{id:'lsf-z275',name:'LSF Z275',family:'Aço leve',texture:'galvanized'},
{id:'brick',name:'Tijolo cerâmico',family:'Alvenaria',texture:'brick'},
{id:'block',name:'Bloco de betão',family:'Alvenaria',texture:'block'},
{id:'glass',name:'Vidro',family:'Vidro',texture:'glass'},
{id:'tile',name:'Telha cerâmica',family:'Cobertura',texture:'tile'},
{id:'sandwich',name:'Painel sandwich',family:'Cobertura',texture:'sandwich'},
{id:'plaster',name:'Reboco pintado',family:'Revestimento',texture:'plaster'},
{id:'ceramic',name:'Cerâmico',family:'Revestimento',texture:'ceramic'},
{id:'insulation',name:'Isolamento térmico',family:'Isolamento',texture:'insulation'}]
const m=(id:string)=>materials.find(x=>x.id===id)!
export interface LibraryItem{id:string;name:string;category:string;type:string;size:{x:number;y:number;z:number};material:StudioMaterial}
export const library:LibraryItem[]=[
{id:'column30',name:'Pilar 30×30',category:'Estrutura',type:'column',size:{x:.3,y:.3,z:3},material:m('conc-c30')},
{id:'beam2550',name:'Viga 25×50',category:'Estrutura',type:'beam',size:{x:5,y:.25,z:.5},material:m('conc-c30')},
{id:'slab18',name:'Laje 18 cm',category:'Estrutura',type:'slab',size:{x:5,y:4,z:.18},material:m('conc-c30')},
{id:'footing',name:'Sapata isolada',category:'Estrutura',type:'footing',size:{x:1.8,y:1.8,z:.5},material:m('conc-c30')},
{id:'wall-brick',name:'Parede tijolo 20 cm',category:'Arquitetura',type:'wall',size:{x:4,y:.2,z:2.8},material:m('brick')},
{id:'wall-block',name:'Parede bloco 20 cm',category:'Arquitetura',type:'wall',size:{x:4,y:.2,z:2.8},material:m('block')},
{id:'wall-lsf',name:'Parede LSF 15 cm',category:'LSF',type:'wall',size:{x:4,y:.15,z:2.8},material:m('lsf-z275')},
{id:'wall-timber',name:'Parede timber frame',category:'Madeira',type:'wall',size:{x:4,y:.18,z:2.8},material:m('timber-c24')},
{id:'window',name:'Janela 1,20×1,20',category:'Vãos',type:'window',size:{x:1.2,y:.08,z:1.2},material:m('glass')},
{id:'door',name:'Porta 0,90×2,10',category:'Vãos',type:'door',size:{x:.9,y:.06,z:2.1},material:m('timber-c24')},
{id:'roof-tile',name:'Cobertura telha inclinada',category:'Cobertura',type:'roof',size:{x:6,y:8,z:.18},material:m('tile')},
{id:'roof-sandwich',name:'Cobertura painel sandwich',category:'Cobertura',type:'roof',size:{x:6,y:8,z:.12},material:m('sandwich')},
{id:'gutter',name:'Caleira',category:'Drenagem',type:'gutter',size:{x:6,y:.15,z:.15},material:m('steel-s275')},
{id:'downpipe',name:'Tubo de queda Ø110',category:'Drenagem',type:'pipe',size:{x:.11,y:.11,z:3},material:m('steel-s275')},
{id:'stair',name:'Escada',category:'Arquitetura',type:'stair',size:{x:2.5,y:1.1,z:2.8},material:m('conc-c30')},
{id:'kitchen',name:'Bancada cozinha',category:'Mobiliário',type:'furniture',size:{x:2.4,y:.65,z:.9},material:m('timber-c24')},
{id:'sofa',name:'Sofá 3 lugares',category:'Mobiliário',type:'furniture',size:{x:2.1,y:.9,z:.85},material:m('timber-c24')},
{id:'bed',name:'Cama casal',category:'Mobiliário',type:'furniture',size:{x:2,y:1.6,z:.55},material:m('timber-c24')},
{id:'wc',name:'Sanita',category:'Sanitários',type:'fixture',size:{x:.4,y:.65,z:.75},material:m('ceramic')},
{id:'basin',name:'Lavatório',category:'Sanitários',type:'fixture',size:{x:.6,y:.5,z:.85},material:m('ceramic')},
{id:'tap',name:'Torneira',category:'Sanitários',type:'fixture',size:{x:.12,y:.22,z:.32},material:m('steel-s275')}
]
export function createFromLibrary(item:LibraryItem,index:number):StudioElement{return{id:`LIB-${item.id}-${index}`,name:item.name,type:item.type,category:item.category,level:'Piso 0',position:{x:0,y:0,z:item.size.z/2},rotation:{x:0,y:0,z:0},size:{...item.size},material:item.material,source:'Biblioteca RJP_3D Studio',properties:{libraryId:item.id},results:undefined}}
