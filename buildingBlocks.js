class buildingBlocks extends Phaser.Scene {
    constructor() {
        super("Building_Blocks");
        this.room2_quizActive = false;
        this.room2_activatedQuiz = false;
        this.room2_unlocked = false;
        this.room2_paperMoveable = false;
        this.room2_activityOneOpened = false;
        this.room2_activityTwoOpened = false;
        this.room2_activityThreeOpened = false;
        this.room2_activityFourOpened = false;
        this.room2_activityFiveOpened = false;
        this.room2_activitySixOpened = false;
        this.room2_helpOpen = false;
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
        //TEMPORARY FOR TESTING
        //vvvvvvvvvvvvvvvvvvv//
        if (this.room2_key_H.isDown) {
            this.helpMenu();
        }

        if (this.room2_activityOneOpened) {
            this.checkNextPage();
        }
        if (this.room2_activityTwoOpened) {
            this.checkNextPage();
        }
        if (this.room2_activityThreeOpened) {
            this.checkNextPage();
        }
        if (this.room2_activityFourOpened) {
            this.checkNextPage();
        }
        if (this.room2_activityFiveOpened) {
            this.checkNextPage();
        }
        if (this.room2_activitySixOpened) {
            this.checkNextPage();
        }

        if(roomProgress >= 2005)
            this.room2_wall_info_2.alpha = wallAlpha;
        
        if(roomProgress >= 2010)
            this.room2_wall_info_4.alpha = wallAlpha;
        
        if(roomProgress >= 2015)
            this.room2_wall_info_1.alpha = wallAlpha;

        if(roomProgress >= 2020)
            this.room2_wall_info_5.alpha = wallAlpha;
        
        if(roomProgress >= 2025)
            this.room2_wall_info_3.alpha = wallAlpha;
        
        if(roomProgress >= 2030)
            this.room2_wall_info_6.alpha = wallAlpha;
        

        if (roomProgress >= 2030) {
          this.room2_hole_activity.alpha = 1.0;
          this.room2_hole_nextRoom.alpha = 1.0;
        }


        if (this.room2_key_U.isDown) {
            roomProgress = 2030;
            this.room2_unlocked = true;
        }

        if (this.room2_key_M.isDown) {
            this.room2_map.alpha = 1.0;
            this.characterMoveable = false;
            this.room2_character_north.alpha = 0.0;
            this.room2_character_east.alpha = 0.0;
            this.room2_character_south.alpha = 0.0;
            this.room2_character_west.alpha = 0.0;
        }

        if (this.room2_key_B.isDown) {
            this.room2_notebook.alpha = 1.0;
            this.room2_characterMoveable = false;
            this.room2_character_north.alpha = 0.0;
            this.room2_character_east.alpha = 0.0;
            this.room2_character_south.alpha = 0.0;
            this.room2_character_west.alpha = 0.0;
        }

        if (this.room2_key_Q.isDown && this.room2_activatedQuiz == false) {
            this.quitInteraction();
        }

        if (this.room2_quizActive == true && this.room2_activatedQuiz == false && this.room2_key_E.isDown) {
            this.activateQuiz();
            this.room2_activatedQuiz = true;
        }

        if (this.room2_activatedQuiz == false) {
            this.movePlayer();
            this.checkInteractValidity();
            this.room2_characterMoveable = true;
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
        this.load.image('room2_one_lesson_BG', 'assets/one_lesson_BG.png');
        this.load.image('room2_character_north', 'assets/character_north.png');
        this.load.image('room2_character_east', 'assets/character_east.png');
        this.load.image('room2_character_south', 'assets/character_south.png');
        this.load.image('room2_character_west', 'assets/character_west.png');
        this.load.image('room2_activity1A', 'assets/Panels/RoomTwo/PanelOneA.png');
        this.load.image('room2_activity1B', 'assets/Panels/RoomTwo/PanelOneB.png');
        this.load.image('room2_activity1C', 'assets/Panels/RoomTwo/PanelOneC.png');
        this.load.image('room2_activity1D', 'assets/Panels/RoomTwo/PanelOneD.png');
        this.load.image('room2_activity2A', 'assets/Panels/RoomTwo/PanelTwoA.png');
        this.load.image('room2_activity2B', 'assets/Panels/RoomTwo/PanelTwoB.png');
        this.load.image('room2_activity2C', 'assets/Panels/RoomTwo/PanelTwoC.png');
        this.load.image('room2_activity2D', 'assets/Panels/RoomTwo/PanelTwoD.png');
        this.load.image('room2_activity3A', 'assets/Panels/RoomTwo/PanelThreeA.png');
        this.load.image('room2_activity3B', 'assets/Panels/RoomTwo/PanelThreeB.png');
        this.load.image('room2_activity4A', 'assets/Panels/RoomTwo/PanelFourA.png');
        this.load.image('room2_activity4B', 'assets/Panels/RoomTwo/PanelFourB.png');
        this.load.image('room2_activity4C', 'assets/Panels/RoomTwo/PanelFourC.png');
        this.load.image('room2_activity4D', 'assets/Panels/RoomTwo/PanelFourD.png');
        this.load.image('room2_activity4E', 'assets/Panels/RoomTwo/PanelFourE.png');
        this.load.image('room2_activity5A', 'assets/Panels/RoomTwo/PanelFiveA.png');
        this.load.image('room2_activity5B', 'assets/Panels/RoomTwo/PanelFiveB.png');
        this.load.image('room2_activity5C', 'assets/Panels/RoomTwo/PanelFiveC.png');
        this.load.image('room2_activity5D', 'assets/Panels/RoomTwo/PanelFiveD.png');
        this.load.image('room2_activity5E', 'assets/Panels/RoomTwo/PanelFiveE.png');
        this.load.image('room2_activity5F', 'assets/Panels/RoomTwo/PanelFiveF.png');
        this.load.image('room2_activity6A', 'assets/Panels/RoomTwo/PanelSixA.png');
        this.load.image('room2_activity6B', 'assets/Panels/RoomTwo/PanelSixB.png');
        this.load.image('room2_E_KeyImg', 'assets/E_Key.png');
        this.load.image('room2_wall_info_1', 'assets/wall_art.png');
        this.load.image('room2_wall_info_2', 'assets/wall_art.png');
        this.load.image('room2_wall_info_3', 'assets/wall_art.png');
        this.load.image('room2_wall_info_4', 'assets/wall_art.png');
        this.load.image('room2_wall_info_5', 'assets/wall_art.png');
        this.load.image('room2_wall_info_6', 'assets/wall_art.png');
        this.load.image('room2_floor', 'assets/Room2/floor_1.jpg');
        this.load.image('room2_hole_activity', 'assets/Room2/crackedHole.png');
        this.load.image('room2_hole_nextRoom', 'assets/hole.png');
        this.load.image('room2_map', 'assets/map/room3inprogress.png');
        this.load.image('room2_notebook', 'assets/notebook.png');
        this.load.image('room2_activityLocked', 'assets/activityLocked.png');
        this.load.image('room2_help_menu', 'assets/help_menu.png');
        this.load.image('rightArrow' , 'assets/rightArrowTest.png');
	this.load.image('returnDoor', 'assets/dooropen_100x100.png');

    }

    /* createImages
     *
     * Adds the image to the game board
     */
    createImages() {
        this.room2_e_pressed = false;
        this.room2_papers_moved = false;
        this.returnDoor = this.add.image(113, 385, 'returnDoor');
        this.room2_background = this.add.image(768, 432, 'room2_one_lesson_BG');
        this.room2_character_north = this.add.image(768, 432, 'room2_character_north');
        this.room2_character_east = this.add.image(768, 432, 'room2_character_east');
        this.room2_character_south = this.add.image(768, 432, 'room2_character_south');
        this.room2_character_west = this.add.image(768, 432, 'room2_character_west');
        this.room2_E_KeyImg = this.add.image(this.room2_character_north.x+40, this.room2_character_north.y+40, 'room2_E_KeyImg');
        this.room2_activity1A = this.add.image(768, 432, 'room2_activity1A');
        this.room2_activity1B = this.add.image(768, 432, 'room2_activity1B');
        this.room2_activity1C = this.add.image(768, 432, 'room2_activity1C');
        this.room2_activity1D = this.add.image(768, 432, 'room2_activity1D');
        this.room2_activity2A = this.add.image(768, 432, 'room2_activity2A');
        this.room2_activity2B = this.add.image(768, 432, 'room2_activity2B');
        this.room2_activity2C = this.add.image(768, 432, 'room2_activity2C');
        this.room2_activity2D = this.add.image(768, 432, 'room2_activity2D');
        this.room2_activity3A = this.add.image(768, 432, 'room2_activity3A');
        this.room2_activity3B = this.add.image(768, 432, 'room2_activity3B');
        this.room2_activity4A = this.add.image(768, 432, 'room2_activity4A');
        this.room2_activity4B = this.add.image(768, 432, 'room2_activity4B');
        this.room2_activity4C = this.add.image(768, 432, 'room2_activity4C');
        this.room2_activity4D = this.add.image(768, 432, 'room2_activity4D');
        this.room2_activity4E = this.add.image(768, 432, 'room2_activity4E');
        this.room2_activity5A = this.add.image(768, 432, 'room2_activity5A');
        this.room2_activity5B = this.add.image(768, 432, 'room2_activity5B');
        this.room2_activity5C = this.add.image(768, 432, 'room2_activity5C');
        this.room2_activity5D = this.add.image(768, 432, 'room2_activity5D');
        this.room2_activity5E = this.add.image(768, 432, 'room2_activity5E');
        this.room2_activity5F = this.add.image(768, 432, 'room2_activity5F');
        this.room2_activity6A = this.add.image(768, 432, 'room2_activity6A');
        this.room2_activity6B = this.add.image(768, 432, 'room2_activity6B');
        this.room2_wall_info_1 = this.add.image(305, 75, 'room2_wall_info_1');
        this.room2_wall_info_2 = this.add.image(768, 75, 'room2_wall_info_2');
        this.room2_wall_info_3 = this.add.image(1232, 75, 'room2_wall_info_3');
        this.room2_wall_info_4 = this.add.image(305, 790, 'room2_wall_info_4');
        this.room2_wall_info_5 = this.add.image(768, 790, 'room2_wall_info_5');
        this.room2_wall_info_6 = this.add.image(1232, 790, 'room2_wall_info_6');
        this.room2_floor = this.add.image(769, 433, 'room2_floor');
        this.room2_map = this.add.image(768, 432, 'room2_map');
        this.room2_notebook = this.add.image(768, 432, 'room2_notebook');
        this.room2_activityLocked = this.add.image(768, 432, 'room2_activityLocked');
        this.room2_help_menu = this.add.image(768, 432, 'room2_help_menu');
        this.room2_hole_activity = this.add.image(350, 540, 'room2_hole_activity');
        this.room2_hole_nextRoom = this.add.image(768, 432, 'room2_hole_nextRoom');
        this.rightArrow = this.add.image(1000, 650, 'rightArrow');
        this.leftArrow = this.add.image(600, 650, 'rightArrow');
    }

    /* setAlphas
     *
     * sets the alphas to to items in the game to zero so they are not visible at the beginning.
     */
    setAlphas() {
        this.room2_map.alpha = 0.0;
        this.room2_notebook.alpha = 0.0;
        this.room2_activityLocked.alpha = 0.0;
        this.room2_E_KeyImg.alpha = 0.0;
        this.room2_help_menu.alpha = 0.0;
        this.hideActivities();
        this.room2_hole_activity.alpha = 0.0;
        this.room2_hole_nextRoom.alpha = 0.0;
        this.leftArrow.alpha = 0;
        this.rightArrow.alpha = 0;
	this.returnDoor.alpha = 1;
    }

    /* setDepths
     *
     * Sets the depth of each object on the screen.
     */
    setDepths() {
        this.room2_floor.setDepth(0);
        this.room2_character_north.setDepth(50);
        this.room2_character_east.setDepth(50);
        this.room2_character_south.setDepth(50);
        this.room2_character_west.setDepth(50);
        this.room2_E_KeyImg.setDepth(49);
        this.room2_activity1A.setDepth(100);
        this.room2_activity1B.setDepth(100);
        this.room2_activity1C.setDepth(100);
        this.room2_activity1D.setDepth(100);
        this.room2_activity2A.setDepth(100);
        this.room2_activity2B.setDepth(100);
        this.room2_activity2C.setDepth(100);
        this.room2_activity2D.setDepth(100);
        this.room2_activity3A.setDepth(100);
        this.room2_activity3B.setDepth(100);
        this.room2_activity4A.setDepth(100);
        this.room2_activity4B.setDepth(100);
        this.room2_activity4C.setDepth(100);
        this.room2_activity4D.setDepth(100);
        this.room2_activity4E.setDepth(100);
        this.room2_activity5A.setDepth(100);
        this.room2_activity5B.setDepth(100);
        this.room2_activity5C.setDepth(100);
        this.room2_activity5D.setDepth(100);
        this.room2_activity5E.setDepth(100);
        this.room2_activity5F.setDepth(100);
        this.room2_activity6A.setDepth(100);
        this.room2_activity6B.setDepth(100);

        this.room2_map.setDepth(100);
        this.room2_notebook.setDepth(100);
        this.room2_help_menu.setDepth(100);
	this.returnDoor.setDepth(1);
    }

    /* setScales
     *
     * Scales the size of each object.
     */
    setScales() {
        this.room2_E_KeyImg.setScale(0.4);
        this.room2_wall_info_1.setScale(0.75);
        this.room2_wall_info_2.setScale(0.75);
        this.room2_wall_info_3.setScale(0.75);
        this.room2_wall_info_4.setScale(0.75);
        this.room2_wall_info_5.setScale(0.75);
        this.room2_wall_info_6.setScale(0.75);
        this.room2_notebook.setScale(0.75);
        this.room2_map.setScale(0.75);
        this.room2_character_north.setScale(3);
        this.room2_character_south.setScale(3);
        this.room2_character_west.setScale(3);
        this.room2_character_east.setScale(3);
        this.room2_floor.scaleY = 0.71;
        this.room2_floor.scaleX = 0.99;
        this.leftArrow.setScale(.2);
        this.rightArrow.setScale(.2);
        this.room2_hole_activity.setScale(0.5);
	this.returnDoor.setScale(1.5);
    }

    /* setRotations
     *
     * Sets the rotation that each object sits at.
     */
    setRotations() {
        this.room2_wall_info_4.rotation = 3.14;
        this.room2_wall_info_5.rotation = 3.14;
        this.room2_wall_info_6.rotation = 3.14;
        this.leftArrow.setRotation(3.14);
	this.returnDoor.angle = 270;
    }

    /* createInteractionZones
     *
     * Sets the area that you can interact with each object
     */
    createInteractionZones() {
        this.room2_graphics = this.add.graphics({fillStyle: {color: 0xFFFFFF, alpha: 0.0}});
        //TOP ZONES
        //xpos ypos x   y
        this.room2_top_left_info = new Phaser.Geom.Rectangle(175,100,240,150);
        this.room2_graphics.fillRectShape(this.room2_top_left_info);
        //xpos ypos x  y
        this.room2_top_mid_info = new Phaser.Geom.Rectangle(650,150,240,150);
        this.room2_graphics.fillRectShape(this.room2_top_mid_info);
        //xpos ypos x   y
        this.room2_top_right_info = new Phaser.Geom.Rectangle(1120,150,240,150);
        this.room2_graphics.fillRectShape(this.room2_top_right_info);

        //BOTTOM ZONES

        this.room2_bot_left_info = new Phaser.Geom.Rectangle(175,610,240,150);
        this.room2_graphics.fillRectShape(this.room2_bot_left_info);

        this.room2_bot_mid_info = new Phaser.Geom.Rectangle(650,565,240,150);
        this.room2_graphics.fillRectShape(this.room2_bot_mid_info);

        this.room2_bot_right_info = new Phaser.Geom.Rectangle(1120,565,240,150);
        this.room2_graphics.fillRectShape(this.room2_bot_right_info);

        this.room2_hole_zone_nextRoom = new Phaser.Geom.Rectangle(700,350,200,200);
        this.room2_graphics.fillRectShape(this.room2_hole_zone_nextRoom);


        this.room2_hole__zone_activity = new Phaser.Geom.Rectangle(220,450, 220, 150);
        this.room2_graphics.fillRectShape(this.room2_hole__zone_activity);

	//return door
	this.room2_exitDoor = new Phaser.Geom.Rectangle(113, 320, 100, 100);
	this.room2_graphics.fillRectShape(this.room2_exitDoor);
    }

    /* assignKeybinds
     *
     * Sets keybinds to the keyboard
     */
    assignKeybinds() {
        //KEYBOARD INPUT
        this.room2_key_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.room2_key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.room2_key_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.room2_key_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.room2_key_E = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.room2_key_Q = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.room2_key_M = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        this.room2_key_B = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
        this.room2_key_U = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.U);
        this.room2_key_1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        this.room2_key_2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
        this.room2_key_3 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);
        this.room2_key_4 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR);
        this.room2_key_5 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FIVE);
        this.room2_key_R = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.room2_key_H = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);
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
    /* checkActivityOpened
     *
     * helper method to set the activities to opened or closed
     */

    checkActivityOpened(room2_one, room2_two, room2_three, room2_four, room2_five, room2_six) {
        this.room2_activityOneOpened = room2_one;
        this.room2_activityTwoOpened = room2_two;
        this.room2_activityThreeOpened = room2_three;
        this.room2_activityFourOpened = room2_four;
        this.room2_activityFiveOpened = room2_five;
        this.room2_activitySixOpened = room2_six;

    }

    /* checkInteractValidity
     *
     * Checks to see if the character can interact with the object
     */

    checkInteractValidity() {
        if (Phaser.Geom.Rectangle.ContainsPoint(this.room2_top_mid_info, this.room2_character_north)) {
            this.room2_E_KeyImg.x = this.room2_character_north.x;
            this.room2_E_KeyImg.y = this.room2_character_north.y-75;
            this.room2_E_KeyImg.alpha = 1.0;
            if (this.room2_key_E.isDown) {
                if(roomProgress <= 2000)
                    roomProgress = 2005;

                this.room2_activity1A.alpha = 1.0;
                this.resetArrows();
                this.room2_characterMoveable = false;
                this.checkActivityOpened(true, false, false, false, false, false);
            }

        } else if (Phaser.Geom.Rectangle.ContainsPoint(this.room2_bot_left_info, this.room2_character_north)) {
            this.room2_E_KeyImg.x = this.room2_character_north.x;
            this.room2_E_KeyImg.y = this.room2_character_north.y+75;
            this.room2_E_KeyImg.alpha = 1.0;
            if (this.room2_key_E.isDown && roomProgress >= 2005) {
                if(roomProgress <= 2010)
                    roomProgress = 2010;

                this.room2_activity2A.alpha = 1.0;
                this.resetArrows();
                this.checkActivityOpened(false, true, false, false, false, false);
            
            } else if (this.room2_key_E.isDown && roomProgress < 2005) {
                this.room2_activityLocked.alpha = 1.0;
                this.room2_characterMoveable = false;
            }

        } else if (Phaser.Geom.Rectangle.ContainsPoint(this.room2_top_left_info, this.room2_character_north)) {
            this.room2_E_KeyImg.x = this.room2_character_north.x;
            this.room2_E_KeyImg.y = this.room2_character_north.y-75;
            this.room2_E_KeyImg.alpha = 1.0;
            if (this.room2_key_E.isDown && roomProgress >= 2010) {
                if(roomProgress <= 2015)
                    roomProgress = 2015;

                this.room2_activity3A.alpha = 1.0;
                this.resetArrows();
                this.checkActivityOpened(false, false, true, false, false, false);

            } else if (this.room2_key_E.isDown && roomProgress < 2010){
                this.room2_activityLocked.alpha = 1.0;
                this.room2_characterMoveable = false;
            }

        } else if (Phaser.Geom.Rectangle.ContainsPoint(this.room2_bot_mid_info, this.room2_character_north)) {
            this.room2_E_KeyImg.x = this.room2_character_north.x;
            this.room2_E_KeyImg.y = this.room2_character_north.y+75;
            this.room2_E_KeyImg.alpha = 1.0;
            if (this.room2_key_E.isDown && roomProgress >= 2015) {
                if(roomProgress <= 2020)
                    roomProgress = 2020;

                this.room2_activity4A.alpha = 1.0;
                this.resetArrows();
                this.checkActivityOpened(false, false, false, true, false, false);

            } else if (this.room2_key_E.isDown && roomProgress < 2015){
                this.room2_activityLocked.alpha = 1.0;
                this.room2_characterMoveable = false;

            }
        } else if (Phaser.Geom.Rectangle.ContainsPoint(this.room2_top_right_info, this.room2_character_north)) {
            this.room2_E_KeyImg.x = this.room2_character_north.x;
            this.room2_E_KeyImg.y = this.room2_character_north.y-75;

            this.room2_E_KeyImg.alpha = 1.0;
            if (this.room2_key_E.isDown && roomProgress >= 2020) {
                if(roomProgress <= 2025)
                    roomProgress = 2025;

                this.room2_activity5A.alpha = 1.0;
                this.resetArrows();
                this.checkActivityOpened(false, false, false, false, true, false);
            }
            else if (this.room2_key_E.isDown && roomProgress < 2020){
                this.room2_activityLocked.alpha = 1.0;
                this.room2_characterMoveable = false;
            }

        } else if (Phaser.Geom.Rectangle.ContainsPoint(this.room2_bot_right_info, this.room2_character_north)) {
            this.room2_E_KeyImg.x = this.room2_character_north.x;
            this.room2_E_KeyImg.y = this.room2_character_north.y+75;
            this.room2_E_KeyImg.alpha = 1.0;
            if (this.room2_key_E.isDown && roomProgress >= 2025) {
                if(roomProgress <= 2030)
                    roomProgress = 2030;
                console.log(roomProgress);      
                this.room2_activity6A.alpha = 1.0;
                this.resetArrows();
                this.checkActivityOpened(false, false, false, false, false, true);
            }
            else if (this.room2_key_E.isDown && roomProgress < 2025){
                this.room2_activityLocked.alpha = 1.0;
                this.room2_characterMoveable = false;
            }

        }
        else if (Phaser.Geom.Rectangle.ContainsPoint(this.room2_hole_zone_nextRoom, this.room2_character_north)) {
            if(roomProgress >= 2030) {
              this.room2_E_KeyImg.x = this.room2_character_north.x;
              this.room2_E_KeyImg.y = this.room2_character_north.y+75;
              this.room2_E_KeyImg.alpha = 1.0;
              if (this.room2_key_E.isDown) {
                  roomProgress = 3000;
                  this.scene.start("Account_Eqn");
              }
            }


        }

        else if (Phaser.Geom.Rectangle.ContainsPoint(this.room2_hole__zone_activity, this.room2_character_north)) {
            if(roomProgress >= 2030) {
              this.room2_E_KeyImg.x = this.room2_character_north.x;
              this.room2_E_KeyImg.y = this.room2_character_north.y+75;
              this.room2_E_KeyImg.alpha = 1.0;
              if(this.room2_key_E.isDown) {
                  if(roomProgress <= 2100)
                        roomProgress = 2100;
                this.scene.start("BuildBlock_Act1");
              }
            }
        }
	else if (Phaser.Geom.Rectangle.ContainsPoint(this.room2_exitDoor, this.room2_character_north)){
	    this.room2_E_KeyImg.x = this.room2_character_north.x+75;
	    this.room2_E_KeyImg.y = this.room2_character_north.y;
	    this.room2_E_KeyImg.alpha = 1.0;
	    if (this.room2_key_E.isDown) {
		this.scene.start("Course_Fin_Intro");
	    }
	}	

        else {
            this.hideActivities();
            this.room2_E_KeyImg.alpha = 0.0;
        }
    }

    /* setCharacterAlpha
     *
     * Sets the alpha of each facing of the character
     * Call this method with the argument as (N,E,S,W)
     */
    setCharacterAlpha() {
        this.room2_character_north.alpha = arguments[0];
        this.room2_character_east.alpha = arguments[1];
        this.room2_character_south.alpha = arguments[2];
        this.room2_character_west.alpha = arguments[3];
    }

    /* movePlayer
     *
     *
     */
    movePlayer() {
        //setCharacterAlpha is in helper.js and arguments go N,E,S,W
        this.setCharacterAlpha(0,0,1,0);

        //Character moves up
        if(this.room2_key_W.isDown && this.room2_characterMoveable == true) {
            if(this.room2_character_north.y > 185){
                this.room2_character_north.y -= 5;
                this.room2_character_east.y -= 5;
                this.room2_character_south.y -= 5;
                this.room2_character_west.y -= 5;

                this.setCharacterAlpha(1,0,0,0);



            }
            //Character moves left
        } if (this.room2_key_A.isDown && this.room2_characterMoveable == true) {
            if(this.room2_character_west.x > 210){
                this.room2_character_west.x -= 5;
                this.room2_character_east.x -= 5;
                this.room2_character_south.x -= 5;
                this.room2_character_north.x -= 5;

                this.setCharacterAlpha(0,0,0,1);
            }
        }
        //Character moves down
        if (this.room2_key_S.isDown && this.room2_characterMoveable == true) {
            if(this.room2_character_south.y < 680){
                this.room2_character_south.y += 5;
                this.room2_character_east.y += 5;
                this.room2_character_north.y += 5;
                this.room2_character_west.y += 5;

                this.setCharacterAlpha(0,0,1,0);
            }

        }
        //Character moves right
        if (this.room2_key_D.isDown && this.room2_characterMoveable == true) {
            if(this.room2_character_east.x < 1325){
                this.room2_character_east.x += 5;
                this.room2_character_north.x += 5;
                this.room2_character_south.x += 5;
                this.room2_character_west.x += 5;

                this.setCharacterAlpha(0,1,0,0);
            }
        }
    }


    /* quitInteraction
     *
     * Sets the alphas to 0 so that the interaction is quit.
     */
    quitInteraction() {
        this.room2_map.alpha = 0.0;
        this.room2_notebook.alpha = 0.0;
        this.hideActivities();
        this.room2_activityLocked.alpha = 0.0;
        this.room2_character_north.alpha = 1.0;
        this.room2_character_east.alpha = 1.0;
        this.room2_character_south.alpha = 1.0;
        this.room2_character_west.alpha = 1.0;
        this.room2_characterMoveable = true;
        this.room2_activityOneOpened = false;
        this.room2_activityTwoOpened = false;
        this.room2_activityThreeOpened = false;
        this.room2_activityFourOpened = false;
        this.room2_activityFiveOpened = false;
        this.room2_activitySixOpened = false;
        this.room2_help_menu.alpha = 0.0;
        this.room2_activatedQuiz = false;
        this.rightArrow.setVisible(false);
        this.leftArrow.setVisible(false);
    }


    hideInteractionBoxes() {

    }

    /* hideActivities
     *
     * Sets the alphas to the activities to 0 so that they are hidden.
     */
    hideActivities() {
        this.room2_activity1A.alpha = 0.0;
        this.room2_activity1B.alpha = 0.0;
        this.room2_activity1C.alpha = 0.0;
        this.room2_activity1D.alpha = 0.0;
        this.room2_activity2A.alpha = 0.0;
        this.room2_activity2B.alpha = 0.0;
        this.room2_activity2C.alpha = 0.0;
        this.room2_activity2D.alpha = 0.0;
        this.room2_activity3A.alpha = 0.0;
        this.room2_activity3B.alpha = 0.0;
        this.room2_activity4A.alpha = 0.0;
        this.room2_activity4B.alpha = 0.0;
        this.room2_activity4C.alpha = 0.0;
        this.room2_activity4D.alpha = 0.0;
        this.room2_activity4E.alpha = 0.0;
        this.room2_activity5A.alpha = 0.0;
        this.room2_activity5B.alpha = 0.0;
        this.room2_activity5C.alpha = 0.0;
        this.room2_activity5D.alpha = 0.0;
        this.room2_activity5E.alpha = 0.0;
        this.room2_activity5F.alpha = 0.0;
        this.room2_activity6A.alpha = 0.0;
        this.room2_activity6B.alpha = 0.0;
        this.room2_activityLocked.alpha = 0.0;
        this.rightArrow.setVisible(false);
        this.leftArrow.setVisible(false);
    }

    activityAlphas(room2_oneA, room2_oneB, room2_oneC, room2_oneD, room2_twoA, room2_twoB, room2_twoC, room2_twoD, room2_threeA, room2_threeB, room2_fourA, room2_fourB, room2_fourC, room2_fourD, room2_fourE, room2_fiveA, room2_fiveB, room2_fiveC, room2_fiveD, room2_fiveE, room2_fiveF, room2_sixA, room2_sixB) {
        this.room2_activity1A.alpha = room2_oneA;
        this.room2_activity1B.alpha = room2_oneB;
        this.room2_activity1C.alpha = room2_oneC;
        this.room2_activity1D.alpha = room2_oneD;
        this.room2_activity2A.alpha = room2_twoA;
        this.room2_activity2B.alpha = room2_twoB;
        this.room2_activity2C.alpha = room2_twoC;
        this.room2_activity2D.alpha = room2_twoD;
        this.room2_activity3A.alpha = room2_threeA;
        this.room2_activity3B.alpha = room2_threeB;
        this.room2_activity4A.alpha = room2_fourA;
        this.room2_activity4B.alpha = room2_fourB;
        this.room2_activity4C.alpha = room2_fourC;
        this.room2_activity4D.alpha = room2_fourD;
        this.room2_activity4E.alpha = room2_fourE;
        this.room2_activity5A.alpha = room2_fiveA;
        this.room2_activity5B.alpha = room2_fiveB;
        this.room2_activity5C.alpha = room2_fiveC;
        this.room2_activity5D.alpha = room2_fiveD;
        this.room2_activity5E.alpha = room2_fiveE;
        this.room2_activity5F.alpha = room2_fiveF;
        this.room2_activity6A.alpha = room2_sixA;
        this.room2_activity6B.alpha = room2_sixB;


    }

    resetArrows() {
        this.rightArrow.alpha = 0;
        this.rightArrow.setVisible(true);

        this.leftArrow.alpha = 0;
        this.leftArrow.setVisible(true);
    }
    loadArrows() {
        if (this.rightArrowShown == true) {
            this.rightArrow.alpha = 1;
        }
        else {
            this.rightArrow.alpha = 0;
        }

        if (this.leftArrowShown == true) {
            this.leftArrow.alpha = 1;
        }
        else {
            this.leftArrow.alpha = 0;
        }
    }

    /* checkNextPage
     *
     *
     */

    checkNextPage() {
        //ACTIVITY ONE PANELS
        if (this.room2_activityOneOpened == true && this.room2_activity1A.alpha == 1 && this.key_Right.isDown && this.counter > 15) {
            this.activityAlphas(0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
            this.rightArrowShown = true;
            this.leftArrowShown = true;
            this.counter = 0;
        } else   if (this.room2_activityOneOpened == true && this.room2_activity1A.alpha == 1) {
            this.activityAlphas(1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
            this.rightArrowShown = true;
            this.leftArrowShown = false;
        } else if(this.room2_activityOneOpened == true && this.room2_activity1B.alpha == 1 && this.key_Right.isDown && this.counter > 15) {
            this.activityAlphas(0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
            this.rightArrowShown = true;
            this.leftArrowShown = true;
            this.counter = 0;
        } else if(this.room2_activityOneOpened == true && this.room2_activity1B.alpha == 1 && this.key_Left.isDown && this.counter > 15) {
            this.activityAlphas(1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
            this.rightArrowShown = true;
            this.leftArrowShown = false;
            this.counter = 0;
        } else if(this.room2_activityOneOpened == true && this.room2_activity1C.alpha == 1 && this.key_Right.isDown && this.counter > 15) {
            this.activityAlphas(0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
            this.rightArrowShown = false;
            this.leftArrowShown = true;
            this.counter = 0;
        } else if(this.room2_activityOneOpened == true && this.room2_activity1C.alpha == 1 && this.key_Left.isDown && this.counter > 15) {
            this.activityAlphas(0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
            this.rightArrowShown = true;
            this.leftArrowShown = true;
            this.counter = 0;
        } else if(this.room2_activityOneOpened == true && this.room2_activity1D.alpha == 1 && this.key_Left.isDown && this.counter > 15) {
            this.activityAlphas(0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
            this.rightArrowShown = true;
            this.leftArrowShown = true;
            this.counter = 0;
        }


        //PANEL 2 PAGES
        if (this.room2_activityTwoOpened == true) {
            if (this.room2_activity2A.alpha == 1 && this.key_Right.isDown && this.counter > 15) {
                this.activityAlphas(0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
                this.rightArrowShown = true;
                this.leftArrowShown = true;
                this.counter = 0;
                console.log("aaaa");
            } else if (this.room2_activity2A.alpha == 1) {
                this.activityAlphas(0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
                this.rightArrowShown = true;
                this.leftArrowShown = false;
            } else if(this.room2_activity2B.alpha == 1 && this.key_Right.isDown && this.counter > 15) {
                this.activityAlphas(0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
                this.rightArrowShown = true;
                this.leftArrowShown = true;
                this.counter = 0;
            } else if(this.room2_activity2B.alpha == 1 && this.key_Left.isDown && this.counter > 15) {
                this.activityAlphas(0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
                this.rightArrowShown = true;
                this.leftArrowShown = false;
                this.counter = 0;
            } else if (this.room2_activity2C.alpha == 1 && this.key_Right.isDown && this.counter > 15) {
                this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
                this.rightArrowShown = false;
                this.leftArrowShown = true;
                this.counter = 0;
            } else if(this.room2_activity2C.alpha == 1 && this.key_Left.isDown && this.counter > 15) {
                this.activityAlphas(0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
                this.rightArrowShown = true;
                this.leftArrowShown = true;
                this.counter = 0;
            } else if(this.room2_activity2D.alpha == 1 && this.key_Left.isDown && this.counter > 15) {
                this.activityAlphas(0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
                this.rightArrowShown = true;
                this.leftArrowShown = true;
                this.counter = 0;
            }
        }

        //PANEL THREE IMAGES
        if (this.room2_activityThreeOpened == true) {
            if (this.room2_activity3A.alpha == 1 && this.key_Right.isDown && this.counter > 15) {
                this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0);
                this.rightArrowShown = false;
                this.leftArrowShown = true;
                this.counter = 0;
                console.log("aaaa");
            } else if (this.room2_activity3A.alpha == 1) {
                this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0);
                this.rightArrowShown = true;
                this.leftArrowShown = false;
            } else if (this.room2_activity3B.alpha == 1 && this.key_Left.isDown && this.counter > 15) {
                this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0);
                this.rightArrowShown = true;
                this.leftArrowShown = false;
                this.counter = 0;
            }
        }

        //PANEL FOUR IMAGES
        if (this.room2_activityFourOpened == true) {
            if (this.room2_activity4A.alpha == 1 && this.key_Right.isDown && this.counter > 15) {
                this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0);
                this.rightArrowShown = true;
                this.leftArrowShown = true;
                this.counter = 0;
                console.log("aaaa");
            } else if (this.room2_activity4A.alpha == 1) {
                this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0);
                this.rightArrowShown = true;
                this.leftArrowShown = false;
            } else if(this.room2_activity4B.alpha == 1 && this.key_Right.isDown && this.counter > 15) {
                this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0);
                this.rightArrowShown = true;
                this.leftArrowShown = true;
                this.counter = 0;
            } else if(this.room2_activity4B.alpha == 1 && this.key_Left.isDown && this.counter > 15) {
                this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0);
                this.rightArrowShown = true;
                this.leftArrowShown = true;
                this.counter = 0;
            } else if (this.room2_activity4C.alpha == 1 && this.key_Right.isDown && this.counter > 15) {
                this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0);
                this.rightArrowShown = true;
                this.leftArrowShown = true;
                this.counter = 0;
            } else if(this.room2_activity4C.alpha == 1 && this.key_Left.isDown && this.counter > 15) {
                this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0);
                this.rightArrowShown = true;
                this.leftArrowShown = true;
                this.counter = 0;
            } else if(this.room2_activity4D.alpha == 1 && this.key_Left.isDown && this.counter > 15) {
                this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0);
                this.rightArrowShown = true;
                this.leftArrowShown = true;
                this.counter = 0;
            } else if(this.room2_activity4D.alpha == 1 && this.key_Right.isDown && this.counter > 15) {
                this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0);
                this.rightArrowShown = false;
                this.leftArrowShown = true;
                this.counter = 0;

            } else if(this.room2_activity4E.alpha == 1 && this.key_Left.isDown && this.counter > 15) {
                this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0);
                this.rightArrowShown = true;
                this.leftArrowShown = true;
                this.counter = 0;
            }
        }

        if (this.room2_activityFiveOpened == true) {
            if (this.room2_activity5A.alpha == 1 && this.key_Right.isDown && this.counter > 15) {
                this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0);
                this.rightArrowShown = true;
                this.leftArrowShown = true;
                this.counter = 0;
            } else if (this.room2_activity5A.alpha == 1) {
                this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0);
                this.rightArrowShown = true;
                this.leftArrowShown = false;
            } else if(this.room2_activity5B.alpha == 1 && this.key_Right.isDown && this.counter > 15) {
                this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0);
                this.rightArrowShown = true;
                this.leftArrowShown = true;
                this.counter = 0;
            } else if(this.room2_activity5B.alpha == 1 && this.key_Left.isDown && this.counter > 15) {
                this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0);
                this.rightArrowShown = true;
                this.leftArrowShown = true;
                this.counter = 0;
            } else if (this.room2_activity5C.alpha == 1 && this.key_Right.isDown && this.counter > 15) {
                this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0);
                this.rightArrowShown = true;
                this.leftArrowShown = true;
                this.counter = 0;
            } else if(this.room2_activity5C.alpha == 1 && this.key_Left.isDown && this.counter > 15) {
                this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0);
                this.rightArrowShown = true;
                this.leftArrowShown = true;
                this.counter = 0;
            } else if(this.room2_activity5D.alpha == 1 && this.key_Left.isDown && this.counter > 15) {
                this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0);
                this.rightArrowShown = true;
                this.leftArrowShown = true;
                this.counter = 0;
            } else if(this.room2_activity5D.alpha == 1 && this.key_Right.isDown && this.counter > 15) {
                this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0);
                this.rightArrowShown = true;
                this.leftArrowShown = true;
                this.counter = 0;

            } else if(this.room2_activity5E.alpha == 1 && this.key_Left.isDown && this.counter > 15) {
                this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0);
                this.rightArrowShown = true;
                this.leftArrowShown = true;
                this.counter = 0;
            }  else if(this.room2_activity5E.alpha == 1 && this.key_Right.isDown && this.counter > 15) {
                this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0);
                this.rightArrowShown = false;
                this.leftArrowShown = true;
                this.counter = 0;

            } else if(this.room2_activity5F.alpha == 1 && this.key_Left.isDown && this.counter > 15) {
                this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0);
                this.rightArrowShown = true;
                this.leftArrowShown = true;
                this.counter = 0;
            }
        }
        if (this.room2_activitySixOpened == true) {
            if (this.room2_activity6A.alpha == 1 && this.key_Right.isDown && this.counter > 15) {
                this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1);
                this.rightArrowShown = false;
                this.leftArrowShown = true;
                this.counter = 0;
            } else if (this.room2_activity6A.alpha == 1) {
                this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0);
                this.rightArrowShown = true;
                this.leftArrowShown = false;
            } else if(this.room2_activity6B.alpha == 1 && this.key_Left.isDown && this.counter > 15) {
                this.activityAlphas(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0);
                this.rightArrowShown = true;
                this.leftArrowShown = true;
                this.counter = 0;
            }

        }
        this.counter++;
        this.loadArrows();
    }

    /* helpMenu
     *
     * Sets the alpha of the help menu to 1 so that it is visible
     */
    helpMenu() {
        this.room2_help_menu.alpha = 1.0;
        this.room2_helpOpen = true;
    }
}
