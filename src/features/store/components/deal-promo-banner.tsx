import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { dealPromoBanner } from "@/features/store/data/home-data";

export function DealPromoBanner() {
  return (
    <section className="relative overflow-hidden rounded-[8px]">
      <div className="relative min-h-[110px] min-[768px]:min-h-[160px]">
        <Image src={dealPromoBanner.image} alt={dealPromoBanner.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-[2] flex h-full items-center justify-end p-4 min-[768px]:p-6">
          <div className="max-w-[420px] text-right">
            <h3 className="text-[18px] font-bold leading-[1.15] text-[#4b5966] min-[768px]:text-[36px] min-[768px]:leading-[1.08]">
              Fresh Fruits
              <br />
              Healthy Products
            </h3>
            <p className="mt-2 text-[14px] font-normal text-[#4b5966] min-[768px]:text-[22px] min-[768px]:leading-[1.15]">
              <span className="font-semibold text-[#5caf90]">30% off sale</span> Hurry up!!!
            </p>
            <Link href={dealPromoBanner.href} className="mt-3 inline-block">
              <Button className="h-[34px] rounded-[8px] bg-[#5caf90] px-4 text-[14px] font-semibold text-white hover:bg-[#4c9f82]">
                Shop now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
