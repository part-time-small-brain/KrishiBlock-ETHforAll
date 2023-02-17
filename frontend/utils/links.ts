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
  // {
  //   href: "/user/requests/recieved",
  //   name: "My Requests",
  //   description: "Requests recieved by the user",
  // },
  // {
  //   href: "/user/requests/sent",
  //   name: "Requests Sent",
  //   description: "Requests sent by the user",
  // },
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

export default RoleLinks