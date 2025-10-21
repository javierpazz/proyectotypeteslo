import { useContext, useEffect, useRef, useState } from 'react';
// import { GetServerSideProps } from 'next'
// import { useRouter } from 'next/router';
import {  useNavigate, useParams } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';

import { Box, Button, Checkbox, FormControlLabel, Grid, TextField } from '@mui/material';
import { DriveFileRenameOutline, SaveOutlined } from '@mui/icons-material';

import { AdminLayoutMenuList } from '../../../components/layouts'
import {  IInstrumento  } from '../../../interfaces';
import { stutzApi } from '../../../../api';
import { AuthContext } from '../../../../context';



interface FormData {
    _id?       : string;
    codIns       : string;
    name       : string;
    publico     : boolean;
}
const instrumentoI = 
      {
          _id: '',
          codIns: "",
          name: "",
          publico: true,
      }


export const InstrumentoAdminPage = () => {
    ////////////////////FGFGFGFG
    const { user, isLoading } = useContext(AuthContext);
    const navigate = useNavigate()

    useEffect(() => {
        if (!user && !isLoading) {
        navigate('/auth/loginadm?redirect=/admin/instrumentos');
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
const [instrumento, setInstrumento] = useState(instrumentoI);

const input1Ref = useRef<HTMLInputElement>(null);

const params = useParams();
const { id } = params;

const { control, register, handleSubmit, formState:{ errors }, reset } = useForm<FormData>({
    defaultValues: instrumento
})


useEffect(() => {
  input1Ref.current?.focus()
  loadProduct()
 }, [])


const loadProduct = async() => {
    console.log(defaultValues);
    try {

        if ( id === 'new' ) {
        // crear un instrumentoo
        instrumentoI._id= "",
        instrumentoI.codIns= "",
        instrumentoI.name= "",
        instrumentoI.publico= true
    } else {
        const resp = await stutzApi.get<IInstrumento>(`/api/tes/admin/instrumentos/${ id }`);
        instrumentoI._id=resp.data._id,
        instrumentoI.codIns=resp.data.codIns,
        instrumentoI.name=resp.data.name,
        instrumentoI.publico=resp.data.publico
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
            navigate(`/admin/instrumentos`);

        } catch (error) {
            console.log(error);
            setIsSaving(false);
        }

    }

    return (
        <AdminLayoutMenuList 
            title={'Instrumento'} 
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
                            inputRef={input1Ref}
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
                            InputLabelProps={{shrink: true}}
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
                            InputLabelProps={{shrink: true}}
                        />


                        <Controller
                            name='publico'
                            control={control}
                            render={({ field }) => (
                            <FormControlLabel
                                control={<Checkbox {...field} checked={field.value} />}
                                label='Instrumento Publico'
                            />
                            )}
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
