// react
import { useContext } from "react";

// styles
import * as S from "./TimerPlaceholder.styled"

// context
import { NotificationContext } from "../../context/NotificationContext";

const TimerPlaceholder = () => {
    // states
    const { showNotificationHelper } = useContext(NotificationContext)

    return <S.TimerPlaceholderContainer showNotificationHelper={showNotificationHelper}>You currently have no clocks running</S.TimerPlaceholderContainer>;
};

export default TimerPlaceholder;
