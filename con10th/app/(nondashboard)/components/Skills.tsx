"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useGetSkillsMutation } from "@/states/features/endpoints/general/generalApiSlice"
import { toast } from "sonner"
import { SkillCard } from "./cards/SkillCard"


interface Category {
  id: string
  name: string
  code: string
}

export default function PopularCategories() {
  const [getSkills, { isLoading: isLoadingSkills }] = useGetSkillsMutation()
  const [categories, setCategories] = useState<Category[]>([])

  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchAllSkills = async () => {
      try {
        const response = await getSkills().unwrap()
        if (response.status) {
          setCategories(response.data)
        } else {
          toast.error("Cannot fetch skills")
        }
      } catch (err) {
        toast.error("Failed to fetch skills. Please try again.")
      }
    }

    fetchAllSkills()
  }, [getSkills])

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
    <div className="w-full py-8 md:py-12">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-4xl font-bold text-primary-700">Most popular skills</h2>
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

        {isLoadingSkills ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-[220px] rounded-xl bg-gray-100 animate-pulse" />
            ))}
          </div>
        ) : (
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-4 pb-6 scrollbar-hide snap-x"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {categories.map((category) => (
              <SkillCard key={category.id} id={category.id} name={category.name} />
            ))}
          </div>
        )}

        <div className="mt-6 bg-primary-100 py-2 px-6 rounded-full w-fit">
          <Link
            href="/categories"
            className="inline-flex items-center text-primary-700 font-semibold md:text-lg hover:text-primary-800 transition-colors"
          >
            See all Skills
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}

