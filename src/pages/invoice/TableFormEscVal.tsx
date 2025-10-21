import React, { useContext, useState, useRef, useEffect } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
// import { v4 as uuidv4 } from 'uuid';
import { ToastContainer } from 'react-toastify';
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
import {ProductSelectorEsc} from '../../../src/pages/crmpages/ProductSelectorEsc';
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

export const TableFormEscVal: React.FC<TableFormProps> = ({
  terminado,
  setTerminado,
  input8Ref,
  codPro,
  setCodPro,
  codigoPro,
  setCodigoPro,
  desPro,
  setDesPro,
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

  console.log(terminado)
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
  const input22Ref = useRef<HTMLInputElement>(null);

  const isEditing = false;
  const [productss, setProductss] = useState<IProduct[]>([]);
  const [productR, setProductR] = useState<IProduct>();
  // const [stock, setStock] = useState(0);
  // const [miStock, setMiStock] = useState(0);
  // const [showPro, setShowPro] = useState(false);
  const [codProd, setCodProd] = useState('');
//   const [medPro, setMedPro] = useState('');
  const [venDat, setVenDat] = useState(getTodayInGMT3());
  const [observ, setObserv] = useState('');
  const [termi, setTermi] = useState(false);

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
    
    checkterminado()
    calculateAmount();
  }, [codPro, amount, price, quantity, setAmount]);

  // Submit form function
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   addToCartHandler();
  // };
  const checkterminado = async () => {

    const haysinterminar = cart.some(item => item.terminado === false);

    if (haysinterminar) {
      const newter = false
      setTerminado(newter);
    } else {
      const newter = true
      setTerminado(newter);
    }
    };
    
    
  // const addToCartHandler = async (itemInv: ICartProduct) => {
  const addToCartHandler = async (productR:  IProduct) => {
    // if (amount <= 0) {unloadpayment();} else {
    quantity = round2(quantity);
    amount = round2(amount);
    price = round2(price);
    porIva = round2(porIva);

    if (codPro && quantity > 0) {
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
          checkterminado();
          input8Ref.current.focus()
    }
  // };
  };
  const terminadoSiNo = (itemInv: ICartProduct) => {
    input8Ref.current.focus()
    itemInv.terminado=!itemInv.terminado;
    addProductToCartEsc( itemInv as ICartProduct )
    checkterminado();
  };

  const removeItemHandler = (itemInv: ICartProduct) => {
      if (window.confirm('Esta seguro de Borrar?')) {
      input8Ref.current.focus()
      // ctxDispatch({ type: 'INVOICE_REMOVE_ITEM', payload: itemInv });
      removeCartProduct( itemInv as ICartProduct )
      }
  checkterminado();
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
        setDesPro('Elija un Diligencia');
        // setVenDat('');
        setObserv('');
        setQuantity(0);
        setPrice(0);
        setPorIva(0);
        setAmount(0);
        // setStock(0);
        setProductR(undefined);
        // setMiStock(0);
      }else{
        setProductR(productRow);
        setCodPro(productRow._id);
        setCodigoPro(productRow.codigoPro);
        setCodProd(productRow.codPro);
        setDesPro(productRow.title);
        // setVenDat('');
        // setObserv('');
        setQuantity(1);
        setPrice(productRow.price);
        setPorIva(productRow.porIva);
        setAmount(productRow.price);
        // setStock(productRow.inStock);
        // setMiStock(productRow.minStock);
        // setTempCartProduct({_id: productRow._id,
        //   image: productRow.images[0],
        //   price: productRow.price,
        //   porIva: productRow.porIva,
        //   medPro: productRow.medPro,
        //   size: "M",
        //   slug: productRow.slug,
        //   title: productRow.title,
        //   gender: productRow.gender,
        //   quantity : 1,
        //     venDat: venDat,
        //     observ: observ,
        //     terminado: false,
        // });
        input9Ref.current?.focus()
        setCodProd('');
    };

        const linea = cart.find(p => p._id === productRow!._id);
        if (linea) {
              setObserv(linea.observ!);
              setVenDat(linea.venDat!);
              setPrice(linea.price);
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
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleSelect = (product: IProduct) => {
    setSelectedProduct(product);

    setCodPro(selectedProduct!._id);
    setCodProd(product.codigoPro);
    setDesPro(product.title);
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
                label="Diligencia"
                placeholder="Diligencia"
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

            <Grid item md={4}>
                  {/* <Typography variant="subtitle2">Producto</Typography> */}
                  <Typography variant="h6">{desPro}</Typography>
            </Grid>

            <Grid item md={1}>
              <TextField
                inputRef={input9Ref}
                label="Precio"
                type="number"
                inputProps={{ step: '0.01' }} 
                fullWidth
              size="small"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && input10Ref.current?.focus()}
                required
              />
            </Grid>

          <Grid item md={4}>
            <TextField
              fullWidth
              size="small"
              inputRef={input10Ref}
              label="Observaciones"
              placeholder="Observaciones"
              value={observ}
              onChange={(e) => setObserv(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && input11Ref.current?.focus()}
            />
          </Grid>

            {/* <Grid item md={1}>
                  <Typography>{amount.toFixed(2)}</Typography>
            </Grid>
 */}
            <Grid item md={1}>
              <Button
                ref={input11Ref}
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
            <ProductSelectorEsc onSelectPro={handleSelect} productss={productss} />
          </Box>
        </Modal>

      <Box border={1} p={2} borderRadius={2} mt={2}>
        {/* Tabla de items */}
        <table width="100%" className="mb-10">
          <thead>
            <tr>
              <th>Codigo Dil.</th>
              <th>Descripción</th>
              <th>Observaciones</th>
              {/* <th>Vence</th> */}
              <th>Precio</th>
              <th>Terminado</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((itemInv) => (
              <tr key={itemInv._id}>
                <td>{itemInv.codigoPro}</td>
                <td>{itemInv.title}</td>
                <td>{itemInv.observ}</td>
                {/* <td style={{ textAlign: 'center' }}>{itemInv.venDat}</td> */}
                <td style={{ textAlign: 'right' }} >{(itemInv.quantity * itemInv.price).toFixed(2)}</td>
                {/* <td style={{ textAlign: 'center' }}>{itemInv.terminado == true ? 'Si' : 'No'}</td> */}
                {/* <td style={{ textAlign: 'left' }}>
                  <IconButton
                    color="error"
                    onClick={() => removeItemHandler(itemInv)}
                    // disabled={isPaying}
                  >
                    <AiOutlineDelete className="text-red-500 font-bold text-xl" />
                  </IconButton>
                  <IconButton onClick={() => terminadoSiNo(itemInv)} color="secondary">
                    {itemInv.terminado == true ? 'Activar' : 'Terminar'}
                  </IconButton>
                </td> */}
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
