export type Product = {
  id: number;
  name: string;
  description: string;
  price_dop: number;
  price_usd: number;
  price_cash: number;
  images: string[];
  available: boolean;
  selling_by: string;
  created_at: Date;
  updated_at: Date;
  quantity: number;
};

export type ProductWithQuantity = Product & {
  quantity: number;
};

export type Invoice = {
  id: number;
  created_at: Date;
  invoice_num: string;
  generation_date: Date;
  client_name: string;
  client_phone: string;
  details: string;
  total_dop: number;
  total_usd: number;
  client_email: string;
  generated_by: string;
  order_id: string;
  status: string;
  products: string;
  pdf_url: string;
};

export type ShippingOption = {
  id: number;
  cost_dop: number;
  cost_usd: number;
  created_at: Date;
  label: string;
  updated_at: Date;
};
