import styled from 'styled-components'

export const NotificationHelperContainer = styled.div`
user-select: none;
  color: #d4baba;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  max-width: 400px;
  width: 90%;
  height: 250px;

  @media (max-width: 550px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`

export const HelperTitle = styled.div`
  font-size: 26px;
  margin-bottom: 20px;
  
  @media (max-width: 550px) {
    text-align: center;
  }
  
`

export const HelperMessage = styled.div`
  color: #a99c9c;
  font-size: 16px;
  margin-bottom: 20px;
  line-height: 1.2;

  @media (max-width: 550px) {
    text-align: center;
  }
`

export const HelperButton = styled.div`
cursor: pointer;
  width: 130px;
  height: 38px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  background: #9a9cd0;
  border-radius: 3px;
  color: black;
  font-weight: 700;
  letter-spacing: 1px;

  &:hover{
    background: #aaacdf 
  }

`

export const ArrowCointainer = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #6c6d78cb;
  transform: rotate(45deg);
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: -60px;
  top: -5px;

  @media (max-width: 550px) {
    left:0;
  }

  @media (max-width: 380px) {
    display: none;
  }
`
export const SVG = styled.svg`
`

