# Base image for building Next.js app
FROM node:20 AS builder

# Set working directory
WORKDIR /app

# Copy package files separately for better caching
COPY package.json package-lock.json ./

# Install dependencies including devDependencies for build
RUN npm ci

# Copy entire project files
COPY . .

# Ensure Tailwind CSS is installed
RUN npm install tailwindcss postcss autoprefixer
# Build the Next.js application
RUN npm run build

# ---- Production Image ----
FROM node:20 AS runner

# Set working directory
WORKDIR /app

# Copy only necessary files from builder stage
COPY --from=builder /app/.next .next
COPY --from=builder /app/node_modules node_modules
COPY --from=builder /app/public public
COPY --from=builder /app/package.json ./

# Expose the port Next.js runs on
EXPOSE 3000

# Set production environment
ENV NODE_ENV=production
# Start the Next.js application
CMD ["node", "node_modules/next/dist/bin/next", "start"]
