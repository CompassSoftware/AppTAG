class one_lesson extends Phaser.Scene {

  constructor() {
    super("one_Lesson");
    this.room3_quizActive = false;
    this.room3_activatedQuiz = false;
    this.room3_unlocked = false;
    this.room3_paperMoveable = false;
    this.room3_activityOneOpened = false;
    this.room3_activityTwoOpened = false;
    this.room3_activityThreeOpened = false;
    this.room3_activityFourOpened = false;
    this.room3_activityFiveOpened = false;
    this.room3_activitySixOpened = false;
    this.room3_helpOpen = false;
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
    if (this.room3_key_H.isDown) {
      this.helpMenu();
    }

    if (this.room3_activityOneOpened) {
      this.checkNextPage();
    }
    if (this.room3_activityTwoOpened) {
      this.checkNextPage();
    }
    // if (this.room3_activityThreeOpened) {
    //   this.checkNextPage();
    // }
    // if (this.room3_activityFourOpened) {
    //   this.checkNextPage();
    // }
    // if (this.room3_activityFiveOpened) {
    //   this.checkNextPage();
    // }
    // if (this.room3_activitySixOpened) {
    //   this.checkNextPage();
    // }


    if (this.room3_key_U.isDown && this.room3_unlocked == false) {
      room3_activity1Locked = false;
      room3_activity2Locked = false;
      room3_activity3Locked = false;
      room3_activity4Locked = false;
      room3_activity5Locked = false;
      room3_activity6Locked = false;
      room3_activity6Complete = true;
      this.room3_unlocked = true;
    }

    if (this.room3_key_M.isDown) {
      this.room3_map.alpha = 1.0;
      characterMoveable = false;
      this.room3_character_north.alpha = 0.0;
      this.room3_character_east.alpha = 0.0;
      this.room3_character_south.alpha = 0.0;
      this.room3_character_west.alpha = 0.0;
    }

    if (this.room3_key_B.isDown) {
      this.room3_notebook.alpha = 1.0;
      room3_characterMoveable = false;
      this.room3_character_north.alpha = 0.0;
      this.room3_character_east.alpha = 0.0;
      this.room3_character_south.alpha = 0.0;
      this.room3_character_west.alpha = 0.0;
    }


    if (this.room3_key_Q.isDown && this.room3_activatedQuiz == false) {
      this.quitInteraction();
    }

    if (this.room3_quizActive == true && this.room3_activatedQuiz == false && this.room3_key_E.isDown) {
      this.activateQuiz();
      this.room3_activatedQuiz = true;
    }

    if (this.room3_quizActive == true && this.room3_key_Q.isDown && this.room3_activatedQuiz == true) {
      this.quitQuiz();
      this.room3_activatedQuiz = false;
    }

    if (this.room3_activatedQuiz == false) {
        this.movePlayer();
        this.checkInteractValidity();
      }
  if (this.room3_activatedQuiz == false)
    this.room3_characterMoveable = true;
    }


/***********************************************************************************************
======================================HELPER METHODS============================================
*///////////////////////////////////////////////////////////////////////////////////////////////
  /* loadAssests
   *
   * Loads images to be used and sets them into a variable name.
  */
  loadAssets() {
  this.load.image('room3_pressr', 'assets/pressr.png');
    this.load.image('room3_one_lesson_BG', 'assets/one_lesson_BG.png');
    this.load.image('room3_character_north', 'assets/character_north.png');
    this.load.image('room3_character_east', 'assets/character_east.png');
    this.load.image('room3_character_south', 'assets/character_south.png');
    this.load.image('room3_character_west', 'assets/character_west.png');
    this.load.image('room3_redCharacter', 'assets/redCharacter.png');
    this.load.image('activity1A', 'assets/Panels/RoomThree/PanelOneA.png');
    this.load.image('activity1B', 'assets/Panels/RoomThree/PanelOneB.png');
    this.load.image('activity1C', 'assets/Panels/RoomThree/PanelOneC.png');
    this.load.image('activity1D', 'assets/Panels/RoomThree/PanelOneD.png');
    this.load.image('activity2A', 'assets/Panels/RoomThree/PanelTwoA.png');
    this.load.image('activity2B', 'assets/Panels/RoomThree/PanelTwoB.png');
    this.load.image('activity2C', 'assets/Panels/RoomThree/PanelTwoC.png');
    this.load.image('room3_E_KeyImg', 'assets/E_Key.png');
    this.load.image('room3_wall_info_1', 'assets/wall_art.png');
    this.load.image('room3_wall_info_2', 'assets/wall_art.png');
    this.load.image('room3_wall_info_3', 'assets/wall_art.png');
    this.load.image('room3_wall_info_4', 'assets/wall_art.png');
    this.load.image('room3_wall_info_5', 'assets/wall_art.png');
    this.load.image('room3_wall_info_6', 'assets/wall_art.png');
    this.load.image('room3_floor', 'assets/floor_room3.jpg');
    this.load.image('room3_map', 'assets/map.png');
    this.load.image('room3_notebook', 'assets/notebook.png');
    this.load.image('room3_activityLocked', 'assets/activityLocked.png');
    this.load.image('room3_help_menu', 'assets/help_menu.png');

  }

  /* createImages
   *
   * Adds the image to the game board
  */
  createImages() {
    this.room3_e_pressed = false;
    this.room3_papers_moved = false;
    this.room3_background = this.add.image(768, 432, 'room3_one_lesson_BG');
    this.room3_character_north = this.add.image(768, 432, 'room3_character_north');
    this.room3_character_east = this.add.image(768, 432, 'room3_character_east');
    this.room3_character_south = this.add.image(768, 432, 'room3_character_south');
    this.room3_character_west = this.add.image(768, 432, 'room3_character_west');
    this.room3_E_KeyImg = this.add.image(this.room3_character_north.x+40, this.room3_character_north.y+40, 'room3_E_KeyImg');
    this.activity1A = this.add.image(768, 432, 'activity1A');
    this.activity1B = this.add.image(768, 432, 'activity1B');
    this.activity1C = this.add.image(768, 432, 'activity1C');
    this.activity1D = this.add.image(768, 432, 'activity1D');
    this.activity2A = this.add.image(768, 432, 'activity2A');
    this.activity2B = this.add.image(768, 432, 'activity2B');
    this.activity2C = this.add.image(768, 432, 'activity2C');
    this.room3_wall_info_1 = this.add.image(305, 75, 'room3_wall_info_1');
    this.room3_wall_info_2 = this.add.image(768, 75, 'room3_wall_info_2');
    this.room3_wall_info_3 = this.add.image(1232, 75, 'room3_wall_info_3');
    this.room3_wall_info_4 = this.add.image(305, 790, 'room3_wall_info_4');
    this.room3_wall_info_5 = this.add.image(768, 790, 'room3_wall_info_5');
    this.room3_wall_info_6 = this.add.image(1232, 790, 'room3_wall_info_6');
    this.room3_floor = this.add.image(768, 433, 'room3_floor');
    this.room3_map = this.add.image(768, 432, 'room3_map');
    this.room3_notebook = this.add.image(768, 432, 'room3_notebook');
    this.room3_activityLocked = this.add.image(768, 432, 'room3_activityLocked');
    this.room3_help_menu = this.add.image(768, 432, 'room3_help_menu');
  }

  /* setAlphas
   *
   * sets the alphas to to items in the game to zero so they are not visible at the beginning.
  */
  setAlphas() {
    this.room3_map.alpha = 0.0;
    this.room3_notebook.alpha = 0.0;
    this.room3_activityLocked.alpha = 0.0;
    this.room3_E_KeyImg.alpha = 0.0;
    this.room3_help_menu.alpha = 0.0;
    this.hideActivities();
  }

  /* setDepths
   *
   * Sets the depth of each object on the screen.
  */
  setDepths() {
    this.room3_floor.setDepth(0);
    this.room3_character_north.setDepth(50);
    this.room3_character_east.setDepth(50);
    this.room3_character_south.setDepth(50);
    this.room3_character_west.setDepth(50);
    this.room3_E_KeyImg.setDepth(49);

    this.activity1A.setDepth(100);
    this.activity1B.setDepth(100);
    this.activity1C.setDepth(100);
    this.activity1D.setDepth(100);
    this.activity2A.setDepth(99);
    this.activity2B.setDepth(99);
    this.activity2C.setDepth(99);

    this.room3_map.setDepth(100);
    // this.room3_paper_stack.setDepth(1);
    this.room3_notebook.setDepth(100);
    this.room3_help_menu.setDepth(100);
  }

  /* setScales
   *
   * Scales the size of each object.
  */
  setScales() {
    this.room3_E_KeyImg.setScale(0.4);
    this.room3_wall_info_1.setScale(0.75);
    this.room3_wall_info_2.setScale(0.75);
    this.room3_wall_info_3.setScale(0.75);
    this.room3_wall_info_4.setScale(0.75);
    this.room3_wall_info_5.setScale(0.75);
    this.room3_wall_info_6.setScale(0.75);
    this.room3_notebook.setScale(0.75);
    this.room3_map.setScale(0.75);
    this.room3_character_north.setScale(3);
    this.room3_character_south.setScale(3);
    this.room3_character_west.setScale(3);
    this.room3_character_east.setScale(3);
    this.room3_floor.scaleY = 0.526;
    this.room3_floor.scaleX = 0.6178;

  }

  /* setRotations
   *
   * Sets the rotation that each object sits at.
  */
  setRotations() {
    this.room3_wall_info_4.rotation = 3.14;
    this.room3_wall_info_5.rotation = 3.14;
    this.room3_wall_info_6.rotation = 3.14;
   }

  /* createInteractionZones
   *
   * Sets the area that you can interact with each object
  */
  createInteractionZones() {
    this.room3_graphics = this.add.graphics({fillStyle: {color: 0xFFFFFF, alpha: 0.0}});
    //this.graphicsTest = this.add.graphics({fillStyle: {color: 0x4F4F4F, alpha: 1.0}});
    //TOP ZONES
                                                //xpos ypos x   y
    this.room3_top_left_info = new Phaser.Geom.Rectangle(175,150,240,150);
    this.room3_graphics.fillRectShape(this.room3_top_left_info);
                                                //xpos ypos x  y
    this.room3_top_mid_info = new Phaser.Geom.Rectangle(650,150,240,150);
    this.room3_graphics.fillRectShape(this.room3_top_mid_info);
                                                 //xpos ypos x   y
    this.room3_top_right_info = new Phaser.Geom.Rectangle(1120,150,240,150);
    this.room3_graphics.fillRectShape(this.room3_top_right_info);

    //BOTTOM ZONES

    this.room3_bot_left_info = new Phaser.Geom.Rectangle(175,565,240,150);
    this.room3_graphics.fillRectShape(this.room3_bot_left_info);

    this.room3_bot_mid_info = new Phaser.Geom.Rectangle(650,565,240,150);
    this.room3_graphics.fillRectShape(this.room3_bot_mid_info);

    this.room3_bot_right_info = new Phaser.Geom.Rectangle(1120,565,240,150);
    this.room3_graphics.fillRectShape(this.room3_bot_right_info);

  }

  /* assignKeybinds
   *
   * Sets keybinds to the keyboard
  */
  assignKeybinds() {
        //KEYBOARD INPUT
    this.room3_key_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.room3_key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.room3_key_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.room3_key_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.room3_key_E = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    this.room3_key_Q = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    this.room3_key_M = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
    this.room3_key_B = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
    this.room3_key_U = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.U);
    this.room3_key_1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
    this.room3_key_2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
    this.room3_key_3 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);
    this.room3_key_4 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR);
    this.room3_key_5 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FIVE);
    this.room3_key_6 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SIX);
    this.room3_key_R = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    this.room3_key_H = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);

  }

  /* imagesDraggable
   *
   * Makes an image draggable
  */
  imagesDraggable() {
    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

        gameObject.x = dragX;
        gameObject.y = dragY;

    });

  }
