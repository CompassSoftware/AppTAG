
class three_lesson extends Phaser.Scene {

  constructor() {
    super({key: "three_Lesson"});
    this.quizActive = false;
    this.activatedQuiz = false;
    this.unlocked = false;
    this.paperMoveable = false;
    this.activityOneOpened = false;
    this.helpOpen = false;
  }
  //load assets in preload()

  preload() {
    this.loadAssets();
  }

  //when scene is created
  create() {

    this.createImages();
    this.setAlphas();
    this.setDepths();
    this.setScales();
    this.setRotations();
    this.createInteractionZones();
    this.assignKeybinds();
    this.imagesDraggable();
  }

  update(delta) {
    //TEMPORARY FOR TESTING
    //vvvvvvvvvvvvvvvvvvv//
    if (this.key_H.isDown) {
    	this.helpMenu();
    }

    if (this.activityOneOpened) {
      this.checkNextPage();
    }

    if (this.key_U.isDown && this.unlocked == false) {
      activity1Locked = false;
      activity2Locked = false;
      activity3Locked = false;
      activity4Locked = false;
      activity5Locked = false;
      activity6Locked = false;
      activity6Complete = true;
      this.unlocked = true;
    }

    if (this.key_M.isDown) {
      this.map.alpha = 1.0;
      characterMoveable = false;
      this.character_north.alpha = 0.0;
      this.character_east.alpha = 0.0;
      this.character_south.alpha = 0.0;
      this.character_west.alpha = 0.0;
    }

    if (this.key_B.isDown) {
      this.notebook.alpha = 1.0;
      characterMoveable = false;
      this.character_north.alpha = 0.0;
      this.character_east.alpha = 0.0;
      this.character_south.alpha = 0.0;
      this.character_west.alpha = 0.0;
    }


    if (this.key_Q.isDown && this.activatedQuiz == false) {
      this.quitInteraction();
    }

    if (this.quizActive == true && this.activatedQuiz == false && this.key_E.isDown) {
      this.activateQuiz();
      this.activatedQuiz = true;
    }

    if (this.quizActive == true && this.key_Q.isDown && this.activatedQuiz == true) {
      this.quitQuiz();
      this.activatedQuiz = false;
    }

    if (this.activatedQuiz == false) {
        this.movePlayer();
        this.checkInteractValidity();
    } else if (this.activatedQuiz = true) {
      if (this.paperCount == 1) {
        this.movePaper(this.paper);
        this.checkCorrectPaperOne();
      } else if (this.paperCount == 2) {
          this.movePaper(this.paperTwo);
          this.checkCorrectPaperTwo();

      } else if (this.paperCount == 3) {
          this.movePaper(this.paperThree);
          this.checkCorrectPaperThree();
        }

      }
	if (this.activatedQuiz == false)
		this.characterMoveable = true;
    }


/***********************************************************************************************
======================================HELPER METHODS============================================
*///////////////////////////////////////////////////////////////////////////////////////////////
  loadAssets() {
	this.load.image('pressr', 'assets/pressr.png');
    this.load.image('one_lesson_BG', 'assets/one_lesson_BG.png');
    this.load.image('character_north', 'assets/character_north.png');
    this.load.image('character_east', 'assets/character_east.png');
    this.load.image('character_south', 'assets/character_south.png');
    this.load.image('character_west', 'assets/character_west.png');
    this.load.image('redCharacter', 'assets/redCharacter.png');
    this.load.image('activity1', 'assets/Activity1Test.png');
    this.load.image('activity1Page2', 'assets/Activity2Test.png');
    this.load.image('activity2', 'assets/Activity2Test.png');
    this.load.image('activity3', 'assets/Activity3Test.png');
    this.load.image('activity4', 'assets/Activity4Test.png');
    this.load.image('activity5', 'assets/Activity5Test.png');
    this.load.image('activity6', 'assets/Activity6Test.png');
    this.load.image('E_KeyImg', 'assets/E_Key.png');
    this.load.image('wall_info_1', 'assets/wall_art.png');
    this.load.image('wall_info_2', 'assets/wall_art.png');
    this.load.image('wall_info_3', 'assets/wall_art.png');
    this.load.image('wall_info_4', 'assets/wall_art.png');
    this.load.image('wall_info_5', 'assets/wall_art.png');
    this.load.image('wall_info_6', 'assets/wall_art.png');
    this.load.image('floor', 'assets/floor_3.png');
    this.load.image('cardboard_box', 'assets/cardboard_box.png');
    this.load.image('paper_stack', 'assets/paper_stack.png');
    this.load.image('paper', 'assets/single_paper.png');
    this.load.image('map', 'assets/map.png');
    this.load.image('notebook', 'assets/notebook.png');
    this.load.image('activityLocked', 'assets/activityLocked.png');
    this.load.image('help_menu', 'assets/help_menu.png');
	this.load.image('correctPlacements0', 'assets/placements0.png');
	this.load.image('correctPlacements1', 'assets/placements1.png');
	this.load.image('correctPlacements2', 'assets/placements2.png');
	this.load.image('incomeStatement' , 'assets/incomeStatement.png');
	this.load.image('balanceSheet', 'assets/balanceSheet.png');
	this.load.image('retainedEarnings' , 'assets/retainedEarnings.png');
	this.load.image('incomeStatementText' ,'assets/incomeStatementText.png');
	this.load.image('balanceSheetText', 'assets/balanceSheetText.png');
	this.load.image('retainedEarningsText' , 'assets/retainedEarningsText.png');
  }

