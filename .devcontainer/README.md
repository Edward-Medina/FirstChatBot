# Dev Container Setup

This project includes a development container configuration for VS Code.

## Prerequisites

- Docker installed on your system
- VS Code with the "Dev Containers" extension installed
- Your OpenAI API key configured

## Getting Started

### Option 1: Using VS Code Dev Containers (Recommended)

1. Install the "Dev Containers" extension in VS Code
2. Open the project folder in VS Code
3. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
4. Type "Dev Containers: Reopen in Container"
5. Select it and wait for the container to build and start

### Option 2: Using Docker Compose

```bash
docker-compose -f .devcontainer/docker-compose.yml up -d
```

## Running the Application in Dev Container

Once inside the dev container, you have multiple options:

### Terminal 1 - Backend Server
```bash
cd backend
npm run dev
```

### Terminal 2 - Frontend Server
```bash
cd frontend
npm run dev
```

## Environment Variables

Make sure your `.env` file in the `backend/` directory contains your OpenAI API key:

```env
OPENAI_API_KEY=your_api_key_here
PORT=5000
```

## Port Mapping

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000

These ports are automatically forwarded from the container.

## VS Code Extensions

The dev container automatically installs these extensions:
- ES7+React/Redux/React-Native snippets
- Prettier - Code formatter
- ESLint
- Thunder Client (for API testing)
- REST Client

## Stopping the Container

### If using VS Code Dev Containers:
- Click the green dev container indicator in the bottom left
- Select "Reopen Folder Locally"

### If using Docker Compose:
```bash
docker-compose -f .devcontainer/docker-compose.yml down
```

## Rebuilding the Container

If you make changes to the Dockerfile or devcontainer.json:

### VS Code:
- Press `Ctrl+Shift+P`
- Type "Dev Containers: Rebuild Container"

### Docker Compose:
```bash
docker-compose -f .devcontainer/docker-compose.yml build --no-cache
docker-compose -f .devcontainer/docker-compose.yml up -d
```

## Troubleshooting

**Problem**: Ports already in use
- Solution: Change the port mappings in `docker-compose.yml`

**Problem**: Docker not found
- Solution: Install Docker Desktop from https://www.docker.com/products/docker-desktop

**Problem**: OpenAI API key not working
- Solution: Check your `.env` file in the backend folder

## Tips

- The container mounts your local code, so changes are reflected immediately
- Dependencies are installed in the container's node_modules
- SSH keys are passed through from your host machine for Git operations
