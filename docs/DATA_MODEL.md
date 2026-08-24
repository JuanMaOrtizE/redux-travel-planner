# Modelo de datos

## Principio general

La implementación será incremental, pero las relaciones se expresarán en
`schema.prisma` mediante campos de relación, claves foráneas, restricciones
únicas y reglas `onDelete`.

`User` no existe solo para autenticar. También es la raíz de propiedad que
permite determinar qué viajes puede consultar o modificar cada usuario.

## Relaciones previstas

```text
User 1 ─── N Trip
User N ─── N Destination       mediante SavedDestination
Trip N ─── N Destination       mediante TripDestination
Trip 1 ─── N Activity
TripDestination 1 ─── N Activity   relación opcional desde Activity
Trip 1 ─── N BudgetItem
Activity 1 ─── N BudgetItem        relación opcional desde BudgetItem
```

No existe por ahora una relación uno a uno natural. No se creará una tabla
separada únicamente para forzar ese tipo de relación.

## Entidades

### User

Campos previstos:

- `id`;
- `name`;
- `email`, único;
- `passwordHash`;
- `createdAt`;
- `updatedAt`.

Relaciones:

- tiene muchos viajes;
- puede guardar muchos destinos mediante `SavedDestination`.

### Trip

Campos previstos:

- `id`;
- `userId`;
- `title`;
- `description`, opcional;
- `startDate`;
- `endDate`;
- `status`;
- `currency`;
- `budgetLimit`, opcional;
- `createdAt`;
- `updatedAt`.

Pertenece a un usuario y contiene destinos, actividades y elementos de
presupuesto.

Decisiones implementadas:

- `startDate` y `endDate` se almacenan como fechas sin hora mediante
  `@db.Date`;
- `status` usa `TripStatus` con `PLANNING`, `CONFIRMED`, `COMPLETED` y
  `CANCELLED`;
- las transiciones permitidas son `PLANNING -> CONFIRMED/CANCELLED` y
  `CONFIRMED -> COMPLETED/CANCELLED`;
- `COMPLETED` y `CANCELLED` son estados finales en esta version;
- enviar nuevamente el mismo estado no se considera una transicion invalida y
  permite reintentos; si el PATCH llega a Prisma, `updatedAt` puede cambiar;
- `currency` usa un texto de tres caracteres;
- `budgetLimit` usa `Decimal(12, 2)` y es opcional;
- `userId` es una clave foranea UUID obligatoria;
- eliminar un usuario elimina sus viajes mediante `onDelete: Cascade`;
- existe un indice compuesto por `userId` y `startDate`.

### Destination

Campos previstos:

- `id`;
- `providerId`, identificador obligatorio y unico de Open-Meteo;
- `name`;
- `country`, opcional;
- `countryCode`, opcional;
- `region`, opcional;
- `latitude`;
- `longitude`;
- `timezone`, opcional.
- `createdAt`;
- `updatedAt`.

No contiene directamente `userId` ni `tripId`, porque un destino puede
reutilizarse en varios viajes y ser guardado por varios usuarios.

Decisiones para la primera version:

- solo se integra Open-Meteo, por lo que `providerId` puede ser unico sin una
  columna adicional de proveedor;
- si se incorpora un segundo proveedor, la identidad se migrara a una
  restriccion compuesta `provider + providerId`;
- los campos que Open-Meteo puede omitir permanecen nulos en PostgreSQL; no se
  reemplazan por cadenas vacias;
- las coordenadas usan `Float`/`DoublePrecision`: son mediciones geograficas,
  no importes monetarios que requieran aritmetica decimal exacta;
- `Destination` sigue siendo reutilizable. Las relaciones con usuarios y
  viajes se agregaran mediante las tablas puente previstas.

### TripDestination

Tabla puente explícita entre `Trip` y `Destination`.

Campos previstos:

- `id`;
- `tripId`;
- `destinationId`;
- `position`;
- `arrivalDate`, opcional;
- `departureDate`, opcional;
- `notes`, opcional.

La tabla puente es explícita porque la participación de un destino en un viaje
tiene información propia.

Reglas de orden:

- `position` comienza en `1` y representa el lugar de la parada dentro del
  viaje;
- al crear una parada, el backend calcula `position` como la siguiente del
  viaje; el cliente no envia este valor;
- una posicion no puede repetirse dentro del mismo viaje, por lo que la
  combinacion `tripId + position` sera unica;
- un viaje puede visitar el mismo destino mas de una vez. Por esa razon no se
  declara como unica la combinacion `tripId + destinationId`;
- el valor positivo de `position` se validara en la entrada de la aplicacion;
  la restriccion compuesta protege en PostgreSQL la ausencia de posiciones
  duplicadas.

Reglas de fechas de una parada:

- `arrivalDate` y `departureDate` son opcionales e independientes, porque una
  parada puede comenzar a planificarse con una sola fecha conocida;
- se almacenan como `DateTime` con tipo nativo `Date`, ya que representan dias
  del calendario y no instantes con hora o zona horaria;
- cuando existen ambas, `arrivalDate` no puede ser posterior a
  `departureDate`;
- las fechas de la parada deben quedar dentro de `Trip.startDate` y
  `Trip.endDate`;
- las dos ultimas reglas se validaran en el servicio del backend, porque
  requieren comparar valores de la entrada y del viaje relacionado. El modelo
  Prisma solo expresa la nulabilidad y el tipo fisico de las columnas.
