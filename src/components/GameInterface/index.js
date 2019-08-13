import React from 'react'
import './GameInterface.css'
import GameStatistics from '../GameStatistics'

export default class GameInterfaceContainer extends React.Component {
  state = { 
    moleCount: 0,
    moles: [],
    score: 0,
    intervalId: 0
  }

  componentDidMount () {
    // setInterval(() => {
    //   for (let i = 0; i < 1; i++) {
    //     this.setState({ 
    //       moleCount: this.state.moleCount + 1, 
    //       moles: [...this.state.moles, this.renderMole()] 
    //     })
    //   }
    // }, 1000)

    const intervalId = setInterval(this.launchTimer, 1000)
    this.setState({ intervalId: intervalId })
  }

  componentWillUnmount =() => {
    clearInterval(this.state.intervalId)
    const moles = document.getElementsByClassName('mole')
    const molesArray = Array.from(moles)
    setTimeout(() => {
      molesArray.forEach(mole => {
      mole.style.display = 'none'
    })}, 1000)
  }

  // generateMoles = () => {
  //   console.log(this.state.intervalId)
  //   clearInterval(this.state.intervalId)
  // }

  launchTimer = () => {
    for (let i = 0; i < 1; i++) {
      this.setState({
        moleCount: this.state.moleCount + 1, 
        moles: [...this.state.moles, this.renderMole()] 
      })
    }
  }

  whackMole = e => {
    const mole = document.getElementById(`${e.target.id}`)
    mole.style.display = 'none'
    this.setState({ score: this.state.score + 1 })
  }

  renderMole = () => {
    const randomHeight = Math.min(Math.floor(Math.random() * 80), 70)
    const randomWidth = Math.min(Math.floor(Math.random() * 60), 54.5)

    const moleStyle= {
      top: `${randomHeight}vh`,
      left: `${randomWidth}vw`
    }

    const mole = <div 
      style={moleStyle} 
      className='mole'
      key={this.state.moleCount}
      id={`mole-${this.state.moleCount + 1}`}
      onClick={this.whackMole}>
      </div>
    return mole
  }
  
  render() {
    const moles = this.state.moles
    console.log(moles)
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
        <button onClick={this.componentWillUnmount}>Stop game</button>
      </div>
    )
  }
}