import React from 'react'
import 'bootstrap'
import logo from '../Images/ecommerceLogo.jpg'
import cart from '../Images/shoppingCart.png'
import avatar from '../Images/userIcon.png'
import '../App.css'

const NavbarEle = () => {
    return (
        <div className='navbarContainer'>
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/"><img src={logo} alt="Logo" className='logoImage' /></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">

                        <form className="d-flex searchIcon" role="search">
                            <input className="form-control me-2 searchBar" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>

                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/"><img src={avatar} alt="user" /></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/"><img src={cart} alt="cart" className='cartIcon' /></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavbarEle
