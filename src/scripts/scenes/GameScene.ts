import { Scene } from 'phaser';
import {createFliegeAnims} from '../../anims/EnemyAnims';
import {createCharacterAnims} from '../../anims/CharacterAnims';
import Fliege from '../../enemies/Fliege'

const createAligned = (scene, count, texture, scrollFactor) => {
  let x = 0
  for (let i = 0; i < count; ++i) {
    const mountain = scene.add.image(x, scene.scale.height, texture)
      .setOrigin(0, 0.8)
      .setScrollFactor(scrollFactor)

    x += mountain.width
  }

}


class GameScene extends Scene {
  //Deklaration
  private platforms?: Phaser.Physics.Arcade.StaticGroup
  private dinosaur?: Phaser.Physics.Arcade.Sprite
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys
  private fruitCollection?: Phaser.Physics.Arcade.Group
  private gelbeFliegeGruppe?: Phaser.Physics.Arcade.Group
  private camera?: Phaser.Cameras.Controls.SmoothedKeyControl
  private scoreText?: Phaser.GameObjects.Text
  private movingPlatforms? : any //Phaser.Physics.Arcade.Image
  private movingPlatforms1? : any
  private movingPlatforms2? : any
  private movingPlatforms3? : any
  private movingPlatforms4? : any
  private movingPlatforms5? : any
  private movingPlatforms6? : any
  private hit  = 0
  private jumpCount = 0
  private score: number

  private rotefliege1?: Phaser.Physics.Arcade.Sprite;
  private destination?: Phaser.Physics.Arcade.Sprite;
 
  constructor() {
    super({ key: 'GameScene' });
  }

  preload(): void {
    this.load.image("ground", "assets/img/ground.png");
    this.load.spritesheet("dinosaur", "assets/dinoSpritesheet/dinosaurAnims.png", {frameWidth: 444, frameHeight:400});
    this.load.spritesheet( 'dinosaur-fall', "assets/dinoSpritesheet/dinosaurFall.png", {frameWidth: 444, frameHeight:400});
    this.load.image("fruit", "assets/img/fruit.png");
    this.load.image("clouds", "assets/img/clouds.png");
    this.load.image("ground", "assets/img/ground.png");
    this.load.image("mountin", "assets/img/mountin.png");
    this.load.image("sky", "assets/img/sky.png");
    this.load.image("newground", "assets/img/platformGround.png");
    this.load.image("runningGround", "assets/img/runningGround.png");


    //Enemy pictures

    //rote Fliege
    this.load.image('destination', "assets/img/goal.png");
  

    //gelbe Fliege
    this.load.image('gelbeFliegeEnemy', "assets/enemies/gelbeFliege1.png");
 
  }


