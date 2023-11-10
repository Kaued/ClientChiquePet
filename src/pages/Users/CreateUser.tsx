import { FormUser } from '../../components/Forms/FormUser';
import { useCreateUser } from '../../hooks/users/useCreateUser';

export const CreateUsers = () => {
  const handleSubmit = useCreateUser();
  return <FormUser isAddMode={true} submit={handleSubmit} />;
};
