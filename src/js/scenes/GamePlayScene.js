import Phaser from 'phaser';
import conf from '../config/gameConfig';
import options from '../config/gameOptions';

export default class GamePlayScene extends Phaser.Scene {
  constructor() {
    super('GamePlay');
  }

  preload() {
    this.load.image('platform', './src/assets/platform.png');
    this.load.image('player', './src/assets/star.png');
  }

  addPlatform(platformWidth, posX) {
    let platform;
    if (this.platformPool.getLength()) {
      platform = this.platformPool.getFirst();
      platform.x = posX;
      platform.active = true;
      platform.visible = true;
      this.platformPool.remove(platform);
    } else {
      platform = this.physics.add.sprite(posX, conf.height * 0.8, 'platform');
      platform.setImmovable(true);
      platform.setVelocityX(options.platformStartSpeed * -1);
      this.platformGroup.add(platform);
    }
    platform.displayWidth = platformWidth;
    this.nextPlatformDistance = Phaser.Math.Between(options.spawnRange[0], options.spawnRange[1]);
  }

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

  create() {
    // group with all active platforms.
    this.platformGroup = this.add.group({

      // once a platform is removed, it's added to the pool
      removeCallback(platform) {
        platform.scene.platformPool.add(platform);
      },
    });

    // pool
    this.platformPool = this.add.group({

      // once a platform is removed from the pool, it's added to the active platforms group
      removeCallback(platform) {
        platform.scene.platformGroup.add(platform);
      },
    });

    // number of consecutive jumps made by the player
    this.playerJumps = 0;

    // adding a platform to the game, the arguments are platform width and x position
    this.addPlatform(conf.width, conf.width / 2);

    // adding the player;
    this.player = this.physics.add.sprite(options.playerStartPosition, conf.height / 2, 'player');
    this.player.setGravityY(options.playerGravity);

    // setting collisions between the player and the platform group
    this.physics.add.collider(this.player, this.platformGroup);

    // checking for input
    this.input.on('pointerdown', this.jump, this);
  }

  update() {
    // game over
    if (this.player.y > conf.height) {
      this.scene.start('PlayGame');
    }
    this.player.x = options.playerStartPosition;

    // recycling platforms
    let minDistance = conf.width;
    this.platformGroup.getChildren().forEach(function fn(platform) {
      const platformDistance = conf.width - platform.x - platform.displayWidth / 2;
      minDistance = Math.min(minDistance, platformDistance);
      if (platform.x < -platform.displayWidth / 2) {
        this.platformGroup.killAndHide(platform);
        this.platformGroup.remove(platform);
      }
    }, this);

    // adding new platforms
    if (minDistance > this.nextPlatformDistance) {
      const nextPlatformWidth = Phaser.Math
        .Between(options.platformSizeRange[0], options.platformSizeRange[1]);
      this.addPlatform(nextPlatformWidth, conf.width + nextPlatformWidth / 2);
    }
  }
}