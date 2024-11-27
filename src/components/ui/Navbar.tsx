import { useContext, useState } from 'react';
import { NavLink } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { AppBar, Badge, Box, Button, IconButton, Link, Toolbar, Typography } from '@mui/material';
import { SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';
import { CartContext, UiContext } from '../../../context';

export const Navbar = () => {


    const  {pathname} = useLocation();
  
    const { toggleSideMenu } = useContext( UiContext );
    const { numberOfItems } = useContext( CartContext );


  return (

<AppBar>
        <Toolbar>
            <NavLink to="/" >
                    <Typography variant='h6'>Teslo |</Typography>
                    <Typography sx={{ ml: 0.5 }}>Shop</Typography>
            </NavLink>

            <Box flex={ 1 } />

            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <NavLink to='/category/men' >
                <Button color={ pathname === '/category/men' ? 'primary':'info'}>Hombres</Button>
                </NavLink>
                <NavLink to='/category/women' >
                <Button color={ pathname === '/category/women' ? 'primary':'info'}>Mujeres</Button>
                </NavLink>
                <NavLink to='/category/kid' >
                <Button color={ pathname === '/category/kid' ? 'primary':'info'}>Niños</Button>
                </NavLink>
            </Box>


            <Box flex={ 1 } />

            <IconButton>
                <SearchOutlined />
            </IconButton>

            <NavLink to="/cart" >
                    <IconButton>
                        <Badge badgeContent={ numberOfItems } color="secondary">
                            <ShoppingCartOutlined />
                        </Badge>
                    </IconButton>
            </NavLink>


            <Button onClick={ toggleSideMenu }>
                Menú
            </Button>

        </Toolbar>
    </AppBar>
  )
}
