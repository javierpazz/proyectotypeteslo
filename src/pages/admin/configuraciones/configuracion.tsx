import { useContext, useEffect, useRef, useState } from 'react';
// import { GetServerSideProps } from 'next'
// import { useRouter } from 'next/router';
import {  useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { Box, Button, Grid, TextField } from '@mui/material';
import { DriveFileRenameOutline, SaveOutlined } from '@mui/icons-material';

import { AdminLayoutMenuList } from '../../../components/layouts'
import {  IConfiguracion  } from '../../../interfaces';
import { stutzApi } from '../../../../api';
import { AuthContext } from '../../../../context';



interface FormData {
    _id?       : string;
    codCon       : string;
    name       : string;
    domcomer: string;
    cuit: string;
    coniva: string;
    ib: string;
    feciniact: string;
    numIntRem: number;
    numIntRec: number;
    numIntOdp: number;
    numIntCaj: number;
    numIntMov: number;
}
const configuracionI = 
      {
          _id: '',
          codCon: "",
          name: "",
          domcomer: "",
          cuit: "",
          coniva: "",
        ib: "",
        feciniact: "",
        numIntRem: 0,
        numIntRec: 0,
        numIntOdp: 0,
        numIntCaj: 0,
        numIntMov: 0,     
      }


export const ConfiguracionAdminPage = () => {
    ////////////////////FGFGFGFG
    const { user, isLoading } = useContext(AuthContext);
    const navigate = useNavigate()

    useEffect(() => {
        if (!user && !isLoading) {
        navigate('/auth/login?redirect=/admin/configuraciones');
        }
    }, [user, isLoading, navigate]);
    ////////////////////FGFGFGFG


    // const router = useRouter();
    // const fileInputRef = useRef<HTMLInputElement>(null);
    // const [ newTagValue, setNewTagValue ] = useState('');
    const [isSaving, setIsSaving] = useState(false);

////////fg/fg/f/g/////////

const [defaultValues, setDefaultValues] = useState({});
const [configuracion, setConfiguracion] = useState(configuracionI);

const input1Ref = useRef<HTMLInputElement>(null);

const params = useParams();
const { id } = params;

const { register, handleSubmit, formState:{ errors }, reset } = useForm<FormData>({
    defaultValues: configuracion
})


useEffect(() => {
  input1Ref.current?.focus()
  loadProduct()
 }, [])


const loadProduct = async() => {
    console.log(defaultValues);
    try {

        if ( id === 'new' ) {
        // crear un configuraciono
        configuracionI._id= "",
        configuracionI.codCon= "",
        configuracionI.name= ""
        configuracionI.domcomer= ""
        configuracionI.cuit= ""
        configuracionI.coniva= ""
        configuracionI.ib= ""
        configuracionI.feciniact= ""
        configuracionI.numIntRem= 0
        configuracionI.numIntRec= 0
        configuracionI.numIntOdp= 0
        configuracionI.numIntCaj= 0
        configuracionI.numIntMov= 0
    } else {
        const resp = await stutzApi.get<IConfiguracion>(`/api/tes/admin/configuraciones/${ id }`);
        configuracionI._id=resp.data._id,
        configuracionI.codCon=resp.data.codCon,
        configuracionI.name=resp.data.name
        configuracionI.domcomer=resp.data.domcomer
        configuracionI.cuit=resp.data.cuit
        configuracionI.coniva=resp.data.coniva
        configuracionI.ib=resp.data.ib
        configuracionI.feciniact=resp.data.feciniact
        configuracionI.numIntRem=resp.data.numIntRem
        configuracionI.numIntRec=resp.data.numIntRec
        configuracionI.numIntOdp=resp.data.numIntOdp
        configuracionI.numIntCaj=resp.data.numIntCaj
        configuracionI.numIntMov=resp.data.numIntMov
    }
  } catch (error) {
    console.log(error)
    
  }
  setDefaultValues(configuracionI); // Set default values
  reset(configuracionI); // Populate the form
  setConfiguracion(configuracionI);
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
                await stutzApi.put('/api/tes/admin/configuraciones', form)
            }else{
                await stutzApi.post('/api/tes/admin/configuraciones', form)
            }

            if ( !form._id ) {
                // navigate(`/admin/invoicerCon/${invoiceId}?redirect=/admin/invoices`);
                navigate(`/admin/configuracionesesc`);
            } else {
                setIsSaving(false)
            }
            navigate(`/admin/configuracionesesc`);


        } catch (error) {
            console.log(error);
            setIsSaving(false);
        }

    }

    return (
        <AdminLayoutMenuList 
            title={'Punto de Venta'} 
            subTitle={`Editando: ${ configuracionI.name }`}
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
                            { ...register('codCon', {
                                required: 'Este campo es requerido',
                                minLength: { value: 1, message: 'Mínimo 1 caracteres' }
                            })}
                            error={ !!errors.codCon }
                            helperText={ errors.codCon?.message }
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

                        <TextField
                            label="Ingresos Brutos"
                            variant="filled"
                            fullWidth 
                            multiline
                            sx={{ mb: 1 }}
                            { ...register('ib', {
                                required: 'Este campo es requerido',
                                minLength: { value: 1, message: 'Mínimo 1 caracteres' }
                            })}
                            error={ !!errors.ib }
                            helperText={ errors.ib?.message }
                        />
                        <TextField
                            label="Fecha Inicio Actividades"
                            variant="filled"
                            fullWidth 
                            multiline
                            sx={{ mb: 1 }}
                            { ...register('feciniact', {
                                required: 'Este campo es requerido',
                                minLength: { value: 1, message: 'Mínimo 1 caracteres' }
                            })}
                            error={ !!errors.feciniact }
                            helperText={ errors.feciniact?.message }
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
