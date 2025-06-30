import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { stutzApi } from '../../../api';
import { IConfiguracion } from '../../interfaces';
import { AuthContext } from '../../../context';

export const SalePointScreen = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';
  console.log(redirect)
  const { user } = useContext( AuthContext );

  const userInfo = typeof window !== 'undefined' && localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo')!)
  : null;

  // console.log(token);
  // console.log(userInfo);





  const filtro = {
    // firstDat : getTodayInGMT3(),
    // lastDat : getTodayInGMT3(),
    firstDat : "0001-01-01",
    lastDat : "3000-01-01",
    codCus : '',
    codPar : '',
    codSup : '',
    codPro : '',
    codEnc : '',
    codCom : '',
    codIns : '',
    codVal : '',
    codCon : '',
    codUse : '',
    nameCus : 'Todos',
    nameCon : 'Todos',
    nameUse : 'Todos',
    nameSup : 'Todos',
    desPro : 'Todos',
    nameCom : 'Todos',
    desVal : 'Todos',
    nameEnc : 'Todos',
    order : 'newest',
    estado : 'TOD',
    registro : 'TOD',
  };


  const [name, setName] = useState("");
  const [salePoint, setSalePoint] = useState("");
  const [codCon, setCodCon] = useState('');
  const [configurationObj, setConfigurationObj] = useState<IConfiguracion>();
  
  const [configus, setConfigus] = useState<IConfiguracion[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await stutzApi.get(`/api/configurations/admin`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        
        setConfigus(result.data.configurations);
        
      } catch (err) {

      }
      
    };
    fetchData();

  }, []);


  const searchProduct = (codCon: string) => {
    const configusR = configus.find((row) => row._id === codCon);
    if (configusR) {
    setConfigurationObj(configusR);
    setCodCon(configusR._id);
    setName(configusR.name);
    setSalePoint(configusR.codCon);
    };
  };


const handleChange = (event: SelectChangeEvent<string>) => {
  searchProduct(event.target.value);
};


  
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user) {
    userInfo.codCon = codCon;
    userInfo.salePoint = salePoint;
    userInfo.nameCon = name;
    userInfo.configurationObj = configurationObj

      userInfo.filtro = filtro;
      userInfo.filtro.codCon = codCon;
      userInfo.filtro.nameCon = name;
      userInfo.filtro.codUse = user._id;
      userInfo.filtro.nameUse = user.name;

      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      localStorage.setItem('punto', codCon);
      localStorage.setItem('puntonum', salePoint);
      localStorage.setItem('nameCon', name);
      navigate(redirect);

    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    };
    // navigate('/admin/dashboard');
    navigate('/admin/entradas');
    window.location.reload();
  };
  
  // useEffect(() => {
  //   if (userInfo) {
    //     navigate(redirect);
    //   }
    // }, [navigate, redirect, userInfo]);
    
  return (
    <Container maxWidth="sm">
      <Box mt={4}>
        <Typography variant="h5" gutterBottom>
          Elija Punto de Venta
        </Typography>
        <Box component="form" onSubmit={submitHandler}>

          <FormControl fullWidth margin="normal">
            <InputLabel id="select-label">Punto de Venta</InputLabel>
            <Select
              labelId="select-label"
              value={codCon}
              onChange={handleChange}
              required
            >
              {configus.map((elemento) => (
                <MenuItem key={elemento._id} value={elemento._id}>
                  {elemento.codCon + " - " + elemento.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Punto de Venta"
            value={name}
            fullWidth
            margin="normal"
            disabled
          />

          <Box mt={2}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!name}
              fullWidth
            >
              Continuar
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
