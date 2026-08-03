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

## Cliente

El archivo local debe crearse en `client/.env`. Este archivo está excluido de
Git mediante `client/.gitignore`.

Variables disponibles:

| Variable | Descripción | Valor de desarrollo |
| --- | --- | --- |
| `VITE_API_URL` | URL base pública utilizada por el cliente para comunicarse con el backend. | `http://localhost:4000/api/` |

Configuración local actual:

```env
VITE_API_URL=http://localhost:4000/api/
```

Las variables cuyo nombre comienza con `VITE_` pueden quedar incluidas en el
código que recibe el navegador y nunca deben contener secretos. Después de
modificar `client/.env`, se debe reiniciar Vite para cargar el nuevo valor.
