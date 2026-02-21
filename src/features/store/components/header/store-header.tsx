"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef } from "react";

import { cn } from "@/lib/utils";
import { GRABIT_CONTAINER_CLASS } from "@/features/store/constants/layout";
import {
  categoryTabs,
  currencyOptions,
  languageOptions,
  locationOptions,
  mainNavLinks,
  mobileMenuSections,
  topContacts,
} from "@/features/store/data/header-data";
import { useStoreUi } from "@/features/store/state/store-ui-context";

const DESKTOP_ICON_CLASS = "h-5 w-5 text-[#4b5966]";

export function StoreHeader() {
  const { state, dispatch } = useStoreUi();
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        dispatch({ type: "CLOSE_POPOVERS" });
        dispatch({ type: "CLOSE_MOBILE_MENU" });
      }
    };

    const onMouseDown = (event: MouseEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        dispatch({ type: "CLOSE_POPOVERS" });
      }
    };

    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onMouseDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onMouseDown);
    };
  }, [dispatch]);

  const activeCategoryTab = useMemo(
    () => categoryTabs.find((tab) => tab.id === state.activeCategoryTab) ?? categoryTabs[0],
    [state.activeCategoryTab],
  );

  return (
    <header ref={headerRef} className="gi-header relative z-[30] bg-white">
      <div className="header-top border-b border-[#eee] bg-[#f8f8fb] py-[10px] text-[#777]">
        <div className={`${GRABIT_CONTAINER_CLASS}`}>
          <div className="flex flex-wrap items-center px-[12px]">
            <div className="hidden grow basis-0 min-[992px]:block">
              <ul className="flex gap-4 text-[13px]">
                {topContacts.map((item, index) => (
                  <li key={`${item.label}-${index}`} className="flex items-center gap-2">
                    <PhoneIcon className="h-[14px] w-[14px]" />
                    <span>{item.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="hidden grow basis-0 text-center text-[13px] min-[1200px]:block">
              World&apos;s Fastest Online Shopping Destination
            </div>

            <div className="hidden grow basis-0 min-[992px]:block">
              <div className="flex items-center justify-end gap-5 text-[13px]">
                <Link href="/account" className="hover:text-[#5caf90]">Help?</Link>
                <Link href="/account" className="hover:text-[#5caf90]">Track Order?</Link>

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => dispatch({ type: "TOGGLE_LANGUAGE_MENU" })}
                    className="flex items-center gap-1 hover:text-[#5caf90]"
                  >
                    {state.selectedLanguage}
                    <ChevronDownIcon className="h-4 w-4" />
                  </button>
                  {state.languageMenuOpen ? (
                    <ul className="absolute right-0 top-[30px] z-[40] min-w-[130px] rounded-[5px] border border-[#eee] bg-white px-[10px] py-[5px]">
                      {languageOptions.map((option) => (
                        <li key={option}>
                          <button
                            type="button"
                            className={cn(
                              "w-full border-b border-[#eee] px-[7px] py-[7px] text-left text-[14px] text-[#4b5966] last:border-b-0 hover:text-[#5caf90]",
                              option === state.selectedLanguage && "font-medium",
                            )}
                            onClick={() => dispatch({ type: "SET_LANGUAGE", payload: option })}
                          >
                            {option}
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => dispatch({ type: "TOGGLE_CURRENCY_MENU" })}
                    className="flex items-center gap-1 hover:text-[#5caf90]"
                  >
                    {state.selectedCurrency}
                    <ChevronDownIcon className="h-4 w-4" />
                  </button>
                  {state.currencyMenuOpen ? (
                    <ul className="absolute right-0 top-[30px] z-[40] min-w-[130px] rounded-[5px] border border-[#eee] bg-white px-[10px] py-[5px]">
                      {currencyOptions.map((option) => (
                        <li key={option}>
                          <button
                            type="button"
                            className={cn(
                              "w-full border-b border-[#eee] px-[7px] py-[7px] text-left text-[14px] text-[#4b5966] last:border-b-0 hover:text-[#5caf90]",
                              option === state.selectedCurrency && "font-medium",
                            )}
                            onClick={() => dispatch({ type: "SET_CURRENCY", payload: option })}
                          >
                            {option}
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="grow basis-0 min-[992px]:hidden">
              <div className="flex items-center justify-end gap-6 text-[#4b5966]">
                <Link href="/account" aria-label="Account"><UserIcon className={DESKTOP_ICON_CLASS} /></Link>
                <Link href="/account" aria-label="Wishlist" className="relative">
                  <HeartIcon className={DESKTOP_ICON_CLASS} />
                  <span className="absolute -right-[7px] -top-[5px] inline-flex h-[15px] w-[15px] items-center justify-center rounded-full bg-[#5caf90] text-[10px] text-white">3</span>
                </Link>
                <Link href="/cart" aria-label="Cart" className="relative">
                  <BagIcon className={DESKTOP_ICON_CLASS} />
                  <span className="absolute -right-[7px] -top-[5px] inline-flex h-[15px] w-[15px] items-center justify-center rounded-full bg-[#5caf90] text-[10px] text-white">3</span>
                </Link>
                <button
                  type="button"
                  aria-label="Open menu"
                  onClick={() => dispatch({ type: "TOGGLE_MOBILE_MENU" })}
                >
                  <MenuIcon className={DESKTOP_ICON_CLASS} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="gi-header-bottom border-b border-[#eee] py-[30px] max-[991px]:py-[15px]">
        <div className={`${GRABIT_CONTAINER_CLASS}`}>
          <div className="flex flex-wrap px-[12px]">
            <div className="flex w-full flex-row justify-between max-[575px]:flex-col">
              <div className="self-center max-[575px]:mb-[15px]">
                <Link href="/" className="inline-flex">
                  <Image src="/assets/img/logo/logo.png" alt="Grabit" width={144} height={42} className="w-[144px] max-[1199px]:w-[130px] max-[991px]:w-[120px] max-[767px]:w-[100px]" />
                </Link>
              </div>

              <div className="my-0 mx-auto self-center max-[991px]:m-0">
                <div className="relative w-full min-w-[700px] px-[30px] max-[1399px]:min-w-[500px] max-[1199px]:min-w-[400px] max-[991px]:min-w-[350px] max-[991px]:px-0 max-[480px]:min-w-[300px] max-[320px]:min-w-full">
                  <form
                    className="relative flex items-center rounded-[5px] border border-[#eee]"
                    onSubmit={(event) => {
                      event.preventDefault();
                    }}
                  >
                    <input
                      type="text"
                      value={state.searchQuery}
                      onChange={(event) =>
                        dispatch({ type: "SET_SEARCH_QUERY", payload: event.target.value })
                      }
                      className="block h-[50px] min-h-[50px] w-full border-0 bg-transparent px-[15px] text-[13px] leading-[1] text-[#777] outline-none max-[991px]:h-[40px] max-[991px]:min-h-[40px]"
                      placeholder="Search Products..."
                    />
                    <button type="submit" className="flex h-[40px] w-[48px] basis-[48px] items-center justify-center">
                      <SearchIcon className="h-[18px] w-[18px] text-[#4b5966]" />
                    </button>
                  </form>
                </div>
              </div>

              <div className="hidden self-center min-[992px]:block">
                <div className="flex items-center justify-end">
                  <div className="relative mr-[30px]">
                    <button
                      type="button"
                      onClick={() => dispatch({ type: "TOGGLE_ACCOUNT_MENU" })}
                      className="flex items-center whitespace-nowrap text-[#4b5966]"
                    >
                      <UserIcon className={DESKTOP_ICON_CLASS} />
                      <span className="ml-[10px] flex flex-col text-left uppercase">
                        <span className="mb-[6px] text-[12px] capitalize leading-[1] text-[#777]">Account</span>
                        <span className="text-[13px] font-medium leading-[14px]">Login</span>
                      </span>
                    </button>
                    {state.accountMenuOpen ? (
                      <ul className="absolute left-0 top-[50px] z-[40] min-w-[150px] rounded-[5px] border border-[#eee] bg-white py-[5px]">
                        <li><Link href="/account" className="block px-[20px] py-[10px] text-[13px] text-[#777] hover:text-[#5caf90]">Register</Link></li>
                        <li><Link href="/checkout" className="block px-[20px] py-[10px] text-[13px] text-[#777] hover:text-[#5caf90]">Checkout</Link></li>
                        <li><Link href="/account" className="block px-[20px] py-[10px] text-[13px] text-[#777] hover:text-[#5caf90]">Login</Link></li>
                      </ul>
                    ) : null}
                  </div>

                  <Link href="/account" className="mr-[30px] flex items-center whitespace-nowrap text-[#4b5966]">
                    <HeartIcon className={DESKTOP_ICON_CLASS} />
                    <span className="ml-[10px] flex flex-col uppercase">
                      <span className="mb-[6px] text-[12px] capitalize leading-[1] text-[#777]">Wishlist</span>
                      <span className="text-[13px] font-medium leading-[14px]">3-items</span>
                    </span>
                  </Link>

                  <Link href="/cart" className="flex items-center whitespace-nowrap text-[#4b5966]">
                    <BagIcon className={DESKTOP_ICON_CLASS} />
                    <span className="ml-[10px] flex flex-col uppercase">
                      <span className="mb-[6px] text-[12px] capitalize leading-[1] text-[#777]">Cart</span>
                      <span className="text-[13px] font-medium leading-[14px]">3-items</span>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden border-y border-[#eee] bg-white min-[992px]:block">
        <div className={`${GRABIT_CONTAINER_CLASS} relative`}>
          <div className="relative flex w-full flex-row justify-between px-[12px]">
            <div className="relative py-[5px]">
              <button
                type="button"
                onClick={() => dispatch({ type: "TOGGLE_ALL_CATEGORIES" })}
                className="relative flex min-h-[50px] w-[200px] items-center rounded-[5px] bg-[#5caf90] px-[15px]"
              >
                <GridIcon className="h-[18px] w-[18px] text-white" />
                <span className="ml-[10px] text-[15px] font-medium text-white">All Categories</span>
                <ChevronDownIcon className="absolute right-[15px] h-[18px] w-[18px] text-white" />
              </button>

              {state.allCategoriesOpen ? (
                <div className="absolute left-0 top-[65px] z-[45] w-[600px] rounded-[5px] border border-[#eee] bg-white p-[15px] shadow-[0_10px_35px_rgba(0,0,0,0.08)]">
                  <div className="flex gap-4">
                    <ul className="flex min-w-[230px] flex-col rounded-[5px] bg-[#f8f8fb] p-[15px]">
                      {categoryTabs.map((tab) => (
                        <li key={tab.id} className="mb-[10px] last:mb-0">
                          <button
                            type="button"
                            onClick={() => dispatch({ type: "SET_ACTIVE_CATEGORY_TAB", payload: tab.id })}
                            className={cn(
                              "flex w-full items-center rounded-[5px] border border-[#eee] bg-white px-[15px] py-[10px] text-left text-[13px] font-medium text-[#4b5966]",
                              tab.id === activeCategoryTab.id && "border-[#5caf90] text-[#5caf90]",
                            )}
                          >
                            {tab.label}
                          </button>
                        </li>
                      ))}
                    </ul>

                    <div className="flex w-full flex-wrap">
                      {activeCategoryTab.columns.map((column) => (
                        <div key={column.title} className="grow px-[12px]">
                          <h6 className="mb-[10px] border-b border-[#eee] pb-[5px] text-[15px] font-medium capitalize leading-[30px] text-[#5caf90]">
                            {column.title}
                          </h6>
                          <ul>
                            {column.links.map((link) => (
                              <li key={link.label}>
                                <Link
                                  href={link.href}
                                  className="block py-[5px] text-[13px] capitalize leading-[28px] text-[#777] hover:text-[#5caf90]"
                                >
                                  {link.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}
            </div>

            <nav className="flex w-full items-center">
              <ul className="flex w-full flex-wrap justify-center pl-0">
                {mainNavLinks.map((item) => (
                  <li key={item.label} className="group relative mx-[20px]">
                    <button
                      type="button"
                      className="flex items-center py-[18px] text-[15px] font-medium capitalize text-[#4b5966]"
                    >
                      {item.label}
                      <ChevronDownIcon className="ml-[4px] h-4 w-4" />
                    </button>

                    {item.children?.length ? (
                      <ul className="invisible absolute left-0 top-[62px] z-[35] min-w-[205px] rounded-[5px] border border-[#eee] bg-white py-[5px] opacity-0 shadow-sm transition-all group-hover:visible group-hover:opacity-100">
                        {item.children.map((child) => (
                          <li key={child.label}>
                            <Link
                              href={child.href}
                              className="block px-[20px] py-[10px] text-[13px] capitalize text-[#777] hover:text-[#5caf90]"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                ))}

                <li className="mx-[20px]">
                  <Link href="/deals" className="flex items-center py-[18px] text-[15px] font-medium text-[#4b5966]">
                    <PercentIcon className="mr-[6px] h-[16px] w-[16px]" />
                    Offers
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="relative py-[5px]">
              <button
                type="button"
                onClick={() => dispatch({ type: "TOGGLE_LOCATION_MENU" })}
                className="relative flex min-h-[50px] w-[200px] items-center rounded-[5px] bg-[#5caf90] px-[15px]"
              >
                <MarkerIcon className="h-[18px] w-[18px] text-white" />
                <span className="w-[calc(100%-30px)] truncate px-[10px] text-left text-[15px] font-medium text-white">
                  {state.selectedLocation}
                </span>
                <ChevronDownIcon className="absolute right-[15px] h-[18px] w-[18px] text-white" />
              </button>

              {state.locationMenuOpen ? (
                <div className="absolute right-0 top-[65px] z-[45] mt-[0] w-[220px] rounded-[5px] border border-[#eee] bg-white px-[13px] py-[15px] shadow-[0_10px_35px_rgba(0,0,0,0.08)]">
                  <ul>
                    {locationOptions.map((location, index) => (
                      <li key={location} className={cn("mb-[10px]", index === locationOptions.length - 1 && "mb-0")}>
                        <button
                          type="button"
                          onClick={() => dispatch({ type: "SET_LOCATION", payload: location })}
                          className={cn(
                            "flex w-full items-center rounded-[5px] border border-[#eee] p-[10px] text-left text-[13px] font-medium capitalize text-[#4b5966] hover:border-[#5caf90] hover:text-[#5caf90]",
                            location === state.selectedLocation && "border-[#5caf90] text-[#5caf90]",
                          )}
                        >
                          <MarkerPlusIcon className="mr-[10px] h-[14px] w-[14px]" />
                          <span className="truncate">{location}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <div
        onClick={() => dispatch({ type: "CLOSE_MOBILE_MENU" })}
        className={cn(
          "fixed inset-0 z-[40] bg-black/70 transition-opacity min-[992px]:hidden",
          state.mobileMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
      />
      <aside
        className={cn(
          "fixed left-0 top-0 z-[41] flex h-full w-[340px] flex-col overflow-auto bg-white px-[20px] pb-[20px] pt-[15px] transition-transform duration-300 max-[480px]:w-[300px] min-[992px]:hidden",
          state.mobileMenuOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="mb-[12px] flex items-center justify-between border-b border-[#eee] pb-[10px]">
          <span className="text-[16px] font-semibold text-[#4b5966]">My Menu</span>
          <button type="button" className="text-[30px] leading-none text-[#777]" onClick={() => dispatch({ type: "CLOSE_MOBILE_MENU" })}>
            ×
          </button>
        </div>

        <div>
          <ul>
            {mobileMenuSections.map((section) => {
              const expanded = Boolean(state.mobileSectionOpen[section.id]);

              return (
                <li key={section.id} className="mb-[12px]">
                  <button
                    type="button"
                    onClick={() => dispatch({ type: "TOGGLE_MOBILE_SECTION", payload: section.id })}
                    className="flex w-full items-center justify-between rounded-[5px] border border-[#eee] p-[12px] text-left text-[15px] font-medium capitalize text-[#777]"
                  >
                    <span>{section.label}</span>
                    <ChevronDownIcon className={cn("h-4 w-4 transition-transform", expanded && "rotate-180")} />
                  </button>

                  <ul className={cn("px-[5px] pt-[8px]", expanded ? "block" : "hidden")}>
                    {section.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          onClick={() => dispatch({ type: "CLOSE_MOBILE_MENU" })}
                          className="block py-[10px] pl-[10px] text-[14px] text-[#777] hover:text-[#5caf90]"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
    </header>
  );
}

function baseIconClasses(className?: string) {
  return cn("stroke-current", className);
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={baseIconClasses(className)}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.86 19.86 0 0 1 3.09 5.18 2 2 0 0 1 5.06 3h3a2 2 0 0 1 2 1.72c.12.9.33 1.77.62 2.61a2 2 0 0 1-.45 2.11L9.1 10.57a16 16 0 0 0 4.33 4.33l1.13-1.13a2 2 0 0 1 2.11-.45c.84.29 1.71.5 2.61.62A2 2 0 0 1 22 16.92Z" strokeWidth="1.8" />
    </svg>
  );
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={baseIconClasses(className)}>
      <path d="M20 21a8 8 0 1 0-16 0" strokeWidth="1.8" />
      <circle cx="12" cy="7" r="4" strokeWidth="1.8" />
    </svg>
  );
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={baseIconClasses(className)}>
      <path d="m12 21-1.5-1.35C5.4 15.1 2 12.05 2 8.5A4.5 4.5 0 0 1 6.5 4C8.24 4 9.91 4.81 11 6.08 12.09 4.81 13.76 4 15.5 4A4.5 4.5 0 0 1 20 8.5c0 3.55-3.4 6.6-8.5 11.15L12 21Z" strokeWidth="1.8" />
    </svg>
  );
}

function BagIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={baseIconClasses(className)}>
      <path d="M6 7h12l-1 13H7L6 7Z" strokeWidth="1.8" />
      <path d="M9 7a3 3 0 1 1 6 0" strokeWidth="1.8" />
    </svg>
  );
}

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={baseIconClasses(className)}>
      <path d="M4 7h16M4 12h16M4 17h16" strokeWidth="1.8" />
    </svg>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={baseIconClasses(className)}>
      <circle cx="11" cy="11" r="7" strokeWidth="1.8" />
      <path d="m20 20-3.5-3.5" strokeWidth="1.8" />
    </svg>
  );
}

function GridIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={baseIconClasses(className)}>
      <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" strokeWidth="1.8" />
    </svg>
  );
}

function MarkerIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={baseIconClasses(className)}>
      <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" strokeWidth="1.8" />
      <circle cx="12" cy="10" r="2.5" strokeWidth="1.8" />
    </svg>
  );
}

function MarkerPlusIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={baseIconClasses(className)}>
      <circle cx="12" cy="12" r="9" strokeWidth="1.8" />
      <path d="M12 8v8M8 12h8" strokeWidth="1.8" />
    </svg>
  );
}

function PercentIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={baseIconClasses(className)}>
      <path d="M19 5 5 19" strokeWidth="1.8" />
      <circle cx="7" cy="7" r="2" strokeWidth="1.8" />
      <circle cx="17" cy="17" r="2" strokeWidth="1.8" />
    </svg>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={baseIconClasses(className)}>
      <path d="m6 9 6 6 6-6" strokeWidth="1.8" />
    </svg>
  );
}
