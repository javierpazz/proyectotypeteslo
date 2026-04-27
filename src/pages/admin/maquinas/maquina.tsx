import { useContext, useEffect, useRef, useState } from 'react';
// import { GetServerSideProps } from 'next'
// import { useRouter } from 'next/router';
import {  useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { Box, Button, Grid, TextField } from '@mui/material';
import { DriveFileRenameOutline, SaveOutlined } from '@mui/icons-material';

import { AdminLayoutMenuList } from '../../../components/layouts'
import {  IMaquina  } from '../../../interfaces';
import { stutzApi } from '../../../../api';
import { AuthContext } from '../../../../context';
import { BuscaCli } from '../../../components/buscador';



interface FormData {
    _id?       : string;
    codMaq       : string;
    name       : string;
    serNum       : string;
    codCus: string | null;

}
const maquinaI: FormData = 
      {
          _id: '',
          codMaq: "",
          name: "",
          serNum: "",
          codCus: null,
     
      }


export const MaquinaAdminPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isSaving, setIsSaving] = useState(false);
  const [maquina, setMaquina] = useState<FormData>(maquinaI);
  const [codCus, setCodCus] = useState('');
  const [codCust, setCodCust] = useState('');
  const [nameCus, setNameCus] = useState('');
  const inputCusRef = useRef<HTMLInputElement>(null);
  const input1Ref = useRef<HTMLInputElement>(null);

  const params = useParams();
  const { id } = params;

  const { register, handleSubmit, formState:{ errors }, reset } = useForm<FormData>({
    defaultValues: maquina
  });

  useEffect(() => {
    inputCusRef.current?.focus();
    loadProduct();
  }, []);

  const loadProduct = async () => {
    try {
      if (id === 'new') {
        setMaquina(maquinaI);
        reset(maquinaI);
        setCodCus('');
        setCodCust('');
        setNameCus('Elija Cliente');
      } else {
        const { data } = await stutzApi.get<IMaquina>(`/api/tes/admin/maquinas/${id}`);
        const cleanData: FormData = {
          ...data,
          codCus: typeof data.codCus === 'string' ? data.codCus : data.codCus?._id || '',
        };
        setMaquina(cleanData);
        reset(cleanData);

        if (typeof data.codCus !== 'string' && data.codCus) {
          setCodCus(data.codCus._id);
          setCodCust(data.codCus.codCus || '');
          setNameCus(data.codCus.nameCus || '');
        } else {
          setCodCus('');
          setCodCust('');
          setNameCus('Elija Cliente');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (form: FormData) => {
    setIsSaving(true);
    try {
      form.codCus = codCus !== "" ? codCus : null;
      if (form._id) {
        await stutzApi.put('/api/tes/admin/maquinas', form);
      } else {
        await stutzApi.post('/api/tes/admin/maquinas', form);
      }
      navigate(`/admin/maquinas`);
    } catch (error) {
      console.log(error);
      setIsSaving(false);
    }
  };

  return (
    <AdminLayoutMenuList 
      title={'Maquina'} 
      subTitle={`Editando: ${maquina.name}`} 
      icon={<DriveFileRenameOutline />}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display='flex' justifyContent='end' sx={{ mb: 1 }}>
          <Button 
            color="secondary"
            startIcon={<SaveOutlined />}
            sx={{ width: '150px' }}
            type="submit"
            disabled={isSaving || (user?.role !== "admin")}
          >
            Guardar
          </Button>
        </Box>

        <Grid container spacing={2}>
          <BuscaCli
            codCus={codCus}
            setCodCus={setCodCus}
            codCust={codCust}
            setCodCust={setCodCust}
            nameCus={nameCus}
            setNameCus={setNameCus}
            nextRef={input1Ref}
            inputRef={inputCusRef} 
          />
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              inputRef={input1Ref}
              label="Codigo"
              variant="filled"
              fullWidth 
              sx={{ mb: 1 }}
              {...register('codMaq', {
                required: 'Este campo es requerido',
                minLength: { value: 1, message: 'Mínimo 1 caracteres' }
              })}
              error={!!errors.codMaq}
              helperText={errors.codMaq?.message}
              InputLabelProps={{shrink: true}}
            />

            <TextField
              label="Descripción"
              variant="filled"
              fullWidth 
              multiline
              sx={{ mb: 1 }}
              {...register('name', {
                required: 'Este campo es requerido',
                minLength: { value: 1, message: 'Mínimo 1 caracteres' }
              })}
              error={!!errors.name}
              helperText={errors.name?.message}
              InputLabelProps={{shrink: true}}
            />

            <TextField
              label="Numero de Serie"
              variant="filled"
              fullWidth 
              multiline
              sx={{ mb: 1 }}
              {...register('serNum', {
                minLength: { value: 1, message: 'Mínimo 1 caracteres' }
              })}
              error={!!errors.serNum}
              helperText={errors.serNum?.message}
              InputLabelProps={{shrink: true}}
            />
          </Grid>
        </Grid>
      </form>
    </AdminLayoutMenuList>
  );
};
