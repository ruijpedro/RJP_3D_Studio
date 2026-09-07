# RJP 3D Studio V3.3 — Visual BIM Library

## Biblioteca
- cartões completamente redesenhados;
- miniaturas vetoriais por tipologia em vez de simples quadrados de material;
- representação visual de paredes, vigas, pilares, portas, janelas, escadas, tubagens, AVAC, árvores, sanitários, mobiliário e equipamentos;
- material, categoria e dimensões continuam visíveis;
- grelha da biblioteca mais compacta e visual.

## Modelo 3D
A alteração principal é no motor Three.js: os elementos deixam de ser todos `BoxGeometry`.
O novo `elementFactory.ts` cria geometria procedural por tipo e, quando possível, pelo nome do objeto.

Exemplos:
- cadeira com assento, costas e pernas;
- mesa com tampo e pernas;
- sanita e lavatório reconhecíveis;
- janela com caixilho e vidro;
- porta com folha, aro e puxador;
- escada com degraus;
- árvore com tronco e copa;
- tubagens cilíndricas;
- condutas retangulares;
- equipamento técnico com grelhas/painel;
- cobertura com forma inclinada.

Mantém dimensões, seleção, Move/Rotate/Scale e ligação BIM.
