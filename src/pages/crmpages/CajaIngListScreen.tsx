
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
import { IReceiptB, ICustomer, IConfiguracion, IUser, IEncargado } from '../../interfaces';
import { stutzApi } from '../../../api';
import { AuthContext } from '../../../context';
import { FullScreenLoading } from '../../components/ui';
import { BiFileFind } from 'react-icons/bi';




export const CajaIngListScreen = () => {

    
    ////////////////////FGFGFGFG
    const { user, isLoading } = useContext(AuthContext);
    const navigate = useNavigate()

    useEffect(() => {
        if (!user && !isLoading) {
        navigate('/auth/loginadm?redirect=/admin/reciptspv');
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
  const codEnc = userInfo.filtro.codEnc;
  const codUse = userInfo.filtro.codUse;
  const order = userInfo.filtro.order;
      
    
    const [ recibos, setrecibos ] = useState<IReceiptB[]>([]);
    const [ isloading, setIsloading ] = useState(false);

 useEffect(() => {
    const fetchData = async () => {
      try {
          setIsloading(true);
          const resp = await stutzApi.get(`/api/receipts/searchcajS?order=${order}&fech1=${fech1}&fech2=${fech2}&configuracion=${codCon}&usuario=${codUse}&encargado=${codEnc}`);
          setIsloading(false);
          setrecibos(resp.data.receipts);

    } catch (err) {
      }
    };
      fetchData();
  }, [ ]);

  
const prodeleteReceipt = (row:any) => {
  if (window.confirm('Are you sure to delete?')) {
      deleteReceipt(row);
      window.location.reload();

    }
  };

  const deleteReceipt = async (row:any) => {
      // buscar todas loock at the invoices that have a receipt and modify de numRec by null
      try {
        await stutzApi.delete(`/api/receipts/${row.id}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
      } catch (err) {
      }
  };


const columns:GridColDef[] = [
    { field: 'cajNum',
        headerName: 'Comprobante',
        width: 100,
        align: 'right',
        headerAlign: 'center',
        renderCell: ({ row }: GridValueGetterParams | GridRenderCellParams ) => {
            return (
                <MuiLink component={RouterLink}  to={`/admin/invoicerCajIngCon/${row.id}?redirect=/admin/invoicesCajIng`}
                underline='always'>
                         { row.cajNum}
                    </MuiLink>
                )
            }
            
            
        },
    { field: 'cajDat', headerName: 'Fecha', width: 100, headerAlign: 'center' },
    
    { field: 'nameEnc', headerName: 'Encargado', width: 200 },
    { field: 'notes', headerName: 'Observaciones', width: 200 },
    { field: 'desval', headerName: 'VALOR', width: 100 },
    { field: 'total',
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
        cajNum    : recibo.cajNum,
        cajDat: recibo.cajDat ? formatDateNoTZ(recibo.cajDat) : '',
        notes: recibo.notes,
        desVal: recibo.desval,
        nameCus  : (recibo.id_client as ICustomer)?.nameCus ?? '',
        nameUse  : (recibo.user as IUser)?.name ?? '',
        nameCon  : (recibo.id_config as IConfiguracion)?.name ?? '',
        nameEnc  : (recibo.id_encarg as IEncargado)?.name ?? '',
        total : recibo.total.toFixed(2),
        createdAt: recibo.createdAt!.substring(0, 10),
        updatedAt: recibo.updatedAt!.substring(0, 10),
    }));



  const parametros = async () => {
    navigate('/admin/filtrocrm?redirect=/admin/recibosCajIng');
  };
  const createHandler = async () => {
    navigate(`/admin/recibor`);
};




    const exportToExcel = () => {
    const rows = recibos.map(recibo => ({
        id: recibo._id,
        punteid: recibo._id,
        cajNum    : recibo.cajNum,
        cajDat: recibo.cajDat ? formatDateNoTZ(recibo.cajDat) : '',
        notes: recibo.notes,
        desVal: recibo.desval,
        nameCus  : (recibo.id_client as ICustomer)?.nameCus ?? '',
        nameUse  : (recibo.user as IUser)?.name ?? '',
        nameCon  : (recibo.id_config as IConfiguracion)?.name ?? '',
        nameEnc  : (recibo.id_encarg as IEncargado)?.name ?? '',
        total : recibo.total.toFixed(2),
        createdAt: recibo.createdAt!.substring(0, 10),
        updatedAt: recibo.updatedAt!.substring(0, 10),



    }));

    // Opcional: Renombrar columnas para Excel
    const exportData = rows.map(row => ([
      row.cajNum,
      row.cajDat,
      row.notes,
      row.desVal,
      row.total,
      row.nameEnc,
      row.nameCon,
      row.nameCus,
      row.nameUse,
      row.createdAt,
      row.updatedAt,
      ]));

    const headers = [
      'Nro Retiro ',
      'Fecha Retiro',
      'Observaciones',
      'valor',
      'Importe',
      'Encargado',
      'Punto de Venta',
      'Cliente',
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
    XLSX.utils.book_append_sheet(workbook, worksheet, 'IngresosDeCaja');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'IngresosDeCaja.xlsx');
  };


    if ( !recibos ) return (<></>);
    
  return (
    <AdminLayoutMenuList
        title={'Ingresos de Caja '} 
        subTitle={'Consulta Ingresos de Caja '}
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
              Crea Ingreso de Caja
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

