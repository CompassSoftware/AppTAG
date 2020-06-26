class accountCyc extends Phaser.Scene {
    constructor() {
        super("accountCyc");
        this.room4_unlocked = false;
        this.room4_quizActive = false;
        this.room4_activatedQuiz = false;
        this.room4_activityOneOpened = false;
        this.room4_activityTwoOpened = false;
        this.room4_activityThreeOpened = false;
        this.room4_activityFourOpened = false;
        this.room4_activityFiveOpened = false;
        this.room4_activitySixOpened = false;
        this.room4_helpOpen = false;
        this.counter = 0;
        document.getElementById("background").volume = 0.8;
    }

    preload() {
        this.loadAssets();
        this.load.spritesheet('coin', 'assets/Coin/coin-sprite-png-2.png', 
        {frameWidth: 200, frameHeight: 250, endFrame: 5});
    }

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
        this.roomLabel = this.add.text(650, 6, "Accounting Cycle Room", {
            font: "24px arial",
            color: "#FFFFFF",
            align: 'left',
            fontWeight: 'bold',
        });
        this.displayCoin();
        this.displayProfile();
    }

    update(delta) {
        if (Phaser.Input.Keyboard.JustDown(this.room4_key_N)) {
            document.getElementById("background").play();
            if (musicToggle == false) {
                document.getElementById("background").play();
                musicToggle = true;
            } else if (musicToggle == true) {
                document.getElementById("background").pause();
                musicToggle = false;
            }
            //this.musicToggled();
        }

        if (Phaser.Input.Keyboard.JustDown(this.room4_key_H)) {
            if (this.room4_help_menu.alpha == 0.0) {
                this.helpMenu();
            } else {
                this.quitInteraction();
            }
        }

        if (this.room4_activityOneOpened) {
            this.checkNextPage();
        }

        if (this.room4_activityTwoOpened) {
            this.checkNextPage();
        }

        if (this.room4_activityThreeOpened) {
            this.checkNextPage();
        }

        if (this.room4_activityFourOpened) {
            this.checkNextPage();
        }

        if (this.room4_activityFiveOpened) {
            this.checkNextPage();
        }

        if (this.room4_activitySixOpened) {
            this.checkNextPage();
        }

        if (roomProgress >= 4005) {
            this.room4_wall_info_5.alpha = wallAlpha;
        }

        if (roomProgress >= 4010) {
            this.room4_wall_info_3.alpha = wallAlpha;
        }

        if (roomProgress >= 4015) {
            this.room4_wall_info_4.alpha = wallAlpha;
        }

        if (roomProgress >= 4020) {
            this.room4_wall_info_2.alpha = wallAlpha;
        }

        if (roomProgress >= 4025) {
            this.room4_wall_info_1.alpha = wallAlpha;
        }

        if (roomProgress >= 4030) {
            this.room4_wall_info_6.alpha = wallAlpha;
        }

        if (roomProgress >= 4035) {
            this.room4_hole_activity.alpha = 1.0;
        }

        if (roomProgress >= 4500) {
            this.room4_hole_nextRoom.alpha = 1.0;
        }

        if (this.room4_key_U.isDown) {
            roomProgress = 4035;
            this.room4_unlocked = true;
        }

        if (Phaser.Input.Keyboard.JustDown(this.room4_key_M)) {
            if (this.room4_map.alpha == 0.0) {
                this.room4_map.alpha = 1.0;
                this.characterMoveable = false;
                this.room4_character_north.alpha = 0.0;
                this.room4_character_east.alpha = 0.0;
                this.room4_character_south.alpha = 0.0;
                this.room4_character_west.alpha = 0.0;
            } else {
                this.quitInteraction();
            }
        }

        if (Phaser.Input.Keyboard.JustDown(this.room4_key_B)) {
            if (this.room4_notebook.alpha == 0.0) {
                this.room4_notebook.alpha = 1.0;
                this.room4_characterMoveable = false;
                this.room4_character_north.alpha = 0.0;
                this.room4_character_east.alpha = 0.0;
                this.room4_character_south.alpha = 0.0;
                this.room4_character_west.alpha = 0.0;
            } else {
                this.quitInteraction();
            }
        }

        if (this.room4_key_Q.isDown && this.room4_activatedQuiz = false) {
            this.quitInteraction();
        }

        if (this.room4_quizActive == true && this.room4_activatedQuiz == false && this.room4_key_E.isDown) {
            this.activateQuiz();
            this.room4_activatedQuiz = true;
        }

        if (this.room4_activatedQuiz == false) {
            this.movePlayer();
            this.checkInteractValidity();
            this.room4_characterMoveable = true;
        }
    }

    /************************************************************************
     =============================HELPER METHODS=============================
     *///////////////////////////////////////////////////////////////////////
    /* loadAssets
     *
     * Loads images to be used and sets them into a variable name.
     */
    loadAssets() {
        this.load.image('room4_one_lesson_BG', 'assets/one_lesson_BG.png');
        this.load.image('room4_character_north', 'assets/character_north.png');
        this.load.image('room4_character_east', 'assets/character_east.png');
        this.load.image('room4_character_south', 'assets/character_south.png');
        this.load.image('room4_character_west', 'assets/character_west.png');
        this.load.image('room4_activity1A', 'assets/Panels/RoomFour/PanelOneA.png');
        this.load.image('room4_activity1B', 'assets/Panels/RoomFour/PanelOneB.png');
        this.load.image('room4_activity1C', 'assets/Panels/RoomFour/PanelOneC.png');
        this.load.image('room4_activity2A', 'assets/Panels/RoomFour/PanelTwoA.png');
        this.load.image('room4_activity2B', 'assets/Panels/RoomFour/PanelTwoB.png');
        this.load.image('room4_activity2C', 'assets/Panels/RoomFour/PanelTwoC.png');
        this.load.image('room4_activity3A', 'assets/Panels/RoomFour/PanelThreeA.png');
        this.load.image('room4_activity3B', 'assets/Panels/RoomFour/PanelThreeB.png');
        this.load.image('room4_activity3C', 'assets/Panels/RoomFour/PanelThreeC.png');
        this.load.image('room4_activity3D', 'assets/Panels/RoomFour/PanelThreeD.png');
        this.load.image('room4_activity4A', 'assets/Panels/RoomFour/PanelFourA.png');
        this.load.image('room4_activity4B', 'assets/Panels/RoomFour/PanelFourB.png');
        this.load.image('room4_activity4C', 'assets/Panels/RoomFour/PanelFourC.png');
        this.load.image('room4_activity4D', 'assets/Panels/RoomFour/PanelFourD.png');
        this.load.image('room4_activity5A', 'assets/Panels/RoomFour/PanelFiveA.png');
        this.load.image('room4_activity5B', 'assets/Panels/RoomFour/PanelFiveB.png');
        this.load.image('room4_activity5C', 'assets/Panels/RoomFour/PanelFiveC.png');
        this.load.image('room4_activity5D', 'assets/Panels/RoomFour/PanelFiveD.png');
        this.load.image('room4_activity6', 'assets/Panels/RoomFour/PanelSix.png');
        this.load.image('room4_E_KeyImg', 'assets/E_Key.png');
        this.load.image('room4_wall_info_1', 'assets/wall_art.png');
        this.load.image('room4_wall_info_2', 'assets/wall_art.png');
        this.load.image('room4_wall_info_3', 'assets/wall_art.png');
        this.load.image('room4_wall_info_4', 'assets/wall_art.png');
        this.load.image('room4_wall_info_5', 'assets/wall_art.png');
        this.load.image('room4_wall_info_6', 'assets/wall_art.png');
        this.load.image('room4_floor', 'assets/Room4/floor.png');
        this.load.image('room4_hole_activity', 'assets/Room4/crackedHole.png');
        this.load.image('room4_hole_nextRoom', 'assets/hole.png');
        this.load.image('room4_map', 'assets/featNotAvail.png');
        this.load.image('room4_notebook', 'assets/featNotAvail.png');
        this.load.image('room4_activityLocked', 'assets/activityLocked.png');
        this.load.image('room4_help_menu', 'assets/help_menu.png');
        this.load.image('rightArrow', 'assets/rightArrowTest.png');
        this.load.image('returnDoor', 'assets/dooropen_100x100.png');
        this.load.image('singleCoin', 'assets/Coin/singleCoin.png');
        this.load.image('profile', 'assets/character_south.png');
        //this.load.image('MTOn', 'assets/MTOnTransparent.png');
        //this.load.image('MTOff', 'assets/MTOffTransparent.png');
    }

    /* createImages
     *
     * Adds the image to the game board.
     */
    createImages() {
        this.room4_e_pressed = false;
        this.returnDoor = this.add.image(113, 385, 'returnDoor');
        this.room4_background = this.add.image(768, 432, 'room4_one_lesson_BG');
        this.room4_character_north = this.add.image(768, 432, 'room4_character_north');
        this.room4_character_east = this.add.image(768, 432, 'room4_character_east');
        this.room4_character_south = this.add.image(768, 432, 'room4_character_south');
        this.room4_character_west = this.add.image(768, 432, 'room4_character_west');
        this.room4_E_KeyImg = this.add.image(this.room4_character_north.x+40, this.room4_character_north.y+40, 'room4_E_KeyImg');
        this.room4_activity1A = this.add.image(768, 432, 'room4_activity1A');
        this.room4_activity1B = this.add.image(768, 432, 'room4_activity1B');
        this.room4_activity1C = this.add.image(768, 432, 'room4_activity1C');
        this.room4_activity2A = this.add.image(768, 432, 'room4_activity2A');
        this.room4_activity2B = this.add.image(768, 432, 'room4_activity2B');
        this.room4_activity2C = this.add.image(768, 432, 'room4_activity2C');
        this.room4_activity3A = this.add.image(768, 432, 'room4_activity3A');
        this.room4_activity3B = this.add.image(768, 432, 'room4_activity3B');
        this.room4_activity3C = this.add.image(768, 432, 'room4_activity3C');
        this.room4_activity3D = this.add.image(768, 432, 'room4_activity3D');
        this.room4_activity4A = this.add.image(768, 432, 'room4_activity4A');
        this.room4_activity4B = this.add.image(768, 432, 'room4_activity4B');
        this.room4_activity4C = this.add.image(768, 432, 'room4_activity4C');
        this.room4_activity4D = this.add.image(768, 432, 'room4_activity4D');
        this.room4_activity5A = this.add.image(768, 432, 'room4_activity5A');
        this.room4_activity5B = this.add.image(768, 432, 'room4_activity5B');
        this.room4_activity5C = this.add.image(768, 432, 'room4_activity5C');
        this.room4_activity5D = this.add.image(768, 432, 'room4_activity5D');
        this.room4_activity6 = this.add.image(768, 432, 'room4_activity6');
        this.room4_wall_info_1 = this.add.image(305, 75, 'room4_wall_info_1');
        this.room4_wall_info_2 = this.add.image(768, 75, 'room4_wall_info_2');
        this.room4_wall_info_3 = this.add.image(1232, 75, 'room4_wall_info_3');
        this.room4_wall_info_4 = this.add.image(305, 790, 'room4_wall_info_4');
        this.room4_wall_info_5 = this.add.image(768, 790, 'room4_wall_info_5');
        this.room4_wall_info_6 = this.add.image(1232, 790, 'room4_wall_info_6');
        this.room4_floor = this.add.image(769, 433, 'room4_floor');
        this.room4_map = this.add.image(768, 432, 'room4_map');
        this.room4_notebook = this.add.image(768, 432, 'room4_notebook');
        this.room4_activityLocked = this.add.image(768, 432, 'room4_activityLocked');
        this.room4_help_menu = this.add.image(768, 432, 'room4_help_menu');
        this.room4_hole_activity = this.add.image(350, 540, 'room4_hole_activity');
        this.room4_hole_nextRoom = this.add.image(768, 432, 'room4_hole_nextRoom');
        this.rightArrow = this.add.image(1000, 650, 'rightArrow');
        this.leftArrow = this.add.image(600, 650, 'rightArrow');
        this.countCoin = this.add.image(40, 230, 'singleCoin');
        this.profile = this.add.image(40, 150, 'profile');
        //this.MTOn = this.add.image(50, 750, 'MTOn');
        //this.MTOff = this.add.image(50, 750, 'MTOff'); 
    }

    /* setAlphas
     *
     * sets the alphas of items in the game to zero so they are not visible upon load
     */
    setAlphas() {
        this.room4_map.alpha = 0.0;
        this.room4_notebook.alpha = 0.0;
        this.room4_activityLocked.alpha = 0.0;
        this.room4_E_KeyImg.alpha = 0.0;
        this.room4_help_menu.alpha = 0.0;
        this.hideActivities();
        this.room4_hole_activity.alpha = 0.0;
        this.room4_hole_nextRoom.alpha = 0.0;
        this.leftArrow.alpha = 0.0;
        this.rightArrow.alpha = 0.0;
        this.returnDoor.alpha = 1.0;
        this.countCoin.alpha = 0.0;
        this.coin0.alpha = 0.0;
        this.coinHead.alpha = 0.0;
        this.profile.alpha = 0.0;
        /*if (musicToggle == false) {
         *      this.MTOff.alpha = 1.0;
         *      this.MTOn.alpha = 0.0;
         * }
         * if (musicToggle == true) {
         *      this.MTOn.alpha = 1.0;
         *      this.MTOff.alpha = 0.0;
         * }
         */    
    }

    /* setDepths
     *
     * Sets the depth of each object on the screen.
     */
    setDepths() {
        this.room4_floor.setDepth(0);
        this.room4_character_north.setDepth(50);
        this.room4_character_east.setDepth(50);
        this.room4_character_south.setDepth(50);
        this.room4_character_west.setDepth(50);
        this.room4_E-KeyImg.setDepth(49);
        this.room4_activity1A.setDepth(100);
        this.room4_activity1B.setDepth(100);
        this.room4_activity1C.setDepth(100);
        this.room4_activity2A.setDepth(100);
        this.room4_activity2B.setDepth(100);
        this.room4_activity2C.setDepth(100);
        this.room4_activity3A.setDepth(100);
        this.room4_activity3B.setDepth(100);
        this.room4_activity3C.setDepth(100);
        this.room4_activity3D.setDepth(100);
        this.room4_activity4A.setDepth(100);
        this.room4_activity4B.setDepth(100);
        this.room4_activity4C.setDepth(100);
        this.room4_activity4D.setDepth(100);
        this.room4_activity5A.setDepth(100);
        this.room4_activity5B.setDepth(100);
        this.room4_activity5C.setDepth(100);
        this.room4_activity5D.setDepth(100);
        this.room4_activity6.setDepth(100);
        this.room4_map.setDepth(100);
        this.room4_notebook.setDepth(100);
        this.room4_help_menu.setDepth(100);
        this.countCoin.setDepth(0);
        this.returnDoor.setDepth(1);
        this.profile.setDepth(0);
        //this.MTOn.setDepth(0);
        //this.MTOff.setDepth(0);
    }

    /* setScales
     *
     * Scales the size of each object.
     */
    setScales() {
        this.room4_E_KeyImg.setScale(0.4);
        this.room4_wall_info_1.setScale(0.75);
        this.room4_activity1A.setScale(0.5);
        this.room4_activity1B.setScale(0.5);
        this.room4_activity1C.setScale(0.5);
        this.room4_activity2A.setScale(0.5);
        this.room4_activity2B.setScale(0.5);
        this.room4_activity2C.setScale(0.5);
        this.room4_activity3A.setScale(0.5);
        this.room4_activity3B.setScale(0.5);
        this.room4_activity3C.setScale(0.5);
        this.room4_activity3D.setScale(0.5);
        this.room4_activity4A.setScale(0.5);
        this.room4_activity4B.setScale(0.5);
        this.room4_activity4C.setScale(0.5);
        this.room4_activity4D.setScale(0.5);
        this.room4_activity5A.setScale(0.5);
        this.room4_activity5B.setScale(0.5);
        this.room4_activity5C.setScale(0.5);
        this.room4_activity5D.setScale(0.5);
        this.room4_activity6.setScale(0.5);
        this.room4_wall_info_2.setScale(0.75);
        this.room4_wall_info_3.setScale(0.75);
        this.room4_wall_info_4.setScale(0.75);
        this.room4_wall_info_5.setScale(0.75);
        this.room4_wall_info_6.setScale(0.75);
        this.room4_notebook.setScale(0.75);
        this.room4_map.setScale(0.75);
        this.room4_character_north.setScale(3);
        this.room4_character_east.setScale(3);
        this.room4_character_south.setScale(3);
        this.room4_character_west.setScale(3);
        this.room4_floor.scaleY = 0.71;
        this.room4_floor.scaleX = 0.99;
        this.leftArrow.setScale(.2);
        this.rightArrow.setScale(.2);
        this.room4_hole_activity.setScale(0.5);
        this.returnDoor.setScale(1.5);
        this.countCoin.setScale(0.25);
        this.coin0.setScale(0.5);
        this.coinHead.setScale(0.5);
        this.profile.setScale(1.5);
        //this.MTOn.setScale(0.2);
        //this.MTOff.setScale(0.2);
    }

    /* setRotations
     *
     * Sets the rotation that each object sits at.
     */
    setRotations() {
        this.room4_wall_info_4.rotation = 3.14;
        this.room4_wall_info_5.rotation = 3.14;
        this.room4_wall_info_6.rotation = 3.14;
        this.leftArrow.setRotation(3.14);
        this.returnDoor.angle = 270;
    }

    /* createInteractionZones
     *
     * Sets the area that you can interact with each object.
     */
    createInteractionZones() {
        this.room4_graphics = this.add.graphics({fillStyle: {color: 0xFFFFFF, alpha: 0.0}});
        //TOP ZONES
        //xpos ypos x y
        this.room4_top_left_info = new Phaser.Geom.Rectangle(175, 100, 240, 150);
        this.room4_graphics.fillRectShape(this.room4_top_left_info);
        
        this.room4_top_mid_info = new Phaser.Geom.Rectangle(650, 150, 240, 150);
        this.room4_graphics.fillRectShape(this.room4_top_mid_info);
        
        this.room4_top_right_info = new Phaser.Geom.Rectangle(1120, 150, 240, 150);
        this.room4_graphics.fillRectShape(this.room4_top_right_info);

        //BOTTOM ZONES
        this.room4_bot_left_info = new Phaser.Geom.Rectangle(175, 610, 240, 150);
        this.room4_graphics.fillRectShape(this.room4_bot_left_info);

        this.room4_bot_mid_info = new Phaser.Geom.Rectangle(650, 565, 240, 150);
        this.room4_graphics.fillRectShape(this.room4_bot_mid_info);
        
        this.room4_bot_right_info = new Phaser.Geom.Rectangle(1120, 565, 240, 150);
        this.room4_graphics.fillRectShape(this.room4_bot_right_info);

        this.room4_hole_zone_nextRoom = new Phaser.Geom.Rectangle(700, 350, 200, 200);
        this.room4_graphics.fillRectShape(this.room4_hole_zone_nextRoom);

        
        this.room4_hole_zone_activity = new Phaser.Geom.Rectangle(220, 450, 220, 150);
        this.room4_graphics.fillRectShape(this.room4_hole_zone_activity);

        //return door
        this.room4_exitDoor = new Phaser.Geom.Rectangle(113, 320, 100, 100);
        this.room4_graphics.fillRectShape(this.room4_exitDoor);

        //coin
        this.coin0_zone = new Phaser.Geom.Rectangle(250, 450, 100, 100);
        this.room4_graphics.fillRectShape(this.coin0_zone);
    }
    
    /* assignKeybinds
     *
     * Sets keybinds to the keyboard
     */
    assignKeybinds() {
        //KEYBOARD INPUT
        this.room4_key_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.room4_key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.room4_key_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.room4_key_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.room4_key_E = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.room4_key_Q = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.room4_key_M = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        this.room4_key_B = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
        this.room4_key_U = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.U);
        this.room4_key_1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        this.room4_key_2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
        this.room4_key_3 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);
        this.room4_key_4 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR);
        this.room4_key_5 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FIVE);
        this.room4_key_R = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.room4_key_H = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);
        this.key_Right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.key_Left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.room4_key_N = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);
    }
}
