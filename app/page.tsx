"use client"
import MainCarousel from "./components/mainCarousel";
import Navigation from "./layouts/navigation";

import ProductGrid from "./components/products/productGrid";
import Footer from "./layouts/footer";
import ProductPagination from "./components/pagination";

export default function Home() {

  return (
    <>
      <Navigation />
      <MainCarousel />
      <ProductGrid />
      
      <ProductPagination />
      <Footer />
    </>
  )
}

