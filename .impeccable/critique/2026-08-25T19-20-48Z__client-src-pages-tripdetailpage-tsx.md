---
target: detalle del viaje con excesiva verticalidad
total_score: 22
p0_count: 0
p1_count: 2
timestamp: 2026-08-25T19-20-48Z
slug: client-src-pages-tripdetailpage-tsx
---
Method: dual-agent (A: /root/ui_design_review · B: /root/ui_detector_review)

## Design Health Score

| # | Heurística | Puntuación | Problema clave |
|---|---|---:|---|
| 1 | Visibilidad del estado | 3 | Buenos estados RTK; la relación visual entre mapa y lista podría ser más clara. |
| 2 | Correspondencia con el mundo real | 2 | Fechas y presupuesto todavía parecen valores técnicos. |
| 3 | Control y libertad | 2 | Cancelar un viaje final no ofrece confirmación ni deshacer. |
| 4 | Consistencia y estándares | 3 | Coherente, aunque el patrón de sección se repite en exceso. |
| 5 | Prevención de errores | 2 | El borrado está protegido; la cancelación irreversible no. |
| 6 | Reconocimiento antes que recuerdo | 3 | Las acciones son visibles, pero no se explica que una parada controla el mapa. |
| 7 | Flexibilidad y eficiencia | 1 | El escritorio no aprovecha columnas, accesos compactos ni navegación interna. |
| 8 | Estética y minimalismo | 2 | Limpia, pero expone demasiados bloques simultáneamente. |
| 9 | Recuperación de errores | 3 | Reintentos claros y conservación de datos anteriores. |
| 10 | Ayuda y documentación | 1 | Falta ayuda contextual sobre interacciones y consecuencias. |
| **Total** | | **22/40** | **Aceptable; requiere mejoras estructurales** |

## Veredicto de antipatrones

### Evaluación visual

Riesgo moderado de apariencia generada por acumulación, no por decoración. La
paleta teal/slate es sobria y no aparecen gradientes, glassmorphism, radios
excesivos ni sombras fantasma. El problema es la gramática repetida: una columna
estrecha, cada feature como bloque independiente, divisores constantes y
superficies blancas redondeadas. Parece una implementación tutorial cuidada más
que un espacio de trabajo de planificación.

### Detector determinista

El detector no encontró problemas en `TripDetailPage.tsx`. Un escaneo reducido
de sus componentes directos produjo una advertencia `gray-on-color` en
`DeleteTripAction.tsx:102`; es un probable falso positivo porque las clases
rojas y grises pertenecen a estados enabled/disabled mutuamente excluyentes.
No se detectaron antipatrones automáticos que expliquen la verticalidad: es un
problema de arquitectura de layout, no una infracción CSS aislada.

### Evidencia visual

No hubo overlay en navegador porque la conexión local rechazó la sesión antes
de crear una pestaña. La captura suministrada de 1879 × 909 confirmó la columna
estrecha y el gran espacio horizontal sin uso.

## Impresión general

La pantalla es legible, consistente y técnicamente responsable con sus estados,
pero el escritorio funciona como un móvil centrado. La oportunidad principal es
convertir la secuencia de componentes apilados en un espacio de trabajo donde
resumen, mapa, paradas y acciones puedan compararse sin tanto desplazamiento.

## Qué funciona

- Estados asíncronos maduros: skeletons, reintentos, estados vacíos y datos
  anteriores durante actualizaciones fallidas.
- Buena base accesible: semántica, ARIA, foco visible y reducción de movimiento.
- Vocabulario visual coherente: teal para interacción, rojo para destrucción y
  ámbar para advertencia.

## Problemas prioritarios

### [P1] El escritorio funciona como móvil centrado

**Por qué importa:** obliga a recorrer una columna larga mientras la mayor parte
del viewport queda vacía.

**Corrección:** retirar el `max-w-2xl` del contenedor interior, usar una cabecera
8/4 y un workspace de mapa/lista 7/5 desde `lg`; conservar una columna en móvil.

