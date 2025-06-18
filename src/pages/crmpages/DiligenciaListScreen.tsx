
import { useContext, useEffect, useState } from 'react';
import { ConfirmationNumberOutlined } from '@mui/icons-material'
import { Chip, Grid, Link } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid';

import { AdminLayoutMenuList } from '../../components/layouts'
import { ICustomer, IInstrumento, IOrderItem } from '../../interfaces';
import { stutzApi } from '../../../api';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context';
import { FullScreenLoading } from '../../components/ui';

type ISize = 'XS'|'S'|'M'|'L'|'XL'|'XXL'|'XXXL';
interface IOrderItemUnwind {
    _id      : string;
    title    : string;
    size     : ISize;
    quantity : number;
    slug     : string;
    image    : string;
    price    : number;
    porIva   : number;
    medPro   : string;
    gender   : string;
    venDat?: string;
    observ?: string;
    terminado?: boolean;

}


interface IOrderUnwiund {

    _id? : string;
    id_client?: ICustomer | string;
    id_instru?: IInstrumento | string;
    orderItems: IOrderItemUnwind;
    paymentResult?: string;

    numberOfItems: number;
    subTotal     : number;
    tax          : number;
    total        : number;
    totalBuy     : number;
    shippingPrice: number;
    codConNum    : number;
    remNum?       : number;
    remDat?       : string;
    dueDat?       : string;
    invNum?       : number;
    invDat?       : string;
    recNum?       : number;
    recDat?       : string;
    desVal?       : string;
    notes?       : string;
    paymentMethod: number;
    instruName? : string;
    customName? : string;
    libNum? : number;
    folNum? : number;
    asiNum? : number;
    asiDat? : string;
    escNum? : number;
    asieNum? : number;
    asieDat? : string;
    terminado? : boolean;
    isPaid? : boolean;
    paidAt? : string;
    transactionId?: string;
    createdAt?: string;
    updatedAt?: string;
}


