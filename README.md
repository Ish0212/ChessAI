# Chess AI Game

This repository contains a **fully playable chess game with an AI opponent** that **learns from everyone's games**. It runs in the browser and can sync with a global server so the AI improves as all players play.

## Quick Start (with global sync)

```bash
cd server
npm install
npm start
```

Then open **http://localhost:3001/index.html** — games sync globally and the AI improves as everyone plays!

## Features

- Responsive 8x8 chess board with light and dark squares and Unicode piece icons.
- Supports all standard chess rules: pawn movement, double steps, en‑passant, pawn promotion, castling, check and checkmate detection.
- Play as White against a simple AI that plays as Black.
- **Machine learning**: The AI uses a neural network (TensorFlow.js) that learns from your games. After each game, it trains on the positions and outcomes, so the AI adapts to your play style over time.
- The AI combines minimax search with both a static evaluation function and a learned evaluation from the neural network.

## Getting Started

1. Clone or download this repository.
2. Open `index.html` in your web browser (double‑click the file or open it via `File → Open` in the browser).
3. The chess board will appear. Click a piece to select it, then click a destination square to move. When your move is complete, the AI will automatically respond.

No installation or build step is required. The game logic and AI are contained directly in the HTML file.

## Todo List

See [TODO.md](TODO.md) for planned features and improvements.

## Files

- `index.html` – The main file containing the game board, styles, and JavaScript logic for move generation, rule enforcement, and the AI.
- `chess_ai.py` – A previous command‑line Python prototype that is kept in the repository for reference. It is not required to play the web version.

## Extending the AI

The included AI is intentionally lightweight. To experiment with stronger play, you could replace the evaluation function or increase the search depth. Alternatively, you can integrate a WebAssembly build of a stronger engine (e.g. Stockfish) and send moves via the UCI protocol.

## License

This project is provided for educational purposes. Feel free to fork it and build your own improvements!
