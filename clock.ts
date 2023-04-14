let hoursOfTheClock = 0
let minutesOfTheClock = 0
let speedOfTheClock = 1000
let clockOnOrOff = false
let amPmTime = ""
let amOrPm = 2

enum AMPM {
    //% block="am"
    AM,
    //% block="pm"
    PM
}

//% color="#C009AF"
//% icon="\uf017"
//% blockGap="8"
//% groups='["Clock", "Clock Settings"]'
namespace Clock {

    /**
     * Creates a customizable clock.
     */
    //% block="set clock time to $hour : $minute $ampm"
    //% group="Clock"
    //% weight=2
    //% hour.min=1 hour.max=12
    //% minute.min=0 minute.max=59
    export function makeClock(hour: number, minute: number, ampm: AMPM) {
        hoursOfTheClock = hour
        minutesOfTheClock = minute
        clockOnOrOff = true
        if (ampm == 0) {
            amPmTime = "am"
            amOrPm = ampm
        } else if (ampm == 1) {
            amPmTime = "pm"
            amOrPm = ampm
        }

    }

    /**
     * Returns the clock time.
     */
    //% block
    //% group="Clock"
    //% weight=1
    export function clockTime() {
        if (amOrPm == 0) {
            if (minutesOfTheClock < 10) {
                return hoursOfTheClock + ":" + "0" + minutesOfTheClock + "am";
            } else {
                return hoursOfTheClock + ":" + minutesOfTheClock + "am";
            }
        } else if (amOrPm == 1) {
            if (minutesOfTheClock < 10) {
                return hoursOfTheClock + ":" + "0" + minutesOfTheClock + "pm";
            } else {
                return hoursOfTheClock + ":" + minutesOfTheClock + "pm";
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
     * Changes the speed at which the clock runs.
     */
    //% block="set clock speed to $speed ms"
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

forever(function () {
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
        minutesOfTheClock += 1
        if (minutesOfTheClock >= 60) {
            minutesOfTheClock = 0
            hoursOfTheClock += 1
        }
        if (hoursOfTheClock >= 13) {
            hoursOfTheClock = 1
            if (amOrPm == 0) {
                amOrPm = 1
            } else if (amOrPm == 1) {
                amOrPm = 0
            }
        }
    }
})