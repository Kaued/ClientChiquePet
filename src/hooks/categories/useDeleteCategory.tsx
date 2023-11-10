import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../api/axios';
import { useAlert } from '../useAlert';
import { AxiosError } from 'axios';
import { ErrorApi } from '../../@types/ErrorApi';

export const useDeleteCategory = () => {
  const request = api();
  const toast = useAlert();
  const queryClient = useQueryClient();

  return useMutation(async (id: number) => {
    return request
      .delete(`Category/${id}`)
      .then(async (response) => {
        toast({
          status: response.status,
          mensagem: ['Categoria removida com sucesso'],
        });
        await queryClient.invalidateQueries(['categoriesAll']);
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
