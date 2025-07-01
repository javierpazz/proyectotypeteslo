import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import {
  Button,
  Box,
  Typography,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { AdminLayoutMenu } from '../../components/layouts';
import { CategoryOutlined } from '@mui/icons-material';
import { BuscaPar, BuscaCli, BuscaPro, BuscaIns, BuscaCon, BuscaUse } from '../../components/buscador';



export const Filtro = () => {

  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';



        const userInfo = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo')!)
    : null;


  const input5Ref = useRef<HTMLInputElement>(null);
  const input7Ref = useRef<HTMLInputElement>(null);
  const input9Ref = useRef<HTMLInputElement>(null);


  const getTodayInGMT3 = () => {
    const now = new Date();
    // Convertimos a la hora de Argentina (GMT-3)
    const offset = now.getTimezoneOffset(); // En minutos
    const localDate = new Date(now.getTime() - (offset + 180) * 60 * 1000); // 180 = 3 horas
    
    return localDate.toISOString().split("T")[0];
  };

  const [codIns, setCodIns] = useState('');
  const [nameIns, setNameIns] = useState('');
  const [codCon, setCodCon] = useState('');
  const [nameCon, setNameCon] = useState('');
  const [codUse, setCodUse] = useState('');
  const [nameUse, setNameUse] = useState('');
  const [codPro, setCodPro] = useState('');
  const [desPro, setDesPro] = useState('');
  const [codCus, setCodCus] = useState('');
  const [nameCus, setNameCus] = useState('');
  const [codPar, setCodPar] = useState('');
  const [namePar, setNamePar] = useState('');

  const [firstDat, setFirstDat] = useState(getTodayInGMT3());
  const [lastDat, setLastDat] = useState(getTodayInGMT3());

  const [codCom, setCodCom] = useState('');
  const [nameCom, setNameCom] = useState('');
  const [codSup, setCodSup] = useState('');
  const [nameSup, setNameSup] = useState('');
  const [codEnc, setCodEnc] = useState('');
  const [nameEnc, setNameEnc] = useState('');
  const [codVal, setCodVal] = useState('');
  const [desVal, setDesVal] = useState('');
  
  const [order, setOrder] = useState('newest');
  const [estado, setEstado] = useState('TOD');
  const [registro, setRegistro] = useState('TOD');
  // const [isReg, setIsReg] = useState(false);
  // const [isPro, setIsPro] = useState(false);
  const [obser, setObser] = useState('');
  


console.log(codCom,
nameCom,
codSup,
nameSup,
codEnc,
nameEnc,
codVal,
desVal,);



  const filtroCero = {
    firstDat : getTodayInGMT3(),
    lastDat : getTodayInGMT3(),
    codCus : '',
    codPar : '',
    codIns : '',
    codSup : '',
    codPro : '',
    codEnc : '',
    codCom : '',
    codVal : '',
    codCon : '',
    codUse : '',
    nameCus : 'Todos',
    namePar : 'Todos',
    nameCon : 'Todos',
    nameUse : 'Todos',
    nameSup : 'Todos',
    desPro : 'Todos',
    nameCom : 'Todos',
    nameIns : 'Todos',
    desVal : 'Todos',
    nameEnc : 'Todos',
    order : 'newest',
    estado : 'TOD',
    registro : 'TOD',
    obser : '',
  };

  const filtro = {
    firstDat : firstDat,
    lastDat : lastDat,
    codCus : codCus,
    codPar : codPar,
    // codSup : codSup,
    codPro : codPro,
    // codEnc : codEnc,
    // codCom : codCom,
    codIns : codIns,
    // codVal : codVal,
    codCon : codCon,
    codUse : codUse,
    nameCus : nameCus,
    namePar : namePar,
    desPro : desPro,
    nameIns : nameIns,
    nameUse : nameUse,
    nameCon : nameCon,
    order : order,
    estado : estado,
    registro : registro,
    obser : obser,

  };

  useEffect(() => {
    if (userInfo.filtro) { 
      // setName('Elija Cliente');
      // setNameEnc('Elija Encargado');
      // setDesPro('Elija un Producto');
      // setNameSup('Elija Proovedor');
      // setNameCom('Elija Documento');
      setFirstDat(userInfo.filtro.firstDat);
      setLastDat(userInfo.filtro.lastDat);
      setCodCus(userInfo.filtro.codCus);
      setNameCus(userInfo.filtro.nameCus);
      setCodPar(userInfo.filtro.codPar);
      setNamePar(userInfo.filtro.namePar);
      setCodPro(userInfo.filtro.codPro);
      setDesPro(userInfo.filtro.desPro);
      setCodIns(userInfo.filtro.codIns);
      setNameIns(userInfo.filtro.nameIns);
      setCodSup(userInfo.filtro.codSup);
      setNameSup(userInfo.filtro.nameSup);
      setCodCom(userInfo.filtro.codCom);
      setNameCom(userInfo.filtro.nameCom);
      setCodEnc(userInfo.filtro.codEnc);
      setNameEnc(userInfo.filtro.nameEnc);
      setCodUse(userInfo.filtro.codUse);
      setNameUse(userInfo.filtro.nameUse);
      setCodCon(userInfo.filtro.codCon);  
      setNameCon(userInfo.filtro.nameCon);
      setCodVal(userInfo.filtro.codVal);
      setDesVal(userInfo.filtro.desVal);
      setOrder(userInfo.filtro.order);
      setEstado(userInfo.filtro.estado);
      setRegistro(userInfo.filtro.registro);
      setObser(userInfo.filtro.obser);
    }else{
      setFirstDat('Todos');
      setLastDat('Todos');
      // setCodCus('Todos');
      setNameCus('Todos');
      // setCodPar('Todos');
      setNamePar('Todos');
      // setCodPro('Todos');
      setDesPro('Todos');
      setNameIns('Todos');
      // setCodSup('Todos');
      setNameSup('Todos');
      // setCodCom('Todos');
      setNameCom('Todos');
      // setCodEnc('Todos');
      setNameEnc('Todos');
      // setCodUse('Todos');
      setNameUse('Todos');
      // setCodCon('Todos');
      setNameCon('Todos');
      setDesVal('Todos');
      setOrder('newest');
      setEstado('TOD');
      setRegistro('TOD');
      setObser('');
    }
    ;
}, []);





  const placeCancelaFiltro = async () => {
    navigate(redirect);
  };
  const placeLimpiaFiltro = async () => {
    if (window.confirm('Esta seguro de Grabar Parametros?')) {
      userInfo.filtro = filtroCero;
      userInfo.filtro.firstDat = "0001-01-01";
      userInfo.filtro.lastDat = "3000-01-01";

      // userInfo.filtro.codCon = userInfo.codCon;
      // userInfo.filtro.nameCon = userInfo.nameCon;

      localStorage.setItem('userInfo', JSON.stringify(userInfo));
    navigate(redirect);
    };
  };

  const placeInvoiceHandler = async () => {
    if (window.confirm('Esta seguro de Grabar Parametros?')) {
      filtro.firstDat = firstDat;
      filtro.lastDat = lastDat;
      filtro.codCus = codCus;
      filtro.nameCus = nameCus;
      filtro.codPar = codPar;
      filtro.namePar = namePar;
      filtro.codPro = codPro;
      filtro.desPro = desPro;
      // filtro.codSup = codSup;
      // filtro.nameSup = nameSup;
      // filtro.codCom = codCom;
      // filtro.nameCom = nameCom;
      filtro.codIns = codIns;
      filtro.nameIns = nameIns;
      // filtro.codEnc = codEnc;
      // filtro.nameEnc = nameEnc;
      filtro.codUse = codUse;
      filtro.nameUse = nameUse;
      filtro.codCon = codCon;
      filtro.nameCon = nameCon;
      filtro.order = order;

        userInfo.filtro = filtro
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        navigate(redirect);
    };  
  };




  return (
    <AdminLayoutMenu 
        title={`Entredas`} 
        subTitle={'Generando Entredas'}
        icon={ <CategoryOutlined /> }
    >

      <Box border={1} p={2} borderRadius={2}>
      <Box p={2} mb={2}>
        <Grid container>
          <Grid item md={4}>
                <Typography variant="h1"></Typography>
          </Grid>

          <Grid item md={4}>
                    <Typography variant="h1">FILTROS</Typography>
          </Grid>
        </Grid>




        <Grid container spacing={2} mt={2}>
          <Grid item md={2}>
            <TextField
              fullWidth
              inputRef={input9Ref}
              type="date"
              label="Desde"
              value={firstDat}
              onChange={(e) => setFirstDat(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && input5Ref.current?.focus()}
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item md={2}>
            <TextField
              fullWidth
              inputRef={input5Ref}
              type="date"
              label="Hasta"
              value={lastDat}
              onChange={(e) => setLastDat(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && input7Ref.current?.focus()}
              required
                            InputLabelProps={{
                shrink: true,
              }}

            />
          </Grid>


              <Grid item md={2}>

                  <FormControl fullWidth >
                    <InputLabel id="order-label">Orden</InputLabel>
                    <Select
                      labelId="order-label"
                      id="order"
                      value={order}
                      label="Orden"
                      onChange={(e) => setOrder(e.target.value)}
                      >
                      <MenuItem value="newest">Fecha Desc</MenuItem>
                      <MenuItem value="oldest">Fecha Asc</MenuItem>
                    </Select>
                  </FormControl>
            </Grid>
              <Grid item md={2}>

                  <FormControl fullWidth >
                    <InputLabel id="estado-label">Estados</InputLabel>
                    <Select
                      labelId="estado-label"
                      id="estado"
                      value={estado}
                      label="Estado"
                      onChange={(e) => setEstado(e.target.value)}
                      >
                      <MenuItem value="TOD">Todas Entradas/Diligencias </MenuItem>
                      <MenuItem value="EST">Sin Terminar</MenuItem>
                      <MenuItem value="ET">Terminadas</MenuItem>
                    </Select>
                  </FormControl>
            </Grid>
              <Grid item md={2}>

                  <FormControl fullWidth >
                    <InputLabel id="registro-label">Asientos</InputLabel>
                    <Select
                      labelId="Asiento-label"
                      id="registro"
                      value={registro}
                      label="Asiento"
                      onChange={(e) => setRegistro(e.target.value)}
                      >
                      <MenuItem value="TOD">Todas Entradas/Diligencias </MenuItem>
                      <MenuItem value="REGI">Registradas</MenuItem>
                      <MenuItem value="NREGI">No Registradas</MenuItem>
                      <MenuItem value="PROT">Protocolizadas</MenuItem>
                      <MenuItem value="NPROT">No Protocolizadas</MenuItem>
                    </Select>
                  </FormControl>
            </Grid>
              <Grid item md={2}>
                <TextField
                  fullWidth
                  label="Observaciones"
                  placeholder="Observaciones"
                  value={obser}
                  onChange={(e) => setObser(e.target.value)}
                  // onKeyDown={(e) => e.key === "Enter" && input11Ref.current?.focus()}
                />
              </Grid>



              {/* <Grid item md={2}>

              <FormControlLabel
                control={
                  <Checkbox
                  id="isReg"
                  checked={isReg}
                  onChange={(e) => setIsReg(e.target.checked)}
                  />
                }
                label="Entradas Terminadas"
                sx={{ mb: 3 }}
                />
                </Grid>

              <Grid item md={2}>

              <FormControlLabel
                control={
                  <Checkbox
                  id="isPro"
                  checked={isPro}
                  onChange={(e) => setIsPro(e.target.checked)}
                  />
                }
                label="Diligencias Terminadas"
                sx={{ mb: 3 }}
                />
                </Grid> */}

                  </Grid>

        <Grid container spacing={2} mt={2}>

            <BuscaCon
            codCon={codCon}
            setCodCon={setCodCon}
            nameCon={nameCon}
            setNameCon={setNameCon}
            />


            <BuscaUse
            codUse={codUse}
            setCodUse={setCodUse}
            nameUse={nameUse}
            setNameUse={setNameUse}
            />

        </Grid>
        <Grid container spacing={2} mt={2}>

            <BuscaIns
            codIns={codIns}
            setCodIns={setCodIns}
            nameIns={nameIns}
            setNameIns={setNameIns}
            />

            <BuscaPro
            codPro={codPro}
            setCodPro={setCodPro}
            desPro={desPro}
            setDesPro={setDesPro}
            />

        </Grid>
        <Grid container spacing={2} mt={2}>

            <BuscaCli
            codCus={codCus}
            setCodCus={setCodCus}
            nameCus={nameCus}
            setNameCus={setNameCus}
            />


            <BuscaPar
            codPar={codPar}
            setCodPar={setCodPar}
            namePar={namePar}
            setNamePar={setNamePar}
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
                  onClick={placeCancelaFiltro}
                >
                  CANCELA
                </Button>
              </Box>
            </Grid>

            <Grid item xs={12} sm={3} md={4}>
              <Box display="flex" flexDirection="column" width="100%">
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={placeLimpiaFiltro}
                >
                  RESETEA FILTRO
                </Button>
              </Box>
            </Grid>

            <Grid item xs={12} sm={3} md={4}>
              <Box display="flex" flexDirection="column" width="100%">
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={placeInvoiceHandler}
                >
                  GRABA PARÁMETROS
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

