import { useAlert } from '../useAlert';
import { api } from '../../api/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ErrorApi } from '../../@types/ErrorApi';
import { useAppSelector } from '../useAppSelector';
import { AuthState } from '../../@types/AuthState';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
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
