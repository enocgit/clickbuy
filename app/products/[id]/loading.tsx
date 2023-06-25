import { Skeleton } from "@/components/ui/skeleton"

const ProductDetailLoader = () => {
    return (
        <main className="mx-auto mt-16 lg:mt-20 flex flex-col sm:flex-row w-10/12 min-[400px]:w-9/12 gap-10 min-[810px]:gap-20">
        <Skeleton className="relative h-[300px] w-full sm:w-[600px]" />
        <section className="space-y-10">
          <div className="space-y-2">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[350px]" />
          </div>
          <div className="space-y-5">
            <Skeleton className="h-8 w-[80px]" />
            <div className="flex flex-col min-[810px]:flex-row gap-6">
              <Skeleton className="h-8 w-full sm:w-[80px]" />
              <Skeleton className="h-8 w-full sm:w-[80px]" />
            </div>
          </div>
        </section>
      </main>
    )
}

export default ProductDetailLoader

