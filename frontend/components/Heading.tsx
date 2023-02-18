import { Heading, Tooltip, useColorMode } from '@chakra-ui/react';
import { FC } from 'react';

const KrishiHeading: FC<{
  sq?: number | string;
  textSize?: number | string;
}> = ({ sq = '40px', textSize = undefined }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Tooltip placement="auto" label="Click to see magic!!">
      <Heading
        display={'inline-flex'}
        alignItems="center"
        fontFamily={'body'}
        gap={'2'}
        userSelect="none"
        onClick={toggleColorMode}
        fontSize={textSize}
      >
        krishi
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill={'none'}
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          style={{
            width: sq,
            height: sq,
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
          />
        </svg>
      </Heading>
    </Tooltip>
  );
};

export default KrishiHeading;
