import { Avatar, Box, Button, Heading, Text, VStack } from "@chakra-ui/react";
import { FC } from "react";
import Link from "next/link";

interface LinkItemInterface {
  href: string;
  name: string;
  description?: string;
}

const RoleLinks = new Map<"user" | "landInspector", Array<LinkItemInterface>>();
RoleLinks.set("user", [
  {
    href: "/user/lands/my",
    name: "My Lands",
    description: "List out all the lands belonging to the user",
  },
  {
    href: "/user/lands/gallery",
    name: "Land Gallery",
    description: "List out all the lands belonging to the user",
  },
  {
    href: "/user/lands/add",
    name: "Add Land",
    description: "Add a new land for the current user",
  },
  {
    href: "/user/requests/recieved",
    name: "My Requests",
    description: "Requests recieved by the user",
  },
  {
    href: "/user/requests/sent",
    name: "Requests Sent",
    description: "Requests sent by the user",
  },
]);

RoleLinks.set("landInspector", [
  {
    href: "/land-inspector/verify/user",
    name: "Verify User",
    description:
      "Verify Users, Land Inspectors will be presented with a list of users",
  },
  {
    href: "/land-inspector/verify/land",
    name: "Verify Land",
    description:
      "Verify Land, Land owner will be presented with a list of lands to verify",
  },
  {
    href: "/land-inspector/transfer",
    name: "Transfer Ownership",
    description:
      "Land Inspector will be presented with a list of lands to transfer their ownership",
  },
]);

const Sidebar: FC = () => {
  return (
    <VStack w="full" py={8} spacing={4} pos={"sticky"} top={0}>
      {/* <VStack mb={8} textTransform="lowercase">
        <Avatar mb={4} size={"xl"} />
        <Text>Shivom Srivastava</Text>
        <Text fontSize={"xs"}>user</Text>
      </VStack> */}
      {RoleLinks.get("user")!.map((val, i) => (
        <Link
          style={{
            width: "100%",
            marginRight: 32,
          }}
          href={val.href}
          key={i}
        >
          <Button
            w={"full"}
            colorScheme={"yellow"}
            borderStart={"none"}
            borderLeftRadius="none"
            borderRightRadius={"full"}
            height={12}
            textTransform={"capitalize"}
          >
            {val.name}
          </Button>
        </Link>
      ))}
    </VStack>
  );
};

export default Sidebar;
