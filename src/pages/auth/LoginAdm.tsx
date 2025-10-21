import { useState, useContext } from 'react';
// import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {   useNavigate } from 'react-router-dom';
import { Box, Button, Chip, Grid, TextField, Typography, IconButton, InputAdornment, } from '@mui/material';
import { ErrorOutline, Visibility, VisibilityOff } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { AuthLayout } from '../../components/layouts'
import { AuthContext, UiContext } from '../../../context';
import { validations } from '../../utils';

type FormData = {
    email   : string,
    password: string,
  };

export const LoginAdm = () => {


//////////////////ghghgh

    // const { search } = useLocation();
    // const redirectInUrl = new URLSearchParams(search).get('redirect');
    // const redirect = redirectInUrl ? redirectInUrl : '/';

//////////////////ghghgh


    const navigate = useNavigate();
    const { loginUserAdm } = useContext( AuthContext );
    const { toggleSideMenu } = useContext( UiContext );

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [ showError, setShowError ] = useState(false);

  const [showPassword, setShowPassword] = useState(false); // 👈 new state

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

    const onLoginUser = async({email, password}: FormData) => {
        setShowError(false);
        
        // try {
        //     const {data} = await stutzApi.post('/user/login', {email, password});
        //     const {token, user} = data;
        //     console.log({token, user})
        // } catch (error) {
        //     setShowError(true);
        //     setTimeout(() => setShowError(false), 3000);
        //     return;
        // }
        const isValidLogin = await loginUserAdm( email, password );

        if ( !isValidLogin ) {
            setShowError(true);
            setTimeout(() => setShowError(false), 3000);
            return;
        }        

        //Activa sidemenu
        toggleSideMenu();

        // Todo: navegar a la pantalla que el usuario estaba
        navigate('/salepoint');
        // navigate(redirect || '/');


    }



    return (
    <AuthLayout title={'Ingresar'}>
        <form onSubmit={handleSubmit(onLoginUser)} noValidate >
            
        <Box sx={{ width: 350, padding:'10px 20px' }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant='h1' component="h1">Iniciar Sesión</Typography>
                </Grid>
                <Chip 
                                label="No reconocemos ese usuario / contraseña"
                                color="error"
                                icon={ <ErrorOutline /> }
                                className="fadeIn"
                                sx={{ display: showError ? 'flex': 'none' }}
                            />
  
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
                    <Button type="submit"
                     color="secondary" className='circular-btn' size='large' fullWidth>
                        Ingresar
                    </Button>
                </Grid>

                {/* <Grid item xs={12} display='flex' justifyContent='end'>
                    <NavLink to="/auth/register" >
                            ¿No tienes cuenta?
                    </NavLink>
                </Grid> */}
            </Grid>
        </Box>
        </form>
    </AuthLayout>
  )
}

