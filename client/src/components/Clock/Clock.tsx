// react
import { useState, useEffect, useRef, useContext, memo, useLayoutEffect } from 'react'

// packages
import gsap from 'gsap'
import { Howl, Howler } from "howler"

// helpers
import { transformFromMiliseconds } from '../../helpers/timeManipulation'
import { LOCAL_STORAGE_PREFIX, DRAGGABLE_THRESHOLD } from '../../helpers/constants'

// styles
import * as S from './Clock.styled'

// contexts
import { TimersContext } from '../../context/TimersContext'
import { NotificationContext } from '../../context/NotificationContext'

// assets
import Start from './../../assets/play-button.png'
import Pause from './../../assets/pause-button.png'
import Reset from './../../assets/reset.png'
import Delete from './../../assets/trash.png'
import Timer from '../Timer/Timer'


const Clock = (props) => {
  // states
  const [timerData, setTimerData] = useState<Timer>(props.data)
  const [isPlaying, setIsPlaying] = useState<boolean>(timerData.playing)
  const [reset, setReset] = useState<boolean>(false);
  const { timers, setTimers } = useContext(TimersContext)
  const { showNotificationHelper } = useContext(NotificationContext)

  // state for clicking and dragging single clock
  const [clicked, setClicked] = useState<boolean>(false)
  const [xCoordinateAtStart, setXCoordinateAtStart] = useState<number>(0)


  const playAlert = () => {
    var sound;
    return sound = new Howl({
      src: ['./../../assets/clock-sound.mp3'],
      onplayerror: function () {
        sound.once('unlock', function () {
          sound.play();
        });
      }
    });
  }

  // handle dragable clock RIGHT to start and LEFT to pause click
  useEffect(() => {

    function handleMouseClick(e) {
      var startPoint;
      if (e.type === "mousedown") {
        startPoint = e.screenX
      }
      if (e.type === "touchstart") {
        startPoint = e.touches[0].clientX
      }
      if (!clicked) {
        setClicked(true)
        setXCoordinateAtStart(prev => startPoint)
      }
    }
    function handleMouseMove(e) {
      // Left Right
      var distance;
      if (e.type === "mousemove") {
        distance = e.screenX - xCoordinateAtStart
      }
      if (e.type === "touchmove") {
        distance = e.touches[0].clientX - xCoordinateAtStart
      }

      // we only want to be abble to toggle pause/play / move right/left when the clock is ticking (timeleft > 0)
      if (clicked && timerData.timeLeft > 0) {
        if (distance > 0) {
          if (Math.abs(distance) > DRAGGABLE_THRESHOLD && !timerData.playing) {
            setClicked(false)
            toggleStartStop(props.id, timerData.playing)
          }
        } else {
          if (Math.abs(distance) > DRAGGABLE_THRESHOLD && timerData.playing) {
            setClicked(false)
            toggleStartStop(props.id, timerData.playing)
          }
        }
      }

    }
    function handleMouseUp(e) {
      setClicked(false)
      setXCoordinateAtStart(prev => 0)
    }
    // mouse
    SingleClockContainerRef.current && SingleClockContainerRef.current.addEventListener("mousedown", handleMouseClick);
    SingleClockContainerRef.current && SingleClockContainerRef.current.addEventListener("mousemove", handleMouseMove);
    SingleClockContainerRef.current && SingleClockContainerRef.current.addEventListener("mouseup", handleMouseUp);
    // touchscreen
    SingleClockContainerRef.current && SingleClockContainerRef.current.addEventListener("touchstart", handleMouseClick);
    SingleClockContainerRef.current && SingleClockContainerRef.current.addEventListener("touchmove", handleMouseMove);
    SingleClockContainerRef.current && SingleClockContainerRef.current.addEventListener("touchend", handleMouseUp);
    return () => {
      // mouse
      SingleClockContainerRef.current && SingleClockContainerRef.current.removeEventListener("mousedown", handleMouseClick);
      SingleClockContainerRef.current && SingleClockContainerRef.current.removeEventListener("mousemove", handleMouseMove);
      SingleClockContainerRef.current && SingleClockContainerRef.current.removeEventListener("mouseup", handleMouseUp);
      // touchscreen
      SingleClockContainerRef.current && SingleClockContainerRef.current.removeEventListener("touchstart", handleMouseClick);
      SingleClockContainerRef.current && SingleClockContainerRef.current.removeEventListener("touchmove", handleMouseMove);
      SingleClockContainerRef.current && SingleClockContainerRef.current.removeEventListener("touchend", handleMouseUp);
    }
  }, [clicked])


  const workerRef = useRef(null)
  useEffect(() => {
    function showNotification(msg) {
      console.log("notification");
      const notification = new Notification('Countdowns', {
        body: msg,
      })
      var sound = playAlert();
      if (JSON.parse(window.localStorage.getItem("globalAlarmBlock")) === false) {
        window.localStorage.setItem("globalAlarmBlock", JSON.stringify(true))
        sound.play();
      }
      setTimeout(() => {
        notification.close()
        sound.pause()
        window.localStorage.setItem("globalAlarmBlock", JSON.stringify(false))
      }, 4000)
      window.localStorage.removeItem(`${LOCAL_STORAGE_PREFIX}${props.id}`)
      // set alarmPlayed for this clock to yes
    }
    workerRef.current = new Worker('./../../workers/calculateTime.js')
    // fix the time left and time total to be lofe than 24 hours!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    // setItem with timer is on because without this if statement with the alarm will start again when we add another clock
    // because it will create localstorage from state for a split of a seconds, long enough to trigger alarm in "Noification.permission === 'granted' condition
    if (timerData.timeLeft > 0) {
      window.localStorage.setItem(
        `${LOCAL_STORAGE_PREFIX}${props.id}`,
        JSON.stringify(timerData),
      )
    }

    workerRef.current.postMessage({ total: timerData.timeTotal, start: timerData.timeLeft, playing: timerData.playing, reset: 'x' })

    function handleOnMessage(e) {
      if (isPlaying &&
        window.localStorage.getItem(`${LOCAL_STORAGE_PREFIX}${props.id}`)
      ) {
        window.localStorage.setItem(
          `${LOCAL_STORAGE_PREFIX}${props.id}`,
          JSON.stringify(timerData),
        )
      }

      // setting global state for timers but without deep copy, so we change values but no rerender?????
      var temp = timerData
      temp.timeLeft = e.data.time
      temp = JSON.parse(JSON.stringify(temp))
      setTimerData(prev => temp)


      if (e.data.time <= 1) {
        // change for the notification only for the countdown when the websites was active, not from localStore
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
          window.localStorage.removeItem(`${LOCAL_STORAGE_PREFIX}${props.id}`)
          var sound = playAlert();
          sound.play();
          setTimeout(() => {
            sound.pause()
            window.localStorage.setItem("globalAlarmBlock", JSON.stringify(false))
          }, 4000)
        }
        else {
          if (Notification.permission === 'granted' && window.localStorage.getItem(`${LOCAL_STORAGE_PREFIX}${props.id}`)) {
            showNotification(props.msg)
          }
          else {
            window.localStorage.removeItem(`${LOCAL_STORAGE_PREFIX}${props.id}`)
            var sound = playAlert();
            sound.play();
          }
        }
        workerRef.current.terminate()
      }
    }

    workerRef.current.addEventListener('message', handleOnMessage)


    return () => {
      workerRef.current.removeEventListener('message', handleOnMessage)
      workerRef.current.terminate()

    }
  }, [reset, isPlaying])


  // handle making field "blinking" when timeLeft  <= 0
  const SingleClockContainerRef = useRef<HTMLDivElement>(null)
  const PauseIndicatorRef = useRef<HTMLDivElement>(null)
  const ProgressBarRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!isPlaying) {
      SingleClockContainerRef.current.style.transform = "translateX(-20px)"
      PauseIndicatorRef.current.style.transform = "translateX(20px)"
    }
  }, [])
  useEffect(() => {
    const tl = gsap.timeline({})
    if (isPlaying) {
      tl.to(SingleClockContainerRef.current, { x: 0, ease: "power2.out", duration: 0.2 })
    } else {

      tl.to(PauseIndicatorRef.current, { x: 20, duration: 0 })
      tl.to(SingleClockContainerRef.current, { x: -20, ease: "power2.out", duration: 0.2 })
    }
  }, [isPlaying])

  const handleDelete = (id) => {
    // deleting localStorage for this element and removing state
    window.localStorage.removeItem(`${LOCAL_STORAGE_PREFIX}${id}`)
    workerRef.current.terminate()
    var temp = timers
    temp = temp.filter((el) => el.id !== id)
    setTimers((prev) => temp)
  }

  const handleReset = (id) => {
    // timeLeft = timeTotal
    var timerDataReset = timerData
    timerDataReset.timeLeft = timerDataReset.timeTotal
    timerDataReset = JSON.parse(JSON.stringify(timerDataReset))
    window.localStorage.setItem(
      `${LOCAL_STORAGE_PREFIX}${id}`,
      JSON.stringify(timerDataReset),
    )
    setReset(prev => !prev)
  }

  const toggleStartStop = (id, playing) => {

    var timerDataToSave: Timer = timerData
    window.localStorage.setItem(
      `${LOCAL_STORAGE_PREFIX}${id}`,
      JSON.stringify(timerDataToSave),
    )

    var temp = timerData
    temp.playing = !temp.playing
    temp = JSON.parse(JSON.stringify(temp))
    setTimerData(prev => temp)
    setIsPlaying(temp.playing)
  }


  return (
    <>
      <S.SingleClockContainer done={timerData.timeLeft <= 0} playing={isPlaying} ref={SingleClockContainerRef} showNotificationHelper={showNotificationHelper}>
        <S.ColorIdentifier color={timerData.color} showNotificationHelper={showNotificationHelper} />
        <Timer time={transformFromMiliseconds(timerData.timeLeft)} />
        <S.IconContainer showNotificationHelper={showNotificationHelper} >
          <S.ActionButton

            src={isPlaying ? Pause : Start}
            onClick={() => {
              // we only want to be able to stop when the times is bigger than 0
              if (timerData.timeLeft > 0) {
                toggleStartStop(props.id, isPlaying)
              }
            }}
            alt={'play/pause'}
          ></S.ActionButton>
          <S.ActionButton
            src={Reset}
            onClick={() => {
              handleReset(props.id)
            }}
            alt={'reset'}
          ></S.ActionButton>
          <S.ActionButton
            src={Delete}
            onClick={() => {
              handleDelete(props.id)
            }}
            alt={'delete'}
          ></S.ActionButton>
        </S.IconContainer>
        <S.Message showNotificationHelper={showNotificationHelper}>{timerData.msg}</S.Message>
        <S.ProgressBar color={timerData.color} ref={ProgressBarRef} showNotificationHelper={showNotificationHelper}
          style={{
            width: (() => {
              try {
                if ((1 - timerData.timeLeft / timerData.timeTotal) > 1) {
                  return `${SingleClockContainerRef.current.offsetWidth}px`
                } else {
                  return `${(1 - timerData.timeLeft / timerData.timeTotal) * SingleClockContainerRef.current.offsetWidth}px`
                }
              }
              catch (err) {
                return "0px"
              }
            })()
          }}
        />
        {!isPlaying && <S.PauseIndicator ref={PauseIndicatorRef} onClick={() => toggleStartStop(props.id, isPlaying)} />}
      </S.SingleClockContainer>
    </>
  )
}

export default memo(Clock)
