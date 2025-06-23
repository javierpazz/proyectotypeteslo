import { useState, useEffect, useContext  } from 'react';
import { AddOutlined, CategoryOutlined } from '@mui/icons-material';
import { Box, Button, Chip, Grid, Link } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid';

import { AdminLayoutMenuList } from '../../components/layouts'
import { IParte  } from '../../interfaces';
import { stutzApi } from '../../../api';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context';


export const Partes = () => {

const columns:GridColDef[] = [
    { field: 'codPar', headerName: 'Codigo' },
    { 
        field: 'name', 
        headerName: 'Parte', 
        width: 250,
        renderCell: ({row}: GridValueGetterParams | GridRenderCellParams) => {
            return (
                <NavLink to={`/admin/partes/parte/${row.id}`}>
                    <Link underline='always'>
                        { row.name}
                    </Link>
                </NavLink>
            )
        }
    },
    { field: 'email', headerName: 'Email',width: 250, },
    { field: 'domcomer', headerName: 'Domicilio',width: 250, },
    { field: 'cuit', headerName: 'CUIT',width: 150, },
    { field: 'coniva', headerName: 'Condicion IVA',width: 150, },

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
        navigate('/auth/login?redirect=/admin/partes');
        }
    }, [user, isLoading, navigate]);
    ////////////////////FGFGFGFG


    const [ partes, setPartes ] = useState<IParte[]>([]);


    const loadData = async() => {
        try {
          const resp = await stutzApi.get<IParte[]>('/api/tes/admin/partes');
          setPartes(resp.data);
        } catch (error) {
          console.log({error})
        }
    
      }

    useEffect(() => {
        loadData();
    }, [])

    // const { data, error } = useSWR<IProduct[]>('/api/admin/partes');
    // if ( !data && !error ) return (<></>);
    
    const rows = partes.map( parte => ({
        id: parte._id,
        codPar: parte.codPar,
        name: parte.name,
        email: parte.email,
        domcomer: parte.domcomer,
        cuit: parte.cuit,
        coniva: parte.coniva,
    }));

    const deleteHandler = async (id : string) => {
    if (window.confirm('Esta Seguro de Eliminar?')) {
      try {
        await stutzApi.delete(`/api/tes/admin/partes/${id}`);
        window.location.reload();
    } catch (err) {
      }
    }
  };


    
    if ( !partes ) return (<></>);

  return (
    <AdminLayoutMenuList 
        title={`Partes (${ partes?.length })`} 
        subTitle={'Mantenimiento de Partes'}
        icon={ <CategoryOutlined /> }
    >
        <Box display='flex' justifyContent='end' sx={{ mb: 2 }}>
        <NavLink to='/admin/partes/parte/new' >
            <Button
                startIcon={ <AddOutlined /> }
                color="secondary"
            >
                Crear Parte
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
