class two_activity extends Phaser.Scene {

  constructor() {
    super("two_Activity");
    this.room2a_quizActive = false;
    this.room2a_activatedQuiz = false;
    this.room2a_unlocked = false;
    this.room2a_paperMoveable = false;
    this.room2a_activityOneOpened = false;
    this.room2a_activityTwoOpened = false;
    this.room2a_activityThreeOpened = false;
    this.room2a_activityFourOpened = false;
    this.room2a_activityFiveOpened = false;
    this.room2a_activitySixOpened = false;
    this.room2a_helpOpen = false;
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
    if (this.room2a_key_H.isDown) {
      this.helpMenu();
    }

    if (this.room2a_activityOneOpened) {
      this.checkNextPage();
    }
    if (this.room2a_activityTwoOpened) {
      this.checkNextPage();
    }
    if (this.room2a_activityThreeOpened) {
      this.checkNextPage();
    }
    if (this.room2a_activityFourOpened) {
      this.checkNextPage();
    }
    if (this.room2a_activityFiveOpened) {
      this.checkNextPage();
    }


    if (this.room2a_key_U.isDown && this.room2a_unlocked == false) {
      room2a_activity1Locked = false;
      room2a_activity2Locked = false;
      room2a_activity3Locked = false;
      room2a_activity4Locked = false;
      room2a_activity5Locked = false;
      room2a_activity6Locked = false;
      room2a_activity6Complete = true;
      this.room2a_unlocked = true;
    }

    if (this.room2a_key_M.isDown) {
      this.room2a_map.alpha = 1.0;
      characterMoveable = false;
      this.room2a_character_north.alpha = 0.0;
      this.room2a_character_east.alpha = 0.0;
      this.room2a_character_south.alpha = 0.0;
      this.room2a_character_west.alpha = 0.0;
    }

    if (this.room2a_key_B.isDown) {
      this.room2a_notebook.alpha = 1.0;
      room2a_characterMoveable = false;
      this.room2a_character_north.alpha = 0.0;
      this.room2a_character_east.alpha = 0.0;
      this.room2a_character_south.alpha = 0.0;
      this.room2a_character_west.alpha = 0.0;
    }


    if (this.room2a_key_Q.isDown && this.room2a_activatedQuiz == false) {
      this.quitInteraction();
    }

    if (this.room2a_quizActive == true && this.room2a_activatedQuiz == false && this.room2a_key_E.isDown) {
      this.activateQuiz();
      this.room2a_activatedQuiz = true;
    }

    if (this.room2a_quizActive == true && this.room2a_key_Q.isDown && this.room2a_activatedQuiz == true) {
      this.quitQuiz();
      this.room2a_activatedQuiz = false;
    }

    if (this.room2a_activatedQuiz == false) {
        this.movePlayer();
        this.checkInteractValidity();
    } else if (this.room2a_activatedQuiz = true) {
      if (this.room2a_paperCount == 1) {
        this.movePaper(this.room2a_paper);
        this.checkCorrectPaperOne();
      } else if (this.room2a_paperCount == 2) {
          this.movePaper(this.room2a_paperTwo);
          this.checkCorrectPaperTwo();

      } else if (this.room2a_paperCount == 3) {
          this.movePaper(this.room2a_paperThree);
          this.checkCorrectPaperThree();
        }

      }
  if (this.room2a_activatedQuiz == false)
    this.room2a_characterMoveable = true;
    }


/***********************************************************************************************
======================================HELPER METHODS============================================
*///////////////////////////////////////////////////////////////////////////////////////////////
  /* loadAssests
   *
   * Loads images to be used and sets them into a variable name.
  */
  loadAssets() {
  this.load.image('room2a_pressr', 'assets/pressr.png');
    this.load.image('room2a_one_lesson_BG', 'assets/one_lesson_BG.png');
    this.load.image('room2a_character_north', 'assets/character_north.png');
    this.load.image('room2a_character_east', 'assets/character_east.png');
    this.load.image('room2a_character_south', 'assets/character_south.png');
    this.load.image('room2a_character_west', 'assets/character_west.png');
    this.load.image('room2a_redCharacter', 'assets/redCharacter.png');
    this.load.image('room2a_activity1A', 'assets/Panels/RoomTwo/PanelOneA.png');
    this.load.image('room2a_activity1B', 'assets/Panels/RoomTwo/PanelOneB.png');
    this.load.image('room2a_activity1C', 'assets/Panels/RoomTwo/PanelOneC.png');
    this.load.image('room2a_activity1D', 'assets/Panels/RoomTwo/PanelOneD.png');
    this.load.image('room2a_activity2A', 'assets/Panels/RoomTwo/PanelTwoA.png');
    this.load.image('room2a_activity2B', 'assets/Panels/RoomTwo/PanelTwoB.png');
    this.load.image('room2a_activity2C', 'assets/Panels/RoomTwo/PanelTwoC.png');
    this.load.image('room2a_activity2D', 'assets/Panels/RoomTwo/PanelTwoD.png');
    this.load.image('room2a_activity3A', 'assets/Panels/RoomTwo/PanelThreeA.png');
    this.load.image('room2a_activity3B', 'assets/Panels/RoomTwo/PanelThreeB.png');
    this.load.image('room2a_activity4A', 'assets/Panels/RoomTwo/PanelFourA.png');
    this.load.image('room2a_activity4B', 'assets/Panels/RoomTwo/PanelFourB.png');
    this.load.image('room2a_activity4C', 'assets/Panels/RoomTwo/PanelFourC.png');
    this.load.image('room2a_activity4D', 'assets/Panels/RoomTwo/PanelFourD.png');
    this.load.image('room2a_activity4E', 'assets/Panels/RoomTwo/PanelFourE.png');
    this.load.image('room2a_activity5A', 'assets/Panels/RoomTwo/PanelFiveA.png');
    this.load.image('room2a_activity5B', 'assets/Panels/RoomTwo/PanelFiveB.png');
    this.load.image('room2a_activity5C', 'assets/Panels/RoomTwo/PanelFiveC.png');
    this.load.image('room2a_E_KeyImg', 'assets/E_Key.png');
    this.load.image('room2a_wall_info_1', 'assets/wall_art.png');
    this.load.image('room2a_wall_info_2', 'assets/wall_art.png');
    this.load.image('room2a_wall_info_3', 'assets/wall_art.png');
    this.load.image('room2a_wall_info_4', 'assets/wall_art.png');
    this.load.image('room2a_wall_info_5', 'assets/wall_art.png');
    this.load.image('room2a_wall_info_6', 'assets/wall_art.png');
    this.load.image('room2a_floor', 'assets/floor_room2_act1.jpg');
    this.load.image('room2a_map', 'assets/map.png');
    this.load.image('room2a_notebook', 'assets/notebook.png');
    this.load.image('room2a_activityLocked', 'assets/activityLocked.png');
    this.load.image('room2a_help_menu', 'assets/help_menu.png');
    this.load.image('room2a_hole', 'assets/hole.png');

  }

