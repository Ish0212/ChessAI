# Chess AI Game

This repository contains a **fully playable chess game with an AI opponent**. It is implemented entirely in HTML, CSS, and JavaScript so it runs in any modern web browser without additional dependencies.

## Features

- Responsive 8x8 chess board with light and dark squares and Unicode piece icons.
- Supports all standard chess rules: pawn movement, double steps, en‑passant, pawn promotion, castling, check and checkmate detection.
- Play as White against a simple AI that plays as Black.
- The AI uses a minimax search with a basic evaluation function to choose moves. It is not as strong as engines like Stockfish but demonstrates the concepts behind computer chess.

## Getting Started

1. Clone or download this repository.
2. Open `index.html` in your web browser (double‑click the file or open it via `File → Open` in the browser).
3. The chess board will appear. Click a piece to select it, then click a destination square to move. When your move is complete, the AI will automatically respond.

No installation or build step is required. The game logic and AI are contained directly in the HTML file.

## Files

- `index.html` – The main file containing the game board, styles, and JavaScript logic for move generation, rule enforcement, and the AI.
- `chess_ai.py` – A previous command‑line Python prototype that is kept in the repository for reference. It is not required to play the web version.

## Extending the AI

The included AI is intentionally lightweight. To experiment with stronger play, you could replace the evaluation function or increase the search depth. Alternatively, you can integrate a WebAssembly build of a stronger engine (e.g. Stockfish) and send moves via the UCI protocol.

## License

This project is provided for educational purposes. Feel free to fork it and build your own improvements!
