## RJP 3D Studio V2.0 — Production BIM

Ver `README_V2_0_PRODUCTION_BIM.md`.

## V1.4.0 — Library+

Ver `README_V1_4_LIBRARY_PLUS.md`.

# RJP 3D Studio V1.1

## IFC / openBIM
- IFC4 passa a ser o formato principal de intercâmbio com o SmartStruct.
- Importar IFC, exportar IFC e atualizar um modelo existente por GUID/ID.
- O exportador inclui geometria prismática dos elementos, materiais e Property Sets RJP.
- O importador lê diretamente IFC produzidos pelo SmartStruct/RJP 3D Studio e entidades IFC suportadas. Geometrias IFC externas arbitrárias/tesselações complexas ainda requerem um kernel IFC dedicado; a aplicação não inventa geometria.

## Plantas e CAD
PDF/imagens continuam como bases gráficas. DWG/DWF/DWFx são reconhecidos/anexados e ficam preparados para adaptador CAD desktop.

## Construção
Mantém editor 3D, biblioteca, materiais, MQT, orçamento, planeamento, autos e base de caderno técnico.

## Compatibilidade
O importador legado `*.rjp3d.json` da V1.0 continua disponível apenas para transição; IFC é o formato recomendado.

## RJP Eng Hub
Esta versão aceita `?rjpProject=<id>&projectName=<nome>` no URL como base para integração pelo Hub. A persistência remota no Drive será acrescentada quando a pasta raiz RJP_ENG estiver configurada.

## GitHub Pages
Workflow único: Build WebApp -> Deploy WebApp + Build Android APK. Em Settings > Pages, usar Source: GitHub Actions.


## V2.2
Ver `README_V2_2_SMART_CAD_AUTHORING.md`.


## V2.3
Ver `README_V2_3_CAD_OPERATIONS.md`.


## V2.4
Ver `README_V2_4_PRODUCTION_DRAWINGS.md`.


## V2.5
Ver `README_V2_5_CAD_2D_TO_3D_PROJECT.md`.


## V2.6
Ver `README_V2_6_MULTI_FLOOR_CAD_TO_BIM.md`.


## V2.7
Ver `README_V2_7_CAD_ALIGNMENT.md`.


## V2.8
Ver `README_V2_8_TWO_POINT_ALIGNMENT.md`.
