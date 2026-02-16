const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;
const GAMES_FILE = path.join(__dirname, 'games.json');
const MAX_GAMES = 1000;

app.use(cors());
app.use(express.json({ limit: '5mb' }));

// Serve static files (chess game) from parent directory
app.use(express.static(path.join(__dirname, '..')));

function loadGames() {
  try {
    const data = fs.readFileSync(GAMES_FILE, 'utf8');
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
}

function saveGames(games) {
  fs.writeFileSync(GAMES_FILE, JSON.stringify(games), 'utf8');
}

// POST /api/games - receive a new game from a player
app.post('/api/games', (req, res) => {
  try {
    const { positions, outcome, userId } = req.body;
    if (!positions || !Array.isArray(positions) || positions.length === 0) {
      return res.status(400).json({ error: 'Invalid game data' });
    }
    const games = loadGames();
    games.push({ positions, outcome, userId: userId || null });
    while (games.length > MAX_GAMES) games.shift();
    saveGames(games);
    res.json({ ok: true, totalGames: games.length });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/games - return games for training (optional ?userId=xxx for specific user)
app.get('/api/games', (req, res) => {
  try {
    let games = loadGames();
    const userId = req.query.userId;
    if (userId) {
      games = games.filter(g => g.userId === userId);
    }
    res.json({ games });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Chess AI server running at http://localhost:${PORT}`);
  console.log(`  - Game: http://localhost:${PORT}/index.html`);
  console.log(`  - API:  http://localhost:${PORT}/api/games`);
});
