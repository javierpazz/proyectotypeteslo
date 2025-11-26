import { useState, useEffect, useContext } from 'react';
import { AddOutlined, PeopleOutline } from '@mui/icons-material'

import { DataGrid, GridColDef, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid';
import { Grid, Select, MenuItem, Box, Button, Chip } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Link as MuiLink } from '@mui/material';

import { AdminLayoutMenuList } from '../../components/layouts'
import { IUser } from '../../interfaces';
import { stutzApi } from '../../../api';
import { AuthContext } from '../../../context';
import { NavLink, useNavigate } from 'react-router-dom';




export const Users = () => {


    ////////////////////FGFGFGFG
    const { user, isLoading } = useContext(AuthContext);

    const navigate = useNavigate()

    useEffect(() => {
        if (!user && !isLoading) {
        navigate('/auth/loginadm?redirect=/admin/users');
        }
        if (user?.role === "client" ) {
        navigate('/');
        }
    }, [user, isLoading, navigate]);
    ////////////////////FGFGFGFG

    const [ users, setUsers ] = useState<IUser[]>([]);


    // const { data, error } = useSWR<IUser[]>('/api/admin/users');
    const loadData = async() => {
        try {
          const resp = await stutzApi.get<IUser[]>('/api/tes/admin/users');
          setUsers(resp.data);
        //   console.log(resp.data);
        } catch (error) {
          console.log({error})
        }
    
      }

    useEffect(() => {
        loadData();
    }, [])
    


    const onRoleUpdated = async( userId: string, newRole: string ) => {

        const previosUsers = users.map( user => ({ ...user }));
        const updatedUsers = users.map( user => ({
            ...user,
            role: userId === user._id ? newRole : user.role
        }));

        setUsers(updatedUsers);

        try {
            
            await stutzApi.put('/api/tes/admin/users/role', {  userId, role: newRole });

        } catch (error) {
            setUsers( previosUsers );
            console.log(error);
            alert('No se pudo actualizar el role del usuario');
        }

    }

    const onActivoUpdated = async( userId: string, newisActive: boolean ) => {

        const previosUsers = users.map( user => ({ ...user }));
        const updatedUsers = users.map( user => ({
            ...user,
            isActive: userId === user._id ? newisActive : user.isActive
        }));

        setUsers(updatedUsers);

        try {
            await stutzApi.put('/api/tes/admin/users/isActive', {  userId, isActive: newisActive });

        } catch (error) {
            setUsers( previosUsers );
            console.log(error);
            alert('No se pudo actualizar el estado del usuario');
        }

    }

    const columns: GridColDef[] = [
        { field: 'email', headerName: 'Correo', width: 250 },
        { 
            field: 'name', 
            headerName: 'Nombre completo', 
            width: 250,
            renderCell: ({row}: GridValueGetterParams | GridRenderCellParams) => {
                return (
                    <MuiLink component={RouterLink} to={`/admin/users/user/${row.id}`}
                        underline='always'>
                            { row.name}
                    </MuiLink>
                )
            }
        },
        {
            field: 'role', 
            headerName: 'Rol', 
            width: 300,
            renderCell: ({row}: GridValueGetterParams | GridRenderCellParams) => {
                if (user?.role !== 'admin') return null;
                return (
                    <Select
                    value={ row.role }
                    label="Rol"
                    onChange={ ({ target }) => onRoleUpdated( row.id, target.value ) }
                    sx={{ width: '300px' }}
                    >
                        <MenuItem value='admin'> Admin </MenuItem>
                        <MenuItem value='user'> User </MenuItem>
                        <MenuItem value='client'> Client </MenuItem>
                        <MenuItem value='super-user'> Super User </MenuItem>
                        <MenuItem value='SEO'> SEO </MenuItem>
                    </Select>
                )
            }
        },
        {
            field: 'isActive', 
            headerName: 'Activo', 
            width: 150,
            renderCell: ({row}: GridValueGetterParams | GridRenderCellParams) => {
                if (user?.role !== 'admin') return null;
                return (
                    <Select
                    value={ row.isActive }
                    label="Activo"
                    onChange={ ({ target }) => onActivoUpdated( row.id, target.value ) }
                    sx={{ width: '300px' }}
                    >
                        <MenuItem value='true'> Activo </MenuItem>
                        <MenuItem value='false'> InActivo </MenuItem>
                    </Select>
                )
            }
        },

    {
            field: 'check',
            headerName: 'Acción',
            renderCell: ({ row }: GridValueGetterParams | GridRenderCellParams ) => {
                if (user?.role !== 'admin') return null;
                return (
                        <Chip variant='outlined' label="Eliminar" color="error"
                        onClick={() => deleteHandler(row.id)}
                        />
                    )
        
            }
        },

    ];

    const rows = users.map( user => ({
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        isActive: user.isActive
    }))

    const deleteHandler = async (id : string) => {
    if (window.confirm('Esta Seguro de Eliminar?')) {
      try {
        await stutzApi.delete(`/api/tes/admin/users/${id}`);
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

    if ( !users ) return (<></>);

  return (
    <AdminLayoutMenuList 
        title={'Usuarios'} 
        subTitle={'Mantenimiento de usuarios'}
        icon={ <PeopleOutline /> }
    >
        <Box display='flex' justifyContent='end' sx={{ mb: 2 }}>
        <NavLink to='/admin/users/user/new' >
            <Button
                startIcon={ <AddOutlined /> }
                color="secondary"
            >
                Crear Usuario
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

