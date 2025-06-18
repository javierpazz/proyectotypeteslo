import { useState, useEffect, useContext  } from 'react';
import { AddOutlined, CategoryOutlined } from '@mui/icons-material';
import { Box, Button, Chip, Grid, Link } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid';

import { AdminLayoutMenuList } from '../../components/layouts'
import { ICustomer  } from '../../interfaces';
import { stutzApi } from '../../../api';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context';


export const Customers = () => {

const columns:GridColDef[] = [
    { field: 'codCus', headerName: 'Codigo' },
    { 
        field: 'name', 
        headerName: 'Descripcion', 
        width: 250,
        renderCell: ({row}: GridValueGetterParams | GridRenderCellParams) => {
            return (
                <NavLink to={`/admin/customers/customer/${row.id}`}>
                    <Link underline='always'>
                        { row.name}
                    </Link>
                </NavLink>
            )
        }
    },
    { field: 'emailCus', headerName: 'Email' },
    { field: 'domcomer', headerName: 'Domicilio' },
    { field: 'cuit', headerName: 'CUIT' },
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
        navigate('/auth/login?redirect=/admin/customers');
        }
    }, [user, isLoading, navigate]);
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
    } catch (err) {
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
        <NavLink to='/admin/customers/customer/new' >
            <Button
                startIcon={ <AddOutlined /> }
                color="secondary"
            >
                Crear Cliente
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
