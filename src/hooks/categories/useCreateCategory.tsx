import { useNavigate } from 'react-router-dom';
import { useAlert } from '../useAlert';
import { api } from '../../api/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ErrorApi } from '../../@types/ErrorApi';

interface Category {
  name: string;
  image: File;
}

export const useCreateCategory = () => {
  const request = api();
  const toast = useAlert();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation(async (data: FormData): Promise<any> => {
    return request
      .post('/Category', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(async (response) => {
        toast({
          status: response.status,
          mensagem: ['Categoria criada com sucesso'],
        });
        await queryClient.invalidateQueries(['categoriesAll']);
        console.log(response.status);
        navigate('/categories');
      })
      .catch(async (response: AxiosError) => {
        const errors = response.response?.data as ErrorApi[] | object;
        const message: string[] = [];

        if (typeof errors !== 'object') {
          (errors as ErrorApi[]).forEach((error) => {
            message.push(error.description);
          });
        }
        toast({ status: response.response?.status, mensagem: message });
      });
  });
};
