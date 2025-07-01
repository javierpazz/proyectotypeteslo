
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
import { IOrder, ICustomer, IInstrumento, IParte, IConfiguracion, IUser } from '../../interfaces';
import { stutzApi } from '../../../api';
import { AuthContext } from '../../../context';
import { FullScreenLoading } from '../../components/ui';
import { BiFileFind } from 'react-icons/bi';




export const EntradaListScreen = () => {

    const [ userRole, setUserRole ] = useState("");
    
    ////////////////////FGFGFGFG
    const { user, isLoading } = useContext(AuthContext);
    const navigate = useNavigate()

    useEffect(() => {
        if (!user && !isLoading) {
        navigate('/auth/loginadm?redirect=/admin/entradas');
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
      
    
    const [ invoices, setInvoices ] = useState<IOrder[]>([]);
    const [ isloading, setIsloading ] = useState(false);

 useEffect(() => {
    const fetchData = async () => {
      try {
          setIsloading(true);
          const resp = await stutzApi.get(`/api/invoices/searchremSEsc?order=${order}&fech1=${fech1}&fech2=${fech2}&configuracion=${codCon}&usuario=${codUse}&customer=${codCus}&instru=${codIns}&parte=${codPar}&product=${codPro}&estado=${estado}&registro=${registro}&obser=${obser}`);
          setIsloading(false);
          setInvoices(resp.data.invoices);
          setUserRole(user!.role);

    } catch (err) {
      }
    };
      fetchData();
  }, [ ]);



      
    // useEffect(() => {
    //     loadData();
    // }, [])



    // const { data, error } = useSWR<IOrder[]>('/api/admin/invoices');

    // const loadData = async() => {
    //     try {
    //       setIsloading(true);
    //       const resp = await stutzApi.get('/api/invoices/searchremSEsc');
    //       setIsloading(false);
    //       setInvoices(resp.data.invoices);
    //     } catch (error) {
    //       console.log({error})
    //     }
    
    //   }



const columns:GridColDef[] = [
    { field: 'remNum',
      headerName: 'Entrada',
        width: 100,
        renderCell: ({ row }: GridValueGetterParams | GridRenderCellParams ) => {
            return (
                    <MuiLink component={RouterLink}  to={`/admin/entrada/${row.id}?redirect=/admin/entradas`}
                     underline='always'>
                         { row.remNum}
                    </MuiLink>
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
                    <MuiLink component={RouterLink} to={`/admin/entrada/${row.id}?redirect=/admin/entradas`}
                     underline='always'>
                    <Chip variant='outlined' label="Terminada" color="success" /> 
                    </MuiLink>
                  )
                : (
                    <MuiLink component={RouterLink}  to={`/admin/entrada/${row.id}?redirect=/admin/entradas`}
                     underline='always'>
                     <Chip variant='outlined' label="Pendiente" color="error" /> 
                    </MuiLink>
                    )
        }
    },
    { field: 'nameCus', headerName: 'Cliente', width: 200 },
    { field: 'nameIns', headerName: 'Instrumento', width: 200 },
    { field: 'namePar', headerName: 'Parte', width: 200 },
    { field: 'nameCon', headerName: 'Registro', width: 200 },
    { field: 'notes', headerName: 'Observaciones', width: 200 },
    { field: 'libNum', headerName: 'Libro', width: 100 },
    { field: 'folNum', headerName: 'Folio', width: 100 },
    { field: 'asiNum', headerName: 'asiento', width: 100 },
    { field: 'asiDat', headerName: 'Fecha Asiento', width: 120 },
    { field: 'escNum', headerName: 'Nro Instrum.', width: 100 },
    { field: 'asieNum', headerName: 'Asiento ', width: 100 },
    { field: 'asieDat', headerName: 'Fecha Publico', width: 120 },
    { field: 'total', headerName: 'Monto total', width: 100 },
    { field: 'nameUse', headerName: 'Usuario', width: 200 },
    {
      field: 'check2',
      headerName: 'Actualiza',
      renderCell: ({ row }: GridValueGetterParams | GridRenderCellParams ) => {
        return (
          <MuiLink component={RouterLink}  to={`/admin/mesaentradaAct/${row.id}?redirect=/admin/entradas`}>
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
                  // <MuiLink to={`/admin/invoices/invoice/${ row.id }`}>
                  <MuiLink component={RouterLink}  to={`/admin/mesaentradaVal/${row.id}?redirect=/admin/entradas`}>
                    { "Valoriza"}
                    </MuiLink>
                )
              }
            },
            {
              field: 'check',
              headerName: 'Acción',
              renderCell: ({ row }: GridValueGetterParams | GridRenderCellParams ) => {
                if (userRole !== 'admin') return null;
                return (
                  <Chip variant='outlined' label="Eliminar" color="error"
                  onClick={() => deleteHandler(row.id)}
                  />
                )
                
              }
            },
            
    { field: 'createdAt', headerName: 'Creada en', width: 100 },
    { field: 'updatedAt', headerName: 'Modificada en', width: 100 },

];


    const deleteHandler = async (id : string) => {
    if (window.confirm('Esta Seguro de Eliminar?')) {
      try {
        // await stutzApi.delete(`/api/tes/admin/partes/${id}`);
        await stutzApi.delete(`/api/invoices/${id}/deleteremitEsc`);
        window.location.reload();
    } catch (err) {
      }
    }
  };




    function formatDateNoTZ(dateString: string) {
    const datePart = dateString.split('T')[0];
    const [year, month, day] = datePart.split('-').map(Number);
    return `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`;
    }
    
    const rows = invoices!.map( invoice => ({
        id    : invoice._id,
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
        notes: invoice.notes,
        nameCus  : (invoice.id_client as ICustomer).nameCus,
        nameUse  : (invoice.user as IUser).name,
        nameIns  : (invoice.id_instru as IInstrumento).name,
        namePar  : (invoice.id_parte as IParte)?.name ?? '',
        nameCon  : (invoice.id_config as IConfiguracion)?.name ?? '',
        total : invoice.total,
        isPaid: invoice.isPaid,
        noProducts: invoice.numberOfItems,
        createdAt: invoice.createdAt!.substring(0, 10),
        updatedAt: invoice.updatedAt!.substring(0, 10),
    }));



  const parametros = async () => {
    navigate('/admin/filtro?redirect=/admin/entradas');
  };


// const exportToExcel = (data: any[], fileName = 'invoices.xlsx') => {
//   // 1. Convertimos el array de objetos a una hoja de Excel
//   const worksheet = XLSX.utils.json_to_sheet(data);

//   // 2. Creamos un workbook con esa hoja
//   const workbook = XLSX.utils.book_new();
//   XLSX.utils.book_append_sheet(workbook, worksheet, 'Invoices');

//   // 3. Escribimos el archivo en formato Excel (xlsx)
//   const excelBuffer = XLSX.write(workbook, {
//     bookType: 'xlsx',
//     type: 'array',
//   });

//   // 4. Lo guardamos como archivo
//   const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
//   saveAs(blob, fileName);
// };



    const exportToExcel = () => {
    const rows = invoices.map(invoice => ({
      id: invoice._id,
      punteid: invoice._id,
      libNum: invoice.libNum,
      folNum: invoice.folNum,
      asiNum: invoice.asiNum,
      asiDat: invoice.asiDat ? formatDateNoTZ(invoice.asiDat) : '',
      escNum: invoice.escNum,
      asieNum: invoice.asieNum,
      asieDat: invoice.asieDat ? formatDateNoTZ(invoice.asieDat) : '',
      notes: invoice.notes,
      terminado: invoice.terminado,
      remNum: invoice.remNum,
      remDat: invoice.remDat ? formatDateNoTZ(invoice.remDat) : '',
        nameCus  : (invoice.id_client as ICustomer).nameCus,
        nameUse  : (invoice.user as IUser).name,
        nameIns  : (invoice.id_instru as IInstrumento).name,
        namePar  : (invoice.id_parte as IParte)?.name ?? '',
        nameCon  : (invoice.id_config as IConfiguracion)?.name ?? '',
      total: invoice.total,
      isPaid: invoice.isPaid,
      noProducts: invoice.numberOfItems,
      createdAt: invoice.createdAt?.substring(0, 10),
      updatedAt: invoice.updatedAt?.substring(0, 10),
    }));

    // Opcional: Renombrar columnas para Excel
    const exportData = rows.map(row => ([
      row.remNum,
       row.nameCus,
       row.nameIns,
       row.namePar,
       row.nameCon,
       row.remDat,
       row.terminado,
       row.notes,
       row.libNum,
       row.folNum,
       row.asiNum,
       row.asiDat,
       row.escNum,
       row.asieNum,
       row.asieDat,
       row.total,
       row.nameUse,
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
      'Asiento Publico N°',
      'Fecha Asiento Publico',
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
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Entradas');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'Entradas.xlsx');
  };


    if ( !invoices ) return (<></>);
    
  return (
    <AdminLayoutMenuList
        title={'Entradas'} 
        subTitle={'Actualizando Entradas'}
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

