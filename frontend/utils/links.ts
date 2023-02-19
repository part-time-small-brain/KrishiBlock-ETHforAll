const RoleLinks = new Map<
  '4' | '1' | '2' | '3',
  Array<LinkItemInterface>
>();

RoleLinks.set('3', [
  {
    href: '/sdm/',
    name: 'Home',
    description: 'SDM Home',
  },
  {
    href: '/sdm/tehsildars/add',
    name: 'Add Tehsildar',
    description: 'Add a tehsildar',
  },
  {
    href: '/sdm/tehsildars/all',
    name: 'List Tehsildars',
    description: 'List out all the tehsildars',
  },
  {
    href: '/sdm/change',
    name: 'Handover',
    description: 'Change the current SDM',
  },
]);

RoleLinks.set('2', [
  {
    href: '/tehsildar/',
    name: 'Home',
    description: 'Tehsildar Home',
  },
  {
    href: '/tehsildar/lekhpals/add',
    name: 'Add lekhpal',
    description: 'Add a lekhpal'
  },
  {
    href: '/tehsildar/lekhpals/all',
    name: 'List Lekhpals',
    description: 'List out all the lekhpals'
  },
  {
    href: '/tehsildar/transfer',
    name: 'Transfer Ownership',
    description:
      'Land Inspector will be presented with a list of lands to transfer their ownership',
  },
]);
RoleLinks.set('1', [
  {
    href: '/lekhpal/',
    name: 'Home',
    description: 'Lekhpal Home',
  },
  {
    href: '/lekhpal/verify/user',
    name: 'Verify User',
    description:
      'Verify Users, Land Inspectors will be presented with a list of users',
  },
  {
    href: '/lekhpal/verify/land',
    name: 'Verify Land',
    description:
      'Verify Land, Land owner will be presented with a list of lands to verify',
  },
]);

RoleLinks.set('4', [
  {
    href: '/user/',
    name: 'Home',
    description: 'User Home',
  },
  {
    href: '/user/lands/my',
    name: 'My Lands',
    description: 'List out all the lands belonging to the user',
  },
  {
    href: '/user/lands/gallery',
    name: 'Land Gallery',
    description: 'List out all the lands belonging to the user',
  },
  {
    href: '/user/lands/add',
    name: 'Add Land',
    verificationRequired: true,
    description: 'Add a new land for the current user',
  },
  {
    href: 'https://krishiblock-superfluid-rent.vercel.app/',
    name: 'Pay Rent',
    description: 'Superfluid integration',
  },
]);

export default RoleLinks;