const columns:GridColDef[] = [
    { field: 'remNum',
      headerName: 'Entrada',
        width: 100,
        renderCell: ({ row }: GridValueGetterParams | GridRenderCellParams ) => {
            return (
                    <NavLink to={`/admin/entrada/${row.punteid}?redirect=/admin/entradas`}>
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
        headerName: 'Entrada',
        width: 120,
        renderCell: ({ row }: GridValueGetterParams | GridRenderCellParams ) => {
            return row.terminado
                ? (
                    <NavLink to={`/admin/entrada/${row.punteid}?redirect=/admin/entradas`}>
                     <Link underline='always'>
                    <Chip variant='outlined' label="Terminada" color="success" /> 
                     </Link>
                    </NavLink>
                  )
                : (
                    <NavLink to={`/admin/entrada/${row.punteid}?redirect=/admin/entradas`}>
                     <Link underline='always'>
                     <Chip variant='outlined' label="Pendiente" color="error" /> 
                     </Link>
                    </NavLink>
                    )
        }
    },
    {
        field: 'dilterminado',
        headerName: 'Diligencia',
        width: 120,
        renderCell: ({ row }: GridValueGetterParams | GridRenderCellParams ) => {
            return row.dilterminado
                ? (
                    <NavLink to={`/admin/entrada/${row.punteid}?redirect=/admin/entradas`}>
                     <Link underline='always'>
                    <Chip variant='outlined' label="Terminada" color="success" /> 
                     </Link>
                    </NavLink>
                  )
                : (
                    <NavLink to={`/admin/entrada/${row.punteid}?redirect=/admin/entradas`}>
                     <Link underline='always'>
                     <Chip variant='outlined' label="Pendiente" color="error" /> 
                     </Link>
                    </NavLink>
                    )
        }
    },
    { field: 'customName', headerName: 'Cliente', width: 200 },
    { field: 'instruName', headerName: 'Instrumento', width: 200 },
    { field: 'namePro', headerName: 'Diligencia', width: 200 },
    { field: 'libNum', headerName: 'Libro', width: 100 },
    { field: 'folNum', headerName: 'Folio', width: 100 },
    { field: 'asiNum', headerName: 'asiento', width: 100 },
    { field: 'asiDat', headerName: 'Fecha Asiento', width: 100 },
    { field: 'escNum', headerName: 'Nro Instrum.', width: 100 },
    { field: 'asieNum', headerName: 'Asiento ', width: 100 },
    { field: 'asieDat', headerName: 'Fecha Publico', width: 100 },
    { field: 'total', headerName: 'Monto total', width: 100 },
    {
        field: 'check2',
        headerName: 'Actualiza',
        renderCell: ({ row }: GridValueGetterParams | GridRenderCellParams ) => {
            return (
                    <NavLink to={`/admin/mesaentradaAct/${row.punteid}?redirect=/admin/entradas`}>
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
                    <NavLink to={`/admin/mesaentradaVal/${row.punteid}?redirect=/admin/entradas`}>
                    { "Valoriza"}
                    </NavLink>
                )
        }
    },
    { field: 'createdAt', headerName: 'Creada en', width: 100 },
    { field: 'updatedAt', headerName: 'Modificada en', width: 100 },

];




export const DiligenciaListScreen = () => {

    ////////////////////FGFGFGFG
    const { user, isLoading } = useContext(AuthContext);
    const navigate = useNavigate()

    useEffect(() => {
        if (!user && !isLoading) {
        navigate('/auth/login?redirect=/admin/diligencias');
        }
    }, [user, isLoading, navigate]);
    ////////////////////FGFGFGFG



    
    const [ invoices, setInvoices ] = useState<IOrderUnwiund[]>([]);
    const [ isloading, setIsloading ] = useState(false);



    // const { data, error } = useSWR<IOrder[]>('/api/admin/invoices');

    const loadData = async() => {
        try {
          setIsloading(true);
        //   const { data } = await axios.get(`${API}/api/invoices/searchinvS?page=${page}&invoice=${invoice}&fech1=${fech1}&fech2=${fech2}&configuracion=${codCon}&usuario=${codUse}&customer=${codCus}&comprobante=${codCom}`,{
        //     headers: { Authorization: `Bearer ${userInfo.token}` },
        // });
          const resp = await stutzApi.get('/api/invoices/diligencias');
          setInvoices(resp.data.invoices);
          setIsloading(false);
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

    

    const rows = invoices!.map( invoice => ({
        id    : (invoice.orderItems._id+invoice._id),
        punteid : invoice._id,
        instruName : invoice.instruName,
        customName : invoice.customName,
        libNum : invoice.libNum,
        folNum : invoice.folNum,
        asiNum : invoice.asiNum,
        // asiDat : invoice.asiDat!.substring(0, 10),
        asiDat: invoice.asiDat ? formatDateNoTZ(invoice.asiDat) : '',
        escNum : invoice.escNum,
        asieNum : invoice.asieNum,
        // asieDat : invoice.asieDat!.substring(0, 10),
        asieDat: invoice.asieDat ? formatDateNoTZ(invoice.asieDat) : '',

        terminado : invoice.terminado,
        remNum    : invoice.remNum,
        remDat: invoice.remDat ? formatDateNoTZ(invoice.remDat) : '',
        nameCus  : (invoice.id_client as ICustomer).nameCus,
        nameIns  : (invoice.id_instru as IInstrumento).name,
        namePro  : invoice.orderItems.title,
        dilterminado  : invoice.orderItems.terminado,
        // namePro  : invoice.orderItems.title as any,
        total : invoice.total,
        isPaid: invoice.isPaid,
        noProducts: invoice.numberOfItems,
        createdAt: invoice.createdAt!.substring(0, 10),
        updatedAt: invoice.updatedAt!.substring(0, 10),
    }));

    if ( !invoices ) return (<></>);

  return (
    <AdminLayoutMenuList
        title={'Diligencias'} 
        subTitle={'Actualizando Diligencias'}
        icon={ <ConfirmationNumberOutlined /> }
    >
        {
          isloading
            ? <FullScreenLoading />
            : 
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
        }
        
    </AdminLayoutMenuList>
  )
}

