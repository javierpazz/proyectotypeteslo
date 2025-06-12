import {  useState, useEffect, useContext, useRef } from 'react';
import {  useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  Button,
} from '@mui/material';


import { IOrder } from '../../interfaces';
import { stutzApi } from '../../../api';
import { CartContext } from '../../../context';
// import ReactToPrint from 'react-to-print';
import { useReactToPrint } from "react-to-print";


const OrderI:IOrder = {
    _id : '',
    user: '',
    orderItems: [],
    shippingAddress: {
        firstName: '',
        lastName : '',
        address  : '',
        address2 : '',
        zip      : '',
        city     : '',
        country  : '',
        phone    : '',
    },
//    paymentResult: '',

    numberOfItems: 0,
    shippingPrice : 0,
    subTotal     : 0,
    tax          : 0,
    total        : 0,
    totalBuy : 0,
    id_client : "",
    id_instru : "",
    codCon : "",
    codConNum : 0,
    codSup : '0',
    remNum : 0,
    remDat : "",
    invNum : 0,
    invDat : "",
    recNum : 0,
    recDat : "",
    desVal : "",
    notes : "",
    paymentMethod: 0,

    isPaid  : false,
    paidAt : '',
}


export const MesaEntradaCon = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';
  
  
  const [width] = useState(641);
  const [showInvoice, setShowInvoice] = useState(true);

  const userInfo = typeof window !== 'undefined' && localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo')!)
  : null;

  const config = {
    salePoint: userInfo.configurationObj.codCon,
    name: userInfo.configurationObj.name,
    cuit: userInfo.configurationObj.cuit,
    address: userInfo.configurationObj.domcomer,
    ivaCondition: userInfo.configurationObj.coniva,
    ib: userInfo.configurationObj.ib,
    feciniact: userInfo.configurationObj.feciniact,
    invoiceNumber: "",
    date: "",

  };


  const contentRef = useRef<HTMLDivElement | null>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  // const TypedReactToPrint = ReactToPrint as unknown as React.FC<any>;
  // const componentRef = useRef();
  
  
  
//  const { user } = useContext(  AuthContext );
 const [invoice, setInvoice] = useState(OrderI);
 const params = useParams();
 const { id } = params;

