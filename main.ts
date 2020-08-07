/**
 * Recording the temperauter 
 * 
 * Student BC - summer of 2020
 */
input.onButtonPressed(Button.B, function () {
    if (Super == 0) {
        Super = 1
        basic.showLeds(`
            . # # # #
            . # . . .
            . # # # .
            . . . # .
            # # # # .
            `)
    } else {
        basic.clearScreen()
        Super = 0
    }
})
let Second_Value = 0
let First_Value = 0
let Super = 0
let Temperatures: number[] = []
let Index = 0
basic.forever(function () {
    // Compares all of the values in the array and finds the highest temperature. Also resets the values in the array. Works incredibly fast!
    if (input.buttonIsPressed(Button.A)) {
        First_Value = Temperatures.pop()
        for (let Index = 0; Index <= Temperatures.length - 1; Index++) {
            Second_Value = Temperatures.pop()
            if (Second_Value >= First_Value) {
                First_Value = Second_Value
            } else {
                continue;
            }
        }
        basic.clearScreen()
        basic.showString("" + First_Value + "C")
        if (Super == 1) {
            basic.showLeds(`
                . # # # #
                . # . . .
                . # # # .
                . . . # .
                # # # # .
                `)
        }
    } else {
        // Normally, the system runs at a more comfortable speed but if one wants real performance they can use the Super mode by clicking the B button.
        // 
        // This will disable the LED so the user won't have feedback but it will greatly increase the speed at which a value is added to the array.
        // 
        // The user can also disable the Super mode by clicking the B button one more time. Changing between the modes is possible without interrupting the data input and without resets
        if (Super == 0) {
            // If button A isn't pressed (we aren't comparing values, just recording temperatures) the micro:bit will record the temperature every 100ms (Actually records ~ once every half second because the LED's add some delay) and blink an LED to show it.
            Temperatures.push(input.temperature())
            basic.pause(100)
            basic.showLeds(`
                . . . . .
                . . . . .
                . . . . .
                . . . . .
                . . . . #
                `)
            basic.clearScreen()
        } else {
            Temperatures.push(input.temperature())
        }
    }
})
