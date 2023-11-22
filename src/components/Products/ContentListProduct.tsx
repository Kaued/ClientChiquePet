import { Button, Flex, Heading, Spinner } from "@chakra-ui/react";
import { CardProduct } from "./CardProduct";
import { Products } from "../../hooks/products/useGetProduct";
import { NavigateFunction } from "react-router-dom";
import "./listProduct.scss";

export const ContentListProduct = ({
  data,
  navigate,
  fetchNextPage,
  hasNextPage,
  isLoading,
}: {
  data: Products[];
  navigate: NavigateFunction;
  hasNextPage?: boolean;
  fetchNextPage?: any;
  isLoading: boolean;
}) => {
  return (
    <Flex className="listProduct-content">
      <Flex className="listProduct-content__list">
        {data.length > 0 &&
          data.map((product) => (
            <CardProduct data={product} navigate={navigate} key={product.productId}/>
          ))}
      </Flex>

      {data && data.length<=0 && (
        <Heading className="listProduct-content__list--notFound">
          Nenhum produto foi encotrado
        </Heading>
      )}

      {isLoading && (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      )}

      {hasNextPage && fetchNextPage && (
        <Button
          onClick={() => fetchNextPage()}
          className="listProduct-showMore"
          colorScheme="blank"
        >
          Carregar Mais
        </Button>
      )}
    </Flex>
  );
};
