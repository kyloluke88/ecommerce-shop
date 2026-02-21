"use client";

import { type MouseEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { GRABIT_CONTAINER_CLASS } from "@/features/store/constants/layout";
import type { StoreProduct } from "@/features/store/data/home-data";

type ProductDetailPageViewProps = {
  product: StoreProduct;
  recommendedProducts: StoreProduct[];
  galleryImages: string[];
};
type ProductTab = "detail" | "specifications" | "vendor" | "reviews";
type ProductSpecRow = {
  name: string;
  price: number;
  stock: number;
  highlight?: boolean;
};

const MOCK_SPEC_ROWS: ProductSpecRow[] = [
  { name: "虎皮若羌枣250克（去皮去核）", price: 5.8, stock: 34492, highlight: true },
  { name: "和田枣四级500克（电商引流）", price: 6.9, stock: 22681 },
  { name: "和田枣一级250克（4-4.5cm）", price: 5.1, stock: 18703 },
  { name: "和田枣一级500克（4-4.5cm）", price: 8.2, stock: 11774 },
  { name: "和田枣二级250克（性价比高）", price: 4.5, stock: 23193 },
  { name: "和田枣二级500克（性价比高）", price: 6.9, stock: 15234 },
  { name: "若羌枣一级250克（走亲访友）", price: 4.6, stock: 22384 },
  { name: "若羌枣一级500克（走亲访友）", price: 7.2, stock: 16583 },
];

function formatPrice(price: number) {
  return `$${price.toFixed(2)}`;
}

export function ProductDetailPageView({
  product,
  recommendedProducts,
  galleryImages,
}: ProductDetailPageViewProps) {
  const images = galleryImages.length > 0 ? galleryImages : [product.image];
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [activeTab, setActiveTab] = useState<ProductTab>("detail");
  const [specQuantities, setSpecQuantities] = useState<number[]>(
    () => MOCK_SPEC_ROWS.map(() => 0),
  );

  const activeImage = images[selectedImageIndex] ?? images[0];
  const selectedSpecCount = specQuantities.filter((qty) => qty > 0).length;
  const totalBags = specQuantities.reduce((sum, qty) => sum + qty, 0);
  const totalAmount = specQuantities.reduce(
    (sum, qty, index) => sum + qty * MOCK_SPEC_ROWS[index].price,
    0,
  );

  function updateSpecQty(index: number, nextQty: number) {
    const stockLimit = MOCK_SPEC_ROWS[index].stock;
    const safeQty = Number.isFinite(nextQty)
      ? Math.max(0, Math.min(stockLimit, Math.trunc(nextQty)))
      : 0;

    setSpecQuantities((prev) => prev.map((qty, idx) => (idx === index ? safeQty : qty)));
  }

  function handleZoomMove(event: MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
    });
  }

  return (
    <main className={`${GRABIT_CONTAINER_CLASS} py-8`}>
      <div className="flex flex-wrap min-[992px]:flex-nowrap">
        <section className="w-full px-3 min-[992px]:w-auto min-[992px]:flex-1">
          <div className="rounded-[5px] border border-[#eee] bg-white p-4 min-[992px]:p-6">
            <div className="flex flex-wrap">
              <div className="w-full min-[1200px]:w-[calc(47.3%-5px)] min-[1200px]:pr-3">
                <div className="rounded-[5px] border border-[#eee]">
                  <div
                    onMouseEnter={() => setZoomed(true)}
                    onMouseLeave={() => setZoomed(false)}
                    onMouseMove={handleZoomMove}
                    className="relative aspect-square cursor-zoom-in overflow-hidden rounded-[5px] bg-[#f8f8fb]"
                  >
                    <Image
                      key={activeImage}
                      src={activeImage}
                      alt={product.name}
                      fill
                      className="object-contain transition-transform duration-150"
                      style={{
                        transform: zoomed ? "scale(1.85)" : "scale(1)",
                        transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                      }}
                    />
                  </div>
                  <div className="mt-2 flex w-full gap-[11px] overflow-x-auto p-2">
                    {images.map((image, index) => (
                      <button
                        key={`${image}-${index}`}
                        type="button"
                        onClick={() => setSelectedImageIndex(index)}
                        className={`relative h-[88px] w-[88px] shrink-0 overflow-hidden rounded-[5px] border transition ${index === selectedImageIndex ? "border-[#5caf90]" : "border-[#eee] hover:border-[#5caf90]"
                          }`}
                        aria-label={`Select product image ${index + 1}`}
                      >
                        <Image
                          src={image}
                          alt={`${product.name} preview ${index + 1}`}
                          fill
                          className="object-contain bg-[#f8f8fb] p-2"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 w-full min-[1200px]:mt-0 min-[1200px]:w-[calc(52.7%+5px)] min-[1200px]:pl-3">
                <h1 className="mb-4 text-[22px] font-medium leading-[1.5] text-[#4b5966] max-[767px]:text-[18px]">
                  {product.name}
                </h1>

                <div className="mb-4 flex items-center gap-3">
                  <div className="flex gap-[2px]">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <StarIcon
                        key={index}
                        className={index < Math.round(product.rating) ? "h-[15px] w-[15px] text-[#f7a14c]" : "h-[15px] w-[15px] text-[#c9c9c9]"}
                      />
                    ))}
                  </div>
                  <span className="text-[14px] text-[#777]">({Math.round(product.rating * 12)} reviews)</span>
                </div>

                <div className="mb-4 flex flex-wrap items-end gap-3 border-y border-[#eee] py-4">
                  <span className="text-[28px] font-bold leading-none text-[#4b5966]">{formatPrice(product.price)}</span>
                  {product.originalPrice ? (
                    <span className="text-[20px] text-[#999] line-through">{formatPrice(product.originalPrice)}</span>
                  ) : null}
                  {product.badge ? (
                    <span className="rounded-[5px] bg-[#ff7070] px-[10px] py-[4px] text-[11px] font-semibold uppercase text-white">
                      {product.badge}
                    </span>
                  ) : null}
                </div>

                <div className="space-y-2 text-[15px] text-[#777]">
                  <p><span className="font-medium text-[#4b5966]">Category:</span> {product.category}</p>

                </div>

                <p className="my-5 text-[14px] leading-[28px] text-[#777]">
                  Premium quality product inspired by the Grabit detail layout. Fresh stock, secure packing, and fast delivery support for daily grocery shopping.
                </p>

                <div className="mb-5 overflow-hidden rounded-[6px] border border-[#ececec] bg-[#fafafa] text-[#4b5966]">
                  {MOCK_SPEC_ROWS.map((row, index) => (
                    <div
                      key={row.name}
                      className={`grid grid-cols-[minmax(0,1fr)_100px_150px_170px] items-center gap-3 px-3 py-2 max-[767px]:grid-cols-1 max-[767px]:gap-2 ${index !== MOCK_SPEC_ROWS.length - 1 ? "border-b border-[#e8e8e8]" : ""
                        }`}
                    >
                      <div className="min-w-0 text-[14px] font-normal leading-[1.5]">

                        <span className="font-normal">{row.name}</span>
                      </div>

                      <div className="text-right text-[15px] font-normal leading-none max-[767px]:text-left">
                        ¥{row.price}
                      </div>

                      <div className="text-right text-[14px] font-normal max-[767px]:text-left">
                        库存{row.stock}袋
                      </div>

                      <div className="flex items-center justify-end gap-5 max-[767px]:justify-start">
                        <button
                          type="button"
                          disabled={specQuantities[index] === 0}
                          onClick={() => updateSpecQty(index, specQuantities[index] - 1)}
                          className={`inline-flex h-[30px] w-[30px] items-center justify-center rounded-[4px] bg-[#ebebeb] text-[20px] font-normal leading-none transition-all duration-150 ${
                            specQuantities[index] === 0
                              ? "cursor-not-allowed text-[#b4b4b4]"
                              : "hover:font-semibold hover:text-[#5caf90] active:translate-y-[1px] active:scale-95 active:bg-[#dcdcdc] active:shadow-inner"
                          }`}
                          aria-label={`decrease ${row.name}`}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          min={0}
                          max={row.stock}
                          value={specQuantities[index]}
                          onChange={(event) => {
                            const raw = event.target.value.trim();
                            updateSpecQty(index, raw === "" ? 0 : Number(raw));
                          }}
                          className="h-[28px] w-[40px] appearance-none bg-transparent text-center text-[15px] font-normal leading-none outline-none [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                          aria-label={`quantity for ${row.name}`}
                        />
                        <button
                          type="button"
                          onClick={() => updateSpecQty(index, specQuantities[index] + 1)}
                          className="inline-flex h-[30px] w-[30px] items-center justify-center rounded-[4px] bg-[#ebebeb] text-[20px] font-normal leading-none transition-all duration-150 hover:font-semibold hover:text-[#5caf90] active:translate-y-[1px] active:scale-95 active:bg-[#dcdcdc] active:shadow-inner"
                          aria-label={`increase ${row.name}`}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {totalBags > 0 ? (
                  <>
                    <div className="mb-4 overflow-x-auto border-t border-[#eee] pt-3 text-[14px] text-[#777]">
                      <div className="flex min-w-[760px] items-center justify-between gap-4 whitespace-nowrap">
                        <div>
                          已选
                          <span className="px-1 text-[#ff4d1f]">{selectedSpecCount}</span>款
                          <span className="px-1 text-[#ff4d1f]">{totalBags}</span>袋
                        </div>
                        <div>
                          商品金额：
                          <span className="pl-1 text-[17px] font-semibold text-[#ff4d1f]">
                            ¥{totalAmount.toFixed(2)}
                          </span>
                        </div>
                        <div>
                          另需运费（预估）：
                          <span className="pl-1 text-[17px] font-semibold text-[#ff4d1f]">¥0</span>
                        </div>
                        <div className="text-[#1d6cff]">最晚2月27日发货</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <button type="button" className="h-[44px] rounded-[5px] bg-[#5caf90] px-5 text-[14px] font-medium text-white hover:bg-[#4b5966]">
                        Add to cart
                      </button>
                      <button type="button" className="h-[44px] rounded-[5px] border border-[#eee] px-5 text-[14px] font-medium text-[#4b5966] hover:border-[#5caf90] hover:text-[#5caf90]">
                        Buy now
                      </button>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </div>

          <div className="mt-8">
            <div role="tablist" aria-label="Product details tabs" className="flex flex-wrap gap-[10px]">
              <TabButton
                id="detail"
                label="Detail"
                isActive={activeTab === "detail"}
                onClick={() => setActiveTab("detail")}
              />
              <TabButton
                id="specifications"
                label="Specifications"
                isActive={activeTab === "specifications"}
                onClick={() => setActiveTab("specifications")}
              />
              <TabButton
                id="vendor"
                label="Vendor"
                isActive={activeTab === "vendor"}
                onClick={() => setActiveTab("vendor")}
              />
              <TabButton
                id="reviews"
                label="Reviews"
                isActive={activeTab === "reviews"}
                onClick={() => setActiveTab("reviews")}
              />
            </div>

            <div
              id={`panel-${activeTab}`}
              role="tabpanel"
              aria-live="polite"
              className="mt-[10px] rounded-[5px] border border-[#eee] bg-white p-[24px] max-[575px]:p-[16px]"
            >
              {activeTab === "detail" ? (
                <div className="space-y-3 text-[14px] leading-[28px] text-[#777]">
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                    the industry&apos;s standard dummy text ever since the 1500s.
                  </p>
                  <ul className="list-disc space-y-1 pl-5 text-[15px] leading-[1.7]">
                    <li>Any Product types that you want - Simple, Configurable</li>
                    <li>Downloadable/Digital Products, Virtual Products</li>
                    <li>Inventory Management with Backordered items</li>
                    <li>Flatlock seams throughout.</li>
                  </ul>
                  <p>
                    There are many variations of passages of Lorem Ipsum available, but the majority have suffered
                    alteration in some form, by injected humour, or randomised words which do not look believable.
                  </p>
                </div>
              ) : null}

              {activeTab === "specifications" ? (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[980px] border border-[#d8d8d8] text-left text-[14px] text-[#333]">
                    <thead className="bg-[#e7e7e7]">
                      <tr>
                        <th className="px-3 py-3 font-semibold">包装规格</th>
                        <th className="px-3 py-3 font-semibold">长(cm)</th>
                        <th className="px-3 py-3 font-semibold">宽(cm)</th>
                        <th className="px-3 py-3 font-semibold">高(cm)</th>
                        <th className="px-3 py-3 font-semibold">
                          体积(cm<sup>3</sup>)
                        </th>
                        <th className="px-3 py-3 font-semibold">重量(g)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-[#d8d8d8]">
                        <td className="px-3 py-3">虎皮若羌枣250克（去皮去核）</td>
                        <td className="px-3 py-3">17</td>
                        <td className="px-3 py-3">5</td>
                        <td className="px-3 py-3">25</td>
                        <td className="px-3 py-3">2125</td>
                        <td className="px-3 py-3">300</td>
                      </tr>
                      <tr className="border-t border-[#d8d8d8]">
                        <td className="px-3 py-3">和田枣四级250克（电商引流）</td>
                        <td className="px-3 py-3">19</td>
                        <td className="px-3 py-3">5</td>
                        <td className="px-3 py-3">26</td>
                        <td className="px-3 py-3">2470</td>
                        <td className="px-3 py-3">300</td>
                      </tr>
                      <tr className="border-t border-[#d8d8d8]">
                        <td className="px-3 py-3">和田枣四级500克（电商引流）</td>
                        <td className="px-3 py-3">20</td>
                        <td className="px-3 py-3">5</td>
                        <td className="px-3 py-3">29</td>
                        <td className="px-3 py-3">2900</td>
                        <td className="px-3 py-3">600</td>
                      </tr>
                      <tr className="border-t border-[#d8d8d8]">
                        <td className="px-3 py-3">和田枣一级250克（4-4.5cm）</td>
                        <td className="px-3 py-3">19</td>
                        <td className="px-3 py-3">5</td>
                        <td className="px-3 py-3">26</td>
                        <td className="px-3 py-3">2470</td>
                        <td className="px-3 py-3">300</td>
                      </tr>
                      <tr className="border-t border-[#d8d8d8]">
                        <td className="px-3 py-3">和田枣一级500克（4-4.5cm）</td>
                        <td className="px-3 py-3">20</td>
                        <td className="px-3 py-3">5</td>
                        <td className="px-3 py-3">29</td>
                        <td className="px-3 py-3">2900</td>
                        <td className="px-3 py-3">600</td>
                      </tr>
                      <tr className="border-t border-[#d8d8d8]">
                        <td className="px-3 py-3">和田枣二级250克（性价比高）</td>
                        <td className="px-3 py-3">19</td>
                        <td className="px-3 py-3">5</td>
                        <td className="px-3 py-3">26</td>
                        <td className="px-3 py-3">2470</td>
                        <td className="px-3 py-3">300</td>
                      </tr>
                      <tr className="border-t border-[#d8d8d8]">
                        <td className="px-3 py-3">和田枣二级500克（性价比高）</td>
                        <td className="px-3 py-3">20</td>
                        <td className="px-3 py-3">5</td>
                        <td className="px-3 py-3">29</td>
                        <td className="px-3 py-3">2900</td>
                        <td className="px-3 py-3">600</td>
                      </tr>
                      <tr className="border-t border-[#d8d8d8]">
                        <td className="px-3 py-3">若羌枣一级250克（走亲访友）</td>
                        <td className="px-3 py-3">15</td>
                        <td className="px-3 py-3">5</td>
                        <td className="px-3 py-3">29</td>
                        <td className="px-3 py-3">2175</td>
                        <td className="px-3 py-3">300</td>
                      </tr>
                      <tr className="border-t border-[#d8d8d8]">
                        <td className="px-3 py-3">若羌枣一级500克（走亲访友）</td>
                        <td className="px-3 py-3">20</td>
                        <td className="px-3 py-3">5</td>
                        <td className="px-3 py-3">32</td>
                        <td className="px-3 py-3">3200</td>
                        <td className="px-3 py-3">600</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ) : null}

              {activeTab === "vendor" ? (
                <div className="text-[14px] leading-[28px] text-[#777]">
                  <div className="mb-[15px] flex items-start gap-3">
                    <div className="relative h-[80px] w-[80px] overflow-hidden rounded-[5px] border border-[#eee] bg-[#f8f8fb]">
                      <Image src="/assets/img/vendor/3.jpg" alt="Vendor" fill className="object-cover" />
                    </div>
                    <div>
                      <h4 className="text-[15px] font-semibold text-[#4b5966]">Ocean Crate</h4>
                      <p>Products : 358</p>
                      <p>Sales : 5587</p>
                    </div>
                  </div>
                  <ul className="list-disc space-y-1 pl-5 text-[15px] leading-[1.7]">
                    <li><span className="mr-[10px] font-medium text-[#4b5966]">Phone No.:</span> +00 987654321</li>
                    <li><span className="mr-[10px] font-medium text-[#4b5966]">Email:</span> Example@gmail.com</li>
                    <li><span className="mr-[10px] font-medium text-[#4b5966]">Address:</span> Madisonville, KY, USA.</li>
                  </ul>
                </div>
              ) : null}

              {activeTab === "reviews" ? (
                <div className="space-y-5 text-[14px] leading-[24px] text-[#777]">
                  <div className="space-y-4">
                    <div className="border-b border-[#eee] pb-4">
                      <p className="text-[15px] font-medium text-[#4b5966]">Mariya Lykra</p>
                      <div className="mb-2 mt-1 flex gap-[2px]">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <StarIcon key={index} className={index < 4 ? "h-[14px] w-[14px] text-[#f7a14c]" : "h-[14px] w-[14px] text-[#c9c9c9]"} />
                        ))}
                      </div>
                      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    </div>
                    <div className="border-b border-[#eee] pb-4">
                      <p className="text-[15px] font-medium text-[#4b5966]">Moris Willson</p>
                      <div className="mb-2 mt-1 flex gap-[2px]">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <StarIcon key={index} className={index < 3 ? "h-[14px] w-[14px] text-[#f7a14c]" : "h-[14px] w-[14px] text-[#c9c9c9]"} />
                        ))}
                      </div>
                      <p>Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s.</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="mb-2 text-[18px] font-semibold text-[#4b5966]">Add a Review</h4>
                    <div className="grid gap-3">
                      <input
                        type="text"
                        placeholder="Name"
                        className="h-[44px] rounded-[5px] border border-[#eee] px-3 text-[14px] outline-none focus:border-[#5caf90]"
                      />
                      <input
                        type="email"
                        placeholder="Email"
                        className="h-[44px] rounded-[5px] border border-[#eee] px-3 text-[14px] outline-none focus:border-[#5caf90]"
                      />
                      <textarea
                        placeholder="Enter your comment"
                        className="h-[120px] rounded-[5px] border border-[#eee] p-3 text-[14px] outline-none focus:border-[#5caf90]"
                      />
                      <button type="button" className="h-[42px] w-[120px] rounded-[5px] bg-[#5caf90] text-[14px] font-medium text-white hover:bg-[#4b5966]">
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </section>

        <aside className="mt-8 w-full px-3 min-[992px]:mt-0 min-[992px]:w-[320px] min-[992px]:shrink-0">
          <div className="rounded-[5px] border border-[#eee] bg-white p-4">
            <div className="border-b border-[#eee] pb-3">
              <h3 className="text-[17px] font-semibold leading-[1.2] text-[#4b5966]">Recommended Products</h3>
            </div>

            <div className="mt-3 space-y-3">
              {recommendedProducts.map((item) => (
                <article key={item.id} className="flex gap-3 rounded-[5px] border border-[#eee] p-2">
                  <Link href={item.href} className="relative block h-[90px] w-[90px] shrink-0 overflow-hidden rounded-[5px] bg-[#f8f8fb]">
                    <Image src={item.image} alt={item.name} fill className="object-contain p-2" />
                  </Link>
                  <div className="min-w-0 pt-[2px]">
                    <p className="truncate text-[13px] text-[#999]">{item.category}</p>
                    <Link href={item.href} className="mt-[3px] line-clamp-2 text-[14px] leading-[1.4] text-[#4b5966] hover:text-[#5caf90]">
                      {item.name}
                    </Link>
                    <div className="mt-[6px] flex gap-[2px]">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <StarIcon
                          key={index}
                          className={index < Math.round(item.rating) ? "h-[13px] w-[13px] text-[#f7a14c]" : "h-[13px] w-[13px] text-[#c9c9c9]"}
                        />
                      ))}
                    </div>
                    <div className="mt-[6px] flex items-center gap-2">
                      <span className="text-[14px] font-bold text-[#4b5966]">{formatPrice(item.price)}</span>
                      {item.originalPrice ? (
                        <span className="text-[13px] text-[#999] line-through">{formatPrice(item.originalPrice)}</span>
                      ) : null}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}

function TabButton({
  id,
  label,
  isActive,
  onClick,
}: {
  id: ProductTab;
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      id={`tab-${id}`}
      role="tab"
      aria-selected={isActive}
      aria-controls={`panel-${id}`}
      type="button"
      onClick={onClick}
      className={`inline-flex min-h-[52px] items-center justify-center rounded-[10px] border px-[28px] text-[15px] font-medium leading-none transition max-[991px]:min-h-[44px] max-[991px]:text-[14px] ${isActive
          ? "border-[#5caf90] bg-[#5caf90] text-white"
          : "border-[#e6e6e6] bg-white text-[#4b5966] hover:border-[#5caf90] hover:text-[#5caf90]"
        }`}
    >
      {label}
    </button>
  );
}

function StarIcon({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="m12 3.2 2.6 5.3 5.9.9-4.3 4.2 1 5.9L12 16.8l-5.2 2.7 1-5.9-4.3-4.2 5.9-.9L12 3.2Z" />
    </svg>
  );
}
