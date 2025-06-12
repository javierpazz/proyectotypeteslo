
import { useContext, useEffect, useState } from 'react';
import { ConfirmationNumberOutlined } from '@mui/icons-material'
import { Chip, Grid, Link } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid';

import { AdminLayoutMenuList } from '../../components/layouts'
import { IOrder, ICustomer, IInstrumento } from '../../interfaces';
import { stutzApi } from '../../../api';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context';

const columns:GridColDef[] = [
    { field: 'remNum',
      headerName: 'Entrada',
        width: 100,
        renderCell: ({ row }: GridValueGetterParams | GridRenderCellParams ) => {
            return (
                    <NavLink to={`/admin/entrada/${row.id}?redirect=/admin/entradas`}>
                     <Link underline='always'>
                         { row.remNum}
                     </Link>
                    </NavLink>
                )
        }


    },
    { field: 'remDat', headerName: 'Fecha', width: 100 },
    {
        field: 'terminado',
        headerName: 'Terminada',
        width: 120,
        renderCell: ({ row }: GridValueGetterParams | GridRenderCellParams ) => {
            return row.terminado
                ? (
                    <NavLink to={`/admin/entrada/${row.id}?redirect=/admin/entradas`}>
                     <Link underline='always'>
                    <Chip variant='outlined' label="Terminada" color="success" /> 
                     </Link>
                    </NavLink>
                  )
                : (
                    <NavLink to={`/admin/entrada/${row.id}?redirect=/admin/entradas`}>
                     <Link underline='always'>
                     <Chip variant='outlined' label="Pendiente" color="error" /> 
                     </Link>
                    </NavLink>
                    )
        }
    },
    { field: 'nameCus', headerName: 'Cliente', width: 200 },
    { field: 'nameIns', headerName: 'Instrumento', width: 200 },
    { field: 'libNum', headerName: 'Libro', width: 100 },
    { field: 'folNum', headerName: 'Folio', width: 100 },
    { field: 'asiNum', headerName: 'asiento', width: 100 },
    { field: 'asiDat', headerName: 'Fecha Asiento', width: 100 },
    { field: 'escNum', headerName: 'Nro Publico', width: 100 },
    { field: 'asieNum', headerName: 'Asiento ', width: 100 },
    { field: 'asieDat', headerName: 'Fecha Publico', width: 100 },
    { field: 'total', headerName: 'Monto total', width: 100 },
    {
        field: 'check2',
        headerName: 'Actualiza',
        renderCell: ({ row }: GridValueGetterParams | GridRenderCellParams ) => {
            return (
                    <NavLink to={`/admin/mesaentradaAct/${row.id}?redirect=/admin/entradas`}>
                    { "Actualiza"}
                    </NavLink>
                )
        }
    },
    {
        field: 'check3',
        headerName: 'Valoriza',
        renderCell: ({ row }: GridValueGetterParams | GridRenderCellParams ) => {
            return (
                    // <NavLink to={`/admin/invoices/invoice/${ row.id }`}>
                    <NavLink to={`/admin/mesaentradaVal/${row.id}?redirect=/admin/entradas`}>
                    { "Valoriza"}
                    </NavLink>
                )
        }
    },
    { field: 'createdAt', headerName: 'Creada en', width: 100 },
    { field: 'updatedAt', headerName: 'Modificada en', width: 100 },

];




export const EntradaListScreen = () => {

    const [ invoices, setInvoices ] = useState<IOrder[]>([]);

////////////////////FGFGFGFG
const navigate = useNavigate()
const { user} = useContext(  AuthContext );      
useEffect(() => {
    if (!user) {
      navigate('/auth/login?redirect=/admin/entradas');
    }
  }, [user, navigate]);

////////////////////FGFGFGFG




    // const { data, error } = useSWR<IOrder[]>('/api/admin/invoices');

    const loadData = async() => {
        try {
        //   const { data } = await axios.get(`${API}/api/invoices/searchinvS?page=${page}&invoice=${invoice}&fech1=${fech1}&fech2=${fech2}&configuracion=${codCon}&usuario=${codUse}&customer=${codCus}&comprobante=${codCom}`,{
        //     headers: { Authorization: `Bearer ${userInfo.token}` },
        // });
          const resp = await stutzApi.get('/api/invoices/searchremSEsc');
          setInvoices(resp.data.invoices);
          console.log(resp.data.invoices);
        } catch (error) {
          console.log({error})
        }
    
      }

    useEffect(() => {
        loadData();
    }, [])



    if ( !invoices ) return (<></>);
    
    const rows = invoices!.map( invoice => ({
        id    : invoice._id,
        libNum : invoice.libNum,
        folNum : invoice.folNum,
        asiNum : invoice.asiNum,
        // asiDat : invoice.asiDat!.substring(0, 10),
        escNum : invoice.escNum,
        asieNum : invoice.asieNum,
        // asieDat : invoice.asieDat!.substring(0, 10),
        terminado : invoice.terminado,
        remNum    : invoice.remNum,
        remDat    : invoice.remDat!.substring(0, 10),
        nameCus  : (invoice.id_client as ICustomer).nameCus,
        nameIns  : (invoice.id_instru as IInstrumento).name,
        total : invoice.total,
        isPaid: invoice.isPaid,
        noProducts: invoice.numberOfItems,
        createdAt: invoice.createdAt!.substring(0, 10),
        updatedAt: invoice.updatedAt!.substring(0, 10),
    }));


  return (
    <AdminLayoutMenuList
        title={'Entradas'} 
        subTitle={'Actualizando Entradas'}
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
        
    </AdminLayoutMenuList>
  )
}

