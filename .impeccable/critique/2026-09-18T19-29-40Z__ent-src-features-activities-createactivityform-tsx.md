---
target: formulario expandido de nueva actividad
total_score: 21
p0_count: 0
p1_count: 2
timestamp: 2026-09-18T19-29-40Z
slug: ent-src-features-activities-createactivityform-tsx
---
# Crítica del formulario de nueva actividad

## Design Health Score

| # | Heurística | Puntaje | Problema principal |
|---|---|---:|---|
| 1 | Visibilidad del estado | 2/4 | La carga y los errores son claros, pero abrir y completar no se anuncian bien. |
| 2 | Relación con el mundo real | 2/4 | La zona horaria efectiva está oculta y las fechas de ayuda aparecen como ISO. |
| 3 | Control y libertad | 2/4 | `Cerrar formulario` y `Cancelar` duplican la salida y descartan sin distinguir cambios. |
| 4 | Consistencia | 3/4 | Los controles son familiares, pero las dos salidas usan vocabulario distinto. |
| 5 | Prevención de errores | 2/4 | Hay límites y validación, pero el usuario no ve cómo se interpretará la hora. |
| 6 | Reconocimiento | 2/4 | Al abrir el editor desaparece de la vista el contexto necesario del itinerario. |
| 7 | Eficiencia | 1/4 | Existe un único flujo global, sin preselección contextual ni atajos. |
| 8 | Diseño minimalista | 2/4 | Es limpio, pero plano, genérico y espacialmente costoso. |
| 9 | Recuperación de errores | 3/4 | Los errores son cercanos y se conservan los valores escritos. |
| 10 | Ayuda contextual | 2/4 | Existen ayudas, pero omiten la regla más importante: la zona horaria. |
| **Total** |  | **21/40** | **Aceptable; necesita mejoras importantes** |

## Veredicto sobre anti-patrones

No usa los clichés visuales más evidentes: no hay gradientes decorativos, glassmorphism, sombras enormes ni controles reinventados. Sin embargo, sí parece un formulario CRUD genérico por repetir una superficie blanca con borde fino, `rounded-xl`, campos de ancho completo y separación uniforme sin responder al contexto del itinerario.

El detector determinista devolvió `[]`: cero hallazgos en `CreateActivityForm.tsx` y `TripItinerarySection.tsx`. Ese resultado no contradice el diagnóstico; confirma que el problema no es una regla CSS aislada, sino la jerarquía y la colocación del conjunto.

No hubo overlay visual en navegador. La conexión falló antes de abrir una pestaña con `Mcp error: -32602: js: codex/sandbox-state-meta: missing field sandboxPolicy`. La evidencia alternativa fue la captura proporcionada, el código fuente y el detector CLI.

## Impresión general

Al pulsar una acción secundaria pequeña, aparece una superficie grande que desplaza el mapa y las paradas casi por completo. El usuario deja de sentir que está organizando un viaje y pasa a sentir que está llenando un registro administrativo. La oportunidad principal es conservar visible el contexto y organizar el editor por decisiones, no simplemente reducir padding.

## Lo que funciona

- Las bases de accesibilidad son buenas: etiquetas visibles, controles nativos, `aria-invalid`, errores asociados, `aria-expanded` y estado deshabilitado durante la mutation.
- El color es sobrio y funcional: teal para acciones y foco, slate para estructura, rojo para error.
- La gestión del formulario es sólida: validación local, errores del servidor sin perder los datos y texto de carga específico.

## Problemas prioritarios

### [P1] El formulario borra el contexto del itinerario

**Por qué importa:** para decidir parada y horario se necesitan el mapa, el destino y las actividades cercanas. La tarjeta de ancho completo empuja todo debajo del pliegue.

**Corrección:** mantener el editor inline, pero compacto. En escritorio, usar una composición de dos columnas donde el editor no ocupe toda la anchura y el contexto siga visible. En móvil, apilarlo con una franja contextual que muestre parada, rango y zona horaria.

### [P1] La zona horaria efectiva es invisible

**Por qué importa:** `datetime-local` parece inequívoco, pero el mapper interpreta la hora en la zona de la parada o en UTC para una actividad general. Se puede guardar una hora válida pero equivocada.

**Corrección:** mostrar texto dinámico como `Hora local de Bogotá · America/Bogota` o `Actividad general · horario UTC` junto al grupo temporal.

### [P2] Todos los campos tienen el mismo peso visual

**Por qué importa:** título e inicio son esenciales, mientras ubicación, descripción y final son opcionales. Ahora todos consumen casi la misma atención y altura.

**Corrección:** dividir en `Actividad`, `Cuándo` y `Detalles opcionales`. Mantener título/parada y horario visibles; hacer los detalles opcionales más compactos o desplegables. Usar una cuadrícula útil en escritorio en vez de seis campos largos.

### [P2] Salidas duplicadas y orden móvil inconsistente

**Por qué importa:** `Cerrar formulario` y `Cancelar` hacen lo mismo con nombres diferentes. Además, `flex-col-reverse` altera el orden visual respecto del orden de teclado.

**Corrección:** conservar una sola salida coherente, alinear orden visual y DOM, restaurar el foco al disparador y usar objetivos táctiles de al menos 44 px.

### [P2] El final del flujo no da suficiente confirmación

**Por qué importa:** al tener éxito el formulario desaparece, pero no queda claro dónde se insertó la actividad. Si se cierra con cambios, tampoco se diferencia entre cerrar y descartar.

**Corrección:** anunciar el éxito con una región viva y resaltar brevemente la actividad creada. Si el formulario está modificado, usar `Descartar`; si está intacto, `Cerrar`.

## Alertas por persona

**Jordan, usuario nuevo:** pierde el mapa al abrir el editor, no conoce la consecuencia horaria de `Actividad general` y puede no saber dónde terminó la nueva actividad.

**Sam, usuario de teclado o lector de pantalla:** no existe traslado/restauración explícita del foco; el `fieldset` no tiene una leyenda significativa; el orden visual móvil diverge del DOM; el éxito no se anuncia.

**Casey, usuario móvil distraído:** seis entradas generan desplazamiento largo, los campos opcionales aparecen demasiado pronto y no existe recuperación del borrador ante una interrupción.

## Observaciones menores

- La ayuda debería mostrar fechas localizadas en vez de `2026-08-31`.
- `Nueva actividad` tiene poca fuerza para encabezar una superficie tan grande.
- Los controles nativos son adecuados; no conviene reemplazarlos por componentes personalizados solo por apariencia.
- La franja gris oscura de la captura no nace de los dos archivos evaluados y debe diagnosticarse aparte.

## Preguntas para considerar

- ¿Agregar una actividad necesita ser un modo de página completa o un compositor contextual?
- ¿Qué debe seguir visible para programar con confianza: mapa, zona horaria, agenda cercana o los tres?
- ¿Título e inicio bastan para crear una actividad útil y editar luego los detalles opcionales?
- ¿Una acción desde cada parada debería abrir el mismo formulario con la parada preseleccionada?
