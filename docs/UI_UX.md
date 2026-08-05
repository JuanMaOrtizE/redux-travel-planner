# UI/UX y estilos

## Sistema de estilos

Los estilos del proyecto se harán con Tailwind CSS.

El estudiante ya usó Tailwind CSS en el proyecto Mesa de Servicio, así que no hace falta explicar desde cero clases básicas ya trabajadas. Sí se deben explicar patrones nuevos o usos más avanzados.

## Objetivo visual

Este proyecto debe tener una UI más cuidada que el proyecto anterior:

- mejor jerarquía visual;
- layout responsive;
- cards más pulidas;
- formularios más claros;
- estados vacíos;
- errores visibles;
- loading states;
- mapa integrado de forma natural;
- popups útiles y no decorativos.

## Uso posible de skills

Es posible usar skills de UI/UX como apoyo para:

- sugerir layouts;
- mejorar composición visual;
- revisar jerarquía;
- proponer estilos con Tailwind;
- diseñar estados vacíos;
- mejorar responsive;
- pulir formularios;
- mejorar mapa, marcadores y popups.

Las skills pueden orientar criterios visuales, pero el estudiante implementará el código salvo que solicite explícitamente que el agente lo haga.

## Regla de explicación

Cuando se sugieran clases nuevas de Tailwind, se debe explicar:

- qué efecto visual producen;
- qué idea de CSS representan;
- por qué son adecuadas para ese elemento.

No se deben repetir innecesariamente explicaciones de clases ya dominadas.

## Direccion visual del login

El login se tratara como una pantalla de acceso a un producto, no como una
landing page promocional.

- Se usara una composicion centrada y contenida dentro del layout existente.
- El fondo sera slate claro y el formulario vivira sobre una superficie blanca.
- La paleta conservara los colores teal y slate que ya usa la aplicacion.
- La superficie tendra borde sutil y esquinas moderadas; no usara gradientes,
  efectos de cristal ni sombras decorativas amplias.
- La jerarquia sera directa: titulo, explicacion breve, formulario y estados.
- Los campos conservaran etiquetas visibles y tendran estados claros de foco,
  error y deshabilitado.
- Los mensajes de validacion del cliente, los errores del servidor y el estado
  de envio se distinguiran visualmente sin cambiar sus responsabilidades.
- El diseno sera responsive desde movil y mantendra un ancho de lectura comodo
  en pantallas grandes.

La implementacion se dividira en microtareas: primero la estructura general,
despues campos, luego boton y estados, y finalmente accesibilidad y revision
responsive.
