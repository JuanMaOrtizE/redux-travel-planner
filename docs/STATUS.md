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

## Estados de espera de sesion completados

- La comprobacion inicial y el nuevo intento usan la misma superficie centrada.
- Ambos estados declaran `aria-busy="true"`.
- Sus mensajes usan `role="status"` porque representan espera y no un error.
- Las condiciones `isCheckingSession` e
  `isFetchingSession && currentUserResponse === undefined` permanecen intactas.
- `npm run build` y `git diff --check` pasan.
- `npm run lint` no pudo ejecutarse por una politica de Windows que bloqueo el
  binario nativo de `oxlint`; no se obtuvo un error de lint del proyecto.

## Proximo paso

Completar la rama visual que aparece cuando `/auth/me` falla por una causa
distinta de 401. Su boton debe volver a ejecutar la misma query mediante
`refetchCurrentUser`.

## Tarea activa

Estilizar en `LoginPage.tsx` el retorno controlado por
`isSessionError && !isUnauthenticated`: usar la superficie centrada, presentar
el mensaje como alerta general y estilizar el boton `Reintentar`. Conservar la
condicion y `onClick={refetchCurrentUser}` sin crear estado local.

## Error de comprobacion de sesion completado

- La rama distinta de 401 usa la misma superficie centrada del login.
- El mensaje mantiene `role="alert"` y una presentacion roja diferenciada.
- El boton `Reintentar` conserva `type="button"` y
  `onClick={refetchCurrentUser}`.
- Un reintento vuelve a la rama visual controlada por `isFetchingSession`.
- Durante la revision se retiro `aria-busy` de la rama de error porque la
  operacion ya habia terminado; el atributo permanece en las dos esperas.
- `npm run build`, `npm run lint` y `git diff --check` pasan.

## Hito visual de LoginPage completado

- La pantalla principal, los campos, el boton y todos los estados de espera y
  error comparten el lenguaje visual teal/slate.
- Los errores de Zod permanecen asociados a sus campos mediante ARIA.
- Los errores de la mutation y de la query se presentan como alertas generales
  independientes.
- Los estados de React Hook Form, la mutation de login y la query de sesion no
  se mezclaron.

## Proximo paso

Realizar una prueba manual de los estados principales del login antes de
retomar el formulario de creacion de viajes.

## Tarea activa

Comprobar manualmente: carga sin sesion, validacion vacia, correccion de campos,
credenciales rechazadas, foco con teclado, estado de envio y login exitoso.
La rama de error de sesion puede probarse apagando temporalmente el backend y
usando `Reintentar`.

## Validacion manual del login completada

- El estudiante confirmo la comprobacion manual de los estados principales.
- El hito de autenticacion y el pulido visual de `LoginPage` quedan cerrados.

## Decision estructural para crear viajes

- La pantalla de creacion tendra la ruta definitiva `/trips/new`.
- `client/src/pages/CreateTripPage.tsx` sera responsable de la composicion de
  la pagina.
- `client/src/features/trips/CreateTripForm.tsx` administrara React Hook Form y
  la integracion con la mutation.
- `client/src/features/trips/createTrip.schema.ts` contendra la validacion Zod
  y los tipos derivados del formulario.
- `client/src/features/trips/tripsApi.ts` contendra la mutation porque el dato
  creado pertenece al servidor y a la cache de viajes.
- No se colocara temporalmente el formulario dentro de `TripsPage`.

## Proximo paso

Definir en el cliente los tipos del cuerpo y de la respuesta de
`POST /api/trips`, respetando el contrato existente del backend.

## Tarea activa

Agregar `CreateTripRequest` y `CreateTripResponse` a
`client/src/features/trips/trip.types.ts`. Todavia no crear la mutation, el
esquema Zod, la ruta ni el formulario.

## Contrato TypeScript de creacion completado

- `CreateTripRequest` representa los campos aceptados por `POST /api/trips`.
- `description` y `budgetLimit` son propiedades opcionales.
- Fechas, moneda y presupuesto se transportan como strings.
- `CreateTripResponse` reutiliza `Trip` dentro de `data.trip`.
- Durante la revision se corrigio la capitalizacion del tipo de respuesta y
  una referencia recursiva incorrecta.
- `npm run build`, `npm run lint` y `git diff --check` pasan.

## Proximo paso

Crear el esquema Zod del formulario en su archivo definitivo. Se comenzara solo
con `title` para recordar el flujo esquema -> resolver -> `formState.errors`
sin introducir a la vez fechas, regex y campos opcionales.

## Tarea activa

Crear `client/src/features/trips/createTrip.schema.ts`, importar `z`, declarar
`createTripSchema` como `z.strictObject` con la validacion definitiva de
`title`, y exportar `CreateTripFormValues` mediante `z.infer`. Todavia no
agregar los demas campos ni crear el formulario.

## Esquema de creacion iniciado

- El archivo se creo en la ubicacion definitiva de la feature de viajes.
- `title` elimina espacios exteriores y valida limites de 2 y 120 caracteres
  con mensajes explicitos.
- `CreateTripFormValues` se deriva mediante `z.infer`.
- El estudiante adelanto fechas, moneda, descripcion, presupuesto y la
  comparacion entre fechas. Se conservara el trabajo, pero cada concepto se
  revisara antes de conectar el formulario.
- Se corrigio mecanicamente una tilde en el mensaje de presupuesto.
- `npm run build`, `npm run lint` y `git diff --check` pasan.

## Proximo paso

Resolver la diferencia entre un campo opcional del contrato y el string vacio
que produce un input HTML. El primer caso sera `description`.

## Tarea activa

Modificar solamente la validacion de `description` en
`createTrip.schema.ts`: permitir el string vacio, mantener el maximo de 1000
con mensaje explicito y transformarlo a `undefined` despues de `optional`.
Todavia no modificar `budgetLimit` ni crear el formulario.

## Descripcion opcional normalizada

- El esquema del cliente elimina espacios exteriores y permite `""` como valor
  del formulario.
- El maximo de 1000 caracteres tiene un mensaje explicito.
- El esquema de creacion del backend aplica la misma normalizacion. Postman u
  otro consumidor pueden enviar un string vacio y el servidor lo interpreta
  como ausencia de descripcion.
- La actualizacion conserva un contrato diferente: usa `null` para borrar una
  descripcion existente y no se modifico en esta tarea.
- El esquema del servidor tambien produjo un objeto sin `description` para el
  payload equivalente de Postman.
- Cliente: `npm run build` y `npm run lint` pasan.
- Servidor: `npm run typecheck` y `npm run build` pasan.
- `git diff --check` pasa.

## Proximo paso

Separar explicitamente el modelo del formulario del contrato HTTP para evitar
que el esquema de React Hook Form tambien tenga que preparar el request.

## Tarea activa

La tarea anterior basada en `.transform().pipe()` queda cancelada. La siguiente
microtarea simplificara el esquema del cliente: `description` y `budgetLimit`
seran strings del formulario y podran contener `""`. Un mapper posterior,
ubicado en `features/trips`, convertira los strings vacios a propiedades
ausentes dentro de `CreateTripRequest`.

## Decision sobre formularios y contratos HTTP

- Los inputs HTML trabajan con strings; el estado del formulario conservara
  esa representacion.
- Zod validara la experiencia del formulario, pero no sera responsable de
  construir por completo el payload HTTP.
- Un mapper explicito convertira `CreateTripFormValues` en
  `CreateTripRequest`, omitiendo descripcion y presupuesto cuando esten vacios.
- El backend seguira validando y normalizando su propio limite de confianza.
- Los importes decimales viajaran como strings y Prisma los almacenara como
  `Decimal`; no se usaran numeros flotantes de JavaScript para dinero exacto.
- `.pipe()` no se introducira en esta etapa porque no aporta claridad al
  objetivo actual.

## Pausa de campos opcionales

- `description` y `budgetLimit` no se mostraran en la primera parte del
  formulario.
- Su normalizacion definitiva en el cliente se retomara cuando se agreguen esos
  campos a la interfaz.
- Esto permite aprender primero el flujo de creacion con titulo, fechas y
  moneda sin mezclar casos opcionales.

## Proximo paso

Definir la mutation de RTK Query que representara `POST /api/trips`. Todavia no
se usara desde un componente y no se conectara con tags en la misma tarea.

## Tarea activa

Agregar `createTrip` a `client/src/features/trips/tripsApi.ts` como
`builder.mutation<CreateTripResponse, CreateTripRequest>`, describir su
peticion POST y exportar `useCreateTripMutation`. Conservar `getTrips` sin
cambios y no agregar aun `invalidatesTags`.

## Mutation createTrip definida

- `createTrip` usa `builder.mutation<CreateTripResponse, CreateTripRequest>`.
- Describe `POST /api/trips` y envia su argumento como body.
- `fetchBaseQuery` conserva la responsabilidad de base URL, JSON y cookies.
- Se exporta `useCreateTripMutation`, pero ningun componente lo ejecuta aun.
- La mutation todavia no informa que la lista cacheada de viajes quedo vieja.
- `getTrips` permanece sin cambios.
- `npm run build` y `npm run lint` pasan.

## Proximo paso

Declarar el tipo de tag `Trips` en el API slice compartido. Declararlo solo
creara vocabulario permitido; todavia no marcara cache ni causara peticiones.

## Tarea activa

Agregar `"Trips"` a `tagTypes` en `client/src/services/api.ts`, conservando
`"Auth"`. Todavia no modificar `providesTags`, `invalidatesTags` ni los
endpoints.

## Tipo de tag Trips declarado

- El API slice compartido declara `tagTypes: ["Auth", "Trips"]`.
- `Auth` se conserva para datos dependientes de la identidad.
- Declarar `Trips` no etiqueto cache, no invalido datos y no ejecuto
  peticiones.
- `getTrips` y `createTrip` permanecen sin cambios.
- `npm run build`, `npm run lint` y `git diff --check` pasan.

## Proximo paso

Marcar el resultado cacheado de `getTrips` con `Trips`, conservando tambien
`Auth`. Todavia no conectar la mutation con la tag.

## Tarea activa

Cambiar solamente `providesTags` de `getTrips` en `tripsApi.ts` para que
proporcione `["Auth", "Trips"]`. No modificar `createTrip` ni agregar
`invalidatesTags`.

## Cache de viajes conectada con createTrip

- `getTrips` proporciona `Auth` y `Trips`.
- `Auth` conserva la relacion con la identidad autenticada.
- `Trips` identifica la lista que puede quedar vieja despues de una creacion.
- `createTrip` invalida `Trips` solamente cuando recibe
  `CreateTripResponse`.
- Un error devuelve una lista de tags vacia y evita refetch o descarte
  innecesario.
- Con `getTrips` activo, una creacion exitosa producira `GET /api/trips`.
- Sin suscripciones activas, el resultado viejo se descartara sin GET
  inmediato.
- `npm run build`, `npm run lint` y `git diff --check` pasan.

## Proximo paso

Crear la pagina definitiva de creacion y registrar `/trips/new` dentro de las
rutas protegidas. Todavia no se conectara el formulario.

## Tarea activa

Crear `client/src/pages/CreateTripPage.tsx` con la composicion base de la pagina
e importarla en `AppRouter.tsx`. Agregar `/trips/new` dentro de los hijos de
`RequireAuth`, antes de `/trips/:tripId`. No usar aun React Hook Form, el
esquema ni la mutation.

## Pagina y ruta de creacion completadas

- `CreateTripPage.tsx` contiene la composicion base definitiva.
- `/trips/new` usa `CreateTripPage`.
- La ruta vive dentro de `RequireAuth` y antes de `/trips/:tripId`.
- La pagina no importa formulario, esquema ni mutation.
- Se ordeno mecanicamente el import de la nueva pagina.
- `npm run build`, `npm run lint` y `git diff --check` pasan.

## Proximo paso

Hacer accesible `/trips/new` desde la lista de viajes mediante un enlace
semantico. Todavia no conectar el formulario.

## Tarea activa

Importar `Link` en `TripsPage.tsx` y agregar despues del texto introductorio un
enlace visible a `/trips/new` con el texto `Crear viaje`. No modificar
`getTrips`, los estados de carga/error ni la condicion de lista vacia.

## Navegacion hacia la creacion completada

- `TripsPage` usa `Link` para navegar sin recargar el documento.
- El enlace es visible tanto con lista vacia como con viajes.
- Durante la revision se corrigio `to="trips/new"` a `to="/trips/new"` para
  evitar resolver la ruta como `/trips/trips/new`.
- El enlace no ejecuta la mutation ni modifica cache.
- `npm run build`, `npm run lint` y `git diff --check` pasan.

## Proximo paso

Crear el formulario en su archivo definitivo y retomar React Hook Form con un
solo campo. El componente permanecera sin montar hasta completar sus campos y
el flujo de envio.

## Tarea activa

Crear `client/src/features/trips/CreateTripForm.tsx`. Configurar `useForm` con
`zodResolver(createTripSchema)`, valores iniciales para titulo, fechas y moneda,
y registrar solamente el campo `title` con su mensaje de
`formState.errors`. No usar `handleSubmit`, la mutation ni un boton, y no
renderizar aun el componente desde `CreateTripPage`.

## Base de CreateTripForm completada

- El componente vive en la feature de viajes y todavia no esta montado.
- `useForm<CreateTripFormValues>` usa `zodResolver(createTripSchema)`.
- Los valores iniciales requeridos son strings y la moneda comienza en `USD`.
- `register("title")` conecta el primer input.
- `errors.title` controla su mensaje.
- Durante la revision se agrego mecanicamente el `return` que faltaba y se
  restauro el `<form noValidate>`; sin `return`, el JSX se descartaba aunque el
  archivo aislado compilara.
- Se retiro del esquema del cliente la transformacion de `description` que
  diferenciaba innecesariamente el tipo de entrada y salida del resolver.
- `npm run build`, `npm run lint` y `git diff --check` pasan.

## Proximo paso

Registrar la fecha inicial y relacionar el string producido por un input de
fecha con `startDate` del esquema.

## Tarea activa

Agregar solamente el grupo `startDate` a `CreateTripForm.tsx`: label, input
`type="date"`, `register("startDate")` y mensaje de `errors.startDate`. No
agregar fecha final, moneda, boton, `handleSubmit` ni mutation.

## Fecha inicial registrada

- `startDate` usa un input `type="date"`.
- El navegador y React Hook Form conservan el valor como string `YYYY-MM-DD`.
- No se uso `valueAsDate` porque el esquema y el contrato HTTP esperan string.
- `errors.startDate` queda preparado para mostrar el fallo del resolver.
- `npm run build`, `npm run lint` y `git diff --check` pasan.

## Proximo paso

Registrar `endDate` y conectar su mensaje. Este campo puede recibir un error de
formato o el error de rango producido por `.refine`.

## Tarea activa

Agregar solamente el grupo `endDate` a `CreateTripForm.tsx`: label, input
`type="date"`, `register("endDate")` y mensaje de `errors.endDate`. No agregar
moneda, boton, `handleSubmit`, mutation ni estilos.

## Campos del formulario registrados

- `endDate` conserva el string `YYYY-MM-DD` y muestra tanto errores de formato
  como el error de rango colocado por `path: ["endDate"]`.
- `description`, `currency` y `budgetLimit` quedaron registrados en React Hook
  Form y asociados con sus respectivos mensajes de error.
- `description` y `budgetLimit` comienzan en `""`, igual que los controles HTML
  vacios.
- El esquema de `budgetLimit` permite `""` porque el presupuesto es opcional.
- El presupuesto usa `type="text"` e `inputMode="decimal"`: se mantiene como
  string para no convertir dinero a un numero flotante de JavaScript.
- La moneda empieza en `USD` mediante `defaultValues`.
- Todavia no existe envio, mutation ni comunicacion con el backend.

## Proximo paso

Mostrar el formulario dentro de su pagina definitiva. Este montaje debe ocurrir
antes de conectar el envio para que el comportamiento de `handleSubmit` pueda
comprobarse visualmente en la siguiente tarea.

## Tarea activa

Importar `CreateTripForm` en `CreateTripPage.tsx` y renderizarlo una vez,
despues del `header`. No modificar `CreateTripForm`, no agregar `handleSubmit`,
boton, mutation ni estilos.

## Formulario montado en la pagina

- `CreateTripPage` importa el formulario desde la feature de viajes.
- `<CreateTripForm />` se renderiza despues del encabezado y dentro de `main`.
- Visitar `/trips/new` ya permite ver todos los campos registrados.
- Montar el componente no ejecuta validacion, mutation ni peticion HTTP.
- `npm run build`, `npm run lint` y `git diff --check` pasan.

## Proximo paso

