# Chess AI Server

Backend for global game storage. Games from all players are synced here and used to train the AI.

## Setup

```bash
cd server
npm install
npm start
```

The server runs at **http://localhost:3001**

- **Game**: http://localhost:3001/index.html
- **API**: http://localhost:3001/api/games

## API

- **POST /api/games** – Submit a game `{ positions: [...], outcome: 1|-1|0 }`
- **GET /api/games** – Get all games for training `{ games: [...] }`

## Deployment

For 24/7 hosting, deploy to Railway, Render, or Fly.io:

1. Set `PORT` environment variable (most hosts set this automatically)
2. Deploy the `server` folder
3. Update `API_BASE` in `index.html` to your server URL (e.g. `https://your-app.railway.app`)
4. Deploy the frontend (index.html) to the same domain or configure CORS
