# Redux Travel Planner

Planificador de viajes full-stack creado para demostrar Redux Toolkit, RTK
Query y una arquitectura con React, Express y PostgreSQL.

## Funcionalidades

- Autenticación con JWT en cookie `httpOnly`.
- Gestión de viajes, estados, paradas y destinos externos.
- Mapas con marcadores, popups y selección de paradas.
- Actividades generales o asociadas a destinos, agrupadas por día local.
- Presupuesto estimado y real organizado por categorías.
- Formularios con React Hook Form y Zod; caché sincronizada con RTK Query.

## Tecnologías

**Frontend:** React, TypeScript, Vite, Redux Toolkit, RTK Query, React Router,
React Hook Form, Zod, Tailwind CSS y React Leaflet.

**Backend:** Node.js, Express, TypeScript, Prisma, PostgreSQL y JWT.

## Ejecución local

Configura `server/.env` y `client/.env` siguiendo
[`docs/ENVIRONMENT.md`](docs/ENVIRONMENT.md).

```bash
cd server
npm install
npx prisma migrate dev
npx prisma generate
npm run dev
```

En otra terminal:

```bash
cd client
npm install
npm run dev
```

Cliente: `http://localhost:5173` · API: `http://localhost:4000/api`

## Estado

Alcance funcional finalizado. Clima, métricas avanzadas y edición visual de
partidas presupuestarias quedan como mejoras futuras.

Las decisiones técnicas, el modelo de datos y el historial del proyecto están
en [`docs/`](docs/).
