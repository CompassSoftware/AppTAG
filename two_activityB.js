class two_activityB extends Phaser.Scene {

  constructor() {
    super("two_ActivityB");
    this.room2b_quizActive = false;
    this.room2b_activatedQuiz = false;
    this.room2b_unlocked = false;
    this.room2b_paperMoveable = false;
    this.room2b_activityOneOpened = false;
    this.room2b_activityTwoOpened = false;
    this.room2b_activityThreeOpened = false;
    this.room2b_activityFourOpened = false;
    this.room2b_activityFiveOpened = false;
    this.room2b_activitySixOpened = false;
    this.room2b_helpOpen = false;
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
    if (this.room2b_key_H.isDown) {
      this.helpMenu();
    }

    if (this.room2b_activityOneOpened) {
      this.checkNextPage();
    }
    if (this.room2b_activityTwoOpened) {
      this.checkNextPage();
    }
    if (this.room2b_activityThreeOpened) {
      this.checkNextPage();
    }
    if (this.room2b_activityFourOpened) {
      this.checkNextPage();
    }
    if (this.room2b_activityFiveOpened) {
      this.checkNextPage();
    }


    if (this.room2b_key_U.isDown && this.room2b_unlocked == false) {
      room2b_activity1Locked = false;
      room2b_activity2Locked = false;
      room2b_activity3Locked = false;
      room2b_activity4Locked = false;
      room2b_activity5Locked = false;
      room2b_activity6Locked = false;
      room2b_activity6Complete = true;
      this.room2b_unlocked = true;
    }

    if (this.room2b_key_M.isDown) {
      this.room2b_map.alpha = 1.0;
      characterMoveable = false;
      this.room2b_character_north.alpha = 0.0;
      this.room2b_character_east.alpha = 0.0;
      this.room2b_character_south.alpha = 0.0;
      this.room2b_character_west.alpha = 0.0;
    }

    if (this.room2b_key_B.isDown) {
      this.room2b_notebook.alpha = 1.0;
      room2b_characterMoveable = false;
      this.room2b_character_north.alpha = 0.0;
      this.room2b_character_east.alpha = 0.0;
      this.room2b_character_south.alpha = 0.0;
      this.room2b_character_west.alpha = 0.0;
    }


    if (this.room2b_key_Q.isDown && this.room2b_activatedQuiz == false) {
      this.quitInteraction();
    }

    if (this.room2b_quizActive == true && this.room2b_activatedQuiz == false && this.room2b_key_E.isDown) {
      this.activateQuiz();
      this.room2b_activatedQuiz = true;
    }

    if (this.room2b_quizActive == true && this.room2b_key_Q.isDown && this.room2b_activatedQuiz == true) {
      this.quitQuiz();
      this.room2b_activatedQuiz = false;
    }

    if (this.room2b_activatedQuiz == false) {
        this.movePlayer();
        this.checkInteractValidity();
}
  if (this.room2b_activatedQuiz == false)
    this.room2b_characterMoveable = true;
    }


/***********************************************************************************************
======================================HELPER METHODS============================================
*///////////////////////////////////////////////////////////////////////////////////////////////
  /* loadAssests
   *
   * Loads images to be used and sets them into a variable name.
  */
  loadAssets() {
  this.load.image('room2b_pressr', 'assets/pressr.png');
    this.load.image('room2b_one_lesson_BG', 'assets/one_lesson_BG.png');
    this.load.image('room2b_character_north', 'assets/character_north.png');
    this.load.image('room2b_character_east', 'assets/character_east.png');
    this.load.image('room2b_character_south', 'assets/character_south.png');
    this.load.image('room2b_character_west', 'assets/character_west.png');
    this.load.image('room2b_redCharacter', 'assets/redCharacter.png');
    // this.load.image('room2b_activity1A', 'assets/Panels/RoomTwo/PanelOneA.png');
    // this.load.image('room2b_activity1B', 'assets/Panels/RoomTwo/PanelOneB.png');
    // this.load.image('room2b_activity1C', 'assets/Panels/RoomTwo/PanelOneC.png');
    // this.load.image('room2b_activity1D', 'assets/Panels/RoomTwo/PanelOneD.png');
    // this.load.image('room2b_activity2A', 'assets/Panels/RoomTwo/PanelTwoA.png');
    // this.load.image('room2b_activity2B', 'assets/Panels/RoomTwo/PanelTwoB.png');
    // this.load.image('room2b_activity2C', 'assets/Panels/RoomTwo/PanelTwoC.png');
    // this.load.image('room2b_activity2D', 'assets/Panels/RoomTwo/PanelTwoD.png');
    // this.load.image('room2b_activity3A', 'assets/Panels/RoomTwo/PanelThreeA.png');
    // this.load.image('room2b_activity3B', 'assets/Panels/RoomTwo/PanelThreeB.png');
    // this.load.image('room2b_activity4A', 'assets/Panels/RoomTwo/PanelFourA.png');
    // this.load.image('room2b_activity4B', 'assets/Panels/RoomTwo/PanelFourB.png');
    // this.load.image('room2b_activity4C', 'assets/Panels/RoomTwo/PanelFourC.png');
    // this.load.image('room2b_activity4D', 'assets/Panels/RoomTwo/PanelFourD.png');
    // this.load.image('room2b_activity4E', 'assets/Panels/RoomTwo/PanelFourE.png');
    // this.load.image('room2b_activity5A', 'assets/Panels/RoomTwo/PanelFiveA.png');
    // this.load.image('room2b_activity5B', 'assets/Panels/RoomTwo/PanelFiveB.png');
    // this.load.image('room2b_activity5C', 'assets/Panels/RoomTwo/PanelFiveC.png');
    this.load.image('room2b_E_KeyImg', 'assets/E_Key.png');
    // this.load.image('room2b_wall_info_1', 'assets/wall_art.png');
    // this.load.image('room2b_wall_info_2', 'assets/wall_art.png');
    // this.load.image('room2b_wall_info_3', 'assets/wall_art.png');
    // this.load.image('room2b_wall_info_4', 'assets/wall_art.png');
    // this.load.image('room2b_wall_info_5', 'assets/wall_art.png');
    // this.load.image('room2b_wall_info_6', 'assets/wall_art.png');
    this.load.image('room2b_floor', 'assets/floor_two_activity_2.jpg');
    this.load.image('room2b_map', 'assets/map.png');
    this.load.image('room2b_notebook', 'assets/notebook.png');
    this.load.image('room2b_activityLocked', 'assets/activityLocked.png');
    this.load.image('room2b_help_menu', 'assets/help_menu.png');
  }

  /* createImages
   *
   * Adds the image to the game board
  */
  createImages() {
    this.room2b_e_pressed = false;
    this.room2b_papers_moved = false;
    this.room2b_background = this.add.image(768, 432, 'room2b_one_lesson_BG');
    this.room2b_character_north = this.add.image(768, 432, 'room2b_character_north');
    this.room2b_character_east = this.add.image(768, 432, 'room2b_character_east');
    this.room2b_character_south = this.add.image(768, 432, 'room2b_character_south');
    this.room2b_character_west = this.add.image(768, 432, 'room2b_character_west');
    this.room2b_E_KeyImg = this.add.image(this.room2b_character_north.x+40, this.room2b_character_north.y+40, 'room2b_E_KeyImg');
    this.room2b_activity1A = this.add.image(768, 432, 'room2b_activity1A');
    this.room2b_activity1B = this.add.image(768, 432, 'room2b_activity1B');
    this.room2b_activity1C = this.add.image(768, 432, 'room2b_activity1C');
    this.room2b_activity1D = this.add.image(768, 432, 'room2b_activity1D');
    this.room2b_activity2A = this.add.image(768, 432, 'room2b_activity2A');
    this.room2b_activity2B = this.add.image(768, 432, 'room2b_activity2B');
    this.room2b_activity2C = this.add.image(768, 432, 'room2b_activity2C');
    this.room2b_activity2D = this.add.image(768, 432, 'room2b_activity2D');
    this.room2b_activity3A = this.add.image(768, 432, 'room2b_activity3A');
    this.room2b_activity3B = this.add.image(768, 432, 'room2b_activity3B');
    this.room2b_activity4A = this.add.image(768, 432, 'room2b_activity4A');
    this.room2b_activity4B = this.add.image(768, 432, 'room2b_activity4B');
    this.room2b_activity4C = this.add.image(768, 432, 'room2b_activity4C');
    this.room2b_activity4D = this.add.image(768, 432, 'room2b_activity4D');
    this.room2b_activity4E = this.add.image(768, 432, 'room2b_activity4E');
    this.room2b_activity5A = this.add.image(768, 432, 'room2b_activity5A');
    this.room2b_activity5B = this.add.image(768, 432, 'room2b_activity5B');
    this.room2b_activity5C = this.add.image(768, 432, 'room2b_activity5C');
    // this.room2b_wall_info_1 = this.add.image(305, 75, 'room2b_wall_info_1');
    // this.room2b_wall_info_2 = this.add.image(768, 75, 'room2b_wall_info_2');
    // this.room2b_wall_info_3 = this.add.image(1232, 75, 'room2b_wall_info_3');
    // this.room2b_wall_info_4 = this.add.image(305, 790, 'room2b_wall_info_4');
    // this.room2b_wall_info_5 = this.add.image(768, 790, 'room2b_wall_info_5');
    // this.room2b_wall_info_6 = this.add.image(1232, 790, 'room2b_wall_info_6');
    this.room2b_floor = this.add.image(769, 433, 'room2b_floor');
    this.room2b_map = this.add.image(768, 432, 'room2b_map');
    this.room2b_notebook = this.add.image(768, 432, 'room2b_notebook');
    this.room2b_activityLocked = this.add.image(768, 432, 'room2b_activityLocked');
    this.room2b_help_menu = this.add.image(768, 432, 'room2b_help_menu');
  }

  /* setAlphas
   *
   * sets the alphas to to items in the game to zero so they are not visible at the beginning.
  */
  setAlphas() {
    this.room2b_map.alpha = 0.0;
    this.room2b_notebook.alpha = 0.0;
    this.room2b_activityLocked.alpha = 0.0;
    this.room2b_E_KeyImg.alpha = 0.0;
    this.room2b_help_menu.alpha = 0.0;
    this.hideActivities();
  }

  /* setDepths
   *
   * Sets the depth of each object on the screen.
  */
  setDepths() {
    this.room2b_floor.setDepth(0);
    this.room2b_character_north.setDepth(50);
    this.room2b_character_east.setDepth(50);
    this.room2b_character_south.setDepth(50);
    this.room2b_character_west.setDepth(50);
    this.room2b_E_KeyImg.setDepth(49);
    // this.room2b_activity1A.setDepth(100);
    // this.room2b_activity1B.setDepth(100);
    // this.room2b_activity1C.setDepth(100);
    // this.room2b_activity1D.setDepth(100);
    // this.room2b_activity2A.setDepth(100);
    // this.room2b_activity2B.setDepth(100);
    // this.room2b_activity2C.setDepth(100);
    // this.room2b_activity2D.setDepth(100);
    // this.room2b_activity3A.setDepth(100);
    // this.room2b_activity3B.setDepth(100);
    // this.room2b_activity4A.setDepth(100);
    // this.room2b_activity4B.setDepth(100);
    // this.room2b_activity4C.setDepth(100);
    // this.room2b_activity4D.setDepth(100);
    // this.room2b_activity4E.setDepth(100);
    // this.room2b_activity5A.setDepth(100);
    // this.room2b_activity5B.setDepth(100);
    // this.room2b_activity5C.setDepth(100);

    this.room2b_map.setDepth(100);
    // this.room2b_paper_stack.setDepth(1);
    this.room2b_notebook.setDepth(100);
    this.room2b_help_menu.setDepth(100);
  }

  /* setScales
   *
   * Scales the size of each object.
  */
  setScales() {
    this.room2b_E_KeyImg.setScale(0.4);
    // this.room2b_wall_info_1.setScale(0.75);
    // this.room2b_wall_info_2.setScale(0.75);
    // this.room2b_wall_info_3.setScale(0.75);
    // this.room2b_wall_info_4.setScale(0.75);
    // this.room2b_wall_info_5.setScale(0.75);
    // this.room2b_wall_info_6.setScale(0.75);
    this.room2b_notebook.setScale(0.75);
    this.room2b_map.setScale(0.75);
    this.room2b_character_north.setScale(3);
    this.room2b_character_south.setScale(3);
    this.room2b_character_west.setScale(3);
    this.room2b_character_east.setScale(3);
    this.room2b_floor.scaleY = 1.185;
    this.room2b_floor.scaleX = 1.395;

  }

  /* setRotations
   *
   * Sets the rotation that each object sits at.
  */
  setRotations() {
    // this.room2b_wall_info_4.rotation = 3.14;
    // this.room2b_wall_info_5.rotation = 3.14;
    // this.room2b_wall_info_6.rotation = 3.14;
   }

  /* createInteractionZones
   *
   * Sets the area that you can interact with each object
  */
  createInteractionZones() {
    this.room2b_graphics = this.add.graphics({fillStyle: {color: 0xFFFFFF, alpha: 0.0}});
    //this.graphicsTest = this.add.graphics({fillStyle: {color: 0x4F4F4F, alpha: 1.0}});
    //TOP ZONES
                                                //xpos ypos x   y
    this.room2b_top_left_info = new Phaser.Geom.Rectangle(175,150,240,150);
    this.room2b_graphics.fillRectShape(this.room2b_top_left_info);
                                                //xpos ypos x  y
    this.room2b_top_mid_info = new Phaser.Geom.Rectangle(650,150,240,150);
    this.room2b_graphics.fillRectShape(this.room2b_top_mid_info);
                                                 //xpos ypos x   y
    this.room2b_top_right_info = new Phaser.Geom.Rectangle(1120,150,240,150);
    this.room2b_graphics.fillRectShape(this.room2b_top_right_info);

    //BOTTOM ZONES

    this.room2b_bot_left_info = new Phaser.Geom.Rectangle(175,565,240,150);
    this.room2b_graphics.fillRectShape(this.room2b_bot_left_info);

    this.room2b_bot_mid_info = new Phaser.Geom.Rectangle(650,565,240,150);
    this.room2b_graphics.fillRectShape(this.room2b_bot_mid_info);

    this.room2b_bot_right_info = new Phaser.Geom.Rectangle(1120,565,240,150);
    this.room2b_graphics.fillRectShape(this.room2b_bot_right_info);


  }

  /* assignKeybinds
   *
   * Sets keybinds to the keyboard
  */
  assignKeybinds() {
        //KEYBOARD INPUT
    this.room2b_key_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.room2b_key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.room2b_key_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.room2b_key_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.room2b_key_E = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    this.room2b_key_Q = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    this.room2b_key_M = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
    this.room2b_key_B = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
    this.room2b_key_U = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.U);
    this.room2b_key_1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
    this.room2b_key_2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
    this.room2b_key_3 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);
    this.room2b_key_4 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR);
    this.room2b_key_5 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FIVE);
    this.room2b_key_R = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    this.room2b_key_H = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);

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

  checkActivityOpened(room2b_one, room2b_two, room2b_three, room2b_four, room2b_five, room2b_six) {
    this.room2b_activityOneOpened = room2b_one;
    this.room2b_activityTwoOpened = room2b_two;
    this.room2b_activityThreeOpened = room2b_three;
    this.room2b_activityFourOpened = room2b_four;
    this.room2b_activityFiveOpened = room2b_five;
    this.room2b_activitySixOpened = room2b_six;

  }

  /* checkInteractValidity
   *
   * Checks to see if the character can interact with the object
  */

  checkInteractValidity() {
  //   if (Phaser.Geom.Rectangle.ContainsPoint(this.room2b_top_right_info, this.room2b_character_north)) {
  //     this.room2b_E_KeyImg.x = this.room2b_character_north.x;
  //     this.room2b_E_KeyImg.y = this.room2b_character_north.y-75;
  //     this.room2b_E_KeyImg.alpha = 1.0;
  //     if (this.room2b_key_E.isDown) {
  //       this.room2b_activity1A.alpha = 1.0;
  //       this.room2b_characterMoveable = false;
  //       this.checkActivityOpened(true, false, false, false, false, false);
  //   this.room2b_activity2Locked = false;
  //
  //   //COME BACK AND CHANGE THIS LATER
  //   this.room2b_activity6Complete = true;
  //     }
  //
  //   } else if (Phaser.Geom.Rectangle.ContainsPoint(this.room2b_bot_mid_info, this.room2b_character_north)) {
  //     this.room2b_E_KeyImg.x = this.room2b_character_north.x;
  //     this.room2b_E_KeyImg.y = this.room2b_character_north.y+75;
  //     this.room2b_E_KeyImg.alpha = 1.0;
  //   if (this.room2b_key_E.isDown && this.room2b_activity2Locked == false) {
  //       this.room2b_activity2A.alpha = 1.0;
  //       this.checkActivityOpened(false, true, false, false, false, false);
  //   this.room2b_activity3Locked = false;
  // } else if (this.room2b_key_E.isDown && this.room2b_activity2Locked == true) {
  //         this.room2b_activityLocked.alpha = 1.0;
  //         this.room2b_characterMoveable = false;
  //         }
  //
  //   } else if (Phaser.Geom.Rectangle.ContainsPoint(this.room2b_top_mid_info, this.room2b_character_north)) {
  //     this.room2b_E_KeyImg.x = this.room2b_character_north.x;
  //     this.room2b_E_KeyImg.y = this.room2b_character_north.y-75;
  //     this.room2b_E_KeyImg.alpha = 1.0;
  //     if (this.room2b_key_E.isDown && this.room2b_activity3Locked == false) {
  //       this.room2b_activity3A.alpha = 1.0;
  //       this.checkActivityOpened(false, false, true, false, false, false);
  //   this.room2b_activity4Locked = false;
  // } else if (this.room2b_key_E.isDown && this.room2b_activity3Locked == true){
  //       this.room2b_activityLocked.alpha = 1.0;
  //       this.room2b_characterMoveable = false;
  //       }
  //
  //   } else if (Phaser.Geom.Rectangle.ContainsPoint(this.room2b_bot_right_info, this.room2b_character_north)) {
  //     this.room2b_E_KeyImg.x = this.room2b_character_north.x;
  //     this.room2b_E_KeyImg.y = this.room2b_character_north.y+75;
  //     this.room2b_E_KeyImg.alpha = 1.0;
  //     if (this.room2b_key_E.isDown && this.room2b_activity4Locked == false) {
  //     this.room2b_activity4A.alpha = 1.0;
  //     this.checkActivityOpened(false, false, false, true, false, false);
  //   this.room2b_activity5Locked = false;
  // } else if (this.room2b_key_E.isDown && this.room2b_activity4Locked == true){
  //       this.room2b_activityLocked.alpha = 1.0;
  //       this.room2b_characterMoveable = false;
  //       }
  //
  //
  //   } else if (Phaser.Geom.Rectangle.ContainsPoint(this.room2b_top_left_info, this.room2b_character_north)) {
  //     this.room2b_E_KeyImg.x = this.room2b_character_north.x;
  //     this.room2b_E_KeyImg.y = this.room2b_character_north.y-75;
  //
  //     this.room2b_E_KeyImg.alpha = 1.0;
  //     if (this.room2b_key_E.isDown && this.room2b_activity5Locked == false) {
  //       this.room2b_activity5A.alpha = 1.0;
  //       this.checkActivityOpened(false, false, false, false, true, false);
  //   this.room2b_activity6Locked = false;
  // } else if (this.room2b_key_E.isDown && this.room2b_activity5Locked == true){
  //         this.room2b_activityLocked.alpha = 1.0;
  //         this.room2b_characterMoveable = false;
  //       }
  //
  //   }
  //
  //     else {
  //     this.hideActivities();
  //     this.room2b_E_KeyImg.alpha = 0.0;
  //   }
  }


  /* setCharacterAlpha
   *
   * Sets the alpha of each facing of the character
   * Call this method with the argument as (N,E,S,W)
  */
  setCharacterAlpha() {
    this.room2b_character_north.alpha = arguments[0];
    this.room2b_character_east.alpha = arguments[1];
    this.room2b_character_south.alpha = arguments[2];
    this.room2b_character_west.alpha = arguments[3];
  }

  /* movePlayer
   *
   *
  */
  movePlayer() {
    //setCharacterAlpha is in helper.js and arguments go N,E,S,W
    this.setCharacterAlpha(0,0,1,0);

    //Character moves up
    if(this.room2b_key_W.isDown && this.room2b_characterMoveable == true) {
  if(this.room2b_character_north.y > 185){
          this.room2b_character_north.y -= 5;
          this.room2b_character_east.y -= 5;
          this.room2b_character_south.y -= 5;
          this.room2b_character_west.y -= 5;

          this.setCharacterAlpha(1,0,0,0);



    }
    //Character moves left
  } if (this.room2b_key_A.isDown && this.room2b_characterMoveable == true) {
        if(this.room2b_character_west.x > 210){
          this.room2b_character_west.x -= 5;
          this.room2b_character_east.x -= 5;
          this.room2b_character_south.x -= 5;
          this.room2b_character_north.x -= 5;

          this.setCharacterAlpha(0,0,0,1);
  }

    }
    //Character moves down
     if (this.room2b_key_S.isDown && this.room2b_characterMoveable == true) {
  if(this.room2b_character_south.y < 680){
          this.room2b_character_south.y += 5;
          this.room2b_character_east.y += 5;
          this.room2b_character_north.y += 5;
          this.room2b_character_west.y += 5;

          this.setCharacterAlpha(0,0,1,0);
    }

    }
    //Character moves right
    if (this.room2b_key_D.isDown && this.room2b_characterMoveable == true) {
        if(this.room2b_character_east.x < 1325){
          this.room2b_character_east.x += 5;
          this.room2b_character_north.x += 5;
          this.room2b_character_south.x += 5;
          this.room2b_character_west.x += 5;

          this.setCharacterAlpha(0,1,0,0);
    }
    }
  }

  /* movePaper
   *
   * makes the paper moveable in the test activity
  */
  movePaper(moveThisPaper) {
    if(this.room2b_key_W.isDown && this.room2b_paperMoveable == true) {
      room2b_moveThisPaper.y -= 7;
    } if (this.room2b_key_A.isDown && this.room2b_paperMoveable == true) {
      room2b_moveThisPaper.x -= 7;
    } if (this.room2b_key_S.isDown && this.room2b_paperMoveable == true) {
      room2b_moveThisPaper.y += 7;
    } if (this.room2b_key_D.isDown && this.room2b_paperMoveable == true) {
      room2b_moveThisPaper.x += 7;
    }
  }

  /* quitInteraction
   *
   * Sets the alphas to 0 so that the interaction is quit.
  */
  quitInteraction() {
    this.room2b_map.alpha = 0.0;
    this.room2b_notebook.alpha = 0.0;
    this.hideActivities();
    this.room2b_activityLocked.alpha = 0.0;
    this.room2b_character_north.alpha = 1.0;
    this.room2b_character_east.alpha = 1.0;
    this.room2b_character_south.alpha = 1.0;
    this.room2b_character_west.alpha = 1.0;
    this.room2b_characterMoveable = true;
    this.room2b_activityOneOpened = false;
    this.room2b_activityTwoOpened = false;
    this.room2b_activityThreeOpened = false;
    this.room2b_activityFourOpened = false;
    this.room2b_activityFiveOpened = false;
    this.room2b_activitySixOpened = false;
    this.room2b_help_menu.alpha = 0.0;
  this.room2b_activatedQuiz = false;
  }


  hideInteractionBoxes() {

  }

  /* hideActivities
   *
   * Sets the alphas to the activities to 0 so that they are hidden.
  */
  hideActivities() {
    this.room2b_activity1A.alpha = 0.0;
    this.room2b_activity1B.alpha = 0.0;
    this.room2b_activity1C.alpha = 0.0;
    this.room2b_activity1D.alpha = 0.0;
    this.room2b_activity2A.alpha = 0.0;
    this.room2b_activity2B.alpha = 0.0;
    this.room2b_activity2C.alpha = 0.0;
    this.room2b_activity2D.alpha = 0.0;
    this.room2b_activity3A.alpha = 0.0;
    this.room2b_activity3B.alpha = 0.0;
    this.room2b_activity4A.alpha = 0.0;
    this.room2b_activity4B.alpha = 0.0;
    this.room2b_activity4C.alpha = 0.0;
    this.room2b_activity4D.alpha = 0.0;
    this.room2b_activity4E.alpha = 0.0;
    this.room2b_activity5A.alpha = 0.0;
    this.room2b_activity5B.alpha = 0.0;
    this.room2b_activity5C.alpha = 0.0;


  }


  activityAlphas(room2b_oneA, room2b_oneB, room2b_oneC, room2b_oneD, room2b_twoA, room2b_twoB, room2b_twoC, room2b_twoD, room2b_threeA, room2b_threeB, room2b_fourA, room2b_fourB, room2b_fourC, room2b_fourD, room2b_fourE, room2b_fiveA, room2b_fiveB, room2b_fiveC) {
    this.room2b_activity1A.alpha = room2b_oneA;
    this.room2b_activity1B.alpha = room2b_oneB;
    this.room2b_activity1C.alpha = room2b_oneC;
    this.room2b_activity1D.alpha = room2b_oneD;
    this.room2b_activity2A.alpha = room2b_twoA;
    this.room2b_activity2B.alpha = room2b_twoB;
    this.room2b_activity2C.alpha = room2b_twoC;
    this.room2b_activity2D.alpha = room2b_twoD;
    this.room2b_activity3A.alpha = room2b_threeA;
    this.room2b_activity3B.alpha = room2b_threeB;
    this.room2b_activity4A.alpha = room2b_fourA;
    this.room2b_activity4B.alpha = room2b_fourB;
    this.room2b_activity4C.alpha = room2b_fourC;
    this.room2b_activity4D.alpha = room2b_fourD;
    this.room2b_activity4E.alpha = room2b_fourE;
    this.room2b_activity5A.alpha = room2b_fiveA;
    this.room2b_activity5B.alpha = room2b_fiveB;
    this.room2b_activity5C.alpha = room2b_fiveC;


  }


  /* checkNextPage
   *
   *
  */

  checkNextPage() {
    if (this.room2b_activityOneOpened == true && this.room2b_key_1.isDown) {
      this.activityAlphas(1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    } else if (this.room2b_activityOneOpened == true && this.room2b_key_2.isDown) {
      this.activityAlphas(0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0 , 0, 0, 0 ,0, 0, 0);
    } else if (this.room2b_activityOneOpened == true && this.room2b_key_3.isDown) {
      this.activityAlphas(0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    }else if (this.room2b_activityOneOpened == true && this.room2b_key_4.isDown) {
      this.activityAlphas(0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    }
    if (this.room2b_activityTwoOpened == true && this.room2b_key_1.isDown) {
      this.activityAlphas(0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    }
    else if (this.room2b_activityTwoOpened == true && this.room2b_key_2.isDown) {
      this.activityAlphas(0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    }
    else if (this.room2b_activityTwoOpened == true && this.room2b_key_3.isDown) {
      this.activityAlphas(0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    }
    else if (this.room2b_activityTwoOpened == true && this.room2b_key_4.isDown) {
      this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    }
    if (this.room2b_activityThreeOpened == true && this.room2b_key_1.isDown) {
      this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    }
    else if (this.room2b_activityThreeOpened == true && this.room2b_key_2.isDown) {
      this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0);
    }
    if (this.room2b_activityFourOpened == true && this.room2b_key_1.isDown) {
      this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0);
    }
    else if (this.room2b_activityFourOpened == true && this.room2b_key_2.isDown) {
      this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0);
    }
    else if (this.room2b_activityFourOpened == true && this.room2b_key_3.isDown) {
      this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0);
    }
    else if (this.room2b_activityFourOpened == true && this.room2b_key_4.isDown) {
      this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0);
    }
    else if (this.room2b_activityFourOpened == true && this.room2b_key_5.isDown) {
      this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0);
    }
    if (this.room2b_activityFiveOpened == true && this.room2b_key_1.isDown) {
      this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0);
    }
    else if (this.room2b_activityFiveOpened == true && this.room2b_key_2.isDown) {
      this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0);
    }
    else if (this.room2b_activityFiveOpened == true && this.room2b_key_3.isDown) {
      this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1);
    }
  }

  /* helpMenu
   *
   * Sets the alpha of the help menu to 1 so that it is visible
  */
  helpMenu() {
      this.room2b_help_menu.alpha = 1.0;
      this.room2b_helpOpen = true;
  }
}
