import { NextPage } from "next";
import { Wrap, WrapItem } from "@chakra-ui/react";
import Card from "../../../components/Card";

const Home: NextPage = () => {
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
    </Wrap>
  );
};


export default Home;
