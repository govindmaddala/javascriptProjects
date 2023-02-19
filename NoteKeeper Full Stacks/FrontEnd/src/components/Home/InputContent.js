import React from 'react'
import Icon from '@mui/material/Icon';
import { green } from '@mui/material/colors';
import { Link } from 'react-router-dom';

const InputContent = (props) => {
    return (
        <div className='container'>
            <div className="d-flex flex-column justify-content-between  task-box mt-5 ms-auto shadow-lg p-3 row">
                <div>
                    <input
                        type="text"
                        name="taskheading"
                        className="title-class mt-2"
                        id="title-card"
                        placeholder="Title"
                        value={props.task.taskheading}
                        onChange={props.handleChange}
                    />
                </div>
                <div>
                    <textarea
                        name="taskdetails"
                        id="content-id"
                        rows={props.rowCountProp}
                        placeholder="Task..."
                        value={props.task.taskdetails}
                        onChange={props.onChangefun}
                        onClick={props.handleChange}
                        style={{ fontFamily: 'Sansita Swashed' }}
                    ></textarea>
                </div>
                
                <div>
                    {/* <button className='btn btn-primary inner-add-btn'>+</button> */}
                    <Link to="/home"><Icon sx={{ color: green[500] }} className="inner-add-btn">add_circle</Icon></Link>
                </div>
            </div>
           
            {/* <div>
                <button className='btn btn-primary'>Add</button>
            </div> */}

        </div>
    )
}

export default InputContent
