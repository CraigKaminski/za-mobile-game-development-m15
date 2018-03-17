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
  private board: Board;
  private state: Game;

  constructor(state: Game, data: IEnemyData) {
    const position = state.board.getXYFromRowCol(data);

    super(state.game, position.x, position.y, data.asset);

    this.state = state;
    this.data = data;
    this.data.type = 'enemy';
    this.board = state.board;

    this.anchor.setTo(0.5);
  }
}
