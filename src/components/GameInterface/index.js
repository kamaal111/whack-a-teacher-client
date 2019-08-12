import React from 'react'
import './GameInterface.css'
import GameStatistics from '../GameStatistics'

export default class GameInterfaceContainer extends React.Component {
  state = { mole: 0, score: 0 }

  componentDidMount () {
    setInterval(() => {
      this.setState({ mole: this.state.mole + 1 })
    }, 2000)
  }

  whackMole = () => {
    console.log(5)
    this.setState({ score: this.state.score + 1 })
  }

  renderMole = () => {
    const randomHeight = Math.max(Math.floor(Math.random() * 550), 0)
    const randomWidth = Math.max(Math.floor(Math.random() * 550), 0)

    const moleStyle= {
      top: `${randomHeight}px`,
      left: `${randomWidth}px`
    }

    const mole = <div style={moleStyle} className='mole' onClick={this.whackMole}></div>
    return mole
  }
  
  render() {
    const moles = []

    if (this.state.mole < 6) {
      for (var i = 0; i < this.state.mole; i ++) {
        moles.push(this.renderMole())
      }
    }
    console.log(moles)

    return (
      <div id='game-interface'>
        <div className='statistics'><GameStatistics player='Nicola' score={this.state.score}/></div>
        <div id='battlefield'>
          {moles}
        </div>
        <div className='statistics'><GameStatistics/></div>
      </div>
    )
  }
}