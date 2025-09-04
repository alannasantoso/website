import { useState } from "react";
import Header from "../components/Header";
import Gallery from "../components/Gallery";
import { photos } from "../data/photos";
import { useEffect } from 'react'



export default function Photos() {
  
  useEffect(() => {
    document.title = 'photos | alannasantoso'
  }, [])

  const [activeCategory, setActiveCategory] = useState<string>("all");
  
  const categories = ["all", ...Array.from(new Set(photos.map(p => p.category)))];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="min-h-screen mx-auto w-screen md:min-w-[800px] md:w-[50%] pt-12 pl-10 md:pl-20 pr-10 md:pr-20 mb-30">
            <p className="text-3xl font-[dm_sans]">camera roll:</p>
            <p className="mt-5">this page is a collection of some of alanna's favourite photos from
              over the years, putting them on the internet instead of rotting in adobe lightroom so her
              efforts carrying 2kg of gear everywhere was not to waste.
            </p>
            <p className="mt-5 mb-8 text-sm italic">mostly taken on my nikon d800, or on an assortment of film</p>
          {/* Category Selection */}
          <div className="mb-6 text-right">
            <div className="w-full flex flex-wrap gap-2 flex align-right justify-end text-right">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 text-sm font-medium transition-colors hover:cursor-pointer ${
                    activeCategory === category
                      ? "text-white"
                      : "text-gray-500"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Gallery */}
          <div className="">

            <Gallery activeCategory={activeCategory === "all" ? undefined : activeCategory} />
          </div>
          
        </div>
      </main>
    </div>
  );
}