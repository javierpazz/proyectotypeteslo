import { useContext, useState, useRef, useEffect } from 'react';
import {Header} from './Header';
// import { toast } from 'react-toastify';
import {TableFormFac} from './TableFormFac';
import { AuthContext, CartContext, ReceiptContext } from '../../../context';
import ReactToPrint from 'react-to-print';
import {
  Box,
  Button,
  Typography,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { stutzApi } from '../../../api';
import { IComprobante, ICustomer, IInstrumento, IInvoice, IReceipt, IValue } from '../../interfaces';
import { AdminLayoutMenu } from '../../components/layouts';
import { CategoryOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { FullScreenLoading } from '../../components/ui';
import { BuscaCom, BuscaCli, BuscaVal } from '../../components/buscador';

// const getError = (error:any) => {
//   return error.response && error.response.data.message
//     ? error.response.data.message
//     : error.message;
// };

export const App = () => {

    ////////////////////FGFGFGFG
    const { user, isLoading } = useContext(AuthContext);
    const navigate = useNavigate()

    useEffect(() => {
        if (!user && !isLoading) {
        navigate('/auth/loginadm?redirect=/admin/invoicer');
        }
    }, [user, isLoading, navigate]);
    ////////////////////FGFGFGFG    
    


        const userInfo = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo')!)
    : null;


  // const { state, dispatch: ctxDispatch } = useContext(Store);
    const {  cart, createParam } = useContext(CartContext);
    const {  receipt } = useContext(ReceiptContext);
    
        const invoice: IInvoice = {
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
            codCus : "",
            codCon : "",
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


           const receiptB: IReceipt = {
            receiptItems: receipt.map( p => ({
                ...p,
                // size: p.size!
            })),
            subTotal: 0,
            total: 0,
            isPaid: false,
            totalBuy: 0,
            codConNum: 0,

            codCus : "",
            codCon : "",
            user : "",
            codSup : '0',
            
            cajNum: 0,
            cajDat: "",
            desVal: "",
            recNum: 0,
            recDat: "",
            paidAt: "",
            ordNum: 0,
            salbuy: "",
            notes: "",
        }

  

    // useEffect(() => {
    // if ( isLoaded) {
    // }
    // }, [isLoaded, cart])

    // if(!isLoaded ){
    //     return (<></>);
    // }


  const input3Ref = useRef<HTMLInputElement>(null);
  const input4Ref = useRef<HTMLInputElement>(null);
  const input5Ref = useRef<HTMLInputElement>(null);
  const input6Ref = useRef<HTMLInputElement>(null);
  const input7Ref = useRef<HTMLInputElement>(null);
  const input8Ref = useRef<HTMLInputElement>(null);
  const input0Ref = useRef<HTMLInputElement>(null);
  const input11Ref = useRef<HTMLInputElement>(null);
  const input12Ref = useRef<HTMLInputElement>(null);
  const inputCusRef = useRef<HTMLInputElement>(null);
  const inputComRef = useRef<HTMLInputElement>(null);
  const inputValRef = useRef<HTMLInputElement>(null);


  const codConNum = userInfo.configurationObj.codCon;
  // const id_config = userInfo.codCon;
  // const [isHaber, setIsHaber] = useState();
  // const [noDisc, setNoDisc] = useState(false);
  // const [toDisc, setToDisc] = useState(true);
  // const [itDisc, setItDisc] = useState(false);

  const getTodayInGMT3 = () => {
    const now = new Date();
    // Convertimos a la hora de Argentina (GMT-3)
    const offset = now.getTimezoneOffset(); // En minutos
    const localDate = new Date(now.getTime() - (offset + 180) * 60 * 1000); // 180 = 3 horas
    
    return localDate.toISOString().split("T")[0];
  };

  // const [codUse, setCodUse] = useState('');
  const [codCom, setCodCom] = useState('');
  const [codComt, setCodComt] = useState('');
  const [nameCom, setNameCom] = useState('');
  const [comprob, setComprob] = useState<IComprobante>();
  const [codCus, setCodCus] = useState('');
  const [codCust, setCodCust] = useState('');
  const [nameCus, setNameCus] = useState('');
  const [codVal, setCodVal] = useState('');
  const [codValt, setCodValt] = useState('');
  const [codValo, setCodValo] = useState('');
  const [codval, setCodval] = useState('');
  const [userObj, setUserObj] = useState<ICustomer>();
  const [invNum, setInvNum] = useState("");
  const [remNum, setRemNum] = useState("");
  const [remNumImp, setRemNumImp] = useState('');
  const [invDat, setInvDat] = useState(getTodayInGMT3());
  const [remDat, setRemDat] = useState(getTodayInGMT3());
  const [recNum, setRecNum] = useState(0);
  const [recDat, setRecDat] = useState(getTodayInGMT3());
  const [desval, setDesval] = useState('');
  const [valueeR, setValueeR] = useState<IValue>();
  const [desVal, setDesVal] = useState('');
  const [numval, setNumval] = useState(' ');
  // const [userss, setUserss] = useState([]);
  const [instrumento, setInstrumento] = useState<IInstrumento>();
  const [customers, setCustomers] = useState<ICustomer[]>([]);
  const [valuees, setValuees] = useState([]);
  const [codPro, setCodPro] = useState('');
  const [terminado, setTerminado] = useState(false);
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
  const [geRem, setGeRem] = useState(false);
  const [totalSubImp, setTotalSubImp] = useState(0);
  const [taxImp, setTaxImp] = useState(0);
  const [invNumImp, setInvNumImp] = useState(0);

  const [isPaying, setIsPaying] = useState(false);
  const [isloading, setIsloading] = useState(false);
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


void instrumento,
codValo,
setUserObj,
setRemNumImp,
setRemDat,
setInstrumento,
setCustomers,
valuees,
totalSubImp,
taxImp,
invNumImp;

  const [modalOpenCus, setModalOpenCus] = useState(false);
  const [modalOpenIns, setModalOpenIns] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);


  // Cerrar con Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setModalOpenCus(false);
        setModalOpenIns(false);
      }
    };

    if (modalOpenCus) {
      document.addEventListener('keydown', handleKeyDown);
    }
    if (modalOpenIns) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [modalOpenCus,modalOpenIns]);


