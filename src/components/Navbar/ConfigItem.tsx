import {
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { BsGear } from 'react-icons/bs';
import { RiLogoutBoxLine } from 'react-icons/ri';
import { FiEdit2 } from 'react-icons/fi';
import { logout } from '../../features/auth/authSlice';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useNavigate } from 'react-router-dom';

export const ConfigItem = ({ text }: { text: boolean }) => {
  const dispatchUser = useAppDispatch();
  const navigate = useNavigate();

  return (
    <Menu>
      <MenuButton
        position={'absolute'}
        bottom={'15px'}
        aria-label="Logout"
        fontSize={'20px'}
        bg={'#6c083d'}
        padding={'10px'}
        color={'white'}
        alignItems={'center'}
        cursor={'pointer'}
        as={Box}
        className="navbar-item"
        borderRadius={'10px'}
      >
        <Flex alignItems={'center'}>
          <BsGear />
          {text && (
            <Text
              fontSize={'16px'}
              marginLeft={'10px'}
              alignItems={'center'}
              marginBottom={'0'}
            >
              Configuração
            </Text>
          )}
        </Flex>
      </MenuButton>
      <MenuList
        boxShadow={'0px 0px 7px 0px rgba(0,0,0,0.75)'}
        fontSize={'16px'}
        fontFamily={'Lato'}
      >
        <MenuItem onClick={() => dispatchUser(logout())}>
          <RiLogoutBoxLine />
          <Text marginLeft={'5px'} marginBottom={0}>
            Logout
          </Text>
        </MenuItem>
        <MenuItem onClick={() => navigate('/users/profile')}>
          <FiEdit2 />
          <Text marginLeft={'5px'} marginBottom={0}>
            Editar Perfil
          </Text>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
