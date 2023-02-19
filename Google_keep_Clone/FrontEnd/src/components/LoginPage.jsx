import React from "react";
import "../../src/IndexPage.css";
import { Link } from "react-router-dom";

function Index() {
  return (
    <div className="container mb-5">
      <div className="row">
        <div className="col-lg-6 col-12">
          <div className="signuppage-content">
            <h1>MySite</h1>
            <p>This is caption</p>
          </div>
        </div>
        <div className="col-lg-6 col-12">
          <div className="signup-box shadow-lg">
            <form action="/home" method="post">
              <div className="d-flex flex-column justify-content-center p-5">
                <div>
                  <input
                    className="input-box"
                    type="email"
                    name="mailID"
                    id="email"
                    placeholder="  Email Address*"
                  />
                </div>
                <div>
                  <input
                    className="input-box"
                    type="password"
                    name="password"
                    id="pwd"
                    placeholder="  Password*"
                  />
                </div>

                <div className="button-box">
                  <Link
                    to="/Login"
                    type="submit"
                    className="signup-button btn btn-primary"
                  >
                    Login
                  </Link>
                  <hr />
                  <p>No Account? Create new account now</p>
                  <Link
                    to="/"
                    type="submit"
                    className="signup-button btn btn-primary"
                  >
                    Signup
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
