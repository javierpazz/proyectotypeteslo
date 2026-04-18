import { useState, useEffect  } from 'react';
import { AddOutlined, CategoryOutlined } from '@mui/icons-material';
import { Box, Button, Chip, Grid } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom';
import { Link as MuiLink } from '@mui/material';
import { NavLink } from 'react-router-dom';

import { DataGrid, GridColDef, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid';

import { AdminLayoutMenuList } from '../../components/layouts'
import { ICustomer  } from '../../interfaces';
import { stutzApi } from '../../../api';


export const Customers = () => {

const columns:GridColDef[] = [
    { field: 'codCus', headerName: 'Codigo' },
    { 
        field: 'name', 
        headerName: 'Cliente', 
        width: 250,
        renderCell: ({row}: GridValueGetterParams | GridRenderCellParams) => {
            return (
                <MuiLink component={RouterLink} to={`/admin/customers/customer/${row.id}`}
                    underline='always'>
                        { row.name}
                </MuiLink>
            )
        }
    },
    { field: 'emailCus', headerName: 'Email',width: 250, },
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


    const [ customers, setCustomers ] = useState<ICustomer[]>([]);


    const loadData = async() => {
        try {
          const resp = await stutzApi.get<ICustomer[]>('/api/tes/admin/customers');
          setCustomers(resp.data);
        } catch (error) {
          console.log({error})
        }
    
      }

    useEffect(() => {
        loadData();
    }, [])

    // const { data, error } = useSWR<IProduct[]>('/api/admin/customers');
    // if ( !data && !error ) return (<></>);
    
    const rows = customers.map( customer => ({
        id: customer._id,
        codCus: customer.codCus,
        name: customer.nameCus,
        emailCus: customer.emailCus,
        domcomer: customer.domcomer,
        cuit: customer.cuit,
        coniva: customer.coniva,
    }));

    const deleteHandler = async (id : string) => {
    if (window.confirm('Esta Seguro de Eliminar?')) {
      try {
        await stutzApi.delete(`/api/tes/admin/customers/${id}`);
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


    
    if ( !customers ) return (<></>);

  return (
    <AdminLayoutMenuList 
        title={`Clientes (${ customers?.length })`} 
        subTitle={'Mantenimiento de Clientes'}
        icon={ <CategoryOutlined /> }
    >
        <Box display='flex' justifyContent='end' sx={{ mb: 2 }}>
            <Button
                component={NavLink}
                to='/admin/customers/customer/new'
                startIcon={<AddOutlined />}
                color="secondary"
            >
                Crear Cliente
            </Button>


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
