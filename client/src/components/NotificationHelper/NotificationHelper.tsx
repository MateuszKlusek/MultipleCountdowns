// react
import { useContext, useEffect, useRef } from 'react'

// context
import { NotificationContext } from '../../context/NotificationContext'

// packages
import gsap from "gsap"

// styles
import * as S from './NotificationHelper.styled'


const NotificationHelper = () => {
  // states
  const { setShowNotificationHelper } = useContext(NotificationContext)

  // refs
  const NotificationHelperContainerRef = useRef()

  useEffect(() => {
    const tl = gsap.timeline({})
    tl.from(NotificationHelperContainerRef.current, { transform: 'scale(0.2)', duration: 0.3, ease: "back.out(1.1)" })
      .to(NotificationHelperContainerRef.current, { transform: 'scale(1)', duration: 0.3, ease: "back.out(1.1)" })
  }, [])

  // handle animation for "reverse" mount animation
  const handleClick = () => {
    const tl = gsap.timeline({})
    tl.to(NotificationHelperContainerRef.current, { transform: 'scale(0)', duration: 0.2, ease: "back.out(1.1)" })
  }
  return (
    <S.NotificationHelperContainer ref={NotificationHelperContainerRef}>
      <S.HelperTitle>Allow notification</S.HelperTitle>
      <S.ArrowCointainer>
        <S.SVG viewBox="0 0 24 24" width="24" height="24">
          <path fill="white" d="m12 4 1.4 1.4L7.8 11H20v2H7.8l5.6 5.6L12 20l-8-8 8-8z"></path>
        </S.SVG>
      </S.ArrowCointainer>
      <S.HelperMessage>
        To get notification when the time is up, you need to allow notifications on your browser.
      </S.HelperMessage>
      <S.HelperButton onClick={() => {
        setTimeout(() => {
          setShowNotificationHelper(prev => !prev)
        }, 160)
        handleClick()
      }}>Ok, got it</S.HelperButton>
    </S.NotificationHelperContainer>
  )
}

export default NotificationHelper
