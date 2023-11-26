import { useInfiniteQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { AuthState } from "../../@types/AuthState";
import { Pagination } from "../../@types/Pagination";
import { api } from "../../api/axios";
import { Address } from "../address/useGetAllAddress";
import { Products } from "../products/useGetProduct";
import { useAlert } from "../useAlert";
import { useAppSelector } from "../useAppSelector";

export type Order = {
  orderId: number;
  totalPrice: number;
  createDate: Date;
  statusOrder: number;
  userId: number;
  user: {
    userName: string;
    email: string;
    phoneNumber: string;
    birthDate: Date;
  };
  address: Address;
  orderProducts: {
    qtd: number;
    product: Products;
  }[];
};

export interface GetAllOrder {
  data: Order[];
  meta: Pagination;
}

export const useGetAllOrder = () => {
  const request = api();
  const toast = useAlert();
  const authSlice: AuthState = useAppSelector((state)=>state.auth);
  const query = useInfiniteQuery(
    ["orderAll", { email: authSlice.email}],
    ({ pageParam = 1 }) => fetchAllOrder(pageParam),
    {
      getNextPageParam: (lastPage) => {
        lastPage = lastPage as GetAllOrder;
        if (lastPage.meta["HasNext"]) {
          return Number(lastPage.meta["CurrentPage"] + 1);
        }
      },

      refetchOnWindowFocus: false,
      staleTime: 3000,
    },
  );

  async function fetchAllOrder(page: number) {
    return await request
      .get(
        `/Client/orders?pageNumber=${page}&pageSize=${20}
        }`,
        {
          headers: { "X-Pagination": "*" },
        },
      )
      .then(async (response) => {
        const pagination: Pagination = JSON.parse(
          response.headers["x-pagination"],
        );
        const order: Order[] = response.data;

        return {
          data: order,
          meta: pagination,
        } as GetAllOrder;
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
