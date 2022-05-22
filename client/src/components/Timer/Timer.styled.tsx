import styled from "styled-components"



export const TimerContainer = styled.div`
  font-size: 35px;
padding: 5px 5px 5px 25px;
 display: flex;
    align-items: center;;

@media (max-width: 650px) {
    font-size: 25px;
  }

@media (max-width: 300px) {
    padding: 0;
    justify-content: center;
  }
`