const handleClickOutside = (e: MouseEvent) => {
  if (modalRef.current && e.target instanceof Node && !modalRef.current.contains(e.target)) {
    setModalOpenCus(false);
  }
};



  useEffect(() => {
    if (modalOpenCus) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    if (modalOpenIns) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalOpenCus, modalOpenIns]);
/////////////////consulta cliente
/////////////////consulta instrumento



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
    setDesVal(desVal);
    calculateAmountval();
    // addToCartHandler(valueeR);
  }, [cart, numval, desval, recNum, recDat]);

    useEffect(() => {
      if (customers) {
        createParam();
        // setValueeR({});
        setShowInvoice(false);
      }
    }, [customers]);


  useEffect(() => {
    inputComRef.current?.focus()
  }, []);

  useEffect(() => {
    const fetchDataVal = async () => {
      try {
        // const { data } = await axios.get(`${API}/api/valuees/`, {
        //   headers: { Authorization: `Bearer ${userInfo.token}` },
        // });
        const { data } = await stutzApi.get(`/api/valuees`);
        setValuees(data);
        const valores1 = data.find((row:any) => row.codVal === "1");
        setValueeR(valores1);
        setCodval(valores1._id);
        setCodValo(valores1.codVal);
        setDesval(valores1.desVal);
        setCodVal(valores1._id);
        setDesVal(valores1.desVal);

      } catch (err) {}
    };
    fetchDataVal();
  }, []);

  useEffect(() => {
    if (window.innerWidth < width) {
      alert('Place your phone in landscape mode for the best experience');
    }
  }, [width]);



  const placeCancelInvoiceHandler = async () => {
    clearitems();
  };

  const placeInvoiceHandler = async () => {
      if (window.confirm('Esta seguro de Grabar?')) {
      if (isPaying && (!recNum || !recDat || !desVal)) {
        unloadpayment();
      } else {
        
        if (remDat && codCus) {
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
          invoice.codCus = codCus;
          invoice.codCon = userInfo.codCon;
          invoice.user = userInfo.user._id,
          invoice.codConNum = codConNum;
          invoice.codCom = codCom;
          invoice.isHaber = comprob!.isHaber;
          invoice.geRem = geRem;
          
          invoice.codSup = undefined;
          invoice.remNum = +remNum;
          invoice.remDat = remDat;
          invoice.dueDat = dueDat;
          invoice.invNum = +invNum;
          invoice.invDat = invDat;
          invoice.recNum = 0;
          // invoice.recDat = null;
          invoice.recDat = undefined;
          invoice.recDat = "";
          invoice.desVal = desVal;
          invoice.notes = notes;
          invoice.salbuy = 'SALE';
          /////////
          if (!isPaying) {
            receiptB.recNum = recNum;
            receiptB.recDat = recDat;
            } else {
              receiptB.recNum = 0;
              // receiptB.recDat = null;
              receiptB.recDat = "";
            }

            receiptB.receiptItems = [{
              _id: codval,
              valuee: codval,
              desval: desval,
              numval: numval,
              amountval: amountval,
            }];


            receiptB.subTotal = invoice.subTotal;
            receiptB.total = invoice.total;
            receiptB.totalBuy = invoice.totalBuy;
            receiptB.codCus = invoice.codCus;
            receiptB.codCon = invoice.codCon;
            receiptB.user = userInfo.user._id,
            receiptB.codConNum = invoice.codConNum;
            receiptB.codSup = undefined;
            receiptB.desVal = desVal;
            receiptB.notes = invoice.notes;
            receiptB.salbuy = 'SALE';
            
            /////////
            orderHandler();
          clearitems();
        }
      }
    };
  };


  const orderHandler = async () => {
    const invoiceAux = invoice;
    const receiptAux = receiptB;
            console.log("sdsdsdsd")
            console.log(invoiceAux)
            console.log(receiptAux)
            console.log("sdsdsdsd")
    try {
      setIsloading(true);
      const { data } = await stutzApi.post(
        `/api/invoices`,
        {invoiceAux, receiptAux },
        // {invoiceAux },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      setIsloading(false);

      setIsPaying(false);
      setInvNumImp(data.invoice.invNum);
      setTotalSubImp(data.invoice.subTotal);
      setTaxImp(data.invoice.tax);
      setTotalImp(data.invoice.total);
      // setDesval('');
      // setDesVal('');
      // setRecNum('');
      // setRecDat('');
      // setNumval(' ');
      // setAmountval(0);
      //navigate(`/order/${data.order._id}`);
      navigate(`/admin/invoicerCon/${data.invoice._id}?redirect=/admin/invoicer`);

    } catch (error: any) {
    // Capturar errores HTTP u otros
    if (error.response) {
      console.error('Error de backend:', error.response.data);
      alert(`Error del servidor: ${error.response.data.message || 'Revisá los campos'}`);
    } else if (error.request) {
      console.error('No hubo respuesta del servidor', error.request);
      alert('No hubo respuesta del servidor. Verifica tu conexión.');
    } else {
      console.error('Error inesperado', error.message);
      alert('Error inesperado al guardar.');
    }
          setIsloading(false);

  }
  };


  const unloadpayment = async () => {
    if (window.confirm('Faltan Completar Datos')) {
    }
  };

  /////////////////////////////////////////////
  const Paying = () => {
    setIsPaying(!isPaying);
    if (isPaying) {
      setDesval('');
      setDesVal('');
      setRecNum(0);
      setRecDat('');
      setNumval(' ');
      setAmountval(0);
      setDesval(valueeR!.desVal);
      setDesVal(valueeR!.desVal);
      setRecDat(invDat);
      inputValRef.current?.focus()
    }
    if (!isPaying) {
      // setDesval('JUJU');
      // setDesVal('JUJU');
      setDesval('');
      setDesVal('');
      setRecNum(0);
      setRecDat('');
      setNumval(' ');
      setAmountval(0);
      input8Ref.current?.focus()

    }
  };



  const clearitems = () => {
    inputComRef.current?.focus()
    createParam();
    // setValueeR({});
    setCodComt("");
    setCodCust("");
    setRemNum("");
    setInvNum("");
    setShowInvoice(false);
  };





  return (
    // <>
    //   <main>
    <AdminLayoutMenu 
        title={`Entredas`} 
        subTitle={'Generando Entredas'}
        icon={ <CategoryOutlined /> }
    >

    {!showInvoice ? (
      <Box>
      <Box border={1} p={2} borderRadius={2}>

        <Grid container>
          <Grid item md={4}>
                <Typography variant="h1"></Typography>
          </Grid>

          <Grid item md={4}>
                    <Typography variant="h1">COMPROBANTES DE VENTA</Typography>
          </Grid>
        </Grid>


        <Grid container spacing={2} >
            <BuscaCom
            codCom={codCom}
            setCodCom={setCodCom}
            codComt={codComt}
            setCodComt={setCodComt}
            nameCom={nameCom}
            setNameCom={setNameCom}
            comprob={comprob}
            setComprob={setComprob}
            nextRef={inputCusRef}
            inputRef={inputComRef} 
            />


        </Grid>

        <Grid container spacing={2} mt={0}>
            <BuscaCli
            codCus={codCus}
            setCodCus={setCodCus}
            codCust={codCust}
            setCodCust={setCodCust}
            nameCus={nameCus}
            setNameCus={setNameCus}
            nextRef={input3Ref}
            inputRef={inputCusRef} 
            />

            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={geRem}
                    onChange={(e) => setGeRem(e.target.checked)}
                    name="geRem"
                  />
                }
                label="Genera Remito"
              />
            </Typography>


        </Grid>



        <Grid container spacing={2} mt={0}>
          <Grid item md={2}>
            <TextField
              fullWidth
              size="small"
              type="number"
              inputRef={input3Ref}
              label="Comprobante N°"
              placeholder="Comprobante N°"
              value={invNum}
              onChange={(e) => setInvNum(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && input4Ref.current?.focus()}
              required
            />
          </Grid>
          <Grid item md={2}>
            <TextField
              fullWidth
              size="small"
              inputRef={input4Ref}
              type="date"
              label="Fecha Comnprobante"
              value={invDat}
              onChange={(e) => setInvDat(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && input5Ref.current?.focus()}
              required
            />
          </Grid>
          <Grid item md={2}>
            <TextField
              fullWidth
              size="small"
              inputRef={input5Ref}
              type="date"
              label="Fecha Vencimiento"
              value={dueDat}
              onChange={(e) => setDueDat(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && input6Ref.current?.focus()}
              required
            />
          </Grid>
          <Grid item md={2}>
            <TextField
              fullWidth
              size="small"
              type="number"
              inputRef={input6Ref}
              label="Remito N°"
              placeholder="Remito N°"
              value={remNum}
              onChange={(e) => setRemNum(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && input7Ref.current?.focus()}
              required
            />
          </Grid>
          <Grid item md={4}>
            <TextField
              fullWidth
              size="small"
              inputRef={input7Ref}
              label="Observaciones"
              placeholder="Observaciones"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && input8Ref.current?.focus()}
            />
          </Grid>
        </Grid>

      <Box border={1} p={2} borderRadius={2} mt={1}>
        <Grid container spacing={2} >
            <BuscaVal
            codVal={codVal}
            setCodVal={setCodVal}
            codValt={codValt}
            setCodValt={setCodValt}
            desVal={desVal}
            setDesVal={setDesVal}
            nextRef={input12Ref}
            inputRef={inputValRef} 
            />

          <Grid item md={2}>
            <TextField
              fullWidth
              size="small"
              type="number"
              inputRef={input12Ref}
              label="Valor N°"
              placeholder="Valor N°"
              value={numval}
              onChange={(e) => setNumval(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && input11Ref.current?.focus()}
              required
            />
          </Grid>

          <Grid item md={2}>
            <Button
              fullWidth
              variant="contained"
              sx={{ bgcolor: 'yellow', color: 'black' }}
              onClick={Paying}
              disabled={
               cart.length === 0 ||
                  // !invNum ||
                  !invDat ||
                  !codCus
              }
            >
            {!isPaying ? 'No Cargar Cobro' : 'Carga Cobro'}
            </Button>
          </Grid>
          <Grid item md={2}>
          {  !isPaying
            ? (
            <Button
              fullWidth
              variant="contained"
              sx={{ bgcolor: 'yellow', color: 'black' }}
            >
              COBRANDO
            </Button>
          )
          :(
            <Button
              fullWidth
              variant="contained"
              sx={{ bgcolor: 'yellow', color: 'black' }}
            >
              CUENTA CORRIENTE
            </Button>
          )}
          </Grid>
        </Grid>


      </Box>

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

      <Box border={1} p={2} borderRadius={2} mt={1}>
      <Box border={1} p={2} borderRadius={2}>
        <Grid container spacing={2}>
          <Grid item md={4}>
            <Button
              fullWidth
              variant="contained"
              sx={{ bgcolor: 'yellow', color: 'black' }}
              onClick={placeCancelInvoiceHandler}
              disabled={cart.length === 0}
            >
              CANCELA
            </Button>
          </Grid>

          <Grid item md={4}>
            <Button
              fullWidth
              variant="contained"
              sx={{ bgcolor: 'yellow', color: 'black' }}
              // inputRef={input0Ref}
              onClick={placeInvoiceHandler}
              disabled={cart.length === 0 || !codCom || !codCus || !invDat || isloading}
            >
              GRABA ENTRADA
            </Button>
            {isloading && <FullScreenLoading />}
          </Grid>

          <Grid item md={4}>
            <Typography variant="h5" sx={{ textAlign: 'right' }}>Total: ${amountval.toFixed(2)}</Typography>
          </Grid>
        </Grid>
      </Box>

                {/* This is our table form */}
                <article>
                  <TableFormFac
                    terminado={terminado}
                    setTerminado={setTerminado}
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




      </Box>
    </Box>
        ) : (
          <>
          </>
        )}

      {/* </main>
    </> */}
    </AdminLayoutMenu>
  );
}

