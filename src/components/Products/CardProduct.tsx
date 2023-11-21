import { NavigateFunction } from "react-router-dom";
import { Products } from "../../hooks/products/useGetProduct";
import { FaCartShopping } from "react-icons/fa6";
import "./cardProduct.scss";
import logo from "../../images/logo.jpg";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Config } from "../../environment/config";

export const CardProduct = ({
  data,
  navigate,
}: {
  data: Products;
  navigate: NavigateFunction;
}) => {
  return (
    <Card className="cardProduct">
      <CardBody className="cardProduct-card">
        <Image
          className="cardProduct-cover"
          src={`${Config.baseApiUrl}/${data.imageUrl.find(
            (img) => img.type == "cover",
          )?.path}`}
          alt={data.name}
          loading="lazy"
        />
        <Image className="cardProduct-logo" src={logo} alt="Logo" />
        <Stack className="cardProduct-content">
          <Heading size="md">
            {data.name} <Text>{data.category.name}</Text>
          </Heading>
          {data.stock > 0 && (
            <Badge colorScheme="green" className="cardProduct-content__stock">
              Em estoque
            </Badge>
          )}
          {data.stock <= 0 && (
            <Badge colorScheme="red" className="cardProduct-content__stock">
              Sem estoque
            </Badge>
          )}
          <Text className="cardProduct-content__price">
            <span>R$</span>{data.price.toFixed(2)}
          </Text>
        </Stack>
      </CardBody>
      <CardFooter className="cardProduct-footer">
        <Button variant="solid" onClick={()=>navigate("/")}>
          <FaCartShopping /> Comprar
        </Button>
      </CardFooter>
    </Card>
  );
};
