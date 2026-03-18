import { useState, useEffect, useContext  } from 'react';
import { AddOutlined, CategoryOutlined } from '@mui/icons-material';
import { Box, Button, Chip, Grid, Link } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid';

import { AdminLayoutMenuList } from '../../components/layouts'
import { IConfiguracion  } from '../../interfaces';
import { stutzApi } from '../../../api';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context';


export const Configuraciones = () => {

const columns:GridColDef[] = [
    { field: 'codCon', headerName: 'Codigo' },
    { 
        field: 'name', 
        headerName: 'Punto de Venta', 
        width: 250,
        renderCell: ({row}: GridValueGetterParams | GridRenderCellParams) => {
            return (
                <NavLink to={`/admin/configuraciones/configuracion/${row.id}`}>
                    <Link underline='always'>
                        { row.name}
                    </Link>
                </NavLink>
            )
        }
    },
    { field: 'domcomer', headerName: 'Domicilio',width: 250, },
    { field: 'cuit', headerName: 'CUIT',width: 150, },
    { field: 'coniva', headerName: 'Condicion IVA',width: 150, },
    { field: 'ib', headerName: 'IB',width: 150, },
    { field: 'feciniact', headerName: 'Fecha Ini. Act.',width: 150, },

    {
            field: 'check',
            headerName: 'Acción',
            renderCell: ({ row }: GridValueGetterParams | GridRenderCellParams ) => {
                if ((user?.role !== 'admin') && (user?._id !== row.userInv)) return null;
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
        navigate('/auth/login?redirect=/admin/configuraciones');
        }
        if (user?.role === "client" ) {
        navigate('/');
        }
    }, [user, isLoading, navigate]);
    ////////////////////FGFGFGFG

    const [ configuraciones, setConfiguraciones ] = useState<IConfiguracion[]>([]);


    const loadData = async() => {
        try {
          const resp = await stutzApi.get<IConfiguracion[]>('/api/tes/admin/configuraciones');
          setConfiguraciones(resp.data);
        } catch (error) {
          console.log({error})
        }
    
      }

    useEffect(() => {
        loadData();
    }, [])

    // const { data, error } = useSWR<IProduct[]>('/api/admin/configuraciones');
    // if ( !data && !error ) return (<></>);
    
    const rows = configuraciones.map( configuracion => ({
        id: configuracion._id,
        codCon: configuracion.codCon,
        name: configuracion.name,
        domcomer: configuracion.domcomer,
        cuit: configuracion.cuit,
        coniva: configuracion.coniva,
        ib: configuracion.ib,
        feciniact: configuracion.feciniact,
    }));

    const deleteHandler = async (id : string) => {
    if (window.confirm('Esta Seguro de Eliminar?')) {
      try {
        await stutzApi.delete(`/api/tes/admin/configuraciones/${id}`);
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


    
    if ( !configuraciones ) return (<></>);

  return (
    <AdminLayoutMenuList 
        title={`Puntos de Venta (${ configuraciones?.length })`} 
        subTitle={'Mantenimiento de Puntos de Venta'}
        icon={ <CategoryOutlined /> }
    >
        <Box display='flex' justifyContent='end' sx={{ mb: 2 }}>
        <NavLink to='/admin/configuraciones/configuracion/new' >
            <Button
                startIcon={ <AddOutlined /> }
                color="secondary"
            >
                Crear Punto de Venta
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
