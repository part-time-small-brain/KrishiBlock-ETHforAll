import { Box, Heading, Text, useColorMode } from '@chakra-ui/react';
import { FC } from 'react';
import useUserStore from '../utils/store';
import KrishiHeading from './Heading';

interface NavbarProps {
  currentRoute?: string;
}

const Navbar: FC<NavbarProps> = ({ currentRoute }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box h="full" w="full" display={'flex'} gap={16} alignItems="center" p={8}>
      <KrishiHeading />
    </Box>
  );
};

export default Navbar;
