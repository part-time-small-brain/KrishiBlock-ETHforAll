import { Wrap, WrapItem } from '@chakra-ui/react';
import { NextPage } from 'next';

import Card from '../../../components/Card';

const Gallery: NextPage = () => {
  return (
    <Wrap spacing={8}>
      <WrapItem>
        <Card onSale />
      </WrapItem>
      <WrapItem>
        <Card />
      </WrapItem>
      <WrapItem>
        <Card />
      </WrapItem>
      <WrapItem>
        <Card onSale />
      </WrapItem>
      <WrapItem>
        <Card />
      </WrapItem>
      <WrapItem>
        <Card />
      </WrapItem>
      <WrapItem>
        <Card />
      </WrapItem>
      <WrapItem>
        <Card />
      </WrapItem>
      <WrapItem>
        <Card />
      </WrapItem>
    </Wrap>
  );
};

export default Gallery;
