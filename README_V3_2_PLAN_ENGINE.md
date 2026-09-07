# RJP 3D Studio V3.2 — Plan Recognition Engine

## Objetivo
Transformar plantas 2D em PDF, DWG e DXF numa base geométrica comum para reconstrução BIM 3D.

## PDF vetorial
O motor usa PDF.js no browser para extrair paths, linhas e retângulos da primeira página. A geometria é convertida em segmentos CAD internos e recebe pseudo-layers de interpretação.

## PDF digitalizado / imagem
Quando o PDF tem pouca geometria vetorial, o motor renderiza a página localmente e executa deteção simples de linhas horizontais/verticais longas. É um fallback para scans, sem enviar a planta para servidor.

## Revisão e confiança
Cada PDF recebe:
- modo de interpretação;
- número de vetores/segmentos;
- confiança estimada;
- avisos;
- possibilidade de calibrar a escala com uma distância conhecida.

## Pipeline
PDF/DWG/DXF → extrair → limpar → calibrar escala → interpretar → rever → gerar BIM 3D.

## Estado V3.2
A prioridade desta versão é paredes/linhas e compartimentos. Portas, janelas, escadas, texto semântico e símbolos serão reforçados nas versões seguintes.
