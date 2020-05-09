import React from 'react'

import Switch from './Switch'

const Item = ({label, isOn, onClick, id }) => {
  return (
    <div className={`item ${isOn ? 'on' : 'off'}`} onClick={() => onClick(id)}>
      <label>{label}</label><Switch />
    </div>
  )
}

export default Item
