import {
  Button,
  Flex,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { useCreateAddress } from "../../hooks/address/useCreateAddress";
import { useDeleteAddress } from "../../hooks/address/useDeleteAddress";
import { useEditAddress } from "../../hooks/address/useEditAddress";
import { Address } from "../../hooks/address/useGetAllAddress";
import { DeleteConfirm } from "../Default/DeleteConfirm";
import { FormAddress } from "../Forms/FormAddress";
import "./adressdata.scss";

interface AddressDataProps {
  data: any;
}

interface AddressEditValues {
  address: Address;
  id: number;
}
export const AddressData = ({ data }: AddressDataProps) => {
  const createAddress = useCreateAddress();
  const editAddress = useEditAddress();
  const removeAddress = useDeleteAddress();
  const [addressEdit, setAddressEdit] = useState<AddressEditValues>();
  const [openEdit, setOpenEdit] = useState<boolean>();

  const editThisAddress = ({ address, id }: AddressEditValues) => {
    setAddressEdit({ address, id });
    setOpenEdit((open)=>!open);
  };

  return (
    <Flex className="data-address">
      <TableContainer>
        <Table variant="simple" className="data-address__table">
          <Thead>
            <Tr>
              <Th></Th>
              <Th></Th>
              <Th></Th>
              <Th></Th>
              <Th></Th>
              <Th></Th>
            </Tr>
          </Thead>
          {!!data && (
            <Tbody>
              {data?.data.map((address: Address) => {
                return (
                  <Tr key={address.addressId}>
                    <Td>
                      <FaLocationDot />
                    </Td>
                    <Td>{address.cep}</Td>
                    <Td>{address.street}</Td>
                    <Td>{address.number}</Td>
                    <Td>{address.city}</Td>
                    <Td>
                      <Flex className="data-address__actions">
                        <Button
                          colorScheme="yellow"
                          onClick={() =>
                            editThisAddress({
                              address: address,
                              id: address.addressId,
                            })
                          }
                          className="form-address__button--edit"
                        >
                          <MdEdit />
                        </Button>

                        <DeleteConfirm
                          handleDelete={removeAddress}
                          param={address.addressId}
                          text="Não será possível recuperar essa localização"
                          title="Deseja realmente excluir esse endereço"
                        />
                      </Flex>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          )}

          {!!data && data.data.length <= 0 && (
            <Tbody>
              <Tr>
                <Td colSpan={5}>
                  <Heading fontSize={"32px"} color={"#6c083d"}>
                    Não foi possível encontrar nenhum endereço
                  </Heading>
                </Td>
              </Tr>
            </Tbody>
          )}
        </Table>
      </TableContainer>
      <FormAddress isAddMode={true} submit={createAddress} />

      <FormAddress
        isAddMode={false}
        open={openEdit}
        addressValues={addressEdit?.address}
        submit={editAddress(addressEdit?.id ? addressEdit.id : 0)}
      />
    </Flex>
  );
};
