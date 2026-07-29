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

### Destination

Campos previstos:

- `id`;
- identificador del proveedor externo, si está disponible;
- `name`;
- `country`;
- `countryCode`;
- `latitude`;
- `longitude`;
- `timezone`, opcional.

No contiene directamente `userId` ni `tripId`, porque un destino puede
reutilizarse en varios viajes y ser guardado por varios usuarios.

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
