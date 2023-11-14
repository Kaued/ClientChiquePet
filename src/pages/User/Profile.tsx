import { Button, Flex, Heading, Spinner, Text } from "@chakra-ui/react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useGetUser } from "../../hooks/users/useGetUser"
import { AuthState } from "../../@types/AuthState";
import { FaEdit  } from "react-icons/fa";
import "./profile.scss";
import { AiOutlineUser } from "react-icons/ai";
import { useEffect } from "react";
import { DeleteConfirm } from "../../components/Default/DeleteConfirm";
import { useDeleteUser } from "../../hooks/users/useDeleteUser";

export const Profile = () => {
  const authData: AuthState = useAppSelector((state) => state.auth);
  const { isLoading, data } = useGetUser(authData.email);
  const deleteUser = useDeleteUser();
  useEffect(() => {
    document.title = "Perfil";
  }, []);
  return (
    <Flex className="profile container">
      {!isLoading && data && (
        <Flex className="profile-data">
          <Heading className="profile-data__title">
            <AiOutlineUser />
            Dados do usuário
          </Heading>

          <Flex className="row profile-data__content">
            <Flex className="profile-item col-lg-6">
              <Text className="profile-item__label">Nome:</Text>
              <Text className="profile-item__label">{data.userName}</Text>
            </Flex>
            <Flex className="profile-item col-lg-6">
              <Text className="profile-item__label">Email:</Text>
              <Text className="profile-item__label">{data.email}</Text>
            </Flex>
            <Flex className="profile-item col-lg-6">
              <Text className="profile-item__label">Data de Nascimento:</Text>
              <Text className="profile-item__label">{new Date(data.birthDate).toLocaleDateString("pt-BR")}</Text>
            </Flex>
            <Flex className="profile-item col-lg-6">
              <Text className="profile-item__label">Telefone:</Text>
              <Text className="profile-item__label">{data.phoneNumber}</Text>
            </Flex>
          </Flex>

          <Flex className="profile-data__actions">
            <Button colorScheme="yellow">
              <FaEdit />
            </Button>

            <DeleteConfirm param={authData.email} text="Todos os dados serão perdidos" title="Deseja deletar o seu perfil" handleDelete={deleteUser} />
            
          </Flex>
        </Flex>
      )}

      {isLoading && (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
          position={"absolute"}
          top={"50%"}
          left={"50%"}
        />
      )}
    </Flex>
  );
}