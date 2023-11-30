import { AxiosError } from 'axios';
import { api } from '../../api/axios';
import { useAlert } from '../useAlert';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Pagination } from '../../@types/Pagination';
import { Categories } from '../categories/useGetAllCategories';
import { ImageUrlValue } from '../../@types/ImageUrlValue';

export type Products = {
  productId: number;
  name: string;
  description: string;
  price: number;
  height: number;
  imageUrl: ImageUrlValue[];
  width: number;
  stock: number;
  dateRegistration: Date;
  categoryId: number;
  category: Categories;
};

export type FilterProduct = 'news' | 'popular';

export interface GetAllProducts {
  data: Products[];
  meta: Pagination;
}
export const useGetAllProducts = () => {
  const request = api();
  const toast = useAlert();

  return (filter?: FilterProduct) => {
    const query = useInfiniteQuery(
      ['productsAll', { filter: filter ? filter : 'all' }],
      ({ pageParam = 1 }) => fetchAllProducts(pageParam),
      {
        getNextPageParam: (lastPage) => {
          lastPage = lastPage as GetAllProducts;
          if (lastPage.meta['HasNext']) {
            return Number(lastPage.meta['CurrentPage'] + 1);
          }
        },

        refetchOnWindowFocus: false,
        staleTime: 3000,
      },
    );

    async function fetchAllProducts(page: number) {
      return await request
        .get(`/Product?pageNumber=${page}&pageSize=${20}${filter ? '&filter=' + filter : ''}`, {
          headers: { 'X-Pagination': '*' },
        })
        .then(async (response) => {
          const pagination: Pagination = JSON.parse(response.headers['x-pagination']);
          const products: Products[] = response.data;

          return {
            data: products,
            meta: pagination,
          } as GetAllProducts;
        })
        .catch((response: AxiosError) => {
          toast({
            status: response.response?.status,
            mensagem: ['Ocorreu um erro!'],
          });
        });
    }
    return query;
  };
};
