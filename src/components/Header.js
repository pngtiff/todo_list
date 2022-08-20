import React from "react";
import lightMode from '../images/icon-sun.svg';
import darkMode from '../images/icon-moon.svg';

function Header(props) {
    return (
    <header className={props.darkMode ? "dark" : ""}>
        <div className="headerContainer">
            <h1>TODO</h1>
            <div className="toggle" onClick={props.toggleDarkMode}>
                <img src={props.darkMode ? darkMode : lightMode} alt="header banner"></img>
            </div>
        </div>
    </header>
    )
}

export default Header;