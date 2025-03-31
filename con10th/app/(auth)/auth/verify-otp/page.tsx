"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import OtpVerification from "../../auth-components/OtpVerification"
import { useResendOtpMutation, useVerifyOtpMutation } from "@/states/features/endpoints/auth/authApiSlice"
import { toast } from 'sonner';


export default function VerifyOtpPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")

  const [verifyOtp, {isLoading: isLoadingVerifyOtp}] = useVerifyOtpMutation()
  const [resendOtp, {isLoading: isLoadingResendOtp}] = useResendOtpMutation()

  useEffect(() => {
    const storedEmail = localStorage.getItem("pendingVerificationEmail")
    if (storedEmail) {
      setEmail(storedEmail)
    } else {
      router.push("/auth/register")
    }
  }, [router])


  const handleVerify = async (otp: string) => {
    console.log(`Verifying OTP: ${otp} for ${email}`)

    try {
      
      const verify = await verifyOtp({email, otp}).unwrap()
      console.log("VERFIY", verify);
      
      if (verify.status) {
        localStorage.removeItem("pendingVerificationEmail")
        return true 

      }else {
        return false;
      }

    } catch (error) {
      toast.error(`OTP verification failed ${error}`)
      console.error("OTP verification failed:", error)
      return false
    }
  }

  const handleResendOtp = async (email: string) => {
    console.log(`Resend OTP: for ${email}`)

    try {
      
      const resend = await resendOtp({email}).unwrap()
      if (resend.status) {
        toast.success(resend.message)
        return true 

      }else {
        toast.error(resend.message)
        return false;
      }

    } catch (error:any) {
        let errorMsg = "OTP verification failed";
        if (error?.data) {
          if (Array.isArray(error.data)) {
            errorMsg = error.data.join(" ");
          } else if (error.data[0].non_field_errors) {
            errorMsg = error.data[0].non_field_errors.join(" ");
          } else if (typeof error.data === "string") {
            errorMsg = error.data;
          }
        }
        toast.error(`${errorMsg}`);
        console.error("Resend OTP verification failed:", error.data);
        return false;
    }
  }

  if (!email) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <OtpVerification
        email={email}
        purpose="registration"
        redirectUrl="/auth/login"
        onVerify={handleVerify}
        onResend={handleResendOtp}
      />
    </div>
  )
}
