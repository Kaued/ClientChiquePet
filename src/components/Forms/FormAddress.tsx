import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { UseMutationResult } from "@tanstack/react-query";
import { useFormik } from "formik";
import { FaPlus } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
import * as Yup from "yup";
import { InputDefault } from "../Default/InputDefault";
import { FaRegSave } from "react-icons/fa";
import { useEffect, useState } from "react";
import { api } from "../../api/axios";
import { useAlert } from "../../hooks/useAlert";
import { SelectDefault } from "../Default/SelectDefault";
import "./form.scss";

interface AddressData {
  cep: string;
  street: string;
  neighborhood: string;
  city: string;
  district: string;
  number: number;
  complement?: string;
}

type AddressSubmit =
  | UseMutationResult<void, unknown, AddressData, unknown>
  | any;

interface FormAddressData {
  addressValues?: AddressData;
  isAddMode: boolean;
  submit: AddressSubmit;
  open?: boolean;
}

type CepQuery = {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
};

export const FormAddress = ({
  isAddMode,
  addressValues,
  submit,
  open
}: FormAddressData) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const title: string = isAddMode
    ? "Adicionar novo endereço"
    : "Alterar endereço";
  const initialValues: AddressData = {
    cep: "",
    street: "",
    neighborhood: "",
    city: "",
    district: "",
    number: 0,
    complement: "",
  };
  const formik = useFormik<AddressData>({
    initialValues: typeof addressValues === "undefined" ? initialValues : addressValues!,
    validationSchema: Yup.object().shape({
      cep: Yup.string()
        .required("O campo cep é obrigatório")
        .length(8, "O cep deve ter 8 numeros"),
      street: Yup.string().required("O campo rua é obrigatório"),
      city: Yup.string().required("O campo cidade é obrigatório"),
      district: Yup.string().required("O campo distrito é obrigatório"),
      neighborhood: Yup.string().required("O campo bairro é obrigatório"),
      number: Yup.string()
        .required("O campo número é obrigatório")
        .min(0, "Número invalido"),
      complement: Yup.string().max(125, "Máximo de 125 carácteres"),
    }),
    validateOnChange: false,
    onSubmit: async (data) => {
      await submit.mutateAsync(data);
      onClose();
    },
  });

  const toast = useAlert();
  const [isGetCep, setGetCep] = useState<boolean>();

  useEffect(() => {
    if (typeof open !== "undefined" || (typeof addressValues !== "undefined")){
      formik.setValues(addressValues!);
      onOpen();
    } 
  }, [addressValues, open]);

  const districts = [
    { value: "AC", text: "Acre" },
    { value: "AL", text: "Alagoas" },
    { value: "AP", text: "Amapá" },
    { value: "AM", text: "Amazonas" },
    { value: "BA", text: "Bahia" },
    { value: "CE", text: "Ceará" },
    { value: "DF", text: "Distrito Federal" },
    { value: "ES", text: "Espírito Santo" },
    { value: "GO", text: "Goiás" },
    { value: "MA", text: "Maranhão" },
    { value: "MT", text: "Mato Grosso" },
    { value: "MS", text: "Mato Grosso do Sul" },
    { value: "MG", text: "Minas Gerais" },
    { value: "PA", text: "Pará" },
    { value: "PB", text: "Paraíba" },
    { value: "PR", text: "Paraná" },
    { value: "PE", text: "Pernambuco" },
    { value: "PI", text: "Piauí" },
    { value: "RJ", text: "Rio de Janeiro" },
    { value: "RN", text: "Rio Grande do Norte" },
    { value: "RS", text: "Rio Grande do Sul" },
    { value: "RO", text: "Rondônia" },
    { value: "RR", text: "Roraima" },
    { value: "SC", text: "Santa Catarina" },
    { value: "SP", text: "São Paulo" },
    { value: "SE", text: "Sergipe" },
    { value: "TO", text: "Tocantins" },
  ];
  const changeCep = async () => {
    const request = api();

    setGetCep(true);
    await request
      .get(`https://viacep.com.br/ws/${formik.values.cep}/json/`)
      .then(async (response) => {
        const cepQuery: CepQuery = response.data;
        formik.setFieldValue("street", cepQuery.logradouro);
        formik.setFieldValue("city", cepQuery.localidade);
        formik.setFieldValue("district", cepQuery.uf);
        formik.setFieldValue("neighborhood", cepQuery.bairro);
        setGetCep(false);
      })

      .catch((response) => {
        toast({
          status: response.response?.status,
          mensagem: ["Ocorreu um erro!"],
        });
        setGetCep(false);
      });
  };

  useEffect(() => {}, [formik.values.cep]);

  return (
    <Flex>
      {isAddMode && (
        <Button
          colorScheme="green"
          onClick={onOpen}
          className="form-address__button"
        >
          <FaPlus /> Adicionar
        </Button>
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6} minH={"200px"}>
            {!isGetCep && (
              <Flex flexWrap={"wrap"} className="row">
                <FormControl className="mb-4 col-12">
                  <FormLabel>Cep</FormLabel>
                  <InputDefault
                    name={"cep"}
                    value={formik.values.cep}
                    type={"text"}
                    formik={formik}
                    error={formik.errors.cep}
                    required={true}
                    blur={changeCep}
                  />
                </FormControl>

                <FormControl className="mb-4 col-lg-1 col-12 pe-lg-1">
                  <FormLabel>Rua</FormLabel>
                  <InputDefault
                    name={"street"}
                    value={formik.values.street}
                    type={"text"}
                    formik={formik}
                    error={formik.errors.street}
                    required={true}
                  />
                </FormControl>

                <FormControl className="mb-4 col-lg-6 col-12">
                  <FormLabel>Número</FormLabel>
                  <InputDefault
                    name={"number"}
                    value={formik.values.number}
                    type={"text"}
                    formik={formik}
                    error={formik.errors.number}
                    required={true}
                  />
                </FormControl>

                <FormControl className="mb-4 col-12">
                  <FormLabel>Bairro</FormLabel>
                  <InputDefault
                    name={"neighborhood"}
                    value={formik.values.neighborhood}
                    type={"text"}
                    formik={formik}
                    error={formik.errors.neighborhood}
                    required={true}
                  />
                </FormControl>

                <FormControl className="mb-4 col-lg-6 col-12 pe-lg-1">
                  <FormLabel>Cidade</FormLabel>
                  <InputDefault
                    name={"city"}
                    value={formik.values.city}
                    type={"text"}
                    formik={formik}
                    error={formik.errors.city}
                    required={true}
                  />
                </FormControl>

                <FormControl className="mb-4 col-lg-6 col-12 pe-lg-1">
                  <FormLabel>Estado</FormLabel>
                  <SelectDefault
                    name={"district"}
                    options={districts}
                    value={formik.values.district}
                    formik={formik}
                    error={formik.errors.district}
                    required={true}
                  />
                </FormControl>

                <FormControl className="mb-4 col-lg-6 col-12 pe-lg-1">
                  <FormLabel>Complemento</FormLabel>
                  <InputDefault
                    name={"complement"}
                    value={formik.values.complement}
                    type={"text"}
                    formik={formik}
                    error={formik.errors.complement}
                    required={true}
                  />
                </FormControl>
              </Flex>
            )}

            {isGetCep && (
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
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={() => {
                onClose();
              }}
              colorScheme="red"
              mr={3}
              className="form-address__button--bottom"
            >
              <RxCross1 />
              Fechar
            </Button>

            <Button
              colorScheme="green"
              onClick={() => formik.handleSubmit()}
              className="form-address__button--bottom"
            >
              <FaRegSave />
              Salvar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};
