class buildBlockAct0 extends Phaser.Scene {

    // roomProgress coming in first time is 2200

    constructor() {
	super("BuildBlock_Act0");
        this.quizActive = true;
        //this.paperMoveable = false;
        this.helpOpen = false;
        this.paperCount = 1;
        this.maxPaper = 3;
        this.counter = 0;
        this.musicToggle = false;
        document.getElementById("background").volume = 0.8;
    }
    //load assets in preload()

    preload() {
        this.loadAssets();
        this.load.spritesheet('coin', 'assets/Coin/coin-sprite-png-2.png', {frameWidth: 200, frameHeight: 250, endFrame: 5});
    }

    //when scene is created
    create() {
        this.createImages();
        this.createCoins();
        this.setAlphas();
        this.setDepths();
        this.setScales();
        this.setRotations();
        this.createInteractionZones();
        this.assignKeybinds();
	//        this.imagesDraggable();
    
        this.roomLabel = this.add.text(650, 6, "Building Blocks Sorting Room", {
            font: "24px arial",
            color: "#FFFFFF",
            align: 'left',
            fontWeight: 'bold',
        });
        this.displayCoin();
        this.displayProfile();
    }

    update(delta) {
	// This runs all the time in a game loop!!

	//	console.log("update: roomProgress="+ roomProgress);

    if (Phaser.Input.Keyboard.JustDown(this.key_N)) {
        
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

	if (roomProgress <= 2200) { 
	    this.quizActive = true; 
	    //	    this.paperCount = 1;
	    this.paper.alpha = 1;
	    this.setCharacterAlpha(0,0,0,0);
	}
	else { 
	    this.quizActive = false; 
	    this.paper.alpha = 0;
	    this.setCharacterAlpha(0,0,1,0);
	}


            if (this.key_R.isDown) {
		//		console.log("R key: paper="+this.paperCount);
		if (this.paperCount == 1) { 
		    this.incomeStatement.alpha = 0; 
		    this.balanceSheet.alpha = 0; 
		    this.retainedEarnings.alpha = 1; 
		}
		else if (this.paperCount == 2) { 
		    this.incomeStatement.alpha = 1; 
		    this.balanceSheet.alpha = 0; 
		    this.retainedEarnings.alpha = 0; 
		}
		else if (this.paperCount == 3) { 
		    this.incomeStatement.alpha = 0; 
		    this.balanceSheet.alpha = 1; 
		    this.retainedEarnings.alpha = 0; 
		}
        }
	    else {
		    this.incomeStatement.alpha = 0; 
		    this.balanceSheet.alpha = 0; 
		    this.retainedEarnings.alpha = 0; 
	    }

	if (this.key_Q.isDown) {
	    this.activityLocked.alpha = 0.0;
	    this.top_mid_panel.alpha = 0.0;
	    this.r1_map.alpha = 0;
	    this.r1_notebook.alpha = 0;
	    this.help_menu.alpha = 0.0;
	    this.helpOpen = false;
	}

        if (Phaser.Input.Keyboard.JustDown(this.key_M)) {
            if (this.r1_map.alpha == 0.0) {
                this.r1_map.alpha = 1.0;
                this.characterMoveable = false;
                this.character_north.alpha = 0.0;
                this.character_east.alpha = 0.0;
                this.character_south.alpha = 0.0;
                this.character_west.alpha = 0.0;
	            this.paper.alpha = 0.0;
            }
            else {
                this.activityLocked.alpha = 0.0;
                this.top_mid_panel.alpha = 0.0;
                this.r1_map.alpha = 0.0;
                this.r1_notebook.alpha = 0.0;
                this.help_menu.alpha = 0.0;
                this.helpOpen = false;   
            }
        }

        if (Phaser.Input.Keyboard.JustDown(this.key_B)) {
            if (this.r1_notebook.alpha == 0.0) {
                this.r1_notebook.alpha = 1.0;
                this.characterMoveable = false;
                this.character_north.alpha = 0.0;
                this.character_east.alpha = 0.0;
                this.character_south.alpha = 0.0;
                this.character_west.alpha = 0.0;
	            this.paper.alpha = 0.0;
            }
            else {
                this.activityLocked.alpha = 0.0;
                this.top_mid_panel.alpha = 0.0;
                this.r1_map.alpha = 0.0;
                this.r1_notebook.alpha = 0.0;
                this.help_menu.alpha = 0.0;
                this.helpOpen = false;
            }
        }

        if (Phaser.Input.Keyboard.JustDown(this.key_H)) {
            if (this.help_menu.alpha == 0.0) {
                this.helpMenu();
                this.characterMoveable = false;
                this.character_north.alpha = 0.0;
                this.character_east.alpha = 0.0;
                this.character_south.alpha = 0.0;
                this.character_west.alpha = 0.0;
	            this.paper.alpha = 0.0;
            }
            else {
                this.activityLocked.alpha = 0.0;
                this.top_mid_panel.alpha = 0.0;
                this.r1_map.alpha = 0.0;
                this.r1_notebook.alpha = 0.0;
                this.help_menu.alpha = 0.0;
                this.helpOpen = false;
            }
        }

        if (this.quizActive == false) {
	    // character visible (quiz is done)
	    //	    console.log("moving accacio");
            this.moveSprite(true);
        }
	else {
	    // paper visible (quiz is active)
	    //	    console.log("moving paper");
	    this.moveSprite(false);
	    //	    this.checkPaper(this.paperCount);
	}
	this.checkInteractValidity();
	if (this.paperCount > this.maxPaper) {
	    //	    console.log("paper > max");
	    if (roomProgress < 2299) { roomProgress = 2299; }
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
	this.load.image('top_mid_panel', 'assets/Room2Act0/topmidpanel_t.png');
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
        this.load.image('r1_map', 'assets/featNotAvail.png');
        this.load.image('r1_notebook', 'assets/featNotAvail.png');
        this.load.image('activityLocked', 'assets/activityLocked.png');
        this.load.image('help_menu', 'assets/help_menu.png');
        this.load.image('incomeStatement' , 'assets/Documents/incomeStatement.png');
        this.load.image('balanceSheet', 'assets/Documents/balanceSheet.png');
        this.load.image('retainedEarnings' , 'assets/Documents/retainedEarnings.png');
        this.load.image('singleCoin', 'assets/Coin/singleCoin.png');
        this.load.image('profile','assets/character_south.png');
    }

    /* createImages
     *
     * Adds the image to the game board
     */
    createImages() {
        this.e_pressed = false;
        this.papers_moved = false;
	    this.top_mid_panel = this.add.image(768, 432, 'top_mid_panel');
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
        this.r1_notebook = this.add.image(768, 432, 'r1_notebook');
        this.activityLocked = this.add.image(768, 432, 'activityLocked');
        this.help_menu = this.add.image(768, 432, 'help_menu');
        this.hole = this.add.image(768, 432, 'hole');
        this.incomeStatement = this.add.image(768, 432, 'incomeStatement');
        this.balanceSheet = this.add.image(768, 432, 'balanceSheet');
        this.retainedEarnings = this.add.image(768, 432, 'retainedEarnings');
        this.countCoin = this.add.image(40, 230, 'singleCoin');
        this.profile = this.add.image(40,150,'profile');
    }

    /* setAlphas
     *
     * sets the alphas to to items in the game to zero so they are not visible at the beginning.
     */
    setAlphas() {
        this.top_mid_panel.alpha = 0.0;
        this.r1_map.alpha = 0.0;
        this.r1_notebook.alpha = 0.0;
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
        this.incomeStatement.alpha = 0;
        this.balanceSheet.alpha = 0;
        this.retainedEarnings.alpha = 0;
        //this.coin0.alpha = 0.0;
        this.coinHead.alpha = 0.0;
        this.countCoin.alpha = 1.0;
    this.profile.alpha = 0.0;
    }

    /* setDepths
     *
     * Sets the depth of each object on the screen.
     */
    setDepths() {
        this.r2a0_walls.setDepth(0);
        this.r2a0_floor.setDepth(1);
	this.wall_info_2.setDepth(2);
        this.character_north.setDepth(50);
        this.character_east.setDepth(50);
        this.character_south.setDepth(50);
        this.character_west.setDepth(50);
        this.paper.setDepth(50);
        this.E_KeyImg.setDepth(50);
        this.r1_map.setDepth(100);
        this.paper_stack.setDepth(-1);
        this.r1_notebook.setDepth(100);
        this.help_menu.setDepth(100);
        this.top_mid_panel.setDepth(100);
        this.activityLocked.setDepth(100);
        this.balanceSheet.setDepth(100);
        this.incomeStatement.setDepth(100);
        this.retainedEarnings.setDepth(100);
        this.SreBox.setDepth(2);
        this.ScfBox.setDepth(2);
        this.IncStmBox.setDepth(2);
        this.BalShtBox.setDepth(2);
	this.returnDoor.setDepth(2);
        this.countCoin.setDepth(0);
    this.profile.setDepth(0);
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
        this.r1_notebook.setScale(0.75);
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
        //this.coin0.setScale(0.5);
        this.coinHead.setScale(0.5);
        this.countCoin.setScale(0.25);
        this.profile.setScale(1.5);
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

        this.top_mid_info = new Phaser.Geom.Rectangle(670,100,170,100);
        this.graphics.fillRectShape(this.top_mid_info);

        this.sre_box_zone = new Phaser.Geom.Rectangle(260,100,140,200);
        this.graphics.fillRectShape(this.sre_box_zone);

        this.scf_box_zone = new Phaser.Geom.Rectangle(1200,100,140,200);
        this.graphics.fillRectShape(this.scf_box_zone);

        this.incstm_box_zone = new Phaser.Geom.Rectangle(1170,570,140,200);
        this.graphics.fillRectShape(this.incstm_box_zone);

        this.balsht_box_zone = new Phaser.Geom.Rectangle(260,600,140,200);
        this.graphics.fillRectShape(this.balsht_box_zone);

	// return door located at 113,385
	this.returnDoorZone = new Phaser.Geom.Rectangle(120,355,100,95);
        this.graphics.fillRectShape(this.returnDoorZone);
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
        this.key_N = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);

        this.key_Right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.key_Left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);

    }

