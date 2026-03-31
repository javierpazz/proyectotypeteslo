import { FC } from 'react'
import { Grid } from '@mui/material'
import { IInstrumento } from '../../interfaces'
import { InstrumentoCard } from '.'

interface Props {
    instrumentos: IInstrumento[];
}

export const InstrumentoList: FC<Props> = ({ instrumentos }) => {

  return (
    <Grid container spacing={4}>
        {
            instrumentos.map( instrumento => (
                <InstrumentoCard 
                    key={ instrumento.name }
                    instrumento={ instrumento }
                />
            ))
        }
    </Grid>
  )
}
