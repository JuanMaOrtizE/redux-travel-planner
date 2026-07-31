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