  create(): void {

    // PParallax Scrolling Background

    const width = this.scale.width;
    const height = this.scale.height;


    this.add.image(width * 0.5, height * 0.5, 'sky')
      .setScrollFactor(0);

    this.add.image(0, 100, 'clouds')
      .setOrigin(0, 0.3)
      .setScrollFactor(0);

    createAligned(this, 3, 'mountin', 0.25)
    createAligned(this, 3, 'ground', 0.5)
    

    this.score = 0;

  this.physics.world.setBounds(0, 0, 1155 * 10, 765);

    //Figur1
    this.dinosaur = this.physics.add.sprite(100, 100, 'dinosaur');
    this.dinosaur.setScale(0.3);
    this.dinosaur.setBounce(0.5);
    this.dinosaur.setCollideWorldBounds(true);
    this.dinosaur.enableBody(true, 100,600, true, true);
   

  
  
 
   //Fliege gelb
    this.gelbeFliegeGruppe = this.physics.add.group({
      classType: Fliege,
      createCallback: (go) =>{
        const FliegeBewegen = go as Fliege
        FliegeBewegen.body.onCollide = true;
      }

    })

   

    this.gelbeFliegeGruppe.get(1000, 500, 'gelbeFliegeEnemy').setScale(0.2);
    this.gelbeFliegeGruppe.get(1700, 200, 'gelbeFliegeEnemy').setScale(0.2);
    this.gelbeFliegeGruppe.get(2500, 300, 'gelbeFliegeEnemy').setScale(0.2);
    this.gelbeFliegeGruppe.get(2800, 500, 'gelbeFliegeEnemy').setScale(0.2);
    this.gelbeFliegeGruppe.get(3550, 300, 'gelbeFliegeEnemy').setScale(0.2);
    this.gelbeFliegeGruppe.get(4000, 300, 'gelbeFliegeEnemy').setScale(0.2);
    this.gelbeFliegeGruppe.get(4700, 430, 'gelbeFliegeEnemy').setScale(0.2);
    this.gelbeFliegeGruppe.get(5200, 300, 'gelbeFliegeEnemy').setScale(0.2);
    this.gelbeFliegeGruppe.get(5950, 300, 'gelbeFliegeEnemy').setScale(0.2);
    this.gelbeFliegeGruppe.get(6500, 550, 'gelbeFliegeEnemy').setScale(0.2);
    this.gelbeFliegeGruppe.get(7100, 250, 'gelbeFliegeEnemy').setScale(0.2);
    this.gelbeFliegeGruppe.get(7500, 350, 'gelbeFliegeEnemy').setScale(0.2);
    this.gelbeFliegeGruppe.get(8100, 250, 'gelbeFliegeEnemy').setScale(0.2);
    this.gelbeFliegeGruppe.get(8850, 300, 'gelbeFliegeEnemy').setScale(0.2);






    this.destination = this.physics.add.sprite(10050,500, 'destination');
    this.destination.setScale(0.3);
    this.destination.setCollideWorldBounds(true);
    this.destination.enableBody(true,10050,500,true,true);
   


//Animationen
createCharacterAnims(this.anims)
createFliegeAnims(this.anims)

//Platforms

this.platforms = this.physics.add.staticGroup()

this.platforms.create(0, 760, 'runningGround').setScale(1155, 0.2).refreshBody();
this.platforms.create(500, 650, 'newground').setScale(0.5).refreshBody();
this.platforms.create(820, 550, 'newground').setScale(0.5).refreshBody();
this.platforms.create(1640, 630, 'newground').setScale(0.5).refreshBody(); 

this.platforms.create(1950, 250, 'newground').setScale(0.5).refreshBody(); 
this.platforms.create(2150, 450, 'newground').setScale(0.5).refreshBody(); 
this.platforms.create(2700, 500, 'newground').setScale(0.5).refreshBody(); 
this.platforms.create(3000, 250, 'newground').setScale(0.5).refreshBody(); 
this.platforms.create(3300, 350, 'newground').setScale(0.5).refreshBody(); 
this.platforms.create(4830, 250, 'newground').setScale(0.5).refreshBody(); 
this.platforms.create(5190, 400, 'newground').setScale(0.5).refreshBody(); 
this.platforms.create(5410, 590, 'newground').setScale(0.5).refreshBody(); 
this.platforms.create(5550, 250, 'newground').setScale(0.5).refreshBody(); 
this.platforms.create(5800, 590, 'newground').setScale(0.5).refreshBody(); 
this.platforms.create(7100, 250, 'newground').setScale(0.5).refreshBody();

this.platforms.create(7300, 550, 'newground').setScale(0.5).refreshBody(); 
this.platforms.create(7650, 550, 'newground').setScale(0.5).refreshBody();
this.platforms.create(8050, 450, 'newground').setScale(0.5).refreshBody();
this.platforms.create(8450, 350, 'newground').setScale(0.5).refreshBody();
this.platforms.create(8850, 250, 'newground').setScale(0.5).refreshBody();
this.platforms.create(9200, 350, 'newground').setScale(0.5).refreshBody();
this.platforms.create(9600, 450, 'newground').setScale(0.5).refreshBody();


//Moving Platforms
this.movingPlatforms = this.physics.add.image(1300,320, 'newground').setScale(0.5);
this.movingPlatforms1 = this.physics.add.image(1150, 450, 'newground').setScale(0.5);
this.movingPlatforms2 = this.physics.add.image(3750,500, 'newground').setScale(0.5);
this.movingPlatforms3 = this.physics.add.image(3900,500, 'newground').setScale(0.5);
this.movingPlatforms4 = this.physics.add.image(4150,350, 'newground').setScale(0.5);
this.movingPlatforms5 = this.physics.add.image(6100,350, 'newground').setScale(0.5);
this.movingPlatforms6 = this.physics.add.image(6300,350, 'newground').setScale(0.5);



this.movingPlatforms.setImmovable(true);
this.movingPlatforms.body.allowGravity = false;
this.movingPlatforms.setVelocityX(30);

this.movingPlatforms1.setImmovable(true);
this.movingPlatforms1.body.allowGravity = false;
this.movingPlatforms1.setVelocityX(30);

this.movingPlatforms2.setImmovable(true);
this.movingPlatforms2.body.allowGravity = false;
this.movingPlatforms2.setVelocityX(30);


this.movingPlatforms3.setImmovable(true);
this.movingPlatforms3.body.allowGravity = false;
this.movingPlatforms3.setVelocityX(30);


this.movingPlatforms4.setImmovable(true);
this.movingPlatforms4.body.allowGravity = false;
this.movingPlatforms4.setVelocityX(30);


this.movingPlatforms5.setImmovable(true);
this.movingPlatforms5.body.allowGravity = false;
this.movingPlatforms5.setVelocityX(30);


this.movingPlatforms6.setImmovable(true);
this.movingPlatforms6.body.allowGravity = false;
this.movingPlatforms6.setVelocityX(30);

// Create Objects

this.fruitCollection = this.physics.add.group({
  key: 'fruit',
  repeat: 60,
  setXY: { x: 200, y: 0, stepX: 150 }
});

//Objects properties and collider

this.fruitCollection.children.iterate(function (c) {
  const child = c as Phaser.Physics.Arcade.Image
  child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.5));
  child.setScale(0.1);
  child.setCollideWorldBounds(true);
});

