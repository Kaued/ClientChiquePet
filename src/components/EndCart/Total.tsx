import { Button, Divider, Flex, Heading, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import "./total.scss";
import { FaCartShopping } from "react-icons/fa6";
import { CartSlice } from "../../features/cart/cartSlice";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useEffect, useState } from "react";

export const Total = () => {
  const cartSlice: CartSlice = useAppSelector((state)=>state.cart);
  const [total, setTotal] = useState(0);

  useEffect(()=>{
    if(cartSlice.item.length>0){
      setTotal(0);
      cartSlice.item.forEach((item)=>{
        setTotal((total)=>total+(item.product.price * item.qtd));
      });
    }else{
      setTotal(0);
    }
  }, [cartSlice])
  return (
    <Flex className="total">
      <Heading className="total-title">
        Total do carrinho
      </Heading>
      <Divider />
      <Flex className="total-result">
        <TableContainer className="total-result__table">
          <Table variant='simple'>
            <Thead>
              <Tr>
                <Th colSpan={2}></Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Subtotal: </Td>
                <Td>R${total.toFixed(2)}</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>

        <Flex className="total-result__finalPrice">
          <Text>Total</Text>
          <Text>R${total.toFixed(2)}</Text>
        </Flex>
      </Flex>

      <Flex className="total-end">
        <Button colorScheme="blank">
          <FaCartShopping />Finalizar {cartSlice.isOrder ? "Encomenda" : "Compra"}
        </Button>
      </Flex>
    </Flex>
  );
}