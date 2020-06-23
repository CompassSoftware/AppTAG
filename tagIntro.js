class tagIntro extends Phaser.Scene {

    
  constructor() {
    super("TAG_Intro");
    this.quizActive = false;
    this.activatedQuiz = false;
    this.unlocked = false;
    this.paperMoveable = false;
    this.activityOneOpened = false;
    this.helpOpen = false;
    this.musicToggle = false;
    //var player = prompt("Please enter your name", "name");
    //localStorage.setItem("playerName", player);
    this.question1 = true; // To see if players have already answer the question or not.
    this.createProfile();
  }
  //load assets in preload()

  preload() {
    this.loadAssets();
    this.load.spritesheet('coin', 'assets/Coin/coin-sprite-png-2.png', {frameWidth: 200, frameHeight: 250, endFrame: 5});
  }
  /*
  Welcome to The Accounting Game(TAG) Tutorial!
Info Panels like these contain important information and lessons that help you progress through the game. To interact with future panels and activities press the Interact Button ‘E’. If you have not unlocked a panel yet, a message will appear in screen saying “Activity Locked”. These Activities are locked until you read the required information from the Info Panels
*/

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
    this.imagesDraggable();
    this.roomLabel = this.add.text(650, 6, "Game Intro Room", {
        font: "24px arial",
        color: "#FFFFFF",
        align: 'left',
        fontWeight:'bold',
    });
    this.displayCoin();
    this.displayProfile();
  }
    
  update(delta) {
    //TEMPORARY FOR TESTING
    //vvvvvvvvvvvvvvvvvvv//

    if (Phaser.Input.Keyboard.JustDown(this.key_N)) {

        document.getElementById("background").play();
        if (musicToggle == false) {
            document.getElementById("background").play();
            musicToggle = true;
        }
        else if (musicToggle == true) {
            document.getElementById("background").pause();
            musicToggle = false;
        }
    }


    if (Phaser.Input.Keyboard.JustDown(this.key_H)) {
    	if (this.help_menu.alpha == 0.0)
            this.helpMenu();
        else
            this.quitInteraction();

    }

    if (this.activityOneOpened) {
      this.checkNextPage();
    }

    if (this.key_U.isDown && this.unlocked == false) {
      activity1Locked = false;
      activity3Locked = false;
      activity4Locked = false;
      activity5Locked = false;
      activity6Locked = false;
      activity6Complete = true;
      this.unlocked = true;
    }

    if (Phaser.Input.Keyboard.JustDown(this.key_M)) {
      if (this.map.alpha == 0.0) {
        this.map.alpha = 1.0;
        this.characterMoveable = false;
        this.character_north.alpha = 0.0;
        this.character_east.alpha = 0.0;
        this.character_south.alpha = 0.0;
        this.character_west.alpha = 0.0;
      }
      else {
        this.quitInteraction();
      }
    }

    if (Phaser.Input.Keyboard.JustDown(this.key_B)) {
      if (this.notebook.alpha == 0.0) {
        this.notebook.alpha = 1.0;
        this.characterMoveable = false;
        this.character_north.alpha = 0.0;
        this.character_east.alpha = 0.0;
        this.character_south.alpha = 0.0;
        this.character_west.alpha = 0.0;
      }
      else {
          this.quitInteraction();
      }
    }


    if (this.key_Q.isDown && this.quizActive == false) {
      this.quitInteraction();
    }

    if (this.quizActive == true && this.activatedQuiz == false) {
      this.activateQuiz();
      this.activatedQuiz = true;
    }

    if (this.quizActive == true && this.key_Q.isDown && activatedQuiz == true) {
      this.quitQuiz();
      this.activatedQuiz = false;
    }

    if (this.quizActive == false) {
        this.movePlayer();
        this.checkInteractValidity();
    } else {

      if (this.paperCount == 1) {
        this.movePaper(this.paper);
        this.checkCorrectPaperOne();
      } else if (this.paperCount == 2) {
          this.movePaper(this.paperTwo);
          this.checkCorrectPaperTwo();
      } else if (this.paperCount == 3) {
          this.movePaper(this.paperThree);
          this.checkCorrectPaperThree();
        }
      }

    }


