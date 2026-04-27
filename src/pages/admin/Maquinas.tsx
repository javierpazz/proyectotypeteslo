import { useState, useEffect } from 'react';
import { AddOutlined, CategoryOutlined } from '@mui/icons-material';
import { Box, Button,  Chip, Grid } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom';
import { Link as MuiLink } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid';

import { AdminLayoutMenuList } from '../../components/layouts'
import { IMaquina, ICustomer  } from '../../interfaces';
import { stutzApi } from '../../../api';
import { NavLink } from 'react-router-dom';




export const Maquinas = () => {

    const columns:GridColDef[] = [
    { field: 'codMaq', headerName: 'Codigo'},
    { 
        field: 'name', 
        headerName: 'Maquina', 
        width: 250,
        headerAlign: 'center',
        renderCell: ({row}: GridValueGetterParams | GridRenderCellParams) => {
            return (
                // <MuiLink component={RouterLink} to={`/admin/productsfac/productfac/${row.slug}`}
                <MuiLink component={RouterLink} to={`/admin/maquinas/maquina/${row.id}`}
                underline='always'>
                        { row.name}
                </MuiLink>
            )
        }
    },
    { field: 'serNum', headerName: 'Nro Serie', width: 200 },
    { field: 'nameCus', headerName: 'Cliente', width: 200 },
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

    const [ maquinas, setMaquinas ] = useState<IMaquina[]>([]);


    const loadData = async() => {
        try {
        //   const resp = await stutzApi.get<IMaquina[]>(`/api/maquinas/admin/tes?id_client=${CodigoCus}`);
          const resp = await stutzApi.get<IMaquina[]>(`/api/tes/admin/maquinas`);
          setMaquinas(resp.data);
        } catch (error) {
          console.log({error})
        }
    
      }

    useEffect(() => {
        loadData();
    }, [])

    // const { data, error } = useSWR<IMaquina[]>('/api/admin/maquinas');
    // if ( !data && !error ) return (<></>);
    
    
    // const rows = maquinas.map( maquina => ({
    const rows = maquinas.map( maquina => ({
        id: maquina._id,
        codMaq: maquina.codMaq,
        name: maquina.name,
        serNum: maquina.serNum,
        nameCus  : (maquina.codCus as ICustomer)?.nameCus ?? '',


    }));



    const deleteHandler = async (id : string) => {
    if (window.confirm('Esta Seguro de Eliminar?')) {
        try {
        await stutzApi.delete(`/api/tes/admin/maquinas/${id}`);
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


    if ( !maquinas ) return (<></>);

  return (
    <AdminLayoutMenuList 
        title={`Maquinas (${ maquinas?.length })`} 
        subTitle={'Mantenimiento de Maquinas'}
        icon={ <CategoryOutlined /> }
    >



        <Box display='flex' justifyContent='end' sx={{ mb: 2 }}>
        <NavLink to='/admin/maquinas/maquina/new' >
            <Button
                startIcon={ <AddOutlined /> }
                color="secondary"
            >
                Crear Maquina
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
