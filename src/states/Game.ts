import { Board } from '../prefabs/Board';
import { Item } from '../prefabs/Item';

export interface IGameBaseData {
  coefs: {
    enemyOccupation: number;
    enemyVariation: number;
    itemOccupation: number;
    itemVariation: number;
    levelIncrement: number;
  };
  enemyTypes: Array<{
    asset: string;
    attack: number;
    defense: number;
    gold: number;
    health: number;
  }>;
  itemTypes: Array<{
    asset: string;
    health: number;
    type: string;
  }>;
}

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
  public attackIcon: Phaser.Sprite;
  public attackLabel: Phaser.Text;
  public backgroundTiles: Phaser.Group;
  public board: Board;
  public charImage: Phaser.Sprite;
  public currentLevel: number;
  public defenseIcon: Phaser.Sprite;
  public defenseLabel: Phaser.Text;
  public goldIcon: Phaser.Sprite;
  public goldLabel: Phaser.Text;
  public healthIcon: Phaser.Sprite;
  public healthLabel: Phaser.Text;
  public levelData: IGameBaseData;
  public levelLabel: Phaser.Text;
  public mapElements: Phaser.Group;
  public panel: Phaser.Sprite;
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

    this.levelData = JSON.parse(this.cache.getText('gameBaseData'));

    this.board = new Board(this, {
      cols: this.Cols,
      levelData: this.levelData,
      rows: this.Rows,
      tileSize: this.TileSize,
    });

    this.board.initLevel();

    this.initGui();
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

  public refreshStats() {
    this.healthLabel.text = Math.ceil(this.playerStats.health).toString();
    this.attackLabel.text = Math.ceil(this.playerStats.attack).toString();
    this.defenseLabel.text = Math.ceil(this.playerStats.defense).toString();
    this.goldLabel.text = Math.ceil(this.playerStats.gold).toString();

    this.levelLabel.text = 'Floor ' + this.currentLevel;
  }

  private initGui() {
    const y = this.TileSize * this.Rows;

    const bitmapRect = this.add.bitmapData(this.game.width, this.game.height - y);
    bitmapRect.ctx.fillStyle = '#000058';
    bitmapRect.ctx.fillRect(0, 0, this.game.width, this.game.height - y);

    this.panel = this.add.sprite(0, y, bitmapRect);

    const style = {
      align: 'left',
      fill: '#fff',
      font: '16px Prstart',
    };

    this.healthIcon = this.add.sprite(this.game.width - 110, y - 10 + this.TileSize / 2, 'heart');
    this.healthLabel = this.add.text(this.game.width - 70, y - 10 + this.TileSize / 2 + 5, '', style);

    this.attackIcon = this.add.sprite(this.game.width - 110, y - 10 + 2 * this.TileSize / 2, 'attack');
    this.attackLabel = this.add.text(this.game.width - 70, y - 10 + 2 * this.TileSize / 2 + 5, '', style);

    this.defenseIcon = this.add.sprite(this.game.width - 110, y - 10 + 3 * this.TileSize / 2, 'defense');
    this.defenseLabel = this.add.text(this.game.width - 70, y - 10 + 3 * this.TileSize / 2 + 5, '', style);

    this.goldIcon = this.add.sprite(this.game.width - 110, y - 10 + 4 * this.TileSize / 2, 'gold');
    this.goldLabel = this.add.text(this.game.width - 70, y - 10 + 4 * this.TileSize / 2 + 5, '', style);

    this.charImage = this.add.sprite(30, y + 16, 'profile');

    style.font = '10px Prstart';

    this.levelLabel = this.add.text(45, this.game.height - this.TileSize / 2, '', style);

    this.refreshStats();
  }
}
