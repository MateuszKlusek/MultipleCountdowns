import styled from 'styled-components'

export const WarningContainer = styled.div`
  max-width: 80%;
  min-height: 20px;
  background: ${props => props.show ? "#e35858" : ""};
margin: 5px;
display: flex;
justify-content: center;
align-items: center;
padding: 5px;
 
font-size: 14px;
text-transform: uppercase;
`
