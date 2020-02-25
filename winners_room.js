class winners_room extends Phaser.Scene {

  constructor() {
    super("winners_Room");
    this.winnerRoom_quizActive = false;
    this.winnerRoom_activatedQuiz = false;
    this.winnerRoom_unlocked = false;
    this.winnerRoom_paperMoveable = false;
    this.winnerRoom_activityOneOpened = false;
    this.winnerRoom_activityTwoOpened = false;
    this.winnerRoom_activityThreeOpened = false;
    this.winnerRoom_activityFourOpened = false;
    this.winnerRoom_activityFiveOpened = false;
    //this.winnerRoom_activitySixOpened = false;
    this.winnerRoom_activity1Locked = false;
    this.winnerRoom_activity2Locked = true;
    this.winnerRoom_activity3Locked = true;
    this.winnerRoom_activity4Locked = true;
    this.winnerRoom_activity5Locked = true;
    //this.winnerRoom_activity6Locked = true;
    this.winnerRoom_activity5Complete = false;
    this.winnerRoom_helpOpen = false;
    this.winnerRoom_counter = 0;
    this.musicToggle = false;   
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

    if (this.winnerRoom_key_U.isDown && this.winnerRoom_unlocked == false) {
      this.winnerRoom_activity1Locked = false;
      this.winnerRoom_activity2Locked = false;
      this.winnerRoom_activity3Locked = false;
      this.winnerRoom_activity4Locked = false;
      this.winnerRoom_activity5Locked = false;
      //this.winnerRoom_activity6Locked = false;
      this.winnerRoom_activity5Complete = true;
      this.winnerRoom_unlocked = true;
    }

    if (Phaser.Input.Keyboard.JustDown(this.winnerRoom_key_N)) {
        document.getElementById("background").play();
        if (this.musicToggle == false) {
            document.getElementById("background").play();
            this.musicToggle = true;
        }
        else if (this.musicToggle == true) {
            document.getElementById("background").pause();
            this.musicToggle = false;
        }
    }
          

    if (Phaser.Input.Keyboard.JustDown(this.winnerRoom_key_M)) {
        if (this.winnerRoom_map.alpha == 0.0) {
            this.winnerRoom_map.alpha = 1.0;
            this.characterMoveable = false;
            this.winnerRoom_character_north.alpha = 0.0;
            this.winnerRoom_character_east.alpha = 0.0;
            this.winnerRoom_character_south.alpha = 0.0;
            this.winnerRoom_character_west.alpha = 0.0;
        }
        else
            this.quitInteraction();
    }

    if (Phaser.Input.Keyboard.JustDown(this.winnerRoom_key_B)) {
        if (this.winnerRoom_notebook.alpha == 0.0) {
            this.winnerRoom_notebook.alpha = 1.0;
            this.winnerRoom_characterMoveable = false;
            this.winnerRoom_character_north.alpha = 0.0;
            this.winnerRoom_character_east.alpha = 0.0;
            this.winnerRoom_character_south.alpha = 0.0;
            this.winnerRoom_character_west.alpha = 0.0;
        }
        else
            this.quitInteraction();
    }

    if (Phaser.Input.Keyboard.JustDown(this.winnerRoom_key_H)) {
        if (this.winnerRoom_help_menu.alpha == 0.0) 
            this.helpMenu();
        else
            this.quitInteraction();
    }


    if (this.winnerRoom_key_Q.isDown && this.winnerRoom_activatedQuiz == false) {
      this.quitInteraction();
    }

    if (this.winnerRoom_quizActive == true && this.winnerRoom_activatedQuiz == false && this.winnerRoom_key_E.isDown) {
      this.activateQuiz();
      this.winnerRoom_activatedQuiz = true;
    }

    if (this.winnerRoom_quizActive == true && this.winnerRoom_key_Q.isDown && this.winnerRoom_activatedQuiz == true) {
      this.quitQuiz();
      this.winnerRoom_activatedQuiz = false;
    }

    if (this.winnerRoom_activatedQuiz == false) {
        this.movePlayer();
        this.checkInteractValidity();
      }
  if (this.winnerRoom_activatedQuiz == false)
    this.winnerRoom_characterMoveable = true;
    }


/***********************************************************************************************
======================================HELPER METHODS============================================
*///////////////////////////////////////////////////////////////////////////////////////////////
  /* loadAssests
   *
   * Loads images to be used and sets them into a variable name.
  */
  loadAssets() {
  this.load.image('winnerRoom_pressr', 'assets/pressr.png');
    this.load.image('winnerRoom_one_lesson_BG', 'assets/WinnersRoom/winners_room_bg.png');
    this.load.image('winnerRoom_character_north', 'assets/character_north.png');
    this.load.image('winnerRoom_character_east', 'assets/character_east.png');
    this.load.image('winnerRoom_character_south', 'assets/character_south.png');
    this.load.image('winnerRoom_character_west', 'assets/character_west.png');
    this.load.image('winnerRoom_redCharacter', 'assets/redCharacter.png');
    this.load.image('winnerRoom_activity1A', 'assets/Panels/RoomThree/PanelOneA.png');
    this.load.image('winnerRoom_activity1B', 'assets/Panels/RoomThree/PanelOneB.png');
    this.load.image('winnerRoom_activity1C', 'assets/Panels/RoomThree/PanelOneC.png');
    this.load.image('winnerRoom_activity1D', 'assets/Panels/RoomThree/PanelOneD.png');
    this.load.image('winnerRoom_activity2A', 'assets/Panels/RoomThree/PanelTwoA.png');
    this.load.image('winnerRoom_activity2B', 'assets/Panels/RoomThree/PanelTwoB.png');
    this.load.image('winnerRoom_activity2C', 'assets/Panels/RoomThree/PanelTwoC.png');
    this.load.image('winnerRoom_activity3A', 'assets/Panels/RoomThree/PanelThreeA.png');
    this.load.image('winnerRoom_activity3B', 'assets/Panels/RoomThree/PanelThreeB.png');
    this.load.image('winnerRoom_activity3C', 'assets/Panels/RoomThree/PanelThreeC.png');
    this.load.image('winnerRoom_activity3D', 'assets/Panels/RoomThree/PanelThreeD.png');
    this.load.image('winnerRoom_activity5A', 'assets/Panels/RoomThree/PanelFiveA.png');
    this.load.image('winnerRoom_activity5B', 'assets/Panels/RoomThree/PanelFiveB.png');
    this.load.image('winnerRoom_E_KeyImg', 'assets/E_Key.png');
    this.load.image('winnerRoom_wall_info_1', 'assets/wall_art.png');
    this.load.image('winnerRoom_wall_info_2', 'assets/wall_art.png');
    this.load.image('winnerRoom_wall_info_3', 'assets/wall_art.png');
    this.load.image('winnerRoom_wall_info_4', 'assets/wall_art.png');
    this.load.image('winnerRoom_wall_info_5', 'assets/wall_art.png');
    this.load.image('winnerRoom_wall_info_6', 'assets/wall_art.png');
    this.load.image('winnerRoom_floor', 'assets/WinnersRoom/winnerFloor.jpeg');
    this.load.image('winnerRoom_map', 'assets/featNotAvail.png');
    this.load.image('winnerRoom_notebook', 'assets/featNotAvail.png');
    this.load.image('winnerRoom_activityLocked', 'assets/activityLocked.png');
    this.load.image('winnerRoom_help_menu', 'assets/help_menu.png');
    this.load.image('winnerRoom_rightArrow' , 'assets/rightArrowTest.png');
    this.load.image('trophy', 'assets/WinnersRoom/trophy.jpg');

  }

  /* createImages
   *
   * Adds the image to the game board
  */
  createImages() {
    this.winnerRoom_e_pressed = false;
    this.winnerRoom_papers_moved = false;
    this.winnerRoom_background = this.add.image(768, 432, 'winnerRoom_one_lesson_BG');
    this.winnerRoom_character_north = this.add.image(768, 432, 'winnerRoom_character_north');
    this.winnerRoom_character_east = this.add.image(768, 432, 'winnerRoom_character_east');
    this.winnerRoom_character_south = this.add.image(768, 432, 'winnerRoom_character_south');
    this.winnerRoom_character_west = this.add.image(768, 432, 'winnerRoom_character_west');
    this.winnerRoom_E_KeyImg = this.add.image(this.winnerRoom_character_north.x+40, this.winnerRoom_character_north.y+40, 'winnerRoom_E_KeyImg');
    this.winnerRoom_activity1A = this.add.image(768, 432, 'winnerRoom_activity1A');
    this.winnerRoom_activity1B = this.add.image(768, 432, 'winnerRoom_activity1B');
    this.winnerRoom_activity1C = this.add.image(768, 432, 'winnerRoom_activity1C');
    this.winnerRoom_activity1D = this.add.image(768, 432, 'winnerRoom_activity1D');
    this.winnerRoom_activity2A = this.add.image(768, 432, 'winnerRoom_activity2A');
    this.winnerRoom_activity2B = this.add.image(768, 432, 'winnerRoom_activity2B');
    this.winnerRoom_activity2C = this.add.image(768, 432, 'winnerRoom_activity2C');
    this.winnerRoom_activity3A = this.add.image(768, 432, 'winnerRoom_activity3A');
    this.winnerRoom_activity3B = this.add.image(768, 432, 'winnerRoom_activity3B');
    this.winnerRoom_activity3C = this.add.image(768, 432, 'winnerRoom_activity3C');
    this.winnerRoom_activity3D = this.add.image(768, 432, 'winnerRoom_activity3D');
    this.winnerRoom_activity5A = this.add.image(768, 432, 'winnerRoom_activity5A');
    this.winnerRoom_activity5B = this.add.image(768, 432, 'winnerRoom_activity5B');
    this.winnerRoom_wall_info_1 = this.add.image(305, 75, 'winnerRoom_wall_info_1');
    this.winnerRoom_wall_info_2 = this.add.image(768, 75, 'winnerRoom_wall_info_2');
    this.winnerRoom_wall_info_3 = this.add.image(1232, 75, 'winnerRoom_wall_info_3');
    this.winnerRoom_wall_info_4 = this.add.image(305, 790, 'winnerRoom_wall_info_4');
    this.winnerRoom_wall_info_5 = this.add.image(768, 790, 'winnerRoom_wall_info_5');
    this.winnerRoom_wall_info_6 = this.add.image(1232, 790, 'winnerRoom_wall_info_6');
    this.winnerRoom_floor = this.add.image(769, 433, 'winnerRoom_floor');
    this.winnerRoom_map = this.add.image(768, 432, 'winnerRoom_map');
    this.winnerRoom_notebook = this.add.image(768, 432, 'winnerRoom_notebook');
    this.winnerRoom_activityLocked = this.add.image(768, 432, 'winnerRoom_activityLocked');
    this.winnerRoom_help_menu = this.add.image(768, 432, 'winnerRoom_help_menu');
    this.winnerRoom_rightArrow = this.add.image(1000, 650, 'winnerRoom_rightArrow');
    this.winnerRoom_leftArrow = this.add.image(600, 650, 'winnerRoom_rightArrow');
    this.trophy = this.add.image(450,450, 'trophy');
    this.trophy2 = this.add.image(1050,450,'trophy');

    this.winner_text = this.add.text(530, 80, "You won! Congrats")
    this.winner_text.setFontSize(50);
    this.winner_text.setStroke("Black",4);
  }

  /* setAlphas
   *
   * sets the alphas to to items in the game to zero so they are not visible at the beginning.
  */
  setAlphas() {
    this.winnerRoom_map.alpha = 0.0;
    this.winnerRoom_notebook.alpha = 0.0;
    this.winnerRoom_activityLocked.alpha = 0.0;
    this.winnerRoom_E_KeyImg.alpha = 0.0;
    this.winnerRoom_help_menu.alpha = 0.0;
    this.winnerRoom_leftArrow.alpha = 0;
    this.winnerRoom_rightArrow.alpha = 0;
    this.winnerRoom_wall_info_1.alpha = 0.0;
    this.winnerRoom_wall_info_2.alpha = 0.0;
    this.winnerRoom_wall_info_3.alpha = 0.0;
    this.winnerRoom_wall_info_4.alpha = 0.0;
    this.winnerRoom_wall_info_5.alpha = 0.0;
    this.winnerRoom_wall_info_6.alpha = 0.0;
    this.winnerRoom_activity1A.alpha = 0.0;
    this.trophy.alpha = 1.0;
    this.hideActivities();
  }

  /* setDepths
   *
   * Sets the depth of each object on the screen.
  */
  setDepths() {
    this.winnerRoom_floor.setDepth(0);
    this.winnerRoom_character_north.setDepth(50);
    this.winnerRoom_character_east.setDepth(50);
    this.winnerRoom_character_south.setDepth(50);
    this.winnerRoom_character_west.setDepth(50);
    this.winnerRoom_E_KeyImg.setDepth(49);
    this.winnerRoom_activity1A.setDepth(100);
    this.winnerRoom_activity1B.setDepth(100);
    this.winnerRoom_activity1C.setDepth(100);
    this.winnerRoom_activity1D.setDepth(100);
    this.winnerRoom_activity2A.setDepth(100);
    this.winnerRoom_activity2B.setDepth(100);
    this.winnerRoom_activity2C.setDepth(100);
    this.winnerRoom_activity3A.setDepth(100);
    this.winnerRoom_activity3B.setDepth(100);
    this.winnerRoom_activity3C.setDepth(100);
    this.winnerRoom_activity3D.setDepth(100);
    this.winnerRoom_activity5A.setDepth(100);
    this.winnerRoom_activity5B.setDepth(100);
    this.winnerRoom_map.setDepth(100);
    this.winnerRoom_notebook.setDepth(100);
    this.winnerRoom_help_menu.setDepth(100);
  }

  /* setScales
   *
   * Scales the size of each object.
  */
  setScales() {
    this.winnerRoom_E_KeyImg.setScale(0.4);
    this.winnerRoom_wall_info_1.setScale(0.75);
    this.winnerRoom_wall_info_2.setScale(0.75);
    this.winnerRoom_wall_info_3.setScale(0.75);
    this.winnerRoom_wall_info_4.setScale(0.75);
    this.winnerRoom_wall_info_5.setScale(0.75);
    this.winnerRoom_wall_info_6.setScale(0.75);
    this.winnerRoom_notebook.setScale(0.75);
    this.winnerRoom_map.setScale(0.75);
    this.winnerRoom_character_north.setScale(3);
    this.winnerRoom_character_south.setScale(3);
    this.winnerRoom_character_west.setScale(3);
    this.winnerRoom_character_east.setScale(3);
    this.winnerRoom_floor.scaleY = .98;
    this.winnerRoom_floor.scaleX = .99;
    this.winnerRoom_leftArrow.setScale(.2);
    this.winnerRoom_rightArrow.setScale(.2);

  }

  /* setRotations
   *
   * Sets the rotation that each object sits at.
  */
  setRotations() {
    this.winnerRoom_wall_info_4.rotation = 3.14;
    this.winnerRoom_wall_info_5.rotation = 3.14;
    this.winnerRoom_wall_info_6.rotation = 3.14;
    this.winnerRoom_leftArrow.setRotation(3.14);
   }

  /* createInteractionZones
   *
   * Sets the area that you can interact with each object
  */
  createInteractionZones() {
    this.winnerRoom_graphics = this.add.graphics({fillStyle: {color: 0xFFFFFF, alpha: 0.0}});
    //this.graphicsTest = this.add.graphics({fillStyle: {color: 0x4F4F4F, alpha: 1.0}});
    //TOP ZONES
                                                //xpos ypos x   y
    this.winnerRoom_top_left_info = new Phaser.Geom.Rectangle(175,150,240,150);
    this.winnerRoom_graphics.fillRectShape(this.winnerRoom_top_left_info);
                                                //xpos ypos x  y
    this.winnerRoom_top_mid_info = new Phaser.Geom.Rectangle(650,150,240,150);
    this.winnerRoom_graphics.fillRectShape(this.winnerRoom_top_mid_info);
                                                 //xpos ypos x   y
    this.winnerRoom_top_right_info = new Phaser.Geom.Rectangle(1120,150,240,150);
    this.winnerRoom_graphics.fillRectShape(this.winnerRoom_top_right_info);

    //BOTTOM ZONES

    this.winnerRoom_bot_left_info = new Phaser.Geom.Rectangle(175,565,240,150);
    this.winnerRoom_graphics.fillRectShape(this.winnerRoom_bot_left_info);

    this.winnerRoom_bot_mid_info = new Phaser.Geom.Rectangle(650,565,240,150);
    this.winnerRoom_graphics.fillRectShape(this.winnerRoom_bot_mid_info);

    this.winnerRoom_bot_right_info = new Phaser.Geom.Rectangle(1120,565,240,150);
    this.winnerRoom_graphics.fillRectShape(this.winnerRoom_bot_right_info);

  }

  /* assignKeybinds
   *
   * Sets keybinds to the keyboard
  */
  assignKeybinds() {
        //KEYBOARD INPUT
    this.winnerRoom_key_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.winnerRoom_key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.winnerRoom_key_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.winnerRoom_key_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.winnerRoom_key_E = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    this.winnerRoom_key_Q = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    this.winnerRoom_key_M = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
    this.winnerRoom_key_B = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
    this.winnerRoom_key_U = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.U);
    this.winnerRoom_key_1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
    this.winnerRoom_key_2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
    this.winnerRoom_key_3 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);
    this.winnerRoom_key_4 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR);
    this.winnerRoom_key_5 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FIVE);
    this.winnerRoom_key_6 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SIX);
    this.winnerRoom_key_R = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    this.winnerRoom_key_H = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);
    this.winnerRoom_key_N = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);
    this.winnerRoom_key_Right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    this.winnerRoom_key_Left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);

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

  checkActivityOpened(winnerRoom_one, winnerRoom_two, winnerRoom_three, winnerRoom_four, winnerRoom_five, winnerRoom_six) {
    this.winnerRoom_activityOneOpened = winnerRoom_one;
    this.winnerRoom_activityTwoOpened = winnerRoom_two;
    this.winnerRoom_activityThreeOpened = winnerRoom_three;
    this.winnerRoom_activityFourOpened = winnerRoom_four;
    this.winnerRoom_activityFiveOpened = winnerRoom_five;
    this.winnerRoom_activitySixOpened = winnerRoom_six;

  }

  /* checkInteractValidity
   *
   * Checks to see if the character can interact with the object
  */

  checkInteractValidity() {
    if (Phaser.Geom.Rectangle.ContainsPoint(this.winnerRoom_top_mid_info, this.winnerRoom_character_north)) {


    } else if (Phaser.Geom.Rectangle.ContainsPoint(this.winnerRoom_bot_left_info, this.winnerRoom_character_north)) {

    }
	else if (Phaser.Geom.Rectangle.ContainsPoint(this.winnerRoom_top_right_info, this.winnerRoom_character_north)) {


    }
    else {
    this.hideActivities();
    this.winnerRoom_E_KeyImg.alpha = 0.0;
    this.checkActivityOpened(false,false,false,false,false,false);
    }
  }


  /* setCharacterAlpha
   *
   * Sets the alpha of each facing of the character
   * Call this method with the argument as (N,E,S,W)
  */
  setCharacterAlpha() {
    this.winnerRoom_character_north.alpha = arguments[0];
    this.winnerRoom_character_east.alpha = arguments[1];
    this.winnerRoom_character_south.alpha = arguments[2];
    this.winnerRoom_character_west.alpha = arguments[3];
  }

  /* movePlayer
   *
   *
  */
  movePlayer() {
    //setCharacterAlpha is in helper.js and arguments go N,E,S,W
    this.setCharacterAlpha(0,0,1,0);

    //Character moves up
    if(this.winnerRoom_key_W.isDown && this.winnerRoom_characterMoveable == true) {
  if(this.winnerRoom_character_north.y > 185){
          this.winnerRoom_character_north.y -= 5;
          this.winnerRoom_character_east.y -= 5;
          this.winnerRoom_character_south.y -= 5;
          this.winnerRoom_character_west.y -= 5;

          this.setCharacterAlpha(1,0,0,0);



    }
    //Character moves left
  } if (this.winnerRoom_key_A.isDown && this.winnerRoom_characterMoveable == true) {
        if(this.winnerRoom_character_west.x > 210){
          this.winnerRoom_character_west.x -= 5;
          this.winnerRoom_character_east.x -= 5;
          this.winnerRoom_character_south.x -= 5;
          this.winnerRoom_character_north.x -= 5;

          this.setCharacterAlpha(0,0,0,1);
  }

    }
    //Character moves down
     if (this.winnerRoom_key_S.isDown && this.winnerRoom_characterMoveable == true) {
  if(this.winnerRoom_character_south.y < 680){
          this.winnerRoom_character_south.y += 5;
          this.winnerRoom_character_east.y += 5;
          this.winnerRoom_character_north.y += 5;
          this.winnerRoom_character_west.y += 5;

          this.setCharacterAlpha(0,0,1,0);
    }

    }
    //Character moves right
    if (this.winnerRoom_key_D.isDown && this.winnerRoom_characterMoveable == true) {
        if(this.winnerRoom_character_east.x < 1325){
          this.winnerRoom_character_east.x += 5;
          this.winnerRoom_character_north.x += 5;
          this.winnerRoom_character_south.x += 5;
          this.winnerRoom_character_west.x += 5;

          this.setCharacterAlpha(0,1,0,0);
    }
    }
  }

  /* movePaper
   *
   * makes the paper moveable in the test activity
  */
  movePaper(moveThisPaper) {
    if(this.winnerRoom_key_W.isDown && this.winnerRoom_paperMoveable == true) {
      winnerRoom_moveThisPaper.y -= 7;
    } if (this.winnerRoom_key_A.isDown && this.winnerRoom_paperMoveable == true) {
      winnerRoom_moveThisPaper.x -= 7;
    } if (this.winnerRoom_key_S.isDown && this.winnerRoom_paperMoveable == true) {
      winnerRoom_moveThisPaper.y += 7;
    } if (this.winnerRoom_key_D.isDown && this.winnerRoom_paperMoveable == true) {
      winnerRoom_moveThisPaper.x += 7;
    }
  }

  /* quitInteraction
   *
   * Sets the alphas to 0 so that the interaction is quit.
  */
  quitInteraction() {
    this.winnerRoom_map.alpha = 0.0;
    this.winnerRoom_notebook.alpha = 0.0;
    this.hideActivities();
    this.winnerRoom_activityLocked.alpha = 0.0;
    this.winnerRoom_character_north.alpha = 1.0;
    this.winnerRoom_character_east.alpha = 1.0;
    this.winnerRoom_character_south.alpha = 1.0;
    this.winnerRoom_character_west.alpha = 1.0;
    this.winnerRoom_characterMoveable = true;
    this.winnerRoom_activityOneOpened = false;
    this.winnerRoom_activityTwoOpened = false;
    this.winnerRoom_activityThreeOpened = false;
    this.winnerRoom_activityFourOpened = false;
    this.winnerRoom_activityFiveOpened = false;
    this.winnerRoom_activitySixOpened = false;
    this.winnerRoom_help_menu.alpha = 0.0;
  this.winnerRoom_activatedQuiz = false;
  this.winnerRoom_leftArrow.setVisible(false);
  this.winnerRoom_rightArrow.setVisible(false);
  }


  hideInteractionBoxes() {

  }

  /* hideActivities
   *
   * Sets the alphas to the activities to 0 so that they are hidden.
  */
  hideActivities() {
    this.winnerRoom_activity1A.alpha = 0.0;
    this.winnerRoom_activity1B.alpha = 0.0;
    this.winnerRoom_activity1C.alpha = 0.0;
    this.winnerRoom_activity1D.alpha = 0.0;
    this.winnerRoom_activity2A.alpha = 0.0;
    this.winnerRoom_activity2B.alpha = 0.0;
    this.winnerRoom_activity2C.alpha = 0.0;
    this.winnerRoom_activity3A.alpha = 0.0;
    this.winnerRoom_activity3B.alpha = 0.0;
    this.winnerRoom_activity3C.alpha = 0.0;
    this.winnerRoom_activity3D.alpha = 0.0;
    this.winnerRoom_activity5A.alpha = 0.0;
    this.winnerRoom_activity5B.alpha = 0.0;
    this.winnerRoom_activityLocked.alpha = 0.0;
    this.winnerRoom_leftArrow.setVisible(false);
    this.winnerRoom_rightArrow.setVisible(false);


  }

  activityAlphas(winnerRoom_oneA, winnerRoom_oneB, winnerRoom_oneC, winnerRoom_oneD, winnerRoom_twoA, winnerRoom_twoB, winnerRoom_twoC, winnerRoom_threeA, winnerRoom_threeB, winnerRoom_threeC, winnerRoom_threeD, winnerRoom_fiveA, winnerRoom_fiveB) {
    this.winnerRoom_activity1A.alpha = winnerRoom_oneA;
    this.winnerRoom_activity1B.alpha = winnerRoom_oneB;
    this.winnerRoom_activity1C.alpha = winnerRoom_oneC;
    this.winnerRoom_activity1D.alpha = winnerRoom_oneD;
    this.winnerRoom_activity2A.alpha = winnerRoom_twoA;
    this.winnerRoom_activity2B.alpha = winnerRoom_twoB;
    this.winnerRoom_activity2C.alpha = winnerRoom_twoC;
    this.winnerRoom_activity3A.alpha = winnerRoom_threeA;
    this.winnerRoom_activity3B.alpha = winnerRoom_threeB;
    this.winnerRoom_activity3C.alpha = winnerRoom_threeC;
    this.winnerRoom_activity3D.alpha = winnerRoom_threeD;
    this.winnerRoom_activity5A.alpha = winnerRoom_fiveA;
    this.winnerRoom_activity5B.alpha = winnerRoom_fiveB;

  }
  resetArrows() {
      this.winnerRoom_rightArrow.alpha = 0;
      this.winnerRoom_rightArrow.setVisible(true);

      this.winnerRoom_leftArrow.alpha = 0;
      this.winnerRoom_leftArrow.setVisible(true);
  }

  loadArrows() {
      if (this.winnerRoom_rightArrowShown == true) {
          this.winnerRoom_rightArrow.alpha = 1;
      }
      else {
          this.winnerRoom_rightArrow.alpha = 0;
      }

      if (this.winnerRoom_leftArrowShown == true) {
          this.winnerRoom_leftArrow.alpha = 1;
      }
      else {
          this.winnerRoom_leftArrow.alpha = 0;
      }
  }

  /* checkNextPage
   *
   *
  */

  checkNextPage() {

    if (this.winnerRoom_activityOneOpened == true && this.winnerRoom_activity1A.alpha == 1 && this.winnerRoom_key_Right.isDown && this.winnerRoom_counter > 15) {
        this.activityAlphas(0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        this.winnerRoom_rightArrowShown = true;
        this.winnerRoom_leftArrowShown = true;
        this.winnerRoom_counter = 0;
    } else if (this.winnerRoom_activityOneOpened == true && this.winnerRoom_activity1A.alpha == 1) {
        this.activityAlphas(1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        this.winnerRoom_rightArrowShown = true;
        this.winnerRoom_leftArrowShown = false;
    } else if(this.winnerRoom_activityOneOpened == true && this.winnerRoom_activity1B.alpha == 1 && this.winnerRoom_key_Right.isDown && this.winnerRoom_counter > 15) {
        this.activityAlphas(0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        this.winnerRoom_rightArrowShown = true;
        this.winnerRoom_leftArrowShown = true;
        this.winnerRoom_counter = 0;
    } else if(this.winnerRoom_activityOneOpened == true && this.winnerRoom_activity1B.alpha == 1 && this.winnerRoom_key_Left.isDown && this.winnerRoom_counter > 15) {
        this.activityAlphas(1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        this.winnerRoom_rightArrowShown = true;
        this.winnerRoom_leftArrowShown = false;
        this.winnerRoom_counter = 0;
    } else if(this.winnerRoom_activityOneOpened == true && this.winnerRoom_activity1C.alpha == 1 && this.winnerRoom_key_Right.isDown && this.winnerRoom_counter > 15) {
        this.activityAlphas(0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        this.winnerRoom_rightArrowShown = false;
        this.winnerRoom_leftArrowShown = true;
        this.winnerRoom_counter = 0;
    } else if(this.winnerRoom_activityOneOpened == true && this.winnerRoom_activity1C.alpha == 1 && this.winnerRoom_key_Left.isDown && this.winnerRoom_counter > 15) {
        this.activityAlphas(0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        this.winnerRoom_rightArrowShown = true;
        this.winnerRoom_leftArrowShown = true;
        this.winnerRoom_counter = 0;
    } else if(this.winnerRoom_activityOneOpened == true && this.winnerRoom_activity1D.alpha == 1 && this.winnerRoom_key_Left.isDown && this.winnerRoom_counter > 15) {
        this.activityAlphas(0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        this.winnerRoom_rightArrowShown = true;
        this.winnerRoom_leftArrowShown = true;
        this.winnerRoom_counter = 0;
    }
    if (this.winnerRoom_activityTwoOpened == true) {
        if (this.winnerRoom_activity2A.alpha == 1 && this.winnerRoom_key_Right.isDown && this.winnerRoom_counter > 15) {
            this.activityAlphas(0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0);
            this.winnerRoom_rightArrowShown = true;
            this.winnerRoom_leftArrowShown = true;
            this.winnerRoom_counter = 0;
        } else if (this.winnerRoom_activity2A.alpha == 1) {
            this.activityAlphas(0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0);
            this.winnerRoom_rightArrowShown = true;
            this.winnerRoom_leftArrowShown = false;
        } else if(this.winnerRoom_activity2B.alpha == 1 && this.winnerRoom_key_Right.isDown && this.winnerRoom_counter > 15) {
            this.activityAlphas(0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0);
            this.winnerRoom_rightArrowShown = false;
            this.winnerRoom_leftArrowShown = true;
            this.winnerRoom_counter = 0;
        } else if(this.winnerRoom_activity2B.alpha == 1 && this.winnerRoom_key_Left.isDown && this.winnerRoom_counter > 15) {
            this.activityAlphas(0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0);
            this.winnerRoom_rightArrowShown = true;
            this.winnerRoom_leftArrowShown = false;
            this.winnerRoom_counter = 0;

        } else if(this.winnerRoom_activity2C.alpha == 1 && this.winnerRoom_key_Left.isDown && this.winnerRoom_counter > 15) {
            this.activityAlphas(0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0);
            this.winnerRoom_rightArrowShown = false;
            this.winnerRoom_leftArrowShown = true;
            this.winnerRoom_counter = 0;
        }
      }
      if (this.winnerRoom_activityThreeOpened == true) {
          if (this.winnerRoom_activity3A.alpha == 1 && this.winnerRoom_key_Right.isDown && this.winnerRoom_counter > 15) {
              this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0);
              this.winnerRoom_rightArrowShown = true;
              this.winnerRoom_leftArrowShown = true;
              this.winnerRoom_counter = 0;
              console.log("aaaa");
          } else if (this.winnerRoom_activity3A.alpha == 1) {
              this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0);
              this.winnerRoom_rightArrowShown = true;
              this.winnerRoom_leftArrowShown = false;
          } else if (this.winnerRoom_activity3B.alpha == 1 && this.winnerRoom_key_Left.isDown && this.winnerRoom_counter > 15) {
              this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0);
              this.winnerRoom_rightArrowShown = true;
              this.winnerRoom_leftArrowShown = false;
              this.winnerRoom_counter = 0;
          } else if (this.winnerRoom_activity3B.alpha == 1 && this.winnerRoom_key_Right.isDown && this.winnerRoom_counter > 15) {
              this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0);
              this.winnerRoom_rightArrowShown = false;
              this.winnerRoom_leftArrowShown = true;
              this.winnerRoom_counter = 0;
          } else if (this.winnerRoom_activity3C.alpha == 1 && this.winnerRoom_key_Left.isDown && this.winnerRoom_counter > 15) {
              this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0);
              this.winnerRoom_rightArrowShown = true;
              this.winnerRoom_leftArrowShown = true;
              this.winnerRoom_counter = 0;
          }  else if (this.winnerRoom_activity3C.alpha == 1 && this.winnerRoom_key_Right.isDown && this.winnerRoom_counter > 15) {
              this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0);
              this.winnerRoom_rightArrowShown = false;
              this.winnerRoom_leftArrowShown = true;
              this.winnerRoom_counter = 0;
          } else if (this.winnerRoom_activity3D.alpha == 1 && this.winnerRoom_key_Left.isDown && this.winnerRoom_counter > 15) {
              this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0);
              this.winnerRoom_rightArrowShown = true;
              this.winnerRoom_leftArrowShown = true;
              this.winnerRoom_counter = 0;
          }


      }
      if (this.winnerRoom_activityFiveOpened == true) {
          if (this.winnerRoom_activity5A.alpha == 1 && this.winnerRoom_key_Right.isDown && this.winnerRoom_counter > 15) {
              this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1);
              this.winnerRoom_rightArrowShown = false;
              this.winnerRoom_leftArrowShown = true;
              this.winnerRoom_counter = 0;
          } else if (this.winnerRoom_activity5A.alpha == 1) {
              this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0);
              this.winnerRoom_rightArrowShown = true;
              this.winnerRoom_leftArrowShown = false;
          } else if(this.winnerRoom_activity5B.alpha == 1 && this.winnerRoom_key_Left.isDown && this.winnerRoom_counter > 15) {
              this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0);
              this.winnerRoom_rightArrowShown = true;
              this.winnerRoom_leftArrowShown = false;
              this.winnerRoom_counter = 0;
          }
        }
    this.winnerRoom_counter++;
    this.loadArrows();

  }

  /* helpMenu
   *
   * Sets the alpha of the help menu to 1 so that it is visible
  */
  helpMenu() {
      this.winnerRoom_help_menu.alpha = 1.0;
      this.winnerRoom_helpOpen = true;
  }
}
