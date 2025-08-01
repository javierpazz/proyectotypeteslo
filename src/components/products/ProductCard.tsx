import { FC, useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Grid, Card, CardActionArea, CardMedia, Box, Typography, Chip } from '@mui/material'

import { IProduct } from '../../interfaces'

interface Props {
    product: IProduct;
}

export const ProductCard: FC<Props> = ({ product }) => {

    const [isHovered, setIsHovered] = useState(false);
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    const productImage = useMemo(() => {
        return isHovered
          ? product.images[1]
          : product.images[0];

    }, [isHovered, product.images])

    return (
      <Grid item 
            xs={6} 
            sm={ 4 }
            onMouseEnter={ () => setIsHovered(true) } 
            onMouseLeave={ () => setIsHovered(false) } 
      >
          <Card>
              {/* <NextLink href="/product/slug" passHref prefetch={ false }> */}
              <NavLink to={`/product/${product.slug}`}>
              {/* <Link> */}

                <CardActionArea>


                      {
                            (product.inStock === 0 ) && (
                                <Chip 
                                    color="primary"
                                    label="No hay disponibles"
                                    sx={{ position: 'absolute', zIndex: 99, top: '10px', left: '10px' }}
                                />
                            )
                        }

                        <CardMedia 
                            component='img'
                            className='fadeIn'
                            image={ productImage }
                            alt={ product.title }
                            onLoad={ () => setIsImageLoaded(true) }
                        />
                    </CardActionArea>
                {/* </Link> */}

                </NavLink>
              {/* </NextLink> */}
              
          </Card>

          <Box sx={{ mt: 1, display: isImageLoaded ? 'block' : 'none' }} className='fadeIn'>
              <Typography fontWeight={700}>{ product.title }</Typography>
              <Typography fontWeight={500}>{ `$${product.price}` }</Typography>
          </Box>
      </Grid>
    )
}
