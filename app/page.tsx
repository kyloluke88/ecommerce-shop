"use client"
import { Button, HStack, Container } from "@chakra-ui/react"
import MainCarousel from "./components/mainCarousel";
import Navigation from "./components/navigation";

import Breadcrumbs from "./components/breadcrumbs";
import ProductGrid from "./(market)/product/page";
import Footer from "./layouts/footer";
import ProductPagination from "./components/pagination";

export default function Home() {

  return (
    <>
      <Navigation />
      {/* <MainCarousel /> */}
      <Breadcrumbs />
      <ProductGrid />
      
      <ProductPagination />
      <Footer />
    </>
  )
}

