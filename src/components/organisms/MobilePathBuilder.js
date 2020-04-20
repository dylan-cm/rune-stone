import React, { Component } from 'react'
import styled from '@emotion/styled'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import List from '@material-ui/core/List'

import flavors from '../../constants/assetsMap'
import {
  selectPrimaryFlavor,
  selectKeystone,
  selectPrimaryT1,
  selectPrimaryT2,
  selectPrimaryT3,
  selectSecondaryRunes,
  selectSecondaryFlavor,
  toggleMenu,
  toggleInfoDisplay,
  loadPathsFromFirestore,
  loadFromPermalink,
  triggerSlot,
} from '../../actions/composition'

import Drawer from '../molecules/Drawer'
import DoubleDrawer from '../molecules/DoubleDrawer'
import Layout from '../../constants/layoutConstants'
import InfoDisplay from '../molecules/InfoDisplay'

const S = {}
S.Path = styled.div`
  @media only screen and (min-width: 600px) {
    display: none;
  }

  background: ${Layout.DARK};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  padding: 0;
  margin: 0;

  & > img {
    height: 33vh;
    min-height: 180px;
    width: 100%;
    object-fit: cover;
    object-position: center right;
  }

  .MuiList-root {
    background: rgba(80, 80, 80, 0);
  }

  #nested-list-subheader {
    color: white;
    font-size: 0.75rem;
  }
`

class MobilePathBuilder extends Component {
  componentDidMount() {
    this.props.pathID && this.props.loadFromPermalink(this.props.pathID)
    this.props.loadPathsFromFirestore()
  }

