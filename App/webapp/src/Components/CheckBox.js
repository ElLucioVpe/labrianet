import React from 'react'

export const CheckBox = props => {
    let id = "CheckBox-" + props.id
    return (
        <li>
            <input key={props.id} id={id} onClick={props.handleCheckChieldElement} type="checkbox"
                   checked={props.isChecked}
                   value={props.value}/> <label htmlFor={id}>{props.value}</label>
        </li>
    )
}

export default CheckBox