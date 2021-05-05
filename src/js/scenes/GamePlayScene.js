// eslint-disable-next-line import/no-unresolved
import Phaser from 'phaser';
import conf from '../config/gameConfig';
import options from '../config/gameOptions';
import spawnObstacle from '../actions/spawnObstacle';
import sendScore from '../actions/sendScore';
import 'regenerator-runtime';

export default class GamePlayScene extends Phaser.Scene {
  constructor() {
    super('GamePlay');
  }

  jump() {
    if (this.playerOnSomething() || (this.playerJumped() && this.playerCanStillJump())) {
      if (this.playerOnSomething()) {
        this.resetJumps();
      }
      this.launchPlayer();
    }
  }

  playerOnSomething() {
    return (this.player.body.touching.down);
  }

  playerJumped() {
    return (this.playerJumps > 0);
  }

  playerCanStillJump() {
    return (this.playerJumps < options.jumps);
  }

  resetJumps() {
    this.playerJumps = 0;
  }

  launchPlayer() {
    this.player.setVelocityY(options.jumpForce * -1);
    this.playerJumps += 1;
  }

  nextScene() {
    this.scene.start('LeaderBoard');
  }

  create() {
    this.counter = 0;
    this.score = 0;
    this.scoreText = `Score = ${this.score}`;
    this.gameSpeed = 1;
    this.background = this.physics.add.image(0, conf.height / 2, 'background').setOrigin(0, 0.5);
    this.background2 = this.physics.add.image(1600, conf.height / 2, 'background').setOrigin(0, 0.5);
    this.scoreObj = this.add.text(20, 16, this.scoreText, { fontSize: '32px', fill: '#000' });
    this.background.setVelocityX(-90);
    this.background2.setVelocityX(-90);

    this.ground = this.physics.add.staticImage(conf.width / 2, conf.height - 41, 'ground');

    this.player = this.physics.add.sprite(options.playerStartPosition, conf.height / 2, 'player').setScale(3).refreshBody();
    this.player.setGravityY(options.playerGravity);
    this.player.body.setSize(16, 30);
    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('player', { start: 0, end: 1 }),
      frameRate: 10,
      repeat: -1,
    });

    this.physics.add.collider(this.player, this.ground);
    this.player.play('run');

    this.obstacle = spawnObstacle(this, Phaser.Math.Between(...options.obstacleHeight));
    this.physics.add.collider(this.player, this.obstacle);

    this.playerJumps = 0;

    this.input.on('pointerdown', this.jump, this);
    this.input.keyboard.on('keydown-SPACE', this.jump, this);
  }

  update() {
    if (this.background.x <= -1600) {
      this.background.setX(this.background2.x + 1600);
    }
    if (this.background2.x <= -1600) {
      this.background2.setX(this.background.x + 1600);
    }

    if (this.obstacle.x <= -120) {
      if (this.player.x > 0) {
        this.score += 10;
      }
      this.scoreText = `Score = ${this.score}`;
      this.scoreObj.setText(this.scoreText);
      this.gameSpeed *= 1.01;
      this.obstacle.setX(920);
      this.obstacle.setY(Phaser.Math.Between(...options.obstacleHeight));
      this.obstacle
        .setVelocityX(0 - (Phaser.Math.Between(...options.obstacleSpeed) * this.gameSpeed));
      this.background.setVelocityX(-90 * this.gameSpeed);
      this.background2.setVelocityX(-90 * this.gameSpeed);
    }

    if (this.player.y > conf.height) {
      this.add.image(400, 300, 'bsod');
      if (this.counter === 0 && this.score > 0) {
        this.counter = 1;
        sendScore(window.playerName, this.score)
          .then(() => {
            this.timedEvent = this.time.delayedCall(500, this.nextScene, [], this);
          });
      } else {
        this.timedEvent = this.time.delayedCall(1000, this.nextScene, [], this);
      }
    }
  }
}