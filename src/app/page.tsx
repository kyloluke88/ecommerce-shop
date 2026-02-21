import { StoreHomePage } from "@/features/store/components/store-home-page";
import { getHomeProducts } from "@/features/store/services/home-products-service";

export default async function Home() {
  const homeProducts = await getHomeProducts();
  return <StoreHomePage homeProducts={homeProducts} />;
}
