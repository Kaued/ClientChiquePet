import { AxiosError } from "axios";
import { api } from "../../api/axios";
import { useAlert } from "../useAlert";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Pagination } from "../../@types/Pagination";
import { Products } from "../products/useGetProduct";

export type Categories = {
  categoryId: number;
  name: string;
  imageUrl: string;
  products?: Products[];
};

export interface GetAllCategoriesProducts {
  data: Categories[];
  meta: Pagination;
}
export const useGetAllCategoriesProducts = () => {
  const request = api();
  const toast = useAlert();

  return (filter: number) => {
    const query = useInfiniteQuery(
      ["categoriesAll", {id: filter}],
      ({ pageParam = 1 }) => fetchAllCategory(pageParam),
      {
        getNextPageParam: (lastPage) => {
          lastPage = lastPage as GetAllCategoriesProducts;
          if (lastPage.meta["HasNext"]) {
            return Number(lastPage.meta["CurrentPage"] + 1);
          }
        },

        refetchOnWindowFocus: false,
        staleTime: 3000,
      },
    );

    async function fetchAllCategory(page: number) {
      return await request
        .get(`/Category/${filter}/products?pageNumber=${page}&pageSize=${1}`, {
          headers: { "X-Pagination": "*" },
        })
        .then(async (response) => {
          const pagination: Pagination = JSON.parse(
            response.headers["x-pagination"],
          );
          const categories: Categories[] = response.data;
          console.log(categories);
          return {
            data: categories,
            meta: pagination,
          } as GetAllCategoriesProducts;
        })
        .catch((response: AxiosError) => {
          toast({
            status: response.response?.status,
            mensagem: ["Ocorreu um erro!"],
          });
          console.log(response);
          return "teste";
        });
    }
    return query;
  };
};
