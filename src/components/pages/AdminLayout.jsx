import { Close as CloseIcon, Dashboard, ExitToApp, Groups, ManageAccounts, Menu as MenuIcon, Message } from '@mui/icons-material'
import { Box, Drawer, Grid, IconButton, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import axios from 'axios';
import { Navigate, useLocation } from 'react-router-dom'
import { Link } from '../styles/StyledComponents'
import { useDispatch, useSelector } from 'react-redux'
import { server } from '../constants/config'
import toast from 'react-hot-toast';
// import { adminLogout } from '../../redux/thunks/admin'

const adminTabs = [
    {
        name: "Insights with AI",
        path: "/",
        icon: <Dashboard sx={{
            color: '#a1b1ff'
        }} />,
    },
    {
        name: "Add Post Details",
        path: "/post/new",
        icon: <ManageAccounts sx={{
            color: '#a1b1ff'
        }} />,
    },
    {
        name: "Post Details",
        path: "/postDetails",
        icon: <ManageAccounts sx={{
            color: '#a1b1ff'
        }} />,
    },

]

const Sidebar = ({ w = "100%" }) => {
    const location = useLocation();
    const dispatch = useDispatch();

    const logoutHandler = async () => {
        try {
            const response = await axios
                .get(`${server}/api/v1/logout`, {
                    withCredentials: true,
                }).then(({ data }) => {
                    // console.log(data)
                    dispatch(userDoesNotExist());
                    toast.success(data.message);
                })
        } catch (error) {
            console.log(error)
            // toast.error(error.response.message);
        }

    }
    return (
        <Stack width={w} height={'100vh'} alignItems={'center'} direction={"column"} p={"3rem"} spacing={"3rem"} bgcolor={'rgb(9 10 13)'} >
            <Typography variant="h5" color={'#a1b1ff'} textTransform={"uppercase"}>
                Employee Details
            </Typography>
            <Stack spacing={"1rem"} width={'200px'}>
                {adminTabs.map((tab) => (
                    <Link to={tab.path} key={tab.name} style={{ textDecoration: "none", display: 'flex', width: '100%', gap: '10px', justifyContent: 'center' }}
                        sx={
                            location.pathname === tab.path && {
                                borderRadius: '10px',
                                bgcolor: '#5c5b5c57'
                            }
                        }
                    >
                        <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
                            {tab.icon}
                        </Stack>
                        <Typography color={'#a1b1ff'} >{tab.name}</Typography>
                    </Link>

                ))}

                

            </Stack>
        </Stack>
    )
}


const AdminLayout = ({ children }) => {

    const [isMobile, setIsMobile] = useState(false);
    const handleMobile = () => {
        setIsMobile(!isMobile)
    }
    const handleClose = () => {
        setIsMobile(false)
    }
    return (
        <Grid container height={'100vh'} >

            <Box sx={{
                display: { xs: "block", sm: "none", md: "none" },
                position: "fixed",
                right: "1rem",
                top: "1rem",
            }}
            >
                <IconButton onClick={handleMobile} >
                    {
                        isMobile ? <CloseIcon sx={{
                            color: '#a1b1ff'
                        }} /> :
                            <MenuIcon sx={{
                                color: '#a1b1ff'
                            }} />
                    }
                </IconButton>
            </Box>


            <Grid
                item
                width={'30vw'}
                sx={{
                    display: { xs: "none", sm: "block" },
                    width: { sm: '35vw', lg: '25rem' }
                }}

                bgcolor={'rgb(9 10 13)'}
                color={'#a1b1ff'}
                overflow={'auto'}
            >
                <Sidebar />
            </Grid>
            <Grid
                item

                sx={{
                    width: { xs: "100vw", sm: "calc(100vw - 35vw)", lg: 'calc(100vw - 25rem)' },
                }}
                color={'#a1b1ff'}
                borderLeft={'1px solid #202500'}
                borderRight={'1px solid #202500'}
                bgcolor={'rgb(14 16 23)'}
                height={'100vh'}
                overflow={'auto'}
            >
                {children}
            </Grid>

            <Drawer open={isMobile} onClose={handleClose} >
                <Sidebar />
            </Drawer>
        </Grid >

    )
}

export default AdminLayout