import { useFormik } from 'formik';
import { InputDefault } from '../../Default/InputDefault';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { RegisterSlice, setStep, setUserAndEmail } from '../../../features/register/registerSlice';
import * as Yup from 'yup';
import { Button, SlideFade, Text, useDisclosure } from '@chakra-ui/react';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import './stepRegister.scss';
import { useEffect } from 'react';

interface StepOneRegister {
  userName: string;
  email: string;
}

export const StepOne = () => {
  const registerData: RegisterSlice = useAppSelector((state) => state.register);
  const dispatch = useAppDispatch();
  const { isOpen, onToggle } = useDisclosure();

  const initialState: StepOneRegister = {
    userName: registerData.userName ? registerData.userName : '',
    email: registerData.email ? registerData.email : '',
  };

  const formik = useFormik<StepOneRegister>({
    initialValues: initialState,
    validationSchema: Yup.object().shape({
      userName: Yup.string().required('O campo nome é obrigatório.').min(3, 'O nome deve ter pelo menos 3 caracteres.'),
      email: Yup.string().required('O campo email é obrigatório.').email('Verifique se o email está correto.'),
    }),
    validateOnChange: false,
    onSubmit: ({ email, userName }) => {
      dispatch(setUserAndEmail({ userName, email }));
      dispatch(setStep({ step: 1 }));
    },
  });

  useEffect(() => {
    onToggle();
  }, []);

  return (
    <SlideFade in={isOpen} offsetY="20px">
      <form className="register-form">
        <Text className="register-form__label">Nome do usuário</Text>
        <InputDefault
          name="userName"
          error={formik.errors.userName}
          type="text"
          formik={formik}
          required={true}
          value={formik.values.userName}
          classField="register-form__input"
          placeholderField="Digite o nome do usuário"
        />

        <Text className="register-form__label">Email</Text>
        <InputDefault
          name="email"
          error={formik.errors.email}
          type="email"
          formik={formik}
          required={true}
          value={formik.values.email}
          classField="register-form__input"
          placeholderField="Digite o seu email"
        />

        <Button
          colorScheme="green"
          size="md"
          variant={'solid'}
          onClick={() => formik.handleSubmit()}
          className="register-form__continue"
        >
          Continuar
        </Button>
      </form>
    </SlideFade>
  );
};
