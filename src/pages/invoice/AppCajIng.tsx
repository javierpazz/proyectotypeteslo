import { useContext, useState, useRef, useEffect } from 'react';
// import { toast } from 'react-toastify';
import {TableFormRec} from './TableFormRec';
import { AuthContext, ReceiptContext } from '../../../context';
import {
  Box,
  Button,
  Typography,
  Grid,
  TextField,
} from '@mui/material';
import { stutzApi } from '../../../api';
import {  ICustomer, IReceipt, IValue } from '../../interfaces';
import { AdminLayoutMenu } from '../../components/layouts';
import { CategoryOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { FullScreenLoading } from '../../components/ui';
import { BuscaEnc } from '../../components/buscador';

// const getError = (error:any) => {
//   return error.response && error.response.data.message
//     ? error.response.data.message
//     : error.message;
// };

export const AppCajIng = () => {

    ////////////////////FGFGFGFG
    const { user, isLoading } = useContext(AuthContext);
    const navigate = useNavigate()

    useEffect(() => {
        if (!user && !isLoading) {
        navigate('/auth/loginadm?redirect=/admin/invoicerCajIng');
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
    const {  receipt, createParam  } = useContext(ReceiptContext);
    

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
            codSup : '',
            codEnc : '',
            
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
  const input7Ref = useRef<HTMLInputElement>(null);
  const input8Ref = useRef<HTMLInputElement>(null);
  const input0Ref = useRef<HTMLInputElement>(null);
  const inputEncRef = useRef<HTMLInputElement>(null);


  const codConNum = userInfo.configurationObj.codCon;

  const getTodayInGMT3 = () => {
    const now = new Date();
    // Convertimos a la hora de Argentina (GMT-3)
    const offset = now.getTimezoneOffset(); // En minutos
    const localDate = new Date(now.getTime() - (offset + 180) * 60 * 1000); // 180 = 3 horas
    
    return localDate.toISOString().split("T")[0];
  };

  // const [codUse, setCodUse] = useState('');
  const [codComt, setCodComt] = useState('');
  const [codEnc, setCodEnc] = useState('');
  const [codEnct, setCodEnct] = useState('');
  const [nameEnc, setNameEnc] = useState('');
  const [codVal, setCodVal] = useState('');
  const [codValo, setCodValo] = useState('');
  const [codval, setCodval] = useState('');
  const [cajNum, setCajNum] = useState("");
  const [cajDat, setCajDat] = useState(getTodayInGMT3());
  const [desval, setDesval] = useState('');
  const [valueeR, setValueeR] = useState<IValue>();
  const [desVal, setDesVal] = useState('');
  const [numval, setNumval] = useState(' ');
  // const [userss, setUserss] = useState([]);
  const [customers, setCustomers] = useState<ICustomer[]>([]);
  const [valuees, setValuees] = useState([]);
  const [notes, setNotes] = useState('');
  const [amount, setAmount] = useState(0);
  const [amountTotVal, setAmountTotVal] = useState(0);
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const [width] = useState(641);
  const [showInvoice, setShowInvoice] = useState(false);
  const [isloading, setIsloading] = useState(false);




  const [modalOpenCus, setModalOpenCus] = useState(false);
  const [modalOpenIns, setModalOpenIns] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

void
codComt,
codValo,
codval,
valueeR,
setCustomers,
valuees;


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
      setAmountTotVal(
        receipt?.reduce((a, c) => a + c.amountval, 0)
      );
    };
    if (numval === '') {
      setNumval(' ');
    }
    setCodEnc(codEnc);
    calculateAmountval();
    setDesVal(desVal);
    calculateAmountval();
    // addToCartHandler(valueeR);
  }, [receipt, numval, desval, cajNum, cajDat]);

    useEffect(() => {
      if (customers) {
        // setValueeR({});
        setShowInvoice(false);
      }
    }, [customers]);


  useEffect(() => {
    inputEncRef.current?.focus()
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



  const placeReceiptHandler = async () => {
      if (window.confirm('Esta seguro de Grabar?')) {
        if (cajDat && codEnc) {

        const round2 = (num:any) => Math.round(num * 100 + Number.EPSILON) / 100; // 123.2345 => 123.23
        receiptB.subTotal = round2(
          receiptB.receiptItems.reduce((a, c) => a + c.amountval * 1, 0)
        );
        receiptB.total = receiptB.subTotal;
        receiptB.totalBuy = 0;
        receiptB.codEnc = codEnc;
        receiptB.codCon = userInfo.codCon;
        receiptB.user = userInfo._id,
        receiptB.codConNum = codConNum;
        // receiptB.codSup = 0;
        receiptB.cajNum = +cajNum;
        receiptB.cajDat = cajDat;
        receiptB.desVal = desval;
        receiptB.notes = notes;

        orderHandler();
        // setShowReceipt(true);
        clearitems();
        }
      
    };
  };


  const orderHandler = async () => {
    try {
      setIsloading(true);
      // const { data } = await stutzApi.post(
      const { data } = await stutzApi.post(
        `/api/receipts/caja`,
        {
          receiptItems: receiptB.receiptItems,
          subTotal: receiptB.subTotal,
          total: receiptB.total,
          totalBuy: receiptB.totalBuy,

          codEnc: receiptB.codEnc,
          codCon: receiptB.codCon,
          user: userInfo.user._id,
          codConNum: receiptB.codConNum,

          //          supplier: receiptB.codSup,

          cajNum: receiptB.cajNum,
          cajDat: receiptB.cajDat,
          desval: receiptB.desVal,
          notes: receiptB.notes,
          salbuy: 'SALE',
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      setIsloading(false);
      navigate(`/admin/invoicerCajIngCon/${data.receipt._id}?redirect=/admin/invoicerCajIng`);

  } catch (error: any) {
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






  const clearitems = () => {
    inputEncRef.current?.focus()
    createParam();
    // setValueeR({});
    setCodComt("");
    setCodEnct("");
    setCajNum("");
    setNotes("");
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
                    <Typography variant="h1">INGRESO DE CAJA</Typography>
          </Grid>
        </Grid>



        <Grid container spacing={2} mt={0}>
            <BuscaEnc
            codEnc={codEnc}
            setCodEnc={setCodEnc}
            codEnct={codEnct}
            setCodEnct={setCodEnct}
            nameEnc={nameEnc}
            setNameEnc={setNameEnc}
            nextRef={input3Ref}
            inputRef={inputEncRef} 
            />

        </Grid>



        <Grid container spacing={2} mt={0}>
          <Grid item md={2}>
            <TextField
              fullWidth
              size="small"
              type="number"
              inputRef={input3Ref}
              label="Ing.Caja N°"
              placeholder="Ing.Caja N°"
              value={cajNum}
              onChange={(e) => setCajNum(e.target.value)}
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
              label="Fecha Recibo"
              value={cajDat}
              onChange={(e) => setCajDat(e.target.value)}
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
              disabled={receipt.length === 0 }
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
              onClick={placeReceiptHandler}
              disabled={receipt.length === 0 || !codEnc || !cajDat || isloading}
            >
              GRABA INGRESO
            </Button>
            {isloading && <FullScreenLoading />}
          </Grid>

          <Grid item md={4}>
            <Typography variant="h5" sx={{ textAlign: 'right' }}>Total: ${amountTotVal.toFixed(2)}</Typography>
          </Grid>
        </Grid>
      </Box>

                {/* This is our table form */}
                <article>
                  <TableFormRec
                    input0Ref={input0Ref}
                    input8Ref={input8Ref}
                    codVal={codVal}
                    setCodVal={setCodVal}
                    desVal={desVal}
                    setDesVal={setDesVal}
                    amount={amount}
                    setAmount={setAmount}
                    list={list}
                    setList={setList}
                    total={total}
                    setTotal={setTotal}
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

