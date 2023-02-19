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
import axios from 'axios'
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [text, setText] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setText((prevVal) => {
      return { ...prevVal, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    if (text.password === text.confirmpassword) {
      const userData = {
        name: text.name,
        email: text.email,
        password: text.password
      }

      axios.post('/api/auth/register', userData)
        .then(res => {
          setText({
            name: "",
            email: "",
            password: "",
            confirmpassword: "",
          })
          return window.alert(res.data.message)
        })
        .catch(err => window.alert(err.response.data.message))
    } else {
      window.alert("Passwords should be same")
    }
  }

  const [passwordVisibility, setPasswordVisibility] = useState(true)
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(true)
  const showPassword = () => {
    setPasswordVisibility(prevValue => !prevValue)
  }

  const showConfirmPassword = () => {
    setConfirmPasswordVisibility(prevValue => !prevValue)
  }

  return (
    <>
      <CssBaseline></CssBaseline>
      <div>
        <Box component="form" sx={{ textAlign: "center" }} onSubmit={handleSubmit}>
          <Typography variant="h3" color={"white"} backgroundColor="rgb(25,118,210)" marginTop={5}>Register Here</Typography>

          <FormControl fullWidth sx={{
            m: 1, display: "flex", width: "50ch", marginLeft: "auto",
            marginRight: "auto",
            marginTop: "20px",
          }} variant="outlined">
            <InputLabel htmlFor="username">Name*</InputLabel>
            <OutlinedInput id="username" type="text" label="username" name="name" value={text.name} onChange={handleChange} required />
          </FormControl>

          <FormControl fullWidth sx={{
            m: 1, display: "flex", width: "50ch", marginLeft: "auto",
            marginRight: "auto",
            marginTop: "20px",
          }} variant="outlined">
            <InputLabel htmlFor="email">Email*</InputLabel>
            <OutlinedInput id="email" type="email" label="email" name="email" value={text.email} onChange={handleChange} required />
          </FormControl>

          <FormControl fullWidth sx={{
            m: 1, width: "50ch", display: "flex", marginLeft: "auto",
            marginRight: "auto",
          }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password*</InputLabel>
            <OutlinedInput id="outlined-adornment-password" name="password" value={text.password} type={passwordVisibility ? "password" : "text"}
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
            <InputLabel htmlFor="confirmpassword" >Confirm Password*</InputLabel>
            <OutlinedInput id="confirmpassword" name="confirmpassword" value={text.confirmpassword} type={confirmPasswordVisibility ? "password" : "text"}
              onChange={handleChange} required endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle confirmpassword visibility"
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
          >Register</Button>
        </Box>
        <div className="forgotLinkBox">
          <Typography variant="subtitle2">Are you alreay our memeber? <Link to='/login'> login</Link></Typography>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
