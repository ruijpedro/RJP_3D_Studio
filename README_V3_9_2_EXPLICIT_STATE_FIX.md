# RJP 3D Studio V3.9.2 — Explicit State Build Fix

O build anterior continuava a acusar os estados da Biblioteca/drag & drop como inexistentes.
Nesta versão, os cinco estados deixaram de fazer parte da longa declaração encadeada do App.tsx
e passaram a declarações `const` independentes e explicitamente tipadas:

- `libraryDockOpen`
- `placingLibraryId`
- `libraryPreviewId`
- `dragLibraryId`
- `placingRotation`

Também foram explicitados os tipos dos callbacks boolean/number que geravam TS7006.
