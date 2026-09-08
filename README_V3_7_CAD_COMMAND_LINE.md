# RJP 3D Studio V3.7 — CAD Command Line

A interface CAD ganha uma linha de comandos ao estilo CAD.

## Comandos de desenho
- `LINHA`, `LINE`, `L` — 2 pontos criam **uma parede BIM**;
- `POLILINHA`, `PLINE`, `PL` — sequência contínua de paredes BIM;
- `PAREDE`, `WALL`, `W` — sequência de paredes;
- `RETANGULO`, `RECT`, `REC` — 2 cantos geram 4 paredes BIM;
- `PORTA`, `DOOR`;
- `JANELA`, `WINDOW`;
- `COTAR`, `DIM`.

## Modificação
`MOVER/M`, `RODAR/RO`, `ESCALAR/SC`, `COPIAR/CO`, `ESPELHO/MI`, `OFFSET/O`,
`TRIM/TR`, `JOIN/J`, `APAGAR/DEL`, `OCULTAR`, `MOSTRAR`.

## Navegação
`PAN/H`, `ENQUADRAR/F`, `PLANTA/TOP`, `3D`, `FRENTE/FRONT`, `DIREITA/RIGHT`, `GRELHA/G`.

## Configuração
- `ALTURA 2.80`
- `ESPESSURA 0.20`
- `SNAP GRID`
- `SNAP END`
- `SNAP MID`
- `SNAP INT`

## Projeto
`COMPARTIMENTOS`, `PROPRIEDADES`, `BIBLIOTECA`, `IMPORTAR`, `AJUDA`.

Enter executa o comando; durante uma polilinha/parede, Enter sem texto termina a cadeia. Arrow Up recupera o último comando e Esc cancela.
