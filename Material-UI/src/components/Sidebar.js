import { withStyles } from '@mui/styles';
// import { makeStyles, withStyles } from '@mui/styles';
import React from 'react'


//                                                          using makeStyles

// const useStyles = makeStyles({
//     sideMenu:{
//         display:"flex",
//         flexDirection:"column",
//         position:"absolute",
//         left:"0px",
//         width:"320px",
//         height:"100%",
//         backgroundColor:"#253053"
//     }
// })

// const Sidebar = () => {
//     const classes = useStyles()
//     console.log(classes);
//   return (
//     <div className={classes.sideMenu}>
//       {/* ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc */}
//     </div>
//   )
// }

// export default Sidebar

//                                                          using withStyles

const useStyles = {
    sideMenu:{
        display:"flex",
        flexDirection:"column",
        position:"absolute",
        top:"0px",
        left:"0px",
        width:"20%",
        height:"100%",
        backgroundColor:"#253053"
    }
}

const sideMenu = (props) => {
    const {classes} = props
  return (
    <div className={classes.sideMenu}>
    </div>
  )
}

export default withStyles(useStyles)(sideMenu);

/*

withStyles(useStyles)(sideMenu)  is a high order function where withStyles(useStyles) is one function which returns a function
for which sideMenu is parameter

*/
