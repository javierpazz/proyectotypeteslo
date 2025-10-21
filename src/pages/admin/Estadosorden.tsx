import { useState, useEffect, useContext  } from 'react';
import { AddOutlined, CategoryOutlined } from '@mui/icons-material';
import { Box, Button, Chip, Grid, Link } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid';

import { AdminLayoutMenuList } from '../../components/layouts'
import { IEstadoOrden  } from '../../interfaces';
import { stutzApi } from '../../../api';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context';


export const Estadosorden = () => {

const columns:GridColDef[] = [
    { field: 'name', headerName: 'Estado', width: 250, },
    { 
        field: 'note', 
        headerName: 'Descripcion', 
        width: 250,
        renderCell: ({row}: GridValueGetterParams | GridRenderCellParams) => {
            return (
                <NavLink to={`/admin/estadosorden/estadoorden/${row.id}`}>
                    <Link underline='always'>
                        { row.note}
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
        navigate('/auth/loginadm?redirect=/admin/estadosorden');
        }
        if (user?.role === "client" ) {
        navigate('/');
        }
    }, [user, isLoading, navigate]);
    ////////////////////FGFGFGFG

    const [ estadosorden, setEncargados ] = useState<IEstadoOrden[]>([]);


    const loadData = async() => {
        try {
          const resp = await stutzApi.get<IEstadoOrden[]>('/api/tes/admin/estadosorden');
          setEncargados(resp.data);
        } catch (error) {
          console.log({error})
        }
    
      }

    useEffect(() => {
        loadData();
    }, [])

    // const { data, error } = useSWR<IProduct[]>('/api/admin/encargados');
    // if ( !data && !error ) return (<></>);
    
    const rows = estadosorden.map( encargado => ({
        id: encargado._id,
        name: encargado.name,
        note: encargado.note,
    }));

    const deleteHandler = async (id : string) => {
    if (window.confirm('Esta Seguro de Eliminar?')) {
      try {
        await stutzApi.delete(`/api/tes/admin/estadosorden/${id}`);
        window.location.reload();
    } catch (err) {
      }
    }
  };


    
    if ( !estadosorden ) return (<></>);

  return (
    <AdminLayoutMenuList 
        title={`Estados de Orden (${ estadosorden?.length })`} 
        subTitle={'Mantenimiento de Estados de Orden'}
        icon={ <CategoryOutlined /> }
    >
        <Box display='flex' justifyContent='end' sx={{ mb: 2 }}>
        <NavLink to='/admin/estadosorden/estadoorden/new' >
            <Button
                startIcon={ <AddOutlined /> }
                color="secondary"
            >
                Crear Estado de Orden
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
