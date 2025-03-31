"use client"

import { useRef } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ExpertCardLink } from "./cards/TopExpertCard"
import { ExpertProps } from "./cards/ExpertCard"

export default function TopExperts() {
  const experts: ExpertProps[] = [
    {
      id: "muhammad-basheer-1",
      name: "Muhammad Basheer",
      image: "/assets/images/experts/muhammad-basheer-1.jpg",
      verifiedIn: "Design",
      jobTitle: "Product Designer",
      skills: [{ name: "Figma" }, { name: "Illustration" }, { name: "Aftereffect" }, { name: "Blender" }],
    },
    {
      id: "muhammad-basheer-2",
      name: "Muhammad Basheer",
      image: "/assets/images/experts/muhammad-basheer-2.jpg",
      verifiedIn: "Design",
      jobTitle: "Graphic Designer",
      skills: [{ name: "Adobe Photoshop" }, { name: "Illustration" }, { name: "Aftereffect" }, { name: "Blender" }],
    },
    {
      id: "muhammad-basheer-3",
      name: "Muhammad Basheer",
      image: "/assets/images/experts/muhammad-basheer-3.jpg",
      verifiedIn: "Project Management",
      jobTitle: "IT Project Manager",
      skills: [{ name: "Program Management" }, { name: "Agile Project Managemnt" }],
    },
    {
      id: "muhammad-basheer-4",
      name: "Muhammad Basheer",
      image: "/assets/images/experts/muhammad-basheer-4.jpg",
      verifiedIn: "Project Management",
      jobTitle: "Agile Project Manager",
      skills: [{ name: "Agile Project Managemnt" }, { name: "Scrum Master Consulting" }],
    },
    {
      id: "muhammad-basheer-5",
      name: "Muhammad Basheer",
      image: "/assets/images/experts/muhammad-basheer-5.jpg",
      verifiedIn: "Project Management",
      jobTitle: "Agile Project Manager",
      skills: [{ name: "Agile Project Managemnt" }, { name: "Scrum Master Consulting" }],
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
    <div className="w-full py-8 md:py-12 bg-gray-50">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-900">Top Experts</h2>
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
          className="flex overflow-x-auto gap-4 pb-6 scrollbar-hide snap-x"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {experts.map((expert) => (
            <ExpertCardLink key={expert.id} {...expert} />
          ))}
        </div>

        <div className="mt-6">
          <Link
            href="/experts"
            className="inline-flex items-center bg-gray-100 text-primary-700 px-5 py-2 rounded-full font-medium hover:bg-gray-200 transition-colors"
          >
            See all experts
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}

