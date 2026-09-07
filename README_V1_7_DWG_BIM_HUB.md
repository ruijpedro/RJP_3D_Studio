# RJP 3D Studio V1.7 — DWG/BIM Hub

## Evolução principal
A V1.7 transforma **Plantas / CAD** num CAD Hub para o fluxo de projeto:

**DWG / DXF → Layers → Função BIM → Modelo 3D → MQT → Orçamento → Planeamento → Obra → Autos**

### DWG nativo no browser
- Integração `@mlightcad/libredwg-web` / LibreDWG WebAssembly.
- Leitura local do DWG, sem upload obrigatório para backend.
- Extração de LINE/POLYLINE utilizável pelo motor CAD→BIM.
- Cópia automática dos assets WebAssembly para `public/cad-wasm` antes de `dev` e `build`.
- DXF ASCII mantém-se como fallback de compatibilidade.

> Nota de licença: `@mlightcad/libredwg-web`/LibreDWG é GPL-3.0. Rever obrigações de distribuição antes de publicar comercialmente uma versão que o incorpore.

### Mapeamento de layers
Cada layer importada pode ser:
- Parede
- Vão
- Pilar
- Eixo
- Referência
- Ignorar

A aplicação sugere funções pelo nome da layer e permite correção manual antes da geração BIM.

### Rastreabilidade
Os elementos criados guardam:
- ficheiro CAD de origem;
- layer CAD;
- função BIM atribuída;
- piso/nível;
- tipo de origem DWG/DXF.

### Parâmetros CAD→BIM
- escala para metros;
- altura de parede;
- espessura;
- nível/piso.

## Compatibilidade
PDF e imagens continuam como bases gráficas. DWF/DWFx permanecem como referência nesta versão.
