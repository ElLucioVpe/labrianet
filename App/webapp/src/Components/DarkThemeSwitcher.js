import React, {useContext} from 'react';
import ThemeContext from '../Libraries/ThemeContextLib';
import Button from "./Button"

import '../Css/DarkThemeSwitcher.css';

export default function DarkThemeSwitcher() {
    const {dark, toggle} = useContext(ThemeContext);

    return (
        <div className={"item dark-theme-switcher mr-10" + (dark === true ? " dark-mode" : " light-mode")}
             onClick={() => toggle()}>
            <span className="dot moon"></span>
            <span className="dot moontop"></span>
        </div>
    );
}