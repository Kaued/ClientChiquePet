import {
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
import { Address, GetAllAddress } from "../../hooks/address/useGetAllAddress";
import "./adressdata.scss";
import { FormAddress } from "../Forms/FormAddress";
import { useCreateAddress } from "../../hooks/address/useCreateAddress";
import { FaLocationDot } from "react-icons/fa6";
import { useEditAddress } from "../../hooks/address/useEditAddress";
import { useDeleteAddress } from "../../hooks/address/useDeleteAddress";
import { DeleteConfirm } from "../Default/DeleteConfirm";

interface AddressDataProps {
  data: any;
}
export const AddressData = ({data}: AddressDataProps) =>{
  const createAddress = useCreateAddress();
  const editAddress = useEditAddress();
  const removeAddress = useDeleteAddress();
  
  return (
    <Flex className="data-address">
      <TableContainer>
        <Table variant="simple" className="data-address__table">
          <Thead>
            <Tr>
              <Th></Th>
              <Th>Cep</Th>
              <Th>Rua</Th>
              <Th>Número</Th>
              <Th>Cidade</Th>
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
                        <FormAddress
                          isAddMode={false}
                          addressValues={address}
                          submit={editAddress(address.addressId)}
                        />
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

          {!data && (
            <Tbody>
              <Tr>
                <Td colSpan={5}>
                  <Heading>Não foi possível encontrar nenhum endereço</Heading>
                </Td>
              </Tr>
            </Tbody>
          )}
        </Table>
      </TableContainer>
      <FormAddress isAddMode={true} submit={createAddress} />
    </Flex>
  );
};
