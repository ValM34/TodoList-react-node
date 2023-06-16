"use client";

import { ProductFetcherProvider } from "../../../application/shop/contexts/productFetcherContext";
import ProductDetailPage from "../../../presentation/shop/pages/ProductDetailPage";

export default function ProductDetailPagePage() {
  return (
    <ProductFetcherProvider>
      <ProductDetailPage />
    </ProductFetcherProvider>
  );
}
