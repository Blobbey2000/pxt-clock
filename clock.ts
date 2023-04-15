let hoursOfTheClock = 0
let minutesOfTheClock = 0
let secondsOfTheClock = 0
let speedOfTheClock = 1000
let clockOnOrOff = false

//% color="#C009AF"
//% icon="\uf017"
//% blockGap="8"
//% groups='["Clock", "Clock Settings"]'
namespace Clock {

    /**
     * Creates a customizable clock.
     */
    //% block="set clock time to $hour : $minute : $second"
    //% group="Clock"
    //% weight=2
    //% hour.min=1 hour.max=12
    //% minute.min=0 minute.max=59
    //% second.min=0 second.max=59
    export function makeClock(hour: number, minute: number, second: number) {
    hoursOfTheClock = hour
    minutesOfTheClock = minute
    secondsOfTheClock = second
    clockOnOrOff = true
    
    }
    
    /**
     * Returns the clock time. Expanding the block will give the option to make seconds visible.
     */
    //% block="clock time || with seconds $visible"
    //% duration.shadow=timePicker
    //% expandableArgumentMode="enabled"
    //% group="Clock"
    //% weight=1
    export function clockTime(visible?: boolean) {
        if (visible) {
            if (secondsOfTheClock < 10 && minutesOfTheClock < 10) {
                return hoursOfTheClock + ":" + "0" + minutesOfTheClock + ":" + "0" + secondsOfTheClock;
            } else if (secondsOfTheClock < 10) {
                return hoursOfTheClock + ":" + minutesOfTheClock + ":" + "0" + secondsOfTheClock;
            } else if (minutesOfTheClock < 10) {
                return hoursOfTheClock + ":" + "0" + minutesOfTheClock + ":" + secondsOfTheClock;
            } else {
                return hoursOfTheClock + ":" + minutesOfTheClock + ":" + secondsOfTheClock;
            }
        } else {
            if (minutesOfTheClock < 10) {
                return hoursOfTheClock + ":" + "0" + minutesOfTheClock;
            } else {
                return hoursOfTheClock + ":" + minutesOfTheClock;
            }
        }
    }

    /**
     * Determines the amount of time it takes for one second to pass, and thus changes the speed at which the clock runs.
     */
    //% block="set one second duration to $speed ms"
    //% group="Clock Settings"
    //% weight=5
    //% speed.defl=1000
    export function clockSpeed(speed: number) {
        speedOfTheClock = speed
    }
    
    /**
     * Turns the clock on and off.
     */
    //% block="clock on $onoff"
    //% group="Clock Settings"
    //% weight=4
    export function clockToggle(onoff: boolean) {
        clockOnOrOff = onoff
    }

    /**
     * Returns a boolean: true if the clock is running, false if it's not.
     */
    //% block
    //% group="Clock Settings"
    //% weight=3
    export function isClockRunning(): boolean {
        if (clockOnOrOff) {
            return true;
        } else {
            return false;
        }
    }

}

forever(function() {
    if (secondsOfTheClock < 0) {
        secondsOfTheClock = secondsOfTheClock * -1
    }
    if (minutesOfTheClock < 0) {
        minutesOfTheClock = minutesOfTheClock * -1
    }
    if (hoursOfTheClock < 0) {
        hoursOfTheClock = hoursOfTheClock * -1
    }
    if (hoursOfTheClock == 0) {
        hoursOfTheClock = 1
    }
    pause(speedOfTheClock)
    if (clockOnOrOff) {
        secondsOfTheClock += 1
        if (secondsOfTheClock >= 60) {
            secondsOfTheClock = 0
            minutesOfTheClock += 1
        }
        if (minutesOfTheClock >= 60) {
            minutesOfTheClock = 0
            hoursOfTheClock += 1
        }
        if (hoursOfTheClock >= 13) {
            hoursOfTheClock = 1
        }

    }
})
