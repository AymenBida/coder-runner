import Phaser from 'phaser';
import conf from '../config/gameConfig';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  preload() {
  }

  centerButton(gameObject, offset = 0) {
    Phaser.Display.Align.In.Center(
      gameObject,
      this.add.zone(conf.width / 2, conf.height / 2 - offset * 100, conf.width, conf.height),
    );
  }

  // eslint-disable-next-line class-methods-use-this
  centerButtonText(gameText, gameButton) {
    Phaser.Display.Align.In.Center(
      gameText,
      gameButton,
    );
  }
  // eslint-enable-next-line class-methods-use-this

  create() {
    // Game
    this.gameButton = this.add.sprite(100, 200, 'mainButton').setInteractive();
    this.centerButton(this.gameButton, 1);

    this.gameText = this.add.text(0, 0, 'Play', { fontSize: '32px', fill: '#fff' });
    this.centerButtonText(this.gameText, this.gameButton);

    this.gameButton.on('pointerdown', () => {
      this.scene.start('GamePlay');
    });

    this.input.on('pointerover', (event, gameObjects) => {
      gameObjects[0].setTexture('mainButton-hover');
    });

    this.input.on('pointerout', (event, gameObjects) => {
      gameObjects[0].setTexture('mainButton');
    });

    // Options
    this.optionsButton = this.add.sprite(300, 200, 'mainButton').setInteractive();
    this.centerButton(this.optionsButton);

    this.optionsText = this.add.text(0, 0, 'Options', { fontSize: '32px', fill: '#fff' });
    this.centerButtonText(this.optionsText, this.optionsButton);

    this.optionsButton.on('pointerdown', () => {
      this.scene.start('Options');
    });

    // Credits
    this.creditsButton = this.add.sprite(300, 200, 'mainButton').setInteractive();
    this.centerButton(this.creditsButton, -1);

    this.creditsText = this.add.text(0, 0, 'Credits', { fontSize: '32px', fill: '#fff' });
    this.centerButtonText(this.creditsText, this.creditsButton);

    this.creditsButton.on('pointerdown', () => {
      this.scene.start('Credits');
    });
  }
}