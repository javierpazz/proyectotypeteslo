
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
  Paper,
  TableContainer,
} from '@mui/material';

import { CategoryOutlined } from '@mui/icons-material';
import { useReactToPrint } from 'react-to-print';


interface Movimiento {
  title: string;
  totalQuantity: number;
  totalAmount: number;
}


interface Cuenta {
  supplierId: string;
  suppliercodSup: string;
  supplierName: string;
  clientcodCus: string;
  totalAmountClient: number;
  products: Movimiento[];
  totalAmountSupplier: number;
}

export const SupProListScreen = () => {

  const navigate = useNavigate();

  const userInfo = typeof window !== 'undefined' && localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo')!)
  : null;


  
  const fech1 = userInfo.filtro.firstDat;
  const fech2 = userInfo.filtro.lastDat;
  const codCon = userInfo.filtro.codCon;
  const codSup = userInfo.filtro.codSup;
  const codPro = userInfo.filtro.codPro;
  const codUse = userInfo.filtro.codUse;
  const order = userInfo.filtro.order;
  const [cuentas, setCuentas] = useState<Cuenta[]>([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
           const { data } = await stutzApi.get(`api/invoices/suppro/?configuracion=${codCon}&order=${order}&fech1=${fech1}&fech2=${fech2}&usuario=${codUse}&supplier=${codSup}&producto=${codPro}`, {
                headers: { Authorization: `Bearer ${userInfo.token}` },
      });
        setCuentas(data.resultado);
      } catch (err) {
      }
    };
      fetchData();
  }, []);






  const parametros = async () => {
    navigate('/admin/filtrocrm?redirect=/admin/informe/suppro');
  };
  
  const contentRef = useRef<HTMLDivElement | null>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
    
    return (
      <div className="p-1">
        <AdminLayoutMenuList 
            title={`Proveedores `} 
            subTitle={'Proveedores'}
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

            <Box ref={contentRef} p={3}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                6.- Proveedores - Productos Comprados
              </Typography>

              <Box sx={{ fontFamily: 'Arial, sans-serif' }}>
                {cuentas.map((supplier) => (
                  <Box key={supplier.supplierId} mb={4}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {supplier.suppliercodSup || 'Sin Codigo'} - {supplier.supplierName || 'Sin Nombre'} - Total Comprado ${supplier.totalAmountSupplier.toFixed(2)}
                    </Typography>

                    <TableContainer component={Paper}>
                      <Table size="small">
                        <TableHead>
                          <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                            <TableCell>Producto</TableCell>
                            <TableCell>---------------</TableCell>
                            <TableCell align="right">Cant. Comprada</TableCell>
                            <TableCell align="right">Importe sin IVA</TableCell>
                          </TableRow>
                        </TableHead>

                        <TableBody>
                          {supplier.products.map((product, index) => (
                            <TableRow key={index} hover>
                              <TableCell colSpan={2}>{product.title}</TableCell>
                              <TableCell align="right">{product.totalQuantity.toFixed(2)}</TableCell>
                              <TableCell align="right">{product.totalAmount.toFixed(2)}</TableCell>
                              <TableCell />
                              <TableCell />
                              <TableCell />
                              <TableCell />
                            </TableRow>
                          ))}
                        </TableBody>

                        <TableFooter>
                          <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                            <TableCell colSpan={3} sx={{ fontWeight: 'bold' }}>
                              TOTAL {supplier.supplierName}
                            </TableCell>
                            <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                              ${supplier.totalAmountSupplier.toFixed(2)}
                            </TableCell>
                            <TableCell />
                            <TableCell />
                            <TableCell />
                            <TableCell />
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


