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
import { IConfiguracion } from '../../interfaces';


type BuscaFormProps = {
  codCon: any;
  setCodCon: any;
  codCont: any;
  setCodCont: any;
  nameCon: any;
  setNameCon: any;
  nextRef?: React.RefObject<HTMLInputElement>; // <<< opcional
  inputRef?: React.RefObject<HTMLInputElement>
};



export const BuscaCon: React.FC<BuscaFormProps> = ({
codCon,
setCodCon,
codCont,
setCodCont,
nameCon,
setNameCon,
nextRef,
inputRef,
}) => {


console.log(codCon);

  // const [codUse, setCodUse] = useState('');
  const [configuraciones, setConfiguracions] = useState<IConfiguracion[]>([]);





  const [modalOpenCon, setModalOpenCon] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);


  // Cerrar con Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setModalOpenCon(false);
      }
    };

    if (modalOpenCon) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [modalOpenCon]);


const handleClickOutside = (e: MouseEvent) => {
  if (modalRef.current && e.target instanceof Node && !modalRef.current.contains(e.target)) {
    setModalOpenCon(false);
  }
};



  useEffect(() => {
    if (modalOpenCon) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalOpenCon]);
/////////////////consulta configuracion

const handleShowCon = () => {
    setModalOpenCon(true);
    // const instRow = configuraciones.find((row) => row.codCon === codCont);
    // if (instRow) {
    // addTodosProductToCartEsc(instRow.orderItems as ICartProduct[]);
    // };
  };

  
  // const ayudaCon = (e: React.KeyboardEvent<HTMLDivElement>) => {
  //   e.key === "Enter" && buscarPorCodCon(codCont);
  //   e.key === "F2" && handleShowCon();
  //   e.key === "Tab" && buscarPorCodCon(codCont);
  // };
const ayudaCon = (e: React.KeyboardEvent<HTMLDivElement>) => {
  if (e.key === "Enter" || e.key === "Tab") {
    e.preventDefault();
    buscarPorCodCon(codCont);
    nextRef?.current?.focus(); // <<< si está definida, enfoca el siguiente campo
  }
  if (e.key === "F2") {
    e.preventDefault();
    handleShowCon();
  }
};
  

  const buscarPorCodCon = (codCont: string) => {
    const instRow = configuraciones.find((row) => row.codCon === codCont);
    if (!instRow) {
        setCodCon('');
        setCodCont('');
        setNameCon('Elija Registro');
    }else{
      // setConfiguracion(instRow);
      setCodCon(instRow._id);
      setCodCont(instRow.codCon);
      setNameCon(instRow.name);
      };
  };

  const handleSelectCon = (configuracion: IConfiguracion) => {

    setCodCon(configuracion._id);
    setCodCont(configuracion.codCon);
    setNameCon(configuracion.name);

    setModalOpenCon(false);
  };

/////////////////consulta configuracion



  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await stutzApi.get(`/api/tes/admin/configuraciones`);
        setConfiguracions(data);
        setFiltered(data);
      } catch (err) {}
    };
    fetchData();
  }, []);


  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState(configuraciones);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const inputRef1 = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  
  useEffect(() => {
  if (modalOpenCon) {
    setTimeout(() => {
      inputRef1?.current?.focus();
    }, 100); // pequeño delay para esperar que el input esté renderizado
  }
}, [modalOpenCon]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    setSearch(value);
    const result = configuraciones.filter(p =>
      p.codCon.includes(value) || p.name.toLowerCase().includes(value.toLowerCase())
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
      handleSelectCon(filtered[highlightedIndex]);
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
              // inputRef={input2Ref}
              inputRef={inputRef}   // <-- asignar ref aquí
              label={codCont === '' ? 'Registro' : ''}
              placeholder="Registro"
              value={codCont}
              onChange={(e) => setCodCont(e.target.value)}
              onKeyDown={(e) => ayudaCon(e)}
              required
              autoComplete="off"
            />
          </Grid>
          <Grid item md={1} display="flex" alignItems="center">
            <Button
              onClick={handleShowCon}
              variant="contained"
              startIcon={<BiFileFind />}
              sx={{ bgcolor: 'yellow', color: 'black' }}
            >
              Buscar F2
            </Button>
          </Grid>
          <Grid item md={3}>
            <Typography
              variant="h6"
              noWrap
              title={nameCon}
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {nameCon}
            </Typography>
          </Grid>

 




        <Modal open={modalOpenCon} onClose={() => setModalOpenCon(false)}>
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
              <Button onClick={() => setModalOpenCon(false)}>X</Button>
            </Box>
    <div style={{ padding: '10px' }}>
      <label htmlFor="codeInput">Código de Registro:</label>
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
              key={p.codCon}
              onClick={() => handleSelectCon(p)}
              style={{
                padding: '6px',
                cursor: 'pointer',
                borderBottom: '1px solid #eee',
                backgroundColor: index === highlightedIndex ? '#cce5ff' : '#fff'
              }}
            >
              <strong>{p.codCon}</strong> - {p.name}
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

