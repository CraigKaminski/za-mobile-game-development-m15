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
      }
    }
  }
}
