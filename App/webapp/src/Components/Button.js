import React from 'react'
import {
    Link
} from "react-router-dom";

export const Button = ({size="regular", to="/", value=""}) => {
    size = "btn-" + size
    return (
        <Link to={to} ><button class={size}>{value}</button></Link>
    )
}

export default Button