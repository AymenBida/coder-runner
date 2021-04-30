import Phaser from 'phaser';
import getScores from '../actions/showScores';

export default class LeaderBoardScene extends Phaser.Scene {
  constructor() {
    super('LeaderBoard');
  }

  preload() {
  }

  create() {
    getScores()
      .then((response) => response.json())
      .then((data) => console.log(data));
  }
}