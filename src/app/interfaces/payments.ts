export interface Payment {
  _id: string;
  user_id: string;
  email: string;
  cart: [
    {
      title: string;
      price: number;
    }
  ];
}
