import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = ({handleLogout}) => {

    const navigate = useNavigate();
  return (
    <>

<nav className="navbar navbar-expand-lg bg-primary">
        <div className="container-fluid">
          <Link className="navbar-brand " to="/home">NoteKeeper</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/homenavbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form className="d-flex flex-row justify-content-between ms-auto" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-warning" type="submit">Search</button>
            </form>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-auto justify-content-end mx-5">
              <li className="nav-item">
                <Link className="nav-link active text-white" aria-current="page" to="/home">Home</Link>
              </li>
              <li className="nav-item">
                <a className="nav-link active text-white" href="/home">Contact</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle active text-white" href="/home" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  User
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="/home">Profile</a></li>
                  <li><button className="dropdown-item" onClick={()=>{handleLogout(); navigate('/login')}} >Logout</button></li>
                </ul>
              </li>
              
            </ul>
          </div>
        </div>
      </nav>
    
    </>
  )
}

export default Navbar
