import { createClient } from "@supabase/supabase-js";

// Romance Unplugged - Supabase backend
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Product = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  currency: string;
  type: "ebook" | "course" | "pass" | "consultation";
  cover_url: string;
  content: string;
  status: "active" | "draft";
  created_at: string;
};

export type Order = {
  id: string;
  user_id: string;
  product_id: string;
  amount: number;
  status: "paid" | "pending" | "refunded";
  created_at: string;
};

export const PRODUCTS_TABLE = "products";
export const ORDERS_TABLE = "orders";
export const LIBRARY_TABLE = "library_items";
export const WALLET_TABLE = "wallet_transactions";
export const BLOG_TABLE = "blog_posts";
