import React from "react";
import "../../src/AppStyle.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
import TimeComp from "./TimeComp";
import NoteAltOutlinedIcon from "@mui/icons-material/NoteAltOutlined";
// import UserDetails from "./UserDetails";

function Heading(props) {
  return (
    <div>
      <div className="bg-warning">
        <NoteAltOutlinedIcon className="iconSize"></NoteAltOutlinedIcon>
        <h1 id="heading-bar">Note Keeper</h1>
      </div>
      <TimeComp class="timebar" timePropFromHeading={props.timePropFromApp} />
      <p>{props.fname}</p>
      {/* <UserDetails userName={props.fname}/> */}
    </div>
  );
}

export default Heading;
