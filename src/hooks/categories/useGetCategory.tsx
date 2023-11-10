/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query';
import { api } from '../../api/axios';
import { useAlert } from '../useAlert';
import { AxiosError } from 'axios';

export type Categories = {
  categoryId: number;
  name: string;
  imageUrl: string;
};

export const useGetCategory = (id: number) => {
  const request = api();
  const toast = useAlert();

  const data = useQuery(['category', { id }], fetchCategory);

  async function fetchCategory({ queryKey }: any) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_key, { id }] = queryKey;

    return await request
      .get(`/Category/${id}`, {
        headers: { 'X-Pagination': '*' },
      })
      .then(async (response) => {
        const categories: Categories = response.data;

        return categories;
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
