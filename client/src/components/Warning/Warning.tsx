import * as S from './Warning.styled'

const Warning = (props) => {
  return <S.WarningContainer show={props.show}>{props.msg}</S.WarningContainer>
}

export default Warning
