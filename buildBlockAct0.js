class buildBlockAct0 extends Phaser.Scene {

    // roomProgress coming in first time is 2200

    constructor() {
	super("BuildBlock_Act0");
        this.quizActive = true;
        //this.paperMoveable = false;
        this.helpOpen = false;
        this.holeOpened = false;
        this.counter = 0;
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
    }

    update(delta) {
	// This runs all the time in a game loop!!
	if (roomProgress <= 2200) { this.quizActive = true; }
	else { this.quizActive = false; }



        //TEMPORARY FOR TESTING
        //vvvvvvvvvvvvvvvvvvv//

	/*
        if (this.key_U.isDown && this.unlocked == false) {
            roomProgress = 1030;
            this.unlocked = true;
        }
	*/

	//	console.log("update: "+ roomProgress + ":" + this.holeOpened);


        if (this.key_M.isDown) {
            this.r1_map.alpha = 1.0;
            this.characterMoveable = false;
            this.character_north.alpha = 0.0;
            this.character_east.alpha = 0.0;
            this.character_south.alpha = 0.0;
            this.character_west.alpha = 0.0;
        }

        if (this.key_B.isDown) {
            this.notebook.alpha = 1.0;
            this.characterMoveable = false;
            this.character_north.alpha = 0.0;
            this.character_east.alpha = 0.0;
            this.character_south.alpha = 0.0;
            this.character_west.alpha = 0.0;
        }

        if (this.key_H.isDown) {
            helpMenu();
            this.characterMoveable = false;
            this.character_north.alpha = 0.0;
            this.character_east.alpha = 0.0;
            this.character_south.alpha = 0.0;
            this.character_west.alpha = 0.0;
        }

        if (this.quizActive == false) {
            this.moveSprite(true);
        }
	else {
	    this.moveSprite(false);
	}
	//	this.checkInteractValidity();

	//        if (this.quizActive == true && this.activatedQuiz == false && this.key_E.isDown) {
	//	            this.activateQuiz();
	//	            this.activatedQuiz = true;
	//        }

        //if (this.quizActive == true && this.key_Q.isDown && this.activatedQuiz == true) {
        //    this.quitQuiz();
        //    this.activatedQuiz = false;
        //}

	//        if (this.activatedQuiz == false) {
	//            this.movePlayer();
	//            this.checkInteractValidity();
	//        }// else if (this.activatedQuiz = true) {
           // if (this.paperCount == 1) {
           //     this.movePaper(this.paper);
           //     this.checkCorrectPaperOne();
           // } else if (this.paperCount == 2) {
            //    this.movePaper(this.paperTwo);
              //  this.checkCorrectPaperTwo();

           // } else if (this.paperCount == 3) {
             //   this.movePaper(this.paperThree);
               // this.checkCorrectPaperThree();
            //}

        //}
	//        if (this.activatedQuiz == false)
	//            this.characterMoveable = true;
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
        this.load.image('pressr', 'assets/Room1/pressr.png');
        this.load.image('character_north', 'assets/character_north.png');
        this.load.image('character_east', 'assets/character_east.png');
        this.load.image('character_south', 'assets/character_south.png');
        this.load.image('character_west', 'assets/character_west.png');
        this.load.image('E_KeyImg', 'assets/E_Key.png');
	this.load.image('r2a0_walls', 'assets/one_lesson_BG.png');
        this.load.image('r2a0_floor', 'assets/Room2Act0/woodenplankfloor.png');
        this.load.image('wall_info_2', 'assets/wall_art.png');
        this.load.image('SreBox', 'assets/Room2Act0/SreBox.png');
        this.load.image('IncStmBox', 'assets/Room2Act0/IncStmBox.png');
        this.load.image('BalShtBox', 'assets/Room2Act0/BalShtBox.png');
        this.load.image('ScfBox', 'assets/Room2Act0/ScfBox.png');
        this.load.image('paper_stack', 'assets/Room2Act0/paper_stack.png');
        this.load.image('paper', 'assets/Room2Act0/single_paper.png');
        this.load.image('r1_map', 'assets/Map/room2inprogress.png');
        this.load.image('notebook', 'assets/notebook.png');
        this.load.image('activityLocked', 'assets/activityLocked.png');
        this.load.image('help_menu', 'assets/help_menu.png');
        //this.load.image('correctPlacements0', 'assets/Room1/placements0.png');
        //this.load.image('correctPlacements1', 'assets/Room1/placements1.png');
        //this.load.image('correctPlacements2', 'assets/Room1/placements2.png');
        this.load.image('incomeStatement' , 'assets/Documents/incomeStatement.png');
        this.load.image('balanceSheet', 'assets/Documents/balanceSheet.png');
        this.load.image('retainedEarnings' , 'assets/Documents/retainedEarnings.png');
	//        this.load.image('incomeStatementText' ,'assets/Room1/incomeStatementText.png');
	//        this.load.image('balanceSheetText', 'assets/Room1/balanceSheetText.png');
	//        this.load.image('retainedEarningsText' , 'assets/Room1/retainedEarningsText.png');
        //this.load.image('hole', 'assets/hole.png');
        //this.load.image('congrats', 'assets/Room1/congrats.png');
	//        this.load.image('hole', 'assets/hole.png');
        //this.load.image('leftArrow' , 'assets/leftArrow.png');
        //this.load.image('rightArrow' , 'assets/rightArrowTest.png');
    }

    /* createImages
     *
     * Adds the image to the game board
     */
    createImages() {
        this.e_pressed = false;
        this.papers_moved = false;
	this.returnDoor = this.add.image(113, 385, 'returnDoor');
	this.r2a0_walls = this.add.image(768, 432, 'r2a0_walls');
        this.r2a0_floor = this.add.image(768, 432, 'r2a0_floor');
        this.wall_info_2 = this.add.image(768, 75, 'wall_info_2');
        this.character_north = this.add.image(768, 432, 'character_north');
        this.character_east = this.add.image(768, 432, 'character_east');
        this.character_south = this.add.image(768, 432, 'character_south');
        this.character_west = this.add.image(768, 432, 'character_west');
        this.E_KeyImg = this.add.image(this.character_north.x+40, this.character_north.y+40, 'E_KeyImg');
        this.paper_stack = this.add.image(215, 632, 'paper_stack');
        this.paper = this.add.image(768, 432, 'paper');
        this.SreBox = this.add.image(300, 220, 'SreBox');
        this.ScfBox = this.add.image(1250, 220, 'ScfBox');
        this.IncStmBox = this.add.image(1250, 630, 'IncStmBox');
        this.BalShtBox = this.add.image(300, 630, 'BalShtBox');
        this.r1_map = this.add.image(768, 432, 'r1_map');
        this.notebook = this.add.image(768, 432, 'notebook');
        this.activityLocked = this.add.image(768, 432, 'activityLocked');
        this.help_menu = this.add.image(768, 432, 'help_menu');
        this.hole = this.add.image(768, 432, 'hole');
    }

    /* setAlphas
     *
     * sets the alphas to to items in the game to zero so they are not visible at the beginning.
     */
    setAlphas() {
        this.r1_map.alpha = 0.0;
        this.notebook.alpha = 0.0;
        this.activityLocked.alpha = 0.0;
        this.E_KeyImg.alpha = 0.0;
        this.help_menu.alpha = 0.0;
        this.r2a0_walls.alpha = 1;
        this.r2a0_floor.alpha = 1;
	this.returnDoor.alpha = 1;
	// FinStmt sorting activity w/ boxes is not in room1 anymore...
	this.SreBox.alpha = 1;
	this.ScfBox.alpha = 1;
	this.BalShtBox.alpha = 1;
	this.IncStmBox.alpha = 1;
	this.paper.alpha = 1;
	//	this.paper_stack.alpha = 1;

	this.wall_info_2.alpha = 1;
    }

    /* setDepths
     *
     * Sets the depth of each object on the screen.
     */
    setDepths() {
        this.r2a0_walls.setDepth(1);
        this.r2a0_floor.setDepth(1);
	this.wall_info_2.setDepth(2);
        this.character_north.setDepth(50);
        this.character_east.setDepth(50);
        this.character_south.setDepth(50);
        this.character_west.setDepth(50);
        this.paper.setDepth(50);
        this.E_KeyImg.setDepth(49);
        this.r1_map.setDepth(100);
	//        this.paper_stack.setDepth(2);
        this.notebook.setDepth(100);
        this.help_menu.setDepth(100);
        this.SreBox.setDepth(2);
        this.ScfBox.setDepth(2);
        this.IncStmBox.setDepth(2);
        this.BalShtBox.setDepth(2);
	this.returnDoor.setDepth(2);
    }

    /* setScales
     *
     * Scales the size of each object.
     */
    setScales() {
        this.r2a0_floor.scaleX = 1.98;
        this.r2a0_floor.scaleY = 0.95;
        this.wall_info_2.setScale(0.75);
        this.E_KeyImg.setScale(0.4);
        this.notebook.setScale(0.75);
        this.r1_map.setScale(0.75);
	//        this.paper_stack.setScale(1.1);
        this.SreBox.setScale(0.9);
        this.ScfBox.setScale(0.9);
        this.IncStmBox.setScale(0.9);
        this.BalShtBox.setScale(0.9);
	//        this.paper_stack.setScale(0.35);
        this.character_north.setScale(3);
        this.character_south.setScale(3);
        this.character_west.setScale(3);
        this.character_east.setScale(3);
	this.returnDoor.setScale(1.5);
    }

    /* setRotations
     *
     * Sets the rotation that each object sits at.
     */
    setRotations() {
        this.SreBox.rotation = (3*3.14/2);
        this.IncStmBox.rotation = 3.14/2;
        this.BalShtBox.rotation = (3*3.14/2);
        this.ScfBox.rotation = 3.14/2;
        this.returnDoor.angle = 270;
    }

    /* createInteractionZones
     *
     * Sets the area that you can interact with each object
     */
    createInteractionZones() {
        this.graphics = this.add.graphics({fillStyle: {color: 0xFFFFFF, alpha: 0.0}});

        this.top_mid_info = new Phaser.Geom.Rectangle(650,150,240,150);
        this.graphics.fillRectShape(this.top_mid_info);

        this.box_1_zone = new Phaser.Geom.Rectangle(1200,75,200,200);
        this.graphics.fillRectShape(this.box_1_zone);

        this.box_2_zone = new Phaser.Geom.Rectangle(1200,325,200,200);
        this.graphics.fillRectShape(this.box_2_zone);

        this.box_3_zone = new Phaser.Geom.Rectangle(1200,650,200,200);
        this.graphics.fillRectShape(this.box_3_zone);

	// return door located at 113,385
	this.returnDoor = new Phaser.Geom.Rectangle(113,320,100,100);
        this.graphics.fillRectShape(this.returnDoor);
    }

    /* assignKeybinds
     *
     * Sets keybinds to the keyboard
     */
    assignKeybinds() {
        //KEYBOARD INPUT
        this.key_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.key_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.key_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.key_E = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.key_Q = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.key_M = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        this.key_B = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
        this.key_U = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.U);
        this.key_1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        this.key_2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
        this.key_3 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);
        this.key_R = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.key_H = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);


        this.key_Right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.key_Left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);

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

    /* checkInteractValidity
     *
     * Checks to see if the character can interact with the object
     */

    checkInteractValidity() {
        if (Phaser.Geom.Rectangle.ContainsPoint(this.top_mid_info, this.character_north)){
            this.E_KeyImg.x = this.character_north.x+75;
            this.E_KeyImg.y = this.character_north.y;
            this.E_KeyImg.alpha = 1.0;
            if (this.key_E.isDown) {
		this.activityLocked.alpha = 1.0;
            }
	}

	else if (Phaser.Geom.Rectangle.ContainsPoint(this.exitDoor, this.character_north)){
            this.E_KeyImg.x = this.character_north.x+75;
            this.E_KeyImg.y = this.character_north.y;
            this.E_KeyImg.alpha = 1.0;
            if (this.key_E.isDown) {
		    this.scene.start("BB_ActRoom");
            }
        } else {
            this.hideActivities();
            this.E_KeyImg.alpha = 0.0;
        }
    }



    /* setCharacterAlpha
     *
     * Sets the alpha of each facing of the character
     * Call this method with the argument as (N,E,S,W)
     */
    setCharacterAlpha() {
        this.character_north.alpha = arguments[0];
        this.character_east.alpha = arguments[1];
        this.character_south.alpha = arguments[2];
        this.character_west.alpha = arguments[3];
    }

    /* movePlayer
     *
     *
     */
    /*
    movePlayer() {
        //setCharacterAlpha is in helper.js and arguments go N,E,S,W
        this.setCharacterAlpha(0,0,1,0);


        //Character moves up
        if(this.key_W.isDown && characterMoveable == true) {
            if(this.character_north.y > 185){
                this.character_north.y -= 5;
                this.character_east.y -= 5;
                this.character_south.y -= 5;
                this.character_west.y -= 5;

                this.setCharacterAlpha(1,0,0,0);



            }
            //Character moves left
        } if (this.key_A.isDown && characterMoveable == true) {
            if(this.character_west.x > 210){
                this.character_west.x -= 5;
                this.character_east.x -= 5;
                this.character_south.x -= 5;
                this.character_north.x -= 5;

                this.setCharacterAlpha(0,0,0,1);
            }

        }
        //Character moves down
        if (this.key_S.isDown && characterMoveable == true) {
            if(this.character_south.y < 670){
                this.character_south.y += 5;
                this.character_east.y += 5;
                this.character_north.y += 5;
                this.character_west.y += 5;

                this.setCharacterAlpha(0,0,1,0);
            }

        }
        //Character moves right
        if (this.key_D.isDown && characterMoveable == true) {
            if(this.character_east.x < 1325){
                this.character_east.x += 5;
                this.character_north.x += 5;
                this.character_south.x += 5;
                this.character_west.x += 5;

                this.setCharacterAlpha(0,1,0,0);
            }
        }
    }
    */

    moveSprite(isPlayer) {
        //setCharacterAlpha is in helper.js and arguments go N,E,S,W
	if (isPlayer == true) { 
	    this.setCharacterAlpha(0,0,1,0); 
	    this.paper.alpha = 0;
	}
	else { 
	    this.setCharacterAlpha(0,0,0,0); 
	    this.paper.alpha = 1;
	}

        //Character moves up
        if(this.key_W.isDown) {// && characterMoveable == true) {
            if(this.character_north.y > 185){
                this.character_north.y -= 5;
                this.character_east.y -= 5;
                this.character_south.y -= 5;
                this.character_west.y -= 5;
		this.paper.y -= 5;

                if (isPlayer) { this.setCharacterAlpha(1,0,0,0); }
            }
        } 

	//Character moves left
	if (this.key_A.isDown) { // && characterMoveable == true) {
            if(this.character_west.x > 210){
                this.character_west.x -= 5;
                this.character_east.x -= 5;
                this.character_south.x -= 5;
                this.character_north.x -= 5;
		this.paper.x -= 5;

                if (isPlayer) { this.setCharacterAlpha(0,0,0,1); }
            }
        }

        //Character moves down
        if (this.key_S.isDown) {// && characterMoveable == true) {
            if(this.character_south.y < 670){
                this.character_south.y += 5;
                this.character_east.y += 5;
                this.character_north.y += 5;
                this.character_west.y += 5;
		this.paper.y += 5;

                if (isPlayer) { this.setCharacterAlpha(0,0,1,0); }
            }
        }

        //Character moves right
        if (this.key_D.isDown) { // && characterMoveable == true) {
            if(this.character_east.x < 1325){
                this.character_east.x += 5;
                this.character_north.x += 5;
                this.character_south.x += 5;
                this.character_west.x += 5;
		this.paper.x += 5;

                if (isPlayer) { this.setCharacterAlpha(0,1,0,0); }
            }
        }
    }

    /* movePaper
     *
     * makes the paper moveable in the test activity
     */
    /*
    movePaper(moveThisPaper) {
        if(this.key_W.isDown && this.paperMoveable == true && moveThisPaper.y > 75) {
            moveThisPaper.y -= 12;
        } if (this.key_A.isDown && this.paperMoveable == true && moveThisPaper.x > 50) {
            moveThisPaper.x -= 12;
        } if (this.key_S.isDown && this.paperMoveable == true && moveThisPaper.y < 800) {
            moveThisPaper.y += 12;
        } if (this.key_D.isDown && this.paperMoveable == true && moveThisPaper.x < 1400) {
            moveThisPaper.x += 12;
        }
    }
    */

    /*loadExit() {
        if (this.paperCount >= 4) {
            this.congrats.alpha = 1;
            this.congrats.setScale(1.3);
            this.congrats.depth = 200;

            this.hole = this.add.image(768, 432, 'hole');
            this.holeOpened = true;
        }
    }*/

    /* quitQuiz
     *
     * Allows the user to quit the quiz
     */
    /*quitQuiz() {
        //console.log("e");
        //this.loadExit();
        //this.papers_moved = false;
        //this.placements0.setVisible(false);
        //this.placements1.setVisible(false);
        //this.placements2.setVisible(false);
        this.pressr.setVisible(false);
        //this.incomeStatementText.setVisible(false);
        //this.retainedEarningsText.setVisible(false);
        //this.balanceSheetText.setVisible(false);


        //this.paper.alpha = 0;
        //this.paperTwo.alpha = 0;
        //this.paperThree.alpha = 0;
        //this.paper.setVisible(false);
        //this.paperTwo.setVisible(false);
        //this.paperThree.setVisible(false);
        //this.quizActive = false;
        //this.activatedQuiz = false;
        this.background.alpha = 1.0;
        this.character_north.alpha = 1.0;
        this.character_east.alpha = 1.0;
        this.character_south.alpha = 1.0;
        this.character_west.alpha = 1.0;
        this.E_KeyImg.alpha = 1.0;
        //this.cardboard_box_1.setScale(0.39);
        //this.cardboard_box_2.setScale(0.39);
        //this.cardboard_box_3.setScale(0.39);
        //this.paper_stack.setScale(0.35);
        //this.paper_stack.x = 1215;
        //this.paper_stack.setVisible(true);
        //this.cardboard_box_1.x = 1310;
        //this.cardboard_box_2.x = 1310;
        //this.cardboard_box_3.x = 1310;
        this.cardboard_box_1.y = 320;
        this.cardboard_box_2.y = 432;
        this.cardboard_box_3.y = 530;
        this.wall_info_1.alpha = 1;
        this.wall_info_2.alpha = 1;
        this.wall_info_3.alpha = 1;
        this.wall_info_4.alpha = 1;
        this.wall_info_5.alpha = 1;
        this.wall_info_6.alpha = 1;
        this.floor3.scaleX = 1.0;
        this.floor3.scaleY = 1.0;
        this.paper_stack.x = 1215;
        this.paper_stack.y = 432;
        this.paperCount = 1;
        this.paperMoveable = false;
	this.returnDoor.x += 40;

        this.quizActive = false;
        this.characterMoveable = true;
        this.incomeStatement.alpha = 0.0;
        this.balanceSheet.alpha = 0.0;
        this.retainedEarnings.alpha = 0.0;
        this.unlocked = true;
        document.getElementById("background").volume = 1;

    }*/

    /* activateQuiz
     *
     * Method that starts the quiz
     */
    activateQuiz() {
        document.getElementById("background").volume = 0.2;
	//        this.paper_stack.setVisible(true);

        this.paperMoveable = true;
        this.paperCount = 1;
        this.loadQuizImages();
        this.updateCorrectImage();

        if(this.papers_moved == false) {
	    //            this.paper_stack.x -= 1025;
	    //            this.paper_stack.y -= 275;
            this.papers_moved = true;
        }

	this.paper = this.add.image(768, 432, 'paper');
	this.paperTwo = this.add.image(768, 423, 'paper');
	this.paperThree = this.add.image(768, 432, 'paper');

	this.paperTwo.setVisible(false);
	this.paperThree.setVisible(false);

        this.paper.setInteractive();
        this.paper.alpha = 1;
        this.paper.setDepth(100);
        this.paperTwo.setDepth(100);
        this.paperThree.setDepth(100);

        this.background.alpha = 0.0;
        this.character_north.alpha = 0.0;
        this.character_east.alpha = 0.0;
        this.character_south.alpha = 0.0;
        this.character_west.alpha = 0.0;
        this.E_KeyImg.alpha = 0.0;
        this.cardboard_box_1.setScale(1.1);
        this.cardboard_box_2.setScale(1.1);
        this.cardboard_box_3.setScale(1.1);
	//        this.paper_stack.setScale(1.0);
        this.cardboard_box_1.x = 1350;
        this.cardboard_box_2.x = 1350;
        this.cardboard_box_3.x = 1350;
        this.cardboard_box_1.y = 150;
        this.cardboard_box_2.y = 450;
        this.cardboard_box_3.y = 750;
        this.r2a0_floor.scaleX = 1.5;
        this.r2a0_floor.scaleY = 2.0;

        this.box1_frame = new Phaser.Geom.Rectangle(this.cardboard_box_1.x, this.cardboard_box_1.y, 240,240);
        this.graphics.fillRectShape(this.box1_frame);


        this.box2_frame = new Phaser.Geom.Rectangle(this.cardboard_box_2.x,this.cardboard_box_2.y,240,200);
        this.graphics.fillRectShape(this.box2_frame);

        this.box3_frame = new Phaser.Geom.Rectangle(this.cardboard_box_3.x,this.cardboard_box_3.y,240,200);
        this.graphics.fillRectShape(this.box3_frame);

        this.paper.on('pointerdown', function(pointer, localX, localY, event) {
                console.log("click");
                this.alpha = 0;

                });
    }

    /* quitInteraction
     *
     * Sets the alphas to 0 so that the interaction is quit.
     */
    quitInteraction() {
        this.r1_map.alpha = 0.0;
        this.notebook.alpha = 0.0;
        this.hideActivities();
        this.activityLocked.alpha = 0.0;
        this.character_north.alpha = 1.0;
        this.character_east.alpha = 1.0;
        this.character_south.alpha = 1.0;
        this.character_west.alpha = 1.0;
        this.characterMoveable = true;
        this.help_menu.alpha = 0.0;
       // this.activatedQuiz = false;
        //if (this.quizActive == true) {
          //  this.quitQuiz();
        //}
        //this.congrats.setVisible(false);
    }


    hideInteractionBoxes() {

    }

    /* hideActivities
     *
     * Sets the alphas to the activities to 0 so that they are hidden.
     */
    hideActivities() {
        this.activityLocked.alpha = 0.0;
    }

    /* checkCorrectPaperOne
     *
     * Checks to see if the first paper is in the correct box.
     */
    checkCorrectPaperOne() {
        if(this.activatedQuiz == true) {
            if (this.key_R.isDown) {
                this.incomeStatement.setVisible(true);
            }
            else
                this.incomeStatement.setVisible(false);
            //THE RIGHT BOX
            if (Phaser.Geom.Rectangle.ContainsPoint(this.box_1_zone, this.paper)) {
                document.getElementById("correct").play();
                this.paper.setVisible(false);
                this.paperTwo.setVisible(true);
                this.paperTwo.setInteractive();
                this.paperCount++;
                this.updateCorrectImage();

            } else if (Phaser.Geom.Rectangle.ContainsPoint(this.box_2_zone, this.paper) && this.paperCount == 1) {
                document.getElementById("wrong").play();
                this.paper.x = this.paper_stack.x;
                this.paper.y = this.paper_stack.y + 600;
                this.updateCorrectImage();

            } else if (Phaser.Geom.Rectangle.ContainsPoint(this.box_3_zone, this.paper) && this.paperCount == 1) {
                document.getElementById("wrong").play();
                this.paper.x = this.paper_stack.x;
                this.paper.y = this.paper_stack.y + 600;
                this.updateCorrectImage();
            }
        }
    }

    /* checkCorrectPaperTwo
     *
     * Checks to see if the second paper is in the correct box.
     */
    checkCorrectPaperTwo() {
        this.incomeStatement.setVisible(false);
        if (this.key_R.isDown) {
            this.retainedEarnings.setVisible(true);
        } else
            this.retainedEarnings.setVisible(false);

        if (Phaser.Geom.Rectangle.ContainsPoint(this.box_2_zone, this.paperTwo) && this.paperCount == 2) {
            document.getElementById("correct").play();
            this.paperTwo.setVisible(false);
            this.paperThree.setVisible(true);
            this.paperThree.setInteractive();
            this.paperCount++;
            this.updateCorrectImage();

        } else if (Phaser.Geom.Rectangle.ContainsPoint(this.box_1_zone, this.paperTwo) && this.paperCount == 2) {
            document.getElementById("wrong").play();
            this.paperTwo.x = this.paper_stack.x;
            this.paperTwo.y = this.paper_stack.y + 600;
            this.updateCorrectImage();

        } else if (Phaser.Geom.Rectangle.ContainsPoint(this.box_3_zone, this.paperTwo) && this.paperCount == 2) {
            document.getElementById("wrong").play();
            this.paperTwo.x = this.paper_stack.x;
            this.paperTwo.y = this.paper_stack.y + 600;
            this.updateCorrectImage();

            //this.cardboard_box_3.setVisible(true);
        }
        //this.updateCorrectImage();
    }

    /* checkCorrectPaperThree
     *
     * Checks to see if the third paper is in the correct box.
     */
    checkCorrectPaperThree() {
        this.retainedEarnings.setVisible(false);
        if (this.key_R.isDown) {
            this.balanceSheet.setVisible(true);
        }	else
            this.balanceSheet.setVisible(false);

        if (Phaser.Geom.Rectangle.ContainsPoint(this.box_3_zone, this.paperThree) && this.paperCount == 3) {
            document.getElementById("correct").play();
            this.paperThree.setVisible(false);
            this.paperCount++;
            this.quitQuiz();
        } else if (Phaser.Geom.Rectangle.ContainsPoint(this.box_1_zone, this.paperThree) && this.paperCount == 3) {
            document.getElementById("wrong").play();
            this.paperThree.x = this.paper_stack.x;
            this.paperThree.y = this.paper_stack.y + 600;


        } else if (Phaser.Geom.Rectangle.ContainsPoint(this.box_2_zone, this.paperThree) && this.paperCount == 3) {
            document.getElementById("wrong").play();
            this.paperThree.x = this.paper_stack.x;
            this.paperThree.y = this.paper_stack.y + 600;
        }
    }

    /* loadQuizImages
     *
     * Loads the images into the quiz Activity
     */
    loadQuizImages(){
        this.pressr = this.add.image(650, 40, 'pressr');
        this.pressr.setScale(.8);

	this.incomeStatement = this.add.image(675, 350, 'incomeStatement');
        this.incomeStatement.setVisible(false);
        this.incomeStatement.setDepth(500);

        this.balanceSheet = this.add.image(675, 410, 'balanceSheet');
        this.balanceSheet.setVisible(false);
        this.balanceSheet.setDepth(500);
        this.balanceSheet.setScale(.85);

        this.retainedEarnings = this.add.image(675, 210, 'retainedEarnings');
        this.retainedEarnings.setVisible(false);
        this.retainedEarnings.setDepth(500);

    }

    /* updateCorrectImage
     *
     * Updates the image in the quiz that tells the user how many they have got right.
     */
    /*updateCorrectImage() {
        //console.log(this.paperCount);
        if (this.paperCount == 1) {
            this.placements0.setVisible(true);
            this.placements1.setVisible(false);
            this.placements2.setVisible(false);
        }	else if (this.paperCount == 2) {
            this.placements0.setVisible(false);
            this.placements1.setVisible(true);
            this.placements2.setVisible(false);
        }	else if (this.paperCount == 3) {
            this.placements0.setVisible(false);
            this.placements1.setVisible(false);
            this.placements2.setVisible(true);
        }

    }*/





    /* helpMenu
     *
     * Sets the alpha of the help menu to 1 so that it is visible
     */
    helpMenu() {
        this.help_menu.alpha = 1.0;
        this.helpOpen = true;
    }
}
