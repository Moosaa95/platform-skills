"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Category {
  id: string
  name: string
  image: string
}

export default function PopularCategories() {
  const categories: Category[] = [
    {
      id: "content-writing",
      name: "Content Writing",
      image: "/assets/images/categories/content-writing.jpg",
    },
    {
      id: "seo",
      name: "SEO",
      image: "/assets/images/categories/seo.jpg",
    },
    {
      id: "website-development",
      name: "Website Development",
      image: "/assets/images/categories/website-development.jpg",
    },
    {
      id: "logo-design",
      name: "Logo Design",
      image: "/assets/images/categories/logo-design.jpg",
    },
    {
      id: "fashion-design",
      name: "Fashion Design",
      image: "/assets/images/categories/fashion-design.jpg",
    },
    {
      id: "plumbing",
      name: "Plumbing",
      image: "/assets/images/categories/plumbing.jpg",
    },
  ]

  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" })
    }
  }

  return (
    <div className="w-full py-8 md:py-12 md:px-24">
      <div className="container px-4 mx-auto gap-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-4xl font-[700] text-primary-700">Most popular categories</h2>
          <div className="flex space-x-2">
            <Button
              onClick={scrollLeft}
              variant="outline"
              size="icon"
              className="rounded-full border-gray-200 hover:bg-gray-100"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              onClick={scrollRight}
              variant="outline"
              size="icon"
              className="rounded-full border-gray-200 hover:bg-gray-100"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide snap-x"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {categories.map((category) => (
            <Link
              href={`/categories/${category.id}`}
              key={category.id}
              className="relative min-w-[230px] sm:min-w-[280px] h-[287px] rounded-lg overflow-hidden snap-start group"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/0 z-10" />
              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute top-10 left-0 p-4 z-20">
                <h3 className="text-xl font-[700] text-white">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6 bg-primary-100 md:py-2 md:px-6 rounded-full w-fit">
          <Link
            href="/categories"
            className="inline-flex items-center text-primary-700 font-[600] md:text-lg hover:text-primary-800 transition-colors"
          >
            See all Skills
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}

