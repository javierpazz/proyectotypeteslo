import { FC, ReactNode } from 'react';
import { Box } from '@mui/material';
import foto from '../../assets/fondo.jpg';

interface Props {
    children?: ReactNode;
    title: string;
}

export const AuthLayout: FC<Props> = ({ children, title  }) => {
  return (
    <>
        <div>
            <title>{ title }</title>
        </div>

        <main
            style={{
            // backgroundColor: '#dedbdbff', // gris
            backgroundImage: `url(${foto})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            minHeight: '100vh', // opcional, para ocupar toda la pantalla
            }}
        >
          <Box display='flex' justifyContent='center' alignItems='center' height="calc(100vh - 200px)">   
                { children }
          </Box>
      </main>

    </>
  )
}
