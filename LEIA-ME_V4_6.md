# RJP 3D Studio V4.6 — BIM e orçamento

## Novidades
- Pesquisa BIM: filtro por formato, favoritos, ordenação alfabética e resultados em grupos de 60.
- Orçamento: painel BIM 5D com consulta do Gerador de Preços CYPE e ligação direta à laje de escada.
- Cada artigo pode guardar URL HTTPS, data, configuração e origem do preço.
- Atualização das quantidades do modelo preserva preços, códigos, descrições, fontes e planeamento existentes. Artigos manuais e artigos de elementos removidos são conservados para revisão.
- Critério de medição selecionável: un, m, m² e m³. Conferir unidade antes de associar um preço.
- CSV de orçamento inclui origem, configuração, data, elemento BIM e piso.
- Importação de preços CSV com validação e associação individual antes da alteração do orçamento.
- Correção de separadores literais no CSS da biblioteca.

## Utilização
1. Crie/importe o modelo e abra Orçamento.
2. Clique em Atualizar quantidades BIM.
3. Selecione o artigo de destino e confirme o critério de medição.
4. Consulte a CYPE, configure a solução e introduza o preço, a data e a configuração. Ou importe o CSV preenchido segundo o modelo disponível no painel.
5. Clique em Associar preço. Guarde/exporte o projeto completo para transportar o orçamento e as suas fontes.

O exemplo EHE010 é uma referência consultada em 16/10/2026: 136,16 €/m² para a configuração descrita no painel. Não é um preço atualizado em tempo real nem uma validação estrutural. A configuração e as regras de medição devem ser conferidas na página original:
https://geradordeprecos.info/obra_nova/Estruturas/Betao_armado/Escadas/Laje_de_escada.html

A integração abre a fonte e permite registar/importar dados manualmente; não contém API CYPE, extração automática, sincronização de preços, importador BC3 ou importador XLSX. Para dados preparados no Excel use CSV UTF-8 com ponto e vírgula. Podem ser necessárias credenciais próprias na CYPE para exportar.

## Medições
Medições brutas por dimensões: paredes L×H; restantes áreas X×Y; volumes X×Y×Z; comprimentos X (tubos Z). Não são deduzidos vãos. Escadas, coberturas inclinadas e peças complexas exigem conferência ou correção manual da quantidade. Atualizar quantidades BIM recalcula as quantidades geométricas, incluindo quantidades antes editadas manualmente. Valores internos anteriores são estimativas por confirmar.

## Instalação e verificação
Código completo, workflow Android existente e compilação Web em dist/ incluídos. Não contém APK compilado.
- npm ci
- npm run build
- npm run dev
- node scripts/test-bim-budget.mjs
Para publicar a WebApp use o conteúdo de dist/ num servidor HTTP(S); abrir index.html diretamente no disco não é suportado.

Validação realizada: compilação TypeScript/Vite e testes de cálculo, preservação de preços e planeamento, CSV e URLs. Interface não foi validada num dispositivo Android nem num navegador nesta execução. Permanecem avisos do empacotador sobre tamanho dos ficheiros e compatibilidade da dependência DWG.
