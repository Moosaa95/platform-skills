import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export default function SearchHeader({ searchQuery, onSearchChange }: SearchHeaderProps) {
  return (
    <div className="flex flex-col items-center w-full px-5">
      {/* Header Section */}
      <div className="w-full bg-primary-700 py-12 px-6">
        <div className="space-y-6">
          <h1 className="font-medium lg:text-4xl text-xl text-white">
            Search Expert Service Providers for Any Project
          </h1>
          <p className="text-gray-50 lg:text-lg">
            Searching for Exceptional Professionals? CON10TH Is Here To Help.
          </p>
        </div>
      </div>

      {/* Search Input Section */}
      <div className="relative w-full gap-5 py-4">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-accent-color-700" />
        <Input
          placeholder="Search for jobs"
          className="w-full bg-white border-gray-300 rounded-lg text-gray-900 border h-12 pl-10"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
}
