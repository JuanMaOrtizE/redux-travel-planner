# Estado del proyecto

## Estado actual

- Proyecto creado en `C:\proyectos\redux-travel-planner`.
- Cliente inicial creado con Vite + React + TypeScript en `client/`.
- Dependencias iniciales del cliente instaladas.
- Documentación inicial creada en `docs/`.
- Reglas de mentoría creadas en `AGENTS.md`.
- Tailwind CSS v4 instalado en `client/` y configurado con el plugin oficial `@tailwindcss/vite`.
- Se registró el nivel previo del estudiante basado en el proyecto Mesa de Servicio.

## Trabajo completado

- Fase 0 iniciada:
  - scaffold inicial de Vite;
  - documentación base;
  - definición de alcance;
  - roadmap inicial;
  - guía inicial de manejo de estado;
  - guía inicial de UI/UX;
  - registro de conocimientos previos.

## Tarea actual

Ninguna tarea de implementación activa.

## Próximo paso

Primera tarea para el estudiante:

Revisar la estructura generada por Vite y limpiar la pantalla inicial para crear una primera vista estática del planificador de viajes, sin Redux todavía.

Tailwind ya quedo conectado al build de Vite y sera el sistema principal de estilos del proyecto.

## Bloqueos

Ninguno.

## Actualizacion 2026-07-22

- Redux Toolkit instalado en el cliente:
  - `@reduxjs/toolkit`;
  - `react-redux`.
- Carpeta `client/src/app/` creada.
- Archivos creados:
  - `client/src/app/store.ts`;
  - `client/src/app/hooks.ts`.
- Ambos archivos todavia estan vacios.
- `npm run build` y `npm run lint` pasan despues de la instalacion.

## Tarea activa

Conectar Redux de forma minima:

- definir el store en `client/src/app/store.ts`;
- crear hooks tipados en `client/src/app/hooks.ts`;
- envolver `<App />` con `<Provider>` en `client/src/main.tsx`.

## Actualizacion 2026-07-27

- Conexion base de Redux completada:
  - `store.ts` crea y exporta `store`;
  - `store.ts` exporta `RootState`;
  - `store.ts` exporta `AppDispatch`;
  - `hooks.ts` exporta `useAppSelector`;
  - `hooks.ts` exporta `useAppDispatch`;
  - `main.tsx` envuelve `<App />` con `<Provider store={store}>`.
- `npm run build` pasa.
- `npm run lint` pasa.

## Proxima tarea

Crear el primer slice pequeño de UI para practicar:

- `initialState`;
- `reducers`;
- `actions`;
- `dispatch`;
- `selector`;
- cambio real en el estado global.

El estudiante pidio explicaciones detalladas de TypeScript y Redux sin asumir conocimiento previo de TS. Cada linea nueva debe explicarse antes de avanzar.

## Actualizacion 2026-07-27 - uiSlice

- Primer slice de Redux creado en `client/src/features/ui/uiSlice.ts`.
- Estado global registrado:
  - `state.ui.viewMode`;
  - valores permitidos: `"grid"` o `"list"`;
  - valor inicial: `"grid"`.
- Action creada:
  - `setViewMode`.
- Selector creado:
  - `selectViewMode`.
- `uiReducer` conectado en `client/src/app/store.ts`.
- `HomePage` ya lee `viewMode` con `useAppSelector`.
- `HomePage` ya cambia `viewMode` con `useAppDispatch` y `setViewMode`.
- Se agrego un control visual minimo para cambiar entre Grid y Lista.
- `npm run build` pasa.
- `npm run lint` pasa.

## Proxima tarea sugerida

Refactorizar el control de cambio de vista a un componente pequeño, por ejemplo:

- `client/src/features/ui/ViewModeToggle.tsx`.

Objetivo:

- separar UI reutilizable de la pagina;
- practicar props vs Redux;
- decidir que responsabilidades quedan en el componente y cuales siguen en el slice.

## Actualizacion 2026-07-27 - ViewModeToggle

- Control de cambio de vista extraido a `client/src/features/ui/ViewModeToggle.tsx`.
- `HomePage` ya no importa hooks de Redux ni actions/selectors del slice.
- `ViewModeToggle` concentra:
  - lectura de `viewMode` con `useAppSelector`;
  - cambio de `viewMode` con `useAppDispatch`;
  - dispatch de `setViewMode("grid")`;
  - dispatch de `setViewMode("list")`;
  - estilos del boton activo.
- `npm run build` pasa.
- `npm run lint` pasa.

## Proxima tarea sugerida

Usar `viewMode` para cambiar el layout real de las tarjetas:

- modo `"grid"`: tarjetas en grilla;
- modo `"list"`: tarjetas en columna.

Objetivo:

- practicar lectura de Redux para decidir clases de Tailwind;
- diferenciar estado global de UI vs datos de dominio;
- evitar que Redux sea solo un texto de depuracion.

## Actualizacion 2026-07-27 - Layout dos columnas

- `HomePage` ahora usa layout responsive de dos columnas en desktop:
  - hero y acciones principales a la izquierda;
  - resumen, toggle y tarjetas a la derecha.
- `ViewModeToggle` se ubico dentro de la columna de resumen.
- `viewMode` sigue controlando la presentacion de las tarjetas:
  - grilla;
  - lista.
- `npm run build` pasa.
- `npm run lint` pasa.

## Actualización 2026-07-28 - React Router y layout principal

- React Router está instalado y configurado mediante Data Router:
  - `createBrowserRouter`;
  - `RouterProvider`.
- `App.tsx` delega la navegación en `client/src/router/AppRouter.tsx`.
- `client/src/layouts/MainLayout.tsx` contiene:
  - encabezado y navegación compartidos;
  - `Outlet` para renderizar la página que corresponde a la URL.
- Páginas base creadas:
  - `HomePage`;
  - `TripsPage`;
  - `TripDetailPage`;
  - `LoginPage`;
  - `NotFoundPage`.
- Rutas disponibles:
  - `/`;
  - `/trips`;
  - `/trips/:tripId`;
  - `/login`;
  - ruta comodín `*`.
- `TripDetailPage` lee el parámetro dinámico `tripId` con `useParams`.
- `npm run build` pasa.
- `npm run lint` pasa.

## Tarea actual

Fase 3 completada. No hay una tarea de implementación activa.

## Próximo paso

Iniciar la fase 4 con el backend Express base:

- decidir y crear la ubicación definitiva del servidor;
- inicializar el proyecto del servidor;
- explicar cada dependencia antes de instalarla;
- crear posteriormente un endpoint de salud, CORS y variables de entorno.

## Bloqueos

Ninguno.

## Actualización 2026-07-28 - Dependencias base del servidor

- La carpeta definitiva del backend es `server/`.
- `server/package.json` ya estaba inicializado.
- Dependencias de ejecución instaladas:
  - `express`;
  - `cors`;
  - `dotenv`.
- Dependencias de desarrollo instaladas:
  - `typescript`;
  - `tsx`;
  - `@types/node`;
  - `@types/express`;
  - `@types/cors`.
- Entorno comprobado:
  - Node.js 24;
  - TypeScript 7.
- Las dependencias aparecen en el grupo correcto dentro de `server/package.json`.

## Tarea actual

Crear y comprender la configuración de TypeScript del servidor antes de agregar código Express.

## Próximo paso

Generar `server/tsconfig.json`, revisar sus opciones y ajustarlo a la estructura definitiva `src/` → `dist/`.

## Bloqueos

Ninguno.

## Actualización 2026-07-28 - TypeScript del servidor

- Se creó `server/tsconfig.json`.
- Código fuente configurado en `server/src/`.
- Salida compilada configurada en `server/dist/`.
- El servidor usa módulos ESM:
  - `type: "module"` en `server/package.json`;
  - `module: "nodenext"` en TypeScript.
- Objetivo de compilación configurado en ES2022.
- Tipos globales de Node habilitados.
- Comprobación estricta de TypeScript habilitada.
- Se eliminaron opciones generadas que pertenecían a JSX o publicación de librerías.
- `npx tsc --showConfig` confirma que la configuración es válida.

## Decisión estructural

El servidor separará:

- `src/app.ts`: configuración de Express, middlewares y rutas;
- `src/server.ts`: inicio del proceso y apertura del puerto.

Esta separación evita mezclar la construcción de la aplicación con su ejecución y permite probar `app` posteriormente sin abrir un puerto real.

## Tarea actual

La instancia mínima de Express y las exclusiones del backend están configuradas:

- `server/src/app.ts` pasa `npx tsc --noEmit`;
- `server/.gitignore` excluye `node_modules/`, `dist/` y `.env`.

## Próximo paso

Crear `server/src/server.ts`, importar la aplicación y abrir el puerto configurado.

## Bloqueos

Ninguno.

## Decisión sobre variables de entorno

- El proyecto no utilizará `.env.example`.
- Las variables requeridas se documentarán en `docs/ENVIRONMENT.md`.
- `server/.env` seguirá siendo local y permanecerá excluido de Git.
- Toda variable nueva deberá agregarse a la documentación en la misma tarea en que se incorpore al código.

## Configuración de entorno completada

- `server/src/config/env.ts` carga `server/.env` mediante dotenv.
- `PORT` se convierte de texto a número.
- El valor se valida como entero entre 1 y 65535.
- Si `PORT` no está definido, se usa `4000`.
- `npx tsc --noEmit` pasa.
- La carga real de la configuración devuelve el puerto `4000`.

## Inicio del servidor completado

- `server/src/server.ts` importa la aplicación desde `app.ts`.
- Importa el puerto validado desde `config/env.ts`.
- Inicia Express mediante `app.listen`.
- Los imports relativos utilizan extensión `.js` por la configuración ESM con NodeNext.
- `npx tsc --noEmit` pasa.
- Una prueba real en `http://localhost:4000` devuelve `404`, respuesta esperada mientras no existan rutas.

## Tarea actual

Configurar scripts de desarrollo, comprobación, compilación y ejecución en `server/package.json`.

## Scripts del servidor completados

- `npm run dev` ejecutará `tsx` en modo observación.
- `npm run typecheck` revisa tipos sin generar archivos.
- `npm run build` compila `src/` dentro de `dist/`.
- `npm start` ejecuta `dist/server.js`.
- `main` apunta a `dist/server.js`.
- La compilación genera JavaScript ESM y source maps.
- `dist/` permanece excluido de Git.
- El JavaScript compilado inicia Express correctamente en el puerto `4000`.

## Tarea actual

La ruta de salud está creada y validada en `server/src/routes/health.routes.ts`.

## Próximo paso

Montar la ruta en `app.ts` bajo `/api/health` y comprobar una respuesta JSON con estado HTTP 200.

## Endpoint de salud completado

- `healthRouter` está montado en `app.ts` bajo `/api/health`.
- `GET /api/health` responde HTTP 200.
- La respuesta usa `Content-Type: application/json`.
- El cuerpo de la respuesta es `{ "status": "ok" }`.
- `npm run typecheck` pasa.

## Próximo paso

Configurar los middlewares globales `cors` y `express.json()` antes de agregar rutas de dominio.

## Configuración del origen del cliente completada

- `CLIENT_URL` está definida en `server/.env`.
- `env.ts` carga la variable y utiliza `http://localhost:5173` como valor predeterminado.
- La URL se valida durante el inicio del servidor.
- `CLIENT_URL` está documentada en `docs/ENVIRONMENT.md`.
- `npm run typecheck` pasa.

## Tarea actual

Configurar `cors` y el parser JSON como middlewares globales en `server/src/app.ts`.

## Fase 4 completada - Backend Express base

- `cors` está configurado con el origen validado en `CLIENT_URL`.
- `express.json()` está configurado antes de las rutas.
- Los middlewares globales se ejecutan antes de `healthRouter`.
- `GET /api/health` responde HTTP 200 con `{ "status": "ok" }`.
- La respuesta incluye `Access-Control-Allow-Origin: http://localhost:5173`.
- `npm run typecheck` pasa.
- `npm run build` pasa.

## Tarea actual

Ninguna tarea de implementación activa. Fase 4 completada.

## Próximo paso

Iniciar la fase 5 definiendo el modelo inicial `User` y las decisiones de autenticación antes de instalar y configurar Prisma.

## Diseño relacional definido

- `docs/DATA_MODEL.md` registra las entidades previstas y sus relaciones.
- `User` será la raíz de propiedad de los viajes, no solo una credencial.
- Las relaciones muchos a muchos con datos propios usarán tablas puente
  explícitas.
- Las relaciones se implementarán en Prisma de forma incremental, incluyendo
  claves foráneas, restricciones únicas y reglas `onDelete`.

## Próximo paso

Instalar Prisma y Prisma Client en `server/`, inicializar su configuración para
PostgreSQL y comenzar con el modelo `User`.

## Prisma y modelo User completados

- Prisma ORM `7.9.1` está configurado para PostgreSQL.
- `prisma.config.ts` carga la conexión desde `DATABASE_URL`.
- `schema.prisma` contiene el modelo `User`.
- La migración `init_user` está aplicada.
- La tabla `users` y su índice único de email existen en PostgreSQL.
- Prisma Client se genera en `server/src/generated/prisma`.
- `server/src/lib/prisma.ts` exporta una única instancia con `PrismaPg`.
- Una consulta real `prisma.user.count()` devuelve `0`.
- `npm run typecheck` pasa.

## Tarea actual

Preparar las dependencias y variables necesarias para registro, login, logout y
consulta de sesión actual.

## Base de autenticación preparada

- Se instalaron `bcryptjs`, `cookie-parser`, `jsonwebtoken` y `zod`.
- `JWT_SECRET` es obligatorio y se valida con una longitud mínima de 64
  caracteres.
- `NODE_ENV` acepta `development`, `test` o `production`.
- CORS permite credenciales para el origen configurado.
- `cookieParser()` se ejecuta antes de las rutas.
- La prueba HTTP confirma `Access-Control-Allow-Credentials: true`.
- El valor real de `JWT_SECRET` permanece únicamente en `server/.env`.

## Próximo paso

Definir los esquemas Zod de registro y login en el módulo de autenticación.

## Utilidades de autenticación completadas

- `auth.schemas.ts` valida registro y login con Zod 4.
- Los emails se normalizan antes de validarse.
- Los objetos rechazan propiedades no declaradas.
- `auth.password.ts` genera y verifica hashes bcrypt de forma asíncrona.
- `auth.token.ts` crea JWT con `sub` y rechaza tokens alterados.
- `auth.cookie.ts` configura una cookie `httpOnly`, `sameSite: "lax"` y
  `secure` en producción.
