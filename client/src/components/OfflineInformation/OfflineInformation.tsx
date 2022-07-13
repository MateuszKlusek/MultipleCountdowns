import { useEffect, useRef, useContext } from "react";

import gsap from "gsap"

//helpers
import { transformFromMiliseconds } from "./../../helpers/timeManipulation.js"

//styles
import * as S from "./OfflineInformation.styled"

// contexts
import { PopupContext } from "../../context/PopupContext";

const OfflineInformation = (props) => {
    const { setShowOfflineInformation } = useContext(PopupContext)

    const OfflineInformationContainerRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                setShowOfflineInformation(prev => [false, 0])
            }
        })
        tl.to(OfflineInformationContainerRef.current, { bottom: "30px" }).to(OfflineInformationContainerRef.current, { bottom: "-80px" }, "+=2")

    }, [])

    return <S.OfflineInformationContainer ref={OfflineInformationContainerRef}>You've been away for {props.time < 86400000 ? transformFromMiliseconds(props.time) : "more than a day"}</S.OfflineInformationContainer>;
};

export default OfflineInformation;