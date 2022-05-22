import styled from 'styled-components'

export const TimePickerContainer = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    height: 100px;
  }
`

export const TimerContainer = styled.div`
  height: 100px;
  padding-bottom: 5px;
`
export const TimerPlaceholderActive = styled.div`
  display: flex;
  align-items: flex-end;
  user-select: none;
  height: 100px;
  font-family: sans-serif, 'Helvetica Neue', 'Lucida Grande', Arial;
  font-weight: 400;
  cursor: pointer;
  line-height: 1.58;
  text-align: left;
  color: #dadce0;
  border-bottom: 2px solid #4285f4;

  @media (max-width: 768px) {
  }
`

export const TimerPlaceholder = styled.div`
  display: flex;
  align-items: flex-end;
  user-select: none;
  height: 100px;
  font-family: sans-serif, 'Helvetica Neue', 'Lucida Grande', Arial;
  font-weight: 400;
  cursor: pointer;
  line-height: 1.58;
  text-align: left;
  color:${props => props.showNotificationHelper ? '#2a2525' : "auto"};
  border-bottom: 1px solid ${props => props.showNotificationHelper ? "#514a4a" : "#ebebeb"};

  @media (max-width: 768px) {
  }
`

export const Number = styled.span`
  font-size: 62px;
  padding-left: 18px;
  border-right: 1px solid transparent;
  color: ${(props) => props.color === 'active' && '#222'};
  @media (max-width: 768px) {
    font-size: 40px;
  }
`

export const NumberWithoutPadding = styled.span`
  font-size: 62px;
  border-right: 1px solid transparent;
  color: ${(props) => props.color === 'active' && '#222'};
  @media (max-width: 768px) {
    font-size: 40px;
  }
`
export const Char = styled.span`
  font-size: 28px;
  border-right: 1px solid transparent;
  color: ${(props) => props.color === 'active' && '#222'};
  padding-bottom: 16px;

  @media (max-width: 768px) {
    font-size: 20px;
    padding-bottom: 8px;
  }
`
export const NameInputContainer = styled.div`
  max-width: 80%;
  width: 600px;
  height: 60px;

  @media (max-width: 768px) {
    height: 45px;
  }
`

export const NameInput = styled.input`
  width: 100%;
  height: 100%;
  padding: 10px 25px;
  font-family: monospace;
  font-size: 22px;
  border: 2px solid ${props => props.showNotificationHelper ? "#1e323e" : "#ccc"};
  outline: none;
  color: #222222;
  /* without it padding crashed 100% */
  box-sizing: border-box;
  background: ${props => props.showNotificationHelper ? "#293d49" : "auto"}; 
  &:focus {
    border: 2px solid #4286f499;
    background: #e2f9efc0;
    transition:  0.5s;
  }

  @media (max-width: 768px) {
    font-size: 16px;
  }
`
export const ButtonContainer = styled.div`

  margin-top: 10px;
  display: flex;
  opacity: ${props => props.showNotificationHelper ? "0.2" : "1"};
`

export const Button = styled.div`
  cursor: default;
  margin: 0 5px;
  min-width: 54px;
  height: 16px;
  background: #1a73e8;
  font-weight: bold;
  padding: 6px 8px 5px;
  border: 1px solid #1a73e8;
  color: #fff;
  font-size: 11px;
  text-align: center;
  text-transform: uppercase;
  border-radius: 2px;
  font-family: arial, sans-serif;
  transition: all 0.218s, visibility 0s;

  &:hover {
    background-color: #1b66c9;
    border: 1px solid #1b66c9;
  }
`

export const ResetButton = styled(Button)`
  color: #1a73e8;
  background-color: #fff;
  border: 1px solid #dadce0;
  &:hover {
    background-color: #f6f9fe;
    border: 1px solid #f6f9fe;
  }
`


export const FakeInput = styled.input`
pointer-events: none;
position: absolute;
/* visibility: hidden; */
transform: translateY(-45px);
border:none;
z-index: -400;
opacity: 0;
`