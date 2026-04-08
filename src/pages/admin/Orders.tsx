
import { useContext, useEffect, useState } from 'react';
import { ConfirmationNumberOutlined } from '@mui/icons-material'
import { Chip, Grid, MenuItem, Select } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid';

import { AdminLayoutMenuList } from '../../components/layouts'
import { IEstadoOrden, IOrder, IUser } from '../../interfaces';
import { stutzApi } from '../../../api';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context';




export const Orders = () => {





    const [ orders, setOrders ] = useState<IOrder[]>([]);

////////////////////FGFGFGFG
const navigate = useNavigate()
const { user, isLoading} = useContext(  AuthContext );      
useEffect(() => {
    // if (!user) {
    if (!user && !isLoading) {

      navigate('/auth/loginadm?redirect=/admin/orders');
    }
        if (user?.role === "client" ) {
        navigate('/');
        }
  }, [user, navigate]);
  ////////////////////FGFGFGFG

          const userInfo = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo')!)
    : null;

  const [stateOrdss, setStateOrdss] = useState<IEstadoOrden[]>();



  useEffect(() => {
    const fetchDataVal = async () => {
      try {
        const { data } = await stutzApi.get(`api/stateOrds/`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        setStateOrdss(data);

      } catch (err) {}
    };
    fetchDataVal();
  }, []);




    // const { data, error } = useSWR<IOrder[]>('/api/admin/orders');

    const loadData = async() => {
        try {
          const resp = await stutzApi.get('/api/tes/admin/orders');
          setOrders(resp.data);
        } catch (error) {
          console.log({error})
        }
    
      }

    useEffect(() => {
        loadData();
    }, [])

    function formatDateNoTZ(dateString: string) {
    const datePart = dateString.split('T')[0];
    const [year, month, day] = datePart.split('-').map(Number);
    return `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`;
    }


    if ( !orders ) return (<></>);
    
    const rows = orders!.map( order => ({
        id    : order._id,
        email : (order.user as IUser).email,
        name  : (order.user as IUser).name,
        total : order.total.toFixed(2),
        codConNum: order.codConNum,
        staOrd: order.staOrd,
        invNum: order.invNum,
        
        invNumAux: order.invNum,
        invDat: order.invDat ? formatDateNoTZ(order.invDat) : '',

        isPaid: order.isPaid,
        noProducts: order.numberOfItems,
        createdAt: order.createdAt,
    }));



const columns:GridColDef[] = [
    { field: 'id', headerName: 'Orden ID', width: 300,
        renderCell: ({ row }: GridValueGetterParams | GridRenderCellParams ) => {
            return (
                    <NavLink to={`/admin/orders/order/${ row.id }`}>
                    { row.id}
                    </NavLink>
                )
    
                // <a href={ `/admin/orders/order/${ row.id }` } target="_
                // blank" rel="noreferrer" >
                //     Ver orden
                // </a>
                // )
        }
     },
    { field: 'email', headerName: 'Correo', width: 200 },
    { field: 'name', headerName: 'Nombre Completo', width: 200 },
    { field: 'total',
      headerName: 'Importe',
      width: 100,
      align: 'right',
      headerAlign: 'center',
    },

        {
            field: 'staOrd', 
            headerName: 'Estado', 
            headerAlign: 'center',
            width: 200,
            renderCell: ({row}: GridValueGetterParams | GridRenderCellParams) => {
                return (
                    <Select
                    value={ row.staOrd }
                    label="Estado"
                    onChange={ ({ target }) => onActivoUpdated( row.id, target.value ) }
                    sx={{ width: '300px' }}
                    >

                        {stateOrdss!.map((estado) => (
                          <MenuItem key={estado.name} value={estado.name}>
                            {estado.name}
                          </MenuItem>
                        ))}
                    </Select>
                )
            }
        },



    {
        field: 'isPaid',
        headerName: 'Pagada',
        width: 110,
        renderCell: ({ row }: GridValueGetterParams | GridRenderCellParams ) => {
            return row.isPaid
                ? ( <Chip variant='outlined' label="Pagada" color="success"  /> )
                : ( <Chip variant='outlined' label="Pendiente" color="error" /> )
        }
    },
    {
        field: 'invNum',
        headerName: 'Facturado',
      width: 160,
        renderCell: ({ row }: GridValueGetterParams | GridRenderCellParams ) => {
            return row.invNum
                ? ( <Chip 
                  variant='outlined'
                  color="success"
                  label={` ${row.codConNum}- ${row.invNum.toString().padStart(8, "0")}`}
                  /> )
                : ( <Chip variant='outlined' label="Comp.Pendiente" color="error" /> )
        }
    },

    { field: 'invNumAux',
    headerName: 'Nro Comprobante',
    width: 100,
    align: 'right',
    headerAlign: 'center',
    },
    { field: 'invDat', headerName: 'Fec Comprobante', width: 100, headerAlign: 'center' },

    
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
    
                // <a href={ `/admin/orders/order/${ row.id }` } target="_
                // blank" rel="noreferrer" >
                //     Ver orden
                // </a>
                // )
        }
    },
    { field: 'createdAt', headerName: 'Creada en', width: 300 },

];




    const onActivoUpdated = async( Id: string, newisActive: string ) => {
        const previosorders = orders!.map( ord => ({ ...ord }));
        const updatedorders = orders!.map( ord => ({
            ...ord,
            staOrd: Id === ord._id ? newisActive : ord.staOrd
        }));

        setOrders(updatedorders);

        try {
            
            await stutzApi.put(`/api/invoices/${Id}/applychasta`,
              //  {  Id, isActive: newisActive });
        {
          staOrd: newisActive
        }),
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }



        } catch (error) {
            setOrders( previosorders );
            console.log(error);
            alert('No se pudo actualizar el estado de la Orden');
        }

    }




  return (
    <AdminLayoutMenuList 
        title={'Ordenes'} 
        subTitle={'Mantenimiento de ordenes'}
        icon={ <ConfirmationNumberOutlined /> }
    >
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