//Collider
    this.physics.add.collider(this.dinosaur, this.platforms)
    this.physics.add.collider(this.dinosaur, this.movingPlatforms);
    this.physics.add.collider(this.dinosaur, this.movingPlatforms1);
    this.physics.add.collider(this.dinosaur, this.movingPlatforms2);
    this.physics.add.collider(this.dinosaur, this.movingPlatforms3);
    this.physics.add.collider(this.dinosaur, this.movingPlatforms4);
    this.physics.add.collider(this.dinosaur, this.movingPlatforms5);
    this.physics.add.collider(this.dinosaur, this.movingPlatforms6);
    


    this.physics.add.collider(this.fruitCollection, this.platforms);
    this.physics.add.collider(this.fruitCollection, this.movingPlatforms);
    this.physics.add.collider(this.fruitCollection, this.movingPlatforms1);
    this.physics.add.collider(this.fruitCollection, this.movingPlatforms2);
    this.physics.add.collider(this.fruitCollection, this.movingPlatforms3);
    this.physics.add.collider(this.fruitCollection, this.movingPlatforms4);
    this.physics.add.collider(this.fruitCollection, this.movingPlatforms5);
    this.physics.add.collider(this.fruitCollection, this.movingPlatforms6);

    this.physics.add.collider(this.dinosaur, this.destination);
    this.physics.add.collider(this.platforms, this.destination);


    this.physics.add.collider(this.dinosaur, this.destination);
    

    this.physics.add.collider(this.gelbeFliegeGruppe, this.dinosaur);
    this.physics.add.collider(this.gelbeFliegeGruppe, this.platforms);
    this.physics.add.collider(this.gelbeFliegeGruppe, this.movingPlatforms);
    this.physics.add.collider(this.gelbeFliegeGruppe, this.movingPlatforms1);
    this.physics.add.collider(this.gelbeFliegeGruppe, this.movingPlatforms2);
    this.physics.add.collider(this.gelbeFliegeGruppe, this.movingPlatforms3);
    this.physics.add.collider(this.gelbeFliegeGruppe, this.movingPlatforms4);
    this.physics.add.collider(this.gelbeFliegeGruppe, this.movingPlatforms5);
    this.physics.add.collider(this.gelbeFliegeGruppe, this.movingPlatforms6);
  //  this.physics.add.collider(this.gelbeFliegeGruppe, this.fruitCollection);


    this.physics.add.overlap(this.dinosaur, this.fruitCollection, collectFruits,processCallback2, this );

    this.physics.add.overlap(this.dinosaur, this.gelbeFliegeGruppe, startGame, processCallback, this);

    function processCallback2(dinosaur, fruitCollection){
      return true;
    }


    function startGame (this: any, dinosaur, gelbeFliegeGruppe){
      this.scene.start('GameScene')
      this.score = 0;
    }

    function processCallback(dinosaur, gelebFliegeGruppe){
      return true;
    }

    this.physics.add.overlap(this.dinosaur, this.destination, stopGame, processCallback1, this);

    function stopGame (this: any, dinosaur, destination){
      this.scene.start('GameOverScene')
    }

    function processCallback1(dinosaur, destination){
      return true;
    }