/***********************************************************************************************
======================================HELPER METHODS============================================
*///////////////////////////////////////////////////////////////////////////////////////////////
  loadAssets() {
    this.load.image('one_lesson_BG', 'assets/one_lesson_BG.png');
    this.load.image('character_north', 'assets/character_north.png');
    this.load.image('character_east', 'assets/character_east.png');
    this.load.image('character_south', 'assets/character_south.png');
    this.load.image('character_west', 'assets/character_west.png');
    this.load.image('E_KeyImg', 'assets/E_Key.png');
    this.load.image('wall_info_2', 'assets/wall_art.png');
    this.load.image('floor', 'assets/Room0/floor_0.jpg');
    this.load.image('paper', 'assets/single_paper.png');
    this.load.image('map', 'assets/Map/room1.png');
    this.load.image('notebook', 'assets/notebook.png');
    this.load.image('activityLocked', 'assets/activityLocked.png');
    this.load.image('help_menu', 'assets/help_menu.png');
	  this.load.image('approachImg', 'assets/Room0/R0_tutorial.png');
	  this.load.image('tut1', 'assets/Room0/tut1.PNG');
	  this.load.image('hole', 'assets/hole.png');
    this.load.image('featNotAvail', 'assets/featNotAvail.png');
    this.load.image('coinExplain', 'assets/Coin/coinExplain.png');
    this.load.image('singleCoin', 'assets/Coin/singleCoin.png');
    this.load.image('profile','assets/character_south.png');
  }

  createImages() {
    this.e_pressed = false;
    this.papers_moved = false;
    this.background = this.add.image(768, 432, 'one_lesson_BG');
    this.character_north = this.add.image(768, 432, 'character_north');
    this.character_east = this.add.image(768, 432, 'character_east');
    this.character_south = this.add.image(768, 432, 'character_south');
    this.character_west = this.add.image(768, 432, 'character_west');
    this.E_KeyImg = this.add.image(this.character_north.x+40, this.character_north.y+40, 'E_KeyImg');
	  this.approachImg = this.add.image(this.character_north.x+40, this.character_north.y+40, 'approachImg');
    this.wall_info_2 = this.add.image(768, 75, 'wall_info_2');
    this.floor = this.add.image(769, 433, 'floor');
    this.map = this.add.image(768, 432, 'featNotAvail');
    this.notebook = this.add.image(768, 432, 'featNotAvail');
    this.activityLocked = this.add.image(768, 432, 'activityLocked');
    this.help_menu = this.add.image(768, 432, 'help_menu');
	  this.tut1 = this.add.image(768, 432, 'tut1');
	  this.hole = this.add.image(768, 432, 'hole');
      this.coinExplain = this.add.image(768, 432, 'coinExplain');
      this.countCoin = this.add.image(40, 230, 'singleCoin');
      this.profile = this.add.image(40,150,'profile');
      
  }

  setAlphas() {
    this.map.alpha = 0.0;
    this.notebook.alpha = 0.0;
    this.activityLocked.alpha = 0.0;
	  this.approachImg.alpha = 0.0;
    this.help_menu.alpha = 0.0;
	  this.tut1.alpha = 0.0;
    this.E_KeyImg.alpha = 0.0;
	  this.hole.alpha = 0.0;
	if (roomProgress > 0) {
	    this.E_KeyImg.alpha = 1.0;
	    this.hole.alpha = 1.0;
	}
    this.coin0.alpha = 0.0;
    this.coinHead.alpha = 0.0;
    this.coinExplain.alpha = 0.0;
    this.hideActivities();
    this.countCoin.alpha = 0.0;
    this.profile.alpha = 0.0;
  }

  setDepths() {
    this.floor.setDepth(0);
    this.character_north.setDepth(50);
    this.character_east.setDepth(50);
    this.character_south.setDepth(50);
    this.character_west.setDepth(50);
    this.E_KeyImg.setDepth(49);
	  this.approachImg.setDepth(48);
    this.map.setDepth(100);

    this.notebook.setDepth(100);
    this.help_menu.setDepth(100);
	this.tut1.setDepth(99);
	this.hole.setDepth(1);
    this.coinExplain.setDepth(2);
    this.countCoin.setDepth(0);
    this.profile.setDepth(0);
  }

  setScales() {
    this.E_KeyImg.setScale(0.4);
    this.wall_info_2.setScale(0.75);
    this.notebook.setScale(0.75);
    this.map.setScale(0.75);
    this.character_north.setScale(3);
    this.character_south.setScale(3);
    this.character_west.setScale(3);
    this.character_east.setScale(3);
    this.approachImg.setScale(0.4);
    this.tut1.setScale(0.5);
    this.coin0.setScale(0.5);
    this.coinHead.setScale(0.5);
    this.coinExplain.setScale(2.0);
    this.countCoin.setScale(0.25);
    this.profile.setScale(1.5);
  }

  setRotations() {
  }


  createInteractionZones() {
    this.graphics = this.add.graphics({fillStyle: {color: 0xFFFFFF, alpha: 0.0}});
    //TOP ZONES
                                              //xpos ypos x  y
    this.top_mid_info = new Phaser.Geom.Rectangle(650,150,240,150);
    this.graphics.fillRectShape(this.top_mid_info);

	//MIDDLE ZONE

	  this.middle_info = new Phaser.Geom.Rectangle(700,350,200,200);
    this.graphics.fillRectShape(this.middle_info);

    //COIN ZONE
    
    this.coin_collect_zone = new Phaser.Geom.Rectangle(239, 346, 100, 100);
    this.graphics.fillRectShape(this.coin_collect_zone);
  }

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
    this.key_R = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    this.key_H = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);
    this.key_N = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);
  }

  imagesDraggable() {
    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

        gameObject.x = dragX;
        gameObject.y = dragY;

    });

  }

  checkInteractValidity() {
    if (Phaser.Geom.Rectangle.ContainsPoint(this.top_mid_info, this.character_north)) {
      this.E_KeyImg.x = this.character_north.x;
      this.E_KeyImg.y = this.character_north.y-100;
      this.E_KeyImg.alpha = 1.0;
      if (this.key_E.isDown) {
        this.tut1.alpha = 1.0;
        if(this.hole.alpha == 0.0) this.coin0.alpha = 1.0;
//		this.activityOneOpened = true;
//		this.hole.alpha = 1.0;
      }
    } else if (Phaser.Geom.Rectangle.ContainsPoint(this.middle_info, this.character_north))
	{
		if (this.activityOneOpened == true)
		{
			if(this.key_E.isDown){
                if(roomProgress < 1000)
                    roomProgress = 1000;
                document.getElementById("background").play();
                musicToggle = true;

                /* Author: Zack
                Codes below show a way that using prompt to let the player to answer the question.
                When player want to enter the next room, they have to answer the question what's 1 plus 1
                (of course is 2). If they enter the correct answer they will see 'Correct!' and then enter the next room.
                Otherwise, they have to repeatedly enter the answer until they got the right answer.
                 */
                if(this.question1 == true) {
                  this.quiz();
                  if(this.answer == "2") {
                    alert("Correct!");
                    this.scene.start("Course_Intro");
                    this.question1 = false;
                  }  else {
                    alert("Wrong answer, try again!");
                  }
                } else {
                  alert("Question 1 has been already answered.")
                  this.scene.start("Course_Intro");
                }
                //this.scene.start("Course_Intro");
			}

			this.E_KeyImg.x = this.character_north.x;
			this.E_KeyImg.y = this.character_north.y-75;
			this.E_KeyImg.alpha = 1.0;
		}
		else if(this.activityOneOpened == false)
		{
			this.approachImg.x = this.character_north.x;
			this.approachImg.y = this.character_north.y-150;
			this.approachImg.alpha = 1.0;
		}
	}
    else if(Phaser.Geom.Rectangle.ContainsPoint(this.coin_collect_zone, this.character_north)) {
        this.E_KeyImg.x = this.character_north.x;
        this.E_KeyImg.y = this.character_north.y-75;
        if(this.coin0.alpha == 1.0) this.E_KeyImg.alpha = 1.0;
        if(this.key_E.isDown) {
            if(this.coin0.alpha == 1.0) this.collectCoin(0);
            this.coin0.alpha = 0.0;
            this.activityOneOpened = true;
            this.hole.alpha = 1.0;
            this.coinExplain.alpha = 1.0;
        }
    }
    else {
      this.hideActivities();
      this.E_KeyImg.alpha = 0.0;
	  this.approachImg.alpha = 0.0;
	  this.tut1.alpha = 0.0;
      this.coinExplain.alpha = 0.0;
    }
  }


  movePlayer() {

    this.character_north.alpha = 0;
    this.character_east.alpha = 0;
    this.character_west.alpha = 0;
    this.character_south.alpha =1;

    if(this.key_W.isDown && characterMoveable == true) {
	if(this.character_north.y > 185){
      		this.character_north.y -= 5;
          this.character_east.y -= 5;
          this.character_south.y -= 5;
          this.character_west.y -= 5;

          this.character_north.alpha = 1;
          this.character_east.alpha = 0;
          this.character_west.alpha = 0;
          this.character_south.alpha =0;


		}
    } if (this.key_A.isDown && characterMoveable == true) {
      	if(this.character_west.x > 210){
      		this.character_west.x -= 5;
          this.character_east.x -= 5;
          this.character_south.x -= 5;
          this.character_north.x -= 5;

          this.character_west.alpha = 1;
          this.character_east.alpha = 0;
          this.character_north.alpha = 0;
          this.character_south.alpha =0;
	}

    } if (this.key_S.isDown && characterMoveable == true) {
	if(this.character_south.y < 665){
      		this.character_south.y += 5;
          this.character_east.y += 5;
          this.character_north.y += 5;
          this.character_west.y += 5;

          this.character_south.alpha = 1;
          this.character_east.alpha = 0;
          this.character_west.alpha = 0;
          this.character_north.alpha =0;
		}

    } if (this.key_D.isDown && characterMoveable == true) {
      	if(this.character_east.x < 1325){
      		this.character_east.x += 5;
          this.character_north.x += 5;
          this.character_south.x += 5;
          this.character_west.x += 5;

          this.character_east.alpha = 1;
          this.character_north.alpha = 0;
          this.character_west.alpha = 0;
          this.character_south.alpha =0;
		}
    }
  }
  movePaper(moveThisPaper) {
    if(this.key_W.isDown && this.paperMoveable == true) {
      moveThisPaper.y -= 7;
    } if (this.key_A.isDown && this.paperMoveable == true) {
      moveThisPaper.x -= 7;
    } if (this.key_S.isDown && this.paperMoveable == true) {
      moveThisPaper.y += 7;
    } if (this.key_D.isDown && this.paperMoveable == true) {
      moveThisPaper.x += 7;
    }
  }

  quitQuiz() {
    this.papers_moved = false;
    this.quizActive = false;
    this.background.alpha = 1.0;
    this.character_north.alpha = 1.0;
    this.character_east.alpha = 1.0;
    this.character_south.alpha = 1.0;
    this.character_west.alpha = 1.0;
    this.E_KeyImg.alpha = 1.0;
	this.approachImg.alpha = 1.0;



    this.wall_info_2.alpha = 1;
    this.floor.scaleX = 1.0;
    this.floor.scaleY = 1.0;
    this.paperCount = 1;
    this.paperMoveable = false;
  }

  activateQuiz() {
    this.paperMoveable = true;
    this.paperCount = 1;

    if(this.papers_moved == false) {

      this.papers_moved = true;
    }

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
	this.approachImg.alpha = 0.0;
    this.wall_info_2.alpha = 0.0;
    this.floor.scaleX = 1.5;
    this.floor.scaleY = 2.0;

    this.paper.on('pointerdown', function(pointer, localX, localY, event) {
      console.log("click");
      this.alpha = 1;

    });
  }

  quitInteraction() {
    this.map.alpha = 0.0;
    this.notebook.alpha = 0.0;
    this.hideActivities();
    this.activityLocked.alpha = 0.0;
    this.character_north.alpha = 1.0;
    this.character_east.alpha = 1.0;
    this.character_south.alpha = 1.0;
    this.character_west.alpha = 1.0;
    this.characterMoveable = true;
    this.help_menu.alpha = 0.0;
	  this.tut1.alpha = 0.0;
    this.characterMoveable = true;
    this.movePlayer();
  }


  hideInteractionBoxes() {

  }

  hideActivities() {
	   this.activityLocked.alpha = 0.0;
  }

  checkCorrectPaperOne() {
  	if (this.key_R.isDown) {
		//functionality to read paper
  	}
    if (Phaser.Geom.Rectangle.ContainsPoint(this.box_1_zone, this.paper) && this.paperCount == 1) {
      this.paper.setVisible(false);
      this.paperTwo.setVisible(true);
      this.paperTwo.setInteractive();
      this.paperCount++;
    } else if (Phaser.Geom.Rectangle.ContainsPoint(this.box_2_zone, this.paper) && this.paperCount == 1) {
    } else if (Phaser.Geom.Rectangle.ContainsPoint(this.box_3_zone, this.paper) && this.paperCount == 1) {
    }
  }

  checkCorrectPaperTwo() {
  	if (this.key_R.isDown) {
  		//functionality to read paper
  	}
    if (Phaser.Geom.Rectangle.ContainsPoint(this.box_2_zone, this.paperTwo) && this.paperCount == 2) {
      this.paperTwo.setVisible(false);
      this.paperThree.setVisible(true);
      this.paperThree.setInteractive();
      this.paperCount++;
    } else if (Phaser.Geom.Rectangle.ContainsPoint(this.box_1_zone, this.paperTwo) && this.paperCount == 2) {
    } else if (Phaser.Geom.Rectangle.ContainsPoint(this.box_3_zone, this.paperTwo) && this.paperCount == 2) {
    }
  }

  checkCorrectPaperThree() {
  	if (this.key_R.isDown) {
  		//functionality to read paper
  	}
    if (Phaser.Geom.Rectangle.ContainsPoint(this.box_3_zone, this.paperThree) && this.paperCount == 3) {
      this.paperThree.setVisible(false);
      this.paperCount++;
      this.quitQuiz();
    }
  }

  checkNextPage() {
    if (this.activityOneOpened == true && this.key_2.isDown) {
      this.activity1.alpha = 0;
      this.activity1Page2.alpha = 1;
    } else if (this.activityOneOpened == true && this.key_1.isDown) {
      this.activity1.alpha = 1;
      this.activity1Page2.alpha = 0;
    }
  }
    /*Author: Matthew Daniels
     * Method createCoins() is called at the beginning of the page in
     * the create() method. It creates the coins separately to distinguish
     * itself from the regular images. This might later be called on by a
     * createSprites() function if a more vast spritesheet is integrated.
     */
  createCoins() {
      /* This is where you put your animation configurations.
       * The configuration does not have to be named this.config,
       * and can be named however you like.
       * For example, I've named the configuration for the 2 animations
       * implemented, "this.coinfig1" and "this.coinfig2".
      */
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
        /* Here, you will create the animations using the configurations
         * that you created.
         */
        this.anims.create(this.coinfig1);
        this.anims.create(this.coinfig2);
        /* Here, you add the sprite to the game space, just like adding a
         * regular image. Note it is "this.add.sprite" in place of 
         * "this.add.image"
         */
        this.coinHead = this.add.sprite(this.character_north.x, this.character_north.y-75, 'coin');
        this.coin0 = this.add.sprite(289, 446, 'coin');
        /* In the case of the coins that exist in the worldspace,
         * set the animation to play here, and it can always be active,
         * without having to remember to call it later. Note that 
         * this.coinHead is not being called to play an animation.
         */
        this.coin0.anims.play('coinTurn');
  }
