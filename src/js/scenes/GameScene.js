import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  preload() {
    this.load.image('logo', './src/assets/bida_games_logo.png');
  }

  create() {
    this.add.image(400, 200, 'logo');
    this.scene.start('Preloader');
  }
}