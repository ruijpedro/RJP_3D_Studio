import {mkdir,copyFile,readdir,access} from 'node:fs/promises'
import {resolve,join,basename} from 'node:path'
const root=resolve('node_modules/@mlightcad/libredwg-web'),dst=resolve('public/cad-wasm')
await mkdir(dst,{recursive:true})
async function walk(dir){let out=[];try{for(const e of await readdir(dir,{withFileTypes:true})){const p=join(dir,e.name);if(e.isDirectory())out.push(...await walk(p));else out.push(p)}}catch{}return out}
const files=await walk(root)
const candidates=['libredwg.wasm','libredwg-web.js']
for(const name of candidates){
 const src=files.find(f=>basename(f)===name)
 if(src){await copyFile(src,resolve(dst,name));console.log('[RJP CAD] copiado:',name)}
 else console.warn('[RJP CAD] asset não encontrado no pacote:',name,'— o importador DXF continua disponível.')
}
