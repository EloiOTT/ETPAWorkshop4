var config = {
	type: Phaser.AUTO,
	width: 1024,
	height: 768,
physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 },
            debug: true
        }
    },
scene: {
		preload: preload,
		create: create,
		update: update
	}
};

var game = new Phaser.Game(config);
var items = 0;
var platforms;
var player;
var cursors;
var item;
var itemsText;
var pique;
var pv = 3;
var pvtext;


function preload(){
	this.load.image('background','assets/fond_n1.png');
	this.load.image('item','assets/magnavox.png');
	this.load.image('sol','assets/plateformmm.png');
	this.load.image('piege','assets/pique.png');
	this.load.spritesheet('perso','assets/perso.png',{frameWidth: 32, frameHeight: 32});
}



function create(){
	this.add.image(0,0,'background');

	platforms = this.physics.add.staticGroup();
	platforms.create(400,800,'sol').setScale(2).refreshBody();
	platforms.create(200,800,'sol').setScale(2).refreshBody();
	platforms.create(600,800,'sol').setScale(2).refreshBody();
	platforms.create(0,800,'sol').setScale(2).refreshBody();
	platforms.create(800,750,'sol');
	platforms.create(900,700,'sol');
	platforms.create(1000,650,'sol');
	platforms.create(900,600,'sol');
	platforms.create(800,550,'sol');
	platforms.create(650,500,'sol');
	platforms.create(550,500,'sol');
	platforms.create(450,450,'sol');
	platforms.create(350,450,'sol');
	platforms.create(250,450,'sol');
	platforms.create(100,400,'sol');
	platforms.create(0,350,'sol');
	platforms.create(100,300,'sol');
	platforms.create(200,250,'sol');
	platforms.create(300,150,'sol');
	platforms.create(400,300,'sol');
	platforms.create(350,300,'sol');
	platforms.create(550,250,'sol');
	platforms.create(650,250,'sol');
	platforms.create(750,250,'sol');
	platforms.create(900,200,'sol');
	platforms.create(1000,200,'sol');


	player = this.physics.add.sprite(100,450,'perso');
	player.setCollideWorldBounds(true);
	player.setBounce(0.1);
	player.body.setGravityY(000);
	this.physics.add.collider(player,platforms);

	cursors = this.input.keyboard.createCursorKeys();

	this.anims.create({
		key:'left',
		frames: this.anims.generateFrameNumbers('perso', {start: 0, end: 3}),
		frameRate: 10,
		repeat: -1
	});

	this.anims.create({
		key:'stop',
		frames: [{key: 'perso', frame:0}],
		frameRate: 20
	});

	items = this.physics.add.group({
		key: 'item',
		repeat:0,
		setXY: {x:12,y:0,stepX:70}
	});

	this.physics.add.collider(item,platforms);
	this.physics.add.overlap(player,item,collectItem,null,this);

	itemsText = this.add.text(16,16, 'items: 0', {fontSize: '32px', fill:'#FFF'});
	pvtext = this.add.text(16,50, 'pv: 3', {fontSize: '30px', fill:'#FFF'});
	pique = this.physics.add.group();
	this.physics.add.collider(player,pique, hitPique, null, this);
}



function update(){
	if(cursors.left.isDown){
		player.anims.play('left', true);
		player.setVelocityX(-200);
		player.setFlipX(true);
	}else if(cursors.right.isDown){
		player.setVelocityX(200);
		player.anims.play('left', true);
		player.setFlipX(false);
	}else{
		player.anims.play('stop', true);
		player.setVelocityX(0);
	}

	if(cursors.up.isDown && player.body.touching.down){
		player.setVelocityY(-150);
	}

	if(cursors.down.isDown){
		player.setVelocityY(200);
	}

}
function hitPique(player, pique){
	pv -= 1;
	pvtext.setText('pv: ' + pv);
	if(pv<1){
		this.physics.pause();
		player.setTint(551010);
		player.anims.play('turn');
		gameOver=true;
	}
}

function collectItem(player, item){
	item.disableBody(true,true);
	items += 1;
	itemsText.setText('items: '+items);
	if(items.countActive(true)===0){
		items.children.iterate(function(child){
			child.enableBody(true,child.x,0, true, true);
		});

		var x = (player.x < 400) ?
			Phaser.Math.Between(400,800):
			Phaser.Math.Between(0,400);
		var pique = pique.create(x, 16, 'pique');
	}
}
