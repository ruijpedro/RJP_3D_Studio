import React from 'react'
import type {LibraryItem} from './library'

const S={stroke:'currentColor',strokeWidth:1.7,fill:'none',strokeLinecap:'round' as const,strokeLinejoin:'round' as const}
const line=(x1:number,y1:number,x2:number,y2:number,key?:React.Key)=><line key={key} x1={x1} y1={y1} x2={x2} y2={y2} {...S}/>

export default function LibraryPreview({item}:{item:LibraryItem}){
 const t=item.type.toLowerCase(),n=item.name.toLowerCase()
 let body:React.ReactNode

 if(t==='floor'||(t==='slab'&&!/laje|estrut/.test(n))){
  const wood=/madeira|laminad|parquet|deck/.test(n),stone=/granito|mármore|marmore|pedra/.test(n),tile=/porcel|cerâm|ceram|azulej/.test(n),raised=/técnico|tecnico|elevado/.test(n)
  body=<><rect x="14" y="20" width="92" height="72" rx="5" className="preview-swatch"/>{wood&&Array.from({length:7},(_,i)=>line(18+i*13,24,18+i*13,88,i))}{wood&&<><path d="M18 42 Q31 35 44 42 T70 42 T96 42" {...S}/><path d="M18 68 Q31 61 44 68 T70 68 T96 68" {...S}/></>}{tile&&<>{[37,60,83].map((x,i)=>line(x,23,x,89,'v'+i))}{[44,68].map((y,i)=>line(16,y,104,y,'h'+i))}</>}{stone&&<><path d="M18 38 Q30 28 44 39 T72 37 T100 41" {...S}/><path d="M19 72 Q34 58 47 70 T74 67 T101 75" {...S}/></>}{raised&&<>{[38,61,84].map((x,i)=>line(x,23,x,89,'rv'+i))}{[44,67].map((y,i)=>line(16,y,104,y,'rh'+i))}<circle cx="19" cy="87" r="3" className="preview-accent"/><circle cx="101" cy="87" r="3" className="preview-accent"/></>}<path d="M16 92 H104" className="preview-edge"/></>
 } else if(t==='window'){
  const curtain=/fachada cortina|curtain/.test(n),sliding=/correr|sliding/.test(n),three=/3 folhas/.test(n)
  body=<><rect x="19" y="15" width="82" height="82" rx="3" className="preview-frame"/><rect x="25" y="21" width="70" height="70" rx="1" className="preview-glass"/>{curtain?<>{[43,60,77].map((x,i)=>line(x,17,x,95,i))}{[42,69].map((y,i)=>line(21,y,99,y,'h'+i))}</>:three?<>{line(47,18,47,94)}{line(73,18,73,94)}</>:<>{line(60,18,60,94)}{!sliding&&line(22,56,98,56)}</>}</>
 } else if(t==='door'){
  const sliding=/correr/.test(n),double=/dupla|double/.test(n),glass=/vidr|glass/.test(n)
  body=sliding?<><rect x="20" y="20" width="76" height="72" className="preview-frame"/><rect x="30" y="25" width="48" height="62" className={glass?'preview-glass':'preview-fill'}/><path d="M18 14 H102" {...S}/><circle cx="79" cy="57" r="2.5" className="preview-accent"/></>:double?<><rect x="22" y="14" width="76" height="84" className="preview-frame"/><line x1="60" y1="16" x2="60" y2="96" {...S}/><circle cx="55" cy="58" r="2.5" className="preview-accent"/><circle cx="65" cy="58" r="2.5" className="preview-accent"/></>:<><rect x="31" y="12" width="58" height="88" className="preview-frame"/><rect x="36" y="17" width="48" height="78" className={glass?'preview-glass':'preview-fill'}/><circle cx="77" cy="58" r="3" className="preview-accent"/></>
 } else if(t==='wall'){
  const multi=/multicamada|multilayer/.test(n),lsf=/lsf/.test(n)
  body=multi?<><rect x="12" y="27" width="96" height="58" rx="3" className="preview-wall-shell"/><rect x="18" y="31" width="13" height="50" className="preview-layer-a"/><rect x="34" y="31" width="34" height="50" className="preview-layer-b"/><rect x="71" y="31" width="17" height="50" className="preview-layer-c"/><rect x="91" y="31" width="11" height="50" className="preview-layer-a"/></>:lsf?<><rect x="13" y="24" width="94" height="64" className="preview-wall-shell"/>{[23,39,55,71,87,103].map((x,i)=><rect key={i} x={x} y="28" width="4" height="56" className="preview-metal"/>)}<rect x="17" y="36" width="86" height="40" className="preview-insulation"/></>:<><rect x="15" y="28" width="90" height="54" rx="5" className="preview-fill"/><path d="M24 42 H96 M24 56 H96 M24 70 H96" {...S}/></>
 } else if(t==='column'){
  body=/circular|ø|diam/.test(n)?<><ellipse cx="60" cy="23" rx="23" ry="10" className="preview-fill"/><path d="M37 23 V86 Q60 100 83 86 V23" className="preview-fill2"/><ellipse cx="60" cy="86" rx="23" ry="10" {...S}/></>:/hea|ipe/.test(n)?<><path d="M37 14 H83 V25 H66 V87 H83 V98 H37 V87 H54 V25 H37Z" className="preview-fill"/></>:<><rect x="42" y="15" width="36" height="82" rx="3" className="preview-fill"/></>
 } else if(t==='beam'){
  body=/ipe|hea/.test(n)?<><path d="M12 45 H108 V57 H67 V68 H108 V80 H12 V68 H53 V57 H12Z" className="preview-fill"/></>:<><rect x="12" y="44" width="96" height="27" rx="4" className="preview-fill"/></>
 } else if(t==='stair'){
  body=<><path d="M14 92 H106 V22" className="preview-stair"/>{Array.from({length:8},(_,i)=>{const x=18+i*10,y=86-i*8;return <path key={i} d={`M${x} ${y} h18`} {...S}/>})}</>
 } else if(t==='railing'){
  const glass=/vidro|glass/.test(n)
  body=glass?<><rect x="15" y="27" width="90" height="58" rx="2" className="preview-glass"/><line x1="15" y1="24" x2="105" y2="24" {...S}/>{[15,45,75,105].map((x,i)=>line(x,25,x,88,i))}</>:<><line x1="12" y1="30" x2="108" y2="30" {...S}/><line x1="12" y1="87" x2="108" y2="87" {...S}/>{Array.from({length:10},(_,i)=>line(16+i*10,32,16+i*10,85,i))}</>
 } else if(t==='roof'){
  body=/quatro águas|quatro aguas/.test(n)?<><polygon points="60,16 104,57 60,96 16,57" className="preview-roof"/><path d="M60 16 V96 M16 57 H104" {...S}/></>:<><path d="M13 72 L60 22 L107 72" className="preview-roof"/><path d="M20 72 H100" {...S}/><path d="M60 22 V72" {...S}/></>
 } else if(t==='furniture'&&/cadeira|chair/.test(n)){
  body=<><path d="M39 20 V62 H81 V20" className="preview-fill"/><rect x="34" y="58" width="52" height="17" rx="5" className="preview-fill2"/><path d="M42 75 V98 M78 75 V98" {...S}/></>
 } else if(t==='furniture'&&/mesa|table|secretária|secretaria|desk/.test(n)){
  body=<><rect x="17" y="40" width="86" height="17" rx="5" className="preview-fill"/><path d="M27 57 V96 M93 57 V96" {...S}/></>
 } else if(t==='furniture'&&/sofá|sofa|poltrona/.test(n)){
  body=<><rect x="20" y="52" width="80" height="31" rx="10" className="preview-fill2"/><rect x="26" y="29" width="68" height="33" rx="10" className="preview-fill"/><rect x="12" y="47" width="16" height="42" rx="7" className="preview-fill3"/><rect x="92" y="47" width="16" height="42" rx="7" className="preview-fill3"/></>
 } else if(t==='furniture'&&/cama|bed/.test(n)){
  body=<><rect x="20" y="30" width="80" height="62" rx="8" className="preview-fill2"/><rect x="20" y="20" width="80" height="18" rx="5" className="preview-fill"/><rect x="26" y="38" width="31" height="18" rx="6" className="preview-surface"/><rect x="63" y="38" width="31" height="18" rx="6" className="preview-surface"/></>
 } else if(t==='fixture'&&/sanita|toilet|wc/.test(n)){
  body=<><rect x="42" y="15" width="36" height="28" rx="7" className="preview-fill"/><ellipse cx="60" cy="67" rx="26" ry="20" className="preview-fill2"/><ellipse cx="60" cy="64" rx="16" ry="11" className="preview-surface"/></>
 } else if(t==='fixture'&&/lavat|basin|sink/.test(n)){
  body=<><ellipse cx="60" cy="49" rx="38" ry="24" className="preview-fill"/><ellipse cx="60" cy="49" rx="27" ry="15" className="preview-surface"/><path d="M60 25 V14 Q60 10 66 10 H74" {...S}/></>
 } else if(t==='equipment'&&/frigorífico|frigorifico/.test(n)){
  body=<><rect x="36" y="12" width="48" height="88" rx="5" className="preview-fill"/><line x1="36" y1="56" x2="84" y2="56" {...S}/><line x1="76" y1="28" x2="76" y2="45" {...S}/><line x1="76" y1="68" x2="76" y2="84" {...S}/></>
 } else if(t==='equipment'&&/máquina|maquina|washer|dryer/.test(n)){
  body=<><rect x="31" y="18" width="58" height="78" rx="5" className="preview-fill"/><circle cx="60" cy="62" r="22" className="preview-glass"/><circle cx="60" cy="62" r="15" {...S}/></>
 } else if(t==='equipment'&&/painel solar|solar/.test(n)){
  body=<><polygon points="18,73 42,24 103,39 79,88" className="preview-solar"/>{[36,53,70,87].map((x,i)=>line(x,30+i*4,x-20,80-i*2,i))}</>
 } else if(t==='landscape'){
  body=/pinheiro/.test(n)?<><rect x="56" y="68" width="8" height="30" rx="3" className="preview-wood"/><polygon points="60,12 31,60 89,60" className="preview-green"/><polygon points="60,30 25,78 95,78" className="preview-green2"/></>:<><rect x="55" y="62" width="10" height="36" rx="3" className="preview-wood"/><circle cx="60" cy="38" r="25" className="preview-green"/><circle cx="40" cy="51" r="15" className="preview-green2"/><circle cx="80" cy="52" r="16" className="preview-green2"/></>
 } else if(t==='pipe'||t==='gutter'){
  body=<><path d="M16 35 H73 Q99 35 99 60 V85" className="preview-pipe"/><circle cx="16" cy="35" r="7" className="preview-fill"/><circle cx="99" cy="85" r="7" className="preview-fill"/></>
 } else {
  body=<><circle cx="60" cy="50" r="31" className="preview-generic-ring"/><path d="M40 66 L60 34 L80 66 Z" className="preview-generic-mark"/><circle cx="60" cy="54" r="7" className="preview-accent"/></>
 }

 return <svg viewBox="0 0 120 112" role="img" aria-label={item.name}>{body}</svg>
}
