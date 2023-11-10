import { NavLink } from 'react-router-dom';
import { LinkNavBar } from './Navbar';
import { Flex, Text } from '@chakra-ui/react';
import './item.scss';

export const ItemNavBar = ({ path, name, icon, click }: LinkNavBar) => {
  return (
    <NavLink to={path}>
      <Flex
        alignItems={'center'}
        color={'white'}
        fontSize={'24px'}
        padding={'10px'}
        className="navbar-item"
        borderRadius={'5px'}
        onClick={() => click!()}
      >
        {icon}
        <Text
          color="white"
          marginLeft={'10px'}
          fontSize={'16px'}
          marginBottom={'0'}
        >
          {name}
        </Text>
      </Flex>
    </NavLink>
  );
};
