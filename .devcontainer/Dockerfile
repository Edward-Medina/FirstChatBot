FROM mcr.microsoft.com/devcontainers/javascript-node:1-20-bullseye

# Install additional tools
RUN apt-get update && apt-get install -y \
    curl \
    git \
    nano \
    && rm -rf /var/lib/apt/lists/*

# Update npm to latest version
RUN npm install -g npm@latest

# Create workspace directory
WORKDIR /workspace

# Copy package files
COPY backend/package*.json ./backend/
COPY frontend/package*.json ./frontend/

# Install dependencies
RUN cd backend && npm install && cd ..
RUN cd frontend && npm install && cd ..

# Default command
CMD ["/bin/bash"]
