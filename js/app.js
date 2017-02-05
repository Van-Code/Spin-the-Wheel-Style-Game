     var game;
     var wheel;
     var canSpin;
     var slices = 16;
     var prize;

     // PLAYGAME STATE

     var playGame = function(game){};

     playGame.prototype = {
          // function to be executed once the state preloads
        preload: function(){
			//scaling options
			game.scale.pageAlignHorizontally = true;
			//game.scale.pageAlignVertically = true;
			game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

			//screen size will be set automatically
			game.scale.updateLayout(true);
			// preloading graphic assets
			game.load.image("wheel", "images/wheel.png");
			game.load.image("pin", "images/pin.png");
		},
		// function to be executed when the state is created
		create: function(){
			// giving some color to background
			game.stage.backgroundColor = "#880044";
			game.stage.disableVisibilityChange = true;
			// adding the wheel in the middle of the canvas
			wheel = game.add.sprite(game.width / 2, game.width / 2, "wheel");
			// setting wheel registration point in its center
			wheel.anchor.set(0.5);
			// adding the pin in the middle of the canvas
			var pin = game.add.sprite(game.width / 2, game.width / 2.5, "pin");
			// setting pin registration point in its center
			pin.anchor.set(0.5);
			// the game has just started = we can spin the wheel
			canSpin = true;
		}
	};

	$('#spin-btn').click(function(){
		clickPlay();
	});
	$('.ui-dialog-titlebar-close').click(function(){
		$('#js-game-cta img').addAttr('id','spin-btn');
	})
	function drawGame(){
		// creation of  game
		game = new Phaser.Game(510,510, Phaser.CANVAS,'gamestage',null,true);
		// adding "PlayGame" state
		game.state.add("PlayGame",playGame);
		// launching "PlayGame" state
		game.state.start("PlayGame");
	};

	function clickPlay() {
		$('.ui-dialog-content').dialog("close");
        // the wheel will spin round from 2 to 4 times. This is just choreography
        var rounds = game.rnd.between(2, 4),

        // get random boolean to determine win or lose
        var random_boolean = Math.random() >= 0.5;
        degrees = '';
        // if winner is true stop between these degrees. else between the second set of degrees. This is the actual spin
        if(random_boolean){
			degrees = game.rnd.between(341, 362);
        }else{
			degrees = game.rnd.between(274, 293);
        }
        canSpin = true;
        var spinTween = game.add.tween(wheel).to({
             angle: 360 * rounds + degrees
        }, 3000, Phaser.Easing.Quadratic.Out, true);
        // once the tween is completed, call winPrize function
        spinTween.onComplete.add( function(){ this.winPrize(random_boolean); }, this);
      
	};
	function winPrize(result){
		if(result){
			var copy = '<h1>Congratulations!</h1> <p>You won! You can keep playing!</p>'
		}else{
			var copy = '<h1>Sorry!</h1> <p>You did not win! Try again.</p>'
		}
		$('#result').html(copy);
		$('#result').dialog();
    };



	drawGame();