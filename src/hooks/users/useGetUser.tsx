/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query';
import { api } from '../../api/axios';
import { useAlert } from '../useAlert';
import { AxiosError } from 'axios';

export type Users = {
  userName: string;
  email: string;
  password: string;
  phoneNumber: string;
  birthDate: Date;
};

export const useGetUser = (email: string) => {
  const request = api();
  const toast = useAlert();

  const data = useQuery(['user', { email }], fetchUser);

  async function fetchUser({ queryKey }: any) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_key, { email }] = queryKey;

    return await request
      .get(`/Client/${email}`, {
        headers: { 'X-Pagination': '*' },
      })
      .then(async (response) => {
        const users: Users = response.data;

        return users;
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
