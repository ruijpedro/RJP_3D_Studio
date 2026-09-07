# RJP 3D Studio V2.8.1 — Build Fix

Corrige TS2367 em `refreshHostedOpenings`: a procura da parede hospedeira tinha uma comparação encadeada acidental (`boolean === string`). Agora usa `w.id === String(hostWallId) && w.type === "wall"`.

O aviso de `libredwg.wasm` continua não bloqueante; DXF permanece disponível e `libredwg-web.js` é copiado.