- La duración de la cookie coincide con los siete días del JWT.
- `npm run typecheck` pasa.

## Próximo paso

Crear un error de aplicación y un middleware global que convierta errores de
dominio y Zod en respuestas JSON consistentes.

## Manejo global de errores completado

- `AppError` representa errores esperados de la aplicacion con estado HTTP,
  codigo y mensaje.
- `errorMiddleware` convierte errores de Zod en respuestas HTTP 400.
- Los errores `AppError` conservan su estado HTTP, codigo y mensaje.
- Los errores inesperados se registran en el servidor y responden HTTP 500 sin
  exponer detalles internos.
- El middleware esta registrado despues de las rutas en `app.ts`.
- `npm run typecheck` pasa.

## Proximo paso

Crear el servicio de registro de usuarios dentro del modulo de autenticacion.
Este servicio comprobara si el email ya existe, generara el hash de la
contrasena y creara el usuario mediante Prisma.

## Servicio de registro completado

- `registerUser` recibe datos de registro ya validados.
- Comprueba mediante Prisma si el email ya existe.
- Un email ocupado produce `AppError` con estado HTTP 409.
- La contrasena se transforma en hash antes de persistirse.
- Prisma retorna solo `id`, `name`, `email` y `createdAt`.
- `passwordHash` no forma parte del resultado publico.
- `npm run typecheck` pasa.

## Proximo paso

Crear el controlador HTTP de registro. El controlador validara `req.body`,
llamara a `registerUser`, creara el JWT, configurara la cookie y respondera
HTTP 201 con los datos publicos del usuario.

## Controlador de registro completado

- `registerUserController` valida `req.body` con Zod.
- El controlador llama al servicio de registro y espera su resultado.
- Un registro exitoso crea un JWT con el identificador del usuario.
- El JWT se configura en la cookie de autenticacion.
- La respuesta HTTP 201 contiene los datos publicos del usuario.
- Los errores asincronos se propagan al middleware global de Express 5.
- `npm run typecheck` pasa.

## Proximo paso

Crear el router del modulo de autenticacion, registrar
`POST /register` y montarlo en `app.ts` bajo `/api/auth`.

## Ruta de registro completada

- `authRouter` registra `POST /register`.
- El router esta montado bajo `/api/auth`.
- El endpoint final es `POST /api/auth/register`.
- Las rutas de autenticacion se ejecutan antes de `errorMiddleware`.
- Una peticion con datos invalidos responde HTTP 400.
- `npm run typecheck` pasa.

## Proximo paso

Probar el registro exitoso contra PostgreSQL y comprobar la respuesta publica,
la cookie de autenticacion y el error HTTP 409 al repetir el email.

## Flujo de registro verificado

- Un registro valido responde HTTP 201.
- La respuesta contiene los datos publicos del usuario y excluye
  `passwordHash`.
- La respuesta configura la cookie `travel_planner_token`.
- La cookie usa `HttpOnly`, `SameSite=Lax` y una duracion de siete dias.
- Repetir el mismo email responde HTTP 409.
- La prueba creo un usuario de prueba en la base de desarrollo.

## Proximo paso

Implementar el servicio de login: buscar el usuario por email, comprobar la
contrasena y devolver los datos publicos sin revelar cual credencial fallo.

## Servicio de login completado

- `loginUser` busca el usuario por email.
- La contrasena se compara de forma asincrona mediante bcrypt.
- Un email inexistente y una contrasena incorrecta producen el mismo
  `AppError` con estado HTTP 401.
- El resultado publico excluye `passwordHash`.
- Una prueba directa confirma el rechazo de una contrasena incorrecta y la
  aceptacion de la contrasena correcta.
- `npm run typecheck` pasa.

## Proximo paso

Crear el controlador HTTP de login. El controlador validara `req.body`,
llamara a `loginUser`, creara un JWT, configurara la cookie y respondera con
los datos publicos del usuario.

## Controlador de login completado

- `loginUserController` valida el cuerpo con `loginSchema`.
- El controlador espera el resultado de `loginUser`.
- Un login exitoso crea un JWT con el identificador del usuario.
- El JWT se configura en la cookie de autenticacion.
- La respuesta HTTP 200 contiene los datos publicos del usuario.
- `npm run typecheck` pasa.

## Proximo paso

Registrar `POST /login` en `auth.routes.ts` y probar por HTTP el login
correcto, la contrasena incorrecta y la cookie de autenticacion.

## Endpoint de login completado

- `authRouter` registra `POST /login`.
- El endpoint final es `POST /api/auth/login`.
- Las credenciales correctas responden HTTP 200 con el usuario publico.
- La respuesta configura una cookie JWT `HttpOnly`.
- Una contrasena incorrecta responde HTTP 401.
- `npm run typecheck` pasa.

## Proximo paso

Crear el controlador y la ruta de logout. El endpoint eliminara la cookie de
autenticacion y respondera HTTP 204 sin contenido.

## Endpoint de logout completado

- `authRouter` registra `POST /logout`.
- El endpoint final es `POST /api/auth/logout`.
- `clearAuthCookie` responde con una cookie vacia y expirada.
- El endpoint responde HTTP 204 sin cuerpo.
- El controlador es sincrono porque no realiza operaciones asincronas.
- Una prueba HTTP confirma la expiracion de la cookie y un cuerpo de longitud
  cero.
- `npm run typecheck` pasa.

## Proximo paso

Crear el middleware de autenticacion que lea la cookie, verifique el JWT y
asocie el identificador del usuario autenticado con la peticion.

## Middleware de autenticacion completado

- `Express.Request` fue ampliado con `auth?: { userId: string }`.
- `requireAuth` lee la cookie de autenticacion como un valor desconocido.
- La ausencia de cookie produce `AppError` con estado HTTP 401.
- Los JWT invalidos o vencidos se traducen a HTTP 401.
- Un JWT valido agrega el identificador a `req.auth`.
- El middleware ejecuta `next()` solamente despues de autenticar la peticion.
- `npm run typecheck` pasa.

## Proximo paso

Crear el servicio de sesion actual que busque por `userId` los datos publicos
del usuario. Luego se conectara a `GET /api/auth/me` mediante `requireAuth`.

## Servicio de sesion actual completado

- `getCurrentUser` recibe el identificador obtenido del JWT.
- Prisma busca el usuario por su campo `id`.
- La consulta selecciona solamente datos publicos.
- Un usuario inexistente invalida la sesion con HTTP 401.
- `npm run typecheck` pasa.

## Proximo paso

Crear el controlador de sesion actual. Este leera `req.auth.userId`, llamara a
`getCurrentUser` y respondera con los datos publicos del usuario.

## Controlador de sesion actual completado

- `getCurrentUserController` comprueba que `req.auth` exista.
- TypeScript estrecha la propiedad opcional antes de leer `userId`.
- El controlador consulta los datos actuales mediante `getCurrentUser`.
- La respuesta HTTP 200 contiene el usuario publico.
- El endpoint no renueva el JWT ni modifica la cookie.
- `npm run typecheck` pasa.

## Proximo paso

Registrar `GET /me` con `requireAuth` antes de `getCurrentUserController` y
probar los flujos con cookie ausente, invalida y valida.

## Sesion actual y middleware verificados

- `authRouter` registra `GET /me`.
- `requireAuth` se ejecuta antes de `getCurrentUserController`.
- Una peticion sin cookie responde HTTP 401.
- Una cookie con un JWT manipulado responde HTTP 401.
- Una cookie obtenida mediante login responde HTTP 200 con el usuario publico.
- `npm run typecheck` pasa.
- `npm run build` pasa.

## Fase 5 completada - Base de datos y autenticacion

- El modelo `User` y su migracion existen en PostgreSQL.
- El registro crea el usuario, el JWT y la cookie.
- El login verifica credenciales y crea la sesion.
- El logout elimina la cookie.
- `GET /api/auth/me` recupera la sesion actual mediante un middleware
  reutilizable.
- Los errores de validacion, dominio y autenticacion usan respuestas JSON
  consistentes.

## Proximo paso

Iniciar la fase 6 revisando el modelo relacional previsto para `Trip` antes de
agregarlo al esquema Prisma y crear su migracion.

## Esquema Trip definido

- `TripStatus` limita los estados posibles del viaje.
- `User` tiene una relacion uno-a-muchos con `Trip`.
- `Trip.userId` es una clave foranea UUID obligatoria.
- La eliminacion de un usuario aplica `onDelete: Cascade` sobre sus viajes.
- Las fechas generales del viaje se almacenan sin hora.
- El presupuesto limite usa un decimal opcional.
- Existe un indice compuesto por `userId` y `startDate`.
- `prisma format` y `prisma validate` pasan.
- Todavia no se ha creado una migracion nueva.

## Proximo paso

Crear la migracion `add_trip`, revisar el SQL generado y confirmar que la tabla,
el enum, la clave foranea y el indice se aplicaron correctamente.

## Migracion Trip completada

- La migracion `20260730214003_add_trip` crea `TripStatus`.
- La tabla `trips` usa UUID, fechas `DATE` y presupuesto `DECIMAL(12,2)`.
- La clave foranea apunta a `users.id` con `ON DELETE CASCADE`.
- Existe el indice compuesto `trips_userId_startDate_idx`.
- `prisma migrate status` confirma dos migraciones aplicadas.
- Prisma Client fue regenerado y expone `Trip` y `TripStatus`.
- Una consulta real `prisma.trip.count()` devuelve `0`.
- `npm run typecheck` pasa.

## Proximo paso

Crear el esquema Zod para alta de viajes dentro de `features/trips`, definiendo
la transformacion de fechas, moneda y presupuesto antes del servicio CRUD.

## Esquema de creacion de viajes completado

- `createTripSchema` usa un objeto estricto.
- El titulo, la descripcion y la moneda se normalizan y limitan.
- Las fechas exigen el formato ISO `YYYY-MM-DD`.
- La fecha final no puede ser anterior a la inicial.
- El presupuesto opcional conserva una representacion decimal en texto.
- Propiedades controladas por el servidor, como `userId`, son rechazadas.
- `CreateTripInput` se infiere directamente desde el esquema.
- Las validaciones fueron comprobadas con casos validos e invalidos.
- `npm run typecheck` pasa.

## Proximo paso

Definir la representacion publica de un viaje y su transformacion desde los
tipos de Prisma antes de implementar el servicio de creacion.

## Mapper publico de viajes completado

- `TripResponse` define el contrato estable que consumira el frontend.
- `toTripResponse` recibe el modelo `Trip` generado por Prisma.
- Las fechas del viaje se convierten a `YYYY-MM-DD`.
- Las fechas de auditoria conservan su representacion ISO completa.
- `Decimal` se convierte a texto con dos decimales.
- `userId` no se expone en la respuesta.
- Una prueba directa confirma el formato y los campos resultantes.
- `npm run typecheck` pasa.

## Proximo paso

Crear el servicio de alta de viajes, asociando el viaje al usuario autenticado,
convirtiendo las fechas de entrada y retornando `TripResponse`.

## Servicio de creacion de viajes completado

- `createTrip` recibe el usuario autenticado y `CreateTripInput`.
- Las fechas de calendario se convierten a objetos `Date` en UTC.
- Prisma conecta el viaje con `User` mediante la relacion.
- Descripcion y presupuesto ausentes se almacenan como `null`.
- El estado inicial procede del valor predeterminado `PLANNING`.
- El resultado se transforma mediante `toTripResponse`.
- Una prueba real confirmo relacion, fechas, decimal, estado y respuesta.
- El viaje utilizado por la prueba fue eliminado al finalizar.
- `npm run typecheck` pasa.

## Proximo paso

Crear el controlador protegido de alta de viajes: comprobar `req.auth`, validar
`req.body`, llamar a `createTrip` y responder HTTP 201.

## Controlador de creacion de viajes completado

- `createTripController` comprueba la autenticacion disponible en `req.auth`.
- El cuerpo se valida y normaliza con `createTripSchema`.
- El servicio recibe el identificador autenticado, no un `userId` externo.
- La respuesta usa HTTP 201 y `{ data: { trip } }`.
- El controlador no accede directamente a Prisma ni repite el mapper.
- `npm run typecheck` pasa.

## Proximo paso

Crear `trip.routes.ts`, registrar `POST /` con `requireAuth` y montar el router
en `app.ts` bajo `/api/trips`.

## Endpoint de creacion de viajes completado

- `tripRouter` esta montado bajo `/api/trips`.
- `POST /api/trips` ejecuta `requireAuth` antes del controlador.
- Una peticion sin cookie responde HTTP 401.
- Un cuerpo con fechas invalidas responde HTTP 400.
- Un cuerpo valido responde HTTP 201 con `TripResponse`.
- La moneda, las fechas, el estado y el presupuesto conservan el contrato
  publico acordado.
- El viaje utilizado por la prueba fue eliminado al finalizar.
- `npm run typecheck` pasa.

## Proximo paso

Implementar el listado protegido de viajes del usuario autenticado, ordenado
por fecha de inicio y transformado mediante el mapper.

## Servicio de listado de viajes completado

- `listTrips` recibe el identificador del usuario autenticado.
- Prisma filtra mediante `where: { userId }`.
- Los resultados se ordenan por `startDate` ascendente.
- Cada viaje se transforma mediante `toTripResponse`.
- Una lista vacia se representa con `[]`.
- Una prueba con dos viajes confirmo orden, formato publico y limpieza.
- `npm run typecheck` pasa.

## Proximo paso

Crear el controlador de listado, leer `req.auth.userId`, llamar a `listTrips` y
responder HTTP 200 con `{ data: { trips } }`.

## Controlador de listado de viajes completado

- `listTripsController` comprueba `req.auth`.
- El servicio recibe el identificador del usuario autenticado.
- La respuesta usa HTTP 200 y `{ data: { trips } }`.
- El controlador no valida cuerpo ni accede directamente a Prisma.
- Se corrigio el estado inicial 201 a 200 porque el listado no crea recursos.
- `npm run typecheck` pasa.

## Proximo paso

Registrar `GET /` con `requireAuth` en `trip.routes.ts` y probar el endpoint
`GET /api/trips`.

## Endpoint de listado de viajes completado

