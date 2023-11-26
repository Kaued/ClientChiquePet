import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthState } from '../../@types/AuthState';
import { ErrorApi } from '../../@types/ErrorApi';
import { api } from '../../api/axios';
import { removeAllItems } from '../../features/cart/cartSlice';
import { useAlert } from '../useAlert';
import { useAppDispatch } from '../useAppDispatch';
import { useAppSelector } from '../useAppSelector';

interface Order {
  item: {
    productId: number;
    qtd: number;
  }[];
  addressId: number;
  isOrder: boolean;
  step: number;
}

export const useCreateOrder = () => {
  const request = api();
  const toast = useAlert();
  const queryClient = useQueryClient();
  const authData: AuthState = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return useMutation(async (data: Order) => {
    return request
      .post('/Order', data)
      .then(async (response) => {
        toast({
          status: response.status,
          mensagem: ['Pedido realizado com sucesso'],
        });
        await queryClient.invalidateQueries([
          ["orderAll", { email: authData.email }],
        ]);
        dispatch(removeAllItems());
        navigate("/profile");
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
