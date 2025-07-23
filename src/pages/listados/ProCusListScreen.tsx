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
  TableContainer,
  Paper,
} from '@mui/material';
import { CategoryOutlined } from '@mui/icons-material';


interface Movimiento {
  clientName: string;
  totalQuantity: number;
  totalAmount: number;
}


interface Cuenta {
  _id: string;
  clientNameCus: string;
  clientcodCus: string;
  productTotalAmount: number;
  clients: Movimiento[];
  productTotalQuantity: number;
}

export const ProCusListScreen = () => {

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
           const { data } = await stutzApi.get(`api/invoices/procus/?configuracion=${codCon}&order=${order}&fech1=${fech1}&fech2=${fech2}&usuario=${codUse}&customer=${codCus}&producto=${codPro}`, {
                headers: { Authorization: `Bearer ${userInfo.token}` },
      });
        setCuentas(data.resultado);
      } catch (err) {
      }
    };
      fetchData();
  }, []);



  



  const parametros = async () => {
    navigate('/admin/filtrocrm?redirect=/admin/informe/procus');
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
                {/* <button onClick={() => exportToExcel}>📤 Exporta a Excel</button> */}
              </div>

        {/* Contenido que se imprime */}

            <Box ref={contentRef} p={3}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                7.- Productos - Clientes a los que Vendimos
              </Typography>

              {cuentas.map((product) => (
                <Box key={product._id} mb={4}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {product._id}
                  </Typography>

                  <TableContainer component={Paper}>
                    <Table size="small">
                      <TableHead>
                        <TableRow sx={{ backgroundColor: '#f3f4f6' }}>
                          <TableCell>Cliente</TableCell>
                          <TableCell>---------------</TableCell>
                          <TableCell align="right">Cant. Vendida</TableCell>
                          <TableCell align="right">Importe sin IVA</TableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {product.clients.map((client, idx) => (
                          <TableRow key={idx} hover>
                            <TableCell colSpan={2}>{client.clientName}</TableCell>
                            <TableCell align="right">{client.totalQuantity.toFixed(2)}</TableCell>
                            <TableCell align="right">{client.totalAmount.toFixed(2)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>

                      <TableFooter>
                        <TableRow sx={{ backgroundColor: '#f3f4f6' }}>
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
                  </TableContainer>
                </Box>
              ))}
            </Box>

        </AdminLayoutMenuList>
      </div>
    );
  };