- `tripRouter` registra `GET /` con `requireAuth`.
- El endpoint final es `GET /api/trips`.
- Una peticion sin cookie responde HTTP 401.
- Un usuario sin viajes recibe HTTP 200 con una lista vacia.
- Los viajes se devuelven ordenados por fecha de inicio.
- Los objetos usan el contrato `TripResponse`.
- Los viajes utilizados por la prueba fueron eliminados.
- `npm run typecheck` pasa.

## Proximo paso

Crear el esquema Zod para validar `tripId` como UUID antes de implementar
`GET /api/trips/:tripId`.

## Esquema de parametros del detalle de viaje completado

- `tripParamsSchema` valida el parametro `tripId` como UUID.
- El esquema rechaza propiedades adicionales.
- `TripParams` se infiere directamente desde el esquema.
- Se comprobaron un UUID valido, un texto invalido y una propiedad adicional.
- `npm run typecheck` pasa.

## Proximo paso

Implementar el servicio que obtiene un viaje mediante `tripId` y el
identificador del usuario autenticado. La consulta debe comprobar propiedad y
devolver una respuesta publica sin revelar viajes de otros usuarios.

## Servicio de detalle de viaje completado

- `getTripById` recibe `userId` y `tripId`.
- Prisma filtra simultaneamente por el identificador del viaje y su propietario.
- Un viaje inexistente o ajeno produce HTTP 404 con `TRIP_NOT_FOUND`.
- El resultado se transforma mediante `toTripResponse`.
- Una consulta real confirmo el error esperado para un viaje no encontrado.
- Se eliminaron dos imports sin uso y se ajusto el nombre del servicio.
- `npm run typecheck` pasa.

## Proximo paso

Crear el controlador de detalle: comprobar `req.auth`, validar `req.params` con
`tripParamsSchema`, llamar a `getTripById` y responder HTTP 200 con
`{ data: { trip } }`.

## Controlador de detalle de viaje completado

- `getTripByIdController` comprueba la autenticacion disponible en `req.auth`.
- Los parametros de la URL se validan mediante `tripParamsSchema`.
- El servicio recibe `userId` y el `tripId` ya validado.
- La respuesta usa HTTP 200 y `{ data: { trip } }`.
- Se corrigio la propiedad inicial `tripDetails` para conservar el contrato
  publico uniforme.
- El controlador no accede directamente a Prisma.
- `npm run typecheck` pasa.

## Proximo paso

Registrar `GET /:tripId` con `requireAuth` en `trip.routes.ts` y probar por HTTP
los casos sin autenticacion, UUID invalido, viaje inexistente y viaje propio.

## Endpoint de detalle de viaje completado

- `tripRouter` registra `GET /:tripId` con `requireAuth`.
- El endpoint final es `GET /api/trips/:tripId`.
- Una peticion sin cookie responde HTTP 401.
- Un `tripId` con formato invalido responde HTTP 400.
- Un UUID valido sin viaje accesible responde HTTP 404.
- El viaje propio responde HTTP 200 con `{ data: { trip } }`.
- La prueba confirmo que el identificador devuelto coincide con el solicitado.
- El usuario y el viaje temporales se eliminaron al finalizar.
- `npm run typecheck` pasa.

## Proximo paso

Definir el contrato de actualizacion parcial de viajes antes de implementar
`PATCH /api/trips/:tripId`, decidiendo que campos son editables y validando que
el cuerpo contenga al menos un cambio.

## Esquema de actualizacion parcial de viajes completado

- `updateTripSchema` permite actualizar solamente los campos enviados.
- `description` y `budgetLimit` aceptan `null` para eliminar su valor.
- `status` usa el enum `TripStatus` generado por Prisma.
- El esquema rechaza cuerpos vacios y propiedades no declaradas.
- Si ambas fechas llegan juntas, comprueba que el rango sea valido.
- Una sola fecha se acepta para validarla posteriormente contra el viaje actual.
- `UpdateTripInput` se infiere directamente desde el esquema.
- Se comprobaron cambios parciales, valores nulos, estados, fechas y campos
  externos.
- `npm run typecheck` pasa.

## Proximo paso

Implementar el servicio de actualizacion. Debe localizar el viaje mediante
`tripId` y `userId`, combinar las fechas enviadas con las existentes, validar
el rango final y actualizar solamente los campos presentes.

## Servicio de actualizacion de viajes completado

- `updateTrip` localiza el viaje mediante `tripId` y `userId`.
- Los campos omitidos conservan su valor almacenado.
- `description` y `budgetLimit` pueden eliminarse mediante `null`.
- Las fechas enviadas se combinan con las existentes antes de validar el rango.
- Un rango final invalido produce HTTP 400 con `INVALID_TRIP_DATE_RANGE`.
- Un viaje inexistente o ajeno produce HTTP 404 con `TRIP_NOT_FOUND`.
- La actualizacion utiliza spreads condicionales para no enviar propiedades
  omitidas a Prisma.
- El resultado se transforma mediante `toTripResponse`.
- Las pruebas reales confirmaron actualizacion parcial, valores nulos, fechas,
  propiedad del viaje y limpieza de datos temporales.
- `npm run typecheck` pasa.

## Proximo paso

Crear el controlador de actualizacion: comprobar `req.auth`, validar
`req.params` y `req.body`, llamar a `updateTrip` y responder HTTP 200 con
`{ data: { trip } }`.

## Controlador de actualizacion de viajes completado

- `updateTripController` comprueba la autenticacion disponible en `req.auth`.
- Los parametros se validan mediante `tripParamsSchema`.
- El cuerpo se valida mediante `updateTripSchema`.
- El servicio recibe `userId`, `tripId` y los cambios ya validados.
- La respuesta usa HTTP 200 y `{ data: { trip } }`.
- Se corrigieron el orden de los identificadores, la espera asincrona y el
  nombre de la propiedad publica.
- El controlador no accede directamente a Prisma.
- `npm run typecheck` pasa.

## Proximo paso

Registrar `PATCH /:tripId` con `requireAuth` en `trip.routes.ts` y probar por
HTTP actualizacion parcial, valores nulos, rango invalido, viaje inexistente y
falta de autenticacion.

## Endpoint de actualizacion de viajes completado

- `tripRouter` registra `PATCH /:tripId` con `requireAuth`.
- El endpoint final es `PATCH /api/trips/:tripId`.
- Una peticion sin cookie responde HTTP 401.
- Una actualizacion parcial responde HTTP 200 y conserva campos omitidos.
- `description` y `budgetLimit` pueden eliminarse mediante `null`.
- Un cuerpo vacio responde HTTP 400.
- Un rango final de fechas invalido responde HTTP 400.
- Un viaje inexistente responde HTTP 404.
- El usuario y el viaje temporales se eliminaron al finalizar.
- `npm run typecheck` pasa.

## Proximo paso

Implementar el servicio de eliminacion de un viaje propio. Debe comprobar
`tripId` y `userId`, ocultar la existencia de viajes ajenos y eliminar el
registro antes de conectar `DELETE /api/trips/:tripId`.

## Servicio de eliminacion de viajes completado

- `deleteTrip` recibe `userId` y `tripId`.
- `deleteMany` filtra simultaneamente por el viaje y su propietario.
- La operacion se espera antes de comprobar su resultado.
- Un contador igual a cero produce HTTP 404 con `TRIP_NOT_FOUND`.
- Un usuario ajeno no elimina el viaje ni descubre si existe.
- El propietario elimina exactamente el viaje solicitado.
- Repetir la eliminacion produce el mismo HTTP 404.
- Los datos temporales se limpiaron al finalizar.
- `npm run typecheck` pasa.

## Proximo paso

Crear el controlador de eliminacion: comprobar `req.auth`, validar `req.params`,
llamar a `deleteTrip` y responder HTTP 204 sin cuerpo.

## Controlador de eliminacion de viajes completado

- `deleteTripController` comprueba la autenticacion disponible en `req.auth`.
- Los parametros se validan mediante `tripParamsSchema`.
- El controlador no valida cuerpo porque el recurso se identifica en la URL.
- El servicio recibe `userId` y `tripId` en el orden acordado.
- La eliminacion se espera antes de responder.
- La respuesta usa HTTP 204 mediante `send()` y no incluye cuerpo.
- El controlador no accede directamente a Prisma.
- `npm run typecheck` pasa.

## Proximo paso

Registrar `DELETE /:tripId` con `requireAuth` en `trip.routes.ts` y probar por
HTTP falta de autenticacion, UUID invalido, viaje inexistente, eliminacion
propia y segundo intento de eliminacion.

## Endpoint de eliminacion y CRUD de viajes completados

- `tripRouter` registra `DELETE /:tripId` con `requireAuth`.
- El endpoint final es `DELETE /api/trips/:tripId`.
- Una peticion sin cookie responde HTTP 401.
- Un `tripId` invalido responde HTTP 400.
- Un viaje inexistente responde HTTP 404.
- El propietario elimina el viaje y recibe HTTP 204 sin cuerpo.
- Un segundo intento de eliminacion responde HTTP 404.
- El usuario temporal se elimino al finalizar.
- El backend ya expone crear, listar, consultar, actualizar y eliminar viajes.
- `npm run typecheck` pasa.

## Proximo paso

Iniciar la integracion del cliente con RTK Query. Primero se definira el API
slice base, su `baseUrl`, el envio de la cookie mediante credenciales y su
registro en el store antes de agregar endpoints de viajes.

## Acuerdo pedagogico para RTK Query

- El estudiante indico que comienza sin conocimientos de RTK Query.
- La etapa se tratara como un curso practico guiado desde cero.
- No se asumira conocimiento de API slices, queries, mutations, cache, tags,
  invalidacion, middleware ni hooks generados.
- Cada pieza nueva se explicara antes de escribir codigo y se comparara con el
  manejo manual mediante `fetch`, `useEffect` y `useState`.
- Las tareas se dividiran en microlecciones y cada elemento nuevo de
  TypeScript sera explicado.
- El protocolo permanente quedo registrado en `AGENTS.md`.
- El recorrido de aprendizaje quedo registrado en `docs/STATE_MANAGEMENT.md`.

## Proximo paso

Comenzar con una leccion conceptual sobre el problema que resuelve RTK Query y
la diferencia entre estado del cliente y estado del servidor. No se creara
codigo hasta comprender ese flujo general.

## RTK Query - Leccion 1 completada

- Se distinguio estado local, estado global del cliente y estado del servidor.
- `viewMode` se identifico como estado del cliente administrado por un slice.
- Los viajes se identificaron como estado remoto cuya fuente de verdad es
  PostgreSQL.
- La cache se comprendio como una copia temporal que puede desaparecer o quedar
  desactualizada.
- Una `query` se comprendio como una operacion de lectura.
- Una `mutation` se comprendio como una operacion que crea, modifica o elimina
  datos remotos.
- Todavia no se ha creado codigo de RTK Query.

## Proximo paso

Explicar `createApi` como definicion central de las operaciones HTTP del
frontend, su ubicacion definitiva y que piezas genera. No se configurara aun
`fetchBaseQuery`, el store ni endpoints reales.

## RTK Query - Leccion 2 completada

- `createApi` se comprendio como una funcion que define un API slice.
- Definir el API slice no ejecuta peticiones HTTP.
- Las operaciones se inician posteriormente mediante un hook o `dispatch`.
- Se comparo un slice tradicional de estado del cliente con un API slice de
  estado remoto.
- Se identificaron las piezas principales de configuracion:
  - `reducerPath`: donde se guarda el estado;
  - `baseQuery`: como se realizan las peticiones;
  - `endpoints`: que operaciones existen.
- Se decidio usar un API slice base compartido para el backend Express.
- La ubicacion definitiva de la infraestructura sera
  `client/src/services/api.ts`.
- Todavia no se ha creado codigo de RTK Query.

## Proximo paso

Explicar `fetchBaseQuery`, como compone la URL de cada endpoint y por que
`credentials: "include"` es necesario para enviar la cookie de autenticacion.
No se creara aun el API slice.

## RTK Query - Leccion 3 completada

- `fetchBaseQuery` se comprendio como una adaptacion de `fetch` para RTK Query.
- Se distinguio la configuracion base de la ejecucion posterior de peticiones.
- `baseUrl` se comprendio como el prefijo compartido que se combina con la ruta
  de cada endpoint.
- Se identifico que cliente y servidor tienen origenes distintos por sus
  puertos.
- `credentials: "include"` se comprendio como requisito para incluir cookies
  en las peticiones entre esos origenes.
- El navegador, no RTK Query, adjunta la cookie correspondiente.
- `httpOnly` impide que JavaScript lea el token, pero no que el navegador envie
  la cookie.
- Se distinguio la ejecucion HTTP de `fetchBaseQuery` del almacenamiento
  temporal administrado por la cache de RTK Query.
- Todavia no se ha creado codigo de RTK Query.

## Proximo paso

Explicar las variables de entorno del cliente en Vite y definir el contrato de
`VITE_API_URL`, diferenciando configuracion publica del navegador y secretos
privados del servidor. Luego el estudiante preparara la variable antes de crear
el API slice.

## RTK Query - Leccion 4 completada

- Se distinguieron variables privadas del servidor y configuracion publica del
  cliente.
- `VITE_API_URL` se comprendio como una direccion publica necesaria para hacer
  peticiones.
- `JWT_SECRET` se identifico como un secreto que nunca debe llegar al navegador.
- Por decision del estudiante, `client/.env` contendra el valor real usado en
  la maquina local.
- `docs/ENVIRONMENT.md` documentara el contrato compartido.
- Las variables del cliente se leen mediante `import.meta.env`.
- Se comprendio que Vite debe reiniciarse despues de cambiar su archivo de
  entorno.
- Todavia no se ha creado codigo de RTK Query.

## Proximo paso

Crear `client/.env` con `VITE_API_URL`, excluirlo explicitamente en
`client/.gitignore` y documentar la variable del cliente en
`docs/ENVIRONMENT.md`. No se leera todavia desde TypeScript ni se creara el API
slice.

## Configuracion de `VITE_API_URL` completada

- `client/.env` define `VITE_API_URL=http://localhost:4000/api/`.
- `client/.gitignore` excluye explicitamente el archivo `.env`.
- `git check-ignore` confirma que la configuracion local no se versiona.
- `docs/ENVIRONMENT.md` documenta el archivo, la variable, el valor de
  desarrollo y su caracter publico.
- Se registro que Vite debe reiniciarse despues de cambiar la variable.
- Todavia no se ha creado codigo de RTK Query.

## Proximo paso

