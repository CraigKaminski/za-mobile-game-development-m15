import { Game } from '../states/Game';

interface IBoardData {
  cols: number;
  rows: number;
  tileSize: number;
}

export class Board {
  public cols: number;
  public numCells: number;
  public rows: number;
  public tileSize: number;
  private game: Phaser.Game;
  private state: Game;

  constructor(state: Game, data: IBoardData) {
    this.state = state;
    this.game = state.game;
    this.rows = data.rows;
    this.cols = data.cols;
    this.numCells = this.rows * this.cols;
    this.tileSize = data.tileSize;

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        const tile = new Phaser.Sprite(this.game, j * this.tileSize, i * this.tileSize, 'rockTile');
        tile.data.row = i;
        tile.data.col = j;
        this.state.backgroundTiles.add(tile);
        tile.inputEnabled = true;
        tile.events.onInputDown.add((targetTile: Phaser.Sprite) => {
          targetTile.alpha = 0.5;
          console.log(`row: ${targetTile.data.row} col: ${targetTile.data.col}`);
          console.log(this.getSurrounding(targetTile));
        }, this);
      }
    }
  }

  public getSurrounding(tile: Phaser.Sprite) {
    const adjacentTiles: Array<{ row: number; col: number }> = [];
    const relativePositions: Array<{ r: number; c: number }> = [
      { r: 1, c: -1 },
      { r: 1, c: 0 },
      { r: 1, c: 1 },
      { r: 0, c: -1 },
      { r: 0, c: 1 },
      { r: -1, c: -1 },
      { r: -1, c: 0 },
      { r: -1, c: 1 },
    ];

    relativePositions.forEach((relPos) => {
      const relRow = tile.data.row + relPos.r;
      const relCol = tile.data.col + relPos.c;

      if (relRow >= 0 && relRow < this.rows && relCol >= 0 && relCol < this.cols) {
        adjacentTiles.push({ row: relRow, col: relCol });
      }
    });

    return adjacentTiles;
  }

  public getXYFromRowCol(cell: { col: number; row: number }) {
    return {
      x: cell.col * this.tileSize + this.tileSize / 2,
      y: cell.row * this.tileSize + this.tileSize / 2,
    };
  }
}
