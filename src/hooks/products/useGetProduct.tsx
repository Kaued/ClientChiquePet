/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query';
import { api } from '../../api/axios';
import { useAlert } from '../useAlert';
import { AxiosError } from 'axios';
import { ImageUrlValue } from '../../@types/ImageUrlValue';
import { Categories } from '../categories/useGetAllCategories';

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

export const useGetProduct = (name: string) => {
  const request = api();
  const toast = useAlert();

  const data = useQuery(['product', { name }], fetchUser);

  async function fetchUser({ queryKey }: any) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_key, { name }] = queryKey;

    return await request
      .get(`/Product/${name}`, {
        headers: { 'X-Pagination': '*' },
      })
      .then(async (response) => {
        const products: Products = response.data;

        return products;
      })
      .catch((response: AxiosError) => {
        toast({
          status: response.response?.status,
          mensagem: ['Ocorreu um erro!'],
        });
        return null;
      });
  }

  return data;
};
