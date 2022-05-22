// react
import { useContext, useEffect, useRef } from "react";

// packages
import gsap from "gsap"

// styles
import * as S from "./NotificationArrow.styled"

// assets
import ArrowUp from "./../../assets/arrow-up.png"

// context
import { NotificationContext } from "../../context/NotificationContext";


const NotificationArrow = () => {
    // states
    const { setShowNotificationArrow } = useContext(NotificationContext)

    // refs
    const NotificationArrowContainerRef = useRef<HTMLDivElement>(null)

    // handling animation for the vertical arrow
    useEffect(() => {
        const tl = gsap.timeline({
            repeat: 5, onComplete: () => {
                setShowNotificationArrow(prev => false)
            }
        })
        tl.to(NotificationArrowContainerRef.current, { y: 20, duration: 0.5 })
    }, [])


    return <S.NotificationArrowContainer ref={NotificationArrowContainerRef}>
        <S.Arrow src={ArrowUp} />
    </S.NotificationArrowContainer>;
};

export default NotificationArrow;