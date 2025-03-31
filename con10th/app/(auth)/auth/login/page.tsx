"use client"

import type React from "react"

import { useState } from "react"
import { useRouter} from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { toast } from "sonner"
import { useLoginMutation } from "@/states/features/endpoints/auth/authApiSlice"
import { useAppDispatch } from "@/states/hooks"
import { setAuth } from "@/states/features/slices/auth/authSlice"

export default function LoginPage() {
    const router = useRouter()
    const dispatch = useAppDispatch()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [login, {isLoading}] = useLoginMutation()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const result = await login({email, password}).unwrap()
            console.log("RESULT", result);
            
            if (result.status){
                // dispatch(setAuth())
                if (result.profile_complete) {
                    router.push(`/${result?.role}/${result?.user_id}/dashboard`);
                } else {
                    toast.error("Please Setup your profile")
                    router.push(`/${result?.role}/${result?.user_id}/profile-setup`);
                }
            }
        } catch (error) {
        console.error("Login failed:", error)
        toast.error("Login failed. Please check your credentials.")
        }
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold text-center mb-6">Login to Your Account</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link href="/auth/reset-password" className="text-sm text-orange-500 hover:text-orange-600">
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full py-6 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-medium"
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>

          <div className="text-center mt-4">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link href="/auth/register" className="text-orange-500 hover:text-orange-600 font-medium">
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

