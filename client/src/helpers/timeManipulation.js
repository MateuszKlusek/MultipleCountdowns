export const transformFromMiliseconds = (sec) => {

    //change ms to s
    var t = Math.ceil(sec / 1000)

    if (t >= 86400) {
        return "23:59:59"
    }
    if (t < 1) {
        return `00:00:00`
    }
    var hours = Math.floor(t / 3600)
    var minutes = Math.floor((t - hours * 3600) / 60)
    var seconds = t - hours * 3600 - minutes * 60

    if (seconds < 10) {
        seconds = `0${seconds}`
    }
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    if (hours < 10) {
        hours = `0${hours}`
    }

    // transforming hours, minutes and seconds < 10 to achieve "0x:0x:0x" format
    var result = `${hours}:${minutes}:${seconds}`
    return result
}


export const retransformString = (str) => {
    // retransforming string is changing string to number and to string back again
    // e.g. with 2m50s there's not problem, we still end up with 2m50s
    // but 1m90s will be changed to 150s as a nmber and to 2m30s as a strong, as in google countdown

    var secondsStr = str.slice(-2)
    var minutesStr = str.slice(-4, -2)
    var hoursStr = str.slice(-6, -4)
    var total = 0
    total += Number(secondsStr)
    total += Number(minutesStr * 60)
    total += Number(hoursStr * 3600)
    total = total * 1000

    // recalculating string, similar to transformFromSeconds but delete leading zeros

    var stringFromMiliseconds = transformFromMiliseconds(total)
    stringFromMiliseconds = stringFromMiliseconds.split(":").join("")
    var numberFromSeconds = Number(stringFromMiliseconds) + ""
    return numberFromSeconds


}