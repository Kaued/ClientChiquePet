import { StautsOrderValue } from "./StatusOrderValue";

export interface ConfigValues {
  baseApiUrl: string;
  socialMidia: {
    href: string;
    window: string;
    text: string;
    name: string;
  }[];
  email: {
    text: string;
    href: string;
    window: string;
    name: string;
  }[];
  statusOrder: StautsOrderValue[]
}
