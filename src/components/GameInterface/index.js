import React from 'react'
import './GameInterface.css'
import GameStatistics from '../GameStatistics'

export default class GameInterfaceContainer extends React.Component {
  state = { 
    moleCount: 0,
    moles: [],
    score: 0 
  }

  componentDidMount () {
    setInterval(() => {
      for (let i = 0; i < 1; i++) {
        this.setState({ 
          moleCount: this.state.moleCount + 1, 
          moles: [...this.state.moles, this.renderMole()] 
        })
      }
    }, 100)
  }

  renderMole = () => {
    const randomHeight = Math.min(Math.floor(Math.random() * 80), 73)
    const randomWidth = Math.min(Math.floor(Math.random() * 60), 56)

    const moleStyle= {
      top: `${randomHeight}vh`,
      left: `${randomWidth}vw`
    }

    const mole = <div 
      style={moleStyle} 
      className='mole' 
      ></div>
    return mole
  }
  
  render() {
    // if (this.state.moleCount < 3) {
    //   for (var i = 0; i < this.state.moleCount; i ++) {
    //     this.state.moles.push(this.renderMole())
    //     console.log(this.state.moles)
    //   }
    // }

    const moles = this.state.moles
    if (this.state.moleCount > 3) {
      moles.shift()
    }

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