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
import { IInstrumento } from '../../interfaces';


type BuscaFormProps = {
  codIns: any;
  setCodIns: any;
  codInst: any;
  setCodInst: any;
  nameIns: any;
  setNameIns: any;
  nextRef?: React.RefObject<HTMLInputElement>; // <<< opcional
  inputRef?: React.RefObject<HTMLInputElement>
};



export const BuscaIns: React.FC<BuscaFormProps> = ({
codIns,
setCodIns,
codInst,
setCodInst,
nameIns,
setNameIns,
nextRef,
inputRef,
}) => {


console.log(codIns);

  // const [codUse, setCodUse] = useState('');
  const [instrumentos, setInstrumentos] = useState<IInstrumento[]>([]);

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

  
  // const ayudaIns = (e: React.KeyboardEvent<HTMLDivElement>) => {
  //   e.key === "Tab" && buscarPorCodIns(codInst);
  //   e.key === "Enter" && buscarPorCodIns(codInst);
  //   e.key === "F2" && handleShowIns();
  // };
const ayudaIns = (e: React.KeyboardEvent<HTMLDivElement>) => {
  if (e.key === "Enter" || e.key === "Tab") {
    e.preventDefault();
    buscarPorCodIns(codInst);
    nextRef?.current?.focus(); // <<< si está definida, enfoca el siguiente campo
  }
  if (e.key === "F2") {
    e.preventDefault();
    handleShowIns();
  }
};
  

  const buscarPorCodIns = (codInst: string) => {
    const instRow = instrumentos.find((row) => row.codIns === codInst);
    if (!instRow) {
        setCodIns('');
        setCodInst('');
        setNameIns('Elija Instrumento');
    }else{
      // setInstrumento(instRow);
      setCodIns(instRow._id);
      setCodInst(instRow.codIns);
      setNameIns(instRow.name);
      };
  };

  const handleSelectIns = (instrumento: IInstrumento) => {

    setCodIns(instrumento._id);
    setCodInst(instrumento.codIns);
    setNameIns(instrumento.name);

    setModalOpenIns(false);
  };

/////////////////consulta instrumento



  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await stutzApi.get(`/api/tes/admin/instrumentos`);
        setInstrumentos(data);
        setFiltered(data);
      } catch (err) {}
    };
    fetchData();
  }, []);


  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState(instrumentos);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const inputRef1 = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  
useEffect(() => {
  if (modalOpenIns) {
    setTimeout(() => {
      inputRef1?.current?.focus();
    }, 100); // pequeño delay para esperar que el input esté renderizado
  }
}, [modalOpenIns]);




  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    setSearch(value);
    const result = instrumentos.filter(p =>
      p.codIns.includes(value) || p.name.toLowerCase().includes(value.toLowerCase())
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
      handleSelectIns(filtered[highlightedIndex]);
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
              label={codInst === '' ? 'Instrumento' : ''}
              placeholder="Instrumento"
              value={codInst}
              onChange={(e) => setCodInst(e.target.value)}
              onKeyDown={(e) => ayudaIns(e)}
              required
              autoComplete="off"
            />
          </Grid>
          <Grid item md={1} display="flex" alignItems="center">
            <Button
              onClick={handleShowIns}
              variant="contained"
              startIcon={<BiFileFind />}
              sx={{ bgcolor: 'yellow', color: 'black' }}
            >
              F2
            </Button>
          </Grid>
          <Grid item md={3}>
      <Typography
        variant="h6"
        noWrap
        title={nameIns}
        sx={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {nameIns}
      </Typography>
          </Grid>

 




        <Modal open={modalOpenIns} onClose={() => setModalOpenIns(false)}>
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
              <Button onClick={() => setModalOpenIns(false)}>X</Button>
            </Box>
    <div style={{ padding: '10px' }}>
      <label htmlFor="codeInput">Código de Instrumento:</label>
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
              key={p.codIns}
              onClick={() => handleSelectIns(p)}
              style={{
                padding: '6px',
                cursor: 'pointer',
                borderBottom: '1px solid #eee',
                backgroundColor: index === highlightedIndex ? '#cce5ff' : '#fff'
              }}
            >
              <strong>{p.codIns}</strong> - {p.name}
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

