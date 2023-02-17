import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const theme: { config: ThemeConfig; fonts: any } = {
  fonts: {
    body: "Josefin Sans, sans-serif",
    heading: "Josefin Sans, sans-serif",
  },
  config: {
    initialColorMode: "dark",
  },
};

export default extendTheme(theme);
