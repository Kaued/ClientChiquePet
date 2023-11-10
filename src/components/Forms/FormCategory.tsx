/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { InputDefault } from '../Default/InputDefault';
import { useEffect, useRef, useState } from 'react';
import './form.scss';
import { RiArrowGoBackLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { UseMutationResult } from '@tanstack/react-query';
import { DropZone } from '../Dropzone/Dropzone';
import { FilePondFile } from 'filepond';

interface CategoryData {
  id?: number;
  name: string;
  image?: File[];
  imageUrl?: string;
}

type categoriesubmit = UseMutationResult<void, unknown, FormData, unknown>;

interface FormProps {
  isAddMode: boolean;
  categoryValue?: CategoryData;
  submit: categoriesubmit;
}

export const FormCategory = ({
  isAddMode,
  categoryValue,
  submit,
}: FormProps) => {
  const title = isAddMode
    ? 'Registrar Categoria de Produto'
    : 'Editar Categoria de Produto';
  const initialValues: CategoryData = categoryValue
    ? categoryValue
    : {
        name: '',
        image: [],
      };
  const [isLoading, setLoading] = useState<boolean>();
  const history = useNavigate();
  const [files, setFiles] = useState<File[]>([]);
  const filesRef = useRef(files);
  const formik = useFormik<CategoryData>({
    initialValues: initialValues,
    validationSchema: Yup.object().shape({
      name: Yup.string().required('O campo nome é necessário'),
      image: Yup.mixed().required('O campo imagem é necessário'),
    }),
    validateOnChange: false,
    onSubmit: async (category) => {
      const data = new FormData();
      if (files) {
        data.append(`file`, files[0], files[0].name);
      }
      data.append('name', category.name);

      setLoading(true);
      await submit.mutate(data);
      setLoading(false);
    },
  });

  const handleChangeFile = (evenet: FilePondFile[]) => {
    setFiles(() => evenet.map((fileItem) => fileItem.file as File));
    formik.setFieldValue(
      'image',
      evenet.map((fileItem) => fileItem.file as File),
    );
  };

  useEffect(() => {
    if (filesRef.current.length <= 0 && !isAddMode) {
      fetch('http://localhost:5169/download/' + categoryValue?.imageUrl!).then(
        async (response) => {
          const blob = new Blob([await response.arrayBuffer()]);
          // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
          const file = new File([blob], categoryValue?.name!, {
            type: 'image/.jpg',
          });
          setFiles((files) => [...files, file]);
        },
      );
    }
  }, [filesRef, categoryValue, isAddMode]);

  return (
    <Box className="container pt-2">
      <Flex
        width={'100%'}
        flexWrap={'wrap'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Heading
          className="mt-4 mb-4"
          fontFamily={'Lato'}
          fontSize={'36px'}
          color={'#000000'}
          fontWeight={'600'}
        >
          {title}
        </Heading>
        <Button colorScheme="blue" onClick={() => history(-1)}>
          <RiArrowGoBackLine />
        </Button>
      </Flex>

      <form onSubmit={formik.handleSubmit}>
        <FormControl className="mb-4">
          <FormLabel>Nome</FormLabel>
          <InputDefault
            name={'name'}
            value={formik.values.name}
            type={'text'}
            formik={formik}
            error={formik.errors.name}
            required={true}
          />
        </FormControl>

        <FormControl className="mb-4">
          <FormLabel>Imagem</FormLabel>
          <DropZone
            files={files}
            handleFiles={handleChangeFile}
            multiple={true}
            maxFiles={1}
            label="Arraste ou clique aqui para inserir uma imagem"
            required={true}
            size={10}
            filesAccept={['image/*']}
          />
        </FormControl>
        <Button
          colorScheme="green"
          type="submit"
          className="form-button"
          isLoading={isLoading}
        >
          Salvar
        </Button>
      </form>
    </Box>
  );
};
