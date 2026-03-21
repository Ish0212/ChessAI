/**
 * Stockfish analyzer - evaluates chess positions via UCI
 */
const { spawn } = require('child_process');
const path = require('path');
const readline = require('readline');

let proc = null;
let rl = null;
let ready = false;

function initEngine() {
  if (proc && !proc.killed) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const sfPath = path.join(__dirname, 'node_modules', 'stockfish', 'bin', 'stockfish-18-lite-single.js');
    proc = spawn(process.execPath, [sfPath], { stdio: ['pipe', 'pipe', 'pipe'] });
    proc.stderr.on('data', () => {});
    rl = readline.createInterface({ input: proc.stdout, crlfDelay: Infinity });
    rl.on('line', (line) => {
      if (line === 'readyok') ready = true;
    });
    proc.stdin.write('uci\n');
    proc.stdin.write('isready\n');
    const waitReady = () => {
      if (ready) resolve();
      else setTimeout(waitReady, 50);
    };
    setTimeout(waitReady, 500);
  });
}

function analyzeFen(fen) {
  return new Promise((resolve) => {
    let lastScore = 0.5;
    const handler = (line) => {
      const cpMatch = line.match(/score cp (-?\d+)/);
      const mateMatch = line.match(/score mate (-?\d+)/);
      if (cpMatch) lastScore = 1 / (1 + Math.exp(-parseInt(cpMatch[1], 10) / 400));
      else if (mateMatch) lastScore = parseInt(mateMatch[1], 10) > 0 ? 0.95 : 0.05;
      if (line.startsWith('bestmove')) {
        rl.removeListener('line', handler);
        resolve(lastScore);
      }
    };
    rl.on('line', handler);
    proc.stdin.write('ucinewgame\n');
    proc.stdin.write('position fen ' + fen + '\n');
    proc.stdin.write('go depth 5\n');
    setTimeout(() => {
      rl.removeListener('line', handler);
      resolve(lastScore);
    }, 3500);
  });
}

async function analyzePositions(fens) {
  await initEngine();
  const results = [];
  for (let i = 0; i < fens.length; i++) {
    const score = await analyzeFen(fens[i]);
    results.push(score);
  }
  return results;
}

module.exports = { analyzeFen, analyzePositions };