  createImages() {
    this.e_pressed = false;
    this.papers_moved = false;
    this.background = this.add.image(768, 432, 'one_lesson_BG');
    this.character_north = this.add.image(768, 432, 'character_north');
    this.character_east = this.add.image(768, 432, 'character_east');
    this.character_south = this.add.image(768, 432, 'character_south');
    this.character_west = this.add.image(768, 432, 'character_west');
    this.E_KeyImg = this.add.image(this.character_north.x+40, this.character_north.y+40, 'E_KeyImg');
    this.activity1 = this.add.image(768, 432, 'activity1');
    this.activity1Page2 = this.add.image(768, 432, 'activity1Page2');
    this.activity2 = this.add.image(768, 432, 'activity2');
    this.activity3 = this.add.image(768, 432, 'activity3');
    this.activity4 = this.add.image(768, 432, 'activity4');
    this.activity5 = this.add.image(768, 432, 'activity5');
    this.activity6 = this.add.image(768, 432, 'activity6');
    this.wall_info_1 = this.add.image(305, 75, 'wall_info_1');
    this.wall_info_2 = this.add.image(768, 75, 'wall_info_2');
    this.wall_info_3 = this.add.image(1232, 75, 'wall_info_3');
    this.wall_info_4 = this.add.image(305, 790, 'wall_info_4');
    this.wall_info_5 = this.add.image(768, 790, 'wall_info_5');
    this.wall_info_6 = this.add.image(1232, 790, 'wall_info_6');
    this.floor = this.add.image(768, 432, 'floor');
    this.paper_stack = this.add.image(1215, 432, 'paper_stack');
    this.cardboard_box_1 = this.add.image(1310, 320, 'cardboard_box');
    this.cardboard_box_2 = this.add.image(1310, 432, 'cardboard_box');
    this.cardboard_box_3 = this.add.image(1310, 530, 'cardboard_box');
    this.map = this.add.image(768, 432, 'map');
    this.notebook = this.add.image(768, 432, 'notebook');
    this.activityLocked = this.add.image(768, 432, 'activityLocked');
    this.help_menu = this.add.image(768, 432, 'help_menu');
  }

  setAlphas() {
    this.map.alpha = 0.0;
    this.notebook.alpha = 0.0;
    this.activityLocked.alpha = 0.0;
    this.E_KeyImg.alpha = 0.0;
    this.help_menu.alpha = 0.0;
    this.hideActivities();
  }

  setDepths() {
    this.floor.setDepth(0);
    this.character_north.setDepth(50);
    this.character_east.setDepth(50);
    this.character_south.setDepth(50);
    this.character_west.setDepth(50);
    this.E_KeyImg.setDepth(49);
    this.activity1.setDepth(100);
    this.activity1Page2.setDepth(100);
    this.activity2.setDepth(99);
    this.activity3.setDepth(98);
    this.activity4.setDepth(97);
    this.activity5.setDepth(96);
    this.activity6.setDepth(95);
    this.map.setDepth(100);
    this.paper_stack.setDepth(1);
    this.notebook.setDepth(100);
    this.help_menu.setDepth(100);
  }

