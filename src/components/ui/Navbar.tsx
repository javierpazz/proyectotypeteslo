import { useContext, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { AppBar, Badge, Box, Button, IconButton, Input, InputAdornment, Toolbar, Typography } from '@mui/material';
// import { AppBar, Badge, Box, Button, IconButton, Link, Toolbar, Typography } from '@mui/material';
import { ClearOutlined, SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';
import { CartContext, UiContext } from '../../../context';

export const Navbar = () => {

    const navigate = useNavigate();

    const  {pathname} = useLocation();
  

        // const { asPath, push } = useRouter();
        const { toggleSideMenu } = useContext( UiContext );
        const { numberOfItems } = useContext( CartContext );

        const [searchTerm, setSearchTerm] = useState('');
        const [isSearchVisible, setIsSearchVisible] = useState(false);


        const onSearchTerm = () => {
        console.log(searchTerm);
            if(searchTerm.trim().length === 0) return;
            navigateTo(`/search/${searchTerm}`);
        }
    
        const navigateTo = ( url: string ) => {
            // toggleSideMenu();
              navigate(url);
    
        //router.push(url);
        }






  return (

<AppBar>
        <Toolbar>
            <NavLink to="/admin/entradas" >
                    <Typography variant='h6'>Escribania</Typography>
                    {/* <Typography sx={{ ml: 0.5 }}>Shop</Typography> */}
            </NavLink>

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
