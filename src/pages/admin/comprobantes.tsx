import { useState, useEffect, useContext } from 'react';
import { AddOutlined, CategoryOutlined } from '@mui/icons-material';
import { Box, Button,  Chip, Grid, Link } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid';

import { AdminLayoutMenuList } from '../../components/layouts'
import { IComprobante  } from '../../interfaces';
import { stutzApi } from '../../../api';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context';




export const Comprobantes = () => {

const columns:GridColDef[] = [
    { field: 'codCom', headerName: 'Codigo' },
    { 
        field: 'nameCom', 
        headerName: 'Descripcion', 
        width: 250,
        renderCell: ({row}: GridValueGetterParams | GridRenderCellParams) => {
            return (
                <NavLink to={`/admin/comprobantes/comprobante/${row.id}`}>
                    <Link underline='always'>
                        { row.nameCom}
                    </Link>
                </NavLink>
            )
        }
    },
    { field: 'isHaber', headerName: 'isHaber' },
    { field: 'noDisc', headerName: 'noDisc' },
    { field: 'toDisc', headerName: 'toDisc' },
    { field: 'itDisc', headerName: 'itDisc' },
    { field: 'interno', headerName: 'interno' },
    { field: 'numInt', headerName: 'numInt' },
    { field: 'codCon', headerName: 'codCon' },
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

];
    ////////////////////FGFGFGFG
    const { user, isLoading } = useContext(AuthContext);
    const navigate = useNavigate()

    useEffect(() => {
        if (!user && !isLoading) {
        navigate('/auth/loginadm?redirect=/admin/comprobantes');
        }
        if (user?.role === "client" ) {
        navigate('/');
        }
    }, [user, isLoading, navigate]);
    ////////////////////FGFGFGFG
  
    const userInfo = typeof window !== 'undefined' && localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo')!)
    : null;


    const [ comprobantes, setProducts ] = useState<IComprobante[]>([]);


    const loadData = async() => {
        try {
        //   const resp = await stutzApi.get<IComprobante[]>('/api/tes/admin/comprobantes?id_config=${userInfo.codCon}');
          const resp = await stutzApi.get(`/api/tes/admin/comprobantes?id_config=${userInfo.codCon}`);
          setProducts(resp.data);
        //   console.log(resp.data);
        } catch (error) {
          console.log({error})
        }
    
      }

    useEffect(() => {
        loadData();
    }, [])

    // const { data, error } = useSWR<IProduct[]>('/api/admin/comprobantes');
    // if ( !data && !error ) return (<></>);
    
    
    const rows = comprobantes.map( comprobante => ({
        id: comprobante._id,
        codCom: comprobante.codCom,
        nameCom: comprobante.nameCom,
        isHaber: comprobante.isHaber,
        noDisc: comprobante.noDisc,
        toDisc: comprobante.toDisc,
        itDisc: comprobante.itDisc,
        interno: comprobante.interno,
        numInt: comprobante.numInt,
        codCon: comprobante.codCon,
    }));

    const deleteHandler = async (id : string) => {
    if (window.confirm('Esta Seguro de Eliminar?')) {
        console.log(id)
        try {
        await stutzApi.delete(`/api/tes/admin/comprobantes/${id}`);
        window.location.reload();
    } catch (error: any) {
///////
    if (error.response) {
      console.error('Error de backend:', error.response.data);
      alert(`Error del servidor: ${error.response.data.message || 'Revisá los campos'}`);
    } else if (error.request) {
      console.error('No hubo respuesta del servidor', error.request);
      alert('No hubo respuesta del servidor. Verifica tu conexión.');
    } else {
      console.error('Error inesperado', error.message);
      alert('Error inesperado al guardar.');
    }
///////

      }
    }
  };


    if ( !comprobantes ) return (<></>);

  return (
    <AdminLayoutMenuList 
        title={`Comprobantes (${ comprobantes?.length })`} 
        subTitle={'Mantenimiento de Comprobantes'}
        icon={ <CategoryOutlined /> }
    >
        <Box display='flex' justifyContent='end' sx={{ mb: 2 }}>
        <NavLink to='/admin/comprobantes/comprobante/new' >
            <Button
                startIcon={ <AddOutlined /> }
                color="secondary"
            >
                Crear Comprobante
            </Button>
            </NavLink>            
        </Box>

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
