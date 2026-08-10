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

## Confirmacion para eliminar un viaje

- La eliminacion usara un popup modal porque es una accion irreversible y
  necesita una pausa de confirmacion antes de ejecutar la mutation.
- Se usara el elemento nativo `<dialog>` para obtener comportamiento modal,
  manejo de foco y cierre con `Escape` sin instalar una dependencia.
- El fondo tendra una capa oscura semitransparente con desenfoque sutil. El
  blur pertenece al backdrop y ayuda a separar la decision del resto de la
  pagina.
- La superficie del dialogo sera blanca y opaca; no se usara glassmorphism.
- El mensaje identificara el viaje y explicara que la accion no se puede
  deshacer.
- `Cancelar` sera la salida segura y `Eliminar viaje` la accion destructiva
  roja. El foco inicial favorecera la opcion segura.
- Mientras el DELETE este pendiente, no se podra repetir la accion ni cerrar
  accidentalmente el dialogo.
- Hacer clic sobre el backdrop cerrara el dialogo cuando este inactivo. Durante
  el DELETE pendiente, el clic exterior no podra cerrarlo.
- Un error mantendra abierto el dialogo y mostrara una alerta; un exito
  navegara a `/trips` con reemplazo del historial.
- La responsabilidad vivira en
  `client/src/features/trips/DeleteTripAction.tsx`, que recibira el id y el
  titulo del viaje y coordinara dialogo, mutation y navegacion.

## Direccion visual de Inicio

- Inicio funcionara como un resumen confiable de la informacion real del
  usuario, no como una landing page con estadisticas ficticias.
- La personalidad sera calida y editorial, relacionada con viajes, pero
  conservara la base sobria de teal, slate y superficies claras.
- La calidez se construira primero mediante jerarquia, textos y datos utiles;
  no se agregaran imagenes o tarjetas decorativas solo para llenar espacio.
- `Crear viaje` sera una accion real que navegara a `/trips/new`.
- Las funcionalidades futuras, como destinos, no se mostraran como acciones
  disponibles antes de estar implementadas.
- No se sumaran presupuestos de viajes con monedas distintas. El resumen usara
  metricas que puedan calcularse correctamente con los datos actuales.
- La primera iteracion mostrara viajes creados, viajes en planificacion y
  viajes con presupuesto definido, incluyendo estados de carga y error.

## Acciones de estado del viaje

- El detalle mostrara acciones contextuales en lugar de un selector libre.
- Un viaje en planificacion puede confirmarse o cancelarse.
- Un viaje confirmado puede marcarse como completado o cancelarse.
- Los viajes completados y cancelados no muestran nuevas transiciones en esta
  primera version.
- La accion en curso deshabilita todas las transiciones para evitar peticiones
  simultaneas y comunica un texto especifico como `Confirmando...`.
- Los errores permanecen junto a las acciones y un exito se anuncia mediante
  `role="status"`.
- La eliminacion se conserva separada en una zona de peligro porque borrar un
  viaje no equivale a cambiar su estado a cancelado.
- Durante el refetch provocado por la invalidacion, el detalle conserva la
  informacion visible y muestra un aviso de actualizacion.
