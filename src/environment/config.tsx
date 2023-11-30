import { ConfigValues } from '../@types/ConfigValues';

export const Config: ConfigValues = {
  baseApiUrl: 'http://localhost:5169',
  socialMidia: [
    {
      href: 'https://www.instagram.com',
      window: 'blank',
      text: '@chikpet',
      name: 'Instagram',
    },
    {
      href: 'https://www.facebook.com',
      window: 'blank',
      text: 'chikpet',
      name: 'Facebook',
    },
    {
      href: 'https://www.whatsapp.com/?lang=pt_BR',
      window: 'blank',
      text: '(17) 99544-3232',
      name: 'WhatsApp',
    },
  ],
  email: [
    {
      href: 'https://www.whatsapp.com/?lang=pt_BR',
      window: 'blank',
      name: 'Contato',
      text: 'chikpetcontato@chikkpet.com',
    },
  ],
  statusOrder: [
    {
      statusId: 0,
      color: 'orange',
      name: 'Pagamento Pendente',
    },
    {
      statusId: 1,
      color: 'yellow',
      name: 'Em fila',
    },
    {
      statusId: 2,
      color: 'Fazendo',
      name: 'cyan',
    },
    {
      statusId: 3,
      color: 'cyan',
      name: 'Em preparação',
    },
    {
      statusId: 4,
      color: 'purple',
      name: 'Pronto',
    },
    {
      statusId: 5,
      color: 'teal',
      name: 'Enviado',
    },
    {
      statusId: 6,
      color: 'green',
      name: 'Finalizado',
    },
    {
      statusId: 8,
      color: 'red',
      name: 'Cancelado',
    },
  ],
};
