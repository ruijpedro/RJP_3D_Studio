import * as THREE from 'three'
import type {StudioElement} from './types'

const col=(t?:string)=>({concrete:0xb8c0c8,steel:0x8a9aa8,wood:0xa47747,galvanized:0xb7c4cf,brick:0xb15c43,block:0x9ca3a8,glass:0x76c5e8,tile:0xb65a42,sandwich:0x8da3b3,plaster:0xe7e1d5,ceramic:0xe8e8e8,insulation:0xe9d87a,stone:0x8d8173,gypsum:0xe7e4dc,pvc:0xd8d8d8,aluminium:0xaeb9c2,soil:0x6b5b43,fabric:0x73889c,rubber:0x42484d,paint:0xd8dde4}[t||'']||0x7aa8d6)

function mat(e:StudioElement,visualMode:'Shaded'|'Edges'|'XRay',override?:number){
 const phase=String(e.properties.phase||'Novo'),hosted=Boolean(e.properties.hostWallId)
 const alpha=visualMode==='XRay' ? .28 : ((e.type==='window'||e.type==='pool') ? .55 : (phase==='Existente' ? .72 : 1))
 const m=new THREE.MeshStandardMaterial({color:override??(phase==='Demolir'?0xcf6b6b:phase==='Existente'?0xa3acb5:col(e.material.texture)),roughness:.58,metalness:e.material.family.includes('Aço') ? .35 : .04,transparent:alpha<1,opacity:alpha,emissive:hosted?0x123b36:0,emissiveIntensity:hosted ? .3 : 0})
 if(visualMode==='Edges')m.wireframe=true
 return m
}
function mesh(g:THREE.BufferGeometry,m:THREE.Material,x=0,y=0,z=0){const o=new THREE.Mesh(g,m);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;return o}
function box(x:number,y:number,z:number,m:THREE.Material,px=0,py=0,pz=0){return mesh(new THREE.BoxGeometry(Math.max(.015,x),Math.max(.015,y),Math.max(.015,z)),m,px,py,pz)}
function cyl(r:number,h:number,m:THREE.Material,px=0,py=0,pz=0,rotX=0){const o=mesh(new THREE.CylinderGeometry(Math.max(.01,r),Math.max(.01,r),Math.max(.015,h),18),m,px,py,pz);o.rotation.x=rotX;return o}
function torus(R:number,r:number,m:THREE.Material,px=0,py=0,pz=0,rx=0,ry=0,rz=0){const o=mesh(new THREE.TorusGeometry(Math.max(.02,R),Math.max(.008,r),10,28),m,px,py,pz);o.rotation.set(rx,ry,rz);return o}
function sphere(r:number,m:THREE.Material,px=0,py=0,pz=0){return mesh(new THREE.SphereGeometry(Math.max(.02,r),18,12),m,px,py,pz)}
function wheel(r:number,m:THREE.Material,px:number,py:number,pz:number){const o=cyl(r,r*.32,m,px,py,pz,Math.PI/2);return o}

