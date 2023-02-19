import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// CSS and JS
import './AppStyle.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'

// Components
import Heading from './components/Heading';
import InputContent from './components/InputContent';
import TaskCard from "./components/TaskCard";
import DeleteSection from './components/DeleteSection';
// import axios from 'axios';
import Index from './components/Index';
import LoginPage from '../src/components/LoginPage'


function App() {
  const nowTime = new Date().toLocaleTimeString();
  const [przntTime, updatedTime] = useState(nowTime)
  const [userFname, setUserFname] = useState("")
  const [userDet, setUserDet] = useState({
    fname: "",
    lname: "",
    email: "",
    password: ""
  })

  const [signButtonRoute, setSignButtonRoute] = useState("/")


  const signup = (event) => {
    const { name, value } = event.target
    setUserDet((prevVal) => {
      return {
        ...prevVal,
        [name]: value
      }
    })
    setUserFname(userDet.fname)
    if (userDet.fname !== "") {
      setSignButtonRoute("/home")
    }
    else {
      setSignButtonRoute("/")
    }
  }

  const handleLogout = () => {
    setUserDet({
      fname: "",
      lname: "",
      email: "",
      password: ""
    })
  }

  const signupHandleChange = (e) => {
    const { name, value } = e.target
    setUserDet((prevVal) => {
      return {
        ...prevVal,
        [name]: value
      }
    })
  }

  function updateTime() {
    const timeNow = new Date().toLocaleTimeString()
    updatedTime(timeNow)
  }

  setInterval(() => {
    updateTime()
  }, 1000);

  const [textName, updateTextName] = useState({
    title: "",
    content: "",
  });


  function handleChange(event) {
    const { name, value } = event.target;
    updateTextName(prevValue => {
      return {
        ...prevValue,
        [name]: value
      }
    });
  }

  const [taskBoxes, updateTaskBox] = useState([{
    title: "",
    content: "",
  }]);

  const [deletedTasks, updateDeletedTasks] = useState([{
    title: "",
    content: "",
  }])


  function addCard() {
    updateTaskBox((prevValue) => {
      return [textName, ...prevValue];
    });

    updateTextName({
      title: "",
      content: "",
    });
    changeRowCount('1')
  }

  async function deleteCard(id) {

    const deletedTask = taskBoxes.find((task, ind) => {
      if (ind === id) {
        return task
      }
      return null;
    })

    updateDeletedTasks(prevValue => {
      return [...prevValue, deletedTask]
    })

    updateTaskBox((prevValue) => {
      return prevValue.filter((task, index) => {
        return index !== id
      })
    })
  }

  const [rowCount, changeRowCount] = useState("1")
  function changeRows() {
    changeRowCount("3")
  }

  return (
    <div className='body-container'>
      <Heading timePropFromApp={przntTime} fname={userFname} />
      <Router>
        <Routes>
          <Route path='/' element={<Index createAccount={signup} textValue={userDet} handleSignupChange={signupHandleChange} signRoute={signButtonRoute} />} />
          <Route path='/Login' element={<LoginPage />} />
          <Route />
          <Route />

          <Route path='/home' element={<> <InputContent rowCountProp={rowCount} changeRowsFun={changeRows} titleState={textName.title} contentState={textName.content} onChangefun={handleChange} addCardFun={addCard} logoutBtnFun = {handleLogout} />

            <div className="container">
              <div className="row">
                {taskBoxes.map((taskBox, index) => {
                  if (taskBox.title !== "") {
                    return <div className="col-12 col-sm-6 col-lg-4 col-xl-3 mt-4">
                      <TaskCard titleProp={taskBox.title} contentProp={taskBox.content} key={index} id={index} deleteFun={deleteCard} />
                    </div>
                  }
                  return null;
                })}
              </div>
            </div>

            <div className="container">
              <h1 className='text-center text-white shadow-lg delete-heading'>Completed Tasks</h1>
              <div className="row">
                {deletedTasks.map(deletedTask => {
                  if (deletedTask.title !== "") {
                    return <div className="col-12 col-sm-6 col-lg-4 col-xl-3 mt-4">
                      <DeleteSection titleProp={deletedTask.title} contentProp={deletedTask.content} />
                    </div>
                  }
                  return null;
                })}
              </div>
            </div>
          </>

          } />

        </Routes>
      </Router>
    </div>

  );


}

export default App;
