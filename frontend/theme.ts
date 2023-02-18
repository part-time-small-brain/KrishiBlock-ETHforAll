import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const fonts = {
  body: 'Josefin Sans, sans-serif',
  heading: 'Josefin Sans, sans-serif',
};

const config = {
  initialColorMode: 'dark',
};

export default extendTheme({ config, fonts });
