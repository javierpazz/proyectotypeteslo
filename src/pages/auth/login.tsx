import { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { AuthLayout } from '../../components/layouts'
import { AuthContext } from '../../../context';
import { validations } from '../../utils';
import stutzApi from '../../../api/stutzApi';

type FormData = {
    email   : string,
    password: string,
  };

export const Login = () => {

    const navigate = useNavigate();
    const { loginUser } = useContext( AuthContext );

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [ showError, setShowError ] = useState(false);


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
        const isValidLogin = await loginUser( email, password );

        if ( !isValidLogin ) {
            setShowError(true);
            setTimeout(() => setShowError(false), 3000);
            return;
        }        
    
        navigate ("/");

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
                <Grid item xs={12}>
                    <TextField label="Contraseña" type='password' variant="filled" fullWidth
                                { ...register('password', {
                                    required: 'Este campo es requerido',
                                    minLength: { value: 6, message: 'Mínimo 6 caracteres' }
                                })}
                                error={ !!errors.password }
                                helperText={ errors.password?.message }
                    
                    />
                </Grid>

                <Grid item xs={12}>
                    <Button type="submit"
                     color="secondary" className='circular-btn' size='large' fullWidth>
                        Ingresar
                    </Button>
                </Grid>

                <Grid item xs={12} display='flex' justifyContent='end'>
                    <NavLink to="/auth/register" >
                            ¿No tienes cuenta?
                    </NavLink>
                </Grid>
            </Grid>
        </Box>
        </form>
    </AuthLayout>
  )
}

