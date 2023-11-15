import { useFormik } from 'formik';
import { InputDefault } from '../../Default/InputDefault';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { RegisterSlice, setBirthAndTermsPhoneNumber } from '../../../features/register/registerSlice';
import * as Yup from 'yup';
import { Button, Checkbox, SlideFade, Text, useDisclosure } from '@chakra-ui/react';
import './stepRegister.scss';
import { useEffect } from 'react';
import { useCreateUser } from '../../../hooks/users/useCreateUser';
import { useAppDispatch } from '../../../hooks/useAppDispatch';

interface StepTwoRegister {
  birthDate: Date | string;
  terms: boolean;
  phoneNumber: string;
}

export const StepThree = () => {
  const registerData: RegisterSlice = useAppSelector((state) => state.register);
  const dispatch = useAppDispatch();
  const { isOpen, onToggle } = useDisclosure();
  const previousDate = new Date();
  const { mutateAsync, isLoading } = useCreateUser();

  const initialState: StepTwoRegister = {
    birthDate: registerData.birthDate ? registerData.birthDate : '',
    terms: registerData.terms ? registerData.terms : false,
    phoneNumber: registerData.phoneNumber ? registerData.phoneNumber : '',
  };

  useEffect(() => {
    previousDate.setFullYear(previousDate.getFullYear() - 1);
  });

  const formik = useFormik<StepTwoRegister>({
    initialValues: initialState,
    validationSchema: Yup.object().shape({
      birthDate: Yup.date()
        .required('O campo data de nascimento é necessário')
        .test('minAge', 'O usuário deve ter no minímo 1 ano', (val: Date) => val <= previousDate),
      terms: Yup.boolean().required().isTrue(),
      phoneNumber: Yup.string().required('O campo telefone é requirido'),
    }),
    validateOnChange: false,
    onSubmit: async ({ birthDate, terms, phoneNumber }) => {
      dispatch(setBirthAndTermsPhoneNumber({ birthDate, terms, phoneNumber }));
      await mutateAsync(registerData);
    },
  });

  useEffect(() => {
    onToggle();
  }, []);

  return (
    <SlideFade in={isOpen} offsetY="20px">
      <form className="register-form">
        <Text className="register-form__label">Data de Nascimento</Text>
        <InputDefault
          name="birthDate"
          error={formik.errors.birthDate}
          type="date"
          formik={formik}
          required={true}
          value={formik.values.birthDate}
          classField="register-form__input"
          placeholderField="Digite sua data de Nascimento"
        />

        <Text className="register-form__label">Telefone</Text>
        <InputDefault
          name="phoneNumber"
          error={formik.errors.phoneNumber}
          type="string"
          formik={formik}
          required={true}
          value={formik.values.phoneNumber}
          classField="register-form__input"
          placeholderField="Digite seu telefone"
        />

        <Checkbox
          colorScheme="teal"
          defaultChecked={formik.values.terms}
          className="register-form__checkbox"
          name="terms"
          isInvalid={formik.errors.terms ? true : false}
          onChange={() => {
            formik.setFieldValue('terms', !formik.values.terms);
            console.log(formik.values.terms);
          }}
        >
          Aceito os termos de uso do aplicativo
        </Checkbox>

        <Button
          colorScheme="green"
          size="md"
          variant={'solid'}
          onClick={() => formik.handleSubmit()}
          className="register-form__continue"
          isLoading={isLoading}
        >
          Registrar
        </Button>
      </form>
    </SlideFade>
  );
};
