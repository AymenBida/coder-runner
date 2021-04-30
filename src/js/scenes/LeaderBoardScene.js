// eslint-disable-next-line import/no-unresolved
import Phaser from 'phaser';
import createLeaderBoard from '../actions/createLeaderBoard';
import destroyLeaderBoard from '../actions/destroyLeaderBoard';
import showScores from '../actions/showScores';
import conf from '../config/gameConfig';

export default class LeaderBoardScene extends Phaser.Scene {
  constructor() {
    super('LeaderBoard');
  }

  createButton() {
    this.gameButton = this.add.sprite(conf.width - 16, 16, 'mainButton').setScale(0.5).setOrigin(1, 0).setInteractive();

    this.gameText = this.add.text(conf.width - 18, 24, 'Play Again', { fontSize: '16px', fill: '#fff' }).setOrigin(1, 0);

    this.gameButton.on('pointerdown', () => {
      destroyLeaderBoard();
      this.scene.start('GamePlay');
    });

    this.input.on('pointerover', (event, gameObjects) => {
      gameObjects[0].setTexture('mainButton-hover');
    });

    this.input.on('pointerout', (event, gameObjects) => {
      gameObjects[0].setTexture('mainButton');
    });
  }

  create() {
    this.background = this.add.image(400, 300, 'bsod');
    showScores().then((response) => {
      this.background.destroy();
      this.createButton();
      createLeaderBoard(response);
    });
  }
}