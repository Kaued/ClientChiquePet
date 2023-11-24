import { Flex } from "@chakra-ui/react";
import { Cart } from "../../components/EndCart/Cart";
import "./endCart.scss";
import { Delivery } from "../../components/EndCart/Delivirey";

export const EndCart = () => {
  return (
    <Flex className="endCart">
      <Flex className="endCart-product col-lg-7">
        <Cart />
        <Delivery />
      </Flex>

      <Flex className="endCart-confirm col-lg-5"></Flex>
    </Flex>
  );
};
