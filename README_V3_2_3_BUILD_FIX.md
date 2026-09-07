# RJP 3D Studio V3.2.3 — Build Fix

Correção TypeScript no `App.tsx`: `selected` é `string | null`, por isso a lógica Ocultar usa diretamente o ID `selected` em vez de `selected.id`.

Mantém todas as funcionalidades da V3.2.2, incluindo DWG WASM, PAN, CAD/BIM/3D e Plan Recognition Engine PDF.
