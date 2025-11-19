import { useState, useEffect, useContext } from 'react';
import { AddOutlined, CategoryOutlined } from '@mui/icons-material';
import { Box, Button, CardMedia, Grid, Link } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid';

import { AdminLayoutMenuList } from '../../components/layouts'
import { IProduct  } from '../../interfaces';
import { stutzApi } from '../../../api';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context';


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
    { 
        field: 'title', 
        headerName: 'Title', 
        width: 250,
        renderCell: ({row}: GridValueGetterParams | GridRenderCellParams) => {
            return (
                <NavLink to={`/admin/products/product/${row.slug}`}>
                    <Link underline='always'>
                        { row.title}
                    </Link>
                </NavLink>
            )
        }
    },
    { field: 'gender', headerName: 'Género' },
    { field: 'category', headerName: 'Categoria' },
    { field: 'inStock', headerName: 'Inventario' },
    { field: 'price', headerName: 'Precio' },
    { field: 'sizes', headerName: 'Tallas', width: 250 },

];



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

    const [ products, setProducts ] = useState<IProduct[]>([]);


    const loadData = async() => {
        try {
          const resp = await stutzApi.get<IProduct[]>('/api/tes/admin/products');
          setProducts(resp.data);
        //   console.log(resp.data);
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

    const rows = products.map( product => ({
        id: product._id,
        img: product.images[0],
        title: product.title,
        gender: product.gender,
        // category: product.category,
        inStock: product.inStock,
        price: product.price,
        sizes: product.sizes.join(', '),
        slug: product.slug,
    }));


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
