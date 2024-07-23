import React from 'react'
import './Navbar.css'
import userIcon from '../../assets/Vector-1.svg'

const Navbar = () => {
    return (
        <div>
            <div className="navbar">
                <div className="logo">
                    <h1>Cornellius</h1>
                    <p>Admin Page</p>
                </div>
                <img src={userIcon} alt="" />

            </div>
        </div>
    )
}

export default Navbar
