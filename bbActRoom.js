class bbActRoom extends Phaser.Scene {

    // roomProgress == 2100 upon first entry from buildingBlocks

  constructor() {
    super("BB_ActRoom");
    this.room2a_helpOpen = false;
    this.room2a_characterMoveable = true;
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
    this.setCharacterAlpha(0,0,1,0);
  
    this.roomLabel = this.add.text(650, 6, "Building Blocks Activity Center", {
        font: "24px arial",
        color: "#FFFFFF",
        align: 'left',
        fontWeight: 'bold',
    });
  }

  update(delta) {
    //TEMPORARY FOR TESTING
    //vvvvvvvvvvvvvvvvvvv//


    if (Phaser.Input.Keyboard.JustDown(this.room2a_key_N)) {
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
    

    if (Phaser.Input.Keyboard.JustDown(this.room2a_key_H)) {
        if (this.room2a_help_menu.alpha == 0.0)
            this.helpMenu();
        else
            this.quitInteraction();

    }

    if (this.room2a_key_U.isDown) {
	// let's us jump into parents activity
	roomProgress = 2400;
    }

    if (Phaser.Input.Keyboard.JustDown(this.room2a_key_M)) {
      if (this.room2a_map.alpha == 0.0) {
        this.room2a_map.alpha = 1.0;
        characterMoveable = false;
        this.room2a_character_north.alpha = 0.0;
        this.room2a_character_east.alpha = 0.0;
        this.room2a_character_south.alpha = 0.0;
        this.room2a_character_west.alpha = 0.0;
      }
      else {
        this.quitInteraction();
      }
    }

    if (Phaser.Input.Keyboard.JustDown(this.room2a_key_B)) {
      if (this.room2a_notebook.alpha == 0.0) {
        this.room2a_notebook.alpha = 1.0;
        this.room2a_characterMoveable = false;
        this.room2a_character_north.alpha = 0.0;
        this.room2a_character_east.alpha = 0.0;
        this.room2a_character_south.alpha = 0.0;
        this.room2a_character_west.alpha = 0.0;
      }
      else {
          this.quitInteraction();
      }
    }

    if (this.room2a_key_Q.isDown) {
        this.quitInteraction();
        this.room2a_activatedQuiz = false;
        this.room2a_quizActive = false;
    }

    this.characterMoveable = true;
    this.movePlayer();
    this.checkInteractValidity();
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
    this.load.image('room2a_floor', 'assets/Room2Act1/floor_room2_act1.jpg');
    this.load.image('room2a_map', 'assets/featNotAvail.png');
    this.load.image('room2a_notebook', 'assets/featNotAvail.png');
    this.load.image('room2a_activityLocked', 'assets/activityLocked.png');
    this.load.image('room2a_help_menu', 'assets/help_menu.png');

    this.load.image('room2a_box', 'assets/Room2Act0/cardboard_box.png');
    //    this.load.image('room2a_puzzle1', 'assets/Room2Act1/Puzzle/Puzzle/Puzzle1A.png');
    this.load.image('room2a_parents', 'assets/Room2Act2/couple.png');
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
    this.room2a_returnDoor = this.add.image(113, 385, 'returnDoor');

    this.room2a_box = this.add.image(288, 232, 'room2a_box');
    //    this.room2a_puzzle1 = this.add.image(1168, 400, 'room2a_puzzle1');
    this.room2a_parents = this.add.image(868, 611, 'room2a_parents');
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
    //    this.hideActivities();
    this.room2a_box.alpha = 1.0;
    //    this.room2a_puzzle1.alpha = 1.0;
    this.room2a_parents.alpha = 1.0;
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
    //    this.room2a_puzzle1.setScale(0.6);
    this.room2a_box.setScale(0.5);
    this.room2a_parents.setScale(0.35);
    this.room2a_character_north.setScale(3);
    this.room2a_character_south.setScale(3);
    this.room2a_character_west.setScale(3);
    this.room2a_character_east.setScale(3);
    this.room2a_floor.scaleY = .513;
    this.room2a_floor.scaleX = .791;
    this.room2a_returnDoor.setScale(1.5);
  }

  /* setRotations
   *
   * Sets the rotation that each object sits at.
  */
  setRotations() {
      //    this.room2a_puzzle1.angle = 90;
    this.room2a_returnDoor.angle = 270;
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
    this.room2a_key_N = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);

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

                                                //xpos ypos x   y
    this.room2a_returnDoor_zone = new Phaser.Geom.Rectangle(113,320,100,100);
    this.room2a_graphics.fillRectShape(this.room2a_returnDoor_zone);

    //    this.room2a_P1A = new Phaser.Geom.Rectangle(1118, 332,160,110);
    //    this.room2a_graphics.fillRectShape(this.room2a_P1A);

    this.room2a_box_zone = new Phaser.Geom.Rectangle(238,182,100,100);
    this.room2a_graphics.fillRectShape(this.room2a_box_zone);

    this.room2a_parents_zone = new Phaser.Geom.Rectangle(818,561,100,100);
    this.room2a_graphics.fillRectShape(this.room2a_parents_zone);

  }

  /* checkInteractValidity
   *
   * Checks to see if the character can interact with the object
  */

  checkInteractValidity() {
    if (Phaser.Geom.Rectangle.ContainsPoint(this.room2a_returnDoor_zone, this.room2a_character_north)) {
		this.displayE();
		if (this.room2a_key_E.isDown) {
			console.log("from activity 1 to room 2")
			this.scene.start("Building_Blocks");
		}
    }
    else if (Phaser.Geom.Rectangle.ContainsPoint(this.room2a_box_zone, this.room2a_character_north)) {
		this.displayE();
		if (this.room2a_key_E.isDown) {
		    if (roomProgress < 2100) {
			this.room2a_activityLocked.alpha = 1.0;
		    }
		    else {
			if (roomProgress <= 2200) { roomProgress = 2200; }
			//roomProgress=2299; // just for jbf testing 2/6/20
			this.scene.start("BuildBlock_Act0");
			// if complete that scene roomProg==2299
		    }
		}
    }
    /*
    else if (Phaser.Geom.Rectangle.ContainsPoint(this.room2a_P1A, this.room2a_character_north)) {
		this.displayE();
		if (this.room2a_key_E.isDown) {
		    if (roomProgress < 2299) {
			this.room2a_activityLocked.alpha = 1.0;
		    }
		    else {
			if (roomProgress <= 2300) { roomProgress = 2300; }
			roomProgress=2399; // just for jbf testing 2/6/20
			this.scene.start("BuildBlock_Act1");
			// if complete scene roomProg==2399
		    }
		}
    }
    */
    else if (Phaser.Geom.Rectangle.ContainsPoint(this.room2a_parents_zone, this.room2a_character_north)) {
		this.displayE();
		if (this.room2a_key_E.isDown) {
		    if (roomProgress < 2299) {
			this.room2a_activityLocked.alpha = 1.0;
		    }
		    else {
			if (roomProgress <= 2300) { roomProgress = 2400; }
			this.scene.start("BuildBlock_Act2");
		    }
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
            if(this.room2a_character_north.y > 170){
              this.room2a_character_north.y -= 5;
              this.room2a_character_east.y -= 5;
              this.room2a_character_south.y -= 5;
              this.room2a_character_west.y -= 5;

              this.setCharacterAlpha(1,0,0,0);
	    }
      }
      //Character moves left
      if (this.room2a_key_A.isDown && this.room2a_characterMoveable == true) {
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

    this.room2a_floor.scaleX = 1.0;
    this.room2a_floor.scaleY = 1.0;
    this.room2a_background.alpha = 1.0;
    this.room2a_floor.scaleY = .513;
    this.room2a_floor.scaleX = .791;
    //    this.room2a_puzzle1.setVisible(true);
    //    this.room2a_puzzle1.x = 1168;
    //    this.room2a_puzzle1.y = 432;
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
