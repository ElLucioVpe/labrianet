import React, {useState, useLayoutEffect} from 'react';

const ThemeContext = React.createContext({
    dark: false,
    toggle: () => {
    },
});

export default ThemeContext;

export function ThemeProvider(props) {
    // keeps state of the current chosen theme
    const [dark, setDark] = useState(window.localStorage.getItem('darkTheme'));

    // paints the app before it renders elements
    useLayoutEffect(() => {
        const lastTheme = window.localStorage.getItem('darkTheme');

        if (lastTheme === 'true') {
            setDark(true);
            applyTheme(darkTheme);
            document.body.classList.remove('light-mode');
            document.body.classList.add('dark-mode');
        }

        if (!lastTheme || lastTheme === 'false') {
            setDark(false);
            applyTheme(lightTheme);
            document.body.classList.remove('dark-mode');
            document.body.classList.add('light-mode');
        }
        // if state changes, repaints the app
    }, [dark]);

    const applyTheme = theme => {
        const root = document.getElementsByTagName('html')[0];
        root.style.cssText = theme.join(';');
    }

    const toggle = () => {
        console.log("kek");
        setDark(!dark);
        window.localStorage.setItem('darkTheme', !dark);
    };

    return <ThemeContext.Provider value={{
        dark, toggle,
    }}>
        {props.children}
    </ThemeContext.Provider>
}

const darkTheme = [
    '--main1: black',
    '--main2: #ce96a6',
    '--main3: #d1a7a0',
    '--main4: #d4cbb3',
    '--main5: #d2e0bf',
    '--text1: #4c2f3f',
    '--right: #45CB85',
    '--wrong: #CF4F7E',
    '--background: black',
];
const lightTheme = [
    '--main1: #ce84ad',
    '--main2: #ce96a6',
    '--main3: #d1a7a0',
    '--main4: #d4cbb3',
    '--main5: #d2e0bf',
    '--text1: #4c2f3f',
    '--right: #45CB85',
    '--wrong: #CF4F7E',
    '--background: white',
];