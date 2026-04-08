import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import { ShopLayout } from '../../components/layouts';
import { ICartProduct, IOrder, IParamProduct } from '../../interfaces';

import stutzApi from '../../../api/stutzApi';
import { FullScreenLoading } from '../../components/ui';
import { AuthContext, CartContext } from '../../../context';


const instrumentoI = 
      {
          _id: '',
          name: "",
          paramItems: []
      }
    


export const NameInstrumento = () => {

  const navigate = useNavigate();

    ////////////////////FGFGFGFG
    const { user, isLoading } = useContext(AuthContext);
  const getTodayInGMT3 = () => {
    const now = new Date();
    // Convertimos a la hora de Argentina (GMT-3)
    const offset = now.getTimezoneOffset(); // En minutos
    const localDate = new Date(now.getTime() - (offset + 180) * 60 * 1000); // 180 = 3 horas
    
    return localDate.toISOString().split("T")[0];
  };


  const [instrumento, setInstrumento] = useState(instrumentoI);
  const params = useParams();
  const { _id } = params;

  const [remDat] = useState(getTodayInGMT3());
  const [isPaying, setIsPaying] = useState(false);
  const [recNum, setRecNum] = useState('');
  const [recDat, setRecDat] = useState(getTodayInGMT3());
  const [desval, setDesval] = useState('');
  const [desVal, setDesVal] = useState('');
  const [codCus, setCodCus] = useState(localStorage.getItem('cliente'));
  const [codIns, setCodIns] = useState(_id);
  const [codPar, setCodPar] = useState('');
  const [terminado, setTerminado] = useState(false);
  const [dueDat, setDueDat] = useState(getTodayInGMT3());
  const [remNum, setRemNum] = useState("");
  const [notes, setNotes] = useState('');

  const [libNum, setLibNum] = useState("");
  const [folNum, setFolNum] = useState("");
  const [asiNum, setAsiNum] = useState("");
  const [asiDat, setAsiDat] = useState("");
  const [escNum, setEscNum] = useState("");
  const [asieNum, setAsieNum] = useState("");
  const [asieDat, setAsieDat] = useState("");
  const [codCust, setCodCust] = useState('');
  const [codPart, setCodPart] = useState('');
  const [namePar, setNamePar] = useState('');
  const [nameCus, setNameCus] = useState('');
  const [codInst, setCodInst] = useState('');
  const [isloading, setIsloading] = useState(false);
  const [remNumImp, setRemNumImp] = useState('');
  const [numval, setNumval] = useState(' ');
  const [amountval, setAmountval] = useState(0);
  const [totalImp, setTotalImp] = useState(0);
  const [valueeR, setValueeR] = useState('');
  const [showInvoice, setShowInvoice] = useState(false);

    useEffect(() => {
        if (!user && !isLoading) {
        navigate('/auth/login?redirect=/');
        }
        if (user?.role !== "client" ) {
        navigate('/');
        }
    }, [user, isLoading, navigate]);
    ////////////////////FGFGFGFG    



        const userInfo = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo')!)
    : null;  

    // const codConNum = (localStorage.getItem('puntonum') && localStorage.getItem('puntonum') || "");
    // const codConNum = Number(localStorage.getItem('puntonum') || 0);  
    const codConNum = userInfo.configurationObj.codCon;
  
  
  
  const {  cart, addTodosProductToCartEsc } = useContext(CartContext);

        const invoice: IOrder = {
            orderItems: cart.map( p => ({
                ...p,
                size: p.size!
            })),
            orderAddress: {
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
            supplier : '0',
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





  
  useEffect(() => {
    loadProduct()
   }, [])

  const clearitems = () => {

  setLibNum("");
  setFolNum("");
  setAsiNum("");
  setAsiDat("");
  setEscNum("");
  setAsieNum("");
  setAsieDat("");
  setCodPart("");
  setCodInst("");
  setNotes("");


    setValueeR("");
    setCodCust("");
    setRemNum("");
    setShowInvoice(false);
  };


  const loadProduct = async() => {
    try {
      // const resp = await stutzApi.get<IProduct>(`/api/tes/instrumentos/${ slug }`);
      const resp = await stutzApi.get(`/api/tes/admin/instrumentos/${ _id }`);
      // console.log("resp.data")
      // console.log(resp)
      // console.log("resp.data")
      
      // setInstrumento(resp.data);
      setInstrumento({
                _id: resp.data._id,
                name: resp.data.name,
                paramItems: resp.data.paramItems,
      }
      );
      addTodosProductToCartEsc(resp.data.paramItems as IParamProduct[], remDat);


      // console.log("resp.data")
      // console.log(instrumento)
      // console.log("resp.data")
      // console.log(remDat)

    } catch (error) {
      // console.log(error)
      
    }
   }
 
  const unloadpayment = async () => {
    if (window.confirm('Cargo correctamente los Datos?')) {
    }
  };


  const placeInvoiceHandler = async () => {
      if (window.confirm('Esta seguro de Grabar?')) {
      if (isPaying && (!recNum || !recDat || !desVal)) {
        unloadpayment();
      } else {
        console.log(remDat)
        console.log(codCus)
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
          invoice.id_client = codCus;
              (codPar) ? invoice.id_parte = codPar : null;
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
          invoice.user = userInfo.user._id;
          invoice.codConNum = codConNum;

          invoice.supplier = '0';
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
      const { data } = await stutzApi.post(
        `/api/invoices/remEsc`,

        {
          orderItems: invoice.orderItems,
          orderAddress: invoice.orderAddress,
          paymentMethod: invoice.paymentMethod,
          subTotal: invoice.subTotal,
          shippingPrice: invoice.shippingPrice,
          tax: invoice.tax,
          total: invoice.total,
          totalBuy: invoice.totalBuy,

          codCus: invoice.id_client,
              codPar: invoice.id_parte,
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
          user: userInfo.user._id,
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
      setRemNumImp(data.invoice.remNum);
      // setTotalSubImp(data.invoice.subTotal);
      // setTaxImp(data.invoice.tax);
      setTotalImp(data.invoice.total);
      setRecNum('');
      setRecDat('');
      setNumval(' ');
      setAmountval(0);
      navigate(`/pedidoservice`);
    // } catch (err) {
    //   toast.error(getError(err));
    // }
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
  }

  };

  

   if (!instrumento)  return <FullScreenLoading/>
  
    return (
      <ShopLayout title={ instrumento.name } pageDescription={ instrumento.name }>
      
        <Grid container spacing={3}>
  
  
          <Grid item xs={ 12 } sm={ 5 }>
            <Box display='flex' flexDirection='column'>
  
              {/* titulos */}
              <Typography variant='h3' component='h1'>{ instrumento.name }</Typography>
  
  
  
              {/* Descripción */}
              <Box sx={{ mt:3 }}>
              {/* titulos */}
              <Typography variant='h1' component='h1'>Descripción</Typography>
                {/* <Typography variant='body2'>{ instrumento.paramItems[1].medPro }</Typography>
                <Typography variant='body2'>{ instrumento.paramItems[2].medPro }</Typography>
                <Typography variant='body2'>{ instrumento.paramItems[3].medPro }</Typography> */}

                {instrumento.paramItems.map((item: any, index: number) => (
                  <Typography key={index} variant='body2'>
                    {item.medPro} {/* o la propiedad que quieras mostrar */}
                  </Typography>
                ))}
              </Box>
                    <Button 
                    color="secondary" 
                    className='circular-btn'
                    onClick={placeInvoiceHandler}
                  >
                  Genera Orden Servicio
                  </Button>
            </Box>
          </Grid>
  
  
        </Grid>

    <Box my={3}>


    </Box>  
      </ShopLayout>
    )
  }
    