import { MouseEvent, useContext, useState } from 'react';
import { AppBar, Toolbar, Button, Menu, MenuItem} from '@mui/material';
import { Link } from 'react-router-dom';
import { AuthContext, UiContext } from '../../../context';
import foto from '../../assets/fondocrm.jpg';

// export default function AdminNavBar() {
export const AdminNavbarMenuEco = () => {

    const { toggleSideMenu } = useContext( UiContext );

    // Estados para cada menú desplegable
  // const [anchorElEscri, setAnchorElEscri] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [anchorElAdmin, setAnchorElAdmin] = useState<null | HTMLElement>(null);
  const [anchorElConfi, setAnchorElConfi] = useState<null | HTMLElement>(null);
  // const [anchorElConfiEsc, setAnchorElConfiEsc] = useState<null | HTMLElement>(null);

  // // Funciones para abrir menú
  // const handleOpen = (setter) => (event) => setter(event.currentTarget);
  // // Funciones para cerrar menú
  // const handleClose = (setter) => () => setter(null);
  const handleOpen =
    (setter: React.Dispatch<React.SetStateAction<HTMLElement | null>>) =>
    (event: MouseEvent<HTMLElement>) =>
      setter(event.currentTarget);
  const handleClose =
    (setter: React.Dispatch<React.SetStateAction<HTMLElement | null>>) =>
    () =>
      setter(null);

////////////////////FGFGFGFG
const { user} = useContext(  AuthContext );      
////////////////////FGFGFGFG

// TODO


  return (
    <AppBar position="static" color="primary"
                             style={{
                        backgroundImage: `url(${foto})`,
                        // backgroundColor: '#dedbdbff', // gris
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundAttachment: 'fixed',
                        // minHeight: '100vh',
                        }}

    >
      {/* <Toolbar sx={{ justifyContent: 'flex-end' }}> */}
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Usuario cliente */}
          <div style={{ display: 'flex' }}>

            <Button
              color="primary"
              onClick={handleOpen(setAnchorElUser)}
            >
              {(user && user.name && user.role !== "client") && (

              <MenuItem component={Link} to="/salepoint" onClick={handleClose(setAnchorElUser)}>
                Punto Venta.:{(localStorage.getItem('puntonum')) || ""}{(localStorage.getItem('nameCon')) || ""}
              </MenuItem>


              )}
            </Button>
        <Menu
          anchorEl={anchorElUser}
          open={Boolean(anchorElUser)}
          onClose={handleClose(setAnchorElUser)}
        >
        </Menu>

            <Button
              color="primary"
              onClick={handleOpen(setAnchorElUser)}
            > Usuario - 
              { (user && user.name && user.role !== "client") && (
                 user.name 
              )}
            </Button>
            <Menu 
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleClose(setAnchorElUser)}
            >
              {/* <MenuItem component={Link} to="/profile" onClick={handleClose(setAnchorElUser)}>
                Perfil Usuario
              </MenuItem>
              <MenuItem component={Link} to="/invoicehistory" onClick={handleClose(setAnchorElUser)}>
                Mis Comprobantes
              </MenuItem>
              <MenuItem component={Link} to="/orderhistory" onClick={handleClose(setAnchorElUser)}>
                Mis Ordenes
              </MenuItem>
              <MenuItem divider /> */}
              {/* <MenuItem onClick={() => { handleClose(setAnchorElUser)(); signoutHandler(); }}>
                Log Out
              </MenuItem> */}
            </Menu>
          </div>

        <div style={{ display: 'flex' }}>
        {/* Ventas */}
        {/* <Button
          color="primary"
          onClick={handleOpen(setAnchorElEscri)}
        >
          Escribania
        </Button>
        <Menu
          anchorEl={anchorElEscri}
          open={Boolean(anchorElEscri)}
          onClose={handleClose(setAnchorElEscri)}
        >
          <MenuItem component={Link} to="/admin/mesaentrada" onClick={handleClose(setAnchorElEscri)}>
            Mesa de Entrada
          </MenuItem>
          <MenuItem component={Link} to="/admin/entradas" onClick={handleClose(setAnchorElEscri)}>
            Consulta Entradas
          </MenuItem>
          <MenuItem component={Link} to="/admin/diligencias" onClick={handleClose(setAnchorElEscri)}>
             Consulta Diligencias 
          </MenuItem>
          <MenuItem component={Link} to="/admin/entradas" onClick={handleClose(setAnchorElEscri)}>
             Entradas sin Facturar (Sin Hacer)
          </MenuItem>
        </Menu> */}


        {/* Consultas */}
        <Button
          color="primary"
          onClick={handleOpen(setAnchorElAdmin)}
        >
          Consultas
        </Button>
        <Menu
          anchorEl={anchorElAdmin}
          open={Boolean(anchorElAdmin)}
          onClose={handleClose(setAnchorElAdmin)}
          sx={{ maxHeight: 400, overflowY: 'auto' }}
        >
          <MenuItem component={Link} to="/admin/orders" onClick={handleClose(setAnchorElAdmin)}>
            Ordenes E-commerce
          </MenuItem>
        </Menu>

        {/* configuracion */}
        <Button
          color="primary"
          onClick={handleOpen(setAnchorElConfi)}
        >
          Configuracion
        </Button>
        <Menu
          anchorEl={anchorElConfi}
          open={Boolean(anchorElConfi)}
         onClose={handleClose(setAnchorElConfi)}
          sx={{ maxHeight: 400, overflowY: 'auto' }}
        >
          <MenuItem component={Link} to="/admin/products" onClick={handleClose(setAnchorElConfi)}>
            Productos Ecommerce
          </MenuItem>
          <MenuItem component={Link} to="/admin/customers" onClick={handleClose(setAnchorElConfi)}>
            Clientes
          </MenuItem>
          <MenuItem component={Link} to="/admin/configuraciones" onClick={handleClose(setAnchorElConfi)}>
            Puntos de Venta
          </MenuItem>
          <MenuItem component={Link} to="/admin/estadosorden" onClick={handleClose(setAnchorElConfi)}>
            Estados de Ordenes
          </MenuItem>
          <MenuItem component={Link} to="/admin/users" onClick={handleClose(setAnchorElConfi)}>
            Usuarios
          </MenuItem>
          {/* <MenuItem component={Link} to="/admin/profileadm" onClick={handleClose(setAnchorElConfi)}> */}
          {/* <MenuItem  onClick={handleClose(setAnchorElConfi)}>
            Perfil Usuario T
          </MenuItem> */}
          {/* <MenuItem component={Link} to="/admin/support" onClick={handleClose(setAnchorElConfi)}>
            Chat Soporte
          </MenuItem> */}


        </Menu>

        {/* configuracion */}
        {/* <Button
          color="primary"
          onClick={handleOpen(setAnchorElConfiEsc)}
        >
          Configuracion Esc-
        </Button>
        <Menu
          anchorEl={anchorElConfiEsc}
          open={Boolean(anchorElConfiEsc)}
         onClose={handleClose(setAnchorElConfiEsc)}
          sx={{ maxHeight: 400, overflowY: 'auto' }}
        >
          <MenuItem component={Link} to="/admin/filtro" onClick={handleClose(setAnchorElConfiEsc)}>
            Informes y Filtros
          </MenuItem>
          <MenuItem component={Link} to="/admin/configuracionesesc" onClick={handleClose(setAnchorElConfiEsc)}>
            Registros
          </MenuItem>
          <MenuItem component={Link} to="/admin/instrumentos" onClick={handleClose(setAnchorElConfiEsc)}>
            Instrumentos
          </MenuItem>
          <MenuItem component={Link} to="/admin/productsesc" onClick={handleClose(setAnchorElConfiEsc)}>
            Diligencias
          </MenuItem>
          <MenuItem component={Link} to="/admin/paraminstrumento" onClick={handleClose(setAnchorElEscri)}>
            Parametriza Instrumentos
          </MenuItem>
          <MenuItem component={Link} to="/admin/customers" onClick={handleClose(setAnchorElConfiEsc)}>
            Clientes
          </MenuItem>
          <MenuItem component={Link} to="/admin/partes" onClick={handleClose(setAnchorElConfiEsc)}>
            Partes
          </MenuItem>
          <MenuItem component={Link} to="/admin/users" onClick={handleClose(setAnchorElConfiEsc)}>
            Usuarios
          </MenuItem>

        </Menu> */}
                <Button
                    color="primary"
                    onClick={ toggleSideMenu }>
                    Menú
                </Button>

      </div>
      </Toolbar>
      {/* <Toolbar sx={{ justifyContent: 'flex-end' }}>
      </Toolbar> */}
    </AppBar>
  );
}
