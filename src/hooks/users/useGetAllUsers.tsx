import { AxiosError } from 'axios';
import { api } from '../../api/axios';
import { useAlert } from '../useAlert';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Pagination } from '../../@types/Pagination';

export type Users = {
  userName: string;
  email: string;
  password: string;
  phoneNumber: string;
  birthDate: Date;
};

export interface GetAllUsers {
  data: Users[];
  meta: Pagination;
}
export const useGetAllUsers = () => {
  const request = api();
  const toast = useAlert();

  const query = useInfiniteQuery(
    ['usersAll'],
    ({ pageParam = 1 }) => fetchAllUser(pageParam),
    {
      getNextPageParam: (lastPage) => {
        lastPage = lastPage as GetAllUsers;
        if (lastPage.meta['HasNext']) {
          return Number(lastPage.meta['CurrentPage'] + 1);
        }
      },

      refetchOnWindowFocus: false,
      staleTime: 3000,
    },
  );

  async function fetchAllUser(page: number) {
    return await request
      .get(`/Admin?pageNumber=${page}&pageSize=${1}`, {
        headers: { 'X-Pagination': '*' },
      })
      .then(async (response) => {
        const pagination: Pagination = JSON.parse(
          response.headers['x-pagination'],
        );
        const users: Users[] = response.data;

        return {
          data: users,
          meta: pagination,
        } as GetAllUsers;
      })
      .catch((response: AxiosError) => {
        toast({
          status: response.response?.status,
          mensagem: ['Ocorreu um erro!'],
        });
        return 'teste';
      });
  }
  return query;
};
