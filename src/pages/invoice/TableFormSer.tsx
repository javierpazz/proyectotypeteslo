import React, { useContext, useState, useRef, useEffect } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
// import { v4 as uuidv4 } from 'uuid';




import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Modal,
  IconButton,
  Checkbox
} from '@mui/material';
import { ICartProduct, IProduct } from '../../interfaces';
import {ProductSelectorSer} from '../../../src/pages/crmpages/ProductSelectorSer';
import { CartContext } from '../../../context';
import { stutzApi } from '../../../api';
import { BiFileFind } from 'react-icons/bi';

type TableFormProps = {
  terminado: any;
  setTerminado: any;
  input0Ref: any;
  input8Ref: any;
  codPro: any;
  setCodPro: any;
  codigoPro: any;
  setCodigoPro: any;
  desPro: any;
  setDesPro: any;
  medPro: any;
  setMedPro: any;
  quantity: any;
  setQuantity: any;
  price: any;
  setPrice: any;
  porIva: any;
  setPorIva: any;
  amount: any;
  setAmount: any;
  list: any;
  setList: any;
  total: any;
  setTotal: any;
  // valueeR: any;
  desval: any;
  numval: any;
  isPaying: any;
};

// export const TableForm = (input0Ref,

export const TableFormSer: React.FC<TableFormProps> = ({
  terminado,
  setTerminado,
  input8Ref,
  codPro,
  setCodPro,
  codigoPro,
  setCodigoPro,
  desPro,
  setDesPro,
  medPro,
  setMedPro,
  quantity,
  setQuantity,
  price,
  setPrice,
  porIva,
  setPorIva,
  amount,
  setAmount,
  // list,
  // setList,
  // total,
  // setTotal,
  // isPaying
}) => {
  void terminado;

  const {  cart, addProductToCartEsc, removeCartProduct } = useContext(CartContext);



  const getTodayInGMT3 = () => {
    const now = new Date();
    // Convertimos a la hora de Argentina (GMT-3)
    const offset = now.getTimezoneOffset(); // En minutos
    const localDate = new Date(now.getTime() - (offset + 180) * 60 * 1000); // 180 = 3 horas
    
    return localDate.toISOString().split("T")[0];
  };


  const round2 = (num: number) => Math.round(num * 100 + Number.EPSILON) / 100; // 123.2345 => 123.23
  const input9Ref = useRef<HTMLInputElement>(null);
  const input10Ref = useRef<HTMLInputElement>(null);
  const input11Ref = useRef<HTMLButtonElement>(null);
  const input12Ref = useRef<HTMLButtonElement>(null);
  const input13Ref = useRef<HTMLButtonElement>(null);
  // const input14Ref = useRef<HTMLButtonElement>(null);
  const input22Ref = useRef<HTMLInputElement>(null);

  const isEditing = false;
  const [productss, setProductss] = useState<IProduct[]>([]);
  const [productR, setProductR] = useState<IProduct>();
  // const [showPro, setShowPro] = useState(false);
  const [codProd, setCodProd] = useState('');
//   const [medPro, setMedPro] = useState('');
  const [venDat, setVenDat] = useState(getTodayInGMT3());
  const [observ, setObserv] = useState('');
  const [termi, setTermi] = useState(false);
  const [stock, setStock] = useState(0);
  const [miStock, setMiStock] = useState(0);


useEffect(() => {
  const EntTerminada = cart.some(item => item.terminado === false);
  setTerminado(!EntTerminada);
}, [cart]);


  useEffect(() => {
    input8Ref.current.focus()
    const fetchData = async () => {
      
      try {
        // const { data } = await stutzApi.get(`/api/products/xpv?id_config=${id_config}`, {
        //   headers: { Authorization: `Bearer ${userInfo.token}` },
        // });
        const { data } = await stutzApi.get(`/api/products/`);
        setProductss(data);
        // dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {}
    };
    fetchData();
  }, []);

  // Calculate items amount function
  useEffect(() => {
    const calculateAmount = () => {
      setAmount(quantity * price);
    };
    calculateAmount();
  }, [codPro, amount, price, quantity, setAmount]);

    
    
  // const addToCartHandler = async (itemInv: ICartProduct) => {
  const addToCartHandler = async (productR:  IProduct) => {
    // if (amount <= 0) {unloadpayment();} else {
    quantity = round2(quantity);
    amount = round2(amount);
    price = round2(price);
    porIva = round2(porIva);

    if (codPro ) {
      // ctxDispatch({
        //   type: 'INVOICE_ADD_ITEM',
        //   payload: { ...itemInv, quantity, amount, price, porIva},
        // });
        const cartProduct: ICartProduct = {
          _id: codPro,
          codigoPro: codigoPro,
          image: productR.images[0],
          price: price,
          porIva: porIva,
          totalItem: price*quantity,
          medPro: productR.medPro,
          size: "M",
          slug: productR.slug,
          title: productR.title,
          gender: productR.gender,
          quantity : quantity,
            venDat: venDat,
            observ: observ,
            terminado: termi,
        };
          addProductToCartEsc( cartProduct as ICartProduct );
          input8Ref.current.focus()
    }
  // };
  };
  const terminadoSiNo = (itemInv: ICartProduct) => {
    input8Ref.current.focus()
    itemInv.terminado=!itemInv.terminado;
    addProductToCartEsc( itemInv as ICartProduct )
  };

  const removeItemHandler = (itemInv: ICartProduct) => {
      if (window.confirm('Esta seguro de Borrar?')) {
        input8Ref.current.focus()
        // ctxDispatch({ type: 'INVOICE_REMOVE_ITEM', payload: itemInv });
        removeCartProduct( itemInv as ICartProduct )
      }
  };

  // Edit function
  // const submitHandlerPro = async (e) => {
  //   e.preventDefault();
  //   setShowPro(false)
  //   input8Ref.current.focus()
  // };



  // const ayudaPro = (e: React.KeyboardEvent<HTMLDivElement>) => {
  //   e.key === "Enter" && buscarPorCodPro(codProd);
  //   e.key === "F2" && handleShowPro();
  // };
const ayudaPro = (e: React.KeyboardEvent<HTMLDivElement>) => {
  if (e.key === "Enter" || e.key === "Tab") {
    e.preventDefault();
    buscarPorCodPro(codProd);
  }
  if (e.key === "F2") {
    e.preventDefault();
    handleShowPro();
  }
};
  
  

  const buscarPorCodPro = (codProd: string) => {
    if (codProd==='') {
      // input0Ref.current.focus();
      input10Ref.current?.focus();
    } else {
    const productRow = productss.find((row) => (row.codPro === codProd || row.codigoPro === codProd));

    if (!productRow) {
        setCodPro('');
        setCodigoPro('');
        setCodProd('');
        setDesPro('Elija una Diligencia ');
        setMedPro('');
        // setVenDat('');
        setObserv('');
        setStock(0);
        setMiStock(0);
        setQuantity(0);
        setPrice(0);
        setPorIva(0);
        setAmount(0);
        setProductR(undefined);
      }else{
        setProductR(productRow);
        setCodPro(productRow._id);
        setCodigoPro(productRow.codigoPro);
        setCodProd(productRow.codPro);
        setDesPro(productRow.title);
        setMedPro(productRow.medPro);
        // setVenDat('');
        // setObserv('');
        // setQuantity(1);
        setPrice(productRow.price);
        setPorIva(productRow.porIva);
        setAmount(productRow.price);
        input9Ref.current?.focus()
        setCodProd('');
        setStock(productRow.inStock);
        setMiStock(productRow.minStock);

    };

    const linea = cart.find(p => p._id === productRow!._id);
        if (linea) {
              setObserv(linea.observ!);
              setVenDat(linea.venDat!);
              setPrice(linea.price);
              setQuantity(linea.quantity);
              setTermi(linea.terminado!);
            }

  };
  };



  const handleShowPro = () => {
    // setShowSup(true);
    setModalOpen(true)
    input22Ref.current?.focus();
  };



  const [modalOpen, setModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleSelect = (product: IProduct) => {

    setCodPro(product._id);
    setCodProd(product.codigoPro);
    setDesPro(product.title);
    setMedPro(product.medPro);
    input8Ref.current.focus()

    setModalOpen(false);
  };

  // Cerrar con Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {

        setModalOpen(false);
      }
    };

    if (modalOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [modalOpen]);


const handleClickOutside = (e: MouseEvent) => {
  if (modalRef.current && e.target instanceof Node && !modalRef.current.contains(e.target)) {
    setModalOpen(false);
  }
};



  useEffect(() => {
    if (modalOpen) {
      document.addEventListener('mousedown', handleClickOutside);



      
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalOpen]);

const stockControl = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const value = +e.target.value; // Convertimos a número

  setQuantity(e.target.value); // Siempre actualizamos el input

  if (value > stock) {
    toast.error('Este Producto no tiene stock');
  } else if (stock - value <= miStock) {
    toast.error('Este Producto tiene Minimo Stock');
  }
};




  return (
    <>
      <ToastContainer position="top-right" theme="colored" />

      <Box sx={{ border: '1px solid #ccc', padding: 2, borderRadius: 2}} mt={2}>
        <form>
          <Grid container spacing={2} alignItems="center">

            <Grid item md={1}>
              <TextField
                inputRef={input8Ref}
                // label="Diligencia"
                label="Tarea"
                placeholder="Tarea"
                fullWidth
                size="small"
                value={codProd}
                onChange={(e) => setCodProd(e.target.value)}
                onKeyDown={(e) => ayudaPro(e)}
                required
                autoComplete="off"
              />
            </Grid>

          <Grid item md={1} display="flex" alignItems="center">
              <Button
                variant="contained"
                startIcon={<BiFileFind />}
                onClick={handleShowPro}
                title="Buscador"
                sx={{  bgcolor: 'secondary.main' , color: 'white' }}
              >
                F2
              </Button>
            </Grid>

            <Grid item md={5}>
                  {/* <Typography variant="subtitle2">Producto</Typography> */}
                  <Typography variant="h6">{desPro}</Typography>
            </Grid>

            <Grid item md={1}>
              <TextField
                inputRef={input9Ref}
                label="Cantidad"
                type="number"
                fullWidth
              size="small"
                value={quantity}
                onChange={(e) => stockControl(e)}
                onKeyDown={(e) => e.key === "Enter" && input10Ref.current?.focus()}
                required
              />
            </Grid>

            <Grid item md={1}>
                  <Typography variant="h6">{medPro}</Typography>
            </Grid>

            <Grid item md={2}>
              <TextField
                inputRef={input10Ref}
                label="Precio"
                type="number"
                inputProps={{ step: '0.01' }} 
                fullWidth
              size="small"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && input11Ref.current?.focus()}
                required
              />
            </Grid>

          {/* <Grid item md={4}>
            <TextField
              fullWidth
              inputRef={input10Ref}
              label="Observaciones"
              placeholder="Observaciones"
              value={observ}
              onChange={(e) => setObserv(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && input11Ref.current?.focus()}
            />
          </Grid> */}

            <Grid item md={1}>
                  <Typography>{amount.toFixed(2)}</Typography>
            </Grid>




          <Grid item md={2}>
            <TextField
              fullWidth
              size="small"
              inputRef={input11Ref}
              type="date"
              label="Fecha Vencimiento"
              value={venDat}
              onChange={(e) => setVenDat(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && input12Ref.current?.focus()}
              required
            />
          </Grid>

          <Grid item md={9}>
            <TextField
              fullWidth
              size="small"
              inputRef={input12Ref}
              label="Observaciones"
              placeholder="Observaciones"
              value={observ}
              onChange={(e) => setObserv(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && input13Ref.current?.focus()}
            />
          </Grid>

            {/* <Grid item md={1}>
                  <Typography>{amount.toFixed(2)}</Typography>
            </Grid>
 */}
            <Grid item md={1}>
              <Button
                ref={input13Ref}
                variant="contained"
                color="warning"
                fullWidth
                sx={{  bgcolor: 'secondary.main' , color: 'white' }}
                onClick={() => addToCartHandler(productR as IProduct)}
              >
                {isEditing ? 'Editing Row Item' : 'Agrega'}
              </Button>
            </Grid>

          </Grid>
        </form>
             <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
          <Box
            ref={modalRef}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 800,
              bgcolor: 'background.paper',
              borderRadius: 2,
              boxShadow: 24,
              p: 2
            }}
          >
            <Box display="flex" justifyContent="flex-end">
              <Button onClick={() => setModalOpen(false)}>X</Button>
            </Box>
            <ProductSelectorSer onSelectPro={handleSelect} productss={productss} />
          </Box>
        </Modal>

      <Box border={1} p={2} borderRadius={2} mt={2}>
        {/* Tabla de items */}
        <table width="100%" className="mb-10">
          <thead>
            <tr>
              {/* <th>Codigo </th> */}
              <th>Descripción</th>
              <th>Cantidad</th>
              <th>Unidad</th>
              <th>Observaciones</th>
              <th>Vence</th>
              {/* <th>Precio</th> */}
              <th>Terminado</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((itemInv) => (
              <tr key={itemInv._id}>
                {/* <td>{itemInv.codigoPro}</td> */}
                <td>{itemInv.title}</td>
                <td style={{ textAlign: 'right' }}>{(itemInv.quantity.toFixed(2))}</td>
                <td>{itemInv.medPro}</td>
                <td>{itemInv.observ}</td>
                <td style={{ textAlign: 'center' }}>{itemInv.venDat?.substring(0, 10)}</td>
                {/* <td >{(itemInv.quantity * itemInv.price).toFixed(2)}</td> */}
                <td style={{ textAlign: 'center' }}>
                  <Checkbox
                    checked={itemInv.terminado}
                    onChange={() => terminadoSiNo(itemInv)}
                    color="success"
                  />
                {itemInv.terminado == true ? 'Si' : 'No'}
                </td>
                <td style={{ textAlign: 'center' }} >
                  <IconButton
                                     
                    color="error"
                    onClick={() => removeItemHandler(itemInv)}
                    // disabled={isPaying}
                  >
                    <AiOutlineDelete className="text-red-500 font-bold text-xl" />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </Box>
      </Box>
    </>
  );
}
