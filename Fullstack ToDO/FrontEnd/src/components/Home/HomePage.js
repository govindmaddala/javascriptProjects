import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import SigninPage from '../Authentication/SigninPage'
import InputContent from './InputContent'
import Navbar from './Navbar'
import jwtDecode from 'jwt-decode'


const HomePage = ({ user, isLogged, handleLogout }) => {
  const [tasks, setTasks] = useState([]);

  const token = localStorage.getItem("AUTH_TOKEN");
  var decodedToken = jwtDecode(token);
  var userID = decodedToken.id;
  useEffect(() => {
    const token = localStorage.getItem("AUTH_TOKEN");
    var decodedToken = jwtDecode(token);
    var userID = decodedToken.id;
    console.log(userID);
    axios.post('/tasks/today', { userID }).then((resp) => {
      setTasks(resp.data.message)
    })
  }, [userID])

  const [task, setTask] = useState({
    taskDate: "",
    taskHeading: "",
    taskDetails: "",
    status: ""
  })

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setTask(prevVal => {
      return ({
        ...prevVal, [name]: value
      })
    })
  }

  const addTask = (e) => {

    e.preventDefault();
    var dateTag = document.getElementById('datePicker');
    var dateSet = new Date(dateTag.value).toLocaleDateString().toString();
    if (dateSet === "Invalid Date") {
      dateSet = new Date().toLocaleDateString().toString();
    }

    var [month, day, year] = dateSet.split('/');
    dateSet = `${day}/${month}/${year}`
    if (task.taskHeading === "" || task.taskDetails === "") {
      alert('Enter Task')
    } else {
      var newTask = {
        userID,
        taskDate: dateSet,
        taskHeading: task.taskHeading,
        taskDetails: task.taskDetails,
        status: "planned"
      }
      setTask({
        taskDate: "",
        taskHeading: "",
        taskDetails: "",
        status: ""
      })

      axios.post('/tasks/new', newTask).then((res) => {
        setTasks(res.data.message)
        console.log(res);
      })
    }
  }

  return (

    isLogged ?
      <>
        <Navbar handleLogout={handleLogout} />
        <div className='container-fluid'>
          <div className="row">
            <div className="col-sm-12 col-lg-5 mx-auto">
              <InputContent task={task} handleChange={handleChange} user={user} addTask={addTask} />
            </div>
            <div>
              {
                tasks.map((eachTask) => {
                  const { _id, taskHeading, taskDetails } = eachTask;
                  return <div key={_id}>
                    <h2>{taskHeading}</h2>
                    <p>{taskDetails}</p>
                  </div>
                })
              }
            </div>
          </div>

        </div>
      </>
      :
      <SigninPage></SigninPage>
  )
}

export default HomePage