Conectar el evento submit con `handleSubmit`. Esta funcion de React Hook Form
activara el resolver, separara el camino invalido del valido y actualizara
`formState.errors`.

## Tarea activa

Extraer `handleSubmit` de `useForm`, declarar
`handleCreateTripSubmit(values: CreateTripFormValues)`, pasarla mediante
`handleSubmit(handleCreateTripSubmit)` al `onSubmit` del formulario y agregar
un boton `type="submit"`. La funcion recibira los datos validos pero todavia no
ejecutara la mutation.

## Envio y validacion conectados

- `handleSubmit` se obtiene de React Hook Form.
- `handleCreateTripSubmit` representa el camino valido propio de la
  aplicacion, igual que `handleLoginSubmit` en el login.
- `onSubmit={handleSubmit(handleCreateTripSubmit)}` hace que el resolver y Zod
  actuen antes de la funcion de la aplicacion.
- El boton `type="submit"` inicia el evento del formulario sin usar `onClick`.
- La funcion valida recibe `CreateTripFormValues`, pero aun no ejecuta la
  mutation.
- `npm run build`, `npm run lint` y `git diff --check` pasan.

## Proximo paso

Comprobar manualmente el camino invalido y el valido antes de incorporar RTK
Query.

## Tarea activa

Probar el formulario vacio, una fecha final anterior, un presupuesto con mas de
dos decimales y finalmente valores validos. Confirmar que los tres primeros
casos muestran errores y que el ultimo los limpia sin navegar ni hacer una
peticion.

## Validacion manual de CreateTripForm completada

- Los campos requeridos vacios muestran sus errores.
- Una fecha final anterior coloca el error junto a `endDate`.
- Un presupuesto con mas de dos decimales es rechazado.
- Los valores validos limpian los errores y alcanzan
  `handleCreateTripSubmit`.
- Todavia no existe navegacion ni peticion HTTP.

## Proximo paso

Separar los valores propios del formulario del cuerpo esperado por la mutation.
La conversion solo omitira `description` y `budgetLimit` cuando sean strings
vacios; no convertira fechas ni dinero.

## Tarea activa

Crear `client/src/features/trips/createTrip.mapper.ts`. Exportar una funcion
`mapCreateTripFormToRequest` que reciba `CreateTripFormValues` y devuelva
`CreateTripRequest`: copiar siempre titulo, fechas y moneda, agregar descripcion
y presupuesto solo cuando no esten vacios, y devolver el objeto resultante.
Todavia no importar el mapper en el formulario ni ejecutar la mutation.

## Mapper de creacion completado

- `mapCreateTripFormToRequest` crea un objeto nuevo y no modifica
  `CreateTripFormValues`.
- Titulo, fechas y moneda siempre forman parte de `CreateTripRequest`.
- Descripcion y presupuesto solo se agregan cuando contienen texto.
- El presupuesto permanece como string; el mapper no realiza conversiones
  numericas.
- El mapper no valida, no modifica estado y no ejecuta peticiones.
- `npm run build`, `npm run lint` y `git diff --check` pasan.

## Proximo paso

Usar el mapper en el camino valido del formulario y entregar
`CreateTripRequest` al trigger de `useCreateTripMutation`.

## Tarea activa

Antes del codigo, repasar el flujo completo de la mutation y sus tags. Despues,
importar `mapCreateTripFormToRequest` y `useCreateTripMutation` en
`CreateTripForm`, obtener el trigger, convertir los valores validos y ejecutar
la mutation con `.unwrap()`. Todavia no agregar navegacion, `reset`, estilos ni
mensajes de exito o error.

## Mutation conectada al formulario

- `useCreateTripMutation` proporciona el trigger `createTrip` sin ejecutar una
  peticion al montar el componente.
- El camino valido convierte `CreateTripFormValues` mediante el mapper y
  entrega `CreateTripRequest` al trigger.
- `.unwrap()` resuelve con `CreateTripResponse` en exito y lanza el error hacia
  `catch` cuando falla la peticion.
- Una respuesta exitosa invalida `Trips`; una respuesta con error no invalida
  tags.
- Con una lista activa puede aparecer un nuevo GET; sin suscripcion activa se
  descarta la lista vieja sin GET inmediato.
- Durante la revision se corrigio el nombre accidental `dexCreateTripForm` y
  se documento la razon del `catch` temporal.
- `npm run build`, `npm run lint` y `git diff --check` pasan.

## Proximo paso

Comprobar una creacion real antes de introducir estados visuales y navegacion.

## Tarea activa

Enviar una sola vez un viaje valido desde `/trips/new`. En Network, confirmar
`POST /api/trips`, respuesta 201 con `data.trip`, cookie de sesion incluida y
ausencia de `description` y `budgetLimit` en el request cuando ambos campos
quedan vacios. La pantalla todavia no debe navegar ni mostrar confirmacion.

## Creacion real comprobada

- `POST /api/trips` crea el registro y responde con el viaje persistido.
- El mapper omite descripcion y presupuesto cuando los inputs estan vacios.
- La invalidacion de `Trips` evita reutilizar la lista anterior al regresar a
  `TripsPage`.
- El formulario permanece visible despues del exito porque todavia no existe
  navegacion ni confirmacion.

## Proximo paso

Representar el tiempo durante el cual la mutation espera la respuesta y evitar
un segundo envio accidental.

## Tarea activa

Extraer `isLoading` del estado devuelto por `useCreateTripMutation`. Usarlo para
deshabilitar el boton submit mientras la mutation esta pendiente y cambiar su
texto entre `Crear viaje` y `Creando viaje...`. Todavia no agregar navegacion,
`reset`, estados de exito/error ni estilos.

## Espera de createTrip representada

- `isLoading` proviene del estado de la mutation, no de React Hook Form.
- Comienza en `false`, cambia a `true` al ejecutar el trigger y vuelve a
  `false` cuando la peticion termina con exito o error.
- El boton deshabilitado evita un segundo envio durante la peticion pendiente.
- Un fallo de Zod no inicia la mutation y no cambia `isLoading`.
- `npm run build`, `npm run lint` y `git diff --check` pasan.

## Proximo paso

Mostrar un error general cuando la mutation falla, manteniendolo separado de
los errores de campos producidos por Zod.

## Tarea activa

Extraer tambien `isError` de `useCreateTripMutation` y mostrar al inicio del
formulario, antes del primer campo, un mensaje con `role="alert"`: `No pudimos
crear el viaje. Intenta nuevamente.` No extraer todavia `error`, no interpretar
codigos HTTP y no agregar navegacion, reset ni estilos.

## Error general de createTrip representado

- `isError` proviene del estado de la mutation y no de `formState.errors`.
- La alerta general se renderiza como hija directa del formulario, separada de
  los grupos de campos.
- Los errores de Zod permanecen junto a cada input y evitan iniciar el POST.
- El `catch` no crea el estado de error; RTK Query ya lo conserva y lo expone
  mediante `isError`.
- En error, `invalidatesTags` devuelve `[]` y no toca la lista de viajes.
- Durante la revision se movio la alerta fuera del grupo de titulo y se
  actualizo el comentario del `catch`.
- `npm run build`, `npm run lint` y `git diff --check` pasan.

## Proximo paso

Navegar a la lista despues de una creacion exitosa para mostrar el resultado
actualizado y evitar que el formulario permanezca disponible tras el POST.

## Tarea activa

Usar `useNavigate` en `CreateTripForm` y, solamente despues de que
`createTrip(request).unwrap()` resuelva, ejecutar
`navigate("/trips", { replace: true })`. No usar `reset`, no navegar desde
`finally` o `catch`, y no agregar todavia estilos ni mensajes especializados.

## Navegacion despues de crear completada

- `useNavigate` se ejecuta como hook dentro de `CreateTripForm`.
- La navegacion ocurre dentro del `try` y despues de que `.unwrap()` resuelve.
- Un error salta al `catch`, conserva el formulario y muestra la alerta general.
- `replace: true` evita regresar con Atras al formulario que ya fue enviado.
- No se usa `reset` porque la navegacion desmonta el formulario y destruye su
  estado local.
- La invalidacion de `Trips` ocurre antes de que `TripsPage` vuelva a consultar
  la lista.
- `npm run build`, `npm run lint` y `git diff --check` pasan.

## Proximo paso

Comprobar manualmente el flujo completo de exito antes de pulir visualmente el
formulario.

## Tarea activa

Crear un viaje valido con titulo reconocible y comprobar: un solo POST 201,
navegacion automatica a `/trips`, un GET actualizado de la lista, aparicion del
nuevo viaje y que el boton Atras no regrese a `/trips/new`.

## Flujo funcional de creacion cerrado

- La creacion valida ejecuta un solo POST y navega a la lista.
- `Trips` se invalida y `TripsPage` obtiene datos actualizados.
- La ruta de creacion se reemplaza en el historial despues del exito.
- La creacion de un viaje permanece como pagina completa; no se usara un modal
  para un formulario de esta longitud y relevancia.

## Decision visual para CreateTripForm

- Se conservara el lenguaje teal/slate ya utilizado en LoginPage.
- El formulario usara una sola superficie blanca funcional, sin tarjetas
  anidadas ni decoracion innecesaria.
- El ancho se limitara para facilitar el recorrido visual de labels e inputs.
- Los estilos se incorporaran por capas: contenedor, grupos y controles,
  responsive, estados y acciones.

## Proximo paso

Crear la superficie y el ritmo vertical del formulario sin modificar todavia
los campos individuales.

## Tarea activa

Agregar al elemento `form` de `CreateTripForm` las clases `mt-8 max-w-2xl
space-y-6 rounded-xl border border-slate-200 bg-white p-6 sm:p-8`. No modificar
todavia labels, inputs, textarea, select, alerta ni boton.

## Superficie de CreateTripForm completada

- El formulario se separa del encabezado y limita su ancho a `max-w-2xl`.
- Una unica superficie blanca con borde agrupa la tarea sin crear tarjetas
  anidadas.
- `space-y-6` establece el ritmo entre los grupos principales.
- El padding aumenta de `p-6` a `sm:p-8` en pantallas con mas espacio.
- `noValidate` y `onSubmit` permanecen intactos.
- `npm run build`, `npm run lint` y `git diff --check` pasan.

## Proximo paso

Definir el ritmo interno de cada grupo y una jerarquia consistente para todos
los labels antes de estilizar los controles.

## Tarea activa

Agregar `className="space-y-2"` a los seis `div` que agrupan campos y
`className="block text-sm font-medium text-slate-700"` a sus seis labels. No
modificar todavia inputs, textarea, select, mensajes, alerta, boton ni layout de
fechas.

## Estilos de CreateTripForm completados

- El usuario autorizo completar todos los estilos pendientes del formulario en
  una sola intervencion.
- Labels, inputs, textarea y select comparten el lenguaje visual de LoginPage.
- Cada control cambia borde y foco segun su error de React Hook Form.
- `aria-invalid` y `aria-describedby` relacionan controles y mensajes; cada
  error tiene un id estable.
- Fechas y configuracion financiera usan dos columnas desde `sm` y una columna
  en pantallas pequenas.
- Los campos opcionales reducen visualmente el peso de `(opcional)`.
- La alerta general mantiene una superficie roja diferenciada de los errores
  de campo.
- La barra de acciones incluye `Cancelar` y la accion primaria teal.
- Durante `isLoading`, submit y cancelar quedan inactivos y el formulario
  expone `aria-busy`.
- El enlace de cancelar navega semanticamente a `/trips` cuando no hay una
  peticion pendiente.
- La implementacion evita sombras decorativas y tarjetas anidadas.
- `npm run build`, `npm run lint` y `git diff --check` pasan.

## Proximo paso

Revisar manualmente la composicion renderizada y sus estados antes de cerrar el
hito de creacion de viajes.

## Tarea activa

Comprobar `/trips/new` en escritorio y movil: columnas responsive, recorrido
con Tab, foco visible, errores de campos, alerta general, acciones apiladas en
movil y estado `Creando viaje...`. La automatizacion visual no estuvo
disponible en esta sesion, por lo que esta comprobacion queda manual.

## Hito de creacion de viajes cerrado

- El usuario continuo despues de la revision visual manual.
- El flujo cubre validacion de cliente, mapper, mutation, espera, error,
  invalidacion, navegacion y responsive.
- CreateTripForm queda listo para el alcance actual del proyecto.

## Siguiente flujo: detalle de viaje

- La ruta protegida `/trips/:tripId` ya existe.
- `TripDetailPage` solo muestra actualmente el parametro y no consulta datos.
- El backend ya ofrece `GET /api/trips/:tripId` con respuesta `data.trip`.

## Proximo paso

Definir la query parametrizada sin conectarla aun a la pagina, para estudiar
como el argumento participa en la URL y en la clave de cache.

## Tarea activa

Agregar `GetTripResponse` a `trip.types.ts`. En `tripsApi.ts`, definir
`getTrip` como `builder.query<GetTripResponse, string>`, construir
`trips/${tripId}`, proporcionar `Auth` y `Trips`, e incluir
`useGetTripQuery` entre los hooks exportados. Todavia no modificar
`TripDetailPage` ni ejecutar la query desde un componente.

## Query getTrip definida

- `GetTripResponse` representa `data.trip` con el tipo `Trip`.
- `getTrip` recibe un string y construye `trips/${tripId}`.
- El argumento forma parte de la clave de cache; dos ids generan resultados
  separados.
- La query proporciona `Auth` y `Trips` con la estrategia amplia actual.
- `useGetTripQuery` se exporta, pero definirlo no produjo ninguna peticion.
- `TripDetailPage` permanecio sin cambios.
- `npm run build`, `npm run lint` y `git diff --check` pasan.

## Proximo paso

Montar la query desde `TripDetailPage` de forma segura cuando React Router puede
tipar `tripId` como ausente.

## Tarea activa

Importar `skipToken` y `useGetTripQuery` en `TripDetailPage`. Llamar siempre al
hook con `tripId ?? skipToken`, extraer solamente `isLoading` y agregar un
retorno `Cargando viaje...` mientras ocurre el primer GET. Todavia no extraer
datos, error, `isFetching` ni `refetch`, y no modificar los tags.

## getTrip montada con skipToken

- El hook se llama en cada render con `tripId ?? skipToken`.
- Un id valido crea la suscripcion y puede ejecutar `GET /api/trips/:tripId`.
- `skipToken` evita fabricar un string vacio y no crea peticion sin parametro.
- `isLoading` representa la primera carga sin datos disponibles.
- Durante la revision se ordenaron mecanicamente los imports externos y
  locales.
- `npm run build`, `npm run lint` y `git diff --check` pasan.

## Proximo paso

Representar el fallo de la query y el nuevo intento antes de consumir
`data.trip`.

## Tarea activa

Extraer `isFetching`, `isError` y `refetch` de `useGetTripQuery`. Mantener la
carga inicial, agregar un retorno `Reintentando viaje...` cuando `isFetching`
sea true despues de esa primera rama, y agregar una rama de error general con
un boton `Reintentar` que ejecute `refetch`. Todavia no extraer `data` ni
`error`, no distinguir 404 y no modificar los tags.

## Estados de error y reintento de getTrip completados

- `isLoading` conserva la primera carga sin datos.
- `isFetching` representa el nuevo intento despues de la primera rama.
- `isError` muestra un fallo general cuando la peticion termina rechazada.
- `refetch` repite el GET con el mismo argumento y la misma clave de cache.
- Durante la primera revision se detecto que `isFetching` estaba extraido pero
  no utilizado; el estudiante agrego la rama faltante.
- Se separaron mecanicamente los `if` para mejorar legibilidad.
- `npm run build`, `npm run lint` y `git diff --check` pasan.

## Proximo paso

Consumir el resultado exitoso de la query y reemplazar el parametro tecnico por
informacion real del viaje.

## Tarea activa

Extraer `data: tripResponse` de `useGetTripQuery`, obtener
`tripResponse?.data.trip`, agregar una guarda cuando `trip` no exista y mostrar
`trip.title` como h1 y `trip.description` con un texto alternativo cuando sea
null. Todavia no mostrar fechas, estado, moneda ni presupuesto, no extraer
`error` y no modificar tags o endpoints.

## Resultado exitoso de getTrip consumido

- `data` se renombra como `tripResponse` al extraerse del hook, para conservar
  visible la forma real de la respuesta HTTP.
- `tripResponse?.data.trip` obtiene el viaje sin intentar leer propiedades
  mientras la respuesta todavia puede estar ausente.
- La guarda `if (!trip)` evita renderizar la vista principal sin un viaje.
- El titulo y la descripcion ya provienen del backend; una descripcion `null`
  muestra un texto alternativo.
- Esta tarea solo consume el resultado existente: no agrega peticiones, no
  cambia la clave de cache y no modifica tags.
