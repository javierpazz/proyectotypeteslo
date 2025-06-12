import { ChangeEvent, useEffect, useRef, useState } from 'react';
// import { GetServerSideProps } from 'next'
// import { useRouter } from 'next/router';
import {  useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { Box, Button, capitalize, Card, CardActions, CardMedia, Checkbox, Chip, Divider, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, Radio, RadioGroup, TextField } from '@mui/material';
import { DriveFileRenameOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';

import { AdminLayout } from '../../../components/layouts'
import {  IInstrumento  } from '../../../interfaces';
import { stutzApi } from '../../../../api';

const ValidCategories  = ['shirts','pants','hoodies','hats']
const validGender = ['men','women','kid','unisex']
const validSizes = ['XS','S','M','L','XL','XXL','XXXL']


interface FormData {
    _id?       : string;
    codIns       : string;
    name       : string;
}
const instrumentoI = 
      {
          _id: '',
          codIns: "",
          name: "",
     
      }


export const InstrumentoAdminPage = () => {


    // const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [ newTagValue, setNewTagValue ] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const navigate = useNavigate();

////////fg/fg/f/g/////////

const [defaultValues, setDefaultValues] = useState({});
const [instrumento, setInstrumento] = useState(instrumentoI);
const params = useParams();
const { slugadm } = params;

const { register, handleSubmit, formState:{ errors }, getValues, setValue, watch, reset } = useForm<FormData>({
    defaultValues: instrumento
})


useEffect(() => {
  loadProduct()
 }, [])


const loadProduct = async() => {
    console.log(defaultValues);
    try {

        if ( slugadm === 'new' ) {
        // crear un instrumentoo
        instrumentoI._id= "",
        instrumentoI.codIns= "",
        instrumentoI.name= ""
    } else {
        const resp = await stutzApi.get<IInstrumento>(`/api/tes/admin/instrumentos/${ slugadm }`);
        instrumentoI._id=resp.data._id,
        instrumentoI.codIns=resp.data.codIns,
        instrumentoI.name=resp.data.name
    }
  } catch (error) {
    console.log(error)
    
  }
  setDefaultValues(instrumentoI); // Set default values
  reset(instrumentoI); // Populate the form
  setInstrumento(instrumentoI);
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
                await stutzApi.put('/api/tes/admin/instrumentos', form)
            }else{
                await stutzApi.post('/api/tes/admin/instrumentos', form)
            }

            if ( !form._id ) {
                // navigate(`/admin/invoicerCon/${invoiceId}?redirect=/admin/invoices`);
                navigate(`/admin/instrumentos`);
            } else {
                setIsSaving(false)
            }


        } catch (error) {
            console.log(error);
            setIsSaving(false);
        }

    }

    return (
        <AdminLayout 
            title={'Producto'} 
            subTitle={`Editando: ${ instrumentoI.name }`}
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
                            label="Codigo"
                            variant="filled"
                            fullWidth 
                            sx={{ mb: 1 }}
                            { ...register('codIns', {
                                required: 'Este campo es requerido',
                                minLength: { value: 1, message: 'Mínimo 1 caracteres' }
                            })}
                            error={ !!errors.codIns }
                            helperText={ errors.codIns?.message }
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




                    </Grid>

                    {/* Tags e imagenes */}
                    <Grid item xs={12} sm={ 6 }>
                    </Grid>

                </Grid>
            </form>
        </AdminLayout>
    )
}
