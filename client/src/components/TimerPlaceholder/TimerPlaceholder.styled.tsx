import styled from "styled-components"


export const TimerPlaceholderContainer = styled.div`
    width: 650px;    
    max-width: 80%;
    user-select: none;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
    font-size: 30px;
    color: ${props => props.showNotificationHelper ? "#3e3b3b" : "#d9cbcb"};
    opacity: 0.7;
    text-align: center;

    @media (max-width: 650px) {
    font-size: 25px;
  }

@media (max-width: 300px) {
    font-size: 20px;
  }

`