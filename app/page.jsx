import { Banner } from '@/components/ui/banner'
import { ProductGrid } from '@/components/products/productGrid'
import ProductSearch from '@/components/products/productSearch'

export default function Home() {
  return (
    <>
      <Banner />
      <ProductGrid />
      <ProductSearch />
    </>
  )
}
