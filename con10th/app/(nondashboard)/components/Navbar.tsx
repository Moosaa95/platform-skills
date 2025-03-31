'use client'
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
// import { useState } from "react"



// const NAVIGATION = [
//   {
//     label: "Home",
//     href: "/"
//   },
//   {
//     label: "Hire a talent",
//     href: "hire"
//   },
//   {
//     label: "Jobs",
//     href: "jobs"
//   }
// ]



export default function Navbar() {
  // const [active, setActive] = useState<boolean>(false)
  return (
    <header className="sticky top-0 z-50 w-full  border-purple-100 bg-white px-[100px] py-[24px] h-[100px] shadow-md">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4 md:gap-6">
          <Link href="/" className="cursor-pointer">
            <Image src="/assets/images/logo.png" width={192} height={48} alt="Con10th" />
          </Link>
        </div>
        <div className="flex gap-4 font-[400] text-[20px]" >
          <Link href="/">Home</Link>
          <Link href="">How it works</Link>
          <Link href="/auth/register" className="text-accent-color-700">Hire an Expert</Link>
        </div>




        
        <div className="flex items-center gap-5">
          <Link href="/auth/login">
            <Button variant="default" className="text-lg bg-transparent hover:bg-white text-secondary-700 rounded-lg font-[600]">
              Login Now
            </Button>
          </Link>
          <Link href="/auth/register">
            <Button variant="secondary" className="bg-secondary-700 text-lg text-white hover:bg-secondary-700/90 rounded-3xl py-4 px-8 font-[600]">Join Con10th</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