Explicar por que TypeScript no garantiza que una variable de entorno exista en
ejecucion y crear posteriormente `client/src/config/env.ts` para leer y validar
`VITE_API_URL` antes de entregarla a `fetchBaseQuery`.

## Ajuste del metodo de aprendizaje

- El estudiante prefiere continuar mediante implementacion guiada.
- No se usaran cuestionarios teoricos obligatorios para desbloquear tareas.
- Los conceptos se explicaran nuevamente mientras se escribe y revisa cada
  bloque.

## Proximo paso

Crear `client/src/config/env.ts` para leer `VITE_API_URL` como un valor externo,
validar que sea texto no vacio y comprobar que represente una URL valida.

## Validacion del entorno del cliente completada

- `client/src/config/env.ts` lee `import.meta.env.VITE_API_URL` como `unknown`.
- La configuracion rechaza valores ausentes, no textuales o vacios.
- El valor se limpia mediante `trim()`.
- La clase `URL` comprueba el formato antes de exportarlo.
- El resto del cliente consumira `API_URL` sin depender directamente de Vite.
- Se comprobaron por ejecucion una URL valida, un valor vacio y una URL
  invalida.
- `npm run build` y `npm run lint` pasan.

## Proximo paso

Crear `client/src/services/api.ts` con el primer `createApi`. Se configuraran
`reducerPath`, `fetchBaseQuery`, `API_URL`, credenciales y una coleccion de
endpoints vacia. Todavia no se registrara el API slice en el store ni se haran
peticiones.

## API slice base creado

- `client/src/services/api.ts` es la infraestructura compartida de RTK Query.
- `createApi` crea y exporta el objeto `api`.
- `reducerPath` usa la clave `"api"`.
- `fetchBaseQuery` recibe la `API_URL` validada.
- `credentials: "include"` prepara el envio de la cookie por el navegador.
- `endpoints` devuelve un objeto vacio y `_builder` queda marcado como no usado.
- TypeScript infiere los tipos de `api`, `baseQuery` y `_builder`; no se
  agregaron anotaciones manuales ni `any`.
- El store todavia contiene solamente el reducer `ui`.
- No existen endpoints ni peticiones HTTP.
- `npm run build` y `npm run lint` pasan.

## Proximo paso

Explicar el reducer generado por RTK Query y conectar solamente
`api.reducer` en `store.ts` usando la clave dinamica `api.reducerPath`. El
middleware se estudiara y registrara en una microtarea posterior.

## Reducer del API slice registrado

- `store.ts` importa el API slice compartido.
- `[api.reducerPath]` evalua la clave dinamica `"api"`.
- `api.reducer` administra la nueva rama `state.api`.
- El reducer tradicional de UI permanece en `state.ui`.
- `RootState` incorpora ambas ramas mediante inferencia y no se modifico
  manualmente.
- Una inspeccion del store en ejecucion confirmo las claves `ui` y `api`.
- El middleware de RTK Query todavia no esta registrado.
- No existen endpoints ni peticiones HTTP.
- `npm run build` y `npm run lint` pasan.

## Proximo paso

Explicar el papel de un middleware entre `dispatch` y los reducers, distinguir
efectos secundarios de cambios de estado y registrar `api.middleware` en el
store conservando el middleware predeterminado de Redux Toolkit.

## Middleware de RTK Query registrado

- Se distinguio un reducer puro de un middleware que coordina efectos
  secundarios.
- El store conserva los middlewares predeterminados mediante
  `getDefaultMiddleware()`.
- `concat(api.middleware)` agrega la infraestructura de RTK Query al final.
- Se corrigio una funcion flecha que usaba llaves sin devolver la coleccion; el
  `return` evita que su tipo sea `void`.
- `api.reducer` puede almacenar el estado y `api.middleware` puede coordinar el
  ciclo de futuras peticiones.
- Todavia no existen endpoints ni peticiones HTTP.
- `npm run build` y `npm run lint` pasan.

## Proximo paso

Definir los tipos del contrato publico de viajes en el cliente antes de crear
la primera `query`. Se explicara la diferencia entre el modelo de Prisma, el
JSON recibido y los genericos que usara `builder.query`.

## Tipos publicos de viajes definidos en el cliente

- `client/src/features/trips/trip.types.ts` pertenece al dominio de viajes.
- `TripStatus` limita los cuatro estados publicos conocidos.
- `Trip` representa el JSON recibido y no el modelo interno de Prisma.
- Fechas, UUID y moneda se representan como textos.
- `budgetLimit` conserva el decimal como `string | null`.
- `description` usa `string | null` porque la propiedad existe aun sin valor.
- `ListTripsResponse` representa la envoltura real
  `{ data: { trips: Trip[] } }`.
- No se importaron tipos generados desde el servidor.
- Estos tipos ayudan durante desarrollo pero no validan el JSON en ejecucion.
- `npm run build` y `npm run lint` pasan.

## Proximo paso

Crear `client/src/features/trips/tripsApi.ts` e inyectar el primer endpoint de
lectura en el API slice compartido. Se explicaran por partes `injectEndpoints`,
`builder.query`, el tipo del resultado y el tipo del argumento.

## Primera query de viajes definida

- `client/src/features/trips/tripsApi.ts` pertenece al dominio de viajes.
- `injectEndpoints` amplia el API slice compartido sin crear otro reducer,
  middleware ni sistema de cache.
- `getTrips` usa `builder.query` porque lee datos remotos.
- El primer generico, `ListTripsResponse`, describe el resultado exitoso.
- El segundo generico, `void`, indica que la consulta no recibe argumentos.
- La ruta relativa `"trips"` se combina con la base
  `http://localhost:4000/api/`.
- Al no declarar metodo, `fetchBaseQuery` utilizara GET.
- RTK Query genero y se exporto `useGetTripsQuery`.
- Ningun componente usa todavia el hook, por lo que no se ejecutan peticiones.
- `npm run build` y `npm run lint` pasan.

## Proximo paso

Explicar que ocurre cuando `TripsPage` usa `useGetTripsQuery`, como el hook crea
una suscripcion y por que `data` puede ser `undefined`. Integrar primero los
estados de carga y error antes de renderizar la lista.

## Suscripcion y estado inicial de carga integrados

- `TripsPage` importa y ejecuta `useGetTripsQuery()` sin argumentos.
- Al renderizarse, el hook crea una suscripcion a la clave
  `getTrips(undefined)`.
- `isLoading` controla un retorno temprano mientras no existen datos iniciales.
- El hook se ejecuta antes de cualquier retorno condicional y respeta las
  reglas de React.
- Una prueba del flujo Redux confirmo el estado `pending`.
- Sin cookie, la consulta termino en `rejected` con HTTP 401, comportamiento
  esperado mientras el frontend no implemente login.
- El navegador integrado no estuvo disponible para la comprobacion visual.
- `npm run build` y `npm run lint` pasan.

## Limitacion actual

Despues de un error, `isLoading` pasa a `false` y la pagina muestra el estado
vacio aunque la consulta haya fallado. Todavia no se debe interpretar esa
pantalla como una lista vacia real.

## Proximo paso

Extraer `isError` y `error` del hook y renderizar un estado de error antes del
contenido principal. Se explicara la diferencia entre ausencia de datos y
fallo de la peticion, comenzando por un mensaje general antes de tipar detalles
especificos del error.

## Estado general de error integrado

- `TripsPage` extrae `isError` desde el mismo hook de consulta.
- El retorno de carga se evalua antes que el retorno de error.
- Un fallo ya no se representa mediante el estado vacio.
- El mensaje es general porque todavia no se inspecciona si el error fue HTTP,
  de red o de serializacion.
- `role="alert"` comunica semanticamente el problema a tecnologias de
  asistencia.
- La estructura detallada de `error` se estudiara cuando sea necesario
  distinguir respuestas como HTTP 401.
- `npm run build` y `npm run lint` pasan.

## Proximo paso

Extraer `data` del hook y explicar su tipo
`ListTripsResponse | undefined`. Obtener la lista mediante encadenamiento
opcional y distinguir una respuesta exitosa vacia de una respuesta exitosa con
viajes antes de renderizar elementos.

## Datos y lista de viajes integrados

- `TripsPage` renombra `data` como `tripsResponse` para distinguir la respuesta
  HTTP de la lista interna.
- Antes de completarse correctamente la consulta, `tripsResponse` puede ser
  `undefined`.
- `tripsResponse?.data.trips ?? []` obtiene los viajes disponibles y usa una
  lista vacia como valor seguro mientras no hay datos.
- Una respuesta exitosa sin viajes muestra un estado vacio.
- Una respuesta exitosa con viajes recorre `Trip[]` mediante `map`.
- Cada elemento usa `trip.id` como clave estable y muestra titulo y fechas.
- Se corrigio mecanicamente una clase `bg-white` que habia quedado dividida y
  no podia ser reconocida por Tailwind.
- `npm run build`, `npm run lint` y `git diff --check` pasan.

## Limitacion actual

- El flujo exitoso todavia no se ha comprobado visualmente con una sesion
  autenticada en el cliente.
- Sin cookie, el backend responde HTTP 401 y la pagina muestra correctamente el
  estado general de error.

## Proximo paso

Aprender a leer el valor `error` de la query y distinguir un HTTP 401 de otros
fallos. La pagina podra explicar que el usuario necesita iniciar sesion sin
confundir una falta de autenticacion con un problema general del servidor.

## Tarea activa

En `TripsPage`, extraer `error` de `useGetTripsQuery()` y usar estrechamiento de
tipos para reconocer el estado HTTP 401. Se agregara un mensaje especifico para
la falta de autenticacion y se conservara el mensaje general para cualquier
otro error.

## Tratamiento de HTTP 401 completado

- `TripsPage` extrae `error` del resultado de `useGetTripsQuery()`.
- `error !== undefined` evita inspeccionar un valor ausente.
- `"status" in error` estrecha la union de tipos antes de acceder a `status`.
- `error.status === 401` identifica una respuesta sin autenticacion valida.
- El estado HTTP 401 muestra un mensaje especifico para iniciar sesion.
- El retorno de autenticacion se evalua antes del error general porque un 401
  tambien establece `isError` en `true`.
- Los demas errores conservan el mensaje general.
- `npm run build`, `npm run lint` y `git diff --check` pasan.

## Proximo paso

Aprender `refetch`, la funcion que permite solicitar nuevamente los datos de
una query existente. Se agregara un control de reintento solamente al estado de
error general; un HTTP 401 seguira requiriendo autenticacion.

## Tarea activa

Extraer `refetch` de `useGetTripsQuery()` y agregar un boton `Reintentar` al
estado de error general. El boton volvera a ejecutar la misma query sin crear
otro endpoint ni modificar manualmente la cache.

## Reintento manual con `refetch` completado

- `TripsPage` extrae `refetch` del resultado de `useGetTripsQuery()`.
- El estado de error general incluye un boton `Reintentar`.
- `onClick={() => refetch()}` difiere la ejecucion hasta que ocurre el clic.
- El reintento reutiliza `getTrips(undefined)`, su configuracion HTTP y su clave
  de cache.
- El estado HTTP 401 no ofrece reintento porque necesita autenticacion.
- Se unifico mecanicamente la cadena de clases del boton para conservar un
  formato legible.
- `npm run build`, `npm run lint` y `git diff --check` pasan.

## Proximo paso

Aprender la diferencia entre `isLoading` e `isFetching`. Durante un `refetch`
sin datos disponibles, la pagina mostrara un estado especifico de reintento. El
boton de error dejara de renderizarse mientras la nueva peticion este en curso,
lo que tambien evita clics repetidos.

## Tarea activa

Extraer `isFetching` de `useGetTripsQuery()` y agregar un retorno de
`Reintentando viajes...` para una peticion posterior que todavia no tenga datos
disponibles. La carga inicial seguira controlada por `isLoading`.

## Diferencia entre `isLoading` e `isFetching` integrada

- `TripsPage` extrae ambos estados desde `useGetTripsQuery()`.
- `isLoading` conserva el retorno de la primera carga sin datos.
- `isFetching && tripsResponse === undefined` representa una peticion
  posterior que todavia no tiene una respuesta exitosa para mostrar.
- El reintento muestra `Reintentando viajes...`.
- Una respuesta exitosa con `trips: []` no se confunde con ausencia de
  respuesta.
- Si en el futuro existen datos en cache durante una actualizacion,
  `tripsResponse` permitira conservarlos visibles.
- Se agruparon mecanicamente `isLoading` e `isFetching` en la
  desestructuracion para hacer explicita su relacion.
- `npm run build`, `npm run lint` y `git diff --check` pasan.

## Proximo paso

Iniciar la integracion de autenticacion en el cliente para poder comprobar la
query de viajes con una cookie real. Primero se revisara el contrato HTTP del
login y se definiran sus tipos publicos en la ubicacion definitiva; todavia no
se creara la mutation ni el formulario.

## Tarea activa

Crear `client/src/features/auth/auth.types.ts` con los contratos publicos de
login: los datos enviados, el usuario autenticado y la envoltura de la
respuesta exitosa. La cookie `httpOnly` no formara parte de estos tipos porque
viaja en los encabezados HTTP y la administra el navegador.

## Contratos publicos de autenticacion definidos

- `client/src/features/auth/auth.types.ts` pertenece al dominio de
  autenticacion.
- `LoginRequest` representa el cuerpo con `email` y `password`.
- `AuthUser` representa solamente `id`, `name`, `email` y `createdAt`.
- `createdAt` usa `string` porque una fecha se serializa como texto en JSON.
- `AuthUserResponse` representa `{ data: { user: AuthUser } }`.
- La respuesta no contiene password, hash, token ni cookie.
- La cookie `httpOnly` permanece fuera del cuerpo JSON y la administra el
  navegador mediante los encabezados HTTP.
- Se expandieron mecanicamente los tipos anidados para hacer visible su
  estructura.
- `npm run build`, `npm run lint` y `git diff --check` pasan.

## Proximo paso

Explicar `builder.mutation` antes de utilizarlo: diferencia con una query,
funcion disparadora, argumento, respuesta y estados. Despues se creara
`client/src/features/auth/authApi.ts` e inyectara solamente la operacion de
login en el API slice compartido.

## Tarea activa

Crear `client/src/features/auth/authApi.ts`, inyectar `login` como una mutation
`POST /api/auth/login` en el API slice compartido y exportar
`useLoginMutation`. Ningun componente utilizara todavia el hook, por lo que
esta definicion no ejecutara peticiones.

## Mutation de login definida

