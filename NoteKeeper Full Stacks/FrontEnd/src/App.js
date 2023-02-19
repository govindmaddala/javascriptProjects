import React, { useEffect, useState } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import ForgetpasswordPage from './components/ForgetpasswordPage'
import HomePage from './components/Home/HomePage'
import LoginPage from './components/LoginPage'
import ProfilePage from './components/Home/ProfilePage'
import ResetpasswordPage from './components/ResetpasswordPage'
import SigninPage from './components/SigninPage'
import jwtDecode from 'jwt-decode'
import RegistrationSuccessfulPage from './components/RegistrationSuccessfulPage'


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
                    <Route path="/" element={<SigninPage />} />
                    <Route path='/registrationsuccessful' element={<RegistrationSuccessfulPage/>}/>
                    <Route path="/login" element={<LoginPage setUser={setUser} setIsLogged={setIsLogged} />} />
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
