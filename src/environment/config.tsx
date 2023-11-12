import { ConfigValues } from "../@types/ConfigValues";

export const Config: ConfigValues = {
  baseApiUrl: "http://localhost:5169",
  socialMidia: [
    {
      href: "https://www.instagram.com",
      window: "blank",
      text: "@chikpet",
      name: "Instagram",
    },
    {
      href: "https://www.facebook.com",
      window: "blank",
      text: "chikpet",
      name: "Facebook",
    },
    {
      href: "https://www.whatsapp.com/?lang=pt_BR",
      window: "blank",
      text: "(17) 99544-3232",
      name: "WhatsApp",
    },
  ],
  email: [
    {
      href: "https://www.whatsapp.com/?lang=pt_BR",
      name: "Contato",
      text: "chikpetcontato@chikkpet.com"
    },
  ],
};
