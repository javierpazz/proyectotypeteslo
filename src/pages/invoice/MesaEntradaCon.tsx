import {  useState, useEffect, useContext, useRef } from 'react';
import {  useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button
} from '@mui/material';


import { IOrder } from '../../interfaces';
import { stutzApi } from '../../../api';
import { AuthContext, CartContext } from '../../../context';
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
    codConNum : 0,
    codSup : '0',
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


export const MesaEntradaCon = () => {

    ////////////////////FGFGFGFG
    const { user, isLoading } = useContext(AuthContext);
    const navigate = useNavigate()

    useEffect(() => {
        if (!user && !isLoading) {
        navigate('/auth/loginadm?redirect=/admin/mesaentradaCon');
        }
    }, [user, isLoading, navigate]);
    ////////////////////FGFGFGFG    

        const userInfo = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo')!)
    : null;




  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';
  
  
  const [width] = useState(641);
  const [showInvoice, setShowInvoice] = useState(true);


  const config = {
    salePoint: userInfo.configurationObj.codCon,
    name: userInfo.configurationObj.name,
    cuit: userInfo.configurationObj.cuit,
    address: userInfo.configurationObj.domcomer,
    ivaCondition: userInfo.configurationObj.coniva,
    ib: userInfo.configurationObj.ib,
    feciniact: userInfo.configurationObj.feciniact,
    invoiceNumber: "",
    date: "",

  };


  const contentRef = useRef<HTMLDivElement | null>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  // const TypedReactToPrint = ReactToPrint as unknown as React.FC<any>;
  // const componentRef = useRef();
  
  
  
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
                codConNum       : resp.data.codConNum,
                codSup      : resp.data.codSup,
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
        
     
        } catch (error) {
          console.log(error)
          
        }
       }
         loadProduct()
        }, [id, invoice])
  useEffect(() => {
    if (window.innerWidth < width) {
      alert('Place your phone in landscape mode for the best experience');
    }
  }, [width]);



  const clearitems = () => {
    setShowInvoice(false);
    navigate(redirect);
  };

  const actualiza = () => {
    console.log(invoice._id)
      // navigate(`/admin/entrada/${invoice._id}?redirect=/admin/entradas`);
      navigate(`/admin/mesaentradaAct/${invoice._id}`);
  };
  const valoriza = () => {
    console.log(invoice._id)
      // navigate(`/admin/entrada/${invoice._id}?redirect=/admin/entradas`);
      navigate(`/admin/mesaentradaVal/${invoice._id}`);
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
<Box sx={{ p: 5 }} ref={contentRef}>
<Box mt={2} display="flex" gap={2} flexWrap="wrap">
  <Button variant="contained" color="primary" onClick={reactToPrintFn}>IMPRIME</Button>
  <Button variant="contained" color="secondary" onClick={actualiza}>ACTUALIZA</Button>
  <Button variant="contained" color="secondary" onClick={valoriza}>VALORIZA</Button>
  {/* <Button variant="outlined" color="success">EXCEL</Button> */}
  <Button variant="outlined" color="error">BORRA ENTRADA</Button>
  <Button variant="outlined" color="secondary" onClick={clearitems}>CANCELA</Button>
</Box>

  <Card variant="outlined">
    <CardContent>
      <Typography variant="h5" align="center" gutterBottom>
        ENTRADA
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography><strong>{userInfo.nameCon}</strong></Typography>
          <Typography><strong>Razón Social:</strong> {userInfo.nameCon}</Typography>
          <Typography><strong>Domicilio Comercial:</strong> {config.address}</Typography>
          <Typography><strong>Condición frente al IVA:</strong> {config.ivaCondition}</Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography><strong>ENTRADA</strong></Typography>
          <Typography>
            <strong>Punto de Venta:</strong> {config.salePoint} <strong>Entrada Nro:</strong> {invoice.remNum}
          </Typography>
          <Typography><strong>Fecha de Emisión:</strong> {invoice.remDat?.substring(0, 10)}</Typography>
          <Typography><strong>CUIT:</strong> {config.cuit}</Typography>
          <Typography><strong>Ingresos Brutos:</strong> {config.ib}</Typography>
          <Typography><strong>Fecha de Inicio de Actividades:</strong> {config.feciniact}</Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography>
            <strong>Obs:</strong> {invoice.notes} 
          </Typography>
        </Grid>


      </Grid>

      <Box mt={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Observaciones</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell align="right">Valor</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoice.orderItems.map((item, index) => (
              <TableRow key={item._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.observ}</TableCell>
                <TableCell>
                  {item.terminado ? 'Terminado' : 'Pendiente'}
                </TableCell>
                <TableCell align="right">
                  ${(item.quantity * item.price * (1 + item.porIva / 100)).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      <Box mt={2} textAlign="right">
        <Typography variant="h6">
          <strong>Total:</strong> ${invoice.total.toFixed(2)}
        </Typography>
      </Box>
    </CardContent>
  </Card>
</Box>
//////imprecions
        )}
      </main>

      </>
      )}


    </>
  )
}

