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