  /* createImages
   *
   * Adds the image to the game board
  */
  createImages() {
    this.room2a_e_pressed = false;
    this.room2a_papers_moved = false;
    this.room2a_background = this.add.image(768, 432, 'room2a_one_lesson_BG');
    this.room2a_character_north = this.add.image(768, 432, 'room2a_character_north');
    this.room2a_character_east = this.add.image(768, 432, 'room2a_character_east');
    this.room2a_character_south = this.add.image(768, 432, 'room2a_character_south');
    this.room2a_character_west = this.add.image(768, 432, 'room2a_character_west');
    this.room2a_E_KeyImg = this.add.image(this.room2a_character_north.x+40, this.room2a_character_north.y+40, 'room2a_E_KeyImg');
    this.room2a_activity1A = this.add.image(768, 432, 'room2a_activity1A');
    this.room2a_activity1B = this.add.image(768, 432, 'room2a_activity1B');
    this.room2a_activity1C = this.add.image(768, 432, 'room2a_activity1C');
    this.room2a_activity1D = this.add.image(768, 432, 'room2a_activity1D');
    this.room2a_activity2A = this.add.image(768, 432, 'room2a_activity2A');
    this.room2a_activity2B = this.add.image(768, 432, 'room2a_activity2B');
    this.room2a_activity2C = this.add.image(768, 432, 'room2a_activity2C');
    this.room2a_activity2D = this.add.image(768, 432, 'room2a_activity2D');
    this.room2a_activity3A = this.add.image(768, 432, 'room2a_activity3A');
    this.room2a_activity3B = this.add.image(768, 432, 'room2a_activity3B');
    this.room2a_activity4A = this.add.image(768, 432, 'room2a_activity4A');
    this.room2a_activity4B = this.add.image(768, 432, 'room2a_activity4B');
    this.room2a_activity4C = this.add.image(768, 432, 'room2a_activity4C');
    this.room2a_activity4D = this.add.image(768, 432, 'room2a_activity4D');
    this.room2a_activity4E = this.add.image(768, 432, 'room2a_activity4E');
    this.room2a_activity5A = this.add.image(768, 432, 'room2a_activity5A');
    this.room2a_activity5B = this.add.image(768, 432, 'room2a_activity5B');
    this.room2a_activity5C = this.add.image(768, 432, 'room2a_activity5C');
    this.room2a_wall_info_1 = this.add.image(305, 75, 'room2a_wall_info_1');
    this.room2a_wall_info_2 = this.add.image(768, 75, 'room2a_wall_info_2');
    this.room2a_wall_info_3 = this.add.image(1232, 75, 'room2a_wall_info_3');
    this.room2a_wall_info_4 = this.add.image(305, 790, 'room2a_wall_info_4');
    this.room2a_wall_info_5 = this.add.image(768, 790, 'room2a_wall_info_5');
    this.room2a_wall_info_6 = this.add.image(1232, 790, 'room2a_wall_info_6');
    this.room2a_floor = this.add.image(769, 433, 'room2a_floor');
    this.room2a_map = this.add.image(768, 432, 'room2a_map');
    this.room2a_notebook = this.add.image(768, 432, 'room2a_notebook');
    this.room2a_activityLocked = this.add.image(768, 432, 'room2a_activityLocked');
    this.room2a_help_menu = this.add.image(768, 432, 'room2a_help_menu');
    this.room2a_hole = this.add.image(268, 300, 'room2a_hole');

  }

  /* setAlphas
   *
   * sets the alphas to to items in the game to zero so they are not visible at the beginning.
  */
  setAlphas() {
    this.room2a_map.alpha = 0.0;
    this.room2a_notebook.alpha = 0.0;
    this.room2a_activityLocked.alpha = 0.0;
    this.room2a_E_KeyImg.alpha = 0.0;
    this.room2a_help_menu.alpha = 0.0;
    this.hideActivities();
  }

