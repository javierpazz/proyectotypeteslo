import { MouseEvent, useState } from 'react';
import { AppBar, Toolbar, Button, Menu, MenuItem} from '@mui/material';
import { Link } from 'react-router-dom';

// export default function AdminNavBar() {
export const AdminNavbarMenu = () => {

    // Estados para cada menú desplegable
  const [anchorElEscri, setAnchorElEscri] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [anchorElSales, setAnchorElSales] = useState<null | HTMLElement>(null);
  const [anchorElBuys, setAnchorElBuys] = useState<null | HTMLElement>(null);
  const [anchorElCash, setAnchorElCash] = useState<null | HTMLElement>(null);
  const [anchorElStocks, setAnchorElStocks] = useState<null | HTMLElement>(null);
  const [anchorElAdmin, setAnchorElAdmin] = useState<null | HTMLElement>(null);

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

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ justifyContent: 'flex-end' }}>
        {/* Usuario cliente */}
          <>
            {/* <Button
              color="primary"
              onClick={handleOpen(setAnchorElUser)}
            >
            </Button> */}
            <Menu
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleClose(setAnchorElUser)}
            >
              <MenuItem component={Link} to="/profile" onClick={handleClose(setAnchorElUser)}>
                Perfil Usuario
              </MenuItem>
              <MenuItem component={Link} to="/invoicehistory" onClick={handleClose(setAnchorElUser)}>
                Mis Comprobantes
              </MenuItem>
              <MenuItem component={Link} to="/orderhistory" onClick={handleClose(setAnchorElUser)}>
                Mis Ordenes
              </MenuItem>
              <MenuItem divider />
              {/* <MenuItem onClick={() => { handleClose(setAnchorElUser)(); signoutHandler(); }}>
                Log Out
              </MenuItem> */}
            </Menu>
          </>

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
          <MenuItem component={Link} to="/admin/instrumentos" onClick={handleClose(setAnchorElEscri)}>
            Instrumentos
          </MenuItem>
          <MenuItem component={Link} to="/admin/paraminstrumento" onClick={handleClose(setAnchorElEscri)}>
            Parametriza Instrumentos
          </MenuItem>
          <MenuItem component={Link} to="/admin/mesaentrada" onClick={handleClose(setAnchorElEscri)}>
            Mesa de Entrada
          </MenuItem>
          <MenuItem component={Link} to="/admin/entradas" onClick={handleClose(setAnchorElEscri)}>
            Entradas
          </MenuItem>
          <MenuItem component={Link} to="/admin/diligencias" onClick={handleClose(setAnchorElEscri)}>
             Diligencias
          </MenuItem>
          <MenuItem component={Link} to="/admin/entradas" onClick={handleClose(setAnchorElEscri)}>
             Entradas sin Facturar
          </MenuItem>
          <MenuItem component={Link} to="/admin/entradas" onClick={handleClose(setAnchorElEscri)}>
            Entradas sin Protocolizar
          </MenuItem>
          <MenuItem component={Link} to="/admin/entradas" onClick={handleClose(setAnchorElEscri)}>
            Entradas Protocolizados sin Terminar
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
          <MenuItem component={Link} to="/admin/support" onClick={handleClose(setAnchorElAdmin)}>
            Chat Support
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
