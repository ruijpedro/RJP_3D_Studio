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


## V2.8.2
Ver `README_V2_8_2_DWG_WASM_FIX.md`.


## V2.9
Ver `README_V2_9_PAN_UX.md`.


## V3.0
Ver `README_V3_0_CAD_BIM_3D_UI.md`.


## V3.1
Ver `README_V3_1_PRO_VIEWPORT.md`.


## V3.2
Ver `README_V3_2_PLAN_ENGINE.md`.


## V3.2.1
Ver `README_V3_2_1_BUILD_FIX.md`.


## V3.2.3
Ver `README_V3_2_3_BUILD_FIX.md`.


## V3.2.4
Ver `README_V3_2_4_PROPERTIES_DRAWER.md`.


## V3.3
Ver `README_V3_3_VISUAL_LIBRARY.md`.


## V3.4
Ver `README_V3_4_BIM_LIBRARY_PRO.md`.


## V3.5
Ver `README_V3_5_LIBRARY_EXPERIENCE.md`.


## V3.6
Ver `README_V3_6_LIBRARY_NAVIGATOR.md`.


## V3.7
Ver `README_V3_7_CAD_COMMAND_LINE.md`.


## V3.7.1
Correção da biblioteca e do erro sintático residual da V3.7.
