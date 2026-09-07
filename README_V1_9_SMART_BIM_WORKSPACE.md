# RJP 3D Studio V1.9 — Smart BIM Workspace

Evolução da V1.8 com foco na elaboração real de projeto.

## Novidades principais
- Vista **3D / Planta** no editor.
- **Sobreposição CAD** DWG/DXF diretamente sobre o modelo 3D.
- **Gestor de níveis/pisos**, com criação de novos níveis e filtro visual.
- **Fases de projeto**: Existente, Demolir e Novo.
- Filtro por fase e piso no editor.
- Elementos convertidos de CAD mantêm origem, layer, piso e fase.
- O MQT/orçamento passa a conservar `elementId`, piso e fase para futura ligação bidirecional modelo ↔ artigo.
- Continuidade do reconhecimento de paredes por linhas duplas e associação de vãos à parede hospedeira.

## Fluxo alvo
DWG/DXF → revisão de layers → reconstrução BIM → níveis/fases → MQT → orçamento → planeamento → obra → autos.

## Nota
A abertura DWG continua baseada em LibreDWG/WebAssembly e DXF permanece como fallback de compatibilidade.
