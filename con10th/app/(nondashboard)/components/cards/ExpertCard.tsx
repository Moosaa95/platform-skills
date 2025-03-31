import Image from "next/image"
import { CheckCircle, Briefcase } from 'lucide-react'

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

export function ExpertCard({
  // id,
  name,
  image,
  verifiedIn,
  jobTitle,
  skills,
  className = "",
  onClick
}: ExpertProps) {
  return (
    <div 
      className={`min-w-[280px] sm:min-w-[309.33px] min-h-[480px] flex-shrink-0 bg-white p-5 rounded-lg border border-gray-400 overflow-hidden snap-start hover:shadow-md transition-shadow duration-200 ${className}`}
      onClick={onClick}
    >
      <div className="p-4">
        <div className="aspect-w-1 aspect-h-1 w-full h-[200px] relative mb-4">
          <Image
            src={image || "/placeholder.svg?height=200&width=200"}
            alt={name}
            fill
            className="object-cover rounded-md"
          />
        </div>
        
        <h3 className="text-lg font-semibold text-orange-500 mb-1">{name}</h3>
        
        <div className="flex items-center text-sm text-green-600 mb-1">
          <CheckCircle className="h-4 w-4 mr-1" />
          <span>Verified Expert in {verifiedIn}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <Briefcase className="h-4 w-4 mr-1" />
          <span>{jobTitle}</span>
        </div>
        
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Skills</p>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span 
                key={index} 
                className="px-3 py-1 text-sm rounded-full border border-orange-400 text-orange-500"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}