import {mkdir,copyFile,readdir,access} from 'node:fs/promises'
import {resolve,join,basename} from 'node:path'

const packageRoot=resolve('node_modules/@mlightcad/libredwg-web')
const target=resolve('public/cad-wasm')
await mkdir(target,{recursive:true})

async function walk(dir){
  const out=[]
  try{
    for(const e of await readdir(dir,{withFileTypes:true})){
      const p=join(dir,e.name)
      if(e.isDirectory()) out.push(...await walk(p))
      else out.push(p)
    }
  }catch{}
  return out
}

const files=await walk(packageRoot)
const js=files.find(f=>basename(f)==='libredwg-web.js')
const wasm=files.find(f=>basename(f)==='libredwg-web.wasm')
  || files.find(f=>basename(f)==='libredwg.wasm')

if(!js){
  throw new Error('[RJP CAD] libredwg-web.js não encontrado em @mlightcad/libredwg-web.')
}
if(!wasm){
  throw new Error('[RJP CAD] WebAssembly LibreDWG não encontrado. O build é interrompido para não publicar uma app sem leitura DWG.')
}

await copyFile(js,resolve(target,'libredwg-web.js'))
await copyFile(wasm,resolve(target,'libredwg-web.wasm'))

// Compatibilidade com builds/wrappers que ainda procurem o nome antigo.
await copyFile(wasm,resolve(target,'libredwg.wasm'))

await access(resolve(target,'libredwg-web.wasm'))
console.log('[RJP CAD] copiado: libredwg-web.js')
console.log('[RJP CAD] copiado: libredwg-web.wasm')
console.log('[RJP CAD] alias criado: libredwg.wasm')
