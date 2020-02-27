var config = {
  type: Phaser.AUTO,
  width: 1536,
  height: 864,

  scene: [tagIntro, courseIntro, buildingBlocks, bbActRoom, buildBlockAct0, buildBlockAct2, winners_room]
  //, accountEqn, accountEqnAct, 

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
var wallAlpha = 0.5;
var musicToggle = false;
var game = new Phaser.Game(config);
