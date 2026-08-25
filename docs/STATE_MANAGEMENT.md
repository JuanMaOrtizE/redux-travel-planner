# Manejo de estado

## Objetivo

Este proyecto se usará para aprender Redux Toolkit de forma progresiva.

El estudiante ya usó `useState`, `useReducer` y Context API en el proyecto Mesa de Servicio. Redux Toolkit debe explicarse tomando esos conceptos como punto de comparación, no como si el estudiante no conociera estado en React.

## Regla base

No todo estado debe ir a Redux.

La regla inicial será:

- estado local para cosas pequeñas de un componente;
- Redux para estado compartido o importante para varias zonas de la app;
- RTK Query para datos que vienen del backend o de APIs.

## Conceptos a aprender

## `store`

Es el contenedor central del estado global.

Ejemplo conceptual:

```ts
store = {
  ui: {
    sidebarOpen: false
  },
  auth: {
    user: null
  }
}
```

## `slice`

Es una parte del estado junto con las acciones que pueden modificarla.

Ejemplo conceptual:

```ts
uiSlice = estado inicial + reducers de UI
```

Un `slice` se parece a organizar una parte de lo que antes podía vivir disperso en `useState` o `useReducer`, pero con reglas más claras para estado global.

## `dispatch`

Es la forma de pedirle a Redux que ocurra un cambio.

No se cambia el estado directamente desde el componente. El componente despacha una acción.

## `selector`

Es una función para leer una parte del estado.

Ejemplo conceptual:

```ts
selectSidebarOpen(state)
```

## RTK Query

Se usará para peticiones HTTP, cache, loading y errores.

En vez de manejar manualmente:

- `isLoading`;
- `error`;
- `data`;
- `fetch`;
- cache;

RTK Query dará hooks generados para consultar o modificar datos.

## Punto de partida del estudiante para RTK Query

El estudiante comienza esta etapa sin conocimiento previo de RTK Query. Su
enseñanza debe comenzar desde cero y avanzar como un curso práctico guiado. No
se asumirá que términos como API slice, endpoint, query, mutation, caché,
suscripción, tag, invalidación o hook generado ya son conocidos.

Conocer Redux Toolkit básico no implica conocer RTK Query. Se explicará la
diferencia entre:

- estado local del componente;
- estado global de cliente administrado por slices;
- estado remoto o de servidor administrado por RTK Query.

## Método de enseñanza de RTK Query

Cada microtarea seguirá este orden:

1. Presentar el problema observable en la aplicación.
2. Mostrar cómo se resolvería conceptualmente con `fetch`, `useEffect` y
   `useState`.
3. Explicar qué parte repetitiva asumirá RTK Query.
4. Dibujar o describir el flujo completo de datos.
5. Introducir una sola pieza nueva siempre que sea posible.
6. Explicar línea por línea los elementos nuevos, incluidos los tipos de
   TypeScript.
7. Permitir que el estudiante escriba el código.
8. Revisar primero el comportamiento y después el estilo.
9. Ejecutar las comprobaciones correspondientes.
10. Cerrar con una recapitulación y conectar la pieza con la siguiente lección.

No se entregarán fragmentos para copiar sin explicar:

- por qué el archivo existe;
- por qué está en esa ubicación;
- qué recibe cada función;
- qué devuelve;
- qué se registra en el store;
- qué queda almacenado en caché;
- qué provoca un nuevo renderizado.

## Recorrido previsto de RTK Query

1. Problema del manejo HTTP manual y concepto de estado del servidor.
2. `createApi` como definición central de una API.
3. `fetchBaseQuery` y configuración de `baseUrl` y cookies.
4. `reducerPath` y reducer generado.
5. Middleware de RTK Query y ciclo de vida de las peticiones.
6. Registro del API slice en el store.
7. Primer endpoint de tipo `query`.
8. Hook generado y estados de una consulta.
9. Diferencia entre `isLoading` e `isFetching`.
10. Claves de caché, suscripciones y reutilización de resultados.
11. Primera `mutation`.
12. Tags, invalidación y refetch.
13. Manejo y presentación de errores.
14. Integración completa del CRUD de viajes.

Antes de cada punto se explicará qué problema resuelve y cómo se conecta con lo
aprendido anteriormente. El recorrido puede dividirse todavía más si una pieza
no está comprendida.

La comprensión se comprobará principalmente mediante la implementación y la
revisión del código. No se exigirán cuestionarios teóricos para desbloquear el
siguiente paso; las explicaciones se repetirán en contexto cuando aparezca cada
pieza.

## Nivel de explicación esperado

Cada concepto nuevo de Redux Toolkit debe explicarse con:

- problema que resuelve;
- ejemplo pequeño;
- flujo antes/después;
- relación con conceptos conocidos;
- error común;
- criterio para saber si está bien implementado.

## Orden de aprendizaje

1. Estado local en una pantalla simple.
2. Primer slice de UI.
3. Lectura con selector.
4. Cambio con dispatch.
5. RTK Query para datos de backend.
6. Estados derivados y selectores más útiles.

## Cambio de estado de un viaje

El cliente usa una mutation `updateTrip` para ejecutar el endpoint existente
`PATCH /api/trips/:tripId`.

La mutation recibe un objeto con dos responsabilidades separadas:

- `tripId` construye la URL del viaje;
- `changes` se envia como cuerpo JSON y, en esta etapa, contiene `status`.

El componente no modifica manualmente el viaje guardado en Redux ni mantiene
una copia del estado del servidor con `useState`. El flujo es:

1. el usuario elige una transicion permitida;
2. el trigger envia el `PATCH` y RTK Query activa `isLoading`;
3. el backend valida el estado y Prisma actualiza PostgreSQL;
4. `.unwrap()` resuelve en exito o rechaza en error;
5. en exito, la mutation invalida `Trips`;
6. `getTrip` y `getTrips`, si tienen suscripciones activas, pueden repetir sus
   peticiones y actualizar la interfaz con el dato real;
7. en error no se invalida la tag porque PostgreSQL no cambio.

`pendingStatus` es estado local de interfaz y solo identifica que texto de
carga debe mostrarse. No representa ni reemplaza el estado persistido del
viaje.

## Composicion de las caches del itinerario

`TripItinerarySection` se suscribe a dos entradas de cache distintas para el
mismo `tripId`:

- `getTripDestinations(tripId)` aporta el recorrido y la informacion geografica;
- `getActivities(tripId)` aporta la agenda ordenada por el backend.

El componente no copia esos arreglos a un slice ni a `useState`. En cada
renderizado recorre las actividades y deriva una lista general y un `Map` cuya
clave es `tripDestinationId`. Esa estructura solo organiza la presentacion; la
fuente de verdad sigue siendo la cache de RTK Query.

Los estados de ambas consultas permanecen independientes. Un fallo de
actividades no elimina el mapa ni las paradas ya disponibles, y un refetch con
datos previos conserva la ultima version visible. Al quitar una parada, la
mutation invalida las tags `TripDestinations/tripId` y `Activities/tripId`
porque PostgreSQL elimina la fila puente y convierte en `null` la relacion de
sus actividades mediante `SetNull`.

La parada seleccionada y la confirmacion abierta si usan `useState`: son estado
temporal de interfaz, no datos persistidos. Ambos identificadores se limpian
solo cuando la parada correspondiente deja de existir en la respuesta actual.
