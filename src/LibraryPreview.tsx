import React from 'react'
import type {LibraryItem} from './library'

export default function LibraryPreview({item}:{item:LibraryItem}){
 const t=item.type,n=item.name.toLowerCase(),c=item.material.texture||'default'
 const common={stroke:'currentColor',strokeWidth:2,fill:'none'} as const
 let body:React.ReactNode
 if(t==='window')body=<><rect x="24" y="18" width="72" height="74" rx="2" {...common}/><line x1="60" y1="18" x2="60" y2="92" {...common}/><line x1="24" y1="55" x2="96" y2="55" {...common}/><rect x="30" y="24" width="24" height="25" className="preview-glass"/><rect x="66" y="24" width="24" height="25" className="preview-glass"/></>
 else if(t==='door')body=<><rect x="32" y="12" width="56" height="88" rx="2" {...common}/><line x1="36" y1="16" x2="36" y2="96" {...common}/><circle cx="76" cy="58" r="3" className="preview-accent"/></>
 else if(t==='column')body=<><polygon points="40,14 76,14 87,25 51,25" className="preview-fill"/><polygon points="51,25 87,25 87,96 51,96" className="preview-fill2"/><polygon points="40,14 51,25 51,96 40,84" className="preview-fill3"/></>
 else if(t==='beam')body=<><polygon points="14,42 88,20 104,30 30,52" className="preview-fill"/><polygon points="30,52 104,30 104,54 30,76" className="preview-fill2"/><polygon points="14,42 30,52 30,76 14,65" className="preview-fill3"/></>
 else if(t==='wall')body=<><polygon points="16,35 84,15 104,27 36,47" className="preview-fill"/><polygon points="36,47 104,27 104,82 36,102" className="preview-fill2"/><polygon points="16,35 36,47 36,102 16,89" className="preview-fill3"/>{n.includes('tijolo')&&<>{[48,62,76,90].map(y=><line key={y} x1="40" y1={y} x2="99" y2={y-17} {...common}/>)}</>}</>
 else if(t==='stair')body=<>{Array.from({length:6},(_,i)=><rect key={i} x={18+i*12} y={80-i*10} width="22" height={10+i*10} className={i%2?'preview-fill2':'preview-fill'}/>)}</>
 else if(t==='pipe'||t==='gutter')body=<><ellipse cx="28" cy="34" rx="12" ry="8" className="preview-fill"/><path d="M28 26 L91 52 Q100 56 96 66 Q92 75 82 71 L24 43" className="preview-fill2"/><ellipse cx="87" cy="62" rx="12" ry="8" transform="rotate(22 87 62)" {...common}/></>
 else if(t==='duct')body=<><polygon points="18,35 78,18 102,34 42,51" className="preview-fill"/><polygon points="42,51 102,34 102,70 42,88" className="preview-fill2"/><polygon points="18,35 42,51 42,88 18,72" className="preview-fill3"/></>
 else if(t==='roof')body=<><polygon points="16,58 60,22 104,58 60,82" className="preview-fill"/><line x1="60" y1="22" x2="60" y2="82" {...common}/><line x1="16" y1="58" x2="16" y2="75" {...common}/><line x1="104" y1="58" x2="104" y2="75" {...common}/></>
 else if(t==='landscape'&&(n.includes('árvore')||n.includes('arvore')))body=<><rect x="55" y="62" width="10" height="36" rx="3" className="preview-wood"/><circle cx="60" cy="42" r="27" className="preview-green"/><circle cx="42" cy="51" r="16" className="preview-green2"/><circle cx="78" cy="52" r="17" className="preview-green2"/></>
 else if(t==='fixture'&&/sanita|toilet|wc/.test(n))body=<><rect x="43" y="22" width="34" height="27" rx="5" className="preview-fill"/><ellipse cx="60" cy="67" rx="28" ry="21" {...common}/><ellipse cx="60" cy="67" rx="17" ry="11" {...common}/></>
 else if(t==='fixture'&&/lavat|lavabo/.test(n))body=<><path d="M24 43 Q60 25 96 43 L88 69 Q60 82 32 69 Z" className="preview-fill"/><path d="M60 29 V16 M60 16 Q72 16 72 26" {...common}/></>
 else if(t==='furniture'&&/cadeira|chair/.test(n))body=<><rect x="35" y="51" width="50" height="15" rx="3" className="preview-fill"/><rect x="35" y="20" width="50" height="31" rx="4" className="preview-fill2"/><line x1="40" y1="66" x2="35" y2="99" {...common}/><line x1="80" y1="66" x2="85" y2="99" {...common}/></>
 else if(t==='furniture'&&/mesa|table|secretária|secretaria|desk/.test(n))body=<><polygon points="20,38 76,22 102,36 45,53" className="preview-fill"/><line x1="28" y1="49" x2="25" y2="94" {...common}/><line x1="91" y1="44" x2="94" y2="87" {...common}/><line x1="48" y1="54" x2="49" y2="98" {...common}/></>
 else if(t==='equipment'&&/solar/.test(n))body=<><polygon points="22,34 91,20 103,62 34,76" className="preview-glass"/><path d="M45 29 L57 71 M68 25 L80 67 M27 48 L96 34 M31 62 L100 48" {...common}/><line x1="61" y1="74" x2="61" y2="98" {...common}/></>
 else body=<><polygon points="24,34 74,18 98,32 48,49" className="preview-fill"/><polygon points="48,49 98,32 98,80 48,98" className="preview-fill2"/><polygon points="24,34 48,49 48,98 24,82" className="preview-fill3"/></>
 return <div className={`library-preview texture-${c}`}><svg viewBox="0 0 120 112" aria-hidden="true">{body}</svg><span className="preview-type">{item.type}</span></div>
}
