import { useEffect, useState } from 'react';
import {
  GetAllUsers,
  Users,
  useGetAllUsers,
} from '../../hooks/users/useGetAllUsers';
import {
  Box,
  Button,
  Flex,
  Heading,
  Table,
  TableCaption,
  TableContainer,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { SeachTable } from '../../components/Default/SearchTable';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { UsersData } from '../../components/Data/UsersData';
import { Pagination } from '../../@types/Pagination';
import { useSearchUsers } from '../../hooks/users/useSearchUsers';
import { AiOutlinePlus } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

interface FormValues {
  search: string;
}
export const TableUsers = () => {
  const { data, isLoading, fetchNextPage, isError } = useGetAllUsers();
  const [users, setUsers] = useState<Users[]>([]);
  const fetchSearch = useSearchUsers();
  const [isSearching, setSearching] = useState<boolean>(false);
  const [pagination, setPagination] = useState<Pagination>({} as Pagination);
  const navigate = useNavigate();

  const formik = useFormik<FormValues>({
    initialValues: { search: '' },
    validationSchema: Yup.object().shape({
      search: Yup.string().min(4, 'É necessário digital no mínimo 4 carctéres'),
    }),
    validateOnChange: false,
    onSubmit: async ({ search }: FormValues) => {
      setSearching(true);

      if (search !== '') {
        const result = await fetchSearch(search);

        if (result) {
          setUsers(result);
          setPagination({} as Pagination);
          setSearching(false);
        } else {
          setUsers([]);
          setSearching(false);
        }
      } else {
        const listUsers = data;
        const usersAdds: Users[] = [];
        listUsers?.pages.forEach((page) => {
          page = page as GetAllUsers;
          usersAdds.push(...page.data);

          setPagination(page.meta);
        });
        setSearching(false);
        setUsers(usersAdds);
      }
    },
  });

  useEffect(() => {
    if (!isLoading && data !== undefined) {
      const listUsers = data;
      const usersAdds: Users[] = [];
      listUsers.pages.forEach((page) => {
        page = page as GetAllUsers;
        usersAdds.push(...page.data);

        setPagination(page.meta);
      });
      setUsers(usersAdds);
    }
  }, [isLoading, data]);
  return (
    <Box className="container pt-2">
      <Flex
        width={'100%'}
        flexWrap="wrap"
        justifyContent={'space-between'}
        alignItems={'center'}
        className="mt-4"
      >
        <Heading
          fontFamily={'Lato'}
          fontSize={'36px'}
          color={'#000000'}
          fontWeight={'600'}
        >
          Listar Vendedores
        </Heading>
        <Button colorScheme="green" onClick={() => navigate('create')}>
          <Flex justifyContent={'center'} alignItems={'center'}>
            <AiOutlinePlus />
            <Text textAlign={'center'} alignItems={'center'} margin={'0 5px'}>
              Adicionar Vendedor
            </Text>
          </Flex>
        </Button>
      </Flex>
      <SeachTable formik={formik} placeholder="Digite o email" />
      <TableContainer className="mt-5" w={'100%'}>
        <Table variant={'simple'} w={'100%'}>
          <TableCaption>
            {!isLoading && !isError && !isSearching && users.length > 0 && (
              <Box>
                <Text>
                  Exibindo: {users.length}/
                  {pagination.TotalCount ? pagination.TotalCount : users.length}
                </Text>
                {pagination.HasNext && (
                  <Button onClick={() => fetchNextPage()} colorScheme="teal">
                    Carregar Mais
                  </Button>
                )}
              </Box>
            )}
            {users.length <= 0 && !isLoading && !isSearching && (
              <Box>
                <Heading fontWeight={500} marginTop={'20px'}>
                  Não foi encontrado nenhum usúario :(
                </Heading>
              </Box>
            )}
          </TableCaption>
          <Thead w={'100%'} overflowX={'scroll'}>
            <Tr>
              <Th>Nome</Th>
              <Th>Email</Th>
              <Th>Telefone</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <UsersData
            data={users}
            loading={isLoading || isSearching}
            error={isError}
          />
        </Table>
      </TableContainer>
    </Box>
  );
};
