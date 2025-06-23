import { useState, useEffect, useContext } from 'react';
import { AddOutlined, CategoryOutlined } from '@mui/icons-material';
import { Box, Button, CardMedia, Chip, Grid, Link } from '@mui/material'
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
                <NavLink to={`/admin/comprobantes/comprobante/${row.nameCom}`}>
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
        navigate('/auth/login?redirect=/admin/comprobantes');
        }
    }, [user, isLoading, navigate]);
    ////////////////////FGFGFGFG

    const [ comprobantes, setProducts ] = useState<IComprobante[]>([]);


    const loadData = async() => {
        try {
          const resp = await stutzApi.get<IComprobante[]>('/api/tes/admin/comprobantes');
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
    } catch (err) {
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
