import React from "react";
import {
  Button,
  CssBaseline,
  FormControl,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import { useState } from "react";
import axios from "axios";

const ForgotPasswordPage = () => {

  const [text, setText] = useState({
    email: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.email) {
      window.alert("Email field is empty")
      return;
    }

    axios.post('/api/auth/forgotpassword', { email: text.email })
      .then(res => {
        window.alert(res.data.message)
        setText({
          email: ""
        })
      })
      .catch(err => {
        window.alert(err.response.data.message)
      })
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setText((prevVal) => {
      return { ...prevVal, [name]: value };
    });
  };

  return (
    <>
      <CssBaseline></CssBaseline>
      <div>
        <Box component="form" sx={{ textAlign: "center" }} onSubmit={handleSubmit} >
          <Typography variant="h3" color={"white"} backgroundColor="rgb(25,118,210)" marginTop={5}>Forgot Password</Typography>

          <FormControl fullWidth sx={{
            m: 2, display: "flex", width: "50ch", marginLeft: "auto",
            marginRight: "auto",
            marginTop: "20px",
          }} variant="outlined">
            <InputLabel htmlFor="email">Email*</InputLabel>
            <OutlinedInput id="email" type="email" label="email" name="email" value={text.email} onChange={handleChange} required />
          </FormControl>

          <Button variant="contained" type="submit" sx={{
            m: 1,
            display: "flex",
            width: "57ch",
            height: "7ch",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "20px",
          }}
          >Send e-mail</Button>
        </Box>
      </div>
    </>
  );
};

export default ForgotPasswordPage;
