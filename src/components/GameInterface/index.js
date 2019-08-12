import React from 'react'
import './GameInterface.css'

export default class GameInterfaceContainer extends React.Component {
  state = { mole: 0 }

  componentDidMount () {
    setInterval(() => {
      this.setState({ mole: this.state.mole + 1 })
      console.log('this.state.mole test:', this.state.mole)
    }, 1000)
  }

  renderMole = () => {
    const randomHeight = Math.max(Math.floor(Math.random() * 550), 0)
    const randomWidth = Math.max(Math.floor(Math.random() * 550), 0)

    const moleStyle= {
      top: `${randomHeight}px`,
      left: `${randomWidth}px`
    }

    const mole = <div style={moleStyle} className='mole'></div>
    console.log(mole)
    return mole
  }
  
  render() {
    const moles = []

    for (var i = 0; i < this.state.mole; i ++) {
      moles.push(this.renderMole())
    }

    return (
      <div id='battlefield'>
        {moles}
      </div>
    )
  }
}