- `client/src/features/auth/authApi.ts` amplia el API slice compartido.
- `login` usa `builder.mutation<AuthUserResponse, LoginRequest>`.
- El primer generico representa la respuesta exitosa y el segundo las
  credenciales recibidas por la funcion disparadora.
- La configuracion genera `POST /api/auth/login` y envia las credenciales en
  `body`.
- `fetchBaseQuery` conserva la base URL y `credentials: "include"` definidos
  en `services/api.ts`.
- RTK Query genera y exporta `useLoginMutation`.
- Definir y exportar el hook no ejecuta una peticion.
- Se corrigio durante la revision el concepto de endpoint: un POST declarado
  mediante `builder.query` seguiria comportandose como consulta automatica; el
  login necesita una mutation disparada manualmente.
- `npm run build`, `npm run lint` y `git diff --check` pasan.

## Proximo paso

Preparar el formulario definitivo de login con React Hook Form y Zod. El
cliente todavia no tiene instalados `react-hook-form`, `zod` ni
`@hookform/resolvers`; antes de instalarlos se explicara la responsabilidad de
cada dependencia y se solicitara confirmacion.

## Acuerdo pedagogico para React Hook Form

- El estudiante comienza React Hook Form sin conocimiento previo.
- La etapa se tratara como un tutorial guiado con el mismo nivel de detalle
  utilizado para RTK Query.
- Cada API se explicara antes de usarla y se comparara con formularios
  controlados mediante `useState`.
- Se mostrara el flujo completo desde el campo hasta la mutation y la respuesta
  del servidor.
- Se introducira preferiblemente un concepto nuevo por microtarea.
- Se distinguiran estado del formulario, validacion del cliente, estado de RTK
  Query y errores del backend.
- No se usaran cuestionarios teoricos obligatorios para detener el avance.
- El protocolo permanente quedo registrado en `AGENTS.md`.

## Preparacion de dependencias del formulario

- `react-hook-form` administrara el registro de campos, envio y estado del
  formulario.
- `zod` definira el contrato y ejecutara validacion en el navegador.
- `@hookform/resolvers` aportara `zodResolver`, el adaptador entre el resultado
  de Zod y los errores de React Hook Form.
- Los tipos TypeScript por si solos no validan valores escritos por el usuario
  en ejecucion.
- RTK Query conservara una responsabilidad separada: ejecutar el login y
  representar su estado remoto.
- Las tres dependencias siguen sin instalarse; se espera confirmacion explicita
  del estudiante antes de modificar `client/package.json` y el lockfile.

## Dependencias del formulario instaladas

- `react-hook-form` `7.84.0` esta instalado en `dependencies`.
- `zod` `4.4.3` esta instalado en `dependencies`.
- `@hookform/resolvers` `5.7.1` esta instalado en `dependencies`.
- `npm ls` confirma un arbol directo y consistente.
- El resolver instalado declara compatibilidad con React Hook Form 7 y Zod 4.
- `npm run build` y `npm run lint` pasan.

## Tarea activa

Crear `client/src/features/auth/login.schema.ts` con el esquema Zod definitivo
de los valores del formulario de login. El esquema normalizara el email,
validara email y password, y exportara el tipo inferido de los valores validos.
Todavia no se utilizara `useForm` ni se modificara `LoginPage`.

## Esquema Zod de login completado

- `client/src/features/auth/login.schema.ts` contiene la validacion del
  formulario de login.
- `z.strictObject` permite solamente `email` y `password`.
- El email se limpia, se normaliza a minusculas y luego se valida.
- La password conserva exactamente el texto escrito y valida entre 8 y 72
  caracteres.
- Los limites de password incluyen mensajes en español para la futura UI.
- `LoginFormValues` se infiere mediante `z.infer<typeof loginSchema>`.
- El archivo se movio mecanicamente desde `client/src/auth/` a la ubicacion
  definitiva `client/src/features/auth/`.
- Una prueba directa confirmo normalizacion y rechazo de password corta,
  password larga y propiedades externas.
- `npm run build`, `npm run lint` y `git diff --check` pasan.

## Proximo paso

Introducir `useForm` como coordinador del formulario y `register` como conexion
entre React Hook Form y un campo HTML. Se construira la estructura definitiva
de login y se registrara solamente el campo email; Zod, password, envio y RTK
Query permaneceran desconectados en esta microtarea.

## Tarea activa

Modificar `client/src/pages/LoginPage.tsx`, inicializar
`useForm<LoginFormValues>()` y registrar solamente un campo HTML de email. La
pagina no tendra aun resolver, password, envio, mensajes de error ni mutation.

## Ajuste pedagogico de la tarea activa

- La implementacion queda pausada antes de modificar `LoginPage`.
- Se explicara primero `register` desde su proposito basico, sin comenzar por
  validacion ni restricciones de TypeScript.
- Solo despues de comprender la conexion entre el input y React Hook Form se
  retomara el campo email.

## Primer campo registrado con React Hook Form

- `LoginPage` crea una instancia privada mediante
  `useForm<LoginFormValues>()`.
- La funcion `register` proviene de esa instancia.
- `{...register("email")}` conecta el input con React Hook Form mediante
  `name`, eventos y una referencia al elemento HTML.
- El label y el input comparten el identificador `email`.
- El campo conserva semantica de email y autocompletado.
- No existe todavia validacion Zod, envio ni mutation.
- Se ajusto mecanicamente el texto introductorio de la pagina.
- `npm run build`, `npm run lint` y `git diff --check` pasan.

## Proximo paso

Registrar el campo `password` usando la misma funcion `register`. Esta tarea no
introducira una API nueva; reforzara como una sola instancia de formulario
organiza varios campos bajo nombres diferentes.

## Campos de login registrados

- `email` y `password` utilizan la misma instancia creada por `useForm`.
- Ambos campos se conectan mediante la misma funcion `register`.
- React Hook Form identifica cada valor por el nombre entregado a `register`.
- El campo password usa `type="password"` y
  `autoComplete="current-password"`.
- `type="password"` oculta visualmente los caracteres, pero no cifra el valor.
- Todavia no existe validacion, envio ni conexion con RTK Query.
- `npm run build`, `npm run lint` y `git diff --check` pasan.

## Proximo paso

Explicar y configurar `defaultValues` para que la instancia de React Hook Form
nazca con `email` y `password` como textos vacios. No se conectara todavia Zod
ni el envio.

## Valores iniciales del login configurados

- `useForm<LoginFormValues>()` recibe un objeto de configuracion.
- `defaultValues` centraliza `email` y `password` como textos vacios.
- Los inputs no duplican esta responsabilidad mediante atributos
  `defaultValue`.
- La inicializacion no requiere `useState`.
- Se expandio mecanicamente el objeto para facilitar lectura y futuros diffs.
- `npm run build`, `npm run lint` y `git diff --check` pasan.

## Proximo paso

Explicar y conectar `zodResolver(loginSchema)` como adaptador entre Zod y React
Hook Form. En esta microtarea solo se configurara el resolver; todavia no se
mostraran errores ni se enviara el formulario.

## Ajuste pedagogico antes de `zodResolver`

- La implementacion del resolver queda pausada.
- Antes de escribir codigo se comparara la validacion directa del backend
  mediante `loginSchema.parse(req.body)` con el contrato de validacion que
  espera React Hook Form.
- Se explicara donde termina Zod, que hace el adaptador y quien transforma los
  errores en cada entorno.
- `LoginPage` no debe modificarse hasta completar esta comparacion.

## Tarea activa

Reanudar la implementacion conectando `zodResolver(loginSchema)` en la
configuracion existente de `useForm`. La tarea termina al comprobar esa
conexion; no incluye aun lectura de errores ni envio.

## Zod conectado con React Hook Form

- `LoginPage` importa `zodResolver` desde `@hookform/resolvers/zod`.
- `loginSchema` se importa como valor ejecutable.
- `LoginFormValues` permanece como import exclusivo de TypeScript.
- `zodResolver(loginSchema)` crea la funcion adaptadora que recibe `useForm`.
- Configurar el resolver no ejecuta por si solo una peticion ni muestra
  mensajes.
- `register` y `defaultValues` permanecen intactos.
- Se ordenaron mecanicamente los imports externos y locales.
- `npm run build`, `npm run lint` y `git diff --check` pasan.

## Proximo paso

Explicar `formState` y su propiedad `errors`. Luego se extraeran los errores
traducidos por el resolver y se preparara su renderizado condicional junto a
cada campo. Todavia no se agregara envio ni mutation, por lo que los mensajes
no apareceran hasta la siguiente microtarea.

## Tarea activa

Extraer `formState.errors` desde `useForm` y renderizar condicionalmente los
mensajes de `email` y `password` junto a sus campos.

## Errores de formulario preparados

- `LoginPage` extrae `errors` mediante desestructuracion anidada de
  `formState`.
- `errors.email` y `errors.password` coinciden con los nombres registrados y
  con las propiedades del esquema.
- Cada mensaje se renderiza condicionalmente junto a su input.
- Los mensajes usan `role="alert"`.
- React Hook Form podra volver a renderizar la pagina cuando cambie esta parte
  de `formState`.
- Todavia no existe un evento de envio que solicite validacion, por lo que los
  errores permanecen vacios al abrir la pagina.
- `npm run build`, `npm run lint` y `git diff --check` pasan.

## Proximo paso

Explicar `handleSubmit` como coordinador entre el evento HTML, el resolver y la
funcion que recibe datos validos. Despues se conectara el envio minimo para
hacer visibles los errores, sin ejecutar aun la mutation.

## Envio y validacion del formulario conectados

- `handleSubmit` se extrae de la misma instancia de `useForm`.
- El formulario usa `onSubmit={handleSubmit(handleLoginSubmit)}`.
- React Hook Form evita el envio HTML tradicional, recoge los campos y solicita
  validacion al resolver.
- Los datos invalidos actualizan `formState.errors` y no llegan a
  `handleLoginSubmit`.
- Los datos validos llegan a `handleLoginSubmit` como `LoginFormValues`.
- El boton usa `type="submit"` y no necesita un `onClick`.
- `noValidate` desactiva los avisos y el bloqueo de validacion nativos para que
  Zod sea la unica fuente de mensajes.
- Se conservan `type` y `autoComplete` porque siguen aportando semantica,
  teclado, ocultamiento y ayuda del navegador.
- `handleLoginSubmit` aun no ejecuta la mutation.
- `npm run build`, `npm run lint` y `git diff --check` pasan.

## Proximo paso

Retomar RTK Query explicando el retorno de `useLoginMutation`: la funcion
disparadora y el objeto de estado. Luego se conectara la funcion disparadora
dentro de `handleLoginSubmit`.

## Tarea activa

Importar `useLoginMutation`, extraer solamente su funcion disparadora `login` y
ejecutarla desde `handleLoginSubmit` con los valores ya validados. El resultado
y los estados de la mutation se estudiaran en microtareas posteriores.

## Funcion disparadora de login conectada

- `LoginPage` importa el hook generado `useLoginMutation`.
- El hook se ejecuta en el nivel superior del componente.
- La primera posicion de la tupla se guarda como `login`.
- Ejecutar el hook no inicia por si solo una peticion.
- `handleLoginSubmit` recibe valores que superaron Zod y ejecuta
  `login(values)`.
- La llamada dispara internamente Redux, el middleware de RTK Query y
  `fetchBaseQuery`.
- Los valores inferidos del formulario son compatibles estructuralmente con
  `LoginRequest`.
- Todavia no se lee la segunda posicion de la tupla ni se representa el
  resultado remoto.
- Se ordenaron mecanicamente los imports del dominio de autenticacion.
- `npm run build`, `npm run lint` y `git diff --check` pasan.

## Proximo paso

Explicar el segundo elemento devuelto por `useLoginMutation` y el estado
`isUninitialized`: la mutation existe, pero aun no ha sido disparada. Despues
se recorrera el cambio a `isLoading`, `isSuccess` o `isError`.

## Tarea activa

Extraer `isUninitialized` desde el objeto de estado de `useLoginMutation` y
usarlo para mostrar el texto introductorio solamente antes de que la mutation
haya sido disparada por primera vez.

## Estado inicial de la mutation integrado

- La segunda posicion de `useLoginMutation` se reconoce como un objeto de
  estado.
- `isUninitialized` es `true` mientras `login` nunca haya sido ejecutado.
- El texto introductorio se muestra solamente durante ese estado.
- Un formulario rechazado por Zod no cambia `isUninitialized`, porque la
  mutation no se dispara.
- Una llamada valida a `login(values)` cambia `isUninitialized` a `false`.
- `formState.errors` y `isUninitialized` permanecen separados: uno describe
  validacion local y el otro el ciclo remoto.
- `npm run build`, `npm run lint` y `git diff --check` pasan.

## Proximo paso

Extraer `isLoading` del mismo objeto de estado. Durante el POST, el boton se
deshabilitara y mostrara `Iniciando sesion...` para comunicar progreso y evitar
envios duplicados.

## Estado de carga remota integrado

- `isLoading` se extrae del objeto de estado de `useLoginMutation`.
- Antes de disparar la mutation y despues de resolverla es `false`.
- Mientras el POST espera respuesta es `true`.
- El texto del boton cambia a `Iniciando sesion...`.
- `disabled={isLoading}` impide nuevos eventos submit durante la peticion.
- El texto comunica progreso y `disabled` controla la interaccion; son
  responsabilidades complementarias.
- No se creo estado local adicional mediante `useState`.
- `npm run build`, `npm run lint` y `git diff --check` pasan.

## Proximo paso

Extraer `isError` de la mutation y mostrar primero un mensaje remoto general.
Se diferenciara de `formState.errors`: Zod describe campos invalidos, mientras
RTK Query describe una peticion valida que fallo en la red o el backend.

## Error remoto general de login integrado

- `isError` se extrae del estado de `useLoginMutation`.
- El mensaje remoto se muestra a nivel del formulario completo.
- Los errores locales de Zod permanecen asociados a email y password.
- Un rechazo local no dispara la mutation y no activa `isError`.
- Un fallo HTTP o de red posterior a datos validos activa el mensaje remoto.
- Todavia no se inspecciona la causa concreta almacenada en `error`.
- `npm run build`, `npm run lint` y `git diff --check` pasan.

## Proximo paso

Extraer `error` de la mutation y reconocer de forma segura el estado HTTP 401.
Las credenciales incorrectas tendran un mensaje especifico y los demas fallos
conservaran el mensaje general.

