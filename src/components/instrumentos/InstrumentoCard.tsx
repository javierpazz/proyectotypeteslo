// import { FC, useMemo, useState } from 'react';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { Grid, Card, CardActionArea, Box, Typography } from '@mui/material'
// import  Rating from '../Rating'
import { IInstrumento } from '../../interfaces'

interface Props {
    instrumento: IInstrumento;
}

export const InstrumentoCard: FC<Props> = ({ instrumento }) => {


// const estilo = {
//   position: 'absolute',
//   fontSize: '2.5rem',
//   fontWeight: 800,
//   color: 'rgba(0,0,0,0.25)',
//   transform: 'rotate(-20deg)',
//   textAlign: 'center',
//   px: 2,
//   userSelect: 'none',
//   textShadow: '0 2px 8px rgba(0,0,0,0.15)',
// };



    return (
      <Grid item 
            xs={6} 
            sm={ 4 }
            // onMouseEnter={ () => setIsHovered(true) } 
            // onMouseLeave={ () => setIsHovered(false) } 
      >
          <Card>
              {/* <NextLink href="/instrumento/slug" passHref prefetch={ false }> */}
              <NavLink to={`/instrumento/${instrumento._id}`}>
              {/* <Link> */}

                <CardActionArea>

                        <Box
                            sx={{
                            height: 250,
                            width: '100%',
                            backgroundColor: '#f5f5f5',
                                backgroundImage: `repeating-linear-gradient(
                                -45deg,
                                rgba(0,0,0,0.05),
                                rgba(0,0,0,0.05) 10px,
                                transparent 10px,
                                transparent 20px
                                )`,

//                                 backgroundImage: `repeating-linear-gradient(
//   -45deg,
//   rgba(0,0,0,0.02),
//   rgba(0,0,0,0.02) 10px,
//   transparent 10px,
//   transparent 20px
// )`,

color: 'rgba(0,0,0,0.3)',
filter: 'blur(0.3px)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            overflow: 'hidden'
                            }}
                        >
                            {/* <Typography
                            sx={{
                                position: 'absolute',
                                fontSize: '2rem',
                                fontWeight: 700,
                                color: 'rgba(0,0,0,0.1)', // 👈 efecto watermark
                                transform: 'rotate(-20deg)',
                                textAlign: 'center',
                                px: 2,
                                userSelect: 'none'
                            }}
                            >
                            {instrumento.name}
                            </Typography> */}
                    <Typography
                    sx={{
                        position: 'absolute',
                        fontSize: '2.5rem',
                        fontWeight: 800,
                        color: 'rgba(0,0,0,0.25)',
                        transform: 'rotate(-20deg)',
                        textAlign: 'center',
                        px: 2,
                        userSelect: 'none',
                        textShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    }}
                    >
                    {instrumento.name}
                    </Typography>

                        {/* <Typography sx={{ ...estilo, opacity: 0.15 }}>
                            {instrumento.name}
                        </Typography>
                        <Typography sx={{ ...estilo, opacity: 0.3 }}>
                            {instrumento.name}
                        </Typography> */}

                        </Box>

                    </CardActionArea>
                {/* </Link> */}

                </NavLink>
              {/* </NextLink> */}
              
          </Card>

          {/* <Box sx={{ mt: 1, display: isImageLoaded ? 'block' : 'none' }} className='fadeIn'> */}
          <Box sx={{ mt: 1 }} className='fadeIn'>
              <Typography fontWeight={700}>{ instrumento.name }</Typography>
              {/* <Typography fontWeight={500}>{ `$${instrumento.price}` }</Typography> */}
          </Box>
        {/* <Rating rating={instrumento.rating} numReviews={instrumento.numReviews} /> */}
      </Grid>
    )
}