/* checkActivityOpened
*
* helper method to set the activities to opened or closed
*/

  checkActivityOpened(room3_one, room3_two, room3_three, room3_four, room3_five, room3_six) {
    this.room3_activityOneOpened = room3_one;
    this.room3_activityTwoOpened = room3_two;
    this.room3_activityThreeOpened = room3_three;
    this.room3_activityFourOpened = room3_four;
    this.room3_activityFiveOpened = room3_five;
    this.room3_activitySixOpened = room3_six;

  }

  /* checkInteractValidity
   *
   * Checks to see if the character can interact with the object
  */

  checkInteractValidity() {
    if (Phaser.Geom.Rectangle.ContainsPoint(this.room3_top_mid_info, this.room3_character_north)) {
      this.room3_E_KeyImg.x = this.room3_character_north.x;
      this.room3_E_KeyImg.y = this.room3_character_north.y-75;
      this.room3_E_KeyImg.alpha = 1.0;
      if (this.room3_key_E.isDown) {
        this.room3_activity1A.alpha = 1.0;
        this.room3_characterMoveable = false;
        this.checkActivityOpened(true, false, false, false, false, false);
    this.room3_activity2Locked = false;

    //COME BACK AND CHANGE THIS LATER
    this.room3_activity6Complete = true;
      }

    } else if (Phaser.Geom.Rectangle.ContainsPoint(this.room3_bot_left_info, this.room3_character_north)) {
      this.room3_E_KeyImg.x = this.room3_character_north.x;
      this.room3_E_KeyImg.y = this.room3_character_north.y+75;
      this.room3_E_KeyImg.alpha = 1.0;
    if (this.room3_key_E.isDown && this.room3_activity2Locked == false) {
        this.room3_activity2A.alpha = 1.0;
        this.checkActivityOpened(false, true, false, false, false, false);
    this.room3_activity3Locked = false;
  } else if (this.room3_key_E.isDown && this.room3_activity2Locked == true) {
          this.room3_activityLocked.alpha = 1.0;
          this.room3_characterMoveable = false;
          }

  } //else if (Phaser.Geom.Rectangle.ContainsPoint(this.room3_top_left_info, this.room3_character_north)) {
  //     this.room3_E_KeyImg.x = this.room3_character_north.x;
  //     this.room3_E_KeyImg.y = this.room3_character_north.y-75;
  //     this.room3_E_KeyImg.alpha = 1.0;
  //     if (this.room3_key_E.isDown && this.room3_activity3Locked == false) {
  //       this.room3_activity3A.alpha = 1.0;
  //       this.checkActivityOpened(false, false, true, false, false, false);
  //   this.room3_activity4Locked = false;
  // } else if (this.room3_key_E.isDown && this.room3_activity3Locked == true){
  //       this.room3_activityLocked.alpha = 1.0;
  //       this.room3_characterMoveable = false;
  //       }
  //
  //   } else if (Phaser.Geom.Rectangle.ContainsPoint(this.room3_bot_mid_info, this.room3_character_north)) {
  //     this.room3_E_KeyImg.x = this.room3_character_north.x;
  //     this.room3_E_KeyImg.y = this.room3_character_north.y+75;
  //     this.room3_E_KeyImg.alpha = 1.0;
  //     if (this.room3_key_E.isDown && this.room3_activity4Locked == false) {
  //     this.room3_activity4A.alpha = 1.0;
  //     this.checkActivityOpened(false, false, false, true, false, false);
  //   this.room3_activity5Locked = false;
  // } else if (this.room3_key_E.isDown && this.room3_activity4Locked == true){
  //       this.room3_activityLocked.alpha = 1.0;
  //       this.room3_characterMoveable = false;
  //       }
  //
  //
  //   }
	// else if (Phaser.Geom.Rectangle.ContainsPoint(this.room3_top_right_info, this.room3_character_north)) {
	// 	this.room3_E_KeyImg.x = this.room3_character_north.x;
	// 	this.room3_E_KeyImg.y = this.room3_character_north.y-75;
  //
	// 	this.room3_E_KeyImg.alpha = 1.0;
	// 	if (this.room3_key_E.isDown && this.room3_activity5Locked == false) {
	// 		this.room3_activity5A.alpha = 1.0;
	// 		this.checkActivityOpened(false, false, false, false, true, false);
	// 		this.room3_activity6Locked = false;
	// 	}
	// 	else if (this.room3_key_E.isDown && this.room3_activity5Locked == true){
  //         this.room3_activityLocked.alpha = 1.0;
  //         this.room3_characterMoveable = false;
  //       }
  //
  //    }
	// else if (Phaser.Geom.Rectangle.ContainsPoint(this.room3_bot_right_info, this.room3_character_north)) {
	// 	this.room3_E_KeyImg.x = this.room3_character_north.x;
	// 	this.room3_E_KeyImg.y = this.room3_character_north.y+75;
	// 	this.room3_E_KeyImg.alpha = 1.0;
	// 	if (this.room3_key_E.isDown && this.room3_activity6Locked == false) {
	// 		this.room3_activity6A.alpha = 1.0;
	// 		this.checkActivityOpened(false, false, false, false, false, true);
	// 		activity6Complete = true;
	// 	}
	// 	else if (this.room3_key_E.isDown && this.room3_activity6Locked == true){
	// 		this.room3_activityLocked.alpha = 1.0;
	// 		this.room3_characterMoveable = false;
  //      }
  //
  //   }
    else {
    this.hideActivities();
    this.room3_E_KeyImg.alpha = 0.0;
    }
  }


  /* setCharacterAlpha
   *
   * Sets the alpha of each facing of the character
   * Call this method with the argument as (N,E,S,W)
  */
  setCharacterAlpha() {
    this.room3_character_north.alpha = arguments[0];
    this.room3_character_east.alpha = arguments[1];
    this.room3_character_south.alpha = arguments[2];
    this.room3_character_west.alpha = arguments[3];
  }

  /* movePlayer
   *
   *
  */
  movePlayer() {
    //setCharacterAlpha is in helper.js and arguments go N,E,S,W
    this.setCharacterAlpha(0,0,1,0);

    //Character moves up
    if(this.room3_key_W.isDown && this.room3_characterMoveable == true) {
  if(this.room3_character_north.y > 185){
          this.room3_character_north.y -= 5;
          this.room3_character_east.y -= 5;
          this.room3_character_south.y -= 5;
          this.room3_character_west.y -= 5;

          this.setCharacterAlpha(1,0,0,0);



    }
    //Character moves left
  } if (this.room3_key_A.isDown && this.room3_characterMoveable == true) {
        if(this.room3_character_west.x > 210){
          this.room3_character_west.x -= 5;
          this.room3_character_east.x -= 5;
          this.room3_character_south.x -= 5;
          this.room3_character_north.x -= 5;

          this.setCharacterAlpha(0,0,0,1);
  }

    }
    //Character moves down
     if (this.room3_key_S.isDown && this.room3_characterMoveable == true) {
  if(this.room3_character_south.y < 680){
          this.room3_character_south.y += 5;
          this.room3_character_east.y += 5;
          this.room3_character_north.y += 5;
          this.room3_character_west.y += 5;

          this.setCharacterAlpha(0,0,1,0);
    }

    }
    //Character moves right
    if (this.room3_key_D.isDown && this.room3_characterMoveable == true) {
        if(this.room3_character_east.x < 1325){
          this.room3_character_east.x += 5;
          this.room3_character_north.x += 5;
          this.room3_character_south.x += 5;
          this.room3_character_west.x += 5;

          this.setCharacterAlpha(0,1,0,0);
    }
    }
  }

  /* movePaper
   *
   * makes the paper moveable in the test activity
  */
  movePaper(moveThisPaper) {
    if(this.room3_key_W.isDown && this.room3_paperMoveable == true) {
      room3_moveThisPaper.y -= 7;
    } if (this.room3_key_A.isDown && this.room3_paperMoveable == true) {
      room3_moveThisPaper.x -= 7;
    } if (this.room3_key_S.isDown && this.room3_paperMoveable == true) {
      room3_moveThisPaper.y += 7;
    } if (this.room3_key_D.isDown && this.room3_paperMoveable == true) {
      room3_moveThisPaper.x += 7;
    }
  }

  /* quitInteraction
   *
   * Sets the alphas to 0 so that the interaction is quit.
  */
  quitInteraction() {
    this.room3_map.alpha = 0.0;
    this.room3_notebook.alpha = 0.0;
    this.hideActivities();
    this.room3_activityLocked.alpha = 0.0;
    this.room3_character_north.alpha = 1.0;
    this.room3_character_east.alpha = 1.0;
    this.room3_character_south.alpha = 1.0;
    this.room3_character_west.alpha = 1.0;
    this.room3_characterMoveable = true;
    this.room3_activityOneOpened = false;
    this.room3_activityTwoOpened = false;
    this.room3_activityThreeOpened = false;
    this.room3_activityFourOpened = false;
    this.room3_activityFiveOpened = false;
    this.room3_activitySixOpened = false;
    this.room3_help_menu.alpha = 0.0;
  this.room3_activatedQuiz = false;
  }


  hideInteractionBoxes() {

  }

  /* hideActivities
   *
   * Sets the alphas to the activities to 0 so that they are hidden.
  */
  hideActivities() {
    this.activity1A.alpha = 0.0;
    this.activity1B.alpha = 0.0;
    this.activity1C.alpha = 0.0;
    this.activity1D.alpha = 0.0;
    this.activity2A.alpha = 0.0;
    this.activity2B.alpha = 0.0;
    this.activity2C.alpha = 0.0;


  }

  activityAlphas(oneA, oneB, oneC, oneD, twoA, twoB, twoC) {
  this.activity1A.alpha = oneA;
  this.activity1B.alpha = oneB;
  this.activity1C.alpha = oneC;
  this.activity1D.alpha = oneD;
  this.activity2A.alpha = twoA;
  this.activity2B.alpha = twoB;
  this.activity2C.alpha = twoC;

}


  /* checkNextPage
   *
   *
  */

  checkNextPage() {
  if (this.activityOneOpened == true && this.key_1.isDown) {
    this.activityAlphas(1, 0, 0, 0, 0 ,0 ,0);

  } else if (this.activityOneOpened == true && this.key_2.isDown) {
    this.activityAlphas(0, 1, 0, 0, 0, 0, 0);
  }
  else if (this.activityOneOpened == true && this.key_3.isDown) {
    this.activityAlphas(0, 0, 1, 0, 0, 0, 0);
  }
  else if (this.activityOneOpened == true && this.key_4.isDown) {
    this.activityAlphas(0, 0, 0, 1, 0, 0, 0);
  }

  if (this.activityTwoOpened == true && this.key_1.isDown) {
    this.activityAlphas(0, 0, 0, 0, 1, 0, 0);
  }
  else if (this.activityOneOpened == true && this.key_2.isDown) {
    this.activityAlphas(0, 0, 0, 0, 0, 1, 0);
  }
  else if (this.activityOneOpened == true && this.key_3.isDown) {
    this.activityAlphas(0, 0, 0, 0, 0, 0, 1);
  }
}

  /* helpMenu
   *
   * Sets the alpha of the help menu to 1 so that it is visible
  */
  helpMenu() {
      this.room3_help_menu.alpha = 1.0;
      this.room3_helpOpen = true;
  }
}
