import { FC, ReactNode } from 'react';
import { Box } from '@mui/material';

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


          <Box display='flex' justifyContent='center' alignItems='center' height="calc(100vh - 200px)">   
                { children }
          </Box>


    </>
  )
}
