"use client"

import { SelectItem } from "@/components/ui/select"

import { SelectContent } from "@/components/ui/select"

import { SelectValue } from "@/components/ui/select"

import { SelectTrigger } from "@/components/ui/select"

import { Select } from "@/components/ui/select"

import { usePathname } from "next/navigation"

import { useRouter } from "next/navigation"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/states/hooks"
import { setFilters } from "@/states/features/slices/global/globalSlice"
import { debounce } from "lodash"
import { cleanParams } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"
import SearchHeader from "./SearchHeader"
import FilterSidebar from "./FiltersBar"
import { ExpertCard } from "../components/cards/ExpertCard"


// Mock data for experts
const mockExperts = [
  {
    id: "muhammad-basheer-1",
    name: "Muhammad Basheer",
    image: "/assets/images/hero/howitwork.png",
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
    skills: [{ name: "Program Management" }, { name: "Agile Project Managemnt" }],
  },
  {
    id: "muhammad-basheer-5",
    name: "Muhammad Basheer",
    image: "/assets/images/experts/muhammad-basheer-5.jpg",
    verifiedIn: "Project Management",
    jobTitle: "IT Project Manager",
    skills: [{ name: "Program Management" }, { name: "Agile Project Managemnt" }],
  },
  {
    id: "muhammad-basheer-6",
    name: "Muhammad Basheer",
    image: "/assets/images/experts/muhammad-basheer-3.jpg",
    verifiedIn: "Project Management",
    jobTitle: "IT Project Manager",
    skills: [{ name: "Program Management" }, { name: "Agile Project Managemnt" }],
  },
]

export default function SearchPage() {
  const searchParams = useSearchParams()
  const dispatch = useAppDispatch()
  const router = useRouter()
  const pathname = usePathname()

  const filters = useAppSelector((state) => state.global.filters)
  const isFilterFullOpen = useAppSelector((state) => state.global.isFilterFullOpen)


  const [searchQuery, setSearchQuery] = useState("")

  // Initialize filters from URL params
  useEffect(() => {
    const paramsObject: Record<string, string> = {}
    searchParams.forEach((value, key) => {
      paramsObject[key] = value
    })

    if (Object.keys(paramsObject).length > 0) {
      dispatch(setFilters(paramsObject))
    }
  }, [searchParams, dispatch])

  const updateURL = debounce((newFilters) => {
    const cleanFilters = cleanParams(newFilters)
    const updateSearchParams = new URLSearchParams()

    Object.entries(cleanFilters).forEach(([key, value]) => {
      updateSearchParams.set(key, Array.isArray(value) ? value.join(",") : value.toString())
    })

    router.push(`${pathname}?${updateSearchParams.toString()}`)
  }, 300)

  const handleFilterChange = (key: string, value: any, isMin: boolean | null) => {
    let newValue = value

    if (key === "priceRange") {
      const currentArrayRange = { ...filters[key] }

      if (isMin !== null) {
        const index = isMin ? 0 : 1
        currentArrayRange[index] = value === "any" ? null : Number(value)
      }
      newValue = currentArrayRange
    } else {
      newValue = value === "any" ? "any" : value
    }

    const newFilters = { ...filters, [key]: newValue }
    dispatch(setFilters(newFilters))
    updateURL(newFilters)
  }

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    handleFilterChange("skill", value, null)
  }

//   const toggleFilterSidebar = () => {
//     dispatch(setFilterFullOpen(!isFilterFullOpen))
//   }

  return (
    <div
      className="container w-full mx-auto px-5 flex flex-col"
    //   style={{
    //     minHeight: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
    //     // marginTop: `${NAVBAR_HEIGHT}px`,
    //   }}
    >
      <h1 className="text-3xl font-bold mb-6">Experts For Hire</h1>

      <div className="flex justify-between items-center mb-6">
        <Button variant="outline" className="md:hidden flex items-center gap-2" onClick={() => {}}>
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      <div className="flex justify-between flex-1 overflow-hidden gap-6">
        {/* Filter Sidebar */}
        <div
          className={`h-full overflow-auto transition-all duration-300 ease-in-out ${
            isFilterFullOpen
              ? "w-full md:w-3/12 opacity-100 visible"
              : "w-0 opacity-0 invisible md:w-3/12 md:opacity-100 md:visible"
          }`}
        >
          <FilterSidebar filters={filters} onFilterChange={handleFilterChange} />
        </div>

        {/* Main Content */}
        <div
          className={`h-full overflow-auto transition-all duration-300 ease-in-out ${
            isFilterFullOpen
              ? "w-0 opacity-0 invisible md:w-9/12 md:opacity-100 md:visible"
              : "w-full md:w-9/12 opacity-100 visible"
          }`}
        >
          <SearchHeader searchQuery={searchQuery} onSearchChange={handleSearchChange} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-5">
            {mockExperts.map((expert) => (
              <ExpertCard key={expert.id} {...expert} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

