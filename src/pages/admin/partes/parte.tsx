import { useContext, useEffect, useRef, useState } from 'react';
// import { GetServerSideProps } from 'next'
// import { useRouter } from 'next/router';
import {  useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { Box, Button, Grid, TextField } from '@mui/material';
import { DriveFileRenameOutline, SaveOutlined } from '@mui/icons-material';

import { AdminLayoutMenuList } from '../../../components/layouts'
import {  IParte  } from '../../../interfaces';
import { stutzApi } from '../../../../api';
import { AuthContext } from '../../../../context';



interface FormData {
    _id?       : string;
    codPar       : string;
    name       : string;
    email: string;
    domcomer: string;
    cuit: string;
    coniva: string;

}
const parteI = 
      {
          _id: '',
          codPar: "",
          name: "",
          email: "",
          domcomer: "",
          cuit: "",
          coniva: "",
     
      }


export const ParteAdminPage = () => {
    ////////////////////FGFGFGFG
    const { user, isLoading } = useContext(AuthContext);
    const navigate = useNavigate()

    useEffect(() => {
        if (!user && !isLoading) {
        navigate('/auth/loginadm?redirect=/admin/partes');
        }
        if (user?.role === "client" ) {
        navigate('/');
        }
    }, [user, isLoading, navigate]);
    ////////////////////FGFGFGFG


    // const router = useRouter();
    // const fileInputRef = useRef<HTMLInputElement>(null);
    // const [ newTagValue, setNewTagValue ] = useState('');
    const [isSaving, setIsSaving] = useState(false);

////////fg/fg/f/g/////////

const [defaultValues, setDefaultValues] = useState({});
const [parte, setParte] = useState(parteI);

const input1Ref = useRef<HTMLInputElement>(null);

const params = useParams();
const { id } = params;

const { register, handleSubmit, formState:{ errors }, reset } = useForm<FormData>({
    defaultValues: parte
})


useEffect(() => {
  input1Ref.current?.focus()
  loadProduct()
 }, [])


const loadProduct = async() => {
    console.log(defaultValues);
    try {

        if ( id === 'new' ) {
        // crear un parteo
        parteI._id= "",
        parteI.codPar= "",
        parteI.name= "",
        parteI.email= "",
        parteI.domcomer= "",
        parteI.cuit= "",
        parteI.coniva= ""
    } else {
        const resp = await stutzApi.get<IParte>(`/api/tes/partes/admin/${ id }`);
        parteI._id=resp.data._id,
        parteI.codPar=resp.data.codPar,
        parteI.name=resp.data.name,
        parteI.email=resp.data.email,
        parteI.domcomer=resp.data.domcomer,
        parteI.cuit=resp.data.cuit,
        parteI.coniva=resp.data.coniva
    }
  } catch (error) {
    console.log(error)
    
  }
  setDefaultValues(parteI); // Set default values
  reset(parteI); // Populate the form
  setParte(parteI);
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
        
        setIsSaving(true);
        try {
            if (form._id){
                await stutzApi.patch('/api/tes/partes/admin', form)
            }else{
                await stutzApi.post('/api/tes/partes/admin', form)
            }

            if ( !form._id ) {
                // navigate(`/admin/invoicerCon/${invoiceId}?redirect=/admin/invoices`);
                navigate(`/admin/partes`);
            } else {
                setIsSaving(false)
            }
            navigate(`/admin/partes`);


        } catch (error) {
            console.log(error);
            setIsSaving(false);
        }

    }

    return (
        <AdminLayoutMenuList 
            title={'Parte'} 
            subTitle={`Editando: ${ parteI.name }`}
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
                            inputRef={input1Ref}
                            label="Codigo"
                            variant="filled"
                            fullWidth 
                            sx={{ mb: 1 }}
                            { ...register('codPar', {
                                required: 'Este campo es requerido',
                                minLength: { value: 1, message: 'Mínimo 1 caracteres' }
                            })}
                            error={ !!errors.codPar }
                            helperText={ errors.codPar?.message }
                        />

                        <TextField
                            label="Descripción"
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
                        />

                        <TextField
                            label="Domicilio"
                            variant="filled"
                            fullWidth 
                            multiline
                            sx={{ mb: 1 }}
                            { ...register('domcomer', {
                                required: 'Este campo es requerido',
                                minLength: { value: 1, message: 'Mínimo 1 caracteres' }
                            })}
                            error={ !!errors.domcomer }
                            helperText={ errors.domcomer?.message }
                        />

                        <TextField
                            label="CUIT"
                            variant="filled"
                            fullWidth 
                            multiline
                            sx={{ mb: 1 }}
                            { ...register('cuit', {
                                required: 'Este campo es requerido',
                                minLength: { value: 1, message: 'Mínimo 1 caracteres' }
                            })}
                            error={ !!errors.cuit }
                            helperText={ errors.cuit?.message }
                        />

                        <TextField
                            label="CONDICION IVA"
                            variant="filled"
                            fullWidth 
                            multiline
                            sx={{ mb: 1 }}
                            { ...register('coniva', {
                                required: 'Este campo es requerido',
                                minLength: { value: 1, message: 'Mínimo 1 caracteres' }
                            })}
                            error={ !!errors.coniva }
                            helperText={ errors.coniva?.message }
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
