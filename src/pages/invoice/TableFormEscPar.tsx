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
  IconButton
} from '@mui/material';
import { ICartProduct, IProduct } from '../../interfaces';
import {ProductSelector} from '../../../src/pages/crmpages/ProductSelector';
import { CartContext } from '../../../context';
import { stutzApi } from '../../../api';

type TableFormProps = {
  input0Ref: any;
  input8Ref: any;
  codPro: any;
  setCodPro: any;
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
  valueeR: any;
  desval: any;
  numval: any;
  isPaying: any;
};

// export const TableForm = (input0Ref,

export const TableFormEscPar: React.FC<TableFormProps> = ({
  input8Ref,
  codPro,
  setCodPro,
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

  const {  cart, addProductToCartEsc, removeCartProduct } = useContext(CartContext);





  const round2 = (num: number) => Math.round(num * 100 + Number.EPSILON) / 100; // 123.2345 => 123.23
  const input9Ref = useRef<HTMLInputElement>(null);
  const input10Ref = useRef<HTMLInputElement>(null);
  const input11Ref = useRef<HTMLButtonElement>(null);
  const input22Ref = useRef<HTMLInputElement>(null);

  const isEditing = false;
  const [productss, setProductss] = useState<IProduct[]>([]);
  const [productR, setProductR] = useState<IProduct>();
  // const [showPro, setShowPro] = useState(false);
  const [codProd, setCodProd] = useState('');
//   const [medPro, setMedPro] = useState('');
  const [observ, setObserv] = useState('');

  useEffect(() => {
    input8Ref.current.focus()
    const fetchData = async () => {
      try {
        // const { data } = await stutzApi.get(`/api/products/xpv?id_config=${id_config}`);
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

    if (codPro) {
      // ctxDispatch({
        //   type: 'INVOICE_ADD_ITEM',
        //   payload: { ...itemInv, quantity, amount, price, porIva},
        // });
        const cartProduct: ICartProduct = {
          _id: codPro,
          image: productR.images[0],
          price: price,
          porIva: porIva,
          medPro: productR.medPro,
          size: "M",
          slug: productR.slug,
          title: productR.title,
          gender: productR.gender,
          quantity : quantity,
            // venDat: venDat,
            observ: observ,
            terminado: false,
        };
          
          addProductToCartEsc( cartProduct as ICartProduct );
          input8Ref.current.focus()
    }
  // };
  };

  const removeItemHandler = (itemInv: ICartProduct) => {
    input8Ref.current.focus()
    // ctxDispatch({ type: 'INVOICE_REMOVE_ITEM', payload: itemInv });
  removeCartProduct( itemInv as ICartProduct )
  };

  // Edit function
  // const submitHandlerPro = async (e) => {
  //   e.preventDefault();
  //   setShowPro(false)
  //   input8Ref.current.focus()
  // };



  const ayudaPro = (e: React.KeyboardEvent<HTMLDivElement>) => {
    e.key === "Enter" && buscarPorCodPro(codProd);
    e.key === "F2" && handleShowPro();
  };
  

  const buscarPorCodPro = (codProd: string) => {
    if (codProd==='') {
      // input0Ref.current.focus();
      input10Ref.current?.focus();
    } else {
    const productRow = productss.find((row) => (row.codPro === codProd || row.codigoPro === codProd));

    if (!productRow) {
        setCodPro('');
        setCodProd('');
        setDesPro('Elija un Producto');
        // setVenDat('');
        setObserv('');
        setQuantity(0);
        setPrice(0);
        setPorIva(0);
        setAmount(0);
        setProductR(undefined);
      }else{
        setProductR(productRow);
        setCodPro(productRow._id);
        setCodProd(productRow.codProd);
        setDesPro(productRow.title);
        // setVenDat('');
        // setObserv('');
        setQuantity(1);
        setPrice(productRow.price);
        setPorIva(productRow.porIva);
        setAmount(productRow.price);
        input9Ref.current?.focus()
        setCodProd('');
    };
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
                label="Diligencia"
                fullWidth
                value={codProd}
                onChange={(e) => setCodProd(e.target.value)}
                onKeyDown={(e) => ayudaPro(e)}
                required
                autoComplete="off"
              />
            </Grid>

          {/* <Grid item md={1} display="flex" alignItems="center">
              <Button
                variant="contained"
                startIcon={<BiFileFind />}
                onClick={handleShowPro}
                title="Buscador"
                sx={{ bgcolor: 'yellow', color: 'black' }}
              >
                Buscar
              </Button>
            </Grid>
 */}
            <Grid item md={4}>
                  {/* <Typography variant="subtitle2">Producto</Typography> */}
                  <Typography variant="h6">{desPro}</Typography>
            </Grid>

          {/* <Grid item md={2}>
            <TextField
              fullWidth
              inputRef={input9Ref}
              type="date"
              label="Fecha Vencimiento"
              value={venDat}
              onChange={(e) => setVenDat(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && input10Ref.current?.focus()}
              required
            />
          </Grid> */}
          <Grid item md={4}>
            <TextField
              fullWidth
              inputRef={input9Ref}
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
                sx={{ mt: 2, bgcolor: 'yellow', color: 'black' }}
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
            <ProductSelector onSelectPro={handleSelect} productss={productss} />
          </Box>
        </Modal>

        {/* Tabla de items */}
        <table width="100%" className="mb-10">
          <thead>
            <tr>
              {/* <th>Codigo Producto</th> */}
              <th>Descripción</th>
              <th>Observaciones</th>
              {/* <th>Vence</th> */}
              <th>Valor</th>
              {/* <th>Terminado</th> */}
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((itemInv) => (
              <tr key={itemInv._id}>
                {/* <td>{itemInv._id}</td> */}
                <td>{itemInv.title}</td>
                <td>{itemInv.observ}</td>
                {/* <td style={{ textAlign: 'center' }}>{itemInv.venDat}</td> */}
                <td >{(itemInv.quantity * itemInv.price).toFixed(2)}</td>
                {/* <td style={{ textAlign: 'center' }}>{itemInv.terminado == true ? 'Si' : 'No'}</td> */}
                {/* <td>
                  <IconButton onClick={() => removeItemHandler(itemInv)} color="error">
                    Elimina
                  </IconButton>
                </td> */}
                <td style={{ textAlign: 'center' }}>
                  <IconButton
                    color="error"
                    onClick={() => removeItemHandler(itemInv)}
                    // disabled={isPaying}
                  >
                    <AiOutlineDelete className="text-red-500 font-bold text-xl" />
                  </IconButton>
                  {/* <IconButton onClick={() => terminadoSiNo(itemInv)} color="secondary">
                    {itemInv.terminado == true ? 'Activar' : 'Termina'}
                  </IconButton> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    </>
  );
}
