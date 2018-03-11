export class Boot extends Phaser.State {
  public init() {
    this.stage.backgroundColor = '#fff';
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
  }

  public preload() {
    this.load.image('bar', 'images/preloader-bar.png');
  }

  public create() {
    this.state.start('Preload');
  }
}
