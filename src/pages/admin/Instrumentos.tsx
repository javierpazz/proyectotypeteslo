import { useState, useEffect } from 'react';
import { AddOutlined, CategoryOutlined } from '@mui/icons-material';
import { Box, Button, CardMedia, Grid, Link } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid';

import { AdminLayoutMenuList } from '../../components/layouts'
import { IInstrumento  } from '../../interfaces';
import { stutzApi } from '../../../api';
import { NavLink } from 'react-router-dom';


const columns:GridColDef[] = [
    { field: 'codIns', headerName: 'Codigo' },
    { 
        field: 'name', 
        headerName: 'Descripcion', 
        width: 250,
        renderCell: ({row}: GridValueGetterParams | GridRenderCellParams) => {
            return (
                <NavLink to={`/admin/instrumentos/instrumento/${row.name}`}>
                    <Link underline='always'>
                        { row.name}
                    </Link>
                </NavLink>
            )
        }
    },

];



export const Instrumentos = () => {


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
    
    if ( !instrumentos ) return (<></>);

    const rows = instrumentos.map( instrumentos => ({
        id: instrumentos._id,
        codIns: instrumentos.codIns,
        name: instrumentos.name,
    }));


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
