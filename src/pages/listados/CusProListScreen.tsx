import {  useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  TableContainer,
  Paper,
} from '@mui/material';

import { CategoryOutlined } from '@mui/icons-material';
import { useReactToPrint } from 'react-to-print';


interface Movimiento {
  title: string;
  totalQuantity: number;
  totalAmount: number;
}


interface Cuenta {
  clientId: string;
  clientNameCus: string;
  clientcodCus: string;
  totalAmountClient: number;
  products: Movimiento[];
  saldoTotal: number;
}

export const CusProListScreen = () => {
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
           const { data } = await stutzApi.get(`api/invoices/cuspro/?configuracion=${codCon}&order=${order}&fech1=${fech1}&fech2=${fech2}&usuario=${codUse}&customer=${codCus}&producto=${codPro}`, {
                headers: { Authorization: `Bearer ${userInfo.token}` },
      });
        setCuentas(data.resultado);
      } catch (err) {
      }
    };
      fetchData();
  }, []);



  



  const parametros = async () => {
    navigate('/admin/filtrocrm?redirect=/admin/informe/cuspro');
  };
  const contentRef = useRef<HTMLDivElement | null>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  
  
    return (
      <div className="p-1">
    <AdminLayoutMenuList 
        title={`Clientes `} 
        subTitle={'Clientes'}
        icon={ <CategoryOutlined /> }
    >

            {/* Botón para imprimir */}
            <div className="mb-1">
                <button onClick={parametros} disabled={!(userInfo.role !== "admin")}>
                  🖨️ Ver Filtros
                </button> 
                <button onClick={reactToPrintFn}>🖨️ Print</button>
                {/* <button onClick={() => exportToExcel(cuentas)}>📤 Exporta a Excel</button> */}

              </div>

        {/* Contenido que se imprime */}
        {/* <div ref={printRef}> */}
        <Box ref={contentRef} p={3}>



            <Box p={3} fontFamily="Arial, sans-serif">
              <Typography variant="h5" fontWeight="bold" mb={4}>
                5.- Clientes - Productos Vendidos
              </Typography>

              {cuentas.map((client) => (
                <Box key={client.clientId} mb={4}>
                  <Typography fontWeight="bold" mb={1}>
                    {client.clientcodCus || 'Sin Codigo'} - {client.clientNameCus || 'Sin Nombre'}
                  </Typography>

                  <TableContainer component={Paper} elevation={1}>
                    <Table size="small" aria-label="productos vendidos">
                      <TableHead sx={{ backgroundColor: '#f3f4f6' }}>
                        <TableRow>
                          <TableCell sx={{ p: 1, border: 1 }}>Producto</TableCell>
                          <TableCell sx={{ p: 1, border: 1 }}>---------------</TableCell>
                          <TableCell sx={{ p: 1, border: 1, textAlign: 'right' }}>Cant.Vendida</TableCell>
                          <TableCell sx={{ p: 1, border: 1, textAlign: 'right' }}>Importe sin IVA</TableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {client.products.map((product, index) => (
                          <TableRow key={index} hover sx={{ '&:hover': { backgroundColor: '#f9fafb' } }}>
                            <TableCell sx={{ border: 1 }} colSpan={2}>
                              {product.title}
                            </TableCell>
                            <TableCell sx={{ border: 1, textAlign: 'right' }}>
                              {product.totalQuantity.toFixed(2)}
                            </TableCell>
                            <TableCell sx={{ border: 1, textAlign: 'right' }}>
                              {product.totalAmount.toFixed(2)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>

                      <TableFooter>
                        <TableRow sx={{ backgroundColor: '#f3f4f6', fontWeight: 'bold' }}>
                          <TableCell sx={{ border: 1 }} colSpan={3}>
                            TOTAL {client.clientNameCus}
                          </TableCell>
                          <TableCell sx={{ border: 1, textAlign: 'right' }}>
                            ${client.totalAmountClient.toFixed(2)}
                          </TableCell>
                        </TableRow>
                      </TableFooter>
                    </Table>
                  </TableContainer>
                </Box>
              ))}
            </Box>

        </Box>
        </AdminLayoutMenuList>
      </div>
    );
  };