//Scoretext
this.scoreText = this.add.text(0, 0, 'score: 0', {
  fontFamily: 'Arial, Helvetica, sans-serif',
    fontSize: '32px',
    color: 'white',
    backgroundColor: '#762B8F',
    stroke:'black',
    strokeThickness: '2',
    fixedHeight: '50',
    fixedWidth: '150',
});


    // Collect Objects and Score
   function collectFruits(this:any,dinosaur, fruitCollection) {
      fruitCollection.disableBody(true, true);

    this.score ++;
    this.scoreText?.setText('score: ' + this.score);

    }

    //Cursors
    this.cursors = this.input.keyboard.createCursorKeys();


    //Camera
    this.cameras.main.setBounds(0, 0, width * 10, height); //endet bei Score =100
    this.cameras.main.startFollow(this.dinosaur)
 
   

    
    


  

  }

  update() {


    // Key properties
    var isUpDown = this.cursors?.up?.isDown;
    var isDownDown = this.cursors?.down?.isDown;
    var isLeftDown = this.cursors?.left?.isDown;
    var isRightDown = this.cursors?.right?.isDown;
    var isSpaceDown = this.cursors?.space?.isDown;
    var touchingGround = this.dinosaur?.body.touching.down;
   
    
    const cam = this.cameras.main
    const speed = 3;

    if(this.hit > 0){
      ++this.hit
      if( this.hit > 10){
        this.hit = 0
      }
      return
    }
   


    this.scoreText?.x = this.cameras.main.scrollX;
    //left

    if (isLeftDown) {
      this.dinosaur?.x -= speed;
      cam.scrollX -= speed;
      this.cameras.main.followOffset.x = 0;
      this.dinosaur?.setVelocityX(-1);

    
   
      
     
    }
    //right
    else if (isRightDown) {
      cam.scrollX += speed
      this.cameras.main.followOffset.x = -0;
      this.dinosaur?.setVelocityX(1);
      this.dinosaur?.x += speed;
    
      
     
    } 
   
    
    const isJumpJustDown = Phaser.Input.Keyboard.JustDown(this.cursors?.up!)
    const isTouchingGround = touchingGround
    //etc
     if (isJumpJustDown && ( isTouchingGround || this.jumpCount < 3)) {
      this.dinosaur?.setVelocityY(-300);
     
     

      ++this.jumpCount;
    }
    if(isTouchingGround && !isJumpJustDown){
      this.jumpCount = 0; 
    //  this.dinosaur?.play('dino-run');
     
    }

    if(isTouchingGround){
      this.dinosaur?.play('dino-run');
    }
  
    
     
    
   

    if (this.movingPlatforms1.x >= 1300)
    {
        this.movingPlatforms1.setVelocityX(-30);
    }
    else if (this.movingPlatforms1.x <= 1200)
    {
      this.movingPlatforms1.setVelocityX(30);
    }

    if (this.movingPlatforms.x >= 1700)
    {
        this.movingPlatforms.setVelocityX(-30);
    }
    else if (this.movingPlatforms.x <= 1550)
    {
      this.movingPlatforms.setVelocityX(30);
    }
   


    if (this.movingPlatforms2.x >= 3700)
    {
        this.movingPlatforms2.setVelocityX(-30);
    }
    else if (this.movingPlatforms2.x <= 3650)
    {
      this.movingPlatforms2.setVelocityX(30);
    }


    if (this.movingPlatforms3.x >= 4100)
    {
        this.movingPlatforms3.setVelocityX(-30);
    }
    else if (this.movingPlatforms3.x <= 3900)
    {
      this.movingPlatforms3.setVelocityX(30);
    }


    if (this.movingPlatforms4.x >= 4600)
    {
        this.movingPlatforms4.setVelocityX(-30);
    }
    else if (this.movingPlatforms4.x <= 4400)
    {
      this.movingPlatforms4.setVelocityX(30);
    }


    if (this.movingPlatforms5.x >= 6200)
    {
        this.movingPlatforms5.setVelocityX(-30);
    }
    else if (this.movingPlatforms5.x <= 6000)
    {
      this.movingPlatforms5.setVelocityX(30);
    }


    if (this.movingPlatforms6.x >= 6710)
    {
        this.movingPlatforms6.setVelocityX(-30);
    }
    else if (this.movingPlatforms6.x <= 6500)
    {
      this.movingPlatforms6.setVelocityX(30);
    }
  

  }
  


}




export default GameScene;
