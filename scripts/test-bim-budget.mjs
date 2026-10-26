import ts from 'typescript'
import fs from 'node:fs'
import assert from 'node:assert/strict'
const code=ts.transpileModule(fs.readFileSync('src/bimBudget.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2020}}).outputText
const {quantity,syncWorks,parsePrices,safeSource}=await import('data:text/javascript;base64,'+Buffer.from(code).toString('base64'))
const e={id:'e',type:'wall',size:{x:5,y:.2,z:3}}
assert.equal(quantity(e,'m²'),15);assert.equal(quantity(e,'m³'),3)
const old={id:'w',elementId:'e',unit:'m²',unitPrice:100,priceUrl:'https://example.com',qty:10,progress:50}
const result=syncWorks([{id:'w',elementId:'e',qty:15,unitPrice:58,level:'Piso 1'}],[old,{id:'manual',qty:4}], [e])
assert.equal(result[0].qty,15);assert.equal(result[0].unitPrice,100);assert.equal(result[0].priceUrl,old.priceUrl);assert.equal(result[0].progress,50);assert.equal(result.length,2)
assert.equal(syncWorks([], [old],[]).length,1)
const csv='codigo;descricao;unidade;preco;url\nE1;"Betão; armado";m³;"125,50";https://example.com\n'
assert.equal(parsePrices(csv)[0].price,125.5);assert.equal(parsePrices(csv)[0].description,'Betão; armado')
assert.throws(()=>parsePrices('codigo;descricao;unidade;preco\nA;B;m²;-2'))
assert.throws(()=>parsePrices('codigo;descricao;unidade;preco\nA;B;m²;'))
assert.throws(()=>parsePrices('codigo;descricao;unidade;preco\nA;"B;m²;3'))
assert.equal(safeSource('javascript:alert(1)'),'')
console.log('BIM e preços: medições, preservação de dados, CSV e URLs verificados.')
