import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GetAllProducts } from "../../hooks/products/useGetAllProducts";
import { Products } from "../../hooks/products/useGetProduct";
import { ContentListProduct } from "../../components/Products/ContentListProduct";
import { HeaderListProduct } from "../../components/Products/HeaderListProduct";
import "./listProduct.scss";
import { useGetAllCategoriesProducts } from "../../hooks/categories/useGetAllCategoriesProducts";

export const ListProductCategory = () => {
  const { filter } = useParams();
  const allProducts = useGetAllCategoriesProducts();
  const [data, setData] = useState<Products[]>([]);
  const [hasNext, setHasNext] = useState<boolean>(false);
  const navigate = useNavigate();
  const request = filter ? allProducts(filter) : undefined;
  useEffect(() => {
    if (request) {
      if (request.data && !request.isLoading) {
        setData([]);

        request.data.pages.forEach((list) => {
          if (list) {
            setData((data) => [...data, ...(list as GetAllProducts).data]);
            setHasNext(list.meta.HasNext);
          }
        });
      }
    } else {
      navigate("/produtos");
    }
  }, [request!.data]);

  return (
    <Flex className="listProduct">
      <HeaderListProduct title="Categoria:" subtitle={filter} />
      {request && (
        <ContentListProduct
          data={data}
          navigate={navigate}
          fetchNextPage={request.fetchNextPage}
          hasNextPage={hasNext}
          isLoading={request.isLoading}
        />
      )}
    </Flex>
  );
};
