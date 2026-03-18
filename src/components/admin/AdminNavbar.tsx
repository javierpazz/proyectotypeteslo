import { useContext } from 'react';
import { NavLink } from "react-router-dom";

import { AppBar, Box, Button, Link, Toolbar, Typography } from '@mui/material';
import foto from '../../assets/fondo.jpg';


import { UiContext } from '../../../context';

export const AdminNavbar = () => {

    const { toggleSideMenu } = useContext( UiContext );
    

    return (
        <>
            <div
                    >

        <AppBar
                                 style={{
                        backgroundImage: `url(${foto})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundAttachment: 'fixed',
                        // minHeight: '100vh',
                        }}
>
            <Toolbar>
                <NavLink to="/">
                    <Link display='flex' alignItems='center'>
                        <Typography variant='h6'>Teslo |</Typography>
                        <Typography sx={{ ml: 0.5 }}>Shop</Typography>
                    </Link>  
                </NavLink>

                <Box flex={ 1 } />

                <Button onClick={ toggleSideMenu }>
                    Menú
                </Button>

            </Toolbar>
        </AppBar>
            </div> 
        </>
    )
}