## Error HTTP 401 diferenciado

- `error` se extrae del objeto de estado de la mutation.
- El acceso a `status` ocurre solo despues de comprobar que `error` existe y
  que la propiedad esta presente.
- HTTP 401 se interpreta como credenciales incorrectas en el endpoint de
  login.
- Los fallos de red, serializacion u otros estados HTTP conservan el mensaje
  general.
- Los errores remotos permanecen separados de `formState.errors`.
- `npm run build`, `npm run lint` y `git diff --check` pasan.

## Proximo paso

Extraer `isSuccess` y renderizar un mensaje de sesion iniciada. Este estado
confirmara que RTK Query recibio una respuesta exitosa; la navegacion se
implementara en una microtarea posterior.

## Estado exitoso de login integrado

- `isSuccess` se extrae del objeto de estado de la mutation.
- Es `true` solamente cuando la ultima ejecucion termino correctamente.
- El mensaje de exito utiliza `role="status"`.
- El estado confirma una respuesta exitosa de RTK Query, no una lectura directa
  de la cookie `httpOnly`.
- Se ordenaron mecanicamente los estados como inicial, carga, exito y error.
- La ruta exitosa real sigue pendiente de una prueba autenticada en navegador.
- `npm run build`, `npm run lint` y `git diff --check` pasan.

## Proximo paso

Extraer `data` de la mutation, renombrarlo como `loginResponse` y leer
`loginResponse.data.user.name` en el mensaje exitoso. Esto comprobara el
contrato publico antes de agregar navegacion.

## Respuesta exitosa de login leida

- `data` se renombra localmente como `loginResponse`.
- Antes del exito puede ser `undefined`, por lo que el JSX comprueba su
  existencia.
- El acceso sigue el contrato
  `loginResponse.data.user.name`.
- El mensaje muestra solamente el nombre publico del usuario.
- La respuesta JSON permanece separada de la cookie `httpOnly`.
- Se corrigio mecanicamente el nombre de variable desde PascalCase a camelCase.
- `npm run build`, `npm run lint` y `git diff --check` pasan.

## Proximo paso

Explicar el valor devuelto por la funcion disparadora `login(values)` y el
metodo `.unwrap()`. Despues se usara el resultado exitoso para navegar a
`/trips` sin navegar cuando el backend responda con error.

## Tarea activa

Convertir `handleLoginSubmit` en una funcion asincrona, esperar
`login(values).unwrap()` y capturar el rechazo. Los mensajes continuaran
dependiendo del estado del hook; todavia no se agregara navegacion ni limpieza.

## Espera y rechazo de la mutation integrados

- `handleLoginSubmit` ahora es una funcion asincrona.
- `login(values)` sigue disparando la mutation con los valores ya validados.
- `.unwrap()` transforma el resultado de RTK Query en una promesa convencional:
  devuelve la respuesta publica si el login funciona y rechaza si falla.
- `await` mantiene pendiente la ejecucion de `handleLoginSubmit` hasta que el
  backend responde.
- El `catch` captura ese rechazo para que no quede sin manejar.
- La interfaz sigue leyendo el fallo desde `isError` y `error`, por lo que el
  `catch` no necesita crear otro mensaje ni duplicar estado.
- Todavia no se agregaron navegacion, limpieza del formulario ni registros en
  consola.
- `npm run build`, `npm run lint` y `git diff --check` pasan.

## Proximo paso

Enseñar `reset` de React Hook Form y utilizarlo para retirar la contraseña del
formulario una vez terminado un intento de login. La limpieza conservara el
email para facilitar un nuevo intento. Antes de modificar el codigo se
explicara la diferencia entre limpiar los campos, borrar datos de RTK Query y
eliminar informacion que ya aparecio temporalmente en las herramientas de
desarrollo del navegador.

## Tarea activa

Ninguna. La siguiente microtarea comenzara con la explicacion de `reset`; no
debe agregarse todavia navegacion.

## Limpieza de la contraseña integrada

- `reset` se extrae de la misma instancia de React Hook Form que administra
  `register`, `handleSubmit` y `errors`.
- El bloque `finally` se ejecuta una vez resuelta o rechazada la mutation.
- El email validado se conserva para facilitar un nuevo intento.
- La contraseña se reemplaza por un texto vacio en el input y en el estado
  interno del formulario.
- La limpieza ocurre despues de terminar la peticion, no durante `isLoading`.
- `reset` no elimina una peticion ya visible en las herramientas de desarrollo
  del navegador ni modifica el estado remoto de RTK Query.
- Todavia no se agrego navegacion.
- `npm run build`, `npm run lint` y `git diff --check` pasan.

## Proximo paso

Navegar a `/trips` solamente despues de que `.unwrap()` entregue una respuesta
exitosa. Se explicara como la posicion de `navigate("/trips")` dentro de
`try` hace que el rechazo salte directamente a `catch` y evita navegar con
credenciales incorrectas.

## Tarea activa

Importar `useNavigate`, crear la funcion `navigate` dentro de `LoginPage` y
ejecutar `navigate("/trips")` inmediatamente despues de
`await login(values).unwrap()`. La navegacion no debe colocarse en `finally` ni
fuera de `try`.

## Navegacion posterior al login integrada

- `useNavigate` se importa desde React Router y se ejecuta en el nivel superior
  de `LoginPage`.
- `navigate("/trips", { replace: true })` se ejecuta inmediatamente despues de
  que `.unwrap()` confirma el login.
- Una respuesta rechazada salta a `catch` y no alcanza la navegacion.
- `replace: true` sustituye `/login` en el historial para que el boton atras no
  regrese inmediatamente al formulario.
- `finally` conserva su responsabilidad independiente de limpiar la contraseña.
- Se ordeno mecanicamente el import externo de `useNavigate`.
- `npm run build`, `npm run lint` y `git diff --check` pasan.

## Decision de experiencia de autenticacion

- Un usuario autenticado que visite `/login` no debe volver a ver el formulario.
- El cliente no puede comprobar la cookie `httpOnly` directamente.
- La sesion se confirmara consultando `GET /api/auth/me`.
- Una respuesta exitosa permitira redirigir a `/trips`.
- Una respuesta HTTP 401 permitira mostrar el formulario de login.
- La proteccion de rutas privadas se implementara despues de preparar esta
  consulta y comprender sus estados.

## Proximo paso

Agregar al API slice de autenticacion una query sin argumentos para consultar
la sesion actual. Esta microtarea solo definira el endpoint y su hook generado;
`LoginPage` todavia no lo ejecutara.

## Tarea activa

Agregar `getCurrentUser` a `client/src/features/auth/authApi.ts` mediante
`builder.query<AuthUserResponse, void>`, consultar `auth/me` y exportar
`useGetCurrentUserQuery`.

## Query de sesion actual definida

- `getCurrentUser` es un endpoint hermano de `login` dentro de `authApi`.
- Usa `builder.query<AuthUserResponse, void>` porque consulta el usuario
  autenticado y no recibe argumentos.
- `query` devuelve `auth/me`; `fetchBaseQuery` completa la URL y envia la cookie
  mediante la configuracion compartida `credentials: "include"`.
- Al no recibir argumentos, la consulta tendra una unica entrada de cache para
  el endpoint.
- RTK Query genera y exporta `useGetCurrentUserQuery`.
- Definir y exportar el hook no ejecuta todavia ninguna peticion.
- `npm run build`, `npm run lint` y `git diff --check` pasan.

## Proximo paso

Montar `useGetCurrentUserQuery()` en `LoginPage` y representar solamente la
comprobacion inicial de sesion. La query se ejecutara automaticamente al montar
la pagina y mantendra una suscripcion mientras el componente exista. La
redireccion segun la respuesta se agregara en la microtarea posterior.

## Tarea activa

Importar `useGetCurrentUserQuery` en `LoginPage`, ejecutar el hook sin
argumentos, renombrar su `isLoading` como `isCheckingSession` y mostrar
`Comprobando sesion...` antes del formulario mientras esa primera consulta esta
pendiente.

## Comprobacion inicial de sesion integrada

- `LoginPage` ejecuta `useGetCurrentUserQuery()` sin argumentos.
- Montar el hook crea una suscripcion y dispara automaticamente
  `GET /api/auth/me` cuando no existe una respuesta util en cache.
- El `isLoading` de la query se renombra como `isCheckingSession`.
- El `isLoading` de la mutation conserva su nombre y sigue representando
  exclusivamente el envio del formulario.
- Mientras se espera la primera respuesta, la pagina muestra
  `Comprobando sesion...` y evita mostrar fugazmente el formulario.
- Todos los hooks se ejecutan antes del retorno condicional.
- Todavia no se lee la respuesta exitosa ni se redirige por una sesion activa.
- `npm run build`, `npm run lint` y `git diff --check` pasan.

## Proximo paso

Leer `data` de la query de sesion y usar el componente declarativo `Navigate`
para redirigir a `/trips` cuando el backend confirme un usuario. Una respuesta
401 dejara `data` como `undefined` y permitira mostrar el formulario.

## Tarea activa

Renombrar `data` como `currentUserResponse` al desestructurar
`useGetCurrentUserQuery()`. Importar `Navigate` desde React Router y, despues
del estado de comprobacion, devolver `<Navigate to="/trips" replace />` cuando
`currentUserResponse` exista.

## Redireccion de usuario autenticado integrada

- La respuesta `data` de `useGetCurrentUserQuery` se renombra como
  `currentUserResponse`.
- Mientras la consulta inicial carga, se conserva el estado
  `Comprobando sesion...`.
- Una respuesta autenticada renderiza `<Navigate to="/trips" replace />`.
- `Navigate` expresa una redireccion derivada del estado renderizado, mientras
  `useNavigate` sigue reservado para la navegacion posterior al evento submit.
- Una respuesta 401 no contiene `data`, por lo que permite llegar al formulario.
- La redireccion reemplaza `/login` en el historial.
- Todavia no se diferencian los errores 401 de otros fallos de la comprobacion.
- `npm run build`, `npm run lint` y `git diff --check` pasan.

## Proximo paso

Retirar del estado de la mutation y del JSX el mensaje de exito que dejo de
tener una oportunidad util de mostrarse. El login exitoso navega inmediatamente
a `/trips`; por eso `isSuccess` y `loginResponse` ya no deben mantener una rama
visual muerta en `LoginPage`.

## Tarea activa

Eliminar `isSuccess` y `data: loginResponse` de la desestructuracion de
`useLoginMutation`, y eliminar el bloque JSX que muestra
`Sesion iniciada correctamente`. No modificar el manejo de carga, error,
navegacion ni limpieza del formulario.

## Rama visual de exito retirada

- `LoginPage` ya no extrae `isSuccess` ni `data: loginResponse` de la mutation.
- Se elimino el mensaje de exito que quedaba obsoleto al navegar inmediatamente
  a `/trips`.
- RTK Query sigue recibiendo la respuesta de login; la pagina simplemente ya no
  necesita leerla para renderizar.
- `.unwrap()`, la navegacion, el manejo de errores y `reset` permanecen
  intactos.
- `npm run build`, `npm run lint` y `git diff --check` pasan.

## Proximo paso

Diferenciar el HTTP 401 esperado de `GET /api/auth/me` de un fallo real al
comprobar la sesion. El 401 significa que se debe mostrar el formulario; un
error de red, de serializacion o del servidor debe mostrar un estado de error
separado.

## Tarea activa

Extraer `isError` y `error` de `useGetCurrentUserQuery` con los nombres
`isSessionError` y `sessionError`. Reconocer de forma segura el estado 401 y,
antes del formulario, devolver `No pudimos comprobar tu sesion. Intenta
nuevamente.` solamente cuando exista un error de sesion diferente de 401.

## Errores de comprobacion de sesion diferenciados

- La query de sesion expone `isSessionError` y `sessionError`, separados de
  `isError` y `error` de la mutation de login.
- HTTP 401 se interpreta como ausencia de una sesion valida y permite mostrar
  el formulario.
- Un error de red, de serializacion u otro estado HTTP muestra un estado de
  error de sesion independiente.
- El formulario no se presenta como solucion cuando el cliente no pudo
  determinar el estado de autenticacion.
- El mensaje tecnico usa `role="alert"`.
- `npm run build`, `npm run lint` y `git diff --check` pasan.

## Proximo paso

Hacer recuperable el error tecnico mediante `refetch`. Se reutilizara
`isFetching` para representar una peticion posterior y evitar mostrar el
formulario mientras se vuelve a comprobar la sesion.

## Tarea activa

Extraer `refetch` como `refetchCurrentUser` e `isFetching` como
`isFetchingSession` desde `useGetCurrentUserQuery`. Mostrar
`Reintentando comprobar sesion...` cuando exista una peticion sin datos despues
de la carga inicial, y agregar un boton `Reintentar` al estado de error tecnico
que ejecute `refetchCurrentUser`.

## Reintento de comprobacion de sesion integrado

- La query expone `refetchCurrentUser`, que vuelve a ejecutar el mismo endpoint
  sin reconstruir manualmente la peticion.
- `isFetchingSession` representa cualquier peticion de sesion activa.
- `isCheckingSession` conserva la responsabilidad especifica de la primera
  carga sin datos.
- Durante un reintento sin datos, la pagina muestra
  `Reintentando comprobar sesion...` y no deja aparecer el formulario.
- El estado de error tecnico incluye un boton `Reintentar` con
  `type="button"`.
- Un nuevo 200 redirige, un 401 muestra el formulario y otro fallo devuelve el
  estado recuperable.
- Se agrego mecanicamente una separacion visual entre retornos condicionales.
- `npm run build`, `npm run lint` y `git diff --check` pasan.

## Decision estructural para rutas privadas

- La autenticacion no se comprobara de forma independiente dentro de cada
  pagina privada.
- Se creara `client/src/features/auth/RequireAuth.tsx`.
- `RequireAuth` sera un componente de ruta del dominio de autenticacion.
- Cuando la sesion sea valida renderizara un `<Outlet />` para permitir que
  React Router muestre la ruta privada hija.
- La agrupacion de rutas privadas en `AppRouter` se realizara en una microtarea
  posterior.

## Proximo paso

Crear y comprender `RequireAuth` reutilizando la query de sesion. El unico
concepto nuevo sera `<Outlet>` como punto donde React Router coloca la ruta hija
autorizada.

## Tarea activa

