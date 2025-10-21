import { MouseEvent, useContext, useState } from 'react';
import { AppBar, Toolbar, Button, Menu, MenuItem} from '@mui/material';
import { Link } from 'react-router-dom';
import { AuthContext, UiContext } from '../../../context';
import foto from '../../assets/fondo.jpg';

export const AdminNavbarMenuEsc = () => {

    const { toggleSideMenu } = useContext( UiContext );

  const [anchorElEscri, setAnchorElEscri] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [anchorElConfiEsc, setAnchorElConfiEsc] = useState<null | HTMLElement>(null);

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
                {
                (localStorage.getItem('modulo') === "invo") ?
                  'Punto Venta.: '
                : 'Registro.: '
                }
                {/* Punto Venta.:{(localStorage.getItem('puntonum')) || ""}{(localStorage.getItem('nameCon')) || ""} */}
                {(localStorage.getItem('puntonum')) || ""}{(localStorage.getItem('nameCon')) || ""}
              </MenuItem>


              )}
            </Button>
        <Menu
          anchorEl={anchorElEscri}
          open={Boolean(anchorElEscri)}
          onClose={handleClose(setAnchorElEscri)}
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
            </Menu>
          </div>

        <div style={{ display: 'flex' }}>
        {/* Ventas */}
        <Button
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
        </Menu>


        {/* configuracion */}
        <Button
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
          <MenuItem component={Link} to="/admin/instrumentos" onClick={handleClose(setAnchorElEscri)}>
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

        </Menu>
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
