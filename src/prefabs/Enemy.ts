import { Game } from '../states/Game';
import { Board } from './Board';

interface IEnemyData {
  asset: string;
  attack: number;
  col: number;
  defense: number;
  gold: number;
  health: number;
  row: number;
  type: string;
}

export class Enemy extends Phaser.Sprite {
  public data: IEnemyData;
  private attackIcon: Phaser.Sprite;
  private attackLabel: Phaser.Text;
  private board: Board;
  private defenseIcon: Phaser.Sprite;
  private defenseLabel: Phaser.Text;
  private healthIcon: Phaser.Sprite;
  private healthLabel: Phaser.Text;
  private panel: Phaser.Sprite;
  private state: Game;

  constructor(state: Game, data: IEnemyData) {
    const position = state.board.getXYFromRowCol(data);

    super(state.game, position.x, position.y, data.asset);

    this.state = state;
    this.data = data;
    this.data.type = 'enemy';
    this.board = state.board;

    this.anchor.setTo(0.5);

    const x = 0;
    const y = -4;

    const bitmapRect = this.game.add.bitmapData(28, 32);
    bitmapRect.ctx.fillStyle = '#0000FF';
    bitmapRect.ctx.fillRect(0, 0, 28, 32);

    this.panel = new Phaser.Sprite(this.game, x - 2, y - 2, bitmapRect);
    this.panel.alpha = 0.6;
    this.addChild(this.panel);

    const style = {
      align: 'left',
      fill: '#fff',
      font: '7px Prstart',
    };

    this.healthIcon = new Phaser.Sprite(this.game, x, y, 'heart');
    this.healthIcon.scale.setTo(0.3);
    this.addChild(this.healthIcon);

    this.healthLabel = new Phaser.Text(this.game, x + 10, y, '', style);
    this.addChild(this.healthLabel);

    this.attackIcon = new Phaser.Sprite(this.game, x, y + 10, 'attack');
    this.attackIcon.scale.setTo(0.3);
    this.addChild(this.attackIcon);

    this.attackLabel = new Phaser.Text(this.game, x + 10, y + 10, '', style);
    this.addChild(this.attackLabel);

    this.defenseIcon = new Phaser.Sprite(this.game, x, y + 20, 'shield');
    this.defenseIcon.scale.setTo(0.3);
    this.addChild(this.defenseIcon);

    this.defenseLabel = new Phaser.Text(this.game, x + 10, y + 20, '', style);
    this.addChild(this.defenseLabel);

    this.refreshStats();
  }

  public refreshStats() {
    this.healthLabel.text = Math.ceil(this.data.health).toString();
    this.attackLabel.text = Math.ceil(this.data.attack).toString();
    this.defenseLabel.text = Math.ceil(this.data.defense).toString();
  }
}
