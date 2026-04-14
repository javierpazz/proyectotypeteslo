import { NavLink, useNavigate } from "react-router-dom";

import { Typography, Grid, Chip } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

import { ShopLayout } from '../../components/layouts';
import { useEffect, useState, useContext } from "react";
import { IInstrumento, IMaquina, IOrder, IParte, IUser } from "../../interfaces";
import { stutzApi } from "../../../api";
import { AuthContext } from "../../../context";



const columns: GridColDef[] = [
    // { field: 'id', headerName: 'ID', width: 100 },
    { field: 'remNum', headerName: 'Orden', width: 100 },
    { field: 'remDat', headerName: 'Fecha', width: 100 },
    // { field: 'fullname', headerName: 'Nombre Completo', width: 300 },
    { field: 'instrumento', headerName: 'Instrumento', width: 250 },
    { field: 'maquina', headerName: 'Maquina', width: 200 },
    { field: 'parte', headerName: 'Parte', width: 200 },
    { field: 'total',
      headerName: 'Importe',
      width: 100,
      align: 'right',
      headerAlign: 'center',
    },
    { field: 'email', headerName: 'Correo', width: 200 },
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
      width: 200,
      // align: 'center',
      headerAlign: 'center',
    },

    {
        field: 'orden',
        headerName: 'Ver orden',
        width: 200,
        sortable: false,
        renderCell: (params: GridRenderCellParams) => {
            return (
               <NavLink to={`/pedidoentradas/${ params.row.orderId }`} >
                        Ver orden
               </NavLink>
            )
        }
    }
];




export const HistoryEntradas = () => {

  
////////////////////FGFGFGFG
// const navigate = useNavigate()
// const { user, isLoading} = useContext(  AuthContext );      
// useEffect(() => {
//     // if (!user) {
//     if (!user && !isLoading) {

//       navigate('/auth/loginadm?redirect=/admin/orders');
//     }

//   }, [user, navigate]);

    ////////////////////FGFGFGFG
    const { user, isLoading } = useContext(AuthContext);
    const navigate = useNavigate()

    useEffect(() => {
        if (!user && !isLoading) {
        navigate('/auth/login?redirect=/pedidoentradas/history');
        }
        if (user?.role !== "client" ) {
        navigate('/');
        }
      }, [user, isLoading, navigate]);
    ////////////////////FGFGFGFG


////////////////////FGFGFGFG
const userInfo = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo')!)
    : null;

    function formatDateNoTZ(dateString: string) {
    const datePart = dateString.split('T')[0];
    const [year, month, day] = datePart.split('-').map(Number);
    return `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`;
    }

    const [ orders, setOrders ] = useState<IOrder[]>([]);

    // const { data, error } = useSWR<IOrder[]>('/api/admin/orders');

    const loadData = async() => {
        try {
          // aqui hago trampa
          userInfo.user._id = userInfo.user.email;
          // aqui hago trampa
          const resp = await stutzApi.get(`/api/tes/entradas/getservicesbyus/${userInfo.user._id}`);
          // console.log(resp.data)
          setOrders(resp.data);
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
        remNum: order.remNum,
        remDat: order.remDat ? formatDateNoTZ(order.remDat) : '',
        paid: order.isPaid,
        // fullname: `${ order.orderAddress.firstName } ${ order.orderAddress.lastName }`,
        email : (order.user as IUser).email,
        instrumento  : (order.id_instru as IInstrumento)?.name ?? "",
        maquina  : (order.id_maquin as IMaquina)?.name ?? "",
        parte  : (order.id_parte as IParte)?.name ?? "",

        name  : (order.user as IUser).name,
        total : order.total.toFixed(2),
        staOrd: order.staOrd,
        orderId: order._id
    }))



  return (
    <ShopLayout title={'Historial de ordenes'} pageDescription={'Historial de ordenes del cliente'}>
        <Typography variant='h1' component='h1'>Historial de Entradas</Typography>


        <Grid container>
            <Grid item xs={12} sx={{ height:475, width: '100%' }}>
                <DataGrid 
                    rows={ rows }
                    columns={ columns }
                    rowHeight={33}
                    initialState={{
                        pagination: { 
                          // paginationModel: { pageSize: 5 } 
                          paginationModel: { pageSize: 20, page: 0 },
                        },
                      }}
                      // pageSizeOptions={[5, 10, 25]}                />
                      pageSizeOptions={[20]}                />

            </Grid>
        </Grid>

    </ShopLayout>
  )
}

