import { Skeleton } from "@/components/ui/skeleton"

const CategoriesDetailLoader = () => {
    const sampleArr = [1, 2, 3,]

    return (
        <main className="overflow-x-hidden">
        <div className="mt-24 bg-[#d4b464] px-5 py-2 pb-10 xl:px-28">
          <div className="breadcrumbs relative bottom-14 mx-5 text-left text-sm font-[500] xl:mx-20">
            <ul>
              <li>
                <div>Categories</div>
              </li>
              <li>
                <Skeleton className="h-4 w-[80px]" />
              </li>
            </ul>
          </div>
          <section className="grid gap-20 gap-x-10 min-[480px]:grid-cols-2 min-[720px]:grid-cols-3 xl:gap-x-5 2xl:grid-cols-4 min-[2080px]:grid-cols-6">
        {sampleArr.map(num => (
          <div key={num} className="flex flex-col items-center gap-4">
              <Skeleton className="h-52 w-52 lg:h-60 lg:w-60 bg-neutral-300 bg-opacity-50" />
              <Skeleton className="h-4 w-[200px] bg-neutral-300 bg-opacity-50" />
              <Skeleton className="h-4 w-[90px] bg-neutral-300 bg-opacity-50" />
              <Skeleton className="h-8 w-[120px] bg-neutral-300 bg-opacity-50" />
          </div>
        ))}
      </section>
        </div>
       
      </main>
    )
}

export default CategoriesDetailLoader

