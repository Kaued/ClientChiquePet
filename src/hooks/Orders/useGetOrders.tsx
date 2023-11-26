/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query';
import { api } from '../../api/axios';
import { useAlert } from '../useAlert';
import { AxiosError } from 'axios';
import { ImageUrlValue } from '../../@types/ImageUrlValue';
import { Categories } from '../categories/useGetAllCategories';
import { Address } from '../address/useGetAllAddress';
import { Products } from '../products/useGetProduct';

export type Order = {
  orderId: number;
  totalPrice: number;
  createDate: Date;
  statusOrder: number;
  userId: number;
  user: {
    userName: string;
    email: string;
    phoneNumber: string;
    birthDate: Date;
  };
  address: Address;
  orderProducts: {
    qtd: number;
    product: Products;
  }[];
};

export const useGetOrder = (id: number) => {
  const request = api();
  const toast = useAlert();

  const data = useQuery(['order', { id }], fetchUser);

  async function fetchUser({ queryKey }: any) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_key, { name }] = queryKey;

    return await request
      .get(`/Order/${id}`, {
        headers: { 'X-Pagination': '*' },
      })
      .then(async (response) => {
        const orders: Order = response.data;

        return orders;
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
