import { useContext, useState, useRef, useEffect } from 'react';
// import { toast } from 'react-toastify';
import {TableFormFac} from './TableFormFac';
import { AuthContext, CartContext } from '../../../context';
import {
  Box,
  Button,
  Typography,
  Grid,
  TextField,
} from '@mui/material';
import { stutzApi } from '../../../api';
import {  ICustomer, IInvoice,  IValue } from '../../interfaces';
import { AdminLayoutMenu } from '../../components/layouts';
import { CategoryOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { FullScreenLoading } from '../../components/ui';
import { BuscaCli } from '../../components/buscador';

// const getError = (error:any) => {
//   return error.response && error.response.data.message
//     ? error.response.data.message
//     : error.message;
// };

export const AppRem = () => {

    ////////////////////FGFGFGFG
    const { user, isLoading } = useContext(AuthContext);
    const navigate = useNavigate()

    useEffect(() => {
        if (!user && !isLoading) {
        navigate('/auth/loginadm?redirect=/admin/remiter');
        }
        if (user?.role === "client" ) {
        navigate('/');
        }
    }, [user, isLoading, navigate]);
    ////////////////////FGFGFGFG    
    


        const userInfo = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo')!)
    : null;


  // const { state, dispatch: ctxDispatch } = useContext(Store);
    const {  cart, createParam } = useContext(CartContext);
    
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
            paymentMethod: "",

        }              




  const input3Ref = useRef<HTMLInputElement>(null);
  const input4Ref = useRef<HTMLInputElement>(null);
  const input5Ref = useRef<HTMLInputElement>(null);
  const input7Ref = useRef<HTMLInputElement>(null);
  const input8Ref = useRef<HTMLInputElement>(null);
  const input0Ref = useRef<HTMLInputElement>(null);
  const inputCusRef = useRef<HTMLInputElement>(null);


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
  const [codComt, setCodComt] = useState('');
  const [codCus, setCodCus] = useState('');
  const [codCust, setCodCust] = useState('');
  const [nameCus, setNameCus] = useState('');
  const [codVal, setCodVal] = useState('');
  const [codValo, setCodValo] = useState('');
  const [codval, setCodval] = useState('');
  const [invNum, setInvNum] = useState("");
  const [remNum, setRemNum] = useState("");
  const [remDat, setRemDat] = useState(getTodayInGMT3());
  const [recNum, setRecNum] = useState(0);
  const [recDat, setRecDat] = useState(getTodayInGMT3());
  const [desval, setDesval] = useState('');
  const [valueeR, setValueeR] = useState<IValue>();
  const [desVal, setDesVal] = useState('');
  const [numval, setNumval] = useState(' ');
  // const [userss, setUserss] = useState([]);
  const [customers, setCustomers] = useState<ICustomer[]>([]);
  const [valuees, setValuees] = useState([]);
  const [codPro, setCodPro] = useState('');
  const [codigoPro, setCodigoPro] = useState('');
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
  const [width] = useState(641);
  const [showInvoice, setShowInvoice] = useState(false);

  const [isPaying, setIsPaying] = useState(false);
  const [isloading, setIsloading] = useState(false);




  const [modalOpenCus, setModalOpenCus] = useState(false);
  const [modalOpenIns, setModalOpenIns] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

void
codComt,
codValo,
codval,
setRemDat,
valueeR,
setCustomers,
valuees,
codVal,
invNum,
setRecNum,
setRecDat;


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
    inputCusRef.current?.focus()
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

  const stockHandler = async (item: any) => {
    // console.log(item.item._id);

    try {
      await stutzApi.put(
        `/api/products/downstock/${item.item._id}`,
        {
          quantitys: item.item.quantity,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
    } catch (err) {
    }
  };


  const placeInvoiceHandler = async () => {
      if (window.confirm('Esta seguro de Grabar?')) {
      if (isPaying && (!recNum || !recDat || !desVal)) {
        unloadpayment();
      } else {
        
        if (remDat && codCus) {
          cart.map((item) => stockHandler({ item }));
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
        //   invoice.codCom = codCom;
        //   invoice.isHaber = comprob!.isHaber;
        //   invoice.geRem = geRem;
          
          invoice.codSup = undefined;
          invoice.remNum = +remNum;
          invoice.remDat = remDat;
          invoice.dueDat = dueDat;
          invoice.invNum = 0;
          invoice.invDat = undefined;
          invoice.recNum = 0;
          // invoice.recDat = null;
          invoice.recDat = "";
          invoice.recDat = undefined;
          invoice.desVal = desVal;
          invoice.notes = notes;
          invoice.salbuy = 'SALE';
          /////////
        //   if (!isPaying) {
        //     receiptB.recNum = recNum;
        //     receiptB.recDat = recDat;
        //     } else {
        //       receiptB.recNum = 0;
        //       // receiptB.recDat = null;
        //       receiptB.recDat = "";
        //     }

        //     receiptB.receiptItems = [{
        //       _id: codval,
        //       valuee: codval,
        //       desval: desval,
        //       numval: numval,
        //       amountval: amountval,
        //     }];


        //     receiptB.subTotal = invoice.subTotal;
        //     receiptB.total = invoice.total;
        //     receiptB.totalBuy = invoice.totalBuy;
        //     receiptB.codCus = invoice.codCus;
        //     receiptB.codCon = invoice.codCon;
        //     receiptB.user = userInfo.user._id,
        //     receiptB.codConNum = invoice.codConNum;
        //     receiptB.codSup = undefined;
        //     receiptB.desVal = desVal;
        //     receiptB.notes = invoice.notes;
        //     receiptB.salbuy = 'SALE';
            
            /////////
            orderHandler();
          clearitems();
        }
      }
    };
  };


  const orderHandler = async () => {
    try {
      setIsloading(true);
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

          codCus: invoice.codCus,
          codCon: invoice.codCon,
          user: userInfo.user._id,
          codConNum: invoice.codConNum,

          //        codSup: invoice.codSup,

          remNum: invoice.remNum,
          remDat: invoice.remDat,
          invNum: invoice.invNum,
          invDat: invoice.invDat,
          dueDat: invoice.dueDat,
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
      setIsloading(false);

      setIsPaying(false);
      navigate(`/admin/invoicerRemCon/${data.invoice._id}?redirect=/admin/remiter`);
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




  const clearitems = () => {
    inputCusRef.current?.focus()
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
                    <Typography variant="h1">REMITO DE VENTA</Typography>
          </Grid>
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

        </Grid>



        <Grid container spacing={2} mt={0}>
          <Grid item md={2}>
            <TextField
              fullWidth
              size="small"
              type="number"
              inputRef={input3Ref}
              label="Remito N°"
              placeholder="Remito N°"
              value={remNum}
              onChange={(e) => setRemNum(e.target.value)}
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
              size="small"
              inputRef={input5Ref}
              type="date"
              label="Fecha Vencimiento"
              value={dueDat}
              onChange={(e) => setDueDat(e.target.value)}
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


      </Box>

          {/* <Grid item md={1} display="flex" alignItems="center">
            <Button
              onClick={handleShowCus}
              variant="contained"
              startIcon={<BiFileFind />}
              sx={{  bgcolor: 'secondary.main' , color: 'white' }}
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
              sx={{  bgcolor: 'secondary.main' , color: 'white' }}
              onClick={placeCancelInvoiceHandler}
              disabled={cart.length === 0 }
            >
              CANCELA
            </Button>
          </Grid>

          <Grid item md={4}>
            <Button
              fullWidth
              variant="contained"
              sx={{  bgcolor: 'secondary.main' , color: 'white' }}
              // inputRef={input0Ref}
              onClick={placeInvoiceHandler}
              disabled={cart.length === 0 || !codCus || !remDat || isloading}
            >
              GRABA REMITO
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
                    codigoPro={codigoPro}
                    setCodigoPro={setCodigoPro}
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

