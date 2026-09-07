# RJP 3D Studio V2.2 — Smart CAD Authoring

Evolução do núcleo CAD/BIM da V2.1.

## Novidades principais
- desenho de paredes **clique-a-clique** em vista Planta;
- cadeia contínua de paredes, com botão **Terminar parede**;
- OSNAP aplicado ao desenho: Grid, Endpoint, Midpoint e Intersection;
- parede criada entre os dois pontos com comprimento e rotação calculados automaticamente;
- nível, cota, altura e espessura mantidos no objeto BIM;
- nova geometria 2D para encontros/interseções;
- deteção de compartimentos baseada em **ciclos fechados de paredes BIM**, com cálculo por polígono (área/perímetro), substituindo a estimativa por bounding box da V2.1;
- `RoomZone` passa a poder guardar o polígono do compartimento;
- mantém DWG/DXF → BIM, overlay CAD, layers, níveis/fases, biblioteca, MQT, orçamento, planeamento, obra, autos e folhas.

## Fluxo de autoria
1. Modelo 3D → Planta.
2. Escolher `Parede`.
3. Clicar no ponto inicial.
4. Clicar sucessivamente nos pontos seguintes.
5. `Terminar parede` para encerrar a cadeia.
6. Escolher OSNAP conforme necessário.
7. `Detetar divisões` para gerar compartimentos fechados.

## Próximos passos
- joins/trim geométricos reais em L/T/X;
- CSG para portas/janelas recortarem fisicamente as paredes;
- cotas associativas;
- layouts PDF A1/A3 e cortes/alçados derivados.
