var game = new Phaser.Game(800, 600, Phaser.AUTO, { preload: preload, create: create, update: update });
var vitesse = 350;
var meillScore = 0;
var dodger = {
    preload: function(){
        //chargement de nos images
        game.load.image('fond', 'image/background.png');
        game.load.image('player', 'image/brave.png');
        game.load.image('mechant', 'image/block.png');
    },
    create:function(){
        //setup + affichage
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.add.sprite(0,0,'fond');
        this.player = game.add.sprite(300,500,'player');
        game.physics.arcade.enable(this.player);
        this.cursors = game.input.keyboard.createCursorKeys();
        
        this.mechants = game.add.group();
        this.timer = game.time.events.loop(300,this.ajouterUnMechant,this);
        this.score = 0;
        this.labelScore = game.add.text(100,08,"0");
    },
    update:function(){
        //logik du jeu
        game.physics.arcade.overlap(this.player,this.mechants,this.restartGame,null,this);
        this.player.body.velocity.x = 0;
        this.player.body.velocity.y = 0;
        if(this.cursors.left.isDown){
            this.player.body.velocity.x = vitesse * -1;
        }
        if(this.cursors.right.isDown){
            this.player.body.velocity.x = vitesse * 1;
        }
        if(this.cursors.up.isDown){
            this.player.body.velocity.y = vitesse * -1;
        }
        if(this.cursors.down.isDown){
            this.player.body.velocity.y = vitesse * 1;
        }
        if(this.player.inWorld == false){
            this.restartGame();
        }
        if(this.score>meillScore){
            meillScore = this.score;
        }
    },
    restartGame: function(){
        game.state.start('dodger');
        alert(`VOUS AVEZ PERDU . VOTRE SCORE EST: ${this.score}
Le meilleur score est: ${meillScore}`);
    },
    ajouterUnMechant: function(){
        var position = Math.floor(Math.random()* 550) + 1;
        var mechant = game.add.sprite(position,-110,'mechant');
        game.physics.arcade.enable(mechant);
        mechant.body.gravity.y = 350;
        
        this.score += 30;
        this.labelScore.text = this.score;
        this.mechants.add(mechant);
    }
}
game.state.add('dodger', dodger);
game.state.start('dodger');
