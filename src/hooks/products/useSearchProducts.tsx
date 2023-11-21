import { AxiosError } from 'axios';
import { api } from '../../api/axios';
import { useAlert } from '../useAlert';
import { Categories } from '../categories/useGetAllCategories';
import { ImageUrlValue } from '../../@types/ImageUrlValue';

export type Products = {
  productId: number;
  name: string;
  description: string;
  price: number;
  height: number;
  imageUrl: ImageUrlValue[];
  width: number;
  stock: number;
  dateRegistration: Date;
  categoryId: number;
  category: Categories;
};

export const useSearchProducts = () => {
  const request = api();
  const toast = useAlert();

  const response = async (search: string) => {
    return await request
      .get(`/Product/search/${search}`)
      .then((response) => {
        return response.data as Products[];
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
