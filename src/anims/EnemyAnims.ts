import Phaser from 'phaser'

const createFliegeAnims = (anims: Phaser.Animations.AnimationManager) =>{

    anims.create({
        key: 'fliege-right',
        frames: anims.generateFrameNumbers('gelbeFliegeAnims', { start: 0, end: 3}),
        frameRate:10,
        repeat: -1,
      });

}

export{
    createFliegeAnims
}