- `npm run build`, `npm run lint` y `git diff --check` pasan.

## Proximo paso

Mostrar los metadatos basicos que ya vienen en el mismo viaje: fecha inicial,
fecha final y presupuesto. El estado se dejara para una microtarea posterior,
porque antes de mostrar valores tecnicos como `PLANNING` se definiran etiquetas
comprensibles para el usuario.

## Tarea activa

Agregar debajo de la descripcion una lista descriptiva `<dl>` con tres datos:
`trip.startDate`, `trip.endDate` y el presupuesto. Para el presupuesto, mostrar
`${trip.currency} ${trip.budgetLimit}` cuando exista y `Sin presupuesto
definido.` cuando sea `null`. No convertir el presupuesto a numero, no mostrar
todavia el estado y no modificar la query, los tags ni los estilos generales.

## Metadatos basicos del detalle completados

- `TripDetailPage` muestra fecha inicial, fecha final y presupuesto dentro de
  una lista descriptiva `<dl>`.
- Cada `<dt>` identifica el nombre del dato y cada `<dd>` muestra su valor.
- El presupuesto combina la moneda y el importe sin convertir el string
  decimal recibido del backend.
- Un presupuesto `null` muestra `Sin presupuesto definido.`.
- Se agrego solamente una jerarquia visual minima para distinguir etiquetas y
  valores; la composicion general de la pagina sigue pendiente.
- No se modificaron la query, la clave de cache, las suscripciones ni las tags.
- `npm run build`, `npm run lint` y `git diff --check` pasan.

## Proximo paso

Traducir el estado tecnico del viaje a una etiqueta comprensible antes de
mostrarlo en la interfaz. Por ejemplo, `PLANNING` no debe aparecer directamente
como texto para el usuario.

## Tarea activa

Crear `client/src/features/trips/trip.formatters.ts` con un mapa tipado que
relacione cada `TripStatus` con una etiqueta en espanol y una funcion
`getTripStatusLabel(status: TripStatus)` que devuelva la etiqueta. Todavia no
usarla en `TripDetailPage`, no agregar colores y no modificar RTK Query.

## Formateador de estados completado

- `trip.formatters.ts` contiene un `Record<TripStatus, string>` con las cuatro
  etiquetas en espanol.
- `Record` obliga a cubrir todos los estados permitidos por `TripStatus`.
- `getTripStatusLabel` recibe un estado valido y devuelve su etiqueta.
- La transformacion es una funcion pura: no modifica datos ni estado global.
- No se modificaron RTK Query, la cache, las suscripciones ni las tags.
- `npm run build`, `npm run lint` y `git diff --check` pasan.

## Proximo paso

Consumir `getTripStatusLabel` en `TripDetailPage` y mostrar el estado como un
cuarto par dentro de la lista descriptiva existente.

## Tarea activa

Importar `getTripStatusLabel` en `TripDetailPage` y agregar al `<dl>` un cuarto
grupo con la etiqueta `Estado` y el valor
`getTripStatusLabel(trip.status)`. No agregar colores por estado ni modificar
la query o sus tags.

## Estado traducido en el detalle

- `TripDetailPage` importa y ejecuta `getTripStatusLabel(trip.status)` durante
  el renderizado.
- La interfaz muestra una etiqueta en espanol en lugar del valor tecnico del
  enum.
- El estado forma parte del mismo `<dl>` que las fechas y el presupuesto.
- No se agregaron efectos, estado local ni peticiones adicionales.
- La query conserva sus tags `Auth` y `Trips`; el formateo no modifica la cache
  ni produce invalidaciones.
- `npm run build`, `npm run lint` y `git diff --check` pasan.

## Proximo paso

Conectar cada elemento de `TripsPage` con su ruta de detalle. La ruta
`/trips/:tripId` ya existe, pero actualmente el usuario solo puede alcanzarla
escribiendo la URL manualmente.

## Tarea activa

Dentro del `trips.map` de `TripsPage`, agregar un `Link` que use
`to={`/trips/${trip.id}`}` y permita abrir el detalle del viaje correspondiente.
Conservar el `li` como elemento de la lista y no modificar queries, tags ni el
router.

## Lista conectada con el detalle

- Cada viaje conserva un `<li>` con una `key` estable basada en `trip.id`.
- Un `Link` construye la ruta `/trips/${trip.id}` y contiene el titulo y las
  fechas del viaje.
- Durante la revision se movieron mecanicamente las clases de la tarjeta desde
  el `<li>` al `Link` y se agrego `block`, para que toda la superficie visual
  sea interactiva.
- Al montar `TripDetailPage`, el parametro de la URL pasa a `useGetTripQuery`;
  RTK Query reutiliza una respuesta valida o ejecuta el GET si no existe.
- Navegar no invalida tags ni modifica la cache por si mismo.
- `npm run build`, `npm run lint` y `git diff --check` pasan.

## Proximo paso

Iniciar la eliminacion de viajes definiendo primero su mutation de RTK Query,
sin conectarla todavia a ningun boton. El backend ya ofrece
`DELETE /api/trips/:tripId` y responde HTTP 204 sin cuerpo.

## Tarea activa

Agregar `deleteTrip` a `tripsApi.ts` como
`builder.mutation<void, string>`, construir la URL con el id, usar el metodo
`DELETE` e invalidar `Trips` solamente cuando no exista un error. Exportar
`useDeleteTripMutation`, pero todavia no modificar `TripDetailPage`.

## Mutation deleteTrip definida

- `deleteTrip` usa `builder.mutation<void, string>`: no espera un cuerpo de
  respuesta y recibe el identificador del viaje como argumento.
- La peticion usa `DELETE` y construye `trips/${tripId}` sin enviar `body`.
- `invalidatesTags` comprueba `error` porque una respuesta exitosa HTTP 204 no
  entrega un objeto de resultado util para decidir el exito.
- En exito se invalida `Trips`; en error se devuelve `[]` y la cache existente
  no se marca como desactualizada.
- `useDeleteTripMutation` se exporta, pero todavia no existe ningun componente
  que llame al trigger, por lo que definirla no produce peticiones.
- Con una query `Trips` activa, la invalidacion puede producir un GET; sin
  suscripcion activa, no se hace un GET inmediato.
- `npm run build`, `npm run lint` y `git diff --check` pasan.

## Proximo paso

Conectar la mutation al detalle mediante una accion de eliminacion segura. La
accion debe pedir confirmacion, representar espera y error, y navegar a la
lista solamente despues de un DELETE exitoso. Este bloque se implementara en
microtareas para no mezclar toda la interaccion de una vez.

## Tarea activa

Reiniciar de forma mas gradual
`client/src/features/trips/DeleteTripAction.tsx`. En la primera microtarea se
corregiran los nombres `tripId` y `tripTitle`, se definira el tipo
`DeleteTripActionProps` y se creara el componente con el boton que posteriormente
abrira el dialogo. Todavia no se usaran `useRef`, `<dialog>`, la mutation ni
estilos. Cada una de esas piezas se introducira despues y dentro de su flujo.

## Base de DeleteTripAction completada

- `DeleteTripActionProps` exige `tripId` y `tripTitle` como strings.
- El componente extrae solamente `tripTitle`; `tripId` permanecera disponible
  cuando se conecte la mutation.
- El boton base usa `type="button"` y todavia no ejecuta ninguna accion.
- Durante la revision se elimino mecanicamente el import prematuro de `useRef`.
- Se agrego un `aria-label` que incorpora `tripTitle`, evitando que el nombre
  accesible del boton sea ambiguo para lectores de pantalla.
- No se montaron el componente o el dialogo y no hubo peticiones ni cambios de
  cache o tags.
- `npm run build`, `npm run lint` y `git diff --check` pasan.

## Proximo paso

Introducir `useRef` correctamente dentro del componente y conectarlo a un
elemento `<dialog>`, sin abrirlo todavia. Esta microtarea estudiara solamente
como React entrega acceso a un elemento real del DOM.

## Tarea activa

Importar `useRef`, crear dentro de `DeleteTripAction`
`useRef<HTMLDialogElement>(null)` y asignar esa referencia a un `<dialog>`
vacio mediante su prop `ref`. Mantener el boton sin `onClick`; no usar aun
`showModal`, `close`, mutation, estilos ni montar el componente en la pagina.

## Referencia del dialogo conectada

- `useRef` se ejecuta dentro de `DeleteTripAction`, respetando las reglas de
  hooks.
- `useRef<HTMLDialogElement>(null)` expresa que la referencia comienza vacia y
  despues podra contener un elemento `<dialog>`.
- React conecta el elemento real mediante `ref={dialogRef}`.
- El dialogo permanece oculto y vacio; todavia no se ejecutan `showModal` o
  `close`.
- Durante la revision se agrego solamente una separacion mecanica entre el hook
  y el `return`.
- No se ejecutan mutations, peticiones, invalidaciones ni cambios de cache.
- `npm run build`, `npm run lint` y `git diff --check` pasan.

## Proximo paso

Usar por primera vez la referencia para abrir el elemento con `showModal()`.
Todavia no se agregara contenido ni cierre: la microtarea se concentrara en el
flujo clic, manejador, referencia y API del navegador.

## Tarea activa

Crear dentro de `DeleteTripAction` una funcion `handleOpenDialog` que ejecute
`dialogRef.current?.showModal()` y conectarla al `onClick` del boton existente.
No agregar aun `close`, contenido, mutation, estilos ni montar el componente en
la pagina.

## Apertura del dialogo conectada

- `handleOpenDialog` se declara dentro del componente y lee la referencia ya
  conectada al elemento.
- `dialogRef.current?.showModal()` delega la apertura modal a la API nativa del
  navegador.
- El boton pasa `handleOpenDialog` a `onClick` sin ejecutarlo durante el render.
- No se agrego una funcion flecha intermedia porque el manejador no necesita
  argumentos ni logica adicional.
- Abrir el dialogo no ejecuta mutations, no modifica la cache y no invalida
  tags.
- El componente aun no esta montado y el dialogo permanece sin contenido.
- `npm run build`, `npm run lint` y `git diff --check` pasan.

## Proximo paso

Dar significado accesible al dialogo antes de agregar botones de cierre o
acciones. El navegador debe poder anunciar un titulo y una descripcion al
abrirlo.

## Tarea activa

Agregar al `<dialog>` `aria-labelledby="delete-trip-dialog-title"` y
`aria-describedby="delete-trip-dialog-description"`. Dentro, crear un `<h2>`
con el primer id y el texto `¿Eliminar viaje?`, y un `<p>` con el segundo id que
incluya `tripTitle` y advierta que la accion no se puede deshacer. No agregar
aun cierre, mutation, estilos ni montar el componente.

## Significado accesible del dialogo completado

- `aria-labelledby` apunta al `<h2>` visible que nombra el dialogo.
- `aria-describedby` apunta al parrafo que explica la consecuencia de la
  eliminacion.
- La descripcion interpola `tripTitle`, por lo que identifica el viaje real en
  vez de mostrar una advertencia generica.
- El elemento nativo `<dialog>` conserva su referencia y no necesita un rol
  agregado manualmente.
- No se agregaron cierre, mutation, estilos, peticiones o invalidaciones.
- `npm run build`, `npm run lint` y `git diff --check` pasan.

## Proximo paso

Agregar una salida explicita y segura. Aunque `Escape` puede cerrar un dialogo
modal, todos los usuarios necesitan un boton visible para cancelar la accion.

## Tarea activa

Crear `handleCloseDialog` con `dialogRef.current?.close()`. Dentro del dialogo,
despues del parrafo, agregar un boton `type="button"`, texto `Cancelar`,
`autoFocus` y `onClick={handleCloseDialog}`. No agregar aun el boton de
confirmacion, mutation, estilos ni montar el componente.

## Salida segura del dialogo completada

- `handleCloseDialog` usa la misma referencia que la apertura y ejecuta el
  metodo nativo `close()`.
- El boton `Cancelar` ofrece una salida visible ademas del cierre con `Escape`.
- `autoFocus` coloca el foco inicial en la opcion no destructiva cuando se abre
  el dialogo.
- Cerrar no desmonta el elemento; la referencia permanece disponible para una
  apertura posterior.
- Cancelar no ejecuta peticiones, no cambia la cache y no invalida tags.
- `npm run build`, `npm run lint` y `git diff --check` pasan.

## Proximo paso

Conectar el boton destructivo al trigger ya generado por
`useDeleteTripMutation`, manteniendo el componente sin montar hasta completar
navegacion y estados visuales.

## Tarea activa

Extraer tambien `tripId` de las props, importar `useDeleteTripMutation`, obtener
el trigger `deleteTrip` y crear `handleConfirmDelete`. El manejador debe esperar
`deleteTrip(tripId).unwrap()` dentro de `try/catch`. Agregar despues de Cancelar
un boton `type="button"`, texto `Eliminar viaje` y
`onClick={handleConfirmDelete}`. No agregar aun loading, error, navegacion,
estilos ni montar el componente.

## Confirmacion conectada a la mutation

- `useDeleteTripMutation()` prepara la mutation, pero no envia ninguna peticion
  durante el render. La peticion comienza solamente al ejecutar el trigger
  `deleteTrip(tripId)` desde el clic de confirmacion.
- `handleConfirmDelete` espera la promesa mediante `.unwrap()`: una respuesta
  exitosa `204 No Content` continua por el camino del `try`; una respuesta de
  error rechaza la promesa y entra al `catch`.
- El `catch` conserva un comentario explicando por que todavia no renderiza
  nada: el estado de error que mantiene RTK Query se conectara a la interfaz en
  una microtarea posterior.
- En exito, `invalidatesTags` deja de confiar en los datos marcados con
  `Trips`. Una query activa puede hacer un nuevo GET visible; una query sin
  componentes suscritos no hace ese GET inmediatamente.
- En error, la mutation devuelve `[]` y no invalida `Trips`, porque el viaje no
  fue eliminado y los datos guardados siguen siendo validos.
- El componente continua sin montarse en `TripDetailPage`, por lo que esta
  conexion todavia no puede enviar un DELETE desde la interfaz real.
- `npm run build`, `npm run lint` y `git diff --check` pasan.

## Proximo paso

Representar el tiempo que transcurre entre el clic y la respuesta del backend.
Esto evita confirmaciones repetidas y le informa al usuario que la eliminacion
esta en curso.

## Tarea activa

Extraer `isLoading` del resultado de `useDeleteTripMutation`. Mientras sea
`true`, deshabilitar los botones `Cancelar` y `Eliminar viaje`, y cambiar el
texto del boton destructivo a `Eliminando...`. No agregar aun manejo de
`Escape`, mensaje de error, navegacion, estilos ni montar el componente.

## Estado pendiente de la mutation representado

- El hook ahora se desestructura como `[deleteTrip, { isLoading }]`: la primera
  posicion sigue siendo el trigger y la segunda aporta el estado administrado
  por RTK Query.
- No se creo un `useState` duplicado. RTK Query cambia `isLoading` a `true`
  cuando se ejecuta `deleteTrip(tripId)` y lo devuelve a `false` cuando la
  peticion termina, tanto en exito como en error.
- Los botones `Cancelar` y `Eliminar viaje` quedan deshabilitados durante la
  peticion, evitando clics repetidos o un cierre mediante esos controles.
- El texto cambia a `Eliminando...`, por lo que el nuevo render comunica que el
  backend todavia no ha respondido.
- Este cambio no altera las tags: en exito se invalida `Trips` y una query
  activa puede repetir su GET; en error no se invalida; sin suscripcion activa
  no se produce un GET inmediato.
- El componente continua sin montarse, de modo que todavia no se puede observar
  este estado desde la pagina real.
- `npm run build`, `npm run lint` y `git diff --check` pasan.

## Proximo paso

Completar el bloqueo accidental durante la espera. Un boton deshabilitado no
impide que el elemento `<dialog>` reciba el evento nativo `cancel` cuando el
usuario pulsa `Escape`.

## Tarea activa

Agregar un manejador para el evento `cancel` del `<dialog>`. Si `isLoading` es
`true`, debe ejecutar `event.preventDefault()` para conservar abierto el modal;
si es `false`, debe permitir el cierre nativo. No agregar aun mensaje de error,
navegacion, estilos ni montar el componente.

## Ajuste de ritmo pedagogico

El estudiante solicito tareas un poco mas amplias. Se conservaran las
explicaciones detalladas, pero las siguientes tareas agruparan varias piezas
que pertenezcan al mismo comportamiento observable. La tarea de `Escape` queda
absorbida por el cierre funcional completo del modal de eliminacion.

## Tarea activa revisada

Completar el comportamiento funcional de `DeleteTripAction` antes de trabajar
sus estilos y montarlo:

