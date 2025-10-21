import { useState, useRef, useEffect } from 'react';
import { BiFileFind } from "react-icons/bi";
import {
  Box,
  Button,
  Typography,
  Grid,
  Modal,
  TextField,
} from '@mui/material';
import { stutzApi } from '../../../api';
import { IValue } from '../../interfaces';


type BuscaFormProps = {
  codVal: any;
  setCodVal: any;
  codValt: any;
  setCodValt: any;
  desVal: any;
  setDesVal: any;
  nextRef?: React.RefObject<HTMLInputElement>; // <<< opcional
  inputRef?: React.RefObject<HTMLInputElement>
};



export const BuscaVal: React.FC<BuscaFormProps> = ({
codVal,
setCodVal,
codValt,
setCodValt,
desVal,
setDesVal,
nextRef,
inputRef,
}) => {


void  codVal;

  // const [codUse, setCodUse] = useState('');
  const [values, setValues] = useState<IValue[]>([]);

  const [modalOpenVal, setModalOpenVal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);


  // Cerrar con Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setModalOpenVal(false);
      }
    };

    if (modalOpenVal) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [modalOpenVal]);


const handleClickOutside = (e: MouseEvent) => {
  if (modalRef.current && e.target instanceof Node && !modalRef.current.contains(e.target)) {
    setModalOpenVal(false);
  }
};



  useEffect(() => {
    if (modalOpenVal) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalOpenVal]);
/////////////////consulta value

const handleShowVal = () => {
    setModalOpenVal(true);
    // const instRow = values.find((row) => row.codIns === codInst);
    // if (instRow) {
    // addTodosProductToCartEsc(instRow.orderItems as ICartProduct[]);
    // };
  };

  
  // const ayudaIns = (e: React.KeyboardEvent<HTMLDivElement>) => {
  //   e.key === "Tab" && buscarPorCodIns(codInst);
  //   e.key === "Enter" && buscarPorCodIns(codInst);
  //   e.key === "F2" && handleShowIns();
  // };
const ayudaVal = (e: React.KeyboardEvent<HTMLDivElement>) => {
  if (e.key === "Enter" || e.key === "Tab") {
    e.preventDefault();
    buscarPorCodVal(codValt);
    nextRef?.current?.focus(); // <<< si está definida, enfoca el siguiente campo
  }
  if (e.key === "F2") {
    e.preventDefault();
    handleShowVal();
  }
};
  

  const buscarPorCodVal = (codValt: string) => {
    const instRow = values.find((row) => row.codVal === codValt);
    if (!instRow) {
        setCodVal('');
        setCodValt('');
        setDesVal('Elija Valor');
    }else{
      // setValplier(instRow);
      setCodVal(instRow._id);
      setCodValt(instRow.codVal);
      setDesVal(instRow.desVal);
      };
  };

  const handleSelectVal = (value: IValue) => {

    setCodVal(value._id);
    setCodValt(value.codVal);
    setDesVal(value.desVal);

    setModalOpenVal(false);
  };

/////////////////consulta value



  useEffect(() => {
    const fetchData = async () => {
      try {
        // const { data } = await stutzApi.get(`/api/tes/admin/values`);
        const { data } = await stutzApi.get(`/api/valuees`);
        setValues(data);
        setFiltered(data);
      } catch (err) {}
    };
    fetchData();
  }, []);


  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState(values);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const inputRef1 = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  
useEffect(() => {
  if (modalOpenVal) {
    setTimeout(() => {
      inputRef1?.current?.focus();
    }, 100); // pequeño delay para esperar que el input esté renderizado
  }
}, [modalOpenVal]);




  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    setSearch(value);
    const result = values.filter(p =>
      p.codVal.includes(value) || p.desVal.toLowerCase().includes(value.toLowerCase())
    );
    setFiltered(result);
    setHighlightedIndex(0); // Reset al buscar
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (filtered.length === 0) return;

    if (e.key === 'ArrowDown') {
      setHighlightedIndex(prev => Math.min(prev + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      setHighlightedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter') {
      handleSelectVal(filtered[highlightedIndex]);
    }
  };

  // Scroll automático al elemento resaltado
  useEffect(() => {
    const listElement = listRef.current;
    if (listElement && listElement.children[highlightedIndex]) {
      listElement.children[highlightedIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [highlightedIndex]);








  return (
    <>
          <Grid item md={2}>
            <TextField
              fullWidth
              size="small"
              // inputRef={input2Ref}
              inputRef={inputRef}   // <-- asignar ref aquí
              // label={codValt === '' ? 'Value' : ''}
              // placeholder="Value"
              label="Value"
              placeholder="Value"
              value={codValt}
              onChange={(e) => setCodValt(e.target.value)}
              onKeyDown={(e) => ayudaVal(e)}
              required
              autoComplete="off"
            />
          </Grid>
          <Grid item md={1} display="flex" alignItems="center">
            <Button
              onClick={handleShowVal}
              variant="contained"
              startIcon={<BiFileFind />}
              sx={{  bgcolor: 'secondary.main' , color: 'white' }}
            >
              F2
            </Button>
          </Grid>
          <Grid item md={3}>
      <Typography
        variant="h6"
        noWrap
        title={desVal}
        sx={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {desVal}
      </Typography>
          </Grid>

 




        <Modal open={modalOpenVal} onClose={() => setModalOpenVal(false)}>
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
              <Button onClick={() => setModalOpenVal(false)}>X</Button>
            </Box>
    <div style={{ padding: '10px' }}>
      <label htmlFor="codeInput">Código de Value:</label>
      <input
        id="codeInput"
        ref={inputRef1}
        type="text"
        value={search}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        style={{ width: '100%', padding: '8px', marginBottom: '5px' }}
        autoComplete="off"
      />
      {filtered.length > 0 && (
        <ul
          ref={listRef}
          style={{
            listStyle: 'none',
            padding: 0,
            border: '1px solid #ccc',
            maxHeight: '350px',
            overflowY: 'auto',
            margin: 0
          }}
        >
          {filtered.map((p, index) => (
            <li
              key={p.codVal}
              onClick={() => handleSelectVal(p)}
              style={{
                padding: '6px',
                cursor: 'pointer',
                borderBottom: '1px solid #eee',
                backgroundColor: index === highlightedIndex ? '#cce5ff' : '#fff'
              }}
            >
              <strong>{p.codVal}</strong> - {p.desVal}
            </li>
          ))}
        </ul>
      )}
    </div>
          </Box>
        </Modal>


</>
  );
}

