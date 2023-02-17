import {
  Avatar,
  Box,
  Button,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FC } from "react";
import Link from "next/link";

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
  console.log(RoleLinks.get("user")?.length);
  return (
    <VStack w="full" pt={8} spacing={4} pos={"sticky"} top={0}>
      {RoleLinks.get("user")!.map((val, i) => (
        <Link
          style={{
            width: "100%",
            marginRight: 32,
            marginBottom: (i === (RoleLinks.get("user")!.length - 1) ) ? "auto" : "none"
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
      <Stack position={"fixed"} bottom="0" left={0} gap={4} direction={"row"} p={8} alignItems={"center"} justify={"start"}>
        <Avatar src="https://bit.ly/broken-link" />
        <VStack h="full" alignItems={"start"} justifyContent={"center"} lineHeight={0} gap={2}>
          <Text>Shivom Srivastava</Text>
          <Text fontSize={"sm"} >user</Text>
        </VStack>
      </Stack>
    </VStack>
  );
};

export default Sidebar;
