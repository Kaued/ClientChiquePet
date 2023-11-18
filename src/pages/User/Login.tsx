import { FormControl, FormLabel, Button, FormHelperText, Flex, Box, Checkbox, Link } from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { InputDefault } from '../../components/Default/InputDefault';
import { loginAsync } from '../../features/auth/authSlice';
import { useAlert } from '../../hooks/useAlert';
import { useEffect, useRef, useState } from 'react';
import './login.scss';
import logo from '../../images/logo.jpg';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useNavigate } from 'react-router-dom';

interface FormValues {
  email: string;
  password: string;
}

const Login = () => {
  const initialValues: FormValues = {
    email: '',
    password: '',
  };
  const [show, setShow] = useState(false);
  const userState = useAppSelector((state) => state.auth);
  const dispacth = useAppDispatch();
  const alertToRef = useAlert();
  const navigate  = useNavigate();
  const alert = useRef(alertToRef).current;

  const formik = useFormik<FormValues>({
    initialValues: initialValues,
    validationSchema: Yup.object().shape({
      email: Yup.string().email('Email Inválido').required('Email é necessário'),
      password: Yup.string().required('Senha é necessária'),
    }),
    validateOnChange: false,
    onSubmit: async ({ email, password }: FormValues) => {
      try {
        dispacth(loginAsync({ email, password }));
      } catch (err) {
        console.log(err);
      }
    },
  });
  const loginInvalid = useRef(formik.setErrors);

  useEffect(() => {
    switch (userState.status) {
      case 'idle':
        alert({ status: 200, mensagem: ['Login realizado com sucesso'] });
        break;
      case 'fail':
        alert({
          status: userState.error,
          mensagem: userState.error === 400 ? ['Login inválido, tente novamente'] : [],
        });
        loginInvalid.current({
          email: 'Login inváldio',
          password: 'Login inváldio',
        });
        break;
      default:
        break;
    }
  }, [userState, alert]);

  return (
    <Flex minH={'100vh'} width={'100%'} justify="center" alignItems="center" bg={'#ffb013'}>
      <form onSubmit={formik.handleSubmit} className="login">
        <Box borderRadius="30%" className="login-cover">
          <img src={logo} alt="logo" />
        </Box>
        <FormControl>
          <FormLabel className="login-label">Email</FormLabel>
          <InputDefault
            name="email"
            value={formik.values.email}
            formik={formik}
            error={formik.errors.email}
            required={true}
            type="text"
            classField="login-input"
          />
        </FormControl>
        <FormLabel className="login-label">Senha</FormLabel>
        <FormControl>
          <InputDefault
            name="password"
            value={formik.values.password}
            formik={formik}
            error={formik.errors.password}
            required={true}
            type={show ? 'text' : 'password'}
          />

          <Checkbox
            className="login-checkbox"
            defaultChecked
            isChecked={show}
            onChange={() => {
              setShow(!show);
            }}
          >
            Mostrar senha
          </Checkbox>
          <Button colorScheme="green" type="submit" className="login-button" isLoading={userState.status === 'pedding'}>
            Login
          </Button>
          <FormHelperText>Não tem uma conta? <Link onClick={()=>navigate("/register")} color={"blue"}>Clique aqui</Link></FormHelperText>
        </FormControl>
      </form>
    </Flex>
  );
};

export default Login;
