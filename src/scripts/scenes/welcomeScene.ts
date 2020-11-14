import { Scene } from 'phaser';

class WelcomeScene extends Scene {
  constructor() {
    super({ key: 'WelcomeScene' });
  }

  preload(): void {
    this.load.image("titlepic", "assets/img/welcomeScreen1.png");
    this.load.image("playGame", "assets/img/newButton.png");
    this.load.image("ground", "assets/img/ground.png");
   
   


  }

  create(): void {

    this.add
      .tileSprite(
        0,
        0,
        this.textures.get('titlepic').getSourceImage().width,
        this.textures.get('titlepic').getSourceImage().height,
        'titlepic'
      )
      .setOrigin(0, 0)
      .setScale(this.game.canvas.height / this.textures.get('titlepic').getSourceImage().height);



    const btnPlay = this.add.sprite(this.game.canvas.height * 0.65, this.game.canvas.width * 0.5, "playGame");
    
   btnPlay.setInteractive();
   btnPlay.on('pointerdown', () => this.clickButton());
  /* btnPlay.on('pointerover', function changeButton(){
   btnPlay.setTint()
   });*/
  
  
      
  var text = this.add.text(this.game.canvas.height*0.05 ,this.game.canvas.width*0.2, 'Dinosaur Adventures',
  {
    fontFamily: 'Arial, Helvetica, sans-serif',
    fontSize: '100px',
    color: 'white',
    backgroundColor: '#762B8F',
    stroke:'black',
    strokeThickness: '2',
    fixedHeight: '100',
    fixedWidth: '950',
  

  },
  );

      }
  clickButton(){
  this.scene.start('GameScene');
}








}



export default WelcomeScene;

