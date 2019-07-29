class two_lesson extends Phaser.Scene {

  constructor() {
    super("two_Lesson");
    this.room2_quizActive = false;
    this.room2_activatedQuiz = false;
    this.room2_unlocked = false;
    this.room2_paperMoveable = false;
    this.room2_activityOneOpened = false;
    this.room2_activityTwoOpened = false;
    this.room2_activityThreeOpened = false;
    this.room2_activityFourOpened = false;
    this.room2_activityFiveOpened = false;
    this.room2_activitySixOpened = false;
    this.room2_helpOpen = false;
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
    if (this.room2_key_H.isDown) {
      this.helpMenu();
    }

    if (this.room2_activityOneOpened) {
      this.checkNextPage();
    }
    if (this.room2_activityTwoOpened) {
      this.checkNextPage();
    }
    if (this.room2_activityThreeOpened) {
      this.checkNextPage();
    }
    if (this.room2_activityFourOpened) {
      this.checkNextPage();
    }
    if (this.room2_activityFiveOpened) {
      this.checkNextPage();
    }


    if (this.room2_key_U.isDown && this.room2_unlocked == false) {
      room2_activity1Locked = false;
      room2_activity2Locked = false;
      room2_activity3Locked = false;
      room2_activity4Locked = false;
      room2_activity5Locked = false;
      room2_activity6Locked = false;
      room2_activity6Complete = true;
      this.room2_unlocked = true;
    }

    if (this.room2_key_M.isDown) {
      this.room2_map.alpha = 1.0;
      characterMoveable = false;
      this.room2_character_north.alpha = 0.0;
      this.room2_character_east.alpha = 0.0;
      this.room2_character_south.alpha = 0.0;
      this.room2_character_west.alpha = 0.0;
    }

    if (this.room2_key_B.isDown) {
      this.room2_notebook.alpha = 1.0;
      room2_characterMoveable = false;
      this.room2_character_north.alpha = 0.0;
      this.room2_character_east.alpha = 0.0;
      this.room2_character_south.alpha = 0.0;
      this.room2_character_west.alpha = 0.0;
    }


    if (this.room2_key_Q.isDown && this.room2_activatedQuiz == false) {
      this.quitInteraction();
    }

    if (this.room2_quizActive == true && this.room2_activatedQuiz == false && this.room2_key_E.isDown) {
      this.activateQuiz();
      this.room2_activatedQuiz = true;
    }

    if (this.room2_quizActive == true && this.room2_key_Q.isDown && this.room2_activatedQuiz == true) {
      this.quitQuiz();
      this.room2_activatedQuiz = false;
    }

    if (this.room2_activatedQuiz == false) {
        this.movePlayer();
        this.checkInteractValidity();
    } else if (this.room2_activatedQuiz = true) {
      if (this.room2_paperCount == 1) {
        this.movePaper(this.room2_paper);
        this.checkCorrectPaperOne();
      } else if (this.room2_paperCount == 2) {
          this.movePaper(this.room2_paperTwo);
          this.checkCorrectPaperTwo();

      } else if (this.room2_paperCount == 3) {
          this.movePaper(this.room2_paperThree);
          this.checkCorrectPaperThree();
        }

      }
  if (this.room2_activatedQuiz == false)
    this.room2_characterMoveable = true;
    }


/***********************************************************************************************
======================================HELPER METHODS============================================
*///////////////////////////////////////////////////////////////////////////////////////////////
  /* loadAssests
   *
   * Loads images to be used and sets them into a variable name.
  */
  loadAssets() {
  this.load.image('room2_pressr', 'assets/pressr.png');
    this.load.image('room2_one_lesson_BG', 'assets/one_lesson_BG.png');
    this.load.image('room2_character_north', 'assets/character_north.png');
    this.load.image('room2_character_east', 'assets/character_east.png');
    this.load.image('room2_character_south', 'assets/character_south.png');
    this.load.image('room2_character_west', 'assets/character_west.png');
    this.load.image('room2_redCharacter', 'assets/redCharacter.png');
    this.load.image('room2_activity1A', 'assets/Panels/RoomTwo/PanelOneA.png');
    this.load.image('room2_activity1B', 'assets/Panels/RoomTwo/PanelOneB.png');
    this.load.image('room2_activity1C', 'assets/Panels/RoomTwo/PanelOneC.png');
    this.load.image('room2_activity1D', 'assets/Panels/RoomTwo/PanelOneD.png');
    this.load.image('room2_activity2A', 'assets/Panels/RoomTwo/PanelTwoA.png');
    this.load.image('room2_activity2B', 'assets/Panels/RoomTwo/PanelTwoB.png');
    this.load.image('room2_activity2C', 'assets/Panels/RoomTwo/PanelTwoC.png');
    this.load.image('room2_activity2D', 'assets/Panels/RoomTwo/PanelTwoD.png');
    this.load.image('room2_activity3A', 'assets/Panels/RoomTwo/PanelThreeA.png');
    this.load.image('room2_activity3B', 'assets/Panels/RoomTwo/PanelThreeB.png');
    this.load.image('room2_activity4A', 'assets/Panels/RoomTwo/PanelFourA.png');
    this.load.image('room2_activity4B', 'assets/Panels/RoomTwo/PanelFourB.png');
    this.load.image('room2_activity4C', 'assets/Panels/RoomTwo/PanelFourC.png');
    this.load.image('room2_activity4D', 'assets/Panels/RoomTwo/PanelFourD.png');
    this.load.image('room2_activity4E', 'assets/Panels/RoomTwo/PanelFourE.png');
    this.load.image('room2_activity5A', 'assets/Panels/RoomTwo/PanelFiveA.png');
    this.load.image('room2_activity5B', 'assets/Panels/RoomTwo/PanelFiveB.png');
    this.load.image('room2_activity5C', 'assets/Panels/RoomTwo/PanelFiveC.png');
    this.load.image('room2_E_KeyImg', 'assets/E_Key.png');
    this.load.image('room2_wall_info_1', 'assets/wall_art.png');
    this.load.image('room2_wall_info_2', 'assets/wall_art.png');
    this.load.image('room2_wall_info_3', 'assets/wall_art.png');
    this.load.image('room2_wall_info_4', 'assets/wall_art.png');
    this.load.image('room2_wall_info_5', 'assets/wall_art.png');
    this.load.image('room2_wall_info_6', 'assets/wall_art.png');
    this.load.image('room2_floor', 'assets/floor_1.jpg');
	this.load.image('room2_hole', 'assets/hole.png');	
    this.load.image('room2_map', 'assets/map.png');
    this.load.image('room2_notebook', 'assets/notebook.png');
    this.load.image('room2_activityLocked', 'assets/activityLocked.png');
    this.load.image('room2_help_menu', 'assets/help_menu.png');

  }

  /* createImages
   *
   * Adds the image to the game board
  */
  createImages() {
    this.room2_e_pressed = false;
    this.room2_papers_moved = false;
    this.room2_background = this.add.image(768, 432, 'room2_one_lesson_BG');
    this.room2_character_north = this.add.image(768, 432, 'room2_character_north');
    this.room2_character_east = this.add.image(768, 432, 'room2_character_east');
    this.room2_character_south = this.add.image(768, 432, 'room2_character_south');
    this.room2_character_west = this.add.image(768, 432, 'room2_character_west');
    this.room2_E_KeyImg = this.add.image(this.room2_character_north.x+40, this.room2_character_north.y+40, 'room2_E_KeyImg');
    this.room2_activity1A = this.add.image(768, 432, 'room2_activity1A');
    this.room2_activity1B = this.add.image(768, 432, 'room2_activity1B');
    this.room2_activity1C = this.add.image(768, 432, 'room2_activity1C');
    this.room2_activity1D = this.add.image(768, 432, 'room2_activity1D');
    this.room2_activity2A = this.add.image(768, 432, 'room2_activity2A');
    this.room2_activity2B = this.add.image(768, 432, 'room2_activity2B');
    this.room2_activity2C = this.add.image(768, 432, 'room2_activity2C');
    this.room2_activity2D = this.add.image(768, 432, 'room2_activity2D');
    this.room2_activity3A = this.add.image(768, 432, 'room2_activity3A');
    this.room2_activity3B = this.add.image(768, 432, 'room2_activity3B');
    this.room2_activity4A = this.add.image(768, 432, 'room2_activity4A');
    this.room2_activity4B = this.add.image(768, 432, 'room2_activity4B');
    this.room2_activity4C = this.add.image(768, 432, 'room2_activity4C');
    this.room2_activity4D = this.add.image(768, 432, 'room2_activity4D');
    this.room2_activity4E = this.add.image(768, 432, 'room2_activity4E');
    this.room2_activity5A = this.add.image(768, 432, 'room2_activity5A');
    this.room2_activity5B = this.add.image(768, 432, 'room2_activity5B');
    this.room2_activity5C = this.add.image(768, 432, 'room2_activity5C');
    this.room2_wall_info_1 = this.add.image(305, 75, 'room2_wall_info_1');
    this.room2_wall_info_2 = this.add.image(768, 75, 'room2_wall_info_2');
    this.room2_wall_info_3 = this.add.image(1232, 75, 'room2_wall_info_3');
    this.room2_wall_info_4 = this.add.image(305, 790, 'room2_wall_info_4');
    this.room2_wall_info_5 = this.add.image(768, 790, 'room2_wall_info_5');
    this.room2_wall_info_6 = this.add.image(1232, 790, 'room2_wall_info_6');
    this.room2_floor = this.add.image(769, 433, 'room2_floor');
    this.room2_map = this.add.image(768, 432, 'room2_map');
    this.room2_notebook = this.add.image(768, 432, 'room2_notebook');
    this.room2_activityLocked = this.add.image(768, 432, 'room2_activityLocked');
    this.room2_help_menu = this.add.image(768, 432, 'room2_help_menu');
	this.room2_hole = this.add.image(268, 432, 'room2_hole');
  }

  /* setAlphas
   *
   * sets the alphas to to items in the game to zero so they are not visible at the beginning.
  */
  setAlphas() {
    this.room2_map.alpha = 0.0;
    this.room2_notebook.alpha = 0.0;
    this.room2_activityLocked.alpha = 0.0;
    this.room2_E_KeyImg.alpha = 0.0;
    this.room2_help_menu.alpha = 0.0;
    this.hideActivities();
  }

  /* setDepths
   *
   * Sets the depth of each object on the screen.
  */
  setDepths() {
    this.room2_floor.setDepth(0);
    this.room2_character_north.setDepth(50);
    this.room2_character_east.setDepth(50);
    this.room2_character_south.setDepth(50);
    this.room2_character_west.setDepth(50);
    this.room2_E_KeyImg.setDepth(49);
    this.room2_activity1A.setDepth(100);
    this.room2_activity1B.setDepth(100);
    this.room2_activity1C.setDepth(100);
    this.room2_activity1D.setDepth(100);
    this.room2_activity2A.setDepth(100);
    this.room2_activity2B.setDepth(100);
    this.room2_activity2C.setDepth(100);
    this.room2_activity2D.setDepth(100);
    this.room2_activity3A.setDepth(100);
    this.room2_activity3B.setDepth(100);
    this.room2_activity4A.setDepth(100);
    this.room2_activity4B.setDepth(100);
    this.room2_activity4C.setDepth(100);
    this.room2_activity4D.setDepth(100);
    this.room2_activity4E.setDepth(100);
    this.room2_activity5A.setDepth(100);
    this.room2_activity5B.setDepth(100);
    this.room2_activity5C.setDepth(100);

    this.room2_map.setDepth(100);
    // this.room2_paper_stack.setDepth(1);
    this.room2_notebook.setDepth(100);
    this.room2_help_menu.setDepth(100);
  }

  /* setScales
   *
   * Scales the size of each object.
  */
  setScales() {
    this.room2_E_KeyImg.setScale(0.4);
    this.room2_wall_info_1.setScale(0.75);
    this.room2_wall_info_2.setScale(0.75);
    this.room2_wall_info_3.setScale(0.75);
    this.room2_wall_info_4.setScale(0.75);
    this.room2_wall_info_5.setScale(0.75);
    this.room2_wall_info_6.setScale(0.75);
    this.room2_notebook.setScale(0.75);
    this.room2_map.setScale(0.75);
    // this.room2_cardboard_box_1.setScale(0.39);
    // this.room2_cardboard_box_2.setScale(0.39);
    // this.room2_cardboard_box_3.setScale(0.39);
    // this.room2_paper_stack.setScale(0.35);
    this.room2_character_north.setScale(3);
    this.room2_character_south.setScale(3);
    this.room2_character_west.setScale(3);
    this.room2_character_east.setScale(3);
    this.room2_floor.scaleY = 0.71;
    this.room2_floor.scaleX = 0.99;

  }

  /* setRotations
   *
   * Sets the rotation that each object sits at.
  */
  setRotations() {
    this.room2_wall_info_4.rotation = 3.14;
    this.room2_wall_info_5.rotation = 3.14;
    this.room2_wall_info_6.rotation = 3.14;
  //   this.room2_cardboard_box_1.rotation = 0;
  //   this.room2_cardboard_box_2.rotation = 0;
  //   this.room2_cardboard_box_3.rotation = 0;
   }

  /* createInteractionZones
   *
   * Sets the area that you can interact with each object
  */
  createInteractionZones() {
    this.room2_graphics = this.add.graphics({fillStyle: {color: 0xFFFFFF, alpha: 0.0}});
    //this.graphicsTest = this.add.graphics({fillStyle: {color: 0x4F4F4F, alpha: 1.0}});
    //TOP ZONES
                                                //xpos ypos x   y
    this.room2_top_left_info = new Phaser.Geom.Rectangle(175,150,240,150);
    this.room2_graphics.fillRectShape(this.room2_top_left_info);
                                                //xpos ypos x  y
    this.room2_top_mid_info = new Phaser.Geom.Rectangle(650,150,240,150);
    this.room2_graphics.fillRectShape(this.room2_top_mid_info);
                                                 //xpos ypos x   y
    this.room2_top_right_info = new Phaser.Geom.Rectangle(1120,150,240,150);
    this.room2_graphics.fillRectShape(this.room2_top_right_info);

    //BOTTOM ZONES

    this.room2_bot_left_info = new Phaser.Geom.Rectangle(175,565,240,150);
    this.room2_graphics.fillRectShape(this.room2_bot_left_info);

    this.room2_bot_mid_info = new Phaser.Geom.Rectangle(650,565,240,150);
    this.room2_graphics.fillRectShape(this.room2_bot_mid_info);

    this.room2_bot_right_info = new Phaser.Geom.Rectangle(1120,565,240,150);
    this.room2_graphics.fillRectShape(this.room2_bot_right_info);
	
	this.room2_hole_zone = new Phaser.Geom.Rectangle(150, 432,240,150);
    this.room2_graphics.fillRectShape(this.room2_hole_zone);

    // this.room2_quiz1 = new Phaser.Geom.Rectangle(1120,308,240,250);
    // this.room2_graphics.fillRectShape(this.room2_quiz1);

    // this.room2_box_1_zone = new Phaser.Geom.Rectangle(1200,75,200,200);
    // this.room2_graphics.fillRectShape(this.room2_box_1_zone);
    //
    // this.room2_box_2_zone = new Phaser.Geom.Rectangle(1200,325,200,200);
    // this.room2_graphics.fillRectShape(this.room2_box_2_zone);
    //
    // this.room2_box_3_zone = new Phaser.Geom.Rectangle(1200,650,200,200);
    // this.room2_graphics.fillRectShape(this.room2_box_3_zone);
  }

  /* assignKeybinds
   *
   * Sets keybinds to the keyboard
  */
  assignKeybinds() {
        //KEYBOARD INPUT
    this.room2_key_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.room2_key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.room2_key_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.room2_key_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.room2_key_E = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    this.room2_key_Q = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    this.room2_key_M = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
    this.room2_key_B = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
    this.room2_key_U = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.U);
    this.room2_key_1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
    this.room2_key_2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
    this.room2_key_3 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);
    this.room2_key_4 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR);
    this.room2_key_5 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FIVE);
    this.room2_key_R = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    this.room2_key_H = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);

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

  checkActivityOpened(room2_one, room2_two, room2_three, room2_four, room2_five, room2_six) {
    this.room2_activityOneOpened = room2_one;
    this.room2_activityTwoOpened = room2_two;
    this.room2_activityThreeOpened = room2_three;
    this.room2_activityFourOpened = room2_four;
    this.room2_activityFiveOpened = room2_five;
    this.room2_activitySixOpened = room2_six;

  }

  /* checkInteractValidity
   *
   * Checks to see if the character can interact with the object
  */

  checkInteractValidity() {
    if (Phaser.Geom.Rectangle.ContainsPoint(this.room2_top_right_info, this.room2_character_north)) {
      this.room2_E_KeyImg.x = this.room2_character_north.x;
      this.room2_E_KeyImg.y = this.room2_character_north.y-75;
      this.room2_E_KeyImg.alpha = 1.0;
      if (this.room2_key_E.isDown) {
        this.room2_activity1A.alpha = 1.0;
        this.room2_characterMoveable = false;
        this.checkActivityOpened(true, false, false, false, false, false);
    this.room2_activity2Locked = false;

    //COME BACK AND CHANGE THIS LATER
    this.room2_activity6Complete = true;
      }

    } else if (Phaser.Geom.Rectangle.ContainsPoint(this.room2_bot_mid_info, this.room2_character_north)) {
      this.room2_E_KeyImg.x = this.room2_character_north.x;
      this.room2_E_KeyImg.y = this.room2_character_north.y+75;
      this.room2_E_KeyImg.alpha = 1.0;
    if (this.room2_key_E.isDown && this.room2_activity2Locked == false) {
        this.room2_activity2A.alpha = 1.0;
        this.checkActivityOpened(false, true, false, false, false, false);
    this.room2_activity3Locked = false;
  } else if (this.room2_key_E.isDown && this.room2_activity2Locked == true) {
          this.room2_activityLocked.alpha = 1.0;
          this.room2_characterMoveable = false;
          }

    } else if (Phaser.Geom.Rectangle.ContainsPoint(this.room2_top_mid_info, this.room2_character_north)) {
      this.room2_E_KeyImg.x = this.room2_character_north.x;
      this.room2_E_KeyImg.y = this.room2_character_north.y-75;
      this.room2_E_KeyImg.alpha = 1.0;
      if (this.room2_key_E.isDown && this.room2_activity3Locked == false) {
        this.room2_activity3A.alpha = 1.0;
        this.checkActivityOpened(false, false, true, false, false, false);
    this.room2_activity4Locked = false;
  } else if (this.room2_key_E.isDown && this.room2_activity3Locked == true){
        this.room2_activityLocked.alpha = 1.0;
        this.room2_characterMoveable = false;
        }

    } else if (Phaser.Geom.Rectangle.ContainsPoint(this.room2_bot_right_info, this.room2_character_north)) {
      this.room2_E_KeyImg.x = this.room2_character_north.x;
      this.room2_E_KeyImg.y = this.room2_character_north.y+75;
      this.room2_E_KeyImg.alpha = 1.0;
      if (this.room2_key_E.isDown && this.room2_activity4Locked == false) {
      this.room2_activity4A.alpha = 1.0;
      this.checkActivityOpened(false, false, false, true, false, false);
    this.room2_activity5Locked = false;
  } else if (this.room2_key_E.isDown && this.room2_activity4Locked == true){
        this.room2_activityLocked.alpha = 1.0;
        this.room2_characterMoveable = false;
        }


    } 
	else if (Phaser.Geom.Rectangle.ContainsPoint(this.room2_top_left_info, this.room2_character_north)) {
		this.room2_E_KeyImg.x = this.room2_character_north.x;
		this.room2_E_KeyImg.y = this.room2_character_north.y-75;

		this.room2_E_KeyImg.alpha = 1.0;
		if (this.room2_key_E.isDown && this.room2_activity5Locked == false) {
			this.room2_activity5A.alpha = 1.0;
			this.checkActivityOpened(false, false, false, false, true, false);
			this.room2_activity6Locked = false;
		}
		else if (this.room2_key_E.isDown && this.room2_activity5Locked == true){
          this.room2_activityLocked.alpha = 1.0;
          this.room2_characterMoveable = false;
        }

     } 
	else if (Phaser.Geom.Rectangle.ContainsPoint(this.room2_bot_left_info, this.room2_character_north)) {
		this.room2_E_KeyImg.x = this.room2_character_north.x;
		this.room2_E_KeyImg.y = this.room2_character_north.y+75;
		this.room2_E_KeyImg.alpha = 1.0;
		if (this.room2_key_E.isDown && this.room2_activity6Locked == false) {
			this.room2_activity6.alpha = 1.0;
			this.checkActivityOpened(false, false, false, false, false, true);
			activity6Complete = true;
		} 
		else if (this.room2_key_E.isDown && this.room2_activity6Locked == true){
			this.room2_activityLocked.alpha = 1.0;
			this.room2_characterMoveable = false;
       }

    }
	else if (Phaser.Geom.Rectangle.ContainsPoint(this.room2_hole_zone, this.room2_character_north)) {
		this.room2_E_KeyImg.x = this.room2_character_north.x;
		this.room2_E_KeyImg.y = this.room2_character_north.y+75;
		this.room2_E_KeyImg.alpha = 1.0;
		if (this.room2_key_E.isDown) {
		console.log("To room 2 activity 1")
			this.scene.start("two_Activity");
		} 

    }
    //else if (Phaser.Geom.Rectangle.ContainsPoint(this.room2_quiz1, this.room2_character_north)){
    //   this.room2_E_KeyImg.x = this.room2_character_north.x+75;
    //   this.room2_E_KeyImg.y = this.room2_character_north.y;
    //   this.room2_E_KeyImg.alpha = 1.0;
    //   if (this.room2_key_E.isDown && this.room2_activity6Complete == true) {
    //     this.room2_quizActive = true;
    //   } else if (this.room2_key_E.isDown && this.room2_activity6Complete == false){
    //       this.room2_activityLocked.alpha = 1.0;
    //     }
    // }
    else {
    this.hideActivities();
    this.room2_E_KeyImg.alpha = 0.0;
    }
  }


  /* setCharacterAlpha
   *
   * Sets the alpha of each facing of the character
   * Call this method with the argument as (N,E,S,W)
  */
  setCharacterAlpha() {
    this.room2_character_north.alpha = arguments[0];
    this.room2_character_east.alpha = arguments[1];
    this.room2_character_south.alpha = arguments[2];
    this.room2_character_west.alpha = arguments[3];
  }

  /* movePlayer
   *
   *
  */
  movePlayer() {
    //setCharacterAlpha is in helper.js and arguments go N,E,S,W
    this.setCharacterAlpha(0,0,1,0);

    //Character moves up
    if(this.room2_key_W.isDown && this.room2_characterMoveable == true) {
  if(this.room2_character_north.y > 185){
          this.room2_character_north.y -= 5;
          this.room2_character_east.y -= 5;
          this.room2_character_south.y -= 5;
          this.room2_character_west.y -= 5;

          this.setCharacterAlpha(1,0,0,0);



    }
    //Character moves left
  } if (this.room2_key_A.isDown && this.room2_characterMoveable == true) {
        if(this.room2_character_west.x > 210){
          this.room2_character_west.x -= 5;
          this.room2_character_east.x -= 5;
          this.room2_character_south.x -= 5;
          this.room2_character_north.x -= 5;

          this.setCharacterAlpha(0,0,0,1);
  }

    }
    //Character moves down
     if (this.room2_key_S.isDown && this.room2_characterMoveable == true) {
  if(this.room2_character_south.y < 680){
          this.room2_character_south.y += 5;
          this.room2_character_east.y += 5;
          this.room2_character_north.y += 5;
          this.room2_character_west.y += 5;

          this.setCharacterAlpha(0,0,1,0);
    }

    }
    //Character moves right
    if (this.room2_key_D.isDown && this.room2_characterMoveable == true) {
        if(this.room2_character_east.x < 1325){
          this.room2_character_east.x += 5;
          this.room2_character_north.x += 5;
          this.room2_character_south.x += 5;
          this.room2_character_west.x += 5;

          this.setCharacterAlpha(0,1,0,0);
    }
    }
  }

  /* movePaper
   *
   * makes the paper moveable in the test activity
  */
  movePaper(moveThisPaper) {
    if(this.room2_key_W.isDown && this.room2_paperMoveable == true) {
      room2_moveThisPaper.y -= 7;
    } if (this.room2_key_A.isDown && this.room2_paperMoveable == true) {
      room2_moveThisPaper.x -= 7;
    } if (this.room2_key_S.isDown && this.room2_paperMoveable == true) {
      room2_moveThisPaper.y += 7;
    } if (this.room2_key_D.isDown && this.room2_paperMoveable == true) {
      room2_moveThisPaper.x += 7;
    }
  }

  /* quitQuiz
   *
   * Allows the user to quit the quiz
  */
  // quitQuiz() {
  // //console.log("e");
  //   this.room2_papers_moved = false;
  //   this.room2_quizActive = false;
  // this.room2_activatedQuiz = false;
  //   this.room2_background.alpha = 1.0;
  //   this.room2_character_north.alpha = 1.0;
  //   this.room2_character_east.alpha = 1.0;
  //   this.room2_character_south.alpha = 1.0;
  //   this.room2_character_west.alpha = 1.0;
  //   this.room2_E_KeyImg.alpha = 1.0;
  //   this.room2_cardboard_box_1.setScale(0.39);
  //   this.room2_cardboard_box_2.setScale(0.39);
  //   this.room2_cardboard_box_3.setScale(0.39);
  //   this.room2_paper_stack.setScale(0.35);
  //   this.room2_paper_stack.x = 1215;
  // this.room2_paper_stack.setVisible(false);
  //   this.room2_cardboard_box_1.x = 1310;
  //   this.room2_cardboard_box_2.x = 1310;
  //   this.room2_cardboard_box_3.x = 1310;
  //   this.room2_cardboard_box_1.y = 320;
  //   this.room2_cardboard_box_2.y = 432;
  //   this.room2_cardboard_box_3.y = 530;
  //   this.room2_wall_info_1.alpha = 1;
  //   this.room2_wall_info_2.alpha = 1;
  //   this.room2_wall_info_3.alpha = 1;
  //   this.room2_wall_info_4.alpha = 1;
  //   this.room2_wall_info_5.alpha = 1;
  //   this.room2_wall_info_6.alpha = 1;
  //   this.room2_floor.scaleX = 1.0;
  //   this.room2_floor.scaleY = 1.0;
  //   this.room2_paper_stack.x = 1215;
  //   this.room2_paper_stack.y = 432;
  //   this.room2_paperCount = 1;
  //   this.room2_paperMoveable = false;
  // this.room2_placements0.setVisible(false);
  // this.room2_placements1.setVisible(false);
  // this.room2_placements2.setVisible(false);
  // this.room2_pressr.setVisible(false);
  // this.room2_incomeStatementText.setVisible(false);
  // this.room2_retainedEarningsText.setVisible(false);
  // this.room2_balanceSheetText.setVisible(false);
  // this.room2_characterMoveable = true;
  //
  // this.room2_paper.alpha = 0;
  // this.room2_paperTwo.alpha = 0;
  // this.room2_paperThree.alpha = 0;
  // this.room2_paper.setVisible(false);
  // this.room2_paperTwo.setVisible(false);
  //   this.room2_paperThree.setVisible(false);
  //
  // }

  /* activateQuiz
   *
   * Method that starts the quiz
  */
  // activateQuiz() {
  // this.room2_paper_stack.setVisible(true);
  //
  //   this.room2_paperMoveable = true;
  //   this.room2_paperCount = 1;
  // this.loadQuizImages();
  // this.updateCorrectImage();
  //
  //   if(this.room2_papers_moved == false) {
  //     this.room2_paper_stack.x -= 1025;
  //     this.room2_paper_stack.y -= 275;
  //     this.room2_papers_moved = true;
  //   }
  //
  //   this.room2_paper = this.add.image(this.room2_paper_stack.x, this.room2_paper_stack.y, 'room2_paper');
  //   this.room2_paperTwo = this.add.image(this.room2_paper_stack.x, this.room2_paper_stack.y, 'room2_paper');
  //   this.room2_paperThree = this.add.image(this.room2_paper_stack.x, this.room2_paper_stack.y, 'room2_paper');
  //
  //   this.room2_paperTwo.setVisible(false);
  //   this.room2_paperThree.setVisible(false);
  //
  //
  //   this.room2_paper.setInteractive();
  //   this.room2_paper.alpha = 1;
  //   this.room2_paper.setDepth(100);
  //   this.room2_paperTwo.setDepth(100);
  //   this.room2_paperThree.setDepth(100);
  //
  //
  //
  //   this.room2_background.alpha = 0.0;
  //   this.room2_character_north.alpha = 0.0;
  //   this.room2_character_east.alpha = 0.0;
  //   this.room2_character_south.alpha = 0.0;
  //   this.room2_character_west.alpha = 0.0;
  //   this.room2_E_KeyImg.alpha = 0.0;
  //   this.room2_cardboard_box_1.setScale(1.1);
  //   this.room2_cardboard_box_2.setScale(1.1);
  //   this.room2_cardboard_box_3.setScale(1.1);
  //   this.room2_paper_stack.setScale(1.0);
  //   this.room2_cardboard_box_1.x = 1350;
  //   this.room2_cardboard_box_2.x = 1350;
  //   this.room2_cardboard_box_3.x = 1350;
  //   this.room2_cardboard_box_1.y = 150;
  //   this.room2_cardboard_box_2.y = 450;
  //   this.room2_cardboard_box_3.y = 750;
  //   this.room2_wall_info_1.alpha = 0.0;
  //   this.room2_wall_info_2.alpha = 0.0;
  //   this.room2_wall_info_3.alpha = 0.0;
  //   this.room2_wall_info_4.alpha = 0.0;
  //   this.room2_wall_info_5.alpha = 0.0;
  //   this.room2_wall_info_6.alpha = 0.0;
  //   this.room2_floor.scaleX = 1.5;
  //   this.room2_floor.scaleY = 2.0;
  //
  //   this.room2_box1_frame = new Phaser.Geom.Rectangle(this.room2_cardboard_box_1.x, this.room2_cardboard_box_1.y, 240,240);
  //   this.room2_graphics.fillRectShape(this.room2_box1_frame);
  //
  //
  //   this.room2_box2_frame = new Phaser.Geom.Rectangle(this.room2_cardboard_box_2.x,this.room2_cardboard_box_2.y,240,200);
  //   this.room2_graphics.fillRectShape(this.room2_box2_frame);
  //
  //   this.room2_box3_frame = new Phaser.Geom.Rectangle(this.room2_cardboard_box_3.x,this.room2_cardboard_box_3.y,240,200);
  //   this.room2_graphics.fillRectShape(this.room2_box3_frame);
  //
  //   this.room2_paper.on('pointerdown', function(pointer, localX, localY, event) {
  //     console.log("click");
  //     this.alpha = 0;
  //
  //   });
  // }

  /* quitInteraction
   *
   * Sets the alphas to 0 so that the interaction is quit.
  */
  quitInteraction() {
    this.room2_map.alpha = 0.0;
    this.room2_notebook.alpha = 0.0;
    this.hideActivities();
    this.room2_activityLocked.alpha = 0.0;
    this.room2_character_north.alpha = 1.0;
    this.room2_character_east.alpha = 1.0;
    this.room2_character_south.alpha = 1.0;
    this.room2_character_west.alpha = 1.0;
    this.room2_characterMoveable = true;
    this.room2_activityOneOpened = false;
    this.room2_activityTwoOpened = false;
    this.room2_activityThreeOpened = false;
    this.room2_activityFourOpened = false;
    this.room2_activityFiveOpened = false;
    this.room2_activitySixOpened = false;
    this.room2_help_menu.alpha = 0.0;
  this.room2_activatedQuiz = false;
  //this.quitQuiz();
  }


  hideInteractionBoxes() {

  }

  /* hideActivities
   *
   * Sets the alphas to the activities to 0 so that they are hidden.
  */
  hideActivities() {
    this.room2_activity1A.alpha = 0.0;
    this.room2_activity1B.alpha = 0.0;
    this.room2_activity1C.alpha = 0.0;
    this.room2_activity1D.alpha = 0.0;
    this.room2_activity2A.alpha = 0.0;
    this.room2_activity2B.alpha = 0.0;
    this.room2_activity2C.alpha = 0.0;
    this.room2_activity2D.alpha = 0.0;
    this.room2_activity3A.alpha = 0.0;
    this.room2_activity3B.alpha = 0.0;
    this.room2_activity4A.alpha = 0.0;
    this.room2_activity4B.alpha = 0.0;
    this.room2_activity4C.alpha = 0.0;
    this.room2_activity4D.alpha = 0.0;
    this.room2_activity4E.alpha = 0.0;
    this.room2_activity5A.alpha = 0.0;
    this.room2_activity5B.alpha = 0.0;
    this.room2_activity5C.alpha = 0.0;


  }

  /* checkCorrectPaperOne
   *
   * Checks to see if the first paper is in the correct box.
  */
  // checkCorrectPaperOne() {
  // if(this.room2_activatedQuiz == true) {
  //   if (this.room2_key_R.isDown) {
  //   this.room2_incomeStatement.setVisible(true);
  //   }
  // else
  //   this.room2_incomeStatement.setVisible(false);
  // //THE RIGHT BOX
  //   if (Phaser.Geom.Rectangle.ContainsPoint(this.room2_box_1_zone, this.room2_paper)) {
  //     this.room2_paper.setVisible(false);
  //     this.room2_paperTwo.setVisible(true);
  //     this.room2_paperTwo.setInteractive();
  //     this.room2_paperCount++;
  //     this.updateCorrectImage();
  //
  //   } else if (Phaser.Geom.Rectangle.ContainsPoint(this.room2_box_2_zone, this.room2_paper) /*&& this.paperCount == 1*/) {
  //     this.room2_paper.x = this.room2_paper_stack.x;
  //     this.room2_paper.y = this.room2_paper_stack.y + 600;
  //   this.updateCorrectImage();
  //
  //   } else if (Phaser.Geom.Rectangle.ContainsPoint(this.room2_box_3_zone, this.room2_paper)/* && this.paperCount == 1*/) {
  //     this.room2_paper.x = this.room2_paper_stack.x;
  //     this.room2_paper.y = this.room2_paper_stack.y + 600;
  //   this.updateCorrectImage();
  //   }
  // }
  // }
  //
  // /* checkCorrectPaperTwo
  //  *
  //  * Checks to see if the second paper is in the correct box.
  // */
  // checkCorrectPaperTwo() {
  // this.room2_incomeStatement.setVisible(false);
  //   if (this.room2_key_R.isDown) {
  //   this.room2_retainedEarnings.setVisible(true);
  //   } else
  //   this.room2_retainedEarnings.setVisible(false);
  //
  //   if (Phaser.Geom.Rectangle.ContainsPoint(this.room2_box_2_zone, this.room2_paperTwo) /*&& this.paperCount == 2*/) {
  //     this.room2_paperTwo.setVisible(false);
  //     this.room2_paperThree.setVisible(true);
  //     this.room2_paperThree.setInteractive();
  //     this.room2_paperCount++;
  //   this.updateCorrectImage();
  //
  //   } else if (Phaser.Geom.Rectangle.ContainsPoint(this.room2_box_1_zone, this.room2_paperTwo) /*&& this.paperCount == 2*/) {
  //     this.room2_paperTwo.x = this.room2_paper_stack.x;
  //     this.room2_paperTwo.y = this.room2_paper_stack.y + 600;
  //     this.updateCorrectImage();
  //
  //   } else if (Phaser.Geom.Rectangle.ContainsPoint(this.room2_box_3_zone, this.room2_paperTwo) /*&& this.paperCount == 2*/) {
  //     this.room2_paperTwo.x = this.room2_paper_stack.x;
  //     this.room2_paperTwo.y = this.room2_paper_stack.y + 600;
  //     this.updateCorrectImage();
  //
  //   //this.cardboard_box_3.setVisible(true);
  //   }
  // //this.updateCorrectImage();
  // }
  //
  // /* checkCorrectPaperThree
  //  *
  //  * Checks to see if the third paper is in the correct box.
  // */
  // checkCorrectPaperThree() {
  // this.room2_retainedEarnings.setVisible(false);
  //   if (this.room2_key_R.isDown) {
  //     this.room2_balanceSheet.setVisible(true);
  //   } else
  //   this.room2_balanceSheet.setVisible(false);
  //
  //   if (Phaser.Geom.Rectangle.ContainsPoint(this.room2_box_3_zone, this.room2_paperThree) && this.room2_paperCount == 3) {
  //     this.room2_paperThree.setVisible(false);
  //     this.room2_paperCount++;
  //     this.quitQuiz();
  //   } else if (Phaser.Geom.Rectangle.ContainsPoint(this.room2_box_1_zone, this.room2_paperThree) && this.room2_paperCount == 3) {
  //     this.room2_paperThree.x = this.room2_paper_stack.x;
  //     this.room2_paperThree.y = this.room2_paper_stack.y + 600;
  //     this.quitQuiz();
  //
  //   } else if (Phaser.Geom.Rectangle.ContainsPoint(this.room2_box_2_zone, this.room2_paperThree) && this.room2_paperCount == 3) {
  //     this.room2_paperThree.x = this.room2_paper_stack.x;
  //     this.room2_paperThree.y = this.room2_paper_stack.y + 600;
  //     this.quitQuiz();
  //
  //   }
  // }
  //
  // /* loadQuizImages
  //  *
  //  * Loads the images into the quiz Activity
  // */
  // loadQuizImages(){
  //     this.room2_pressr = this.add.image(650, 40, 'room2_pressr');
  //   this.room2_pressr.setScale(.8);
  //
  //   this.room2_placements0 = this.add.image(240, 800, 'room2_correctPlacements0');
  //   this.room2_placements0.setScale(.7);
  //   this.vplacements0.setVisible(false);
  //
  //   this.room2_placements1 = this.add.image(240, 800, 'croom2_orrectPlacements1');
  //   this.room2_placements1.setScale(.7);
  //
  //   this.room2_placements2 = this.add.image(240, 800, 'room2_correctPlacements2');
  //   this.room2_placements2.setScale(.7);
  //
  //   this.room2_incomeStatement = this.add.image(675, 350, 'room2_incomeStatement');
  //   this.room2_incomeStatement.setVisible(false);
  //   this.room2_incomeStatement.setDepth(500);
  //
  //   this.room2_incomeStatementText = this.add.image(1350, 30, 'room2_incomeStatementText');
  //   this.room2_incomeStatementText.setScale(.6);
  //
  //   this.room2_balanceSheet = this.add.image(675, 410, 'room2_balanceSheet');
  //   this.room2_balanceSheet.setVisible(false);
  //   this.room2_balanceSheet.setDepth(500);
  //   this.room2_balanceSheet.setScale(.85);
  //
  //   this.room2_balanceSheetText = this.add.image(1350, 630, 'room2_balanceSheetText');
  //   this.room2_balanceSheetText.setScale(.6);
  //
  //   this.room2_retainedEarnings = this.add.image(675, 210, 'room2_retainedEarnings');
  //   this.room2_retainedEarnings.setVisible(false);
  //   this.room2_retainedEarnings.setDepth(500);
  //
  //   this.room2_retainedEarningsText = this.add.image(1350, 325, 'room2_retainedEarningsText');
  //   this.room2_retainedEarningsText.setScale(.6);
  // }
  //
  // /* updateCorrectImage
  //  *
  //  * Updates the image in the quiz that tells the user how many they have got right.
  // */
  // updateCorrectImage() {
  //   //console.log(this.paperCount);
  //   if (this.room2_paperCount == 1) {
  //     this.room2_placements0.setVisible(true);
  //     this.room2_placements1.setVisible(false);
  //     this.room2_placements2.setVisible(false);
  //   } else if (this.room2_paperCount == 2) {
  //     this.room2_placements0.setVisible(false);
  //     this.room2_placements1.setVisible(true);
  //     this.room2_placements2.setVisible(false);
  //   } else if (this.room2_paperCount == 3) {
  //     this.room2_placements0.setVisible(false);
  //     this.room2_placements1.setVisible(false);
  //     this.room2_placements2.setVisible(true);
  //   }
  //
  // }


  activityAlphas(room2_oneA, room2_oneB, room2_oneC, room2_oneD, room2_twoA, room2_twoB, room2_twoC, room2_twoD, room2_threeA, room2_threeB, room2_fourA, room2_fourB, room2_fourC, room2_fourD, room2_fourE, room2_fiveA, room2_fiveB, room2_fiveC) {
    this.room2_activity1A.alpha = room2_oneA;
    this.room2_activity1B.alpha = room2_oneB;
    this.room2_activity1C.alpha = room2_oneC;
    this.room2_activity1D.alpha = room2_oneD;
    this.room2_activity2A.alpha = room2_twoA;
    this.room2_activity2B.alpha = room2_twoB;
    this.room2_activity2C.alpha = room2_twoC;
    this.room2_activity2D.alpha = room2_twoD;
    this.room2_activity3A.alpha = room2_threeA;
    this.room2_activity3B.alpha = room2_threeB;
    this.room2_activity4A.alpha = room2_fourA;
    this.room2_activity4B.alpha = room2_fourB;
    this.room2_activity4C.alpha = room2_fourC;
    this.room2_activity4D.alpha = room2_fourD;
    this.room2_activity4E.alpha = room2_fourE;
    this.room2_activity5A.alpha = room2_fiveA;
    this.room2_activity5B.alpha = room2_fiveB;
    this.room2_activity5C.alpha = room2_fiveC;


  }


  /* checkNextPage
   *
   *
  */

  checkNextPage() {
    if (this.room2_activityOneOpened == true && this.room2_key_1.isDown) {
      this.activityAlphas(1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    } else if (this.room2_activityOneOpened == true && this.room2_key_2.isDown) {
      this.activityAlphas(0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0 , 0, 0, 0 ,0, 0, 0);
    } else if (this.room2_activityOneOpened == true && this.room2_key_3.isDown) {
      this.activityAlphas(0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    }else if (this.room2_activityOneOpened == true && this.room2_key_4.isDown) {
      this.activityAlphas(0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    }
    if (this.room2_activityTwoOpened == true && this.room2_key_1.isDown) {
      this.activityAlphas(0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    }
    else if (this.room2_activityTwoOpened == true && this.room2_key_2.isDown) {
      this.activityAlphas(0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    }
    else if (this.room2_activityTwoOpened == true && this.room2_key_3.isDown) {
      this.activityAlphas(0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    }
    else if (this.room2_activityTwoOpened == true && this.room2_key_4.isDown) {
      this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    }
    if (this.room2_activityThreeOpened == true && this.room2_key_1.isDown) {
      this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    }
    else if (this.room2_activityThreeOpened == true && this.room2_key_2.isDown) {
      this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0);
    }
    if (this.room2_activityFourOpened == true && this.room2_key_1.isDown) {
      this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0);
    }
    else if (this.room2_activityFourOpened == true && this.room2_key_2.isDown) {
      this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0);
    }
    else if (this.room2_activityFourOpened == true && this.room2_key_3.isDown) {
      this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0);
    }
    else if (this.room2_activityFourOpened == true && this.room2_key_4.isDown) {
      this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0);
    }
    else if (this.room2_activityFourOpened == true && this.room2_key_5.isDown) {
      this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0);
    }
    if (this.room2_activityFiveOpened == true && this.room2_key_1.isDown) {
      this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0);
    }
    else if (this.room2_activityFiveOpened == true && this.room2_key_2.isDown) {
      this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0);
    }
    else if (this.room2_activityFiveOpened == true && this.room2_key_3.isDown) {
      this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1);
    }
  }

  /* helpMenu
   *
   * Sets the alpha of the help menu to 1 so that it is visible
  */
  helpMenu() {
      this.room2_help_menu.alpha = 1.0;
      this.room2_helpOpen = true;
  }
}
