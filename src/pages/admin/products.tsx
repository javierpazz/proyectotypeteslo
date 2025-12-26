import { useState, useEffect, useContext } from 'react';
import { AddOutlined, CategoryOutlined } from '@mui/icons-material';
import { Box, Button, CardMedia, Grid, Chip, Link, Select, MenuItem } from '@mui/material'
import { Link as MuiLink } from '@mui/material';

import { DataGrid, GridColDef, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid';

import { AdminLayoutMenuList } from '../../components/layouts'
import { IProduct, ISupplier  } from '../../interfaces';
import { stutzApi } from '../../../api';
import { NavLink, useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { AuthContext } from '../../../context';


// const columns:GridColDef[] = [
//     { 
//         field: 'img', 
//         headerName: 'Foto',
//         renderCell: ({row}: GridValueGetterParams | GridRenderCellParams) => {
//             return (
//                 // <a href={ `/admin/products/product/${ row.slug }` } target="_blank" rel="noreferrer">
//                 <NavLink to={`/admin/products/product/${row.slug}`}>
//                     <Link underline='always'>
//                     <CardMedia 
//                         component='img'
//                         alt={ row.title }
//                         className='fadeIn'
//                         image={ row.img }
//                     />
//                     </Link>
//                 </NavLink>
//                 // </a>
//             )
//         }
//     },
//     { 
//         field: 'title', 
//         headerName: 'Title', 
//         width: 250,
//         renderCell: ({row}: GridValueGetterParams | GridRenderCellParams) => {
//             return (
//                 <NavLink to={`/admin/products/product/${row.slug}`}>
//                     <Link underline='always'>
//                         { row.title}
//                     </Link>
//                 </NavLink>
//             )
//         }
//     },
//     { field: 'gender', headerName: 'Género' },
//     { field: 'category', headerName: 'Categoria' },
//     { field: 'inStock', headerName: 'Inventario' },
//     { field: 'price', headerName: 'Precio' },
//     { field: 'sizes', headerName: 'Tallas', width: 250 },

// ];



export const Products = () => {

    ////////////////////FGFGFGFG
    const { user, isLoading } = useContext(AuthContext);
    const navigate = useNavigate()

    useEffect(() => {
        if (!user && !isLoading) {
        navigate('/auth/loginadm?redirect=/admin/productos');
        }
        if (user?.role === "client" ) {
        navigate('/');
        }
    }, [user, isLoading, navigate]);
    ////////////////////FGFGFGFG

    const userInfo = typeof window !== 'undefined' && localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo')!)
  : null;

    const [ products, setProducts ] = useState<IProduct[]>([]);

    const onActivoUpdated = async( productId: string, newecoActive: boolean ) => {

        const previosProducts = products.map( product => ({ ...product }));
        const updatedProducts = products.map( product => ({
            ...product,
            ecoActive: productId === product._id ? newecoActive : product.ecoActive
        }));

        setProducts(updatedProducts);

        try {

            await stutzApi.put('/api/tes/admin/products/ecomActive', {  productId, ecoActive: newecoActive });

        } catch (error) {
            setProducts( previosProducts );
            console.log(error);
            alert('No se pudo actualizar el estado del Producto');
        }

    }



    const columns:GridColDef[] = [
    { 
        field: 'img', 
        headerName: 'Foto',
        renderCell: ({row}: GridValueGetterParams | GridRenderCellParams) => {
            return (
                // <a href={ `/admin/products/product/${ row.slug }` } target="_blank" rel="noreferrer">
                <NavLink to={`/admin/products/product/${row.slug}`}>
                    <Link underline='always'>
                    <CardMedia 
                        component='img'
                        alt={ row.title }
                        className='fadeIn'
                        image={ row.img }
                    />
                    </Link>
                </NavLink>
                // </a>
            )
        }
    },
    { field: 'codigoPro', headerName: 'Codigo'},
    { field: 'codPro', headerName: 'Codigo Barra', width: 200 },
    { 
        field: 'title', 
        headerName: 'Title', 
        width: 250,
        headerAlign: 'center',
        renderCell: ({row}: GridValueGetterParams | GridRenderCellParams) => {
            return (
                <MuiLink component={RouterLink} to={`/admin/products/product/${row.slug}`}
//                 <NavLink to={`/admin/products/product/${row.slug}`}>
                underline='always'>
                        { row.title}
                </MuiLink>
            )
        }
    },
        {
            field: 'ecoActive', 
            headerName: 'Ecommerce', 
            width: 150,
            renderCell: ({row}: GridValueGetterParams | GridRenderCellParams) => {
                if (user?.role !== 'admin') return null;
                return (
                    <Select
                    value={ row.ecoActive }
                    label="Activo"
                    onChange={ ({ target }) => onActivoUpdated( row.id, target.value ) }
                    sx={{ width: '300px' }}
                    >
                        <MenuItem value='true'> Activo </MenuItem>
                        <MenuItem value='false'> InActivo </MenuItem>
                    </Select>
                )
            }
        },


    { field: 'price', headerName: 'Precio', align: 'right', headerAlign: 'center' },
    { field: 'priceBuy', headerName: 'Costo', align: 'right', headerAlign: 'center' },
    { field: 'inStock', headerName: 'Stock', align: 'right', headerAlign: 'center' },
    { field: 'minStock', headerName: 'Stock Minimo', align: 'right', headerAlign: 'center' },
    { field: 'porIva', headerName: '%IVA', align: 'right', headerAlign: 'center' },
    { field: 'nameSup', headerName: 'Proveedor', width: 200 },
        {
            field: 'check',
            headerName: 'Acción',
            renderCell: ({ row }: GridValueGetterParams | GridRenderCellParams ) => {
                return (
                        <Chip variant='outlined' label="Eliminar" color="error"
                        onClick={() => deleteHandler(row.id)}
                        />
                    )
        
            }
        },

];
    const loadData = async() => {
        try {
        //   const resp = await stutzApi.get<IProduct[]>('/api/tes/admin/products');
          const resp = await stutzApi.get<IProduct[]>(`/api/products/admin/tes?id_config=${userInfo.codCon}`);
          setProducts(resp.data);
          console.log(resp.data);
        } catch (error) {
          console.log({error})
        }
    
      }

    useEffect(() => {
        loadData();
    }, [])

    // const { data, error } = useSWR<IProduct[]>('/api/admin/products');
    // if ( !data && !error ) return (<></>);
    
    if ( !products ) return (<></>);

    // const rows = products.map( product => ({
    //     id: product._id,
    //     img: product.images[0],
    //     title: product.title,
    //     gender: product.gender,
    //     // category: product.category,
    //     inStock: product.inStock,
    //     price: product.price,
    //     sizes: product.sizes.join(', '),
    //     slug: product.slug,
    // }));
    const rows = products.map( product => ({
        img: product.images[0],
        id: product._id,
        codPro: product.codPro,
        codigoPro: product.codigoPro,
        title: product.title,
        slug: product.slug,
        ecoActive: product.ecoActive,
        medPro: product.medPro,
        gender: product.gender,
        category: product.category,
        price: product.price.toFixed(2),
        priceBuy: product.priceBuy.toFixed(2),
        inStock: product.inStock.toFixed(2),
        minStock: product.minStock.toFixed(2),
        porIva: product.porIva.toFixed(2),
        nameSup  : (product.supplier as ISupplier)?.name ?? '',

    }));
    const deleteHandler = async (id : string) => {
    if (window.confirm('Esta Seguro de Eliminar?')) {
        console.log(id)
        try {
        await stutzApi.delete(`/api/tes/admin/productsesc/${id}`);
        window.location.reload();
    } catch (error: any) {
///////
    if (error.response) {
      console.error('Error de backend:', error.response.data);
      alert(`Error del servidor: ${error.response.data.message || 'Revisá los campos'}`);
    } else if (error.request) {
      console.error('No hubo respuesta del servidor', error.request);
      alert('No hubo respuesta del servidor. Verifica tu conexión.');
    } else {
      console.error('Error inesperado', error.message);
      alert('Error inesperado al guardar.');
    }
///////

      }
    }
  };


  return (
    <AdminLayoutMenuList 
        title={`Productos (${ products?.length })`} 
        subTitle={'Mantenimiento de productos'}
        icon={ <CategoryOutlined /> }
    >
        <Box display='flex' justifyContent='end' sx={{ mb: 2 }}>
        <NavLink to='/admin/precios?redirect=/admin/productsfac' >
            <Button
                color="secondary"
            >
                Modifica  Precios
            </Button>
            </NavLink>            
        <NavLink to='/admin/productsList?redirect=/admin/productsfac' >
            <Button
                color="secondary"
            >
                Lista
            </Button>
            </NavLink>            
        <NavLink to='/admin/products/product/new' >
            <Button
                startIcon={ <AddOutlined /> }
                color="secondary"
            >
                Crear producto
            </Button>
            </NavLink>            
        </Box>

         <Grid container className='fadeIn'>
            <Grid item xs={12} sx={{ height:650, width: '100%' }}>
                <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                    paginationModel: { pageSize: 10, page: 0 },
                    },
                }}
                pageSizeOptions={[10]}
                />
            </Grid>
        </Grid>
        
    </AdminLayoutMenuList>
  )
}
