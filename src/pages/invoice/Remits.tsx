import { useContext, useState, useRef, useEffect } from 'react';
import {Header} from './Header';
import { toast } from 'react-toastify';
import {TableForm} from './TableForm';
import { BiFileFind } from "react-icons/bi";
import { CartContext } from '../../../context';
import ReactToPrint from 'react-to-print';
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  MenuItem,
  Select,
  TextField,
  InputLabel,
  FormControl
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
// import ListGroup from 'react-bootstrap/ListGroup';
// import Card from 'react-bootstrap/Card';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import { getError, API } from '../../utils';
import { stutzApi } from '../../../api';
import { ICartProduct, ICustomer, IOrder } from '../../interfaces';
import { AdminLayoutMenu } from '../../components/layouts';
import { CategoryOutlined } from '@mui/icons-material';

const getError = (error:any) => {
  return error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
};

export const Remits = () => {

  // const { state, dispatch: ctxDispatch } = useContext(Store);
    const {  cart, removeCartProduct } = useContext(CartContext);
    
    const userInfo = typeof window !== 'undefined' && localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo')!)
  : null;
        const invoice: IOrder = {
            orderItems: cart.map( p => ({
                ...p,
                size: p.size!
            })),
            shippingAddress: {
              firstName: "",
              lastName: "",
              address: "",
              address2: "",
              zip: "",
              city: "",
              country: "",
              phone: "",
            },
            numberOfItems: 0,
            isPaid: false,
            subTotal :0,
            shippingPrice : 0,
            //        invoice.shippingPrice =
            //        invoice.subTotal > 100 ? round2(0) : round2(10);
            // invoice.tax = round2((poriva/100) * invoice.subTotal);
            tax : 0,
            total : 0,
            totalBuy : 0,
            id_client : "",
            id_config : "",
            user : "",
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

        }              

  

    // useEffect(() => {
    // if ( isLoaded) {
    // }
    // }, [isLoaded, cart])

    // if(!isLoaded ){
    //     return (<></>);
    // }


  const input2Ref = useRef<HTMLInputElement>(null);
  const input5Ref = useRef<HTMLInputElement>(null);
  const input6Ref = useRef<HTMLInputElement>(null);
  const input7Ref = useRef<HTMLInputElement>(null);
  const input8Ref = useRef<HTMLInputElement>(null);
  const input9Ref = useRef<HTMLInputElement>(null);
  const input0Ref = useRef<HTMLInputElement>(null);

  const input21Ref = useRef<HTMLInputElement>(null);

  const codConNum = userInfo.configurationObj.codCon;
  const [showCus, setShowCus] = useState(false);

  const getTodayInGMT3 = () => {
    const now = new Date();
    // Convertimos a la hora de Argentina (GMT-3)
    const offset = now.getTimezoneOffset(); // En minutos
    const localDate = new Date(now.getTime() - (offset + 180) * 60 * 1000); // 180 = 3 horas
    
    return localDate.toISOString().split("T")[0];
  };

  // const [codUse, setCodUse] = useState('');
  const [codCus, setCodCus] = useState('');
  const [codCust, setCodCust] = useState('');
  const [name, setName] = useState('');
  const [userObj, setUserObj] = useState<ICustomer>();
  const [remNum, setRemNum] = useState(0);
  const [remNumImp, setRemNumImp] = useState('');
  const [remDat, setRemDat] = useState(getTodayInGMT3());
  const [recNum, setRecNum] = useState('');
  const [recDat, setRecDat] = useState(getTodayInGMT3());
  const [desval, setDesval] = useState('');
  const [valueeR, setValueeR] = useState('');
  const [desVal, setDesVal] = useState('');
  const [numval, setNumval] = useState(' ');
  // const [userss, setUserss] = useState([]);
  const [customers, setCustomers] = useState<ICustomer[]>([]);
  const [codPro, setCodPro] = useState('');
  const [dueDat, setDueDat] = useState(getTodayInGMT3());
  const [notes, setNotes] = useState('');
  const [desPro, setDesPro] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [porIva, setPorIva] = useState(0);
  const [amount, setAmount] = useState(0);
  const [amountval, setAmountval] = useState(0);
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalImp, setTotalImp] = useState(0);
  const [width] = useState(641);
  const [showInvoice, setShowInvoice] = useState(false);

  const [isPaying, setIsPaying] = useState(false);

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


  const componentRef = useRef<HTMLDivElement | null>(null);
  const TypedReactToPrint = ReactToPrint as unknown as React.FC<any>;

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    const calculateAmountval = () => {
      setAmountval(
        cart?.reduce((a, c) => a + (c.quantity * c.price * (1+(c.porIva/100))), 0)
      );
    };
    if (numval === '') {
      setNumval(' ');
    }
    setCodCus(codCus);
    calculateAmountval();
  }, [cart]);

  useEffect(() => {
    clearitems();
    input2Ref.current?.focus()
    const fetchData = async () => {
      try {
        const { data } = await stutzApi.get(`/api/customers/`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        setCustomers(data);
      } catch (err) {}
    };
    fetchData();
  }, []);


  useEffect(() => {
    if (window.innerWidth < width) {
      alert('Place your phone in landscape mode for the best experience');
    }
  }, [width]);


  const handleShowCus = () => {
    setShowCus(true);
    input21Ref.current?.focus();
  };


  const searchUser = (codCus: string) => {
    const usersRow = customers.find((row) => row._id === codCus);
    if(usersRow) {
    setUserObj(usersRow);
    setCodCus(usersRow._id);
    setCodCust(usersRow.codCus);
    setName(usersRow.nameCus);
    };
  };

  
  const ayudaCus = (e: React.KeyboardEvent<HTMLDivElement>) => {
    e.key === "Enter" && buscarPorCodCus(codCust);
    e.key === "F2" && handleShowCus();
    e.key === "Tab" && buscarPorCodCus(codCust);
  };
  

  const buscarPorCodCus = (codCust: string) => {
    const usersRow = customers.find((row) => row.codCus === codCust);
    if (!usersRow) {
        setCodCus('');
        setCodCust('');
        setName('Elija Cliente');
    }else{
      setCodCus(usersRow._id);
      setCodCust(usersRow.codCust);
      setUserObj(usersRow);
      setName(usersRow.nameCus);
      input6Ref.current?.focus();
      };
  };

  const handleChange = (e: SelectChangeEvent<string>) => {
    searchUser(e.target.value);
  };
  const submitHandlerCus = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowCus(false)
  };



  const placeCancelInvoiceHandler = async () => {};

  const placeInvoiceHandler = async () => {
      if (window.confirm('Esta seguro de Grabar?')) {
      if (isPaying && (!recNum || !recDat || !desVal)) {
        unloadpayment();
      } else {
        if (remDat && codCus) {
          cart.map((item) => stockHandler( item ));
          const round2 = (num: number) => Math.round(num * 100 + Number.EPSILON) / 100; // 123.2345 => 123.23
          invoice.subTotal = round2(
            cart.reduce((a, c) => a + c.quantity * c.price, 0)
          );
          invoice.shippingPrice = 0;

          //        invoice.shippingPrice =
          //        invoice.subTotal > 100 ? round2(0) : round2(10);
          // invoice.tax = round2((poriva/100) * invoice.subTotal);
          invoice.tax = round2(
            cart.reduce((a, c) => a + c.quantity * c.price * (c.porIva/100), 0)
          );
          invoice.total = round2(
            invoice.subTotal + invoice.shippingPrice + invoice.tax
          );
          invoice.totalBuy = 0;
          invoice.id_client = codCus;
          invoice.id_config = userInfo.codCon;
          invoice.user = userInfo._id,
          invoice.codConNum = codConNum;

          invoice.codSup = '0';
          invoice.remNum = remNum;
          invoice.remDat = remDat;
          invoice.invNum = 0;
          invoice.invDat = "";
          invoice.recNum = 0;
          invoice.recDat = "";
          invoice.desVal = desVal;
          invoice.notes = notes;

          orderHandler();
          setShowInvoice(true);
          //      handlePrint();
        }
      }
    };
  };



  /////////////////////////////////////////////

  const stockHandler = async (item:ICartProduct) => {
    // console.log(item.item._id);
    console.log(item);

    try {
      await stutzApi.put(
        `/api/products/downstock/${item._id}`,
        {
          quantitys: item.quantity,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
    } catch (err) {
      toast.error(getError(err));
    }
  };

  const orderHandler = async () => {
    try {
      const { data } = await stutzApi.post(
        `/api/invoices/rem`,

        {
          orderItems: invoice.orderItems,
          shippingAddress: invoice.shippingAddress,
          paymentMethod: invoice.paymentMethod,
          subTotal: invoice.subTotal,
          shippingPrice: invoice.shippingPrice,
          tax: invoice.tax,
          total: invoice.total,
          totalBuy: invoice.totalBuy,

          codCus: invoice.id_client,
          codCon: invoice.id_config,
          user: userInfo._id,
          codConNum: invoice.codConNum,

          //        codSup: invoice.codSup,

          remNum: invoice.remNum,
          remDat: invoice.remDat,
          invNum: invoice.invNum,
          invDat: invoice.invDat,
          recNum: invoice.recNum,
          recDat: invoice.recDat,
          desVal: invoice.desVal,
          notes: invoice.notes,
          salbuy: 'SALE',
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      //ctxDispatch({ type: 'INVOICE_CLEAR' });
      //      dispatch({ type: 'CREATE_SUCCESS' });
      //      localStorage.removeItem('cart');
      setIsPaying(false);
      setDesval('');
      setDesVal('');
      setRemNumImp(data.invoice.remNum);
      // setTotalSubImp(data.invoice.subTotal);
      // setTaxImp(data.invoice.tax);
      setTotalImp(data.invoice.total);
      setRecNum('');
      setRecDat('');
      setNumval(' ');
      setAmountval(0);
      //navigate(`/order/${data.order._id}`);
    } catch (err) {
      // dispatch({ type: 'CREATE_FAIL' });
      toast.error(getError(err));
    }
  };


  const unloadpayment = async () => {
    if (window.confirm('Are you fill all Dates?')) {
    }
  };

  const clearitems = () => {
    // ctxDispatch({ type: 'INVOICE_CLEAR' });
    // dispatch({ type: 'CREATE_SUCCESS' });
    removeCartProduct;
    setValueeR("");
    localStorage.removeItem('cart');
    localStorage.removeItem('receiptItems');
    setShowInvoice(false);
  };

  return (
    // <>
    //   <main>
    <AdminLayoutMenu 
        title={`Remitos`} 
        subTitle={'Mantenimiento de Remitos'}
        icon={ <CategoryOutlined /> }
    >

    {!showInvoice ? (
    <Box>
      <Box p={2} mb={2}>
        <Grid container>
          <Grid item md={4}>
                <Typography variant="h1"></Typography>
          </Grid>

          <Grid item md={4}>
                    <Typography variant="h1">REMITO DE VENTA</Typography>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item md={2}>
            <TextField
              fullWidth
              inputRef={input2Ref}
              label="Codigo Cliente"
              placeholder="Codigo Cliente"
              value={codCust}
              onChange={(e) => setCodCust(e.target.value)}
              onKeyDown={(e) => ayudaCus(e)}
              required
            />
          </Grid>
          <Grid item md={1} display="flex" alignItems="center">
            <Button
              onClick={handleShowCus}
              variant="contained"
              startIcon={<BiFileFind />}
              sx={{ bgcolor: 'yellow', color: 'black' }}
            >
              Buscar
            </Button>
          </Grid>
          <Grid item md={8}>
            <Typography variant="h6">{name}</Typography>
          </Grid>
        </Grid>

        <Grid container spacing={2} mt={2}>
          <Grid item md={2}>
            <TextField
              fullWidth
              type="number"
              inputRef={input6Ref}
              label="Remito N°"
              placeholder="Remito N°"
              value={remNum}
              onChange={(e) => setRemNum(+e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && input9Ref.current?.focus()}
              required
            />
          </Grid>
          <Grid item md={2}>
            <TextField
              fullWidth
              inputRef={input9Ref}
              type="date"
              label="Fecha Remito"
              value={remDat}
              onChange={(e) => setRemDat(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && input5Ref.current?.focus()}
              required
            />
          </Grid>
          <Grid item md={2}>
            <TextField
              fullWidth
              inputRef={input5Ref}
              type="date"
              label="Fecha Vencimiento"
              value={dueDat}
              onChange={(e) => setDueDat(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && input7Ref.current?.focus()}
              required
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              fullWidth
              inputRef={input7Ref}
              label="Observaciones"
              placeholder="Observaciones"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && input8Ref.current?.focus()}
            />
          </Grid>
        </Grid>
      </Box>

          {/* <Grid item md={1} display="flex" alignItems="center">
            <Button
              onClick={handleShowCus}
              variant="contained"
              startIcon={<BiFileFind />}
              sx={{ bgcolor: 'yellow', color: 'black' }}
            >
              Buscar
            </Button>
          </Grid>
 */}

      <Box border={1} p={2} borderRadius={2}>
        <Grid container spacing={2}>
          <Grid item md={4}>
            <Button
              fullWidth
              variant="contained"
              sx={{ bgcolor: 'yellow', color: 'black' }}
              onClick={placeCancelInvoiceHandler}
              disabled={cart.length === 0 || !remDat || !codCus}
            >
              CANCELA
            </Button>
            {/* {isLoaded && <FullScreenLoading />} */}
          </Grid>

          <Grid item md={4}>
            <Button
              fullWidth
              variant="contained"
              sx={{ bgcolor: 'yellow', color: 'black' }}
              // inputRef={input0Ref}
              onClick={placeInvoiceHandler}
              disabled={cart.length === 0 || !remDat || !codCus}
            >
              GRABA REMITO
            </Button>
            {/* {isLoaded && <FullScreenLoading />} */}
          </Grid>

          <Grid item md={4}>
            <Typography variant="h5">Total: ${amountval.toFixed(2)}</Typography>
          </Grid>
        </Grid>
                {/* This is our table form */}
                <article>
                  <TableForm
                    input0Ref={input0Ref}
                    input8Ref={input8Ref}
                    codPro={codPro}
                    setCodPro={setCodPro}
                    desPro={desPro}
                    setDesPro={setDesPro}
                    quantity={quantity}
                    setQuantity={setQuantity}
                    price={price}
                    setPrice={setPrice}
                    porIva={porIva}
                    setPorIva={setPorIva}
                    amount={amount}
                    setAmount={setAmount}
                    list={list}
                    setList={setList}
                    total={total}
                    setTotal={setTotal}
                    valueeR={valueeR}
                    desval={desval}
                    numval={numval}
                    isPaying={isPaying}
                    //                    totInvwithTax={totInvwithTax}
                    //                    setTotInvwithTax={setTotInvwithTax}
                  />
                </article>


                <Dialog
                  open={showCus}
                  onClose={() => setShowCus(false)}
                  fullWidth
                  maxWidth="sm"
                >
                  <DialogTitle>Elija un Cliente</DialogTitle>
                  <DialogContent>
                    <FormControl fullWidth margin="normal">
                      <InputLabel id="select-client-label">Clientes</InputLabel>
                      <Select
                        labelId="select-client-label"
                        value=""
                        onChange={(e) => handleChange(e)}
                      >
                        {customers.map((elemento) => (
                          <MenuItem key={elemento._id} value={elemento._id}>
                            {elemento.nameCus}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <TextField
                      label="Cliente"
                      fullWidth
                      value={name}
                      disabled
                      margin="normal"
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={submitHandlerCus}
                      disabled={!name}
                      variant="contained"
                    >
                      Continuar
                    </Button>
                  </DialogActions>
                </Dialog>


      </Box>
    </Box>
        ) : (
          <>
            <TypedReactToPrint
              trigger={() => <Button type="button">Print / Download</Button>}
              content={() => componentRef.current}
            />

            <Button onClick={() => clearitems()}>Nuevo Remito</Button>

            {/* Invoice Preview */}

            <div ref={componentRef} className="p-5">
              <Header handlePrint={handlePrint} />

              <div className="container mt-4">
      <div className="card border-dark">
        <div className="card-header bg-dark text-white text-center"></div>
        <div className="card-body">
          
        <div className="card-header text-black text-center">REMITO</div>
        <div className="row">
            <div className="col-md-6">
              <p><strong>{userInfo.nameCon}</strong></p>
              <p><strong>Razon Social:</strong> {userInfo.nameCon}</p>
              <p><strong>Domicilio Comercial:</strong> {config.address}</p>
              <p><strong>Condición frente al IVA:</strong> {config.ivaCondition}</p>
            </div>
            <div className="col-md-6 ">
              <p><strong>REMITO</strong></p>
              <p><strong>Punto de Venta:</strong> {config.salePoint}    
              <strong>     Comp. Nro:</strong> {remNumImp}</p>
              <p><strong>Fecha de Emision:</strong> {remDat}</p>
              <p><strong>CUIT:</strong> {config.cuit}</p>
              <p><strong>Ingresos Brutos:</strong> {config.ib}</p>
              <p><strong>Fecha de Inicio de Actividades:</strong> {config.feciniact}</p>
            </div>
          </div>
                    <hr />
            <div className="row">
              <div className="col-md-6">
                <p><strong>CUIT:</strong> {userObj!.cuit}</p>
                <p><strong>Condición IVA:</strong> {userObj!.coniva}</p>
              </div>
              <div className="col-md-6">
                <p><strong>Apellido y Nombre / Razon Social:</strong> {userObj!.nameCus}</p>
                <p><strong>Dirección:</strong> {userObj!.domcomer}</p>
              </div>
          </div>

          </div>
          { true &&
          (
            <div>
              <table className="table table-bordered mt-3">
                <thead className="table-dark text-white">
                  <tr>
                    <th>#</th>
                    <th>Descripción</th>
                    <th className="text-end">Cantidad</th>
                    <th className="text-end">Unidad</th>
                    <th className="text-end">Precio</th>
                    <th className="text-end">Subtotal</th>
                    <th className="text-end">IVA (%)</th>
                    <th className="text-end">Subtotal c/IVA</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item, index) => (
                    <tr key={item._id}>
                      <td>{index + 1}</td>
                      <td>{item.title}</td>
                      <td className="text-end">{item.quantity}</td>
                      <td>{item.medPro}</td>
                      <td className="text-end">${item.price}</td>
                      <td className="text-end">${(item.quantity * item.price).toFixed(2)}</td>
                      <td className="text-end">%{item.porIva}</td>
                      <td className="text-end">${(item.quantity * item.price*(1+(item.porIva/100))).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="text-end">
                {/* <p><strong>Subtotal:</strong> ${totalSubImp}</p>
                <p><strong>IVA:</strong> ${taxImp}</p> */}
                <h5><strong>Total:</strong> ${totalImp}</h5>
              </div>
            </div>
          )}


      </div>
    </div>




            </div>
          </>
        )}

      {/* </main>
    </> */}
    </AdminLayoutMenu>
  );
}

