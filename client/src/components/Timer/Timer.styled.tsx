import styled from "styled-components"

export const TimerContainer = styled.div`
  font-size: 35px;
  padding: 5px 5px 5px 25px;
  display: flex;
  align-items: center;;
  color:${props => props.showNotificationHelper ? '#2a2525' : "auto"};

  @media (max-width: 650px) {
    font-size: 25px;
  }

  @media (max-width: 300px) {
    padding: 0;
    justify-content: center;
  }
`