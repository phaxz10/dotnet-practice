# Simple full-stack record manager built with React, Vite, and a .NET Minimal API.

## Project Structure

- `client` - React frontend
- `api` - C# Minimal API backend
- `release` - generated runnable build output

## Development

Run the frontend and backend separately during development.

- Frontend: run `npm run dev` inside `client`
- Backend: run `dotnet run` inside `api`

The API runs on `http://localhost:4000`.

## Release Build

Build a runnable release package from the repo root:

```bash
npm run build
```

This will:

- build the React app into `client/dist`
- publish the .NET API into `release/api`
- copy the frontend build into the release package
- generate `release/package.json` with a start script

## Run the Release Build

From the repo root:

```bash
npm run start
```

Or manually:

```bash
cd release
pnpm start
```

The release app serves both frontend and backend from the .NET app on `http://localhost:4000`.
