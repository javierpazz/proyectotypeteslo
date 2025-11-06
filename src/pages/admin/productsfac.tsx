import { useState, useEffect, useContext } from 'react';
import { AddOutlined, CategoryOutlined } from '@mui/icons-material';
import { Box, Button,  Chip, Grid } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom';
import { Link as MuiLink } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid';

import { AdminLayoutMenuList } from '../../components/layouts'
import { IProduct, ISupplier  } from '../../interfaces';
import { stutzApi } from '../../../api';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context';




export const ProductsFac = () => {

    const columns:GridColDef[] = [
    { field: 'codigoPro', headerName: 'Codigo'},
    { field: 'codPro', headerName: 'Codigo Barra', width: 200 },
    { 
        field: 'title', 
        headerName: 'Title', 
        width: 250,
        headerAlign: 'center',
        renderCell: ({row}: GridValueGetterParams | GridRenderCellParams) => {
            return (
                <MuiLink component={RouterLink} to={`/admin/productsfac/productfac/${row.slug}`}
                underline='always'>
                        { row.title}
                </MuiLink>
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
    ////////////////////FGFGFGFG
    const { user, isLoading } = useContext(AuthContext);
    const navigate = useNavigate()

    useEffect(() => {
        if (!user && !isLoading) {
        navigate('/auth/loginadm?redirect=/admin/productosfac');
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


    const loadData = async() => {
        try {
          const resp = await stutzApi.get<IProduct[]>(`/api/products/admin/tes?id_config=${userInfo.codCon}`);
          setProducts(resp.data);
          console.log("fact");
          console.log(resp.data);
          console.log("fact");
        } catch (error) {
          console.log({error})
        }
    
      }

    useEffect(() => {
        loadData();
    }, [])

    // const { data, error } = useSWR<IProduct[]>('/api/admin/products');
    // if ( !data && !error ) return (<></>);
    
    
    // const rows = products.map( product => ({
    const rows = products.map( product => ({
        id: product._id,
        codPro: product.codPro,
        codigoPro: product.codigoPro,
        title: product.title,
        slug: product.slug,
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


    if ( !products ) return (<></>);

  return (
    <AdminLayoutMenuList 
        title={`Productos (${ products?.length })`} 
        subTitle={'Mantenimiento de Productos'}
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
        <NavLink to='/admin/productsfac/productfac/new' >
            <Button
                startIcon={ <AddOutlined /> }
                color="secondary"
            >
                Crear Producto
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
