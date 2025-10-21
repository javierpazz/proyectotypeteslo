import { useContext, useState } from 'react';
// import NextLink from 'next/link';
import { NavLink, useNavigate } from 'react-router-dom';
import { Box, Button, Chip, Grid, TextField, Typography, IconButton, InputAdornment, } from '@mui/material';
import { useForm } from 'react-hook-form';
import { ErrorOutline, Visibility, VisibilityOff } from '@mui/icons-material';

import { AuthLayout } from '../../components/layouts'
import { validations } from '../../utils';
import { AuthContext } from '../../../context';

type FormData = {
    name    : string,
    email   : string,
    password: string,
  };


export const Register = () => {
    const navigate = useNavigate();
    const { registerUser } = useContext( AuthContext );
    const [punto, setPunto] = useState(localStorage.getItem('punto'));


    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  void setPunto;

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
    nameIns : 'Todos',
    namePar : 'Todos',
    nameCom : 'Todos',
    desVal : 'Todos',
    nameEnc : 'Todos',
    order : 'newest',
    estado : 'TOD',
    registro : 'TOD',
    obser : '',
  };

    const [showError, setShowError] = useState(false)
    const [ errorMessage, setErrorMessage ] = useState('');
  const [showPassword, setShowPassword] = useState(false); // 👈 new state

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };



    const onRegisterForm = async({name, email, password}: FormData) => {
        setShowError(false);
        const { hasError, message } = await registerUser(name, email, password, punto!);
        
        // try {
        //     const {data} = await stutzApi.post('/user/register', {name, email, password});
        //     const {token, user} = data;
        //     console.log({token, user})
        // } catch (error) {
        //     setShowError(true);
        //     setTimeout(() => setShowError(false), 3000);
        //     return;
        // }

        if (errorMessage) {};
        if ( hasError ) {
            setShowError(true);
            setErrorMessage( message! );
            setTimeout(() => setShowError(false), 3000);
            return;
        }

        const userInfo = typeof window !== 'undefined' && localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo')!)
        : {};
        
        console.log('punto')
        console.log(punto)
        console.log(userInfo)
        console.log('punto')
          userInfo.filtro = filtro;
          userInfo.codCon = punto;
          userInfo.user = userInfo.user;
          localStorage.setItem('userInfo', JSON.stringify(userInfo));




        // Todo: navegar a la pantalla que el usuario estaba
        navigate ("/");


    }


  return (
    <AuthLayout title={'Ingresar'}>
        <form onSubmit={handleSubmit(onRegisterForm)}  noValidate >

        <Box sx={{ width: 350, padding:'10px 20px' }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant='h1' component="h1">Crear cuenta</Typography>
                </Grid>
                <Chip 
                                label="No reconocemos ese usuario / contraseña"
                                color="error"
                                icon={ <ErrorOutline /> }
                                className="fadeIn"
                                sx={{ display: showError ? 'flex': 'none' }}
                            />

                <Grid item xs={12}>
                    <TextField label="Nombre completo" variant="filled" fullWidth
                                { ...register('name', {
                                    required: 'Este campo es requerido',
                                    minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                                })}
                                error={ !!errors.name }
                                helperText={ errors.name?.message }
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    type="email"
                     label="Correo" variant="filled" fullWidth
                                        { ...register('email', {
                                            required: 'Este campo es requerido',
                                            validate: validations.isEmail
                                            
                                        })}
                                        error={ !!errors.email }
                                        helperText={ errors.email?.message }
                    
                    />
                </Grid>
                {/* <Grid item xs={12}>
                    <TextField label="Contraseña" type='password' variant="filled" fullWidth
                                { ...register('password', {
                                    required: 'Este campo es requerido',
                                    minLength: { value: 6, message: 'Mínimo 6 caracteres' }
                                })}
                                error={ !!errors.password }
                                helperText={ errors.password?.message }
                    />
                </Grid> */}
            <Grid item xs={12}>
              <TextField
                label="Contraseña"
                type={showPassword ? 'text' : 'password'} // 👈 toggle type
                variant="filled"
                fullWidth
                {...register('password', {
                  required: 'Este campo es requerido',
                  minLength: { value: 6, message: 'Mínimo 6 caracteres' },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
                InputProps={{
                  endAdornment: ( // 👇 icon to show/hide password
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

                <Grid item xs={12}>
                    <Button type="submit" color="secondary" className='circular-btn' size='large' fullWidth>
                        Ingresar
                    </Button>
                </Grid>

                <Grid item xs={12} display='flex' justifyContent='end'>
                <NavLink to="/auth/login" >
                            ¿Ya tienes cuenta?
                </NavLink>
                </Grid>
            </Grid>
        </Box>
        </form>
    </AuthLayout>
  )
}

