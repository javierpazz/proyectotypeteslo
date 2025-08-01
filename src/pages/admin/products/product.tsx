import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';
// import { GetServerSideProps } from 'next'
// import { useRouter } from 'next/router';
import {  useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { Box, Button, capitalize, Card, CardActions, CardMedia, Checkbox, Chip, Divider, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, Radio, RadioGroup, TextField } from '@mui/material';
import { DriveFileRenameOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';

import { AdminLayout } from '../../../components/layouts'
import {  IProduct  } from '../../../interfaces';
import { stutzApi } from '../../../../api';
import { AuthContext } from '../../../../context';

const ValidCategories  = ['shirts','pants','hoodies','hats']
const validGender = ['men','women','kid','unisex']
const validSizes = ['XS','S','M','L','XL','XXL','XXXL']


interface FormData {
    _id?       : string;
    description: string;
    images     : string[];
    inStock    : number;
    price      : number;
    sizes      : string[];
    slug       : string;
    tags       : string[];
    title      : string;
    category   : string;
    gender     : string;
}
const productI = 
      {
          _id: '',
          description: "",
          images: ['img1.jpg','img2.jpg'],
          inStock: 0,
          price: 0,
          sizes: ['XS'],
          slug: "",
          tags: ['sweatshirt'],
          title: "",
          category: '',
          gender: '',
          createdAt: '',
          updatedAt: '',
      
      }


export const ProductAdminPage = () => {

    // const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [ newTagValue, setNewTagValue ] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    ////////////////////FGFGFGFG
    const { user, isLoading } = useContext(AuthContext);
    const navigate = useNavigate()

    useEffect(() => {
        if (!user && !isLoading) {
        navigate('/auth/login?redirect=/admin/entradas');
        }
    }, [user, isLoading, navigate]);
    ////////////////////FGFGFGFG

const [defaultValues, setDefaultValues] = useState({});
const [product, setProduct] = useState(productI);
const params = useParams();
const { slugadm } = params;

const { register, handleSubmit, formState:{ errors }, getValues, setValue, watch, reset } = useForm<FormData>({
    defaultValues: product
})


useEffect(() => {
  loadProduct()
 }, [])


const loadProduct = async() => {
    console.log(defaultValues);
    try {

        if ( slugadm === 'new' ) {
        // crear un producto
        productI._id= "",
        productI.description= "",
        productI.images= ['img1.jpg','img2.jpg'],
        productI.inStock= 0,
        productI.price= 0,
        productI.sizes= ['XS'],
        productI.slug= "",
        productI.tags= ['sweatshirt'],
        productI.title= "",
        productI.category= '',
        productI.gender= '',
        productI.createdAt= '',
        productI.updatedAt= ''
    } else {
        const resp = await stutzApi.get<IProduct>(`/api/tes/products/${ slugadm!.toString() }`);
        productI._id=resp.data._id,
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
    



    const onChangeSize = ( size: string ) => {
        const currentSizes = getValues('sizes');
        if ( currentSizes.includes( size ) ) {
            return setValue('sizes', currentSizes.filter( s => s !== size ), { shouldValidate: true } );
        }

        setValue('sizes', [ ...currentSizes, size ], { shouldValidate: true });

    }


    const onNewTag = () => {
        const newTag = newTagValue.trim().toLocaleLowerCase();
        setNewTagValue('');
        const currentTags = getValues('tags');

        if ( currentTags.includes(newTag) ) {
            return;
        }

        currentTags.push(newTag);
    }

    const onDeleteTag = ( tag: string ) => {
        const updatedTags = getValues('tags').filter( t => t !== tag );
        setValue('tags', updatedTags, { shouldValidate: true });
    }

    const onFilesSelected = async({ target }: ChangeEvent<HTMLInputElement>) => {

        if ( !target.files || target.files.length === 0 ) {
            return;
        }

        try {
            
            console.log( "file" );
            for( const file of target.files ) {
                const formData = new FormData();
                formData.append('file', file);
                const { data } = await stutzApi.post<{ message: string}>('/api/tes/admin/upload', formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                  });
                  console.log(data)
                setValue('images', [...getValues('images'), data.message], { shouldValidate: true });
            }


        } catch (error) {
            console.log({ error });
        }
    }

    const onDeleteImage = ( image: string) =>{
        setValue(
            'images', 
            getValues('images').filter( img => img !== image ),
            { shouldValidate: true }
        );
    }



    const onSubmit = async( form: FormData ) => {
        
        if ( form.images.length < 2 ) return alert('Mínimo 2 imagenes');
        setIsSaving(true);

        try {
            if (form._id){
                await stutzApi.put('/api/tes/admin/products', form)
            }else{
                await stutzApi.post('/api/tes/admin/products', form)
            }
            // console.log(data);

            if ( !form._id ) {
                // router.replace(`/admin/products/product/${ form.slug }`);
                navigate(`/admin/products/product/${ form.slug }`);
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
                            label="Título"
                            variant="filled"
                            fullWidth 
                            sx={{ mb: 1 }}
                            { ...register('title', {
                                required: 'Este campo es requerido',
                                minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                            })}
                            error={ !!errors.title }
                            helperText={ errors.title?.message }
                        />

                        <TextField
                            label="Descripción"
                            variant="filled"
                            fullWidth 
                            multiline
                            sx={{ mb: 1 }}
                            { ...register('description', {
                                required: 'Este campo es requerido',
                            })}
                            error={ !!errors.description }
                            helperText={ errors.description?.message }
                        />

                        <TextField
                            label="Inventario"
                            type='number'
                            variant="filled"
                            fullWidth 
                            sx={{ mb: 1 }}
                            { ...register('inStock', {
                                required: 'Este campo es requerido',
                                min: { value: 0, message: 'Mínimo de valor cero' }
                            })}
                            error={ !!errors.inStock }
                            helperText={ errors.inStock?.message }
                        />
                        
                        <TextField
                            label="Precio"
                            type='number'
                            variant="filled"
                            fullWidth 
                            sx={{ mb: 1 }}
                            { ...register('price', {
                                required: 'Este campo es requerido',
                                min: { value: 0, message: 'Mínimo de valor cero' }
                            })}
                            error={ !!errors.price }
                            helperText={ errors.price?.message }
                        />

                        <Divider sx={{ my: 1 }} />

                        <FormControl sx={{ mb: 1 }}>
                            <FormLabel>Tipo</FormLabel>
                            <RadioGroup
                                row
                                value={ getValues('category') }
                                onChange={ ({ target })=> setValue('category', target.value, { shouldValidate: true }) }
                            >
                                {
                                    ValidCategories.map( option => (
                                        <FormControlLabel 
                                            key={ option }
                                            value={ option }
                                            control={ <Radio color='secondary' /> }
                                            label={ capitalize(option) }
                                        />
                                    ))
                                }
                            </RadioGroup>
                        </FormControl>

                        <FormControl sx={{ mb: 1 }}>
                            <FormLabel>Género</FormLabel>
                            <RadioGroup
                                row
                                value={ getValues('gender') }
                                onChange={ ({ target })=> setValue('gender', target.value, { shouldValidate: true }) }
                            >
                                {
                                    validGender.map( option => (
                                        <FormControlLabel 
                                            key={ option }
                                            value={ option }
                                            control={ <Radio color='secondary' /> }
                                            label={ capitalize(option) }
                                        />
                                    ))
                                }
                            </RadioGroup>
                        </FormControl>

                        <FormGroup>
                            <FormLabel>Tallas</FormLabel>
                            {
                                validSizes.map(size => (
                                    <FormControlLabel
                                        key={size}
                                        control={ <Checkbox checked={ getValues('sizes').includes(size) } />} 
                                        label={ size } 
                                        onChange={ () => onChangeSize( size )  }
                                    />
                                ))
                            }
                        </FormGroup>

                    </Grid>

                    {/* Tags e imagenes */}
                    <Grid item xs={12} sm={ 6 }>
                        <TextField
                            label="Slug - URL"
                            variant="filled"
                            fullWidth
                            sx={{ mb: 1 }}
                            { ...register('slug', {
                                required: 'Este campo es requerido',
                                validate: (val) => val.trim().includes(' ') ? 'No puede tener espacios en blanco':undefined
                            })}
                            error={ !!errors.slug }
                            helperText={ errors.slug?.message }
                        />

                        <TextField
                            label="Etiquetas"
                            variant="filled"
                            fullWidth 
                            sx={{ mb: 1 }}
                            helperText="Presiona [spacebar] para agregar"
                            value={ newTagValue }
                            onChange={ ({ target }) => setNewTagValue(target.value) }
                            onKeyUp={ ({ code })=> code === 'Space' ? onNewTag() : undefined }
                        />
                        
                        <Box sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            listStyle: 'none',
                            p: 0,
                            m: 0,
                        }}
                        component="ul">
                            {
                                getValues('tags').map((tag) => {

                                return (
                                    <Chip
                                        key={tag}
                                        label={tag}
                                        onDelete={ () => onDeleteTag(tag)}
                                        color="primary"
                                        size='small'
                                        sx={{ ml: 1, mt: 1}}
                                    />
                                );
                            })}
                        </Box>

                        <Divider sx={{ my: 2  }}/>
                        
                        <Box display='flex' flexDirection="column">
                            <FormLabel sx={{ mb:1}}>Imágenes</FormLabel>
                            <Button
                                color="secondary"
                                fullWidth
                                startIcon={ <UploadOutlined /> }
                                sx={{ mb: 3 }}
                                onClick={ () => fileInputRef.current?.click() }
                            >
                                Cargar imagen
                            </Button>
                            <input 
                                ref={ fileInputRef }
                                type="file"
                                multiple
                                accept='image/png, image/gif, image/jpeg'
                                style={{ display: 'none' }}
                                onChange={ onFilesSelected }
                            />


                            <Chip 
                                label="Es necesario al 2 imagenes"
                                color='error'
                                variant='outlined'
                                sx={{ display: getValues('images').length < 2 ? 'flex': 'none' }}
                            />

                            <Grid container spacing={2}>
                                {
                                    getValues('images').map( img => (
                                        <Grid item xs={4} sm={3} key={img}>
                                            <Card>
                                                <CardMedia 
                                                    component='img'
                                                    className='fadeIn'
                                                    image={ img }
                                                    alt={ img }
                                                />
                                                <CardActions>
                                                    <Button 
                                                        fullWidth 
                                                        color="error"
                                                        onClick={()=> onDeleteImage(img)}
                                                    >
                                                        Borrar
                                                    </Button>
                                                </CardActions>
                                            </Card>
                                        </Grid>
                                    ))
                                }
                            </Grid>

                        </Box>

                    </Grid>

                </Grid>
            </form>
        </AdminLayout>
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
//                 destination: '/admin/products',
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


