import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, ListSubheader } from "@mui/material"
import {  AccountCircleOutlined, CategoryOutlined, ConfirmationNumberOutlined, LoginOutlined, VpnKeyOutlined } from "@mui/icons-material"
import { AuthContext, UiContext } from "../../../context";


export const SideMenu = () => {

    const navigate = useNavigate();
    const { isMenuOpen, toggleSideMenu } = useContext( UiContext );
    const { user, isLoggedIn, logout } = useContext(  AuthContext );



    const navigateTo = ( url: string ) => {
        toggleSideMenu();
          navigate(url);

    //router.push(url);
    }


  return (
    <Drawer
        open={ isMenuOpen }
        anchor='right'
        sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
        onClose={ toggleSideMenu }
    >
        <Box sx={{ width: 250, paddingTop: 5 }}>
            
            <List>

                {/* <ListItem>
                    <Input
                        autoFocus
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' ? onSearchTerm(): null }
                        type='text'
                        placeholder="Buscar..."
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                onClick={ onSearchTerm }
                                >
                                 <SearchOutlined />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </ListItem> */}


                {
                    // (isLoggedIn && (localStorage.getItem('modulo') === "ecom")) && (
                    (isLoggedIn && (user!.role === "client")) && (
                        <>

                <ListItem button>
                    <ListItemIcon>
                        <AccountCircleOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Perfil'} />
                </ListItem>

                <ListItem button 
                onClick={ () => navigateTo('/orders/history') }
                >
                    <ListItemIcon>
                        <ConfirmationNumberOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Mis Ordenes'} />
                </ListItem>
                </>
                    )
                }


                {/* <ListItem 
                    button 
                    sx={{ display: { xs: '', sm: 'none' } }} 
                    onClick={ () => navigateTo('/category/men') }
                >
                    <ListItemIcon>
                        <MaleOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Hombres'} />
                </ListItem>

                <ListItem 
                    button 
                    sx={{ display: { xs: '', sm: 'none' } }} 
                    onClick={ () => navigateTo('/category/women') }
                >                    <ListItemIcon>
                        <FemaleOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Mujeres'} />
                </ListItem>
                <ListItem 
                    button 
                    sx={{ display: { xs: '', sm: 'none' } }} 
                    onClick={ () => navigateTo('/category/kid') }
                >
                    <ListItemIcon>
                        <EscalatorWarningOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Niños'} />
                </ListItem> */}

                {
                    isLoggedIn 
                    ? (
                        <ListItem button onClick={ logout }>
                        <ListItemIcon>
                            <LoginOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Log Out'} />
                    </ListItem>
                       )
                       : (
                <>
                {
                (localStorage.getItem('modulo') === "ecom") &&
                <ListItem 
                button
                onClick={ () => navigateTo(`/auth/login`) }
            >
                    <ListItemIcon>
                        <VpnKeyOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Ingresar'} />
                </ListItem>
                }

                <ListItem 
                button
                onClick={ () => navigateTo(`/auth/loginadm`) }
            >
                    <ListItemIcon>
                        <VpnKeyOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Log In (Admin)'} />
                </ListItem>

                </>   

                 )
                       }

                {/* Admin */}
                {
                    (user?.role === 'admin' || user?.role === 'user') && (
                        <>

                <Divider />
                <ListSubheader>Admin Panel</ListSubheader>

                <ListItem button
                onClick={ () => navigateTo('/factura') }>
                    <ListItemIcon>
                        <CategoryOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Comercio'} />
                </ListItem>


                <ListItem button
                onClick={ () => navigateTo('/escribania') }>
                    <ListItemIcon>
                        <CategoryOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Escribania'} />
                </ListItem>

                {/* <ListItem 
                                button
                                onClick={ () => navigateTo('/admin/') }>
                                <ListItemIcon>
                                    <DashboardOutlined />
                                </ListItemIcon>
                                <ListItemText primary={'Dashboard'} />
                            </ListItem>


                <ListItem button
                onClick={ () => navigateTo('/admin/products') }>
                    <ListItemIcon>
                        <CategoryOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Productos'} />
                </ListItem>
                <ListItem 
                    button
                    onClick={ () => navigateTo('/admin/orders') }>
                    <ListItemIcon>
                        <ConfirmationNumberOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Ordenes'} />
                </ListItem>

                <ListItem 
                    button
                    onClick={ () => navigateTo('/admin/users') }>
                    <ListItemIcon>
                        <AdminPanelSettings/>
                    </ListItemIcon>
                    <ListItemText primary={'Usuarios'} />
                </ListItem> */}
                </>
                    )
                }
            </List>
        </Box>
    </Drawer>
  )
}