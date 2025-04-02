"use client"

import Image from "next/image"
import { CheckCircle, Briefcase } from "lucide-react"

export interface Skill {
  name: string
}

export interface ExpertProps {
  id: string
  name: string
  image: string
  verifiedIn: string
  jobTitle: string
  skills: Skill[]
  className?: string
  onClick?: () => void
}

export function ExpertCard({ id, name, image, verifiedIn, jobTitle, skills, className = "", onClick }: ExpertProps) {
  return (
    <div
      className={`min-w-[220px] sm:min-w-[260px] flex-shrink-0 bg-white rounded-md border border-gray-400 overflow-hidden snap-start hover:shadow-sm transition-shadow duration-200 ${className}`}
      onClick={onClick}
    >
      {/* Image */}
      <div className="aspect-square w-full relative">
        <Image src={image || "/placeholder.svg?height=200&width=200"} alt={name} fill className="object-cover" />
      </div>

      <div className="p-4">
        {/* Name */}
        <h3 className="text-accent-color-700 font-bold text-sm md:text-lg mb-1">{name}</h3>

        {/* Verified Badge */}
        <div className="flex items-center text-xs text-green-600 mb-1">
          <CheckCircle className="h-3 w-3 mr-1 flex-shrink-0" />
          <span>Verified Expert in {verifiedIn}</span>
        </div>

        {/* Job Title */}
        <div className="flex items-center text-xs text-gray-600 mb-2">
          <Briefcase className="h-3 w-3 mr-1 flex-shrink-0" />
          <span>{jobTitle}</span>
        </div>

        {/* Skills */}
        <div>
          <p className="text-xs text-gray-500 mb-1.5">Skills</p>
          <div className="flex flex-wrap gap-1.5">
            {skills.slice(0,4).map((skill, index) => (
              <span key={index} className="px-2 py-0.5 text-xs rounded-full border border-orange-400 text-orange-500">
                {skill.name.substring(0, 6)}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

