import React from "react";
import Navbar from "./Navbar";
import logo from "../logo.png";
import sliderImage from '../Images/slider-default.jpg'

const NavigationBar = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 col-lg-2">
          <a className="navbar-brand" href={"/"}>
            <img src={logo} alt="log" className="brand-logo" />
          </a>
        </div>

        <div className="col-12 col-lg-10">
          <Navbar />
        </div>
        <div>
          <img src={sliderImage} alt="" className="slider-default" />
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
