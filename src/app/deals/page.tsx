import { BackToTop } from "@/features/store/components/back-to-top";
import { DiscountProductsPage } from "@/features/store/components/discount-products-page";
import { StoreHeader } from "@/features/store/components/header/store-header";
import { StoreFooter } from "@/features/store/components/store-footer";
import { dealProducts } from "@/features/store/data/home-data";
import { StoreUiProvider } from "@/features/store/state/store-ui-context";

export default function DealsPage() {
  return (
    <StoreUiProvider>
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <StoreHeader />

        <DiscountProductsPage products={dealProducts} />

        <StoreFooter />
        <BackToTop />
      </div>
    </StoreUiProvider>
  );
}
