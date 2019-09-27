class accountEqnAct extends Phaser.Scene {

  constructor() {
    super("AccountEqn_Act");
    this.actOne_quizActive = false;
    this.actOne_activatedQuiz = false;
    this.actOne_unlocked = false;
    this.actOne_paperMoveable = false;
    this.actOne_activityOneOpened = false;
    this.actOne_activityTwoOpened = false;
    this.actOne_activityThreeOpened = false;
    this.actOne_activityFourOpened = false;
    this.actOne_activityFiveOpened = false;
    this.actOne_activitySixOpened = false;
    this.actOne_helpOpen = false;
    this.assetCorrect = false;
    this.revenueCorrect = false;
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
    if (this.actOne_key_H.isDown) {
      this.helpMenu();
    }

    if (this.actOne_activityOneOpened) {
      this.checkNextPage();
    }
    if (this.actOne_activityTwoOpened) {
      this.checkNextPage();
    }
    if (this.actOne_activityThreeOpened) {
      this.checkNextPage();
    }
    if (this.actOne_activityFourOpened) {
      this.checkNextPage();
    }
    if (this.actOne_activityFiveOpened) {
      this.checkNextPage();
    }


    if (this.actOne_key_U.isDown && this.actOne_unlocked == false) {
      actOne_activity1Locked = false;
      actOne_activity2Locked = false;
      actOne_activity3Locked = false;
      actOne_activity4Locked = false;
      actOne_activity5Locked = false;
      actOne_activity6Locked = false;
      actOne_activity6Complete = true;
      this.actOne_unlocked = true;
    }

    if (this.actOne_key_M.isDown) {
      this.actOne_map.alpha = 1.0;
      actOne_characterMoveable = false;
      this.character.alpha = 0;
    }

    if (this.actOne_key_B.isDown) {
      this.actOne_notebook.alpha = 1.0;
      actOne_characterMoveable = false;
      this.character.alpha = 0;
    }


    if (this.actOne_key_Q.isDown && this.actOne_activatedQuiz == false) {
      this.quitInteraction();
    }

    if (this.actOne_quizActive == true && this.actOne_activatedQuiz == false && this.actOne_key_E.isDown) {
      this.activateQuiz();
      this.actOne_activatedQuiz = true;
    }

    if (this.actOne_quizActive == true && this.actOne_key_Q.isDown && this.actOne_activatedQuiz == true) {
      this.quitQuiz();
      this.actOne_activatedQuiz = false;
    }

    if (this.actOne_activatedQuiz == false) {
        this.movePlayer();
        this.checkInteractValidity();
      }
    if (this.actOne_activatedQuiz == false) {
      this.actOne_characterMoveable = true;
    }

    if(this.assetCorrect == true && this.revenueCorrect == true) {
      this.actOne_hole.alpha = true;
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
    this.load.image('actOne_one_lesson_BG', 'assets/one_lesson_BG.png');
    this.load.image('character', 'assets/Panels/RoomThree/activityOneCharacter.png');
    this.load.image('actOne_E_KeyImg', 'assets/E_Key.png');
    this.load.image('actOne_floor', 'assets/Room3Act1/floor_two_activity_2.jpg');
    this.load.image('actOne_map', 'assets/map.png');
    this.load.image('actOne_notebook', 'assets/notebook.png');
    this.load.image('actOne_activityLocked', 'assets/activityLocked.png');
    this.load.image('actOne_help_menu', 'assets/help_menu.png');
    this.load.image('actOne_Activity', 'assets/Room3Act1/equation.png');
    this.load.image('actOne_redX', 'assets/Room3Act1/redX.jpg');
    this.load.image('actOne_greenCheck', 'assets/Room3Act1/green_check.jpg');
    this.load.image('actOne_hole', 'assets/hole.png');

  }

  /* createImages
   *
   * Adds the image to the game board
  */
  createImages() {
    this.actOne_e_pressed = false;
    this.actOne_papers_moved = false;
    this.actOne_background = this.add.image(768, 432, 'actOne_one_lesson_BG');
    this.character = this.add.image(768, 432, 'character');
    this.actOne_E_KeyImg = this.add.image(this.character.x+40, this.character.y+40, 'actOne_E_KeyImg');
    this.actOne_activity1A = this.add.image(768, 432, 'actOne_activity1A');
    this.actOne_activity1B = this.add.image(768, 432, 'actOne_activity1B');
    this.actOne_activity1C = this.add.image(768, 432, 'actOne_activity1C');
    this.actOne_activity1D = this.add.image(768, 432, 'actOne_activity1D');
    this.actOne_activity2A = this.add.image(768, 432, 'actOne_activity2A');
    this.actOne_activity2B = this.add.image(768, 432, 'actOne_activity2B');
    this.actOne_activity2C = this.add.image(768, 432, 'actOne_activity2C');
    this.actOne_activity2D = this.add.image(768, 432, 'actOne_activity2D');
    this.actOne_activity3A = this.add.image(768, 432, 'actOne_activity3A');
    this.actOne_activity3B = this.add.image(768, 432, 'actOne_activity3B');
    this.actOne_activity4A = this.add.image(768, 432, 'actOne_activity4A');
    this.actOne_activity4B = this.add.image(768, 432, 'actOne_activity4B');
    this.actOne_activity4C = this.add.image(768, 432, 'actOne_activity4C');
    this.actOne_activity4D = this.add.image(768, 432, 'actOne_activity4D');
    this.actOne_activity4E = this.add.image(768, 432, 'actOne_activity4E');
    this.actOne_activity5A = this.add.image(768, 432, 'actOne_activity5A');
    this.actOne_activity5B = this.add.image(768, 432, 'actOne_activity5B');
    this.actOne_activity5C = this.add.image(768, 432, 'actOne_activity5C');
    this.actOne_floor = this.add.image(769, 433, 'actOne_floor');
    this.actOne_map = this.add.image(768, 432, 'actOne_map');
    this.actOne_notebook = this.add.image(768, 432, 'actOne_notebook');
    this.actOne_activityLocked = this.add.image(768, 432, 'actOne_activityLocked');
    this.actOne_help_menu = this.add.image(768, 432, 'actOne_help_menu');
    this.actOne_hole = this.add.image(1300, 432, 'actOne_hole');
    this.actOne_Activity = this.add.image(768, 432, 'actOne_Activity');
    this.actOne_redX = this.add.image(768, 432, 'actOne_redX');
    this.actOne_greenCheck = this.add.image(768, 432, 'actOne_greenCheck');
  }

  /* setAlphas
   *
   * sets the alphas to to items in the game to zero so they are not visible at the beginning.
  */
  setAlphas() {
    this.actOne_map.alpha = 0.0;
    this.actOne_notebook.alpha = 0.0;
    this.actOne_activityLocked.alpha = 0.0;
    this.actOne_E_KeyImg.alpha = 0.0;
    this.actOne_help_menu.alpha = 0.0;
    this.actOne_redX.alpha = 0.0;
    this.actOne_greenCheck.alpha = 0.0;
    this.actOne_hole.alpha = 0.0;
    this.hideActivities();
  }

  /* setDepths
   *
   * Sets the depth of each object on the screen.
  */
  setDepths() {
    this.actOne_floor.setDepth(0);
    this.actOne_hole.setDepth(1);
    this.actOne_Activity.setDepth(1);
    this.character.setDepth(50);
    this.actOne_E_KeyImg.setDepth(49);
    this.actOne_map.setDepth(100);
    this.actOne_notebook.setDepth(100);
    this.actOne_help_menu.setDepth(100);
    this.actOne_redX.setDepth(49);
    this.actOne_greenCheck.setDepth(49);
  }

  /* setScales
   *
   * Scales the size of each object.
  */
  setScales() {
    this.actOne_E_KeyImg.setScale(0.4);
    this.actOne_notebook.setScale(0.75);
    this.actOne_map.setScale(0.75);
    this.character.setScale(1);
    this.actOne_floor.scaleY = 1.185;
    this.actOne_floor.scaleX = 1.395;

  }

  /* setRotations
   *
   * Sets the rotation that each object sits at.
  */
  setRotations() {
   }

  /* createInteractionZones
   *
   * Sets the area that you can interact with each object
  */
  createInteractionZones() {
    this.actOne_graphics = this.add.graphics({fillStyle: {color: 0xFFFFFF, alpha: 0.0}});
    //this.graphicsTest = this.add.graphics({fillStyle: {color: 0x4F4F4F, alpha: 1.0}});
    //TOP ZONES
                                                //xpos ypos x   y
    this.actOne_increaseAssets = new Phaser.Geom.Rectangle(425,300,100,100);
    this.actOne_graphics.fillRectShape(this.actOne_increaseAssets);

    this.actOne_decreaseAssets = new Phaser.Geom.Rectangle(425,500,100,100);
    this.actOne_graphics.fillRectShape(this.actOne_decreaseAssets);

    this.actOne_increaseLiabilities = new Phaser.Geom.Rectangle(525,300,100,100);
    this.actOne_graphics.fillRectShape(this.actOne_increaseLiabilities);

    this.actOne_decreaseLiabilities = new Phaser.Geom.Rectangle(525,500,100,100);
    this.actOne_graphics.fillRectShape(this.actOne_decreaseLiabilities);

    this.actOne_increaseStock = new Phaser.Geom.Rectangle(625,300,100,100);
    this.actOne_graphics.fillRectShape(this.actOne_increaseStock);

    this.actOne_decreaseStock = new Phaser.Geom.Rectangle(625,500,100,100);
    this.actOne_graphics.fillRectShape(this.actOne_decreaseStock);

    this.actOne_increaseRevenue = new Phaser.Geom.Rectangle(725,300,100,100);
    this.actOne_graphics.fillRectShape(this.actOne_increaseRevenue);

    this.actOne_decreaseRevenue = new Phaser.Geom.Rectangle(725,500,100,100);
    this.actOne_graphics.fillRectShape(this.actOne_decreaseRevenue);

    this.actOne_increaseExpenses = new Phaser.Geom.Rectangle(825,300,100,100);
    this.actOne_graphics.fillRectShape(this.actOne_increaseExpenses);

    this.actOne_decreaseExpenses = new Phaser.Geom.Rectangle(825,500,100,100);
    this.actOne_graphics.fillRectShape(this.actOne_decreaseExpenses);

    this.actOne_increaseDividend = new Phaser.Geom.Rectangle(925,300,100,100);
    this.actOne_graphics.fillRectShape(this.actOne_increaseDividend);

    this.actOne_decreaseDividend = new Phaser.Geom.Rectangle(925,500,100,100);
    this.actOne_graphics.fillRectShape(this.actOne_decreaseDividend);

    this.actOne_holeInteract = new Phaser.Geom.Rectangle(1300, 400, 100, 100);
    this.actOne_graphics.fillRectShape(this.actOne_holeInteract);

  }

  /* assignKeybinds
   *
   * Sets keybinds to the keyboard
  */
  assignKeybinds() {
        //KEYBOARD INPUT
    this.actOne_key_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.actOne_key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.actOne_key_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.actOne_key_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.actOne_key_E = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    this.actOne_key_Q = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    this.actOne_key_M = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
    this.actOne_key_B = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
    this.actOne_key_U = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.U);
    this.actOne_key_1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
    this.actOne_key_2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
    this.actOne_key_3 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);
    this.actOne_key_4 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR);
    this.actOne_key_5 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FIVE);
    this.actOne_key_R = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    this.actOne_key_H = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);

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

  checkActivityOpened(actOne_one, actOne_two, actOne_three, actOne_four, actOne_five, actOne_six) {
    this.actOne_activityOneOpened = actOne_one;
    this.actOne_activityTwoOpened = actOne_two;
    this.actOne_activityThreeOpened = actOne_three;
    this.actOne_activityFourOpened = actOne_four;
    this.actOne_activityFiveOpened = actOne_five;
    this.actOne_activitySixOpened = actOne_six;

  }

  /* checkInteractValidity
   *
   * Checks to see if the character can interact with the object
  */

  checkInteractValidity() {

        if (Phaser.Geom.Rectangle.ContainsPoint(this.actOne_increaseAssets, this.character)) {
          this.actOne_E_KeyImg.x = this.character.x;
          this.actOne_E_KeyImg.y = this.character.y-75;
          this.actOne_E_KeyImg.alpha = 1.0;
          if(this.actOne_key_E.isDown) {
            this.actOne_greenCheck.alpha = 1.0;
            this.assetCorrect = true;
          }
        }
        else if(Phaser.Geom.Rectangle.ContainsPoint(this.actOne_decreaseAssets, this.character)) {
          this.actOne_E_KeyImg.x = this.character.x;
          this.actOne_E_KeyImg.y = this.character.y-75;
          this.actOne_E_KeyImg.alpha = 1.0;
          if(this.actOne_key_E.isDown) {
            this.actOne_redX.alpha = 1.0;
          }

        }
        else if(Phaser.Geom.Rectangle.ContainsPoint(this.actOne_increaseRevenue, this.character)) {
          this.actOne_E_KeyImg.x = this.character.x;
          this.actOne_E_KeyImg.y = this.character.y-75;
          this.actOne_E_KeyImg.alpha = 1.0;
          if(this.actOne_key_E.isDown) {
            this.actOne_greenCheck.alpha = 1.0;
            this.revenueCorrect = true;
            this.setHoleAlpha();
          }
        }
        else if(Phaser.Geom.Rectangle.ContainsPoint(this.actOne_decreaseRevenue, this.character)) {
          this.actOne_E_KeyImg.x = this.character.x;
          this.actOne_E_KeyImg.y = this.character.y-75;
          this.actOne_E_KeyImg.alpha = 1.0;
          if(this.actOne_key_E.isDown) {
            this.actOne_redX.alpha = 1.0;
          }
        }
        else if(Phaser.Geom.Rectangle.ContainsPoint(this.actOne_holeInteract, this.character)) {
          this.actOne_E_KeyImg.x = this.character.x;
          this.actOne_E_KeyImg.y = this.character.y-75;
          this.actOne_E_KeyImg.alpha = 1.0;

          if(this.actOne_key_E.isDown) {
	      roomProgress = 35;
            this.scene.start("Account_Eqn");
          }
        }
        else {
          this.hideActivities();
          this.actOne_E_KeyImg.alpha = 0;
        }
  }

  setHoleAlpha() {
    if(this.assetCorrect == true && this.revenueCorrect == true) {
      this.actOne_hole.alpha = true;
    }
  }

  /* movePlayer
   *
   *
  */
  movePlayer() {
    //setCharacterAlpha is in helper.js and arguments go N,E,S,W
    //Character moves up
    if(this.actOne_key_W.isDown && this.actOne_characterMoveable == true) {
  if(this.character.y > 185){
          this.character.y -= 5;
    }
    //Character moves left
  } if (this.actOne_key_A.isDown && this.actOne_characterMoveable == true) {
        if(this.character.x > 210){
          this.character.x -= 5;
          }

    }
    //Character moves down
     if (this.actOne_key_S.isDown && this.actOne_characterMoveable == true) {
  if(this.character.y < 680){
          this.character.y += 5;
    }

    }
    //Character moves right
    if (this.actOne_key_D.isDown && this.actOne_characterMoveable == true) {
        if(this.character.x < 1325){
          this.character.x += 5;
    }
    }
  }

  /* movePaper
   *
   * makes the paper moveable in the test activity
  */
  movePaper(moveThisPaper) {
    if(this.actOne_key_W.isDown && this.actOne_paperMoveable == true) {
      actOne_moveThisPaper.y -= 7;
    } if (this.actOne_key_A.isDown && this.actOne_paperMoveable == true) {
      actOne_moveThisPaper.x -= 7;
    } if (this.actOne_key_S.isDown && this.actOne_paperMoveable == true) {
      actOne_moveThisPaper.y += 7;
    } if (this.actOne_key_D.isDown && this.actOne_paperMoveable == true) {
      actOne_moveThisPaper.x += 7;
    }
  }

  /* quitInteraction
   *
   * Sets the alphas to 0 so that the interaction is quit.
  */
  quitInteraction() {
    this.actOne_map.alpha = 0.0;
    this.actOne_notebook.alpha = 0.0;
    this.hideActivities();
    this.actOne_activityLocked.alpha = 0.0;
    this.character.alpha = 1;
    this.actOne_characterMoveable = true;
    this.actOne_activityOneOpened = false;
    this.actOne_activityTwoOpened = false;
    this.actOne_activityThreeOpened = false;
    this.actOne_activityFourOpened = false;
    this.actOne_activityFiveOpened = false;
    this.actOne_activitySixOpened = false;
    this.actOne_help_menu.alpha = 0.0;
  this.actOne_activatedQuiz = false;
  }


  hideInteractionBoxes() {

  }

  /* hideActivities
   *
   * Sets the alphas to the activities to 0 so that they are hidden.
  */
  hideActivities() {
    this.actOne_activity1A.alpha = 0.0;
    this.actOne_activity1B.alpha = 0.0;
    this.actOne_activity1C.alpha = 0.0;
    this.actOne_activity1D.alpha = 0.0;
    this.actOne_activity2A.alpha = 0.0;
    this.actOne_activity2B.alpha = 0.0;
    this.actOne_activity2C.alpha = 0.0;
    this.actOne_activity2D.alpha = 0.0;
    this.actOne_activity3A.alpha = 0.0;
    this.actOne_activity3B.alpha = 0.0;
    this.actOne_activity4A.alpha = 0.0;
    this.actOne_activity4B.alpha = 0.0;
    this.actOne_activity4C.alpha = 0.0;
    this.actOne_activity4D.alpha = 0.0;
    this.actOne_activity4E.alpha = 0.0;
    this.actOne_activity5A.alpha = 0.0;
    this.actOne_activity5B.alpha = 0.0;
    this.actOne_activity5C.alpha = 0.0;
    this.actOne_redX.alpha = 0.0;
    this.actOne_greenCheck.alpha = 0.0;


  }

  /* helpMenu
   *
   * Sets the alpha of the help menu to 1 so that it is visible
  */
  helpMenu() {
      this.actOne_help_menu.alpha = 1.0;
      this.actOne_helpOpen = true;
  }
}
