import { useState, useEffect, useContext  } from 'react';
import { AddOutlined, CategoryOutlined } from '@mui/icons-material';
import { Box, Button, Chip, Grid } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom';
import { Link as MuiLink } from '@mui/material';

import { DataGrid, GridColDef, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid';

import { AdminLayoutMenuList } from '../../components/layouts'
import { IInstrumento  } from '../../interfaces';
import { stutzApi } from '../../../api';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context';





export const Instrumentos = () => {

    const columns:GridColDef[] = [
        { field: 'codIns', headerName: 'Codigo' },
        { 
            field: 'name', 
            headerName: 'Descripcion', 
            width: 250,
            renderCell: ({row}: GridValueGetterParams | GridRenderCellParams) => {
                return (
                    <MuiLink component={RouterLink} to={`/admin/instrumentos/instrumento/${row.id}`}
                        underline='always'>
                            { row.name}
                    </MuiLink>
                )
            }
        },
        {
            field: 'publico',
            headerName: 'INSTRUMETO',
            width: 120,
            renderCell: ({ row }: GridValueGetterParams | GridRenderCellParams ) => {
                return row.publico
                    ? (
                        <>PUBLICO</>
                    )
                    : (
                        <>PRIVADO</>
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
        navigate('/auth/loginadm?redirect=/admin/instrumentos');
        }
        if (user?.role === "client" ) {
        navigate('/');
        }
    }, [user, isLoading, navigate]);
    ////////////////////FGFGFGFG


    const [ instrumentos, setInstrumentos ] = useState<IInstrumento[]>([]);


    const loadData = async() => {
        try {
          const resp = await stutzApi.get<IInstrumento[]>('/api/tes/admin/instrumentos');
          setInstrumentos(resp.data);
        } catch (error) {
          console.log({error})
        }
    
      }

    useEffect(() => {
        loadData();
    }, [])

    // const { data, error } = useSWR<IProduct[]>('/api/admin/instrumentos');
    // if ( !data && !error ) return (<></>);
    
    
    const rows = instrumentos.map( instrumentos => ({
        id: instrumentos._id,
        codIns: instrumentos.codIns,
        name: instrumentos.name,
        publico: instrumentos.publico,
    }));

    const deleteHandler = async (id : string) => {
    if (window.confirm('Esta Seguro de Eliminar?')) {
      try {
        await stutzApi.delete(`/api/tes/admin/instrumentos/${id}`);
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



    if ( !instrumentos ) return (<></>);

  return (
    <AdminLayoutMenuList 
        title={`Instrumentos (${ instrumentos?.length })`} 
        subTitle={'Mantenimiento de instrumentos'}
        icon={ <CategoryOutlined /> }
    >
        <Box display='flex' justifyContent='end' sx={{ mb: 2 }}>
        <NavLink to='/admin/instrumentos/instrumento/new' >
            <Button
                startIcon={ <AddOutlined /> }
                color="secondary"
            >
                Crear Instrumento
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
