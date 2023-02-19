import { AppBar, Badge, Grid, IconButton, InputBase, Toolbar } from '@mui/material'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
import PersonIcon from '@mui/icons-material/Person';
// import { makeStyles } from '@mui/styles'
import React from 'react'



const Header = () => {

    return (
        <div>
            <AppBar position='static' className='appbar'>
                <Toolbar>
                    <Grid container>
                        <Grid item >
                            <InputBase />
                        </Grid>
                        <Grid item sm xs>
                            <InputBase />
                        </Grid>
                        <Grid item>
                            <IconButton>
                                <Badge badgeContent={4} color={"secondary"}>
                                    <NotificationsNoneIcon></NotificationsNoneIcon>
                                </Badge>
                            </IconButton>
                            <IconButton>
                                <Badge badgeContent={3} color={"primary"}>
                                    <MarkUnreadChatAltIcon />
                                </Badge>
                            </IconButton>
                            <IconButton>
                                <PersonIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header
