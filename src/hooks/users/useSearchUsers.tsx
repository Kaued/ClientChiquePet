import { AxiosError } from 'axios';
import { api } from '../../api/axios';
import { useAlert } from '../useAlert';

export type Users = {
  userName: string;
  email: string;
  password: string;
  phoneNumber: string;
  birthDate: Date;
};

export const useSearchUsers = () => {
  const request = api();
  const toast = useAlert();

  const response = async (search: string) => {
    return await request
      .get(`/Admin/search/${search}`)
      .then((response) => {
        return response.data as Users[];
      })
      .catch((error: AxiosError) => {
        toast({
          status: error.response?.status,
          mensagem: error.response?.data as string[],
        });
      });
  };

  return response;
};
