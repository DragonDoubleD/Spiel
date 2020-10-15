import 'phaser'

//import GameOverScene from './scenes/gameOverScene';
//import ShooterScene from './scenes/shooterScene';
import WelcomeScene from './scenes/welcomeScene';



const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  backgroundColor: '#ffffff',
  scale: {
    parent: 'phaser-game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
   
  },
  scene: [WelcomeScene],
  physics: {
    default: 'arcade',
  arcade: {
    gravity: { y: 300 },
    debug: false
},
  },
}

window.addEventListener('load', () => {
  const game = new Phaser.Game(config)
})
