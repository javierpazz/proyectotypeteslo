import { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { useParams } from 'react-router-dom';


import { ShopLayout } from '../../components/layouts';
import { ProductList } from '../../components/products';
import { FullScreenLoading } from '../../components/ui';
// import { IProduct } from '../../interfaces';
import stutzApi from '../../../api/stutzApi';



export const Query = () => {

  const params = useParams();
  const { searchTerm } = params;
  console.log(params)
  const [products, setProducts] = useState([])

  // const loadProducts = async() => {
  //   try {
  //     const resp = await stutzApi.get(`/api/tes/products/getproductsbysear/${params.query}`);
  //     setProducts(resp.data);
  //     const foundProducts = resp.data.length > 0;
  //     if ( !foundProducts ) {
  //       // products = await dbProducts.getAllProducts(); 
  //       const respaux = await stutzApi.get("/api/tes/products/getproductsbysear/Onesie");
  //       setProducts(respaux.data);
  //     }

  //   } catch (error) {
  //     console.log({error})
  //   }

  // }

// useEffect(() => {
//   loadProducts();
//   }, [params.query])




  // const filtro = {
  //   // firstDat : getTodayInGMT3(),
  //   // lastDat : getTodayInGMT3(),
  //   firstDat : "0001-01-01",
  //   lastDat : "3000-01-01",
  //   codCus : '',
  //   codPar : '',
  //   codSup : '',
  //   codPro : '',
  //   codEnc : '',
  //   codCom : '',
  //   codIns : '',
  //   codVal : '',
  //   codCon : '',
  //   codUse : '',
  //   nameCus : 'Todos',
  //   nameCon : 'Todos',
  //   nameUse : 'Todos',
  //   nameSup : 'Todos',
  //   desPro : 'Todos',
  //   nameIns : 'Todos',
  //   namePar : 'Todos',
  //   nameCom : 'Todos',
  //   desVal : 'Todos',
  //   nameEnc : 'Todos',
  //   order : 'newest',
  //   estado : 'TOD',
  //   registro : 'TOD',
  //   obser : '',
  // };


  const [name, setName] = useState("");
  const [salePoint, setSalePoint] = useState("");
  const [codCon, setCodCon] = useState('');
  const [configurationObj, setConfigurationObj] = useState({});
  
  const [punto, setPunto] = useState(localStorage.getItem('punto'));

  void name, salePoint, codCon, configurationObj;
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
        // userInfo.filtro = filtro;
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
  }, [punto, params.query]);
  
  // 2. Cuando ya existe `punto`, hacemos el fetch de productos
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const result = await stutzApi.get(`/api/products?configuracion=${punto}`);
        const result = await stutzApi.get(`/api/products/eco?q=${params.query}`);
        console.log(result.data)
      setProducts(result.data);
      } catch (err) {
      }
    };
    
    if (punto) {
      fetchData();
    }
  }, [punto, params.query]);

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const result = await stutzApi.get(`/api/customers/byemail/${userInfo.user.email}`);
        localStorage.setItem('cliente', result.data._id);

      } catch (err) {
      }
    };
    
    if (punto) {
      fetchCliente();
    }
  }, [punto, params.query]);
  
  const guardaLocal = (conf : any) => {
        localStorage.setItem('punto', conf._id);
        localStorage.setItem('puntonum', conf.codCon);
        localStorage.setItem('nameCon', conf.name);
      };


///////////////////////


      localStorage.setItem('modulo', 'ecom');



  return (
    <ShopLayout title={'Teslo-Shop - Home'} pageDescription={'Encuentra los mejores productos de Teslo aquí'}>
    <Typography variant='h1' component='h1'>Buscar ProductoTienda</Typography>
    <Typography variant='h2' sx={{ mb: 1 }}>{searchTerm}</Typography>

    {
          !products
            ? <FullScreenLoading />
            : <ProductList products={ products } />
        }


    </ShopLayout>
)
}

