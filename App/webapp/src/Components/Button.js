import React from 'react'
import {
    Link
} from "react-router-dom";
import '../Css/Button.css'

export const Button = ({size = "regular", to = "#", value = "", classList = "", status = "", buttonClass = "", onClick, icon}) => {
    size = "btn-" + size;
    let button;
    if (icon == null) button = <Link to={to} class={classList}>
        <button class={size + " " + buttonClass + " " + status} onClick={onClick}>{value}</button>
    </Link>;
    else button = <Link to={to} class={classList}>
        <button class={"btn-icon " + size + " " + buttonClass + " " + status} onClick={onClick}><img src={icon}/>
        </button>
    </Link>;
    return button;

}

export default Button