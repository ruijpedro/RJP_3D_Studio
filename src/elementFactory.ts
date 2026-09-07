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
   if(/sanita|toilet|wc/.test(name)){add(box(w*.75,d*.62,h*.28,white,0,d*.12,-h*.28));add(mesh(new THREE.TorusGeometry(w*.27,w*.07,10,24),white,0,-d*.1,0));add(box(w*.65,d*.25,h*.42,white,0,d*.34,h*.15))}
   else if(/lavat|washbasin|lavabo/.test(name)){add(box(w,d*.75,h*.18,white,0,0,h*.25));add(cyl(.02,h*.45,dark,0,0,-h*.2))}
   else if(/duche|shower/.test(name)){add(box(w,d,.04,white,0,0,-h/2));add(cyl(.018,h*.85,dark,w*.35,d*.35,0));add(cyl(.09,.025,dark,w*.35,d*.35,h*.4,Math.PI/2))}
   else add(box(w,d,h,M)); break
  }
  case 'furniture': {
   if(/cadeira|chair/.test(name)){add(box(w*.8,d*.8,h*.08,M,0,0,-h*.12));add(box(w*.8,d*.08,h*.58,M,0,d*.35,h*.2));for(const x of [-1,1])for(const y of [-1,1])add(cyl(.025,h*.42,dark,x*w*.3,y*d*.3,-h*.3))}
   else if(/mesa|table|secretária|secretaria|desk/.test(name)){add(box(w,d,h*.12,M,0,0,h*.35));for(const x of [-1,1])for(const y of [-1,1])add(cyl(.035,h*.72,dark,x*w*.4,y*d*.4,-h*.08))}
   else if(/sofá|sofa/.test(name)){add(box(w,d*.72,h*.35,M,0,0,-h*.2));add(box(w,d*.18,h*.58,M,0,d*.38,h*.08));add(box(w*.12,d*.72,h*.45,M,-w*.44,0,-h*.05));add(box(w*.12,d*.72,h*.45,M,w*.44,0,-h*.05))}
   else if(/cama|bed/.test(name)){add(box(w,d,h*.18,M,0,0,-h*.28));add(box(w,d*.08,h*.62,M,0,d*.46,h*.05));add(box(w*.42,d*.3,h*.08,white,-w*.24,d*.28,-h*.1));add(box(w*.42,d*.3,h*.08,white,w*.24,d*.28,-h*.1))}
   else if(/armário|armario|cabinet/.test(name)){add(box(w,d,h,M));for(let x=-w*.22;x<=w*.22;x+=w*.44)add(cyl(.012,.03,dark,x,-d*.52,0,Math.PI/2))}
   else add(box(w,d,h,M)); break
  }
  case 'equipment': {
   if(/painel solar|solar/.test(name)){add(box(w,d,h,M));for(let x=-w*.3;x<=w*.3;x+=w*.2)add(box(.012,d*.96,h*1.1,dark,x,0,0));for(let y=-d*.3;y<=d*.3;y+=d*.2)add(box(w*.96,.012,h*1.1,dark,0,y,0))}
   else if(/extintor/.test(name)){add(cyl(Math.max(.05,w*.3),h*.7,M,0,0,-h*.05));add(box(w*.28,d*.28,h*.16,dark,0,0,h*.38))}
   else if(/ventil|uta|vrf|gerador|ups|transformador|rack/.test(name)){add(box(w,d,h,M));add(box(w*.7,.02,h*.55,dark,0,-d*.51,0));for(let z=-h*.25;z<=h*.25;z+=Math.max(.08,h*.15))add(box(w*.45,.025,.015,white,0,-d*.525,z))}
   else add(box(w,d,h,M)); break
  }
  default:add(box(w,d,h,M));
 }
 g.position.set(e.position.x,e.position.y,e.position.z);g.rotation.set(e.rotation.x,e.rotation.y,e.rotation.z);g.userData.id=e.id;g.traverse(o=>o.userData.id=e.id)
 return g
}
