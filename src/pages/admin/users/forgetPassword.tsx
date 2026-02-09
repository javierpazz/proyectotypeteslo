import { useState, useContext } from 'react';
// import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, Chip, Grid, TextField, Typography } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { AuthLayout } from '../../../components/layouts'
import { AuthContext } from '../../../../context';
import { validations } from '../../../utils';
import { stutzApi } from '../../../../api';

type FormData = {
    email   : string,
    password: string,
  };

export const ForgetPassword = () => {


    const navigate = useNavigate();



    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [ showError, setShowError ] = useState(false);



    const onForPassword = async({email}: FormData) => {
        setShowError(false);
        
        try {
            await stutzApi.post('/api/users/forget-password', {email});
        } catch (error) {
            setShowError(true);
            setTimeout(() => setShowError(false), 3000);
            return;
        }
    
        navigate('/');


    }



    return (
    <AuthLayout title={'Ingresar'}>
        <form onSubmit={handleSubmit(onForPassword)} noValidate >
            
        <Box sx={{ width: 350, padding:'10px 20px' }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant='h1' component="h1">Olvido su Password</Typography>
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
                    <Button type="submit"
                     color="secondary" className='circular-btn' size='large' fullWidth>
                        Enviar y revise su mail
                    </Button>
                </Grid>

            </Grid>
        </Box>
        </form>
    </AuthLayout>
  )
}

