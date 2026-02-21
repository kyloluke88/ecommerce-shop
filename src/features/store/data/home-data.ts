export type Category = {
  id: string;
  name: string;
  itemCount: number;
  image: string;
};

export type StoreProduct = {
  id: string;
  name: string;
  category: string;
  image: string;
  price: number;
  priceLabel?: string;
  originalPrice?: number;
  rating: number;
  unit: string;
  badge?: "SALE" | "NEW";
  href: string;
};

export const heroSlides = [
  {
    id: "hero-1",
    subtitle: "fresh groceries",
    title: "Healthy food for your everyday life",
    description: "Inspired by Grabit home page visual style, rebuilt with React components.",
    cta: "Shop now",
    image: "/assets/img/hero-bg/1.jpg",
  },
  {
    id: "hero-2",
    subtitle: "organic collection",
    title: "Premium fruits and vegetables delivered",
    description: "Fast shipping, transparent pricing, and curated daily essentials.",
    cta: "Explore deals",
    image: "/assets/img/hero-bg/2.jpg",
  },
];

export const categories: Category[] = [
  { id: "cat-1", name: "Vegetables", itemCount: 152, image: "/assets/img/category/c-1.png" },
  { id: "cat-2", name: "Fruits", itemCount: 99, image: "/assets/img/category/c-2.png" },
  { id: "cat-3", name: "Bakery", itemCount: 60, image: "/assets/img/category/c-3.png" },
  { id: "cat-4", name: "Seafood", itemCount: 48, image: "/assets/img/category/c-4.png" },
  { id: "cat-5", name: "Snacks", itemCount: 214, image: "/assets/img/category/c-5.png" },
  { id: "cat-6", name: "Beverages", itemCount: 127, image: "/assets/img/category/c-6.png" },
];

const ALL_PRODUCTS: StoreProduct[] = [
  { id: "p-1", name: "Apple", category: "Fresh Fruits", image: "/assets/img/product-images/1_1.jpg", price: 10, originalPrice: 12, rating: 4, unit: "5 pcs", href: "/products/apple" },
  { id: "p-2", name: "Kamalam Fruit", category: "Fresh Fruit", image: "/assets/img/product-images/2_1.jpg", price: 15, originalPrice: 17, rating: 3, unit: "3 pcs", badge: "SALE", href: "/products/kamalam-fruit" },
  { id: "p-3", name: "Blue Berry", category: "Fresh Fruits", image: "/assets/img/product-images/3_1.jpg", price: 11, originalPrice: 12, rating: 3, unit: "500 g", badge: "SALE", href: "/products/blue-berry" },
  { id: "p-4", name: "Cherry", category: "Fresh Fruit", image: "/assets/img/product-images/4_1.jpg", price: 20, originalPrice: 21, rating: 2, unit: "1 kg", href: "/products/cherry" },
  { id: "p-5", name: "Lichi", category: "Fresh Fruit", image: "/assets/img/product-images/5_1.jpg", price: 25, originalPrice: 35, rating: 5, unit: "500 g", badge: "NEW", href: "/products/lichi" },
  { id: "p-6", name: "Star Fruit", category: "Fresh Fruit", image: "/assets/img/product-images/6_1.jpg", price: 30, originalPrice: 35, rating: 4, unit: "1 kg", badge: "SALE", href: "/products/star-fruit" },
  { id: "p-7", name: "Guava", category: "Fresh Fruits", image: "/assets/img/product-images/7_1.jpg", price: 5, originalPrice: 7, rating: 3, unit: "2 kg", href: "/products/guava" },
  { id: "p-8", name: "Mango - Kesar", category: "Snacks", image: "/assets/img/product-images/8_1.jpg", price: 62, originalPrice: 65, rating: 4, unit: "20 kg", href: "/products/mango-kesar" },
  { id: "p-9", name: "Pineapple", category: "Fresh Fruit", image: "/assets/img/product-images/9_1.jpg", price: 45, originalPrice: 50, rating: 2, unit: "1 psc", href: "/products/pineapple" },
  { id: "p-10", name: "Banana", category: "Fresh Fruit", image: "/assets/img/product-images/10_1.jpg", price: 9, originalPrice: 12, rating: 4, unit: "12 psc", href: "/products/banana" },
  { id: "p-11", name: "Mixed Nuts Berries Pack", category: "Dried Fruits", image: "/assets/img/product-images/11_1.jpg", price: 45, originalPrice: 56, rating: 4, unit: "1 kg", badge: "SALE", href: "/products/mixed-nuts-berries-pack" },
  { id: "p-12", name: "Multi Grain Combo Cookies", category: "Cookies", image: "/assets/img/product-images/12_1.jpg", price: 25, originalPrice: 30, rating: 3, unit: "10 kg", badge: "SALE", href: "/products/multi-grain-combo-cookies" },
  { id: "p-13", name: "Fresh Mango Juice Pack", category: "Foods", image: "/assets/img/product-images/13_1.jpg", price: 49, originalPrice: 65, rating: 2, unit: "1 L", href: "/products/fresh-mango-juice-pack" },
  { id: "p-14", name: "Dates Value Fresh Pouch", category: "Dried Fruits", image: "/assets/img/product-images/14_1.jpg", price: 78, originalPrice: 85, rating: 3, unit: "2 kg", badge: "SALE", href: "/products/dates-value-fresh-pouch" },
  { id: "p-15", name: "Stick Fiber Masala Magic", category: "Foods", image: "/assets/img/product-images/15_1.jpg", price: 45, originalPrice: 50, rating: 2, unit: "2 pack", badge: "NEW", href: "/products/stick-fiber-masala-magic" },
  { id: "p-16", name: "Organic Tomato", category: "Vegetables", image: "/assets/img/product-images/16_1.jpg", price: 8, originalPrice: 10, rating: 4, unit: "1 kg", href: "/products/organic-tomato" },
  { id: "p-17", name: "Premium Avocado", category: "Fruits", image: "/assets/img/product-images/17_1.jpg", price: 16, originalPrice: 19, rating: 4, unit: "4 pcs", href: "/products/premium-avocado" },
  { id: "p-18", name: "Roasted Almond", category: "Snacks", image: "/assets/img/product-images/18_1.jpg", price: 19, originalPrice: 22, rating: 5, unit: "500 g", badge: "NEW", href: "/products/roasted-almond" },
  { id: "p-19", name: "Fresh Broccoli", category: "Vegetables", image: "/assets/img/product-images/19_1.jpg", price: 6, originalPrice: 8, rating: 3, unit: "1 pcs", href: "/products/fresh-broccoli" },
  { id: "p-20", name: "Lemon Drink", category: "Beverages", image: "/assets/img/product-images/20_1.jpg", price: 4, originalPrice: 6, rating: 4, unit: "6 cans", badge: "SALE", href: "/products/lemon-drink" },
];

