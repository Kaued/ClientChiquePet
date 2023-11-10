import { useEffect, useState } from 'react';
import {
  GetAllCategories,
  Categories,
  useGetAllCategories,
} from '../../hooks/categories/useGetAllCategories';
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
import { CategoryData } from '../../components/Data/CategoryData';
import { Pagination } from '../../@types/Pagination';
import { useSearchCategories } from '../../hooks/categories/useSearchCategories';
import { AiOutlinePlus } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

interface FormValues {
  search: string;
}
export const TableCategories = () => {
  const { data, isLoading, fetchNextPage, isError } = useGetAllCategories();
  const [categories, setCategories] = useState<Categories[]>([]);
  const fetchSearch = useSearchCategories();
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
          setCategories(result);
          setPagination({} as Pagination);
          setSearching(false);
        } else {
          setCategories([]);
          setSearching(false);
        }
      } else {
        const listCategories = data;
        const categoriesAdds: Categories[] = [];
        listCategories?.pages.forEach((page) => {
          page = page as GetAllCategories;
          categoriesAdds.push(...page.data);

          setPagination(page.meta);
        });
        setSearching(false);
        setCategories(categoriesAdds);
      }
    },
  });

  useEffect(() => {
    if (!isLoading && data !== undefined) {
      const listCategories = data;
      const categoriesAdds: Categories[] = [];
      listCategories.pages.forEach((page) => {
        page = page as GetAllCategories;
        categoriesAdds.push(...page.data);

        setPagination(page.meta);
      });
      setCategories(categoriesAdds);
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
          Listar Categorias de Produto
        </Heading>
        <Button colorScheme="green" onClick={() => navigate('create')}>
          <Flex justifyContent={'center'} alignItems={'center'}>
            <AiOutlinePlus />
            <Text textAlign={'center'} alignItems={'center'} margin={'0 5px'}>
              Adicionar Categoria
            </Text>
          </Flex>
        </Button>
      </Flex>
      <SeachTable formik={formik} placeholder="Digite o email" />
      <TableContainer className="mt-5" w={'100%'}>
        <Table variant={'simple'} w={'100%'}>
          <TableCaption>
            {!isLoading &&
              !isError &&
              !isSearching &&
              categories.length > 0 && (
                <Box>
                  <Text>
                    Exibindo: {categories.length}/
                    {pagination.TotalCount
                      ? pagination.TotalCount
                      : categories.length}
                  </Text>
                  {pagination.HasNext && (
                    <Button onClick={() => fetchNextPage()} colorScheme="teal">
                      Carregar Mais
                    </Button>
                  )}
                </Box>
              )}
            {categories.length <= 0 && !isLoading && !isSearching && (
              <Box>
                <Heading fontWeight={500} marginTop={'20px'}>
                  Não foi encontrado nenhum categoria :(
                </Heading>
              </Box>
            )}
          </TableCaption>
          <Thead w={'100%'} overflowX={'scroll'}>
            <Tr>
              <Th>Nome</Th>
              <Th>Image</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <CategoryData
            data={categories}
            loading={isLoading || isSearching}
            error={isError}
          />
        </Table>
      </TableContainer>
    </Box>
  );
};
