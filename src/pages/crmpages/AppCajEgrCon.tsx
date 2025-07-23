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


import { IConfiguracion, IEncargado,  IReceiptB} from '../../interfaces';
import { stutzApi } from '../../../api';
import { AuthContext } from '../../../context';
// import ReactToPrint from 'react-to-print';
import { useReactToPrint } from "react-to-print";


const ReceiptI:IReceiptB = {
    _id : '',
    user: '',
    id_client: "",
    id_config: "",
    id_encarg: "",
    supplier: "",
    receiptItems: [],
    subTotal     : 0,
    total        : 0,
    totalBuy : 0,
    codConNum : 0,
    recDat : "",
    recNum : 0,
    cajDat : "",
    cajNum : 0,
    ordNum : 0,
    desval : "",
    notes : "",
    salbuy: "",
    isPaid  : false,
    paidAt : '',
}


export const AppCajEgrCon = () => {

    ////////////////////FGFGFGFG
    const { user, isLoading } = useContext(AuthContext);
    const navigate = useNavigate()

    useEffect(() => {
        if (!user && !isLoading) {
        navigate('/auth/loginadm?redirect=/admin/invoicesCajEgr');
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
 const [receipt, setReceipt] = useState(ReceiptI);
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
            const resp = await stutzApi.get<IReceiptB>(`/api/receipts/${ id }`);
            setReceipt(resp.data);
            //     _id: resp.data._id,
            //     user: resp.data.user,
            //     orderItems: resp.data.orderItems,
            //     shippingAddress: resp.data.shippingAddress,
            // //    paymentResult: '',
            //     shippingPrice:  resp.data.shippingPrice,
            //     numberOfItems: resp.data.numberOfItems,
            //     subTotal     : resp.data.subTotal,
            //     tax          : resp.data.tax,
            //     total        : resp.data.total,
            //     totalBuy     : resp.data.totalBuy,
            //     id_client    : resp.data.id_client,
            //     id_instru    : resp.data.id_instru,
            //     id_config      : resp.data.id_config,
            //     codCom      : resp.data.codCom,
            //     id_parte      : resp.data.id_parte,
            //     codConNum       : resp.data.codConNum,
            //     supplier      : resp.data.supplier,
            //     remNum      : resp.data.remNum,
            //     remDat      : resp.data.remDat,
            //     invNum      : resp.data.invNum,
            //     invDat      : resp.data.invDat,
            //     recNum      : resp.data.recNum,
            //     recDat      : resp.data.recDat,
            //     desVal      : resp.data.desVal,
            //     notes       : resp.data.notes,
            //     paymentMethod       : resp.data.paymentMethod,
                
            //     isPaid  : resp.data.isPaid,
            //     paidAt : resp.data.paidAt
            //  });
            // setNameCus((receipt.id_client as ICustomer).nameCus);
            // setNameIns((receipt.id_instru as IInstrumento).name);
            // setNamePar((receipt.id_parte as IParte).name);
            // setNameCon((receipt.id_config as IConfiguracion).name);
            // setNameUse((receipt.user as IUser).name);
        } catch (error) {
          
        }
       }
         loadProduct()
        }, [])

useEffect(() => {
  if (!receipt) return;

  // setNameCus((receipt.id_client as ICustomer)?.nameCus || '');
  // setNameIns((receipt.id_instru as IInstrumento)?.name || '');
  // setNamePar((receipt.id_parte as IParte)?.name || '');
  // setNameCon((receipt.id_config as IConfiguracion)?.name || '');
  // setNameUse((receipt.user as IUser)?.name || '');
}, [receipt]);

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

      {!receipt ? (
        // <LoadingBox></LoadingBox>
        <></>
      // ) : error ? (
      //   <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>

      <main>
        {!showInvoice ? (
          <>
            {/* name, address, email, phone, bank name, bank account number, website client name, client address, receipt number, Fecha Factura, Fecha Vencimiento, notes */}
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
              {/* <Typography variant="h6">{(receipt.codCom as IComprobante)?.nameCom}</Typography> */}
              <Typography variant="h6">RETIRO DE CAJA</Typography>
            </Box>


            <Grid container spacing={2} mt={2}>
              <Grid item xs={12} md={6}>
                <Typography><strong>{(receipt.id_config as IConfiguracion)?.name}</strong></Typography>
                <Typography><strong>Razon Social:</strong> {(receipt.id_config as IConfiguracion)?.name}</Typography>
                <Typography><strong>Domicilio Comercial:</strong> {(receipt.id_config as IConfiguracion)?.domcomer}</Typography>
                <Typography><strong>Condición frente al IVA:</strong> {(receipt.id_config as IConfiguracion)?.coniva}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography><strong>RETIRO DE CAJA</strong></Typography>
                <Typography><strong>Punto de Venta:</strong> {(receipt.id_config as IConfiguracion)?.codCon}</Typography>
                <Typography><strong>Comp. Nro:</strong> {receipt.cajNum}</Typography>
                <Typography><strong>Fecha de Emision:</strong> {receipt.cajDat?.substring(0, 10)}</Typography>
                <Typography><strong>CUIT:</strong> {(receipt.id_config as IConfiguracion)?.cuit}</Typography>
                <Typography><strong>Ingresos Brutos:</strong> {(receipt.id_config as IConfiguracion)?.ib}</Typography>
                <Typography><strong>Fecha de Inicio de Actividades:</strong> {(receipt.id_config as IConfiguracion)?.feciniact}</Typography>
              </Grid>
            </Grid>





            <Divider sx={{ my: 2 }} />

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography><strong>Encargado:</strong> {(receipt.id_encarg as IEncargado)?.name}</Typography>
              </Grid>
            </Grid>


            <Divider sx={{ my: 2 }} />
            <div>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ backgroundColor: '#333' }}>
                  <TableCell sx={{ color: 'white' }}>#</TableCell>
                  <TableCell sx={{ color: 'white' }}>Descripción</TableCell>
                  <TableCell sx={{ color: 'white' }} align="right">Numero</TableCell>
                  <TableCell sx={{ color: 'white' }} align="right">Importe</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {receipt.receiptItems.map((item, index) => (
                  <TableRow key={item._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.desval}</TableCell>
                    <TableCell align="right">{item.numval}</TableCell>
                    <TableCell align="right">
                      ${(item.amountval).toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Box mt={2} textAlign="right">
              <Typography variant="h6"><strong>Total:</strong> ${receipt.totalBuy?.toFixed(2)}</Typography>
            </Box>
          </div>
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

