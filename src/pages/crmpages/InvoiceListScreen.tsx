
import { useContext, useEffect, useState } from 'react';
import { ConfirmationNumberOutlined } from '@mui/icons-material'
import { Chip, Grid } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid';

import { AdminLayout } from '../../components/layouts'
import { IOrder, IUser } from '../../interfaces';
import { stutzApi } from '../../../api';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context';

const columns:GridColDef[] = [
    { field: 'id', headerName: 'Orden ID', width: 250 },
    { field: 'email', headerName: 'Correo', width: 250 },
    { field: 'name', headerName: 'Nombre Completo', width: 300 },
    { field: 'total', headerName: 'Monto total', width: 300 },
    {
        field: 'isPaid',
        headerName: 'Pagada',
        renderCell: ({ row }: GridValueGetterParams | GridRenderCellParams ) => {
            return row.isPaid
                ? ( <Chip variant='outlined' label="Pagada" color="success" /> )
                : ( <Chip variant='outlined' label="Pendiente" color="error" /> )
        }
    },
    { field: 'noProducts', headerName: 'No.Productos', align: 'center', width: 150 },
    {
        field: 'check',
        headerName: 'Ver orden',
        renderCell: ({ row }: GridValueGetterParams | GridRenderCellParams ) => {
            return (
                    <NavLink to={`/admin/orders/order/${ row.id }`}>
                    { "Ver Orden"}
                    </NavLink>
                )
    

                // <a href={ `/admin/orders/order/${ row.id }` } target="_blank" rel="noreferrer" >
                //     Ver orden
                // </a>
                // )
        }
    },
    { field: 'createdAt', headerName: 'Creada en', width: 300 },

];




export const InvoiceListScreen = () => {

    const [ orders, setOrders ] = useState<IOrder[]>([]);

    ////////////////////FGFGFGFG
    const { user } = useContext(AuthContext);
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) {
        navigate('/auth/loginadm?redirect=/admin/entradas');
        }
    }, [user, navigate]);
    ////////////////////FGFGFGFG




    // const { data, error } = useSWR<IOrder[]>('/api/admin/orders');

    const loadData = async() => {
        try {
        //   const { data } = await axios.get(`${API}/api/invoices/searchinvS?page=${page}&order=${order}&fech1=${fech1}&fech2=${fech2}&configuracion=${codCon}&usuario=${codUse}&customer=${codCus}&comprobante=${codCom}`,{
        //     headers: { Authorization: `Bearer ${userInfo.token}` },
        // });
          const resp = await stutzApi.get('/api/invoices/searchinvS');
          setOrders(resp.data.invoices);
          console.log(resp.data.invoices);
        } catch (error) {
          console.log({error})
        }
    
      }

    useEffect(() => {
        loadData();
    }, [])



    if ( !orders ) return (<></>);
    
    const rows = orders!.map( order => ({
        id    : order._id,
        email : (order.user as IUser).email,
        name  : (order.user as IUser).name,
        total : order.total,
        isPaid: order.isPaid,
        noProducts: order.numberOfItems,
        createdAt: order.createdAt,
    }));


  return (
    <AdminLayout 
        title={'Comprobantes'} 
        subTitle={'Mantenimiento de Comprobantes'}
        icon={ <ConfirmationNumberOutlined /> }
    >
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
        
    </AdminLayout>
  )
}

