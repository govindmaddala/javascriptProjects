import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.min.js";
import '../../src/IndexPage.css'

function UserDetails(props) {
    return (
        <div className="dropdown show">
            <Link
                className="btn btn-secondary dropdown-toggle"
                // to="/"
                // role="button"
                id="dropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
            >
                {props.userName}
            </Link>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <p>
                    <Link to="/" classNameName="logout-icon" onClick={props.logoutBtnFun}>
                        Settings
                    </Link>
                </p>
                <p>
                    <Link to="/" classNameName="logout-icon" onClick={props.logoutBtnFun}>
                        Logout
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default UserDetails;
