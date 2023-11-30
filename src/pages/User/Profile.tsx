import { Box, Button, Collapse, Flex, Heading, IconButton, Spinner, Text, useDisclosure } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { FaCheck, FaChevronDown, FaChevronUp, FaEdit, FaLock } from 'react-icons/fa';
import { FaLocationDot, FaTableList } from 'react-icons/fa6';
import { RxCross1 } from 'react-icons/rx';
import * as Yup from 'yup';
import { AuthState } from '../../@types/AuthState';
import { AddressData } from '../../components/Data/AddressData';
import { DeleteConfirm } from '../../components/Default/DeleteConfirm';
import { InputDefault } from '../../components/Default/InputDefault';
import { AddressSlice, setRefresh } from '../../features/address/addressSlice';
import { useGetAllAddress } from '../../hooks/address/useGetAllAddress';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useDeleteUser } from '../../hooks/users/useDeleteUser';
import { useEditUser } from '../../hooks/users/useEditUser';
import { useGetUser } from '../../hooks/users/useGetUser';
import './profile.scss';
import { OrderData } from '../../components/Data/OrderData';
import { useGetAllOrder } from '../../hooks/orders/useGetAllOrders';

interface UserData {
  email: string;
  userName: string;
  password?: string;
  birthDate?: Date | string;
  phoneNumber: string;
}

