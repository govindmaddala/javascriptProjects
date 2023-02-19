import React from "react";


const Navbar = () => {
  return (
    <div className="navbar-box" id="parallelogram">
      <nav className="navbar navbar-expand-lg text-primary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href={"/home"}
                >
                  Home
                </a>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link"
                  href={"/"}
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  What We Do
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href={"/action"}>
                      Volunteer
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href={"/action"}>
                    Covid-19 Assistance
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href={"/action"}>
                      Save Green Save Life
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href={"/action"}>
                    Crowd Funding
                    </a>
                  </li>
                </ul>
              </li>



              <li className="nav-item dropdown">
                <a
                  className="nav-link"
                  href={"/"}
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Gallery
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href={"/action"}>
                      Blood Donations
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href={"/action"}>
                      Crowd Fundings
                    </a>
                  </li>
                </ul>
              </li>

              {/* <li className="nav-item">
                <a className="nav-link" href={"/link"}>
                Terms and Conditions
                </a>
              </li> */}



              {/* <li className="nav-item dropdown">
                <a
                  className="nav-link"
                  href={"/"}
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Privacy Policy
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href={"/action"}>
                    Cancellation and Refund Policy
                    </a>
                  </li>
                </ul>
              </li> */}

              <li className="nav-item">
                <a className="nav-link" href={"/link"}>
                Monthly Contribution
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href={"/link"}>
                Help Premature Baby
                </a>
              </li>

              {/* <li className="nav-item">
                <a className="nav-link" href={"/link"}>
                Terms of use
                </a>
              </li> */}

              <li className="nav-item">
                <a className="nav-link" href={"/link"}>
                Donor Dashboard
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href={"/link"}>
                  Contact Us
                </a>
              </li>


              
            </ul>
            
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