  render() {
    const {
      primeFlavor,
      onSelectPrimaryFlavor,
      keystone,
      onSelectKeystone,
      primeT1,
      onSelectPrimaryT1,
      primeT2,
      onSelectPrimaryT2,
      primeT3,
      onSelectPrimaryT3,
      secondFlavor,
      onSelectSecondaryFlavor,
      secondT1,
      secondT2,
      runeMatrixIndex,
      onSelectSecondaryRunes,
      toggleMenu,
      open,
      bgImage,
      runeInfo,
      toggleInfoDisplay,
      slotMachine,
      pathID,
      fresh,
    } = this.props
    // console.log((!pathID || !fresh) && secondT2 && triggerSlot)

    function closeInfoDisplay() {
      const scrollY = document.body.style.top
      document.body.style.position = ''
      document.body.style.top = ''
      window.scrollTo(0, parseInt(scrollY || '0') * -1)
      toggleInfoDisplay()
    }

    function openInfoDisplay(rune) {
      const scrollY = document.documentElement.style.getPropertyValue('--scroll-y')
      const body = document.body
      body.style.position = 'fixed'
      body.style.top = `-${scrollY}`
      toggleInfoDisplay(rune)
    }

    window.addEventListener('scroll', () => {
      document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`)
    })

    return (
      <S.Path>
        <InfoDisplay open={runeInfo || false} onClose={closeInfoDisplay} rune={runeInfo && runeInfo.rune} />
        <img src={bgImage} alt="" />

        <List component="nav" aria-labelledby="nested-list-subheader">
          <Drawer
            open={open.PRIMARY.FLAVOR}
            onToggle={() => toggleMenu({ tree: 'PRIMARY', tier: 'FLAVOR' })}
            onSelect={(id) => onSelectPrimaryFlavor(id + 1)}
            runes={flavors.slice(1)}
            selected={primeFlavor}
            isFlavor
            color={primeFlavor.colorRGB}
            moreInfo={openInfoDisplay}
          />
          <Drawer
            open={open.PRIMARY.KEYSTONE}
            onToggle={() => toggleMenu({ tree: 'PRIMARY', tier: 'KEYSTONE' })}
            onSelect={onSelectKeystone}
            runes={primeFlavor.keystones}
            selected={keystone}
            flavor={primeFlavor}
            color={primeFlavor.colorRGB}
            keystone
            moreInfo={openInfoDisplay}
          />
          <Drawer
            open={open.PRIMARY.T1}
            onToggle={() => toggleMenu({ tree: 'PRIMARY', tier: 'T1' })}
            onSelect={onSelectPrimaryT1}
            runes={primeFlavor.tier1}
            selected={primeT1}
            flavor={primeFlavor}
            color={primeFlavor.colorRGB}
            tier={1}
            moreInfo={openInfoDisplay}
          />
          <Drawer
            open={open.PRIMARY.T2}
            onToggle={() => toggleMenu({ tree: 'PRIMARY', tier: 'T2' })}
            onSelect={onSelectPrimaryT2}
            runes={primeFlavor.tier2}
            selected={primeT2}
            flavor={primeFlavor}
            color={primeFlavor.colorRGB}
            tier={2}
            moreInfo={openInfoDisplay}
          />
          <Drawer
            open={open.PRIMARY.T3}
            onToggle={() => toggleMenu({ tree: 'PRIMARY', tier: 'T3' })}
            onSelect={onSelectPrimaryT3}
            runes={primeFlavor.tier3}
            selected={primeT3}
            flavor={primeFlavor}
            color={primeFlavor.colorRGB}
            tier={3}
            moreInfo={openInfoDisplay}
            // slotMachine={slotMachine}
            // triggerSlot={() => triggerSlot()}
          />
        </List>
        <List component="nav" aria-labelledby="nested-list-subheader">
          <Drawer
            open={open.SECONDARY.FLAVOR}
            onToggle={() => toggleMenu({ tree: 'SECONDARY', tier: 'FLAVOR' })}
            onSelect={(id) => onSelectSecondaryFlavor(id + 1)}
            runes={flavors.slice(1)}
            selected={secondFlavor}
            isFlavor
            flavor={primeFlavor}
            color={secondFlavor ? secondFlavor.colorRGB : Layout.GOLD}
            moreInfo={openInfoDisplay}
          />
          <DoubleDrawer
            open={open.SECONDARY.RUNES}
            onToggle={() => toggleMenu({ tree: 'SECONDARY', tier: 'RUNES' })}
            onSelect={(row, id) => {
              onSelectSecondaryRunes(row, id)
            }}
            runes={secondFlavor ? [secondFlavor.tier1, secondFlavor.tier2, secondFlavor.tier3] : []}
            selected1={secondT1}
            selected2={secondT2}
            color={secondFlavor ? secondFlavor.colorRGB : Layout.GOLD}
            index={runeMatrixIndex}
            moreInfo={openInfoDisplay}
            slotMachine={slotMachine}
            triggerSlot={(!pathID || !fresh) && secondT2 && triggerSlot}
          />
        </List>
      </S.Path>
    )
  }
}

const mapStateToProps = (state) => {
  let paths = state.composition.paths ? state.composition.paths : flavors
  // console.log(state.composition)

  var primeFlavor = paths[state.composition.PRIMARY_FLAVOR]
  var keystone = primeFlavor.keystones[state.composition.KEYSTONE]
  var primeT1 = primeFlavor.tier1[state.composition.PRIMARY_T1]
  var primeT2 = primeFlavor.tier2[state.composition.PRIMARY_T2]
  var primeT3 = primeFlavor.tier3[state.composition.PRIMARY_T3]

  var secondFlavor = state.composition.SECONDARY_FLAVOR ? paths[state.composition.SECONDARY_FLAVOR] : null
  var secondT1 = secondFlavor
    ? secondFlavor['tier' + (state.composition.SECONDARY_T1_ROW + 1)][state.composition.SECONDARY_T1_ID]
    : null
  var secondT2 = secondFlavor
    ? secondFlavor['tier' + (state.composition.SECONDARY_T2_ROW + 1)][state.composition.SECONDARY_T2_ID]
    : null
  var runeMatrixIndex = secondFlavor
    ? [
        [state.composition.SECONDARY_T1_ROW, state.composition.SECONDARY_T1_ID],
        [state.composition.SECONDARY_T2_ROW, state.composition.SECONDARY_T2_ID],
      ]
    : null
  var slotMachine =
    state.composition.slotMachine &&
    paths[state.composition.slotMachine.flavor]['tier' + (state.composition.slotMachine.tier + 1)][
      state.composition.slotMachine.id
    ]

  return {
    primeFlavor: primeFlavor,
    keystone: keystone,
    primeT1: primeT1,
    primeT2: primeT2,
    primeT3: primeT3,
    secondFlavor: secondFlavor,
    secondT1: secondT1,
    secondT2: secondT2,
    runeMatrixIndex: runeMatrixIndex,
    open: {
      PRIMARY: {
        FLAVOR: state.composition.OPEN.PRIMARY.FLAVOR,
        KEYSTONE: state.composition.OPEN.PRIMARY.KEYSTONE,
        T1: state.composition.OPEN.PRIMARY.T1,
        T2: state.composition.OPEN.PRIMARY.T2,
        T3: state.composition.OPEN.PRIMARY.T3,
      },
      SECONDARY: {
        FLAVOR: state.composition.OPEN.SECONDARY.FLAVOR,
        RUNES: state.composition.OPEN.SECONDARY.RUNES,
      },
    },
    bgImage: flavors[state.composition.PRIMARY_FLAVOR].bg,
    runeInfo: state.composition.RUNE_INFO,
    slotMachine: slotMachine,
    fresh: state.composition.fresh,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSelectPrimaryFlavor: (id) => dispatch(selectPrimaryFlavor(id)),
    onSelectKeystone: (id) => dispatch(selectKeystone(id)),
    onSelectPrimaryT1: (id) => dispatch(selectPrimaryT1(id)),
    onSelectPrimaryT2: (id) => dispatch(selectPrimaryT2(id)),
    onSelectPrimaryT3: (id) => dispatch(selectPrimaryT3(id)),
    onSelectSecondaryFlavor: (id) => dispatch(selectSecondaryFlavor(id)),
    onSelectSecondaryRunes: (row, id) => {
      dispatch(selectSecondaryRunes(row, id))
    },
    toggleMenu: (menu) => dispatch(toggleMenu(menu)),
    toggleInfoDisplay: (rune) => dispatch(toggleInfoDisplay(rune)),
    loadPathsFromFirestore: () => dispatch(loadPathsFromFirestore()),
    loadFromPermalink: (pathID) => dispatch(loadFromPermalink(pathID)),
    triggerSlot: () => dispatch(triggerSlot(true, flavors)),
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: 'paths' }]),
)(MobilePathBuilder)
