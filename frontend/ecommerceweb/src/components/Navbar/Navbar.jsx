import React, { useState, useEffect } from 'react'
import './Navbar.css'
import searchIcon from '../../assets/Vector.svg'
import userIcon from '../../assets/Vector-1.svg'
import starIcon from '../../assets/Vector-2.svg'
import cartIcon from '../../assets/Vector-3.svg'
import menuicon from '../../assets/SVG.png'
import { Link, useLocation } from 'react-router-dom'
import { ShopContext } from '../../context/ShopContext'

const Navbar = () => {

    const loc = useLocation();
    const { curr, setCurr, totalCart } = React.useContext(ShopContext)
    const [menuHide, setMenuHide] = useState(false);

    useEffect(() => {
        setCurr(loc.pathname.substring(1));
    });



    return (
        <div className='wrapall'>
            <div className="navbar">
                <div className="logo">
                    <Link to='/'><h1>cornellius</h1></Link>
                </div>
                <div className="hide">
                    <div className="menu">
                        <ul>
                            <li className={curr === '' ? 'act' : ''} onClick={() => setCurr("")}> <Link to='/'>Home</Link></li>
                            <li className={curr === 'men' ? 'act' : ''} onClick={() => setCurr("men")}> <Link to='/men'>Men</Link></li>
                            <li className={curr === 'women' ? 'act' : ''} onClick={() => setCurr("women")}> <Link to='/women'>Women</Link></li>
                            <li className={curr === 'kids' ? 'act' : ''} onClick={() => setCurr("kids")}> <Link to='/kids'>Kids</Link></li>
                        </ul>
                    </div>
                    <div className="icons">
                        <ul >
                            <li onClick={() => setCurr(() => { localStorage.getItem('auth-token') ? 'profile' : 'login' })}> <Link to={localStorage.getItem('auth-token') ? '/profile' : '/login'}><img src={userIcon} alt="" /></Link></li>
                            <li onClick={() => setCurr("search")}> <Link to='/search'><img src={searchIcon} alt="" /></Link></li>
                            <li onClick={() => setCurr("starred")}> <Link to='/starred'><img src={starIcon} alt="" /></Link></li>
                            <li onClick={() => setCurr("cart")}> <Link to='/cart'><img src={cartIcon} alt="" /></Link></li>
                            {totalCart() === 0 ? '' : <p>{totalCart()}</p>}
                        </ul>
                    </div>
                </div>
                <div className="mbar">
                    <img onClick={() => setMenuHide(menuHide => !menuHide)} src={menuicon} alt="" />
                </div>

            </div>
            <div className={menuHide ? 'hidden' : 'showMenu'}>
                <div className="menu">
                    <ul>
                        <li className={curr === '' ? 'act' : ''} onClick={() => { setCurr(""); setMenuHide(menuHide => !menuHide) }}> <Link to='/'>Home</Link></li>
                        <li className={curr === 'men' ? 'act' : ''} onClick={() => { setCurr("men"); setMenuHide(menuHide => !menuHide) }}> <Link to='/men'>Men</Link></li>
                        <li className={curr === 'women' ? 'act' : ''} onClick={() => { setCurr("women"); setMenuHide(menuHide => !menuHide) }}> <Link to='/women'>Women</Link></li>
                        <li className={curr === 'kids' ? 'act' : ''} onClick={() => { setCurr("kids"); setMenuHide(menuHide => !menuHide) }}> <Link to='/kids'>Kids</Link></li>
                    </ul>
                </div>
                <div className="icons">
                    <ul >
                        <li onClick={() => { setCurr(() => { localStorage.getItem('auth-token') ? 'profile' : 'login' }); setMenuHide(menuHide => !menuHide) }}> <Link to={localStorage.getItem('auth-token') ? '/profile' : '/login'}><img src={userIcon} alt="" /></Link></li>
                        <li onClick={() => { setCurr("search"); setMenuHide(menuHide => !menuHide) }}> <Link to='/search'><img src={searchIcon} alt="" /></Link></li>
                        <li onClick={() => { setCurr("starred"); setMenuHide(menuHide => !menuHide) }}> <Link to='/starred'><img src={starIcon} alt="" /></Link></li>
                        <li onClick={() => { setCurr("cart"); setMenuHide(menuHide => !menuHide) }}> <Link to='/cart'><img src={cartIcon} alt="" /> {totalCart() === 0 ? '' : <p>{totalCart()}</p>}</Link></li>

                    </ul>
                </div>
            </div>
        </div >
    )
}

export default Navbar
