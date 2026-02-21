"use client";

import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import type { StoreProduct } from "@/features/store/data/home-data";

type ProductListSectionProps = {
  title: string;
  accentText?: string;
  description?: string;
  products: StoreProduct[];
  maxRows?: number;
  showHeader?: boolean;
};

function formatPrice(price: number) {
  return `$${price.toFixed(2)}`;
}

function resolvePriceLabel(product: StoreProduct) {
  if (product.priceLabel) {
    return product.priceLabel;
  }

  if (typeof product.price === "number") {
    return formatPrice(product.price);
  }

  return "--";
}

function isRemoteImage(url: string) {
  return url.startsWith("http://") || url.startsWith("https://") || url.startsWith("//");
}

export function ProductListSection({
  title,
  accentText,
  description,
  products,
  maxRows,
  showHeader = true,
}: ProductListSectionProps) {
  const limitedProducts =
    typeof maxRows === "number" ? products.slice(0, Math.max(maxRows, 1) * 5) : products;

  return (
    <section className="space-y-5">
      {showHeader ? (
        <div className="flex flex-col items-center gap-2 text-center">
          <div>
            <h2 className="text-[32px] font-bold leading-[1.15] text-[#4b5966]">
              {title}{" "}
              {accentText ? <span className="text-[#5caf90]">{accentText}</span> : null}
            </h2>
            {description ? (
              <p className="mt-[8px] text-[15px] font-normal text-[#777]">{description}</p>
            ) : null}
          </div>
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-6 min-[480px]:grid-cols-2 min-[768px]:grid-cols-3 min-[1200px]:grid-cols-4 min-[1400px]:grid-cols-5">
        {limitedProducts.map((product) => (
          <article key={product.id} className="group overflow-hidden rounded-[8px] border border-[#eee] bg-white">
            <div className="relative border-b border-[#eee] bg-[#f8f8fb]">
              {product.badge ? (
                <span
                  className={cn(
                    "absolute right-3 top-3 z-[2] rounded-[6px] px-[10px] py-[4px] text-[12px] font-semibold uppercase text-white",
                    product.badge === "NEW" ? "bg-[#5caf90]" : "bg-[#ff7070]",
                  )}
                >
                  {product.badge}
                </span>
              ) : null}

              <div className="relative aspect-square">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 1400px) 25vw, 20vw"
                  unoptimized={isRemoteImage(product.image)}
                  className="object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>

              <div className="absolute right-[14px] top-1/2 z-[3] flex -translate-y-1/2 translate-x-2 flex-col gap-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                <button
                  type="button"
                  aria-label={`Add ${product.name} to wishlist`}
                  className="inline-flex h-[36px] w-[36px] items-center justify-center rounded-[5px] border border-[#eee] bg-white text-[#4b5966] shadow-sm transition hover:bg-[#5caf90] hover:text-white"
                >
                  <HeartIcon className="h-[16px] w-[16px]" />
                </button>
                <Link
                  href={product.href ?? "#"}
                  aria-label={`View ${product.name}`}
                  className="inline-flex h-[36px] w-[36px] items-center justify-center rounded-[5px] border border-[#eee] bg-white text-[#4b5966] shadow-sm transition hover:bg-[#5caf90] hover:text-white"
                >
                  <EyeIcon className="h-[16px] w-[16px]" />
                </Link>
                <button
                  type="button"
                  aria-label={`Add ${product.name} to cart`}
                  className="inline-flex h-[36px] w-[36px] items-center justify-center rounded-[5px] border border-[#eee] bg-white text-[#4b5966] shadow-sm transition hover:bg-[#5caf90] hover:text-white"
                >
                  <CartIcon className="h-[16px] w-[16px]" />
                </button>
              </div>
            </div>

            <div className="space-y-2 p-[16px]">
              <p className="text-[14px] font-normal text-[#999]">{product.category ?? ""}</p>
              <Link
                href={product.href ?? "#"}
                className="block text-[17px] font-semibold text-[#4b5966] hover:text-[#5caf90]"
              >
                {product.name}
              </Link>

              <div className="flex items-center justify-between">
                <div className="flex gap-[2px]">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <StarIcon
                      key={index}
                      className={cn(
                        "h-[15px] w-[15px]",
                        index < Math.round(product.rating) ? "text-[#f7a14c]" : "text-[#c9c9c9]",
                      )}
                    />
                  ))}
                </div>
                {product.unit ? <span className="text-[16px] text-[#999]">{product.unit}</span> : null}
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[16px] font-bold text-[#4b5966]">{resolvePriceLabel(product)}</span>
                {product.originalPrice ? (
                  <span className="text-[16px] text-[#999] line-through">{formatPrice(product.originalPrice)}</span>
                ) : null}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function iconClass(className?: string) {
  return cn("stroke-current", className);
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={iconClass(className)}>
      <path d="m12 21-1.5-1.35C5.4 15.1 2 12.05 2 8.5A4.5 4.5 0 0 1 6.5 4C8.24 4 9.91 4.81 11 6.08 12.09 4.81 13.76 4 15.5 4A4.5 4.5 0 0 1 20 8.5c0 3.55-3.4 6.6-8.5 11.15L12 21Z" strokeWidth="1.8" />
    </svg>
  );
}

function EyeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={iconClass(className)}>
      <path d="M1.5 12s3.5-7 10.5-7 10.5 7 10.5 7-3.5 7-10.5 7S1.5 12 1.5 12Z" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="3" strokeWidth="1.8" />
    </svg>
  );
}

function CartIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={iconClass(className)}>
      <path d="M3 4h2l2.1 10.2a1 1 0 0 0 1 .8h8.7a1 1 0 0 0 1-.8L20 7H7" strokeWidth="1.8" />
      <circle cx="10" cy="19" r="1.5" strokeWidth="1.8" />
      <circle cx="17" cy="19" r="1.5" strokeWidth="1.8" />
    </svg>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="m12 3.2 2.6 5.3 5.9.9-4.3 4.2 1 5.9L12 16.8l-5.2 2.7 1-5.9-4.3-4.2 5.9-.9L12 3.2Z" />
    </svg>
  );
}
