import { useState, useEffect  } from 'react';
import { AddOutlined, CategoryOutlined } from '@mui/icons-material';
import { Box, Button, Chip, Grid } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid';
import { Link as RouterLink } from 'react-router-dom';
import { Link as MuiLink } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { AdminLayoutMenuList } from '../../components/layouts'
import { IEstadoOrden  } from '../../interfaces';
import { stutzApi } from '../../../api';


export const Estadosorden = () => {

const columns:GridColDef[] = [
    { field: 'name', headerName: 'Estado', width: 250, },
    { 
        field: 'note', 
        headerName: 'Descripcion', 
        width: 250,
        renderCell: ({row}: GridValueGetterParams | GridRenderCellParams) => {
            return (
                <MuiLink component={RouterLink} to={`/admin/estadosorden/estadoorden/${row.id}`}
                     underline='always'>
                        { row.note}
                </MuiLink>
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
