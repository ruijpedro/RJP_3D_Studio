# RJP 3D Studio V4.3.2 — TypeScript Build Fix

Correções:
- `StudioMaterial` adicionado ao import de tipos do `App.tsx`;
- `externalAuthors` passou de `string[]` para string serializada, compatível com `Record<string,V>`;
- callback `Object.entries(...).map()` do `FreeAssetHub` passa a devolver explicitamente `FreeAssetRecord`;
- `source` e `license` preservam os literais `"Poly Haven"` e `"CC0"`;
- normalização de `dimensions` e `tags` da API externa.
