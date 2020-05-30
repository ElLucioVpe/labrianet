import React from 'react'
import {
    Link
} from "react-router-dom";
import '../Css/Button.css'

export const Button = ({size = "regular", to = "/", value = "", classList}) => {
    size = "btn-" + size
    return (
        <Link to={to} class={classList}>
            <button class={size}>{value}</button>
        </Link>
    )
}

export default Button