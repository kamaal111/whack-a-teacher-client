import React from 'react'
import './GameInterface.css'

export default class GameInterfaceContainer extends React.Component {
  renderBattlefield = () => {
    const battlefield = <div id='battlefield'>{generateMole()}</div>
    return battlefield
  }
  
  render() {
    return(
      <div>
        {this.renderBattlefield()}
      </div>
    )
  }
}

const generateMole = () => {
  const randomHeight = Math.max(Math.floor(Math.random() * 550), 0)
  const randomWidth = Math.max(Math.floor(Math.random() * 550), 0)

  const moleStyle= {
    top: `${randomHeight}px`,
    left: `${randomWidth}px`
  }

  const mole = <div style={moleStyle} className='mole'></div>
  return mole
}