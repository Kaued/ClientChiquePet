import { api } from "../../api/axios";
import { useAlert } from "../useAlert";

export interface RequestPriceDelivery {
  address: {
    nCdEmpresa: string;
    sDsSenha: string;
    nCdServico: string;
    sCepOrigem: string;
    sCepDestino: string;
    nVlPeso: number;
    nCdFormato: number;
    nVlComprimento: number;
    nVlAltura: number;
    nVlLargura: number;
    nVlDiametro: number;
    sCdMaoPropria: number;
    nVlValorDeclarado: number;
    sCdAvisoRecebimento: string;
  };
}

export const useGetPrice = ({ address }: RequestPriceDelivery) => {
  const request = api();
  const toast = useAlert();

 
};
