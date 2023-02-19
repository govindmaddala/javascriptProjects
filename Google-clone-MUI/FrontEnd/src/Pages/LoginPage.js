import React from "react";
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
// import { blue } from "@mui/material/colors";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";

const LoginPage = ({ setUser, setIsLoggedIn }) => {
  const [text, setText] = useState({
    email: "",
    password: "",
  });

  const [passwordVisibility, setPasswordVisibility] = useState(true)
  const showPassword = () => {
    setPasswordVisibility(prevValue => !prevValue)
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setText((prevVal) => {
      return { ...prevVal, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    const userData = {
      email: text.email,
      password: text.password
    }
    axios.post('/api/auth/login', userData)
      .then(res => {
        const token = res.data.token;
        localStorage.setItem("Auth_Token", JSON.stringify(token))
        const decodedToken = jwt_decode(token);
        setUser(decodedToken)
        setIsLoggedIn(true)
        setText({
          email: "",
          password: ""
        })
        return window.alert(res.data.message)
      })
      .catch(err => window.alert(err.response.data.message))
  }

  return (
    <>
      <CssBaseline></CssBaseline>
      <div>
        <Box component="form" sx={{ textAlign: "center" }} onSubmit={handleSubmit} >
          <Typography variant="h3" color={"white"} backgroundColor="rgb(25,118,210)" marginTop={5}>Login Here</Typography>

          <FormControl fullWidth sx={{
            m: 5, display: "flex", width: "50ch", marginLeft: "auto",
            marginRight: "auto",
            marginTop: "20px",
          }} variant="outlined">
            <InputLabel htmlFor="email">Email</InputLabel>
            <OutlinedInput id="email" type="email" label="email" name="email" value={text.email} onChange={handleChange} required />
          </FormControl>

          <FormControl sx={{ width: "50ch" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
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
          <Button variant="contained" type="submit" sx={{
            m: 2,
            display: "flex",
            width: "57ch",
            height: "7ch",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "20px",
          }}
          >Login</Button>
        </Box>
        <div className="forgotLinkBox">
          <Typography variant="subtitle2">Are you not our memeber ? <Link to='/register'> Register here</Link></Typography>
          <Typography variant="subtitle2"><Link to='/forgotpassword' >Forgot Password ?</Link></Typography>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
