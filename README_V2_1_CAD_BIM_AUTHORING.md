# RJP 3D Studio V2.1 — CAD/BIM Authoring

Evolução da V2.0 focada na elaboração direta do projeto.

## Novidades
- criação rápida de paredes BIM no workspace;
- inserção de portas e janelas hospedadas em paredes, com hostWallId e indicação de recorte;
- modos OSNAP de projeto: Grid, Endpoint, Midpoint e Intersection preparados na interface;
- módulo Compartimentos/Áreas com deteção assistida a partir da planta CAD e edição manual;
- cálculo de área útil e perímetros;
- módulo Folhas/Peças Desenhadas com formatos A4–A0, escala, vista, piso e revisão;
- pacote RJP 2.1 inclui compartimentos e folhas;
- mantém DWG/DXF → BIM, IFC, biblioteca, MQT, orçamento, planeamento, obra e autos.

## Nota técnica
A deteção de compartimentos nesta versão é assistida/estimativa com base na geometria e paredes existentes; a resolução geométrica de ciclos fechados fica preparada como evolução seguinte. O recorte de vãos é registado semanticamente (hostCut/hostWallId) e visualmente destacado; boolean CSG real é o próximo passo do motor 3D.
