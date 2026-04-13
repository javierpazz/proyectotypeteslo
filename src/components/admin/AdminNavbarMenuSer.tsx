import { MouseEvent, useContext, useState } from 'react';
import { AppBar, Toolbar, Button, Menu, MenuItem} from '@mui/material';
import { Link } from 'react-router-dom';
import { AuthContext, UiContext } from '../../../context';
import foto from '../../assets/fondoser.jpg';

export const AdminNavbarMenuSer = () => {

    const { toggleSideMenu } = useContext( UiContext );

  const [anchorElServicio, setAnchorElServicio] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [anchorElAdmin, setAnchorElAdmin] = useState<null | HTMLElement>(null);
  const [anchorElConfiSer, setAnchorElConfiSer] = useState<null | HTMLElement>(null);

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
                {
                (localStorage.getItem('modulo') === "invo") ?
                  'Punto Venta.: '
                  : (localStorage.getItem('modulo') === "serv") ?
                    'Punto Venta.: '
                  : 'Registro.: '
                }
                {/* Punto Venta.:{(localStorage.getItem('puntonum')) || ""}{(localStorage.getItem('nameCon')) || ""} */}
                {(localStorage.getItem('puntonum')) || ""}{(localStorage.getItem('nameCon')) || ""}
              </MenuItem>


              )}
            </Button>
        <Menu
          anchorEl={anchorElServicio}
          open={Boolean(anchorElServicio)}
          onClose={handleClose(setAnchorElServicio)}
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
          onClick={handleOpen(setAnchorElServicio)}
        >
          Ordenes Trabajo
        </Button>
        <Menu
          anchorEl={anchorElServicio}
          open={Boolean(anchorElServicio)}
          onClose={handleClose(setAnchorElServicio)}
        >
          <MenuItem component={Link} to="/admin/ordentrabajo" onClick={handleClose(setAnchorElServicio)}>
            Genera Orden Trabajos
          </MenuItem>
          <MenuItem component={Link} to="/admin/ordenestrabajo" onClick={handleClose(setAnchorElServicio)}>
             Ordenes Trabajo para Facturar
          </MenuItem>
        </Menu>

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
          <MenuItem component={Link} to="/admin/filtroser" onClick={handleClose(setAnchorElAdmin)}>
            Informes y Filtros
          </MenuItem>
          <MenuItem component={Link} to="/admin/ordenestrabajo" onClick={handleClose(setAnchorElAdmin)}>
            Ordenes de Trabajo
          </MenuItem>
          <MenuItem component={Link} to="/admin/tareas" onClick={handleClose(setAnchorElAdmin)}>
             Tareas 
          </MenuItem>
          <MenuItem component={Link} to="/admin/dashboardser" onClick={handleClose(setAnchorElAdmin)}>
            Graficos Estado General
          </MenuItem>
          <MenuItem component={Link} to="/admin/dashboardsermaq" onClick={handleClose(setAnchorElAdmin)}>
            Graficos Estado por Maquina
          </MenuItem>
          <MenuItem component={Link} to="/admin/dashboardserpar" onClick={handleClose(setAnchorElAdmin)}>
            Graficos Estado por Parte
          </MenuItem>
          <MenuItem component={Link} to="/admin/dashboardsertra" onClick={handleClose(setAnchorElAdmin)}>
            Graficos Estado por Trabajo
          </MenuItem>
          <MenuItem component={Link} to="/admin/dashboardsertar" onClick={handleClose(setAnchorElAdmin)}>
            Graficos Estado por Tarea
          </MenuItem>
        </Menu>

        {/* configuracion */}
        <Button
          color="primary"
          onClick={handleOpen(setAnchorElConfiSer)}
        >
          Configuracion Ser-
        </Button>
        <Menu
          anchorEl={anchorElConfiSer}
          open={Boolean(anchorElConfiSer)}
         onClose={handleClose(setAnchorElConfiSer)}
          sx={{ maxHeight: 400, overflowY: 'auto' }}
        >
          <MenuItem component={Link} to="/admin/configuracionesser" onClick={handleClose(setAnchorElConfiSer)}>
            Registros
          </MenuItem>
          <MenuItem component={Link} to="/admin/trabajos" onClick={handleClose(setAnchorElServicio)}>
            Trabajos
          </MenuItem>
          <MenuItem component={Link} to="/admin/productsser" onClick={handleClose(setAnchorElConfiSer)}>
            Tareas
          </MenuItem>
          <MenuItem component={Link} to="/admin/paramtrabajo" onClick={handleClose(setAnchorElServicio)}>
            Parametriza Trabajos
          </MenuItem>
          <MenuItem component={Link} to="/admin/customers" onClick={handleClose(setAnchorElConfiSer)}>
            Clientes
          </MenuItem>
          <MenuItem component={Link} to="/admin/partes" onClick={handleClose(setAnchorElConfiSer)}>
            Partes
          </MenuItem>

          <MenuItem component={Link} to="/admin/maquinas" onClick={handleClose(setAnchorElConfiSer)}>
            Maquinas
          </MenuItem>
          <MenuItem component={Link} to="/admin/encargados" onClick={handleClose(setAnchorElConfiSer)}>
            Encargados
          </MenuItem>
          <MenuItem component={Link} to="/admin/users" onClick={handleClose(setAnchorElConfiSer)}>
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
