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
import { IUser } from '../../interfaces';


type BuscaFormProps = {
  codUse: any;
  setCodUse: any;
  nameUse: any;
  setNameUse: any;
  nextRef?: React.RefObject<HTMLInputElement>; // <<< opcional
  inputRef?: React.RefObject<HTMLInputElement>
};



export const BuscaUse: React.FC<BuscaFormProps> = ({
codUse,
setCodUse,
nameUse,
setNameUse,
nextRef,
inputRef,
}) => {


console.log(codUse);
  // const [codUse, setCodUse] = useState('');
  const [codUser, setCodUset] = useState('');
  const [users, setUsers] = useState<IUser[]>([]);





  const [modalOpenUse, setModalOpenUse] = useState(false);
  const modalRefUse = useRef<HTMLDivElement>(null);


  // Cerrar con Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setModalOpenUse(false);
      }
    };

    if (modalOpenUse) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [modalOpenUse]);


const handleClickOutside = (e: MouseEvent) => {
  if (modalRefUse.current && e.target instanceof Node && !modalRefUse.current.contains(e.target)) {
    setModalOpenUse(false);
  }
};



  useEffect(() => {
    if (modalOpenUse) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalOpenUse]);
/////////////////consulta user

const handleShowUse = () => {
    setModalOpenUse(true);
    // const instRow = users.find((row) => row.codUse === codUser);
    // if (instRow) {
    // addTodosProductToCartEsc(instRow.orderItems as ICartProduct[]);
    // };
  };

  
  // const ayudaUse = (e: React.KeyboardEvent<HTMLDivElement>) => {
  //   e.key === "Enter" && buscarPorCodUse(codUser);
  //   e.key === "F2" && handleShowUse();
  //   e.key === "Tab" && buscarPorCodUse(codUser);
  // };
const ayudaUse = (e: React.KeyboardEvent<HTMLDivElement>) => {
  if (e.key === "Enter" || e.key === "Tab") {
    // e.preventDefault();
    buscarPorCodUse(codUser);
    nextRef?.current?.focus(); // <<< si está definida, enfoca el siguiente campo
  }
  if (e.key === "F2") {
    e.preventDefault();
    handleShowUse();
  }
};
  

  const buscarPorCodUse = (_id: string) => {
    // const instRow = users.find((row) => row.codUse === codUser);
    const instRow = users.find((row) => row._id === _id);
    if (!instRow) {
        setCodUse('');
        setCodUset('');
        setNameUse('Elija Usuario');
    }else{
      // setUser(instRow);
      setCodUse(instRow._id);
      // setCodUset(instRow.codUse);
      setNameUse(instRow.name);
      };
  };

  const handleSelectUse = (user: IUser) => {

    setCodUse(user._id);
    // setCodUset(user.codUse);
    setNameUse(user.name);

    setModalOpenUse(false);
  };

/////////////////consulta user



  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await stutzApi.get(`/api/tes/admin/users`);
        setUsers(data);
        setFiltered(data);
      } catch (err) {}
    };
    fetchData();
  }, []);


  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState(users);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const inputRef1 = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  
useEffect(() => {
  if (modalOpenUse) {
    setTimeout(() => {
      inputRef1?.current?.focus();
    }, 100); // pequeño delay para esperar que el input esté renderizado
  }
}, [modalOpenUse]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    setSearch(value);
    const result = users.filter(p =>
      // p.codUse.includes(value) || p.name.toLowerCase().includes(value.toLowerCase())
      p._id.includes(value) || p.name.toLowerCase().includes(value.toLowerCase())
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
      handleSelectUse(filtered[highlightedIndex]);
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
              label={codUser === '' ? 'Usuario' : ''}
              placeholder=" Usuario"
              value={codUser}
              onChange={(e) => setCodUset(e.target.value)}
              onKeyDown={(e) => ayudaUse(e)}
              // disabled={true}
              required
              autoComplete="off"
            />
          </Grid>
          <Grid item md={1} display="flex" alignItems="center">
            <Button
              onClick={handleShowUse}
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
              title={nameUse}
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {nameUse}
            </Typography>
          </Grid>

 




        <Modal open={modalOpenUse} onClose={() => setModalOpenUse(false)}>
          <Box
            ref={modalRefUse}
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
              <Button onClick={() => setModalOpenUse(false)}>X</Button>
            </Box>
    <div style={{ padding: '10px' }}>
      <label htmlFor="codeInput">Código de Usuario:</label>
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
              // key={p.codUse}
              key={p._id}
              onClick={() => handleSelectUse(p)}
              style={{
                padding: '6px',
                cursor: 'pointer',
                borderBottom: '1px solid #eee',
                backgroundColor: index === highlightedIndex ? '#cce5ff' : '#fff'
              }}
            >
              {/* <strong>{p.codUse}</strong> - {p.name} */}
              {p.name}
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

