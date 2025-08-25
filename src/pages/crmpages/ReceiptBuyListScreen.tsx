
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
import { IReceiptB, IConfiguracion, IUser, IEncargado, ISupplier } from '../../interfaces';
import { stutzApi } from '../../../api';
import { AuthContext } from '../../../context';
import { FullScreenLoading } from '../../components/ui';
import { BiFileFind } from 'react-icons/bi';




export const ReceiptBuyListScreen = () => {

    
    ////////////////////FGFGFGFG
    const { user, isLoading } = useContext(AuthContext);
    const navigate = useNavigate()

    useEffect(() => {
        if (!user && !isLoading) {
        navigate('/auth/loginadm?redirect=/admin/invoicesBuyRec');
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
  const codSup = userInfo.filtro.codSup;
  const codUse = userInfo.filtro.codUse;
  const order = userInfo.filtro.order;
      
    
    const [ recibos, setrecibos ] = useState<IReceiptB[]>([]);
    const [ isloading, setIsloading ] = useState(false);

 useEffect(() => {
    const fetchData = async () => {
      try {
          setIsloading(true);
          const resp = await stutzApi.get(`/api/receipts/searchrecB?order=${order}&fech1=${fech1}&fech2=${fech2}&configuracion=${codCon}&usuario=${codUse}&supplier=${codSup}`);
          console.log(resp.data)
          setIsloading(false);
          setrecibos(resp.data.receipts);

    } catch (err) {
      }
    };
      fetchData();
  }, [ ]);

const unapplyReceipt = async (row: any) => {
  try {
    //          dispatch({ type: 'UPDATE_REQUEST' });
    await stutzApi.put(
      `/api/invoices/${row.recNum}/unapplyrecB`,
      {
        recNum: row.recNum,
        supplier: row.supplier,
      },
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });    
    //          dispatch({type: 'UPDATE_SUCCESS' });
    // toast.success('row Unapplied successfully');
    //          navigate('/admin/products');
  } catch (err) {
  }
};
    // buscar todas loock at the invoices that have a row and modify de numRec by nul
//dr
const prodeleteReceipt = (row:any) => {
  if (window.confirm('Esta seguro de Borrar')) {
      deleteReceipt(row);
      //dr
      unapplyReceipt(row);
      // buscar todas loock at the invoices that have a receipt and modify de numRec by nul
      //dr
      window.location.reload();

    }
  };



  const deleteReceipt = async (row: any) => {
      try {
        await stutzApi.delete(`/api/receipts/${row.id}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
      } catch (err) {
      }
    };


const columns:GridColDef[] = [
    { field: 'recNum',
        headerName: 'O.Pago',
        width: 100,
        align: 'right',
        headerAlign: 'center',
        renderCell: ({ row }: GridValueGetterParams | GridRenderCellParams ) => {
            return (
                <MuiLink component={RouterLink}  to={`/admin/invoicerBuyRecCon/${row.id}?redirect=/admin/invoicesBuyRec`}
                underline='always'>
                         { row.recNum}
                    </MuiLink>
                )
            }
            
            
        },
    { field: 'recDat', headerName: 'Fecha', width: 100, headerAlign: 'center' },
    
    { field: 'nameSup', headerName: 'Proveedor', width: 200 },
    { field: 'notes', headerName: 'Observaciones', width: 200 },
    { field: 'desval', headerName: 'VALOR', width: 100 },
    { field: 'totalBuy',
      headerName: 'Importe',
      width: 100,
      align: 'right',
      headerAlign: 'center',
    },
    
    { field: 'nameCon', headerName: 'Punto de Venta', width: 200 },
    { field: 'nameUse', headerName: 'Usuario', width: 200 },
                {
              field: 'check',
              headerName: 'Acción',
              renderCell: ({ row }: GridValueGetterParams | GridRenderCellParams ) => {
                if (user?.role !== 'admin') return null;
                return (
                  <Chip variant='outlined' label="Eliminar" color="error"
                  onClick={() => prodeleteReceipt(row)}
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
    
    const rows = recibos!.map( recibo => ({
        id    : recibo._id,
        recNum    : recibo.recNum,
        recDat: recibo.recDat ? formatDateNoTZ(recibo.recDat) : '',
        notes: recibo.notes,
        desVal: recibo.desval,
        supplier  : (recibo.supplier as ISupplier)?._id ?? '',
        nameSup  : (recibo.supplier as ISupplier)?.name ?? '',
        nameUse  : (recibo.user as IUser)?.name ?? '',
        nameCon  : (recibo.id_config as IConfiguracion)?.name ?? '',
        nameEnc  : (recibo.id_encarg as IEncargado)?.name ?? '',
        totalBuy : recibo.totalBuy.toFixed(2),
        createdAt: recibo.createdAt!.substring(0, 10),
        updatedAt: recibo.updatedAt!.substring(0, 10),
    }));



  const parametros = async () => {
    navigate('/admin/filtrocrm?redirect=/admin/invoicesBuyRec');
  };
  const createHandler = async () => {
    navigate(`/admin/recibor`);
};




    const exportToExcel = () => {
    const rows = recibos.map(recibo => ({
        id: recibo._id,
        punteid: recibo._id,
        recNum    : recibo.recNum,
        recDat: recibo.recDat ? formatDateNoTZ(recibo.recDat) : '',
        notes: recibo.notes,
        desVal: recibo.desval,
        nameSup  : (recibo.supplier as ISupplier)?.name ?? '',
        nameUse  : (recibo.user as IUser)?.name ?? '',
        nameCon  : (recibo.id_config as IConfiguracion)?.name ?? '',
        nameEnc  : (recibo.id_encarg as IEncargado)?.name ?? '',
        totalBuy : recibo.totalBuy.toFixed(2),
        createdAt: recibo.createdAt!.substring(0, 10),
        updatedAt: recibo.updatedAt!.substring(0, 10),

    }));

    // Opcional: Renombrar columnas para Excel
    const exportData = rows.map(row => ([
      row.recNum,
      row.recDat,
      row.notes,
      row.desVal,
      row.totalBuy,
      row.nameSup,
      row.nameCon,
      row.nameEnc,
      row.nameUse,
      row.createdAt,
      row.updatedAt,
      ]));

    const headers = [
      'Orden de Pago ',
      'Fecha',
      'Observaciones',
      'valor',
      'Importe',
      'Proveedor',
      'Punto de Venta',
      'Encargado',
      'Usuario',
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
    XLSX.utils.book_append_sheet(workbook, worksheet, 'OrdenDePago');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'OrdenDePago.xlsx');
  };


    if ( !recibos ) return (<></>);
    
  return (
    <AdminLayoutMenuList
        title={'Orden de Pago '} 
        subTitle={'Consulta Orden de Pago '}
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
              Crea Orden De Pago
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

