import React from 'react'
import styled from '@emotion/styled'
import Rune from '../atoms/Rune'
import Branch from '../atoms/Branch'
import FlavorRune from '../atoms/FlavorRune'

const S = {}
S.Tree = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  margin: 24px;
`

function PrimaryTree({ color, t1, t2, onToggle, openMenus, bandle }) {
  return (
    <S.Tree>
      <FlavorRune color={color} onClick={() => onToggle({ tier: 'FLAVOR' })} active={openMenus.FLAVOR} />
      <Branch color={color} padding={4} active={openMenus.RUNES} />
      <Rune
        color={color}
        img={t1 ? t1.src : null}
        onClick={() => onToggle({ tier: 'RUNES' })}
        active={openMenus.RUNES}
        slotMachine={t1 && bandle && t1.name === 'Zim’s Magical Rune Randomization Machine'}
      />
      <Branch color={color} active={openMenus.RUNES} />
      <Rune
        color={color}
        img={t2 ? t2.src : null}
        onClick={() => onToggle({ tier: 'RUNES' })}
        active={openMenus.RUNES}
        slotMachine={t2 && bandle && t2.name === 'Zim’s Magical Rune Randomization Machine'}
      />
    </S.Tree>
  )
}

export default PrimaryTree
