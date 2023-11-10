import { FormCategory } from '../../components/Forms/FormCategory';
import { useCreateCategory } from '../../hooks/categories/useCreateCategory';

export const CreateCategory = () => {
  const handleSubmit = useCreateCategory();
  return <FormCategory isAddMode={true} submit={handleSubmit} />;
};
