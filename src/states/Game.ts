import { Board } from '../prefabs/Board';
import { Item } from '../prefabs/Item';

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
  public mapElements: Phaser.Group;
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

    this.mapElements = this.add.group();

    this.board = new Board(this, {
      cols: this.Cols,
      rows: this.Rows,
      tileSize: this.TileSize,
    });

    const item = new Item(this, {
      asset: 'sword',
      attack: 0,
      col: 2,
      defense: 1,
      gold: 10,
      health: 10,
      row: 3,
      type: 'consumable',
    });

    this.mapElements.add(item);
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
