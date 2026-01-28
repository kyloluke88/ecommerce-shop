// components/ProductGrid.jsx
'use client'
import Navigation from "../../layouts/navigation";
import Breadcrumbs from "../../components/breadcrumbs";
import ProductGrid from "../../components/products/productGrid";
import Footer from "../../layouts/footer";


export default function Products() {
  return (
    <>
      <Navigation />
      <Breadcrumbs />

      <ProductGrid />

       <Footer />

    </>
  )
}