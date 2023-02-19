/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import {
    Button,
    CssBaseline,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";

const ResetPasswordPage = () => {

    const [passwordVisibility, setPasswordVisibility] = useState(true)
    const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(true)
    const [isTokenVerified, setIsTokenVerified] = useState(false)
    const [error, setError] = useState("");
    const token = useLocation().search.split("=").at(1)  // to retrive token from link sent through email
    const [text, setText] = useState({
        newPassword: "",
        confirmNewPassword: "",
    });

    const { email } = jwtDecode(token)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setText((prevVal) => {
            return { ...prevVal, [name]: value };
        });
    };

    const showPassword = () => {
        setPasswordVisibility(prevValue => !prevValue)
    }

    const showConfirmPassword = () => {
        setConfirmPasswordVisibility(prevValue => !prevValue)
    }

    useEffect(() => {
        if (token) {
            axios.get(`api/auth/verifyToken?token=${token}`)
                .then(res => {
                    setIsTokenVerified(true)
                })
                .catch(err => {
                    window.alert(err.response.data.message)
                    setError(err.response.data.message)
                })
        }
    }, [])

    if (error) {
        return (
            <h1 style={{ textAlign: "center", marginTop: "250px", color: "rgb(25,118,210)" }}>{error}</h1>
        )
    }

    if (!token && !error) {
        return (
            <h1 style={{ textAlign: "center", marginTop: "250px", color: "rgb(25,118,210)" }}>Invalid Token..!</h1>
        )
    }

    const userData = {
        email: email,
        newPassword: text.newPassword,
        confirmNewPassword: text.confirmNewPassword,
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/auth/resetpassword', userData)
            .then(res => {
                window.alert(res.data.message)
            })
            .catch(err => {
                window.alert(err.response.data.message)
            })
    }
    return (
        <>
            <CssBaseline></CssBaseline>
            <div>
                {
                    isTokenVerified ?
                        <>
                            <Box component="form" sx={{ textAlign: "center" }} onSubmit={handleSubmit}>
                                <Typography variant="h3" color={"white"} backgroundColor="rgb(25,118,210)" marginTop={5}>Reset Password Here</Typography>

                                <FormControl fullWidth sx={{
                                    m: 1, width: "50ch", display: "flex", marginLeft: "auto",
                                    marginRight: "auto",
                                }} variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                    <OutlinedInput id="outlined-adornment-password" name="newPassword" value={text.newPassword} type={passwordVisibility ? "password" : "text"}
                                        onChange={handleChange} required endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={showPassword}
                                                    edge="end"
                                                >
                                                    {passwordVisibility ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password"
                                    />
                                </FormControl>

                                <FormControl sx={{ width: "50ch" }} variant="outlined" >
                                    <InputLabel htmlFor="confirmNewPassword" >Confirm Password</InputLabel>
                                    <OutlinedInput id="confirmNewPassword" name="confirmNewPassword" value={text.confirmNewPassword} type={confirmPasswordVisibility ? "password" : "text"}
                                        onChange={handleChange} required endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle confirmNewPassword visibility"
                                                    onClick={showConfirmPassword}
                                                    edge="end"
                                                >
                                                    {confirmPasswordVisibility ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Confirm password"
                                    />
                                </FormControl>

                                <Button variant="contained" type="submit" sx={{
                                    m: 5,
                                    display: "flex",
                                    width: "57ch",
                                    height: "7ch",
                                    marginLeft: "auto",
                                    marginRight: "auto",
                                    marginTop: "20px",
                                }}
                                >Reset password</Button>
                            </Box>

                            <div className="forgotLinkBox">
                                <Typography variant="subtitle2">Login from <Link to='/login'> here</Link></Typography>
                            </div>
                        </>
                        :
                        <>
                            <h1 style={{ textAlign: "center", marginTop: "50px", color: "rgb(25,118,210)" }}>Your token is verifying, please wait..!</h1>
                        </>
                }
            </div>
        </>
    );
}
export default ResetPasswordPage;
