import { AxiosError } from 'axios';
import { api } from '../../api/axios';
import { useAlert } from '../useAlert';

export type Categories = {
  categoryId: number;
  name: string;
  imageUrl: string;
};

export const useSearchCategories = () => {
  const request = api();
  const toast = useAlert();

  const response = async (search: string) => {
    return await request
      .get(`/Category/search/${search}`)
      .then((response) => {
        return response.data as Categories[];
      })
      .catch((error: AxiosError) => {
        toast({
          status: error.response?.status,
          mensagem: error.response?.data as string[],
        });
      });
  };

  return response;
};
