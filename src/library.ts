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
{id:'insulation',name:'Isolamento térmico',family:'Isolamento',texture:'insulation'},
{id:'stone',name:'Pedra natural',family:'Revestimento',texture:'stone'},
{id:'gypsum',name:'Placa de gesso',family:'Divisórias',texture:'gypsum'},
{id:'pvc',name:'PVC',family:'Instalações',texture:'pvc'},
{id:'aluminium',name:'Alumínio',family:'Caixilharia',texture:'aluminium'},
{id:'soil',name:'Terreno',family:'Exterior',texture:'soil'},
{id:'stainless',name:'Aço inox',family:'Metais',texture:'steel'},
{id:'copper',name:'Cobre',family:'Metais',texture:'copper'},
{id:'zinc',name:'Zinco',family:'Metais',texture:'galvanized'},
{id:'mortar',name:'Argamassa',family:'Alvenaria',texture:'plaster'},
{id:'asphalt',name:'Betuminoso',family:'Exterior',texture:'asphalt'},
{id:'membrane',name:'Membrana impermeável',family:'Impermeabilização',texture:'membrane'},
{id:'xps',name:'XPS',family:'Isolamento',texture:'insulation'},
{id:'eps',name:'EPS',family:'Isolamento',texture:'insulation'},
{id:'rockwool',name:'Lã mineral',family:'Isolamento',texture:'insulation'},
{id:'osb',name:'OSB',family:'Madeira técnica',texture:'wood'},
{id:'mdf',name:'MDF',family:'Madeira técnica',texture:'wood'},
{id:'laminate',name:'Laminado',family:'Revestimento',texture:'wood'},
{id:'paint',name:'Pintura',family:'Revestimento',texture:'paint'},
{id:'grass',name:'Relva',family:'Exterior',texture:'grass'},
{id:'gravel',name:'Brita',family:'Exterior',texture:'gravel'},
{id:'paver',name:'Pavê / bloco',family:'Exterior',texture:'block'},
{id:'water',name:'Água',family:'Exterior',texture:'glass'},
{id:'porcelain',name:'Porcelânico',family:'Revestimento',texture:'ceramic'},
{id:'rubber',name:'Borracha',family:'Revestimento',texture:'rubber'},
{id:'composite',name:'Compósito',family:'Revestimento',texture:'composite'},
{id:'acoustic',name:'Painel acústico',family:'Acústica',texture:'insulation'},
{id:'fireboard',name:'Placa resistente ao fogo',family:'Proteção passiva',texture:'gypsum'},
{id:'hdpe',name:'PEAD',family:'Instalações',texture:'pvc'},
{id:'pp',name:'Polipropileno',family:'Instalações',texture:'pvc'},
{id:'castiron',name:'Ferro fundido',family:'Metais',texture:'steel'},
{id:'brass',name:'Latão',family:'Metais',texture:'copper'},
{id:'granite',name:'Granito',family:'Pedra',texture:'stone'},
{id:'marble',name:'Mármore',family:'Pedra',texture:'stone'},
{id:'cork',name:'Cortiça',family:'Isolamento',texture:'wood'},
{id:'epoxy',name:'Resina epóxi',family:'Revestimento',texture:'paint'},
{id:'polycarbonate',name:'Policarbonato',family:'Plásticos',texture:'glass'},
{id:'fabric',name:'Tecido',family:'Mobiliário',texture:'fabric'},
{id:'firesteel',name:'Aço corta-fogo',family:'Proteção contra incêndio',texture:'steel'},
{id:'plastic',name:'Plástico técnico',family:'Plásticos',texture:'plastic'}]
const m=(id:string)=>materials.find(x=>x.id===id)??materials[0]
export interface LibraryItem{id:string;name:string;category:string;type:string;size:{x:number;y:number;z:number};material:StudioMaterial}
export const library:LibraryItem[]=[
{id:'column30',name:'Pilar 30×30',category:'Estrutura',type:'column',size:{x:.3,y:.3,z:3},material:m('conc-c30')},
{id:'column-steel',name:'Pilar metálico HEA',category:'Estrutura',type:'column',size:{x:.25,y:.25,z:3},material:m('steel-s275')},
{id:'beam2550',name:'Viga 25×50',category:'Estrutura',type:'beam',size:{x:5,y:.25,z:.5},material:m('conc-c30')},
{id:'beam-steel',name:'Viga metálica IPE',category:'Estrutura',type:'beam',size:{x:5,y:.18,z:.36},material:m('steel-s275')},
{id:'slab18',name:'Laje 18 cm',category:'Estrutura',type:'slab',size:{x:5,y:4,z:.18},material:m('conc-c30')},
{id:'footing',name:'Sapata isolada',category:'Estrutura',type:'footing',size:{x:1.8,y:1.8,z:.5},material:m('conc-c30')},
{id:'strip-footing',name:'Sapata corrida',category:'Estrutura',type:'footing',size:{x:5,y:.8,z:.4},material:m('conc-c30')},
{id:'wall-brick',name:'Parede tijolo 20 cm',category:'Arquitetura',type:'wall',size:{x:4,y:.2,z:2.8},material:m('brick')},
{id:'wall-brick11',name:'Parede tijolo 11 cm',category:'Arquitetura',type:'wall',size:{x:4,y:.11,z:2.8},material:m('brick')},
{id:'wall-block',name:'Parede bloco 20 cm',category:'Arquitetura',type:'wall',size:{x:4,y:.2,z:2.8},material:m('block')},
{id:'wall-stone',name:'Parede de pedra 50 cm',category:'Reabilitação',type:'wall',size:{x:4,y:.5,z:2.8},material:m('stone')},
{id:'wall-gypsum',name:'Divisória gesso cartonado',category:'Arquitetura',type:'wall',size:{x:4,y:.1,z:2.8},material:m('gypsum')},
{id:'wall-lsf',name:'Parede LSF 15 cm',category:'LSF',type:'wall',size:{x:4,y:.15,z:2.8},material:m('lsf-z275')},
{id:'wall-timber',name:'Parede timber frame',category:'Madeira',type:'wall',size:{x:4,y:.18,z:2.8},material:m('timber-c24')},
{id:'window',name:'Janela 1,20×1,20',category:'Vãos',type:'window',size:{x:1.2,y:.08,z:1.2},material:m('glass')},
{id:'window-wide',name:'Janela 2,40×1,40',category:'Vãos',type:'window',size:{x:2.4,y:.08,z:1.4},material:m('glass')},
{id:'door',name:'Porta 0,90×2,10',category:'Vãos',type:'door',size:{x:.9,y:.06,z:2.1},material:m('timber-c24')},
{id:'sliding-door',name:'Porta de correr 2,40 m',category:'Vãos',type:'door',size:{x:2.4,y:.08,z:2.2},material:m('glass')},
{id:'garage-door',name:'Portão de garagem',category:'Vãos',type:'door',size:{x:2.7,y:.1,z:2.3},material:m('aluminium')},
{id:'roof-tile',name:'Cobertura telha inclinada',category:'Cobertura',type:'roof',size:{x:6,y:8,z:.18},material:m('tile')},
{id:'roof-sandwich',name:'Cobertura painel sandwich',category:'Cobertura',type:'roof',size:{x:6,y:8,z:.12},material:m('sandwich')},
{id:'roof-flat',name:'Cobertura plana',category:'Cobertura',type:'roof',size:{x:6,y:8,z:.22},material:m('insulation')},
{id:'solar',name:'Painel solar',category:'Cobertura',type:'equipment',size:{x:1.75,y:1.1,z:.06},material:m('glass')},
{id:'gutter',name:'Caleira',category:'Drenagem',type:'gutter',size:{x:6,y:.15,z:.15},material:m('steel-s275')},
{id:'downpipe',name:'Tubo de queda Ø110',category:'Drenagem',type:'pipe',size:{x:.11,y:.11,z:3},material:m('pvc')},
{id:'drain',name:'Ralo de cobertura',category:'Drenagem',type:'fixture',size:{x:.25,y:.25,z:.12},material:m('steel-s275')},
{id:'stair',name:'Escada',category:'Arquitetura',type:'stair',size:{x:2.5,y:1.1,z:2.8},material:m('conc-c30')},
{id:'railing',name:'Guarda-corpos',category:'Arquitetura',type:'railing',size:{x:3,y:.06,z:1.05},material:m('glass')},
{id:'floor-tile',name:'Pavimento cerâmico',category:'Acabamentos',type:'floor',size:{x:4,y:4,z:.02},material:m('ceramic')},
{id:'floor-wood',name:'Pavimento madeira',category:'Acabamentos',type:'floor',size:{x:4,y:4,z:.02},material:m('timber-c24')},
{id:'kitchen',name:'Bancada cozinha',category:'Mobiliário',type:'furniture',size:{x:2.4,y:.65,z:.9},material:m('timber-c24')},
{id:'island',name:'Ilha de cozinha',category:'Mobiliário',type:'furniture',size:{x:1.8,y:.9,z:.92},material:m('stone')},
{id:'sofa',name:'Sofá 3 lugares',category:'Mobiliário',type:'furniture',size:{x:2.1,y:.9,z:.85},material:m('timber-c24')},
{id:'bed',name:'Cama casal',category:'Mobiliário',type:'furniture',size:{x:2,y:1.6,z:.55},material:m('timber-c24')},
{id:'table',name:'Mesa jantar',category:'Mobiliário',type:'furniture',size:{x:1.8,y:.9,z:.76},material:m('timber-c24')},
{id:'cabinet',name:'Armário',category:'Mobiliário',type:'furniture',size:{x:1.8,y:.6,z:2.2},material:m('timber-c24')},
{id:'wc',name:'Sanita',category:'Sanitários',type:'fixture',size:{x:.4,y:.65,z:.75},material:m('ceramic')},
{id:'basin',name:'Lavatório',category:'Sanitários',type:'fixture',size:{x:.6,y:.5,z:.85},material:m('ceramic')},
{id:'bath',name:'Banheira',category:'Sanitários',type:'fixture',size:{x:1.7,y:.75,z:.58},material:m('ceramic')},
{id:'shower',name:'Base de duche',category:'Sanitários',type:'fixture',size:{x:1.2,y:.8,z:.08},material:m('ceramic')},
{id:'tap',name:'Torneira',category:'Sanitários',type:'fixture',size:{x:.12,y:.22,z:.32},material:m('steel-s275')},
{id:'water-pipe',name:'Tubagem água Ø25',category:'Instalações',type:'pipe',size:{x:.025,y:.025,z:3},material:m('pvc')},
{id:'drain-pipe',name:'Tubagem esgoto Ø110',category:'Instalações',type:'pipe',size:{x:.11,y:.11,z:3},material:m('pvc')},
{id:'hvac-duct',name:'Conduta AVAC',category:'Instalações',type:'duct',size:{x:2,y:.4,z:.25},material:m('lsf-z275')},
{id:'elec-panel',name:'Quadro elétrico',category:'Instalações',type:'equipment',size:{x:.5,y:.15,z:.7},material:m('aluminium')},
{id:'tree',name:'Árvore',category:'Exterior',type:'landscape',size:{x:1.2,y:1.2,z:4},material:m('soil')},
{id:'pool',name:'Piscina',category:'Exterior',type:'pool',size:{x:8,y:4,z:1.5},material:m('water')}
,{id:'column40',name:'Pilar 40×40',category:'Estrutura',type:'column',size:{x:.4,y:.4,z:3},material:m('conc-c30')}
,{id:'column-circ',name:'Pilar circular Ø40',category:'Estrutura',type:'column',size:{x:.4,y:.4,z:3},material:m('conc-c30')}
,{id:'beam2030',name:'Viga 20×30',category:'Estrutura',type:'beam',size:{x:4,y:.2,z:.3},material:m('conc-c30')}
,{id:'beam3060',name:'Viga 30×60',category:'Estrutura',type:'beam',size:{x:5,y:.3,z:.6},material:m('conc-c30')}
,{id:'slab25',name:'Laje 25 cm',category:'Estrutura',type:'slab',size:{x:5,y:4,z:.25},material:m('conc-c30')}
,{id:'foundation-raft',name:'Laje de fundação',category:'Estrutura',type:'footing',size:{x:6,y:6,z:.35},material:m('conc-c30')}
,{id:'retaining-wall',name:'Muro de suporte',category:'Estrutura',type:'wall',size:{x:5,y:.3,z:2.5},material:m('conc-c30')}
,{id:'steel-brace',name:'Contraventamento metálico',category:'Estrutura metálica',type:'beam',size:{x:4,y:.08,z:.08},material:m('steel-s275')}
,{id:'steel-plate',name:'Chapa metálica 10 mm',category:'Estrutura metálica',type:'slab',size:{x:1,y:1,z:.01},material:m('steel-s275')}
,{id:'wall-double-brick',name:'Parede dupla 11+11 cm',category:'Arquitetura',type:'wall',size:{x:4,y:.3,z:2.8},material:m('brick')}
,{id:'wall-thermal-block',name:'Parede bloco térmico 25 cm',category:'Arquitetura',type:'wall',size:{x:4,y:.25,z:2.8},material:m('block')}
,{id:'wall-concrete',name:'Parede betão 20 cm',category:'Arquitetura',type:'wall',size:{x:4,y:.2,z:2.8},material:m('conc-c30')}
,{id:'wall-stone60',name:'Parede pedra 60 cm',category:'Reabilitação',type:'wall',size:{x:4,y:.6,z:2.8},material:m('stone')}
,{id:'chimney-masonry',name:'Chaminé alvenaria',category:'Reabilitação',type:'wall',size:{x:.7,y:.7,z:4},material:m('brick')}
,{id:'wall-lsf10',name:'Parede LSF 10 cm',category:'LSF',type:'wall',size:{x:4,y:.1,z:2.8},material:m('lsf-z275')}
,{id:'wall-lsf20',name:'Parede LSF 20 cm',category:'LSF',type:'wall',size:{x:4,y:.2,z:2.8},material:m('lsf-z275')}
,{id:'lsf-stud',name:'Montante LSF C90',category:'LSF',type:'column',size:{x:.09,y:.045,z:2.8},material:m('lsf-z275')}
,{id:'lsf-track',name:'Canal LSF U90',category:'LSF',type:'beam',size:{x:4,y:.09,z:.045},material:m('lsf-z275')}
,{id:'osb-board',name:'Placa OSB 18 mm',category:'LSF',type:'slab',size:{x:2.5,y:1.25,z:.018},material:m('osb')}
,{id:'timber-post',name:'Pilar madeira 14×14',category:'Madeira',type:'column',size:{x:.14,y:.14,z:3},material:m('timber-c24')}
,{id:'timber-beam',name:'Viga madeira 10×24',category:'Madeira',type:'beam',size:{x:5,y:.1,z:.24},material:m('timber-c24')}
,{id:'timber-joist',name:'Vigota madeira 6×18',category:'Madeira',type:'beam',size:{x:4,y:.06,z:.18},material:m('timber-c24')}
,{id:'window-small',name:'Janela 0,60×0,60',category:'Vãos',type:'window',size:{x:.6,y:.08,z:.6},material:m('glass')}
,{id:'window-150',name:'Janela 1,50×1,20',category:'Vãos',type:'window',size:{x:1.5,y:.08,z:1.2},material:m('glass')}
,{id:'window-balcony',name:'Janela sacada 1,60×2,10',category:'Vãos',type:'window',size:{x:1.6,y:.08,z:2.1},material:m('glass')}
,{id:'door-80',name:'Porta interior 0,80×2,10',category:'Vãos',type:'door',size:{x:.8,y:.05,z:2.1},material:m('timber-c24')}
,{id:'door-double',name:'Porta dupla 1,60×2,10',category:'Vãos',type:'door',size:{x:1.6,y:.06,z:2.1},material:m('timber-c24')}
,{id:'door-security',name:'Porta entrada segurança',category:'Vãos',type:'door',size:{x:.95,y:.08,z:2.1},material:m('steel-s275')}
,{id:'skylight',name:'Janela de cobertura',category:'Vãos',type:'window',size:{x:.78,y:.08,z:.98},material:m('glass')}
,{id:'shutter',name:'Estore exterior',category:'Vãos',type:'equipment',size:{x:1.2,y:.06,z:1.2},material:m('aluminium')}
,{id:'roof-zinc',name:'Cobertura zinco',category:'Cobertura',type:'roof',size:{x:6,y:8,z:.08},material:m('zinc')}
,{id:'roof-timber',name:'Estrutura madeira cobertura',category:'Cobertura',type:'roof',size:{x:6,y:8,z:.2},material:m('timber-c24')}
,{id:'roof-insulation',name:'Isolamento cobertura 12 cm',category:'Cobertura',type:'roof',size:{x:6,y:8,z:.12},material:m('rockwool')}
,{id:'roof-membrane',name:'Membrana impermeabilização',category:'Cobertura',type:'roof',size:{x:6,y:8,z:.006},material:m('membrane')}
,{id:'ridge-tile',name:'Cumeeira',category:'Cobertura',type:'beam',size:{x:6,y:.18,z:.16},material:m('tile')}
,{id:'flashing',name:'Rufo metálico',category:'Cobertura',type:'beam',size:{x:4,y:.2,z:.02},material:m('zinc')}
,{id:'gutter-pvc',name:'Caleira PVC',category:'Drenagem',type:'gutter',size:{x:6,y:.14,z:.14},material:m('pvc')}
,{id:'downpipe90',name:'Tubo de queda Ø90',category:'Drenagem',type:'pipe',size:{x:.09,y:.09,z:3},material:m('pvc')}
,{id:'drain-channel',name:'Canal drenante',category:'Drenagem',type:'gutter',size:{x:2,y:.15,z:.12},material:m('conc-c30')}
,{id:'manhole',name:'Caixa de visita 60×60',category:'Drenagem',type:'fixture',size:{x:.6,y:.6,z:.8},material:m('conc-c30')}
,{id:'floor-xps',name:'Isolamento XPS 6 cm',category:'Acabamentos',type:'floor',size:{x:4,y:4,z:.06},material:m('xps')}
,{id:'floor-laminate',name:'Pavimento laminado',category:'Acabamentos',type:'floor',size:{x:4,y:4,z:.012},material:m('laminate')}
,{id:'floor-porcelain',name:'Pavimento porcelânico',category:'Acabamentos',type:'floor',size:{x:4,y:4,z:.012},material:m('porcelain')}
,{id:'ceiling-gypsum',name:'Teto falso gesso',category:'Acabamentos',type:'slab',size:{x:4,y:4,z:.05},material:m('gypsum')}
,{id:'wall-insulation',name:'Isolamento parede 8 cm',category:'Acabamentos',type:'wall',size:{x:4,y:.08,z:2.8},material:m('rockwool')}
,{id:'facade-etics',name:'Sistema ETICS 8 cm',category:'Fachadas',type:'wall',size:{x:4,y:.08,z:2.8},material:m('eps')}
,{id:'facade-stone',name:'Revestimento pedra fachada',category:'Fachadas',type:'wall',size:{x:4,y:.04,z:2.8},material:m('stone')}
,{id:'facade-wood',name:'Revestimento madeira fachada',category:'Fachadas',type:'wall',size:{x:4,y:.03,z:2.8},material:m('timber-c24')}
,{id:'facade-metal',name:'Revestimento metálico fachada',category:'Fachadas',type:'wall',size:{x:4,y:.03,z:2.8},material:m('aluminium')}
,{id:'kitchen-base',name:'Módulo cozinha inferior 60',category:'Mobiliário',type:'furniture',size:{x:.6,y:.6,z:.9},material:m('mdf')}
,{id:'kitchen-wall',name:'Módulo cozinha superior 60',category:'Mobiliário',type:'furniture',size:{x:.6,y:.35,z:.72},material:m('mdf')}
,{id:'fridge',name:'Frigorífico',category:'Mobiliário',type:'equipment',size:{x:.6,y:.65,z:1.85},material:m('stainless')}
,{id:'oven',name:'Forno',category:'Mobiliário',type:'equipment',size:{x:.6,y:.6,z:.6},material:m('stainless')}
,{id:'dishwasher',name:'Máquina lavar loiça',category:'Mobiliário',type:'equipment',size:{x:.6,y:.6,z:.85},material:m('stainless')}
,{id:'washer',name:'Máquina lavar roupa',category:'Mobiliário',type:'equipment',size:{x:.6,y:.6,z:.85},material:m('stainless')}
,{id:'desk',name:'Secretária',category:'Mobiliário',type:'furniture',size:{x:1.4,y:.7,z:.75},material:m('timber-c24')}
,{id:'chair',name:'Cadeira',category:'Mobiliário',type:'furniture',size:{x:.5,y:.5,z:.9},material:m('timber-c24')}
,{id:'wardrobe',name:'Roupeiro 3 portas',category:'Mobiliário',type:'furniture',size:{x:1.8,y:.62,z:2.35},material:m('mdf')}
,{id:'tv-unit',name:'Móvel TV',category:'Mobiliário',type:'furniture',size:{x:1.8,y:.45,z:.55},material:m('mdf')}
,{id:'bookshelf',name:'Estante',category:'Mobiliário',type:'furniture',size:{x:1.2,y:.35,z:2},material:m('mdf')}
,{id:'bidet',name:'Bidé',category:'Sanitários',type:'fixture',size:{x:.38,y:.6,z:.42},material:m('ceramic')}
,{id:'urinal',name:'Urinol',category:'Sanitários',type:'fixture',size:{x:.4,y:.35,z:.65},material:m('ceramic')}
,{id:'shower-rect',name:'Base duche 1,40×0,80',category:'Sanitários',type:'fixture',size:{x:1.4,y:.8,z:.06},material:m('ceramic')}
,{id:'shower-screen',name:'Resguardo de duche',category:'Sanitários',type:'fixture',size:{x:1.2,y:.02,z:2},material:m('glass')}
,{id:'vanity',name:'Móvel lavatório',category:'Sanitários',type:'furniture',size:{x:.8,y:.5,z:.85},material:m('mdf')}
,{id:'water-heater',name:'Termoacumulador',category:'Instalações',type:'equipment',size:{x:.55,y:.55,z:1.1},material:m('steel-s275')}
,{id:'heat-pump',name:'Bomba de calor',category:'Instalações',type:'equipment',size:{x:.9,y:.4,z:.7},material:m('aluminium')}
,{id:'ac-indoor',name:'Unidade interior AC',category:'Instalações',type:'equipment',size:{x:.9,y:.22,z:.3},material:m('aluminium')}
,{id:'ac-outdoor',name:'Unidade exterior AC',category:'Instalações',type:'equipment',size:{x:.8,y:.35,z:.55},material:m('aluminium')}
,{id:'radiator',name:'Radiador',category:'Instalações',type:'equipment',size:{x:1,y:.12,z:.6},material:m('steel-s275')}
,{id:'vent-grille',name:'Grelha ventilação',category:'Instalações',type:'fixture',size:{x:.4,y:.03,z:.2},material:m('aluminium')}
,{id:'elec-socket',name:'Tomada elétrica',category:'Instalações',type:'fixture',size:{x:.08,y:.03,z:.08},material:m('pvc')}
,{id:'elec-switch',name:'Interruptor',category:'Instalações',type:'fixture',size:{x:.08,y:.03,z:.08},material:m('pvc')}
,{id:'light-ceiling',name:'Luminária de teto',category:'Instalações',type:'fixture',size:{x:.35,y:.35,z:.08},material:m('aluminium')}
,{id:'cable-tray',name:'Esteira elétrica',category:'Instalações',type:'duct',size:{x:2,y:.2,z:.06},material:m('steel-s275')}
,{id:'gas-pipe',name:'Tubagem gás Ø20',category:'Instalações',type:'pipe',size:{x:.02,y:.02,z:3},material:m('copper')}
,{id:'water-pipe-copper',name:'Tubagem cobre Ø22',category:'Instalações',type:'pipe',size:{x:.022,y:.022,z:3},material:m('copper')}
,{id:'solar-thermal',name:'Coletor solar térmico',category:'Energia',type:'equipment',size:{x:2,y:1,z:.08},material:m('glass')}
,{id:'pv-panel',name:'Painel fotovoltaico',category:'Energia',type:'equipment',size:{x:1.72,y:1.13,z:.035},material:m('glass')}
,{id:'battery',name:'Bateria doméstica',category:'Energia',type:'equipment',size:{x:.75,y:.2,z:1.2},material:m('aluminium')}
,{id:'ev-charger',name:'Carregador veículo elétrico',category:'Energia',type:'equipment',size:{x:.25,y:.15,z:.4},material:m('pvc')}
,{id:'fence-metal',name:'Vedação metálica',category:'Exterior',type:'railing',size:{x:3,y:.05,z:1.8},material:m('steel-s275')}
,{id:'fence-wood',name:'Vedação madeira',category:'Exterior',type:'railing',size:{x:3,y:.06,z:1.5},material:m('timber-c24')}
,{id:'gate',name:'Portão exterior',category:'Exterior',type:'door',size:{x:3,y:.08,z:1.8},material:m('steel-s275')}
,{id:'paving',name:'Pavimento exterior pavê',category:'Exterior',type:'floor',size:{x:4,y:4,z:.08},material:m('paver')}
,{id:'asphalt-road',name:'Pavimento betuminoso',category:'Exterior',type:'floor',size:{x:6,y:4,z:.08},material:m('asphalt')}
,{id:'gravel-bed',name:'Camada de brita',category:'Exterior',type:'floor',size:{x:4,y:4,z:.15},material:m('gravel')}
,{id:'grass-area',name:'Área relvada',category:'Exterior',type:'floor',size:{x:4,y:4,z:.05},material:m('grass')}
,{id:'retaining-gabion',name:'Gabião',category:'Exterior',type:'wall',size:{x:2,y:1,z:1},material:m('stone')}
,{id:'pergola',name:'Pérgola',category:'Exterior',type:'furniture',size:{x:4,y:3,z:2.5},material:m('timber-c24')}
,{id:'bench',name:'Banco exterior',category:'Exterior',type:'furniture',size:{x:1.8,y:.55,z:.8},material:m('timber-c24')}
,{id:'bollard',name:'Pilarete exterior',category:'Exterior',type:'fixture',size:{x:.15,y:.15,z:.9},material:m('steel-s275')}
,{id:'lamp-post',name:'Candeeiro exterior',category:'Exterior',type:'equipment',size:{x:.18,y:.18,z:3.5},material:m('steel-s275')}
,{id:'pool-small',name:'Piscina 6×3',category:'Exterior',type:'pool',size:{x:6,y:3,z:1.4},material:m('water')}
,{id:'pool-equipment',name:'Casa máquinas piscina',category:'Exterior',type:'equipment',size:{x:1.2,y:.8,z:1},material:m('pvc')}
,{id:'tree-small',name:'Árvore pequena',category:'Paisagismo',type:'landscape',size:{x:.8,y:.8,z:2.5},material:m('soil')}
,{id:'shrub',name:'Arbusto',category:'Paisagismo',type:'landscape',size:{x:.8,y:.8,z:1},material:m('grass')}
,{id:'planter',name:'Floreira',category:'Paisagismo',type:'fixture',size:{x:1.2,y:.5,z:.5},material:m('stone')}
,{id:'pile40',name:'Estaca Ø40 cm',category:'Fundações',type:'column',size:{x:.4,y:.4,z:8},material:m('conc-c30')}
,{id:'pile60',name:'Estaca Ø60 cm',category:'Fundações',type:'column',size:{x:.6,y:.6,z:10},material:m('conc-c30')}
,{id:'pilecap-2',name:'Maciço 2 estacas',category:'Fundações',type:'footing',size:{x:2.2,y:1.1,z:.7},material:m('conc-c30')}
,{id:'pilecap-4',name:'Maciço 4 estacas',category:'Fundações',type:'footing',size:{x:2.4,y:2.4,z:.8},material:m('conc-c30')}
,{id:'gradebeam',name:'Viga de fundação 30×50',category:'Fundações',type:'beam',size:{x:5,y:.3,z:.5},material:m('conc-c30')}
,{id:'lean-concrete',name:'Betão de limpeza 10 cm',category:'Fundações',type:'slab',size:{x:4,y:4,z:.1},material:m('conc-c30')}
,{id:'steel-hea200',name:'Pilar HEA 200',category:'Estrutura metálica',type:'column',size:{x:.2,y:.2,z:3},material:m('steel-s275')}
,{id:'steel-hea300',name:'Pilar HEA 300',category:'Estrutura metálica',type:'column',size:{x:.3,y:.3,z:3},material:m('steel-s275')}
,{id:'steel-ipe200',name:'Viga IPE 200',category:'Estrutura metálica',type:'beam',size:{x:5,y:.1,z:.2},material:m('steel-s275')}
,{id:'steel-ipe300',name:'Viga IPE 300',category:'Estrutura metálica',type:'beam',size:{x:6,y:.15,z:.3},material:m('steel-s275')}
,{id:'steel-hss',name:'Perfil tubular 120×120',category:'Estrutura metálica',type:'beam',size:{x:4,y:.12,z:.12},material:m('steel-s275')}
,{id:'steel-angle',name:'Cantoneira L 80×80',category:'Estrutura metálica',type:'beam',size:{x:3,y:.08,z:.08},material:m('steel-s275')}
,{id:'steel-baseplate',name:'Chapa base 400×400',category:'Estrutura metálica',type:'slab',size:{x:.4,y:.4,z:.025},material:m('steel-s275')}
,{id:'precast-panel',name:'Painel pré-fabricado betão',category:'Pré-fabricados',type:'wall',size:{x:4,y:.16,z:2.8},material:m('conc-c30')}
,{id:'precast-stair',name:'Lanço escada pré-fabricado',category:'Pré-fabricados',type:'stair',size:{x:3,y:1.2,z:1.6},material:m('conc-c30')}
,{id:'precast-beam',name:'Viga pré-fabricada',category:'Pré-fabricados',type:'beam',size:{x:6,y:.35,z:.65},material:m('conc-c30')}
,{id:'precast-column',name:'Pilar pré-fabricado 40×40',category:'Pré-fabricados',type:'column',size:{x:.4,y:.4,z:4},material:m('conc-c30')}
,{id:'lsf-stud70',name:'Montante LSF 70',category:'LSF',type:'column',size:{x:.07,y:.04,z:2.8},material:m('lsf-z275')}
,{id:'lsf-stud100',name:'Montante LSF 100',category:'LSF',type:'column',size:{x:.1,y:.04,z:2.8},material:m('lsf-z275')}
,{id:'lsf-track100',name:'Guia LSF 100',category:'LSF',type:'beam',size:{x:3,y:.1,z:.04},material:m('lsf-z275')}
,{id:'osb-board18',name:'Placa OSB 18 mm',category:'LSF',type:'wall',size:{x:2.5,y:.018,z:1.25},material:m('osb')}
,{id:'gypsum-board13',name:'Placa gesso 13 mm',category:'Divisórias',type:'wall',size:{x:2.6,y:.013,z:1.2},material:m('gypsum')}
,{id:'fireboard15',name:'Placa RF 15 mm',category:'Divisórias',type:'wall',size:{x:2.6,y:.015,z:1.2},material:m('fireboard')}
,{id:'acoustic-wall',name:'Parede acústica dupla',category:'Divisórias',type:'wall',size:{x:4,y:.15,z:2.8},material:m('acoustic')}
,{id:'raised-floor',name:'Pavimento técnico elevado',category:'Acabamentos',type:'floor',size:{x:4,y:4,z:.15},material:m('composite')}
,{id:'epoxy-floor',name:'Pavimento epóxi',category:'Acabamentos',type:'floor',size:{x:4,y:4,z:.006},material:m('epoxy')}
,{id:'rubber-floor',name:'Pavimento borracha',category:'Acabamentos',type:'floor',size:{x:4,y:4,z:.008},material:m('rubber')}
,{id:'cork-floor',name:'Pavimento cortiça',category:'Acabamentos',type:'floor',size:{x:4,y:4,z:.012},material:m('cork')}
,{id:'marble-floor',name:'Pavimento mármore',category:'Acabamentos',type:'floor',size:{x:4,y:4,z:.02},material:m('marble')}
,{id:'granite-floor',name:'Pavimento granito',category:'Acabamentos',type:'floor',size:{x:4,y:4,z:.03},material:m('granite')}
,{id:'acoustic-ceiling',name:'Teto acústico modular',category:'Tetos',type:'slab',size:{x:4,y:4,z:.04},material:m('acoustic')}
,{id:'metal-ceiling',name:'Teto metálico',category:'Tetos',type:'slab',size:{x:4,y:4,z:.03},material:m('aluminium')}
,{id:'wood-slat-ceiling',name:'Teto ripado madeira',category:'Tetos',type:'slab',size:{x:4,y:4,z:.05},material:m('timber-c24')}
,{id:'door-fire60',name:'Porta corta-fogo EI60',category:'Segurança contra incêndio',type:'door',size:{x:.9,y:.08,z:2.1},material:m('firesteel')}
,{id:'door-fire120',name:'Porta corta-fogo EI120',category:'Segurança contra incêndio',type:'door',size:{x:1.1,y:.1,z:2.1},material:m('firesteel')}
,{id:'extinguisher',name:'Extintor 6 kg',category:'Segurança contra incêndio',type:'equipment',size:{x:.18,y:.18,z:.55},material:m('firesteel')}
,{id:'firehose',name:'Carretel incêndio',category:'Segurança contra incêndio',type:'equipment',size:{x:.7,y:.2,z:.7},material:m('firesteel')}
,{id:'sprinkler',name:'Sprinkler',category:'Segurança contra incêndio',type:'fixture',size:{x:.08,y:.08,z:.06},material:m('brass')}
,{id:'smoke-detector',name:'Detetor de fumo',category:'Segurança contra incêndio',type:'fixture',size:{x:.12,y:.12,z:.05},material:m('pvc')}
,{id:'fire-alarm',name:'Botoneira de alarme',category:'Segurança contra incêndio',type:'fixture',size:{x:.1,y:.04,z:.1},material:m('pvc')}
,{id:'exit-sign',name:'Sinal saída emergência',category:'Segurança contra incêndio',type:'fixture',size:{x:.35,y:.03,z:.15},material:m('pvc')}
,{id:'ramp-access',name:'Rampa acessível 6%',category:'Acessibilidade',type:'stair',size:{x:5,y:1.5,z:.3},material:m('conc-c30')}
,{id:'handrail-access',name:'Corrimão duplo acessível',category:'Acessibilidade',type:'railing',size:{x:3,y:.08,z:.9},material:m('stainless')}
,{id:'wc-access',name:'Sanita acessível',category:'Acessibilidade',type:'fixture',size:{x:.4,y:.7,z:.48},material:m('ceramic')}
,{id:'basin-access',name:'Lavatório acessível',category:'Acessibilidade',type:'fixture',size:{x:.65,y:.55,z:.82},material:m('ceramic')}
,{id:'grabbar-straight',name:'Barra apoio reta',category:'Acessibilidade',type:'fixture',size:{x:.7,y:.04,z:.04},material:m('stainless')}
,{id:'grabbar-fold',name:'Barra apoio rebatível',category:'Acessibilidade',type:'fixture',size:{x:.75,y:.06,z:.12},material:m('stainless')}
,{id:'elevator-8p',name:'Elevador 8 pessoas',category:'Mobilidade vertical',type:'equipment',size:{x:1.6,y:1.8,z:2.3},material:m('stainless')}
,{id:'lift-shaft',name:'Caixa de elevador',category:'Mobilidade vertical',type:'wall',size:{x:2.1,y:2.1,z:3},material:m('conc-c30')}
,{id:'platform-lift',name:'Plataforma elevatória',category:'Mobilidade vertical',type:'equipment',size:{x:1.1,y:1.4,z:.15},material:m('stainless')}
,{id:'escalator',name:'Escada rolante',category:'Mobilidade vertical',type:'equipment',size:{x:6,y:1.2,z:3.2},material:m('steel-s275')}
,{id:'kitchen-sink',name:'Lava-loiça 1 cuba',category:'Cozinha',type:'fixture',size:{x:.6,y:.5,z:.2},material:m('stainless')}
,{id:'kitchen-sink2',name:'Lava-loiça 2 cubas',category:'Cozinha',type:'fixture',size:{x:.8,y:.5,z:.2},material:m('stainless')}
,{id:'cooktop',name:'Placa indução 60',category:'Cozinha',type:'equipment',size:{x:.6,y:.52,z:.05},material:m('glass')}
,{id:'hood',name:'Exaustor 90',category:'Cozinha',type:'equipment',size:{x:.9,y:.5,z:.4},material:m('stainless')}
,{id:'microwave',name:'Micro-ondas encastre',category:'Cozinha',type:'equipment',size:{x:.6,y:.4,z:.4},material:m('stainless')}
,{id:'winecooler',name:'Garrafeira climatizada',category:'Cozinha',type:'equipment',size:{x:.6,y:.6,z:.85},material:m('glass')}
,{id:'pantry-tall',name:'Armário despenseiro',category:'Cozinha',type:'furniture',size:{x:.6,y:.6,z:2.2},material:m('mdf')}
,{id:'office-desk2',name:'Secretária dupla',category:'Escritório',type:'furniture',size:{x:1.6,y:1.4,z:.75},material:m('mdf')}
,{id:'office-chair',name:'Cadeira escritório',category:'Escritório',type:'furniture',size:{x:.65,y:.65,z:1.05},material:m('fabric')}
,{id:'meeting-table',name:'Mesa reunião 8 pessoas',category:'Escritório',type:'furniture',size:{x:2.4,y:1.1,z:.75},material:m('mdf')}
,{id:'filing-cabinet',name:'Arquivo metálico',category:'Escritório',type:'furniture',size:{x:.9,y:.45,z:1.9},material:m('steel-s275')}
,{id:'reception-desk',name:'Balcão receção',category:'Comercial',type:'furniture',size:{x:2.2,y:.75,z:1.1},material:m('mdf')}
,{id:'shelf-retail',name:'Estante comercial',category:'Comercial',type:'furniture',size:{x:1,y:.5,z:2.1},material:m('steel-s275')}
,{id:'display-case',name:'Vitrine',category:'Comercial',type:'furniture',size:{x:1.5,y:.5,z:1.2},material:m('glass')}
,{id:'checkout',name:'Balcão caixa',category:'Comercial',type:'furniture',size:{x:1.6,y:.75,z:.95},material:m('mdf')}
,{id:'server-rack',name:'Rack 42U',category:'IT / Telecom',type:'equipment',size:{x:.6,y:1,z:2},material:m('steel-s275')}
,{id:'wifi-ap',name:'Access Point Wi-Fi',category:'IT / Telecom',type:'equipment',size:{x:.2,y:.2,z:.05},material:m('pvc')}
,{id:'data-socket',name:'Tomada RJ45',category:'IT / Telecom',type:'fixture',size:{x:.08,y:.03,z:.08},material:m('pvc')}
,{id:'fiber-box',name:'Caixa fibra ótica',category:'IT / Telecom',type:'equipment',size:{x:.25,y:.1,z:.2},material:m('pvc')}
,{id:'cctv-dome',name:'Câmara CCTV dome',category:'Segurança',type:'equipment',size:{x:.14,y:.14,z:.1},material:m('pvc')}
,{id:'cctv-bullet',name:'Câmara CCTV bullet',category:'Segurança',type:'equipment',size:{x:.25,y:.1,z:.1},material:m('aluminium')}
,{id:'access-reader',name:'Leitor controlo acesso',category:'Segurança',type:'equipment',size:{x:.08,y:.04,z:.14},material:m('pvc')}
,{id:'alarm-siren',name:'Sirene alarme',category:'Segurança',type:'equipment',size:{x:.18,y:.08,z:.22},material:m('pvc')}
,{id:'boiler-wall',name:'Caldeira mural',category:'AVAC',type:'equipment',size:{x:.45,y:.3,z:.75},material:m('steel-s275')}
,{id:'fan-coil',name:'Ventiloconvector',category:'AVAC',type:'equipment',size:{x:.9,y:.25,z:.25},material:m('aluminium')}
,{id:'ahu',name:'Unidade tratamento ar',category:'AVAC',type:'equipment',size:{x:2.2,y:1,z:1.2},material:m('aluminium')}
,{id:'vrf-outdoor',name:'Unidade VRF exterior',category:'AVAC',type:'equipment',size:{x:1.3,y:.8,z:1.6},material:m('aluminium')}
,{id:'duct-round200',name:'Conduta circular Ø200',category:'AVAC',type:'duct',size:{x:2,y:.2,z:.2},material:m('lsf-z275')}
,{id:'duct-rect600',name:'Conduta 600×300',category:'AVAC',type:'duct',size:{x:2,y:.6,z:.3},material:m('lsf-z275')}
,{id:'diffuser4way',name:'Difusor 4 vias',category:'AVAC',type:'fixture',size:{x:.6,y:.6,z:.08},material:m('aluminium')}
,{id:'extract-fan',name:'Extrator sanitário',category:'AVAC',type:'equipment',size:{x:.2,y:.15,z:.2},material:m('pvc')}
,{id:'water-meter',name:'Contador água',category:'Redes hidráulicas',type:'equipment',size:{x:.25,y:.12,z:.12},material:m('brass')}
,{id:'pressure-pump',name:'Grupo pressão',category:'Redes hidráulicas',type:'equipment',size:{x:1.2,y:.7,z:1},material:m('steel-s275')}
,{id:'water-tank',name:'Depósito água 1000 L',category:'Redes hidráulicas',type:'equipment',size:{x:1.1,y:1.1,z:1.2},material:m('hdpe')}
,{id:'grease-trap',name:'Separador gorduras',category:'Redes hidráulicas',type:'equipment',size:{x:1,y:.8,z:.8},material:m('pp')}
,{id:'septic-tank',name:'Fossa séptica',category:'Redes hidráulicas',type:'equipment',size:{x:2.5,y:1.5,z:1.5},material:m('hdpe')}
,{id:'inspection-chamber',name:'Caixa inspeção 40×40',category:'Redes hidráulicas',type:'fixture',size:{x:.4,y:.4,z:.5},material:m('conc-c30')}
,{id:'electrical-cabinet',name:'Armário elétrico exterior',category:'Elétrica',type:'equipment',size:{x:.8,y:.3,z:1.2},material:m('steel-s275')}
,{id:'transformer',name:'Transformador compacto',category:'Elétrica',type:'equipment',size:{x:1.6,y:1,z:1.5},material:m('steel-s275')}
,{id:'ups',name:'UPS',category:'Elétrica',type:'equipment',size:{x:.6,y:.8,z:1.2},material:m('steel-s275')}
,{id:'generator',name:'Gerador',category:'Elétrica',type:'equipment',size:{x:2.2,y:1,z:1.4},material:m('steel-s275')}
,{id:'street-cabinet',name:'Armário telecom exterior',category:'Infraestruturas',type:'equipment',size:{x:.8,y:.4,z:1.2},material:m('steel-s275')}
,{id:'concrete-pipe600',name:'Coletor betão Ø600',category:'Infraestruturas',type:'pipe',size:{x:.6,y:.6,z:3},material:m('conc-c30')}
,{id:'hdpe-pipe160',name:'Tubagem PEAD Ø160',category:'Infraestruturas',type:'pipe',size:{x:.16,y:.16,z:3},material:m('hdpe')}
,{id:'curb',name:'Lancil betão',category:'Infraestruturas',type:'beam',size:{x:2,y:.15,z:.25},material:m('conc-c30')}
,{id:'sidewalk-slab',name:'Passeio lajetas',category:'Infraestruturas',type:'floor',size:{x:3,y:2,z:.08},material:m('paver')}
,{id:'road-barrier',name:'Guarda metálica rodoviária',category:'Infraestruturas',type:'railing',size:{x:4,y:.15,z:.75},material:m('steel-s275')}
,{id:'road-sign',name:'Sinal trânsito',category:'Infraestruturas',type:'equipment',size:{x:.6,y:.08,z:2.4},material:m('aluminium')}
,{id:'parking-space',name:'Lugar estacionamento',category:'Exterior',type:'floor',size:{x:5,y:2.5,z:.01},material:m('asphalt')}
,{id:'bike-rack',name:'Suporte bicicletas',category:'Exterior',type:'fixture',size:{x:1.2,y:.5,z:.6},material:m('steel-s275')}
,{id:'trash-bin',name:'Papeleira exterior',category:'Exterior',type:'fixture',size:{x:.45,y:.45,z:.9},material:m('steel-s275')}
,{id:'bus-shelter',name:'Abrigo paragem',category:'Exterior',type:'furniture',size:{x:3.5,y:1.4,z:2.4},material:m('glass')}
,{id:'playground',name:'Equipamento infantil',category:'Exterior',type:'equipment',size:{x:3,y:2,z:2.2},material:m('composite')}
,{id:'gym-outdoor',name:'Equipamento fitness exterior',category:'Exterior',type:'equipment',size:{x:1.5,y:1,z:1.8},material:m('steel-s275')}
,{id:'construction-container',name:'Contentor de obra',category:'Equipamento de obra',type:'equipment',size:{x:6.06,y:2.44,z:2.59},material:m('steel-s275')}
,{id:'scaffold',name:'Andaime modular',category:'Equipamento de obra',type:'equipment',size:{x:3,y:1,z:4},material:m('steel-s275')}
,{id:'site-fence',name:'Vedação provisória obra',category:'Equipamento de obra',type:'railing',size:{x:3.5,y:.05,z:2},material:m('steel-s275')}
,{id:'portable-toilet',name:'WC portátil',category:'Equipamento de obra',type:'equipment',size:{x:1.1,y:1.1,z:2.3},material:m('hdpe')}
,{id:'pallet-bricks',name:'Palete tijolos',category:'Equipamento de obra',type:'equipment',size:{x:1.2,y:.8,z:1},material:m('brick')}
,{id:'bigbag',name:'Big bag agregado',category:'Equipamento de obra',type:'equipment',size:{x:.9,y:.9,z:1.1},material:m('fabric')}
,{id:'skip',name:'Contentor entulho',category:'Equipamento de obra',type:'equipment',size:{x:3.5,y:1.8,z:1.4},material:m('steel-s275')}

,{id:'door-double-glass',name:'Porta dupla envidraçada',category:'Portas e janelas',type:'door',size:{x:1.8,y:.12,z:2.1},material:m('glass')}
,{id:'window-3leaf',name:'Janela 3 folhas',category:'Portas e janelas',type:'window',size:{x:2.4,y:.12,z:1.35},material:m('aluminium')}
,{id:'window-bath',name:'Janela WC basculante',category:'Portas e janelas',type:'window',size:{x:.8,y:.12,z:.6},material:m('aluminium')}
,{id:'kitchen-island',name:'Ilha de cozinha',category:'Cozinha',type:'furniture',size:{x:2.2,y:.9,z:.92},material:m('mdf')}
,{id:'kitchen-tall-unit',name:'Módulo coluna cozinha',category:'Cozinha',type:'furniture',size:{x:.6,y:.62,z:2.2},material:m('mdf')}
,{id:'fridge-combi',name:'Frigorífico combinado',category:'Cozinha',type:'equipment',size:{x:.6,y:.68,z:2},material:m('stainless')}
,{id:'washer',name:'Máquina de lavar roupa',category:'Equipamento',type:'equipment',size:{x:.6,y:.62,z:.85},material:m('stainless')}
,{id:'dryer',name:'Máquina de secar roupa',category:'Equipamento',type:'equipment',size:{x:.6,y:.62,z:.85},material:m('stainless')}
,{id:'sofa-corner',name:'Sofá de canto',category:'Mobiliário',type:'furniture',size:{x:2.8,y:1.8,z:.82},material:m('fabric')}
,{id:'dining-table-6',name:'Mesa jantar 6 lugares',category:'Mobiliário',type:'furniture',size:{x:1.8,y:.9,z:.76},material:m('timber-c24')}
,{id:'office-desk-l',name:'Secretária em L',category:'Mobiliário',type:'furniture',size:{x:1.8,y:1.5,z:.75},material:m('mdf')}
,{id:'wardrobe-sliding',name:'Roupeiro portas correr',category:'Mobiliário',type:'furniture',size:{x:2.4,y:.65,z:2.4},material:m('mdf')}
,{id:'shower-walkin',name:'Duche walk-in',category:'Sanitários',type:'fixture',size:{x:1.4,y:.9,z:2.1},material:m('glass')}
,{id:'vanity-double',name:'Móvel lavatório duplo',category:'Sanitários',type:'fixture',size:{x:1.4,y:.55,z:.9},material:m('ceramic')}
,{id:'heatpump-outdoor',name:'Unidade exterior bomba calor',category:'AVAC',type:'equipment',size:{x:1.05,y:.42,z:.85},material:m('steel-s275')}
,{id:'fan-coil',name:'Ventiloconvector',category:'AVAC',type:'equipment',size:{x:1,y:.25,z:.55},material:m('steel-s275')}
,{id:'ev-charger',name:'Carregador veículo elétrico',category:'Eletricidade',type:'equipment',size:{x:.3,y:.18,z:.5},material:m('plastic')}
,{id:'switchboard-home',name:'Quadro elétrico habitação',category:'Eletricidade',type:'equipment',size:{x:.5,y:.16,z:.7},material:m('plastic')}
,{id:'bollard-light',name:'Balizador exterior',category:'Exterior',type:'equipment',size:{x:.16,y:.16,z:.8},material:m('steel-s275')}
,{id:'bench-park',name:'Banco exterior',category:'Exterior',type:'furniture',size:{x:1.8,y:.6,z:.85},material:m('timber-c24')}


]
export function createFromLibrary(item:LibraryItem,index:number):StudioElement{return{id:`LIB-${item.id}-${index}`,name:item.name,type:item.type,category:item.category,level:'Piso 0',position:{x:0,y:0,z:item.size.z/2},rotation:{x:0,y:0,z:0},size:{...item.size},material:item.material,source:'Biblioteca RJP_3D Studio',properties:{libraryId:item.id},results:undefined}}
