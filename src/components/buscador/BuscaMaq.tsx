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
import { IMaquina } from '../../interfaces';


type BuscaFormProps = {
  codMaq: any;
  setCodMaq: any;
  codMaqt: any;
  setCodMaqt: any;
  nameMaq: any;
  setNameMaq: any;
  nextRef?: React.RefObject<HTMLInputElement>; // <<< opcional
  inputRef?: React.RefObject<HTMLInputElement>
};



export const BuscaMaq: React.FC<BuscaFormProps> = ({
codMaq,
setCodMaq,
codMaqt,
setCodMaqt,
nameMaq,
setNameMaq,
nextRef,
inputRef,
}) => {


void  codMaq;

// const [codUse, setCodUse] = useState('');
  const [maquinas, setMaquinas] = useState<IMaquina[]>([]);

  const [modalOpenMaq, setModalOpenMaq] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);


  // Cerrar con Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setModalOpenMaq(false);
      }
    };

    if (modalOpenMaq) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [modalOpenMaq]);


const handleClickOutside = (e: MouseEvent) => {
  if (modalRef.current && e.target instanceof Node && !modalRef.current.contains(e.target)) {
    setModalOpenMaq(false);
  }
};



  useEffect(() => {
    if (modalOpenMaq) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalOpenMaq]);
/////////////////consulta maquina

const handleShowMaq = () => {
    setModalOpenMaq(true);
    // const instRow = maquinas.find((row) => row.codIns === codInst);
    // if (instRow) {
    // addTodosProductToCartEsc(instRow.orderItems as ICartProduct[]);
    // };
  };

  
  // const ayudaIns = (e: React.KeyboardEvent<HTMLDivElement>) => {
  //   e.key === "Tab" && buscarPorCodIns(codInst);
  //   e.key === "Enter" && buscarPorCodIns(codInst);
  //   e.key === "F2" && handleShowIns();
  // };
const ayudaMaq = (e: React.KeyboardEvent<HTMLDivElement>) => {
  if (e.key === "Enter" || e.key === "Tab") {
    e.preventDefault();
    buscarPorCodMaq(codMaqt);
    nextRef?.current?.focus(); // <<< si está definida, enfoca el siguiente campo
  }
  if (e.key === "F2") {
    e.preventDefault();
    handleShowMaq();
  }
};
  

  const buscarPorCodMaq = (codMaqt: string) => {
    const instRow = maquinas.find((row) => row.codMaq === codMaqt);
    if (!instRow) {
        setCodMaq('');
        setCodMaqt('');
        setNameMaq('Elija Maquina');
    }else{
      // setMaqplier(instRow);
      setCodMaq(instRow._id);
      setCodMaqt(instRow.codMaq);
      setNameMaq(instRow.name);
      };
  };

  const handleSelectMaq = (maquina: IMaquina) => {

    setCodMaq(maquina._id);
    setCodMaqt(maquina.codMaq);
    setNameMaq(maquina.name);

    setModalOpenMaq(false);
  };

/////////////////consulta maquina



  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await stutzApi.get(`/api/tes/admin/maquinas`);
        setMaquinas(data);
        setFiltered(data);
      } catch (err) {}
    };
    fetchData();
  }, []);


  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState(maquinas);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const inputRef1 = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  
useEffect(() => {
  if (modalOpenMaq) {
    setTimeout(() => {
      inputRef1?.current?.focus();
    }, 100); // pequeño delay para esperar que el input esté renderizado
  }
}, [modalOpenMaq]);




  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    setSearch(value);
    const result = maquinas.filter(p =>
      p.codMaq.includes(value) || p.name.toLowerCase().includes(value.toLowerCase())
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
      handleSelectMaq(filtered[highlightedIndex]);
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
              // label={codMaqt === '' ? 'Maqargado' : ''}
              label="Maquina"
              placeholder="Maquina"
              value={codMaqt}
              onChange={(e) => setCodMaqt(e.target.value)}
              onKeyDown={(e) => ayudaMaq(e)}
              required
              autoComplete="off"
            />
          </Grid>
          <Grid item md={1} display="flex" alignItems="center">
            <Button
              onClick={handleShowMaq}
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
        title={nameMaq}
        sx={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {nameMaq}
      </Typography>
          </Grid>

 




        <Modal open={modalOpenMaq} onClose={() => setModalOpenMaq(false)}>
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
              <Button onClick={() => setModalOpenMaq(false)}>X</Button>
            </Box>
    <div style={{ padding: '10px' }}>
      <label htmlFor="codeInput">Código de Maquina:</label>
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
              key={p.codMaq}
              onClick={() => handleSelectMaq(p)}
              style={{
                padding: '6px',
                cursor: 'pointer',
                borderBottom: '1px solid #eee',
                backgroundColor: index === highlightedIndex ? '#cce5ff' : '#fff'
              }}
            >
              <strong>{p.codMaq}</strong> - {p.name}
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