1. Importar el tipo `SyntheticEvent` y `useNavigate`.
2. Extraer tambien `isError` y `reset` del estado de
   `useDeleteTripMutation`.
3. Limpiar el resultado anterior con `reset()` al abrir el dialogo.
4. Manejar `onCancel`: bloquear `Escape` con `preventDefault()` solamente
   mientras `isLoading` sea `true`.
5. Mostrar dentro del dialogo un mensaje generico con `role="alert"` cuando
   `isError` sea `true`.
6. Despues de un `.unwrap()` exitoso, navegar a `/trips` con
   `{ replace: true }` para no conservar en el historial el detalle eliminado.
7. Agregar `aria-busy={isLoading}` al dialogo.

No agregar aun estilos ni montar el componente en `TripDetailPage`. El siguiente
bloque agrupara estilo, montaje y comprobacion visual del flujo completo.

## Comportamiento funcional del modal completado

- Se conservo el manejo de `onCancel` que el estudiante ya habia implementado:
  `Escape` se bloquea solamente mientras `isLoading` sea `true`.
- La mutation expone ahora `isError` y `reset` ademas de `isLoading`.
- `reset()` se ejecuta al abrir y limpia el resultado visual de la ejecucion
  anterior; no borra viajes, no cambia la cache de las queries y no invalida
  tags.
- `aria-busy` comunica que el dialogo espera la respuesta del backend.
- Un fallo mantiene el dialogo abierto y renderiza una alerta generica. En ese
  caso `deleteTrip` no invalida `Trips`, porque el viaje sigue existiendo.
- Despues de un `.unwrap()` exitoso se navega a `/trips` con reemplazo del
  historial. La mutation invalida `Trips`: una query activa puede repetir su
  GET; una entrada sin suscripcion no hace un GET inmediatamente.
- Durante la implementacion se agrego mecanicamente la separacion que faltaba
  entre dos manejadores.
- El componente todavia no esta montado; por ello no se ejecuto una prueba
  visual ni una eliminacion real.
- `npm run build`, `npm run lint` y `git diff --check` pasan.

## Proximo paso

Cerrar el bloque de eliminacion con una tarea de mayor alcance: aplicar el
diseno ya acordado, montar la accion en el detalle y comprobar la interaccion
real sin confirmar una eliminacion sobre datos del usuario.

## Tarea activa

1. Estilizar `DeleteTripAction` con Tailwind: boton disparador destructivo,
   superficie blanca opaca, ancho responsive, jerarquia tipografica, alerta,
   acciones y estados disabled/focus.
2. Estilizar `::backdrop` mediante variantes `backdrop:` con capa oscura y blur
   sutil, sin convertir el contenido del dialogo en glassmorphism.
3. Importar y montar `DeleteTripAction` en `TripDetailPage` usando `trip.id` y
   `trip.title`.
4. Ejecutar lint y build, y revisar en navegador apertura, foco inicial,
   cancelacion, `Escape`, responsive y apariencia. No confirmar un DELETE real
   durante la prueba visual salvo que se use un viaje desechable autorizado.

## Integracion y estilos de DeleteTripAction revisados

- El dialogo usa una superficie blanca opaca, ancho responsive, jerarquia
  tipografica, alerta coherente y un `::backdrop` oscuro con blur sutil.
- Los botones representan sus estados default, focus y disabled sin cambiar el
  flujo funcional de la mutation.
- `DeleteTripAction` se importo en `TripDetailPage` y recibe `trip.id` y
  `trip.title`.
- Durante la revision se corrigio un error funcional: se estaba enviando
  `className` a `DeleteTripAction`, aunque ese componente no define esa prop. El
  espaciado de pagina se movio a un `<div>` contenedor alrededor de la accion.
- Tambien se normalizaron mecanicamente tres cadenas de clases que contenian
  saltos de linea innecesarios.
- `npm run build`, `npm run lint` y `git diff --check` pasan.
- El CSS construido contiene `calc(100% - 2rem)`, reglas `::backdrop` y
  `backdrop-filter`, por lo que Tailwind reconocio las variantes nuevas.
- No se confirmo ningun DELETE y, por tanto, no se invalidaron tags ni se
  repitieron queries durante esta revision.

## Verificacion visual pendiente

La automatizacion del navegador integrado no pudo iniciar porque el entorno no
entrego la politica de sandbox requerida por esa herramienta. Se intento la
recuperacion una vez y el bloqueo se repitio. Quedan pendientes la comprobacion
visual de apertura, foco inicial, cierre con `Escape`, backdrop y responsive;
el codigo y el CSS construido si quedaron validados estaticamente.

## Proximo paso

Completar la verificacion visual cuando el navegador integrado vuelva a estar
disponible o mediante revision manual del estudiante. Despues se cerrara el
hito de eliminacion y se determinara la siguiente funcionalidad del roadmap.

## Captura visual recibida

- La captura manual confirma que el backdrop oscuro, el blur sutil, la
  superficie blanca opaca, la jerarquia del mensaje, los botones y el foco
  inicial en `Cancelar` se renderizan.
- La captura revelo que el dialogo aparecia en la esquina superior izquierda.
  Tailwind Preflight elimina el `margin: auto` que usa el estilo nativo de
  `<dialog>` para centrar el elemento.
- Durante la revision se agrego mecanicamente `m-auto` al dialogo, restaurando
  su centrado horizontal y vertical sin cambiar la logica de la mutation.
- `npm run build`, `npm run lint` y `git diff --check` pasan despues del ajuste.
- No se ejecuto un DELETE y no se invalidaron tags.

## Comprobacion visual restante

Cerrar y volver a abrir el dialogo con el cliente actualizado para confirmar
que ahora queda centrado. Probar tambien que `Escape` lo cierra cuando no hay
una eliminacion pendiente. No confirmar la eliminacion para esta comprobacion.

## Cierre mediante clic exterior implementado

- El `<dialog>` escucha `onClick` mediante `handleDialogBackdropClick`.
- React entrega un `MouseEvent<HTMLDialogElement>`; comparar `event.target` con
  `event.currentTarget` permite distinguir un clic sobre el backdrop de un clic
  originado en el contenido interior.
- Si ambos son el mismo elemento y `isLoading` es `false`, se reutiliza
  `handleCloseDialog()`.
- Los clics sobre titulo, descripcion, alerta o botones no cierran el dialogo.
- Mientras el DELETE esta pendiente, el clic exterior no cierra el modal, igual
  que ocurre con `Escape` y los botones deshabilitados.
- Este cambio no ejecuta peticiones, no cambia la cache y no invalida tags.
- `npm run build`, `npm run lint` y `git diff --check` pasan.

## Comprobacion manual

Abrir el modal y hacer clic en el fondo oscuro: debe cerrarse. Volver a abrirlo
y hacer clic dentro de la superficie blanca: debe permanecer abierto. No es
necesario confirmar una eliminacion para comprobar este comportamiento.

## Revision visual de las pantallas principales

- Se revisaron Inicio, lista de viajes, creacion y detalle mediante la skill
  Impeccable.
- La base visual es coherente; el formulario y el dialogo de eliminacion son
  las superficies mas maduras.
- Los dos problemas prioritarios son la informacion ficticia o inerte de
  Inicio y la falta de un siguiente paso constructivo en el detalle.
- Se acordo conservar una interfaz sobria y darle una personalidad mas calida
  y editorial mediante contenido real, jerarquia y lenguaje de viajes.
- La auditoria se guardo en `.impeccable/critique/` con una puntuacion inicial
  de 21/40.
- Se corrigio mecanicamente la errata `prócximas` por `próximas` en Inicio.

## Tarea activa

Convertir Inicio en un resumen confiable:

1. convertir `Crear viaje` en navegacion real hacia `/trips/new`;
2. retirar temporalmente `Ver destinos` como accion disponible;
3. consumir `useGetTripsQuery` desde `HomePage`;
4. sustituir las tres cifras ficticias por metricas calculadas a partir de los
   viajes reales;
5. representar carga y error sin ocultar el encabezado ni la accion principal.

No se sumaran presupuestos porque cada viaje puede usar una moneda diferente.

## Proximo paso

Revisar la implementacion del estudiante, comprobar el comportamiento de la
cache compartida entre Inicio y Viajes, y despues aplicar el pulido visual
calido/editorial al contenido real.

## Inicio conectado con datos reales

- `HomePage` usa `useGetTripsQuery` y comparte la entrada de cache de
  `getTrips(undefined)` con cualquier otra pantalla suscrita a la misma query.
- `Crear viaje` es ahora un `Link` real hacia `/trips/new` y se retiro la
  accion inerte `Ver destinos`.
- Las cifras ficticias se reemplazaron por tres conteos derivados de la
  respuesta: viajes creados, viajes en planificacion y viajes con presupuesto.
- `tripsWithBudget` filtra los viajes cuyo `budgetLimit` no es `null` y usa la
  longitud del arreglo resultante; no convierte, modifica ni suma importes.
- La primera carga usa esqueletos; un error sin datos ofrece reintento; una
  actualizacion fallida conserva los ultimos datos disponibles.
- La ausencia de viajes muestra un estado vacio que explica el siguiente paso.
- El selector de vista se oculta cuando no hay tarjetas y ahora comunica su
  seleccion mediante `aria-pressed`.
- Los valores de `StatCard` dejaron de ser encabezados y usan numeros
  tabulares para mantener una alineacion visual estable.
- Se elimino el `min-h-screen` duplicado de Inicio porque el layout principal
  ya controla la altura minima de la aplicacion.
- `npm run lint`, `npm run build`, `git diff --check` y el detector de
  Impeccable pasan sin errores ni advertencias.

## Proximo paso

Comprobar manualmente Inicio con datos, sin viajes y con el backend detenido.
Despues, mejorar el detalle del viaje con navegacion de regreso y un siguiente
paso constructivo, manteniendo la eliminacion como accion secundaria.

## Cambio de estado conectado desde el frontend

- `trip.types.ts` define `UpdateTripRequest` con `tripId` para la URL y
  `changes.status` para el cuerpo, ademas de `UpdateTripResponse`.
- `tripsApi.ts` registra la mutation `updateTrip`, que ejecuta
  `PATCH /api/trips/:tripId` y exporta `useUpdateTripMutation`.
- La mutation invalida `Trips` solamente en exito. Una entrada activa de
  `getTrip` o `getTrips` puede repetir su GET; sin suscripcion no se produce un
  GET inmediato. En error no se invalida porque el servidor no cambio.
- `TripStatusActions.tsx` contiene las transiciones visibles:
  `PLANNING -> CONFIRMED/CANCELLED` y
  `CONFIRMED -> COMPLETED/CANCELLED`.
- `pendingStatus` solo identifica el boton que debe mostrar el texto de carga;
  el estado persistido sigue procediendo del backend.
- Los botones se bloquean durante el PATCH, muestran espera especifica y
  representan error y exito sin duplicar los datos del viaje con `useState`.
- `TripDetailPage` monta las acciones, agrega regreso a `/trips`, conserva los
  datos durante un refetch y separa la eliminacion en una zona de peligro.
- Los viajes completados o cancelados muestran su estado final sin acciones
  adicionales en esta version.
- `npm run lint`, `npm run build` y el detector de Impeccable pasan. El flujo
  HTTP real queda pendiente de comprobacion manual con una sesion autenticada.

## Proximo paso

Probar en el navegador la secuencia planificacion, confirmacion y finalizacion,
comprobando simultaneamente el resumen de Inicio y la lista de Viajes. Despues
se decidira si las transiciones tambien se restringen como regla de negocio en
el backend o si se inicia la fase de destinos.

## Revision posterior del cambio de estado

- Se retiro `console.log(pendingStatus)`, que habia servido para observar el
  estado local durante el aprendizaje pero no debe permanecer en produccion.
- `npm run lint`, `npm run build` y `git diff --check` pasan despues del ajuste.
- Se decidio proteger en el backend las mismas transiciones que presenta la
  interfaz. El enum de Zod valida valores posibles, pero no puede decidir por
  si solo si una transicion depende del estado almacenado actualmente.

## Tarea activa

Agregar una regla de dominio en `trip.service.ts` que valide el cambio antes de
llamar `prisma.trip.update`:

- permitir conservar el mismo estado para facilitar reintentos, teniendo en
  cuenta que `updatedAt` puede cambiar si Prisma ejecuta la actualizacion;
- permitir `PLANNING -> CONFIRMED` y `PLANNING -> CANCELLED`;
- permitir `CONFIRMED -> COMPLETED` y `CONFIRMED -> CANCELLED`;
- rechazar las demas transiciones con HTTP 409, codigo
  `INVALID_TRIP_STATUS_TRANSITION` y un mensaje publico claro;
- no ejecutar esta validacion cuando el PATCH no incluya `status`.

## Proximo paso

Revisar y probar la regla con una secuencia valida y otra invalida. Despues se
cerrara el flujo de estados y se iniciara la fase de destinos.

## Regla de transiciones implementada en el backend

- `trip.service.ts` contiene un `Record<TripStatus, readonly TripStatus[]>`
  que obliga a representar todos los estados del enum y sus posibles destinos.
- `isAllowedStatusTransition` permite conservar el mismo estado y consulta el
  mapa para las transiciones reales.
- `updateTrip` ejecuta la regla despues de encontrar el viaje y antes de
  calcular o persistir cualquier cambio.
- Un PATCH sin `status` omite la comprobacion y puede continuar actualizando
  otros campos.
- Una transicion invalida lanza `AppError` con HTTP 409, codigo
  `INVALID_TRIP_STATUS_TRANSITION` y un mensaje publico sin valores tecnicos.
- Zod conserva una responsabilidad distinta: comprueba que el valor pertenezca
  al enum, pero no consulta ni decide el estado actual del viaje.
- `npm run typecheck`, `npm run build` y `git diff --check` pasan.

## Comprobacion pendiente

Probar con una sesion autenticada una transicion valida y otra invalida. La
invalida debe responder 409 sin modificar PostgreSQL; por ello la mutation del
cliente no debe invalidar `Trips` ni provocar un refetch.

## Tarea activa de verificacion

Cerrar el flujo de estados con dos comprobaciones separadas:

1. usar Postman para confirmar que el backend acepta una secuencia valida,
   rechaza una transicion invalida con HTTP 409 y conserva el registro;
2. usar la interfaz para confirmar que la mutation muestra espera, invalida
   `Trips` solo en exito y actualiza el detalle y el resumen de Inicio.

Postman no puede comprobar la cache de RTK Query porque no ejecuta la
aplicacion React. Las dos comprobaciones validan capas distintas y ambas son
necesarias antes de cerrar el hito.

## Flujo de estados cerrado

- El estudiante indico que completo la verificacion del cambio de estado y no
  reporto errores adicionales.
- El frontend presenta transiciones contextuales y el backend protege la misma
  regla frente a clientes externos.
- Una mutation exitosa invalida `Trips`; una respuesta 409 no invalida datos
  porque PostgreSQL conserva el estado anterior.

## Fase 8 iniciada: destinos y geocodificacion

- El proveedor inicial sera la API oficial de geocodificacion de Open-Meteo.
- La consulta externa se realizara desde el backend para que el cliente dependa
  de nuestro contrato y no del formato particular del proveedor.
- Buscar una ciudad devolvera candidatos, pero no los guardara todavia en
  PostgreSQL. Persistir un destino sera una accion posterior y explicita.
- Nuestro endpoint usara un termino de busqueda propio; el backend lo traducira
  al parametro externo `name` y fijara `count`, `language` y `format`.
- La respuesta externa se validara y normalizara antes de enviarla al cliente.

## Tarea activa

Definir la frontera de datos del buscador de destinos:

1. validar el termino recibido por nuestro backend;
2. describir solamente los campos de Open-Meteo que consumiremos;
3. definir el resultado normalizado que conocera el resto de la aplicacion;
4. mantener separados el contrato externo en `snake_case` y el contrato propio
   en `camelCase`.

Todavia no se realizara `fetch`, no se creara una ruta y no se modificara
Prisma. El siguiente bloque conectara estos contratos con la peticion externa.

## Frontera Zod de geocodificacion completada

- `destination.schemas.ts` valida el parametro interno `q`, elimina espacios y
  exige entre 2 y 100 caracteres.
- `DestinationSearchQuery` se infiere desde el esquema y evita mantener un tipo
  manual separado de la validacion.
- `destination.geocoding.ts` describe solamente los campos externos que usa la
  aplicacion; los campos opcionales de Open-Meteo pueden faltar.
- La respuesta externa entra como `unknown` y se valida en tiempo de ejecucion
  antes de acceder a sus propiedades.
- `normalizeOpenMeteoGeocodingResponse` transforma `country_code` en
  `countryCode`, `admin1` en `region`, el id numerico en `providerId` de texto y
  los valores opcionales ausentes en `null`.
