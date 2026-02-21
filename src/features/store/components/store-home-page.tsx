import Image from "next/image";

import { Card } from "@/components/ui/card";
import { GRABIT_CONTAINER_CLASS } from "@/features/store/constants/layout";
import { StoreHeader } from "@/features/store/components/header/store-header";
import {
  categories,
  heroSlides,
  newArrivalsProducts,
  recommendedProducts,
} from "@/features/store/data/home-data";
import type { HomeProductsViewModel } from "@/features/store/services/home-products-service";
import { StoreUiProvider } from "@/features/store/state/store-ui-context";
import { BackToTop } from "@/features/store/components/back-to-top";
import { DealPromoBanner } from "@/features/store/components/deal-promo-banner";
import { HeroCarousel } from "@/features/store/components/hero-carousel";
import { ProductListSection } from "@/features/store/components/product-list-section";
import { ServiceStrip } from "@/features/store/components/service-strip";
import { StoreFooter } from "@/features/store/components/store-footer";

function CategorySection() {
  return (
    <section className="space-y-4">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-slate-900">
          Shop by top <span className="text-[#5caf90]">Categories</span>
        </h2>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {categories.map((category) => (
          <Card key={category.id} className="group p-4 text-center transition hover:border-emerald-300 hover:shadow-md">
            <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
              <Image src={category.image} alt={category.name} width={44} height={44} className="object-contain" />
            </div>
            <p className="text-sm font-semibold text-slate-900 group-hover:text-emerald-700">{category.name}</p>
            <p className="text-xs text-slate-500">{category.itemCount} items</p>
          </Card>
        ))}
      </div>
    </section>
  );
}

type StoreHomePageProps = {
  homeProducts?: HomeProductsViewModel | null;
};

export function StoreHomePage({ homeProducts }: StoreHomePageProps) {
  const displayNewArrivals =
    homeProducts?.newArrivalsProducts && homeProducts.newArrivalsProducts.length > 0
      ? homeProducts.newArrivalsProducts
      : newArrivalsProducts;
  const displayRecommended =
    homeProducts?.recommendedProducts && homeProducts.recommendedProducts.length > 0
      ? homeProducts.recommendedProducts
      : recommendedProducts;

  return (
    <StoreUiProvider>
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <StoreHeader />

        <main className={`${GRABIT_CONTAINER_CLASS} space-y-10 px-3 py-6 lg:py-8`}>
          <HeroCarousel slides={heroSlides} />

          <ServiceStrip />

          <ProductListSection
            title="New"
            accentText="Arrivals"
            products={displayNewArrivals}
            maxRows={2}
          />

          <CategorySection />

          <ProductListSection
            title="Recommended"
            accentText="Products"
            products={displayRecommended}
            maxRows={3}
          />

          <DealPromoBanner />
        </main>

        <StoreFooter />
        <BackToTop />
      </div>
    </StoreUiProvider>
  );
}