- la regla se comprobara tanto al crear o actualizar una parada como al
  modificar el rango general de `Trip`; reducir el viaje no puede dejar
  paradas existentes fuera de sus nuevas fechas.

Reglas de notas de una parada:

- `notes` es opcional y pertenece a la visita concreta, no al destino
  reutilizable;
- se almacena como `String?` con tipo nativo `Text`;
- el contrato HTTP limitara el contenido a 1000 caracteres y normalizara el
  texto vacio para persistir `null`;
- no se usa un valor por defecto: ausencia de nota se representa con `null`.

Reglas de estado del viaje:

- se pueden agregar, editar, reordenar o eliminar paradas mientras el viaje
  este en `PLANNING` o `CONFIRMED`;
- `COMPLETED` y `CANCELLED` son estados finales y su itinerario queda bloqueado
  para escritura;
- las consultas del viaje y sus paradas siguen permitidas en estados finales;
- el servicio aplica esta regla antes de iniciar cualquier escritura.

Indices de la tabla puente:

- la restriccion unica `tripId + position` crea un indice compuesto que cubre
  las consultas de paradas por viaje y su orden;
- `destinationId` tendra un indice independiente para las consultas inversas
  y para localizar eficientemente las relaciones afectadas al eliminar un
  destino;
- no se agrega otro indice independiente sobre `tripId`, porque duplicaria el
  prefijo izquierdo del indice compuesto existente.

### SavedDestination

Tabla puente entre `User` y `Destination`.

Campos previstos:

- `userId`;
- `destinationId`;
- `createdAt`.

La combinación `userId + destinationId` será única.

### Activity

Campos previstos:

- `id`;
- `tripId`;
- `tripDestinationId`, opcional;
- `title`;
- `description`, opcional;
- `startsAt`;
- `endsAt`, opcional;
- `locationName`, opcional;
- `status`;
- `createdAt`;
- `updatedAt`.

Siempre pertenece a un viaje y puede asociarse con una parada concreta. La
interfaz agrupará actividades por fecha; no se creará inicialmente una tabla
`ItineraryDay` sin datos propios.

Decisiones para la primera version:

- `status` usara un enum propio `ActivityStatus` con `PLANNED`, `CONFIRMED`,
  `COMPLETED` y `CANCELLED`; no se reutiliza `TripStatus` porque ambos ciclos de
  vida pueden evolucionar de forma independiente;
- `startsAt` sera obligatorio y `endsAt` opcional; ambos se almacenaran como
  `DateTime` con `@db.Timestamptz(3)` porque representan instantes con hora y no
  solo dias del calendario;
- los contratos usaran fechas ISO con zona u offset. La presentacion usara la
  zona IANA de la parada asociada cuando exista y UTC como respaldo para una
  actividad general o un destino sin zona;
- cuando exista `endsAt`, no podra ser anterior a `startsAt`;
- la fecha local de inicio y, cuando corresponda, la de fin deberan quedar
  dentro de `Trip.startDate` y `Trip.endDate`;
- `tripId` sera obligatorio y su relacion usara `onDelete: Cascade`;
- `tripDestinationId` y la relacion correspondiente seran opcionales y usaran
  `onDelete: SetNull`, por lo que quitar una parada conserva la actividad como
  general del viaje;
- el servicio comprobara que una parada asociada pertenece al mismo viaje que
  `tripId`; dos claves foraneas validas por separado no garantizan esa regla;
- las actividades solo podran modificarse mientras el viaje este en `PLANNING`
  o `CONFIRMED`;
- `title` usara `VarChar(160)`, `description` sera `Text` opcional y
  `locationName` usara `VarChar(200)` opcional;
- el contrato de creacion exigira entre 2 y 160 caracteres para `title`,
  limitara `description` a 2000 caracteres y normalizara los textos opcionales
  vacios a `null`;
- habra un indice compuesto `tripId + startsAt` para listar el itinerario en
  orden y un indice sobre `tripDestinationId` para consultas por parada y la
  accion `SetNull`;
- presupuesto y clima no se incluiran en esta migracion.

### BudgetItem

Campos previstos:

- `id`;
- `tripId`;
- `activityId`, opcional;
- `category`;
- `description`;
- `estimatedAmount`;
- `actualAmount`, opcional;
- `createdAt`;
- `updatedAt`.

Los importes usarán un tipo decimal para evitar errores de precisión. Un
elemento siempre pertenece a un viaje y puede relacionarse con una actividad.

## Datos no persistidos inicialmente

- El clima se consultará desde Open-Meteo y se manejará con la caché de RTK
  Query.
- No habrá tabla de sesiones mientras la autenticación use JWT en cookie
  `httpOnly`.
- No habrá tabla `ItineraryDay` mientras el día pueda derivarse de `startsAt`.

## Reglas de borrado previstas

- eliminar un usuario elimina sus viajes;
- eliminar un viaje elimina sus relaciones, actividades y presupuesto;
- quitar un destino de un viaje no elimina el destino reutilizable;
- quitar una parada puede dejar su actividad como actividad general del viaje;
- eliminar una actividad puede conservar su gasto dentro del viaje con
  `activityId` nulo.

Estas reglas se concretarán con `Cascade`, `Restrict` o `SetNull` al definir cada
modelo Prisma.

## Orden de implementación

1. `User`;
2. `Trip` y su relación con `User`;
3. `Destination`, `TripDestination` y `SavedDestination`;
4. `Activity`;
5. `BudgetItem`.

Diseñar todo el conjunto no obliga a crear todas las tablas en una sola
migración.
