import { useState, useEffect } from 'react';
import '../styles/globals.css';

import { ShopLayout } from '../components/layouts';
import { FullScreenLoading } from '../components/ui';
import stutzApi from '../../api/stutzApi';
import { IProduct } from '../interfaces'
import { ProductList } from '../components/products';
import { Typography } from '@mui/material';

export const Ecommerce = () => {
  const [products, setProducts] = useState<IProduct[]>()


  const filtro = {
    // firstDat : getTodayInGMT3(),
    // lastDat : getTodayInGMT3(),
    firstDat : "0001-01-01",
    lastDat : "3000-01-01",
    codCus : '',
    codPar : '',
    codSup : '',
    codPro : '',
    codEnc : '',
    codCom : '',
    codIns : '',
    codVal : '',
    codCon : '',
    codUse : '',
    nameCus : 'Todos',
    nameCon : 'Todos',
    nameUse : 'Todos',
    nameSup : 'Todos',
    desPro : 'Todos',
    nameIns : 'Todos',
    namePar : 'Todos',
    nameCom : 'Todos',
    desVal : 'Todos',
    nameEnc : 'Todos',
    order : 'newest',
    estado : 'TOD',
    registro : 'TOD',
    obser : '',
  };


  const [name, setName] = useState("");
  const [salePoint, setSalePoint] = useState("");
  const [codCon, setCodCon] = useState('');
  const [configurationObj, setConfigurationObj] = useState({});
  
  const [configus, setConfigus] = useState([]);
  const [punto, setPunto] = useState(localStorage.getItem('punto'));

  const userInfo = typeof window !== 'undefined' && localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo')!)
  : {};


  // const loadProducts = async() => {
  //   try {
  //     const resp = await stutzApi.get<IProduct[]>('api/tes/products');
  //     setProducts(resp.data);
  //   } catch (error) {
  //     console.log({error})
  //   }

  // }
  // useEffect(() => {
  // loadProducts();
  // }, [])

///////////////////////
  // 1. Primero obtenemos configuración si no hay
  useEffect(() => {
    const fetchConfi = async () => {
      try {
        const { data } = await stutzApi.get(`/api/configurations/`);
        const conf = data[0];
        // localStorage.setItem('punto', conf._id);
        // localStorage.setItem('puntonum', conf.codCon);
        // localStorage.setItem('nameCon', conf.name);
        setPunto(conf._id); // <-- actualizamos el estado después de setItem
        setConfigurationObj(conf);
        setCodCon(conf._id);
        setName(conf.name);
        setSalePoint(conf.codCon);
        userInfo.filtro = filtro;
        userInfo.codCon = conf._id;
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        guardaLocal(conf);
      } catch (error) {
        console.error('Error al cargar configuración:', error);
      }
    };
    
    if (!punto) {
      fetchConfi();
    }
  }, [punto]);
  
  // 2. Cuando ya existe `punto`, hacemos el fetch de productos
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await stutzApi.get(`/api/tes/products?configuracion=${punto}`);
      setProducts(result.data);
      } catch (err) {
      }
    };
    
    if (punto) {
      fetchData();
    }
  }, [punto]);

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const result = await stutzApi.get(`/api/tes/customers/byemail/${userInfo.user.email}`);
        console.log(result.data)
        localStorage.setItem('cliente', result.data._id);

      } catch (err) {
      }
    };
    
    if (punto) {
      fetchCliente();
    }
  }, [punto]);
  
  const guardaLocal = (conf : any) => {
        localStorage.setItem('punto', conf._id);
        localStorage.setItem('puntonum', conf.codCon);
        localStorage.setItem('nameCon', conf.name);
      };


///////////////////////





  return (
    <ShopLayout title={'Teslo-Shop - Home'} pageDescription={'Encuentra los mejores productos de Teslo aquí'}>
        {/* <Typography variant='h1' component='h1'>Tienda</Typography> */}
        <Typography variant='h2' sx={{ mb: 1 }}>Todos los productos</Typography>


    {
          !products
            ? <FullScreenLoading />
            : <ProductList products={ products } />

        }


    </ShopLayout>
  )
}
