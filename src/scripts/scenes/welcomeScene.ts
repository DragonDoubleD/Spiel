import { Scene } from 'phaser';

class WelcomeScene extends Scene {
    //Deklaration
    private platforms?: Phaser.Physics.Arcade.StaticGroup
    private figur1?: Phaser.Physics.Arcade.Sprite
    private cursors ?:Phaser.Types.Input.Keyboard.CursorKeys
    private fruitCollection?: Phaser.Physics.Arcade.Group

  constructor() {
    super({ key: 'WelcomeScene' });
  }

  preload(): void {
    this.load.image("background", "assets/img/bergLandschaft.png");
    this.load.image("black", "assets/img/black.png");
    this.load.image("ground", "assets/img/ground.png");
    this.load.image("figur1", "assets/img/figur1.png");
    this.load.image("wumpa", "assets/img/wumpa.png");
    this.load.image("rosa", "assets/img/Background.png");
  }

  create(): void {

    this.add
      .tileSprite(
        0,
        0,
        this.textures.get('background').getSourceImage().width,
        this.textures.get('background').getSourceImage().height,
        'background'
      )
      .setOrigin(0, 0)
      .setScale(this.game.canvas.height / this.textures.get('background').getSourceImage().height);


    //Figur1
    this.figur1 = this.physics.add.sprite(100, 50, 'figur1');
    this.figur1.setScale(0.3);
    this.figur1.setBounce(0.7);
    this.figur1.setCollideWorldBounds(true);



    //Platformen 
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(1000, 765, 'rosa').setScale(5, 0.03);
    //this.platforms.create(100, 650, 'rosa').setScale(0.25,0.03);
    //this.platforms.create(1000, 550, 'rosa').setScale(0.25,0.03);


    this.physics.add.collider(this.figur1, this.platforms)
  
    this.fruitCollection = this.physics.add.group({
      key :'wumpa',
      repeat: 5,
      setXY: {x:10, y : 0, stepX:100}
  });
 

  this.fruitCollection.children.iterate(function (c){
    const child = c as Phaser.Physics.Arcade.Image
      child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.5));
      child.setScale(0.2);
      child.setCollideWorldBounds(true);
  });

  this.physics.add.collider (this.fruitCollection, this.platforms);
  this.physics.add.overlap(this.figur1,this.fruitCollection, collectFruits, null, this);

  function collectFruits( figur1, fruitCollection) {
      fruitCollection.disableBody(true, true);
  }

 
  this.cursors = this.input.keyboard.createCursorKeys();


  





  }

  update(){
    
   
    var speed = 3;
    if (this.cursors.right.isDown) {
      this.figur1.x += speed;
      this.figur1.angle = 50;
  } else if (this.cursors.left.isDown){
    this.figur1.x -= speed;
    this. figur1.angle = -150;
  } else if (this.cursors.down.isDown){
    this.figur1.y += speed + 6;
    this. figur1.angle = 50;
  }else if (this.cursors.up.isDown){
    this. figur1.y -= speed;
    this.figur1.angle = -90;
  } else if(this.cursors.up?.isDown &&this.figur1?.body.touching.down){
    this. figur1.setVelocityY(-330)
  }

  }

}
export default WelcomeScene;
