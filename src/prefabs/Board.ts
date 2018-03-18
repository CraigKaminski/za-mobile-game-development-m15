import { Game, IGameBaseData } from '../states/Game';
import { Enemy } from './Enemy';
import { Item } from './Item';

interface IBoardData {
  cols: number;
  rows: number;
  tileSize: number;
  levelData: IGameBaseData;
}

export class Board {
  public cols: number;
  public numCells: number;
  public rows: number;
  public tileSize: number;
  private game: Phaser.Game;
  private levelData: IGameBaseData;
  private mapElements: Phaser.Group;
  private state: Game;

  constructor(state: Game, data: IBoardData) {
    this.state = state;
    this.game = state.game;
    this.rows = data.rows;
    this.cols = data.cols;
    this.numCells = this.rows * this.cols;
    this.tileSize = data.tileSize;
    this.mapElements = this.state.mapElements;
    this.levelData = data.levelData;

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        const tile = new Phaser.Sprite(this.game, j * this.tileSize, i * this.tileSize, 'rockTile');
        tile.data.row = i;
        tile.data.col = j;
        this.state.backgroundTiles.add(tile);
        /*
        tile.inputEnabled = true;
        tile.events.onInputDown.add((targetTile: Phaser.Sprite) => {
          targetTile.alpha = 0.5;
          console.log(`row: ${targetTile.data.row} col: ${targetTile.data.col}`);
          console.log(this.getSurrounding(targetTile));
        }, this);
        */
      }
    }
  }

  public getFreeCell() {
    let freeCell: { row: number, col: number } | undefined;
    const len = this.mapElements.length;

    while (!freeCell) {
      let foundCell = false;
      const row = this.randomBetween(0, this.rows, true);
      const col = this.randomBetween(0, this.cols, true);

      for (let i = 0; i < len; i++) {
        const mapElement = (this.mapElements.children[i] as Phaser.Sprite);
        if (mapElement.alive && mapElement.data.row === row && mapElement.data.col === col) {
          foundCell = true;
          break;
        }
      }

      if (!foundCell) {
        freeCell = { row, col };
      }
    }

    return freeCell;
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

  public initEnemies() {
    const numEnemies = Math.round(
      this.numCells * this.levelData.coefs.enemyOccupation *
      this.randomBetween(1 - this.levelData.coefs.enemyVariation, 1 + this.levelData.coefs.enemyVariation));

    let i = 0;
    let type: number;
    let enemyData: any;
    let cell: { col: number, row: number };
    let newEnemy: Enemy;

    while (i < numEnemies) {
      type = this.randomBetween(0, this.levelData.itemTypes.length, true);
      enemyData = { ...this.levelData.enemyTypes[type] };

      const coef = Math.pow(this.levelData.coefs.levelIncrement, this.state.currentLevel);
      enemyData.attack = Math.round(coef * enemyData.attack);
      enemyData.defense = Math.round(coef * enemyData.defense);
      enemyData.gold = Math.round(coef * enemyData.gold);
      enemyData.health = Math.round(coef * enemyData.health);

      cell = this.getFreeCell();
      enemyData.row = cell.row;
      enemyData.col = cell.col;

      newEnemy = new Enemy(this.state, enemyData);
      this.mapElements.add(newEnemy);

      i++;
    }
  }

  public initExit() {
    const startCell = this.getFreeCell();
    const start = new Item(this.state, {
      asset: 'start',
      attack: 0,
      col: startCell.col,
      defense: 0,
      gold: 0,
      health: 0,
      row: startCell.row,
      type: 'start',
    });
    this.mapElements.add(start);

    const exitCell = this.getFreeCell();
    const exit = new Item(this.state, {
      asset: 'exit',
      attack: 0,
      col: exitCell.col,
      defense: 0,
      gold: 0,
      health: 0,
      row: exitCell.row,
      type: 'exit',
    });
    this.mapElements.add(exit);

    const keyCell = this.getFreeCell();
    const key = new Item(this.state, {
      asset: 'key',
      attack: 0,
      col: keyCell.col,
      defense: 0,
      gold: 0,
      health: 0,
      row: keyCell.row,
      type: 'key',
    });
    this.mapElements.add(key);
  }

  public initItems() {
    const numItems = Math.round(
      this.numCells * this.levelData.coefs.itemOccupation *
      this.randomBetween(1 - this.levelData.coefs.itemVariation, 1 + this.levelData.coefs.itemVariation));

    let i = 0;
    let type: number;
    let itemData: any;
    let cell: { col: number, row: number };
    let newItem: Item;

    while (i < numItems) {
      type = this.randomBetween(0, this.levelData.itemTypes.length, true);
      itemData = { ...this.levelData.itemTypes[type] };

      itemData.attack = itemData.attack || 0;
      itemData.defense = itemData.defense || 0;
      itemData.gold = itemData.gold || 0;
      itemData.health = itemData.health || 0;

      cell = this.getFreeCell();
      itemData.row = cell.row;
      itemData.col = cell.col;

      newItem = new Item(this.state, itemData);
      this.mapElements.add(newItem);

      i++;
    }
  }

  public initLevel() {
    this.initItems();
    this.initEnemies();
    this.initExit();
  }

  public randomBetween(a: number, b: number, isInteger: boolean = false) {
    let numBetween = a + Math.random() * (b - a);

    if (isInteger) {
      numBetween = Math.floor(numBetween);
    }

    return numBetween;
  }
}
