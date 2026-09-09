# RJP 3D Studio V3.9.1 — Build Fix

Correção da V3.9 Drag & Drop.

A V3.9 introduziu o dock/drag-and-drop da Biblioteca, mas as variáveis de estado novas ficaram usadas no código sem terem sido adicionadas ao bloco principal de `useState`.

Estados adicionados:
- `libraryDockOpen`
- `placingLibraryId`
- `libraryPreviewId`
- `dragLibraryId`
- `placingRotation`

Isto elimina os erros TS2304 e também os TS7006 associados aos setters sem tipo resolvido.
