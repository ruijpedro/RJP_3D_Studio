# RJP 3D Studio V3.2.1 — Build Fix

Correções no `ThreeViewport.tsx`:

- corrigido `if(fitToken)fitAll()const tc=...` para separar corretamente as instruções;
- eliminadas propriedades duplicadas `transparent` e `opacity` no `MeshStandardMaterial`;
- cotas deixam de ser recriadas dentro do animation loop;
- grelha passa efetivamente a respeitar `gridVisible` e `gridSize`;
- limpeza de geometrias/materiais reforçada no unmount;
- mantém PAN, ViewCube, Plan Recognition Engine PDF/DWG/DXF e restante V3.2.
