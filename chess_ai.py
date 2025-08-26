#!/usr/bin/env python3
"""
A command-line chess game using the python-chess and stockfish libraries.
The user plays as white against a strong Stockfish engine. You need to have
python-chess and stockfish installed and provide the path to the Stockfish engine.
"""

import sys
import random
try:
    import chess
    import chess.engine
except ImportError:
    print("This program requires the 'python-chess' library. Please install it with pip install python-chess.")
    sys.exit(1)

def main():
    # Determine path to stockfish engine or fallback to random AI
    engine_path = "stockfish"  # Set to your engine path if necessary
    engine = None
    try:
        engine = chess.engine.SimpleEngine.popen_uci(engine_path)
    except Exception:
        print("Stockfish engine not found or cannot be started. Falling back to random moves.")
        engine = None

    board = chess.Board()
    while not board.is_game_over():
        # Display the board
        print(board)
        print()

        # Prompt human to enter a move in algebraic notation (e.g., e4, Nf3)
        human_move = input("Your move: ")
        try:
            board.push_san(human_move)
        except ValueError:
            print("Invalid move. Please try again.")
            continue

        # Stop if game is over after human move
        if board.is_game_over():
            break

        print()
        # Engine or random selects move for black
        if engine:
            result = engine.play(board, chess.engine.Limit(time=0.1))
            ai_move = result.move
        else:
            ai_move = random.choice(list(board.legal_moves))

        board.push(ai_move)
        print(f"AI plays: {board.san(ai_move)}")
        print()

    # Game over
    print(board)
    print("Game over:", board.result())
    if engine:
        engine.quit()

if __name__ == "__main__":
    main()