  setScales() {
    this.E_KeyImg.setScale(0.4);
    this.wall_info_1.setScale(0.75);
    this.wall_info_2.setScale(0.75);
    this.wall_info_3.setScale(0.75);
    this.wall_info_4.setScale(0.75);
    this.wall_info_5.setScale(0.75);
    this.wall_info_6.setScale(0.75);
    this.notebook.setScale(0.75);
    this.map.setScale(0.75);
    this.cardboard_box_1.setScale(0.39);
    this.cardboard_box_2.setScale(0.39);
    this.cardboard_box_3.setScale(0.39);
    this.paper_stack.setScale(0.35);
    this.character_north.setScale(3);
    this.character_south.setScale(3);
    this.character_west.setScale(3);
    this.character_east.setScale(3);
  }

  setRotations() {
    this.wall_info_4.rotation = 3.14;
    this.wall_info_5.rotation = 3.14;
    this.wall_info_6.rotation = 3.14;
    this.cardboard_box_1.rotation = 0;
    this.cardboard_box_2.rotation = 0;
    this.cardboard_box_3.rotation = 0;
  }


  createInteractionZones() {
    this.graphics = this.add.graphics({fillStyle: {color: 0xFFFFFF, alpha: 0.0}});
    //this.graphicsTest = this.add.graphics({fillStyle: {color: 0x4F4F4F, alpha: 1.0}});
    //TOP ZONES
                                                //xpos ypos x   y
    this.top_left_info = new Phaser.Geom.Rectangle(175,150,240,150);
    this.graphics.fillRectShape(this.top_left_info);
                                                //xpos ypos x  y
    this.top_mid_info = new Phaser.Geom.Rectangle(650,150,240,150);
    this.graphics.fillRectShape(this.top_mid_info);
                                                 //xpos ypos x   y
    this.top_right_info = new Phaser.Geom.Rectangle(1120,150,240,150);
    this.graphics.fillRectShape(this.top_right_info);

    //BOTTOM ZONES

    this.bot_left_info = new Phaser.Geom.Rectangle(175,565,240,100);
    this.graphics.fillRectShape(this.bot_left_info);

    this.bot_mid_info = new Phaser.Geom.Rectangle(650,565,240,150);
    this.graphics.fillRectShape(this.bot_mid_info);

    this.bot_right_info = new Phaser.Geom.Rectangle(1120,565,240,150);
    this.graphics.fillRectShape(this.bot_right_info);

    this.quiz1 = new Phaser.Geom.Rectangle(1120,308,240,250);
    this.graphics.fillRectShape(this.quiz1);

    this.box_1_zone = new Phaser.Geom.Rectangle(1200,75,200,200);
    this.graphics.fillRectShape(this.box_1_zone);

    this.box_2_zone = new Phaser.Geom.Rectangle(1200,325,200,200);
    this.graphics.fillRectShape(this.box_2_zone);

    this.box_3_zone = new Phaser.Geom.Rectangle(1200,650,200,200);
    this.graphics.fillRectShape(this.box_3_zone);
  }

