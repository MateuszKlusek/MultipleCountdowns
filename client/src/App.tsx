// react
import { useState, useEffect, useRef } from 'react'

// components
import Clock from './components/Clock/Clock'
import GithubLink from './components/GithubLink/GithubLink'
import WebsiteInfo from './components/WebsiteInfo/WebsiteInfo'
import TimePicker from './components/TimePicker/TimePicker'
import Top from './components/Top/Top'
import TimerPlaceholder from './components/TimerPlaceholder/TimerPlaceholder'
import NotificationReminder from './components/NotificationReminder/NotificationReminder'
import NotificationHelper from './components/NotificationHelper/NotificationHelper'
import OfflineInformation from './components/OfflineInformation/OfflineInformation'

// context
import { TimersContext } from './context/TimersContext';
import { PopupContext } from "./context/PopupContext"
import { NotificationContext } from './context/NotificationContext'

// helpers
import { generateString } from './helpers/stringGenerator'
import { blockAlarmSound, freeAlarmSoundBlock } from "./helpers/alarm"

// styles
import * as S from './App.styled'

function App() {
  // states
  const [timers, setTimers] = useState<Timer[]>([])
  const [showOfflineInformation, setShowOfflineInformation] = useState([false, 0])
  const [showNotificationReminder, setShowNotificationReminder] = useState<boolean>(false)
  const [showNotificationHelper, setShowNotificationHelper] = useState<boolean>(false)
  // scroll to the top when load/refresh website
  window.scrollTo(0, 0)
  window.onbeforeunload = function () {
    window.scrollTo(0, 0)
  }

  // loading data from window.localStorage
  useEffect(() => {
    handleLocalStorage()
  }, [])

  // handling local storage
  const handleLocalStorage = () => {
    const prefix = '^countdown_'
    let re = new RegExp(prefix, 'g')
    var timersFromLocalStorage = []

    var currentTimestamp = new Date().getTime()
    var timeLapse = Math.floor((currentTimestamp - window.localStorage.closeTimestamp))
    if (timeLapse > 1000) {
      setShowOfflineInformation(prev => [true, timeLapse])
    }

    for (const [key, value] of Object.entries(localStorage)) {
      if (key.match(re)) {
        var obj = JSON.parse(value)
        // check time lapsing
        // add checks for them the timelapse is bigger than obj.time (when the countdown expired??)
        var timerData: Timer = {
          timeTotal: obj.timeTotal,
          // if not playing we don't substrack timeLapse because the clock wasn't running offline
          timeLeft: obj.playing ? obj.timeLeft - timeLapse : obj.timeLeft,
          msg: obj.msg,
          id: key.split('_')[1],
          color: obj.color,
          playing: obj.playing,
          alarmPlayed: obj.alarmPlayed
        }

        // save updates data in localStorage because clock components populates data from localStorage, not from props (from props id and key)
        // window.localStorage.setItem(key, JSON.stringify(timerData))
        timersFromLocalStorage.push(timerData)
      }
    }
    // sorting clocks by time left ascending
    timersFromLocalStorage.sort((a, b) => a.timeLeft - b.timeLeft)
    setTimers(timersFromLocalStorage)
  }

  // save global alarm blocking to localStorage when first mounting the page 
  useEffect(() => {
    if (!window.localStorage.getItem("alarmBlocked") || JSON.parse(window.localStorage.getItem("globalAlarmBlock")) === true) {
      window.localStorage.setItem("alarmBlocked", JSON.stringify(false))
    }
  }, [])

  // event listenerd for saving timestamp when the page was unloading/hiding to calculate lapse time for the lapse time warning and 
  // for the calculating time left for the clocks that was running while being off
  useEffect(() => {
    function handleClosingTab(e) {
      var dateNow = new Date().getTime()
      window.localStorage.setItem('closeTimestamp', dateNow + "")
    }
    window.addEventListener('beforeunload', handleClosingTab)
    window.addEventListener('pagehide', handleClosingTab)

    return () => {
      window.removeEventListener('pagehide', handleClosingTab)
      window.removeEventListener('beforeunload', handleClosingTab)
    }
  }, [])

  // refs
  const AppContainerRef = useRef<HTMLDivElement>(null);

  // notification api -> is not granted show notification icon (<NotificationReminder />)
  useEffect(() => {
    try {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      }
      else {
        if (Notification.permission === 'granted') {
          setShowNotificationReminder(prev => false)
        } else {
          setShowNotificationReminder(prev => true)
        }
      }
    } catch (err) {
    }
  }, [])

  useEffect(() => {
    showNotificationHelper ? blockAlarmSound() : freeAlarmSoundBlock()
  }, [showNotificationHelper])


  return (
    <PopupContext.Provider value={{ showOfflineInformation, setShowOfflineInformation }}>
      <TimersContext.Provider value={{ timers, setTimers }}>
        <NotificationContext.Provider value={{ showNotificationReminder, setShowNotificationReminder, showNotificationHelper, setShowNotificationHelper }}>

          <S.MainContainer>
            <S.AppContainer ref={AppContainerRef} showNotificationHelper={showNotificationHelper}>
              <Top />
              <TimePicker />
              <S.ClockContainer>
                {timers.length === 0 && <TimerPlaceholder />}
                {timers.map((el, idx) => (
                  <Clock
                    // can't to idx as key, because it doesn't update with state update from inside the clock
                    key={generateString(4)}
                    id={el.id}
                    color={el.color}
                    data={el}
                  />
                ))}
              </S.ClockContainer>
              {showNotificationReminder && <NotificationReminder />}
              {showOfflineInformation[0] && <OfflineInformation time={showOfflineInformation[1]} />}
            </S.AppContainer>
            {showNotificationHelper && <NotificationHelper />}
            <GithubLink url={'https://github.com/mateuszklusek/MultipleCountdowns'} />
            <WebsiteInfo />
          </S.MainContainer>

        </NotificationContext.Provider>
      </TimersContext.Provider>
    </PopupContext.Provider>
  )
}

export default App
