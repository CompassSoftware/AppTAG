class accountEqn extends Phaser.Scene {

  constructor() {
    super("Account_Eqn");
    this.room3_quizActive = false;
    this.room3_activatedQuiz = false;
    this.room3_unlocked = false;
    this.room3_paperMoveable = false;
    this.room3_activityOneOpened = false;
    this.room3_activityTwoOpened = false;
    this.room3_activityThreeOpened = false;
    this.room3_activityFourOpened = false;
    this.room3_activityFiveOpened = false;
    this.room3_helpOpen = false;
    this.room3_counter = 0;
    document.getElementById("background").volume = 0.8;
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
    this.displayProfile();
    this.roomLabel = this.add.text(650, 6, "Account Equation Room", {
      font: "24px arial",
      color: "#FFFFFF",
      align: 'left',
      fontWeight: 'bold',
    });
  }

  update(delta) {
    //TEMPORARY FOR TESTING
    //vvvvvvvvvvvvvvvvvvv//

    if (Phaser.Input.Keyboard.JustDown(this.room3_key_N)) {
      document.getElementById("background").play();
      if (musicToggle == false) {
        document.getElementById("background").play();
        musicToggle = true;
      } else if (musicToggle == true) {
        document.getElementById("background").pause();
        musicToggle = false;
      }
    }

    if (this.room3_key_H.isDown) {
      this.helpMenu();
    }
    document.getElementById("background").volume = 0.8;


    if (this.room3_activityOneOpened) {
      this.checkNextPage();
    }
    if (this.room3_activityTwoOpened) {
      //	console.log("update:actTwoOpened:checkNextPage");
      this.checkNextPage();
    }
    if (this.room3_activityThreeOpened) {
      this.checkNextPage();
    }
    if (this.room3_activityFourOpened) {
      this.checkNextPage();
    }
    if (this.room3_activityFiveOpened) {
      this.checkNextPage();
    }
    if (this.room3_activitySixOpened) {
      this.checkNextPage();
    }

    if (roomProgress >= 3005)
      this.room3_wall_info_2.alpha = wallAlpha;

    if (roomProgress >= 3010)
      this.room3_wall_info_4.alpha = wallAlpha;

    if (roomProgress >= 3015)
      this.room3_wall_info_1.alpha = wallAlpha;

    if (roomProgress >= 3020)
      this.room3_wall_info_5.alpha = wallAlpha;

    if (roomProgress >= 3025)
      this.room3_wall_info_6.alpha = wallAlpha;

    if (roomProgress >= 3030)
      this.room3_wall_info_3.alpha = wallAlpha;

    if (roomProgress >= 3030 && this.room3_unlocked) {
      this.room3_activity_hole.alpha = 1.0;
    }

    if (roomProgress >= 3500 && this.room3_unlocked) {
      this.room3_hole.alpha = 1.0;
    }


    if (this.room3_key_U.isDown) {
      roomProgress = 3030;
      this.room3_hole.alpha = 1.0;
      this.room3_activity_hole.alpha = 1.0;
      this.room3_unlocked = true;
    }

    if (this.room3_key_M.isDown) {
      this.room3_map.alpha = 1.0;
      this.characterMoveable = false;
      this.room3_character_north.alpha = 0.0;
      this.room3_character_east.alpha = 0.0;
      this.room3_character_south.alpha = 0.0;
      this.room3_character_west.alpha = 0.0;
    }

    if (this.room3_key_B.isDown) {
      this.room3_notebook.alpha = 1.0;
      this.room3_characterMoveable = false;
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
    if (this.room3_activatedQuiz == false) {
      this.room3_characterMoveable = true;
    }

  }


  /***********************************************************************************************
   ======================================HELPER METHODS============================================
   *///////////////////////////////////////////////////////////////////////////////////////////////
  /* loadAssests
   *
   * Loads images to be used and sets them into a variable name.
  */
  loadAssets() {
    this.load.image('returnDoor', 'assets/dooropen_100x100.png');
    this.load.image('room3_one_lesson_BG', 'assets/one_lesson_BG.png');
    this.load.image('room3_character_north', 'assets/character_north.png');
    this.load.image('room3_character_east', 'assets/character_east.png');
    this.load.image('room3_character_south', 'assets/character_south.png');
    this.load.image('room3_character_west', 'assets/character_west.png');
    //    this.load.image('room3_activity1', 'assets/Panels/RoomThree/PanelOneA.png');
    this.load.image('room3_activity1', 'assets/Panels/RoomThree/R3P1_t.png');
    //    this.load.image('room3_activity1B', 'assets/Panels/RoomThree/PanelOneB.png');
    //    this.load.image('room3_activity1C', 'assets/Panels/RoomThree/PanelOneC.png');
    //    this.load.image('room3_activity1D', 'assets/Panels/RoomThree/PanelOneD.png');
    this.load.image('room3_activity2A', 'assets/Panels/RoomThree/R3P2a_t.png');
    this.load.image('room3_activity2B', 'assets/Panels/RoomThree/R3P2b_t.png');
    this.load.image('room3_activity2C', 'assets/Panels/RoomThree/R3P2c_t.png');
    this.load.image('room3_activity2D', 'assets/Panels/RoomThree/R3P2d_t.png');
    this.load.image('room3_activity2E', 'assets/Panels/RoomThree/R3P2e_t.png');
    //    this.load.image('room3_activity2A', 'assets/Panels/RoomThree/PanelTwoA.png');
    //    this.load.image('room3_activity2B', 'assets/Panels/RoomThree/PanelTwoB.png');
    //    this.load.image('room3_activity2C', 'assets/Panels/RoomThree/PanelTwoC.png');
    this.load.image('room3_activity3A', 'assets/Panels/RoomThree/R3P3a_t.png');
    this.load.image('room3_activity3B', 'assets/Panels/RoomThree/R3P3b_t.png');
    this.load.image('room3_activity4A', 'assets/Panels/RoomThree/R3P4a_t.png');
    this.load.image('room3_activity4B', 'assets/Panels/RoomThree/R3P4b_t.png');
    this.load.image('room3_activity4C', 'assets/Panels/RoomThree/R3P4c_t.png');
    this.load.image('room3_activity4D', 'assets/Panels/RoomThree/R3P4d_t.png');
    this.load.image('room3_activity4E', 'assets/Panels/RoomThree/R3P4e_t.png');
    this.load.image('room3_activity5A', 'assets/Panels/RoomThree/R3P5a_t.png');
    this.load.image('room3_activity5B', 'assets/Panels/RoomThree/R3P5b_t.png');
    this.load.image('room3_activity5C', 'assets/Panels/RoomThree/R3P5c_t.png');
    this.load.image('room3_activity5D', 'assets/Panels/RoomThree/R3P5d_t.png');
    this.load.image('room3_activity5E', 'assets/Panels/RoomThree/R3P5e_t.png');
    this.load.image('room3_activity6', 'assets/Panels/RoomThree/R3P6_t.png');
    this.load.image('room3_E_KeyImg', 'assets/E_Key.png');
    this.load.image('room3_wall_info_1', 'assets/wall_art.png');
    this.load.image('room3_wall_info_2', 'assets/wall_art.png');
    this.load.image('room3_wall_info_3', 'assets/wall_art.png');
    this.load.image('room3_wall_info_4', 'assets/wall_art.png');
    this.load.image('room3_wall_info_5', 'assets/wall_art.png');
    this.load.image('room3_wall_info_6', 'assets/wall_art.png');
    this.load.image('room3_floor', 'assets/Room3/floor_room3.jpg');
    this.load.image('room3_map', 'assets/map.png');
    this.load.image('room3_notebook', 'assets/notebook.png');
    this.load.image('room3_activityLocked', 'assets/activityLocked.png');
    this.load.image('room3_help_menu', 'assets/help_menu.png');
    this.load.image('room3_rightArrow', 'assets/rightArrowTest.png');
    this.load.image('room3_hole', 'assets/hole.png');

    this.load.image('room3_hole_activity', 'assets/Room3/activity_hole.png');
    this.load.image('profile', 'assets/character_south.png');
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
    this.room3_E_KeyImg = this.add.image(this.room3_character_north.x + 40, this.room3_character_north.y + 40, 'room3_E_KeyImg');
    this.room3_activity1 = this.add.image(768, 432, 'room3_activity1');
    //    this.room3_activity1B = this.add.image(768, 432, 'room3_activity1B');
    //    this.room3_activity1C = this.add.image(768, 432, 'room3_activity1C');
    //    this.room3_activity1D = this.add.image(768, 432, 'room3_activity1D');
    this.room3_activity2A = this.add.image(768, 432, 'room3_activity2A');
    this.room3_activity2B = this.add.image(768, 432, 'room3_activity2B');
    this.room3_activity2C = this.add.image(768, 432, 'room3_activity2C');
    this.room3_activity2D = this.add.image(768, 432, 'room3_activity2D');
    this.room3_activity2E = this.add.image(768, 432, 'room3_activity2E');
    this.room3_activity3A = this.add.image(768, 432, 'room3_activity3A');
    this.room3_activity3B = this.add.image(768, 432, 'room3_activity3B');
    this.room3_activity4A = this.add.image(768, 432, 'room3_activity4A');
    this.room3_activity4B = this.add.image(768, 432, 'room3_activity4B');
    this.room3_activity4C = this.add.image(768, 432, 'room3_activity4C');
    this.room3_activity4D = this.add.image(768, 432, 'room3_activity4D');
    this.room3_activity4E = this.add.image(768, 432, 'room3_activity4E');
    this.room3_activity5A = this.add.image(768, 432, 'room3_activity5A');
    this.room3_activity5B = this.add.image(768, 432, 'room3_activity5B');
    this.room3_activity5C = this.add.image(768, 432, 'room3_activity5C');
    this.room3_activity5D = this.add.image(768, 432, 'room3_activity5D');
    this.room3_activity5E = this.add.image(768, 432, 'room3_activity5E');
    this.room3_activity6 = this.add.image(768, 432, 'room3_activity6');
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
    this.room3_rightArrow = this.add.image(1000, 650, 'room3_rightArrow');
    this.room3_leftArrow = this.add.image(600, 650, 'room3_rightArrow');
    this.room3_hole = this.add.image(768, 432, 'room3_hole');
    this.room3_returnDoor = this.add.image(113, 385, 'returnDoor');

    // Seeing if I can reuse asset created in another room!!
    // But making my own image
    this.room3_activity_hole = this.add.image(350, 540, 'room3_hole_activity');
    this.profile = this.add.image(40, 150, 'profile');

  }

  /* setAlphas
   *
   * sets the alphas to to items in the game to zero so they are not visible at the beginning.
  */
  setAlphas() {
    this.room3_activity_hole.alpha = 0.0;
    this.room3_returnDoor.alpha = 1.0;
    this.room3_map.alpha = 0.0;
    this.room3_notebook.alpha = 0.0;
    this.room3_activityLocked.alpha = 0.0;
    this.room3_E_KeyImg.alpha = 0.0;
    this.room3_help_menu.alpha = 0.0;
    this.room3_leftArrow.alpha = 0;
    this.room3_rightArrow.alpha = 0;
    this.room3_hole.alpha = 0.0;
    this.hideActivities();
    this.profile.alpha = 0.0;
  }

  /* setDepths
   *
   * Sets the depth of each object on the screen.
  */
  setDepths() {
    this.room3_floor.setDepth(0);
    this.room3_returnDoor.setDepth(1);
    this.room3_activity_hole.setDepth(1);
    this.room3_character_north.setDepth(50);
    this.room3_character_east.setDepth(50);
    this.room3_character_south.setDepth(50);
    this.room3_character_west.setDepth(50);
    this.room3_E_KeyImg.setDepth(49);
    this.room3_activity1.setDepth(100);
    this.room3_activity2A.setDepth(100);
    this.room3_activity2B.setDepth(100);
    this.room3_activity2C.setDepth(100);
    this.room3_activity2D.setDepth(100);
    this.room3_activity2E.setDepth(100);
    this.room3_activity3A.setDepth(100);
    this.room3_activity3B.setDepth(100);
    this.room3_activity4A.setDepth(100);
    this.room3_activity4B.setDepth(100);
    this.room3_activity4C.setDepth(100);
    this.room3_activity4D.setDepth(100);
    this.room3_activity4E.setDepth(100);
    this.room3_activity5A.setDepth(100);
    this.room3_activity5B.setDepth(100);
    this.room3_activity5C.setDepth(100);
    this.room3_activity5D.setDepth(100);
    this.room3_activity5E.setDepth(100);
    this.room3_activity6.setDepth(100);
    this.room3_map.setDepth(100);
    this.room3_notebook.setDepth(100);
    this.room3_help_menu.setDepth(100);
    this.profile.setDepth(0);

  }

  /* setScales
   *
   * Scales the size of each object.
  */
  setScales() {
    this.room3_activity_hole.setScale(1.25);
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
    this.room3_leftArrow.setScale(.2);
    this.room3_rightArrow.setScale(.2);
    this.room3_returnDoor.setScale(1.5);

    this.room3_activity1.setScale(0.75);
    this.room3_activity2A.setScale(0.75);
    this.room3_activity2B.setScale(0.75);
    this.room3_activity2C.setScale(0.75);
    this.room3_activity2D.setScale(0.75);
    this.room3_activity2E.setScale(0.75);
    this.room3_activity3A.setScale(0.75);
    this.room3_activity3B.setScale(0.75);
    this.room3_activity4A.setScale(0.75);
    this.room3_activity4B.setScale(0.75);
    this.room3_activity4C.setScale(0.75);
    this.room3_activity4D.setScale(0.75);
    this.room3_activity4E.setScale(0.75);
    this.room3_activity5A.setScale(0.75);
    this.room3_activity5B.setScale(0.75);
    this.room3_activity5C.setScale(0.75);
    this.room3_activity5D.setScale(0.75);
    this.room3_activity5E.setScale(0.75);
    this.room3_activity6.setScale(0.75);
    this.profile.setScale(1.5);

  }

  /* setRotations
   *
   * Sets the rotation that each object sits at.
  */
  setRotations() {
    this.room3_wall_info_4.rotation = 3.14;
    this.room3_wall_info_5.rotation = 3.14;
    this.room3_wall_info_6.rotation = 3.14;
    this.room3_leftArrow.setRotation(3.14);
    this.room3_returnDoor.angle = 270;
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
    this.room3_top_left_info = new Phaser.Geom.Rectangle(175, 150, 240, 150);
    this.room3_graphics.fillRectShape(this.room3_top_left_info);
    //xpos ypos x  y
    this.room3_top_mid_info = new Phaser.Geom.Rectangle(650, 150, 240, 150);
    this.room3_graphics.fillRectShape(this.room3_top_mid_info);
    //xpos ypos x   y
    this.room3_top_right_info = new Phaser.Geom.Rectangle(1120, 150, 240, 150);
    this.room3_graphics.fillRectShape(this.room3_top_right_info);

    //BOTTOM ZONES

    this.room3_bot_left_info = new Phaser.Geom.Rectangle(175, 565, 240, 150);
    this.room3_graphics.fillRectShape(this.room3_bot_left_info);

    this.room3_bot_mid_info = new Phaser.Geom.Rectangle(650, 565, 240, 150);
    this.room3_graphics.fillRectShape(this.room3_bot_mid_info);

    this.room3_bot_right_info = new Phaser.Geom.Rectangle(1120, 565, 240, 150);
    this.room3_graphics.fillRectShape(this.room3_bot_right_info);


    // next room
    this.room3_hole_info = new Phaser.Geom.Rectangle(700, 350, 200, 200);
    this.room3_graphics.fillRectShape(this.room3_hole_info);

    // prev room
    this.room3_exitDoor = new Phaser.Geom.Rectangle(113, 320, 100, 100);
    this.room3_graphics.fillRectShape(this.room3_exitDoor);

    // activity room
    this.room3_acthole_zone = new Phaser.Geom.Rectangle(220, 450, 220, 150);
    this.room3_graphics.fillRectShape(this.room3_acthole_zone);
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
    this.room3_key_Right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    this.room3_key_Left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    this.room3_key_N = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);
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
      this.room3_E_KeyImg.y = this.room3_character_north.y - 75;
      this.room3_E_KeyImg.alpha = 1.0;

      if (this.room3_key_E.isDown) {
        if (roomProgress <= 3000)
          roomProgress = 3005;
        this.room3_activity1.alpha = 1.0;
        this.room3_characterMoveable = false;
        this.checkActivityOpened(true, false, false, false, false, false);
        this.room3_activity1Locked = false;
      }

    } else if (Phaser.Geom.Rectangle.ContainsPoint(this.room3_bot_left_info, this.room3_character_north)) {
      this.room3_E_KeyImg.x = this.room3_character_north.x;
      this.room3_E_KeyImg.y = this.room3_character_north.y + 75;
      this.room3_E_KeyImg.alpha = 1.0;
      if (this.room3_key_E.isDown && roomProgress >= 3005) {
        if (roomProgress <= 3010)
          roomProgress = 3010;
        this.room3_activity2A.alpha = 1.0;
        this.checkActivityOpened(false, true, false, false, false, false);
        this.room3_activity2Locked = false;
      } else if (this.room3_key_E.isDown && roomProgress < 3005) {
        this.room3_activityLocked.alpha = 1.0;
        this.room3_characterMoveable = false;
      }

    } else if (Phaser.Geom.Rectangle.ContainsPoint(this.room3_top_left_info, this.room3_character_north)) {
      this.room3_E_KeyImg.x = this.room3_character_north.x;
      this.room3_E_KeyImg.y = this.room3_character_north.y - 75;
      this.room3_E_KeyImg.alpha = 1.0;

      if (this.room3_key_E.isDown && roomProgress >= 3010) {
        if (roomProgress <= 3015)
          roomProgress = 3015;
        this.room3_activity3A.alpha = 1.0;
        this.checkActivityOpened(false, false, true, false, false, false);
        this.room3_activity3Locked = false;
      } else if (this.room3_key_E.isDown && roomProgress < 3010) {
        this.room3_activityLocked.alpha = 1.0;
        this.room3_characterMoveable = false;
      }

    } else if (Phaser.Geom.Rectangle.ContainsPoint(this.room3_bot_mid_info, this.room3_character_north)) {
      this.room3_E_KeyImg.x = this.room3_character_north.x;
      this.room3_E_KeyImg.y = this.room3_character_north.y + 75;
      this.room3_E_KeyImg.alpha = 1.0;
      if (this.room3_key_E.isDown && roomProgress >= 3015) {
        if (roomProgress <= 3020)
          roomProgress = 3020;
        this.room3_activity4A.alpha = 1.0;
        this.checkActivityOpened(false, false, false, true, false, false);
        this.room3_activity4Locked = false;
      } else if (this.room3_key_E.isDown && roomProgress < 3015) {
        this.room3_activityLocked.alpha = 1.0;
        this.room3_characterMoveable = false;
      }

    } else if (Phaser.Geom.Rectangle.ContainsPoint(this.room3_bot_right_info, this.room3_character_north)) {
      this.room3_E_KeyImg.x = this.room3_character_north.x;
      this.room3_E_KeyImg.y = this.room3_character_north.y + 75;
      this.room3_E_KeyImg.alpha = 1.0;
      if (this.room3_key_E.isDown && roomProgress >= 3020) {
        if (roomProgress <= 3025)
          roomProgress = 3025;
        this.room3_activity5A.alpha = 1.0;
        this.checkActivityOpened(false, false, false, false, true, false);
        this.room3_activity5Locked = false;
      } else if (this.room3_key_E.isDown && roomProgress < 3020) {
        this.room3_activityLocked.alpha = 1.0;
        this.room3_characterMoveable = false;
      }

    } else if (Phaser.Geom.Rectangle.ContainsPoint(this.room3_top_right_info, this.room3_character_north)) {
      this.room3_E_KeyImg.x = this.room3_character_north.x;
      this.room3_E_KeyImg.y = this.room3_character_north.y + 75;
      this.room3_E_KeyImg.alpha = 1.0;
      if (this.room3_key_E.isDown && roomProgress >= 3025) {
        if (roomProgress <= 3030)
          roomProgress = 3030;
        this.room3_unlocked = true;
        this.room3_activity6.alpha = 1.0;
        this.checkActivityOpened(false, false, false, false, false, true);
        this.room3_activity6Locked = false;
      } else if (this.room3_key_E.isDown && roomProgress < 3025) {
        this.room3_activityLocked.alpha = 1.0;
        this.room3_characterMoveable = false;
      }

    } else if (Phaser.Geom.Rectangle.ContainsPoint(this.room3_acthole_zone, this.room3_character_north)) {
      this.room3_E_KeyImg.x = this.room3_character_north.x;
      this.room3_E_KeyImg.y = this.room3_character_north.y + 75;
      this.room3_E_KeyImg.alpha = 1.0;
      if (this.room3_key_E.isDown && roomProgress >= 3030) {
        this.scene.start("AccountEqn_Act");
        //this.checkActivityOpened(false, false, false, true, false, false);
        //this.room3_activity5Locked = false;
      }
    } else if (Phaser.Geom.Rectangle.ContainsPoint(this.room3_hole_info, this.room3_character_north)) {
      if (roomProgress >= 3500) {
        this.room3_E_KeyImg.x = this.room3_character_north.x;
        this.room3_E_KeyImg.y = this.room3_character_north.y - 75;
        this.room3_E_KeyImg.alpha = 1.0;
        if (this.room3_key_E.isDown && roomProgress >= 3500) {
          this.scene.start("winners_Room");
        }
      }
    } else if (Phaser.Geom.Rectangle.ContainsPoint(this.room3_exitDoor, this.room3_character_north)) {
      //      this.displayE();
      this.room3_E_KeyImg.x = this.room3_character_north.x;
      this.room3_E_KeyImg.y = this.room3_character_north.y - 75;
      this.room3_E_KeyImg.alpha = 1.0;
      if (this.room3_key_E.isDown) {
        //          console.log("from room 3 to room 2")
        this.scene.start("Building_Blocks");
      }
    } else {
      this.hideActivities();
      this.room3_E_KeyImg.alpha = 0.0;
      this.checkActivityOpened(false, false, false, false, false, false);
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
    this.setCharacterAlpha(0, 0, 1, 0);

    //Character moves up
    if (this.room3_key_W.isDown && this.room3_characterMoveable == true) {
      if (this.room3_character_north.y > 185) {
        this.room3_character_north.y -= 5;
        this.room3_character_east.y -= 5;
        this.room3_character_south.y -= 5;
        this.room3_character_west.y -= 5;

        this.setCharacterAlpha(1, 0, 0, 0);


      }
      //Character moves left
    }
    if (this.room3_key_A.isDown && this.room3_characterMoveable == true) {
      if (this.room3_character_west.x > 210) {
        this.room3_character_west.x -= 5;
        this.room3_character_east.x -= 5;
        this.room3_character_south.x -= 5;
        this.room3_character_north.x -= 5;

        this.setCharacterAlpha(0, 0, 0, 1);
      }

    }
    //Character moves down
    if (this.room3_key_S.isDown && this.room3_characterMoveable == true) {
      if (this.room3_character_south.y < 680) {
        this.room3_character_south.y += 5;
        this.room3_character_east.y += 5;
        this.room3_character_north.y += 5;
        this.room3_character_west.y += 5;

        this.setCharacterAlpha(0, 0, 1, 0);
      }

    }
    //Character moves right
    if (this.room3_key_D.isDown && this.room3_characterMoveable == true) {
      if (this.room3_character_east.x < 1325) {
        this.room3_character_east.x += 5;
        this.room3_character_north.x += 5;
        this.room3_character_south.x += 5;
        this.room3_character_west.x += 5;

        this.setCharacterAlpha(0, 1, 0, 0);
      }
    }
  }

  /* movePaper
   *
   * makes the paper moveable in the test activity
  */
  movePaper(moveThisPaper) {
    if (this.room3_key_W.isDown && this.room3_paperMoveable == true) {
      room3_moveThisPaper.y -= 7;
    }
    if (this.room3_key_A.isDown && this.room3_paperMoveable == true) {
      room3_moveThisPaper.x -= 7;
    }
    if (this.room3_key_S.isDown && this.room3_paperMoveable == true) {
      room3_moveThisPaper.y += 7;
    }
    if (this.room3_key_D.isDown && this.room3_paperMoveable == true) {
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
    this.room3_leftArrow.setVisible(false);
    this.room3_rightArrow.setVisible(false);
  }


  hideInteractionBoxes() {

  }

  /* hideActivities
   *
   * Sets the alphas to the activities to 0 so that they are hidden.
  */
  hideActivities() {
    this.room3_activity1.alpha = 0.0;
    this.room3_activity2A.alpha = 0.0;
    this.room3_activity2B.alpha = 0.0;
    this.room3_activity2C.alpha = 0.0;
    this.room3_activity2D.alpha = 0.0;
    this.room3_activity2E.alpha = 0.0;
    this.room3_activity3A.alpha = 0.0;
    this.room3_activity3B.alpha = 0.0;
    this.room3_activity4A.alpha = 0.0;
    this.room3_activity4B.alpha = 0.0;
    this.room3_activity4C.alpha = 0.0;
    this.room3_activity4D.alpha = 0.0;
    this.room3_activity4E.alpha = 0.0;
    this.room3_activity5A.alpha = 0.0;
    this.room3_activity5B.alpha = 0.0;
    this.room3_activity5C.alpha = 0.0;
    this.room3_activity5D.alpha = 0.0;
    this.room3_activity5E.alpha = 0.0;
    this.room3_activity6.alpha = 0.0;
    this.room3_activityLocked.alpha = 0.0;
    this.room3_leftArrow.setVisible(false);
    this.room3_rightArrow.setVisible(false);


  }

  activityAlphas(room3_oneA, room3_oneB, room3_twoA, room3_twoB, room3_twoC, room3_twoD, room3_twoE, room3_threeA, room3_threeB, room3_fourA, room3_fourB, room3_fourC, room3_fourD, room3_fourE, room3_fiveA, room3_fiveB, room3_fiveC, room3_fiveD, room3_fiveE, room3_six) {
    this.room3_activity1.alpha = room3_oneA;
    //    this.room3_activity1B.alpha = room3_oneB;  //unused
    this.room3_activity2A.alpha = room3_twoA;
    this.room3_activity2B.alpha = room3_twoB;
    this.room3_activity2C.alpha = room3_twoC;
    this.room3_activity2D.alpha = room3_twoD;
    this.room3_activity2E.alpha = room3_twoE;
    this.room3_activity3A.alpha = room3_threeA;
    this.room3_activity3B.alpha = room3_threeB;
    this.room3_activity4A.alpha = room3_fourA;
    this.room3_activity4B.alpha = room3_fourB;
    this.room3_activity4C.alpha = room3_fourC;
    this.room3_activity4D.alpha = room3_fourD;
    this.room3_activity4E.alpha = room3_fourE;
    this.room3_activity5A.alpha = room3_fiveA;
    this.room3_activity5B.alpha = room3_fiveB;
    this.room3_activity5C.alpha = room3_fiveC;
    this.room3_activity5D.alpha = room3_fiveD;
    this.room3_activity5E.alpha = room3_fiveE;
    this.room3_activity6.alpha = room3_six;


  }

  resetArrows() {
    this.room3_rightArrow.alpha = 0;
    this.room3_rightArrow.setVisible(true);

    this.room3_leftArrow.alpha = 0;
    this.room3_leftArrow.setVisible(true);
  }

  loadArrows() {
    if (this.room3_rightArrowShown == true) {
      this.room3_rightArrow.alpha = 1;
    } else {
      this.room3_rightArrow.alpha = 0;
    }

    if (this.room3_leftArrowShown == true) {
      this.room3_leftArrow.alpha = 1;
    } else {
      this.room3_leftArrow.alpha = 0;
    }
  }

  /* checkNextPage
   *
   *
  */

  checkNextPage() {

    if (this.room3_activityOneOpened == true) {
      this.activityAlphas(1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    }

    if (this.room3_activityTwoOpened == true) {
      if (this.room3_activity2A.alpha == 1
          && Phaser.Input.Keyboard.JustDown(this.room3_key_Right)) {
        this.activityAlphas(0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
      } else if (this.room3_activity2A.alpha == 1) {
        this.activityAlphas(0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

      } else if (this.room3_activity2B.alpha == 1
          && Phaser.Input.Keyboard.JustDown(this.room3_key_Right)) {
        this.activityAlphas(0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
      } else if (this.room3_activity2B.alpha == 1
          && Phaser.Input.Keyboard.JustDown(this.room3_key_Left)) {
        this.activityAlphas(0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
      } else if (this.room3_activity2B.alpha == 1) {
        this.activityAlphas(0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

      } else if (this.room3_activity2C.alpha == 1
          && Phaser.Input.Keyboard.JustDown(this.room3_key_Right)) {
        this.activityAlphas(0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
      } else if (this.room3_activity2C.alpha == 1
          && Phaser.Input.Keyboard.JustDown(this.room3_key_Left)) {
        this.activityAlphas(0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
      } else if (this.room3_activity2C.alpha == 1) {
        this.activityAlphas(0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

      } else if (this.room3_activity2D.alpha == 1
          && Phaser.Input.Keyboard.JustDown(this.room3_key_Right)) {
        this.activityAlphas(0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
      } else if (this.room3_activity2D.alpha == 1
          && Phaser.Input.Keyboard.JustDown(this.room3_key_Left)) {
        this.activityAlphas(0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
      } else if (this.room3_activity2D.alpha == 1) {
        this.activityAlphas(0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

      } else if (this.room3_activity2E.alpha == 1
          && Phaser.Input.Keyboard.JustDown(this.room3_key_Left)) {
        this.activityAlphas(0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
      } else if (this.room3_activity2E.alpha == 1) {
        this.activityAlphas(0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
      }
    }

    if (this.room3_activityThreeOpened == true) {
      if (this.room3_activity3A.alpha == 1
          && Phaser.Input.Keyboard.JustDown(this.room3_key_Right)) {
        this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
      } else if (this.room3_activity3A.alpha == 1) {
        this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

      } else if (this.room3_activity3B.alpha == 1
          && Phaser.Input.Keyboard.JustDown(this.room3_key_Left)) {
        this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
      } else if (this.room3_activity3B.alpha == 1) {
        this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
      }
    }

    if (this.room3_activityFourOpened == true) {
      if (this.room3_activity4A.alpha == 1
          && Phaser.Input.Keyboard.JustDown(this.room3_key_Right)) {
        this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0);
      } else if (this.room3_activity4A.alpha == 1) {
        this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

      } else if (this.room3_activity4B.alpha == 1
          && Phaser.Input.Keyboard.JustDown(this.room3_key_Right)) {
        this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0);
      } else if (this.room3_activity4B.alpha == 1
          && Phaser.Input.Keyboard.JustDown(this.room3_key_Left)) {
        this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
      } else if (this.room3_activity4B.alpha == 1) {
        this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0);

      } else if (this.room3_activity4C.alpha == 1
          && Phaser.Input.Keyboard.JustDown(this.room3_key_Right)) {
        this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0);
      } else if (this.room3_activity4C.alpha == 1
          && Phaser.Input.Keyboard.JustDown(this.room3_key_Left)) {
        this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0);
      } else if (this.room3_activity4C.alpha == 1) {
        this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0);

      } else if (this.room3_activity4D.alpha == 1
          && Phaser.Input.Keyboard.JustDown(this.room3_key_Right)) {
        this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0);
      } else if (this.room3_activity4D.alpha == 1
          && Phaser.Input.Keyboard.JustDown(this.room3_key_Left)) {
        this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0);
      } else if (this.room3_activity4D.alpha == 1) {
        this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0);

      } else if (this.room3_activity4E.alpha == 1
          && Phaser.Input.Keyboard.JustDown(this.room3_key_Left)) {
        this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0);
      } else if (this.room3_activity4E.alpha == 1) {
        this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0);
      }
    }

    if (this.room3_activityFiveOpened == true) {
      if (this.room3_activity5A.alpha == 1
          && Phaser.Input.Keyboard.JustDown(this.room3_key_Right)) {
        this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0);
      } else if (this.room3_activity5A.alpha == 1) {
        this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0);

      } else if (this.room3_activity5B.alpha == 1
          && Phaser.Input.Keyboard.JustDown(this.room3_key_Right)) {
        this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0);
      } else if (this.room3_activity5B.alpha == 1
          && Phaser.Input.Keyboard.JustDown(this.room3_key_Left)) {
        this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0);
      } else if (this.room3_activity5B.alpha == 1) {
        this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0);

      } else if (this.room3_activity5C.alpha == 1
          && Phaser.Input.Keyboard.JustDown(this.room3_key_Right)) {
        this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0);
      } else if (this.room3_activity5C.alpha == 1
          && Phaser.Input.Keyboard.JustDown(this.room3_key_Left)) {
        this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0);
      } else if (this.room3_activity5C.alpha == 1) {
        this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0);

      } else if (this.room3_activity5D.alpha == 1
          && Phaser.Input.Keyboard.JustDown(this.room3_key_Right)) {
        this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0);
      } else if (this.room3_activity5D.alpha == 1
          && Phaser.Input.Keyboard.JustDown(this.room3_key_Left)) {
        this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0);
      } else if (this.room3_activity5D.alpha == 1) {
        this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0);

      } else if (this.room3_activity5E.alpha == 1
          && Phaser.Input.Keyboard.JustDown(this.room3_key_Left)) {
        this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0);
      } else if (this.room3_activity5E.alpha == 1) {
        this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0);
      }
    }

    if (this.room3_activitySixOpened == true) {
      this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1);
    }
  }

  displayProfile() {
    this.profile.alpha = 1.0;
    this.name = localStorage.getItem("playerName");
    if(this.name.length > 7) {
      this.name = this.name.slice(0,7) + "...";
    }
    this.userName = this.add.text(70,140, this.name, {
      font: "24px arial",
      color:'#FFFFFF',
      align:'left',
      fontweight: 'bold',
    });
  }

    /* helpMenu
     *
     * Sets the alpha of the help menu to 1 so that it is visible
    */
    helpMenu()
    {
      this.room3_help_menu.alpha = 1.0;
      this.room3_helpOpen = true;
    }
}