export const Profile = () => {
  const authData: AuthState = useAppSelector((state) => state.auth);
  const addressSlice: AddressSlice = useAppSelector((state) => state.address);
  const dispatch = useAppDispatch();
  const address = useGetAllAddress();
  const { isLoading, data } = useGetUser(authData.email);
  const [isEditing, setEditing] = useState(false);
  const [initialValues, setInitialValues] = useState<UserData>({
    email: '',
    phoneNumber: '',
    userName: '',
    password: '',
    birthDate: '',
  });
  const previousDate = new Date();
  const { isOpen, onToggle } = useDisclosure();
  const addressOpen = useDisclosure();
  const ordersOpen = useDisclosure();
  const orderData = useGetAllOrder();
  const [confirmPassword, setConfirmPassword] = useState('');
  const editUser = useEditUser(data?.email!);
  const passwordValidation = isOpen
    ? Yup.string()
        .required('O campo senha é necessário')
        .test('equal', 'As senhas não são iguais', (val) => val == confirmPassword)
        .min(6, 'A senha deve ter no mínimo 6 caracteres')
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])/,
          'Deve contêr um letra minúscula, uma maiúscula, um número e um caracter especial',
        )
    : Yup.string().notRequired();
  const formik = useFormik<UserData>({
    initialValues: initialValues,
    validationSchema: Yup.object().shape({
      userName: Yup.string().required('O campo nome é necessário'),
      email: Yup.string().email('Digite o email corretamente').required('O campo email é necessário'),
      password: passwordValidation,
      phoneNumber: Yup.string().required('O campo telefone é necessário'),
      birthDate: Yup.date()
        .required('O campo data de nascimento é necessário')
        .test('minAge', 'O usuário deve ter no minímo 1 ano', (val: Date) => val <= previousDate),
    }),
    validateOnChange: false,
    onSubmit: async (user) => {
      await editUser.mutate(user);
      setEditing(false);
    },
  });

  const deleteUser = useDeleteUser();

  useEffect(() => {
    document.title = 'Perfil';
    ordersOpen.onOpen();
    addressOpen.onOpen();
  }, []);

  useEffect(() => {
    previousDate.setFullYear(previousDate.getFullYear() - 1);
  });

  useEffect(() => {
    if (addressSlice.refresh) {
      address.refetch();
      dispatch(setRefresh({ refresh: false }));
    }
  }, [addressSlice.refresh]);
  useEffect(() => {
    if (data) {
      setInitialValues(data);
      formik.setValues(data);
      formik.setFieldValue('birthDate', new Date(data.birthDate).toISOString().split('T')[0]);
    }
  }, [data]);

  return (
    <Flex className="profile container-lg">
      {!isLoading && data && (
        <Flex className="profile-data">
          <Heading className="profile-data__title">
            <AiOutlineUser />
            Dados do usuário
          </Heading>

          <Flex className="row profile-data__content">
            <Flex className="profile-item col-lg-6 col-12">
              <Text className="profile-item__label">Nome:</Text>
              {!isEditing && <Text className="profile-item__label">{data.userName}</Text>}
              {isEditing && (
                <InputDefault
                  value={formik.values.userName}
                  formik={formik}
                  error={formik.errors.userName}
                  name="userName"
                  required={true}
                  type="text"
                  placeholderField="Digite o nome"
                />
              )}
            </Flex>
            <Flex className="profile-item col-lg-6 col-12">
              <Text className="profile-item__label">Email:</Text>
              {!isEditing && <Text className="profile-item__label">{data.email}</Text>}
              {isEditing && (
                <InputDefault
                  value={formik.values.email}
                  formik={formik}
                  error={formik.errors.email}
                  name="email"
                  required={true}
                  type="email"
                  placeholderField="Digite o email"
                />
              )}
            </Flex>
            <Flex className="profile-item col-lg-6 col-12">
              <Text className="profile-item__label">Data de Nascimento:</Text>
              {!isEditing && (
                <Text className="profile-item__label">{new Date(data.birthDate).toLocaleDateString('pt-br')}</Text>
              )}
              {isEditing && (
                <InputDefault
                  name={'birthDate'}
                  value={formik.values.birthDate}
                  type={'date'}
                  formik={formik}
                  error={formik.errors.birthDate}
                  required={true}
                />
              )}
            </Flex>
            <Flex className="profile-item col-lg-6 col-12">
              <Text className="profile-item__label">Telefone:</Text>
              {!isEditing && <Text className="profile-item__label">{data.phoneNumber}</Text>}
              {isEditing && (
                <InputDefault
                  value={formik.values.phoneNumber}
                  error={formik.errors.phoneNumber}
                  formik={formik}
                  name="phoneNumber"
                  required={true}
                  type="text"
                  placeholderField="Digite o telefone"
                />
              )}
            </Flex>

            {isEditing && (
              <Box>
                <Button onClick={onToggle} colorScheme="teal" className="mb-3 profile-password__button">
                  <FaLock />
                  {!isOpen ? 'Trocar Senha' : 'Cancelar'}
                </Button>
                <Collapse in={isOpen} animateOpacity>
                  <Flex width={'100%'} flexWrap={'wrap'} justifyContent={'start'} className="profile-password">
                    <Flex className="profile-item col-lg-6 col-12">
                      <Text className="profile-item__label">Senha:</Text>
                      <InputDefault
                        name={'password'}
                        value={formik.values.password}
                        type={'password'}
                        formik={formik}
                        error={formik.errors.password}
                        required={isOpen}
                      />
                    </Flex>
                    <Flex className="profile-item col-lg-6 col-12">
                      <Text className="profile-item__label">Confimar Senha:</Text>
                      <InputDefault
                        name={'confirmPassword'}
                        value={confirmPassword}
                        type={'password'}
                        formik={formik}
                        error={formik.errors.password}
                        required={isOpen}
                        change={(val: Event) => setConfirmPassword((val.target as HTMLInputElement).value)}
                      />
                    </Flex>
                  </Flex>
                </Collapse>
              </Box>
            )}
          </Flex>

          {!isEditing && (
            <Flex className="profile-data__actions">
              <Button colorScheme="yellow" onClick={() => setEditing((bef) => !bef)}>
                <FaEdit />
              </Button>

              <DeleteConfirm
                param={authData.email}
                text="Todos os dados serão perdidos"
                title="Deseja deletar o seu perfil"
                handleDelete={deleteUser}
              />
            </Flex>
          )}

          {isEditing && (
            <Flex className="profile-data__actions">
              <Button
                colorScheme="red"
                className="profile-data__form"
                onClick={() => setEditing((bef) => !bef)}
                isLoading={editUser.isLoading}
              >
                <RxCross1 />
              </Button>

              <Button colorScheme="green" onClick={() => formik.handleSubmit()} isLoading={editUser.isLoading}>
                <FaCheck />
              </Button>
            </Flex>
          )}

          {!isEditing && (
            <>
              <Flex className="profile-address mt-5">
                <Flex className="profile-address__title" onClick={() => addressOpen.onToggle()}>
                  <FaLocationDot />
                  <Heading>Endereços</Heading>
                  <IconButton
                    colorScheme="whiteAlpha"
                    color={'#6c083d'}
                    aria-label="Abrir endereços"
                    className="ms-auto"
                    icon={addressOpen.isOpen ? <FaChevronUp /> : <FaChevronDown />}
                  />
                </Flex>
                <Collapse in={addressOpen.isOpen} animateOpacity>
                  <AddressData data={address.data} />
                </Collapse>
              </Flex>

              <Flex className="profile-orders mt-5">
                <Flex className="profile-orders__title" onClick={() => ordersOpen.onToggle()}>
                  <FaTableList />
                  <Heading>Pedidos</Heading>
                  <IconButton
                    colorScheme="whiteAlpha"
                    color={'#6c083d'}
                    aria-label="Abrir endereços"
                    className="ms-auto"
                    icon={ordersOpen.isOpen ? <FaChevronUp /> : <FaChevronDown />}
                  />
                </Flex>

                <Collapse in={ordersOpen.isOpen} animateOpacity>
                  <OrderData data={orderData} loadMore={false} />
                </Collapse>
              </Flex>
            </>
          )}
        </Flex>
      )}

      {isLoading && (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
          position={'absolute'}
          top={'50%'}
          left={'50%'}
          transform={'translate(-50%,-50%)'}
        />
      )}
    </Flex>
  );
};
