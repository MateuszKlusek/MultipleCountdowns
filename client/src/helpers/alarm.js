export const blockAlarmSound = () => {
    window.localStorage.setItem("alarmBlocked", JSON.stringify(true))
}

export const freeAlarmSoundBlock = () => {
    window.localStorage.setItem("alarmBlocked", JSON.stringify(false))
}