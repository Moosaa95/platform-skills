"use client"

import { useState } from "react"
import { X } from "lucide-react"

interface SkillsSelectorProps {
  selectedSkills: string[]
  onSkillsChange: (skills: string[]) => void
}

export default function SkillsSelectorss({ selectedSkills, onSkillsChange }: SkillsSelectorProps) {
  // Predefined skills for demo
  const availableSkills = [
    "Figma",
    "Illustration",
    "Aftereffect",
    "Blender",
    "UI Design",
    "UX Design",
    "Photoshop",
    "3D Modeling",
    "Animation",
    "Graphic Design",
  ]

  const [inputValue, setInputValue] = useState("")

  const addSkill = (skill: string) => {
    if (skill && !selectedSkills.includes(skill) && selectedSkills.length < 5) {
      onSkillsChange([...selectedSkills, skill])
      setInputValue("")
    }
  }

  const removeSkill = (skill: string) => {
    onSkillsChange(selectedSkills.filter((s) => s !== skill))
  }

  const filteredSkills = availableSkills.filter(
    (skill) => !selectedSkills.includes(skill) && skill.toLowerCase().includes(inputValue.toLowerCase()),
  )

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2 mt-2">
        {selectedSkills.map((skill) => (
          <div
            key={skill}
            className="px-3 py-1 bg-white border border-orange-400 text-orange-500 rounded-full flex items-center gap-1"
          >
            {skill}
            <button type="button" onClick={() => removeSkill(skill)} className="text-orange-500 hover:text-orange-700">
              <X size={14} />
            </button>
          </div>
        ))}
      </div>

      {selectedSkills.length < 5 && (
        <div className="relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type to add a skill"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {inputValue && filteredSkills.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
              {filteredSkills.map((skill) => (
                <div key={skill} className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => addSkill(skill)}>
                  {skill}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

