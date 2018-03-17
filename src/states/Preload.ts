export class Preload extends Phaser.State {
  public preload() {
    const preloadBar = this.add.sprite(this.world.centerX, this.world.centerY, 'bar');
    preloadBar.anchor.setTo(0.5);
    preloadBar.scale.setTo(100, 1);
    this.load.setPreloadSprite(preloadBar);

    this.load.image('rockTile', 'images/rock-land3.png');
    this.load.image('darkTile', 'images/darkTile.png');
    this.load.image('cherry', 'images/potion.png');
    this.load.image('sword', 'images/battlehammer.png');
    this.load.image('shield', 'images/shield.png');
    this.load.image('chest', 'images/chest-gold.png');
    this.load.image('heart', 'images/heart.png');
    this.load.image('attack', 'images/attack.png');
    this.load.image('defense', 'images/defense.png');
    this.load.image('gold', 'images/gold.png');
    this.load.image('profile', 'images/profile.png');
    this.load.image('start', 'images/start.png');
    this.load.image('exit', 'images/exit.png');
    this.load.image('key', 'images/key green.png');

    this.load.image('snake', 'images/desert-snake.png');
    this.load.image('skeleton', 'images/swordskeleton.png');
    this.load.image('mummy', 'images/mummyjewel.png');
    this.load.image('demon', 'images/demon.png');
    this.load.image('orc', 'images/orc.png');

    this.load.text('gameBaseData', 'data/gameBaseData.json');
  }

  public create() {
    this.state.start('Game');
  }
}
