interface Land {
  area: number;
  unit: "sq.ft" | "sq.km";
  address: string;
  price: number;
  onSale: boolean;
  image : string;
  verified: boolean;
  pid: string;
  survey: string;
  document: string;
}

interface User {
  id: number;
  address: string;
  name: string;
  adhar: number;
  pan: string;
  document: string;
  verified: boolean;
}

enum RequestStatus {
    pending,
    fulfilled
}

interface LandRequest {
    landId :  number;
    buyerAddress: string;
    sellerAddress: string;
    status: RequestStatus;
    payment: boolean;
}

interface LinkItemInterface {
  href: string;
  name: string;
  description?: string;
}