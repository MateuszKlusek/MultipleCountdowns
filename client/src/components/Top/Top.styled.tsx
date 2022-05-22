import styled from 'styled-components'

export const TopContainer = styled.div`
margin-top: 20px;
  width: 100%;
  height: 200px;
  font-size: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-align: center;
  
  @media (max-width: 768px) {
    height: 120px;
    font-size: 32px;
  }
`
