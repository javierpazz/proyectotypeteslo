import { useContext, useEffect, useRef, useState } from 'react';
// import { GetServerSideProps } from 'next'
// import { useRouter } from 'next/router';
import {  useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { Box, Button, Grid, TextField, IconButton, InputAdornment, } from '@mui/material';
import { DriveFileRenameOutline, SaveOutlined } from '@mui/icons-material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import { AdminLayoutMenuList } from '../../../components/layouts'
import {  IUser  } from '../../../interfaces';
import { stutzApi } from '../../../../api';
import { AuthContext } from '../../../../context';
import { FullScreenLoading } from '../../../components/ui';

interface FormData {
    _id?       : string;
    name       : string;
    email       : string;
    isAdmin     : boolean,
    isActive    : boolean,
    password    : string,
    passwordNue    : string,
    passwordConNue    : string,
    role        :string,
    puede: boolean,
}



const userI = 
      {
          _id: '',
          name: "",
          email: "",
        isAdmin: false,
        isActive: true,
        password: "Aa123456",
        passwordNue: "",
        passwordConNue: "",
        role:'user',
        puede: false,
      }


export const UserAdminPage = () => {
    ////////////////////FGFGFGFG
    const { user : user1, isLoading } = useContext(AuthContext);
    const navigate = useNavigate()

    useEffect(() => {
        if (!user1 && !isLoading) {
        navigate('/auth/loginadm?redirect=/admin/users');
        }
        if (user1?.role === "client" ) {
        navigate('/');
        }
    }, [user1, isLoading, navigate]);
    ////////////////////FGFGFGFG


    // const router = useRouter();
    // const fileInputRef = useRef<HTMLInputElement>(null);
    // const [ newTagValue, setNewTagValue ] = useState('');
    const [isSaving, setIsSaving] = useState(false);

////////fg/fg/f/g/////////
const [defaultValues, setDefaultValues] = useState({});
void defaultValues;
const [user, setUser] = useState(userI);

const input1Ref = useRef<HTMLInputElement>(null);

const params = useParams();
const { id } = params;

  const [showPassword, setShowPassword] = useState(false); // 👈 new state
  const [showPasswordN, setShowPasswordN] = useState(false); // 👈 new state
  const [showPasswordCN, setShowPasswordCN] = useState(false); // 👈 new state

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const handleClickShowPasswordN = () => setShowPasswordN(!showPasswordN);
  const handleMouseDownPasswordN = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const handleClickShowPasswordCN = () => setShowPasswordCN(!showPasswordCN);
  const handleMouseDownPasswordCN = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };



const { register, handleSubmit, formState:{ errors }, reset } = useForm<FormData>({
    defaultValues: user
})


useEffect(() => {
  input1Ref.current?.focus()
  loadProduct()
 }, [])


const loadProduct = async() => {
    try {

        if ( id === 'new' ) {
        // crear un usero
        userI._id= "",
        userI.name= ""
        userI.email= ""
        userI.isAdmin= false,
        userI.isActive= true,
        userI.password= "",
        userI.passwordNue= "",
        userI.passwordConNue= "",
        userI.role='user'
    } else {

        const resp = await stutzApi.get<IUser>(`/api/tes/admin/users/${ id }`);
        userI._id=resp.data._id,
        userI.name=resp.data.name
        userI.email=resp.data.email
        userI.isAdmin=resp.data.isAdmin
        userI.isActive=resp.data.isActive
        userI.password=""
        userI.passwordNue=""
        userI.passwordConNue=""
        userI.role=resp.data.role
    }
  } catch (error) {
    
  }
  setDefaultValues(userI); // Set default values
  reset(userI); // Populate the form
  setUser(userI);
 }


////////fg/fg/f/g/////////

    // useEffect(() => {
    //   const subscription = watch(( value, { name } ) => {
    //       if ( name === 'name' ) {
    //           const newSlug = value.name?.trim()
    //                 .replaceAll(' ', '_')
    //                 .replaceAll("'", '')
    //                 .toLocaleLowerCase() || '';

    //            setValue('slug', newSlug);
    //       }
    //   });
    //   return () => subscription.unsubscribe();
    // }, [watch, setValue])
    







    const onSubmit = async( form: FormData ) => {

        if (form.passwordNue !== form.passwordConNue) {
                window.confirm('No es correcto el nuevo Password');
                return;
        }


        setIsSaving(true);
        try {

            (user1!.role === 'admin') ? form.puede = true : form.puede = false;

            if (form._id){
                await stutzApi.put('/api/tes/admin/users', form)
            }else{
                await stutzApi.post('/api/tes/admin/users', form)
            }

            if ( !form._id ) {
                // navigate(`/admin/invoicerCon/${invoiceId}?redirect=/admin/invoices`);
                navigate(`/admin/users`);
            } else {
                setIsSaving(false)
            }
            navigate(`/admin/users`);


        } catch (error) {
            setIsSaving(false);
        }

    }
    if (isLoading) return <FullScreenLoading/>; 
    

    return (
        <AdminLayoutMenuList 
            title={'Usuario'} 
            subTitle={`Editando: ${ userI.name }`}
            icon={ <DriveFileRenameOutline /> }
        >
            <form onSubmit={ handleSubmit( onSubmit ) }>
                <Box display='flex' justifyContent='end' sx={{ mb: 1 }}>
                    <Button 
                        color="secondary"
                        startIcon={ <SaveOutlined /> }
                        sx={{ width: '150px' }}
                        type="submit"
                        disabled={ isSaving }
                        >
                        Guardar
                    </Button>
                </Box>

                <Grid container spacing={2}>
                    {/* Data */}
                    <Grid item xs={12} sm={ 6 }>

                        <TextField
                            label="Nombre"
                            variant="filled"
                            fullWidth 
                            multiline
                            sx={{ mb: 1 }}
                            { ...register('name', {
                                required: 'Este campo es requerido',
                                minLength: { value: 1, message: 'Mínimo 1 caracteres' }
                            })}
                            error={ !!errors.name }
                            helperText={ errors.name?.message }
                            InputLabelProps={{shrink: true}}
                        />

                        <TextField
                            label="Email"
                            variant="filled"
                            fullWidth 
                            multiline
                            sx={{ mb: 1 }}
                            { ...register('email', {
                                required: 'Este campo es requerido',
                                minLength: { value: 1, message: 'Mínimo 1 caracteres' }
                            })}
                            error={ !!errors.email }
                            helperText={ errors.email?.message }
                            InputLabelProps={{shrink: true}}
                        />

                        {/* <TextField
                            label="Password"
                            variant="filled"
                            fullWidth 
                            multiline
                            sx={{ mb: 1 }}
                            { ...register('password', {
                                // required: 'Este campo es requerido',
                                required: (user1!.role !== 'admin') ? 'Este campo es requerido' : false,    
                                minLength: { value: 1, message: 'Mínimo 1 caracteres' }
                            })}
                            error={ !!errors.password }
                            helperText={ errors.password?.message }
                            InputLabelProps={{shrink: true}}
                        /> */}
                        {/* <TextField
                            label="Nuevo Password"
                            variant="filled"
                            fullWidth 
                            multiline
                            sx={{ mb: 1 }}
                            { ...register('passwordNue', )}
                            error={ !!errors.passwordNue }
                            helperText={ errors.passwordNue?.message }
                            InputLabelProps={{shrink: true}}
                        /> */}
                        {/* <TextField
                            label="Confirma Nuevo Password"
                            variant="filled"
                            fullWidth 
                            multiline
                            sx={{ mb: 1 }}
                            { ...register('passwordConNue', )}
                            error={ !!errors.passwordConNue }
                            helperText={ errors.passwordConNue?.message }
                            InputLabelProps={{shrink: true}}
                        />
 */}

              {/* <TextField
                label="Contraseña"
                type={showPassword ? 'text' : 'password'} // 👈 toggle type
                variant="filled"
                fullWidth
                sx={{ mb: 1 }}
                {...register('password', {
                  required: (user1!.role !== 'admin') ? 'Este campo es requerido' : false,    
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
              /> */}


              <TextField
                label="Nuevo Password"
                type={showPasswordN ? 'text' : 'password'} // 👈 toggle type
                variant="filled"
                fullWidth
                sx={{ mb: 1 }}
                {...register('passwordNue', {
                  required: 'Este campo es requerido',
                  minLength: { value: 6, message: 'Mínimo 6 caracteres y dos letras una mayuscula' },
                })}
                error={!!errors.passwordNue}
                helperText={errors.passwordNue?.message}
                InputProps={{
                  endAdornment: ( // 👇 icon to show/hide password
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPasswordN}
                        onMouseDown={handleMouseDownPasswordN}
                        edge="end"
                      >
                        {showPasswordN ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />


              <TextField
                label="Confirma Nuevo Password"
                type={showPasswordCN ? 'text' : 'password'} // 👈 toggle type
                variant="filled"
                fullWidth
                sx={{ mb: 1 }}
                {...register('passwordConNue', {
                  required: 'Este campo es requerido',
                  minLength: { value: 6, message: 'Mínimo 6 caracteres y dos letras una mayuscula' },
                })}
                error={!!errors.passwordConNue}
                helperText={errors.passwordConNue?.message}
                InputProps={{
                  endAdornment: ( // 👇 icon to show/hide password
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPasswordCN}
                        onMouseDown={handleMouseDownPasswordCN}
                        edge="end"
                      >
                        {showPasswordCN ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />



                    </Grid>

                    {/* Tags e imagenes */}
                    <Grid item xs={12} sm={ 6 }>
                    </Grid>

                </Grid>
            </form>
        </AdminLayoutMenuList>
    )
}
