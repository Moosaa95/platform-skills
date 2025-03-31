"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { PinInput } from "./PinInput"


export type OtpPurpose = "registration" | "password-reset" | "login" | "email-verification"

interface OtpVerificationProps {
  email: string
  purpose?: OtpPurpose
  title?: string
  description?: string
  redirectUrl?: string
  onVerify?: (otp: string) => Promise<boolean>
  onResend?: (email: string) => Promise<boolean>
}

export default function OtpVerification({
  email,
  purpose = "registration",
  title,
  description,
  redirectUrl = "/dashboard",
  onVerify,
  onResend,
}: OtpVerificationProps) {
  const router = useRouter()
  const [otp, setOtp] = useState<string>("")
  const [resendTimer, setResendTimer] = useState<number>(120)
  const [isResending, setIsResending] = useState<boolean>(false)
  const [isVerifying, setIsVerifying] = useState<boolean>(false)
  const [error, setError] = useState<string>("")

  // Get default title and description based on purpose if not provided
  const getDefaultContent = () => {
    switch (purpose) {
      case "registration":
        return {
          defaultTitle: "Verify your account",
          defaultDescription: "One time password has been sent to your email.",
        }
      case "password-reset":
        return {
          defaultTitle: "Reset your password",
          defaultDescription: "One time password has been sent to your email.",
        }
      case "login":
        return {
          defaultTitle: "Login verification",
          defaultDescription: "One time password has been sent to your email.",
        }
      case "email-verification":
        return {
          defaultTitle: "Verify your email",
          defaultDescription: "One time password has been sent to your email.",
        }
      default:
        return {
          defaultTitle: "Verify your email",
          defaultDescription: "One time password has been sent to your email.",
        }
    }
  }

  const { defaultTitle, defaultDescription } = getDefaultContent()
  const displayTitle = title || defaultTitle
  const displayDescription = description || defaultDescription

  // Mask email for privacy
  const maskEmail = (email: string) => {
    const [username, domain] = email.split("@")
    const maskedUsername =
      username.substring(0, Math.min(4, username.length)) + "*".repeat(Math.max(username.length - 4, 0))
    return `${maskedUsername}@${domain}`
  }

  // Handle OTP change
  const handleOtpChange = (value: string) => {
    setOtp(value)
    setError("")
  }

  // Handle OTP completion
  const handleOtpComplete = (value: string) => {
    setOtp(value)
    setError("")
  }

  // Handle resend OTP
  const handleResendOtp = async () => {
    if (resendTimer > 0 || isResending) return

    setIsResending(true)
    setError("")

    try {
      if (onResend) {
        const success = await onResend(email)
        if (success) {
          setResendTimer(120)
        } else {
          setError("Failed to resend OTP. Please try again.")
        }
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setResendTimer(120)
      }
    } catch (error) {
      setError("Failed to resend OTP. Please try again.")
    } finally {
      setIsResending(false)
    }
  }

  // Handle verify OTP
  const handleVerifyOtp = async () => {
    // Check if OTP is complete
    if (otp.length !== 6) {
      setError("Please enter the complete OTP")
      return
    }

    setIsVerifying(true)
    setError("")

    try {
      if (onVerify) {
        const success = await onVerify(otp)
        if (success) {
          router.push(redirectUrl)
        } else {
          setError("Invalid OTP. Please try again.")
        }
      } else {
        // Mock verification for demo
        await new Promise((resolve) => setTimeout(resolve, 1000))
        router.push(redirectUrl)
      }
    } catch (error) {
      setError("Failed to verify OTP. Please try again.")
    } finally {
      setIsVerifying(false)
    }
  }

  useEffect(() => {
    if (resendTimer <= 0) return

    const timer = setTimeout(() => {
      setResendTimer((prev) => prev - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [resendTimer])

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-sm">
      <div className="flex flex-col items-center mb-6">
        <div className="w-48 h-48 relative mb-4">
          <Image src="/assets/images/auth/email.png" alt="OTP Verification" fill className="object-contain" />
        </div>
        <h1 className="text-xl font-semibold text-center text-gray-900 mb-2">{displayDescription}</h1>
        <p className="text-sm text-center text-gray-600">Input the OTP sent to ({email && maskEmail(email)})</p>
      </div>

      {/* OTP Input */}
      <div className="mb-6">
        <PinInput
          length={6}
          onChange={handleOtpChange}
          onComplete={handleOtpComplete}
          disabled={isVerifying}
          autoFocus
        />
      </div>

      {/* Error message */}
      {error && <div className="text-red-500 text-sm text-center mb-4">{error}</div>}

      {/* Resend OTP */}
      <div className="text-center mb-6">
        <button
          onClick={handleResendOtp}
          disabled={resendTimer > 0 || isResending}
          className="text-orange-500 text-sm font-medium hover:text-orange-600 disabled:text-orange-300"
        >
          {resendTimer > 0
            ? `Resend OTP on email in ${resendTimer}s`
            : isResending
              ? "Sending..."
              : "Resend OTP on email"}
        </button>
      </div>

      {/* Continue Button */}
      <Button
        onClick={handleVerifyOtp}
        disabled={isVerifying || otp.length !== 6}
        className="w-full py-6 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-medium"
      >
        {isVerifying ? "Verifying..." : "Continue"}
      </Button>
    </div>
  )
}

