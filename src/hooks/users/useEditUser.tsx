import { useNavigate } from 'react-router-dom';
import { useAlert } from '../useAlert';
import { api } from '../../api/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ErrorApi } from '../../@types/ErrorApi';

interface User {
  email: string;
  userName: string;
  password?: string;
  birthDate?: Date | string;
  phoneNumber: string;
}

export const useEditUser = (email: string) => {
  const request = api();
  const toast = useAlert();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation(async (data: User) => {
    return request
      .put(`Client/${email}`, data)
      .then(async (response) => {
        toast({
          status: response.status,
          mensagem: ['Vendedor editado com sucesso'],
        });
        await queryClient.invalidateQueries([
          'usersAll',
          ['user', { email: email }],
        ]);
        navigate('/users');
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
