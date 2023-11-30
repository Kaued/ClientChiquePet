import { useEffect } from 'react';
import { FormUser } from '../../components/Forms/FormUser';
import { useCreateUser } from '../../hooks/users/useCreateUser';

export const CreateUsers = () => {
  const handleSubmit = useCreateUser();

  useEffect(() => {
    document.title = 'Registra-se';
  }, []);

  return <FormUser isAddMode={true} submit={handleSubmit} />;
};
