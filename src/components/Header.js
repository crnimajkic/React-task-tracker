// you can use default propTypes to catch errors and predefine types of propps
// you have to import proptypes // import PropTypes from "prop-types"
// and define it before export with// Header.popTypes= { title: PropTypes.string}
// if you make a mistake and put numbers you are going to get error.
// also you can appent .isRequired to define requirements for your componet
import React from "react"
import Button from "./Button"
import { useLocation } from "react-router-dom"


const Header = ({ title, onAdd, showAdd }) => {

    const location = useLocation()

    return (
        <header className="header">
            <h1 >{title}</h1>
            {location.pathname === '/' && < Button color={showAdd ? "Red" : "Green"} text={showAdd ? "Close" : "Add"} onClick={onAdd} />}
        </header>
    )
}

// you can put styles this way

// const headingstyles = { 
//     color: 'red',
//     backgroundColor: 'pink'
// }

// if there is no props on the call of the component
Header.defaultProps = {
    title: "Hello from default"
}
export default Header