/*Author: Matthew Daniels
 * collectCoin() is a function that can be universally called when a "coin"
 * is interacted with by the game, whether that be directly by the player
 * (ex: A coin a player can see and press 'e' to collect)
 * or by an activity that rewards a player a coin.
 */
  collectCoin(int) {
      /* A switch statement is used here specifically for any physical
       * coins (like this.coin0) that exist in the scene.
       * If more coins were added (this.coin1, this.coin2, this.coin3, etc)
       * then you can add cases for the switch to branch to.
       */
      switch(int) {
          case 0:
            this.coin0.alpha = 0.0;
            break;
      }
      /* This is a sequence we play every time collectCoin is called.
       * It does the following:
       * Gets rid of messy 'e' leftover,
       * moves this.coinHead above the player icon,
       * plays a quick animation and sound,
       * ***WILL ADD*** increases the global coin count variable ONCE.
       */
      this.E_KeyImg.alpha = 0.0; 
      this.coinHead.x = this.character_north.x;
      this.coinHead.y = this.character_north.y-125;
      this.coinHead.alpha = 1.0;
      this.coinHead.anims.play('coinCollect');
      document.getElementById("collect").play();
      coinCount++;
      console.log(coinCount);
      this.updateCoin();
  }

  //author: @Zoe
  displayCoin() {
    this.countCoin.alpha = 1.0;
    this.count = this.add.text(70, 220, "x " + coinCount, {
        font: "24px arial",
        color: "#FFFFFF",
        align: 'left', 
        fontweight: 'bold',
        });
  }

  //author: @Zack
  createProfile() {
    var player = prompt("Please enter your name", "name");
    localStorage.setItem("playerName", player);
    this.name = localStorage.getItem("playerName");
    if(this.name.length > 7) {
      this.name = this.name.slice(0,7) + "...";
    }
  }

  //author: @Zack
  displayProfile() {
  this.profile.alpha = 1.0;
  this.add.text(70,140, this.name, {
      font: "24px arial",
      color:'#FFFFFF',
      align:'left',
      fontweight: 'bold',
  });
}

  /*author: @Zack
  A way of using prompt to set a quiz.
   */
  quiz() {
    var input = prompt("1 + 1 = ?","Enter your answer");
    sessionStorage.setItem("answer",input);
    this.answer = sessionStorage.getItem("answer");
    console.log(this.answer);
  }

  updateCoin() {
    this.count.setText('x ' + coinCount);
  }

  helpMenu() {
      this.help_menu.alpha = 1.0;
      this.helpOpen = true;
  }
}
