import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Box,
  Text,
} from '@chakra-ui/react';
import { LatLngTuple } from 'leaflet';
import dynamic from 'next/dynamic';
import { FC, useState } from 'react';

const Map = dynamic(import('./Map'), {
  ssr: false,
  loading: () => (
    <div style={{ textAlign: 'center', paddingTop: 20 }}>Loading...</div>
  ),
});

const DrawLand: FC<{ onClose: () => void; isOpen: boolean }> = ({
  onClose,
  isOpen,
}) => {
  return (
    <>
      <Drawer onClose={onClose} isOpen={isOpen} size={'xl'}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader fontSize={'3xl'}>Draw Land on Map</DrawerHeader>
          <DrawerBody >
            <Text pb={4}>Epic Map Drawing feature using leaflet js</Text>
            <Box height={450} w="full" bg={'green.300'} borderRadius={'xl'} overflow="hidden">
              <Map />
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DrawLand;