export const allProducts = ALL_PRODUCTS;
export const newArrivalsProducts = ALL_PRODUCTS.slice(0, 12);
export const recommendedProducts = ALL_PRODUCTS.slice(5, 20);
export const dealProducts = ALL_PRODUCTS.filter((product) => product.originalPrice && product.originalPrice > product.price);

export function getProductBySlug(slug: string) {
  return ALL_PRODUCTS.find((product) => product.href === `/products/${slug}`);
}

export function getRecommendedProductsForSlug(slug: string, limit = 10) {
  const fromRecommended = recommendedProducts.filter((product) => product.href !== `/products/${slug}`);

  if (fromRecommended.length >= limit) {
    return fromRecommended.slice(0, limit);
  }

  const fallback = ALL_PRODUCTS.filter(
    (product) =>
      product.href !== `/products/${slug}` &&
      !fromRecommended.some((recommended) => recommended.id === product.id),
  );

  return [...fromRecommended, ...fallback].slice(0, limit);
}

export function getProductGalleryBySlug(slug: string, size = 5) {
  const currentIndex = ALL_PRODUCTS.findIndex((product) => product.href === `/products/${slug}`);
  if (currentIndex < 0) {
    return [];
  }

  return Array.from({ length: Math.max(size, 1) }, (_, index) => {
    const pointer = (currentIndex + index) % ALL_PRODUCTS.length;
    return ALL_PRODUCTS[pointer].image;
  });
}

export const serviceItems = [
  { id: "srv-1", title: "Free Shipping", description: "Free shipping on all US order or order above $200" },
  { id: "srv-2", title: "24X7 Support", description: "Contact us 24 hours a day, 7 days a week" },
  { id: "srv-3", title: "30 Days Return", description: "Simply return it within 30 days for an exchange" },
  { id: "srv-4", title: "Payment Secure", description: "Contact us 24 hours a day, 7 days a week" },
];

export const dealPromoBanner = {
  image: "/assets/img/banner/14.jpg",
  title: "Fresh Fruits Healthy Products",
  subtitle: "30% off sale Hurry up!!!",
  cta: "Shop now",
  href: "/deals",
};