- Una respuesta sin `results` se normaliza como un arreglo vacio, no como un
  error.
- Una prueba directa confirma trim, rechazo de un caracter, descarte de campos
  externos no usados, normalizacion y resultado vacio.
- `npm run typecheck` y `npm run build` pasan en el servidor.

## Proximo paso

Agregar al adaptador de geocodificacion la peticion HTTP real con `fetch`,
`URLSearchParams`, tiempo limite y traduccion de fallos de red, HTTP, JSON o
contrato externo a un error 502 controlado. Todavia no se montara una ruta.

## Tarea activa: llamada al proveedor

Completar y exportar `searchDestinationsWithOpenMeteo` dentro de
`destination.geocoding.ts`:

- construir una URL segura con `name`, `count=5`, `language=es` y
  `format=json`;
- ejecutar `fetch` con un limite de cinco segundos;
- recordar que `fetch` no rechaza automaticamente respuestas HTTP 4xx/5xx y
  comprobar `response.ok`;
- tratar el resultado de `response.json()` como `unknown`;
- reutilizar `normalizeOpenMeteoGeocodingResponse` para validar y transformar;
- registrar en el servidor la causa tecnica y devolver al cliente un
  `AppError` 502 estable sin exponer detalles del proveedor.

La funcion todavia no sera una ruta HTTP propia. Se probara directamente antes
de agregar service, controller y router.

## Adaptador HTTP de Open-Meteo completado

- `searchDestinationsWithOpenMeteo` esta exportada y recibe un termino ya
  validado, sin depender de Express ni de Prisma.
- La URL se construye con `URL` y `URLSearchParams`; el termino se envia como
  `name` junto con `count=5`, `language=es` y `format=json`.
- `fetch` usa `AbortSignal.timeout(5000)` para no mantener indefinidamente una
  peticion al proveedor.
- Se comprueba `response.ok` porque `fetch` no rechaza automaticamente estados
  HTTP 4xx o 5xx.
- El cuerpo se trata como `unknown` y se entrega a la frontera Zod antes de
  normalizarse.
- Los fallos de red, timeout, HTTP, JSON o contrato se registran internamente y
  se convierten en `AppError` 502 con codigo `GEOCODING_PROVIDER_ERROR`.
- Una primera ejecucion con red bloqueada comprobo el camino de error 502; una
  ejecucion con acceso autorizado busco `Lima` y devolvio cinco resultados.
- El primer resultado real se normalizo como Lima, Peru, codigo PE, coordenadas
  WGS84, zona `America/Lima` y region `Provincia de Lima`.
- `npm run typecheck`, `npm run build` y `git diff --check` pasan.

## Proximo paso

Crear service, controller y router para exponer
`GET /api/destinations/search?q=...`, protegerlo con autenticacion y traducir
`req.query` mediante `destinationSearchQuerySchema`. Todavia no se guardaran
destinos ni se modificara Prisma.

## Tarea activa: endpoint propio de busqueda

Conectar el adaptador externo con Express mediante la estructura definitiva del
modulo `destinations`:

1. `destination.service.ts` representara el caso de uso propio y delegara la
   consulta al adaptador de Open-Meteo;
2. `destination.controller.ts` comprobara autenticacion, validara `req.query`
   y respondera `{ data: { destinations } }`;
3. `destination.routes.ts` registrara `GET /search` con `requireAuth`;
4. `app.ts` montara el router bajo `/api/destinations` antes del middleware de
   errores.

El endpoint final sera `GET /api/destinations/search?q=Lima`. Un termino
invalido producira 400, una sesion ausente 401 y un fallo utilizable del
proveedor 502. La busqueda exitosa respondera 200 y no escribira en PostgreSQL.

## Endpoint propio de busqueda revisado

- `destination.service.ts` expresa el caso de uso propio y delega la consulta
  al adaptador de Open-Meteo sin depender de Express ni de Prisma.
- `destination.controller.ts` conserva la comprobacion defensiva de
  autenticacion, valida `req.query` y responde con
  `{ data: { destinations } }`.
- `destination.routes.ts` registra `GET /search` con `requireAuth` y `app.ts`
  monta el router bajo `/api/destinations` antes del middleware de errores.
- Se corrigio mecanicamente el nombre singular `destination.route.ts` para
  seguir la convencion `*.routes.ts` ya usada por `auth` y `trips`.
- Una prueba HTTP local, sin escribir en PostgreSQL, confirmo 401 sin cookie y
  400 con una cookie valida pero un termino de un solo caracter.
- `npm run typecheck`, `npm run build` y `git diff --check` pasan despues del
  ajuste.
- La busqueda exitosa y el fallo 502 ya habian sido comprobados directamente
  en el adaptador; la nueva capa no modifica ese comportamiento.

## Tarea activa: contrato RTK Query de destinos

Crear la frontera de datos del cliente y registrar una sola query de busqueda:

1. `client/src/features/destinations/destination.types.ts` describira el
   candidato normalizado y la respuesta `{ data: { destinations } }`;
2. `client/src/features/destinations/destinationsApi.ts` inyectara
   `searchDestinations` en el API slice compartido;
3. la query recibira un termino de busqueda y enviara
   `GET /api/destinations/search?q=...` mediante la propiedad `params` de
   `fetchBaseQuery`;
4. se exportara el hook generado, pero todavia no se montara en un componente;
5. no se agregaran tags: por ahora no existe una mutation que vuelva obsoletos
   estos candidatos externos.

Cada termino sera parte de la clave de cache de RTK Query. El siguiente bloque
creara la interfaz que controle cuando existe un termino valido y cuando debe
iniciarse o evitarse la peticion.

## Contrato RTK Query de destinos completado

- `destination.types.ts` reproduce el candidato normalizado y el sobre real
  `{ data: { destinations } }` sin usar `any`.
- `destinationsApi.ts` inyecta `searchDestinations` en el API slice compartido;
  no crea un segundo reducer ni un segundo middleware.
- La operacion es una query con argumento `string` y construye `q` mediante
  `params`, por lo que `fetchBaseQuery` se encarga de codificar la URL.
- Se exporta `useSearchDestinationsQuery`; definir el hook no ejecuta ninguna
  peticion mientras un componente no se suscriba.
- No se agregaron tags porque todavia no existe una mutation que vuelva
  obsoletos los candidatos del proveedor.
- Cada termino exacto formara una clave de cache distinta. La interfaz sera
  responsable de validar y normalizar el termino antes de activar la query.
- `npm run lint`, `npm run build` y `git diff --check` pasan en el cliente; el
  servidor tambien conserva `typecheck` y `build` correctos.

## Secuencia prevista para la primera interfaz de destinos

La interfaz no se implementara como una sola tarea. Se divide en bloques que
pueden revisarse y comprenderse por separado:

1. frontera Zod de los datos del formulario;
2. formulario registrado con React Hook Form, todavia sin peticion;
3. separacion entre el texto editable y el termino enviado;
4. conexion de la query mediante `skip`;
5. representacion progresiva de los estados de la query y de los resultados;
6. montaje final en pagina, ruta protegida y navegacion.

No se avanzara al siguiente bloque hasta revisar el anterior. Los resultados
solo seran candidatos informativos; guardar o asociar un destino requiere un
flujo persistente posterior.

## Tarea activa: esquema del formulario de busqueda

Crear solamente
`client/src/features/destinations/destinationSearch.schema.ts`:

- definir un objeto estricto con el campo obligatorio `searchTerm`;
- recortar espacios al inicio y al final;
- exigir entre 2 y 100 caracteres despues del recorte;
- exportar `DestinationSearchFormValues` inferido desde el esquema;
- no crear todavia componente, estado local, hook, pagina, ruta o navegacion.

## Esquema del formulario de busqueda completado

- `destinationSearch.schema.ts` define un objeto estricto con el unico campo
  obligatorio `searchTerm`.
- El campo se recorta antes de comprobar el minimo de 2 y el maximo de 100
  caracteres.
- `DestinationSearchFormValues` se infiere desde el esquema y no duplica el
  contrato mediante un tipo manual.
- El archivo no adelanta responsabilidades de React, React Hook Form o RTK
  Query.
- `npm run lint`, `npm run build` y `git diff --check` pasan.

## Tarea activa: formulario de busqueda visible y validado

Construir un formulario comprobable en el navegador, todavia sin peticiones:

1. `DestinationSearch.tsx` configurara React Hook Form, registrara
   `searchTerm`, ejecutara Zod al enviar y representara su error accesible;
2. `DestinationsPage.tsx` aportara el encabezado y montara el formulario en su
   ubicacion definitiva;
3. `AppRouter.tsx` registrara `/destinations` dentro de `RequireAuth` para poder
   comprobar el formulario mediante la URL directa;
4. la navegacion principal todavia no anunciara esta pantalla porque buscar no
   ejecutara ninguna accion hasta el siguiente bloque.

No se usaran todavia `useState`, `useSearchDestinationsQuery`, estados de
peticion, resultados ni cambios en `MainLayout.tsx`.

## Revision pendiente del formulario visible

- React Hook Form usa el tipo inferido, `zodResolver`, el esquema definitivo y
  `searchTerm: ""` como valor inicial.
- El input esta registrado, el submit pasa por `handleSubmit` y el error esta
  asociado mediante `aria-invalid`, `aria-describedby` y `role="alert"`.
- `/destinations` esta correctamente dentro de `RequireAuth` y todavia no se
  agrego a la navegacion principal.
- Se movio mecanicamente `DestinationsPage.tsx` desde la feature hacia
  `client/src/pages`, su ubicacion arquitectonica definitiva.
- Se retiraron un `try/catch` vacio y un comentario copiado de una mutation.
- Se recompusieron clases Tailwind que estaban partidas a mitad del token y no
  podian generar los estilos esperados.
- Lint, build y `git diff --check` pasan despues de esos ajustes.
- La tarea sigue abierta: `DestinationsPage` debe usar el contenedor compartido
  de las paginas, un encabezado limitado y un `h1` con la jerarquia visual
  acordada antes de realizar la prueba manual.

## Ajustes de layout del formulario de destinos completados

- `DestinationsPage` usa el contenedor compartido
  `mx-auto max-w-6xl px-6 py-10`, por lo que recupera el centrado, el ancho
  maximo y el espacio exterior de las demas paginas protegidas.
- El titulo y la descripcion viven en un `header` limitado a `max-w-2xl` para
  mantener una longitud de lectura estable.
- El titulo principal ahora es un `h1` con
  `text-3xl font-bold tracking-tight`; la descripcion se separa mediante
  `mt-3` y usa el color secundario `text-slate-600`.
- Se conservo intacto `DestinationSearch`: su separacion `mt-8`, su ancho y su
  ritmo interno ya eran coherentes con el resto de la interfaz.
- Dos revisiones aisladas confirmaron el diagnostico: la evaluacion visual
  encontro el problema solo en la envoltura y el encabezado, mientras el
  detector mecanico no encontro espaciados arbitrarios antes ni despues del
  cambio.
- `npm run lint`, `npm run build`, el detector de layout y las respuestas HTTP
  locales de cliente y servidor pasan correctamente.
- La comprobacion visual automatizada queda pendiente porque el navegador
  integrado no estuvo disponible en esta sesion. El siguiente paso inmediato
  es abrir `/destinations` con una sesion autenticada y validar el layout y los
  estados locales de Zod antes de conectar la query.

## Formulario visible aceptado para continuar

- El usuario indico continuar sin reportar fallos en la comprobacion manual.
- El bloque se considera aceptado para avanzar, aunque la sesion no obtuvo una
  captura o inspeccion automatizada del navegador.
- El formulario conserva una responsabilidad local: registrar el campo,
  validar con Zod y entregar valores validos a `handleSearchSubmit`.
- Todavia no existe una peticion de destinos ni un estado que represente la
  ultima busqueda enviada.

## Tarea activa: separar edicion y envio de la busqueda

Modificar solamente `DestinationSearch.tsx` para:

1. importar `useState` desde React;
2. crear un estado `string | null` cuyo valor inicial sea `null`;
3. llamar al setter con `values.searchTerm` dentro de `handleSearchSubmit`;
4. omitir temporalmente el valor de la tupla en la desestructuracion, porque la
   siguiente microtarea sera la primera que lo consuma;
5. no montar todavia `useSearchDestinationsQuery`, `skip`, resultados ni
   estados de red.

`null` representara que nunca se ha enviado una busqueda. Un `string`
representara el termino ya validado y recortado que mas adelante formara el
argumento y la clave de cache de la query.

## Separacion entre edicion y envio completada

- `DestinationSearch` crea un estado local `string | null` cuyo valor inicial
  es `null`.
- `handleSearchSubmit` recibe los valores que ya pasaron por Zod y guarda
  solamente `values.searchTerm` mediante `setSubmittedSearchTerm`.
- Un envio invalido no ejecuta el handler y, por tanto, no reemplaza el ultimo
  termino valido.
- La primera posicion de la tupla se omite mientras no exista un consumidor.
  Esto no elimina el estado: React conserva internamente su valor y el setter
  sigue programando una nueva renderizacion.
- Durante la revision se corrigieron mecanicamente el valor local sin uso y el
  orden del import de React. El primer build evidencio `TS6133`; despues del
  ajuste, `npm run lint` y `npm run build` pasan.
- No se conectaron RTK Query, `skip`, estados de red ni resultados.

## Proximo paso

Ensenar y conectar `useSearchDestinationsQuery` mediante `skip`. La siguiente
microtarea recuperara el valor actualmente omitido y evitara la peticion
mientras sea `null`; todavia no representara todos los estados ni la lista de
resultados.

## Tarea activa: activar la query solamente despues del envio

Modificar solo `DestinationSearch.tsx` para:

1. importar el hook generado `useSearchDestinationsQuery` desde
   `destinationsApi.ts`;
2. recuperar `submittedSearchTerm` en la tupla del estado existente;
3. llamar al hook en el nivel superior del componente;
4. entregar `submittedSearchTerm ?? ""` como argumento requerido de tipo
   `string`;
5. usar `skip: submittedSearchTerm === null` para no crear una peticion antes
   del primer envio valido;
6. no desestructurar todavia el resultado del hook ni representar carga,
   error, exito o candidatos.

La query debe permanecer declarada siempre para respetar las reglas de Hooks.
`skip` cambia su comportamiento, no su posicion: con `null` no inicia ni se
suscribe a una entrada util; con un termino valido crea la suscripcion, busca o
reutiliza la entrada de cache correspondiente y permite que RTK Query ejecute
la peticion.

## Activacion condicional de la query completada

- `DestinationSearch` importa y llama `useSearchDestinationsQuery` en el nivel
  superior del componente.
- El estado vuelve a exponer `submittedSearchTerm`; el setter conserva la misma
  responsabilidad dentro de `handleSearchSubmit`.
- `submittedSearchTerm ?? ""` satisface el argumento `string` del endpoint sin
  convertir `null` en una busqueda real.
- `skip: submittedSearchTerm === null` mantiene la query sin iniciar antes del
  primer envio valido y la activa despues de guardar un termino.
- El resultado del hook todavia no se desestructura, por lo que esta tarea no
  mezcla la activacion con la representacion de estados.
- `npm run lint` y `npm run build` pasan. La secuencia visible de peticiones
  sigue pendiente de una comprobacion manual del navegador.

## Tarea activa: representar el estado no iniciado

Modificar solamente `DestinationSearch.tsx` para introducir
`isUninitialized`:

1. desestructurar solo `isUninitialized` del resultado del hook;
2. envolver el formulario y la futura region de resultados en un fragmento;
3. crear despues del formulario una `section` definitiva, identificada por un
   `h2` de resultados;
4. mostrar dentro una instruccion breve solamente cuando
   `isUninitialized` sea verdadero;
5. no usar aun `isLoading`, `isFetching`, `isSuccess`, `isError`, `data`,
   `error` ni `refetch`.

La seccion permanecera como contenedor estable para los siguientes estados.
Solo su contenido cambiara conforme avance la query.

## Estado no iniciado completado

- El estudiante desestructuro correctamente `isUninitialized` del hook.
- El agente completo la parte mecanica ya conocida: fragmento, seccion
  semantica, encabezado de resultados y renderizado condicional de la
  instruccion inicial.
- La seccion `aria-labelledby` permanece montada y actuara como ubicacion
  definitiva para carga, error, vacio y resultados.
- La region se separa mediante espacio y jerarquia tipografica; no se agrego
  una segunda tarjeta decorativa junto al formulario.
- `npm run lint`, `npm run build`, el detector de interfaz y
  `git diff --check` pasan.

## Acuerdo de trabajo actualizado

- El agente puede implementar directamente los pasos que reutilicen conceptos
  ya conocidos por el estudiante.
