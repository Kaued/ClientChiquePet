import { useToast } from '@chakra-ui/react';
import { logout } from '../features/auth/authSlice';
import { useAppDispatch } from './useAppDispatch';

type TypeStatus = 'info' | 'warning' | 'success' | 'error' | 'loading';
export const useAlert = () => {
  const toast = useToast();
  const dispacth = useAppDispatch();

  return async ({
    status,
    mensagem = [],
  }: {
    status: number | undefined;
    mensagem: string[];
  }) => {
    let type: TypeStatus = 'info';

    switch (status) {
      case 200:
      case 201:
      case 203:
      case 202:
        type = 'success';
        break;

      case 400:
        mensagem =
          mensagem.length > 0
            ? mensagem
            : ['Verifique se todos os campos estão corretos'];
        type = 'error';
        break;
      case 401:
      case 403:
        mensagem = mensagem.length > 0 ? mensagem : ['Você não tem permissão'];
        type = 'error';
        dispacth(logout());
        break;
      case 404:
        mensagem =
          mensagem.length > 0 ? mensagem : ['Requisição não encotrada'];
        type = 'error';
        break;
      case 500:
        mensagem =
          mensagem.length > 0 ? mensagem : ['Tente novamente mais tarde'];
        type = 'error';
        break;
      default:
        break;
    }

    const getTextMessage = (msg: string[]): string => {
      let finalMsg = '';
      msg.forEach((str: string | object) => {
        finalMsg += str + '\n';
      });

      return finalMsg;
    };

    toast({
      title: `${mensagem.length > 1 ? status : getTextMessage(mensagem)}`,
      position: 'top-right',
      description: `${mensagem.length > 1 ? getTextMessage(mensagem) : ''}`,
      status: `${type}`,
      duration: 3000,
      isClosable: true,
    });
  };
};
