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

