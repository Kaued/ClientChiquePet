import {
  Box,
  Button,
  Collapse,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  useDisclosure,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { InputDefault } from '../Default/InputDefault';
import { useEffect, useState } from 'react';
import './form.scss';
import { RiArrowGoBackLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { UseMutationResult } from '@tanstack/react-query';

interface UserData {
  userName: string;
  email: string;
  password?: string;
  phoneNumber: string;
  birthDate?: Date | string;
}

type UserSubmit = UseMutationResult<void, unknown, UserData, unknown>;

interface FormProps {
  isAddMode: boolean;
  userValue?: UserData;
  submit: UserSubmit;
}

export const FormUser = ({ isAddMode, userValue, submit }: FormProps) => {
  userValue
    ? (userValue.birthDate = new Date(userValue.birthDate!)
        .toISOString()
        .split('T')[0])
    : false;
  console.log(userValue?.birthDate);
  const title = isAddMode ? 'Registrar Vendedor' : 'Editar Vendedor';
  const initialValues: UserData = userValue
    ? userValue
    : {
        userName: '',
        email: '',
        password: '',
        phoneNumber: '',
        birthDate: '',
      };
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setLoading] = useState<boolean>();
  const { isOpen, onToggle } = useDisclosure();
  const previousDate = new Date();
  const history = useNavigate();
  const passwordValidation =
    isAddMode || isOpen
      ? Yup.string()
          .required('O campo senha é necessário')
          .test(
            'equal',
            'As senhas não são iguais',
            (val) => val == confirmPassword,
          )
          .min(6, 'A senha deve ter no mínimo 6 caracteres')
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])/,
            'Deve contêr um letra minúscula, uma maiúscula, um número e um caracter especial',
          )
      : Yup.string().notRequired();
  useEffect(() => {
    previousDate.setFullYear(previousDate.getFullYear() - 1);
  });

  const formik = useFormik<UserData>({
    initialValues: initialValues,
    validationSchema: Yup.object().shape({
      userName: Yup.string().required('O campo nome é necessário'),
      email: Yup.string()
        .email('Digite o email corretamente')
        .required('O campo email é necessário'),
      password: passwordValidation,
      phoneNumber: Yup.string().required('O campo telefone é necessário'),
      birthDate: Yup.date()
        .required('O campo data de nascimento é necessário')
        .test(
          'minAge',
          'O usuário deve ter no minímo 1 ano',
          (val: Date) => val <= previousDate,
        ),
    }),
    validateOnChange: false,
    onSubmit: async (user) => {
      setLoading(true);
      await submit.mutate(user);
      setLoading(false);
    },
  });

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
            name={'userName'}
            value={formik.values.userName}
            type={'text'}
            formik={formik}
            error={formik.errors.userName}
            required={true}
          />
        </FormControl>
        <FormControl className="mb-4">
          <FormLabel>Email</FormLabel>
          <InputDefault
            name={'email'}
            value={formik.values.email}
            type={'text'}
            formik={formik}
            error={formik.errors.email}
            required={true}
          />
        </FormControl>

        {isAddMode && (
          <Flex width={'100%'} flexWrap={'wrap'} justifyContent={'start'}>
            <Box className="col-lg-5 col-12 col-12 me-5">
              <FormControl className="mb-4">
                <FormLabel>Senha</FormLabel>
                <InputDefault
                  name={'password'}
                  value={formik.values.password}
                  type={'password'}
                  formik={formik}
                  error={formik.errors.password}
                  required={isAddMode}
                />
              </FormControl>
            </Box>
            <Box className="col-lg-5 col-12 col-12">
              <FormControl className="mb-4">
                <FormLabel>Confirmar Senha</FormLabel>
                <InputDefault
                  name={'confirmPassword'}
                  value={confirmPassword}
                  type={'password'}
                  formik={formik}
                  error={formik.errors.password}
                  required={isAddMode}
                  change={(val: Event) =>
                    setConfirmPassword((val.target as HTMLInputElement).value)
                  }
                />
              </FormControl>
            </Box>
          </Flex>
        )}
        <Flex width={'100%'} flexWrap={'wrap'} justifyContent={'start'}>
          <Box className="col-lg-5 col-12 me-5">
            <FormControl className="mb-4">
              <FormLabel>Telefone</FormLabel>
              <InputDefault
                name={'phoneNumber'}
                value={formik.values.phoneNumber}
                type={'text'}
                formik={formik}
                error={formik.errors.phoneNumber}
                required={true}
              />
            </FormControl>
          </Box>
          <Box className="col-lg-5 col-12">
            <FormControl className="mb-4">
              <FormLabel>Data de Nascimento</FormLabel>
              <InputDefault
                name={'birthDate'}
                value={formik.values.birthDate}
                type={'date'}
                formik={formik}
                error={formik.errors.birthDate}
                required={true}
              />
            </FormControl>
          </Box>
        </Flex>

        {!isAddMode && (
          <Box>
            <Button onClick={onToggle} colorScheme="teal" className="mb-3">
              {!isOpen ? 'Trocar Senha' : 'Cancelar'}
            </Button>
            <Collapse in={isOpen} animateOpacity>
              <Flex width={'100%'} flexWrap={'wrap'} justifyContent={'start'}>
                <Box className="col-lg-5 col-12 me-5">
                  <FormControl className="mb-4">
                    <FormLabel>Senha</FormLabel>
                    <InputDefault
                      name={'password'}
                      value={formik.values.password}
                      type={'password'}
                      formik={formik}
                      error={formik.errors.password}
                      required={isAddMode}
                    />
                  </FormControl>
                </Box>
                <Box className="col-lg-5 col-12">
                  <FormControl className="mb-4">
                    <FormLabel>Confirmar Senha</FormLabel>
                    <InputDefault
                      name={'confirmPassword'}
                      value={confirmPassword}
                      type={'password'}
                      formik={formik}
                      error={formik.errors.password}
                      required={isAddMode}
                      change={(val: Event) =>
                        setConfirmPassword(
                          (val.target as HTMLInputElement).value,
                        )
                      }
                    />
                  </FormControl>
                </Box>
              </Flex>
            </Collapse>
          </Box>
        )}
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
