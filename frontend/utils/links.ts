const RoleLinks = new Map<
  "user" | "lekhpal" | "tehsildar" | "sdm",
  Array<LinkItemInterface>
>();

RoleLinks.set("sdm", [
  {
    href: "/sdm/tehsildars/add",
    name: "Add Tehsildar",
    description: "Add a tehsildar",
  },
  {
    href: "/sdm/tehsildars/all",
    name: "List Tehsildars",
    description: "List out all the tehsildars",
  },
]);

RoleLinks.set("tehsildar", [
  {
    href: "/tehsildar/lekhpals/add",
    name: "Add lekhpal",
    description: "Add a lekhpal"
  },
  {
    href: "/tehsildar/lekhpals/all",
    name: "List Lekhpals",
    description: "List out all the lekhpals"
  },
  {
    href: "/tehsildar/transfer",
    name: "Transfer Ownership",
    description:
      "Land Inspector will be presented with a list of lands to transfer their ownership",
  },
])
RoleLinks.set("lekhpal", [
  {
    href: "/lekhpal/verify/user",
    name: "Verify User",
    description:
      "Verify Users, Land Inspectors will be presented with a list of users",
  },
  {
    href: "/lekhpal/verify/land",
    name: "Verify Land",
    description:
      "Verify Land, Land owner will be presented with a list of lands to verify",
  },
]);

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
]);

export default RoleLinks;
