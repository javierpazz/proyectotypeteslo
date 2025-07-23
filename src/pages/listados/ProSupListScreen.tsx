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
} from '@mui/material';
import { CategoryOutlined } from '@mui/icons-material';


interface Movimiento {
  supplierName: string;
  totalQuantity: number;
  totalAmount: number;
}


interface Cuenta {
  _id: string;
  clientNameCus: string;
  clientcodCus: string;
  productTotalAmount: number;
  suppliers: Movimiento[];
  productTotalQuantity: number;
}

export const ProSupListScreen = () => {

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
           const { data } = await stutzApi.get(`api/invoices/prosup/?configuracion=${codCon}&order=${order}&fech1=${fech1}&fech2=${fech2}&usuario=${codUse}&supplier=${codSup}&producto=${codPro}`, {
                headers: { Authorization: `Bearer ${userInfo.token}` },
      });
        setCuentas(data.resultado);
      } catch (err) {
      }
    };
      fetchData();
  }, []);






  const parametros = async () => {
    navigate('/admin/filtrocrm?redirect=/admin/informe/prosup');
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
                {/* <button onClick={() => exportToExcel}>📤 Exporta a Excel</button> */}
              </div>

        {/* Contenido que se imprime */}
    <Box ref={contentRef} p={3}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        8.- Productos - Proveedores a los que Compramos
      </Typography>

      {cuentas.map((product) => (
        <Box key={product._id} mb={4} mt={4}>
          <Typography variant="h6" fontWeight="medium" gutterBottom>
            {product._id}
          </Typography>

          <Table size="small" sx={{ minWidth: 650, border: '1px solid #ccc' }}>
            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Proveedor</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>---------------</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Cant. Comprada</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Importe sin IVA</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {product.suppliers.map((supplier, idx) => (
                <TableRow key={idx} hover>
                  <TableCell colSpan={2}>{supplier.supplierName}</TableCell>
                  <TableCell align="right">{supplier.totalQuantity.toFixed(2)}</TableCell>
                  <TableCell align="right">{supplier.totalAmount.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>

            <TableFooter sx={{ backgroundColor: '#f5f5f5' }}>
              <TableRow>
                <TableCell colSpan={2} sx={{ fontWeight: 'bold' }}>
                  TOTAL {product._id}
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                  {product.productTotalQuantity.toFixed(2)}
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                  ${product.productTotalAmount.toFixed(2)}
                </TableCell>
                <TableCell />
                <TableCell />
                <TableCell />
                <TableCell />
              </TableRow>
            </TableFooter>
          </Table>
        </Box>
      ))}
    </Box>
        </AdminLayoutMenuList>
      </div>
    );
  };

