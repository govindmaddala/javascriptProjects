import { makeStyles } from '@mui/styles'
import React from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const useStyles = makeStyles({
    appMain:{
        paddingLeft:"20%",
        width:"80%",
        top:"0"
    }
})

const App = () => {
    const classes = useStyles()
    return (
        <>
        <Sidebar></Sidebar>
        <div className={classes.appMain}>
            <Header></Header>
        </div>
        </>
    )
}

export default App
