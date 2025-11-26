import {  useContext, useEffect, useRef, useState } from 'react';
// import { GetServerSideProps } from 'next'
// import { useRouter } from 'next/router';
import {  useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { Box, Button,  Divider, Grid, TextField } from '@mui/material';
import { DriveFileRenameOutline, SaveOutlined } from '@mui/icons-material';

import { AdminLayoutMenuList } from '../../../components/layouts'
import {  IProduct  } from '../../../interfaces';
import { stutzApi } from '../../../../api';
import { AuthContext } from '../../../../context';



interface FormData {
    _id?       : string;
    codPro     : string;
    codigoPro? : string;
    images     : string[];
    inStock    : number;
    price      : number;
    description: string;
    sizes      : string[];
    slug       : string;
    tags       : string[];
    title      : string;
    category   : string;
    gender     : string;
    id_config: string;
}
const productI = 
      {
          _id: '',
          codPro: '',
          codigoPro: '',
          description: "diligencia",
          medPro: "unidad",
          porIva: 0,
          images: ['img1.jpg','img2.jpg'],
          inStock: 0,
          price: 0,
          sizes: ['XS'],
          slug: "",
          tags: ['sweatshirt'],
          title: "",
          category: '',
          gender: 'kid',
          id_config: "",
          createdAt: '',
          updatedAt: '',
      
      }


export const ProductEscAdminPage = () => {

    // const router = useRouter();
    const [isSaving, setIsSaving] = useState(false);

    ////////////////////FGFGFGFG
    const { user, isLoading } = useContext(AuthContext);
    const navigate = useNavigate()

    useEffect(() => {
        if (!user && !isLoading) {
        navigate('/auth/loginadm?redirect=/admin/productsesc');
        }
        if (user?.role === "client" ) {
        navigate('/');
        }
    }, [user, isLoading, navigate]);
    ////////////////////FGFGFGFG
  const userInfo = typeof window !== 'undefined' && localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo')!)
    : null;
const [defaultValues, setDefaultValues] = useState({});
const [product, setProduct] = useState(productI);
const params = useParams();
const { slugadm  } = params;
const input1Ref = useRef<HTMLInputElement>(null);

const { register, handleSubmit, formState:{ errors }, setValue, watch, reset } = useForm<FormData>({
    defaultValues: product
})


useEffect(() => {
  input1Ref.current?.focus()
  loadProduct()
 }, [])


const loadProduct = async() => {
    console.log(defaultValues);
    try {

        if ( slugadm === 'new' ) {
        // crear un producto
        productI._id= "",
        productI.codPro = '',
        productI.codigoPro = '',
        productI.description= "diligencia",
        productI.medPro= "unidad",
        productI.images= ['img1.jpg','img2.jpg'],
        productI.inStock= 0,
        productI.price= 0,
        productI.sizes= ['XS'],
        productI.slug= "",
        productI.tags= ['sweatshirt'],
        productI.title= "",
        productI.category= '',
        productI.gender= 'kid',
        productI.createdAt= '',
        productI.updatedAt= ''
    } else {
        const resp = await stutzApi.get<IProduct>(`/api/tes/products/${ slugadm!.toString() }`);
        productI._id=resp.data._id,
        productI.codPro=resp.data.codPro,
        productI.codigoPro=resp.data.codigoPro,
        productI.description=resp.data.description,
        productI.images=resp.data.images,
        productI.inStock=resp.data.inStock,
        productI.price=resp.data.price,
        productI.sizes=resp.data.sizes,
        productI.slug=resp.data.slug,
        productI.tags=resp.data.tags,
        productI.title=resp.data.title,
        productI.category=resp.data.category,
        productI.gender=resp.data.gender,
        productI.createdAt=resp.data.createdAt,
        productI.updatedAt=resp.data.updatedAt
    }
  } catch (error) {
    console.log(error)
    
  }
  setDefaultValues(productI); // Set default values
  reset(productI); // Populate the form
  setProduct(productI);
 }


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
            form.codigoPro = form.codPro;
            form.id_config = userInfo.codCon;

            if (form._id){
                await stutzApi.put('/api/tes/admin/productsesc', form)
            }else{
                await stutzApi.post('/api/tes/admin/productsesc', form)
            }
            // console.log(data);

            if ( !form._id ) {
                // router.replace(`/admin/diligencias/product/${ form.slug }`);
                // navigate(`/admin/productsesc/productesc/${ form.title }`);
                navigate(`/admin/productsesc`);
            } else {
                setIsSaving(false)
            }
            navigate(`/admin/productsesc`);

        } catch (error) {
            console.log(error);
            setIsSaving(false);
        }

    }

    return (
        <AdminLayoutMenuList 
            title={'Diligencia'} 
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
                            { ...register('codPro', {
                                required: 'Este campo es requerido',
                                minLength: { value: 1, message: 'Mínimo 1 caracter' }
                            })}
                            error={ !!errors.codPro }
                            helperText={ errors.codPro?.message }
                            InputLabelProps={{shrink: true}}
                        />

                            <TextField
                                label="Descripcion"
                                variant="filled"
                                fullWidth 
                                sx={{ mb: 1 }}
                                { ...register('title', {
                                    required: 'Este campo es requerido',
                                    minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                                })}
                                error={ !!errors.title }
                                helperText={ errors.title?.message }
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
                                // min: { value: 0, message: 'Mínimo de valor cero' }
                            })}
                            error={ !!errors.price }
                            helperText={ errors.price?.message }
                            InputLabelProps={{shrink: true}}
                        />
                            {/* <TextField
                                label="Codigo Barra"
                                variant="filled"
                                fullWidth 
                                sx={{ mb: 1 }}
                                { ...register('codigoPro', {
                                    required: 'Este campo es requerido',
                                    minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                                })}
                                error={ !!errors.codigoPro }
                                helperText={ errors.codigoPro?.message }
                                InputLabelProps={{shrink: true}}
                            />
     */}

                        <Divider sx={{ my: 1 }} />




                    </Grid>

                    {/* Tags e imagenes */}
                    <Grid item xs={12} sm={ 6 }>

                    </Grid>

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


