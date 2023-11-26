import {
  Button,
  Flex,
  Heading,
  SlideFade,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import {
  finishOrderSliceValue,
  setAddressOrder,
  setStepOrder,
} from "../../../features/finishOrder/finishOrderSlice";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { SelectDefault } from "../../Default/SelectDefault";
import { useGetAllAddress } from "../../../hooks/address/useGetAllAddress";
import { FormAddress } from "../../Forms/FormAddress";
import { useCreateAddress } from "../../../hooks/address/useCreateAddress";
import {
  AddressSlice,
  setRefresh,
} from "../../../features/address/addressSlice";
import "./finishStep.scss";

interface StepOneOrder {
  addressId: number;
}

export const StepOne = () => {
  const finishOrder: finishOrderSliceValue = useAppSelector(
    (state) => state.finishOrder,
  );
  const addressSlice: AddressSlice = useAppSelector((state) => state.address);

  const initialValues: StepOneOrder =
    finishOrder.addressId > 0
      ? { addressId: finishOrder.addressId }
      : { addressId: 0 };
  const dispatch = useAppDispatch();
  const createAddress = useCreateAddress();

  const address = useGetAllAddress();
  const [addressOptions, setAddressOptions] = useState<
    { value: number | string; text: string }[]
  >([
    {
      value: 0,
      text: "",
    },
  ]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const formik = useFormik<StepOneOrder>({
    initialValues: initialValues,
    validationSchema: Yup.object().shape({
      addressId: Yup.number()
        .required("Escolha um endereço")
        .min(1, "Endereço inválido"),
    }),
    onSubmit: ({ addressId }) => {
      dispatch(setAddressOrder({ addressId }));
      onClose();
      dispatch(setStepOrder({ step: 1 }));
    },
  });

  useEffect(() => {
    onOpen();
  }, []);

  useEffect(() => {
    if (addressSlice.refresh) {
      dispatch(setRefresh({ refresh: false }));
      address.refetch();
    }
  }, [addressSlice.refresh]);

  useEffect(() => {
    if (!address.isLoading && address.data) {
      setAddressOptions([
        {
          value: 0,
          text: "",
        },
      ]);
      address.data.data.forEach((item) => {
        setAddressOptions((options) => [
          ...options,
          {
            value: item.addressId,
            text: `${item.number} - ${item.street}, ${item.city} - ${item.cep}`,
          },
        ]);
      });
    }
  }, [address.data, address.isLoading]);

  return (
    <SlideFade in={isOpen} offsetY="20px">
      <Flex className="finishStep">
      <FormAddress isAddMode={true} submit={createAddress} />
        {!address.isLoading &&
          !!address.data &&
          address.data.data.length > 0 && (
            <form className="finishStep-form">
              <Text className="finishStep-form__label">Endereço</Text>
              <SelectDefault
                name={"addressId"}
                options={addressOptions}
                value={formik.values.addressId}
                formik={formik}
                error={formik.errors.addressId}
                required={true}
              />
              <Button
                colorScheme="blank"
                onClick={() => formik.handleSubmit()}
                className="finishStep-form__button"
              >
                Continuar
              </Button>
            </form>
          )}
        {address.isLoading && (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
            position={"absolute"}
            top={"50%"}
            left={"50%"}
            transform={"translate(-50%,-50%)"}
          />
        )}
        {!address.isLoading &&
          (!address.data ||
            (address.data && address.data!.data.length <= 0)) && (
            <Heading className="finishStep-notFound">
              Você ainda não adicionou nenhum endereço
            </Heading>
          )}
      </Flex>
    </SlideFade>
  );
};
