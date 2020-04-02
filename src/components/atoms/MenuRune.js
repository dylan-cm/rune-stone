import React from 'react'
import styled from '@emotion/styled'
import Layout from '../../constants/layoutConstants'

const S = {}

S.Rune = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  width: ${Layout.RUNE_SIZE_MENU}px;
  height: ${Layout.RUNE_SIZE_MENU}px;

  background: ${Layout.RUNE_BG_COLOR};
  box-shadow: inset 0px 0px 12px rgba(0, 0, 0, 1);

  cursor: pointer;

  border-radius: ${Layout.RUNE_SIZE_MENU}px;
  border: ${Layout.RUNE_BORDER_WIDTH}px solid rgba(${(props) => (props.disabled ? Layout.GREY : props.color)}, 1);

  &:hover {
    border: ${Layout.RUNE_BORDER_WIDTH}px solid rgba(${(props) => props.color}, 1);

    & > img {
      filter: none;
      -webkit-filter: grayscale(0);
      filter: grayscale(0);
    }

    & > div {
      display: flex;
    }
  }

  & > img {
    /* Image size larger proportionally if keystone rune by 75% and active runes decrease image sixe by 20%*/
    width: ${(props) => Layout.RUNE_SIZE_MENU * (props.keystone ? 1.75 : 1) * (props.active ? 0.8 : 1)}px;
    filter: ${(props) => (props.disabled ? 'gray brightness(0.5) contrast(75%)' : 'none')};
    -webkit-filter: ${(props) => (props.disabled ? 'grayscale(1) brightness(0.5) contrast(75%)' : 'none')};
    filter: ${(props) => (props.disabled ? 'grayscale(1) brightness(0.5) contrast(75%)' : 'none')};
  }
`
S.Highlighter = styled.div`
  content: ' ';
  position: absolute;
  top: ${Layout.RUNE_BORDER_WIDTH * -6}px;
  left: ${Layout.RUNE_BORDER_WIDTH * -6}px;
  right: ${Layout.RUNE_BORDER_WIDTH * -6}px;
  bottom: ${Layout.RUNE_BORDER_WIDTH * -6}px;
  border-radius: ${Layout.RUNE_SIZE_MENU}px;
  border: ${Layout.RUNE_BORDER_WIDTH * 1.5}px solid rgba(${(props) => props.color}, 0);
  transition: border ${Layout.ATTACK}, top ${Layout.ATTACK}, left ${Layout.ATTACK}, right ${Layout.ATTACK},
    bottom ${Layout.ATTACK};

  &:hover {
    top: ${Layout.RUNE_BORDER_WIDTH * -4}px;
    left: ${Layout.RUNE_BORDER_WIDTH * -4}px;
    right: ${Layout.RUNE_BORDER_WIDTH * -4}px;
    bottom: ${Layout.RUNE_BORDER_WIDTH * -4}px;
    border: ${Layout.RUNE_BORDER_WIDTH * 1.5}px solid rgba(${(props) => props.color}, 0.5);
  }
`

S.Details = styled.div`
  /* background: black;
  border: 1px solid gold;
  width: 300px;
  height: 300px;
  z-index: 10000000;
  position: absolute;
  top: ${Layout.RUNE_SIZE_MENU + 8}px;
  display: none; */
`

function Rune({ color, keystone, disabled, onClick, img }) {
  return (
    <S.Rune color={color} keystone={keystone} disabled={disabled} onClick={(_) => onClick()}>
      <S.Details />
      <img alt="flavor" src={img} />
      <S.Highlighter color={color} />
    </S.Rune>
  )
}

export default Rune
