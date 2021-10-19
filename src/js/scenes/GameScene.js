// eslint-disable-next-line import/no-unresolved
import Phaser from 'phaser';
import bidaGamesLogo from '../../assets/bida_games_logo.png';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  preload() {
    this.load.image('logo', bidaGamesLogo);
  }

  create() {
    this.add.image(400, 200, 'logo');
    this.scene.start('Preloader');
  }
}