- Cuando el siguiente paso introduzca un concepto nuevo, el agente debe
  explicarlo y dejar su implementacion como microtarea para el estudiante.
- Los ajustes mecanicos detectados durante la revision continuan a cargo del
  agente.

## Tarea activa: primera carga con `isLoading`

Modificar solamente `DestinationSearch.tsx` para:

1. desestructurar `isLoading` junto con `isUninitialized`;
2. representar dentro de la seccion de resultados un mensaje visible
   `Buscando destinos...` solamente cuando `isLoading` sea verdadero;
3. usar `role="status"` para anunciar el cambio sin interrumpir al usuario;
4. conservar la instruccion inicial y no introducir todavia `isFetching`,
   `isSuccess`, `isError`, `data`, `error` ni `refetch`;
5. no deshabilitar aun el boton, porque su estado final dependera de la
   diferencia entre primera carga y peticiones posteriores.

`isLoading` representa la primera peticion sin datos disponibles.
`isFetching` tambien sera verdadero durante esa peticion, pero ademas cubrira
actualizaciones posteriores; esa diferencia se implementara en la siguiente
microtarea.

## Estados completos de la busqueda de destinos

Por peticion explicita del usuario, los estados restantes se implementaron en
un solo bloque:

- `isUninitialized` conserva la instruccion anterior al primer envio.
- `isLoading` y `isFetching` forman un estado de carga estable cuando la query
  todavia no tiene una respuesta para el argumento actual.
- La primera carga muestra texto accesible y placeholders; la animacion respeta
  `prefers-reduced-motion`.
- `currentData` evita mostrar candidatos de un termino anterior mientras se
  solicita una clave de cache nueva.
- Un refetch con datos conserva la lista y comunica
  `Actualizando resultados...`.
- Un error sin datos usa una alerta roja y permite reintentar. Un error de
  actualizacion usa un aviso no destructivo y mantiene la ultima respuesta.
- Los mensajes distinguen 400, 401, 429, 502, fallo de red y error generico sin
  exponer detalles internos del backend.
- `isSuccess` anuncia la cantidad de coincidencias; una respuesta vacia ofrece
  alternativas concretas para reformular la busqueda.
- Los candidatos se representan como una lista semantica con nombre, contexto
  geografico, coordenadas y zona horaria cuando esta disponible.
- El formulario y la region declaran su actividad; el boton se deshabilita
  durante `isFetching` y el handler conserva una defensa contra envios
  concurrentes.
- `npm run lint`, `npm run build`, el detector de interfaz y
  `git diff --check` pasan.

## Proximo paso

Realizar una comprobacion manual de la secuencia completa en navegador y, una
vez confirmada, agregar `/destinations` a la navegacion principal. La ruta ya
existe y permanece protegida; el enlace dejara de ser prematuro porque la
pantalla ya ejecuta y representa una busqueda util.

## Navegacion de destinos completada

- `MainLayout` incorpora un `NavLink` visible a `/destinations` con la etiqueta
  `Destinos`.
- La ruta ya existente continua dentro de `RequireAuth`; agregar el enlace no
  cambia su proteccion ni duplica la configuracion del router.
- Los enlaces principales comparten estados visible, hover, foco y activo.
- `Inicio` usa `end` para no permanecer activo cuando el usuario visita viajes
  o destinos.
- La navegacion y su grupo de acciones permiten envolver el contenido en
  pantallas estrechas, evitando que el nuevo enlace provoque desbordamiento.
- `npm run lint`, `npm run build`, el detector de interfaz y
  `git diff --check` pasan.

## Tarea activa: validacion manual del flujo de destinos

Con una sesion autenticada, comprobar:

1. que `Destinos` navega a `/destinations` y refleja el estado activo;
2. que el formulario muestra primero la instruccion y no dispara una query;
3. que un termino invalido permanece en la validacion local;
4. que un termino valido representa carga y candidatos o vacio;
5. que el reintento y la actualizacion conservan la estructura estable;
6. que la navegacion y la lista no desbordan un viewport movil.

No se iniciara todavia el guardado persistente de candidatos. Esa funcionalidad
requiere definir primero el modelo y el contrato propio de destinos de viaje.

## Validacion de la interfaz aceptada para continuar

- El usuario indico continuar sin reportar fallos en el recorrido manual.
- La sesion no obtuvo una inspeccion automatizada del navegador, por lo que no
  se registra evidencia visual adicional.
- Se cierra el bloque de busqueda y comienza la persistencia incremental de
  destinos.

## Tarea activa: modelo persistente `Destination`

Modificar solamente `server/prisma/schema.prisma` para crear la entidad
reutilizable `Destination`:

1. `id`: UUID generado por PostgreSQL/Prisma;
2. `providerId`: texto obligatorio, unico y limitado a 32 caracteres;
3. `name`: texto obligatorio de hasta 200 caracteres;
4. `country`: texto opcional de hasta 120 caracteres;
5. `countryCode`: texto opcional de hasta 2 caracteres;
6. `region`: texto opcional de hasta 160 caracteres;
7. `latitude` y `longitude`: `Float` con tipo nativo `DoublePrecision`;
8. `timezone`: texto opcional de hasta 80 caracteres;
9. `createdAt` con `now()` y `updatedAt` con `@updatedAt`;
10. mapear la tabla fisica como `destinations`.

En esta microtarea no se agregaran `userId`, `tripId`, relaciones inversas,
tablas puente, servicios, endpoints ni migraciones. Primero se validara el
contrato aislado mediante `prisma format` y `prisma validate`; las relaciones
se incorporaran en su ubicacion definitiva antes de crear la migracion del
bloque.

## Modelo persistente `Destination` completado

- `Destination` se agrego en `server/prisma/schema.prisma` con identidad UUID
  interna e identidad externa unica mediante `providerId`.
- Los datos opcionales del proveedor permanecen anulables y las coordenadas
  usan `Float` con `DoublePrecision`.
- El modelo no contiene propiedad directa de usuario o viaje; conserva la
  reutilizacion prevista para las futuras tablas puente.
- `prisma format` corrigio la sangria y el salto de linea final del archivo.
- `prisma validate`, `npm run typecheck` y `git diff --check` pasan.
- No se genero una migracion: primero se definira la relacion entre viajes y
  destinos mediante `TripDestination`.

## Proximo paso

Introducir el concepto de tabla puente y definir incrementalmente
`TripDestination`, comenzando por explicar por que la relacion entre `Trip` y
`Destination` no debe representarse con una clave foranea directa en ninguno
de los dos modelos.

## Tarea activa: estructura relacional de `TripDestination`

Modificar solamente `server/prisma/schema.prisma` para:

1. agregar en `Trip` el lado inverso, una lista de `TripDestination`;
2. agregar en `Destination` el lado inverso, otra lista de
   `TripDestination`;
3. crear `TripDestination` con identidad UUID propia;
4. agregar las claves foraneas UUID `tripId` y `destinationId`;
5. declarar las relaciones obligatorias hacia `Trip` y `Destination`, ambas
   con `onDelete: Cascade`;
6. mapear la tabla fisica como `trip_destinations`.

Esta microtarea define solamente la conexion. Todavia no incluye `position`,
fechas, notas, restricciones compuestas, endpoints ni migracion. Se comprobara
con `prisma format`, `prisma validate` y `npm run typecheck`.

## Estructura relacional de `TripDestination` completada

- `Trip` y `Destination` exponen sus respectivos lados inversos mediante
  listas `TripDestination[]`.
- `TripDestination` tiene identidad UUID propia y claves foraneas UUID hacia
  ambos modelos.
- Las dos relaciones son obligatorias y eliminan sus filas puente mediante
  `onDelete: Cascade` cuando se elimina el registro padre.
- La tabla fisica queda mapeada como `trip_destinations`.
- No se agregaron datos de la parada, restricciones compuestas ni migracion.
- `prisma format`, `prisma validate`, `npm run typecheck` y
  `git diff --check` pasan.

## Proximo paso

Completar la informacion propia de cada parada en `TripDestination`: orden,
fechas opcionales y notas. Antes de implementarla se definiran la regla de
orden y los casos limite de una visita repetida al mismo destino.

## Tarea activa: posicion de una parada

Modificar solamente `server/prisma/schema.prisma` para agregar a
`TripDestination`:

1. `position` como entero obligatorio;
2. una restriccion unica compuesta por `tripId` y `position`.

La posicion comienza conceptualmente en `1`. Un mismo destino puede aparecer
mas de una vez en un viaje, por lo que no se agregara una restriccion unica
entre `tripId` y `destinationId`. Todavia no se agregaran fechas, notas,
endpoints ni migracion.

## Posicion de una parada completada

- `TripDestination.position` es un entero obligatorio.
- `@@unique([tripId, position])` impide repetir una posicion dentro del mismo
  viaje sin convertirla en unica para todos los viajes.
- No existe unicidad entre `tripId` y `destinationId`, por lo que una ruta
  puede visitar el mismo destino mas de una vez.
- Durante la revision se movio `@@unique` desde la linea del campo hasta el
  nivel del modelo, que es donde Prisma admite los atributos compuestos.
- `prisma format`, `prisma validate`, `npm run typecheck` y
  `git diff --check` pasan.

## Proximo paso

Definir las fechas opcionales `arrivalDate` y `departureDate` de cada parada,
incluyendo su relacion con las fechas generales del viaje y la regla que debe
cumplirse cuando ambas fechas existen.

## Tarea activa: fechas opcionales de una parada

Modificar solamente `server/prisma/schema.prisma` para agregar a
`TripDestination`:

1. `arrivalDate` como `DateTime` opcional con tipo nativo `Date`;
2. `departureDate` con la misma configuracion.

No se agregaran valores por defecto ni restricciones Prisma adicionales. La
regla `arrivalDate <= departureDate` y la pertenencia al rango general del
viaje se implementaran posteriormente en la validacion y el servicio del
backend. Todavia no se agregaran notas, endpoints ni migracion.

## Fechas opcionales de una parada completadas

- `arrivalDate` y `departureDate` son `DateTime?` con tipo nativo `Date`.
- Ambos campos admiten planificacion parcial y no tienen valores por defecto.
- La revision no encontro errores funcionales; `prisma format` aplico la
  alineacion mecanica del modelo.
- `prisma validate` y `npm run typecheck` pasan.
- La pertenencia al rango del viaje se comprobara en dos operaciones futuras:
  al crear o actualizar una parada y al modificar las fechas generales de un
  viaje que ya tenga paradas.

## Proximo paso

Agregar las notas opcionales de la parada y cerrar el contrato persistente de
`TripDestination`. Despues se podra definir la migracion del bloque antes de
iniciar los esquemas, servicios y endpoints de la funcionalidad.

## Tarea activa: notas opcionales de una parada

Modificar solamente `server/prisma/schema.prisma` para agregar `notes` a
`TripDestination` como `String?` con tipo nativo `Text`. El campo se ubicara
despues de las fechas y antes de los atributos `@@` del modelo.

No se agregara un valor por defecto ni una longitud en Prisma. El limite de
1000 caracteres y la normalizacion de texto vacio se incorporaran en el futuro
esquema Zod del contrato HTTP. Todavia no se creara una migracion.

## Notas opcionales de una parada completadas

- `TripDestination.notes` es `String?` con tipo nativo `Text`.
- El campo no tiene valor por defecto y representa la ausencia mediante
  `null`.
- `prisma format`, `prisma validate` y `npm run typecheck` pasan.

## Auditoria previa a migracion: indice de destino

La restriccion `@@unique([tripId, position])` ya cubre consultas cuyo primer
criterio es `tripId`. Falta agregar un indice independiente sobre
`destinationId`, porque PostgreSQL no lo crea automaticamente por ser llave
foranea.

Modificar solamente `server/prisma/schema.prisma` para agregar
`@@index([destinationId])` a `TripDestination`, junto a los demas atributos de
modelo. No agregar un indice separado sobre `tripId` y no crear todavia la
migracion.

## Indice de destino completado

- `TripDestination` incluye `@@index([destinationId])`.
- `prisma validate`, `npm run typecheck` y `git diff --check` pasan.

## Proximo paso

Realizar la revision final del SQL que Prisma propone para `Destination` y
`TripDestination`; despues crear una unica migracion para este bloque.

## Vista previa SQL revisada

Se ejecuto `prisma migrate diff` desde la base local actual hasta
`prisma/schema.prisma`. El comando fue de solo lectura y propuso:

- crear `destinations` y `trip_destinations`;
- crear la clave unica de `providerId`;
- crear el indice de `destinationId`;
- crear la unicidad compuesta `tripId + position`;
- agregar las llaves foraneas hacia `trips` y `destinations`, ambas con borrado
  en cascada;
- no eliminar ni modificar tablas o columnas existentes.

La ausencia de un `DEFAULT` SQL para los UUID coincide con las migraciones de
`User` y `Trip`: `uuid()` es generado por Prisma antes de insertar.

## Tarea activa: crear y revisar la migracion

Desde `server`, generar una unica migracion de desarrollo con el nombre
`add_destinations_and_trip_destinations` y la opcion `--create-only`. Esta
primera orden crea `migration.sql` sin aplicarlo a PostgreSQL. Revisar el SQL
antes de ejecutar una segunda orden `prisma migrate dev` que aplique las
migraciones pendientes. Al final se comprobaran `prisma migrate status`,
`prisma validate` y `npm run typecheck`.

## Migracion creada y SQL aprobado

- Se creo `20260813173319_add_destinations_and_trip_destinations` mediante
  `--create-only`.
- El SQL crea unicamente `destinations`, `trip_destinations`, sus claves
  primarias, los tres indices previstos y las dos llaves foraneas.
- No contiene `DROP`, `TRUNCATE` ni alteraciones de las tablas existentes.
- `prisma migrate status` confirma que las dos migraciones anteriores estan
  aplicadas y que esta nueva migracion permanece pendiente.

## Tarea activa: aplicar y verificar la migracion

Desde `server`, ejecutar `npx prisma migrate dev` sin `--name` para aplicar la
migracion pendiente ya revisada. Despues comprobar el estado, validar el
esquema y ejecutar el typecheck. No crear otra migracion con un nombre nuevo.

## Migracion de destinos aplicada y verificada

- Las tres migraciones del proyecto estan aplicadas en la base local.
- `prisma migrate diff` no detecta diferencias entre PostgreSQL y
  `prisma/schema.prisma`.
- `prisma validate` confirma que el esquema es valido.
- Prisma Client no se habia regenerado automaticamente; se ejecuto
  `prisma generate` y ahora expone `Destination` y `TripDestination`.
- `npm run typecheck` y `git diff --check` pasan.

## Proximo paso

Disenar el contrato HTTP para agregar una parada a un viaje. Antes de crear
archivos se definiran la ruta, los datos que pertenecen a parametros y cuerpo,
las respuestas, los errores y el limite de responsabilidad del primer esquema
Zod.

## Contrato acordado: agregar una parada

- Metodo y ruta: `POST /api/trips/:tripId/destinations`.
- La ruta permanece bajo `tripRouter` y requiere autenticacion.
- `tripId` se valida con el esquema de parametros de viaje existente.
- El cuerpo contiene `destination`, con el candidato normalizado que ya
  devuelve la busqueda, y `arrivalDate`, `departureDate` y `notes` opcionales.
- El cliente no envia `position`; el servicio calcula la siguiente posicion
  del viaje para evitar depender de estado cliente desactualizado.
- El servicio comprueba primero que el viaje pertenece al usuario, reutiliza o
  crea `Destination` mediante `providerId`, valida las fechas y crea siempre
  una nueva fila `TripDestination`.
- Repetir un `providerId` reutiliza la ciudad pero puede crear una nueva visita
  dentro del mismo viaje.
- La respuesta `201` contiene `data.tripDestination` y el objeto `destination`
  relacionado, con fechas serializadas como `YYYY-MM-DD` o `null`.
- Los errores previstos incluyen autenticacion, validacion, viaje inexistente,
  rango de fechas invalido, fechas fuera del viaje y conflicto excepcional de
  posicion concurrente.

El backend aceptara los datos normalizados del candidato y validara
estrictamente su forma. Esto no demuestra criptograficamente que provienen de
Open-Meteo, pero evita una segunda consulta externa y es una proporcion
razonable para el alcance del proyecto. Firmar candidatos o mantenerlos en una
sesion de servidor queda fuera del alcance inicial.

## Tarea activa: esquema reutilizable del candidato

Ampliar `server/src/features/destinations/destination.schemas.ts` con un
`destinationCandidateSchema` estricto que represente exactamente el resultado
normalizado: `providerId`, `name`, `country`, `countryCode`, `latitude`,
`longitude`, `timezone` y `region`. Exportar tambien el tipo inferido
`DestinationCandidateInput`.

