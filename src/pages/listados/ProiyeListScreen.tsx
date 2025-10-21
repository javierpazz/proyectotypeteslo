import {  useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { stutzApi } from '../../../api';
import { AdminLayoutMenuList } from '../../components/layouts';
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableFooter,
  Divider,
} from '@mui/material';
import { CategoryOutlined } from '@mui/icons-material';


interface Movimiento {

  title: number;
  totalIngreso: number;
  totalMontoIngreso: number;
  totalEgreso: number;
  totalMontoEgreso: number;
  saldo: number;

}


interface Cuenta {
  clientId: string;
  clientNameCus: string;
  clientcodCus: string;
  productTotalAmount: number;
  products: Movimiento[];
  totalAmountClient: number;
  totalAmountClientBuy: number;
}

export const ProiyeListScreen = () => {

  const navigate = useNavigate();
  

  const userInfo = typeof window !== 'undefined' && localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo')!)
  : null;

  
  const fech1 = userInfo.filtro.firstDat;
  const fech2 = userInfo.filtro.lastDat;
  const codCon = userInfo.filtro.codCon;
  const codCus = userInfo.filtro.codCus;
  const codPro = userInfo.filtro.codPro;
  const codUse = userInfo.filtro.codUse;
  const order = userInfo.filtro.order;
  const [cuentas, setCuentas] = useState<Cuenta[]>([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
           const { data } = await stutzApi.get(`api/invoices/proiye/?configuracion=${codCon}&order=${order}&fech1=${fech1}&fech2=${fech2}&usuario=${codUse}&customer=${codCus}&producto=${codPro}`, {
                headers: { Authorization: `Bearer ${userInfo.token}` },
      });
        setCuentas(data.resultado);
      } catch (err) {
      }
    };
      fetchData();
  }, []);



  



  const parametros = async () => {
    navigate('/admin/filtrocrm?redirect=/admin/informe/proiye');
  };
  const contentRef = useRef<HTMLDivElement | null>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  return (
      <div className="p-1">
    <AdminLayoutMenuList 
        title={`Productos `} 
        subTitle={'Productos'}
        icon={ <CategoryOutlined /> }
    >


            {/* Botón para imprimir */}
            <div className="mb-1">
                <button onClick={parametros} disabled={!(userInfo.role !== "admin")}>
                  🖨️ Ver Filtros
                </button> 
                <button onClick={reactToPrintFn}>🖨️ Print</button>
                {/* <button onClick={() => exportToExcel}>📤 Exporta a Excel</button> */}
              </div>

        {/* Contenido que se imprime */}
        <Box ref={contentRef} p={3}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            9.- Productos - Ventas y Compras
          </Typography>

          <Box sx={{ padding: 2, fontFamily: 'Arial, sans-serif' }}>
            {cuentas.map((client, index) => (
              <Box key={`client.clientId-${index}`} sx={{ marginBottom: 4 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {client.clientcodCus || 'Sin Codigo'} - {client.clientNameCus || 'Sin Nombre'}
                </Typography>

                <Table size="small" sx={{ border: '1px solid #ccc' }}>
                  <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                    <TableRow>
                      <TableCell><strong>Producto</strong></TableCell>
                      <TableCell>---------------</TableCell>
                      <TableCell align="right"><strong>Cant. Vendida</strong></TableCell>
                      <TableCell align="right"><strong>Importe sin IVA</strong></TableCell>
                      <TableCell align="right"><strong>Cant. Comprada</strong></TableCell>
                      <TableCell align="right"><strong>Importe sin IVA</strong></TableCell>
                      <TableCell align="right"><strong>Ganancia</strong></TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {client.products.map((product, index) => (
                      <TableRow key={`${client.clientId}-${product.title}-${index}`} hover>
                        <TableCell colSpan={2}>{product.title}</TableCell>
                        <TableCell align="right">{product.totalIngreso.toFixed(2)}</TableCell>
                        <TableCell align="right">${product.totalMontoIngreso.toFixed(2)}</TableCell>
                        <TableCell align="right">{product.totalEgreso.toFixed(2)}</TableCell>
                        <TableCell align="right">${product.totalMontoEgreso.toFixed(2)}</TableCell>
                        <TableCell align="right">${product.saldo.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>

                  <TableFooter>
                    <TableRow sx={{ backgroundColor: '#f5f5f5', fontWeight: 'bold' }}>
                      <TableCell colSpan={3}><strong>TOTAL {client.clientNameCus}</strong></TableCell>
                      <TableCell align="right"><strong>${client.totalAmountClient.toFixed(2)}</strong></TableCell>
                      <TableCell align="right" colSpan={2}><strong>${client.totalAmountClientBuy.toFixed(2)}</strong></TableCell>
                      <TableCell align="right"><strong>${(client.totalAmountClient - client.totalAmountClientBuy).toFixed(2)}</strong></TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>

                <Divider sx={{ mt: 2, mb: 2 }} />
              </Box>
            ))}
          </Box>
        </Box>


        </AdminLayoutMenuList>      </div>
    );
  };


