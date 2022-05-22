import { memo } from "react"

import * as S from "./Timer.styled"
const Timer = (props) => {
    return <S.TimerContainer>{props.time}</S.TimerContainer>;
};

export default memo(Timer);
