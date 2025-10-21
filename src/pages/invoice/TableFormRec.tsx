import React, { useContext, useState, useRef, useEffect } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { ToastContainer } from 'react-toastify';
// import { v4 as uuidv4 } from 'uuid';
import 'react-toastify/dist/ReactToastify.css';
import { BiFileFind } from "react-icons/bi";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Modal,
  IconButton
} from '@mui/material';
import { IReceiptCart, IValue } from '../../interfaces';
import {ValueSelector} from '../../../src/pages/crmpages/ValueSelector';
import { ReceiptContext } from '../../../context';
import { stutzApi } from '../../../api';

type TableFormProps = {
  input0Ref: any;
  input8Ref: any;
  codVal: any;
  setCodVal: any;
  desVal: any;
  setDesVal: any;
  amount: any;
  setAmount: any;
  list: any;
  setList: any;
  total: any;
  setTotal: any;
};

// export const TableForm = (input0Ref,

export const TableFormRec: React.FC<TableFormProps> = ({
  input0Ref,
  input8Ref,
  codVal,
  setCodVal,
  desVal,
  setDesVal,
  amount,
  setAmount,
}) => {

  const {  receipt, addProductToReceipt, removeReceiptProduct } = useContext(ReceiptContext);

  const [tempReceiptCart, setTempReceiptCart] = useState<IReceiptCart>({
    _id: '649f9b05c4416622ac833792',
    valuee: '649f9b05c4416622ac833792',
    desval: "",
    numval: "",
    amountval: 0,
  })
void input0Ref, tempReceiptCart;
  
  const round2 = (num: number) => Math.round(num * 100 + Number.EPSILON) / 100; // 123.2345 => 123.23
  const input9Ref = useRef<HTMLInputElement>(null);
  const input10Ref = useRef<HTMLInputElement>(null);
  const input11Ref = useRef<HTMLButtonElement>(null);
  const input22Ref = useRef<HTMLInputElement>(null);

  const isEditing = false;
  // const [productss, setProductss] = useState<IProduct[]>([]);
  const [valuess, setValuess] = useState<IValue[]>([]);
  const [valueeR, setValueeR] = useState<IValue>();
  const [numval, setNumval] = useState('');
  const [codValo, setCodValo] = useState('');

  useEffect(() => {
    input8Ref.current.focus()
    const fetchData = async () => {
      try {
        // const { data } = await stutzApi.get(`/api/products/xpv?id_config=${id_config}`, {
        //   headers: { Authorization: `Bearer ${userInfo.token}` },
        // });
        const { data } = await stutzApi.get(`/api/valuees/`);
        setValuess(data);
        // dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {}
    };
    fetchData();
  }, []);





  const unloadpayment = async () => {
    if (window.confirm('El Importe tiene que ser mayor a Cero')) {
    }
    };
        
    
  const addToCartHandler = async (valueeR: IValue) => {
    if (amount <= 0) {unloadpayment();} else {
    amount = round2(amount);
    if (codVal && amount > 0) {
        const receiptCart: IReceiptCart = {
          _id: codVal,
          valuee: valueeR._id,
          desval: valueeR.desVal,
          numval: numval,
          amountval: amount,
        };
          
          addProductToReceipt( receiptCart as IReceiptCart );
          input8Ref.current.focus();
        setCodVal('');
        setCodValo('');
        setDesVal('');
        setValueeR(undefined);
    }
  };
  };


  const removeItemHandler = (itemInv: IReceiptCart) => {
    input8Ref.current.focus()
  removeReceiptProduct( itemInv )
  };



const ayudaVal = (e: React.KeyboardEvent<HTMLDivElement>) => {
  if (e.key === "Enter" || e.key === "Tab") {
    e.preventDefault();
    buscarPorCodVal(codValo);
  }
  if (e.key === "F2") {
    e.preventDefault();
    handleShowVal();
  }
};
  
  

  const buscarPorCodVal = (codValo: string) => {
    if (codValo==='') {
      // input0Ref.current.focus();
      input10Ref.current?.focus();
    } else {
    const valueeRow = valuess.find((row) => row.codVal === codValo);
      if (!valueeRow) {
        setCodVal('');
        setCodValo('');
        setDesVal('Elija un Valor');
        setValueeR(undefined);
      }else{
        setValueeR(valueeRow);
        setCodVal(valueeRow._id);
        setCodValo(valueeRow.codVal);
        setDesVal(valueeRow.desVal);
        const newValue: IReceiptCart = {
          _id: valueeRow._id,
          valuee: valueeRow._id,
          desval: valueeRow.desVal,
          numval: "",
          amountval: 0,
        };
        setTempReceiptCart(newValue);
        input9Ref.current?.focus();
        setCodValo('');
      };
        const linea = receipt.find(p => p._id === valueeRow!._id);
        if (linea) {
              setAmount(linea.amountval);
              setNumval(linea.numval);
              }
  };
  };



  const handleShowVal = () => {
    // setShowSup(true);
    setModalOpen(true)
    input22Ref.current?.focus();
  };



  const [modalOpen, setModalOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<IValue | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleSelect = (value: IValue) => {
    setSelectedValue(value);

    setCodVal(selectedValue!._id);
    setCodValo(value.codVal);
    setDesVal(value.desVal);
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
      <Box border={1} p={2} borderRadius={2} mt={1}>

      {/* <Box sx={{ border: '1px solid #ccc', padding: 2, borderRadius: 2}} mt={2}> */}

      <Box border={1} p={2} borderRadius={2}>
        <form>
          <Grid container spacing={2} alignItems="center">

            <Grid item md={1}>
              <TextField
                inputRef={input8Ref}
                label="Valor"
                fullWidth
              size="small"
                value={codValo}
                onChange={(e) => setCodValo(e.target.value)}
                onKeyDown={(e) => ayudaVal(e)}
                required
                autoComplete="off"
              />
            </Grid>

          <Grid item md={1} display="flex" alignItems="center">
              <Button
                variant="contained"
                startIcon={<BiFileFind />}
                onClick={handleShowVal}
                title="Buscador"
                sx={{  bgcolor: 'secondary.main' , color: 'white' }}
              >
                F2
              </Button>
            </Grid>

            <Grid item md={4}>
                  {/* <Typography variant="subtitle2">Producto</Typography> */}
                  <Typography variant="h6">{desVal}</Typography>
            </Grid>

            <Grid item md={2}>
              <TextField
                inputRef={input9Ref}
                label="Nro. Valor"
                type="number"
                fullWidth
              size="small"
                value={numval}
                onChange={(e) => setNumval(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && input10Ref.current?.focus()}
                required
              />
            </Grid>


            <Grid item md={2}>
              <TextField
                inputRef={input10Ref}
                label="Importe"
                type="number"
                inputProps={{ step: '0.01' }} 
                fullWidth
              size="small"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && input11Ref.current?.focus()}
                required
              />
            </Grid>


            {/* <Grid item md={1}>
                  <Typography>{amount.toFixed(2)}</Typography>
            </Grid> */}


          <Grid item md={1} display="flex" alignItems="center">
              <Button
                ref={input11Ref}
                variant="contained"
                color="warning"
                fullWidth
              size="small"
                sx={{  bgcolor: 'secondary.main' , color: 'white' }}
                onClick={() => addToCartHandler(valueeR as IValue)}
              >
                {isEditing ? 'Editing Row Item' : 'Agrega'}
              </Button>
            </Grid>

          </Grid>
        </form>
      </Box>

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
            <ValueSelector onSelectVal={handleSelect} valuess={valuess} />
          </Box>
        </Modal>

      <Box border={1} p={2} borderRadius={2} mt={0.1}>
        {/* Tabla de items */}
        <table width="100%" className="mb-10">
          <thead>
            <tr>
              <th>Codigo Valor</th>
              <th>Valor</th>
              <th>Nro Valor</th>
              <th>Importe</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {receipt.map((itemInv) => (
              <tr key={itemInv._id}>
                <td>{itemInv._id}</td>
                <td>{itemInv.desval}</td>
                <td style={{ textAlign: 'right' }}>{itemInv.numval}</td>
                <td style={{ textAlign: 'right' }}>{itemInv.amountval.toFixed(2)}</td>
                <td style={{ textAlign: 'center' }}>
                  <IconButton onClick={() => removeItemHandler(itemInv)} color="error">
                    <AiOutlineDelete />
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
