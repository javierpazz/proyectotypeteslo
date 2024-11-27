import { FC, useContext } from 'react';
import { Grid, Typography } from '@mui/material';
import { CartContext } from '../../../context';
import { currency } from '../../utils';
import { getEnvVariables } from '../../../helpers';


interface Props {
    orderValues?: {
        numberOfItems: number;
        subTotal: number;
        total: number;
        tax: number;
    }
}


export const OrderSummary:FC<Props> = ({orderValues}) => {
    const { VITE_TAX_RATE, VITE_API_URL } = getEnvVariables()
    
  const { numberOfItems, subTotal, total, tax } = useContext( CartContext );
  const summaryValues = orderValues ? orderValues : { numberOfItems, subTotal, total, tax };
  

  return (
    <Grid container>
        
        <Grid item xs={6}>
            <Typography>No. Productos</Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography>{summaryValues.numberOfItems} { summaryValues.numberOfItems > 1 ? 'productos': 'producto' }</Typography>
        </Grid>

        <Grid item xs={6}>
            <Typography>SubTotal</Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography>{ currency.format(summaryValues.subTotal) }</Typography>
        </Grid>

        <Grid item xs={6}>
            <Typography>Impuestos ({ Number(VITE_TAX_RATE) * 100 }%)</Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography>{ currency.format(summaryValues.tax) }</Typography>
        </Grid>

        <Grid item xs={6} sx={{ mt:2 }}>
            <Typography variant="subtitle1">Total:</Typography>
        </Grid>
        <Grid item xs={6} sx={{ mt:2 }} display='flex' justifyContent='end'>
            <Typography variant="subtitle1">{ currency.format(summaryValues.total) }</Typography>
        </Grid>

    </Grid>
  )
}
