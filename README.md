# CSIT342 Laboratory Activity

React and Spring Boot authentication application with a MySQL database.

## Requirements

Install the following before running the application:

- Java 17 or later
- Node.js 18 or later and npm
- XAMPP or MySQL workbench
- Docker Desktop with Docker Compose (optional)

## Project Structure

- `frontend/` - React, TypeScript, and Vite application
- `backend/` - Spring Boot REST API
- `docker-compose.yml` - MySQL database container

## Run With Docker Compose and Local Development

### 1. Start MySQL (compose file)

From the repository root, run:

```powershell
docker compose up -d mysql
```

The database is available at `localhost:3307` with these development credentials:

- Database: `UserAccount`
- Username: `L23Y19W43`
- Password: `midnightsin12`

### 2. Run the backend

Open a second terminal and run:

```powershell
Set-Location backend
.\mvnw.cmd spring-boot:run
```

On Linux or macOS, use:

```bash
cd backend
./mvnw spring-boot:run
```

The API starts at `http://localhost:8080`.

### 3. Run the frontend

Open a third terminal and run:

```powershell
Set-Location frontend
npm install
npm run dev
```

On Linux or macOS, use:

```bash
cd frontend
npm install
npm run dev
```

Open the URL printed by Vite, normally `http://localhost:5173`.
