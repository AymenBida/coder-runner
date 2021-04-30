// eslint-disable-next-line import/no-unresolved
import Phaser from 'phaser';
import config from './js/config/gameConfig';
import GameScene from './js/scenes/GameScene';
import PreloaderScene from './js/scenes/PreloaderScene';
import TitleScene from './js/scenes/TitleScene';
import GamePlayScene from './js/scenes/GamePlayScene';
import LeaderBoardScene from './js/scenes/LeaderBoardScene';
// eslint-disable-next-line no-unused-vars
import css from './css/styles.css';

class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.scene.add('Game', GameScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('GamePlay', GamePlayScene);
    this.scene.add('LeaderBoard', LeaderBoardScene);
    this.scene.start('Game');
  }
}

window.game = new Game();
const canvas = document.querySelector('canvas');
canvas.classList.add('centered');