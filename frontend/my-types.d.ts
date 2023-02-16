interface Land {
  area: number;
  unit: "sq.ft" | "sq.km";
  address: string;
  price: number;
  onSale: boolean;
  image : string;
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