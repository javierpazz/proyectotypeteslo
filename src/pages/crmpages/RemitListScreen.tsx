
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
import { IOrder, ICustomer, IInstrumento, IParte, IConfiguracion, IUser, IComprobante } from '../../interfaces';
import { stutzApi } from '../../../api';
import { AuthContext } from '../../../context';
import { FullScreenLoading } from '../../components/ui';
import { BiFileFind } from 'react-icons/bi';




export const RemitListScreen = () => {

    
    ////////////////////FGFGFGFG
    const { user, isLoading } = useContext(AuthContext);
    const navigate = useNavigate()

    useEffect(() => {
        if (!user && !isLoading) {
        navigate('/auth/loginadm?redirect=/admin/remits');
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
  const codCus = userInfo.filtro.codCus;
  const codUse = userInfo.filtro.codUse;
  const order = userInfo.filtro.order;
      
    
    const [ invoices, setInvoices ] = useState<IOrder[]>([]);
    const [ isloading, setIsloading ] = useState(false);

 useEffect(() => {
    const fetchData = async () => {
      try {
          setIsloading(true);
          const resp = await stutzApi.get(`/api/invoices/searchremS?order=${order}&fech1=${fech1}&fech2=${fech2}&configuracion=${codCon}&usuario=${codUse}&customer=${codCus}`);
          setIsloading(false);
          setInvoices(resp.data.invoices);

    } catch (err) {
      }
    };
      fetchData();
  }, [ ]);

  const noDelInvoice = async () => {
    if (
      window.confirm(
        'Este Remito tiene un Recibo aplicado, debe eliminar el Recibo para Hacerlo'
      )
    ) {
    }
  };


  const deleteHandler = async (row:any) => {
    if (window.confirm('Esta seguro de Borrar?')) {
    if (row.recNum) {
      noDelInvoice();
    } else {
      // if (!invoice.ordYes) {
      if (!row.invNum) {
        //do
        controlStockHandler(row);
        try {
          await stutzApi.delete(`/api/orders/${row.id}`, {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          });
      window.location.reload();
        } catch (err) {
        }

        //do
      }
      else {
              try {
                await stutzApi.put(
                  `/api/invoices/${row.id}/deleteremit`,
                  {
                    remNum: null,
                    // invNum: null,
                  },
                  {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                  }
                );
              } catch (err) {
              }
            
          }
        }
    }
  };
const controlStockHandler = async (row:any) => {
  row.orderItems.map((item:any) => stockHandler({ item }));
};

const stockHandler = async (item:any) => {
try {
  await stutzApi.put(
    `/api/products/upstock/${item.item._id}`,
    {
      quantitys: item.item.quantity,
    },
    {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    }
  );
} catch (err) {
}
};


const columns:GridColDef[] = [
    { field: 'remNum',
        headerName: 'Remito',
        width: 100,
        align: 'right',
        headerAlign: 'center',
        renderCell: ({ row }: GridValueGetterParams | GridRenderCellParams ) => {
            return (
                <MuiLink component={RouterLink}  to={`/admin/invoicerRemCon/${row.id}?redirect=/admin/remits`}
                underline='always'>
                         { row.remNum}
                    </MuiLink>
                )
            }
            
            
        },
    { field: 'remDat', headerName: 'Fecha', width: 100, headerAlign: 'center' },
    { field: 'nameCom', headerName: 'Comprobante', width: 200 },
    { field: 'invNum', headerName: 'Nro Comp', width: 100, align: 'right' },
    { field: 'invDat', headerName: 'Fecha', width: 100, headerAlign: 'center' },
    
    { field: 'nameCus', headerName: 'Cliente', width: 200, headerAlign: 'center' },
    { field: 'total',
      headerName: 'Monto total',
      width: 100,
      align: 'right',
      headerAlign: 'center',
    },
    { field: 'recNum', headerName: 'Recibo', width: 100, align: 'right', headerAlign: 'center' },
    { field: 'recDat', headerName: 'Pagos', width: 100, headerAlign: 'center',
 },
    { field: 'nameCon', headerName: 'Punto Venta', width: 200 },
    { field: 'notes', headerName: 'Observaciones', width: 200 },
    { field: 'nameUse', headerName: 'Usuario', width: 200 },
                {
              field: 'check',
              headerName: 'Acción',
              renderCell: ({ row }: GridValueGetterParams | GridRenderCellParams ) => {
                if (user?.role !== 'admin') return null;
                return (
                  <Chip variant='outlined' label="Eliminar" color="error"
                  onClick={() => deleteHandler(row)}
                  />
                )
                
              }
            },
            
    { field: 'createdAt', headerName: 'Creada en', width: 100 },
    { field: 'updatedAt', headerName: 'Modificada en', width: 100 },

];


// 


    function formatDateNoTZ(dateString: string) {
    const datePart = dateString.split('T')[0];
    const [year, month, day] = datePart.split('-').map(Number);
    return `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`;
    }
    
    const rows = invoices!.map( invoice => ({
                //   <td >{invoice.codCom.nameCom}</td>
                //   <td className="text-end">{invoice.invNum ? invoice.invNum : 'REMITO S/F'}</td>
                //   <td className="text-center">{invoice.invDat ? invoice.invDat.substring(0, 10): ''}</td>
                //   <td className="text-end">{invoice.remNum}</td>
                //       {invoice.ordYes === 'Y' ? <td className="text-end">{invoice._id}</td> : <td></td>}
                //   <td className="text-end">{invoice.recNum}</td>
                //   <td>{invoice.id_client ? invoice.id_client.nameCus : 'CLIENTE BORRADO'}</td>
                //   <td className="text-center">{invoice.recDat ? invoice.recDat.substring(0, 10) : 'No'}</td>
                //   <td className="text-end">{invoice.total.toFixed(2)}</td>



        id    : invoice._id,
        remNum    : invoice.remNum,
        remDat: invoice.remDat ? formatDateNoTZ(invoice.remDat) : '',
        invNum    : invoice.invNum,
        invDat: invoice.invDat ? formatDateNoTZ(invoice.invDat) : '',
        recNum    : invoice.recNum,
        recDat: invoice.recDat ? formatDateNoTZ(invoice.recDat) : '',
        notes: invoice.notes,
        nameCus  : (invoice.id_client as ICustomer).nameCus,
        nameUse  : (invoice.user as IUser)?.name ?? '',
        nameIns  : (invoice.id_instru as IInstrumento)?.name ?? '',
        namePar  : (invoice.id_parte as IParte)?.name ?? '',
        nameCon  : (invoice.id_config as IConfiguracion)?.name ?? '',
        nameCom  : (invoice.codCom as IComprobante)?.nameCom ?? '',
        total : invoice.total.toFixed(2),
        // isPaid: invoice.isPaid,
        noProducts: invoice.numberOfItems,
        createdAt: invoice.createdAt!.substring(0, 10),
        updatedAt: invoice.updatedAt!.substring(0, 10),
    }));



  const parametros = async () => {
    navigate('/admin/filtrocrm?redirect=/admin/remits');
  };
  const createHandler = async () => {
    navigate(`/admin/invoicer`);
};




    const exportToExcel = () => {
    const rows = invoices.map(invoice => ({
      id: invoice._id,
      punteid: invoice._id,

      invNum: invoice.invNum,
      invDat: invoice.invDat ? formatDateNoTZ(invoice.invDat) : '',
      recNum: invoice.recNum,
      recDat: invoice.recDat ? formatDateNoTZ(invoice.recDat) : '',

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
        nameIns  : (invoice.id_instru as IInstrumento)?.name ?? '',
        namePar  : (invoice.id_parte as IParte)?.name ?? '',
        nameCon  : (invoice.id_config as IConfiguracion)?.name ?? '',
        nameCom  : (invoice.codCom as IComprobante)?.nameCom ?? '',
      total: invoice.total,
      isPaid: invoice.isPaid,
      noProducts: invoice.numberOfItems,
      createdAt: invoice.createdAt?.substring(0, 10),
      updatedAt: invoice.updatedAt?.substring(0, 10),
    }));

    // Opcional: Renombrar columnas para Excel
    const exportData = rows.map(row => ([
       row.remNum,
       row.remDat,
       row.nameCom,
       row.invNum,
       row.invDat,
       row.nameCus,
       row.total,
       row.recNum,
       row.recDat,
       row.nameCon,
       row.notes,
       row.nameUse,
       row.nameIns,
       row.namePar,
       row.terminado,
       row.libNum,
       row.folNum,
       row.asiNum,
       row.asiDat,
       row.escNum,
       row.asieNum,
       row.asieDat,
       row.id,
       row.punteid,
       row.createdAt,
       row.updatedAt,
    ]));
  const headers = [
      'Remito',
      'Fecha Remito',
      'Comprobante',
      'Numero',
      'Fecha Comprobante',
      'Cliente',
      'Importe',
      'Recibo',
      'Fecha',
      'Configuración',
      'Observaciones',
      'Usuario',
      'Instrumento',
      'Parte',
      'Terminado',
      'Libro',
      'Folio',
      'Asiento N°',
      'Fecha Asiento',
      'Inst.Publico N°',
      'Asiento Publico N°',
      'Fecha Asiento Publico',
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
        `Compronate.:`,
        `${userInfo.filtro.nameCom}`,
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
        `Observaciones.:`,
        `${userInfo.filtro.obser}`,
      ],
      [],
      headers
    ];

 const finalData = [...headerInfo, ...exportData];

    const worksheet = XLSX.utils.json_to_sheet(finalData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Remitos');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'Remitos.xlsx');
  };


    if ( !invoices ) return (<></>);
    
  return (
    <AdminLayoutMenuList
        title={'Remitos de Venta'} 
        subTitle={'Consulta Remitos de Venta'}
        icon={ <ConfirmationNumberOutlined /> }
    >

          <Box mt={2} display="flex" gap={2} flexWrap="wrap">
        {(user?.role==="admin") && (
              <Button
              onClick={parametros}
              variant="contained"
              startIcon={<BiFileFind />}
              sx={{ bgcolor: 'yellow', color: 'black' }}
              >
                  Filtro
              </Button>
            )}
            {/* <Button variant="outlined" color="success" onClick={() => exportToExcel(rows)}>EXCEL</Button> */}
        <Button variant="outlined" color="success" onClick={exportToExcel}>
          Excel
        </Button>
       <Box display="flex" gap={2} justifyContent="flex-end" flexWrap="wrap" >
          <div>
            <Button
             variant="contained"
             sx={{ bgcolor: 'yellow', color: 'black' }}
             type="button"
             onClick={createHandler}>
              Crea Remito de Venta
            </Button>
          </div>
        </Box>
 

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