export function createElementObject(e:StudioElement,visualMode:'Shaded'|'Edges'|'XRay'='Shaded'){
 const g=new THREE.Group(),w=Math.max(.03,e.size.x),d=Math.max(.03,e.size.y),h=Math.max(.03,e.size.z),M=mat(e,visualMode),dark=mat(e,visualMode,0x3f4e58),glass=mat(e,visualMode,0x72c7e8),white=mat(e,visualMode,0xe7ecef),green=mat(e,visualMode,0x5b8058),brown=mat(e,visualMode,0x76563a)
 const name=e.name.toLowerCase(),cat=e.category.toLowerCase()
 const add=(o:THREE.Object3D)=>g.add(o)
 switch(e.type){
  case 'column': add(box(w,d,h,M)); if(name.includes('hea')||name.includes('ipe')){add(box(w*1.15,d*.22,h,dark));add(box(w*1.15,d*.22,h,dark,0,d*.38,0))} break
  case 'beam': add(box(w,d,h,M)); if(name.includes('ipe')||name.includes('hea')){add(box(w,d,h*.18,dark,0,0,h*.41));add(box(w,d,h*.18,dark,0,0,-h*.41))} break
  case 'wall': add(box(w,d,h,M)); break
  case 'slab': case 'floor': add(box(w,d,h,M)); break
  case 'footing': add(box(w,d,h,M)); add(box(w*.45,d*.45,h*.8,M,0,0,h*.65)); break
  case 'window': {const f=Math.max(.035,Math.min(w,h)*.07);add(box(w,f,h,dark));add(box(w-f*2,d*.7,h-f*2,glass));add(box(f,d*.78,h,dark,-w/2+f/2));add(box(f,d*.78,h,dark,w/2-f/2));add(box(w,d*.78,f,dark,0,0,h/2-f/2));add(box(w,d*.78,f,dark,0,0,-h/2+f/2));if(w>1.3)add(box(f,d*.8,h,dark))} break
  case 'door': {const f=Math.max(.035,w*.045);add(box(w,d,h,M));add(box(f,d*1.3,h,dark,-w/2+f/2));add(box(f,d*1.3,h,dark,w/2-f/2));add(box(w,d*1.3,f,dark,0,0,h/2-f/2));add(cyl(Math.max(.018,w*.025),d*1.6,dark,w*.32,-d*.2,0,Math.PI/2))} break
  case 'pipe': case 'gutter': {const r=Math.max(.02,Math.min(w,d,h)*.42);const L=Math.max(w,d,h);const o=cyl(r,L,M);if(L===w)o.rotation.z=Math.PI/2;else if(L===d)o.rotation.x=Math.PI/2;add(o)} break
  case 'duct': add(box(w,d,h,M));add(box(w*.9,d*.9,Math.max(.018,h*.08),dark,0,0,h*.5)); break
  case 'stair': {const n=Math.max(4,Math.min(14,Math.round(w/.28)));for(let i=0;i<n;i++){const sx=w/n,sh=h*(i+1)/n;add(box(sx,d,sh,M,-w/2+sx*(i+.5),0,-h/2+sh/2))}} break
  case 'railing': {add(cyl(.025,h,dark,-w/2,0,0));add(cyl(.025,h,dark,w/2,0,0));add(box(w,.035,.04,dark,0,0,h/2));for(let x=-w*.35;x<=w*.35;x+=Math.max(.25,w/5))add(cyl(.018,h*.8,dark,x,0,-h*.1))} break
  case 'roof': {const shape=new THREE.BufferGeometry();const verts=new Float32Array([-w/2,-d/2,-h/2,w/2,-d/2,-h/2,-w/2,d/2,-h/2,w/2,d/2,-h/2,0,-d/2,h/2,0,d/2,h/2]);shape.setAttribute('position',new THREE.BufferAttribute(verts,3));shape.setIndex([0,1,4,2,5,3,2,0,4,2,4,5,1,3,5,1,5,4,0,2,3,0,3,1]);shape.computeVertexNormals();add(mesh(shape,M))} break
  case 'pool': add(box(w,d,h,M));add(box(w*.9,d*.9,h*.18,glass,0,0,h*.42)); break
  case 'landscape': {if(name.includes('árvore')||name.includes('arvore')||name.includes('tree')){add(cyl(Math.max(.04,w*.1),h*.45,brown,0,0,-h*.27));const crown=mesh(new THREE.SphereGeometry(Math.max(w,d)*.42,18,12),green,0,0,h*.12);crown.scale.z=1.25;add(crown)}else add(box(w,d,h,M))} break
  case 'fixture': {
   if(/sanita|toilet|wc/.test(name)){add(box(w*.72,d*.42,h*.32,white,0,d*.22,-h*.28));add(torus(w*.25,w*.055,white,0,-d*.10,-h*.05,Math.PI/2));add(box(w*.60,d*.20,h*.40,white,0,d*.36,h*.15))}
   else if(/bid[eé]/.test(name)){add(torus(w*.25,w*.055,white,0,0,-h*.12,Math.PI/2));add(cyl(.025,h*.35,dark,0,d*.15,h*.14))}
   else if(/urin|mict/.test(name)){add(box(w*.55,d*.35,h*.62,white,0,0,0));add(torus(w*.18,w*.045,white,0,-d*.18,-h*.13,Math.PI/2))}
   else if(/banheira|bath/.test(name)){add(box(w,d,h*.24,white,0,0,-h*.30));add(box(w*.88,d*.82,h*.18,mat(e,visualMode,0xb8d9e7),0,0,-h*.18));add(cyl(.018,h*.42,dark,w*.36,d*.32,h*.05))}
   else if(/lavat|washbasin|lavabo/.test(name)){add(box(w,d*.72,h*.16,white,0,0,h*.18));add(box(w*.68,d*.46,h*.07,mat(e,visualMode,0xbad9e8),0,-d*.04,h*.26));add(cyl(.018,h*.35,dark,0,d*.18,h*.38))}
   else if(/duche|shower/.test(name)){add(box(w,d,.045,white,0,0,-h/2));add(cyl(.018,h*.82,dark,w*.35,d*.35,-h*.05));add(cyl(.085,.025,dark,w*.35,d*.35,h*.36,Math.PI/2));add(box(.02,d*.88,h*.8,glass,w*.46,0,0))}
   else if(/lava.?lou[cç]a|sink/.test(name)){add(box(w,d*.72,h*.16,white,0,0,h*.12));add(box(w*.58,d*.46,h*.08,mat(e,visualMode,0xa8c9d9),0,0,h*.20));add(cyl(.018,h*.32,dark,0,d*.16,h*.35))}
   else if(/caixa de visita|manhole/.test(name)){add(cyl(Math.min(w,d)*.48,h,M));add(cyl(Math.min(w,d)*.40,h*.05,dark,0,0,h*.51))}
   else if(/tomada|interruptor/.test(name)){add(box(w,d,h,white));add(box(w*.28,d*1.15,h*.28,dark,-w*.18,0,0));add(box(w*.28,d*1.15,h*.28,dark,w*.18,0,0))}
   else if(/grelha ventil/.test(name)){add(box(w,d,h,dark));for(let x=-w*.36;x<=w*.36;x+=Math.max(.025,w*.15))add(box(.012,d*1.1,h*.72,white,x,0,0))}
   else if(/luminária|luminaria/.test(name)){add(cyl(Math.min(w,d)*.48,h,white));add(cyl(Math.min(w,d)*.35,h*.25,mat(e,visualMode,0xfff2bd),0,0,-h*.35))}
   else if(/floreira|planter/.test(name)){add(box(w,d,h,M));add(box(w*.82,d*.72,h*.55,mat(e,visualMode,0x49382b),0,0,h*.12));for(const x of [-.25,0,.25])add(sphere(Math.min(w,d)*.18,green,x*w,0,h*.55))}
   else if(/pilarete|bollard/.test(name)){add(cyl(Math.min(w,d)*.42,h,dark));add(cyl(Math.min(w,d)*.48,h*.08,white,0,0,h*.48))}
   else add(box(w,d,h,M)); break
  }
  case 'furniture': {
   if(/cadeira|chair/.test(name)){add(box(w*.80,d*.78,h*.09,M,0,0,-h*.12));add(box(w*.80,d*.08,h*.56,M,0,d*.35,h*.20));for(const x of [-1,1])for(const y of [-1,1])add(cyl(.022,h*.40,dark,x*w*.30,y*d*.30,-h*.31))}
   else if(/mesa|table|secretária|secretaria|desk/.test(name)){add(box(w,d,h*.11,M,0,0,h*.34));for(const x of [-1,1])for(const y of [-1,1])add(cyl(.032,h*.70,dark,x*w*.40,y*d*.40,-h*.07));if(/secret/.test(name))add(box(w*.32,d*.22,h*.20,dark,w*.28,0,h*.18))}
   else if(/sofá|sofa/.test(name)){add(box(w,d*.72,h*.34,M,0,0,-h*.20));add(box(w,d*.16,h*.56,M,0,d*.38,h*.08));add(box(w*.12,d*.72,h*.43,M,-w*.44,0,-h*.04));add(box(w*.12,d*.72,h*.43,M,w*.44,0,-h*.04));for(let x=-w*.28;x<=w*.28;x+=Math.max(.35,w*.38))add(box(w*.30,d*.52,h*.09,white,x,-d*.02,-h*.04))}
   else if(/cama|bed/.test(name)){add(box(w,d,h*.18,M,0,0,-h*.28));add(box(w,d*.07,h*.62,M,0,d*.46,h*.05));add(box(w*.42,d*.30,h*.08,white,-w*.24,d*.28,-h*.10));add(box(w*.42,d*.30,h*.08,white,w*.24,d*.28,-h*.10));add(box(w*.92,d*.55,h*.08,mat(e,visualMode,0xd6dde3),0,-d*.12,-h*.12))}
   else if(/armário|armario|roupeiro|cabinet/.test(name)){add(box(w,d,h,M));add(box(.018,d*1.04,h*.92,dark,0,-d*.02,0));add(cyl(.012,.035,dark,-w*.07,-d*.52,0,Math.PI/2));add(cyl(.012,.035,dark,w*.07,-d*.52,0,Math.PI/2))}
   else if(/estante|shelf|prateleira/.test(name)){for(let z=-h*.4;z<=h*.4;z+=Math.max(.22,h*.22))add(box(w,d,h*.05,M,0,0,z));add(box(.05,d,h,M,-w*.47,0,0));add(box(.05,d,h,M,w*.47,0,0))}
   else if(/banco|bench/.test(name)){add(box(w,d*.62,h*.12,M,0,0,h*.10));for(const x of [-1,1])add(box(w*.08,d*.55,h*.58,dark,x*w*.38,0,-h*.22))}
   else if(/módulo cozinha|modulo cozinha/.test(name)){add(box(w,d,h,M));add(box(w*.88,d*.04,h*.78,white,0,-d*.51,0));add(cyl(.012,.035,dark,w*.30,-d*.54,0,Math.PI/2))}
   else if(/móvel lavatório|movel lavatorio|vanity/.test(name)){add(box(w,d,h*.72,M,0,0,-h*.12));add(box(w*.92,d*.88,h*.12,white,0,0,h*.30));add(cyl(.018,h*.24,dark,0,d*.2,h*.48))}
   else if(/pérgola|pergola/.test(name)){for(const x of [-1,1])for(const y of [-1,1])add(box(w*.06,d*.06,h,dark,x*w*.43,y*d*.42,0));for(let x=-w*.42;x<=w*.42;x+=Math.max(.25,w/8))add(box(w*.035,d*.95,h*.035,M,x,0,h*.49));add(box(w*.95,d*.06,h*.07,M,0,-d*.42,h*.44));add(box(w*.95,d*.06,h*.07,M,0,d*.42,h*.44))}
   else add(box(w,d,h,M)); break
  }
  case 'equipment': {
   if(/painel solar|solar/.test(name)){add(box(w,d,h,M));for(let x=-w*.3;x<=w*.3;x+=Math.max(.08,w*.2))add(box(.012,d*.96,h*1.1,dark,x,0,0));for(let y=-d*.3;y<=d*.3;y+=Math.max(.08,d*.2))add(box(w*.96,.012,h*1.1,dark,0,y,0))}
   else if(/extintor/.test(name)){add(cyl(Math.max(.05,w*.30),h*.66,M,0,0,-h*.05));add(box(w*.28,d*.28,h*.15,dark,0,0,h*.37));add(torus(w*.14,.012,dark,w*.08,0,h*.43,Math.PI/2))}
   else if(/carro|vehicle|veículo|veiculo/.test(name)){add(box(w*.80,d*.82,h*.38,M,0,0,-h*.06));add(box(w*.48,d*.70,h*.28,glass,-w*.04,0,h*.22));for(const x of [-1,1])for(const y of [-1,1])add(wheel(Math.min(w,d)*.12,dark,x*w*.30,y*d*.40,-h*.28))}
   else if(/contentor|container/.test(name)){add(box(w,d,h,M));for(let x=-w*.38;x<=w*.38;x+=Math.max(.15,w*.16))add(box(.018,d*1.01,h*.92,dark,x,0,0))}
   else if(/andaime|scaffold/.test(name)){for(const x of [-1,1])for(const y of [-1,1])add(cyl(.022,h,dark,x*w*.42,y*d*.36,0));for(let z=-h*.40;z<=h*.40;z+=Math.max(.35,h*.25)){add(box(w*.9,.035,.035,dark,0,-d*.36,z));add(box(w*.9,.035,.035,dark,0,d*.36,z));add(box(w*.82,d*.7,.035,M,0,0,z))}}
   else if(/poste|lamp|ilumina/.test(name)){add(cyl(Math.max(.025,w*.08),h*.82,dark,0,0,-h*.05));add(sphere(Math.max(.08,w*.24),white,0,0,h*.42))}
   else if(/ventilador|fan/.test(name)){add(cyl(Math.min(w,d)*.42,h*.24,dark,0,0,0,Math.PI/2));for(let i=0;i<4;i++){const b=box(w*.32,d*.08,h*.05,M,w*.18,0,0);b.rotation.z=i*Math.PI/2;add(b)}}
   else if(/uta|vrf|gerador|ups|transformador|rack|quadro/.test(name)){add(box(w,d,h,M));add(box(w*.70,.02,h*.55,dark,0,-d*.51,0));for(let z=-h*.25;z<=h*.25;z+=Math.max(.08,h*.15))add(box(w*.45,.025,.015,white,0,-d*.525,z));if(/rack/.test(name))for(let z=-h*.3;z<=h*.3;z+=Math.max(.06,h*.12))add(box(w*.65,.04,.045,mat(e,visualMode,0x263746),0,-d*.53,z))}
   else if(/frigorífico|frigorifico/.test(name)){add(box(w,d,h,M));add(box(.015,d*1.03,h*.92,dark,0,-d*.51,0));add(box(w*.32,.025,.018,dark,w*.28,-d*.53,h*.12));add(box(w*.32,.025,.018,dark,w*.28,-d*.53,-h*.12))}
   else if(/forno/.test(name)){add(box(w,d,h,dark));add(box(w*.78,.025,h*.62,glass,0,-d*.51,0));add(box(w*.55,.03,.025,white,0,-d*.54,h*.36))}
   else if(/máquina lavar|maquina lavar|dishwasher|washer/.test(name)){add(box(w,d,h,white));add(torus(Math.min(w,h)*.28,.035,dark,0,-d*.52,0,Math.PI/2));add(cyl(.025,.03,dark,w*.34,-d*.53,h*.34,Math.PI/2))}
   else if(/radiador/.test(name)){for(let x=-w*.43;x<=w*.43;x+=Math.max(.035,w/12))add(box(Math.max(.025,w/18),d,h*.88,white,x,0,0));add(box(w*.94,d*.6,h*.04,dark,0,0,h*.46));add(box(w*.94,d*.6,h*.04,dark,0,0,-h*.46))}
   else if(/unidade interior ac/.test(name)){add(box(w,d,h,white));add(box(w*.78,d*.08,h*.06,dark,0,-d*.52,-h*.30));for(let x=-w*.32;x<=w*.32;x+=w*.16)add(box(.01,d*.10,h*.18,dark,x,-d*.54,-h*.18))}
   else if(/unidade exterior ac|bomba de calor/.test(name)){add(box(w,d,h,white));add(torus(Math.min(w,h)*.29,.025,dark,0,-d*.52,0,Math.PI/2));add(cyl(Math.min(w,h)*.06,.04,dark,0,-d*.55,0,Math.PI/2));for(let i=0;i<5;i++){const b=box(Math.min(w,h)*.28,.025,.035,dark,Math.min(w,h)*.14, -d*.56,0);b.rotation.z=i*Math.PI*2/5;add(b)}}
   else if(/termoacumulador/.test(name)){add(cyl(Math.min(w,d)*.46,h,white));add(box(w*.35,d*.15,h*.10,dark,0,-d*.48,-h*.30))}
   else if(/bateria doméstica|bateria domestica|carregador veículo|carregador veiculo/.test(name)){add(box(w,d,h,M));add(box(w*.52,d*.03,h*.08,green,0,-d*.52,h*.28));add(cyl(.018,.035,dark,w*.28,-d*.54,-h*.28,Math.PI/2))}
   else add(box(w,d,h,M)); break
  }
  default:add(box(w,d,h,M));
 }
 g.position.set(e.position.x,e.position.y,e.position.z);g.rotation.set(e.rotation.x,e.rotation.y,e.rotation.z);g.userData.id=e.id;g.traverse(o=>o.userData.id=e.id)
 return g
}
