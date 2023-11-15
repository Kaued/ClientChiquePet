import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { AuthState } from '../../@types/AuthState';
import { api } from '../../api/axios';
import { useAlert } from '../useAlert';
import { useAppSelector } from '../useAppSelector';

export type Address = {
  addressId: number,
  cep: string;
  street: string;
  neighborhood: string;
  city: string;
  district: string;
  number: number;
  complement?: string;
};

export interface GetAllAddress {
  data: Address[];
}
export const useGetAllAddress = () => {
  const request = api();
  const toast = useAlert();
  const authData: AuthState = useAppSelector((state)=>state.auth);

  const query = useQuery(["addressAll", { email: authData.email }], () =>
    fetchAllAddress(),
  );

  async function fetchAllAddress() {
    return await request
      .get(`/Client/address/${authData.email}`)
      .then(async (response) => {
        const address: Address[] = response.data;

        return {
          data: address,
        } as GetAllAddress;
      })
      .catch((response: AxiosError) => {
        toast({
          status: response.response?.status,
          mensagem: ["Ocorreu um erro!"],
        });
      });
  }
  return query;
};
