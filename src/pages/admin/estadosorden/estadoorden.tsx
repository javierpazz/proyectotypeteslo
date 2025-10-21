import { useContext, useEffect, useRef, useState } from 'react';
// import { GetServerSideProps } from 'next'
// import { useRouter } from 'next/router';
import {  useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { Box, Button, Grid, TextField } from '@mui/material';
import { DriveFileRenameOutline, SaveOutlined } from '@mui/icons-material';

import { AdminLayoutMenuList } from '../../../components/layouts'
import { IEstadoOrden } from '../../../interfaces';
import { stutzApi } from '../../../../api';
import { AuthContext } from '../../../../context';



interface FormData {
    _id?       : string;
    note       : string;
    name       : string;
}
const estadoordenI = 
      {
          _id: '',
          note: "",
          name: "",
     
      }


export const EstadoordenAdminPage = () => {
    ////////////////////FGFGFGFG
    const { user, isLoading } = useContext(AuthContext);
    const navigate = useNavigate()

    useEffect(() => {
        if (!user && !isLoading) {
        navigate('/auth/loginadm?redirect=/admin/estadosorden');
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
const [estadoorden, setEstadoorden] = useState(estadoordenI);

const input1Ref = useRef<HTMLInputElement>(null);

const params = useParams();
const { id } = params;

const { register, handleSubmit, formState:{ errors }, reset } = useForm<FormData>({
    defaultValues: estadoorden
})


useEffect(() => {
  input1Ref.current?.focus()
  loadProduct()
 }, [])


const loadProduct = async() => {
    console.log(defaultValues);
    try {

        if ( id === 'new' ) {
        // crear un estadoordeno
        estadoordenI._id= "",
        estadoordenI.note= "",
        estadoordenI.name= ""
    } else {
        const resp = await stutzApi.get<IEstadoOrden>(`/api/tes/admin/estadosorden/${ id }`);
        estadoordenI._id=resp.data._id,
        estadoordenI.note=resp.data.note,
        estadoordenI.name=resp.data.name
    }
  } catch (error) {
    console.log(error)
    
  }
  setDefaultValues(estadoordenI); // Set default values
  reset(estadoordenI); // Populate the form
  setEstadoorden(estadoordenI);
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
                await stutzApi.put('/api/tes/admin/estadosorden', form)
            }else{
                await stutzApi.post('/api/tes/admin/estadosorden', form)
            }

            if ( !form._id ) {
                // navigate(`/admin/invoicerCon/${invoiceId}?redirect=/admin/invoices`);
                navigate(`/admin/estadosorden`);
            } else {
                setIsSaving(false)
            }
            navigate(`/admin/estadosorden`);

        } catch (error) {
            console.log(error);
            setIsSaving(false);
        }

    }

    return (
        <AdminLayoutMenuList 
            title={'Estado Orden'} 
            subTitle={`Editando: ${ estadoordenI.name }`}
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
                            label="Estado"
                            variant="filled"
                            fullWidth 
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
                            label="Descripción"
                            variant="filled"
                            fullWidth 
                            multiline
                            sx={{ mb: 1 }}
                            { ...register('note', {
                                required: 'Este campo es requerido',
                                minLength: { value: 1, message: 'Mínimo 1 caracteres' }
                            })}
                            error={ !!errors.note }
                            helperText={ errors.note?.message }
                            InputLabelProps={{shrink: true}}
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
