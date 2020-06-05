class accountEqnAct extends Phaser.Scene {

  constructor() {
    super("AccountEqn_Act");
    //this.r3a1_quizActive = true;
    //this.r3a1_activatedQuiz = true;
    this.r3a1_unlocked = false;
    this.r3a1_paperMoveable = true;
    //this.r3a1_activityOneOpened = false;
    //this.r3a1_activityTwoOpened = false;
    //this.r3a1_activityThreeOpened = false;
    //this.r3a1_activityFourOpened = false;
    //this.r3a1_activityFiveOpened = false;
    //this.r3a1_activitySixOpened = false;
    this.r3a1_helpOpen = false;
    this.assetCorrect = false;
    this.revenueCorrect = false;
    this.r3a1_characterMoveable = true;
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

    //this.activateQuiz();
    this.roomLabel = this.add.text(600, 6, "Accounting Equation Activity Room", {
      font: "24px arial",
      color: "#FFFFFF",
      align: 'left',
      fontWeight: 'bold',
    });
    this.instructionsLabel = this.add.text(400, 200, "Drag the receipt to increase or decrease the 2 correct equation components", {
      font: "24px arial",
      color: "#000000",
      align: 'left',
      fontWeight: 'bold',
    });
  }

  update(delta) {
    //TEMPORARY FOR TESTING
    //vvvvvvvvvvvvvvvvvvv//
    if (this.r3a1_key_H.isDown) {
      this.helpMenu();
    }
    document.getElementById("background").volume = 0.2;

/*
    if (this.r3a1_activityOneOpened) {
      this.checkNextPage();
    }
    if (this.r3a1_activityTwoOpened) {
      this.checkNextPage();
    }
    if (this.r3a1_activityThreeOpened) {
      this.checkNextPage();
    }
    if (this.r3a1_activityFourOpened) {
      this.checkNextPage();
    }
    if (this.r3a1_activityFiveOpened) {
      this.checkNextPage();
    }
*/

        if (Phaser.Input.Keyboard.JustDown(this.r3a1_key_M)) {
            if (this.r3a1_map.alpha == 0.0) {
                this.r3a1_map.alpha = 1.0;
                this.characterMoveable = false;
                this.character.alpha = 0.0;
            }
            else {
                this.quitInteraction();
            }
        }

        if (Phaser.Input.Keyboard.JustDown(this.r3a1_key_B)) {
            if (this.notebook.alpha == 0.0) {
                this.notebook.alpha = 1.0;
                this.characterMoveable = false;
                this.character.alpha = 0.0;
            }
            else {
                this.quitInteraction();
            }
        }


    //if (this.r3a1_key_Q.isDown && this.r3a1_activatedQuiz == true) {
      //this.quitInteraction();
    //}

    //if (this.r3a1_quizActive == true && this.r3a1_activatedQuiz == false && this.r3a1_key_E.isDown) {
      //this.activateQuiz();
      //this.r3a1_activatedQuiz = true;
    //}

    //if (this.r3a1_quizActive == true && this.r3a1_key_Q.isDown && this.r3a1_activatedQuiz == true) {
    if (Phaser.Input.Keyboard.JustDown(this.r3a1_key_Q)) {
      this.quitInteraction();
      //this.quitQuiz();
      //this.r3a1_activatedQuiz = false;
    }

    //if (this.r3a1_activatedQuiz == false) {
        this.movePlayer();
        this.checkInteractValidity();
     // }
    //if (this.r3a1_activatedQuiz == false) {
      //this.r3a1_characterMoveable = true;
    //}

    if(this.assetCorrect == true && this.revenueCorrect == true && roomProgress < 3500) {
      if (roomProgress < 3500) { roomProgress = 3500; }
      this.character.alpha = 0.0;
      this.r3a1_char_north.alpha = 0.0;
      this.r3a1_char_south.alpha = 1.0;
      this.r3a1_char_west.alpha = 0.0;
      this.r3a1_char_east.alpha = 0.0;
      //this.r3a1_hole.alpha = true;
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
    this.load.image('r3a1_one_lesson_BG', 'assets/one_lesson_BG.png');
    this.load.image('character', 'assets/Panels/RoomThree/activityOneCharacter.png');
    this.load.image('r3a1_E_KeyImg', 'assets/E_Key.png');
    this.load.image('r3a1_floor', 'assets/Room3Act1/floor_two_activity_2.jpg');
    this.load.image('r3a1_map', 'assets/map.png');
    this.load.image('r3a1_notebook', 'assets/notebook.png');
    this.load.image('r3a1_activityLocked', 'assets/activityLocked.png');
    this.load.image('r3a1_help_menu', 'assets/help_menu.png');
    this.load.image('r3a1_Activity', 'assets/Room3Act1/equation.png');
    this.load.image('r3a1_redX', 'assets/Room3Act1/redX.jpg');
    this.load.image('r3a1_greenCheck', 'assets/Room3Act1/green_check.jpg');
    //this.load.image('r3a1_hole', 'assets/hole.png');

  }

  /* createImages
   *
   * Adds the image to the game board
  */
  createImages() {
    this.r3a1_e_pressed = false;
    this.r3a1_papers_moved = false;
    this.r3a1_background = this.add.image(768, 432, 'r3a1_one_lesson_BG');
    this.character = this.add.image(768, 432, 'character');
    this.r3a1_E_KeyImg = this.add.image(this.character.x+40, this.character.y+40, 'r3a1_E_KeyImg');
    //this.r3a1_activity1A = this.add.image(768, 432, 'r3a1_activity1A');
    //this.r3a1_activity1B = this.add.image(768, 432, 'r3a1_activity1B');
    //this.r3a1_activity1C = this.add.image(768, 432, 'r3a1_activity1C');
    //this.r3a1_activity1D = this.add.image(768, 432, 'r3a1_activity1D');
    //this.r3a1_activity2A = this.add.image(768, 432, 'r3a1_activity2A');
    //this.r3a1_activity2B = this.add.image(768, 432, 'r3a1_activity2B');
    //this.r3a1_activity2C = this.add.image(768, 432, 'r3a1_activity2C');
    //this.r3a1_activity2D = this.add.image(768, 432, 'r3a1_activity2D');
    //this.r3a1_activity3A = this.add.image(768, 432, 'r3a1_activity3A');
    //this.r3a1_activity3B = this.add.image(768, 432, 'r3a1_activity3B');
    //this.r3a1_activity4A = this.add.image(768, 432, 'r3a1_activity4A');
    //this.r3a1_activity4B = this.add.image(768, 432, 'r3a1_activity4B');
    //this.r3a1_activity4C = this.add.image(768, 432, 'r3a1_activity4C');
    //this.r3a1_activity4D = this.add.image(768, 432, 'r3a1_activity4D');
    //this.r3a1_activity4E = this.add.image(768, 432, 'r3a1_activity4E');
    //this.r3a1_activity5A = this.add.image(768, 432, 'r3a1_activity5A');
    //this.r3a1_activity5B = this.add.image(768, 432, 'r3a1_activity5B');
    //this.r3a1_activity5C = this.add.image(768, 432, 'r3a1_activity5C');
    this.r3a1_floor = this.add.image(769, 433, 'r3a1_floor');
    this.r3a1_map = this.add.image(768, 432, 'r3a1_map');
    this.r3a1_notebook = this.add.image(768, 432, 'r3a1_notebook');
    this.r3a1_activityLocked = this.add.image(768, 432, 'r3a1_activityLocked');
    this.r3a1_help_menu = this.add.image(768, 432, 'r3a1_help_menu');
    //this.r3a1_hole = this.add.image(1300, 432, 'r3a1_hole');
    this.r3a1_Activity = this.add.image(768, 432, 'r3a1_Activity');
    this.r3a1_redX = this.add.image(768, 432, 'r3a1_redX');
    this.r3a1_greenCheck = this.add.image(768, 432, 'r3a1_greenCheck');

    // trying to reuse asset!
    this.r3a1_exitDoor = this.add.image(113, 385, 'returnDoor');
    this.r3a1_char_north = this.add.image(768, 432, 'room3_character_north');
    this.r3a1_char_south = this.add.image(768, 432, 'room3_character_south');
    this.r3a1_char_west = this.add.image(768, 432, 'room3_character_west');
    this.r3a1_char_east = this.add.image(768, 432, 'room3_character_east');
  }

  /* setAlphas
   *
   * sets the alphas to to items in the game to zero so they are not visible at the beginning.
  */
  setAlphas() {
    this.r3a1_exitDoor.alpha = 1.0;
    this.character.alpha = 1.0;
    this.r3a1_char_north.alpha = 0.0;
    this.r3a1_char_south.alpha = 0.0;
    this.r3a1_char_west.alpha = 0.0;
    this.r3a1_char_east.alpha = 0.0;
    this.r3a1_map.alpha = 0.0;
    this.r3a1_notebook.alpha = 0.0;
    this.r3a1_activityLocked.alpha = 0.0;
    this.r3a1_E_KeyImg.alpha = 0.0;
    this.r3a1_help_menu.alpha = 0.0;
    this.r3a1_redX.alpha = 0.0;
    this.r3a1_greenCheck.alpha = 0.0;
    //this.r3a1_hole.alpha = 0.0;
    this.hideActivities();
  }

  /* setDepths
   *
   * Sets the depth of each object on the screen.
  */
  setDepths() {
    this.r3a1_char_north.setDepth(50);
    this.r3a1_char_south.setDepth(50);
    this.r3a1_char_west.setDepth(50);
    this.r3a1_char_east.setDepth(50);
    this.r3a1_floor.setDepth(0);
    this.r3a1_exitDoor.setDepth(1);
    //this.r3a1_hole.setDepth(1);
    this.r3a1_Activity.setDepth(1);
    this.character.setDepth(50);
    this.r3a1_E_KeyImg.setDepth(49);
    this.r3a1_map.setDepth(100);
    this.r3a1_notebook.setDepth(100);
    this.r3a1_help_menu.setDepth(100);
    this.r3a1_redX.setDepth(49);
    this.r3a1_greenCheck.setDepth(49);
  }

  /* setScales
   *
   * Scales the size of each object.
  */
  setScales() {
    this.r3a1_char_north.setScale(3);
    this.r3a1_char_south.setScale(3);
    this.r3a1_char_west.setScale(3);
    this.r3a1_char_east.setScale(3);
    this.r3a1_exitDoor.setScale(1.5);
    this.r3a1_E_KeyImg.setScale(0.4);
    this.r3a1_notebook.setScale(0.75);
    this.r3a1_map.setScale(0.75);
    this.character.setScale(1);
    this.r3a1_floor.scaleY = 1.185;
    this.r3a1_floor.scaleX = 1.395;

  }

  /* setRotations
   *
   * Sets the rotation that each object sits at.
  */
  setRotations() {
    this.r3a1_exitDoor.angle = 270;
   }

  /* createInteractionZones
   *
   * Sets the area that you can interact with each object
  */
  createInteractionZones() {
    this.r3a1_graphics = this.add.graphics({fillStyle: {color: 0xFFFFFF, alpha: 0.0}});
    //this.graphicsTest = this.add.graphics({fillStyle: {color: 0x4F4F4F, alpha: 1.0}});
    //TOP ZONES
                                                //xpos ypos x   y
    this.r3a1_increaseAssets = new Phaser.Geom.Rectangle(425,300,100,100);
    this.r3a1_graphics.fillRectShape(this.r3a1_increaseAssets);

    this.r3a1_decreaseAssets = new Phaser.Geom.Rectangle(425,500,100,100);
    this.r3a1_graphics.fillRectShape(this.r3a1_decreaseAssets);

    this.r3a1_increaseLiabilities = new Phaser.Geom.Rectangle(525,300,100,100);
    this.r3a1_graphics.fillRectShape(this.r3a1_increaseLiabilities);

    this.r3a1_decreaseLiabilities = new Phaser.Geom.Rectangle(525,500,100,100);
    this.r3a1_graphics.fillRectShape(this.r3a1_decreaseLiabilities);

    this.r3a1_increaseStock = new Phaser.Geom.Rectangle(625,300,100,100);
    this.r3a1_graphics.fillRectShape(this.r3a1_increaseStock);

    this.r3a1_decreaseStock = new Phaser.Geom.Rectangle(625,500,100,100);
    this.r3a1_graphics.fillRectShape(this.r3a1_decreaseStock);

    this.r3a1_increaseRevenue = new Phaser.Geom.Rectangle(725,300,100,100);
    this.r3a1_graphics.fillRectShape(this.r3a1_increaseRevenue);

    this.r3a1_decreaseRevenue = new Phaser.Geom.Rectangle(725,500,100,100);
    this.r3a1_graphics.fillRectShape(this.r3a1_decreaseRevenue);

    this.r3a1_increaseExpenses = new Phaser.Geom.Rectangle(825,300,100,100);
    this.r3a1_graphics.fillRectShape(this.r3a1_increaseExpenses);

    this.r3a1_decreaseExpenses = new Phaser.Geom.Rectangle(825,500,100,100);
    this.r3a1_graphics.fillRectShape(this.r3a1_decreaseExpenses);

    this.r3a1_increaseDividend = new Phaser.Geom.Rectangle(925,300,100,100);
    this.r3a1_graphics.fillRectShape(this.r3a1_increaseDividend);

    this.r3a1_decreaseDividend = new Phaser.Geom.Rectangle(925,500,100,100);
    this.r3a1_graphics.fillRectShape(this.r3a1_decreaseDividend);

    //this.r3a1_holeInteract = new Phaser.Geom.Rectangle(1300, 400, 100, 100);
    //this.r3a1_graphics.fillRectShape(this.r3a1_holeInteract);

    this.r3a1_exitDoor_zone = new Phaser.Geom.Rectangle(113,320,100,100);
    this.r3a1_graphics.fillRectShape(this.r3a1_exitDoor_zone);
  }

  /* assignKeybinds
   *
   * Sets keybinds to the keyboard
  */
  assignKeybinds() {
        //KEYBOARD INPUT
    this.r3a1_key_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.r3a1_key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.r3a1_key_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.r3a1_key_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.r3a1_key_E = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    this.r3a1_key_Q = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    this.r3a1_key_M = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
    this.r3a1_key_B = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
    this.r3a1_key_U = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.U);
    this.r3a1_key_1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
    this.r3a1_key_2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
    this.r3a1_key_3 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);
    this.r3a1_key_4 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR);
    this.r3a1_key_5 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FIVE);
    this.r3a1_key_R = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    this.r3a1_key_H = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);

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

  checkActivityOpened(r3a1_one, r3a1_two, r3a1_three, r3a1_four, r3a1_five, r3a1_six) {
    //this.r3a1_activityOneOpened = r3a1_one;
    //this.r3a1_activityTwoOpened = r3a1_two;
    //this.r3a1_activityThreeOpened = r3a1_three;
    //this.r3a1_activityFourOpened = r3a1_four;
    //this.r3a1_activityFiveOpened = r3a1_five;
    //this.r3a1_activitySixOpened = r3a1_six;

  }

  /* checkInteractValidity
   *
   * Checks to see if the character can interact with the object
  */

  checkInteractValidity() {

        if (roomProgress < 3500 && Phaser.Geom.Rectangle.ContainsPoint(this.r3a1_increaseAssets, this.character)) {
          this.r3a1_E_KeyImg.x = this.character.x;
          this.r3a1_E_KeyImg.y = this.character.y-75;
          this.r3a1_E_KeyImg.alpha = 1.0;
          if(this.r3a1_key_E.isDown) {
            document.getElementById("correct").play();
            this.r3a1_greenCheck.alpha = 1.0;
            this.assetCorrect = true;
          }
        }
        else if(roomProgress < 3500 && Phaser.Geom.Rectangle.ContainsPoint(this.r3a1_decreaseAssets, this.character)) {
          this.r3a1_E_KeyImg.x = this.character.x;
          this.r3a1_E_KeyImg.y = this.character.y-75;
          this.r3a1_E_KeyImg.alpha = 1.0;
          if(this.r3a1_key_E.isDown) {
            document.getElementById("wrong").play();
            this.r3a1_redX.alpha = 1.0;
          }

        }
        else if(roomProgress < 3500 && Phaser.Geom.Rectangle.ContainsPoint(this.r3a1_increaseRevenue, this.character)) {
          this.r3a1_E_KeyImg.x = this.character.x;
          this.r3a1_E_KeyImg.y = this.character.y-75;
          this.r3a1_E_KeyImg.alpha = 1.0;
          if(this.r3a1_key_E.isDown) {
            document.getElementById("correct").play();
            this.r3a1_greenCheck.alpha = 1.0;
            this.revenueCorrect = true;
            //this.setHoleAlpha();
          }
        }
        else if(roomProgress < 3500 && Phaser.Geom.Rectangle.ContainsPoint(this.r3a1_decreaseRevenue, this.character)) {
          this.r3a1_E_KeyImg.x = this.character.x;
          this.r3a1_E_KeyImg.y = this.character.y-75;
          this.r3a1_E_KeyImg.alpha = 1.0;
          if(this.r3a1_key_E.isDown) {
            document.getElementById("wrong").play();
            this.r3a1_redX.alpha = 1.0;
          }
        }
        else if(roomProgress < 3500 && Phaser.Geom.Rectangle.ContainsPoint(this.r3a1_increaseLiabilities, this.character)) {
          this.r3a1_E_KeyImg.x = this.character.x;
          this.r3a1_E_KeyImg.y = this.character.y-75;
          this.r3a1_E_KeyImg.alpha = 1.0;
          if(this.r3a1_key_E.isDown) {
            document.getElementById("wrong").play();
            this.r3a1_redX.alpha = 1.0;
          }
        }
        else if(roomProgress < 3500 && Phaser.Geom.Rectangle.ContainsPoint(this.r3a1_decreaseLiabilities, this.character)) {
          this.r3a1_E_KeyImg.x = this.character.x;
          this.r3a1_E_KeyImg.y = this.character.y-75;
          this.r3a1_E_KeyImg.alpha = 1.0;
          if(this.r3a1_key_E.isDown) {
            document.getElementById("wrong").play();
            this.r3a1_redX.alpha = 1.0;
          }
        }
        else if(roomProgress < 3500 && Phaser.Geom.Rectangle.ContainsPoint(this.r3a1_increaseStock, this.character)) {
          this.r3a1_E_KeyImg.x = this.character.x;
          this.r3a1_E_KeyImg.y = this.character.y-75;
          this.r3a1_E_KeyImg.alpha = 1.0;
          if(this.r3a1_key_E.isDown) {
            document.getElementById("wrong").play();
            this.r3a1_redX.alpha = 1.0;
          }
        }
        else if(roomProgress < 3500 && Phaser.Geom.Rectangle.ContainsPoint(this.r3a1_decreaseStock, this.character)) {
          this.r3a1_E_KeyImg.x = this.character.x;
          this.r3a1_E_KeyImg.y = this.character.y-75;
          this.r3a1_E_KeyImg.alpha = 1.0;
          if(this.r3a1_key_E.isDown) {
            document.getElementById("wrong").play();
            this.r3a1_redX.alpha = 1.0;
          }
        }
        else if(roomProgress < 3500 && Phaser.Geom.Rectangle.ContainsPoint(this.r3a1_increaseExpenses, this.character)) {
          this.r3a1_E_KeyImg.x = this.character.x;
          this.r3a1_E_KeyImg.y = this.character.y-75;
          this.r3a1_E_KeyImg.alpha = 1.0;
          if(this.r3a1_key_E.isDown) {
            document.getElementById("wrong").play();
            this.r3a1_redX.alpha = 1.0;
          }
        }
        else if(roomProgress < 3500 && Phaser.Geom.Rectangle.ContainsPoint(this.r3a1_decreaseExpenses, this.character)) {
          this.r3a1_E_KeyImg.x = this.character.x;
          this.r3a1_E_KeyImg.y = this.character.y-75;
          this.r3a1_E_KeyImg.alpha = 1.0;
          if(this.r3a1_key_E.isDown) {
            document.getElementById("wrong").play();
            this.r3a1_redX.alpha = 1.0;
          }
        }
        else if(roomProgress < 3500 && Phaser.Geom.Rectangle.ContainsPoint(this.r3a1_increaseDividend, this.character)) {
          this.r3a1_E_KeyImg.x = this.character.x;
          this.r3a1_E_KeyImg.y = this.character.y-75;
          this.r3a1_E_KeyImg.alpha = 1.0;
          if(this.r3a1_key_E.isDown) {
            document.getElementById("wrong").play();
            this.r3a1_redX.alpha = 1.0;
          }
        }
        else if(roomProgress < 3500 && Phaser.Geom.Rectangle.ContainsPoint(this.r3a1_decreaseDividend, this.character)) {
          this.r3a1_E_KeyImg.x = this.character.x;
          this.r3a1_E_KeyImg.y = this.character.y-75;
          this.r3a1_E_KeyImg.alpha = 1.0;
          if(this.r3a1_key_E.isDown) {
            document.getElementById("wrong").play();
            this.r3a1_redX.alpha = 1.0;
          }
        }
        else if(Phaser.Geom.Rectangle.ContainsPoint(this.r3a1_exitDoor_zone, this.character)) {
          this.r3a1_E_KeyImg.x = this.character.x;
          this.r3a1_E_KeyImg.y = this.character.y-75;
          this.r3a1_E_KeyImg.alpha = 1.0;

          if(this.r3a1_key_E.isDown) {
            this.scene.start("Account_Eqn");
          }
        }
        else {
          this.hideActivities();
          this.r3a1_E_KeyImg.alpha = 0;
        }

    if(this.assetCorrect == true && this.revenueCorrect == true && roomProgress < 3500) {
           if (roomProgress < 3500) { roomProgress = 3500; }
           this.character.alpha = 0.0;
           this.r3a1_char_north.alpha = 0.0;
           this.r3a1_char_south.alpha = 1.0;
           this.r3a1_char_west.alpha = 0.0;
           this.r3a1_char_east.alpha = 0.0;
        }
  }

  //setHoleAlpha() {
    //if(this.assetCorrect == true && this.revenueCorrect == true) {
      //this.r3a1_hole.alpha = true;
    //}
  //}

  /* movePlayer
   *
   *
  */
  movePlayer() {
    //setCharacterAlpha is in helper.js and arguments go N,E,S,W
    //Character moves up
    if(this.r3a1_key_W.isDown && this.r3a1_characterMoveable == true) {
       if(this.character.y > 185){
          this.r3a1_char_north.y -= 5;
          this.r3a1_char_south.y -= 5;
          this.r3a1_char_west.y -= 5;
          this.r3a1_char_east.y -= 5;
          this.character.y -= 5;
       }
       if (roomProgress < 3500) {
	this.character.alpha = 1.0;
        this.r3a1_char_north.alpha = 0.0;
        this.r3a1_char_south.alpha = 0.0;
        this.r3a1_char_west.alpha = 0.0;
        this.r3a1_char_east.alpha = 0.0;
       }
       else if (roomProgress >= 3500) {
	this.character.alpha = 0.0;
        this.r3a1_char_north.alpha = 1.0;
        this.r3a1_char_south.alpha = 0.0;
        this.r3a1_char_west.alpha = 0.0;
        this.r3a1_char_east.alpha = 0.0;
       }
    }

    //Character moves left
    if (this.r3a1_key_A.isDown && this.r3a1_characterMoveable == true) {
        if(this.character.x > 210){
          this.r3a1_char_north.x -= 5;
          this.r3a1_char_south.x -= 5;
         this.r3a1_char_west.x -= 5;
          this.r3a1_char_east.x -= 5;
          this.character.x -= 5;
          }
       if (roomProgress < 3500) {
	this.character.alpha = 1.0;
        this.r3a1_char_north.alpha = 0.0;
        this.r3a1_char_south.alpha = 0.0;
        this.r3a1_char_west.alpha = 0.0;
        this.r3a1_char_east.alpha = 0.0;
       }
       else if (roomProgress >= 3500) {
	this.character.alpha = 0.0;
        this.r3a1_char_north.alpha = 0.0;
        this.r3a1_char_south.alpha = 0.0;
        this.r3a1_char_west.alpha = 1.0;
        this.r3a1_char_east.alpha = 0.0;
       }
    }

    //Character moves down
     if (this.r3a1_key_S.isDown && this.r3a1_characterMoveable == true) {
        if(this.character.y < 680){
          this.r3a1_char_north.y += 5;
          this.r3a1_char_south.y += 5;
          this.r3a1_char_west.y += 5;
          this.r3a1_char_east.y += 5;
          this.character.y += 5;
        }
       if (roomProgress < 3500) {
	this.character.alpha = 1.0;
        this.r3a1_char_north.alpha = 0.0;
        this.r3a1_char_south.alpha = 0.0;
        this.r3a1_char_west.alpha = 0.0;
        this.r3a1_char_east.alpha = 0.0;
       }
       else if (roomProgress >= 3500) {
	this.character.alpha = 0.0;
        this.r3a1_char_north.alpha = 0.0;
        this.r3a1_char_south.alpha = 1.0;
        this.r3a1_char_west.alpha = 0.0;
        this.r3a1_char_east.alpha = 0.0;
       }
    }

    //Character moves right
    if (this.r3a1_key_D.isDown && this.r3a1_characterMoveable == true) {
        if(this.character.x < 1325){
          this.r3a1_char_north.x += 5;
          this.r3a1_char_south.x += 5;
          this.r3a1_char_west.x += 5;
          this.r3a1_char_east.x += 5;
          this.character.x += 5;
        }
       if (roomProgress < 3500) {
	this.character.alpha = 1.0;
        this.r3a1_char_north.alpha = 0.0;
        this.r3a1_char_south.alpha = 0.0;
        this.r3a1_char_west.alpha = 0.0;
        this.r3a1_char_east.alpha = 0.0;
       }
       else if (roomProgress >= 3500) {
	this.character.alpha = 0.0;
        this.r3a1_char_north.alpha = 0.0;
        this.r3a1_char_south.alpha = 0.0;
        this.r3a1_char_west.alpha = 0.0;
        this.r3a1_char_east.alpha = 1.0;
       }
    }
  }

  /* movePaper
   *
   * makes the paper moveable in the test activity
  */
  movePaper(moveThisPaper) {
    if(this.r3a1_key_W.isDown && this.r3a1_paperMoveable == true) {
      r3a1_moveThisPaper.y -= 7;
    } if (this.r3a1_key_A.isDown && this.r3a1_paperMoveable == true) {
      r3a1_moveThisPaper.x -= 7;
    } if (this.r3a1_key_S.isDown && this.r3a1_paperMoveable == true) {
      r3a1_moveThisPaper.y += 7;
    } if (this.r3a1_key_D.isDown && this.r3a1_paperMoveable == true) {
      r3a1_moveThisPaper.x += 7;
    }
  }

  /* quitInteraction
   *
   * Sets the alphas to 0 so that the interaction is quit.
  */
  quitInteraction() {
    this.r3a1_map.alpha = 0.0;
    this.r3a1_notebook.alpha = 0.0;
    this.hideActivities();
    this.r3a1_activityLocked.alpha = 0.0;
    this.character.alpha = 1;
    this.r3a1_characterMoveable = true;
    //this.r3a1_activityOneOpened = false;
    //this.r3a1_activityTwoOpened = false;
    //this.r3a1_activityThreeOpened = false;
    //this.r3a1_activityFourOpened = false;
    //this.r3a1_activityFiveOpened = false;
    //this.r3a1_activitySixOpened = false;
    this.r3a1_help_menu.alpha = 0.0;
  this.r3a1_activatedQuiz = false;
  }


  hideInteractionBoxes() {

  }

  /* hideActivities
   *
   * Sets the alphas to the activities to 0 so that they are hidden.
  */
  hideActivities() {
    //this.r3a1_activity1A.alpha = 0.0;
    //this.r3a1_activity1B.alpha = 0.0;
    //this.r3a1_activity1C.alpha = 0.0;
    //this.r3a1_activity1D.alpha = 0.0;
    //this.r3a1_activity2A.alpha = 0.0;
    //this.r3a1_activity2B.alpha = 0.0;
    //this.r3a1_activity2C.alpha = 0.0;
    //this.r3a1_activity2D.alpha = 0.0;
    //this.r3a1_activity3A.alpha = 0.0;
    //this.r3a1_activity3B.alpha = 0.0;
    //this.r3a1_activity4A.alpha = 0.0;
    //this.r3a1_activity4B.alpha = 0.0;
    //this.r3a1_activity4C.alpha = 0.0;
    //this.r3a1_activity4D.alpha = 0.0;
    //this.r3a1_activity4E.alpha = 0.0;
    //this.r3a1_activity5A.alpha = 0.0;
    //this.r3a1_activity5B.alpha = 0.0;
    //this.r3a1_activity5C.alpha = 0.0;
    this.r3a1_redX.alpha = 0.0;
    this.r3a1_greenCheck.alpha = 0.0;


  }

  /* helpMenu
   *
   * Sets the alpha of the help menu to 1 so that it is visible
  */
  helpMenu() {
      this.r3a1_help_menu.alpha = 1.0;
      this.r3a1_helpOpen = true;
  }
}
