import { useContext, useState, useEffect, useRef } from 'react'
import { useDetectClickOutside } from 'react-detect-click-outside'

import * as S from './TimePicker.styled'
import { retransformString } from '../../helpers/timeManipulation'
import { colorRandomizer } from '../../helpers/colorRandomizer'
import { generateString } from '../../helpers/stringGenerator'
import { MAX_CLOCKS, LOCAL_STORAGE_PREFIX } from '../../helpers/constants'
import Warning from '../Warning/Warning'

// context
import { TimersContext } from '../../context/TimersContext'
import { NotificationContext } from '../../context/NotificationContext'

// helpers
import { mergeRefs } from "./../../helpers/refs.js"

const TimePicker = () => {
  // states
  const { timers, setTimers } = useContext(TimersContext)
  const { showNotificationHelper, setShowNotificationHelper } = useContext(NotificationContext)
  const [warning, setWarning] = useState([false, ''])
  const [isTimerEditable, setIsTimerEditable] = useState(false)


  // refs
  const WarningRef = useRef(false)

  useEffect(() => {
    var temp = timer
    temp = retransformString(temp)
    setTimer((prev) => temp)
  }, [isTimerEditable])

  // for handling warning message
  useEffect(() => {
    const timeout = setTimeout(() => {
      setWarning((prev) => [false, ''])
    }, 1200)
    return () => {
      clearTimeout(timeout)
    }
  }, [warning])



  // isPre is a state for allowing a gray 5:00 to appear before you click sth
  const [isPre, setIsPre] = useState<boolean>(true)
  const [timer, setTimer] = useState<string>('500')
  const [title, setTitle] = useState<string>('')

  const TimePlaceholderActiveRef = useRef<HTMLDivElement>(null)
  const NameInputRef = useRef<HTMLInputElement>(null)
  const StartButtonRef = useRef<HTMLDivElement>(null)
  const ResetButtonRef = useRef<HTMLDivElement>(null)

  const FakeInputRef = useRef<HTMLInputElement>(null)

  // handle add click
  const handleClick = () => {
    if (!title) {
      setWarning((prev) => [true, "You can't start without message"])
    } else if (timers.length >= MAX_CLOCKS) {
      setWarning((prev) => [true, `You can have max ${MAX_CLOCKS} timers`])
      // if we can move on (everythings is OK)
    } else {
      var tempTimer = timer
      tempTimer = retransformString(tempTimer)

      // change string for string representing number
      var seconds: number = Number(tempTimer.slice(-2))
      var minutes: number = Number(tempTimer.slice(-4, -2))
      var hours: number = Number(tempTimer.slice(-6, -4))

      var total: number = 0
      total += seconds
      total += minutes * 60
      total += hours * 3600
      // change seconds to miliseconds 
      total = total * 1000

      const timerData: Timer = {
        timeTotal: total,
        timeLeft: total,
        msg: title,
        color: colorRandomizer(),
        id: generateString(10),
        playing: true,
        alarmPlayed: false
      }

      var temp = timers
      temp.push(timerData)

      temp = JSON.parse(JSON.stringify(temp))
      window.localStorage.setItem(`${LOCAL_STORAGE_PREFIX}${timerData.id}`, JSON.stringify(timerData))
      setTimers((prev) => temp)
      // clean input
      NameInputRef.current.value = '';
      setTimer((prev) => '500')
      setTitle((prev) => '')
      setIsPre((prev) => true)
    }
  }



  const handleReset = () => {
    NameInputRef.current.value = ''
    setTimer((prev) => '500')
    setTitle((prev) => '')
    setIsPre((prev) => true)
  }

  //   handling clicking outside the timer when is active to make it not active again
  const TimePlaceholderActiveFirstRef = useRef(false)
  const TimePlaceholderOutsideRef = useDetectClickOutside({
    onTriggered: () => {
      if (!TimePlaceholderActiveFirstRef.current) {
        TimePlaceholderActiveFirstRef.current = true
      } else {
        TimePlaceholderActiveFirstRef.current = false
        setIsTimerEditable((prev) => false)
      }
    },
  })

  //   handling keys when the timer is editable
  useEffect(() => {
    function handleKeyboard(e) {
      // "click" start when entering enter while input is focused
      if (NameInputRef.current === document.activeElement && e.key === 'Enter') {
        handleClick()
      }

      // catch only numbers (digits) and only if the timer is active (grey)
      if (/\d/.test(e.key) && isTimerEditable) {
        if (isPre) {
          setTimer((prev) => e.key)
          setIsPre((prev) => false)
        } else {
          var temp = timer
          temp = temp + e.key
          //  if the string length is bigger than 6, cut the first element counting from the end
          if (temp.length > 6) temp = temp.slice(-6)
          setTimer((prev) => temp)
          setIsPre((prev) => false)
        }
      }
      if (e.key === 'Backspace' && isTimerEditable) {
        if (isPre) {
          setTimer((prev) => '')
          setIsPre((prev) => false)
        } else {
          if (timer.length === 0) return
          var temp = timer
          temp = temp.slice(0, temp.length - 1)
          setTimer((prev) => temp)
          setIsPre((prev) => false)
        }
      }
      if (e.key === 'Tab' && isTimerEditable) {
        setIsTimerEditable((prev) => false)
        e.preventDefault()
        NameInputRef.current.focus()
      }

      // enter for start button
      if (
        e.key === 'Enter' &&
        (StartButtonRef.current === document.activeElement || isTimerEditable)
      ) {
        setIsTimerEditable((prev) => false)
        handleClick()
      }
      // enter for reset button
      if (e.key === 'Enter' && ResetButtonRef.current === document.activeElement) {
        handleReset()
      }
    }
    window.addEventListener('keydown', handleKeyboard)
    return () => window.removeEventListener('keydown', handleKeyboard)
  }, [isTimerEditable, timer, isPre, title])

  // handling single digit in counter
  const handleSeconds = (tim, idx) => {
    if (tim.length === 0 || tim.length <= idx - 1) return '0'
    if (tim.length > idx - 1) return tim[tim.length - idx]
  }

  const handleSecondsForTransformed = (tim, idx) => {
    if (tim.length === 0 || tim.length <= idx - 1) return ''
    if (tim.length > idx - 1) return tim[tim.length - idx]
  }

  ////////////////////////////////////////////////////////////////////// 
  useEffect(() => {
    if (isTimerEditable) {
      FakeInputRef.current.focus()
    } else {
      FakeInputRef.current.value = ""
    }
  }, [isTimerEditable])

  return (
    <S.TimePickerContainer>
      <S.TimerContainer>
        {isTimerEditable ? (
          <S.TimerPlaceholderActive ref={TimePlaceholderOutsideRef}>
            <S.Number color={timer.length > 5 && !isPre ? 'active' : 'disabled'}>
              {handleSeconds(timer, 6)}
            </S.Number>
            <S.NumberWithoutPadding color={timer.length > 4 && !isPre ? 'active' : 'disabled'}>
              {handleSeconds(timer, 5)}
            </S.NumberWithoutPadding>
            <S.Char color={timer.length > 4 && !isPre ? 'active' : 'disabled'}>h</S.Char>
            <S.Number color={timer.length > 3 && !isPre ? 'active' : 'disabled'}>
              {handleSeconds(timer, 4)}
            </S.Number>
            <S.NumberWithoutPadding color={timer.length > 2 && !isPre ? 'active' : 'disabled'}>
              {handleSeconds(timer, 3)}
            </S.NumberWithoutPadding>
            <S.Char color={timer.length > 2 && !isPre ? 'active' : 'disabled'}>m</S.Char>
            <S.Number color={timer.length > 1 && !isPre ? 'active' : 'disabled'}>
              {handleSeconds(timer, 2)}
            </S.Number>
            <S.NumberWithoutPadding color={timer.length > 0 && !isPre ? 'active' : 'disabled'}>
              {handleSeconds(timer, 1)}
            </S.NumberWithoutPadding>
            <S.Char color={timer.length > 0 && !isPre ? 'active' : 'disabled'}>s</S.Char>
          </S.TimerPlaceholderActive>
        ) : (
          <S.TimerPlaceholder
            onClick={() => {
              setIsTimerEditable((prev) => !prev)
            }}
            showNotificationHelper={showNotificationHelper}
          >
            <S.Number> {handleSecondsForTransformed(retransformString(timer), 6)}</S.Number>
            <S.NumberWithoutPadding>
              {handleSecondsForTransformed(retransformString(timer), 5)}
            </S.NumberWithoutPadding>
            {retransformString(timer).length > 4 && <S.Char>h</S.Char>}
            <S.Number> {handleSecondsForTransformed(retransformString(timer), 4)}</S.Number>
            <S.NumberWithoutPadding>
              {handleSecondsForTransformed(retransformString(timer), 3)}
            </S.NumberWithoutPadding>
            {retransformString(timer).length > 2 && <S.Char>m</S.Char>}
            <S.Number> {handleSecondsForTransformed(retransformString(timer), 2)}</S.Number>
            <S.NumberWithoutPadding>
              {handleSecondsForTransformed(retransformString(timer), 1)}
            </S.NumberWithoutPadding>
            {retransformString(timer).length > 0 && <S.Char>s</S.Char>}
          </S.TimerPlaceholder>
        )}
      </S.TimerContainer>
      <Warning show={warning[0]} msg={warning[1]} />
      <S.NameInputContainer>
        <S.NameInput ref={NameInputRef} showNotificationHelper={showNotificationHelper} onChange={(e) => setTitle(e.target.value)} />
      </S.NameInputContainer>
      <S.ButtonContainer showNotificationHelper={showNotificationHelper}>
        <S.Button
          ref={StartButtonRef}
          onClick={() => {
            handleClick()
          }}
        >
          start
        </S.Button>
        <S.ResetButton ref={ResetButtonRef} onClick={handleReset} >
          reset
        </S.ResetButton>
      </S.ButtonContainer>
      <S.FakeInput type={"number"} ref={FakeInputRef} />
    </S.TimePickerContainer>
  )
}

export default TimePicker