Crear `client/src/features/auth/RequireAuth.tsx`. Debe comprobar la sesion con
`useGetCurrentUserQuery`, mostrar carga inicial, redirigir un 401 a `/login`,
mostrar un error tecnico con reintento y devolver `<Outlet />` cuando exista una
respuesta autenticada. Todavia no modificar `AppRouter`.

## Guard de autenticacion definido

- Se creo `client/src/features/auth/RequireAuth.tsx` en el dominio de
  autenticacion.
- La primera carga y los reintentos sin datos tienen estados separados.
- HTTP 401 redirige declarativamente a `/login` con `replace`.
- Los fallos tecnicos muestran un mensaje y permiten ejecutar `refetch`.
- Una respuesta autenticada devuelve `<Outlet />` para habilitar la ruta
  privada hija.
- El fallback `null` evita renderizar contenido privado sin una decision
  definitiva.
- Se corrigieron mecanicamente el nombre inicial `RequiereAuth` y una ruta
  escrita como `/trips` dentro de la rama 401.
- `npm run build`, `npm run lint` y `git diff --check` pasan.

## Proximo paso

Conectar `RequireAuth` en `AppRouter` como una ruta contenedora sin `path`. No
agregara un segmento a la URL; solo interpondra la comprobacion de sesion antes
de las rutas privadas.

## Tarea activa

Importar `RequireAuth` en `client/src/router/AppRouter.tsx` y mover las rutas
`/trips` y `/trips/:tripId` dentro de un objeto hijo con
`Component: RequireAuth` y su propio arreglo `children`. Inicio, login y la ruta
comodin deben permanecer fuera del guard.

## Rutas privadas conectadas

- `AppRouter` importa `RequireAuth` desde el dominio de autenticacion.
- La ruta contenedora del guard no tiene `path`, por lo que no agrega segmentos
  a las URLs.
- `/trips` y `/trips/:tripId` son rutas hijas privadas.
- `/`, `/login` y la ruta comodin `*` permanecen publicas.
- `MainLayout` renderiza primero el guard mediante su `Outlet`; una sesion
  valida permite que el `Outlet` del guard renderice la pagina privada.
- `TripsPage` no se monta ni dispara su query antes de confirmar la sesion.
- Se ordenaron mecanicamente los imports locales de `AppRouter` y se normalizo
  el formato del bloque 401.
- `npm run build`, `npm run lint` y `git diff --check` pasan.

## Decision sobre HomePage

- La revision del contenido real mostro que `HomePage` ya funciona
  semanticamente como dashboard: presenta viajes proximos, presupuesto,
  destinos guardados y acciones personales.
- Aunque los valores actuales sean estaticos, su fuente definitiva sera
  informacion privada del usuario.
- La decision anterior de mantener `/` publica queda reemplazada:
  `HomePage` debe quedar dentro de `RequireAuth`.
- Si el producto necesita una landing publica en el futuro, se creara una
  pagina separada con contenido promocional y sin estadisticas personales.

## Proximo paso

Verificar en ejecucion el flujo de rutas con y sin cookie antes de introducir
logout e invalidacion de cache.

## Tarea activa

Mover la ruta indice de `HomePage` dentro del objeto de `RequireAuth` antes de
realizar la prueba manual. `/login` y la ruta comodin continuaran fuera del
guard.

## HomePage protegida

- La ruta indice `/` se movio dentro de los hijos de `RequireAuth`.
- La URL no cambio; el objeto contenedor del guard sigue sin tener `path`.
- `HomePage` solo se renderiza despues de confirmar una sesion valida.
- `/login` y la ruta comodin `*` permanecen fuera del guard.
- Las redirecciones exitosas de `LoginPage` siguen apuntando a `/trips`; su
  destino se revisara por separado.
- `npm run build`, `npm run lint` y `git diff --check` pasan.

## Proximo paso

Verificar en ejecucion el flujo protegido y decidir el destino principal
posterior al login entre el dashboard `/` y la lista `/trips`.

## Tarea activa

Probar manualmente que `/`, `/trips` y `/trips/:tripId` redirigen a `/login`
sin cookie; despues de iniciar sesion, comprobar que las tres rutas se pueden
abrir y que `/login` redirige al usuario autenticado.

## Verificacion de ejecucion parcial

- El servidor y el cliente se iniciaron localmente.
- `GET /api/auth/me` sin cookie responde HTTP 401, como espera
  `RequireAuth`.
- Vite sirve `/` y `/trips` con HTTP 200 para que React Router resuelva la
  navegacion en el cliente.
- La automatizacion visual del navegador no estuvo disponible en esta sesion;
  la observacion manual de las redirecciones sigue pendiente, pero no bloquea
  el ajuste del destino exitoso.

## Decision sobre el destino posterior al login

- `/` representa ahora el dashboard autenticado y es el destino principal.
- Un login exitoso debe navegar a `/`.
- Un usuario autenticado que visite `/login` tambien debe ser redirigido a `/`.
- La rama 401 de `RequireAuth` debe continuar apuntando a `/login`.

## Tarea activa

En `LoginPage`, cambiar a `/` las dos redirecciones que actualmente apuntan a
`/trips`: la navegacion imperativa posterior a `.unwrap()` y el componente
`Navigate` usado cuando `currentUserResponse` ya existe. Conservar `replace` en
ambas.

## Destino principal del login actualizado

- La navegacion posterior a `.unwrap()` apunta a `/`.
- Un usuario autenticado que visite `/login` tambien es redirigido a `/`.
- Ambas redirecciones conservan reemplazo del historial.
- La rama 401 de `RequireAuth` continua apuntando a `/login`.
- El dashboard protegido es ahora el destino principal despues de autenticar.
- `npm run build`, `npm run lint` y `git diff --check` pasan.

## Proximo paso

Preparar la coherencia de cache necesaria para logout. Antes de usar
`providesTags` e `invalidatesTags`, se declarara el tipo de etiqueta de sesion
en el API slice compartido.

## Tarea activa

Agregar `tagTypes: ["Auth"]` a la configuracion de `createApi` en
`client/src/services/api.ts`. Todavia no agregar `providesTags`,
`invalidatesTags` ni la mutation de logout.

## Tipo de tag de autenticacion declarado

- El API slice compartido declara `tagTypes: ["Auth"]`.
- La declaracion esta al mismo nivel que `reducerPath`, `baseQuery` y
  `endpoints`.
- Todos los endpoints inyectados pueden usar el mismo vocabulario de tags.
- Declarar el tipo no etiqueta cache, no invalida datos y no ejecuta
  peticiones.
- No se creo un segundo API slice.
- `npm run build`, `npm run lint` y `git diff --check` pasan.

## Proximo paso

Enseñar `providesTags` y asociar la entrada de cache de `getCurrentUser` con la
etiqueta `Auth`. Todavia ninguna mutation invalidara esa etiqueta.

## Tarea activa

Agregar `providesTags: ["Auth"]` al endpoint `getCurrentUser` en
`client/src/features/auth/authApi.ts`. No agregar aun `invalidatesTags` ni
logout.

## Cache de sesion etiquetada

- `getCurrentUser` declara `providesTags: ["Auth"]`.
- La etiqueta relaciona la entrada de cache de la sesion con la categoria
  `Auth`; no modifica el usuario ni la respuesta JSON.
- `login` todavia no invalida la etiqueta.
- `npm run build`, `npm run lint` y `git diff --check` pasan.

## Ajuste pedagogico

- Las proximas explicaciones conservaran la precision tecnica, pero empezaran
  por el comportamiento visible y una analogia sencilla antes de presentar los
  nombres internos de RTK Query.
- Los detalles tecnicos se conectaran siempre con una consecuencia concreta en
  la interfaz o en las peticiones.
- `AGENTS.md` exige recordar en cada tarea de tags que cache puede quedar
  vieja, quien proporciona la etiqueta, quien la invalida y que peticion puede
  producir esa invalidacion.

## Proximo paso

Enseñar `invalidatesTags` como la señal de que una mutation volvio vieja una
respuesta cacheada. El primer caso sera el login: despues de crear la cookie, la
consulta anterior de sesion debe comprobarse nuevamente.

## Tarea activa

Agregar una invalidacion condicional al endpoint `login`, al mismo nivel que
`query`: si existe una respuesta exitosa, devolver `["Auth"]`; si el login
falla, devolver `[]`. Todavia no crear la mutation de logout.

## Login conectado con la cache de sesion

- `login` invalida `Auth` solamente cuando recibe una respuesta exitosa.
- Un login rechazado devuelve una lista de tags vacia y evita un refetch
  innecesario de `/auth/me`.
- Una invalidacion exitosa hace que las suscripciones activas a
  `getCurrentUser` vuelvan a comprobar la sesion.
- `getCurrentUser` conserva `providesTags: ["Auth"]`.
- `npm run build`, `npm run lint` y `git diff --check` pasan.

## Proximo paso

Definir la mutation de logout a partir del contrato real del backend:
`POST /api/auth/logout`, sin cuerpo de solicitud y con respuesta HTTP 204 sin
JSON.

## Tarea activa

Agregar el endpoint `logout` a `client/src/features/auth/authApi.ts` como
`builder.mutation<void, void>`, devolver `url: "auth/logout"` y
`method: "POST"`, y exportar `useLogoutMutation`. Todavia no agregar
invalidacion ni usar el hook en un componente.

## Mutation de logout definida

- `logout` usa `builder.mutation<void, void>`.
- Ejecutara `POST /api/auth/logout` sin body.
- Los dos `void` representan ausencia de respuesta JSON y ausencia de
  argumento.
- Se exporta `useLogoutMutation`, pero ningun componente lo ejecuta todavia.
- No se agrego invalidacion antes de revisar todas las caches dependientes de
  la sesion.
- Se retiro mecanicamente una linea vacia entre endpoints.
- `npm run build`, `npm run lint` y `git diff --check` pasan.

## Decision de seguridad sobre cache de usuario

- La cache de `getTrips` tambien depende de la identidad autenticada.
- Cerrar sesion debe volver obsoletos tanto el usuario actual como los viajes
  del usuario anterior.
- La etiqueta `Auth` representara las entradas de cache cuyo contenido depende
  de la sesion, no solamente la respuesta de `/auth/me`.
- Antes de invalidar `Auth` desde logout, `getTrips` debe proporcionar esa
  etiqueta.

## Proximo paso

Etiquetar la query de viajes como dependiente de la sesion para que logout
pueda limpiar o volver a consultar todos los datos privados relacionados.

## Tarea activa

Agregar `providesTags: ["Auth"]` a `getTrips` en
`client/src/features/trips/tripsApi.ts`. Todavia no modificar logout ni usar su
hook.

## Cache de viajes ligada a la sesion

- `getTrips` proporciona la etiqueta `Auth`.
- `getCurrentUser` y `getTrips` quedan identificadas como caches cuyo contenido
  depende de la persona autenticada.
- Agregar `providesTags` no ejecuto una peticion ni cambio la respuesta de
  viajes.
- Logout ya puede invalidar una sola etiqueta para volver obsoletas ambas
  caches.
- Se normalizaron mecanicamente los saltos de linea del bloque logout.
- `npm run build`, `npm run lint` y `git diff --check` pasan.

## Proximo paso

Invalidar `Auth` despues de un logout exitoso. Como el backend responde 204 sin
contenido, el exito se reconocera por la ausencia de `error`, no por la
existencia de `result`.

## Tarea activa

Agregar a `logout` una funcion `invalidatesTags` que reciba `_result` y `error`,
devuelva `[]` si existe un error y `["Auth"]` si no existe. Todavia no usar
`useLogoutMutation` en componentes.

## Logout conectado con las caches privadas

- Logout invalida `Auth` solamente cuando no recibe un error.
- El resultado HTTP 204 no se usa para decidir el exito porque no contiene
  datos.
- La invalidacion alcanza los resultados guardados de `getCurrentUser` y
  `getTrips`, ya que ambos proporcionan `Auth`.
- Un logout fallido devuelve una lista vacia y conserva las caches actuales.
- El hook de logout todavia no se ejecuta desde la interfaz.
- `npm run build`, `npm run lint` y `git diff --check` pasan.

## Decision estructural para la navegacion de autenticacion

- La cabecera necesita mostrar una accion diferente segun exista o no una
  sesion.
- Esa responsabilidad se ubicara en
  `client/src/features/auth/AuthNavigation.tsx`.
- `MainLayout` no administrara directamente las peticiones de autenticacion.
- El componente reutilizara `useGetCurrentUserQuery`; al usar el mismo endpoint
  y los mismos argumentos, compartira el resultado guardado existente.

## Proximo paso

Crear la base definitiva de `AuthNavigation` y reforzar como varios componentes
pueden consumir el mismo resultado de RTK Query sin crear una cache por
componente.

## Tarea activa

Crear `client/src/features/auth/AuthNavigation.tsx`. Debe usar
`useGetCurrentUserQuery`, mostrar `Comprobando sesion...` durante la primera
carga, devolver un `NavLink` a `/login` si no existe usuario y mostrar el nombre
del usuario si existe. Todavia no usar `useLogoutMutation` ni modificar
`MainLayout`.

## Base de AuthNavigation completada

- `AuthNavigation` usa `useGetCurrentUserQuery`.
- Durante la primera consulta muestra `Comprobando sesion...`.
- Sin una respuesta autenticada muestra un enlace a `/login`.
- Con una respuesta autenticada muestra `data.user.name`.
- El hook se conecta al mismo resultado guardado que consumen `RequireAuth` y
  `LoginPage`; no crea una cache por componente.
- Todavia no ejecuta logout.
- Se corrigieron mecanicamente un import innecesario y el orden de imports.
- `npm run build`, `npm run lint` y `git diff --check` pasan.

## Proximo paso

Reemplazar el enlace estatico de login del encabezado por `AuthNavigation`.
Montar el componente activara su suscripcion a `getCurrentUser` dentro del
layout compartido.

## Tarea activa

Importar `AuthNavigation` en `client/src/layouts/MainLayout.tsx` y reemplazar
unicamente `<NavLink to="/login">Login</NavLink>` por `<AuthNavigation />`.
Conservar los enlaces de marca, inicio y viajes. Todavia no agregar logout.

## AuthNavigation integrada en la cabecera

- `MainLayout` renderiza `AuthNavigation` en lugar del enlace estatico de
  login.
- Los enlaces de marca, inicio y viajes permanecen intactos.
- El layout no importa hooks ni mutations de autenticacion.
- Montar `AuthNavigation` agrega otra suscripcion al mismo resultado guardado
  de `getCurrentUser`; no crea una cache independiente.
