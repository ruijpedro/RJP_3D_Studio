import React,{useEffect,useMemo,useState} from 'react'

export interface FreeAssetRecord{
 id:string;name:string;description?:string;category?:string;thumbnail?:string;
 downloads?:number;authors?:string[];modelUrl?:string;source:'Poly Haven';license:'CC0';dimensions?:number[];polycount?:number;lods?:boolean;tags?:string[]
}
type Props={onInsert:(a:FreeAssetRecord)=>void}

const API='https://api.polyhaven.com'

function flattenFiles(node:any,path:string[]=[]):{path:string;url:string;size:number}[]{
 const out:{path:string;url:string;size:number}[]=[]
 if(!node||typeof node!=='object')return out
 if(typeof node.url==='string')out.push({path:path.join('/'),url:node.url,size:Number(node.size)||0})
 for(const [k,v] of Object.entries(node))if(k!=='url'&&k!=='size'&&k!=='md5'&&k!=='include')out.push(...flattenFiles(v,[...path,k]))
 return out
}
async function resolveModelUrl(id:string){
 const r=await fetch(`${API}/files/${encodeURIComponent(id)}`)
 if(!r.ok)throw new Error(`Poly Haven /files: ${r.status}`)
 const files=flattenFiles(await r.json())
 const candidates=files.filter(f=>/\.(glb|gltf)(\?|$)/i.test(f.url)||/\b(glb|gltf)\b/i.test(f.path))
 candidates.sort((a,b)=>{
  const score=(x:{path:string;url:string;size:number})=>{
   const p=(x.path+' '+x.url).toLowerCase()
   let s=0
   if(/1k/.test(p))s-=40;else if(/2k/.test(p))s-=25;else if(/4k/.test(p))s+=10
   if(/\.glb(\?|$)/.test(x.url))s-=20
   s+=Math.min(100,x.size/1e7)
   return s
  }
  return score(a)-score(b)
 })
 return candidates[0]?.url
}
export default function FreeAssetHub({onInsert}:Props){
 const [assets,setAssets]=useState<FreeAssetRecord[]>([]),[q,setQ]=useState(''),[loading,setLoading]=useState(false),[error,setError]=useState(''),[busy,setBusy]=useState(''),[category,setCategory]=useState('Todos'),[favorites,setFavorites]=useState<string[]>(()=>{try{return JSON.parse(localStorage.getItem('rjp-free-favs')||'[]')}catch{return []}}),[onlyFav,setOnlyFav]=useState(false)
 useEffect(()=>{let live=true;(async()=>{setLoading(true);setError('');try{
   const r=await fetch(`${API}/assets?type=models`)
   if(!r.ok)throw new Error(`API ${r.status}`)
   const data=await r.json()
   const list:FreeAssetRecord[]=Object.entries(data).map(([id,v]:any):FreeAssetRecord=>({id:String(id),name:String(v.name||id),description:String(v.description||''),category:String(v.category||''),thumbnail:String(v.thumbnail_url||''),downloads:Number(v.download_count)||0,authors:Object.keys(v.authors||{}),source:'Poly Haven',license:'CC0',dimensions:Array.isArray(v.dimensions)?v.dimensions.map((x:any)=>Number(x)).filter(Number.isFinite):undefined,polycount:Number(v.polycount)||undefined,lods:Boolean(v.lods),tags:Array.isArray(v.tags)?v.tags.map((x:any)=>String(x)):[]})).sort((a,b)=>(b.downloads||0)-(a.downloads||0))
   if(live)setAssets(list)
  }catch(e){if(live)setError(e instanceof Error?e.message:String(e))}finally{if(live)setLoading(false)}})();return()=>{live=false}},[])
 const categories=useMemo(()=>['Todos',...Array.from(new Set(assets.map(a=>(a.category||'Outros').split('/')[0]))).sort()],[assets])
 const visible=useMemo(()=>{const s=q.trim().toLocaleLowerCase('pt');return assets.filter(a=>(!s||`${a.name} ${a.category} ${a.description} ${(a.tags||[]).join(' ')}`.toLocaleLowerCase('pt').includes(s))&&(category==='Todos'||(a.category||'Outros').startsWith(category))&&(!onlyFav||favorites.includes(a.id))).slice(0,160)},[assets,q,category,onlyFav,favorites])
 const fav=(id:string)=>setFavorites(v=>{const n=v.includes(id)?v.filter(x=>x!==id):[...v,id];localStorage.setItem('rjp-free-favs',JSON.stringify(n));return n})
 const insert=async(a:FreeAssetRecord)=>{setBusy(a.id);setError('');try{const modelUrl=await resolveModelUrl(a.id);if(!modelUrl)throw new Error('Este asset não disponibiliza GLB/GLTF compatível.');onInsert({...a,modelUrl})}catch(e){setError(e instanceof Error?e.message:String(e))}finally{setBusy('')}}
 return <section className="freehub">
   <div className="freehub-hero"><div><b>FREE ASSET HUB</b><h2>Modelos 3D livres · qualidade externa</h2><p>Catálogo online ligado ao Poly Haven. Os modelos são CC0 e entram no RJP 3D Studio como famílias externas.</p></div><span>Powered by Poly Haven · CC0</span></div>
   <div className="freehub-toolbar"><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Pesquisar cadeira, mesa, arquitetura, exterior…"/><select value={category} onChange={e=>setCategory(e.target.value)}>{categories.map(c=><option key={c}>{c}</option>)}</select><button className={onlyFav?'active':''} onClick={()=>setOnlyFav(v=>!v)}>★ Favoritos</button><strong>{visible.length}/{assets.length}</strong></div>
   {loading&&<div className="freehub-state">A carregar catálogo livre…</div>}
   {error&&<div className="freehub-error">{error}</div>}
   <div className="freehub-grid">{visible.map(a=><article key={a.id}><div className="freehub-img">{a.thumbnail?<img src={a.thumbnail} alt=""/>:<span>3D</span>}<i>CC0</i><button className="freehub-star" onClick={()=>fav(a.id)}>{favorites.includes(a.id)?'★':'☆'}</button>{a.lods&&<em>LOD</em>}</div><div className="freehub-body"><b>{a.name}</b><span>{a.category||'Modelo 3D'}</span><small>{a.authors?.join(', ')||'Poly Haven'}</small>{a.dimensions&&<small>{a.dimensions.map(x=>(x/1000).toFixed(2)).join(' × ')} m</small>}{a.polycount&&<small>{Math.round(a.polycount/1000)}k tris</small>}</div><button disabled={busy===a.id} onClick={()=>insert(a)}>{busy===a.id?'A preparar…':'Importar para o 3D'}</button></article>)}</div>
   {!loading&&!visible.length&&<div className="freehub-state">Sem resultados.</div>}
 </section>
}
