import { useState, useEffect, useContext  } from 'react';
import { AddOutlined, CategoryOutlined } from '@mui/icons-material';
import { Box, Button, Chip, Grid } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid';
import { Link as RouterLink } from 'react-router-dom';
import { Link as MuiLink } from '@mui/material';
import { NavLink } from 'react-router-dom';

import { AdminLayoutMenuList } from '../../components/layouts'
import { IEncargado  } from '../../interfaces';
import { stutzApi } from '../../../api';
import { AuthContext } from '../../../context';


export const Encargados = () => {
const { user } = useContext(AuthContext);

const columns:GridColDef[] = [
    { field: 'codEnc', headerName: 'Codigo' },
    { 
        field: 'name', 
        headerName: 'Descripcion', 
        width: 250,
        renderCell: ({row}: GridValueGetterParams | GridRenderCellParams) => {
            return (
                <MuiLink component={RouterLink} to={`/admin/encargados/encargado/${row.id}`}
                    underline='always'>
                        { row.name}
                </MuiLink>
            )
        }
    },

    {
            field: 'check',
            headerName: 'Acción',
            renderCell: ({ row }: GridValueGetterParams | GridRenderCellParams ) => {
                if (user?.role !== 'admin') return null;
                return (
                        <Chip variant='outlined' label="Eliminar" color="error"
                        onClick={() => deleteHandler(row.id)}
                        />
                    )
        
            }
        },

];




    const [ encargados, setEncargados ] = useState<IEncargado[]>([]);


    const loadData = async() => {
        try {
          const resp = await stutzApi.get<IEncargado[]>('/api/tes/admin/encargados');
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
    
    const rows = encargados.map( encargado => ({
        id: encargado._id,
        codEnc: encargado.codEnc,
        name: encargado.name,
    }));

    const deleteHandler = async (id : string) => {
    if (window.confirm('Esta Seguro de Eliminar?')) {
      try {
        await stutzApi.delete(`/api/tes/admin/encargados/${id}`);
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


    
    if ( !encargados ) return (<></>);

  return (
    <AdminLayoutMenuList 
        title={`Encargados (${ encargados?.length })`} 
        subTitle={'Mantenimiento de Encargados'}
        icon={ <CategoryOutlined /> }
    >
        <Box display='flex' justifyContent='end' sx={{ mb: 2 }}>
        <NavLink to='/admin/encargados/encargado/new' >
            <Button
                startIcon={ <AddOutlined /> }
                color="secondary"
            >
                Crear Encargado
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
