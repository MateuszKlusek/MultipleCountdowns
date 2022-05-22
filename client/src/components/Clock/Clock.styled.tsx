import styled from 'styled-components'

export const SingleClockContainer = styled.div`
  width: 650px;
  max-width: 80%;
  height: auto;
  padding: 5px;
  border-bottom: 2px solid ${props => props.showNotificationHelper ? "#4b474754" : "#dadce0"};
  background: ${(props) => props.done && '#c0a5ce'};
  opacity: ${props => props.playing ? "1" : "0.5"};
  padding-top: 20px;
  padding-bottom: 20px;

  color: #615db8;
  font-weight: 700;

  display: grid;
  grid-template-columns: auto 120px;
  grid-template-rows: 50px 3fr;

  position: relative;
  @media (max-width: 650px) {
    min-width: 80%;
    grid-template-columns: auto 100px;
    padding-top: 10px;
    padding-bottom: 10px;
  }

  @media (max-width: 300px) {
    min-height: 100px;
    min-width: 80%;
    grid-template-columns:  1fr;
    grid-template-rows: 40px 20px auto;
  }

  transition: opacity 0.218s, visibility 0s, background-color 0.218s, visibility 0s;
  &:hover{
    background-color: ${props => !props.done && props.playing && `#d8d5d556`};
  }
`

export const ColorIdentifier = styled.div`
  height: 100%;
  width: 5px;
  position: absolute;
  background: ${props => props.showNotificationHelper ? "#373434a1" : props.color};
`






export const Message = styled.div`
  font-size: 18px;
  grid-column: 1/3;
  grid-row: 2/3;
  color:${props => props.showNotificationHelper ? '#2a2525' : "auto"};
  overflow-wrap: break-word;
  word-break: break-word;
  line-height: 1.2;
  padding: 15px;

  @media (max-width: 768px) {
    font-size: 15px;
  }

  @media (max-width: 300px) {
    grid-column: 1/2;
   grid-row: 3/4;
   padding: 5px;
   margin-top: 10px;
   font-size: 13px;
  }

`

export const IconContainer = styled.div`

opacity:${props => props.showNotificationHelper ? '0.4' : "1"};
  user-select: none;
  grid-column: 2/3;
  grid-row: 1/2;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-right:25px;

  @media (max-width: 300px) {
    grid-column: 1/2;
    grid-row: 2/3;
  }


@media (max-width: 300px) {
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

export const ActionButton = styled.img`
  width: 18px;
  height: 18px;

  
  @media (max-width: 650px) {
    width: 12px;
  height: 12px;
  } 

  @media (max-width: 300px) {
    margin: 0 8px;
  }
  

  &:hover {
    opacity: 0.6;
  }

`

export const ProgressBar = styled.div`
position: absolute;
bottom:0;
height: 5px;
background: ${props => props.showNotificationHelper ? "#373434a1" : props.color};
transition: width .4s linear;
`

export const PauseIndicator = styled.div`
position: absolute;
background: #7e2323;
width: 20px;
height: 100%;
right: 0;
`

export const AudioShadow = styled.audio`
`