import { useState, useRef, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import {
  Button,
  Box,
  Typography,
  Grid,
  TextField,
} from '@mui/material';

import { AdminLayoutMenu } from '../../components/layouts';
import { CategoryOutlined } from '@mui/icons-material';
import { BuscaSup, BuscaPro, BuscaPro2,  } from '../../components/buscador';
import { stutzApi } from '../../../api';
import { AuthContext } from '../../../context';



export const Precios = () => {

    ////////////////////FGFGFGFG
    const { user, isLoading } = useContext(AuthContext);
    const navigate = useNavigate()

    useEffect(() => {
        if (!user && !isLoading) {
        navigate('/auth/loginadm?redirect=/admin/precios');
        }
      }, [user, isLoading, navigate]);
    ////////////////////FGFGFGFG

  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';



        const userInfo = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo')!)
    : null;

  const [id_config, setId_config] = useState(userInfo.codCon);

  const input9Ref = useRef<HTMLInputElement>(null);
  const inputSupRef = useRef<HTMLInputElement>(null);
  const inputProRef = useRef<HTMLInputElement>(null);
  const inputPro2Ref = useRef<HTMLInputElement>(null);
  const inputCatRef = useRef<HTMLInputElement>(null);

  const [porcen, setPorcen] = useState('');


  const [codPro, setCodPro] = useState('');
  const [codProt, setCodProt] = useState('');
  const [desPro, setDesPro] = useState('');
  const [codPro2, setCodPro2] = useState('');
  const [codProt2, setCodProt2] = useState('');
  const [desPro2, setDesPro2] = useState('');


  const [codSup, setCodSup] = useState('');
  const [codSupt, setCodSupt] = useState('');
  const [nameSup, setNameSup] = useState('');
  
  const [category, setCategory] = useState('');
  const [width] = useState(641);

  

  useEffect(() => {
    if (window.innerWidth < width) {
      alert('Place your phone in landscape mode for the best experience');
    }
  }, [width]);




const unloadpayment = async () => {
if (window.confirm('El porcentaje tiene que ser mayor a Cero')) {
}
};


  const disminuyeHandler = async () => {
    if (+porcen <= 0) {unloadpayment();} else {
    if (window.confirm('Confirma los Datos?')) {
            try {
            const { data } = await stutzApi.put(`/api/products/dispre/?configuracion=${id_config}&supplier=${codSup}&category=${category}&codProd1=${codProt}&codProd2=${codProt2}&porcen=${porcen}`, {
              headers: { Authorization: `Bearer ${userInfo.token}` },
                  });
              // setCuentas(data.resultado);
              console.log(data);
            } catch (err) {
            }
              // navigate(redirect);
          };  

  };
};
  
  const aumentaHandler = async () => {
    if (+porcen <= 0) {unloadpayment();} else {
      if (window.confirm('Confirma los Datos?')) {
      try {
      const { data } = await stutzApi.put(`/api/products/aumpre/?configuracion=${id_config}&category=${category}&supplier=${codSup}&codProd1=${codProt}&codProd2=${codProt2}&porcen=${porcen}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
            });
        // setCuentas(data.resultado);
        console.log(data);
      } catch (err) {
      }
        // navigate(redirect);
    };  
  };
  };



void 
codSup,
nameSup;


  return (
    <AdminLayoutMenu 
        title={`Entredas`} 
        subTitle={'Generando Entredas'}
        icon={ <CategoryOutlined /> }
    >

      <Box border={1} p={2} borderRadius={2}>
      <Box p={2} mb={2}>
        <Grid container>
          <Grid item md={3}>
                <Typography variant="h1"></Typography>
          </Grid>

          <Grid item md={6}>
                    <Typography variant="h1">PARAMETROS PARA MODIFICAR PRECIOS</Typography>
          </Grid>
        </Grid>

        <Grid container spacing={2} mt={0}>


            <BuscaSup
            codSup={codSup}
            setCodSup={setCodSup}
            codSupt={codSupt}
            setCodSupt={setCodSupt}
            nameSup={nameSup}
            setNameSup={setNameSup}
            nextRef={inputCatRef}
            inputRef={inputSupRef} 
            />

              <Grid item md={6}>
                <TextField
                  fullWidth
                  inputRef={inputCatRef}
                  size="small"
                  label="Categoria"
                  placeholder="Categoria"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && inputProRef.current?.focus()}
                />
              </Grid>



        </Grid>
        <Grid container spacing={2} mt={0}>


            <BuscaPro
            codPro={codPro}
            setCodProt={setCodProt}
            codProt={codProt}
            setCodPro={setCodPro}
            desPro={desPro}
            setDesPro={setDesPro}
            nextRef={inputPro2Ref}
            inputRef={inputProRef} 
            />


            <BuscaPro2
            codPro2={codPro2}
            setCodProt2={setCodProt2}
            codProt2={codProt2}
            setCodPro2={setCodPro2}
            desPro2={desPro2}
            setDesPro2={setDesPro2}
            nextRef={inputSupRef}
            inputRef={inputPro2Ref} 
            />

        </Grid>

      </Box>


      <Box border={1} p={2} borderRadius={2}>


        <div className="bordeTableinput">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3} md={4}>
              <Box display="flex" flexDirection="column" width="100%">
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={disminuyeHandler}
                >
                  DISMINUIR
                </Button>
              </Box>
            </Grid>

            <Grid item md={4}>
              <TextField
                inputRef={input9Ref}
                label="Cantidad"
                type="number"
                fullWidth
              size="small"
                value={porcen}
                onChange={(e) => setPorcen(e.target.value)}
                required
              />
            </Grid>


            <Grid item xs={12} sm={3} md={4}>
              <Box display="flex" flexDirection="column" width="100%">
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={aumentaHandler}
                >
                  AUMENTAR
                </Button>
              </Box>
            </Grid>
          </Grid>
        </div>

      </Box>


    </Box>

    </AdminLayoutMenu>
  );
}

