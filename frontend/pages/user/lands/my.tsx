import { useDisclosure, Wrap, WrapItem } from '@chakra-ui/react';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';

import Card from '../../../components/Card';
import ViewDetail from '../../../components/ViewLand';

const Home: NextPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalLand, setModalLand] = useState<Partial<Land>>({});
  return (
    <>
      <Wrap>
        {[...Array(4)].map((_, i) => (
          <>
            <WrapItem key={i}>
              <Card
                openModal={(land) => {
                  setModalLand(land);
                  onOpen();
                }}
              />
            </WrapItem>
          </>
        ))}
      </Wrap>
      <ViewDetail data={modalLand} isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Home;
