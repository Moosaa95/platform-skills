import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const NAVBAR_HEIGHT = 52;


export function cleanParams(params: Record<string, any>): Record<string, any> {
  return Object.fromEntries(
    Object.entries(params).filter(
      (
        [_, value]
      ) => 
        value !== undefined && 
        value !== "any" && 
        value !== "" && 
        (Array.isArray(value) ? value.some((v) => v !== null) : value !== null)
     )
  )
}