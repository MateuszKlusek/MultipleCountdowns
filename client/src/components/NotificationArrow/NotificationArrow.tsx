import { useContext, useEffect, useRef } from "react";
import gsap from "gsap"

// styles
import * as S from "./NotificationArrow.styled"

// assets
import ArrowUp from "./../../assets/arrow-up.png"

// context
import { NotificationContext } from "../../context/NotificationContext";


const NotificationArrow = () => {
    const { setShowNotificationArrow } = useContext(NotificationContext)
    const NotificationArrowContainerRef = useRef<HTMLDivElement>(null)
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