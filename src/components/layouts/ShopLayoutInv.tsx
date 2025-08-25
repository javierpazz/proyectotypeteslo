import { FC, ReactNode } from 'react';
import { NavbarInv, SideMenu } from '../ui';
import foto from '../../assets/escribania.jpg';





interface Props {
    children?: ReactNode;
    title: string;
    pageDescription: string;
    imageFullUrl?: string;
}




export const ShopLayoutInv:FC<Props> = ({ children, title, pageDescription, imageFullUrl }) => {
  return (
    <>

        <div
            style={{
            backgroundImage: `url(${foto})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            minHeight: '100vh',
            }}
        >

        <div>
            <title>{ title }</title>

            <meta name="description" content={ pageDescription } />
            
            
            <meta name="og:title" content={ title } />
            <meta name="og:description" content={ pageDescription } />

            {
                imageFullUrl && (
                    <meta name="og:image" content={ imageFullUrl } />
                )
            }

        </div> 

        <nav>
            <NavbarInv />
        </nav>

        <SideMenu />

        <main style={{
            margin: '80px auto',
            maxWidth: '1440px',
            padding: '0px 30px'
        }}>
            { children }
        </main>

        {/* Footer */}
        <footer>
            {/* TODO: mi custom footer */}
        </footer>

            </div> 
    </>
  )
}


