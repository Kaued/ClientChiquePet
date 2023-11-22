import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Products } from "../../hooks/products/useGetProduct";
import { useSearchProducts } from "../../hooks/products/useSearchProducts";
import { ContentListProduct } from "../../components/Products/ContentListProduct";
import { HeaderListProduct } from "../../components/Products/HeaderListProduct";
import "./listProduct.scss";

export const ListProductSearch = () => {
  const searchProduct = useSearchProducts();
  const { search } = useParams();
  const [data, setData] = useState<Products[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const request = search ? searchProduct(search) : undefined;

  useEffect(() => {
    if (request) {
      const search = async () => {
        setLoading(true);
        const result = await request;

        if (result) {
          setData(result);
        }
        setLoading(false);
      };
      search();
    } else {
      navigate("/produtos");
    }
  }, []);

  return (
    <Flex className="listProduct">
      <HeaderListProduct title="Pesquisa:" subtitle={search} />
      <ContentListProduct
        data={data}
        navigate={navigate}
        isLoading={loading}
      />
    </Flex>
  );
};
