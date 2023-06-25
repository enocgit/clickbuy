import { Skeleton } from "@/components/ui/skeleton"

export default function CategoriesLoader() {
  const sampleArr = [1, 2, 3,]

  return (
    <main className="overflow-x-hidden">
    <div className="mt-10 px-5 py-20 lg:px-28">
      <h1 className="relative bottom-10 mx-5 text-left text-2xl font-[500] xl:mx-20">
        Categories
      </h1>
      <section className="grid gap-20 gap-x-10 min-[480px]:grid-cols-2 min-[720px]:grid-cols-3 xl:gap-x-5 2xl:grid-cols-4 min-[2080px]:grid-cols-6">
        {sampleArr.map(num => (
          <div key={num} className="flex flex-col items-center gap-4">
              <Skeleton className="h-52 w-52 lg:h-60 lg:w-60" />
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[90px]" />
              <Skeleton className="h-8 w-[120px]" />
          </div>
        ))}
      </section>
    </div>
  </main>
  )
}
