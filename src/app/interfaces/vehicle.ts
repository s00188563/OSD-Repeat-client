export interface Vehicle {
  _id: string;
  vehicle_id: string;
  category_id: string;
  title: string;
  price: number;
  description: string;
  image: { public_id: string; url: string };
  sold: number;
}
