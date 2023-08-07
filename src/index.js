const Phaser = require('phaser');
const Player = require('./player.js').default;
const Enemy = require('./enemy.js').default;
import Example2 from './Example2';

let player;
let enemy;
let platform;

let config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 1000,
    physics: {
        default: 'arcade'
    },
    scene: [{
        preload: preload,
        create: create,
        update: update,
    }, Example2]
};

let game = new Phaser.Game(config);

function preload() {
    this.load.image('floor-tiles', 'tilesets/A5_SciFi.png');
    this.load.image('wall-tiles', 'tilesets/Ship2_Bottom.png');
    this.load.tilemapTiledJSON('starship', 'tilesets/Starship-Map.json');
    // this.load.image('ship', '/images/Ship3_Bottom.png');
    // this.load.image('space', '/images/Background.png');
    // this.load.image('alien', '/images/Aliens.png');
    // this.load.image('door', '/images/ShipDoor.png');
    // this.load.image('background', '/Starship-Map.png');
    this.load.spritesheet('captain', '/images/YappinToTheCaptain.png', { frameWidth: 80, frameHeight: 80 });
    this.load.spritesheet('alien', '/images/femaleCaptain.png', { frameWidth: 80, frameHeight: 80});

}

function create() {
    const map = this.make.tilemap({key: 'starship'});
    const floorTileset = map.addTilesetImage('floor', 'floor-tiles');
    const wallTileset = map.addTilesetImage('wall1', 'wall-tiles');

    map.createLayer('Ground', floorTileset, 0, 0);
    const wallsLayer = map.createLayer('Walls', wallTileset, 0, 0);

    wallsLayer.setCollisionByProperty({collides: true});

    player = new Player(this, 400, 300);
    // player.sprite.setImmovable(true)
    this.physics.add.collider(player.sprite, wallsLayer);

    enemy = new Enemy(this, 600, 300);
    enemy.sprite.setImmovable(true)
    this.physics.add.collider(enemy.sprite, wallsLayer);

    this.physics.add.collider(player.sprite, enemy.sprite, function () {
        player.sprite.setTint(0xff0000)
    })

    // platform = this.physics.add.staticGroup();
    // let door = platform.create(160, 0, 'door').setAlpha(0);
    // this.physics.add.collider(player.sprite, door, function () {
    //     this.scene.start('Example2')
    // }, null, this);
}

function update() {
    player.update();
    enemy.update(player);
}
