"use client"

import { useState, useEffect } from "react"
import { Check, ChevronsUpDown, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface Country {
  code: string
  name: string
}

interface CountrySelectorProps {
  value: string
  onValueChange: (value: string) => void
}

export default function CountrySelector({ value, onValueChange }: CountrySelectorProps) {
  const [open, setOpen] = useState(false)
  const [countries, setCountries] = useState<Country[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Fetch countries from backend
  useEffect(() => {
    const fetchCountries = async () => {
      setIsLoading(true)
      try {
        // In a real app, replace with actual API call
        // const response = await fetch('/api/countries')
        // const data = await response.json()

        // Mock data for demonstration
        await new Promise((resolve) => setTimeout(resolve, 600))
        const mockCountries: Country[] = [
          { code: "us", name: "United States" },
          { code: "gb", name: "United Kingdom" },
          { code: "ca", name: "Canada" },
          { code: "au", name: "Australia" },
          { code: "de", name: "Germany" },
          { code: "fr", name: "France" },
          { code: "jp", name: "Japan" },
          { code: "cn", name: "China" },
          { code: "in", name: "India" },
          { code: "br", name: "Brazil" },
          { code: "ng", name: "Nigeria" },
          { code: "za", name: "South Africa" },
          { code: "ke", name: "Kenya" },
          { code: "gh", name: "Ghana" },
          { code: "eg", name: "Egypt" },
        ]

        setCountries(mockCountries)
      } catch (error) {
        console.error("Failed to fetch countries:", error)
        toast.error("Failed to load countries. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchCountries()
  }, [])

  // Get selected country name
  const selectedCountry = countries.find((country) => country.code === value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
          {value && selectedCountry ? selectedCountry.name : "Select country..."}
          {isLoading ? (
            <Loader2 className="ml-2 h-4 w-4 shrink-0 opacity-50 animate-spin" />
          ) : (
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search country..." />
          <CommandList>
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup>
              {countries.map((country) => (
                <CommandItem
                  key={country.code}
                  value={country.code}
                  onSelect={(currentValue) => {
                    onValueChange(currentValue)
                    setOpen(false)
                  }}
                >
                  <Check className={cn("mr-2 h-4 w-4", value === country.code ? "opacity-100" : "opacity-0")} />
                  {country.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

