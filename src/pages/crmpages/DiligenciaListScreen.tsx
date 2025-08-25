
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { Link as MuiLink } from '@mui/material';

import { ConfirmationNumberOutlined } from '@mui/icons-material'
import { Button, Chip, Grid, Box } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { AdminLayoutMenuList } from '../../components/layouts'
import { IConfiguracion, ICustomer, IInstrumento, IParte, IUser } from '../../interfaces';
import { stutzApi } from '../../../api';
import { AuthContext } from '../../../context';
import { FullScreenLoading } from '../../components/ui';
import { BiFileFind } from 'react-icons/bi';

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
    id_parte?: IParte | string;
    id_config?: IConfiguracion | string;
    user?: IUser | string;
    orderItems: IOrderItemUnwind;
    paymentResult?: string;

    numberOfItems: number;
    subTotal     : number;
    tax          : number;
    total        : number;
    valor        : number;
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
    userName? : string;
    parteName? : string;
    configName? : string;
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
                    <MuiLink component={RouterLink}  to={`/admin/entrada/${row.punteid}?redirect=/admin/entradas`}
                     underline='always'>
                         { row.remNum}
                    </MuiLink>
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
                    <MuiLink component={RouterLink}  to={`/admin/entrada/${row.punteid}?redirect=/admin/entradas`}
                     underline='always'>
                    <Chip variant='outlined' label="Terminada" color="success" /> 
                    </MuiLink>
                  )
                : (
                    <MuiLink component={RouterLink}  to={`/admin/entrada/${row.punteid}?redirect=/admin/entradas`}
                     underline='always'>
                     <Chip variant='outlined' label="Pendiente" color="error" /> 
                    </MuiLink>
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
                    <MuiLink component={RouterLink}  to={`/admin/entrada/${row.punteid}?redirect=/admin/entradas`}
                     underline='always'>
                    <Chip variant='outlined' label="Terminada" color="success" /> 
                    </MuiLink>
                  )
                : (
                    <MuiLink component={RouterLink}  to={`/admin/entrada/${row.punteid}?redirect=/admin/entradas`}
                     underline='always'>
                     <Chip variant='outlined' label="Pendiente" color="error" /> 
                    </MuiLink>
                    )
        }
    },
    { field: 'customName', headerName: 'Cliente', width: 200 },
    { field: 'instruName', headerName: 'Instrumento', width: 200 },
    { field: 'parteName', headerName: 'Parte', width: 200 },
    { field: 'configName', headerName: 'Registro', width: 200 },
    { field: 'namePro', headerName: 'Diligencia', width: 200 },
    { field: 'valor', headerName: 'Valor Dil.', width: 200 },
    { field: 'observ', headerName: 'Observaciones', width: 250 },
    { field: 'libNum', headerName: 'Libro', width: 100 },
    { field: 'folNum', headerName: 'Folio', width: 100 },
    { field: 'asiNum', headerName: 'asiento', width: 100 },
    { field: 'asiDat', headerName: 'Fecha Asiento', width: 100 },
    { field: 'escNum', headerName: 'Nro Instrum.', width: 100 },
    { field: 'asieNum', headerName: 'Asiento ', width: 100 },
    { field: 'asieDat', headerName: 'Fecha Publico', width: 100 },
    { field: 'userName', headerName: 'Usuario', width: 200 },
    { field: 'total', headerName: 'Monto total', width: 100 },
    {
        field: 'check2',
        headerName: 'Actualiza',
        renderCell: ({ row }: GridValueGetterParams | GridRenderCellParams ) => {
            return (
                    <MuiLink component={RouterLink}  to={`/admin/mesaentradaAct/${row.punteid}?redirect=/admin/entradas`}>
                    { "Actualiza"}
                    </MuiLink>
                )
        }
    },
    {
        field: 'check3',
        headerName: 'Valoriza',
        renderCell: ({ row }: GridValueGetterParams | GridRenderCellParams ) => {
            return (
                    // <NavLink to={`/admin/invoices/invoice/${ row.id }`}>
                    <MuiLink component={RouterLink}  to={`/admin/mesaentradaVal/${row.punteid}?redirect=/admin/entradas`}>
                    { "Valoriza"}
                    </MuiLink>
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
        navigate('/auth/loginadm?redirect=/admin/diligencias');
        }
        if (user?.role === "client" ) {
        navigate('/');
        }
    }, [user, isLoading, navigate]);
    ////////////////////FGFGFGFG
  const userInfo = typeof window !== 'undefined' && localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo')!)
  : null;
  const fech1 = userInfo.filtro.firstDat;
  const fech2 = userInfo.filtro.lastDat;
  const codCon = userInfo.filtro.codCon;
  // const codCom = userInfo.filtro.codCom;
  const codIns = userInfo.filtro.codIns;
  const codCus = userInfo.filtro.codCus;
  const codPar = userInfo.filtro.codPar;
  // const codSup = userInfo.filtro.codSup;
  const codPro = userInfo.filtro.codPro;
  // const codVal = userInfo.filtro.codVal;
  // const codCon2 = userInfo.filtro.codCon2;
  // const codEnc = userInfo.filtro.codEnc;
  const codUse = userInfo.filtro.codUse;
  const order = userInfo.filtro.order;
  const estado = userInfo.filtro.estado;
  const registro = userInfo.filtro.registro;
  const obser = userInfo.filtro.obser;
        



    
    const [ invoices, setInvoices ] = useState<IOrderUnwiund[]>([]);
    const [ isloading, setIsloading ] = useState(false);



    // const { data, error } = useSWR<IOrder[]>('/api/admin/invoices');

    const loadData = async() => {
        try {
          setIsloading(true);
        //   const { data } = await axios.get(`${API}/api/invoices/searchinvS?page=${page}&invoice=${invoice}&fech1=${fech1}&fech2=${fech2}&configuracion=${codCon}&usuario=${codUse}&customer=${codCus}&comprobante=${codCom}`,{
        //     headers: { Authorization: `Bearer ${userInfo.token}` },
        // });
        //   const resp = await stutzApi.get('/api/invoices/diligencias');
          const resp = await stutzApi.get(`/api/invoices/diligencias?order=${order}&fech1=${fech1}&fech2=${fech2}&configuracion=${codCon}&usuario=${codUse}&customer=${codCus}&instru=${codIns}&parte=${codPar}&product=${codPro}&estado=${estado}&registro=${registro}&obser=${obser}`);
          setInvoices(resp.data.invoices);
          setIsloading(false);
          console.log(resp.data.invoices)
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
        userName : invoice.userName,
        parteName : invoice.parteName,
        configName : invoice.configName,
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
        observ    : invoice.orderItems.observ,
        remDat: invoice.remDat ? formatDateNoTZ(invoice.remDat) : '',
        nameCus  : (invoice.id_client as ICustomer).nameCus,
        nameIns  : (invoice.id_instru as IInstrumento).name,
        // namePar  : (invoice.id_parte as IParte).name,
        // nameCon  : (invoice.id_config as IConfiguracion).name,
        namePro  : invoice.orderItems.title,
        namePar  : (invoice.id_parte as IParte)?.name ?? '',
        nameCon  : (invoice.id_config as IConfiguracion)?.name ?? '',
        dilterminado  : invoice.orderItems.terminado,
        valor  : invoice.orderItems.price*(1+(invoice.orderItems.porIva/100)),
        // namePro  : invoice.orderItems.title as any,
        total : invoice.total,
        isPaid: invoice.isPaid,
        noProducts: invoice.numberOfItems,
        createdAt: invoice.createdAt!.substring(0, 10),
        updatedAt: invoice.updatedAt!.substring(0, 10),
    }));

    const parametros = async () => {
    navigate('/admin/filtro?redirect=/admin/diligencias');
  };

    const exportToExcel = () => {
    const rows = invoices.map(invoice => ({
      id: invoice.orderItems._id + invoice._id,
      punteid: invoice._id,
      instruName: invoice.instruName,
      customName: invoice.customName,
      userName: invoice.userName,
      parteName: invoice.parteName,
      configName: invoice.configName,
      libNum: invoice.libNum,
      folNum: invoice.folNum,
      asiNum: invoice.asiNum,
      asiDat: invoice.asiDat ? formatDateNoTZ(invoice.asiDat) : '',
      escNum: invoice.escNum,
      asieNum: invoice.asieNum,
      asieDat: invoice.asieDat ? formatDateNoTZ(invoice.asieDat) : '',
      terminado: invoice.terminado,
      remNum: invoice.remNum,
      observ: invoice.orderItems.observ,
      remDat: invoice.remDat ? formatDateNoTZ(invoice.remDat) : '',
      // nameCus: invoice.id_client?.nameCus ?? '',
      // nameIns: invoice.id_instru?.name ?? '',
      namePro: invoice.orderItems.title,
      // namePar: invoice.id_parte?.name ?? '',
      // nameCon: invoice.id_config?.name ?? '',
      // dilterminado: invoice.orderItems.terminado,
      dilterminado  : invoice.orderItems.terminado ? "TERMINADO" : "PENDIENTE",
      valor  : invoice.orderItems.price*(1+(invoice.orderItems.porIva/100)),
      total: invoice.total,
      isPaid: invoice.isPaid,
      noProducts: invoice.numberOfItems,
      createdAt: invoice.createdAt?.substring(0, 10),
      updatedAt: invoice.updatedAt?.substring(0, 10),
    }));

    // Opcional: Renombrar columnas para Excel
    const exportData = rows.map(row => ([
       row.remNum,
       row.customName,
       row.instruName,
       row.parteName,
       row.configName,
       row.remDat,
       row.terminado,
       row.observ,
       row.libNum,
       row.folNum,
       row.asiNum,
       row.asiDat,
       row.escNum,
       row.asieNum,
       row.asieDat,
       row.namePro,
       row.dilterminado,
       row.valor,
       row.total,
       row.userName,
       row.id,
       row.punteid,
       row.createdAt,
       row.updatedAt,
    ]));

  const headers = [
      'Entrada N°',
      'Cliente',
      'Instrumento',
      'Parte',
      'Configuración',
      'Fecha Entrada',
      'Terminado',
      'Observaciones',
      'Libro',
      'Folio',
      'Asiento N°',
      'Fecha Asiento',
      'Inst.Publico N°',
      'Asiento Publico  N°',
      'Fecha Asiento Publico',
      'Diligencia',
      'Estado Diligencia',
      'Valor Diligencia',
      'Total',
      'Usuario',
      'ID',
      'Punteo',
      'Creado',
      'Actualizado',
  ];

    const headerInfo = [
      [`desde:`, `${fech1}`,
        `Hasta:`, `${fech2}`,
        `Filtro por  :`,
        `Cliente.:`,
        `${userInfo.filtro.nameCus}`,
        `Parte.:`,
        `${userInfo.filtro.namePar}`,
        `Instrumento.:`,
        `${userInfo.filtro.nameIns}`,
        `Registro.:`,
        `${userInfo.filtro.nameCon}`,
        `Usuario.:`,
        `${userInfo.filtro.nameUse}`,
        `Diligencia.:`,
        `${userInfo.filtro.desPro}`,
        `Terminado.: `,
        `${userInfo.filtro.estado}`,
        `Registrados.:`,
        `${userInfo.filtro.registro}`,
      ],
      [],
      headers
    ];

 const finalData = [...headerInfo, ...exportData];

    const worksheet = XLSX.utils.json_to_sheet(finalData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Diligencias');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'Diligencias.xlsx');
  };

    if ( !invoices ) return (<></>);

  return (
    <AdminLayoutMenuList
        title={'Diligencias'} 
        subTitle={'Actualizando Diligencias'}
        icon={ <ConfirmationNumberOutlined /> }
    >

          <Box mt={2} display="flex" gap={2} flexWrap="wrap">
            <Button
              onClick={parametros}
              variant="contained"
              startIcon={<BiFileFind />}
              sx={{ bgcolor: 'yellow', color: 'black' }}
            >
              Filtro
            </Button>
            {/* <Button variant="outlined" color="success" onClick={() => exportToExcel(rows)}>EXCEL</Button> */}
        <Button variant="outlined" color="success" onClick={exportToExcel}>
          Excel
        </Button>
            </Box>

        {
          isloading
            ? <FullScreenLoading />
            : 
            <Grid container className='fadeIn'>
                <Grid item xs={12} sx={{ height:450, width: '100%' }}>
                    <DataGrid
                    rows={rows}
                    columns={columns}
                     rowHeight={35}
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

