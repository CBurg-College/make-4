let player_x: number
let player_y: number
let goal_x: number
let dir: number
let play: boolean = false

let logoHandler: () => void

basic.showIcon(IconNames.Heart)

function randomDir(): number {
    if (Math.randomBoolean())
        return 1
    else
        return 0
}

function gameOver() {
    play = false
    basic.pause(500)
    if (player_x == goal_x)
        basic.showIcon(IconNames.Happy)
    else
        basic.showIcon(IconNames.Sad)
    basic.pause(1000)
    basic.showIcon(IconNames.Heart)
}

basic.forever(function () {
    if (!play) return
    basic.pause(200)
    led.unplot(goal_x, 4)
    goal_x += dir * randomDir()
    if (goal_x > 4) {
        dir = -1
        goal_x = 3
    }
    if (goal_x < 0) {
        dir = 1
        goal_x = 1
    }
    led.plot(goal_x, 4)
})

basic.forever(function () {
    if (!play) return
    basic.pause(1000)
    led.unplot(player_x, player_y)
    player_y += 1
    led.plot(player_x, player_y)
    if (player_y == 4) {
        gameOver()
    }
})

input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    if (logoHandler) logoHandler()
})

//% color="#00CC00" icon="\uf1f9"
//% block="Game"
//% block.loc.nl="Spel"
namespace Game {

    //% block="start the game"
    //% block.loc.nl="start het spel"
    export function startGame() {
        basic.clearScreen()
        basic.pause(1000)
        player_x = 2
        player_y = 0
        goal_x = 2
        dir = (Math.randomBoolean() ? 1 : -1)
        led.plot(player_x, player_y)
        led.plot(goal_x, 4)
        play = true
    }

    //% block="step to the left"
    //% block.loc.nl="stapje naar links"
    export function stepLeft() {
        if (!play) return
        led.unplot(player_x, player_y)
        player_x -= 1
        if (player_x < 0) player_x = 0
        led.plot(player_x, player_y)
    }

    //% block="step to the right"
    //% block.loc.nl="stapje naar rechts"
    export function stepRight() {
        if (!play) return
        led.unplot(player_x, player_y)
        player_x += 1
        if (player_x > 4) player_x = 4
        led.plot(player_x, player_y)
    }

    //% color="#FFC000"
    //% block="when logo is pressed"
    //% block.loc.nl="wanneer op het logo wordt gedrukt"
    export function onStart(code: () => void): void {
        logoHandler = code
    }
}