Esta microtarea no crea todavia el esquema de la parada, servicio, mapper,
controlador ni ruta. Primero se comprobara que el limite entre el dato externo
normalizado y la entrada HTTP quede correctamente tipado y validado.

## Esquema reutilizable del candidato completado

- `destinationCandidateSchema` usa `z.strictObject` y contiene exactamente los
  ocho campos del resultado normalizado.
- Los textos se recortan, `countryCode` se convierte a mayusculas, las
  coordenadas conservan rangos geograficos y los datos que pueden faltar usan
  `nullable` sin hacerse opcionales.
- Las pruebas de ejecucion confirman que se rechazan campos ausentes, campos
  desconocidos, coordenadas en texto y coordenadas fuera de rango.
- `DestinationSearchResult` reutiliza ahora `DestinationCandidateInput` para
  evitar mantener una segunda definicion manual del mismo contrato.
- `npm run typecheck` y `git diff --check` pasan.

## Proximo paso

Crear en la ubicacion definitiva de la nueva funcionalidad el primer esquema
del cuerpo de la peticion. La primera microtarea reutilizara el candidato como
objeto anidado antes de incorporar las fechas y notas opcionales.

## Tarea activa: composicion del esquema de una parada

Crear `server/src/features/trip-destinations/trip-destination.schemas.ts` como
ubicacion definitiva de los contratos HTTP de la tabla puente. El archivo
debe:

1. importar `z` y `destinationCandidateSchema`;
2. exportar `createTripDestinationSchema` como `z.strictObject`;
3. incluir por ahora solamente la propiedad obligatoria `destination`, cuyo
   valor usa directamente `destinationCandidateSchema`;
4. exportar `CreateTripDestinationInput` mediante `z.infer`.

El import local conservara la extension `.js` exigida por `NodeNext`, aunque el
archivo fuente sea TypeScript. Esta microtarea no duplica los ocho campos, no
incluye `tripId`, `position`, fechas o notas y no crea las demas capas.

## Composicion del esquema de una parada completada

- Se creo la ubicacion definitiva
  `server/src/features/trip-destinations/trip-destination.schemas.ts`.
- `createTripDestinationSchema` es estricto y reutiliza
  `destinationCandidateSchema` como su propiedad obligatoria `destination`.
- `CreateTripDestinationInput` se infiere desde el esquema y no duplica el
  contrato mediante una interfaz manual.
- La prueba de ejecucion acepta un candidato valido, rechaza la ausencia de
  `destination`, rechaza `position` como campo exterior desconocido y ubica un
  identificador invalido en la ruta `destination.providerId`.
- `npm run typecheck` y `git diff --check` pasan.

## Proximo paso

Ampliar el esquema exterior con `arrivalDate` y `departureDate` opcionales,
definiendo primero la diferencia entre propiedad omitida y valor `null` en una
operacion de creacion, y validando el orden cuando ambas fechas existen.

## Fechas del contrato de creacion completadas

- `arrivalDate` y `departureDate` aceptan omision, `null` o una fecha ISO
  `YYYY-MM-DD`.
- El refinamiento exterior compara el orden solamente cuando ambas fechas
  existen y asocia el error a `departureDate`.
- Se aceptan una sola fecha, dos valores nulos y llegada/salida en el mismo
  dia; se rechazan el formato invalido y la salida anterior a la llegada.
- La comparacion con `Trip.startDate` y `Trip.endDate` permanece fuera de Zod y
  se implementara en el servicio usando el viaje real de PostgreSQL.
- `npm run typecheck` y `git diff --check` pasan.

## Proximo paso

Agregar `notes` al esquema de creacion como dato opcional y anulable,
normalizando espacios y definiendo de forma explicita como se trata una cadena
vacia. Con ello quedara cerrado el cuerpo de `POST` antes de crear el mapper.

## Contrato de creacion de una parada completado

- `notes` acepta omision, `null` o texto de hasta 1000 caracteres.
- El texto se recorta y una cadena vacia despues de `trim` se transforma en
  `null`; una propiedad omitida permanece ausente.
- Las pruebas rechazan texto demasiado largo y valores que no son cadenas,
  mientras la validacion cruzada de fechas continua funcionando.
- El cuerpo completo contiene `destination`, `arrivalDate`, `departureDate` y
  `notes`; no acepta `tripId` ni `position`.
- `npm run typecheck` y `git diff --check` pasan.

## Proximo paso

Definir el mapper de respuesta de `TripDestination`. El mapper recibira una
fila de Prisma con `destination` incluido, convertira las fechas opcionales a
`YYYY-MM-DD` o `null` y construira el contrato publico que devolvera el futuro
endpoint `POST`.

## Tarea activa: tipos del mapper de una parada

Crear
`server/src/features/trip-destinations/trip-destination.mapper.ts` y definir:

1. un tipo interno `TripDestinationWithDestination` mediante
   `Prisma.TripDestinationGetPayload`, describiendo una consulta que incluye
   `destination`;
2. un tipo exportado `TripDestinationResponse` con `id`, `tripId`, `position`,
   `arrivalDate`, `departureDate`, `notes` y un objeto `destination`;
3. dentro de `destination`, exponer `id`, `providerId`, `name`, `country`,
   `countryCode`, `region`, `latitude`, `longitude` y `timezone`.

Las fechas del tipo publico son `string | null`; los campos anulables de la
ciudad y `notes` conservan `string | null`. No se exponen `destinationId` ni
los timestamps de `Destination`, porque el objeto anidado ya aporta la
identidad necesaria y esos metadatos no tienen un consumidor en este flujo.

Esta microtarea no implementa aun la funcion del mapper. Primero se validara
que el tipo de entrada refleje una consulta Prisma real y que el contrato de
salida no filtre objetos `Date` hacia JSON.

## Microtarea actual del mapper: tipo de entrada

Crear el archivo definitivo
`server/src/features/trip-destinations/trip-destination.mapper.ts` con
solamente:

1. el import de tipo `Prisma` desde el cliente generado;
2. el tipo interno `TripDestinationWithDestination` obtenido mediante
   `Prisma.TripDestinationGetPayload` y una configuracion que incluya
   `destination`.

No exportar todavia ese tipo y no agregar el contrato de respuesta ni la
funcion mapper. La siguiente microtarea construira la salida publica una vez
confirmado el significado del payload de entrada.

## Tipo de entrada del mapper completado

- Se creo `trip-destination.mapper.ts` en la carpeta definitiva de la
  funcionalidad.
- `TripDestinationWithDestination` usa
  `Prisma.TripDestinationGetPayload<{ include: { destination: true } }>`.
- El tipo permanece interno y describe las columnas de la parada junto con el
  objeto relacionado `destination`; no ejecuta una consulta ni cambia la base.
- No se incluyeron `trip`, contrato de respuesta ni funcion mapper.
- `npm run typecheck` y `git diff --check` pasan.

## Proximo paso

Definir solamente `TripDestinationResponse`, el tipo publico que separa la
forma interna de Prisma de la respuesta JSON. La funcion de transformacion se
implementara en una microtarea posterior.

## Microtarea actual del mapper: tipo de salida

Ampliar `trip-destination.mapper.ts` con el tipo exportado
`TripDestinationResponse`. Debe contener `id`, `tripId`, `position`,
`arrivalDate`, `departureDate`, `notes` y `destination`.

- `arrivalDate` y `departureDate` son `string | null` en el contrato HTTP;
- `notes` conserva `string | null`;
- `destination` contiene `id`, `providerId`, `name`, `country`, `countryCode`,
  `region`, `latitude`, `longitude` y `timezone` con sus nulabilidades ya
  acordadas;
- no se exponen `destinationId`, el objeto `trip` ni timestamps internos.

Esta microtarea define solamente la promesa publica de la API. No debe usar el
tipo interno como alias, porque la salida cambia fechas `Date` a texto y omite
campos de persistencia. Todavia no se implementa la funcion mapper.

## Tipo publico del mapper completado

- `TripDestinationResponse` se exporta desde el mapper.
- Expone la identidad y datos utiles de la parada, con fechas como
  `string | null` y el destino persistido como objeto anidado.
- Omite `destinationId`, el objeto `trip` y los timestamps internos del
  destino.
- El tipo publico permanece separado de
  `TripDestinationWithDestination`, que conserva la forma real de Prisma.
- `npm run typecheck` y `git diff --check` pasan.

## Proximo paso

Implementar `toTripDestinationResponse`. La funcion recibira el tipo interno,
devolvera el tipo publico y convertira exclusivamente las fechas opcionales de
`Date` a `YYYY-MM-DD`, copiando los demas campos permitidos de forma explicita.

## Mapper de una parada completado

- `toTripDestinationResponse` recibe
  `TripDestinationWithDestination` y declara como salida
  `TripDestinationResponse`.
- Las fechas `Date | null` se convierten a `YYYY-MM-DD | null`.
- Los campos publicos de la parada y del destino se copian explicitamente; un
  cambio futuro en Prisma no se expone automaticamente por JSON.
- Las pruebas confirman fechas con valor, fechas nulas y la omision de
  `destinationId`, `createdAt` y `updatedAt`.
- `npm run typecheck` y `git diff --check` pasan.

## Proximo paso

Disenar el servicio de creacion antes de implementarlo. Se dividiran y
explicaran en orden: conversion de fechas, autorizacion del viaje, validacion
contra su rango, reutilizacion del destino, calculo de posicion y transaccion.
La primera microtarea del servicio introducira solamente una utilidad local de
conversion `YYYY-MM-DD` a `Date` UTC.

## Ajuste arquitectonico: conversion de fechas compartida

La conversion ya existe como funcion local `toUtcDate` en `trip.service.ts`.
Como `trip-destinations` necesitara exactamente la misma operacion, no se
duplicara ni permanecera propiedad exclusiva del servicio de viajes.

## Tarea activa: extraer `toUtcDate`

1. crear `server/src/common/dates/date.utils.ts`;
2. mover alli `toUtcDate` y exportarla;
3. importar la utilidad desde `trip.service.ts`;
4. eliminar la definicion local del servicio;
5. no crear todavia `trip-destination.service.ts` ni cambiar el comportamiento
   de viajes.

La utilidad recibe un texto ISO `YYYY-MM-DD` previamente validado y devuelve
un `Date` a medianoche UTC. Zod conserva la responsabilidad de validar el
formato; la utilidad solo convierte. Se comprobara con `npm run typecheck`,
`npm run build` y una ejecucion directa con una fecha concreta.

## Conversion de fechas compartida completada

- Se creo `server/src/common/dates/date.utils.ts` y se exporto `toUtcDate`.
- `trip.service.ts` importa la utilidad y ya no mantiene una copia local.
- La prueba directa convierte `2026-12-03` en
  `2026-12-03T00:00:00.000Z` como objeto `Date`.
- `npm run typecheck`, `npm run build` y `git diff --check` pasan.

## Proximo paso

Crear `trip-destination.service.ts` con la firma publica de
`createTripDestination`: recibira `userId`, `tripId` y
`CreateTripDestinationInput`, y prometera `TripDestinationResponse`. Antes de
añadir consultas se explicara por que cada dato llega por una fuente diferente
y como la firma conecta controlador, reglas de negocio y mapper.

## Microtarea actual del servicio: obtener el viaje autorizado

Crear `server/src/features/trip-destinations/trip-destination.service.ts` con
una funcion interna asincrona `getOwnedTripOrThrow(userId, tripId)`.

- importar `prisma` y `AppError` usando las rutas compartidas existentes;
- consultar `prisma.trip.findFirst` filtrando simultaneamente `id: tripId` y
  `userId`;
- seleccionar solamente `id`, `startDate` y `endDate`;
- si el resultado es `null`, lanzar `AppError` con HTTP `404`, codigo
  `TRIP_NOT_FOUND` y mensaje `Viaje no encontrado`;
- si existe, devolver el objeto seleccionado;
- no exportar la funcion ni crear aun `createTripDestination`.

Combinar `tripId` y `userId` es autorizacion a nivel de consulta: un viaje
ajeno se trata igual que uno inexistente. El tipo de retorno puede ser inferido
por TypeScript desde `findFirst` y el control `if (!trip)`.

## Obtencion del viaje autorizado completada

- Se creo `trip-destination.service.ts` en la ubicacion definitiva.
- `getOwnedTripOrThrow` filtra simultaneamente por `id` y `userId`.
- La consulta selecciona solamente `id`, `startDate` y `endDate`.
- Un viaje ausente o ajeno produce el mismo `AppError` con
  `404 TRIP_NOT_FOUND`.
- Despues del control nulo, TypeScript infiere un retorno con el viaje
  existente y fechas como objetos `Date`.
- `npm run typecheck`, `npm run build` y `git diff --check` pasan.

## Proximo paso

Definir la validacion del rango de una parada como una funcion pura del mismo
servicio. Recibira las fechas opcionales ya convertidas y las fechas del viaje,
permitira valores nulos y lanzara un error si alguna fecha queda fuera del
intervalo inclusivo `startDate`/`endDate`.

## Microtarea actual: validar fechas contra el viaje

Agregar en `trip-destination.service.ts` una funcion interna
`assertTripDestinationDatesWithinTrip` que reciba:

1. `trip`, con `startDate: Date` y `endDate: Date`;
2. `arrivalDate: Date | null`;
3. `departureDate: Date | null`.

La funcion devuelve `void`. Cada fecha no nula debe ser mayor o igual a
`trip.startDate` y menor o igual a `trip.endDate`. Si cualquiera queda fuera,
lanza `AppError(400, "TRIP_DESTINATION_DATES_OUT_OF_RANGE", "Las fechas de la
parada deben estar dentro del rango del viaje")`.

Los limites son inclusivos, una sola fecha conocida es valida si esta dentro y
dos valores nulos no producen error. La funcion no comprueba aqui el orden
llegada/salida, ya cubierto por el esquema de creacion, ni convierte cadenas o
consulta la base de datos.

## Validacion del rango del viaje completada

- `assertTripDestinationDatesWithinTrip` recibe el rango del viaje y dos
  fechas `Date | null`.
- Cada fecha no nula se compara contra ambos limites; las fechas iguales al
  inicio o final del viaje son validas.
- Si llegada o salida queda fuera, se lanza
  `400 TRIP_DESTINATION_DATES_OUT_OF_RANGE`.
- La funcion permanece interna, no consulta Prisma y no transforma datos.
- `npm run typecheck`, `npm run build` y `git diff --check` pasan. Las pruebas
  de ejecucion se realizaran al conectarla al flujo publico del servicio.

## Proximo paso

Agregar una funcion interna que normalice `string | null | undefined` a
`Date | null` usando `toUtcDate`. Esto conectara la salida del esquema Zod con
los tipos que esperan Prisma y la validacion de rango, sin confundir omision
HTTP (`undefined`) con ausencia persistida (`null`).

## Ajuste de ubicacion: fecha opcional compartida

La normalizacion no contiene una regla de `TripDestination`; solo traduce una
fecha HTTP opcional. Por ello se ubicara junto a `toUtcDate` en
`common/dates/date.utils.ts` y podra reutilizarse posteriormente.

## Microtarea actual: `toNullableUtcDate`

Agregar y exportar `toNullableUtcDate` en `date.utils.ts`:

- recibe `string | null | undefined`;
- devuelve explicitamente `Date | null`;
- si el valor es `null` o `undefined`, devuelve `null`;
- si es texto, delega la conversion a `toUtcDate`;
- no valida el formato ni acepta cadenas vacias como ausencia.

Se comprobaran tres entradas concretas: una fecha ISO, `null` y `undefined`.
No se modificara todavia `trip-destination.service.ts` para usarla.

## Fecha opcional compartida completada

- `toNullableUtcDate` recibe `string | null | undefined` y devuelve
  `Date | null`.
- Una fecha ISO se delega a `toUtcDate`; `null` y `undefined` convergen en
  `null`.
- La utilidad no acepta silenciosamente una cadena vacia como ausencia ni
  duplica la construccion UTC.
- Las pruebas directas de los tres casos, `npm run typecheck`, `npm run build`
  y `git diff --check` pasan.

## Proximo paso

Introducir la transaccion que agrupara la reutilizacion o creacion de
`Destination`, el calculo de posicion y la creacion de `TripDestination`.
Primero se explicara `Prisma.TransactionClient` y se implementara un helper
que reciba ese cliente para ejecutar `upsert` por `providerId` sin sobrescribir
un destino compartido ya existente.

## Microtarea actual: reutilizar o crear `Destination`

Agregar a `trip-destination.service.ts` una funcion interna asincrona
`getOrCreateDestination(tx, candidate)`:

