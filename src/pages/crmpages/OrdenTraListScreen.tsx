
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { MenuItem, Link as MuiLink, Select } from '@mui/material';

import { ConfirmationNumberOutlined } from '@mui/icons-material'
import { Button, Chip, Grid, Box } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

import { AdminLayoutMenuListSer } from '../../components/layouts'
import { IOrder, ICustomer, IInstrumento, IMaquina, IEncargado, IParte, IConfiguracion, IUser, IEstadoOrden } from '../../interfaces';
import { stutzApi } from '../../../api';
import { AuthContext } from '../../../context';
import { FullScreenLoading } from '../../components/ui';
import { BiFileFind } from 'react-icons/bi';




export const OrdenTraListScreen = () => {

    // const [ orders, setOrders ] = useState<IOrder[]>([]);
    const [stateOrdss, setStateOrdss] = useState<IEstadoOrden[]>();

  
    ////////////////////FGFGFGFG
    const { user, isLoading } = useContext(AuthContext);
    const navigate = useNavigate()

    useEffect(() => {
        if (!user && !isLoading) {
        navigate('/auth/loginadm?redirect=/admin/ordenestrabajo');
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
  const codMaq = userInfo.filtro.codMaq;
  const codEnc = userInfo.filtro.codEnc;
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



 useEffect(() => {
    const fetchData = async () => {
      try {
          setIsloading(true);
          const resp = await stutzApi.get(`/api/entradas/searchremSEsc?order=${order}&fech1=${fech1}&fech2=${fech2}&configuracion=${codCon}&usuario=${codUse}&customer=${codCus}&instru=${codIns}&parte=${codPar}&maquina=${codMaq}&encargado=${codEnc}&producto=${codPro}&estado=${estado}&registro=${registro}&obser=${obser}`);
          setIsloading(false);
          setInvoices(resp.data.entradas);

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



    const onActivoUpdated = async( Id: string, newisActive: string ) => {
        const previosorders = invoices!.map( ord => ({ ...ord }));
        const updatedorders = invoices!.map( ord => ({
            ...ord,
            staOrd: Id === ord._id ? newisActive : ord.staOrd
        }));

        setInvoices(updatedorders);

        try {
            
            await stutzApi.put(`/api/entradas/${Id}/applychasta`,
              //  {  Id, isActive: newisActive });
        {
          staOrd: newisActive
        }),
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }



        } catch (error) {
            setInvoices( previosorders );
            console.log(error);
            alert('No se pudo actualizar el estado de la Orden');
        }

    }

// 👉 Calculás el total
const totalGeneral = invoices.reduce((acc, inv) => acc + inv.total, 0);


const columns:GridColDef[] = [
    { field: 'remNum',
      headerName: 'Orden Nro',
        width: 100,
        renderCell: ({ row }: GridValueGetterParams | GridRenderCellParams ) => {
            return (
                    <MuiLink component={RouterLink}  to={`/admin/ordentrabajo/${row.id}?redirect=/admin/ordenestrabajo`}
                    color= "secondary"
                    underline='always'>
                         { row.remNum}
                    </MuiLink>
                )
        }


    },
    { field: 'remDat', headerName: 'Fecha', width: 100 },
    { field: 'dueDat', headerName: 'Vence', width: 100 },
    {
        field: 'terminado',
        headerName: 'Terminada',
        width: 120,
        renderCell: ({ row }: GridValueGetterParams | GridRenderCellParams ) => {
            return row.terminado
                ? (
                    <MuiLink component={RouterLink}  to={`/admin/ordentrabajo/${row.id}?redirect=/admin/ordenestrabajo`}
                     underline='always'>
                    <Chip variant='outlined' label="Terminada" color="success" /> 
                    </MuiLink>
                  )
                : (
                    <MuiLink component={RouterLink}  to={`/admin/ordentrabajo/${row.id}?redirect=/admin/ordenestrabajo`}
                     underline='always'>
                     <Chip variant='outlined' label="Pendiente" color="error" /> 
                    </MuiLink>
                    )
        }
    },
    { field: 'nameCus', headerName: 'Cliente', width: 200 },
    { field: 'nameIns', headerName: 'Trabajo', width: 200 },
    { field: 'nameMaq', headerName: 'Maquina', width: 200 },
    { field: 'nameEnc', headerName: 'Encargado', width: 200 },
        {
            field: 'publico',
            headerName: 'TRABAJO',
            width: 120,
            renderCell: ({ row }: GridValueGetterParams | GridRenderCellParams ) => {
                return row.publico
                    ? (
                        <>PUBLICO</>
                    )
                    : (
                        <>PRIVADO</>
                        )
            }
        },
    { field: 'namePar', headerName: 'Parte', width: 200 },
    { field: 'nameCon', headerName: 'Punto Venta', width: 200 },
    { field: 'notes', headerName: 'Observaciones', width: 200 },
    // { field: 'libNum', headerName: 'Libro', width: 100 },
    // { field: 'folNum', headerName: 'Folio', width: 100 },
    // { field: 'asiNum', headerName: 'asiento', width: 100 },
    // { field: 'asiDat', headerName: 'Fecha Asiento', width: 120 },
    // { field: 'escNum', headerName: 'Nro Instrum.', width: 100 },
    // { field: 'asieNum', headerName: 'Asiento ', width: 100 },
    // { field: 'asieDat', headerName: 'Fecha Publico', width: 120 },
    // { field: 'total', headerName: 'Monto total', width: 100 },
    { field: 'total',
      headerName: 'Monto total',
      width: 100,
      align: 'right',
      headerAlign: 'center',
    },
    { field: 'nameUse', headerName: 'Usuario', width: 200 },

    { field: 'invNum',
    headerName: 'Nro Comprobante',
    width: 100,
    align: 'right',
    headerAlign: 'center',
    },
    { field: 'invDat', headerName: 'Fec Comprobante', width: 100, headerAlign: 'center' },

        {
            field: 'staOrd', 
            headerName: 'Estado', 
            align: 'right',
            width: 240,
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
      field: 'check2',
      headerName: 'Actualiza',
      renderCell: ({ row }: GridValueGetterParams | GridRenderCellParams ) => {
        return (
                    // <MuiLink component={RouterLink} color="success" to={`/admin/mesaentradaAct/${row.id}?redirect=/admin/entradas`}>
                    <MuiLink component={RouterLink} color="success" to={`/admin/ordentrabajoAct/${row.id}?redirect=/admin/ordenestrabajo`}>
                    { "Actualiza"}
                    </MuiLink>
                )
              }
            },
            // {
            //   field: 'check3',
            //   headerName: 'Valoriza',
            //   renderCell: ({ row }: GridValueGetterParams | GridRenderCellParams ) => {
            //     return (
            //       // <MuiLink to={`/admin/invoices/invoice/${ row.id }`}>
            //       <MuiLink component={RouterLink} color="success" to={`/admin/mesaentradaVal/${row.id}?redirect=/admin/entradas`}>
            //         { "Valoriza"}
            //         </MuiLink>
            //     )
            //   }
            // },
            {
              field: 'check',
              headerName: 'Acción',
              renderCell: ({ row }: GridValueGetterParams | GridRenderCellParams ) => {
                if ((user?.role !== 'admin') && (user?._id !== row.userInv)) return null;
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
        await stutzApi.delete(`/api/entradas/${id}/deleteremitEsc`);
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
        // libNum : invoice.libNum,
        // folNum : invoice.folNum,
        // asiNum : invoice.asiNum,
        // // asiDat : invoice.asiDat!.substring(0, 10),
        // asiDat: invoice.asiDat ? formatDateNoTZ(invoice.asiDat) : '',

        // escNum : invoice.escNum,
        // asieNum : invoice.asieNum,
        // // asieDat : invoice.asieDat!.substring(0, 10),
        // asieDat: invoice.asieDat ? formatDateNoTZ(invoice.asieDat) : '',

        invNum    : invoice.invNum,
        invDat: invoice.invDat ? formatDateNoTZ(invoice.invDat) : '',
        staOrd: invoice.staOrd,

        terminado : invoice.terminado,
        remNum    : invoice.remNum,
        remDat: invoice.remDat ? formatDateNoTZ(invoice.remDat) : '',
        dueDat: invoice.dueDat ? formatDateNoTZ(invoice.dueDat) : '',
        notes: invoice.notes,
        nameCus  : (invoice.id_client as ICustomer).nameCus,
        nameUse  : (invoice.user as IUser).name,
        userInv: (invoice.user as IUser)._id,
        nameIns  : (invoice.id_instru as IInstrumento).name,
        publico  : (invoice.id_instru as IInstrumento).publico,
        namePar  : (invoice.id_parte as IParte)?.name ?? '',
        nameMaq  : (invoice.id_maquin as IMaquina)?.name ?? '',
        nameEnc  : (invoice.id_encar as IEncargado)?.name ?? '',
        nameCon  : (invoice.id_config as IConfiguracion)?.name ?? '',
        // total : invoice.total,
        total : invoice.total.toFixed(2),
        isPaid: invoice.isPaid,
        noProducts: invoice.numberOfItems,
        createdAt: invoice.createdAt!.substring(0, 10),
        updatedAt: invoice.updatedAt!.substring(0, 10),
    }));



  const parametros = async () => {
    navigate('/admin/filtroser?redirect=/admin/ordenestrabajo');
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
      // libNum: invoice.libNum,
      // folNum: invoice.folNum,
      // asiNum: invoice.asiNum,
      // asiDat: invoice.asiDat ? formatDateNoTZ(invoice.asiDat) : '',
      // escNum: invoice.escNum,
      // asieNum: invoice.asieNum,
      // asieDat: invoice.asieDat ? formatDateNoTZ(invoice.asieDat) : '',
      notes: invoice.notes,
      terminado: invoice.terminado,
      remNum: invoice.remNum,
      remDat: invoice.remDat ? formatDateNoTZ(invoice.remDat) : '',
      dueDat: invoice.dueDat ? formatDateNoTZ(invoice.dueDat) : '',

      invNum: invoice.invNum,
      invDat: invoice.invDat ? formatDateNoTZ(invoice.invDat) : '',

        nameCus  : (invoice.id_client as ICustomer).nameCus,
        nameUse  : (invoice.user as IUser).name,
        nameIns  : (invoice.id_instru as IInstrumento).name,
        namePar  : (invoice.id_parte as IParte)?.name ?? '',
        nameMaq  : (invoice.id_maquin as IMaquina)?.name ?? '',
        nameEnc  : (invoice.id_encar as IEncargado)?.name ?? '',
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
       row.nameMaq,
       row.nameEnc,
       row.nameCon,
       row.remDat,
       row.dueDat,

       row.invNum,
       row.invDat,

       row.terminado,
       row.notes,
      //  row.libNum,
      //  row.folNum,
      //  row.asiNum,
      //  row.asiDat,
      //  row.escNum,
      //  row.asieNum,
      //  row.asieDat,
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
      'Maquina',
      'Encargado',
      'Configuración',
      'Fecha Orden',
      'Fecha Vence',

      'Nro Comprobante',
      'Fecha Comprobante',

      'Terminado',
      'Observaciones',
      // 'Libro',
      // 'Folio',
      // 'Asiento N°',
      // 'Fecha Asiento',
      // 'Inst.Publico N°',
      // 'Asiento Publico N°',
      // 'Fecha Asiento Publico',
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
        `Maquina.:`,
        `${userInfo.filtro.nameMaq}`,
        `Encargado.:`,
        `${userInfo.filtro.nameEnc}`,
        `Trabajo.:`,
        `${userInfo.filtro.nameIns}`,
        `P.Venta.:`,
        `${userInfo.filtro.nameCon}`,
        `Usuario.:`,
        `${userInfo.filtro.nameUse}`,
        `Tarea.:`,
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
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Ordenes de Trabajo');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'OrdenesTrabajo.xlsx');
  };


    if ( !invoices ) return (<></>);
    
  return (
    <AdminLayoutMenuListSer
        title={'Ordenes de Trabajo'} 
        subTitle={'Actualizando Ordenes de Trabajo'}
        icon={ <ConfirmationNumberOutlined /> }
    >

          <Box mt={2} display="flex" gap={2} flexWrap="wrap">
            <Button
              onClick={parametros}
              variant="contained"
              startIcon={<BiFileFind />}
              sx={{  bgcolor: 'secondary.main' , color: 'white' }}
            >
              Filtro
            </Button>
            {/* <Button variant="outlined" color="success" onClick={() => exportToExcel(rows)}>EXCEL</Button> */}
        <Button variant="outlined" color="success" onClick={exportToExcel}>
          Excel
        </Button>
          <Grid item xs={12}>
            <Box mt={2} textAlign="right" fontWeight="bold">
              a Cobrar: {totalGeneral.toFixed(2)}
            </Box>
          </Grid>
            </Box>
        {
          isloading
            ? <FullScreenLoading />
            : 

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

        }

        
    </AdminLayoutMenuListSer>
  )
}

