import React from "react";
import "../../src/AppStyle.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
import DeleteIcon from "@mui/icons-material/Delete";

function TaskCard(props) {
  return (
    <div>
      <div style={{ backgroundColor: "white" }} className="p-3 shadow-lg task-card">
        <h3 className="task-heading">{props.titleProp}</h3>
        <p className="task-content">{props.contentProp}</p>
      </div>
      <button
          className="button-delete btn btn-warning"
          onClick={() => {
            props.deleteFun(props.id);
          }}
        >
          <DeleteIcon></DeleteIcon>
        </button>
    </div>
  );
}

export default TaskCard;
