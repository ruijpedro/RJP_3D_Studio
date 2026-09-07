# RJP 3D Studio V2.5 — CAD 2D → Projeto 3D

A V2.5 concentra o fluxo de arranque de projeto a partir de uma planta CAD.

## Fluxo
1. Importar DWG ou DXF.
2. Rever layers e atribuir `Parede`, `Vão`, `Pilar`, `Eixo`, `Referência` ou `Ignorar`.
3. Definir escala CAD→m, altura, espessura, piso e cota do piso.
4. Escolher reconhecimento por linhas duplas ou eixos.
5. Opcionalmente criar laje base e detetar compartimentos.
6. **Gerar Projeto 3D**.
7. Continuar no Modelo, Biblioteca, Compartimentos, MQT, Orçamento e Planeamento.

## Geração 3D
- paredes BIM com altura, espessura e nível;
- reconhecimento de paredes por pares de linhas paralelas;
- portas/janelas inferidas pela layer e hospedadas na parede mais próxima;
- pilares 3D;
- laje base opcional;
- compartimentos a partir de paredes fechadas;
- rastreabilidade: CAD source, layer, papel BIM e versão de importação;
- relatório pós-importação.

## Correções de build incorporadas
- eliminação do uso de `Array.at()` incompatível com o target atual;
- correção `updateElement` → `updateEl`;
- nível opcional tratado antes de `makeWall`;
- tipagem explícita do `modelFromCad`;
- motor de folhas alinhado com `StudioProject` e `DrawingSheet`;
- pesquisa recursiva do `libredwg.wasm`/JS no pacote NPM, mantendo DXF como fallback.
