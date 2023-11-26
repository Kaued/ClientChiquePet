import { useParams } from "react-router-dom"
import { useGetOrder } from "../../hooks/Orders/useGetOrders";
import { Badge, Flex, Heading } from "@chakra-ui/react";
import { FaTableList } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { StautsOrderValue } from "../../@types/StatusOrderValue";
import { Config } from "../../environment/config";

export const SingleOrder = () =>{

  const {id} = useParams();
  const order = useGetOrder(Number(id));
  const [status, setStatus] = useState<StautsOrderValue>({
    color: "yellow",
    name: "Carregando",
    statusId: -1
  })
  useEffect(()=>{

    if(order.data){
      setStatus(Config.statusOrder.find((a)=>a.statusId == order.data!.statusOrder)!);
    
    }

  }, [order.data])

  return(
    <Flex className="order">
      {!order.isLoading && order.data && ( 
        <Flex className="order-content">
          <Heading><FaTableList />Pedido - {order.data.orderId}</Heading>
          <Badge colorScheme=""
        </Flex>
      )}
    </Flex>
  )
}