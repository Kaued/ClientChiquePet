import { IconButton, Spinner, Tbody, Td, Tr } from '@chakra-ui/react';
import { Users } from '../../hooks/users/useGetAllUsers';
import { FiEdit2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { DeleteConfirm } from '../Default/DeleteConfirm';
import { useDeleteUser } from '../../hooks/users/useDeleteUser';

export const UsersData = ({
  data,
  loading,
  error,
}: {
  data: Users[];
  loading: boolean;
  error: boolean;
}) => {
  const navigate = useNavigate();
  const remove = useDeleteUser();
  return (
    <Tbody scrollMarginX={'scroll'}>
      {!error && data.length > 0 && !loading && (
        <>
          {data.map((user) => (
            <Tr key={user.email}>
              <Td>{user.userName}</Td>
              <Td>{user.email}</Td>
              <Td>{user.phoneNumber}</Td>
              <Td>
                <IconButton
                  colorScheme="#fbb215"
                  aria-label="Editar"
                  bg={'#fbb215'}
                  icon={<FiEdit2 />}
                  marginRight={'5px'}
                  onClick={() => navigate(`edit?email=${user.email}`)}
                />
                <DeleteConfirm
                  title={`Deletar ${user.userName}`}
                  text={`Você realmente deseja excluir esse usuário?`}
                  handleDelete={remove}
                  param={user.email}
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
