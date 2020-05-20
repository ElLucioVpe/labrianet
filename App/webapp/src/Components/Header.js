import React from 'react'
import {
    Link
} from "react-router-dom";

export const Header = () => {
    return (
        <header>
            <div class="header">
                <div class="alignLeft">
                    <span>BUm el logo</span>
                </div>
                <div class="alignRight">
                    <Link to="/login" >Login</Link>
                </div>
            </div>
        </header>
    )
}

export default Header