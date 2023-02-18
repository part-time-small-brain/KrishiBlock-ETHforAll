import { Box, Link } from '@chakra-ui/react';
import { FC } from 'react';

const Footer: FC = () => {
  return (
    <Box h="full" w="full" p={8}>
      Project by {' '}
      <Link href="https://github.com/xlazer4" isExternal>Rahul</Link> &{' '}
      <Link href="https://github.com/adwitm" isExternal>Adwit</Link> ❤️
    </Box>
  );
};

export default Footer;
