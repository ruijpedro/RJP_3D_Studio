# RJP 3D Studio V1.8 — Smart BIM & Project Control

## Evolução principal
A V1.8 aprofunda o fluxo CAD → BIM → Orçamento → Planeamento → Obra → Autos.

### CAD / DWG → BIM
- Mantém leitura DWG local via LibreDWG/WebAssembly e DXF ASCII.
- Novo modo **AUTO · linhas duplas**.
- Procura pares de linhas paralelas do mesmo layer e converte-os numa única parede BIM.
- A distância entre as linhas passa a ser usada como espessura reconhecida da parede.
- Linhas não emparelhadas continuam a ser convertidas como paredes por eixo com a espessura definida pelo utilizador.
- Vãos importados procuram a parede BIM mais próxima e guardam `hostWallId` para evolução posterior do alojamento real de portas/janelas.
- Mantém rastreabilidade: ficheiro CAD, layer, função BIM, piso e método de reconhecimento.

### Orçamento
- Vista **Artigos** e vista **Capítulos**.
- Total contratual, executado em autos, saldo e execução financeira.
- Resumo por capítulo com contrato, executado, saldo e barra percentual.
- Exportação CSV com código, capítulo, descrição, unidade, quantidade, preço unitário e total.

### Planeamento
- KPI de atividades concluídas.
- Prazo total calculado a partir das tarefas.
- Legenda operacional de estados.

### Autos
- KPIs de autos emitidos, total medido, por medir e execução financeira.
- Mantém controlo de ultrapassagem da quantidade contratada com aviso de trabalho adicional.

## Compatibilidade
Mantém biblioteca BIM, IFC, editor 3D, MQT, Obra, Planeamento, Autos, importação de referências PDF/imagem e o pipeline Android/Capacitor das versões anteriores.
