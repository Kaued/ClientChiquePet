import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../api/axios';
import { useAlert } from '../useAlert';
import { AxiosError } from 'axios';
import { ErrorApi } from '../../@types/ErrorApi';

export const useDeleteUser = () => {
  const request = api();
  const toast = useAlert();
  const queryClient = useQueryClient();

  return useMutation(async (email: string) => {
    return request
      .delete(`Admin/${email}`)
      .then(async (response) => {
        toast({
          status: response.status,
          mensagem: ['Usuário removido com sucesso'],
        });
        await queryClient.invalidateQueries(['usersAll']);
      })
      .catch((response: AxiosError) => {
        const errors = response.response?.data as ErrorApi[];
        const message: string[] = [];
        errors.forEach((error) => {
          message.push(error.description);
        });
        toast({ status: response.response?.status, mensagem: message });
      });
  });
};
