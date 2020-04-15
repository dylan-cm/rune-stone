import React from 'react'
import styled from '@emotion/styled'
import Layout from '../../constants/layoutConstants'
import { ReactComponent as Logo } from '../../assets/runestonelogo.svg'

const S = {}
S.Header = styled.div`
  background-color: ${Layout.DARK};
  padding: 16px;
  color: rgba(${Layout.GOLD}, 1);
  text-align: center;
  width: 10vw;
  height: 100vh;
  box-sizing: border-box;
  border: solid 1px ${Layout.BRONZE};
  z-index: 100;

  h1,
  h4 {
    /* background-color: rgba(${Layout.GOLD}, 1); */
    color: transparent;
    text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    -webkit-background-clip: text;
    -moz-background-clip: text;
    background-clip: text;
  }

  h1,
  h4 {
    margin: 0;
    margin-top: 8px;
  }

  .logo  {
    fill: rgba(${Layout.GOLD}, 1);
    max-height: 60px;
  }

  @media only screen and (max-width: 600px) {
    width: 100vw;
    height: 60px;
    box-shadow: 0 5px 6px rgba(0, 0, 0, 0.5);
    padding: 16px 8px;

    .logo  {
    fill: rgba(${Layout.GOLD}, 1);
    height: 100%;
    }
  }
`

function Header() {
  return (
    <S.Header>
      <Logo className="logo" />
      {/* <h1>Rune Stone</h1>
      <h5>Build your own paths or experiment with ones made by the community.</h5> */}
    </S.Header>
  )
}

export default Header