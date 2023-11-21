import { Box, Flex, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import { AiOutlineUser } from 'react-icons/ai';
import { RiLogoutBoxLine } from 'react-icons/ri';

import { logout } from '../../features/auth/authSlice';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useNavigate } from 'react-router-dom';
import './item.scss';

export const ConfigItem = ({ text }: { text: boolean }) => {
  const dispatchUser = useAppDispatch();
  const navigate = useNavigate();

  return (
    <Menu>
      <MenuButton
        aria-label="Logout"
        fontSize={'20px'}
        bg={'#6c083d'}
        padding={'10px'}
        color={'white'}
        alignItems={'center'}
        cursor={'pointer'}
        as={Box}
        className="navbar-item__config"
        borderRadius={'50%'}
      >
        <Flex alignItems={'center'}>
          <AiOutlineUser />
          {text && (
            <Text fontSize={'16px'} marginLeft={'10px'} alignItems={'center'} marginBottom={'0'}>
              Configuração
            </Text>
          )}
        </Flex>
      </MenuButton>
      <MenuList boxShadow={'0px 0px 7px 0px rgba(0,0,0,0.75)'} fontSize={'16px'} fontFamily={'Lato'} zIndex={2}>
        <MenuItem onClick={() => navigate('/profile')}>
          <AiOutlineUser />
          <Text marginLeft={'5px'} marginBottom={0}>
            Acessar Perfil
          </Text>
        </MenuItem>
        <MenuItem onClick={() => dispatchUser(logout())}>
          <RiLogoutBoxLine />
          <Text marginLeft={'5px'} marginBottom={0}>
            Logout
          </Text>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
