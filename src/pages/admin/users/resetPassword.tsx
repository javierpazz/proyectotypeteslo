import { useContext, useEffect, useState } from 'react';
// import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Chip, Grid, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { ErrorOutline, Visibility, VisibilityOff } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';

import { AuthLayout } from '../../../components/layouts'
import { AuthContext } from '../../../../context';
import { validations } from '../../../utils';
import { stutzApi } from '../../../../api';

type FormData = {
  password               : string,
  confirmpassword        : string,
};

export const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();

  console.log("token");
  console.log(token);
  Cookies.set('token', token! );

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [ showError, setShowError ] = useState(false);

    const [showPassword, setShowPassword] = useState(false); // 👈 new state
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const [showConPassword, setShowConPassword] = useState(false); // 👈 new state
    const handleClickShowConPassword = () => setShowConPassword(!showConPassword);
    const handleMouseDownConPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const { user : userInfo } = useContext(AuthContext);

    // useEffect(() => {
    //     if (userInfo || !token) {
    //     navigate('/');
    //     }
    // }, [navigate, userInfo, token]);


    const onRecPassword = async({password,confirmpassword }: FormData) => {
        setShowError(false);
        if (password !== confirmpassword) {
            setShowError(true);
          return;
        } else {
            setShowError(false);
        }
        
        try {
            await stutzApi.post('/api/users/reset-password', {password,
        token});
        } catch (error) {
            setShowError(true);
            setTimeout(() => setShowError(false), 3000);
            return;
        }
    
        navigate('/');


    }



    return (
    <AuthLayout title={'Ingresar'}>
        <form onSubmit={handleSubmit(onRecPassword)} noValidate >
            
        <Box sx={{ width: 350, padding:'10px 20px' }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant='h1' component="h1">Recuperar Password</Typography>
                </Grid>
                <Chip 
                                label="Password Incorrecto"
                                color="error"
                                icon={ <ErrorOutline /> }
                                className="fadeIn"
                                sx={{ display: showError ? 'flex': 'none' }}
                            />
  
            <Grid item xs={12}>
              <TextField
                label="Contraseña"
                type={showPassword ? 'text' : 'password'} // 👈 toggle type
                variant="filled"
                fullWidth
                {...register('password', {
                  required: 'Este campo es requerido',
                  minLength: { value: 6, message: 'Mínimo 6 caracteres y dos letras una mayuscula' },
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
              <TextField
                label="Confirma Contraseña"
                type={showConPassword ? 'text' : 'password'} // 👈 toggle type
                variant="filled"
                fullWidth
                {...register('confirmpassword', {
                  required: 'Este campo es requerido',
                  minLength: { value: 6, message: 'Mínimo 6 caracteres y dos letras una mayuscula' },
                })}
                error={!!errors.confirmpassword}
                helperText={errors.confirmpassword?.message}
                InputProps={{
                  endAdornment: ( // 👇 icon to show/hide password
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowConPassword}
                        onMouseDown={handleMouseDownConPassword}
                        edge="end"
                      >
                        {showConPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>



                <Grid item xs={12}>
                    <Button type="submit"
                     color="secondary" className='circular-btn' size='large' fullWidth>
                        Enviar
                    </Button>
                </Grid>

            </Grid>
        </Box>
        </form>
    </AuthLayout>
  )
}

