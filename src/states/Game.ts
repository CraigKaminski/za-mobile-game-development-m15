import { Board } from '../prefabs/Board';

interface IGameData {
  currentLevel?: number;
  playerStats?: IPlayserStats;
}

interface IPlayserStats {
  attack: number;
  defense: number;
  gold: number;
  hasKey: boolean;
  health: number;
}

export class Game extends Phaser.State {
  public backgroundTiles: Phaser.Group;
  public board: Board;
  public currentLevel: number;
  public playerStats: IPlayserStats;
  public readonly Cols = 6;
  public readonly Rows = 8;
  public readonly TileSize = 60;

  public init(data: IGameData) {
    data = data || {};
    this.currentLevel = data.currentLevel || 1;

    this.playerStats = data.playerStats || {
      attack: 2,
      defense: 1,
      gold: 0,
      hasKey: false,
      health: 25,
    };
  }

  public create() {
    this.backgroundTiles = this.add.group();

    this.board = new Board(this, {
      cols: this.Cols,
      rows: this.Rows,
      tileSize: this.TileSize,
    });
  }

  public gameOver() {
    this.state.start('Game');
  }

  public nextLevel() {
    this.state.start('Game', true, false, {
      currentLevel: this.currentLevel + 1,
      playerStats: this.playerStats,
    });
  }
}
