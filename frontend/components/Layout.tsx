import { Box, BoxProps, Grid } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FC, ReactNode } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

interface LayoutProps {
  children?: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const defaultProps: BoxProps = {
    fontWeight: 'bold',
  };
  const router = useRouter();
  return (
    <Grid
      templateAreas={
        '\'navbar navbar navbar\' \'sidebar main main\' \'sidebar footer footer\''
      }
      minHeight="100vh"
      gridTemplateRows={'100px auto 100px'}
      gridTemplateColumns={'300px auto'}
    >
      <Box {...defaultProps} gridArea={'navbar'}>
        <Navbar currentRoute={router.pathname} />
      </Box>
      <Box {...defaultProps} gridArea={'sidebar'}>
        <Sidebar />
      </Box>
      <Box {...defaultProps} gridArea={'main'} p={8}>
        {children}
      </Box>
      <Box {...defaultProps} gridArea={'footer'}>
        <Footer />
      </Box>
    </Grid>
  );
};

export default Layout;
