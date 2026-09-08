# RJP 3D Studio V3.7.2 — Blank Screen / Library Fix

Causa identificada:
- famílias recentes usavam `m('plastic')`;
- o material `plastic` não existia;
- `m()` devolvia `undefined`;
- ao abrir a Biblioteca, `LibraryPreview` acedia a `item.material.texture`;
- isso lançava uma exceção React e deixava a aplicação totalmente em branco.

Correções:
- criado material `plastic`;
- `m()` tem fallback seguro;
- `LibraryPreview` tolera material ausente;
- cartão da Biblioteca tolera material ausente;
- mantém 329 famílias + linha de comandos CAD.