    /* imagesDraggable
     *
     * Makes an image draggable
     */
    /*
    imagesDraggable() {
        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

                gameObject.x = dragX;
                gameObject.y = dragY;

                });

    }
    */

    /* checkInteractValidity
     *
     * Checks to see if the character can interact with the object
     */

    checkInteractValidity() {
        if (Phaser.Geom.Rectangle.ContainsPoint(this.top_mid_info, this.character_north)) {
            this.E_KeyImg.x = this.character_north.x+75;
            this.E_KeyImg.y = this.character_north.y;
            this.E_KeyImg.alpha = 1.0;
            if (this.key_E.isDown) {
		this.top_mid_panel.alpha = 1.0;
            }
	} else if (Phaser.Geom.Rectangle.ContainsPoint(this.returnDoorZone, this.character_north)){
            this.E_KeyImg.x = this.character_north.x+75;
            this.E_KeyImg.y = this.character_north.y;
            this.E_KeyImg.alpha = 1.0;
            if (this.key_E.isDown) {
		this.scene.start("BB_ActRoom");
            }
        } else if (Phaser.Geom.Rectangle.ContainsPoint(this.sre_box_zone, this.paper)) {
	    this.E_KeyImg.x = this.character_north.x+75;
	    this.E_KeyImg.y = this.character_north.y;
	    this.E_KeyImg.alpha = 1.0;
	    if (this.key_E.isDown) {
		if (this.paperCount == 1) {
		    this.paperCount = 2;
		    document.getElementById("correct").play();
		} else { 
		    document.getElementById("wrong").play(); 
		}
		this.centerSprite();
	    }
        } else if (Phaser.Geom.Rectangle.ContainsPoint(this.scf_box_zone, this.paper)) {
	    this.E_KeyImg.x = this.character_north.x+75;
	    this.E_KeyImg.y = this.character_north.y;
	    this.E_KeyImg.alpha = 1.0;
	    if (this.key_E.isDown) {
		if (this.paperCount == 4) {
		    this.paperCount = 5;
		    document.getElementById("correct").play();
		} else { 
		    document.getElementById("wrong").play(); 
		}
		this.centerSprite();
	    }
        } else if (Phaser.Geom.Rectangle.ContainsPoint(this.incstm_box_zone, this.paper)) {
	    this.E_KeyImg.x = this.character_north.x+75;
	    this.E_KeyImg.y = this.character_north.y;
	    this.E_KeyImg.alpha = 1.0;
	    if (this.key_E.isDown) {
		if (this.paperCount == 2) {
		    this.paperCount = 3;
		    document.getElementById("correct").play();
		} else { 
		    document.getElementById("wrong").play(); 
		}
		this.centerSprite();
	    }
        } else if (Phaser.Geom.Rectangle.ContainsPoint(this.balsht_box_zone, this.paper)) {
	    this.E_KeyImg.x = this.character_north.x+75;
	    this.E_KeyImg.y = this.character_north.y;
	    this.E_KeyImg.alpha = 1.0;
	    if (this.key_E.isDown) {
		if (this.paperCount == 3) {
		    this.paperCount = 4;
		    document.getElementById("correct").play();
		} else { 
		    document.getElementById("wrong").play(); 
		}
		this.centerSprite();
	    }
	}
	else {
            this.hideActivities();
	    this.activityLocked.alpha = 0;
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


    hideInteractionBoxes() {

    }

    /* hideActivities
     *
     * Sets the alphas to the activities to 0 so that they are hidden.
     */
    hideActivities() {
	    this.activityLocked.alpha = 0.0;
	    this.top_mid_panel.alpha = 0.0;
	    /*this.r1_map.alpha = 0;
	    this.r1_notebook.alpha = 0;
	    this.help_menu.alpha = 0.0;
	    this.helpOpen = false;*/
    }

    centerSprite() {
	//	console.log("jump: ");
	this.paper.x = 768;
	this.paper.y = 432;
	this.character_north.x = 768;
	this.character_north.y = 432;
	this.character_south.x = 768;
	this.character_south.y = 432;
	this.character_east.x = 768;
	this.character_east.y = 432;
	this.character_west.x = 768;
	this.character_west.y = 432;
    }

    createCoins() {
        this.coinfig1 = {
            key: 'coinTurn',
            frames: this.anims.generateFrameNumbers('coin', { start: 0, end: 5, first: 0}),
            frameRate: 6,
            repeat: -1
        };
        this.coinfig2 = {
            key: 'coinCollect',
            frames: this.anims.generateFrameNumbers('coin', { start: 0, end: 5, first: 0}),
            frameRate: 30,
            repeat: 1,
            hideOnComplete: true
        };

        this.anims.create(this.coinfig1);
        this.anims.create(this.coinfig2);

        this.coinHead = this.add.sprite(this.character_north.x, this.character_north.y-75, 'coin');
        //this.coin0 = this.add.sprite(289, 446, 'coin');
        //this.coin0.anims.play('coinTurn');

    }

    collectCoin(int) {
        switch(int) {
            case 0:
                this.coin0.alpha = 0.0;
                break;
        }

        this.E_KeyImg.alpha = 0.0;
        this.coinHead.x = this.character_north.x;
        this.coinHead.y = this.character_north.y-125;
        this.coinHead.alpha = 1.0;
        this.coinHead.anims.play('coinCollect');
        document.getElementById("collect").play();
        coinCount++;
        this.updateCoin();
    }

    displayCoin() {
        this.countCoin.alpha = 1.0;
        this.count = this.add.text(70, 220, "x " + coinCount, {
            font: "24px arial",
            color: "#FFFFFF",
            align: 'left',
            fontweight: 'bold',
        });
    }
    
    updateCoin() {
        this.count.setText('x ' + coinCount);
    }

    displayProfile() {
        this.profile.alpha = 1.0;
        this.userName = this.add.text(70,140, localStorage.getItem("playerName"), {
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
    helpMenu() {
        this.help_menu.alpha = 1.0;
        this.helpOpen = true;
    }
}
