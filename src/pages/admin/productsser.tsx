import { useState, useEffect, useContext } from 'react';
import { AddOutlined, CategoryOutlined } from '@mui/icons-material';
import { Box, Button,  Chip, Grid } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom';
import { Link as MuiLink } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid';

import { AdminLayoutMenuList } from '../../components/layouts'
import { IProduct  } from '../../interfaces';
import { stutzApi } from '../../../api';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context';




export const ProductsSer = () => {

const columns:GridColDef[] = [
    { field: 'codPro', headerName: 'Codigo' },
    { 
        field: 'title', 
        headerName: 'Descripcion', 
        width: 250,
        renderCell: ({row}: GridValueGetterParams | GridRenderCellParams) => {
            return (
                <MuiLink component={RouterLink} to={`/admin/productsesc/productser/${row.slug}`}
                    underline='always'>
                        { row.title}
                </MuiLink>
            )
        }
    },
    // { field: 'price', headerName: 'Valor' },
    { field: 'price',
      headerName: 'Valor',
      width: 100,
      align: 'right',
      headerAlign: 'center',
    },
    { field: 'priceBuy', headerName: 'Costo', align: 'right', headerAlign: 'center' },
    { field: 'porIva', headerName: '%IVA', align: 'right', headerAlign: 'center' },
    { field: 'medPro', headerName: 'U.Medida', headerAlign: 'center' },

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
        navigate('/auth/loginadm?redirect=/admin/productosser');
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
        } catch (error) {
          console.log({error})
        }
    
      }

    useEffect(() => {
        loadData();
    }, [])

    // const { data, error } = useSWR<IProduct[]>('/api/admin/products');
    // if ( !data && !error ) return (<></>);
    
    
    const rows = products.map( product => ({
        id: product._id,
        codPro: product.codPro,
        title: product.title,
        // gender: product.gender,
        // // category: product.category,
        // inStock: product.inStock,
        price: product.price.toFixed(2),
        // sizes: product.sizes.join(', '),
        slug: product.slug,
        priceBuy: product.priceBuy.toFixed(2),
        medPro: product.medPro,
        porIva: product.porIva.toFixed(2),

    }));

    const deleteHandler = async (id : string) => {
    if (window.confirm('Esta Seguro de Eliminar?')) {
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
        title={`Tareas (${ products?.length })`} 
        subTitle={'Mantenimiento de Tareas'}
        icon={ <CategoryOutlined /> }
    >
        <Box display='flex' justifyContent='end' sx={{ mb: 2 }}>
        <NavLink to='/admin/productsesc/productser/new' >
            <Button
                startIcon={ <AddOutlined /> }
                color="secondary"
            >
                Crear Tarea
            </Button>
            </NavLink>            
        </Box>

         <Grid container className='fadeIn'>
            <Grid item xs={12} sx={{ height:475, width: '100%' }}>
                <DataGrid
                rows={rows}
                columns={columns}
                rowHeight={33}
                initialState={{
                    pagination: {
                    paginationModel: { pageSize: 20, page: 0 },
                    },
                }}
                pageSizeOptions={[20]}
                />
            </Grid>
        </Grid>
        
    </AdminLayoutMenuList>
  )
}
