import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../api/axios';
import { useAlert } from '../useAlert';
import { AxiosError } from 'axios';
import { ErrorApi } from '../../@types/ErrorApi';
import { useAppSelector } from '../useAppSelector';
import { AuthState } from '../../@types/AuthState';
import { setRefresh } from '../../features/address/addressSlice';
import { useAppDispatch } from '../useAppDispatch';

export const useDeleteAddress = () => {
  const request = api();
  const toast = useAlert();
  const queryClient = useQueryClient();
  const authData: AuthState = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  return useMutation(async (id: number) => {
    return request
      .delete(`Address/${id}`)
      .then(async (response) => {
        toast({
          status: response.status,
          mensagem: ['Endereço removido com sucesso'],
        });
        await queryClient.invalidateQueries([
          "addressAll",
          { email: authData.email },
        ]);
        dispatch(setRefresh({ refresh: true }));
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
