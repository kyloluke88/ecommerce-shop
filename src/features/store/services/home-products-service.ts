import type { StoreProduct } from "@/features/store/data/home-data";
import { fetchFromApi } from "@/features/store/services/api-client";

type ApiEnvelope<T> = {
  success: boolean;
  data: T;
};

type ApiHomeProduct = {
  id: number;
  title: string;
  rating: number;
  min_price: string;
  max_price: string;
  price_range: string;
  image_url: string;
};

type ApiHomeProductsData = {
  new_arrivals: ApiHomeProduct[];
  recommended_products: ApiHomeProduct[];
};

export type HomeProductsViewModel = {
  newArrivalsProducts: StoreProduct[];
  recommendedProducts: StoreProduct[];
};

function toStoreProduct(product: ApiHomeProduct): StoreProduct {
  const numericPrice = Number.parseFloat(product.min_price);
  const normalizedImageUrl = product.image_url.startsWith("//")
    ? `https:${product.image_url}`
    : product.image_url;

  return {
    id: `api-product-${product.id}`,
    name: product.title,
    category: "From 1688",
    image: normalizedImageUrl,
    price: Number.isFinite(numericPrice) ? numericPrice : 0,
    rating: Number.isFinite(product.rating) ? product.rating : 0,
    priceLabel: product.price_range || `${product.min_price} ~ ${product.max_price}`,
    unit: "",
    href: "#",
  };
}

function sanitizeProducts(products: ApiHomeProduct[]): StoreProduct[] {
  return products
    .filter((product) => product.image_url)
    .map((product) => toStoreProduct(product));
}

export async function getHomeProducts(): Promise<HomeProductsViewModel | null> {
  try {
    const payload = await fetchFromApi<ApiEnvelope<ApiHomeProductsData>>("/home/products", {
      next: { revalidate: 60 },
    });

    return {
      newArrivalsProducts: sanitizeProducts(payload.data.new_arrivals),
      recommendedProducts: sanitizeProducts(payload.data.recommended_products),
    };
  } catch (error) {
    console.error("Failed to fetch home products", error);
    return null;
  }
}
