# NestJS Minimal API

## Purpose
This project is a minimal, production-ready NestJS API template for rapid backend development. It features:
- User registration and authentication (with JWT)
- Role-based access control (STAFF/USER)
- PostgreSQL integration (external, via DATABASE_URL)
- TypeORM migrations
- OpenAPI (Swagger) documentation (auto-generated)
- Docker support for easy deployment

## Requirements
- Node.js 22.14
- npm
- Docker (optional, for containerized runs)
- External PostgreSQL database (see `.env`)

## Getting Started

### 1. Clone the repository
```bash
git clone <repo-url>
cd nestjs-minimal
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Edit the `.env` file with your PostgreSQL connection string and secret:
```
DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/<db>
SECRET=your_jwt_secret
```

### 4. Run database migrations
```bash
npm run migration
```

### 5. Start the application
```bash
npm run start
```
The API will be available at http://localhost:3000

### 6. Access API documentation
Open http://localhost:3000/api for Swagger UI (interactive docs).
The OpenAPI YAML is auto-generated at `openapi.yaml`.

## Running with Docker

1. Build the Docker image:
```bash
docker build -t nestjs-app .
```
2. Run the container:
```bash
docker run -p 3000:3000 --env-file .env nestjs-app
```

## API Overview

### User Registration (STAFF only)
- `POST /users` — Register a new user (requires STAFF JWT)

### User Login
- `POST /users/login` — Authenticate and receive JWT

## Migrations
To run migrations manually:
```bash
npm run migration
```

## Project Structure
- `src/` — Main source code
- `src/modules/user/` — User module (controller, service, DTOs, guards)
- `src/core/` — Shared base classes
- `src/db/` — Database config and migrations

## License
MIT
