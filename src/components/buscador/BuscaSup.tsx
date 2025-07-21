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
import { ISupplier } from '../../interfaces';


type BuscaFormProps = {
  codSup: any;
  setCodSup: any;
  codSupt: any;
  setCodSupt: any;
  nameSup: any;
  setNameSup: any;
  nextRef?: React.RefObject<HTMLInputElement>; // <<< opcional
  inputRef?: React.RefObject<HTMLInputElement>
};



export const BuscaSup: React.FC<BuscaFormProps> = ({
codSup,
setCodSup,
codSupt,
setCodSupt,
nameSup,
setNameSup,
nextRef,
inputRef,
}) => {


console.log(codSup);

  // const [codUse, setCodUse] = useState('');
  const [suppliers, setSuppliers] = useState<ISupplier[]>([]);

  const [modalOpenSup, setModalOpenSup] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);


  // Cerrar con Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setModalOpenSup(false);
      }
    };

    if (modalOpenSup) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [modalOpenSup]);


const handleClickOutside = (e: MouseEvent) => {
  if (modalRef.current && e.target instanceof Node && !modalRef.current.contains(e.target)) {
    setModalOpenSup(false);
  }
};



  useEffect(() => {
    if (modalOpenSup) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalOpenSup]);
/////////////////consulta supplier

const handleShowSup = () => {
    setModalOpenSup(true);
    // const instRow = suppliers.find((row) => row.codIns === codInst);
    // if (instRow) {
    // addTodosProductToCartEsc(instRow.orderItems as ICartProduct[]);
    // };
  };

  
  // const ayudaIns = (e: React.KeyboardEvent<HTMLDivElement>) => {
  //   e.key === "Tab" && buscarPorCodIns(codInst);
  //   e.key === "Enter" && buscarPorCodIns(codInst);
  //   e.key === "F2" && handleShowIns();
  // };
const ayudaSup = (e: React.KeyboardEvent<HTMLDivElement>) => {
  if (e.key === "Enter" || e.key === "Tab") {
    e.preventDefault();
    buscarPorCodSup(codSupt);
    nextRef?.current?.focus(); // <<< si está definida, enfoca el siguiente campo
  }
  if (e.key === "F2") {
    e.preventDefault();
    handleShowSup();
  }
};
  

  const buscarPorCodSup = (codSupt: string) => {
    const instRow = suppliers.find((row) => row.codSup === codSupt);
    if (!instRow) {
        setCodSup('');
        setCodSupt('');
        setNameSup('Elija Proveedor');
    }else{
      // setSupplier(instRow);
      setCodSup(instRow._id);
      setCodSupt(instRow.codSup);
      setNameSup(instRow.name);
      };
  };

  const handleSelectSup = (supplier: ISupplier) => {

    setCodSup(supplier._id);
    setCodSupt(supplier.codSup);
    setNameSup(supplier.name);

    setModalOpenSup(false);
  };

/////////////////consulta supplier



  useEffect(() => {
    const fetchData = async () => {
      try {
        // const { data } = await stutzApi.get(`/api/tes/admin/suppliers`);
        const { data } = await stutzApi.get(`/api/suppliers`);
        setSuppliers(data);
        setFiltered(data);
      } catch (err) {}
    };
    fetchData();
  }, []);


  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState(suppliers);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const inputRef1 = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  
useEffect(() => {
  if (modalOpenSup) {
    setTimeout(() => {
      inputRef1?.current?.focus();
    }, 100); // pequeño delay para esperar que el input esté renderizado
  }
}, [modalOpenSup]);




  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    setSearch(value);
    const result = suppliers.filter(p =>
      p.codSup.includes(value) || p.name.toLowerCase().includes(value.toLowerCase())
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
      handleSelectSup(filtered[highlightedIndex]);
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
              label={codSupt === '' ? 'Proveedor' : ''}
              placeholder="Proveedor"
              variant="filled"
              sx={{ mb: 1 }}
              value={codSupt}
              onChange={(e) => setCodSupt(e.target.value)}
              onKeyDown={(e) => ayudaSup(e)}
              required
              autoComplete="off"
            />
          </Grid>
          <Grid item md={1} display="flex" alignItems="center">
            <Button
              onClick={handleShowSup}
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
        title={nameSup}
        sx={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {nameSup}
      </Typography>
          </Grid>

 




        <Modal open={modalOpenSup} onClose={() => setModalOpenSup(false)}>
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
              <Button onClick={() => setModalOpenSup(false)}>X</Button>
            </Box>
    <div style={{ padding: '10px' }}>
      <label htmlFor="codeInput">Código de Proveedor:</label>
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
              key={p.codSup}
              onClick={() => handleSelectSup(p)}
              style={{
                padding: '6px',
                cursor: 'pointer',
                borderBottom: '1px solid #eee',
                backgroundColor: index === highlightedIndex ? '#cce5ff' : '#fff'
              }}
            >
              <strong>{p.codSup}</strong> - {p.name}
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

