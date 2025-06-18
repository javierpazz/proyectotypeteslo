import { useState, useEffect, useContext  } from 'react';
import { AddOutlined, CategoryOutlined } from '@mui/icons-material';
import { Box, Button, Chip, Grid, Link } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid';

import { AdminLayoutMenuList } from '../../components/layouts'
import { IValue  } from '../../interfaces';
import { stutzApi } from '../../../api';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context';


export const Valores = () => {

const columns:GridColDef[] = [
    { field: 'codVal', headerName: 'Codigo' },
    { 
        field: 'desVal', 
        headerName: 'Descripcion', 
        width: 250,
        renderCell: ({row}: GridValueGetterParams | GridRenderCellParams) => {
            return (
                <NavLink to={`/admin/valores/valor/${row.id}`}>
                    <Link underline='always'>
                        { row.desVal}
                    </Link>
                </NavLink>
            )
        }
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
        navigate('/auth/login?redirect=/admin/valores');
        }
    }, [user, isLoading, navigate]);
    ////////////////////FGFGFGFG

    const [ valores, setProveedores ] = useState<IValue[]>([]);


    const loadData = async() => {
        try {
          const resp = await stutzApi.get<IValue[]>('/api/tes/admin/valores');
          setProveedores(resp.data);
        } catch (error) {
          console.log({error})
        }
    
      }

    useEffect(() => {
        loadData();
    }, [])

    // const { data, error } = useSWR<IProduct[]>('/api/admin/valores');
    // if ( !data && !error ) return (<></>);
    
    const rows = valores.map( valor => ({
        id: valor._id,
        codVal: valor.codVal,
        desVal: valor.desVal,
    }));

    const deleteHandler = async (id : string) => {
    if (window.confirm('Esta Seguro de Eliminar?')) {
      try {
        await stutzApi.delete(`/api/tes/admin/valores/${id}`);
        window.location.reload();
    } catch (err) {
      }
    }
  };


    
    if ( !valores ) return (<></>);

  return (
    <AdminLayoutMenuList 
        title={`Valores (${ valores?.length })`} 
        subTitle={'Mantenimiento de Valores'}
        icon={ <CategoryOutlined /> }
    >
        <Box display='flex' justifyContent='end' sx={{ mb: 2 }}>
        <NavLink to='/admin/valores/valor/new' >
            <Button
                startIcon={ <AddOutlined /> }
                color="secondary"
            >
                Crear Valor
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
