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




export const ProductsEsc = () => {

const columns:GridColDef[] = [
    { field: 'codPro', headerName: 'Codigo' },
    { 
        field: 'title', 
        headerName: 'Descripcion', 
        width: 250,
        renderCell: ({row}: GridValueGetterParams | GridRenderCellParams) => {
            return (
                <MuiLink component={RouterLink} to={`/admin/productsesc/productesc/${row.title}`}
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
        navigate('/auth/loginadm?redirect=/admin/productosesc');
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
        // slug: product.slug,
    }));

    const deleteHandler = async (id : string) => {
    if (window.confirm('Esta Seguro de Eliminar?')) {
        console.log(id)
        try {
        await stutzApi.delete(`/api/tes/admin/productsesc/${id}`);
        window.location.reload();
    } catch (err) {
      }
    }
  };


    if ( !products ) return (<></>);

  return (
    <AdminLayoutMenuList 
        title={`Diligencias (${ products?.length })`} 
        subTitle={'Mantenimiento de Diligencias'}
        icon={ <CategoryOutlined /> }
    >
        <Box display='flex' justifyContent='end' sx={{ mb: 2 }}>
        <NavLink to='/admin/productsesc/productesc/new' >
            <Button
                startIcon={ <AddOutlined /> }
                color="secondary"
            >
                Crear Diligencia
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
