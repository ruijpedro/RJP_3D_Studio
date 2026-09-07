# RJP 3D Studio V2.4 — Production Drawings

## Evolução
- cotas 2D passam a ser desenhadas no viewport em Planta;
- motor de **folhas A4/A3/A2/A1/A0** com viewport e legenda RJP;
- geração vetorial SVG de uma peça desenhada;
- comando **PDF / Imprimir** abre a folha pronta para impressão/Guardar como PDF do browser;
- planta da folha inclui paredes, compartimentos/áreas e cotas;
- escala, piso, número da folha e revisão entram na legenda;
- atualização das relações de portas/janelas com a parede hospedeira;
- propriedades de vão guardam largura, altura, peitoril e `openingCut`.

### Nota técnica sobre vãos
A V2.4 reforça a semântica e a representação dos vãos hospedados sem aplicar ainda uma operação CSG destrutiva à geometria persistida. Isto evita corromper paredes durante edição paramétrica. O passo seguinte é renderização CSG não destrutiva/cacheada.

## Próximo núcleo
- CSG visual não destrutivo para portas/janelas;
- grips de edição;
- viewports múltiplos por folha;
- cortes e alçados vetoriais derivados do modelo;
- carimbo configurável e conjunto PDF.
