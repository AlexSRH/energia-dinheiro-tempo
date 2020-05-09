import React, { useState, useEffect } from 'react'

import './global.css'
import Item from './components/Item'

const initialState = {
  energy: false,
  money: false,
  time: false
}

const App = () => {
  const [ activeItems, setActiveItems ] = useState(initialState)
  const [ status, setStatus ] = useState('Indefinido')

  const maxActiveItems = Object.keys(activeItems).length - 1

  function handleToggle (id) {
    const currentState = activeItems[id]
    const numberOfActiveItems = Object.values(activeItems).filter(item => item).length
    const checkMaxActiveItems = numberOfActiveItems === maxActiveItems && !currentState

    const newState = checkMaxActiveItems ? initialState : activeItems
    setActiveItems({...newState, [id]: !currentState})
  }

  useEffect(() => {
    const currentActiveItems = Object.keys(activeItems).filter(item => activeItems[item])
    const numberOfActiveItems = Object.values(activeItems).filter(item => item).length

    if (numberOfActiveItems < maxActiveItems)
      setStatus('Indefinido')

    function checkIfIsTrue (id) {
      return currentActiveItems.find(item => item === id)
    }

    if (checkIfIsTrue('energy')) {
      if (checkIfIsTrue('money')) setStatus('Você é Adulto!')
      else if (checkIfIsTrue('time')) setStatus('Você é Jovem!')
    }

    else if (checkIfIsTrue('money') && checkIfIsTrue('time')) {
      setStatus('Você é Idoso!')
    }

  }, [activeItems, maxActiveItems])

  return (
    <div className="container">
      <h1>Ter energia, dinheiro ou tempo</h1>
      <h2>Você só pode ter dois desses!</h2>

      <Item
        label='Energia'
        id='energy'
        isOn={activeItems.energy}
        onClick={handleToggle}
      />

      <Item
        label='Dinheiro'
        id='money'
        isOn={activeItems.money}
        onClick={handleToggle}
      />

      <Item
        label='Tempo'
        id='time'
        isOn={activeItems.time}
        onClick={handleToggle}
      />

      <h3><span>Status:</span> {status}</h3>
    </div>
  )
}

export default App