**Comando sugerido:** `$impeccable layout client/src/pages/TripDetailPage.tsx`.

### [P1] Cancelar el viaje es irreversible pero se ejecuta directamente

**Por qué importa:** `CANCELLED` es final y puede activarse por error, en
contraste con la eliminación que sí ofrece confirmación.

**Corrección:** agregar confirmación inline que explique la consecuencia antes
de ejecutar la transición.

**Comando sugerido:** `$impeccable harden client/src/features/trips/TripStatusActions.tsx`.

### [P2] La relación mapa-lista es poco descubrible

**Por qué importa:** las filas parecen registros estáticos y, al estar debajo
del mapa, una selección puede modificar una zona fuera de vista.

**Corrección:** mostrar mapa y lista lado a lado en escritorio, reforzar hover y
selección, y agregar microcopy que explique la interacción.

**Comando sugerido:** `$impeccable clarify client/src/features/trip-destinations/TripDestinationsSection.tsx`.

### [P2] Agregar parada ocupa espacio incluso cuando no es la tarea

**Por qué importa:** formulario, encabezado Resultados e instrucción vacía
alargan permanentemente una pantalla principalmente de consulta.

**Corrección:** usar divulgación progresiva: un botón contextual en Paradas
expande el compositor y Resultados aparece solo después de buscar.

**Comando sugerido:** `$impeccable distill client/src/features/trip-destinations/AddTripDestinationSection.tsx`.

### [P2] Los datos principales todavía parecen valores de backend

**Por qué importa:** fechas y presupuesto pierden legibilidad y confianza.

**Corrección:** localizar fechas y moneda con `Intl`, usando etiquetas como
Salida, Regreso y Presupuesto disponible.

**Comando sugerido:** `$impeccable typeset client/src/pages/TripDetailPage.tsx`.

## Carga cognitiva

Carga alta: 4 de 8 comprobaciones fallan. No hay foco único; la jerarquía asigna
peso similar a casi todas las secciones; estado, ruta, búsqueda, actividades y
borrado están expuestos simultáneamente; y falta divulgación progresiva. El
chunking, la agrupación interna, el número de opciones por decisión y la memoria
de trabajo sí están razonablemente resueltos.

## Recorrido emocional

El inicio se siente administrativo, el mapa es el pico más significativo, el
formulario abierto y Resultados vacío crean el valle, y la página termina en la
zona destructiva. La última impresión debería ser progreso o agenda próxima; la
eliminación puede quedar contraída al final.

## Alertas por persona

### Alex, usuario frecuente

- No puede aprovechar el ancho para comparar mapa y paradas.
- Debe recorrer toda la página para alternar ruta y actividades.
- Agregar una parada no está integrado en el contexto de Paradas.

### Jordan, usuario primerizo

- No descubre que pulsar una parada centra el mapa.
- Cancelar viaje no explica si puede recuperarse.
- El texto accidental `candidatos.lima` erosiona la confianza.

### Casey, usuario móvil distraído

- El orden móvil es válido, pero crecerá demasiado con más datos.
- Los resultados de búsqueda pueden desplazar varias pantallas las actividades.
- Las acciones de estado quedan lejos cuando trabaja en el itinerario.

## Observaciones menores

- Las filas `min-h-32` hacen crecer rápidamente la lista de paradas.
- El mapa fijo `h-72 sm:h-80` se apila encima de esas filas.
- No existe un estado visible si fallan las teselas del mapa.
- El skeleton general no representa la composición completa.
- La advertencia del detector en el botón eliminar parece un falso positivo.

## Preguntas a considerar

- ¿La tarea dominante es administrar el estado o construir el itinerario?
- ¿Agregar una parada merece una sección permanente o una acción contextual?
- Cuando existan 15 paradas y 30 actividades, ¿seguirá funcionando esta columna?
- ¿La página debería terminar emocionalmente en eliminar el viaje?
