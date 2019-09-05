var config = {
  type: Phaser.AUTO,
  width: 1536,
  height: 864,
  scene: [zero_lesson, three_lesson]
  //scene: [zero_lesson, three_lesson, two_lesson, one_lesson, one_activity]


};
var quizActive = false;
var activity1Locked = false;
var activity2Locked = true;
var activity3Locked = true;
var activity4Locked = true;
var activity5Locked = true;
var activity6Locked = true;
var activity6Complete = false;
var characterMoveable = true;
var roomProgress = 0;
var game = new Phaser.Game(config);
