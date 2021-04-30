import Phaser from 'phaser';
import conf from '../config/gameConfig';
import options from '../config/gameOptions';
import spawnObstacle from '../actions/spawnObstacle';
import sendScore from '../actions/sendScore';

export default class GamePlayScene extends Phaser.Scene {
  constructor() {
    super('GamePlay');
  }

  preload() {
  }

  // addPlatform(platformWidth, posX) {
  //   let platform;
  //   if (this.platformPool.getLength()) {
  //     platform = this.platformPool.getFirst();
  //     platform.x = posX;
  //     platform.active = true;
  //     platform.visible = true;
  //     this.platformPool.remove(platform);
  //   } else {
  //     platform = this.physics.add.sprite(posX, conf.height * 0.8, 'platform');
  //     platform.setImmovable(true);
  //     platform.setVelocityX(options.platformStartSpeed * -1);
  //     this.platformGroup.add(platform);
  //   }
  //   platform.displayWidth = platformWidth;
  //   this.nextPlatformDistance = Phaser.Math.Between(options.spawnRange[0], options.spawnRange[1]);
  // }

  jump() {
    if (this.player.body.touching.down
      || (this.playerJumps > 0 && this.playerJumps < options.jumps)) {
      if (this.player.body.touching.down) {
        this.playerJumps = 0;
      }
      this.player.setVelocityY(options.jumpForce * -1);
      this.playerJumps += 1;
    }
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
    // this.physics.add.collider(this.player, this.ground);

    // group with all active platforms.
    // this.platformGroup = this.add.group({

    //   // once a platform is removed, it's added to the pool
    //   removeCallback(platform) {
    //     platform.scene.platformPool.add(platform);
    //   },
    // });
    // if (!this.player.body.touching.down) {
    //   this.player.play('run');
    //   // this.player.stop('run');
    // } else {

    // }

    // pool
    // this.platformPool = this.add.group({

    //   // once a platform is removed from the pool, it's added to the active platforms group
    //   removeCallback(platform) {
    //     platform.scene.platformGroup.add(platform);
    //   },
    // });

    // number of consecutive jumps made by the player
    this.playerJumps = 0;

    // adding a platform to the game, the arguments are platform width and x position
    // this.addPlatform(conf.width, conf.width / 2);


    // setting collisions between the player and the platform group
    // this.physics.add.collider(this.player, this.platformGroup);

    // checking for input
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
        this.score += 1;
      }
      this.scoreText = `Score = ${this.score}`;
      this.scoreObj.setText(this.scoreText);
      this.gameSpeed *= 1.01;
      this.obstacle.setX(920);
      this.obstacle.setY(Phaser.Math.Between(...options.obstacleHeight));
      this.obstacle.setVelocityX(0 - (Phaser.Math.Between(...options.obstacleSpeed) * this.gameSpeed));
      this.background.setVelocityX(-90 * this.gameSpeed);
      this.background2.setVelocityX(-90 * this.gameSpeed);
    }


    if (this.player.y > conf.height) {
      this.add.image(400, 300, 'bsod');
      if (this.counter === 0 && this.score > 0) {
        this.counter = 1;
        sendScore(window.playerName, this.score)
          .then((response) => response.json())
          .then((data) => {
            console.log('Success:', data);
          });
      }
      this.timedEvent = this.time.delayedCall(1000, this.nextScene, [], this);
    }
    // this.background.tilePosition.x = -(this.camera.x * 1);
    //   // game over

    //   this.player.x = options.playerStartPosition;

    //   // recycling platforms
    //   let minDistance = conf.width;
    //   this.platformGroup.getChildren().forEach(function fn(platform) {
    //     const platformDistance = conf.width - platform.x - platform.displayWidth / 2;
    //     minDistance = Math.min(minDistance, platformDistance);
    //     if (platform.x < -platform.displayWidth / 2) {
    //       this.platformGroup.killAndHide(platform);
    //       this.platformGroup.remove(platform);
    //     }
    //   }, this);

  //   // adding new platforms
  //   if (minDistance > this.nextPlatformDistance) {
  //     const nextPlatformWidth = Phaser.Math
  //       .Between(options.platformSizeRange[0], options.platformSizeRange[1]);
  //     this.addPlatform(nextPlatformWidth, conf.width + nextPlatformWidth / 2);
  //   }
  // }
  }
}