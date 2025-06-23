import { useContext, useState, useRef, useEffect } from 'react';
import {Header} from './Header';
import { toast } from 'react-toastify';
import {TableFormEscVal} from './TableFormEscVal';
import { BiFileFind } from "react-icons/bi";
import { AuthContext, CartContext } from '../../../context';
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
  Modal,
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
import { ICartProduct, ICustomer, IInstrumento, IOrder, IParte } from '../../interfaces';
import { AdminLayoutMenu } from '../../components/layouts';
import { CategoryOutlined } from '@mui/icons-material';
import { CustomerSelector } from '../crmpages/CustomerSelector';
import { InstrumentoSelector } from '../crmpages/InstrumentoSelector';
import { useNavigate, useParams } from 'react-router-dom';
import { FullScreenLoading } from '../../components/ui';
import { BuscaPar } from '../../components/buscador';

const getError = (error:any) => {
  return error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
};

export const MesaEntradaVal = () => {
  
    ////////////////////FGFGFGFG
    const { user, isLoading } = useContext(AuthContext);
    const navigate = useNavigate()

    useEffect(() => {
        if (!user && !isLoading) {
        navigate('/auth/login?redirect=/admin/mesaentradaVal');
        }
    }, [user, isLoading, navigate]);
    ////////////////////FGFGFGFG    

    const userInfo = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo')!)
    : null;

  

  // const { state, dispatch: ctxDispatch } = useContext(Store);
    const {  cart, addTodosProductToCartEscPar } = useContext(CartContext);
    
        const OrderI: IOrder = {
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
            id_parte : undefined,
            id_instru : "",
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

   const [invoice, setInvoice] = useState(OrderI);
   const params = useParams();
   const { id } = params;


   useEffect(() => {
      loadProduct()
    }, [])


      const loadProduct = async() => {
          try {
              const resp = await stutzApi.get<IOrder>(`/api/tes/orders/getorderbyid/${ id }`);
                  OrderI._id = resp.data._id;
                  OrderI.user = resp.data.user;
                  OrderI.orderItems = resp.data.orderItems;
                  OrderI.shippingAddress = resp.data.shippingAddress;
              //    paymentResult: '';
                  OrderI.shippingPrice=  resp.data.shippingPrice;
                  OrderI.numberOfItems= resp.data.numberOfItems;
                  OrderI.subTotal     = resp.data.subTotal;
                  OrderI.tax          = resp.data.tax;
                  OrderI.total        = resp.data.total;
                  OrderI.totalBuy     = resp.data.totalBuy;
                  OrderI.id_client    = resp.data.id_client;
                  OrderI.id_parte    = resp.data.id_parte;
                  OrderI.id_instru    = resp.data.id_instru;
                  OrderI.id_config      = resp.data.id_config;
                  OrderI.codConNum       = resp.data.codConNum;
                  OrderI.codSup          = resp.data.codSup;
                  OrderI.remNum          = resp.data.remNum;
                  OrderI.remDat          = resp.data.remDat;
                  OrderI.dueDat          = resp.data.dueDat;
                  OrderI.notes          = resp.data.notes;
                  OrderI.libNum          = resp.data.libNum;
                  OrderI.folNum          = resp.data.folNum;
                  OrderI.asiNum          = resp.data.asiNum;
                  OrderI.asiDat          = resp.data.asiDat;
                  OrderI.escNum          = resp.data.escNum;
                  OrderI.asieNum           = resp.data.asieNum;
                  OrderI.asieDat   = resp.data.asieDat;
                  OrderI.terminado          = resp.data.terminado;
                  OrderI.paidAt          = resp.data.paidAt;
           addTodosProductToCartEscPar(invoice.orderItems as ICartProduct[]);
           setInvoice(OrderI);

            setCodInst((invoice.id_instru as IInstrumento).codIns);
            setCodIns(invoice.id_instru as any);
            setNameIns((invoice.id_instru as IInstrumento).name);
            setCodCust((invoice.id_client as ICustomer).codCus);
            setCodCus(invoice.id_client as any);
            setNameCus((invoice.id_client as ICustomer).nameCus);
            setCodPart((invoice.id_parte as IParte).codPar);
            setCodPar(invoice.id_parte as any);
            setNamePar((invoice.id_parte as IParte).name);
            setRemNum(invoice.remNum as any) ;
            setRemDat(invoice.remDat!.substring(0, 10) as any);
            setDueDat(invoice.dueDat!.substring(0, 10) as any);
            setNotes(invoice.notes!);
            setLibNum(invoice.libNum as any);
            setFolNum(invoice.folNum as any);
            setAsiNum(invoice.asiNum as any);
            setAsiDat(invoice.asiDat!.substring(0, 10) as any);
            setEscNum(invoice.escNum as any);
            setAsieNum(invoice.asieNum as any);
            setAsieDat(invoice.asieDat!.substring(0, 10) as any);
            setTerminado(invoice.terminado as any);


          } catch (error) {
            console.log(error)
          }
         }
  

  
  const input2Ref = useRef<HTMLInputElement>(null);
  const input3Ref = useRef<HTMLInputElement>(null);
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
  const [codIns, setCodIns] = useState('');
  const [codInst, setCodInst] = useState('');
  const [nameIns, setNameIns] = useState('');
  const [codCus, setCodCus] = useState('');
  const [codCust, setCodCust] = useState('');
  const [nameCus, setNameCus] = useState('');
  const [codPar, setCodPar] = useState('');
  const [codPart, setCodPart] = useState('');
  const [namePar, setNamePar] = useState('');
  const [userObj, setUserObj] = useState<ICustomer>();
  const [remNum, setRemNum] = useState("");
  const [libNum, setLibNum] = useState("");
  const [folNum, setFolNum] = useState("");
  const [asiNum, setAsiNum] = useState("");
  const [asiDat, setAsiDat] = useState("");
  const [escNum, setEscNum] = useState("");
  const [asieNum, setAsieNum] = useState("");
  const [asieDat, setAsieDat] = useState("");
  const [remNumImp, setRemNumImp] = useState('');
  const [remDat, setRemDat] = useState(getTodayInGMT3());
  const [recNum, setRecNum] = useState('');
  const [recDat, setRecDat] = useState(getTodayInGMT3());
  const [desval, setDesval] = useState('');
  const [valueeR, setValueeR] = useState('');
  const [desVal, setDesVal] = useState('');
  const [numval, setNumval] = useState(' ');
  // const [userss, setUserss] = useState([]);
  const [instrumentos, setInstrumentos] = useState<IInstrumento[]>([]);
  const [instrumento, setInstrumento] = useState<IInstrumento>();
  const [customers, setCustomers] = useState<ICustomer[]>([]);
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

/////////////////consulta cliente
const handleShowCus = () => {
  setModalOpenCus(true);
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
        setNameCus('Elija Cliente');
    }else{
      setCodCus(usersRow._id);
      setCodCust(usersRow.codCust);
      setUserObj(usersRow);
      setNameCus(usersRow.nameCus);
      input6Ref.current?.focus();
      };
  };





  const [modalOpenCus, setModalOpenCus] = useState(false);
  const [modalOpenIns, setModalOpenIns] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleSelectCus = (customer: ICustomer) => {

    setCodCus(customer._id);
    setCodCust(customer.codCus);
    setNameCus(customer.nameCus);
    // input8Ref.current.focus()

    setModalOpenCus(false);
  };

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

const handleShowIns = () => {
    setModalOpenIns(true);
    // const instRow = instrumentos.find((row) => row.codIns === codInst);
    // if (instRow) {
    // addTodosProductToCartEsc(instRow.orderItems as ICartProduct[]);
    // };
  };

  
  const ayudaIns = (e: React.KeyboardEvent<HTMLDivElement>) => {
    e.key === "Enter" && buscarPorCodIns(codInst);
    e.key === "F2" && handleShowIns();
    e.key === "Tab" && buscarPorCodIns(codInst);
  };
  

  const buscarPorCodIns = (codInst: string) => {
    const instRow = instrumentos.find((row) => row.codIns === codInst);
    if (!instRow) {
        setCodIns('');
        setCodInst('');
        setNameIns('Elija Instrumento');
    }else{
      // cargaParametros(instRow.orderItems)
      // addTodosProductToCartEsc(instRow.orderItems as ICartProduct[]);

      setInstrumento(instRow);
      setCodIns(instRow._id);
      setCodInst(instRow.codIns);
      setNameIns(instRow.name);
      input3Ref.current?.focus();
      };
  };






  const handleSelectIns = (instrumento: IInstrumento) => {

    setCodIns(instrumento._id);
    setCodInst(instrumento.codIns);
    setNameIns(instrumento.name);
    // input8Ref.current.focus()

    setModalOpenIns(false);
  };

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
  }, [cart]);



  useEffect(() => {
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
    input2Ref.current?.focus()
    const fetchData = async () => {
      try {
        const { data } = await stutzApi.get(`/api/tes/admin/instrumentos`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        setInstrumentos(data);
      } catch (err) {}
    };
    fetchData();
  }, []);



  useEffect(() => {
    if (window.innerWidth < width) {
      alert('Place your phone in landscape mode for the best experience');
    }
  }, [width]);



  const placeCancelInvoiceHandler = async () => {
    clearitems();
    console.log("inicio")
  };

  const placeInvoiceHandler = async () => {
      if (window.confirm('Esta seguro de Grabar?')) {
      if (isPaying && (!recNum || !recDat || !desVal)) {
        unloadpayment();
      } else {
        if (true) {
          const round2 = (num: number) => Math.round(num * 100 + Number.EPSILON) / 100; // 123.2345 => 123.23
           invoice.orderItems = cart.map( p => ({
                ...p,
                size: p.size!
            })),
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
          invoice.id_parte = codPar;
              invoice.id_instru = codIns;
              invoice.libNum= +libNum;
              invoice.folNum= +folNum;
              invoice.asiNum= +asiNum;
              invoice.asiDat= asiDat;
              invoice.escNum= +escNum;
              invoice.asieNum= +asieNum;
              invoice.asieDat= asieDat;
              invoice.terminado= terminado;
          invoice.id_config = userInfo.codCon;
          invoice.user = userInfo._id,
          invoice.codConNum = codConNum;

          invoice.codSup = '0';
          invoice.remNum = +remNum;
          invoice.remDat = remDat;
          invoice.dueDat = dueDat;
          invoice.invNum = 0;
          invoice.invDat = "";
          invoice.recNum = 0;
          invoice.recDat = "";
          invoice.desVal = desVal;
          invoice.notes = notes;

          orderHandler();
          clearitems();
        }
      }
    };
  };




  const orderHandler = async () => {
    try {
      setIsloading(true);
      const { data } = await stutzApi.put(
        `/api/invoices/remModEsc/${invoice._id}`,

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
              codIns: invoice.id_instru,
              libNum : invoice.libNum,
              folNum : invoice.folNum,
              asiNum : invoice.asiNum,
              asiDat : invoice.asiDat,
              escNum : invoice.escNum,
              asieNum : invoice.asieNum,
              asieDat : invoice.asieDat,
              terminado : invoice.terminado,
          codCon: invoice.id_config,
          user: userInfo._id,
          codConNum: invoice.codConNum,

          //        codSup: invoice.codSup,

          remNum: invoice.remNum,
          remDat: invoice.remDat,
          dueDat: invoice.dueDat,
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
      setIsloading(false);
      setIsPaying(false);
      setDesval('');
      setDesVal('');
      // setRemNumImp(data.invoice.remNum);
      // setTotalSubImp(data.invoice.subTotal);
      // setTaxImp(data.invoice.tax);
      // setTotalImp(data.invoice.total);
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
    if (window.confirm('Cargo correctamente los Datos?')) {
    }
  };

  const clearitems = () => {
            navigate(`/admin/entrada/${invoice._id}?redirect=/admin/entradas`);
  }

  return (

    <>
      {!invoice ? (
        // <LoadingBox></LoadingBox>
        <></>
      // ) : error ? (
      //   <MessageBox variant="danger">{error}</MessageBox>
      ) : (

      <main>
    <AdminLayoutMenu 
        title={`Entredas`} 
        subTitle={'Generando Entredas'}
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
                    <Typography variant="h1">VALORIZA ENTRADA</Typography>
          </Grid>
        </Grid>

        <Grid container spacing={2} mt={2}>
          <Grid item md={2}>
            <TextField
              fullWidth
              inputRef={input2Ref}
              label={codInst === '' ? 'Código Instrumento' : ''}
              placeholder="Codigo Instrumento"
              value={codInst}
              onChange={(e) => setCodInst(e.target.value)}
              onKeyDown={(e) => ayudaIns(e)}
              required
            />
          </Grid>
          <Grid item md={1} display="flex" alignItems="center">
            <Button
              onClick={handleShowIns}
              variant="contained"
              startIcon={<BiFileFind />}
              sx={{ bgcolor: 'yellow', color: 'black' }}
            >
              Buscar F2
            </Button>
          </Grid>
          <Grid item md={4}>
            <Typography variant="h6">{nameIns}</Typography>
          </Grid>

          <Grid item md={1}>
            <TextField
              fullWidth
              type="number"
              label="Libro N°"
              placeholder="Libro N°"
              value={libNum}
              onChange={(e) => setLibNum(e.target.value)}
              // onKeyDown={(e) => e.key === "Enter" && input9Ref.current?.focus()}
              required
            />
          </Grid>
          <Grid item md={1}>
            <TextField
              fullWidth
              type="number"
              label="Folio N°"
              placeholder="Folio N°"
              value={folNum}
              onChange={(e) => setFolNum(e.target.value)}
              // onKeyDown={(e) => e.key === "Enter" && input9Ref.current?.focus()}
              required
              />
          </Grid>
          <Grid item md={1}>
            <TextField
              fullWidth
              type="number"
              label="Asiento N°"
              placeholder="Asiento N°"
              value={asiNum}
              onChange={(e) => setAsiNum(e.target.value)}
              // onKeyDown={(e) => e.key === "Enter" && input9Ref.current?.focus()}
              required
              />
          </Grid>
          <Grid item md={2}>
            <TextField
              fullWidth
              type="date"
              label="Fecha Asiento"
              value={asiDat}
              onChange={(e) => setAsiDat(e.target.value)}
              required
            />
          </Grid>



        </Grid>




        <Grid container spacing={2} mt={2}>




          <Grid item md={2}>
            <TextField
              fullWidth
              inputRef={input3Ref}
              label={codCust === '' ? 'Código Cliente' : ''}
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
              Buscar F2
            </Button>
          </Grid>
          <Grid item md={3}>
            <Typography variant="h6">{nameCus}</Typography>
          </Grid>
          <Grid item md={1}>
                <Typography></Typography>
          </Grid>
          <Grid item md={1}>
            <TextField
              fullWidth
              type="number"
              label="Instrumento N°"
              placeholder="Instrumento N°"
              value={escNum}
              onChange={(e) => setEscNum(e.target.value)}
              // onKeyDown={(e) => e.key === "Enter" && input9Ref.current?.focus()}
              required
              />
          </Grid>
          <Grid item md={1}>
            <TextField
              fullWidth
              type="number"
              label="Asiento N°"
              placeholder="Asiento N°"
              value={asieNum}
              onChange={(e) => setAsieNum(e.target.value)}
              // onKeyDown={(e) => e.key === "Enter" && input9Ref.current?.focus()}
              required
              />
          </Grid>
          <Grid item md={2}>
            <TextField
              fullWidth
              type="date"
              label="Fecha Asiento"
              value={asieDat}
              onChange={(e) => setAsieDat(e.target.value)}
              required
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} mt={2}>
            <BuscaPar
            codPar={codPar}
            setCodPar={setCodPar}
            namePar={namePar}
            setNamePar={setNamePar}
            />

        </Grid>



        <Grid container spacing={2} mt={2}>
          <Grid item md={2}>
            <TextField
              fullWidth
              type="number"
              inputRef={input6Ref}
              label="Entrada N°"
              placeholder="Entrada N°"
              value={remNum}
              onChange={(e) => setRemNum(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && input9Ref.current?.focus()}
              required
            />
          </Grid>
          <Grid item md={2}>
            <TextField
              fullWidth
              inputRef={input9Ref}
              type="date"
              label="Fecha Entrada"
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
              // disabled={cart.length === 0 || !remDat || !codCus}
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
              disabled={ !codCus || isloading}
            >
              GRABA ENTRADA
            </Button>
            {isloading && <FullScreenLoading />}
          </Grid>

          <Grid item md={4}>
            <Typography variant="h5">Total: ${amountval.toFixed(2)}</Typography>
          </Grid>
        </Grid>
                {/* This is our table form */}
                <article>
                  <TableFormEscVal
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


                {/* <Dialog
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
                </Dialog> */}
        <Modal open={modalOpenCus} onClose={() => setModalOpenCus(false)}>
          <Box
            ref={modalRef}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              borderRadius: 2,
              boxShadow: 24,
              p: 2
            }}
          >
            <Box display="flex" justifyContent="flex-end">
              <Button onClick={() => setModalOpenCus(false)}>X</Button>
            </Box>
            <CustomerSelector onSelectCus={handleSelectCus} customers={customers} />
          </Box>
        </Modal>

        <Modal open={modalOpenIns} onClose={() => setModalOpenIns(false)}>
          <Box
            ref={modalRef}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              borderRadius: 2,
              boxShadow: 24,
              p: 2
            }}
          >
            <Box display="flex" justifyContent="flex-end">
              <Button onClick={() => setModalOpenIns(false)}>X</Button>
            </Box>
            <InstrumentoSelector onSelectIns={handleSelectIns} instrumentos={instrumentos} />
          </Box>
        </Modal>


      </Box>
    </Box>
        ) : (
          <>
            <TypedReactToPrint
              trigger={() => <Button type="button">Print / Download</Button>}
              content={() => componentRef.current}
            />

            <Button onClick={() => clearitems()}>Nuevo Entrada</Button>

            {/* Invoice Preview */}

            <div ref={componentRef} className="p-5">
              <Header handlePrint={handlePrint} />

              <div className="container mt-4">
      <div className="card border-dark">
        <div className="card-header bg-dark text-white text-center"></div>
        <div className="card-body">
          
        <div className="card-header text-black text-center">TRABAJO</div>
        <div className="row">
            <div className="col-md-6">
              <p><strong>{userInfo.nameCon}</strong></p>
              <p><strong>Razon Social:</strong> {userInfo.nameCon}</p>
              <p><strong>Domicilio Comercial:</strong> {config.address}</p>
              <p><strong>Condición frente al IVA:</strong> {config.ivaCondition}</p>
            </div>
            <div className="col-md-6 ">
              <p><strong>TRABAJO</strong></p>
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
                  {invoice.orderItems.map((item, index) => (
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

        </AdminLayoutMenu>
      </main>
          )}
          </>

  );
}

