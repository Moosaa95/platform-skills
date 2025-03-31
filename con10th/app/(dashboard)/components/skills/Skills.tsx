"use client"

import { useState, useEffect, useRef } from "react"
import { Check, X, PlusCircle, Loader2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { useAppDispatch } from "@/states/hooks"
import { openModal } from "@/states/features/slices/general/modalSlice"
import { useGetSkillsMutation } from "@/states/features/endpoints/general/generalApiSlice"

export interface Skill {
  id: string
  name: string
  code: string
}

interface SkillsSelectorProps {
  selectedSkills: Skill[]
  onSkillsChange: (skills: Skill[]) => void
  maxSkills?: number
}

export default function SkillsSelector({ 
  selectedSkills = [], 
  onSkillsChange,
  maxSkills = 5
}: SkillsSelectorProps) {

  
  const [isLoading, setIsLoading] = useState(false)
  const [skills, setSkills] = useState<Skill[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredSkills, setFilteredSkills] = useState<Skill[]>([])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [newSkillDialogOpen, setNewSkillDialogOpen] = useState(false)
  const [newSkill, setNewSkill] = useState({ name: "", code: "" })
  const [isSubmittingNewSkill, setIsSubmittingNewSkill] = useState(false)
  
  const dropdownRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

    const [getSkills, {isLoading:isLoadingSkills, isError, error}] =  useGetSkillsMutation()
  
  
  const dispatch = useAppDispatch()
  // Fetch skills from backend
  useEffect(() => {
    const fetchSkills = async () => {
      setIsLoading(true)
      try {
        // In a real app, replace with actual API call
        // const response = await fetch('/api/skills')
        // const data = await response.json()
        
        // Mock data for demonstration
        const response = await getSkills().unwrap()
        if (response.status) {
          setSkills(response.data)

        }
        else {
          toast.error(`${response.message}`)
        }
        
      } catch (error) {
        console.error("Failed to fetch skills:", error)
        toast.error("Failed to load skills. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchSkills()
  }, [])

  // Filter skills based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredSkills([])
      return
    }
    
    const filtered = skills.filter(skill => 
      skill.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      skill.code.toLowerCase().includes(searchTerm.toLowerCase())
    )
    
    // Filter out already selected skills
    const notSelectedSkills = filtered.filter(
      skill => !selectedSkills.some(selected => selected.id === skill.id)
    )
    
    setFilteredSkills(notSelectedSkills)
  }, [searchTerm, skills, selectedSkills])

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Add a skill
  
  const addSkill = (skill: Skill) => {
    if (selectedSkills.length >= maxSkills) {
      toast.error(`You can select up to ${maxSkills} skills`)
      return
    }
    
    if (!selectedSkills.some(s => s.id === skill.id)) {
      const updatedSkills = [...selectedSkills, skill]
      onSkillsChange(updatedSkills)
      setSearchTerm("")
      setIsDropdownOpen(false)
      inputRef.current?.focus()
    }
  }

  // Remove a skill
  const removeSkill = (skillId: string) => {
    const updatedSkills = selectedSkills.filter(skill => skill.id !== skillId)
    onSkillsChange(updatedSkills)
  }


  return (
    <div className="space-y-3">
      {/* Selected skills */}
      <div className="flex flex-wrap gap-2 mb-3">
        {selectedSkills.map(skill => (
          <Badge 
            key={skill.id} 
            className="bg-orange-100 text-orange-800 hover:bg-orange-200 px-3 py-1 flex items-center gap-1"
          >
            <span>{skill.name} <span className="text-xs text-orange-600">({skill.code})</span></span>
            <button 
              onClick={() => removeSkill(skill.id)}
              className="ml-1 rounded-full hover:bg-orange-300 p-0.5"
            >
              <X size={14} />
            </button>
          </Badge>
        ))}
      </div>
      
      {/* Skills search input */}
      <div className="relative" ref={dropdownRef}>
        <Input
          ref={inputRef}
          placeholder={selectedSkills.length >= maxSkills 
            ? `Maximum ${maxSkills} skills reached` 
            : "Search for skills..."}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            setIsDropdownOpen(true)
          }}
          onFocus={() => setIsDropdownOpen(true)}
          disabled={selectedSkills.length >= maxSkills}
          className="w-full"
        />
        
        {/* Skills dropdown */}
        {isDropdownOpen && (searchTerm.trim() !== "" || isLoading) && (
          <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200 max-h-60 overflow-auto">
            {isLoading ? (
              <div className="p-4 flex items-center justify-center">
                <Loader2 className="h-5 w-5 animate-spin text-orange-500" />
                <span className="ml-2 text-sm text-gray-500">Loading skills...</span>
              </div>
            ) : filteredSkills.length > 0 ? (
              <ul className="py-1">
                {filteredSkills.map(skill => (
                  <li 
                    key={skill.id}
                    className="px-3 py-2 hover:bg-orange-50 cursor-pointer flex items-center justify-between"
                    onClick={() => addSkill(skill)}
                  >
                    <div>
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-xs text-gray-500 ml-2">({skill.code})</span>
                    </div>
                    <Check size={16} className="text-orange-500 opacity-0 group-hover:opacity-100" />
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-4 text-center">
                <p className="text-sm text-gray-500 mb-2">No matching skills found</p>
                <Button 
                  variant="link" 
                  className="text-orange-500 p-0 h-auto text-sm flex items-center mx-auto"
                  onClick={() => {
                    dispatch(openModal())
                    setIsDropdownOpen(false)
                    setNewSkill({ name: searchTerm, code: "" })
                  }}
                >
                  <PlusCircle size={14} className="mr-1" />
                  Request to add "{searchTerm}"
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Request new skill button */}
      <Button 
        variant="ghost" 
        className="text-orange-500 p-0 h-auto flex items-center gap-1"
        onClick={() => dispatch(openModal())}
      >
        <PlusCircle size={16} />
        <span>Request to add a new skill</span>
      </Button>
    </div>
  )
}