  assignKeybinds() {
        //KEYBOARD INPUT
    this.key_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.key_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.key_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.key_E = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    this.key_Q = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    this.key_M = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
    this.key_B = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
    this.key_U = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.U);
    this.key_1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
    this.key_2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
    this.key_R = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    this.key_H = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);
  }

  imagesDraggable() {
    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

        gameObject.x = dragX;
        gameObject.y = dragY;

    });

  }

  checkInteractValidity() {
    if (Phaser.Geom.Rectangle.ContainsPoint(this.top_right_info, this.character_north)) {
      this.E_KeyImg.x = this.character_north.x;
      this.E_KeyImg.y = this.character_north.y-75;
      this.E_KeyImg.alpha = 1.0;
      if (this.key_E.isDown) {
        this.activity1.alpha = 1.0;
        this.characterMoveable = false;
        this.activityOneOpened = true;
		activity2Locked = false;
	
		//COME BACK AND CHANGE THIS LATER
		activity6Complete = true;
      }

    } else if (Phaser.Geom.Rectangle.ContainsPoint(this.bot_mid_info, this.character_north)) {
      this.E_KeyImg.x = this.character_north.x;
      this.E_KeyImg.y = this.character_north.y+75;

      this.E_KeyImg.alpha = 1.0;
		if (this.key_E.isDown && activity2Locked == false) {
        this.activity2.alpha = 1.0;
		activity3Locked = false;
        } else if (this.key_E.isDown && activity2Locked == true) {
          this.activityLocked.alpha = 1.0;
          this.characterMoveable = false;
		  
          }

    } else if (Phaser.Geom.Rectangle.ContainsPoint(this.top_mid_info, this.character_north)) {
      this.E_KeyImg.x = this.character_north.x;
      this.E_KeyImg.y = this.character_north.y-75;
      this.E_KeyImg.alpha = 1.0;
      if (this.key_E.isDown && activity3Locked == false) {
        this.activity3.alpha = 1.0;
		activity4Locked = false;
      } else if (this.key_E.isDown && activity3Locked == true){
        this.activityLocked.alpha = 1.0;
        this.characterMoveable = false;
        }

    } else if (Phaser.Geom.Rectangle.ContainsPoint(this.bot_right_info, this.character_north)) {
      this.E_KeyImg.x = this.character_north.x;
      this.E_KeyImg.y = this.character_north.y+75;
      this.E_KeyImg.alpha = 1.0;
      if (this.key_E.isDown && activity4Locked == false) {
      this.activity4.alpha = 1.0;
	  activity5Locked = false;
      } else if (this.key_E.isDown && activity4Locked == true){
        this.activityLocked.alpha = 1.0;
        this.characterMoveable = false;
	    
        }


    } else if (Phaser.Geom.Rectangle.ContainsPoint(this.top_left_info, this.character_north)) {
      this.E_KeyImg.x = this.character_north.x;
      this.E_KeyImg.y = this.character_north.y-5;

      this.E_KeyImg.alpha = 1.0;
      if (this.key_E.isDown && activity5Locked == false) {
        this.activity5.alpha = 1.0;
		activity6Locked = false;
      } else if (this.key_E.isDown && activity5Locked == true){
          this.activityLocked.alpha = 1.0;
          this.characterMoveable = false;
		  activity2Locked = false;
        }

    } else if (Phaser.Geom.Rectangle.ContainsPoint(this.bot_left_info, this.character_north)) {
      this.E_KeyImg.x = this.character_north.x;
      this.E_KeyImg.y = this.character_north.y+75;
      this.E_KeyImg.alpha = 1.0;
      if (this.key_E.isDown && activity6Locked == false) {
        this.activity6.alpha = 1.0;
		activity6Complete = true;
      } else if (this.key_E.isDown && activity6Locked == true){
        this.activityLocked.alpha = 1.0;
        this.characterMoveable = false;
      }

    } else if (Phaser.Geom.Rectangle.ContainsPoint(this.quiz1, this.character_north)){
      this.E_KeyImg.x = this.character_north.x+75;
      this.E_KeyImg.y = this.character_north.y;
      this.E_KeyImg.alpha = 1.0;
      if (this.key_E.isDown && activity6Complete == true) {
        this.quizActive = true;
      } else if (this.key_E.isDown && activity6Complete == false){
          this.activityLocked.alpha = 1.0;
        }
    } else {
      this.hideActivities();
      this.E_KeyImg.alpha = 0.0;
    }
  }

  // This method allows you to set the alpha of the character.
  // Call this with the arguments as (N,E,S,W)
  setCharacterAlpha() {
    this.character_north.alpha = arguments[0];
    this.character_east.alpha = arguments[1];
    this.character_south.alpha = arguments[2];
    this.character_west.alpha = arguments[3];
  }

  movePlayer() {
    //setCharacterAlpha is in helper.js and arguments go N,E,S,W
    this.setCharacterAlpha(0,0,1,0);

    if(this.key_W.isDown && characterMoveable == true) {
	if(this.character_north.y > 185){
      		this.character_north.y -= 5;
          this.character_east.y -= 5;
          this.character_south.y -= 5;
          this.character_west.y -= 5;

          this.setCharacterAlpha(1,0,0,0);



		}
    } if (this.key_A.isDown && characterMoveable == true) {
      	if(this.character_west.x > 210){
      		this.character_west.x -= 5;
          this.character_east.x -= 5;
          this.character_south.x -= 5;
          this.character_north.x -= 5;

          this.setCharacterAlpha(0,0,0,1);
	}

    } if (this.key_S.isDown && characterMoveable == true) {
	if(this.character_south.y < 680){
      		this.character_south.y += 5;
          this.character_east.y += 5;
          this.character_north.y += 5;
          this.character_west.y += 5;

          this.setCharacterAlpha(0,0,1,0);
		}

    } if (this.key_D.isDown && characterMoveable == true) {
      	if(this.character_east.x < 1325){
      		this.character_east.x += 5;
          this.character_north.x += 5;
          this.character_south.x += 5;
          this.character_west.x += 5;

          this.setCharacterAlpha(0,1,0,0);
		}
    }
  }
  movePaper(moveThisPaper) {
    if(this.key_W.isDown && this.paperMoveable == true) {
      moveThisPaper.y -= 7;
    } if (this.key_A.isDown && this.paperMoveable == true) {
      moveThisPaper.x -= 7;
    } if (this.key_S.isDown && this.paperMoveable == true) {
      moveThisPaper.y += 7;
    } if (this.key_D.isDown && this.paperMoveable == true) {
      moveThisPaper.x += 7;
    }
  }

  quitQuiz() {
	//console.log("e");
    this.papers_moved = false;
    this.quizActive = false;
	this.activatedQuiz = false;
    this.background.alpha = 1.0;
    this.character_north.alpha = 1.0;
    this.character_east.alpha = 1.0;
    this.character_south.alpha = 1.0;
    this.character_west.alpha = 1.0;
    this.E_KeyImg.alpha = 1.0;
    this.cardboard_box_1.setScale(0.39);
    this.cardboard_box_2.setScale(0.39);
    this.cardboard_box_3.setScale(0.39);
    this.paper_stack.setScale(0.35);
    this.paper_stack.x = 1215;
	this.paper_stack.setVisible(false);
    this.cardboard_box_1.x = 1310;
    this.cardboard_box_2.x = 1310;
    this.cardboard_box_3.x = 1310;
    this.cardboard_box_1.y = 320;
    this.cardboard_box_2.y = 432;
    this.cardboard_box_3.y = 530;
    this.wall_info_1.alpha = 1;
    this.wall_info_2.alpha = 1;
    this.wall_info_3.alpha = 1;
    this.wall_info_4.alpha = 1;
    this.wall_info_5.alpha = 1;
    this.wall_info_6.alpha = 1;
    this.floor.scaleX = 1.0;
    this.floor.scaleY = 1.0;
    this.paper_stack.x = 1215;
    this.paper_stack.y = 432;
    this.paperCount = 1;
    this.paperMoveable = false;
	this.placements0.setVisible(false);
	this.placements1.setVisible(false);
	this.placements2.setVisible(false);
	this.pressr.setVisible(false);
	this.incomeStatementText.setVisible(false);
	this.retainedEarningsText.setVisible(false);
	this.balanceSheetText.setVisible(false);
	this.characterMoveable = true;
	
	this.paper.alpha = 0;
	this.paperTwo.alpha = 0;
	this.paperThree.alpha = 0;
	this.paper.setVisible(false);
	this.paperTwo.setVisible(false);
    this.paperThree.setVisible(false);

  }

  activateQuiz() {
	this.paper_stack.setVisible(true);

    this.paperMoveable = true;
    this.paperCount = 1;
	this.loadQuizImages();
	this.updateCorrectImage();

    if(this.papers_moved == false) {
      this.paper_stack.x -= 1025;
      this.paper_stack.y -= 275;
      this.papers_moved = true;
    }
	
    this.paper = this.add.image(this.paper_stack.x, this.paper_stack.y, 'paper');
    this.paperTwo = this.add.image(this.paper_stack.x, this.paper_stack.y, 'paper');
    this.paperThree = this.add.image(this.paper_stack.x, this.paper_stack.y, 'paper');

    this.paperTwo.setVisible(false);
    this.paperThree.setVisible(false);


    this.paper.setInteractive();
    this.paper.alpha = 1;
    this.paper.setDepth(100);
    this.paperTwo.setDepth(100);
    this.paperThree.setDepth(100);



    this.background.alpha = 0.0;
    this.character_north.alpha = 0.0;
    this.character_east.alpha = 0.0;
    this.character_south.alpha = 0.0;
    this.character_west.alpha = 0.0;
    this.E_KeyImg.alpha = 0.0;
    this.cardboard_box_1.setScale(1.1);
    this.cardboard_box_2.setScale(1.1);
    this.cardboard_box_3.setScale(1.1);
    this.paper_stack.setScale(1.0);
    this.cardboard_box_1.x = 1350;
    this.cardboard_box_2.x = 1350;
    this.cardboard_box_3.x = 1350;
    this.cardboard_box_1.y = 150;
    this.cardboard_box_2.y = 450;
    this.cardboard_box_3.y = 750;
    this.wall_info_1.alpha = 0.0;
    this.wall_info_2.alpha = 0.0;
    this.wall_info_3.alpha = 0.0;
    this.wall_info_4.alpha = 0.0;
    this.wall_info_5.alpha = 0.0;
    this.wall_info_6.alpha = 0.0;
    this.floor.scaleX = 1.5;
    this.floor.scaleY = 2.0;

    this.box1_frame = new Phaser.Geom.Rectangle(this.cardboard_box_1.x, this.cardboard_box_1.y, 240,240);
    this.graphics.fillRectShape(this.box1_frame);


  	this.box2_frame = new Phaser.Geom.Rectangle(this.cardboard_box_2.x,this.cardboard_box_2.y,240,200);
    this.graphics.fillRectShape(this.box2_frame);

   	this.box3_frame = new Phaser.Geom.Rectangle(this.cardboard_box_3.x,this.cardboard_box_3.y,240,200);
    this.graphics.fillRectShape(this.box3_frame);

    this.paper.on('pointerdown', function(pointer, localX, localY, event) {
      console.log("click");
      this.alpha = 0;

    });
  }

  quitInteraction() {
    this.map.alpha = 0.0;
    this.notebook.alpha = 0.0;
    this.hideActivities();
    this.activityLocked.alpha = 0.0;
    this.character_north.alpha = 1.0;
    this.character_east.alpha = 1.0;
    this.character_south.alpha = 1.0;
    this.character_west.alpha = 1.0;
    this.characterMoveable = true;
    this.activityOneOpened = false;
    this.help_menu.alpha = 0.0;
	this.activatedQuiz = false;
	this.quitQuiz();
  }


  hideInteractionBoxes() {

  }

  hideActivities() {
    this.activity1.alpha = 0.0;
	this.activityLocked.alpha = 0.0;
    this.activity2.alpha = 0.0;
    this.activity3.alpha = 0.0;
    this.activity4.alpha = 0.0;
    this.activity5.alpha = 0.0;
    this.activity6.alpha = 0.0;
    this.activity1Page2.alpha = 0.0;
  }

  checkCorrectPaperOne() {
	if(this.activatedQuiz == true) {
  	if (this.key_R.isDown) {
		this.incomeStatement.setVisible(true);
  	}
	else 	
		this.incomeStatement.setVisible(false);
	//THE RIGHT BOX
    if (Phaser.Geom.Rectangle.ContainsPoint(this.box_1_zone, this.paper)) {
      this.paper.setVisible(false);
      this.paperTwo.setVisible(true);
      this.paperTwo.setInteractive();
      this.paperCount++;
			this.updateCorrectImage();

    } else if (Phaser.Geom.Rectangle.ContainsPoint(this.box_2_zone, this.paper) /*&& this.paperCount == 1*/) {
      this.paper.x = this.paper_stack.x;
      this.paper.y = this.paper_stack.y + 600;
		this.updateCorrectImage();
		
    } else if (Phaser.Geom.Rectangle.ContainsPoint(this.box_3_zone, this.paper)/* && this.paperCount == 1*/) {
      this.paper.x = this.paper_stack.x;
      this.paper.y = this.paper_stack.y + 600;
		this.updateCorrectImage();
    }
	}
  }

  checkCorrectPaperTwo() {
	this.incomeStatement.setVisible(false);
  	if (this.key_R.isDown) {
		this.retainedEarnings.setVisible(true);
  	} else
		this.retainedEarnings.setVisible(false);
	
    if (Phaser.Geom.Rectangle.ContainsPoint(this.box_2_zone, this.paperTwo) /*&& this.paperCount == 2*/) {
      this.paperTwo.setVisible(false);
      this.paperThree.setVisible(true);
      this.paperThree.setInteractive();
      this.paperCount++;
		this.updateCorrectImage();

    } else if (Phaser.Geom.Rectangle.ContainsPoint(this.box_1_zone, this.paperTwo) /*&& this.paperCount == 2*/) {
      this.paperTwo.x = this.paper_stack.x;
      this.paperTwo.y = this.paper_stack.y + 600;
			this.updateCorrectImage();

    } else if (Phaser.Geom.Rectangle.ContainsPoint(this.box_3_zone, this.paperTwo) /*&& this.paperCount == 2*/) {
      this.paperTwo.x = this.paper_stack.x;
      this.paperTwo.y = this.paper_stack.y + 600;
			this.updateCorrectImage();

		//this.cardboard_box_3.setVisible(true);
    }
	//this.updateCorrectImage();
  }

  checkCorrectPaperThree() {
	this.retainedEarnings.setVisible(false);
  	if (this.key_R.isDown) {
  		this.balanceSheet.setVisible(true);
  	}	else
		this.balanceSheet.setVisible(false);
	
    if (Phaser.Geom.Rectangle.ContainsPoint(this.box_3_zone, this.paperThree) && this.paperCount == 3) {
      this.paperThree.setVisible(false);
      this.paperCount++;
      this.quitQuiz();
    } else if (Phaser.Geom.Rectangle.ContainsPoint(this.box_1_zone, this.paperThree) && this.paperCount == 3) {
      this.paperThree.x = this.paper_stack.x;
      this.paperThree.y = this.paper_stack.y + 600;
      this.quitQuiz();

    } else if (Phaser.Geom.Rectangle.ContainsPoint(this.box_2_zone, this.paperThree) && this.paperCount == 3) {
      this.paperThree.x = this.paper_stack.x;
      this.paperThree.y = this.paper_stack.y + 600;
      this.quitQuiz();

    }
  }
	
	loadQuizImages(){
    	this.pressr = this.add.image(650, 40, 'pressr');
		this.pressr.setScale(.8);

		this.placements0 = this.add.image(240, 800, 'correctPlacements0');
		this.placements0.setScale(.7);
		this.placements0.setVisible(false);

		this.placements1 = this.add.image(240, 800, 'correctPlacements1');
		this.placements1.setScale(.7);

		this.placements2 = this.add.image(240, 800, 'correctPlacements2');
		this.placements2.setScale(.7);

		this.incomeStatement = this.add.image(675, 350, 'incomeStatement');
		this.incomeStatement.setVisible(false);
		this.incomeStatement.setDepth(500);

		this.incomeStatementText = this.add.image(1350, 30, 'incomeStatementText');
		this.incomeStatementText.setScale(.6);

		this.balanceSheet = this.add.image(675, 410, 'balanceSheet');
		this.balanceSheet.setVisible(false);
		this.balanceSheet.setDepth(500);
		this.balanceSheet.setScale(.85);

		this.balanceSheetText = this.add.image(1350, 630, 'balanceSheetText');
		this.balanceSheetText.setScale(.6);
		
		this.retainedEarnings = this.add.image(675, 210, 'retainedEarnings');
		this.retainedEarnings.setVisible(false);
		this.retainedEarnings.setDepth(500);

		this.retainedEarningsText = this.add.image(1350, 325, 'retainedEarningsText');
		this.retainedEarningsText.setScale(.6);
	}

	updateCorrectImage() {
		//console.log(this.paperCount);
		if (this.paperCount == 1) {
			this.placements0.setVisible(true);
			this.placements1.setVisible(false);
			this.placements2.setVisible(false);
		}	else if (this.paperCount == 2) {
			this.placements0.setVisible(false);
			this.placements1.setVisible(true);
			this.placements2.setVisible(false);
		}	else if (this.paperCount == 3) {
			this.placements0.setVisible(false);
			this.placements1.setVisible(false);
			this.placements2.setVisible(true);
		}

	}

  checkNextPage() {
    if (this.activityOneOpened == true && this.key_2.isDown) {
      this.activity1.alpha = 0;
      this.activity1Page2.alpha = 1;
    } else if (this.activityOneOpened == true && this.key_1.isDown) {
      this.activity1.alpha = 1;
      this.activity1Page2.alpha = 0;
    }
  }

  helpMenu() {
      this.help_menu.alpha = 1.0;
      this.helpOpen = true;
  }
}
