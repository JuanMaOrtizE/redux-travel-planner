# Variables de entorno

Este proyecto documenta sus variables de entorno en este archivo y no utiliza
un archivo `.env.example`.

## Servidor

El archivo local debe crearse en `server/.env`. Este archivo está excluido de
Git mediante `server/.gitignore`.

Variables disponibles:

| Variable | Descripción | Valor de desarrollo |
| --- | --- | --- |
| `PORT` | Puerto HTTP en el que escucha el servidor Express. | `4000` |
| `CLIENT_URL` | Origen del cliente autorizado para comunicarse con la API. | `http://localhost:5173` |
| `DATABASE_URL` | Conexión privada a PostgreSQL utilizada por Prisma. | Configuración local |
| `JWT_SECRET` | Secreto privado usado para firmar y verificar tokens. | Generado localmente |
| `NODE_ENV` | Entorno de ejecución del servidor. | `development` |

Configuración local actual:

```env
PORT=4000
CLIENT_URL=http://localhost:5173
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/redux_travel_planner?schema=public"
JWT_SECRET=GENERATED_PRIVATE_SECRET
NODE_ENV=development
```

Cuando se agregue una variable nueva al servidor, debe documentarse aquí en la
misma tarea en que se incorpora al código.
