class two_activityB extends Phaser.Scene {
    constructor() {
        super("two_ActivityB");
        this.room2b_quizActive = false;
        this.room2b_activatedQuiz = false;
        this.room2b_unlocked = false;
        this.room2b_paperMoveable = false;
        this.room2b_helpOpen = false;
        this.holeOpened = false;
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
        if (this.room2b_key_H.isDown) {
            this.helpMenu();
        }

        if (this.room2b_key_U.isDown && this.room2b_unlocked == false) {
            this.room2b_unlocked = true;
        }

        if (this.room2b_key_M.isDown) {
            this.room2b_map.alpha = 1.0;
            characterMoveable = false;
            this.room2b_character_north.alpha = 0.0;
            this.room2b_character_east.alpha = 0.0;
            this.room2b_character_south.alpha = 0.0;
            this.room2b_character_west.alpha = 0.0;
        }

        if (this.room2b_key_B.isDown) {
            this.room2b_notebook.alpha = 1.0;
            room2b_characterMoveable = false;
            this.room2b_character_north.alpha = 0.0;
            this.room2b_character_east.alpha = 0.0;
            this.room2b_character_south.alpha = 0.0;
            this.room2b_character_west.alpha = 0.0;
        }


        if (this.room2b_key_Q.isDown) {
            this.quitInteraction();
        }

        if (this.room2b_quizActive == true && this.room2b_activatedQuiz == false && this.room2b_key_E.isDown) {
            this.activateQuiz();
            this.room2b_activatedQuiz = true;
        }

        if (this.room2b_quizActive == true && this.room2b_key_Q.isDown && this.room2b_activatedQuiz == true) {
            this.quitQuiz();
            this.room2b_activatedQuiz = false;
        }

        if (this.room2b_activatedQuiz == false) {
            this.movePlayer();
            this.checkInteractValidity();
            this.room2b_characterMoveable = true;
        } else if (this.activatedQuiz = true) {
            if (this.correctCount == 1) {
                this.moveQuestion(this.quizQuestion);
                this.checkCorrectQuestionOne();
            } else if (this.correctCount == 2) {
                this.moveQuestion(this.quizQuestion2);
                this.checkCorrectQuestionTwo();
            } else if (this.correctCount == 3) {
                this.moveQuestion(this.quizQuestion3);
                this.checkCorrectQuestionThree();
            } else if (this.correctCount == 4) {
                this.moveQuestion(this.quizQuestion4);
                this.checkCorrectQuestionFour();
            }

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
        this.load.image('room2b_pressr', 'assets/pressr.png');
        this.load.image('room2b_one_lesson_BG', 'assets/one_lesson_BG.png');
        this.load.image('room2b_character_north', 'assets/character_north.png');
        this.load.image('room2b_character_east', 'assets/character_east.png');
        this.load.image('room2b_character_south', 'assets/character_south.png');
        this.load.image('room2b_character_west', 'assets/character_west.png');
        this.load.image('room2b_redCharacter', 'assets/redCharacter.png');
        this.load.image('room2b_E_KeyImg', 'assets/E_Key.png');
        this.load.image('room2b_floor', 'assets/floor_two_activity_2.jpg');
        this.load.image('room2b_map', 'assets/map.png');
        this.load.image('room2b_notebook', 'assets/notebook.png');
        this.load.image('room2b_activityLocked', 'assets/activityLocked.png');
        this.load.image('room2b_help_menu', 'assets/help_menu.png');
        this.load.image('couple', 'assets/couple.png');
        this.load.image('question', 'assets/question.png');
        this.load.image('questionStack', 'assets/questionStack.png');
        this.load.image('incomeStatement' , 'assets/incomeStatement.png');
        this.load.image('balanceSheet', 'assets/balanceSheet.png');
        this.load.image('retainedEarnings' , 'assets/retainedEarnings.png')
            this.load.image('cashFlows' , 'assets/cashFlows.jpg');
        this.load.image('room2b_hole', 'assets/hole.png');

    }

    /* createImages
     *
     * Adds the image to the game board
     */
    createImages() {
        this.room2b_e_pressed = false;
        this.room2b_papers_moved = false;
        this.room2b_background = this.add.image(768, 432, 'room2b_one_lesson_BG');
        this.room2b_character_north = this.add.image(768, 432, 'room2b_character_north');
        this.room2b_character_east = this.add.image(768, 432, 'room2b_character_east');
        this.room2b_character_south = this.add.image(768, 432, 'room2b_character_south');
        this.room2b_character_west = this.add.image(768, 432, 'room2b_character_west');
        this.room2b_E_KeyImg = this.add.image(this.room2b_character_north.x+40, this.room2b_character_north.y+40, 'room2b_E_KeyImg');
        this.room2b_floor = this.add.image(769, 433, 'room2b_floor');
        this.room2b_map = this.add.image(768, 432, 'room2b_map');
        this.room2b_notebook = this.add.image(768, 432, 'room2b_notebook');
        this.room2b_activityLocked = this.add.image(768, 432, 'room2b_activityLocked');
        this.room2b_help_menu = this.add.image(768, 432, 'room2b_help_menu');
        this.couple = this.add.image(1100, 400, 'couple');
        this.question1 = this.add.image(1095, 305, 'question');
        this.question2 = this.add.image(1125, 310, 'question');
        this.question3 = this.add.image(1060, 310, 'question');
        this.questionStack = this.add.image(100, 100, 'questionStack');
        this.room2b_hole = this.add.image(268, 432, 'room2b_hole');
    }

    /* setAlphas
     *
     * sets the alphas to to items in the game to zero so they are not visible at the beginning.
     */
    setAlphas() {
        this.room2b_map.alpha = 0.0;
        this.room2b_notebook.alpha = 0.0;
        this.room2b_activityLocked.alpha = 0.0;
        this.room2b_E_KeyImg.alpha = 0.0;
        this.room2b_help_menu.alpha = 0.0;
        this.questionStack.alpha = 0.0;
        this.hideActivities();
    }

    /* setDepths
     *
     * Sets the depth of each object on the screen.
     */
    setDepths() {
        this.room2b_floor.setDepth(0);
        this.room2b_character_north.setDepth(50);
        this.room2b_character_east.setDepth(50);
        this.room2b_character_south.setDepth(50);
        this.room2b_character_west.setDepth(50);
        this.room2b_E_KeyImg.setDepth(49);
        this.room2b_map.setDepth(100);
        this.room2b_notebook.setDepth(100);
        this.room2b_help_menu.setDepth(100);
    }

    /* setScales
     *
     * Scales the size of each object.
     */
    setScales() {
        this.room2b_E_KeyImg.setScale(0.4);
        this.room2b_notebook.setScale(0.75);
        this.room2b_map.setScale(0.75);
        this.room2b_character_north.setScale(3);
        this.room2b_character_south.setScale(3);
        this.room2b_character_west.setScale(3);
        this.room2b_character_east.setScale(3);
        this.room2b_floor.scaleY = 1.185;
        this.room2b_floor.scaleX = 1.395;
        this.couple.setScale(.4);
        this.question1.setScale(.09);
        this.question2.setScale(.09);
        this.question3.setScale(.09);
    }

    /* setRotations
     *
     * Sets the rotation that each object sits at.
     */
    setRotations() {
        this.question3.rotation = -.9;
        this.question2.rotation = .9;
    }

    /* createInteractionZones
     *
     * Sets the area that you can interact with each object
     */
    createInteractionZones() {
        this.room2b_graphics = this.add.graphics({fillStyle: {color: 0xFFFFFF, alpha: 0.0}});
        //this.graphicsTest = this.add.graphics({fillStyle: {color: 0x4F4F4F, alpha: 1.0}});
        //TOP ZONES
        //xpos ypos x   y
        this.room2b_quiz_info = new Phaser.Geom.Rectangle(975,250,250,250);
        this.room2b_graphics.fillRectShape(this.room2b_quiz_info);

        this.room2b_middle_info = new Phaser.Geom.Rectangle(700, 350, 200, 200);
        this.room2b_graphics.fillRectShape(this.room2b_middle_info);
      
        this.room2b_hole_zone = new Phaser.Geom.Rectangle(150, 332,240,150);
        this.room2b_graphics.fillRectShape(this.room2b_hole_zone);


    }

    /* assignKeybinds
     *
     * Sets keybinds to the keyboard
     */
    assignKeybinds() {
        //KEYBOARD INPUT
        this.room2b_key_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.room2b_key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.room2b_key_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.room2b_key_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.room2b_key_E = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.room2b_key_Q = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.room2b_key_M = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        this.room2b_key_B = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
        this.room2b_key_U = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.U);
        this.room2b_key_1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        this.room2b_key_2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
        this.room2b_key_3 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);
        this.room2b_key_4 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR);
        this.room2b_key_5 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FIVE);
        this.room2b_key_R = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.room2b_key_H = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);

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
      if (Phaser.Geom.Rectangle.ContainsPoint(this.room2b_hole_zone, this.room2b_character_north)) {
        this.room2b_E_KeyImg.x = this.room2b_character_north.x;
        this.room2b_E_KeyImg.y = this.room2b_character_north.y-75;
        this.room2b_E_KeyImg.alpha = 1.0;
        if (this.room2b_key_E.isDown) {
            this.scene.start("one_Lesson");

        }
       }
        else if (Phaser.Geom.Rectangle.ContainsPoint(this.room2b_quiz_info, this.room2b_character_north)) {
            this.room2b_E_KeyImg.x = this.room2b_character_north.x;
            this.room2b_E_KeyImg.y = this.room2b_character_north.y-75;
            this.room2b_E_KeyImg.alpha = 1.0;
            if (this.room2b_key_E.isDown) {
                this.room2b_activatedQuiz = true;
                this.activateQuiz();
                this.questionStack.alpha = 1;
                this.correctCount = 1;
            }

        } else if(Phaser.Geom.Rectangle.ContainsPoint(this.room2b_middle_info, this.room2b_character_north)) {
            if(this.holeOpened == true) {
                this.room2b_E_KeyImg.x= this.room2b_character_north.x;
                this.room2b_E_KeyImg.y = this.room2b_character_north.y + 75;
                this.room2b_E_KeyImg.alpha = 1.0;

                if(this.room2b_key_E.isDown) {
                    this.scene.start("one_lesson");
                }
            }
        }
        else {
            this.hideActivities();
            this.room2b_E_KeyImg.alpha = 0.0;
        }
    }


    /* setCharacterAlpha
     *
     * Sets the alpha of each facing of the character
     * Call this method with the argument as (N,E,S,W)
     */
    setCharacterAlpha() {
        this.room2b_character_north.alpha = arguments[0];
        this.room2b_character_east.alpha = arguments[1];
        this.room2b_character_south.alpha = arguments[2];
        this.room2b_character_west.alpha = arguments[3];
    }

    /* movePlayer
     *
     *
     */
    movePlayer() {
        //setCharacterAlpha is in helper.js and arguments go N,E,S,W
        this.setCharacterAlpha(0,0,1,0);

        //Character moves up
        if(this.room2b_key_W.isDown && this.room2b_characterMoveable == true) {
            if(this.room2b_character_north.y > 185){
                this.room2b_character_north.y -= 5;
                this.room2b_character_east.y -= 5;
                this.room2b_character_south.y -= 5;
                this.room2b_character_west.y -= 5;

                this.setCharacterAlpha(1,0,0,0);



            }
            //Character moves left
        } if (this.room2b_key_A.isDown && this.room2b_characterMoveable == true) {
            if(this.room2b_character_west.x > 210){
                this.room2b_character_west.x -= 5;
                this.room2b_character_east.x -= 5;
                this.room2b_character_south.x -= 5;
                this.room2b_character_north.x -= 5;

                this.setCharacterAlpha(0,0,0,1);
            }

        }
        //Character moves down
        if (this.room2b_key_S.isDown && this.room2b_characterMoveable == true) {
            if(this.room2b_character_south.y < 680){
                this.room2b_character_south.y += 5;
                this.room2b_character_east.y += 5;
                this.room2b_character_north.y += 5;
                this.room2b_character_west.y += 5;

                this.setCharacterAlpha(0,0,1,0);
            }

        }
        //Character moves right
        if (this.room2b_key_D.isDown && this.room2b_characterMoveable == true) {
            if(this.room2b_character_east.x < 1325){
                this.room2b_character_east.x += 5;
                this.room2b_character_north.x += 5;
                this.room2b_character_south.x += 5;
                this.room2b_character_west.x += 5;

                this.setCharacterAlpha(0,1,0,0);
            }
        }
    }

    /* movePaper
     *
     * makes the paper moveable in the test activity
     */
    moveQuestion(moveThis) {
        if(this.room2b_key_W.isDown && this.questionMoveable == true) {
            moveThis.y -= 7;
        } if (this.room2b_key_A.isDown && this.questionMoveable  == true) {
            moveThis.x -= 7;
        } if (this.room2b_key_S.isDown && this.questionMoveable  == true) {
            moveThis.y += 7;
        } if (this.room2b_key_D.isDown && this.questionMoveable  == true) {
            moveThis.x += 7;
        }
    }

    /* quitInteraction
     *
     * Sets the alphas to 0 so that the interaction is quit.
     */
    quitInteraction() {
        this.room2b_map.alpha = 0.0;
        this.room2b_notebook.alpha = 0.0;
        this.hideActivities();
        this.room2b_help_menu.alpha = 0.0;
        this.room2b_activatedQuiz = false;
        if (this.room2b_quizActivated == true) {
            console.log("a");
            this.quitQuiz();
        }
    }


    hideInteractionBoxes() {

    }

    /* hideActivities
     *
     * Sets the alphas to the activities to 0 so that they are hidden.
     */
    hideActivities() {

    }

    activateQuiz() {
        this.questionStack.setVisible(true);
        this.room2b_quizActivated = true;
        this.questionMoveable = true;
        this.correctCount = 1;
        this.loadQuizImages();
        this.placements = this.add.text(1200, 30, "Correct Placements: 0");
        this.placements.setColor('black');
        this.placements.setFont('bold 30px Arial');	

        this.parentQuestion = this.add.text(400, 40, "What did you spend all your money on?");
        this.parentQuestion.setColor('black');
        this.parentQuestion.setFont('30px Arial');	



        if(this.holeOpened == true) {
            this.hole.alpha = 0;
        }


        this.quizQuestion = this.add.image(this.questionStack.x, this.questionStack.y, 'question');
        this.quizQuestion2 = this.add.image(this.questionStack.x, this.questionStack.y, 'question');
        this.quizQuestion3 = this.add.image(this.questionStack.x, this.questionStack.y, 'question');
        this.quizQuestion4 = this.add.image(this.questionStack.x, this.questionStack.y, 'question');

        this.quizQuestion2.setVisible(false);
        this.quizQuestion3.setVisible(false);
        this.quizQuestion4.setVisible(false);



        this.quizQuestion.setInteractive();
        this.quizQuestion.alpha = 1;
        this.quizQuestion.setDepth(100);
        this.quizQuestion.setScale(.15);

        this.quizQuestion2.setDepth(100);
        this.quizQuestion3.setDepth(100);
        this.quizQuestion4.setDepth(100);

        this.quizQuestion2.setScale(.15);
        this.quizQuestion3.setScale(.15);
        this.quizQuestion4.setScale(.15);



        this.room2b_floor.scaleX = 2;
        this.room2b_floor.scaleY = 2.0;

        this.question1.alpha = 0;
        this.question2.alpha = 0;
        this.question3.alpha = 0;
        this.couple.alpha = 0;
        this.room2b_background.alpha = 0.0;
        this.room2b_character_north.alpha = 0.0;
        this.room2b_character_east.alpha = 0.0;
        this.room2b_character_south.alpha = 0.0;
        this.room2b_character_west.alpha = 0.0;
        this.room2b_E_KeyImg.alpha = 0.0;
        this.room2b_characterMoveable = false;
    }

    quitQuiz() {
        this.loadExit();
        this.papers_moved = false;
        this.placements.setVisible(false);
        this.incomeStatement.setVisible(false);
        this.retainedEarnings.setVisible(false);
        this.balanceSheet.setVisible(false);
        this.cashFlows.setVisible(false);

        this.parentQuestion.setVisible(false);

        this.couple.alpha = 1;

        this.quizQuestion.alpha = 0;
        this.quizQuestion2.alpha = 0;
        this.quizQuestion3.alpha = 0;
        this.quizQuestion4.alpha = 0;

        this.room2b_quizActive = false;
        this.room2b_activatedQuiz= false;
        this.room2b_background.alpha = 1.0;
        this.room2b_character_north.alpha = 1.0;
        this.room2b_character_east.alpha = 1.0;
        this.room2b_character_south.alpha = 1.0;
        this.room2b_character_west.alpha = 1.0;
        this.room2b_E_KeyImg.alpha = 1.0;
        this.questionStack.setVisible(false);

        this.room2b_floor.scaleY = 1.185;
        this.room2b_floor.scaleX = 1.395;
        this.questionMoveable = false;

    }

    /* checkCorrectPaperOne
     *
     * Checks to see if the first paper is in the correct box.
     */
    checkCorrectQuestionOne() {
        if(this.activatedQuiz == true) {
            if (this.room2b_key_R.isDown) {

            }
            else {}
            //THE RIGHT BOX
            if (Phaser.Geom.Rectangle.ContainsPoint(this.box_1_zone, this.quizQuestion)) {
                this.quizQuestion.setVisible(false);
                this.quizQuestion2.setVisible(true);
                this.quizQuestion2.setInteractive();
                this.correctCount++;
                this.loadPlacements();

            } else if (Phaser.Geom.Rectangle.ContainsPoint(this.box_2_zone, this.quizQuestion)) {
                this.quizQuestion.x = this.questionStack.x + 600;
                this.quizQuestion.y = this.questionStack.y + 300;

            } else if (Phaser.Geom.Rectangle.ContainsPoint(this.box_3_zone, this.quizQuestion)) {
                this.quizQuestion.x = this.questionStack.x + 600;
                this.quizQuestion.y = this.questionStack.y + 300;
            } else if (Phaser.Geom.Rectangle.ContainsPoint(this.box_4_zone, this.quizQuestion)) {
                this.quizQuestion.x = this.questionStack.x + 600;
                this.quizQuestion.y = this.questionStack.y + 300;
            }
        }
    }

    /* checkCorrectPaperTwo
     *
     * Checks to see if the second paper is in the correct box.
     */
    checkCorrectQuestionTwo() {
        if (this.room2b_key_R.isDown) {
            //this.retainedEarnings.setVisible(true);
        } else {}


        if (Phaser.Geom.Rectangle.ContainsPoint(this.box_4_zone, this.quizQuestion2)) {
            this.quizQuestion2.setVisible(false);
            this.quizQuestion3.setVisible(true);
            this.quizQuestion3.setInteractive();
            this.correctCount++;
            this.loadPlacements();

        } else if (Phaser.Geom.Rectangle.ContainsPoint(this.box_1_zone, this.quizQuestion2)) {
            this.quizQuestion2.x = this.questionStack.x + 600;
            this.quizQuestion2.y = this.questionStack.y + 300;
        } else if (Phaser.Geom.Rectangle.ContainsPoint(this.box_3_zone, this.quizQuestion2)) {
            this.paperTwo.x = this.questionStack.x + 600;
            this.paperTwo.y = this.questionStack.y + 300;
        } else if (Phaser.Geom.Rectangle.ContainsPoint(this.box_2_zone, this.quizQuestion2)) {
            this.quizQuestion.x = this.questionStack.x + 600;
            this.quizQuestion.y = this.questionStack.y + 300;
        }
    }

    /* checkCorrectPaperThree
     *
     * Checks to see if the third paper is in the correct box.
     */
    checkCorrectQuestionThree() {
        if (this.room2b_key_R.isDown) {

        }	else {}

        if (Phaser.Geom.Rectangle.ContainsPoint(this.box_3_zone, this.quizQuestion3)) {
            this.quizQuestion3.setVisible(false);
            this.quizQuestion4.setVisible(true);
            this.quizQuestion4.setInteractive();
            this.correctCount++;
            this.loadPlacements();

        } else if (Phaser.Geom.Rectangle.ContainsPoint(this.box_1_zone, this.quizQuestion3)) {
            this.quizQuestion3.x = this.questionStack.x + 600;
            this.quizQuestion3.y = this.questionStack.y + 300;

        } else if (Phaser.Geom.Rectangle.ContainsPoint(this.box_2_zone, this.quizQuestion3)) {
            this.quizQuestion3.x = this.questionStack.x + 600;
            this.quizQuestion3.y = this.questionStack.y + 300;
        } else if (Phaser.Geom.Rectangle.ContainsPoint(this.box_3_zone, this.quizQuestion3)) {
            this.quizQuestion.x = this.questionStack.x + 600;
            this.quizQuestion.y = this.questionStack.y + 300;
        } else if (Phaser.Geom.Rectangle.ContainsPoint(this.box_4_zone, this.quizQuestion3)) {
            this.quizQuestion.x = this.questionStack.x + 600;
            this.quizQuestion.y = this.questionStack.y + 300;
        }
    }


    checkCorrectQuestionFour() {
        if (this.room2b_key_R.isDown) {
            this.quitQuiz();
        }	else {}

        if (Phaser.Geom.Rectangle.ContainsPoint(this.box_2_zone, this.quizQuestion4)) {
            this.quizQuestion3.setVisible(false);
            this.correctCount++;
            this.quitQuiz();
            this.loadPlacements();

        } else if (Phaser.Geom.Rectangle.ContainsPoint(this.box_1_zone, this.quizQuestion4)) {
            this.quizQuestion3.x = this.questionStack.x + 600;
            this.quizQuestion3.y = this.questionStack.y + 300;

        }else if (Phaser.Geom.Rectangle.ContainsPoint(this.box_3_zone, this.quizQuestion4)) {
            this.quizQuestion.x = this.questionStack.x + 600;
            this.quizQuestion.y = this.questionStack.y + 300;
        } else if (Phaser.Geom.Rectangle.ContainsPoint(this.box_4_zone, this.quizQuestion4)) {
            this.quizQuestion.x = this.questionStack.x + 600;
            this.quizQuestion.y = this.questionStack.y + 300;
        }
    }

    /* loadQuizImages
     *
     * Loads the images into the quiz Activity
     */
    loadQuizImages(){
        /*
           this.pressr = this.add.image(650, 40, 'pressr');
           this.pressr.setScale(.8);
           */

        this.incomeStatement = this.add.image(1370, 200, 'incomeStatement');
        this.incomeStatement.setScale(.5);

        this.balanceSheet = this.add.image(1375 , 600, 'balanceSheet');
        this.balanceSheet.setScale(.5);

        this.retainedEarnings = this.add.image(850, 750, 'retainedEarnings');
        this.retainedEarnings.setScale(.7);

        this.cashFlows = this.add.image(350, 650, 'cashFlows');
        this.cashFlows.setScale(.5);


        //incomeStatement
        this.box_1_zone = new Phaser.Geom.Rectangle(1250, 100,300,250);
        this.room2b_graphics.fillRectShape(this.box_1_zone);

        //balanceSheet
        this.box_2_zone = new Phaser.Geom.Rectangle(1250,400, 300,375);
        this.room2b_graphics.fillRectShape(this.box_2_zone);

        //retainedEarnings
        this.box_3_zone = new Phaser.Geom.Rectangle(640,700,420,200);
        this.room2b_graphics.fillRectShape(this.box_3_zone);

        //CashFlows
        this.box_4_zone = new Phaser.Geom.Rectangle(250,520,200,400);
        this.room2b_graphics.fillRectShape(this.box_4_zone);
    }

    loadPlacements() {
        if (this.correctCount == 1)
            this.placements.setText("Correct Placements: 0");	
        else if (this.correctCount == 2) {
            this.parentQuestion.setText("Question where cash flows is the answer");		
            this.placements.setText("Correct Placements: 1");
        } else if (this.correctCount == 3) {
            this.parentQuestion.setText("How much money did you save last month?");
            this.placements.setText("Correct Placements: 2");
        } else if (this.correctCount == 4) {
            this.parentQuestion.setText("How much cash do you have on hand?");
            this.placements.setText("Correct Placements: 3");

        }
    }

    loadExit() {
        if (this.holeOpened == true) 
            this.hole.alpha = 1;
        else if (this.correctCount >= 4) {
            this.hole = this.add.image(768, 432, 'hole');
            this.holeOpened = true;
        }
    }	


    /* helpMenu
     *
     * Sets the alpha of the help menu to 1 so that it is visible
     */
    helpMenu() {
        this.room2b_help_menu.alpha = 1.0;
        this.room2b_helpOpen = true;
    }
}
