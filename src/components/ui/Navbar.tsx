import { useContext } from 'react';
// import {  NavLink } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { Link as MuiLink } from '@mui/material';

import { AppBar,  Box, Button, Toolbar, Typography } from '@mui/material';
// import { AppBar, Badge, Box, Button, IconButton, Link, Toolbar, Typography } from '@mui/material';
import {  UiContext } from '../../../context';

export const Navbar = () => {

        // const { asPath, push } = useRouter();
        const { toggleSideMenu } = useContext( UiContext );


  return (

<AppBar>
        <Toolbar>
            {/* <NavLink to="/admin/entradas" >
                    <Typography variant='h6'>Escribania</Typography>
                    <Typography sx={{ ml: 0.5 }}>Shop</Typography>
            </NavLink> */}
            <MuiLink component={RouterLink} to="/admin/entradas" underline="none">
                <Typography variant="h6">Escribania</Typography>
            </MuiLink>
            <Box flex={ 1 } />

            {/* <Box sx={{ display: isSearchVisible ? 'none' : { xs: 'none', sm: 'block' } }}
                    className="fadeIn">
                <NavLink to='/category/men' >
                <Button color={ pathname === '/category/men' ? 'primary':'info'}>Hombres</Button>
                </NavLink>
                <NavLink to='/category/women' >
                <Button color={ pathname === '/category/women' ? 'primary':'info'}>Mujeres</Button>
                </NavLink>
                <NavLink to='/category/kid' >
                <Button color={ pathname === '/category/kid' ? 'primary':'info'}>Niños</Button>
                </NavLink>
            </Box> */}


            <Box flex={ 1 } />
                
                

                {/* Pantallas pantallas grandes */}
                {/* {
                    isSearchVisible 
                        ? (
                            <Input
                                sx={{ display: { xs: 'none', sm: 'flex' } }}
                                className='fadeIn'
                                autoFocus
                                value={ searchTerm }
                                onChange={ (e) => setSearchTerm( e.target.value ) }
                                onKeyPress={ (e) => e.key === 'Enter' ? onSearchTerm() : null }
                                type='text'
                                placeholder="Buscar..."
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={ () => setIsSearchVisible(false) }
                                        >
                                            <ClearOutlined />
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        )
                    : 
                    (
                        <IconButton 
                            onClick={ () => setIsSearchVisible(true) }
                            className="fadeIn"
                            sx={{ display: { xs: 'none', sm: 'flex' } }}
                        >
                            <SearchOutlined />
                        </IconButton>
                    )
                } */}


                {/* Pantallas pequeñas */}
                {/* <IconButton
                    sx={{ display: { xs: 'flex', sm: 'none' } }}
                    onClick={ toggleSideMenu }
                >
                    <SearchOutlined />
                </IconButton> */}


            {/* <NavLink to="/cart" >
                    <IconButton>
                        <Badge badgeContent={ numberOfItems } color="secondary">
                            <ShoppingCartOutlined />
                        </Badge>
                    </IconButton>
            </NavLink> */}


            <Button onClick={ toggleSideMenu }>
                Menú
            </Button>

        </Toolbar>
    </AppBar>
  )
}
