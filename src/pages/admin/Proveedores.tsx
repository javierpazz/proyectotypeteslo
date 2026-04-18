import { useState, useEffect  } from 'react';
import { AddOutlined, CategoryOutlined } from '@mui/icons-material';
import { Box, Button, Chip, Grid, Link } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid';

import { AdminLayoutMenuList } from '../../components/layouts'
import { ISupplier  } from '../../interfaces';
import { stutzApi } from '../../../api';
import { NavLink } from 'react-router-dom';


export const Proveedores = () => {

const columns:GridColDef[] = [
    { field: 'codSup', headerName: 'Codigo' },
    { 
        field: 'name', 
        headerName: 'Descripcion', 
        width: 250,
        renderCell: ({row}: GridValueGetterParams | GridRenderCellParams) => {
            return (
                <NavLink to={`/admin/proveedores/proveedor/${row.id}`}>
                    <Link underline='always'>
                        { row.name}
                    </Link>
                </NavLink>
            )
        }
    },
    { field: 'email', headerName: 'Email',width: 200 },
    { field: 'domcomer', headerName: 'Domicilio',width: 250 },
    { field: 'cuit', headerName: 'CUIT',width: 150 },
    { field: 'coniva', headerName: 'Condicion IVA',width: 150 },

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



    const [ proveedores, setProveedores ] = useState<ISupplier[]>([]);


    const loadData = async() => {
        try {
          const resp = await stutzApi.get<ISupplier[]>('/api/tes/admin/proveedores');
          setProveedores(resp.data);
        } catch (error) {
          console.log({error})
        }
    
      }

    useEffect(() => {
        loadData();
    }, [])

    // const { data, error } = useSWR<IProduct[]>('/api/admin/proveedores');
    // if ( !data && !error ) return (<></>);
    
    const rows = proveedores.map( proveedor => ({
        id: proveedor._id,
        codSup: proveedor.codSup,
        name: proveedor.name,
        email: proveedor.email,
        domcomer: proveedor.domcomer,
        cuit: proveedor.cuit,
        coniva: proveedor.coniva,
    }));

    const deleteHandler = async (id : string) => {
    if (window.confirm('Esta Seguro de Eliminar?')) {
      try {
        await stutzApi.delete(`/api/tes/admin/proveedores/${id}`);
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


    
    if ( !proveedores ) return (<></>);

  return (
    <AdminLayoutMenuList 
        title={`Proveedores (${ proveedores?.length })`} 
        subTitle={'Mantenimiento de Proveedores'}
        icon={ <CategoryOutlined /> }
    >
        <Box display='flex' justifyContent='end' sx={{ mb: 2 }}>
        <NavLink to='/admin/proveedores/proveedor/new' >
            <Button
                startIcon={ <AddOutlined /> }
                color="secondary"
            >
                Crear Proveedor
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
