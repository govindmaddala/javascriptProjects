import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../../index.css'
import { useNavigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode'

const LoginPage = (props) => {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [passwordType, setPasswordType] = useState('password')

  const [text, setText] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setText((prev) => {
      return ({
        ...prev, [name]: value
      })
    })
  }

  const handlePasswordVisible = () => {
    setPasswordVisible(prev => !prev)
    if (passwordType === 'password') {
      setPasswordType('text')
    } else {
      setPasswordType('password')
    }
  }

  const userData = {
    email: text.email,
    password: text.password
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/user/login', userData)
      .then(res => {
        console.log(res);
        const token = res.data.message;
        localStorage.setItem("AUTH_TOKEN", token)
        const decoded = jwtDecode(token);
        props.setIsLogged(true)
        props.setUser(decoded);
        navigate('/home')
        setText({
          email: "",
          password: ""
        })
      })
      .catch(err => {
        console.log(err);
        window.alert(err.response.data.message)
      })
  }

  return (
    <div className="container">
      <div className='login-page col-lg-4 shadow-lg'>
        <div className="d-flex flex-column justify-content-center login-box ">
          <h1>Login Page</h1>
          <form action="" method="post" onSubmit={handleSubmit}>
            <input type="email" name='email' placeholder='Email*' value={text.email} onChange={handleChange} />
            <div>
              <input type={passwordType} name='password' placeholder='Password*' id='password' value={text.password} onChange={handleChange} />
              <i className={!passwordVisible ? "fa-regular fa-eye-slash" : "fa-regular fa-eye"} onClick={handlePasswordVisible} id="visiblePassword" />
            </div>
            <button type="submit" className='btn btn-primary'>Login</button>
          </form>
          <hr />
          <p><Link to='/forgotpassword'>Forgot Password?</Link> </p>
          <p><Link to='/signin'>Don't you have account?</Link> </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
