import { useAlert } from "../useAlert";
import { api } from "../../api/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ErrorApi } from "../../@types/ErrorApi";
import { useAppSelector } from "../useAppSelector";
import { AuthState } from "../../@types/AuthState";
import { useAppDispatch } from "../useAppDispatch";
import { setRefresh } from "../../features/address/addressSlice";

interface Address {
  id: string,
  cep: string;
  street: string;
  neighborhood: string;
  city: string;
  district: string;
  number: number;
  complement?: string;
}

export const useEditAddress = () => {
  return (id: number) => {
    const request = api();
    const toast = useAlert();
    const queryClient = useQueryClient();
    const authData: AuthState = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    return useMutation(async (data: Address) => {
      return request
        .put(`Address/${id}`, data)
        .then(async (response) => {
          toast({
            status: response.status,
            mensagem: ["Endereço editado com sucesso"],
          });
          await queryClient.invalidateQueries([
            ["addressAll", { email: authData.email }],
            ["address", { id: id }],
          ]);
          dispatch(setRefresh({ refresh: true }));
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
};
