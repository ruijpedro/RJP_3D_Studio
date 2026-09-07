# RJP 3D Studio V1.5.0 — Library Pro

Evolução da V1.4 com biblioteca BIM substancialmente ampliada.

## Biblioteca
- 257 elementos BIM parametrizáveis.
- 50 materiais.
- Categorias acrescentadas/reforçadas: Fundações, Estrutura metálica, Pré-fabricados, LSF, Divisórias, Tetos, Segurança contra incêndio, Acessibilidade, Mobilidade vertical, Cozinha, Escritório, Comercial, IT/Telecom, Segurança, AVAC, Redes hidráulicas, Elétrica, Infraestruturas e Equipamento de obra.
- Mantém as famílias anteriores de Estrutura, Arquitetura, Reabilitação, Madeira, Vãos, Cobertura, Drenagem, Acabamentos, Fachadas, Energia, Mobiliário, Sanitários, Exterior e Paisagismo.
- Pesquisa e filtro por categoria continuam disponíveis.
- Dimensões e material visíveis em cada cartão da biblioteca.

## CAD → BIM
Mantém o fluxo da V1.3/V1.4: DXF ASCII LINE/LWPOLYLINE no browser, pré-visualização vetorial e conversão em paredes BIM parametrizadas; PDF/imagens como base gráfica; DWG/DWF/DWFx preservados para conversão/adaptador CAD desktop.

## Editor 3D
Mantém Mover / Rodar / Escalar, snap 5 cm e 5°, edição numérica de posição, dimensão e rotação.

## Validação
- IDs dos elementos e materiais verificados como únicos.
- Referências de materiais verificadas.
- Imports relativos verificados.
- O build neste ambiente continua dependente da instalação das dependências npm; sem `node_modules`, TypeScript reporta os typings React/Vite em falta. O `package.json` mantém essas dependências declaradas para instalação no GitHub Actions/local.
