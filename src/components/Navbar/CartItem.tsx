import {
  Flex,
  Heading,
  IconButton,
  Image,
  MenuItem,
  Text,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { AiOutlineClose } from "react-icons/ai";
import * as Yup from "yup";
import {
  changeQtdProduct,
  removeItemCart,
} from "../../features/cart/cartSlice";
import { Products } from "../../hooks/products/useGetProduct";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { InputDefault } from "../Default/InputDefault";
import "./cart.scss";
import { Config } from "../../environment/config";

interface ItemValue {
  item: { product: Products; qtd: number };
  index: number;
}

interface QtdForm {
  qtdCart: number;
}

export const CartItem = ({ item, index }: ItemValue) => {
  const dispatch = useAppDispatch();
  const formik = useFormik<QtdForm>({
    initialValues: { qtdCart: item.qtd },
    validationSchema: Yup.object().shape({
      qtdCart: Yup.number().min(1, "A quantidade mínima de 1"),
    }),
    validateOnChange: false,
    onSubmit: ({ qtdCart }) => {
      dispatch(changeQtdProduct({ index: index, qtd: qtdCart }));
    },
  });

  const alterQtd = (e: HTMLInputElement) => {
    if (formik.values.qtdCart != item.qtd) formik.handleSubmit();
  };

  return (
    <Flex minH="48px" >
      <Flex className="cartItem">
        <Image
          src={`${Config.baseApiUrl}/${
            item.product.imageUrl.find((img) => img.type == "cover")!.path
          }`}
          alt={item.product.name}
          className="cartItem-image"
        />

        <Flex className="cartItem-content">
          <Heading className="cartItem-title">{item.product.name}</Heading>
          <Text className="cartItem-category">
            {item.product.category.name}
          </Text>
          <Text className="cartItem-price">
            <span>R$</span>
            {(item.product.price * item.qtd).toFixed(2)}
          </Text>
          <Flex className="cartItem-form">
            <InputDefault
              formik={formik}
              name="qtdCart"
              type="number"
              required={true}
              value={formik.values.qtdCart}
              error={formik.errors.qtdCart}
              blur={alterQtd}
              classField="cartItem-form__item col-lg-6"
            />
          </Flex>
        </Flex>
        <IconButton
          aria-label="Remover Produto"
          as={Flex}
          icon={<AiOutlineClose />}
          className="cartItem-remove"
          colorScheme="red"
          variant="outline"
          size="sm"
          borderRadius={"full"}
          onClick={() => dispatch(removeItemCart({ index: index }))}
        />
      </Flex>
    </Flex>
  );
};
