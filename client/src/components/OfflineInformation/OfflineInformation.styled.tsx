import styled from "styled-components"

export const OfflineInformationContainer = styled.div`
    user-select: none;
    max-width: 200px;
    padding: 5px;
    height: 50px;
    display: flex;
    justify-content: center;
    line-height: 1.3;
    align-items: center;
    position: fixed;
    bottom: -60px;
    left:0;
    right: 0;
    margin: auto;
    font-weight: 700;
    letter-spacing: 1px;
    text-align: center;
    border-radius: 4px;
    border: 2px solid #4286f499;
    background: #24b96f;

    z-index: 100;

    @media (max-width: 300px) {
        width: 180px;
        height: 30px;
        line-height: 1.1;
        font-size: 12px
  }
`