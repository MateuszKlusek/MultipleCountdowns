import styled from 'styled-components'

export const AppContainer = styled.div`
  user-select: ${props => props.showNotificationHelper ? 'none' : "auto"};
  pointer-events: ${props => props.showNotificationHelper ? 'none' : "auto"};
  min-height: 100vh;
  width: 100%;
  background: ${props => props.showNotificationHelper ? `#1e323e` : `#f6f2f2de`};
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  filter: ${props => props.showNotificationHelper ? `brightness(0.4)` : `brightness(1.0)`};
  opacity: ${props => props.showNotificationHelper ? `0.95` : `1`};
  transition: filter 0.218s;
`

export const ClockContainer = styled.div`
  width: 100%;
  margin-top: 80px;
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
export const MainContainer = styled.div``
