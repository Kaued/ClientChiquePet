import { useNavigate } from 'react-router-dom';
import { useAlert } from '../useAlert';
import { api } from '../../api/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ErrorApi } from '../../@types/ErrorApi';

interface Category {
  name: string;
  image: File[];
}

export const useEditCategory = (id: number) => {
  const request = api();
  const toast = useAlert();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation(async (data: Category) => {
    return request
      .put(`Category/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(async (response) => {
        toast({
          status: response.status,
          mensagem: ['Vendedor editado com sucesso'],
        });
        await queryClient.invalidateQueries([
          'categoriesAll',
          ['category', { id: id }],
        ]);
        navigate('/categories');
      })
      .catch(async (response: AxiosError) => {
        const errors = response.response?.data as ErrorApi[];
        const message: string[] = [];
        errors.forEach((error) => {
          message.push(error.description);
        });
        toast({ status: response.response?.status, mensagem: message });
      });
  });
};
