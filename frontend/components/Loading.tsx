import { Grid, Spinner, VStack, Text } from '@chakra-ui/react';

const LoadingPage = () => {
    return (
        <Grid w={'full'} h={'full'} placeItems="center">
            <VStack gap={4}>
            <Spinner size='xl'/>
            <Text fontSize={'xl'}>Loading Content</Text>
            </VStack>
        </Grid>
    );
};

export default LoadingPage;