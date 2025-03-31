import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"


export default function AuthNavbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-purple-100 bg-white px-[100px] py-[24px] shadow-md">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4 md:gap-6">
          <Link href="/" className="cursor-pointer">
            <Image src="/assets/images/logo.png" width={192} height={48} alt="Con10th" />
          </Link>
        </div>

        {/* <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-sm font-medium hover:text-primary">
            Home
          </Link>
          <Link href="/hire" className="text-sm font-medium hover:text-primary">
            Hire a Talent
          </Link>
          <Link href="/jobs" className="text-sm font-medium hover:text-primary">
            Jobs
          </Link>
        </nav> */}

        {/* <div className="flex items-center space-x-4">
          <Link href="/login">
            <Button variant="ghost" className="text-sm">
              Login Now
            </Button>
          </Link>
          <Link href="/join">
            <Button className="bg-[#FF4D00] text-white hover:bg-[#FF4D00]/90">Join Com10th</Button>
          </Link>
        </div> */}
        {/* <div className="flex items-cetner gap-5">
          <Link href="/login">
            <Button variant="outline" className="text-sm bg-transparent hover:bg-white hover:text-primary-700 rounded-lg">
              Login
            </Button>
          </Link>
          <Link href="/join">
            <Button variant="secondary" className="bg-[#FF4D00] text-white hover:bg-[#FF4D00]/90">Join Con10th</Button>
          </Link>
        </div> */}
      </div>
    </header>
  )
}

