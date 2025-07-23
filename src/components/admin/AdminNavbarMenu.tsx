import { MouseEvent, useContext, useState } from 'react';
import { AppBar, Toolbar, Button, Menu, MenuItem} from '@mui/material';
import { Link } from 'react-router-dom';
import { AuthContext, UiContext } from '../../../context';

// export default function AdminNavBar() {
export const AdminNavbarMenu = () => {

    const { toggleSideMenu } = useContext( UiContext );

    // Estados para cada menú desplegable
  const [anchorElEscri, setAnchorElEscri] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [anchorElSales, setAnchorElSales] = useState<null | HTMLElement>(null);
  const [anchorElBuys, setAnchorElBuys] = useState<null | HTMLElement>(null);
  const [anchorElCash, setAnchorElCash] = useState<null | HTMLElement>(null);
  const [anchorElStocks, setAnchorElStocks] = useState<null | HTMLElement>(null);
  const [anchorElAdmin, setAnchorElAdmin] = useState<null | HTMLElement>(null);
  const [anchorElConfi, setAnchorElConfi] = useState<null | HTMLElement>(null);
  const [anchorElConfiEsc, setAnchorElConfiEsc] = useState<null | HTMLElement>(null);

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
    <AppBar position="static" color="primary">
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
          {/* <MenuItem component={Link} to="/admin/configuracionesesc" onClick={handleClose(setAnchorElConfi)}>
            Registros
          </MenuItem>
          <MenuItem component={Link} to="/admin/instrumentos" onClick={handleClose(setAnchorElEscri)}>
            Instrumentos
          </MenuItem>
          <MenuItem component={Link} to="/admin/productsesc" onClick={handleClose(setAnchorElConfi)}>
            Diligencias
          </MenuItem>
          <MenuItem component={Link} to="/admin/paraminstrumento" onClick={handleClose(setAnchorElEscri)}>
            Parametriza Instrumentos
          </MenuItem>
          <MenuItem component={Link} to="/admin/partes" onClick={handleClose(setAnchorElConfi)}>
            Partes
          </MenuItem> */}
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

        {/* Ventas */}
        <Button
          color="primary"
          onClick={handleOpen(setAnchorElSales)}
        >
          Ventas
        </Button>
        <Menu
          anchorEl={anchorElSales}
          open={Boolean(anchorElSales)}
          onClose={handleClose(setAnchorElSales)}
        >
          <MenuItem component={Link} to="/admin/invoicer" onClick={handleClose(setAnchorElSales)}>
            Comprobantes de Venta
          </MenuItem>
          <MenuItem component={Link} to="/admin/invoicerRec" onClick={handleClose(setAnchorElSales)}>
            Recibos
          </MenuItem>
          <MenuItem component={Link} to="/admin/remiter" onClick={handleClose(setAnchorElSales)}>
            Remitos de Ventas
          </MenuItem>
            <MenuItem component={Link} to="/admin/infocust" onClick={handleClose(setAnchorElSales)}>
              Informes
            </MenuItem>
        </Menu>

        {/* Compras */}
        <Button
          color="primary"
          onClick={handleOpen(setAnchorElBuys)}
        >
          Compras
        </Button>
        <Menu
          anchorEl={anchorElBuys}
          open={Boolean(anchorElBuys)}
          onClose={handleClose(setAnchorElBuys)}
        >
          <MenuItem component={Link} to="/admin/invoicerBuy" onClick={handleClose(setAnchorElBuys)}>
            Comprobantes de Compra
          </MenuItem>
          <MenuItem component={Link} to="/admin/invoicerBuyRec" onClick={handleClose(setAnchorElBuys)}>
            Ordenes de Pago
          </MenuItem>
          <MenuItem component={Link} to="/admin/remiterBuy" onClick={handleClose(setAnchorElBuys)}>
            Remitos de Compras
          </MenuItem>
            <MenuItem component={Link} to="/admin/infosupp" onClick={handleClose(setAnchorElBuys)}>
              Informes
            </MenuItem>
        </Menu>

        {/* Caja */}
        <Button
          color="primary"
          onClick={handleOpen(setAnchorElCash)}
        >
          Caja
        </Button>
        <Menu
          anchorEl={anchorElCash}
          open={Boolean(anchorElCash)}
          onClose={handleClose(setAnchorElCash)}
        >
          <MenuItem component={Link} to="/admin/invoicerCajIng" onClick={handleClose(setAnchorElCash)}>
            Ingresos de Caja
          </MenuItem>
          <MenuItem component={Link} to="/admin/invoicerCajEgr" onClick={handleClose(setAnchorElCash)}>
            Retiros de Caja
          </MenuItem>
          <MenuItem component={Link} to="/admin/invoicesCajIngEgr" onClick={handleClose(setAnchorElCash)}>
            Consulta Caja
          </MenuItem>
            <MenuItem component={Link} to="/admin/infosupp" onClick={handleClose(setAnchorElCash)}>
              Informes
            </MenuItem>
        </Menu>

        {/* Stocks Ptos Venta */}
        <Button
          color="primary"
          onClick={handleOpen(setAnchorElStocks)}
        >
          Stocks Ptos Venta
        </Button>
        <Menu
          anchorEl={anchorElStocks}
          open={Boolean(anchorElStocks)}
          onClose={handleClose(setAnchorElStocks)}
        >
          <MenuItem component={Link} to="/admin/remiterpv" onClick={handleClose(setAnchorElStocks)}>
            Entregas a Punto Venta
          </MenuItem>
          <MenuItem component={Link} to="/admin/remiterBuypv" onClick={handleClose(setAnchorElStocks)}>
            Recepcion desde Punto de Venta
          </MenuItem>
            <MenuItem component={Link} to="/admin/infosupp" onClick={handleClose(setAnchorElStocks)}>
              Informes
            </MenuItem>
        </Menu> 

        {/* Admin */}
        <Button
          color="primary"
          onClick={handleOpen(setAnchorElAdmin)}
        >
          Admin
        </Button>
        <Menu
          anchorEl={anchorElAdmin}
          open={Boolean(anchorElAdmin)}
          onClose={handleClose(setAnchorElAdmin)}
          sx={{ maxHeight: 400, overflowY: 'auto' }}
        >
          <MenuItem component={Link} to="/admin/dashboard" onClick={handleClose(setAnchorElAdmin)}>
            Dashboard
          </MenuItem>
          <MenuItem component={Link} to="/admin/remits" onClick={handleClose(setAnchorElAdmin)}>
            Remitos de Venta
          </MenuItem>
          <MenuItem component={Link} to="/admin/invoices" onClick={handleClose(setAnchorElAdmin)}>
            Comprobantes de Ventas
          </MenuItem>
          <MenuItem component={Link} to="/admin/invoicesRec" onClick={handleClose(setAnchorElAdmin)}>
            Recibos
          </MenuItem>
          <MenuItem component={Link} to="/admin/remitsBuy" onClick={handleClose(setAnchorElAdmin)}>
            Remitos de Compra
          </MenuItem>
          <MenuItem component={Link} to="/admin/invoicesBuy" onClick={handleClose(setAnchorElAdmin)}>
            Comprobantes de Compras
          </MenuItem>
          <MenuItem component={Link} to="/admin/invoicesBuyRec" onClick={handleClose(setAnchorElAdmin)}>
            Ordenes de Pago
          </MenuItem>
          <MenuItem component={Link} to="/admin/invoicesCajIng" onClick={handleClose(setAnchorElAdmin)}>
            Ingresos de Caja
          </MenuItem>
          <MenuItem component={Link} to="/admin/invoicesCajEgr" onClick={handleClose(setAnchorElAdmin)}>
            Retiros de Caja
          </MenuItem>
          <MenuItem component={Link} to="/admin/remitspv" onClick={handleClose(setAnchorElAdmin)}>
            Entregas a Pto Vta
          </MenuItem>
          <MenuItem component={Link} to="/admin/remitsBuypv" onClick={handleClose(setAnchorElAdmin)}>
            Recepcion desde Pto Vta
          </MenuItem>
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
          <MenuItem component={Link} to="/admin/filtrocrm" onClick={handleClose(setAnchorElConfi)}>
            Informes y Filtros
          </MenuItem>
          <MenuItem component={Link} to="/admin/productsfac" onClick={handleClose(setAnchorElConfi)}>
            Productos
          </MenuItem>
          <MenuItem component={Link} to="/admin/customers" onClick={handleClose(setAnchorElConfi)}>
            Clientes
          </MenuItem>
          <MenuItem component={Link} to="/admin/proveedores" onClick={handleClose(setAnchorElConfi)}>
            Proveedores
          </MenuItem>
          <MenuItem component={Link} to="/admin/valores" onClick={handleClose(setAnchorElConfi)}>
            Valores
          </MenuItem>
          <MenuItem component={Link} to="/admin/comprobantes" onClick={handleClose(setAnchorElEscri)}>
            Comprobantes
          </MenuItem>
          <MenuItem component={Link} to="/admin/configuraciones" onClick={handleClose(setAnchorElConfi)}>
            Puntos de Venta
          </MenuItem>
          <MenuItem component={Link} to="/admin/encargados" onClick={handleClose(setAnchorElConfi)}>
            Encargados
          </MenuItem>
          <MenuItem component={Link} to="/admin/users" onClick={handleClose(setAnchorElConfi)}>
            Usuarios
          </MenuItem>
          <MenuItem component={Link} to="/admin/profile" onClick={handleClose(setAnchorElConfi)}>
            Perfil Usuario
          </MenuItem>
          <MenuItem component={Link} to="/admin/estadosorden" onClick={handleClose(setAnchorElConfi)}>
            Estados de Ordenes
          </MenuItem>
          <MenuItem component={Link} to="/admin/support" onClick={handleClose(setAnchorElConfi)}>
            Chat Soporte
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
