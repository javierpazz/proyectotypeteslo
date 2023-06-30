// import NextLink from 'next/link';
import { NavLink } from "react-router-dom";
import { AppBar, Badge, Box, Button, IconButton, Link, Toolbar, Typography } from '@mui/material';
import { SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';

export const Navbar = () => {
  return (
    <AppBar>
        <Toolbar>
            <NavLink to="/" >
                    <Typography variant='h6'>Teslo |</Typography>
                    {/* <Typography sx={{ ml: 0.5 }}>Shop</Typography> */}
            </NavLink>

            <Box flex={ 1 } />

            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <NavLink to='/category/men' >
                        <Button>Hombres</Button>
                </NavLink>
                <NavLink to='/category/women' >
                        <Button>Mujeres</Button>
                </NavLink>
                <NavLink to='/category/kid' >
                        <Button>Niños</Button>
                </NavLink>
            </Box>


            <Box flex={ 1 } />

            <IconButton>
                <SearchOutlined />
            </IconButton>

            <NavLink to="/cart" >
                    <IconButton>
                        <Badge badgeContent={ 2 } color="secondary">
                            <ShoppingCartOutlined />
                        </Badge>
                    </IconButton>
            </NavLink>


            <Button>
                Menú
            </Button>

        </Toolbar>
    </AppBar>
  )
}
