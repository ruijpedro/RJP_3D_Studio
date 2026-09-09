import React from 'react'
import type {LibraryItem} from './library'

export default function LibraryPreview({item}:{item:LibraryItem}){
 const t=item.type
 const n=item.name.toLowerCase()
 const common={stroke:'currentColor',strokeWidth:2,fill:'none'} as const
 let body:React.ReactNode

 if((t==='floor'||t==='slab')&&!/laje estrutural/.test(n)){
  const wood=/madeira|laminad/.test(n),stone=/granito|mármore|marmore/.test(n),tile=/porcel|cerâm|ceram/.test(n),raised=/técnico|tecnico|elevado/.test(n)
  body=<><polygon points="16,52 72,30 105,47 49,70" className="preview-fill"/><polygon points="49,70 105,47 105,59 49,82" className="preview-fill2"/><polygon points="16,52 49,70 49,82 16,64" className="preview-fill3"/>{wood&&[0,1,2,3,4].map(i=><line key={i} x1={24+i*14} y1={51-i*5.5} x2={56+i*10} y2={68-i*4} {...common}/>) }{tile&&<><line x1="44" y1="41" x2="77" y2="59" {...common}/><line x1="72" y1="30" x2="72" y2="60" {...common}/></>}{stone&&<path d="M27 52 Q38 46 50 50 T72 48 T94 50" {...common}/>} {raised&&<><line x1="27" y1="66" x2="27" y2="79" {...common}/><line x1="91" y1="54" x2="91" y2="67" {...common}/></>}</>
 } else if(t==='window'){
  body=<><rect x="24" y="18" width="72" height="74" rx="2" {...common}/><line x1="60" y1="18" x2="60" y2="92" {...common}/><line x1="24" y1="55" x2="96" y2="55" {...common}/><rect x="30" y="24" width="24" height="25" className="preview-glass"/><rect x="66" y="24" width="24" height="25" className="preview-glass"/></>
 } else if(t==='door'){
  body=<><rect x="32" y="12" width="56" height="88" rx="2" {...common}/><line x1="36" y1="16" x2="36" y2="96" {...common}/><circle cx="76" cy="58" r="3" className="preview-accent"/></>
 } else if(t==='column'&&/circular|ø|diam/.test(n)){
  body=<><ellipse cx="60" cy="22" rx="24" ry="10" className="preview-fill"/><path d="M36 22 V88 Q60 104 84 88 V22" className="preview-fill2"/><ellipse cx="60" cy="88" rx="24" ry="10" {...common}/></>
 } else if(t==='column'){
  body=<><polygon points="40,14 76,14 87,25 51,25" className="preview-fill"/><polygon points="51,25 87,25 87,96 51,96" className="preview-fill2"/><polygon points="40,14 51,25 51,96 40,84" className="preview-fill3"/></>
 } else if(t==='beam'){
  body=<><polygon points="14,42 88,20 104,30 30,52" className="preview-fill"/><polygon points="30,52 104,30 104,54 30,76" className="preview-fill2"/><polygon points="14,42 30,52 30,76 14,65" className="preview-fill3"/></>
 } else if(t==='wall'){
  body=<><polygon points="16,35 84,15 104,27 36,47" className="preview-fill"/><polygon points="36,47 104,27 104,82 36,102" className="preview-fill2"/><polygon points="16,35 36,47 36,102 16,89" className="preview-fill3"/></>
 } else if(t==='stair'){
  body=<>{Array.from({length:6},(_,i)=><rect key={i} x={18+i*12} y={80-i*10} width="22" height={10+i*10} className={i%2?'preview-fill2':'preview-fill'}/>)}</>
 } else if(t==='pipe'||t==='gutter'){
  body=<><ellipse cx="28" cy="34" rx="12" ry="8" className="preview-fill"/><path d="M28 26 L91 52 Q100 56 96 66 Q92 75 82 71 L24 43" className="preview-fill2"/><ellipse cx="87" cy="62" rx="12" ry="8" transform="rotate(22 87 62)" {...common}/></>
 } else if(t==='duct'){
  body=<><polygon points="18,35 78,18 102,34 42,51" className="preview-fill"/><polygon points="42,51 102,34 102,70 42,88" className="preview-fill2"/><polygon points="18,35 42,51 42,88 18,72" className="preview-fill3"/></>
 } else if(t==='roof'&&/quatro águas|quatro aguas/.test(n)){
  body=<><polygon points="18,58 60,20 102,58 60,88" className="preview-fill"/><line x1="18" y1="58" x2="60" y2="58" {...common}/><line x1="102" y1="58" x2="60" y2="58" {...common}/><line x1="60" y1="20" x2="60" y2="88" {...common}/></>
 } else if(t==='roof'){
  body=<><polygon points="16,58 60,22 104,58 60,82" className="preview-fill"/><line x1="60" y1="22" x2="60" y2="82" {...common}/></>
 } else if(t==='landscape'){
  body=<><rect x="55" y="62" width="10" height="36" rx="3" className="preview-wood"/><circle cx="60" cy="42" r="27" className="preview-green"/><circle cx="42" cy="51" r="16" className="preview-green2"/><circle cx="78" cy="52" r="17" className="preview-green2"/></>
 } else if(t==='fixture'&&/sanita|toilet|wc/.test(n)){
  body=<><rect x="43" y="22" width="34" height="27" rx="5" className="preview-fill"/><ellipse cx="60" cy="67" rx="24" ry="18" className="preview-fill2"/></>
 } else if(t==='furniture'&&/sofá|sofa/.test(n)){
  body=<><rect x="20" y="48" width="80" height="34" rx="8" className="preview-fill2"/><rect x="25" y="30" width="70" height="28" rx="8" className="preview-fill"/><rect x="14" y="45" width="14" height="42" rx="5" className="preview-fill3"/><rect x="92" y="45" width="14" height="42" rx="5" className="preview-fill3"/></>
 } else {
  body=<><polygon points="24,34 72,20 96,34 48,49" className="preview-fill"/><polygon points="48,49 96,34 96,78 48,94" className="preview-fill2"/><polygon points="24,34 48,49 48,94 24,78" className="preview-fill3"/></>
 }

 return <svg viewBox="0 0 120 112" role="img" aria-label={item.name}>{body}</svg>
}
