import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import axios from 'axios'
import { Link,useNavigate } from 'react-router-dom'

const SigninPage = () => {
  const navigate = useNavigate()

  const [text, setText] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setText((prev) => {
      return ({
        ...prev, [name]: value
      })
    })
  }

  const userData = {
    name: text.name,
    email: text.email,
    password: text.password,
    confirmpassword: text.confirmpassword
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/auth/register', userData)
      .then(res => {
        window.alert(res.data.message)
        setText({
          name: "",
          email: "",
          password: "",
          confirmpassword: ""
        })

        res.data.message === "User is registered but there is error in sending email for account verification" ? navigate('/registrationsuccessful') : <> {navigate('/register')} </>


      })
      .catch(err => {
        window.alert(err.response.data.message)
      })
  }

  const [passwordVisible, setPasswordVisible] = useState(false)
  const [passwordType, setPasswordType] = useState('password')

  const handlePasswordVisible = () => {
    setPasswordVisible(prev => !prev)
    if (passwordType === 'password') {
      setPasswordType('text')
    } else {
      setPasswordType('password')
    }
  }

  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)
  const [confirmPasswordType, setConfirmPasswordType] = useState('password')

  const handleConfirmPasswordVisible = () => {
    setConfirmPasswordVisible(prev => !prev)
    if (confirmPasswordType === 'password') {
      setConfirmPasswordType('text')
    } else {
      setConfirmPasswordType('password')
    }
  }

  return (
    <>
      <div className="container">
        <div className='signin-page col-lg-4 shadow-lg'>
          <div className="d-flex flex-column justify-content-center signin-box">
            <h1>Signin Page</h1>
            <form action="" method="post" onSubmit={handleSubmit}>
              <input type="text" name='name' placeholder='Name*' value={text.name} onChange={handleChange} />
              <input type="email" name='email' placeholder='Email*' value={text.email} onChange={handleChange} />

              <div>
                <input type={passwordType} name='password' placeholder='Password*' id='password' value={text.password} onChange={handleChange} />
                <i className={!passwordVisible ? "fa-regular fa-eye-slash" : "fa-regular fa-eye"} onClick={handlePasswordVisible} id="visiblePassword" />
              </div>

              <div>
                <input type={confirmPasswordType} name='confirmpassword' placeholder='Confirm Password*' value={text.confirmpassword} onChange={handleChange} />
                <i className={!confirmPasswordVisible ? "fa-regular fa-eye-slash" : "fa-regular fa-eye"} onClick={handleConfirmPasswordVisible} id="visiblePassword" />
              </div>

              <button type="submit" className='btn btn-primary'>Register</button>
            </form>
            <hr />
            <p><Link to='/login'>Already have account? </Link> </p>
          </div>
        </div>
      </div>

    </>
  )
}

export default SigninPage