- `tx` usa el tipo `Prisma.TransactionClient`;
- `candidate` usa `DestinationCandidateInput`;
- ejecutar `tx.destination.upsert` buscando por el `providerId` unico;
- usar un objeto vacio en `update` para devolver sin sobrescribir el destino
  cuando ya existe;
- mapear explicitamente en `create` los ocho campos normalizados del candidato;
- dejar que TypeScript infiera el retorno `Promise<Destination>`;
- no exportar ni invocar todavia el helper.

`TransactionClient` ofrece las operaciones de modelos dentro del bloque
atomico, pero omite metodos que iniciarian otra transaccion. Usar el cliente
global dentro del helper dejaria esa operacion fuera del futuro rollback.

`upsert` significa actualizar o insertar. En este caso la rama `update: {}` no
cambia datos: un `providerId` existente reutiliza la fila compartida. La rama
`create` solo se ejecuta si no existe y crea `providerId`, nombre, pais, codigo,
region, coordenadas y zona horaria.

## Reutilizacion o creacion de destino completada

- `getOrCreateDestination` recibe `Prisma.TransactionClient` y el candidato
  validado.
- `upsert` busca por el `providerId` unico.
- La rama existente usa `update: {}` y no sobrescribe la ciudad compartida.
- La rama nueva mapea explicitamente los ocho campos normalizados.
- La funcion permanece interna y aun no es invocada, por lo que esta tarea no
  escribio datos en PostgreSQL.
- `npm run typecheck`, `npm run build`, `prisma validate` y
  `git diff --check` pasan.

## Proximo paso

Crear un helper transaccional que calcule la siguiente posicion de una parada.
Consultara la posicion maxima del viaje y devolvera `1` cuando no haya paradas
o `max + 1` cuando ya existan. Todavia no creara `TripDestination`.

## Microtarea actual: calcular la siguiente posicion

Agregar a `trip-destination.service.ts` una funcion interna
`getNextPosition(tx, tripId)`:

- recibir `Prisma.TransactionClient` y el identificador del viaje;
- declarar el retorno `Promise<number>`;
- consultar `tx.tripDestination.aggregate` filtrando por `tripId`;
- solicitar solamente el maximo de `position`;
- devolver `1` si el maximo es `null` o `max + 1` en caso contrario;
- no invocar todavia el helper ni crear una parada.

Se usa el maximo en lugar del conteo porque una secuencia con posiciones `1` y
`3` contiene dos filas, pero su siguiente posicion segura es `4`, no `3`.

## Calculo de la siguiente posicion completado

- `getNextPosition` recibe el cliente transaccional y el `tripId`.
- El agregado filtra las paradas del viaje y obtiene solamente el maximo de
  `position`.
- Sin paradas devuelve `1`; con una posicion maxima devuelve `max + 1`.
- Se usa el nombre `positions` porque el resultado no representa una suma.
- El helper permanece interno y aun no ejecuta ninguna escritura.
- `npm run typecheck`, `npm run build`, `prisma validate` y
  `git diff --check` pasan.

## Proximo paso

Crear gradualmente la funcion publica `createTripDestination`. Primero recibira
el usuario, el viaje y el cuerpo validado; comprobara la propiedad del viaje,
normalizara las fechas opcionales y aplicara la regla de rango. La transaccion
y las escrituras se incorporaran despues de verificar esa preparacion.

## Preparacion de `createTripDestination` completada

- La funcion publica recibe `userId`, `tripId` y `CreateTripDestinationInput`.
- Su contrato final declara `Promise<TripDestinationResponse>`.
- Antes de escribir, comprueba que el viaje pertenezca al usuario.
- Normaliza `arrivalDate` y `departureDate` a `Date | null`.
- Aplica la regla que exige que las fechas esten dentro del rango del viaje.
- El unico error actual de TypeScript es el retorno pendiente de la funcion.

## Microtarea actual: transaccion de creacion

Agregar dentro de `createTripDestination` una transaccion que:

- obtenga o cree el destino seleccionado usando `tx`;
- calcule la siguiente posicion del viaje usando el mismo `tx`;
- cree `TripDestination` con ambos identificadores, posicion, fechas y notas;
- incluya la relacion `destination` en el resultado de Prisma;
- guarde el resultado de la transaccion para mapearlo en el paso siguiente.

## Creacion transaccional de una parada completada

- `createTripDestination` verifica primero la propiedad del viaje y el rango
  de las fechas.
- La transaccion reutiliza o crea `Destination`, calcula la posicion y crea
  `TripDestination` usando el mismo cliente `tx`.
- La relacion se crea con el ID interno del destino, no con `providerId`.
- La consulta incluye `destination`, permitiendo que el mapper produzca la
  respuesta publica con fechas `YYYY-MM-DD`.
- La funcion devuelve `Promise<TripDestinationResponse>`.
- `npm run typecheck`, `npm run build`, `prisma validate` y
  `git diff --check` pasan.

## Endurecimiento considerado

Manejar el caso limite en que dos solicitudes simultaneas calculen la misma
posicion. La restriccion unica de Prisma protege los datos, pero el error
`P2002` debe convertirse en un conflicto HTTP controlado en lugar de llegar al
middleware como un error interno `500`.

## Conflicto concurrente aplazado

El tratamiento especifico de `P2002` se aplaza para no introducir ahora una
ramificacion dedicada a dos solicitudes simultaneas. La restriccion
`@@unique([tripId, position])` sigue protegiendo los datos, pero este caso raro
responderia temporalmente como error interno `500`. Queda registrado como
endurecimiento pendiente del endpoint.

## Endpoint para agregar una parada completado

- Se creo `trip-destination.controller.ts` en la feature responsable.
- El controlador exige autenticacion, valida `tripId` y el cuerpo por separado
  y delega la operacion al servicio.
- `POST /api/trips/:tripId/destinations` quedo registrado bajo `tripRouter`.
- La respuesta exitosa usa HTTP `201` y `{ data: { tripDestination } }`.
- TypeScript, build, Prisma y `git diff --check` pasan.
- Una prueba HTTP sin sesion confirmo que la ruta existe y responde `401` antes
  de procesar el cuerpo.

## Proximo paso

Verificar el caso exitoso con una sesion y un viaje reales. Despues se podra
crear la mutation de RTK Query que enviara el destino seleccionado desde el
detalle de un viaje.

## Microtarea actual: prueba HTTP autenticada

- Iniciar cliente y servidor e iniciar sesion desde la aplicacion.
- Elegir un viaje existente y conservar su UUID.
- Buscar un destino y reutilizar el objeto normalizado devuelto por la busqueda.
- Enviar `POST /api/trips/:tripId/destinations` con fechas dentro del viaje.
- Confirmar HTTP `201`, `data.tripDestination`, posicion `1` para la primera
  parada y el objeto `destination` anidado.

## Regla de estado faltante detectada

Antes de ejecutar la prueba exitosa se debe cerrar una regla de negocio que el
servicio aun no aplica: solo los viajes `PLANNING` o `CONFIRMED` aceptan cambios
en sus paradas. `COMPLETED` y `CANCELLED` conservan su itinerario para consulta,
pero quedan bloqueados para escritura.

## Tarea activa: bloquear paradas en viajes finalizados

- Incluir `status` en la consulta de `getOwnedTripOrThrow`.
- Comprobar el estado despues de obtener el viaje y antes de normalizar o
  persistir la parada.
- Lanzar HTTP `409` con un codigo de negocio especifico para viajes bloqueados.
- Verificar despues un caso permitido y los dos estados finales.

## Bloqueo de paradas por estado completado

- `getOwnedTripOrThrow` obtiene tambien el estado persistido del viaje.
- `assertTripAllowsDestinationChanges` permite solamente `PLANNING` y
  `CONFIRMED`.
- `COMPLETED` y `CANCELLED` producen HTTP `409` con el codigo
  `TRIP_DESTINATIONS_LOCKED` antes de iniciar la transaccion.
- `TripStatus` se importa como tipo desde el archivo de enums generado,
  siguiendo la convencion del servicio de viajes.
- TypeScript, build, Prisma y `git diff --check` pasan.

## Proximo paso

Ejecutar en Postman la prueba exitosa con un viaje editable y repetir la
peticion contra viajes `COMPLETED` y `CANCELLED` para comprobar el bloqueo.

## Prueba HTTP de creacion exitosa completada

- Una peticion autenticada creo una parada y devolvio la estructura
  `data.tripDestination` acordada.
- El viaje ya tenia dos paradas y el servicio asigno correctamente
  `position: 3`.
- Las fechas y notas omitidas se persistieron y serializaron como `null`.
- La respuesta incluyo el destino relacionado con sus IDs interno y externo.

## Proximo paso

Probar el mismo `POST` con viajes `CANCELLED` y `COMPLETED`, usando viajes de
prueba o ya finalizados para no cerrar de manera irreversible un viaje real.

## Pruebas de bloqueo por estado completadas

- Postman confirmo HTTP `409` y `TRIP_DESTINATIONS_LOCKED` para los estados
  finales.
- La validacion ocurre antes de la transaccion y no crea una parada.
- El flujo de creacion del backend queda verificado para exito y bloqueo por
  estado.

## Proximo paso

Crear `GET /api/trips/:tripId/destinations` para que el detalle de un viaje
pueda obtener sus paradas ordenadas. Primero se implementara solamente la
consulta del servicio; despues se conectaran controlador y ruta.

## Consulta de paradas en el servicio completada

- `listTripDestinations` comprueba primero que el viaje pertenezca al usuario.
- La consulta filtra por el ID autorizado y ordena por `position` ascendente.
- Cada fila incluye `destination`, como exige el mapper compartido.
- `map(toTripDestinationResponse)` transforma automaticamente cada parada del
  arreglo a su contrato HTTP.
- Los viajes finalizados pueden consultarse aunque no permitan escrituras.
- TypeScript, build, Prisma y `git diff --check` pasan.

## Proximo paso

Agregar al controlador la lectura de paradas y registrar
`GET /api/trips/:tripId/destinations` bajo `tripRouter`.

## Controlador para listar paradas completado

- `listTripDestinationsController` exige autenticacion y valida `tripId` con el
  esquema existente.
- Delega la consulta al servicio con `userId` y `tripId`.
- Responde HTTP `200` con `{ data: { tripDestinations } }`.
- Se corrigio la capitalizacion de `tripDestinations` para mantener el contrato
  camelCase esperado por el cliente.
- TypeScript, build y `git diff --check` pasan.

## Proximo paso

Registrar la ruta GET anidada en `trip.routes.ts` y verificarla mediante una
peticion autenticada.

## Endpoint para listar paradas completado

- `GET /api/trips/:tripId/destinations` quedo registrado bajo `tripRouter`.
- La ruta ejecuta `requireAuth` antes de
  `listTripDestinationsController`.
- TypeScript, build y `git diff --check` pasan.
- Una prueba sin sesion devolvio HTTP `401`, confirmando que Express reconoce
  la ruta y aplica la proteccion.

## Proximo paso

Probar el GET en Postman con una sesion activa y confirmar que el viaje usado
en la prueba anterior devuelve sus tres paradas ordenadas por `position`.

## Prueba autenticada de listado completada

- Postman confirmo HTTP `200` con `data.tripDestinations`.
- Las paradas del viaje se devolvieron ordenadas por `position` y con su objeto
  `destination` anidado.
- El flujo backend de crear y listar paradas queda verificado.

## Proximo paso

Crear en `client/src/features/trip-destinations/` los tipos definitivos de la
parada y de la respuesta de listado. Despues se definira la query de RTK Query
para `GET /api/trips/:tripId/destinations`.

## Tipos cliente de paradas completados

- `Destination` compone el resultado de busqueda con el ID interno persistido.
- `TripDestination` representa la parada, sus fechas y el destino anidado.
- `ListTripDestinationsResponse` coincide con
  `{ data: { tripDestinations } }`.
- Los archivos se movieron desde `server/src` a sus ubicaciones definitivas en
  `client/src`; tambien se corrigio `Respose` a `Response`.
- Build, lint y `git diff --check` pasan.

## Proximo paso

Crear `tripDestinationsApi.ts` e introducir la query de RTK Query para listar
las paradas de un viaje por su `tripId`.

## Microtarea actual: query de paradas por viaje

- Crear `client/src/features/trip-destinations/tripDestinationsApi.ts`.
- Inyectar `getTripDestinations` en el API slice compartido.
- Declarar `ListTripDestinationsResponse` como respuesta y `string` como
  argumento `tripId`.
- Construir `GET trips/:tripId/destinations`.
- Exportar `useGetTripDestinationsQuery`.
- No agregar todavia tags, mutation ni componentes.

## Query RTK Query de paradas completada

- `tripDestinationsApi.ts` inyecta `getTripDestinations` en el API slice
  compartido.
- La query recibe `tripId: string` y solicita
  `GET trips/:tripId/destinations`.
- Se exporta `useGetTripDestinationsQuery`.
- Se corrigio el callback de `endpoints`: ahora devuelve el objeto de
  definiciones en lugar de `void`.
- Build, lint y `git diff --check` pasan.

## Proximo paso

Crear el componente definitivo que consuma `useGetTripDestinationsQuery` y
represente carga inicial, error, lista vacia y lista ordenada antes de integrarlo
en `TripDetailPage`.

## Microtarea actual: seccion de paradas del viaje

- Crear `TripDestinationsSection.tsx` dentro de la feature
  `trip-destinations`.
- Recibir `tripId: string` y suscribirse con
  `useGetTripDestinationsQuery(tripId)`.
- Diferenciar carga inicial, error sin datos, actualizacion en segundo plano,
  error conservando cache, lista vacia y lista con datos.
- Usar un `ol` para expresar semanticamente el orden de las paradas.
- Mantener el vocabulario visual existente: superficies blancas, bordes slate,
  teal para acciones y estados semanticos accesibles.
- No integrar todavia el componente en `TripDetailPage`.

## Seccion de paradas creada

- `TripDestinationsSection` recibe `tripId` y consume la query tipada.
- Distingue carga inicial, error sin datos, actualizacion, error conservando
  cache, lista vacia y lista con datos.
- La lista usa `ol` y muestra posicion, destino, contexto geografico, fechas y
  notas.
- Las fechas se presentan con `Intl.DateTimeFormat` en `es-CO` y UTC para no
  desplazar el dia recibido como fecha de calendario.
- El skeleton respeta `prefers-reduced-motion` y los mensajes usan roles
  accesibles.
- Build, lint y `git diff --check` pasan.

## Proximo paso

Integrar `TripDestinationsSection` en `TripDetailPage` y verificar visualmente
los estados con el navegador.

## Seccion de paradas integrada

- `TripDetailPage` importa `TripDestinationsSection` y le entrega `trip.id`.
- La seccion aparece despues de las acciones de estado y antes de la zona de
  peligro, manteniendo la jerarquia de la pagina.
- Al montarse crea la suscripcion RTK Query independiente de la consulta del
  viaje.
- Build, lint y `git diff --check` pasan.
- La verificacion visual queda pendiente porque el navegador integrado no pudo
  conectarse durante esta sesion; no se detecto un error de la aplicacion.

## Proximo paso

Abrir un detalle de viaje en la sesion autenticada y revisar visualmente la
lista y el estado vacio. Despues se definira la mutation para agregar una
parada desde el cliente y su estrategia de invalidacion de cache.

## Microtarea actual: contrato cliente para crear una parada

- Ampliar `tripDestination.types.ts` con el cuerpo, argumento y respuesta de
  la mutation.
- El cuerpo recibira `DestinationSearchResult`, porque la ciudad seleccionada
  aun no tiene ID interno en el cliente.
- `tripId` permanecera fuera del cuerpo y servira para construir la URL.
- Fechas y notas aceptaran omision o `null`, igual que el contrato backend.
- La respuesta reutilizara `TripDestination`, que ya contiene el destino
  persistido.

## Contrato cliente de creacion completado

- `CreateTripDestinationBody` representa exclusivamente el JSON enviado al
  endpoint.
- El destino de entrada usa `DestinationSearchResult`: todavia no necesita el
  `id` interno que asigna la base de datos.
- `CreateTripDestinationRequest` separa `tripId`, usado en la URL, de `body`,
  usado como cuerpo de la peticion.
- `CreateTripDestinationResponse` representa la parada ya persistida y
  reutiliza `TripDestination`.
- `arrivalDate`, `departureDate` y `notes` pueden omitirse o enviarse como
  `null`, de acuerdo con el contrato del backend.
- Build, lint y `git diff --check` pasan.

## Proximo paso

Definir la etiqueta de cache `TripDestinations` y agregar la mutation de
creacion. La query proporcionara una etiqueta por `tripId`; una creacion
exitosa invalidara esa misma etiqueta para actualizar solamente la lista del
viaje afectado.
