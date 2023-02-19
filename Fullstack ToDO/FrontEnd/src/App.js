import React, { useEffect, useState } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import SigninPage from './components/Authentication/SigninPage'
import RegistrationSuccessfulPage from './components/Authentication/RegistrationSuccessfulPage'
import LoginPage from './components/Authentication/LoginPage'
import ForgetpasswordPage from './components/Authentication/ForgetpasswordPage'
import ResetpasswordPage from './components/Authentication/ResetpasswordPage'


import ProfilePage from './components/Home/ProfilePage'
import HomePage from './components/Home/HomePage'


import jwtDecode from 'jwt-decode'

const App = () => {

    const [user, setUser] = useState(false)
    const [isLogged, setIsLogged] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem("AUTH_TOKEN")
        if (!token) {
            setUser(false);
            setIsLogged(false);
            
        } else {
            const decoded = jwtDecode(token)
            if (decoded.exp * 1000 < Date.now()) {
                setUser(false)
                setIsLogged(false)
            } else {
                setUser(decoded)
                setIsLogged(true)
            }
        }
    }, [])

    const handleLogout = () => {
        localStorage.removeItem("AUTH_TOKEN")
        setUser(false)
        setIsLogged(false)
    }


    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/signin" element={<SigninPage />} />
                    <Route path='/registrationsuccessful' element={<RegistrationSuccessfulPage/>}/>
                    <Route path="/" element={<LoginPage setUser={setUser} setIsLogged={setIsLogged} />} />
                    <Route path="/forgotpassword" element={<ForgetpasswordPage />} />
                    <Route path="/resetpassword" element={<ResetpasswordPage />} />
                    <Route path="/home" element={<HomePage user={user} isLogged={isLogged} handleLogout={handleLogout} />} />
                    <Route path="home/profile" element={<ProfilePage />} />
                </Routes>
            </Router>
        </div>
    )
}

export default App
