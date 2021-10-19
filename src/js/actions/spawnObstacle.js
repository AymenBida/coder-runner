export default function fn(scene, height) {
  const obstacle = scene.physics.add.sprite(800, height, 'obstacle');
  obstacle.setGravityY(0);
  obstacle.setVelocityX(-400);
  obstacle.setPushable(false);
  return obstacle;
}