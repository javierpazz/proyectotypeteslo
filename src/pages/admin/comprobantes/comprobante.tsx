import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Box,
  Button,
  Grid,
  TextField
} from '@mui/material';
import { DriveFileRenameOutline, SaveOutlined } from '@mui/icons-material';

import { AdminLayoutMenuList } from '../../../components/layouts';
import { IComprobante } from '../../../interfaces';
import { stutzApi } from '../../../../api';
import { AuthContext } from '../../../../context';

interface FormData {
  _id: string;
  codCom: string;
  nameCom: string;
  isHaber: boolean;
  noDisc: boolean;
  toDisc: boolean;
  itDisc: boolean;
  interno: boolean;
  numInt: number;
  codCon: string;
}

const comprobanteInicial: FormData = {
  _id: '',
  codCom: '',
  nameCom: '',
  isHaber: true,
  noDisc: true,
  toDisc: false,
  itDisc: false,
  interno: true,
  numInt: 0,
  codCon: "",
};

export const ComprobanteAdminPage = () => {
  const { user, isLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;

  const input1Ref = useRef<HTMLInputElement>(null);
  const [isSaving, setIsSaving] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: comprobanteInicial,
  });


  // Redirigir si no hay usuario
  useEffect(() => {
    if (!user && !isLoading) {
      navigate('/auth/loginadm?redirect=/admin/comprobantes');
    }
        if (user?.role === "client" ) {
        navigate('/');
        }
  }, [user, isLoading, navigate]);
  
    const userInfo = typeof window !== 'undefined' && localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo')!)
    : null;

  useEffect(() => {
    input1Ref.current?.focus();
    loadProduct();
  }, []);

  const loadProduct = async () => {
    try {
      let data: FormData;

      if (id === 'new') {
        data = { ...comprobanteInicial };
      } else {
        const resp = await stutzApi.get<IComprobante>(`/api/tes/admin/comprobantes/${id}`);
        data = resp.data;
      }
      reset(data);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (form: FormData) => {
    setIsSaving(true);
    try {
    
      form.codCon = userInfo.codCon;
  
      if (form._id) {
        await stutzApi.put('/api/tes/admin/comprobantes', form);
      } else {
        await stutzApi.post('/api/tes/admin/comprobantes', form);
      }
      navigate('/admin/comprobantes');
    } catch (error) {
      console.log(error);
      setIsSaving(false);
    }
  };

  return (
    <AdminLayoutMenuList
      title={'Comprobante'}
      subTitle={`Editando`}
      icon={<DriveFileRenameOutline />}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display='flex' justifyContent='end' sx={{ mb: 1 }}>
          <Button
            color='secondary'
            startIcon={<SaveOutlined />}
            sx={{ width: '150px' }}
            type='submit'
            disabled={isSaving}
          >
            Guardar
          </Button>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              inputRef={input1Ref}
              label='Código'
              variant='filled'
              fullWidth
              sx={{ mb: 1 }}
              {...register('codCom', {
                required: 'Este campo es requerido',
                minLength: { value: 1, message: 'Mínimo 1 carácter' },
              })}
              error={!!errors.codCom}
              helperText={errors.codCom?.message}
            />

            <TextField
              label='Descripción'
              variant='filled'
              fullWidth
              multiline
              sx={{ mb: 1 }}
              {...register('nameCom', {
                required: 'Este campo es requerido',
                minLength: { value: 1, message: 'Mínimo 1 carácter' },
              })}
              error={!!errors.nameCom}
              helperText={errors.nameCom?.message}
            />

            <FormGroup>
              <Controller
                name='isHaber'
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} checked={field.value} />}
                    label='Imputa en Cuenta Haber'
                  />
                )}
              />
              <Controller
                name='noDisc'
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} checked={field.value} />}
                    label='No Discrimina IVA'
                  />
                )}
              />
              <Controller
                name='itDisc'
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} checked={field.value} />}
                    label='Discrimina IVA en Item'
                  />
                )}
              />
              <Controller
                name='toDisc'
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} checked={field.value} />}
                    label='Discrimina IVA en Total'
                  />
                )}
              />
              <Controller
                name='interno'
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} checked={field.value} />}
                    label='Comprobante Interno'
                  />
                )}
              />
            </FormGroup>

            <TextField
              label='Nro Último Comprobante'
              type='number'
              variant='filled'
              fullWidth
              sx={{ mb: 1 }}
              {...register('numInt')}
              error={!!errors.numInt}
              helperText={errors.numInt?.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>{/* Aquí podés agregar más cosas si querés */}</Grid>
        </Grid>
      </form>
    </AdminLayoutMenuList>
  );
};
