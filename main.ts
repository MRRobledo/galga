namespace SpriteKind {
    export const proyectile2 = SpriteKind.create()
    export const levelboss = SpriteKind.create()
}
function create_player () {
    mySprite = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . b b . . . . . . . . . . . . 
        . . b b b . . . . . . . . . . . 
        . . b b b b . . . . . . . . . . 
        . . b b b b b b b b 9 9 9 . . . 
        . . b b b b b b b b b 9 9 9 . . 
        . . b b b b b b b b b b b b b . 
        . . . . . . b b b . . . . . . . 
        . . . . . . b b . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Player)
    mySprite.setPosition(30, 55)
    mySprite.setFlag(SpriteFlag.StayInScreen, true)
    controller.moveSprite(mySprite, 100, 100)
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . 2 8 8 8 8 8 8 8 . . . . . 
        . . . 2 8 8 8 8 8 8 8 8 . . . . 
        . . . 2 8 8 8 8 8 8 8 . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, mySprite, 200, 0)
    music.pewPew.play()
})
function boss_battle () {
    boss = sprites.create(img`
        . . 4 4 4 . . . . 4 4 4 . . . . 
        . 4 5 5 5 e . . e 5 5 5 4 . . . 
        4 5 5 5 5 5 e e 5 5 5 5 5 4 . . 
        4 5 5 4 4 5 5 5 5 4 4 5 5 4 . . 
        e 5 4 4 5 5 5 5 5 5 4 4 5 e . . 
        . e e 5 5 5 5 5 5 5 5 e e . . . 
        . . e 5 f 5 5 5 5 f 5 e . . . . 
        . . f 5 5 5 4 4 5 5 5 f . . f f 
        . . f 4 5 5 f f 5 5 6 f . f 5 f 
        . . . f 6 6 6 6 6 6 4 4 f 5 5 f 
        . . . f 4 5 5 5 5 3 5 4 4 5 f . 
        . . . f 5 5 5 5 5 4 5 5 f f . . 
        . . . f 5 f f f 5 f f 5 f . . . 
        . . . f f . . f f . . f f . . . 
        `, SpriteKind.levelboss)
    boss.setPosition(130, 55)
    bosslife = 1
    bosshits = Level * 10
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.levelboss, function (sprite, otherSprite) {
    sprite.destroy()
    bosshits += -1
    if (bosshits == 0) {
        boss.destroy(effects.fire, 100)
        Level += 1
        speed = speed - 10
        bosslife = 0
        bosshits = Level * 10
        scene.setBackgroundColor(randint(0, 15))
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    info.changeLifeBy(1)
    mySprite2.destroy(effects.hearts, 200)
    music.powerUp.play()
})
sprites.onOverlap(SpriteKind.proyectile2, SpriteKind.Player, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    mySprite.destroy()
    create_player()
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeScoreBy(1)
    if (info.score() % 100 == 0) {
        mySprite2 = sprites.create(img`
            . . . . . . . e c 7 . . . . . . 
            . . . . e e e c 7 7 e e . . . . 
            . . c e e e e c 7 e 2 2 e e . . 
            . c e e e e e c 6 e e 2 2 2 e . 
            . c e e e 2 e c c 2 4 5 4 2 e . 
            c e e e 2 2 2 2 2 2 4 5 5 2 2 e 
            c e e 2 2 2 2 2 2 2 2 4 4 2 2 e 
            c e e 2 2 2 2 2 2 2 2 2 2 2 2 e 
            c e e 2 2 2 2 2 2 2 2 2 2 2 2 e 
            c e e 2 2 2 2 2 2 2 2 2 2 2 2 e 
            c e e 2 2 2 2 2 2 2 2 2 2 4 2 e 
            . e e e 2 2 2 2 2 2 2 2 2 4 e . 
            . 2 e e 2 2 2 2 2 2 2 2 4 2 e . 
            . . 2 e e 2 2 2 2 2 4 4 2 e . . 
            . . . 2 2 e e 4 4 4 2 e e . . . 
            . . . . . 2 2 e e e e . . . . . 
            `, SpriteKind.Food)
        mySprite2.setPosition(160, randint(10, 110))
        mySprite2.setVelocity(-50, 0)
    }
    if (info.score() % 30 == 0) {
        boss_battle()
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    mySprite.destroy(effects.fire, 200)
    pause(200)
    create_player()
})
let boogie: Sprite = null
let projectile2: Sprite = null
let mySprite2: Sprite = null
let bosshits = 0
let bosslife = 0
let boss: Sprite = null
let projectile: Sprite = null
let mySprite: Sprite = null
let speed = 0
let Level = 0
music.setVolume(10)
music.playMelody("A G F G A G F G ", 120)
info.setLife(3)
Level = 1
speed = -20
create_player()
game.onUpdateInterval(1000 / Level, function () {
    if (bosslife == 1) {
        projectile2 = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . 8 8 8 8 8 8 8 2 . . . . 
            . . . f 8 8 8 8 8 8 8 2 . . . . 
            . . . . 8 8 8 8 8 8 8 2 . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.proyectile2)
        projectile2.setPosition(130, 55)
        projectile2.setVelocity(-50, randint(-30, 30))
    }
})
game.onUpdateInterval(500, function () {
    boogie = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . 9 9 9 9 9 . . . . . . 
        . . . . 9 9 9 f 9 9 9 . . . . . 
        . . . . 9 c c c c c 9 . . . . . 
        . . . . c c c c c c c . . . . . 
        . . . . c c c c c c c . . . . . 
        . . . c c c c c c c c c . . . . 
        . . . . 2 2 2 2 2 2 2 . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Enemy)
    boogie.setVelocity(speed, 0)
    boogie.setPosition(180, randint(10, 110))
})
