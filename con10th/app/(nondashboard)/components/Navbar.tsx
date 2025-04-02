'use client'


import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
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



// export default function Navbar() {
//   // const [active, setActive] = useState<boolean>(false)
//   return (
//     <header className="sticky top-0 z-50 w-full  border-purple-100 bg-white px-[100px] py-[24px] h-[100px] shadow-md">
//       <div className="container flex h-16 items-center justify-between">
//         <div className="flex items-center gap-4 md:gap-6">
//           <Link href="/" className="cursor-pointer">
//             <Image src="/assets/images/logo.png" width={192} height={48} alt="Con10th" />
//           </Link>
//         </div>
//         <div className="flex gap-4 font-[400] text-[20px]" >
//           <Link href="/">Home</Link>
//           <Link href="">How it works</Link>
//           <Link href="/auth/register" className="text-accent-color-700">Hire an Expert</Link>
//         </div>




        
//         <div className="flex items-center gap-5">
//           <Link href="/auth/login">
//             <Button variant="default" className="text-lg bg-transparent hover:bg-white text-secondary-700 rounded-lg font-[600]">
//               Login Now
//             </Button>
//           </Link>
//           <Link href="/auth/register">
//             <Button variant="secondary" className="bg-secondary-700 text-lg text-white hover:bg-secondary-700/90 rounded-3xl py-4 px-8 font-[600]">Join Con10th</Button>
//           </Link>
//         </div>
//       </div>
//     </header>
//   )
// }



export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`sticky top-0 z-50 w-full border-b border-purple-100 bg-white shadow-sm transition-all duration-300 ${
        isScrolled ? "py-2" : "py-3 md:py-4 lg:py-[24px]"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="cursor-pointer">
            <Image
              src="/assets/images/logo.png"
              width={isScrolled ? 150 : 192}
              height={isScrolled ? 38 : 48}
              alt="Con10th"
              className="transition-all duration-300"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-6 lg:gap-8 font-[400] text-base lg:text-[20px]">
          <Link href="/" className="hover:text-accent-color-700 transition-colors">Home</Link>
          <Link href="#" className="hover:text-accent-color-700 transition-colors">How it works</Link>
          <Link href="/auth/register" className="text-accent-color-700">Hire an Expert</Link>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-3 lg:gap-5">
          <Link href="/auth/login">
            <Button className="text-base lg:text-lg bg-transparent hover:bg-white text-secondary-700 rounded-lg font-[600]">
              Login Now
            </Button>
          </Link>
          <Link href="/auth/register">
            <Button className="bg-secondary-700 text-base lg:text-lg text-white hover:bg-secondary-700/90 rounded-3xl py-2 px-4 lg:py-4 lg:px-8 font-[600]">
              Join Con10th
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden p-2 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          whileTap={{ scale: 0.9 }}
        >
          {isMenuOpen ? <X size={24} className="text-secondary-700" /> : <Menu size={24} className="text-secondary-700" />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-purple-100 z-50"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <Link href="/" className="py-3 px-4 hover:bg-gray-50 rounded-md text-lg" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
              <Link href="#" className="py-3 px-4 hover:bg-gray-50 rounded-md text-lg" onClick={() => setIsMenuOpen(false)}>
                How it works
              </Link>
              <Link href="/auth/register" className="py-3 px-4 hover:bg-gray-50 rounded-md text-lg text-accent-color-700" onClick={() => setIsMenuOpen(false)}>
                Hire an Expert
              </Link>

              <div className="pt-2 flex flex-col space-y-3">
                <Link href="/auth/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full justify-center text-secondary-700 border-secondary-700">
                    Login Now
                  </Button>
                </Link>
                <Link href="/auth/register" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full justify-center bg-secondary-700 text-white hover:bg-secondary-700/90 rounded-3xl">
                    Join Con10th
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
