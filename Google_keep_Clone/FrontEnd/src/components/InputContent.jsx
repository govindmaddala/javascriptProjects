import React from "react";
import AddIcon from '@mui/icons-material/Add';
import {Link} from 'react-router-dom'
import '../../src/AppStyle.css'

function InputContent(props) {

    return (
        <div>
            <p><Link to="/" className="logout-icon" onClick={props.logoutBtnFun}>Logout</Link></p>
            <div className="boxes mt-5 ms-auto shadow-lg p-3">
                <input
                    type="text"
                    name="title"
                    className="title-class mt-2"
                    id="title-card"
                    placeholder="Title"
                    value={props.titleState}
                    onChange={props.onChangefun}
                />
                <textarea
                    name="content"
                    id="content-id"
                    rows={props.rowCountProp}
                    placeholder="Task..."
                    value={props.contentState}
                    onChange={props.onChangefun}
                    onClick={props.changeRowsFun}
                    style={{fontFamily: 'Sansita Swashed'}}
                ></textarea>
            </div>
            <button className="button-add btn btn-warning" onClick={props.addCardFun}><AddIcon></AddIcon></button>
        </div>
    );
}

export default InputContent;
