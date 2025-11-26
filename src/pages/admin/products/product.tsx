import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';
// import { GetServerSideProps } from 'next'
// import { useRouter } from 'next/router';
import {  useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { Box, Button,  Card, CardActions, CardMedia, Chip, Divider, FormLabel, Grid, TextField } from '@mui/material';
import { DriveFileRenameOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';

import { AdminLayoutMenuList } from '../../../components/layouts'
import {  IProduct  } from '../../../interfaces';
import { stutzApi } from '../../../../api';
import { AuthContext } from '../../../../context';
import { BuscaSup } from '../../../components/buscador';

// const ValidCategories  = ['shirts','pants','hoodies','hats']
// const validGender = ['men','women','kid','unisex']
// const validSizes = ['XS','S','M','L','XL','XXL','XXXL']

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
          images: [],
          inStock: 0,
          minStock: 0,
          price: 0,
          priceBuy: 0,
          sizes: ['XS'],
          slug: "",
          tags: [''],
          title: "",
          category: '',
          gender: 'kid',
          brand: '',
        //   createdAt: '',
        //   updatedAt: '',
          id_config: "",
          supplier: null,
          
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
        navigate('/auth/loginadm?redirect=/admin/products');
        }
        if (user?.role === "client" ) {
        navigate('/');
        }
    }, [user, isLoading, navigate]);
    ////////////////////FGFGFGFG
  const userInfo = typeof window !== 'undefined' && localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo')!)
    : null;


    const [defaultValues ] = useState({});
    const [product, setProduct] = useState(productI);
    const params = useParams();
    const { slugadm } = params;
    const [codSup, setCodSup] = useState('');
    const [codSupt, setCodSupt] = useState('');
    const [nameSup, setNameSup] = useState('');
    const inputSupRef = useRef<HTMLInputElement>(null);
    const input1Ref = useRef<HTMLInputElement>(null);


const { register, handleSubmit, formState:{ errors }, getValues, setValue, watch, reset } = useForm<FormData>({
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
        setProduct(productI);
        reset(productI);
            setCodSup('');
            setCodSupt('');
            setNameSup('Elija Proveedor');        
    } else {
        // const resp = await stutzApi.get<IProduct>(`/api/tes/products/${ slugadm!.toString() }`);
        const { data } = await stutzApi.get<IProduct>(`/api/tes/products/${slugadm}`);
        // productI._id=data._id,
        // productI.description=data.description,
        // productI.images=data.images,
        // productI.inStock=data.inStock,
        // productI.price=data.price,
        // productI.sizes=data.sizes,
        // productI.slug=data.slug,
        // productI.tags=data.tags,
        // productI.title=data.title,
        // productI.category=data.category,
        // productI.gender=data.gender,

/////
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
/////
  } catch (error) {
    console.log(error)
    
  }
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
    



    // const onChangeSize = ( size: string ) => {
    //     const currentSizes = getValues('sizes');
    //     if ( currentSizes.includes( size ) ) {
    //         return setValue('sizes', currentSizes.filter( s => s !== size ), { shouldValidate: true } );
    //     }

    //     setValue('sizes', [ ...currentSizes, size ], { shouldValidate: true });

    // }


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
                // const { data } = await stutzApi.post<{ message: string}>('/api/files/product', formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                  });
                  console.log(data.message)
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
            form.id_config = userInfo.codCon;
            if (codSup !== "")  {form.supplier = codSup} else {form.supplier = null};
            console.log(form);
            if (form._id){
                await stutzApi.put('/api/tes/admin/products', form)
            }else{
                await stutzApi.post('/api/tes/admin/products', form)
            }

            if ( !form._id ) {
                // router.replace(`/admin/products/product/${ form.slug }`);
                navigate(`/admin/products/product/${ form.slug }`);
            } else {
                setIsSaving(false)
            }
            navigate(`/admin/products`);


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
                                InputLabelProps={{shrink: true}}
                            />

                        <TextField
                            // inputRef={input1Ref}
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



                        <Divider sx={{ my: 1 }} />

                        {/* <FormControl sx={{ mb: 1 }}>
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
                        </FormControl> */}

                        {/* <FormControl sx={{ mb: 1 }}>
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
                        </FormControl> */}

                        {/* <FormGroup>
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
                        </FormGroup> */}

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


