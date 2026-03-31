import { FC } from 'react';
import { Slide } from 'react-slideshow-image';

import 'react-slideshow-image/dist/styles.css';
import styles from './ProductSlideshow.module.css';

interface Props {
    images: string[]
}

export const ProductSlideshow: FC<Props> = ({ images }) => {
  return (
    <Slide
        easing="ease"
        duration={ 2000 }
        indicators
    >
        {
            images.map( image =>  {
                return (
                    <div className={ styles['each-slide'] } key={ image }>
                        {/* <div style={{
                            // backgroundImage: `url(${ image })`,
                            // backgroundSize: 'cover'
                            backgroundImage: `url(${image})`,
                            backgroundSize: 'contain',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            height: '500px',
                            backgroundColor: '#f5f5f5'
                        }}>
                        </div> */}
                        <img
                            src={image}
                            alt="product"
                            className={styles.image}
                        />

                    </div>
                )

            })
        }

    </Slide>
  )
}
