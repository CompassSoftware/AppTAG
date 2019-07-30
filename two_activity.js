class two_activity extends Phaser.Scene {

  constructor() {
    super("two_Activity");
    this.room2a_quizActive = false;
    this.room2a_activatedQuiz = false;
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
        console.log("123")
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
    } 
    else if (this.room2a_activatedQuiz = true) {
        if (this.room2a_paperCount == 1) {
            this.movePaper(this.room2a_paper);
            this.checkCorrectPaperOne();
    } 
    else if (this.room2a_paperCount == 2) {
        this.movePaper(this.room2a_paperTwo);
        this.checkCorrectPaperTwo();
    } 
    else if (this.room2a_paperCount == 3) {
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
    this.load.image('room2a_E_KeyImg', 'assets/E_Key.png');
    this.load.image('room2a_wall_info_1', 'assets/wall_art.png');
    this.load.image('room2a_wall_info_2', 'assets/wall_art.png');
    this.load.image('room2a_wall_info_3', 'assets/wall_art.png');
    this.load.image('room2a_wall_info_4', 'assets/wall_art.png');
    this.load.image('room2a_wall_info_5', 'assets/wall_art.png');
    this.load.image('room2a_wall_info_6', 'assets/wall_art.png');
    this.load.image('room2a_floor', 'assets/floor_2.jpeg');
    this.load.image('room2a_map', 'assets/map.png');
    this.load.image('room2a_notebook', 'assets/notebook.png');
    this.load.image('room2a_activityLocked', 'assets/activityLocked.png');
    this.load.image('room2a_help_menu', 'assets/help_menu.png');
    this.load.image('room2a_hole', 'assets/hole.png');
    this.load.image('room2a_puzzle1', 'assets/Puzzle/BottomLeft.png');
    this.load.image('room2a_puzzle2', 'assets/Puzzle/BottomRightMiddle.png');
    this.load.image('room2a_puzzle3', 'assets/Puzzle/BottomRight.png');
    this.load.image('room2a_puzzle4', 'assets/Puzzle/MiddleRight.png');
    this.load.image('room2a_puzzle5', 'assets/Puzzle/MiddleRightMiddle.png');
    this.load.image('room2a_puzzle6', 'assets/Puzzle/TopLeft.png');
    this.load.image('room2a_puzzle7', 'assets/Puzzle/TopRightMiddle.png');
    this.load.image('room2a_puzzle8', 'assets/Puzzle/TopRight.png');



  }

  /* createImages
   *
   * Adds the image to the game board
  */
  createImages() {
    this.room2a_e_pressed = false;
    this.room2a_puzzle_moved = false;
    this.room2a_background = this.add.image(768, 432, 'room2a_one_lesson_BG');
    this.room2a_character_north = this.add.image(768, 432, 'room2a_character_north');
    this.room2a_character_east = this.add.image(768, 432, 'room2a_character_east');
    this.room2a_character_south = this.add.image(768, 432, 'room2a_character_south');
    this.room2a_character_west = this.add.image(768, 432, 'room2a_character_west');
    this.room2a_E_KeyImg = this.add.image(this.room2a_character_north.x+40, this.room2a_character_north.y+40, 'room2a_E_KeyImg');
    this.room2a_floor = this.add.image(769, 433, 'room2a_floor');
    this.room2a_map = this.add.image(768, 432, 'room2a_map');
    this.room2a_notebook = this.add.image(768, 432, 'room2a_notebook');
    this.room2a_activityLocked = this.add.image(768, 432, 'room2a_activityLocked');
    this.room2a_help_menu = this.add.image(768, 432, 'room2a_help_menu');
    this.room2a_back_hole = this.add.image(268, 632, 'room2a_hole');
    
    this.room2a_back_hole_text = this.add.text(168, 532, "Back to Room 2")
    this.room2a_back_hole_text.setFontSize(32);
    this.room2a_back_hole_text.setStroke("Black",4);
    
    this.room2a_puzzle1 = this.add.image(1168, 432, 'room2a_puzzle1');
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
    this.room2a_puzzle1.alpha = 1.0;
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
    this.room2a_notebook.setScale(0.75);
    this.room2a_map.setScale(0.75);
    this.room2a_puzzle1.setScale(0.5);
    this.room2a_character_north.setScale(3);
    this.room2a_character_south.setScale(3);
    this.room2a_character_west.setScale(3);
    this.room2a_character_east.setScale(3);
  }

  /* setRotations
   *
   * Sets the rotation that each object sits at.
  */
  setRotations() {
    this.room2a_puzzle1.angle = 90;
  //   this.room2a_cardboard_box_3.rotation = 0;
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
  
  /* createInteractionZones
   *
   * Sets the area that you can interact with each object
  */
  createInteractionZones() {
    this.room2a_graphics = this.add.graphics({fillStyle: {color: 0xFFFFFF, alpha: 0.0}});
    //this.graphicsTest = this.add.graphics({fillStyle: {color: 0x4F4F4F, alpha: 1.0}});
    //TOP ZONES
                                                //xpos ypos x   y
    this.room2a_back_hole_zone = new Phaser.Geom.Rectangle(150,532,150,150);
    this.room2a_graphics.fillRectShape(this.room2a_back_hole_zone);
    
    this.room2a_quiz_box = new Phaser.Geom.Rectangle(1068, 332,160,110);
    this.room2a_graphics.fillRectShape(this.room2a_quiz_box);
  }

  /* checkInteractValidity
   *
   * Checks to see if the character can interact with the object
  */

  checkInteractValidity() {
    if (Phaser.Geom.Rectangle.ContainsPoint(this.room2a_back_hole_zone, this.room2a_character_north)) {
		this.room2a_E_KeyImg.x = this.room2a_character_north.x;
		this.room2a_E_KeyImg.y = this.room2a_character_north.y+75;
		this.room2a_E_KeyImg.alpha = 1.0;
		if (this.room2a_key_E.isDown) {
			console.log("from activity 1 to room 2")
			this.scene.start("two_Lesson");
		} 
    }
    else if (Phaser.Geom.Rectangle.ContainsPoint(this.room2a_quiz_box, this.room2a_character_north)) {
		this.room2a_E_KeyImg.x = this.room2a_character_north.x;
		this.room2a_E_KeyImg.y = this.room2a_character_north.y+75;
		this.room2a_E_KeyImg.alpha = 1.0;
		if (this.room2a_key_E.isDown) {
            console.log("Activated Quiz")
			this.room2a_quizActive = true;
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
  }

  
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
  
  /* activateQuiz
     *
     * Method that starts the quiz
     */
  activateQuiz() {
        this.room2a_back_hole.setVisible(false);
        this.loadQuizImages();
       
        this.room2a_puzzle1.setInteractive();


        this.room2a_one_lesson_BG.alpha = 0.0;
        this.room2a_character_north.alpha = 0.0;
        this.room2a_character_east.alpha = 0.0;
        this.room2a_character_south.alpha = 0.0;
        this.room2a_character_west.alpha = 0.0;
        this.room2a_E_KeyImg.alpha = 0.0;

        this.room2a_floor.scaleX = 1.5;
        this.room2a_floor.scaleY = 2.0;

        this.box1_frame = new Phaser.Geom.Rectangle(this.cardboard_box_1.x, this.cardboard_box_1.y, 240,240);
        this.graphics.fillRectShape(this.box1_frame);


        this.box2_frame = new Phaser.Geom.Rectangle(this.cardboard_box_2.x,this.cardboard_box_2.y,240,200);
        this.graphics.fillRectShape(this.box2_frame);

        this.box3_frame = new Phaser.Geom.Rectangle(this.cardboard_box_3.x,this.cardboard_box_3.y,240,200);
        this.graphics.fillRectShape(this.box3_frame);
    }
    
     /* loadQuizImages
     *
     * Loads the images into the quiz Activity
     */
    loadQuizImages(){
    
    this.room2a_puzzle1.setVisible(false);

    this.room2a_puzzle2 = this.add.image(768, 432, 'room2a_puzzle2');
    this.room2a_puzzle2.setVisible(false);
    
    this.room2a_puzzle3 = this.add.image(768, 432, 'room2a_puzzle3');
    this.room2a_puzzle3.setVisible(false);
    
    this.room2a_puzzle4 = this.add.image(768, 432, 'room2a_puzzle4');
    this.room2a_puzzle4.setVisible(false);
    
    this.room2a_puzzle5 = this.add.image(768, 432, 'room2a_puzzle5');
    this.room2a_puzzle5.setVisible(false);
    
    this.room2a_puzzle6 = this.add.image(768, 432, 'room2a_puzzle6');
    this.room2a_puzzle6.setVisible(false);
    
    this.room2a_puzzle7 = this.add.image(768, 432, 'room2a_puzzle7');
    this.room2a_puzzle7.setVisible(false);
    
    this.room2a_puzzle8 = this.add.image(768, 432, 'room2a_puzzle8');
    this.room2a_puzzle8.setVisible(false);
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
