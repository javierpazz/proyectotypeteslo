import {  useState, useEffect, useContext, useRef } from 'react';
import {  useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Paper,
  Divider
} from '@mui/material';


import { IComprobante, IConfiguracion, IOrder, ISupplier } from '../../interfaces';
import { stutzApi } from '../../../api';
import { AuthContext } from '../../../context';
// import ReactToPrint from 'react-to-print';
import { useReactToPrint } from "react-to-print";


const OrderI:IOrder = {
    _id : '',
    user: '',
    orderItems: [],
    shippingAddress: {
        firstName: '',
        lastName : '',
        address  : '',
        address2 : '',
        zip      : '',
        city     : '',
        country  : '',
        phone    : '',
    },
//    paymentResult: '',

    numberOfItems: 0,
    shippingPrice : 0,
    subTotal     : 0,
    tax          : 0,
    total        : 0,
    totalBuy : 0,
    id_client : "",
    id_instru : "",
    id_config : "",
    id_parte : "",
    codConNum : 0,
    supplier : '0',
    remNum : 0,
    remDat : "",
    invNum : 0,
    invDat : "",
    recNum : 0,
    recDat : "",
    desVal : "",
    notes : "",
    paymentMethod: 0,

    isPaid  : false,
    paidAt : '',
}


export const AppRemBuyCon = () => {

    ////////////////////FGFGFGFG
    const { user, isLoading } = useContext(AuthContext);
    const navigate = useNavigate()

    useEffect(() => {
        if (!user && !isLoading) {
        navigate('/auth/loginadm?redirect=/admin/remitsBuy');
        }
    }, [user, isLoading, navigate]);
    ////////////////////FGFGFGFG    



  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';
  
  
  const [width] = useState(641);
  const [showInvoice, setShowInvoice] = useState(true);




  const contentRef = useRef<HTMLDivElement | null>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  
//  const { user } = useContext(  AuthContext );
 const [invoice, setInvoice] = useState(OrderI);
 const params = useParams();
 const { id } = params;

//  useEffect(() => {
//     if ( !user ) {
//         navigate (`/auth/login?p=/orders/${ id }`);
//     }
//     }, [])

 useEffect(() => {
    const loadProduct = async() => {
        try {
            const resp = await stutzApi.get<IOrder>(`/api/tes/orders/getorderbyid/${ id }`);
            setInvoice({
                _id: resp.data._id,
                user: resp.data.user,
                orderItems: resp.data.orderItems,
                shippingAddress: resp.data.shippingAddress,
            //    paymentResult: '',
                shippingPrice:  resp.data.shippingPrice,
                numberOfItems: resp.data.numberOfItems,
                subTotal     : resp.data.subTotal,
                tax          : resp.data.tax,
                total        : resp.data.total,
                totalBuy     : resp.data.totalBuy,
                id_client    : resp.data.id_client,
                id_instru    : resp.data.id_instru,
                id_config      : resp.data.id_config,
                id_parte      : resp.data.id_parte,
                codConNum       : resp.data.codConNum,
                supplier      : resp.data.supplier,
                remNum      : resp.data.remNum,
                remDat      : resp.data.remDat,
                invNum      : resp.data.invNum,
                invDat      : resp.data.invDat,
                recNum      : resp.data.recNum,
                recDat      : resp.data.recDat,
                desVal      : resp.data.desVal,
                notes       : resp.data.notes,
                paymentMethod       : resp.data.paymentMethod,
                
                isPaid  : resp.data.isPaid,
                paidAt : resp.data.paidAt
             });
            // setNameCus((invoice.id_client as ICustomer).nameCus);
            // setNameIns((invoice.id_instru as IInstrumento).name);
            // setNamePar((invoice.id_parte as IParte).name);
            // setNameCon((invoice.id_config as IConfiguracion).name);
            // setNameUse((invoice.user as IUser).name);
        } catch (error) {
        }
       }
         loadProduct()
        }, [])

useEffect(() => {
  if (!invoice) return;

  // setNameCus((invoice.id_client as ICustomer)?.nameCus || '');
  // setNameIns((invoice.id_instru as IInstrumento)?.name || '');
  // setNamePar((invoice.id_parte as IParte)?.name || '');
  // setNameCon((invoice.id_config as IConfiguracion)?.name || '');
  // setNameUse((invoice.user as IUser)?.name || '');
}, [invoice]);

   useEffect(() => {
    if (window.innerWidth < width) {
      alert('Place your phone in landscape mode for the best experience');
    }
  }, [width]);



  const clearitems = () => {
    setShowInvoice(false);
    navigate(redirect);
  };


  return (
    <>
      {/* <Helmet>
        <title>Remitos de Venta</title>
      </Helmet> */}

      {!invoice ? (
        // <LoadingBox></LoadingBox>
        <></>
      // ) : error ? (
      //   <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>

      <main>
        {!showInvoice ? (
          <>
            {/* name, address, email, phone, bank name, bank account number, website client name, client address, invoice number, Fecha Factura, Fecha Vencimiento, notes */}
            <div>

            </div>
          </>
        ) : (
//////imprecions
        <>
        <Box mt={2} display="flex" gap={2} flexWrap="wrap">
          <Button variant="contained" color="primary" onClick={reactToPrintFn}>IMPRIME</Button>
          <Button variant="outlined" color="secondary" onClick={clearitems}>CANCELA</Button>
        </Box>
      <Box ref={contentRef} p={3}>

        <Box mt={4}>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Box bgcolor="black" color="white" p={1} textAlign="center">
              <Typography variant="h6">REMITO COMPRA</Typography>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography><strong>CUIT:</strong> {(invoice.supplier as ISupplier)?.cuit}</Typography>
                <Typography><strong>Condición IVA:</strong> {(invoice.supplier as ISupplier)?.coniva}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography><strong>Apellido y Nombre / Razon Social:</strong> {(invoice.supplier as ISupplier)?.name}</Typography>
                <Typography><strong>Dirección:</strong> {(invoice.supplier as ISupplier)?.domcomer}</Typography>
              </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            <Grid container spacing={2} mt={2}>
              <Grid item xs={12} md={6}>
                <Typography><strong>{(invoice.id_config as IConfiguracion)?.name}</strong></Typography>
                <Typography><strong>Razon Social:</strong> {(invoice.id_config as IConfiguracion)?.name}</Typography>
                <Typography><strong>Domicilio Comercial:</strong> {(invoice.id_config as IConfiguracion)?.domcomer}</Typography>
                <Typography><strong>Condición frente al IVA:</strong> {(invoice.id_config as IConfiguracion)?.coniva}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography><strong>{(invoice.codCom as IComprobante)?.nameCom}</strong></Typography>
                <Typography><strong>Punto de Venta:</strong> {(invoice.id_config as IConfiguracion)?.codCon}</Typography>
                <Typography><strong>Comp. Nro:</strong> {invoice.remNum}</Typography>
                <Typography><strong>Fecha de Emision:</strong> {invoice.remDat?.substring(0, 10)}</Typography>
                <Typography><strong>CUIT:</strong> {(invoice.id_config as IConfiguracion)?.cuit}</Typography>
                <Typography><strong>Ingresos Brutos:</strong> {(invoice.id_config as IConfiguracion)?.ib}</Typography>
                <Typography><strong>Fecha de Inicio de Actividades:</strong> {(invoice.id_config as IConfiguracion)?.feciniact}</Typography>
              </Grid>
            </Grid>


            <Divider sx={{ my: 2 }} />

            <Table size="small">
              <TableHead>
                <TableRow sx={{ backgroundColor: '#333' }}>
                  <TableCell sx={{ color: 'white' }}>#</TableCell>
                  <TableCell sx={{ color: 'white' }}>Descripción</TableCell>
                  <TableCell sx={{ color: 'white' }} align="right">Cantidad</TableCell>
                  <TableCell sx={{ color: 'white' }} align="right">Precio</TableCell>
                  <TableCell sx={{ color: 'white' }} align="right">Subtotal</TableCell>
                  <TableCell sx={{ color: 'white' }} align="right">IVA (%)</TableCell>
                  <TableCell sx={{ color: 'white' }} align="right">Subtotal c/IVA</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {invoice.orderItems.map((item, index) => (
                  <TableRow key={item._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.title}</TableCell>
                    <TableCell align="right">{item.quantity}</TableCell>
                    <TableCell align="right">${item.price}</TableCell>
                    <TableCell align="right">${(item.quantity * item.price).toFixed(2)}</TableCell>
                    <TableCell align="right">%{item.porIva}</TableCell>
                    <TableCell align="right">
                      ${(item.quantity * item.price * (1 + item.porIva / 100)).toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Box mt={2} textAlign="right">
              <Typography><strong>Subtotal:</strong> ${invoice.subTotal?.toFixed(2)}</Typography>
              <Typography><strong>IVA:</strong> ${invoice.tax?.toFixed(2)}</Typography>
              <Typography variant="h6"><strong>Total:</strong> ${invoice.totalBuy?.toFixed(2)}</Typography>
            </Box>
          </Paper>
        </Box>
      </Box>
      </>
//////imprecions
        )}
      </main>

      </>
      )}


    </>
  )
}

