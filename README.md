# Rural Assets API

This project is a backend API for managing rural producers and their properties. It is publicly available at:

https://rural-assets-api.onrender.com

## Features

- User registration and authentication (JWT)
- Role-based access control (STAFF/USER)
- Producer management (CRUD)
- Soft delete for all entities
- PostgreSQL integration (via DATABASE_URL)
- TypeORM migrations and soft delete support
- OpenAPI (Swagger) documentation
- Docker support

## How to run the project

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file with:

```
DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/<db>
SECRET=your_jwt_secret
```

### 3. Run migrations

```bash
npm run migration
```

### 4. Start the application

```bash
npm run start
```

The API will be available at http://localhost:3000

### 5. API Documentation

Access http://localhost:3000/api for Swagger documentation.

### 6. Docker (optional)

```bash
docker build -t rural-assets-api .
docker run -p 3000:3000 --env-file .env rural-assets-api
```

## Project Structure

- `src/` — Main source code
- `src/modules/` — Domain modules (e.g., producer, user)
- `src/core/` — Shared classes and utilities
- `src/db/` — Database configuration and migrations

## API Overview

### Producers

- `GET /producers` — List all producers for the authenticated user
- `POST /producers` — Create a new producer
- `PATCH /producers/:id` — Update the name of a producer
- `DELETE /producers/:id` — Soft delete a producer

### Users

- `POST /users` — Register a new user (STAFF only)
- `POST /users/login` — Authenticate and receive JWT

## License

MIT
