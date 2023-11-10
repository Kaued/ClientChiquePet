import { useSearchParams } from 'react-router-dom';
import { FormCategory } from '../../components/Forms/FormCategory';
import { useGetCategory } from '../../hooks/categories/useGetCategory';
import { Spinner } from '@chakra-ui/react';
import { useEditCategory } from '../../hooks/categories/useEditCategory';
import { NotFound } from '../../components/Default/NotFound';

interface CategoryData {
  name: string;
  imageUrl: string;
}

export const EditCategory = () => {
  const [search] = useSearchParams();
  const id = Number(search.get('id'));
  const { data, isLoading } = useGetCategory(id as number);
  const handleSubmit = useEditCategory(id as number);
  console.log(data);
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
      {!isLoading && data && (
        <FormCategory
          isAddMode={false}
          categoryValue={data as CategoryData}
          submit={handleSubmit}
        />
      )}

      {!data && !isLoading && <NotFound />}
    </>
  );
};
