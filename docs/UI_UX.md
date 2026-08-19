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

## Estado visible en la lista de viajes

- Cada tarjeta de `/trips` muestra una etiqueta de estado junto al titulo.
- Una linea superior solida de `2px` refuerza la identificacion sin convertir
  la tarjeta en una alerta ni usar gradientes decorativos.
- Planificacion usa ambar, confirmado azul, completado verde y cancelado rojo.
- La lista y el detalle comparten las mismas clases semanticas de la etiqueta.
- El encabezado interno permite salto de linea para que titulos largos y
  etiquetas no se superpongan en pantallas estrechas.

## Busqueda de destinos

- La pantalla sera una herramienta protegida y orientada a una tarea concreta,
  no una landing ni una coleccion de tarjetas decorativas.
- El encabezado explicara que los resultados son candidatos proporcionados por
  geocodificacion y que todavia no se guardan automaticamente.
- La primera version ejecutara la busqueda al enviar el formulario. No se haran
  peticiones en cada pulsacion ni se introducira debounce todavia.
- Antes del primer envio se mostrara una instruccion breve. La carga usara una
  estructura estable; el error permitira reintentar; un arreglo vacio explicara
  que conviene probar un termino mas especifico o alternativo.
- Los candidatos se presentaran como una lista semantica con nombre como dato
  principal y region, pais y coordenadas como contexto secundario.
- No habra botones inertes de guardar, seleccionar o agregar. Esas acciones se
  incorporaran cuando exista el flujo persistente que las respalde.
- La paleta y los controles reutilizaran el vocabulario visual teal, slate y
  rojo ya usado por los formularios del proyecto, con foco visible y contraste
  legible.
- La region de resultados permanece montada para conservar la estructura entre
  estados. Antes del envio orienta; durante la primera carga muestra
  placeholders; durante una actualizacion mantiene los datos visibles.
- Los fallos iniciales usan una alerta con reintento. Si falla una actualizacion
  y existe una respuesta actual en cache, se conserva la lista y se muestra un
  aviso no destructivo.
- Una respuesta vacia propone ampliar o reformular el termino. Una respuesta
  con candidatos usa una sola lista con divisores, no una cuadricula de tarjetas
  repetitivas.
- Cada candidato prioriza el nombre y presenta region, pais, coordenadas y zona
  horaria como contexto secundario. Los textos largos pueden envolver sin
  desbordar el contenedor.
- La navegacion principal anuncia `Destinos` cuando la pantalla ya ofrece una
  accion util. Los enlaces usan un estado activo visible y pueden envolver en
  pantallas estrechas sin imponer anchos fijos.

## Eliminacion de una parada

- `lucide-react` sera la unica libreria de iconos del cliente para conservar
  un trazo y unas proporciones consistentes entre acciones.
- La accion de la fila usara `MapPinMinus`: comunica que se quita una parada
  del recorrido con mas precision que una papelera, que podria sugerir que se
  borra tambien el destino reutilizable.
- El boton compacto podra mostrar solamente el icono, pero conservara un area
  interactiva minima de `44 x 44 px`, foco visible y un texto accesible con el
  nombre del destino. El significado no dependera solamente del color rojo.
- Dentro de la confirmacion en linea, la accion final conservara icono y texto
  visible porque es una accion destructiva que debe ser inequivoca.
- La accion se llamara `Quitar parada`, porque elimina la visita del viaje y
  no el destino reutilizable.
- Cada parada editable tendra una accion secundaria roja, sin convertir toda
  la fila en una zona de peligro.
- La confirmacion sera progresiva y permanecera dentro de los limites de la
  fila afectada; no usara un dialogo ni cubrira el resto de la pagina.
- Una capa posicionada sobre la fila aplicara un fondo blanco semitransparente
  y `backdrop-blur` al contenido de la parada. El desenfoque sera deliberado y
  local: comunicara que esa fila esta temporalmente bloqueada, no se usara como
  decoracion general de la interfaz.
- Sobre la informacion desenfocada apareceran la pregunta, la aclaracion sobre
  el destino reutilizable y las acciones `Cancelar` y `Quitar parada`.
- La capa no saldra de la fila y reservara altura suficiente para que el texto,
  los botones y un posible error no se recorten en pantallas estrechas.
- Mientras la mutation este pendiente, ambas acciones quedaran bloqueadas. El
  error permanecera dentro de la misma fila. En exito, la lista activa mostrara
  su estado de actualizacion durante el refetch y la fila desaparecera con la
  respuesta actualizada.
- Los viajes `COMPLETED` y `CANCELLED` no mostraran esta accion; el backend
  conservara la proteccion 409 como autoridad final.
