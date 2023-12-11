/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { api } from '../../api/axios';
import { Address } from '../address/useGetAllAddress';
import { Products } from '../products/useGetProduct';
import { useAlert } from '../useAlert';

export type Order = {
  orderId: number;
  totalPrice: number;
  createDate: Date;
  statusOrder: number;
  userId: number;
  user: {
    fullName: string;
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
    const [_key, { id }] = queryKey;

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
