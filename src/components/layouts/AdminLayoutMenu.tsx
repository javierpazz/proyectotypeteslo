import { FC, ReactNode } from 'react';
import { Box } from '@mui/material';
import { AdminNavbarMenu, AdminNavbarMenuEsc } from '../admin';

import { SideMenu } from '../ui';


interface Props {
    children?: ReactNode;
    title: string;
    subTitle: string;
    icon?: JSX.Element;
}

export const AdminLayoutMenu:FC<Props> = ({ children }) => {
  return (
    <>

        <nav>
            {
            (localStorage.getItem('modulo') === "invo") ?
            <AdminNavbarMenu />
            :<AdminNavbarMenuEsc />
            }
        </nav>
        <SideMenu />

        {/* <main style={{
            // margin: '80px auto',
            // maxWidth: '1440px',
            // padding: '0px 30px'
        }}> */}

        <main
            style={{
            backgroundColor: '#dedbdbff', // gris
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            minHeight: '100vh', // opcional, para ocupar toda la pantalla
            }}
        >


            {/* <Box display="flex" flexDirection='column'>
                <Typography variant='h1' component='h1'>
                    { icon }
                    {' '} { title }
                </Typography>
                <Typography variant='h2' sx={{ mb: 1 }}>{ subTitle }</Typography>

            </Box> */}

            <Box className='fadeIn'>
                { children }
            </Box>

        </main>


    </>
  )
}


