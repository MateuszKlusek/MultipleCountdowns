import styled from 'styled-components'

export const TopContainer = styled.div`
  margin-top: 20px;
  width: 90%;
  height: 200px;
  font-size: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-align: center;
  color:${props => props.showNotificationHelper ? '#2a2525' : "auto"};
  font-weight: 700;
  letter-spacing: 1.5px;
  margin-left: 0 10px 10px 10px;
  
  @media (max-width: 768px) {
    height: 120px;
    font-size: 38px;
  }
`
