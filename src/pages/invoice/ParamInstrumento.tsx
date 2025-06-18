import { useContext, useState, useRef, useEffect } from 'react';
import Cookie from 'js-cookie';
import { toast } from 'react-toastify';
import {TableFormEscPar} from './TableFormEscPar';
import { BiFileFind } from "react-icons/bi";
import { AuthContext, CartContext } from '../../../context';
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
import { ICartProduct, IInstrumento } from '../../interfaces';
import { AdminLayoutMenu } from '../../components/layouts';
import { CategoryOutlined } from '@mui/icons-material';
import { InstrumentoSelector } from '../crmpages/InstrumentoSelector';
import { useNavigate } from 'react-router-dom';
import { FullScreenLoading } from '../../components/ui';

const getError = (error:any) => {
  return error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
};

export const ParamInstrumento = () => {
    ////////////////////FGFGFGFG
    const { user, isLoading } = useContext(AuthContext);
    const navigate = useNavigate()

    useEffect(() => {
        if (!user && !isLoading) {
        navigate('/auth/login?redirect=/admin/mesaen/paraminstrumento');
        }
    }, [user, isLoading, navigate]);
    ////////////////////FGFGFGFG    


    const userInfo = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo')!)
    : null;



  // const { state, dispatch: ctxDispatch } = useContext(Store);
    const {  cart, removeCart, addTodosProductToCartEscPar, createParam } = useContext(CartContext);
    
        const body = {
            orderItems: cart.map( p => ({
                ...p,
                size: p.size!
            })),

            _id: "",
        }              

  

    // useEffect(() => {
    // if ( isLoaded) {
    // }
    // }, [isLoaded, cart])

    // if(!isLoaded ){
    //     return (<></>);
    // }


  const input2Ref = useRef<HTMLInputElement>(null);
  const input8Ref = useRef<HTMLInputElement>(null);
  const input0Ref = useRef<HTMLInputElement>(null);

  const input21Ref = useRef<HTMLInputElement>(null);

  const [showCus, setShowCus] = useState(false);


  // const [codUse, setCodUse] = useState('');
  const [codIns, setCodIns] = useState('');
  const [codInst, setCodInst] = useState('');
  const [nameIns, setNameIns] = useState('');
  const [desval, setDesval] = useState('');
  const [valueeR, setValueeR] = useState('');
  const [numval, setNumval] = useState(' ');
  // const [userss, setUserss] = useState([]);
  const [instrumentos, setInstrumentos] = useState<IInstrumento[]>([]);
  const [instrumento, setInstrumento] = useState<IInstrumento>();
  const [codPro, setCodPro] = useState('');
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



  useEffect(() => {
    const calculateAmountval = () => {
      setAmountval(
        cart?.reduce((a, c) => a + (c.quantity * c.price * (1+(c.porIva/100))), 0)
      );
    };
    if (numval === '') {
      setNumval(' ');
    }
    setCodIns(codIns);
    calculateAmountval();
  }, [cart]);

    useEffect(() => {
      if (instrumentos) {
        removeCart();
        setValueeR("");
        setShowInvoice(false);
      }
    }, [instrumentos]);


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


  // const handleShowIns = () => {
  //   setShowCus(true);
  //   input21Ref.current?.focus();
  // };


  
  // const ayudaIns = (e: React.KeyboardEvent<HTMLDivElement>) => {
  //   e.key === "Enter" && buscarPorCodIns(codInst);
  //   e.key === "F2" && handleShowIns();
  //   e.key === "Tab" && buscarPorCodIns(codInst);
  // };
  

  // const buscarPorCodIns = (codInst: string) => {
  //   const instRow = instrumentos.find((row) => row.codIns === codInst);
  //   if (!instRow) {
  //       setCodIns('');
  //       setCodInst('');
  //       setName('Elija Instrumento');
  //   }else{
  //     setInstrumento(instRow);
  //     addTodosProductToCartEsc(instRow.orderItems as ICartProduct[]);
  //     setCodIns(instRow._id);
  //     setCodInst(instRow.codIns);
  //     setName(instRow.name);
  //     input8Ref.current?.focus();
  //     };
  // };
  
/////////////////consulta instrumento
  const [modalOpenIns, setModalOpenIns] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Cerrar con Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setModalOpenIns(false);
      }
    };

    if (modalOpenIns) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [modalOpenIns]);


const handleClickOutside = (e: MouseEvent) => {
  if (modalRef.current && e.target instanceof Node && !modalRef.current.contains(e.target)) {
    setModalOpenIns(false);
  }
};



  useEffect(() => {
    if (modalOpenIns) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalOpenIns]);
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
      addTodosProductToCartEscPar(instRow.orderItems as ICartProduct[]);

      setInstrumento(instRow);
      setCodIns(instRow._id);
      setCodInst(instRow.codIns);
      setNameIns(instRow.name);
      input8Ref.current?.focus();
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
  


  const placeCancelInvoiceHandler = async () => {
    clearitems();
    console.log("inicio")
  };

  const placeInstrumentoHandler = async () => {
      if (window.confirm('Esta seguro de Grabar?')) {
        if (codIns) {
           body._id = instrumento!._id;
           body.orderItems = cart.map( p => ({
                ...p,
                size: p.size!
            })),
          instrumentoHandler();
          clearitems();
          window.location.reload()
        }
    };
  };




  const instrumentoHandler = async () => {
    try {
        setIsloading(true);
        await stutzApi.put('/api/tes/admin/instrumentos/Det', 
          {
            body,
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
        setNumval(' ');
      setAmountval(0);
      //navigate(`/order/${data.order._id}`);
    } catch (err) {
      // dispatch({ type: 'CREATE_FAIL' });
      toast.error(getError(err));
    }
  };



  const clearitems = () => {
    input2Ref.current?.focus()
    createParam();
    setValueeR("");
    setCodInst("");
    setShowInvoice(false);
  };

  return (
    // <>
    //   <main>
    <AdminLayoutMenu 
        title={`Trabajos`} 
        subTitle={'Mantenimiento de Trabajos'}
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
                    <Typography variant="h1">PARAMETRIZA INSTRUMENTO</Typography>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
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
              Buscar
            </Button>
          </Grid>
          <Grid item md={8}>
            <Typography variant="h6">{nameIns}</Typography>
          </Grid>
        </Grid>

      </Box>

          {/* <Grid item md={1} display="flex" alignItems="center">
            <Button
              onClick={handleShowIns}
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
              disabled={ !codIns}
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
              onClick={placeInstrumentoHandler}
              disabled={ !codIns || isloading }
            >
              GRABA PARAMETROS
            </Button>
            {isloading && <FullScreenLoading />}
          </Grid>

          <Grid item md={4}>
            <Typography variant="h5">Valor: ${amountval.toFixed(2)}</Typography>
          </Grid>
        </Grid>
                {/* This is our table form */}
                <article>
                  <TableFormEscPar
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
          </>
        )}

      {/* </main>
    </> */}
    </AdminLayoutMenu>
  );
}

