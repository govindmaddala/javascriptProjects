import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ForgotPasswordPage from './Pages/ForgotPasswordPage';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import ResetPasswordPage from './Pages/ResetPasswordPage';
import VerificationEmailPage from './Pages/VerificationEmailPage';
import jwtDecode from 'jwt-decode';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState(false)

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("Auth_Token"))
        if (!token) {
            setUser(null);
            setIsLoggedIn(false)
        } else {
            const decodedToken = jwtDecode(token)
            if (decodedToken.exp * 1000 < Date.now()) {
                setUser(null);
                setIsLoggedIn(false)
            } else {
                setUser(decodedToken)
                setIsLoggedIn(true)
            }
        }
    }, [])

    const handleLogoutUser = () => {
        setUser(null);
        setIsLoggedIn(false)
        localStorage.removeItem("Auth_Token")
    }

    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} user={user} handleLogoutUser={handleLogoutUser} />} />
                    <Route path='/login' element={<LoginPage setUser={setUser} setIsLoggedIn={setIsLoggedIn} />} />
                    <Route path='/register' element={<RegisterPage />} />
                    <Route path='/forgotpassword' element={<ForgotPasswordPage />} />
                    <Route path='/resetpassword' element={<ResetPasswordPage />} />
                    <Route path='/verifyEmail' element={<VerificationEmailPage />} />

                </Routes>
            </Router>
        </div>
    )
}

export default App
