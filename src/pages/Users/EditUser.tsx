import { useSearchParams } from 'react-router-dom';
import { FormUser } from '../../components/Forms/FormUser';
import { useGetUser } from '../../hooks/users/useGetUser';
import { Spinner } from '@chakra-ui/react';
import { useEditUser } from '../../hooks/users/useEditUser';
import { NotFound } from '../../components/Default/NotFound';
import { useAppSelector } from '../../hooks/useAppSelector';

interface UserData {
  userName: string;
  email: string;
  password?: string;
  phoneNumber: string;
  birthDate?: Date | string;
}

export const EditUser = ({ autoEdit = false }: { autoEdit?: boolean }) => {
  const [search] = useSearchParams();
  const userState = useAppSelector((state) => state.auth);
  const email = !autoEdit ? search.get('email') : userState.email;
  const { data, isLoading } = useGetUser(email as string);
  const handleSubmit = useEditUser(email as string);
  return (
    <>
      {isLoading && (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
          position={'absolute'}
          left={`50%`}
        />
      )}
      {!isLoading && data && <FormUser isAddMode={false} userValue={data as UserData} submit={handleSubmit} />}

      {!data && !isLoading && <NotFound />}
    </>
  );
};
