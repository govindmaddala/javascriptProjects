import React, { useState } from 'react'
import SigninPage from '../SigninPage'
import InputContent from './InputContent'
import Navbar from './Navbar'


const HomePage = ({ user, isLogged, handleLogout }) => {

  const [task, setTask] = useState({
    taskheading: "",
    taskdetails: ""
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





  return (

    isLogged ?
      <>
        <Navbar handleLogout={handleLogout} />
        <div className='container-fluid'>
          <div className="row">
            <div className="col-sm-12 col-lg-5 mx-auto">
              <InputContent task={task} handleChange={handleChange} user={user} ></InputContent>
              
            </div>
          </div>

        </div>
      </>
      :
      <SigninPage></SigninPage>
  )
}

export default HomePage
