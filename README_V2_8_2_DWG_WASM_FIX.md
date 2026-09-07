# RJP 3D Studio V2.8.2 — DWG WASM Fix

Correção crítica da importação DWG.

## Problema
O pacote `@mlightcad/libredwg-web@0.7.10` fornece o motor WebAssembly como
`libredwg-web.wasm`, enquanto o script anterior procurava apenas
`libredwg.wasm`. O JavaScript era copiado, mas o motor WASM não era publicado.

## Correção
- procura `libredwg-web.wasm` como nome principal;
- mantém fallback para `libredwg.wasm`;
- publica `public/cad-wasm/libredwg-web.wasm`;
- cria também alias `public/cad-wasm/libredwg.wasm`;
- interrompe o build se o WASM não existir;
- mantém caminho baseado em `document.baseURI`, compatível com GitHub Pages/subpaths;
- pré-verificação do WASM antes de inicializar LibreDWG.

O resultado esperado no GitHub Actions é:
[RJP CAD] copiado: libredwg-web.js
[RJP CAD] copiado: libredwg-web.wasm
[RJP CAD] alias criado: libredwg.wasm
