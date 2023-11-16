import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { AuthState } from '../../@types/AuthState';
import { ErrorApi } from '../../@types/ErrorApi';
import { api } from '../../api/axios';
import { useAlert } from '../useAlert';
import { useAppSelector } from '../useAppSelector';

interface Address {
  cep: string;
  street: string;
  neighborhood: string;
  city: string;
  district: string;
  number: number;
  complement?: string
}

export const useCreateAddress = () => {
  const request = api();
  const toast = useAlert();
  const queryClient = useQueryClient();
  const authData: AuthState = useAppSelector((state) => state.auth);

  return useMutation(async (data: Address) => {
    return request
      .post('/Address', data)
      .then(async (response) => {
        toast({
          status: response.status,
          mensagem: ['Endereço criado com sucesso'],
        });
        await queryClient.invalidateQueries([
          ["addressAll", { email: authData.email }],
        ]);
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