- Todavia no existe un boton que ejecute logout.
- `npm run build`, `npm run lint` y `git diff --check` pasan.

## Riesgo detectado antes de conectar logout

- Al refetch de una query, RTK Query puede conservar temporalmente el ultimo
  dato exitoso mientras procesa la nueva respuesta.
- Despues de logout, `/auth/me` respondera 401, pero `data` puede seguir
  conteniendo por un momento al usuario anterior.
- `RequireAuth` ya prioriza el 401 antes de renderizar su `Outlet`.
- `LoginPage` redirige actualmente si existe `currentUserResponse` sin comprobar
  que la nueva consulta no este en error.
- Esa combinacion podria causar redirecciones opuestas entre `/login` y `/`.

## Proximo paso

Hacer que `LoginPage` solo confie en `currentUserResponse` cuando la consulta de
sesion no este en estado de error.

## Tarea activa

Cambiar la condicion de redireccion autenticada en `LoginPage` de
`if (currentUserResponse)` a
`if (currentUserResponse && !isSessionError)`. No modificar las demas ramas ni
conectar logout todavia.

## Correccion de estrategia para logout

- Se comprobo en la version instalada de RTK Query que un refetch rechazado
  puede conservar el ultimo `data` exitoso junto al nuevo error.
- Este comportamiento es util para actualizaciones normales, pero no es el
  comportamiento deseado al cambiar de identidad.
- La tarea anterior de modificar la condicion de `LoginPage` queda cancelada;
  no se resolvera logout acumulando comprobaciones defensivas en componentes.
- Un logout exitoso limpiara todo el estado del API slice mediante
  `api.util.resetApiState()` antes de navegar a `/login`.
- La limpieza eliminara usuario, viajes, errores, estados y suscripciones
  cacheadas del API, evitando conservar datos de la sesion anterior.
- `invalidatesTags` se retirara de logout porque sera redundante con el reinicio
  completo.
- Las tags se conservan para login y para futuras relaciones entre queries y
  mutations que no representen un cambio total de identidad.

## Proximo paso

Retirar de logout la invalidacion `Auth` que acaba de quedar reemplazada por la
estrategia de limpieza total. Despues se enseñara `resetApiState` antes de
conectarlo en la interfaz.

## Tarea activa

Eliminar solamente `invalidatesTags` del endpoint `logout` en `authApi.ts`.
Conservar la invalidacion condicional de login y los `providesTags` de
`getCurrentUser` y `getTrips`.

## Invalidacion selectiva retirada de logout

- Logout conserva solamente su contrato HTTP `POST /auth/logout`.
- Login mantiene la invalidacion condicional de `Auth`.
- `getCurrentUser` y `getTrips` mantienen `providesTags: ["Auth"]`.
- Logout ya no iniciara refetches selectivos antes de la limpieza completa.
- `npm run build`, `npm run lint` y `git diff --check` pasan.

## Proximo paso

Enseñar `api.util.resetApiState()` y conectar el flujo completo de logout en
`AuthNavigation`: esperar el 204, reiniciar el API slice y navegar a `/login`.

## Tarea activa

Modificar `AuthNavigation.tsx` para usar `useLogoutMutation`,
`useAppDispatch`, `api` y `useNavigate`. Crear un handler asincrono que espere
`logout().unwrap()`, despache `api.util.resetApiState()` y navegue a `/login`
con `replace`. Mostrar un boton solamente cuando exista usuario, deshabilitado
mientras logout esta pendiente, y un mensaje si la mutation falla.

## Hallazgo en la prueba manual de logout

- Logout responde HTTP 204 y el backend envia una cookie vacia con expiracion
  en 1970; la eliminacion de la cookie es correcta.
- El usuario llega a `/login`, pero al volver con el historial puede alcanzar
  temporalmente `HomePage`.
- `RequireAuth` solo bloquea `isFetching` cuando `currentUserResponse` es
  `undefined`.
- Si existe un ultimo usuario guardado durante la revalidacion, el guard puede
  renderizar su `Outlet` antes de conocer el nuevo 401.
- La documentacion oficial advierte que `resetApiState` reinicia el estado del
  API, pero los hooks tambien mantienen estado local; el guard no debe confiar
  unicamente en el reset para autorizar una ruta.

## Decision de proteccion adicional

- Cada vez que `RequireAuth` vuelva a montarse, solicitara una comprobacion
  fresca mediante `refetchOnMountOrArgChange: true`.
- Mientras cualquier comprobacion de sesion este en curso, el guard no
  renderizara contenido privado, incluso si existe un dato anterior.
- Cuando llegue el 401, la rama `isUnauthenticated` seguira teniendo prioridad
  sobre `currentUserResponse`.

## Tarea activa

En `RequireAuth`, llamar `useGetCurrentUserQuery` con `undefined` como primer
argumento y `{ refetchOnMountOrArgChange: true }` como segundo. Cambiar la
condicion del segundo estado de espera para que dependa solamente de
`isFetchingSession`, sin comprobar `currentUserResponse === undefined`, y usar
un texto apropiado para verificacion de sesion.

## Simplificacion acordada

- La tarea anterior de endurecer `RequireAuth` con
  `refetchOnMountOrArgChange` queda cancelada por ahora.
- La prueba manual confirma que el flujo actual elimina la cookie, reinicia
  `state.api`, navega a `/login` e impide volver al dashboard.
- Para el alcance actual se conserva el flujo directo:
  `logout().unwrap()` -> `resetApiState()` -> navegacion.
- El backend continua siendo la barrera de seguridad real para todos los datos
  privados.
- La revalidacion forzada al montar el guard queda como mejora futura solamente
  si aparece un caso real fuera del flujo de logout.

## Tarea activa

Validar la implementacion actual de `AuthNavigation` y cerrar el hito de logout
sin agregar mas comportamiento.

## Hito de autenticacion del cliente completado

- `AuthNavigation` ejecuta logout mediante `.unwrap()`.
- Solo despues del HTTP 204 despacha `api.util.resetApiState()` y navega a
  `/login` con reemplazo del historial.
- Un fallo conserva la sesion y muestra un mensaje.
- La prueba manual confirma que el usuario no puede volver al dashboard despues
  de cerrar sesion.
- Se decidio no agregar revalidacion forzada al guard mientras no exista un
  problema real fuera del flujo de logout.
- `npm run build`, `npm run lint` y `git diff --check` pasan.

## Proximo paso

Retomar la fase de formularios con el formulario de creacion de viajes. Se
comenzara revisando el contrato existente del backend y los tipos del cliente,
sin agregar todavia UI ni nuevas abstracciones.

## Tarea activa

Ninguna. El hito de autenticacion queda cerrado.

## Inicio del pulido visual del login

- Se usara la guia de `$impeccable` para revisar jerarquia, composicion,
  accesibilidad y estados del formulario.
- Se conservara el lenguaje visual teal/slate que ya existe en la aplicacion.
- La pantalla sera una interfaz de producto sobria y centrada, sin convertirla
  en una landing page ni agregar decoracion innecesaria.
- El pulido se dividira en microtareas para no mezclar layout, campos, estados
  y accesibilidad en un unico cambio.

## Proximo paso

Estilizar solamente el contenedor exterior y la superficie principal de
`LoginPage`. Todavia no se modificaran los campos, los mensajes ni el boton.

## Tarea activa

Agregar clases de Tailwind al `main` y al `section` de `LoginPage.tsx` para
centrar el formulario, crear un fondo slate claro, limitar el ancho de lectura
y presentar una superficie blanca con borde y esquinas moderadas.

## Estructura visual del login completada

- El contenido queda centrado dentro del espacio disponible bajo la cabecera.
- La superficie usa todo el ancho disponible en movil y se limita con
  `max-w-md` en pantallas mayores.
- El fondo blanco, el borde slate y las esquinas moderadas mantienen el
  lenguaje visual existente.
- No se agregaron sombras amplias ni elementos decorativos.
- `npm run build` y `npm run lint` pasan.

## Proximo paso

Crear una jerarquia estable para el titulo y la descripcion. La descripcion no
debe depender del estado de la mutation porque sigue siendo util despues de un
intento fallido.

## Tarea activa

Envolver el titulo y la descripcion en un `header`, estilizar ambos elementos y
mostrar la descripcion de forma permanente. Retirar `isUninitialized` de la
desestructuracion de `useLoginMutation`, ya que dejara de utilizarse. Todavia
no modificar campos, errores ni boton.

## Encabezado visual del login completado

- El titulo y la descripcion estan agrupados semanticamente en un `header`.
- La descripcion permanece visible antes y despues de ejecutar la mutation.
- `isUninitialized` se retiro porque ya no controla ningun contenido.
- La escala, el peso y los colores distinguen titulo y texto secundario sin
  exagerar su tamano.
- `npm run build` y `npm run lint` pasan.

## Proximo paso

Organizar el formulario en grupos visuales. Cada etiqueta, campo y mensaje de
validacion deben permanecer juntos antes de aplicar estilos individuales.

## Tarea activa

Agregar espaciado vertical al `form` y envolver por separado el bloque de email
y el bloque de contrasena en contenedores con su propio espaciado interno.
Cambiar las etiquetas a `Correo electronico` y `Contrasena`. Todavia no agregar
clases a `label`, `input`, errores o boton.

## Grupos del formulario completados

- Email y contrasena tienen contenedores independientes.
- Cada mensaje de Zod permanece dentro del grupo del campo correspondiente.
- El boton sigue siendo hijo directo del formulario.
- Se acepto `space-y-6` como una separacion ligeramente mayor entre los grupos.
- Durante la revision se corrigio la etiqueta de contrasena y se restauro
  `autoComplete="current-password"`; el valor accidental `"email"` daba una
  indicacion incorrecta al navegador y a los gestores de credenciales.
- `npm run build` y `npm run lint` pasan.

## Proximo paso

Estilizar etiquetas y campos con una base visual consistente. El foco debe ser
claramente visible para que el usuario sepa en que campo esta escribiendo.

## Tarea activa

Agregar clases de Tailwind a los dos `label` y a los dos `input`. Ambos campos
deben ocupar el ancho disponible, conservar contraste suficiente y mostrar
borde y anillo teal al recibir foco. Todavia no agregar estilos condicionales
de error ni atributos ARIA; se abordaran juntos en la siguiente microtarea.

## Base visual de los campos completada

- Las etiquetas comparten tamano, peso y color.
- Los inputs ocupan todo el ancho y usan borde, espaciado y esquinas
  consistentes.
- El foco reemplaza el contorno nativo por un borde y anillo teal visibles.
- `register`, los tipos y los valores de `autoComplete` permanecen intactos.
- `npm run build`, `npm run lint` y `git diff --check` pasan.

## Proximo paso

Representar los errores de validacion de cada campo tanto visualmente como para
tecnologias de asistencia. El objeto `errors` ya contiene la informacion; no se
agregara una segunda validacion.

## Tarea activa

Hacer condicionales los colores de borde y foco de cada input segun su error de
React Hook Form. Agregar `aria-invalid` y `aria-describedby`, asignar un `id`
estable a cada mensaje y estilizar los errores de campo. Todavia no modificar
el error general de la mutation ni el boton.

## Estados de validacion de campos completados

- Cada input consulta su propia propiedad dentro de `errors`.
- Los campos invalidos usan borde y foco rojos; los validos conservan el foco
  teal.
- `aria-invalid` comunica si cada campo es invalido.
- `aria-describedby` enlaza cada input con un mensaje de `id` unico.
- Los mensajes de Zod usan texto rojo y `role="alert"`.
- Una errata en `aria-describedby` se corrigio mecanicamente durante la
  revision.
- `npm run build`, `npm run lint` y `git diff --check` pasan.

## Proximo paso

Estilizar el error general de login. Este mensaje aparece despues de una
peticion rechazada y no debe presentarse como si perteneciera solo al email o a
la contrasena.

## Tarea activa

Convertir el mensaje controlado por `isError` en un bloque de alerta visible,
con fondo, borde, espaciado y texto rojos. Conservar `role="alert"` y la
distincion existente entre credenciales incorrectas y otros fallos. Todavia no
modificar el boton.

## Alerta general de login completada

- El error de la mutation se presenta como un bloque independiente antes del
  formulario.
- La alerta conserva la distincion entre credenciales incorrectas y otros
  fallos.
- `role="alert"` permanece intacto.
- No se relaciono el mensaje con un campo especifico porque representa un fallo
  de la operacion completa.
- `npm run build`, `npm run lint` y `git diff --check` pasan.

## Proximo paso

Estilizar el boton de envio y hacer visibles sus estados normal, hover, foco y
deshabilitado. La mutation ya aporta `isLoading`; no se agregara estado local.

## Tarea activa

Agregar clases de Tailwind al boton de login sin modificar su condicion
`disabled`, su tipo ni el texto condicional controlado por `isLoading`.

## Boton de login completado

- El boton ocupa todo el ancho y usa teal como accion principal.
- Los estados hover y foco son visibles.
- El estado deshabilitado usa colores slate y conserva un cursor explicito.
- `isLoading` sigue controlando tanto `disabled` como el texto; no se agrego
  estado local.
- `type="submit"` permanece intacto.
- `npm run build` y `npm run lint` pasan.

## Decision sobre el momento de validacion

- `useForm` conserva el modo predeterminado `onSubmit`.
- Al recargar, `defaultValues` establece campos vacios, pero no ejecuta por si
  solo el resolver ni crea mensajes de error.
- El primer clic en enviar hace que `handleSubmit` solicite la validacion al
  `zodResolver`.
- Si Zod rechaza los datos, React Hook Form llena `formState.errors` y el
  componente vuelve a renderizar los mensajes.
- Este comportamiento evita presentar el formulario como incorrecto antes de
  que la persona haya intentado usarlo.
- No se forzara validacion al montar. Si mas adelante se desea respuesta antes
  del envio, se evaluara `mode: "onBlur"` en una tarea separada.

## Proximo paso

Completar los estados visuales de comprobacion de sesion y fallo de esa
comprobacion, que actualmente se renderizan fuera de la superficie estilizada
del login.

## Tarea activa

Estilizar los dos retornos de espera de `LoginPage`: la comprobacion inicial y
el nuevo intento cuando todavia no existe una respuesta de usuario. Ambos
deben usar el mismo contenedor centrado y la misma superficie del formulario,
con `role="status"` y `aria-busy`. Todavia no modificar la rama de error de
sesion ni su boton `Reintentar`.
