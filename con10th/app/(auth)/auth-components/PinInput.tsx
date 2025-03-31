"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

interface PinInputProps {
  length?: number
  onComplete?: (value: string) => void
  onChange?: (value: string) => void
  disabled?: boolean
  autoFocus?: boolean
  className?: string
  inputClassName?: string
}

export function PinInput({
  length = 6,
  onComplete,
  onChange,
  disabled = false,
  autoFocus = true,
  className,
  inputClassName,
}: PinInputProps) {
  const [values, setValues] = useState<string[]>(Array(length).fill(""))
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    if (autoFocus && inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }, [autoFocus])

  // Handle value change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value

    // Only allow one digit
    if (value.length > 1) {
      // If pasting multiple digits, distribute them
      if (value.length <= length) {
        const newValues = [...values]

        // Fill current and subsequent inputs with pasted value
        for (let i = 0; i < value.length; i++) {
          if (index + i < length) {
            newValues[index + i] = value[i]
          }
        }

        setValues(newValues)

        // Focus on the next empty input or the last filled one
        const nextIndex = Math.min(index + value.length, length - 1)
        inputRefs.current[nextIndex]?.focus()

        // Call onChange with the new combined value
        const newCombinedValue = newValues.join("")
        onChange?.(newCombinedValue)

        // Call onComplete if all inputs are filled
        if (newCombinedValue.length === length && onComplete) {
          onComplete(newCombinedValue)
        }

        return
      }

      return
    }

    // Handle single digit input
    if (value && !/^\d+$/.test(value)) return

    const newValues = [...values]
    newValues[index] = value
    setValues(newValues)

    // Call onChange with the new combined value
    const newCombinedValue = newValues.join("")
    onChange?.(newCombinedValue)

    // Move to next input if current input is filled
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }

    // Call onComplete if all inputs are filled
    if (newCombinedValue.length === length && !newCombinedValue.includes("") && onComplete) {
      onComplete(newCombinedValue)
    }
  }

  // Handle key press
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === "Backspace" && !values[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }

    // Move to next input on right arrow
    if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }

    // Move to previous input on left arrow
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  // Handle paste
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>, index: number) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text/plain").trim()

    // Only allow numbers
    if (!/^\d+$/.test(pastedData)) return

    const newValues = [...values]

    // Fill current and subsequent inputs with pasted value
    for (let i = 0; i < pastedData.length; i++) {
      if (index + i < length) {
        newValues[index + i] = pastedData[i]
      }
    }

    setValues(newValues)

    // Focus on the next empty input or the last filled one
    const nextEmptyIndex = newValues.findIndex((val, idx) => idx >= index && !val)
    const focusIndex = nextEmptyIndex !== -1 ? nextEmptyIndex : Math.min(index + pastedData.length, length - 1)
    inputRefs.current[focusIndex]?.focus()

    // Call onChange with the new combined value
    const newCombinedValue = newValues.join("")
    onChange?.(newCombinedValue)

    // Call onComplete if all inputs are filled
    if (newCombinedValue.length === length && !newCombinedValue.includes("") && onComplete) {
      onComplete(newCombinedValue)
    }
  }

  return (
    <div className={cn("flex justify-between gap-2", className)}>
      {Array.from({ length }).map((_, index) => (
        <div key={index} className="w-12 h-14">
          <input
            ref={(el:any) => (inputRefs.current[index] = el)}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            value={values[index]}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={(e) => handlePaste(e, index)}
            disabled={disabled}
            className={cn(
              "w-full h-full text-center text-xl font-semibold border border-gray-300 rounded-md",
              "focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none",
              "disabled:bg-gray-100 disabled:text-gray-400",
              inputClassName,
            )}
            autoComplete="one-time-code"
          />
        </div>
      ))}
    </div>
  )
}

