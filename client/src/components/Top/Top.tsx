// react
import { useContext } from 'react'

// styles
import * as S from './Top.styled'

//  context
import { NotificationContext } from '../../context/NotificationContext'

const Top = () => {
  // states
  const { showNotificationHelper } = useContext(NotificationContext)

  return <S.TopContainer showNotificationHelper={showNotificationHelper}>Mutliple Countdowns</S.TopContainer>
}

export default Top
