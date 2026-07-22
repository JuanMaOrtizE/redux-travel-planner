# Roadmap

## Fase 0 — Setup y documentación

- Crear proyecto con Vite React TypeScript.
- Crear documentación inicial.
- Crear reglas de trabajo en `AGENTS.md`.
- Registrar conocimientos previos del estudiante.
- Registrar Tailwind como sistema principal de estilos.

Resultado: base lista para comenzar tareas guiadas.

## Fase 1 — Limpieza de Vite y primera UI estática

- Revisar estructura generada por Vite.
- Limpiar demo inicial.
- Crear una pantalla estática de bienvenida.
- Usar Tailwind CSS para estilos iniciales.
- No usar Redux todavía.

Resultado: primera vista propia sin estado global.

## Fase 2 — Redux Toolkit básico

- Instalar Redux Toolkit y React Redux.
- Crear `store`.
- Conectar `Provider`.
- Crear primer slice de UI.
- Practicar `dispatch`, `reducers`, `actions` y `selectors`.
- Explicar Redux comparándolo con `useState`, `useReducer` y Context API.

Resultado: Redux funcionando con un caso simple y entendido.

## Fase 3 — Rutas y layout

- Instalar React Router.
- Crear layout principal.
- Crear páginas base: dashboard, viajes, detalle, login.
- Mantener estilos con Tailwind.

Resultado: app navegable.

## Fase 4 — Backend Express base

- Crear servidor Express.
- Crear endpoint de salud.
- Configurar CORS, dotenv y estructura de rutas.

Resultado: backend local conectado conceptualmente al frontend.

## Fase 5 — Base de datos y auth simple

- Configurar Prisma y PostgreSQL.
- Crear modelo de usuario.
- Implementar registro, login, logout y sesión actual.

Resultado: usuarios autenticados para guardar viajes.

## Fase 6 — Viajes con RTK Query

- Crear modelo `Trip`.
- Crear endpoints CRUD.
- Crear API slice con RTK Query.
- Mostrar loading, error y datos.
- Explicar cache, invalidación y hooks generados.

Resultado: primer flujo real con backend y cache.

## Fase 7 — Formularios profesionales

- Instalar React Hook Form y Zod.
- Crear formulario de viaje.
- Validar datos en frontend y backend.
- Comparar contra formularios controlados manuales ya conocidos.

Resultado: formularios más profesionales y mantenibles.

## Fase 8 — Destinos y API externa

- Integrar Open-Meteo Geocoding desde backend.
- Buscar ciudades.
- Guardar latitud, longitud, país y nombre.
- Explicar consumo de API externa y normalización.

Resultado: datos externos integrados de forma controlada.

## Fase 9 — Mapas, marcadores y popups

- Instalar React Leaflet.
- Mostrar mapa.
- Renderizar marcadores por destino.
- Mostrar popup con resumen del destino.

Resultado: experiencia visual más profesional.

## Fase 10 — Itinerario, presupuesto y clima

- Agregar actividades por día.
- Agregar presupuesto.
- Consultar clima desde Open-Meteo.
- Mostrar métricas derivadas.

Resultado: planificación de viaje completa.

## Fase 11 — Pulido portfolio

- Mejorar UI/UX con Tailwind.
- Usar skills de UI/UX si aportan valor al diseño.
- Agregar skeletons y estados vacíos.
- Revisar responsive.
- Completar README.
- Preparar datos demo.

Resultado: versión presentable para portfolio.

