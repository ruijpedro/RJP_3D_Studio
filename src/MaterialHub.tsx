import React,{useEffect,useMemo,useState} from 'react'
import type {StudioMaterial} from './types'

type PBR={id:string;name:string;category:string;thumb?:string;color?:string;normal?:string;roughness?:string;ao?:string;displacement?:string;source:'ambientCG';license:'CC0'}
type Props={onApply:(m:StudioMaterial,p:PBR)=>void;hasSelection:boolean}
const API='https://ambientcg.com/api/v2/full_json?type=Material&sort=Popular&limit=120&offset=0'

function entries(x:any){if(Array.isArray(x))return x;if(Array.isArray(x?.foundAssets))return x.foundAssets;if(Array.isArray(x?.assets))return x.assets;return []}
function flatFiles(node:any,path:string[]=[]):{path:string;url:string}[]{
 const out:{path:string;url:string}[]=[]
 if(!node||typeof node!=='object')return out
 if(typeof node.downloadLink==='string')out.push({path:path.join('/'),url:node.downloadLink})
 if(typeof node.url==='string')out.push({path:path.join('/'),url:node.url})
 for(const [k,v] of Object.entries(node))if(!['downloadLink','url'].includes(k))out.push(...flatFiles(v,[...path,k]))
 return out
}
function pick(fs:{path:string;url:string}[],keys:string[]){
 const cand=fs.filter(f=>keys.some(k=>(f.path+' '+f.url).toLowerCase().includes(k))).sort((a,b)=>{
  const score=(p:string)=>/1k/.test(p)?0:/2k/.test(p)?1:/4k/.test(p)?3:2
  return score(a.path+a.url)-score(b.path+b.url)
 })
 return cand[0]?.url
}
function parse(raw:any):PBR[]{
 return entries(raw).map((v:any,i:number)=>{
  const id=String(v.assetId||v.id||v.AssetID||`mat-${i}`),name=String(v.displayName||v.name||v.assetId||id)
  const fs=flatFiles(v.downloadFolders||v.downloads||v)
  const thumb=v.previewImage||v.previewImageUrl||v.thumbnail||v.preview||''
  return{id,name,category:String(v.category||v.categories?.[0]||'Material'),thumb,
   color:pick(fs,['color','albedo','basecolor','base_color','diffuse']),
   normal:pick(fs,['normalgl','normal_gl','normal']),
   roughness:pick(fs,['roughness']),
   ao:pick(fs,['ambientocclusion','ambient_occlusion','ao.','_ao']),
   displacement:pick(fs,['displacement','height']),
   source:'ambientCG',license:'CC0'} as PBR
 }).filter((m:PBR)=>m.color||m.thumb)
}
export default function MaterialHub({onApply,hasSelection}:Props){
 const [items,setItems]=useState<PBR[]>([]),[q,setQ]=useState(''),[cat,setCat]=useState('Todos'),[loading,setLoading]=useState(false),[error,setError]=useState('')
 useEffect(()=>{let live=true;(async()=>{setLoading(true);try{const r=await fetch(API);if(!r.ok)throw new Error(`ambientCG API ${r.status}`);const d=parse(await r.json());if(live)setItems(d)}catch(e){if(live)setError(e instanceof Error?e.message:String(e))}finally{if(live)setLoading(false)}})();return()=>{live=false}},[])
 const cats=useMemo(()=>['Todos',...Array.from(new Set(items.map(x=>x.category))).sort()],[items])
 const visible=useMemo(()=>{const s=q.trim().toLowerCase();return items.filter(x=>(cat==='Todos'||x.category===cat)&&(!s||`${x.name} ${x.category}`.toLowerCase().includes(s))).slice(0,120)},[items,q,cat])
 const apply=(p:PBR)=>{const m:StudioMaterial={id:`PBR-${p.id}`,name:p.name,family:`PBR · ${p.category}`,texture:'pbr',properties:{pbrSource:'ambientCG',pbrLicense:'CC0',pbrColor:p.color||'',pbrNormal:p.normal||'',pbrRoughness:p.roughness||'',pbrAO:p.ao||'',pbrDisplacement:p.displacement||''}};onApply(m,p)}
 return <section className="materialhub"><div className="materialhub-hero"><div><b>PBR MATERIAL HUB</b><h2>Materiais reais para o modelo BIM</h2><p>Catálogo ambientCG · CC0. Albedo, normal, roughness e displacement quando disponíveis.</p></div><span>ambientCG · CC0</span></div><div className="materialhub-toolbar"><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Pesquisar madeira, granito, betão, tijolo…"/><select value={cat} onChange={e=>setCat(e.target.value)}>{cats.map(c=><option key={c}>{c}</option>)}</select><strong>{visible.length}/{items.length}</strong></div>{loading&&<div className="materialhub-state">A carregar materiais PBR…</div>}{error&&<div className="materialhub-error">{error}</div>}<div className="materialhub-grid">{visible.map(m=><article key={m.id}><div className="materialhub-img">{m.thumb?<img src={m.thumb} alt=""/>:<span>PBR</span>}<i>CC0</i></div><div><b>{m.name}</b><span>{m.category}</span><small>{[m.color&&'Color',m.normal&&'Normal',m.roughness&&'Roughness',m.displacement&&'Height'].filter(Boolean).join(' · ')}</small></div><button disabled={!hasSelection} onClick={()=>apply(m)}>{hasSelection?'Aplicar ao selecionado':'Selecione um elemento no 3D'}</button></article>)}</div></section>
}
