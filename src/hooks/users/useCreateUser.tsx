import { useNavigate } from 'react-router-dom';
import { useAlert } from '../useAlert';
import { api } from '../../api/axios';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ErrorApi } from '../../@types/ErrorApi';
import { useAppDispatch } from '../useAppDispatch';
import { RegisterSlice, setStep, setUserAndEmail } from '../../features/register/registerSlice';
import { useAppSelector } from '../useAppSelector';

interface User {
  email: string;
  fullName: string;
  password?: string;
  birthDate?: Date | string;
  phoneNumber: string;
}

export const useCreateUser = () => {
  const request = api();
  const toast = useAlert();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const registerData: RegisterSlice = useAppSelector((state) => state.register);

  return useMutation(async (data: User) => {
    return request
      .post('/Client', data)
      .then(async (response) => {
        toast({
          status: response.status,
          mensagem: ['Usuário criado com sucesso'],
        });
        navigate('/login');
      })
      .catch(async (response: AxiosError) => {
        const errors = response.response?.data as ErrorApi[];
        const message: string[] = [];
        errors.forEach((error) => {
          message.push(error.description);
        });
        toast({ status: response.response?.status, mensagem: message });
        errors.forEach((erro) => {
          if (erro.code === 'DuplicateEmail') {
            dispatch(setStep({ step: 0 }));
            dispatch(setUserAndEmail({ fullName: registerData.fullName, email: '' }));
          } else if (erro.code === 'DuplicateUserName') {
            dispatch(setStep({ step: 0 }));
            dispatch(setUserAndEmail({ fullName: '', email: registerData.email }));
          }
        });
      });
  });
};
