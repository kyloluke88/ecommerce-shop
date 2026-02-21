import { notFound } from "next/navigation";

import { BackToTop } from "@/features/store/components/back-to-top";
import { StoreHeader } from "@/features/store/components/header/store-header";
import { ProductDetailPageView } from "@/features/store/components/product-detail-page";
import { StoreFooter } from "@/features/store/components/store-footer";
import {
  getProductGalleryBySlug,
  getProductBySlug,
  getRecommendedProductsForSlug,
} from "@/features/store/data/home-data";
import { StoreUiProvider } from "@/features/store/state/store-ui-context";

type ProductDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const recommendedProducts = getRecommendedProductsForSlug(slug, 10);
  const galleryImages = getProductGalleryBySlug(slug, 5);

  return (
    <StoreUiProvider>
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <StoreHeader />
        <ProductDetailPageView
          product={product}
          recommendedProducts={recommendedProducts}
          galleryImages={galleryImages}
        />
        <StoreFooter />
        <BackToTop />
      </div>
    </StoreUiProvider>
  );
}
