import {  useContext, useEffect, useRef, useState } from 'react';
// import { GetServerSideProps } from 'next'
// import { useRouter } from 'next/router';
import {  useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { Box, Button, Grid, TextField } from '@mui/material';
import { DriveFileRenameOutline, SaveOutlined } from '@mui/icons-material';

import { AdminLayoutMenuList } from '../../../components/layouts'
import {  IProduct  } from '../../../interfaces';
import { stutzApi } from '../../../../api';
import { AuthContext } from '../../../../context';
import { BuscaSup } from '../../../components/buscador';



interface FormData {
    _id?       : string;
    codPro     : string;
    codigoPro? : string;
    images     : string[];
    inStock    : number;
    minStock    : number;
    price      : number;
    priceBuy   : number;
    porIva   : number;
    description: string;
    sizes      : string[];
    slug       : string;
    tags       : string[];
    title      : string;
    medPro      : string;
    category   : string;
    gender     : string;
    brand     : string;
    id_config: string;
    supplier: string | null;
}
const productI: FormData = 
      {
          _id: '',
          codPro: '',
          codigoPro: '',
          description: "",
          medPro: "",
          porIva: 0,
          images: ['img1.jpg','img2.jpg'],
          inStock: 0,
          minStock: 0,
          price: 0,
          priceBuy: 0,
          sizes: ['XS'],
          slug: "",
          tags: ['sweatshirt'],
          title: "",
          category: '',
          gender: 'kid',
          brand: '',
        //   createdAt: '',
        //   updatedAt: '',
          id_config: "",
          supplier: null,
          
      }


export const ProductFacAdminPage = () => {

    // const router = useRouter();
    const [isSaving, setIsSaving] = useState(false);

    ////////////////////FGFGFGFG
    const { user, isLoading } = useContext(AuthContext);
    const navigate = useNavigate()

    useEffect(() => {
        if (!user && !isLoading) {
        navigate('/auth/loginadm?redirect=/admin/productsfac');
        }
        if (user?.role === "client" ) {
        navigate('/');
        }
    }, [user, isLoading, navigate]);
    ////////////////////FGFGFGFG
  const userInfo = typeof window !== 'undefined' && localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo')!)
    : null;

    const [product, setProduct] = useState(productI);
    const params = useParams();
    const { title } = params;
    const input1Ref = useRef<HTMLInputElement>(null);

    const [codSup, setCodSup] = useState('');
    const [codSupt, setCodSupt] = useState('');
    const [nameSup, setNameSup] = useState('');
    const inputSupRef = useRef<HTMLInputElement>(null);



const { register, handleSubmit, formState:{ errors }, setValue, watch, reset } = useForm<FormData>({
    defaultValues: product
})


useEffect(() => {
  input1Ref.current?.focus()
  loadProduct()
 }, [])

  const loadProduct = async () => {
    try {
      if (title === 'new') {
        setProduct(productI);
        reset(productI);
            setCodSup('');
            setCodSupt('');
            setNameSup('Elija Proveedor');        
      } else {
        const { data } = await stutzApi.get<IProduct>(`/api/tes/products/${title}`);
        console.log("data")
        console.log(data)
        console.log("data")
        const cleanData: FormData = {
        ...data,
        id_config: typeof data.id_config === 'string' ? data.id_config : data.id_config?._id || '',
        supplier: typeof data.supplier === 'string' ? data.supplier : data.supplier?._id || '',
        };
        setProduct(cleanData);
        reset(cleanData);
            // Inicializar estados de BuscaSup
            if (typeof data.supplier !== 'string' && data.supplier) {
                setCodSup(data.supplier._id);
                setCodSupt(data.supplier.codSup || '');
                setNameSup(data.supplier.name || '');
            } else {
                setCodSup('');
                setCodSupt('');
                setNameSup('Elija Proveedor');
            }
            }
    } catch (error) {
      console.error('Error loading product:', error);
    }
  };


////////fg/fg/f/g/////////

    useEffect(() => {
      const subscription = watch(( value, { name } ) => {
          if ( name === 'title' ) {
              const newSlug = value.title?.trim()
                    .replaceAll(' ', '_')
                    .replaceAll("'", '')
                    .toLocaleLowerCase() || '';

               setValue('slug', newSlug);
          }
      });
      return () => subscription.unsubscribe();
    }, [watch, setValue])


    const onSubmit = async( form: FormData ) => {
        

        try {

            form.id_config = userInfo.codCon;
            // form.supplier = codSup;
            if (codSup !== "")  {form.supplier = codSup} else {form.supplier = null};
            if (form._id){
                await stutzApi.put('/api/tes/admin/productsfac', form)
            }else{
                await stutzApi.post('/api/tes/admin/productsfac', form)
            }
            // console.log(data);

            if ( !form._id ) {
                // router.replace(`/admin/diligencias/product/${ form.slug }`);
                // navigate(`/admin/productsesc/productesc/${ form.title }`);
                navigate(`/admin/productsfac`);
            } else {
                setIsSaving(false)
            }
            navigate(`/admin/productsfac`);

        } catch (error) {
            console.log(error);
            setIsSaving(false);
        }

    }

    return (
        <AdminLayoutMenuList 
            title={'Producto'} 
            subTitle={`Editando: ${ productI.title }`}
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
                            { ...register('codigoPro', {
                                required: 'Este campo es requerido',
                                minLength: { value: 1, message: 'Mínimo 1 caracter' }
                            })}
                            error={ !!errors.codigoPro }
                            helperText={ errors.codigoPro?.message }
                            InputLabelProps={{shrink: true}}
                        />
                        <TextField
                            label="Codigo Barra"
                            variant="filled"
                            fullWidth 
                            sx={{ mb: 1 }}
                            { ...register('codPro', {
                                required: 'Este campo es requerido',
                                minLength: { value: 1, message: 'Mínimo 1 caracter' }
                            })}
                            error={ !!errors.codPro }
                            helperText={ errors.codPro?.message }
                            InputLabelProps={{shrink: true}}
                        />

                            <TextField
                                label="Título"
                                variant="filled"
                                fullWidth 
                                sx={{ mb: 1 }}
                                { ...register('title', {
                                    required: 'Este campo es requerido',
                                    minLength: { value: 1, message: 'Mínimo 1 caracter' }
                                })}
                                error={ !!errors.title }
                                helperText={ errors.title?.message }
                                InputLabelProps={{shrink: true}}
                            />

                            <TextField
                                label="Unidad de Media"
                                variant="filled"
                                fullWidth 
                                sx={{ mb: 1 }}
                                { ...register('medPro', {
                                    required: 'Este campo es requerido',
                                    minLength: { value: 1, message: 'Mínimo 1 caracter' }
                                })}
                                error={ !!errors.medPro }
                                helperText={ errors.medPro?.message }
                                InputLabelProps={{shrink: true}}
                            />
                            <TextField
                                label="Descripcion"
                                variant="filled"
                                fullWidth 
                                sx={{ mb: 1 }}
                                { ...register('description', {
                                    required: 'Este campo es requerido',
                                    minLength: { value: 1, message: 'Mínimo 1 caracter' }
                                })}
                                error={ !!errors.description }
                                helperText={ errors.description?.message }
                                InputLabelProps={{shrink: true}}
                            />

                            <TextField
                                label="Categoria"
                                variant="filled"
                                fullWidth 
                                sx={{ mb: 1 }}
                                { ...register('category', {
                                    required: 'Este campo es requerido',
                                    minLength: { value: 1, message: 'Mínimo 1 caracter' }
                                })}
                                error={ !!errors.category }
                                helperText={ errors.category?.message }
                                InputLabelProps={{shrink: true}}
                            />
                    </Grid>

                    <Grid item xs={12} sm={ 6 }>

                            <TextField
                                label="Marca"
                                variant="filled"
                                fullWidth 
                                sx={{ mb: 1 }}
                                { ...register('brand', {
                                    required: 'Este campo es requerido',
                                    minLength: { value: 1, message: 'Mínimo 1 caracter' }
                                })}
                                error={ !!errors.brand }
                                helperText={ errors.brand?.message }
                                InputLabelProps={{shrink: true}}
                            />

                        <TextField
                            label="Precio"
                            type='number'
                            inputProps={{ step: '0.01' }} 
                            variant="filled"
                            fullWidth 
                            sx={{ mb: 1 }}
                            { ...register('price', {
                                required: 'Este campo es requerido',
                                min: { value: 0, message: 'Mínimo de valor cero' }
                            })}
                            error={ !!errors.price }
                            helperText={ errors.price?.message }
                            InputLabelProps={{shrink: true}}
                        />
    
                        <TextField
                            label="Precio Costo"
                            type='number'
                            inputProps={{ step: '0.01' }} 
                            variant="filled"
                            fullWidth 
                            sx={{ mb: 1 }}
                            { ...register('priceBuy', {
                                required: 'Este campo es requerido',
                                min: { value: 0, message: 'Mínimo de valor cero' }
                            })}
                            error={ !!errors.priceBuy }
                            helperText={ errors.priceBuy?.message }
                            InputLabelProps={{shrink: true}}
                        />

                        <TextField
                            label="En Stock"
                            type='number'
                            inputProps={{ step: '0.01' }} 
                            variant="filled"
                            fullWidth 
                            sx={{ mb: 1 }}
                            { ...register('inStock', {
                                required: 'Este campo es requerido',
                                min: { value: 0, message: 'Mínimo de valor cero' }
                            })}
                            error={ !!errors.inStock }
                            helperText={ errors.inStock?.message }
                            InputLabelProps={{shrink: true}}
                        />

                        <TextField
                            label="Stock Minimo"
                            type='number'
                            inputProps={{ step: '0.01' }} 
                            variant="filled"
                            fullWidth 
                            sx={{ mb: 1 }}
                            { ...register('minStock', {
                                required: 'Este campo es requerido',
                                min: { value: 0, message: 'Mínimo de valor cero' }
                            })}
                            error={ !!errors.minStock }
                            helperText={ errors.minStock?.message }
                            InputLabelProps={{shrink: true}}
                        />

                        <TextField
                            label="% IVA"
                            type='number'
                            inputProps={{ step: '0.01' }} 
                            variant="filled"
                            fullWidth 
                            sx={{ mb: 1 }}
                            { ...register('porIva', {
                                required: 'Este campo es requerido',
                                min: { value: 0, message: 'Mínimo de valor cero' }
                            })}
                            error={ !!errors.porIva }
                            helperText={ errors.porIva?.message }
                            InputLabelProps={{shrink: true}}
                        />

                        {/* <Divider sx={{ my: 1 }} /> */}

                    </Grid>

                    </Grid>

                <Grid container spacing={2} >

                        <BuscaSup
                        codSup={codSup}
                        setCodSup={setCodSup}
                        codSupt={codSupt}
                        setCodSupt={setCodSupt}
                        nameSup={nameSup}
                        setNameSup={setNameSup}
                        nextRef={input1Ref}
                        inputRef={inputSupRef} 
                        />

                    </Grid>



            </form>
        </AdminLayoutMenuList>
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


// export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    
//     const { slug = ''} = query;
    
//     let product: IProduct | null;

//     if ( slug === 'new' ) {
//         // crear un producto
//         const tempProduct = JSON.parse( JSON.stringify( new Product() ) );
//         delete tempProduct._id;
//         tempProduct.images = ['img1.jpg','img2.jpg'];
//         product = tempProduct;

//     } else {
//         product = await dbProducts.getProductBySlug(slug.toString());
//     }

//     if ( !product ) {
//         return {
//             redirect: {
//                 destination: '/admin/diligencias',
//                 permanent: false,
//             }
//         }
//     }
    

//     return {
//         props: {
//             product
//         }
//     }
// }