//  useEffect(() => {
//     if ( !user ) {
//         navigate (`/auth/login?p=/orders/${ id }`);
//     }
//     }, [])

 useEffect(() => {
    const loadProduct = async() => {
        try {
            const resp = await stutzApi.get<IOrder>(`/api/tes/orders/getorderbyid/${ id }`);
            setInvoice({
                _id: resp.data._id,
                user: resp.data.user,
                orderItems: resp.data.orderItems,
                shippingAddress: resp.data.shippingAddress,
            //    paymentResult: '',
                shippingPrice:  resp.data.shippingPrice,
                numberOfItems: resp.data.numberOfItems,
                subTotal     : resp.data.subTotal,
                tax          : resp.data.tax,
                total        : resp.data.total,
                totalBuy     : resp.data.totalBuy,
                id_client    : resp.data.id_client,
                id_instru    : resp.data.id_instru,
                codCon      : resp.data.codCon,
                codConNum       : resp.data.codConNum,
                codSup      : resp.data.codSup,
                remNum      : resp.data.remNum,
                remDat      : resp.data.remDat,
                invNum      : resp.data.invNum,
                invDat      : resp.data.invDat,
                recNum      : resp.data.recNum,
                recDat      : resp.data.recDat,
                desVal      : resp.data.desVal,
                notes       : resp.data.notes,
                paymentMethod       : resp.data.paymentMethod,
                
                isPaid  : resp.data.isPaid,
                paidAt : resp.data.paidAt
             });
        
     
        } catch (error) {
          console.log(error)
          
        }
       }
         loadProduct()
        }, [id, invoice])
  useEffect(() => {
    if (window.innerWidth < width) {
      alert('Place your phone in landscape mode for the best experience');
    }
  }, [width]);



  const clearitems = () => {
    setShowInvoice(false);
    navigate(redirect);
  };

  const actualiza = () => {
    console.log(invoice._id)
      // navigate(`/admin/entrada/${invoice._id}?redirect=/admin/entradas`);
      navigate(`/admin/mesaentradaAct/${invoice._id}`);
  };
  const valoriza = () => {
    console.log(invoice._id)
      // navigate(`/admin/entrada/${invoice._id}?redirect=/admin/entradas`);
      navigate(`/admin/mesaentradaVal/${invoice._id}`);
  };


  return (
    <>
      {/* <Helmet>
        <title>Remitos de Venta</title>
      </Helmet> */}

      {!invoice ? (
        // <LoadingBox></LoadingBox>
        <></>
      // ) : error ? (
      //   <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>

      <main>
        {!showInvoice ? (
          <>
            {/* name, address, email, phone, bank name, bank account number, website client name, client address, invoice number, Fecha Factura, Fecha Vencimiento, notes */}
            <div>

            </div>
          </>
        ) : (
          <div>


            <button onClick={reactToPrintFn}>IMPRIME</button>
            <button
             onClick={() => actualiza()}
            >ACTUALIZA
            </button>
            <button
             onClick={() => valoriza()}
            >VALORIZA
            </button>
            <button
            //  onClick={() => valoriza()}
            >EXCEL
            </button>
            <button onClick={reactToPrintFn}>BORRA ENTRADA</button>
            <button onClick={() => clearitems()}>CANCELA</button>

            {/* Invoice Preview */}

            <div ref={contentRef} className="p-5">
              
              <div className="container mt-4">
      <div className="card border-dark">
        <div className="card-header bg-dark text-white text-center"></div>
        <div className="card-body">
          
        <div className="card-header text-black text-center">REMITO</div>
        <div className="row">
            <div className="col-md-6">
              <p><strong>{userInfo.nameCon}</strong></p>
              <p><strong>Razon Social:</strong> {userInfo.nameCon}</p>
              <p><strong>Domicilio Comercial:</strong> {config.address}</p>
              <p><strong>Condición frente al IVA:</strong> {config.ivaCondition}</p>
            </div>
            <div className="col-md-6 ">
              <p><strong>ENTRADA</strong></p>
              <p><strong>Punto de Venta:</strong> {config.salePoint}    
              <strong>     Entrada. Nro:</strong> {invoice.remNum}</p>
              <p><strong>Fecha de Emision:</strong> {invoice.remDat!.substring(0, 10)}</p>
              <p><strong>CUIT:</strong> {config.cuit}</p>
              <p><strong>Ingresos Brutos:</strong> {config.ib}</p>
              <p><strong>Fecha de Inicio de Actividades:</strong> {config.feciniact}</p>
            </div>
          </div>
          <hr />
            <div className="row">
              <div className="col-md-6">
                {/* <p><strong>CUIT:</strong> {invoiceR.id_client!.cuit}</p> */}
                {/* <p><strong>Condición IVA:</strong> {invoiceR.id_client!.coniva}</p> */}
              </div>
              <div className="col-md-6">
                {/* <p><strong>Apellido y Nombre / Razon Social:</strong> {invoiceR.id_client!.nameCus}</p> */}
                {/* <p><strong>Dirección:</strong> {invoiceR.id_client!.domcomer}</p> */}
              </div>
          </div>

          </div>
          { true &&
          (
            <div>
              <table className="table table-bordered mt-3">
                <thead className="table-dark text-white">
                  <tr>
                    <th>#</th>
                    <th>Descripción</th>
                      <td> </td>
                    <th className="text-end">Terminado</th>
                      <td> </td>
                    <th className="text-end">Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.orderItems.map((item, index) => (
                    <tr key={item._id}>
                      <td>{index + 1}</td>
                      <td>{item.title}</td>
                      <td>{item.terminado}</td>
                      {item.terminado  ? <td className="text-end">Terminado</td> : <td>Pendiente</td>}                      
                      <td> </td>
                      <td className="text-end">${(item.quantity * item.price*(1+(item.porIva/100))).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="text-end">
                <h5><strong>Total:</strong> ${invoice.total.toFixed(2)}</h5>
              </div>
            </div>
          )}


      </div>
    </div>




            </div>
          </div>
        )}
      </main>

      </>
      )}


    </>
  )
}