  /* setDepths
   *
   * Sets the depth of each object on the screen.
  */
  setDepths() {
    this.room2a_floor.setDepth(0);
    this.room2a_character_north.setDepth(50);
    this.room2a_character_east.setDepth(50);
    this.room2a_character_south.setDepth(50);
    this.room2a_character_west.setDepth(50);
    this.room2a_E_KeyImg.setDepth(49);
    this.room2a_activity1A.setDepth(100);
    this.room2a_activity1B.setDepth(100);
    this.room2a_activity1C.setDepth(100);
    this.room2a_activity1D.setDepth(100);
    this.room2a_activity2A.setDepth(100);
    this.room2a_activity2B.setDepth(100);
    this.room2a_activity2C.setDepth(100);
    this.room2a_activity2D.setDepth(100);
    this.room2a_activity3A.setDepth(100);
    this.room2a_activity3B.setDepth(100);
    this.room2a_activity4A.setDepth(100);
    this.room2a_activity4B.setDepth(100);
    this.room2a_activity4C.setDepth(100);
    this.room2a_activity4D.setDepth(100);
    this.room2a_activity4E.setDepth(100);
    this.room2a_activity5A.setDepth(100);
    this.room2a_activity5B.setDepth(100);
    this.room2a_activity5C.setDepth(100);

    this.room2a_map.setDepth(100);
    // this.room2a_paper_stack.setDepth(1);
    this.room2a_notebook.setDepth(100);
    this.room2a_help_menu.setDepth(100);
  }

  /* setScales
   *
   * Scales the size of each object.
  */
  setScales() {
    this.room2a_E_KeyImg.setScale(0.4);
    this.room2a_wall_info_1.setScale(0.75);
    this.room2a_wall_info_2.setScale(0.75);
    this.room2a_wall_info_3.setScale(0.75);
    this.room2a_wall_info_4.setScale(0.75);
    this.room2a_wall_info_5.setScale(0.75);
    this.room2a_wall_info_6.setScale(0.75);
    this.room2a_notebook.setScale(0.75);
    this.room2a_map.setScale(0.75);
    // this.room2a_cardboard_box_1.setScale(0.39);
    // this.room2a_cardboard_box_2.setScale(0.39);
    // this.room2a_cardboard_box_3.setScale(0.39);
    // this.room2a_paper_stack.setScale(0.35);
    this.room2a_character_north.setScale(3);
    this.room2a_character_south.setScale(3);
    this.room2a_character_west.setScale(3);
    this.room2a_character_east.setScale(3);
    this.room2a_floor.scaleY = .513;
    this.room2a_floor.scaleX = .791;

  }

  /* setRotations
   *
   * Sets the rotation that each object sits at.
  */
  setRotations() {
    this.room2a_wall_info_4.rotation = 3.14;
    this.room2a_wall_info_5.rotation = 3.14;
    this.room2a_wall_info_6.rotation = 3.14;
  //   this.room2a_cardboard_box_1.rotation = 0;
  //   this.room2a_cardboard_box_2.rotation = 0;
  //   this.room2a_cardboard_box_3.rotation = 0;
   }

  /* createInteractionZones
   *
   * Sets the area that you can interact with each object
  */
  createInteractionZones() {
    this.room2a_graphics = this.add.graphics({fillStyle: {color: 0xFFFFFF, alpha: 0.0}});
    //this.graphicsTest = this.add.graphics({fillStyle: {color: 0x4F4F4F, alpha: 1.0}});
    //TOP ZONES
                                                //xpos ypos x   y
    // this.room2a_top_left_info = new Phaser.Geom.Rectangle(175,150,240,150);
    // this.room2a_graphics.fillRectShape(this.room2a_top_left_info);
                                                //xpos ypos x  y
    this.room2a_top_mid_info = new Phaser.Geom.Rectangle(650,150,240,150);
    this.room2a_graphics.fillRectShape(this.room2a_top_mid_info);
                                                 //xpos ypos x   y
    this.room2a_top_right_info = new Phaser.Geom.Rectangle(1120,150,240,150);
    this.room2a_graphics.fillRectShape(this.room2a_top_right_info);

    //BOTTOM ZONES

    this.room2a_bot_left_info = new Phaser.Geom.Rectangle(175,565,240,150);
    this.room2a_graphics.fillRectShape(this.room2a_bot_left_info);

    this.room2a_bot_mid_info = new Phaser.Geom.Rectangle(650,565,240,150);
    this.room2a_graphics.fillRectShape(this.room2a_bot_mid_info);

    this.room2a_bot_right_info = new Phaser.Geom.Rectangle(1120,565,240,150);
    this.room2a_graphics.fillRectShape(this.room2a_bot_right_info);

    this.room2a_hole_zone = new Phaser.Geom.Rectangle(150, 200,240,150);
    this.room2a_graphics.fillRectShape(this.room2a_hole_zone);

    // this.room2a_quiz1 = new Phaser.Geom.Rectangle(1120,308,240,250);
    // this.room2a_graphics.fillRectShape(this.room2a_quiz1);

    // this.room2a_box_1_zone = new Phaser.Geom.Rectangle(1200,75,200,200);
    // this.room2a_graphics.fillRectShape(this.room2a_box_1_zone);
    //
    // this.room2a_box_2_zone = new Phaser.Geom.Rectangle(1200,325,200,200);
    // this.room2a_graphics.fillRectShape(this.room2a_box_2_zone);
    //
    // this.room2a_box_3_zone = new Phaser.Geom.Rectangle(1200,650,200,200);
    // this.room2a_graphics.fillRectShape(this.room2a_box_3_zone);
  }

