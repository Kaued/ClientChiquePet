import { useNavigate } from "react-router-dom";
import { useGetAllOrder } from "../../hooks/orders/useGetAllOrders"
import { Button, Flex, Heading } from "@chakra-ui/react";
import { OrderData } from "../../components/Data/OrderData";
import { AiOutlineRollback } from "react-icons/ai";
import { useEffect } from "react";
import "./orderList.scss";
import { FaTableList } from "react-icons/fa6";

export const OrderList = () => {
  const order = useGetAllOrder();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Perfil";
  }, []);

  return (
    <Flex className="orderList">
      <Flex className="orderList-header">
        <Heading className="orderList-header__title"><FaTableList />Meus Pedidos</Heading>
        <Button colorScheme="teal" onClick={()=>navigate(-1)}><AiOutlineRollback /></Button>
      </Flex>
      <OrderData data={order} loadMore={true} />
    </Flex>
  )
}