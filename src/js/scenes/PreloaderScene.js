import Phaser from 'phaser';
import mainButton from '../../assets/ui/main_button.png';
import mainButtonHover from '../../assets/ui/main_button_hover.png';
import bidaGamesLogo from '../../assets/bida_games_logo.png';
import obstacle from '../../assets/obstacle.png';
import ground from '../../assets/ground.png';
import background from '../../assets/background.png';
import bsod from '../../assets/bsod.png';
import player from '../../assets/coder_spritesheet.png';

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('Preloader');
  }

  init() {
    this.readyCount = 0;
  }

  ready() {
    this.readyCount += 1;
    if (this.readyCount === 2) {
      this.scene.start('Title');
    }
  }

  preload() {
    this.add.image(400, 200, 'logo');

    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0xD1D1D1, 0.8);
    progressBox.fillRect(240, 400, 320, 50);

    const { width } = this.cameras.main;
    const { height } = this.cameras.main;
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 + 80,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff',
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 + 125,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    percentText.setOrigin(0.5, 0.5);

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 170,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    assetText.setOrigin(0.5, 0.5);

    this.load.on('progress', (value) => {
      percentText.setText(`${parseInt(value * 100, 10)}%`);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(245, 405, 310 * value, 40);
    });

    this.load.on('fileprogress', (file) => {
      assetText.setText(`Loading asset: ${file.key}`);
    });

    this.load.on('complete', () => {
      loadingText.setText('Loading ✓');
      this.ready();
    });

    this.timedEvent = this.time.delayedCall(2500, this.ready, [], this);

    this.load.image('mainButton', mainButton);
    this.load.image('mainButton-hover', mainButtonHover);
    this.load.image('phaserLogo', bidaGamesLogo);
    this.load.image('obstacle', obstacle);
    this.load.image('ground', ground);
    this.load.image('background', background);
    this.load.image('bsod', bsod);
    this.load.spritesheet('player',
      player,
      { frameWidth: 25, frameHeight: 31 });
  }
}