import React from 'react'
import '../Css/Input.css'

export const Input = ({size = "regular", placeholder, value = "", classList = ""}) => {
    size = "input-" + size
    return (
        <input class={size + ' ' + classList} placeholder={placeholder} value={value}/>
    )
}

export default Input