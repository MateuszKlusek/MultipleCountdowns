//  react
import { memo, useContext } from "react"

// context
import { NotificationContext } from "../../context/NotificationContext";

// styles
import * as S from "./Timer.styled"

const Timer = (props) => {
    // states
    const { showNotificationHelper } = useContext(NotificationContext)

    return <S.TimerContainer showNotificationHelper={showNotificationHelper}>{props.time}</S.TimerContainer>;
};

export default memo(Timer);