  /* assignKeybinds
   *
   * Sets keybinds to the keyboard
  */
  assignKeybinds() {
        //KEYBOARD INPUT
    this.room2a_key_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.room2a_key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.room2a_key_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.room2a_key_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.room2a_key_E = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    this.room2a_key_Q = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    this.room2a_key_M = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
    this.room2a_key_B = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
    this.room2a_key_U = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.U);
    this.room2a_key_1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
    this.room2a_key_2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
    this.room2a_key_3 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);
    this.room2a_key_4 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR);
    this.room2a_key_5 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FIVE);
    this.room2a_key_R = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    this.room2a_key_H = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);

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

  checkActivityOpened(room2a_one, room2a_two, room2a_three, room2a_four, room2a_five, room2a_six) {
    this.room2a_activityOneOpened = room2a_one;
    this.room2a_activityTwoOpened = room2a_two;
    this.room2a_activityThreeOpened = room2a_three;
    this.room2a_activityFourOpened = room2a_four;
    this.room2a_activityFiveOpened = room2a_five;
    this.room2a_activitySixOpened = room2a_six;

  }

  /* checkInteractValidity
   *
   * Checks to see if the character can interact with the object
  */

  checkInteractValidity() {
    if (Phaser.Geom.Rectangle.ContainsPoint(this.room2a_top_right_info, this.room2a_character_north)) {
      this.room2a_E_KeyImg.x = this.room2a_character_north.x;
      this.room2a_E_KeyImg.y = this.room2a_character_north.y-75;
      this.room2a_E_KeyImg.alpha = 1.0;
      if (this.room2a_key_E.isDown) {
        this.room2a_activity1A.alpha = 1.0;
        this.room2a_characterMoveable = false;
        this.checkActivityOpened(true, false, false, false, false, false);
    this.room2a_activity2Locked = false;

    //COME BACK AND CHANGE THIS LATER
    this.room2a_activity6Complete = true;
      }

    } else if (Phaser.Geom.Rectangle.ContainsPoint(this.room2a_bot_mid_info, this.room2a_character_north)) {
      this.room2a_E_KeyImg.x = this.room2a_character_north.x;
      this.room2a_E_KeyImg.y = this.room2a_character_north.y+75;
      this.room2a_E_KeyImg.alpha = 1.0;
    if (this.room2a_key_E.isDown && this.room2a_activity2Locked == false) {
        this.room2a_activity2A.alpha = 1.0;
        this.checkActivityOpened(false, true, false, false, false, false);
    this.room2a_activity3Locked = false;
  } else if (this.room2a_key_E.isDown && this.room2a_activity2Locked == true) {
          this.room2a_activityLocked.alpha = 1.0;
          this.room2a_characterMoveable = false;
          }

    } else if (Phaser.Geom.Rectangle.ContainsPoint(this.room2a_top_mid_info, this.room2a_character_north)) {
      this.room2a_E_KeyImg.x = this.room2a_character_north.x;
      this.room2a_E_KeyImg.y = this.room2a_character_north.y-75;
      this.room2a_E_KeyImg.alpha = 1.0;
      if (this.room2a_key_E.isDown && this.room2a_activity3Locked == false) {
        this.room2a_activity3A.alpha = 1.0;
        this.checkActivityOpened(false, false, true, false, false, false);
    this.room2a_activity4Locked = false;
  } else if (this.room2a_key_E.isDown && this.room2a_activity3Locked == true){
        this.room2a_activityLocked.alpha = 1.0;
        this.room2a_characterMoveable = false;
        }

    } else if (Phaser.Geom.Rectangle.ContainsPoint(this.room2a_bot_right_info, this.room2a_character_north)) {
      this.room2a_E_KeyImg.x = this.room2a_character_north.x;
      this.room2a_E_KeyImg.y = this.room2a_character_north.y+75;
      this.room2a_E_KeyImg.alpha = 1.0;
      if (this.room2a_key_E.isDown && this.room2a_activity4Locked == false) {
      this.room2a_activity4A.alpha = 1.0;
      this.checkActivityOpened(false, false, false, true, false, false);
    this.room2a_activity5Locked = false;
  } else if (this.room2a_key_E.isDown && this.room2a_activity4Locked == true){
        this.room2a_activityLocked.alpha = 1.0;
        this.room2a_characterMoveable = false;
        }


  //   }
  // else if (Phaser.Geom.Rectangle.ContainsPoint(this.room2a_top_left_info, this.room2a_character_north)) {
  //     this.room2a_E_KeyImg.x = this.room2a_character_north.x;
  //     this.room2a_E_KeyImg.y = this.room2a_character_north.y-75;
  //
  //     this.room2a_E_KeyImg.alpha = 1.0;
  //     if (this.room2a_key_E.isDown && this.room2a_activity5Locked == false) {
  //       this.room2a_activity5A.alpha = 1.0;
  //       this.checkActivityOpened(false, false, false, false, true, false);
  //   this.room2a_activity6Locked = false;
  // } else if (this.room2a_key_E.isDown && this.room2a_activity5Locked == true){
  //         this.room2a_activityLocked.alpha = 1.0;
  //         this.room2a_characterMoveable = false;
  // }

  }  else if (Phaser.Geom.Rectangle.ContainsPoint(this.room2a_hole_zone, this.room2a_character_north)) {
      		this.room2a_E_KeyImg.x = this.room2a_character_north.x;
      		this.room2a_E_KeyImg.y = this.room2a_character_north.y+75;
      		this.room2a_E_KeyImg.alpha = 1.0;
      		if (this.room2a_key_E.isDown) {
      			console.log("To room 2 activity B")
      			this.scene.start("two_ActivityB");
      		}

      }

      else {
      this.hideActivities();
      this.room2a_E_KeyImg.alpha = 0.0;
    }
  }


  /* setCharacterAlpha
   *
   * Sets the alpha of each facing of the character
   * Call this method with the argument as (N,E,S,W)
  */
  setCharacterAlpha() {
    this.room2a_character_north.alpha = arguments[0];
    this.room2a_character_east.alpha = arguments[1];
    this.room2a_character_south.alpha = arguments[2];
    this.room2a_character_west.alpha = arguments[3];
  }

  /* movePlayer
   *
   *
  */
  movePlayer() {
    //setCharacterAlpha is in helper.js and arguments go N,E,S,W
    this.setCharacterAlpha(0,0,1,0);

    //Character moves up
    if(this.room2a_key_W.isDown && this.room2a_characterMoveable == true) {
  if(this.room2a_character_north.y > 185){
          this.room2a_character_north.y -= 5;
          this.room2a_character_east.y -= 5;
          this.room2a_character_south.y -= 5;
          this.room2a_character_west.y -= 5;

          this.setCharacterAlpha(1,0,0,0);



    }
    //Character moves left
  } if (this.room2a_key_A.isDown && this.room2a_characterMoveable == true) {
        if(this.room2a_character_west.x > 210){
          this.room2a_character_west.x -= 5;
          this.room2a_character_east.x -= 5;
          this.room2a_character_south.x -= 5;
          this.room2a_character_north.x -= 5;

          this.setCharacterAlpha(0,0,0,1);
  }

    }
    //Character moves down
     if (this.room2a_key_S.isDown && this.room2a_characterMoveable == true) {
  if(this.room2a_character_south.y < 680){
          this.room2a_character_south.y += 5;
          this.room2a_character_east.y += 5;
          this.room2a_character_north.y += 5;
          this.room2a_character_west.y += 5;

          this.setCharacterAlpha(0,0,1,0);
    }

    }
    //Character moves right
    if (this.room2a_key_D.isDown && this.room2a_characterMoveable == true) {
        if(this.room2a_character_east.x < 1325){
          this.room2a_character_east.x += 5;
          this.room2a_character_north.x += 5;
          this.room2a_character_south.x += 5;
          this.room2a_character_west.x += 5;

          this.setCharacterAlpha(0,1,0,0);
    }
    }
  }

  /* movePaper
   *
   * makes the paper moveable in the test activity
  */
  movePaper(moveThisPaper) {
    if(this.room2a_key_W.isDown && this.room2a_paperMoveable == true) {
      room2a_moveThisPaper.y -= 7;
    } if (this.room2a_key_A.isDown && this.room2a_paperMoveable == true) {
      room2a_moveThisPaper.x -= 7;
    } if (this.room2a_key_S.isDown && this.room2a_paperMoveable == true) {
      room2a_moveThisPaper.y += 7;
    } if (this.room2a_key_D.isDown && this.room2a_paperMoveable == true) {
      room2a_moveThisPaper.x += 7;
    }
  }

  /* quitQuiz
   *
   * Allows the user to quit the quiz
  */
  // quitQuiz() {
  // //console.log("e");
  //   this.room2a_papers_moved = false;
  //   this.room2a_quizActive = false;
  // this.room2a_activatedQuiz = false;
  //   this.room2a_background.alpha = 1.0;
  //   this.room2a_character_north.alpha = 1.0;
  //   this.room2a_character_east.alpha = 1.0;
  //   this.room2a_character_south.alpha = 1.0;
  //   this.room2a_character_west.alpha = 1.0;
  //   this.room2a_E_KeyImg.alpha = 1.0;
  //   this.room2a_cardboard_box_1.setScale(0.39);
  //   this.room2a_cardboard_box_2.setScale(0.39);
  //   this.room2a_cardboard_box_3.setScale(0.39);
  //   this.room2a_paper_stack.setScale(0.35);
  //   this.room2a_paper_stack.x = 1215;
  // this.room2a_paper_stack.setVisible(false);
  //   this.room2a_cardboard_box_1.x = 1310;
  //   this.room2a_cardboard_box_2.x = 1310;
  //   this.room2a_cardboard_box_3.x = 1310;
  //   this.room2a_cardboard_box_1.y = 320;
  //   this.room2a_cardboard_box_2.y = 432;
  //   this.room2a_cardboard_box_3.y = 530;
  //   this.room2a_wall_info_1.alpha = 1;
  //   this.room2a_wall_info_2.alpha = 1;
  //   this.room2a_wall_info_3.alpha = 1;
  //   this.room2a_wall_info_4.alpha = 1;
  //   this.room2a_wall_info_5.alpha = 1;
  //   this.room2a_wall_info_6.alpha = 1;
  //   this.room2a_floor.scaleX = 1.0;
  //   this.room2a_floor.scaleY = 1.0;
  //   this.room2a_paper_stack.x = 1215;
  //   this.room2a_paper_stack.y = 432;
  //   this.room2a_paperCount = 1;
  //   this.room2a_paperMoveable = false;
  // this.room2a_placements0.setVisible(false);
  // this.room2a_placements1.setVisible(false);
  // this.room2a_placements2.setVisible(false);
  // this.room2a_pressr.setVisible(false);
  // this.room2a_incomeStatementText.setVisible(false);
  // this.room2a_retainedEarningsText.setVisible(false);
  // this.room2a_balanceSheetText.setVisible(false);
  // this.room2a_characterMoveable = true;
  //
  // this.room2a_paper.alpha = 0;
  // this.room2a_paperTwo.alpha = 0;
  // this.room2a_paperThree.alpha = 0;
  // this.room2a_paper.setVisible(false);
  // this.room2a_paperTwo.setVisible(false);
  //   this.room2a_paperThree.setVisible(false);
  //
  // }

  /* activateQuiz
   *
   * Method that starts the quiz
  */
  // activateQuiz() {
  // this.room2a_paper_stack.setVisible(true);
  //
  //   this.room2a_paperMoveable = true;
  //   this.room2a_paperCount = 1;
  // this.loadQuizImages();
  // this.updateCorrectImage();
  //
  //   if(this.room2a_papers_moved == false) {
  //     this.room2a_paper_stack.x -= 1025;
  //     this.room2a_paper_stack.y -= 275;
  //     this.room2a_papers_moved = true;
  //   }
  //
  //   this.room2a_paper = this.add.image(this.room2a_paper_stack.x, this.room2a_paper_stack.y, 'room2a_paper');
  //   this.room2a_paperTwo = this.add.image(this.room2a_paper_stack.x, this.room2a_paper_stack.y, 'room2a_paper');
  //   this.room2a_paperThree = this.add.image(this.room2a_paper_stack.x, this.room2a_paper_stack.y, 'room2a_paper');
  //
  //   this.room2a_paperTwo.setVisible(false);
  //   this.room2a_paperThree.setVisible(false);
  //
  //
  //   this.room2a_paper.setInteractive();
  //   this.room2a_paper.alpha = 1;
  //   this.room2a_paper.setDepth(100);
  //   this.room2a_paperTwo.setDepth(100);
  //   this.room2a_paperThree.setDepth(100);
  //
  //
  //
  //   this.room2a_background.alpha = 0.0;
  //   this.room2a_character_north.alpha = 0.0;
  //   this.room2a_character_east.alpha = 0.0;
  //   this.room2a_character_south.alpha = 0.0;
  //   this.room2a_character_west.alpha = 0.0;
  //   this.room2a_E_KeyImg.alpha = 0.0;
  //   this.room2a_cardboard_box_1.setScale(1.1);
  //   this.room2a_cardboard_box_2.setScale(1.1);
  //   this.room2a_cardboard_box_3.setScale(1.1);
  //   this.room2a_paper_stack.setScale(1.0);
  //   this.room2a_cardboard_box_1.x = 1350;
  //   this.room2a_cardboard_box_2.x = 1350;
  //   this.room2a_cardboard_box_3.x = 1350;
  //   this.room2a_cardboard_box_1.y = 150;
  //   this.room2a_cardboard_box_2.y = 450;
  //   this.room2a_cardboard_box_3.y = 750;
  //   this.room2a_wall_info_1.alpha = 0.0;
  //   this.room2a_wall_info_2.alpha = 0.0;
  //   this.room2a_wall_info_3.alpha = 0.0;
  //   this.room2a_wall_info_4.alpha = 0.0;
  //   this.room2a_wall_info_5.alpha = 0.0;
  //   this.room2a_wall_info_6.alpha = 0.0;
  //   this.room2a_floor.scaleX = 1.5;
  //   this.room2a_floor.scaleY = 2.0;
  //
  //   this.room2a_box1_frame = new Phaser.Geom.Rectangle(this.room2a_cardboard_box_1.x, this.room2a_cardboard_box_1.y, 240,240);
  //   this.room2a_graphics.fillRectShape(this.room2a_box1_frame);
  //
  //
  //   this.room2a_box2_frame = new Phaser.Geom.Rectangle(this.room2a_cardboard_box_2.x,this.room2a_cardboard_box_2.y,240,200);
  //   this.room2a_graphics.fillRectShape(this.room2a_box2_frame);
  //
  //   this.room2a_box3_frame = new Phaser.Geom.Rectangle(this.room2a_cardboard_box_3.x,this.room2a_cardboard_box_3.y,240,200);
  //   this.room2a_graphics.fillRectShape(this.room2a_box3_frame);
  //
  //   this.room2a_paper.on('pointerdown', function(pointer, localX, localY, event) {
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
    this.room2a_map.alpha = 0.0;
    this.room2a_notebook.alpha = 0.0;
    this.hideActivities();
    this.room2a_activityLocked.alpha = 0.0;
    this.room2a_character_north.alpha = 1.0;
    this.room2a_character_east.alpha = 1.0;
    this.room2a_character_south.alpha = 1.0;
    this.room2a_character_west.alpha = 1.0;
    this.room2a_characterMoveable = true;
    this.room2a_activityOneOpened = false;
    this.room2a_activityTwoOpened = false;
    this.room2a_activityThreeOpened = false;
    this.room2a_activityFourOpened = false;
    this.room2a_activityFiveOpened = false;
    this.room2a_activitySixOpened = false;
    this.room2a_help_menu.alpha = 0.0;
  this.room2a_activatedQuiz = false;
  //this.quitQuiz();
  }


  hideInteractionBoxes() {

  }

  /* hideActivities
   *
   * Sets the alphas to the activities to 0 so that they are hidden.
  */
  hideActivities() {
    this.room2a_activity1A.alpha = 0.0;
    this.room2a_activity1B.alpha = 0.0;
    this.room2a_activity1C.alpha = 0.0;
    this.room2a_activity1D.alpha = 0.0;
    this.room2a_activity2A.alpha = 0.0;
    this.room2a_activity2B.alpha = 0.0;
    this.room2a_activity2C.alpha = 0.0;
    this.room2a_activity2D.alpha = 0.0;
    this.room2a_activity3A.alpha = 0.0;
    this.room2a_activity3B.alpha = 0.0;
    this.room2a_activity4A.alpha = 0.0;
    this.room2a_activity4B.alpha = 0.0;
    this.room2a_activity4C.alpha = 0.0;
    this.room2a_activity4D.alpha = 0.0;
    this.room2a_activity4E.alpha = 0.0;
    this.room2a_activity5A.alpha = 0.0;
    this.room2a_activity5B.alpha = 0.0;
    this.room2a_activity5C.alpha = 0.0;


  }

  /* checkCorrectPaperOne
   *
   * Checks to see if the first paper is in the correct box.
  */
  // checkCorrectPaperOne() {
  // if(this.room2a_activatedQuiz == true) {
  //   if (this.room2a_key_R.isDown) {
  //   this.room2a_incomeStatement.setVisible(true);
  //   }
  // else
  //   this.room2a_incomeStatement.setVisible(false);
  // //THE RIGHT BOX
  //   if (Phaser.Geom.Rectangle.ContainsPoint(this.room2a_box_1_zone, this.room2a_paper)) {
  //     this.room2a_paper.setVisible(false);
  //     this.room2a_paperTwo.setVisible(true);
  //     this.room2a_paperTwo.setInteractive();
  //     this.room2a_paperCount++;
  //     this.updateCorrectImage();
  //
  //   } else if (Phaser.Geom.Rectangle.ContainsPoint(this.room2a_box_2_zone, this.room2a_paper) /*&& this.paperCount == 1*/) {
  //     this.room2a_paper.x = this.room2a_paper_stack.x;
  //     this.room2a_paper.y = this.room2a_paper_stack.y + 600;
  //   this.updateCorrectImage();
  //
  //   } else if (Phaser.Geom.Rectangle.ContainsPoint(this.room2a_box_3_zone, this.room2a_paper)/* && this.paperCount == 1*/) {
  //     this.room2a_paper.x = this.room2a_paper_stack.x;
  //     this.room2a_paper.y = this.room2a_paper_stack.y + 600;
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
  // this.room2a_incomeStatement.setVisible(false);
  //   if (this.room2a_key_R.isDown) {
  //   this.room2a_retainedEarnings.setVisible(true);
  //   } else
  //   this.room2a_retainedEarnings.setVisible(false);
  //
  //   if (Phaser.Geom.Rectangle.ContainsPoint(this.room2a_box_2_zone, this.room2a_paperTwo) /*&& this.paperCount == 2*/) {
  //     this.room2a_paperTwo.setVisible(false);
  //     this.room2a_paperThree.setVisible(true);
  //     this.room2a_paperThree.setInteractive();
  //     this.room2a_paperCount++;
  //   this.updateCorrectImage();
  //
  //   } else if (Phaser.Geom.Rectangle.ContainsPoint(this.room2a_box_1_zone, this.room2a_paperTwo) /*&& this.paperCount == 2*/) {
  //     this.room2a_paperTwo.x = this.room2a_paper_stack.x;
  //     this.room2a_paperTwo.y = this.room2a_paper_stack.y + 600;
  //     this.updateCorrectImage();
  //
  //   } else if (Phaser.Geom.Rectangle.ContainsPoint(this.room2a_box_3_zone, this.room2a_paperTwo) /*&& this.paperCount == 2*/) {
  //     this.room2a_paperTwo.x = this.room2a_paper_stack.x;
  //     this.room2a_paperTwo.y = this.room2a_paper_stack.y + 600;
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
  // this.room2a_retainedEarnings.setVisible(false);
  //   if (this.room2a_key_R.isDown) {
  //     this.room2a_balanceSheet.setVisible(true);
  //   } else
  //   this.room2a_balanceSheet.setVisible(false);
  //
  //   if (Phaser.Geom.Rectangle.ContainsPoint(this.room2a_box_3_zone, this.room2a_paperThree) && this.room2a_paperCount == 3) {
  //     this.room2a_paperThree.setVisible(false);
  //     this.room2a_paperCount++;
  //     this.quitQuiz();
  //   } else if (Phaser.Geom.Rectangle.ContainsPoint(this.room2a_box_1_zone, this.room2a_paperThree) && this.room2a_paperCount == 3) {
  //     this.room2a_paperThree.x = this.room2a_paper_stack.x;
  //     this.room2a_paperThree.y = this.room2a_paper_stack.y + 600;
  //     this.quitQuiz();
  //
  //   } else if (Phaser.Geom.Rectangle.ContainsPoint(this.room2a_box_2_zone, this.room2a_paperThree) && this.room2a_paperCount == 3) {
  //     this.room2a_paperThree.x = this.room2a_paper_stack.x;
  //     this.room2a_paperThree.y = this.room2a_paper_stack.y + 600;
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
  //     this.room2a_pressr = this.add.image(650, 40, 'room2a_pressr');
  //   this.room2a_pressr.setScale(.8);
  //
  //   this.room2a_placements0 = this.add.image(240, 800, 'room2a_correctPlacements0');
  //   this.room2a_placements0.setScale(.7);
  //   this.vplacements0.setVisible(false);
  //
  //   this.room2a_placements1 = this.add.image(240, 800, 'croom2a_orrectPlacements1');
  //   this.room2a_placements1.setScale(.7);
  //
  //   this.room2a_placements2 = this.add.image(240, 800, 'room2a_correctPlacements2');
  //   this.room2a_placements2.setScale(.7);
  //
  //   this.room2a_incomeStatement = this.add.image(675, 350, 'room2a_incomeStatement');
  //   this.room2a_incomeStatement.setVisible(false);
  //   this.room2a_incomeStatement.setDepth(500);
  //
  //   this.room2a_incomeStatementText = this.add.image(1350, 30, 'room2a_incomeStatementText');
  //   this.room2a_incomeStatementText.setScale(.6);
  //
  //   this.room2a_balanceSheet = this.add.image(675, 410, 'room2a_balanceSheet');
  //   this.room2a_balanceSheet.setVisible(false);
  //   this.room2a_balanceSheet.setDepth(500);
  //   this.room2a_balanceSheet.setScale(.85);
  //
  //   this.room2a_balanceSheetText = this.add.image(1350, 630, 'room2a_balanceSheetText');
  //   this.room2a_balanceSheetText.setScale(.6);
  //
  //   this.room2a_retainedEarnings = this.add.image(675, 210, 'room2a_retainedEarnings');
  //   this.room2a_retainedEarnings.setVisible(false);
  //   this.room2a_retainedEarnings.setDepth(500);
  //
  //   this.room2a_retainedEarningsText = this.add.image(1350, 325, 'room2a_retainedEarningsText');
  //   this.room2a_retainedEarningsText.setScale(.6);
  // }
  //
  // /* updateCorrectImage
  //  *
  //  * Updates the image in the quiz that tells the user how many they have got right.
  // */
  // updateCorrectImage() {
  //   //console.log(this.paperCount);
  //   if (this.room2a_paperCount == 1) {
  //     this.room2a_placements0.setVisible(true);
  //     this.room2a_placements1.setVisible(false);
  //     this.room2a_placements2.setVisible(false);
  //   } else if (this.room2a_paperCount == 2) {
  //     this.room2a_placements0.setVisible(false);
  //     this.room2a_placements1.setVisible(true);
  //     this.room2a_placements2.setVisible(false);
  //   } else if (this.room2a_paperCount == 3) {
  //     this.room2a_placements0.setVisible(false);
  //     this.room2a_placements1.setVisible(false);
  //     this.room2a_placements2.setVisible(true);
  //   }
  //
  // }


  activityAlphas(room2a_oneA, room2a_oneB, room2a_oneC, room2a_oneD, room2a_twoA, room2a_twoB, room2a_twoC, room2a_twoD, room2a_threeA, room2a_threeB, room2a_fourA, room2a_fourB, room2a_fourC, room2a_fourD, room2a_fourE, room2a_fiveA, room2a_fiveB, room2a_fiveC) {
    this.room2a_activity1A.alpha = room2a_oneA;
    this.room2a_activity1B.alpha = room2a_oneB;
    this.room2a_activity1C.alpha = room2a_oneC;
    this.room2a_activity1D.alpha = room2a_oneD;
    this.room2a_activity2A.alpha = room2a_twoA;
    this.room2a_activity2B.alpha = room2a_twoB;
    this.room2a_activity2C.alpha = room2a_twoC;
    this.room2a_activity2D.alpha = room2a_twoD;
    this.room2a_activity3A.alpha = room2a_threeA;
    this.room2a_activity3B.alpha = room2a_threeB;
    this.room2a_activity4A.alpha = room2a_fourA;
    this.room2a_activity4B.alpha = room2a_fourB;
    this.room2a_activity4C.alpha = room2a_fourC;
    this.room2a_activity4D.alpha = room2a_fourD;
    this.room2a_activity4E.alpha = room2a_fourE;
    this.room2a_activity5A.alpha = room2a_fiveA;
    this.room2a_activity5B.alpha = room2a_fiveB;
    this.room2a_activity5C.alpha = room2a_fiveC;


  }


  /* checkNextPage
   *
   *
  */

  checkNextPage() {
    if (this.room2a_activityOneOpened == true && this.room2a_key_1.isDown) {
      this.activityAlphas(1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    } else if (this.room2a_activityOneOpened == true && this.room2a_key_2.isDown) {
      this.activityAlphas(0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0 , 0, 0, 0 ,0, 0, 0);
    } else if (this.room2a_activityOneOpened == true && this.room2a_key_3.isDown) {
      this.activityAlphas(0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    }else if (this.room2a_activityOneOpened == true && this.room2a_key_4.isDown) {
      this.activityAlphas(0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    }
    if (this.room2a_activityTwoOpened == true && this.room2a_key_1.isDown) {
      this.activityAlphas(0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    }
    else if (this.room2a_activityTwoOpened == true && this.room2a_key_2.isDown) {
      this.activityAlphas(0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    }
    else if (this.room2a_activityTwoOpened == true && this.room2a_key_3.isDown) {
      this.activityAlphas(0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    }
    else if (this.room2a_activityTwoOpened == true && this.room2a_key_4.isDown) {
      this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    }
    if (this.room2a_activityThreeOpened == true && this.room2a_key_1.isDown) {
      this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    }
    else if (this.room2a_activityThreeOpened == true && this.room2a_key_2.isDown) {
      this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0);
    }
    if (this.room2a_activityFourOpened == true && this.room2a_key_1.isDown) {
      this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0);
    }
    else if (this.room2a_activityFourOpened == true && this.room2a_key_2.isDown) {
      this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0);
    }
    else if (this.room2a_activityFourOpened == true && this.room2a_key_3.isDown) {
      this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0);
    }
    else if (this.room2a_activityFourOpened == true && this.room2a_key_4.isDown) {
      this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0);
    }
    else if (this.room2a_activityFourOpened == true && this.room2a_key_5.isDown) {
      this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0);
    }
    if (this.room2a_activityFiveOpened == true && this.room2a_key_1.isDown) {
      this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0);
    }
    else if (this.room2a_activityFiveOpened == true && this.room2a_key_2.isDown) {
      this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0);
    }
    else if (this.room2a_activityFiveOpened == true && this.room2a_key_3.isDown) {
      this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1);
    }
  }

  /* helpMenu
   *
   * Sets the alpha of the help menu to 1 so that it is visible
  */
  helpMenu() {
      this.room2a_help_menu.alpha = 1.0;
      this.room2a_helpOpen = true;
  }
}
