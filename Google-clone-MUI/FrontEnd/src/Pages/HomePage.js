import { CssBaseline, Typography } from '@mui/material'
import React from 'react'
import Navbar from './Navbar'

const HomePage = ({ isLoggedIn, user, handleLogoutUser }) => {

  return (
    <div>
      <CssBaseline></CssBaseline>
      <Navbar isLoggedIn={isLoggedIn} user={user} handleLogoutUser={handleLogoutUser} />
      <Typography variant="h3" sx={{ m: 3, textAlign: "center" }}>Welcome Home</Typography>
    </div>
  )
}

export default HomePage
