import { Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { GetAllProducts, useGetAllProducts } from '../../hooks/products/useGetAllProducts';
import { Products } from '../../hooks/products/useGetProduct';
import { ContentListProduct } from '../../components/Products/ContentListProduct';
import { HeaderListProduct } from '../../components/Products/HeaderListProduct';
import './listProduct.scss';

export const ListProduct = () => {
  const { filter } = useParams();
  const allProducts = useGetAllProducts();
  const [data, setData] = useState<Products[]>([]);
  const [hasNext, setHasNext] = useState<boolean>(false);
  const navigate = useNavigate();
  const request = filter
    ? filter == 'news' || filter == 'popular'
      ? allProducts(filter)
      : allProducts()
    : allProducts();

  useEffect(() => {
    if (request.data && !request.isLoading) {
      setData([]);

      request.data.pages.forEach((list) => {
        if (list) {
          setData((data) => [...data, ...(list as GetAllProducts).data]);
          setHasNext(list.meta.HasNext);
        }
      });
    }
  }, [request.data]);

  useEffect(() => {
    document.title = `Produtos ${filter ? (filter == 'news' ? 'Novos' : 'Populares') : ''}`;
  }, [filter]);

  return (
    <Flex className="listProduct">
      {!filter && <HeaderListProduct title="Todos os Produtos" />}
      {filter && <HeaderListProduct title="Produtos" subtitle={filter == 'news' ? 'Novos' : 'Populares'} />}
      <ContentListProduct
        data={data}
        navigate={navigate}
        fetchNextPage={request.fetchNextPage}
        hasNextPage={hasNext}
        isLoading={request.isLoading}
      />
    </Flex>
  );
};
