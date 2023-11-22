import { Button, Card, CardBody, CardHeader, Divider, Flex, Heading, Spinner, Stack, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { useFormik } from "formik";
import { FaCartShopping } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import { InputDefault } from "../../components/Default/InputDefault";
import { ImagesProductSlide } from "../../components/Products/ImagesProductSlide";
import { useGetProduct } from "../../hooks/products/useGetProduct";
import "./singleProduct.scss";
import parse from 'html-react-parser';
import { useGetAllCategoriesProducts } from "../../hooks/categories/useGetAllCategoriesProducts";
import { useEffect, useState } from "react";
import { SlideProduct } from "../../components/Products/SlideProducts";

export const SingleProduct = () => {
  const { productParam } = useParams();
  const product = useGetProduct(productParam ? productParam : "");
  const sameProductsSearch = useGetAllCategoriesProducts();
  const [categoryName, setCategoryName] = useState("nada");
  const sameProducts = sameProductsSearch(categoryName);

  const formkik = useFormik<{ qtd: number }>({
    initialValues: {
      qtd: 0
    },
    validationSchema: Yup.object().shape({
      name: Yup.number().required("Selecione a quantidade").min(0, "Mínimo de 1 produto")
    }),
    validateOnChange: false,
    onSubmit: ({ qtd }) => {
      if (product.data) {
        console.log(qtd)
      }
    }
  });

  useEffect(() => {
    if (product.data && !product.isLoading) {
      setCategoryName(product.data.category.name);
    }
  })
  return (
    <Flex className="product">
      {product.data && !product.isLoading && (
        <>
          <Flex className="product-image col-lg-5 col-12">
            <ImagesProductSlide images={product.data?.imageUrl} />
          </Flex>

          <Flex className="product-content col-lg-7  col-12">
            <Heading className="product-content__title">{product.data.name}</Heading>
            <Text className="product-content__subtitle">{product.data.category.name}</Text>

            <TableContainer className="product-content__table">
              <Table variant='simple'>
                <Thead>
                  <Tr>
                    <Th colSpan={2}>Dados do produto</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>Largura (cm)</Td>
                    <Td>{product.data.width.toFixed(2)}</Td>
                  </Tr>
                  <Tr>
                    <Td>Altura (cm)</Td>
                    <Td>{product.data.height.toFixed(2)}</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>

            <Text className="product-content__price">
              <span>R$</span>
              {product.data.price.toFixed(2)}
            </Text>

            <Flex className="product-content__form">
              <Text>Qtd:</Text>
              <InputDefault
                formik={formkik}
                name="qtd"
                required={true}
                type="number"
                value={formkik.values.qtd}
                error={formkik.errors.qtd}
                classField="product-form__input"
              />
            </Flex>

            <Button className="product-content__button" colorScheme="blank" onClick={() => formkik.handleSubmit()}>
              <FaCartShopping />Comprar
            </Button>

          </Flex>

          <Card className="product-description col-12">
            <CardHeader>
              <Heading className="product-description__title">Descrição</Heading>
              <Divider />
            </CardHeader>
            <CardBody>
              <Stack>
                {parse(product.data.description)}
              </Stack>
            </CardBody>
          </Card>

          <SlideProduct query={sameProducts} title="Recomendado" link={"produtos/" + categoryName} />
        </>


      )}

      {product.isLoading && (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
          className="product-load"
        />
      )}
    </Flex>
  )
}