class buildBlockAct1 extends Phaser.Scene {

  constructor() {
    super("BuildBlock_Act1");
    this.room2a_quizActive = false;
    this.room2a_activatedQuiz = false;
    this.room2a_helpOpen = false;
    this.room2a_puzzleMoveable = false;
    this.room2a_isPuzzle = false;

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


    if (this.room2a_key_Q.isDown) {
        this.quitInteraction();
        this.room2a_activatedQuiz = false;
        this.room2a_quizActive = false;
    }

    if (this.room2a_quizActive == true && this.room2a_activatedQuiz == false && this.room2a_key_E.isDown) {
        this.activateQuiz();
        this.room2a_activatedQuiz = true;
    }

    if (this.room2a_activatedQuiz == false) {
        this.movePlayer();
        this.checkInteractValidity();
    }
    else {
        this.movePlayer();
        this.checkActivityZones();
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
    this.load.image('room2a_one_lesson_BG', 'assets/one_lesson_BG.png');
    this.load.image('room2a_character_north', 'assets/character_north.png');
    this.load.image('room2a_character_east', 'assets/character_east.png');
    this.load.image('room2a_character_south', 'assets/character_south.png');
    this.load.image('room2a_character_west', 'assets/character_west.png');
    this.load.image('room2a_E_KeyImg', 'assets/E_Key.png');
    this.load.image('room2a_wall_info_1', 'assets/wall_art.png');
    this.load.image('room2a_wall_info_2', 'assets/wall_art.png');
    this.load.image('room2a_wall_info_3', 'assets/wall_art.png');
    this.load.image('room2a_wall_info_4', 'assets/wall_art.png');
    this.load.image('room2a_wall_info_5', 'assets/wall_art.png');
    this.load.image('room2a_wall_info_6', 'assets/wall_art.png');
    this.load.image('room2a_floor', 'assets/Room2Act1/floor_room2_act1.jpg');
    this.load.image('room2a_map', 'assets/Map/room3act1inprogress.png');
    this.load.image('room2a_notebook', 'assets/notebook.png');
    this.load.image('room2a_activityLocked', 'assets/activityLocked.png');
    this.load.image('room2a_help_menu', 'assets/help_menu.png');
    this.load.image('room2a_hole', 'assets/hole.png');
    this.load.image('room2a_puzzle1', 'assets/Room2Act1/Puzzle/Puzzle/Puzzle1A.png');
    this.load.image('room2a_puzzle2', 'assets/Room2Act1/Puzzle/Puzzle/Puzzle1B.png');
    this.load.image('room2a_puzzle3', 'assets/Room2Act1/Puzzle/Puzzle/Puzzle1C.png');
    this.load.image('room2a_puzzle4', 'assets/Room2Act1/Puzzle/Puzzle/Puzzle1D.png');
    this.load.image('room2a_puzzle5', 'assets/Room2Act1/Puzzle/Puzzle/Puzzle1E.png');
    this.load.image('room2a_puzzle6', 'assets/Room2Act1/Puzzle/Puzzle/Puzzle2A.png');
    this.load.image('room2a_puzzle7', 'assets/Room2Act1/Puzzle/Puzzle/Puzzle2B.png');
    this.load.image('room2a_puzzle8', 'assets/Room2Act1/Puzzle/Puzzle/Puzzle2C.png');
	  this.load.image('room2a_puzzle9', 'assets/Room2Act1/Puzzle/Puzzle/Puzzle2D.png');
	  this.load.image('room2a_puzzle10', 'assets/Room2Act1/Puzzle/Puzzle/Puzzle2E.png');
	  this.load.image('room2a_puzzle11', 'assets/Room2Act1/Puzzle/Puzzle/Puzzle3A.png');
    this.load.image('room2a_puzzle12', 'assets/Room2Act1/Puzzle/Puzzle/Puzzle3B.png');
    this.load.image('room2a_puzzle13', 'assets/Room2Act1/Puzzle/Puzzle/Puzzle3C.png');
    this.load.image('room2a_puzzle14', 'assets/Room2Act1/Puzzle/Puzzle/Puzzle3D.png');
    this.load.image('room2a_puzzle15', 'assets/Room2Act1/Puzzle/Puzzle/Puzzle3E.png');
    this.load.image('room2a_puzzle16', 'assets/Room2Act1/Puzzle/Puzzle/Puzzle4A.png');
    this.load.image('room2a_puzzle17', 'assets/Room2Act1/Puzzle/Puzzle/Puzzle4B.png');
    this.load.image('room2a_puzzle18', 'assets/Room2Act1/Puzzle/Puzzle/Puzzle4C.png');
	  this.load.image('room2a_puzzle19', 'assets/Room2Act1/Puzzle/Puzzle/Puzzle4D.png');
	  this.load.image('room2a_puzzle20', 'assets/Room2Act1/Puzzle/Puzzle/Puzzle4E.png');
    this.load.image('room2a_Pfloor', 'assets/Room2Act1/floor_2.jpeg');
	this.load.image('returnDoor', 'assets/dooropen_100x100.png');


  }

  /* createImages
   *
   * Adds the image to the game board
  */
  createImages() {
    this.room2a_e_pressed = false;
    this.room2a_puzzle_moved = false;
	this.returnDoor = this.add.image(113, 385, 'returnDoor');
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
    this.room2a_puzz_backHole = this.add.image(140, 632, 'room2a_hole');

    this.room2a_back_hole_text = this.add.text(168, 532, "Back to Room 2")
    this.room2a_back_hole_text.setFontSize(32);
    this.room2a_back_hole_text.setStroke("Black",4);

    this.room2a_NOTREADY_text = this.add.text(500, 500, "PUZZLE ROOM NOT FINISHED")
    this.room2a_NOTREADY_text.setFontSize(32);
    this.room2a_NOTREADY_text.setStroke("Black",4);

    this.room2a_puzz_holeText = this.add.text(5, 532, "Back to Room 2");
    this.room2a_puzz_holeText.setFontSize(32);
    this.room2a_puzz_holeText.setStroke("Black", 4);

    this.room2a_puzzle1 = this.add.image(1168, 432, 'room2a_puzzle1');
    this.room2a_Pfloor = this.add.image(768, 615, 'room2a_Pfloor');
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
    this.room2a_Pfloor.alpha = 0.0;
    this.room2a_puzz_backHole.alpha = 0.0;
    this.room2a_puzz_holeText.alpha = 0.0;
	this.returnDoor.alpha = 1;
  }

  /* setDepths
   *
   * Sets the depth of each object on the screen.
  */
  setDepths() {
    this.room2a_floor.setDepth(0);
    this.room2a_Pfloor.setDepth(1);
    this.room2a_character_north.setDepth(50);
    this.room2a_character_east.setDepth(50);
    this.room2a_character_south.setDepth(50);
    this.room2a_character_west.setDepth(50);
    this.room2a_E_KeyImg.setDepth(49);
    this.room2a_map.setDepth(100);
    this.room2a_notebook.setDepth(100);
    this.room2a_help_menu.setDepth(100);
    this.room2a_NOTREADY_text.setDepth(49);
	this.returnDoor.setDepth(1);
  }

  /* setScales
   *
   * Scales the size of each object.
  */
  setScales() {
    this.room2a_E_KeyImg.setScale(0.4);
    this.room2a_notebook.setScale(0.75);
    this.room2a_map.setScale(0.75);
    this.room2a_puzzle1.setScale(0.6);
    this.room2a_character_north.setScale(3);
    this.room2a_character_south.setScale(3);
    this.room2a_character_west.setScale(3);
    this.room2a_character_east.setScale(3);
    this.room2a_floor.scaleY = .513;
    this.room2a_floor.scaleX = .791;
    this.room2a_Pfloor.scaleY = .8;
    this.room2a_Pfloor.scaleX = .8;
	this.returnDoor.setScale(1.5);

  }

  /* setRotations
   *
   * Sets the rotation that each object sits at.
  */
  setRotations() {
    this.room2a_puzzle1.angle = 90;
	this.returnDoor.angle = 270;
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

    this.room2a_P1A = new Phaser.Geom.Rectangle(1068, 332,160,110);
    this.room2a_graphics.fillRectShape(this.room2a_P1A);
	
	this.exitDoor = new Phaser.Geom.Rectangle(113,320,100,100);
	this.graphics.fillRectShape(this.exitDoor);
  }

  /* checkInteractValidity
   *
   * Checks to see if the character can interact with the object
  */

  checkInteractValidity() {
    if (Phaser.Geom.Rectangle.ContainsPoint(this.room2a_back_hole_zone, this.room2a_character_north) &&
            this.room2a_activatedQuiz == false) {
		this.displayE();
		if (this.room2a_key_E.isDown) {
			console.log("from activity 1 to room 2")
			this.scene.start("Building_Blocks");
		}
    }
    else if (Phaser.Geom.Rectangle.ContainsPoint(this.room2a_P1A, this.room2a_character_north) &&
            this.room2a_activatedQuiz == false) {
		this.displayE();
		if (this.room2a_key_E.isDown) {
            console.log("Activated Quiz")
			this.room2a_quizActive = true;
		}
    }
	else if (Phaser.Geom.Rectangle.ContainsPoint(this.exitDoor, this.character_north)) {
		this.E_KeyImg.x = this.character_north.x+75;
		this.E_KeyImg.y = this.character_north.y;
		this.E_KeyImg.alpha = 1.0;
		if (this.key_E.isDown) {
			this.scene.start("Building_Blocks");
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
      if(this.room2a_quizActive == false){
        //setCharacterAlpha is in helper.js and arguments go N,E,S,W
        this.setCharacterAlpha(0,0,1,0);

        //Character moves up
        if(this.room2a_key_W.isDown && this.room2a_characterMoveable == true) {
            if(this.room2a_character_north.y > 170){
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
    else{
        this.setCharacterAlpha(0,0,1,0);

        //Character moves up
        if(this.room2a_key_W.isDown && this.room2a_characterMoveable == true) {
            if(this.room2a_character_north.y > 20){
              this.room2a_character_north.y -= 5;
              this.room2a_character_east.y -= 5;
              this.room2a_character_south.y -= 5;
              this.room2a_character_west.y -= 5;

              this.setCharacterAlpha(1,0,0,0);



        }
        //Character moves left
      } if (this.room2a_key_A.isDown && this.room2a_characterMoveable == true) {
            if(this.room2a_character_west.x > 50){
              this.room2a_character_west.x -= 5;
              this.room2a_character_east.x -= 5;
              this.room2a_character_south.x -= 5;
              this.room2a_character_north.x -= 5;

              this.setCharacterAlpha(0,0,0,1);
      }

        }
        //Character moves down
         if (this.room2a_key_S.isDown && this.room2a_characterMoveable == true) {
            if(this.room2a_character_south.y < 800){
              this.room2a_character_south.y += 5;
              this.room2a_character_east.y += 5;
              this.room2a_character_north.y += 5;
              this.room2a_character_west.y += 5;

              this.setCharacterAlpha(0,0,1,0);
        }

        }
        //Character moves right
        if (this.room2a_key_D.isDown && this.room2a_characterMoveable == true) {
            if(this.room2a_character_east.x < 1450){
              this.room2a_character_east.x += 5;
              this.room2a_character_north.x += 5;
              this.room2a_character_south.x += 5;
              this.room2a_character_west.x += 5;

              this.setCharacterAlpha(0,1,0,0);
            }
        }
    }
  }

  /* movePuzzle
   *
   * makes the puzzle moveable in the test activity
  */
  movePuzzle(room2a_moveThispuzzle) {
    if(this.room2a_key_W.isDown && this.room2a_puzzleMoveable == true) {
        if (room2a_moveThispuzzle.y > 50){
            room2a_moveThispuzzle.y -= 7;
        }
    }
    if (this.room2a_key_A.isDown && this.room2a_puzzleMoveable == true) {
        if (room2a_moveThispuzzle.x > 80){
            room2a_moveThispuzzle.x -= 7;
        }
    }
    if (this.room2a_key_S.isDown && this.room2a_puzzleMoveable == true) {
        if (room2a_moveThispuzzle.y < 810){
            room2a_moveThispuzzle.y += 7;
        }
    }
    if (this.room2a_key_D.isDown && this.room2a_puzzleMoveable == true) {
        if (room2a_moveThispuzzle.x < 1425){
            room2a_moveThispuzzle.x += 7;
        }
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

    if (this.room2a_activatedQuiz == true){
        this.room2a_activatedQuiz = false;
        this.room2a_puzzle2.setVisible(false);
        this.room2a_puzzle3.setVisible(false);
        this.room2a_puzzle4.setVisible(false);
        this.room2a_puzzle5.setVisible(false);
        this.room2a_puzzle6.setVisible(false);
        this.room2a_puzzle7.setVisible(false);
        this.room2a_puzzle8.setVisible(false);
        this.room2a_puzzle9.setVisible(false);
        this.room2a_puzzle10.setVisible(false);
        this.room2a_puzzle11.setVisible(false);
        this.room2a_puzzle12.setVisible(false);
        this.room2a_puzzle13.setVisible(false);
        this.room2a_puzzle14.setVisible(false);
        this.room2a_puzzle15.setVisible(false);
        this.room2a_puzzle16.setVisible(false);
        this.room2a_puzzle17.setVisible(false);
        this.room2a_puzzle18.setVisible(false);
        this.room2a_puzzle19.setVisible(false);
        this.room2a_puzzle20.setVisible(false);
        this.room2a_character_north.y = 432;
        this.room2a_character_east.y = 432;
        this.room2a_character_south.y = 432;
        this.room2a_character_west.y = 432;
        this.room2a_character_north.x = 1168;
        this.room2a_character_east.x = 1168;
        this.room2a_character_south.x = 1168;
        this.room2a_character_west.x = 1168;
        this.room2a_Pfloor.alpha = 0.0;

    }
    this.room2a_floor.scaleX = 1.0;
    this.room2a_floor.scaleY = 1.0;
    this.room2a_background.alpha = 1.0;
    this.room2a_back_hole.alpha = 1.0;
    this.room2a_puzzle1.setVisible(true);
    this.room2a_back_hole_text.alpha = 1.0;
    this.room2a_NOTREADY_text.alpha = 1.0;
    this.room2a_puzz_holeText.alpha = 0.0;
    this.room2a_puzzleMoveable = false;
    this.room2a_puzzleCount = 1;
    this.room2a_floor.scaleY = .513;
    this.room2a_floor.scaleX = .791;
    this.room2a_puzzle1.x = 1168;
    this.room2a_puzzle1.y = 432;
	this.returnDoor.x += 40;
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
    this.room2a_puzzleCount = 1;
    this.room2a_puzzleMoveable = true;
    this.room2a_back_hole.alpha = 0.0;
    this.room2a_puzz_backHole.alpha = 1.0;
    this.room2a_puzz_holeText.alpha = 1.0;
    this.loadQuizImages();
    this.ActivityRotations();
    this.createActivityZones();

        //this.room2a_puzzle1.setInteractive();


    this.room2a_E_KeyImg.alpha = 0.0;
    this.room2a_back_hole_text.alpha = 0.0;
    this.room2a_character_north.alpha = 0.0;
    this.room2a_character_east.alpha = 0.0;
    this.room2a_character_south.alpha = 0.0;
    this.room2a_character_west.alpha = 0.0;

    this.room2a_floor.scaleX = 1.5;
    this.room2a_floor.scaleY = 2.0;
    this.room2a_Pfloor.alpha = 1.0;

    }

     /* loadQuizImages
     *
     * Loads the images into the quiz Activity
     */
    loadQuizImages(){

    this.room2a_puzzle1.setVisible(true);
	this.room2a_puzzle1.x = 200;
    this.room2a_puzzle1.y = 100;

    this.room2a_puzzle2 = this.add.image(320, 100, 'room2a_puzzle2');
    this.room2a_puzzle2.setVisible(true);
	this.room2a_puzzle2.setScale(0.6);

	this.room2a_puzzle3 = this.add.image(440, 100, 'room2a_puzzle3');
    this.room2a_puzzle3.setVisible(true);
	this.room2a_puzzle3.setScale(0.6);

	this.room2a_puzzle4 = this.add.image(560, 100, 'room2a_puzzle4');
    this.room2a_puzzle4.setVisible(true);
	this.room2a_puzzle4.setScale(0.6);

	this.room2a_puzzle5 = this.add.image(680, 100, 'room2a_puzzle5');
    this.room2a_puzzle5.setVisible(true);
	this.room2a_puzzle5.setScale(0.6);

	this.room2a_puzzle6 = this.add.image(800, 100, 'room2a_puzzle6');
    this.room2a_puzzle6.setVisible(true);
	this.room2a_puzzle6.setScale(0.6);

	this.room2a_puzzle7 = this.add.image(920, 100, 'room2a_puzzle7');
    this.room2a_puzzle7.setVisible(true);
	this.room2a_puzzle7.setScale(0.6);

	this.room2a_puzzle8 = this.add.image(1040, 100, 'room2a_puzzle8');
    this.room2a_puzzle8.setVisible(true);
	this.room2a_puzzle8.setScale(0.6);

	this.room2a_puzzle9 = this.add.image(1160, 100, 'room2a_puzzle9');
    this.room2a_puzzle9.setVisible(true);
	this.room2a_puzzle9.setScale(0.6);

	this.room2a_puzzle10 = this.add.image(1280, 100, 'room2a_puzzle10');
    this.room2a_puzzle10.setVisible(true);
	this.room2a_puzzle10.setScale(0.6);

	this.room2a_puzzle11 = this.add.image(200, 250, 'room2a_puzzle11');
    this.room2a_puzzle11.setVisible(true);
	this.room2a_puzzle11.setScale(0.6);

	this.room2a_puzzle12 = this.add.image(320, 250, 'room2a_puzzle12');
    this.room2a_puzzle12.setVisible(true);
	this.room2a_puzzle12.setScale(0.6);

	this.room2a_puzzle13 = this.add.image(440, 250, 'room2a_puzzle13');
    this.room2a_puzzle13.setVisible(true);
	this.room2a_puzzle13.setScale(0.6);

	this.room2a_puzzle14 = this.add.image(560, 250, 'room2a_puzzle14');
    this.room2a_puzzle14.setVisible(true);
	this.room2a_puzzle14.setScale(0.6);

	this.room2a_puzzle15 = this.add.image(680, 250, 'room2a_puzzle15');
    this.room2a_puzzle15.setVisible(true);
	this.room2a_puzzle15.setScale(0.6);

	this.room2a_puzzle16 = this.add.image(800, 250, 'room2a_puzzle16');
    this.room2a_puzzle16.setVisible(true);
	this.room2a_puzzle16.setScale(0.6);

	this.room2a_puzzle17 = this.add.image(920, 250, 'room2a_puzzle17');
    this.room2a_puzzle17.setVisible(true);
	this.room2a_puzzle17.setScale(0.6);

	this.room2a_puzzle18 = this.add.image(1040, 250, 'room2a_puzzle18');
    this.room2a_puzzle18.setVisible(true);
	this.room2a_puzzle18.setScale(0.6);

	this.room2a_puzzle19 = this.add.image(1160, 250, 'room2a_puzzle19');
    this.room2a_puzzle19.setVisible(true);
	this.room2a_puzzle19.setScale(0.6);

	this.room2a_puzzle20 = this.add.image(1280, 250, 'room2a_puzzle20');
    this.room2a_puzzle20.setVisible(true);
	this.room2a_puzzle20.setScale(0.6);


    }
    ActivityRotations(){
    this.room2a_puzzle1.angle = Math.floor(Math.random() * 3) * 90;
    this.room2a_puzzle2.angle = Math.floor(Math.random() * 3) * 90;
	this.room2a_puzzle3.angle = Math.floor(Math.random() * 3) * 90;
	this.room2a_puzzle4.angle = Math.floor(Math.random() * 3) * 90;
	this.room2a_puzzle5.angle = Math.floor(Math.random() * 3) * 90;
	this.room2a_puzzle6.angle = Math.floor(Math.random() * 3) * 90;
	this.room2a_puzzle7.angle = Math.floor(Math.random() * 3) * 90;
	this.room2a_puzzle8.angle = Math.floor(Math.random() * 3) * 90;
	this.room2a_puzzle9.angle = Math.floor(Math.random() * 3) * 90;
	this.room2a_puzzle10.angle = Math.floor(Math.random() * 3) * 90;
	this.room2a_puzzle11.angle = Math.floor(Math.random() * 3) * 90;
	this.room2a_puzzle12.angle = Math.floor(Math.random() * 3) * 90;
	this.room2a_puzzle13.angle = Math.floor(Math.random() * 3) * 90;
	this.room2a_puzzle14.angle = Math.floor(Math.random() * 3) * 90;
	this.room2a_puzzle15.angle = Math.floor(Math.random() * 3) * 90;
	this.room2a_puzzle16.angle = Math.floor(Math.random() * 3) * 90;
	this.room2a_puzzle17.angle = Math.floor(Math.random() * 3) * 90;
	this.room2a_puzzle18.angle = Math.floor(Math.random() * 3) * 90;
	this.room2a_puzzle19.angle = Math.floor(Math.random() * 3) * 90;
	this.room2a_puzzle20.angle = Math.floor(Math.random() * 3) * 90;

    }

    /* createActivityZones
   *
   * creates the interact zones for the activity
  */
  createActivityZones(){
    var room2a_activityZones = [];
	this.room2a_activityZone1 = new Phaser.Geom.Rectangle(150,0,100,100);
    this.room2a_graphics.fillRectShape(this.room2a_activityZone1);
    room2a_activityZones.push(this.room2a_activityZone1);

    this.room2a_activityZone2 = new Phaser.Geom.Rectangle(270,0,100,100);
    this.room2a_graphics.fillRectShape(this.room2a_activityZone2);
    room2a_activityZones.push(this.room2a_activityZone2);

    this.room2a_activityZone3 = new Phaser.Geom.Rectangle(390,0,100,100);
    this.room2a_graphics.fillRectShape(this.room2a_activityZone3);
    room2a_activityZones.push(this.room2a_activityZone3);

    this.room2a_activityZone4 = new Phaser.Geom.Rectangle(510,0,100,100);
    this.room2a_graphics.fillRectShape(this.room2a_activityZone4);
    room2a_activityZones.push(this.room2a_activityZone4);

    this.room2a_activityZone5 = new Phaser.Geom.Rectangle(630,0,100,100);
    this.room2a_graphics.fillRectShape(this.room2a_activityZone5);
    room2a_activityZones.push(this.room2a_activityZone5);

    this.room2a_activityZone6 = new Phaser.Geom.Rectangle(750,0,100,100);
    this.room2a_graphics.fillRectShape(this.room2a_activityZone6);
    room2a_activityZones.push(this.room2a_activityZone6);

    this.room2a_activityZone7 = new Phaser.Geom.Rectangle(870,0,100,100);
    this.room2a_graphics.fillRectShape(this.room2a_activityZone7);
    room2a_activityZones.push(this.room2a_activityZone7);

    this.room2a_activityZone8 = new Phaser.Geom.Rectangle(990,0,100,100);
    this.room2a_graphics.fillRectShape(this.room2a_activityZone8);
    room2a_activityZones.push(this.room2a_activityZone8);

    this.room2a_activityZone9 = new Phaser.Geom.Rectangle(1110,0,100,100);
    this.room2a_graphics.fillRectShape(this.room2a_activityZone9);
    room2a_activityZones.push(this.room2a_activityZone9);

    this.room2a_activityZone10 = new Phaser.Geom.Rectangle(1230,0,100,100);
    this.room2a_graphics.fillRectShape(this.room2a_activityZone10);
    room2a_activityZones.push(this.room2a_activityZone10);

    this.room2a_activityZone11 = new Phaser.Geom.Rectangle(150,150,100,100);
    this.room2a_graphics.fillRectShape(this.room2a_activityZone11);
    room2a_activityZones.push(this.room2a_activityZone11);

    this.room2a_activityZone12 = new Phaser.Geom.Rectangle(270,150,100,100);
    this.room2a_graphics.fillRectShape(this.room2a_activityZone12);
    room2a_activityZones.push(this.room2a_activityZone12);

    this.room2a_activityZone13 = new Phaser.Geom.Rectangle(390,150,100,100);
    this.room2a_graphics.fillRectShape(this.room2a_activityZone13);
    room2a_activityZones.push(this.room2a_activityZone13);

    this.room2a_activityZone14 = new Phaser.Geom.Rectangle(510,150,100,100);
    this.room2a_graphics.fillRectShape(this.room2a_activityZone14);
    room2a_activityZones.push(this.room2a_activityZone14);

    this.room2a_activityZone15 = new Phaser.Geom.Rectangle(630,150,100,100);
    this.room2a_graphics.fillRectShape(this.room2a_activityZone15);
    room2a_activityZones.push(this.room2a_activityZone15);

    this.room2a_activityZone16 = new Phaser.Geom.Rectangle(750,150,100,100);
    this.room2a_graphics.fillRectShape(this.room2a_activityZone16);
    room2a_activityZones.push(this.room2a_activityZone16);

    this.room2a_activityZone17 = new Phaser.Geom.Rectangle(870,150,100,100);
    this.room2a_graphics.fillRectShape(this.room2a_activityZone17);
    room2a_activityZones.push(this.room2a_activityZone17);

    this.room2a_activityZone18 = new Phaser.Geom.Rectangle(990,150,100,100);
    this.room2a_graphics.fillRectShape(this.room2a_activityZone18);
    room2a_activityZones.push(this.room2a_activityZone18);

    this.room2a_activityZone19 = new Phaser.Geom.Rectangle(1110,150,100,100);
    this.room2a_graphics.fillRectShape(this.room2a_activityZone19);
    room2a_activityZones.push(this.room2a_activityZone19);

    this.room2a_activityZone20 = new Phaser.Geom.Rectangle(1230,150,100,100);
    this.room2a_graphics.fillRectShape(this.room2a_activityZone20);
    room2a_activityZones.push(this.room2a_activityZone20);
    console.log(room2a_activityZones);

    this.room2a_puzz_zone = new Phaser.Geom.Rectangle(70,532,150,150);
    this.room2a_graphics.fillRectShape(this.room2a_puzz_zone);

    }

    /* checkActivityZones
   *
   * checks the interact zones for the activity
  */
  checkActivityZones() {
    if (Phaser.Geom.Rectangle.ContainsPoint(this.room2a_activityZone1, this.room2a_character_north)){
        this.displayE();
		if (this.room2a_key_E.isDown) {
		}
    }
    else if (Phaser.Geom.Rectangle.ContainsPoint(this.room2a_activityZone2, this.room2a_character_north)){
        this.displayE();
		if (this.room2a_key_E.isDown) {
		}
    }
    else if (Phaser.Geom.Rectangle.ContainsPoint(this.room2a_activityZone3, this.room2a_character_north)){
        this.displayE();
		if (this.room2a_key_E.isDown) {

		}
    }
    else if (Phaser.Geom.Rectangle.ContainsPoint(this.room2a_activityZone4, this.room2a_character_north)){
        this.displayE();
		if (this.room2a_key_E.isDown) {

		}
    }
    else if (Phaser.Geom.Rectangle.ContainsPoint(this.room2a_activityZone5, this.room2a_character_north)){
        this.displayE();
		if (this.room2a_key_E.isDown) {

		}
    }
    else if (Phaser.Geom.Rectangle.ContainsPoint(this.room2a_activityZone6, this.room2a_character_north)) {
        this.displayE();
		if (this.room2a_key_E.isDown) {

		}
    }
    else if (Phaser.Geom.Rectangle.ContainsPoint(this.room2a_activityZone7, this.room2a_character_north)) {
        this.displayE();
		if (this.room2a_key_E.isDown) {

		}
    }
    else if (Phaser.Geom.Rectangle.ContainsPoint(this.room2a_activityZone8, this.room2a_character_north)) {
        this.displayE();
		if (this.room2a_key_E.isDown) {

		}
    }
    else if (Phaser.Geom.Rectangle.ContainsPoint(this.room2a_activityZone9, this.room2a_character_north)) {
        this.displayE();
		if (this.room2a_key_E.isDown) {

		}
    }
    else if (Phaser.Geom.Rectangle.ContainsPoint(this.room2a_activityZone10, this.room2a_character_north)) {
        this.displayE();
		if (this.room2a_key_E.isDown) {

		}
    }
    else if (Phaser.Geom.Rectangle.ContainsPoint(this.room2a_activityZone11, this.room2a_character_north)) {
        this.displayE();

		if (this.room2a_key_E.isDown) {
		}
    }
    else if (Phaser.Geom.Rectangle.ContainsPoint(this.room2a_activityZone12, this.room2a_character_north)) {
        this.displayE();
		if (this.room2a_key_E.isDown) {

		}
    }
    else if (Phaser.Geom.Rectangle.ContainsPoint(this.room2a_activityZone13, this.room2a_character_north)) {
        this.displayE();
		if (this.room2a_key_E.isDown) {

		}
    }
    else if (Phaser.Geom.Rectangle.ContainsPoint(this.room2a_activityZone14, this.room2a_character_north)) {
        this.displayE();
		if (this.room2a_key_E.isDown) {

		}
    }
    else if (Phaser.Geom.Rectangle.ContainsPoint(this.room2a_activityZone15, this.room2a_character_north)) {
        this.displayE();
		if (this.room2a_key_E.isDown) {

		}
    }
    else if (Phaser.Geom.Rectangle.ContainsPoint(this.room2a_activityZone16, this.room2a_character_north)){
        this.displayE();
		if (this.room2a_key_E.isDown) {

		}
    }
    else if (Phaser.Geom.Rectangle.ContainsPoint(this.room2a_activityZone17, this.room2a_character_north)) {
        this.displayE();
		if (this.room2a_key_E.isDown) {

		}
    }
    else if (Phaser.Geom.Rectangle.ContainsPoint(this.room2a_activityZone18, this.room2a_character_north)) {
        this.displayE();
		if (this.room2a_key_E.isDown) {

		}
    }
    else if (Phaser.Geom.Rectangle.ContainsPoint(this.room2a_activityZone19, this.room2a_character_north)) {
        this.displayE();
		if (this.room2a_key_E.isDown) {

		}
    }
    else if (Phaser.Geom.Rectangle.ContainsPoint(this.room2a_activityZone20, this.room2a_character_north)) {
        this.displayE();
		if (this.room2a_key_E.isDown) {

		}
    }

    if(Phaser.Geom.Rectangle.ContainsPoint(this.room2a_puzz_zone, this.room2a_character_north)) {
      this.displayE();
      if(this.room2a_key_E.isDown) {
        this.scene.start("Building_Blocks");
        this.room2a_activatedQuiz= false;
        // this.quitInteraction();
      }
    }
    else {
        this.hideActivities();
        this.room2a_E_KeyImg.alpha = 0.0;
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
  /* helpMenu
   *
   * displays E above players head
  */
  displayE(){
    this.room2a_E_KeyImg.x = this.room2a_character_north.x;
    this.room2a_E_KeyImg.y = this.room2a_character_north.y+75;
    this.room2a_E_KeyImg.alpha = 1.0;
}
}
