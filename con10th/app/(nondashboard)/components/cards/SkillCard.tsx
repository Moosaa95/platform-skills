"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface SkillCardProps {
  id: string
  name: string
  className?: string
  size?: "sm" | "md" | "lg"
}

// Generate a consistent color based on string
const generateColor = (str: string): string => {
  const colors = [
    "from-blue-500 to-indigo-600",
    "from-emerald-500 to-teal-600",
    "from-orange-500 to-amber-600",
    "from-purple-500 to-violet-600",
    "from-rose-500 to-pink-600",
    "from-cyan-500 to-sky-600",
    "from-lime-500 to-green-600",
    "from-fuchsia-500 to-purple-600",
    "from-amber-500 to-yellow-600",
  ]

  // Simple hash function to get consistent index
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }

  return colors[Math.abs(hash) % colors.length]
}

// Generate initials or first letter for a skill
const getSkillInitials = (name: string): string => {
  if (!name) return "?"

  // If it's a single word, return first two letters
  if (!name.includes(" ")) {
    return name.substring(0, 2).toUpperCase()
  }

  // If multiple words, return initials (up to 2)
  const words = name.split(" ")
  return words
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join("")
}

export function SkillCard({ id, name, className, size = "md" }: SkillCardProps) {
  const gradientClass = generateColor(name)
  const initials = getSkillInitials(name)

  const sizeClasses = {
    sm: "min-w-[180px] h-[160px] rounded-lg",
    md: "min-w-[230px] sm:min-w-[250px] h-[220px] rounded-xl",
    lg: "min-w-[280px] sm:min-w-[300px] h-[250px] rounded-xl",
  }

  const initialsSize = {
    sm: "w-12 h-12 text-xl",
    md: "w-16 h-16 text-2xl",
    lg: "w-20 h-20 text-3xl",
  }

  return (
    <Link
      href={`/categories/${id}`}
      className={cn("relative overflow-hidden snap-start group", sizeClasses[size], className)}
    >
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br transition-all duration-300",
          gradientClass,
          "group-hover:scale-105",
        )}
      />

      <div className="absolute inset-0 p-6 flex flex-col justify-between">
        <div
          className={cn(
            "bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white font-bold",
            initialsSize[size],
          )}
        >
          {initials}
        </div>

        <div>
          <h3 className="text-xl font-bold text-white mb-2">{name}</h3>
          <div className="flex items-center text-white/80 text-sm">
            <span>Explore opportunities</span>
            <ChevronRight className="ml-1 h-4 w-4" />
          </div>
        </div>
      </div>
    </Link>
  )
}

