/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query';
import { api } from '../../api/axios';
import { useAlert } from '../useAlert';
import { AxiosError } from 'axios';

export type Address = {
  addressId: number;
  cep: string;
  street: string;
  neighborhood: string;
  city: string;
  district: string;
  number: number;
  complement?: string;
};

export const useGetAddress = (id: number) => {
  const request = api();
  const toast = useAlert();

  const data = useQuery(['address', { id }], fetchAddress);

  async function fetchAddress({ queryKey }: any) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_key, { id }] = queryKey;

    return await request
      .get(`/Address/${id}`, {
        headers: { 'X-Pagination': '*' },
      })
      .then(async (response) => {
        const address: Address = response.data;

        return address;
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
