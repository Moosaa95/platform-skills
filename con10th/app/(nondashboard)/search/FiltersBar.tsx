"use client"
// import { Search } from "lucide-react"
// import { Checkbox } from "@/components/ui/checkbox"
// import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Input } from "@/components/ui/input"
import type { FiltersState } from "@/states/features/slices/global/globalSlice"

interface FilterSidebarProps {
  filters: FiltersState
  onFilterChange: (key: string, value: any, isMin: boolean | null) => void
}

export default function FilterSidebar({ filters, onFilterChange }: FilterSidebarProps) {
    return (
        <div className="w-[310px] space-y-6 p-6  h-full overflow-y-auto  shadow-sm border-[1px] border-gray-200 gap-6">
            <div className="border-b-[1px] p-2 border-b-gray-200">
                <h2 className="font-[600] text-primary-700 lg:text-lg">Filter</h2>
            </div>

            {/* CATEGORY */}
            <div className="my-6 space-y-4">
                <h3 className="text-sm lg:text-lg font-[600] text-primary-700">Category</h3>
                <Select value={filters.category || "all"} onValueChange={(value) => onFilterChange("category", value, null)}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="development">Development</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="writing">Writing</SelectItem>
                </SelectContent>
                </Select>
            </div>

            {/* AVAILABILy */}
            {/* <div className="mb-6 space-y-4">
                <h3 className="text-sm lg:text-lg font-[600] text-primary-700">Availability</h3>
                <div className="space-y-2 border-[1px] border-gray-200 py-5 px-2 gap-3 rounded-[6px]">
                    <div className="flex items-center space-x-2">
                        <Checkbox
                        id="open"
                        checked={filters.availability === "open"}
                        onCheckedChange={() => onFilterChange("availability", "open", null)}
                        />
                        <Label htmlFor="open">Open for new projects</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                        id="busy"
                        checked={filters.availability === "busy"}
                        onCheckedChange={() => onFilterChange("availability", "busy", null)}
                        />
                        <Label htmlFor="busy">Busy</Label>
                    </div>
                </div>
            </div> */}

            {/* LOCATION */}
             {/* Location */}
            {/* <div className="mb-6 space-y-4">
                <h3 className="text-sm lg:text-lg font-[600] text-primary-700">Location</h3>
                <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-accent-color-700" />
                <Input
                    placeholder="Search Location"
                    className="pl-8"
                    value={filters.location || ""}
                    onChange={(e) => onFilterChange("location", e.target.value, null)}
                />
                </div>
            </div> */}

            {/* Ratings */}
            {/* <div className="mb-6 space-y-4">
                <h3 className="text-sm lg:text-lg font-[600] text-primary-700">Ratings</h3>
                <div className="space-y-2 border-[1px] border-gray-200 py-5 px-2 gap-3 rounded-[6px]">
                <div className="flex items-center space-x-2">
                    <Checkbox
                    id="all-ratings"
                    checked={filters.rating === "all"}
                    onCheckedChange={() => onFilterChange("rating", "all", null)}
                    />
                    <Label htmlFor="all-ratings">All</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox
                    id="5-stars"
                    checked={filters.rating === "5"}
                    onCheckedChange={() => onFilterChange("rating", "5", null)}
                    />
                    <Label htmlFor="5-stars">5 Stars</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox
                    id="4-stars"
                    checked={filters.rating === "4"}
                    onCheckedChange={() => onFilterChange("rating", "4", null)}
                    />
                    <Label htmlFor="4-stars">4 Stars</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox
                    id="3-stars"
                    checked={filters.rating === "3"}
                    onCheckedChange={() => onFilterChange("rating", "3", null)}
                    />
                    <Label htmlFor="3-stars">3 Stars</Label>
                </div>
            </div> */}
        {/* </div> */}
    </div>
    )
}