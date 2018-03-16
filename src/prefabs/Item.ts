import { Game } from '../states/Game';
import { Board } from './Board';

interface IItemData {
  asset: string;
  attack: number;
  col: number;
  defense: number;
  gold: number;
  health: number;
  row: number;
  type: string;
}

export class Item extends Phaser.Sprite {
  public data: IItemData;
  private board: Board;
  private state: Game;

  constructor(state: Game, data: IItemData) {
    const position = state.board.getXYFromRowCol(data);

    super(state.game, position.x, position.y, data.asset);

    this.state = state;
    this.data = data;
    this.board = state.board;

    this.anchor.setTo(0.5);

    this.inputEnabled = true;
    this.events.onInputDown.add(this.collect, this);
  }

  private collect() {
    if (this.data.type === 'consumable') {
      this.state.playerStats.health += this.data.health;
      this.state.playerStats.attack += this.data.attack;
      this.state.playerStats.defense += this.data.defense;
      this.state.playerStats.gold += this.data.gold;

      this.state.refreshStats();

      this.kill();
    }
  }
}
