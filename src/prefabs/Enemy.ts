import { Board } from './Board';
import { Game } from '../states/Game';

interface IEnemyData {
  asset: string;
}

export class Enemy extends Phaser.Sprite {
  public data: IEnemyData;
  private board: Board;
  private state: Game;

  constructor(state: Game, data: IEnemyData) {
    const position = {
      x: 10,
      y: 10,
    };

    super(state.game, position.x, position.y, data.asset);

    this.state = state;
    this.data = data;
    this.board = state.board;

    this.anchor.setTo(0.5);
  }
}
