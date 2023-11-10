import { IconButton, Spinner, Tbody, Td, Tr } from '@chakra-ui/react';
import { Categories } from '../../hooks/categories/useGetAllCategories';
import { FiEdit2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { DeleteConfirm } from '../Default/DeleteConfirm';
import { useDeleteCategory } from '../../hooks/categories/useDeleteCategory';
import { ImageData } from '../Default/ImageData';

export const CategoryData = ({
  data,
  loading,
  error,
}: {
  data: Categories[];
  loading: boolean;
  error: boolean;
}) => {
  const navigate = useNavigate();
  const remove = useDeleteCategory();
  return (
    <Tbody scrollMarginX={'scroll'}>
      {!error && data.length > 0 && !loading && (
        <>
          {data.map((category) => (
            <Tr key={category.name}>
              <Td>{category.name}</Td>
              <Td>
                <ImageData src={category.imageUrl} />
              </Td>
              <Td>
                <IconButton
                  colorScheme="#fbb215"
                  aria-label="Editar"
                  bg={'#fbb215'}
                  icon={<FiEdit2 />}
                  marginRight={'5px'}
                  onClick={() => navigate(`edit?id=${category.categoryId}`)}
                />
                <DeleteConfirm
                  title={`Deletar ${category.name}`}
                  text={`Você realmente deseja excluir esse usuário?`}
                  handleDelete={remove}
                  param={category.categoryId}
                />
              </Td>
            </Tr>
          ))}
        </>
      )}
      {loading && (
        <Tr>
          <Td colSpan={5}>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
              position={'absolute'}
              left={`50%`}
            />
          </Td>
        </Tr>
      )}
    </Tbody>
  );
};
