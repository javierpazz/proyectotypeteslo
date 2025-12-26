import { NavLink, useNavigate } from "react-router-dom";

import { Typography, Grid, Chip } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid';

import { ShopLayout } from '../../components/layouts';
import { useEffect, useState, useContext } from "react";
import { IOrder, IUser } from "../../interfaces";
import { stutzApi } from "../../../api";
import { AuthContext } from "../../../context";



const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    // { field: 'fullname', headerName: 'Nombre Completo', width: 300 },
    { field: 'email', headerName: 'Correo', width: 200 },
    { field: 'name', headerName: 'Nombre Completo', width: 200 },
    { field: 'total',
      headerName: 'Importe',
      width: 100,
      align: 'right',
      headerAlign: 'center',
    },
    {
        field: 'paid',
        headerName: 'Pagada',
        description: 'Muestra información si está pagada la orden o no',
        width: 200,
        renderCell: (params: GridRenderCellParams) => {
            return (
                params.row.paid
                    ? <Chip color="success" label="Pagada" variant='outlined' />
                    : <Chip color="error" label="No pagada" variant='outlined' />
            )
        }
    },
    { field: 'staOrd',
      headerName: 'Estado',
      width: 100,
      align: 'center',
      headerAlign: 'center',
    },

    {
        field: 'orden',
        headerName: 'Ver orden',
        width: 200,
        sortable: false,
        renderCell: (params: GridRenderCellParams) => {
            return (
               <NavLink to={`/orders/${ params.row.orderId }`} >
                        Ver orden
               </NavLink>
            )
        }
    }
];




export const History = () => {

  
////////////////////FGFGFGFG
const navigate = useNavigate()
const { user, isLoading} = useContext(  AuthContext );      
useEffect(() => {
    // if (!user) {
    if (!user && !isLoading) {

      navigate('/auth/loginadm?redirect=/admin/orders');
    }

  }, [user, navigate]);
////////////////////FGFGFGFG
const userInfo = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo')!)
    : null;


    const [ orders, setOrders ] = useState<IOrder[]>([]);

    // const { data, error } = useSWR<IOrder[]>('/api/admin/orders');

    const loadData = async() => {
      console.log(userInfo.user._id);
        try {
          const resp = await stutzApi.get(`/api/tes/orders/getordersbyus/${userInfo.user._id}`);
          setOrders(resp.data);
          console.log(resp.data);
        } catch (error) {
          console.log({error})
        }
    
      }

    useEffect(() => {
        loadData();
    }, [])



    if ( !orders ) return (<></>);
    const rows = orders.map( (order, idx) => ({
        id: idx + 1,
        paid: order.isPaid,
        fullname: `${ order.orderAddress.firstName } ${ order.orderAddress.lastName }`,
        email : (order.user as IUser).email,
        name  : (order.user as IUser).name,
        total : order.total.toFixed(2),
        staOrd: order.staOrd,
        orderId: order._id
    }))



  return (
    <ShopLayout title={'Historial de ordenes'} pageDescription={'Historial de ordenes del cliente'}>
        <Typography variant='h1' component='h1'>Historial de ordenes</Typography>


        <Grid container>
            <Grid item xs={12} sx={{ height:650, width: '100%' }}>
                <DataGrid 
                    rows={ rows }
                    columns={ columns }
                    initialState={{
                        pagination: { 
                          paginationModel: { pageSize: 5 } 
                        },
                      }}
                      pageSizeOptions={[5, 10, 25]}                />

            </Grid>
        </Grid>

    </ShopLayout>
  )
}

