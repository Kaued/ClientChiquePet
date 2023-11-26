import { NavigateFunction } from "react-router-dom"
import { Order } from "../../hooks/Orders/useGetAllOrders"
import { Badge, Button, Divider, Flex, Heading, Text } from "@chakra-ui/react"
import { Config } from "../../environment/config"
import { useEffect, useState } from "react"
import { StautsOrderValue } from "../../@types/StatusOrderValue"
import "./orderItem.scss"

interface OrdemItemValue {
  data: Order,
  navigate: NavigateFunction
}

export const OrderItem = ({ data, navigate }: OrdemItemValue) => {
  const [status, setStatus] = useState<StautsOrderValue>();
  const [totalProduct, setTotalProduct] = useState(0);

  useEffect(() => {
    setStatus(Config.statusOrder.find((a) => a.statusId == data.statusOrder)!);
    data.orderProducts.forEach((product) => {
      setTotalProduct((t) => t + product.qtd);
    })
  }, [data.statusOrder]);

  console.log(status);
  return (
    <>
      <Flex className="orderItem">

        {status && (
          <Badge colorScheme={status!.color} className="orderItem-status col-lg-2 col-12">{status!.name}</Badge>
        )}

        <Flex className="orderItem-date col-lg-4 col-12">
          <Heading>{new Date(data.createDate).toLocaleDateString("pt-BR")}</Heading>
          <Text><strong>Total de produtos:</strong> {totalProduct}</Text>
        </Flex>

        <Text className="orderItem-total col-lg-4 col-12"><span>R$</span>{data.totalPrice.toFixed(2)}</Text>

        <Button colorScheme="blank" onClick={() => navigate("/pedido/" + data.orderId)} className="orderItem-button">Abri Pedido</Button>

      </Flex>
      <Divider />
    </>
  )
}