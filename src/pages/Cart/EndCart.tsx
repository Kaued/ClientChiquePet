import { Flex } from "@chakra-ui/react";
import { Cart } from "../../components/EndCart/Cart";
import { Total } from "../../components/EndCart/Total";
import "./endCart.scss";

export const EndCart = () => {
  return (
    <Flex className="endCart">
      <Flex className="endCart-product col-lg-7">
        <Cart />
      </Flex>

      <Flex className="endCart-confirm col-lg-5">
        <Total />
      </Flex>
    </Flex>
  );
};
