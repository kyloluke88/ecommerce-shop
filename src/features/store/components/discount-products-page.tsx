"use client";

import { type ReactNode, useMemo, useState } from "react";

import { GRABIT_CONTAINER_CLASS } from "@/features/store/constants/layout";
import { ProductListSection } from "@/features/store/components/product-list-section";
import { ServiceStrip } from "@/features/store/components/service-strip";
import type { StoreProduct } from "@/features/store/data/home-data";

type SortOption = "position" | "name-asc" | "name-desc" | "price-asc" | "price-desc";

const PAGE_SIZE = 15;

type DiscountProductsPageProps = {
  products: StoreProduct[];
};

export function DiscountProductsPage({ products }: DiscountProductsPageProps) {
  const [sortBy, setSortBy] = useState<SortOption>("position");
  const [page, setPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);

  const sortedProducts = useMemo(() => {
    const cloned = [...products];

    switch (sortBy) {
      case "name-asc":
        return cloned.sort((a, b) => a.name.localeCompare(b.name));
      case "name-desc":
        return cloned.sort((a, b) => b.name.localeCompare(a.name));
      case "price-asc":
        return cloned.sort((a, b) => a.price - b.price);
      case "price-desc":
        return cloned.sort((a, b) => b.price - a.price);
      default:
        return cloned;
    }
  }, [products, sortBy]);

  const totalPages = Math.max(1, Math.ceil(sortedProducts.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);

  const pageProducts = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return sortedProducts.slice(start, start + PAGE_SIZE);
  }, [safePage, sortedProducts]);

  const pageItems = useMemo(() => Array.from({ length: totalPages }, (_, i) => i + 1), [totalPages]);

  return (
    <main className={`${GRABIT_CONTAINER_CLASS} space-y-8 px-3 py-8`}>
      <ServiceStrip />

      <section className="space-y-5">
        <div className="flex items-center justify-between rounded-[5px] border border-[#eee] bg-white text-[14px]">
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => setFilterOpen(true)}
              className="flex h-[40px] w-[40px] items-center justify-center"
              aria-label="Open filter drawer"
            >
              <FilterIcon className="h-[18px] w-[18px] text-[#4b5966]" />
            </button>
            <button type="button" className="flex h-[40px] w-[40px] items-center justify-center text-[#5caf90]">
              <GridIcon className="h-[18px] w-[18px]" />
            </button>
          </div>

          <div className="flex h-[50px] items-center border-l border-[#eee] px-3">
            <select
              value={sortBy}
              onChange={(event) => {
                setSortBy(event.target.value as SortOption);
                setPage(1);
              }}
              className="cursor-pointer border-0 bg-white text-[14px] text-[#777] outline-none"
            >
              <option value="position">Position</option>
              <option value="name-asc">Name, A to Z</option>
              <option value="name-desc">Name, Z to A</option>
              <option value="price-asc">Price, low to high</option>
              <option value="price-desc">Price, high to low</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap justify-end gap-[8px]">
          <span className="flex items-center rounded-[5px] border border-[#eee] px-[10px] py-[4px] text-[14px] text-[#777]">
            Discount
            <span className="ml-[10px] text-[18px] text-[#ff8585]">×</span>
          </span>
        </div>

        <ProductListSection
          title="Discount Deals"
          description="All products list page with discount-only condition."
          products={pageProducts}
          showHeader={false}
        />

        <div className="flex items-center justify-between border-t border-[#eee] pt-4 max-[575px]:flex-col max-[575px]:gap-3">
          <p className="text-[14px] text-[#777]">
            Showing {pageProducts.length} of {sortedProducts.length} discounted items
          </p>
          <ul className="flex items-center gap-2">
            <li>
              <button
                type="button"
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                className="inline-flex h-[32px] min-w-[32px] items-center justify-center rounded-[4px] border border-[#eee] px-2 text-[#777] hover:text-[#5caf90]"
              >
                Prev
              </button>
            </li>
            {pageItems.map((item) => (
              <li key={item}>
                <button
                  type="button"
                  onClick={() => setPage(item)}
                  className={`inline-flex h-[32px] min-w-[32px] items-center justify-center rounded-[4px] border px-2 ${
                    safePage === item
                      ? "border-[#5caf90] bg-[#5caf90] text-white"
                      : "border-[#eee] text-[#777] hover:text-[#5caf90]"
                  }`}
                >
                  {item}
                </button>
              </li>
            ))}
            <li>
              <button
                type="button"
                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                className="inline-flex h-[32px] min-w-[32px] items-center justify-center rounded-[4px] border border-[#eee] px-2 text-[#777] hover:text-[#5caf90]"
              >
                Next
              </button>
            </li>
          </ul>
        </div>
      </section>

      <div
        onClick={() => setFilterOpen(false)}
        className={`fixed inset-0 z-[44] bg-black/50 transition-opacity ${
          filterOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        className={`fixed left-0 top-0 z-[45] h-screen w-[300px] overflow-auto bg-white transition-transform duration-300 ${
          filterOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between bg-[#f8f8fb] p-[15px]">
          <h5 className="text-[20px] font-bold leading-[1.2] text-[#4b5966]">Filters</h5>
          <button
            type="button"
            onClick={() => setFilterOpen(false)}
            className="text-[24px] leading-[1] text-[#ff8585]"
            aria-label="Close filter drawer"
          >
            ×
          </button>
        </div>

        <div className="p-[15px]">
          <div className="space-y-[15px] rounded-[5px] border border-[#eee] p-[15px]">
            <FilterBlock title="Category">
              {["Dairy & Bakery", "Fruits & Vegetable", "Snack & Spice", "Juice & Drinks"].map((item) => (
                <label key={item} className="flex items-center gap-2 py-[8px] text-[14px] text-[#777]">
                  <input type="checkbox" className="h-[16px] w-[16px] rounded border-[#ddd]" />
                  <span>{item}</span>
                </label>
              ))}
            </FilterBlock>

            <FilterBlock title="Weight">
              {["500gm Pack", "1kg Pack", "2kg Pack", "5kg Pack", "10kg Pack"].map((item) => (
                <label key={item} className="flex items-center gap-2 py-[8px] text-[14px] text-[#777]">
                  <input type="checkbox" className="h-[16px] w-[16px] rounded border-[#ddd]" />
                  <span>{item}</span>
                </label>
              ))}
            </FilterBlock>

            <FilterBlock title="Color">
              <div className="flex flex-wrap gap-[10px] pt-[8px]">
                {["#c4d6f9", "#ff748b", "#000000", "#2bff4a", "#ff7c5e", "#f155ff", "#ffef00"].map((color) => (
                  <button
                    key={color}
                    type="button"
                    className="h-[22px] w-[22px] rounded-full border border-[#ddd]"
                    style={{ backgroundColor: color }}
                    aria-label={`Filter by color ${color}`}
                  />
                ))}
              </div>
            </FilterBlock>

            <FilterBlock title="Price">
              <div className="rounded-[5px] bg-[#f8f8fb] p-[10px] text-[14px] text-[#777]">
                <div className="flex items-center justify-center gap-[10px]">
                  <div className="text-center">
                    <p className="mb-[4px]">From</p>
                    <input defaultValue={0} className="h-[30px] w-[56px] rounded-[5px] border-0 text-center" />
                  </div>
                  <span className="mt-5 inline-block h-[1px] w-[10px] bg-[#777]" />
                  <div className="text-center">
                    <p className="mb-[4px]">To</p>
                    <input defaultValue={250} className="h-[30px] w-[56px] rounded-[5px] border-0 text-center" />
                  </div>
                </div>
              </div>
            </FilterBlock>

            <FilterBlock title="Tags">
              <div className="flex flex-wrap gap-[6px] pt-[6px]">
                {["Clothes", "Fruits", "Snacks", "Dairy", "Seafood", "Fastfood", "Bags"].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    className="rounded-[5px] bg-[#5caf90] px-[8px] py-[3px] text-[13px] text-white hover:bg-[#4b5966]"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </FilterBlock>
          </div>
        </div>
      </aside>
    </main>
  );
}

function FilterBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <div className="border-b border-[#eee] pb-[12px]">
        <h3 className="text-[17px] font-semibold leading-[1.2] text-[#4b5966]">{title}</h3>
      </div>
      <div className="pt-[8px]">{children}</div>
    </div>
  );
}

function iconClass(className?: string) {
  return `stroke-current ${className ?? ""}`.trim();
}

function GridIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={iconClass(className)}>
      <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" strokeWidth="1.8" />
    </svg>
  );
}

function FilterIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={iconClass(className)}>
      <path d="M3 5h18M6 12h12M10 19h4" strokeWidth="1.8" />
    </svg>
  );
}
