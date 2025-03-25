"use client"

import { motion } from "framer-motion"
import { SearchIcon } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Typography } from "@/components/ui/typography/Typography"

export default function Hero() {
  return (
    <div className="relative min-h-[670px] flex flex-col justify-center   bg-primary-700 overflow-hidden px-4 py-8 md:py-12 lg:py-[93px] lg:pl-[123px] lg:pr-[128.09px]">
      {/* first section */}
      <div className="flex flex-col items-center  lg:flex-row lg:justify-between">
        {/* Left images - hidden on mobile */}
        <div className="hidden lg:flex lg:flex-col">
          <div>
            <Image src="/assets/images/hero/hero-first.png" width={188} height={199} alt="hero-one" />
          </div>
          <div className="">
            <Image src="/assets/images/hero/hero-triangle.png" width={60} height={60} alt="hero-one" />
          </div>
          <div>
            <Image src="/assets/images/hero/hero-two.png" width={188} height={199} alt="hero-one" />
          </div>
        </div>

        {/* middle section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-[312px] lg:w-full lg:max-w-[642.4px] mx-auto space-y-4 md:space-y-6"
        >
          {/* header title */}
          <div className="flex flex-col items-center justify-center w-full">
            <Typography
              className="text-white text-center font-[500] text-3xl md:text-[48px]"
              variant="primary"
            >
              Find The Right Expert For Your Project
            </Typography>
            <Typography
              className="text-white/30 text-center font-[500] text-base md:text-xl mt-2"
              variant="primary"
            >
              Connect with top professionals and bring your ideas to life. Browse expert profiles and start a
              conversation—no bidding, no hassle.
            </Typography>
          </div>

          <motion.div
            className="flex relative items-center w-full max-w-[642.4px] mx-auto mt-4 md:mt-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <Input
              type="text"
              placeholder="Search Expert Service Providers"
              className="w-full py-4 md:py-6 px-4 md:px-9 rounded-full border-none bg-white h-12 md:h-14 shadow-md focus:ring-2 focus:ring-accent-color-700"
            />
            <Button className="absolute bg-accent-color-700 w-12 h-12 md:w-16 md:h-16 rounded-full right-0 flex justify-center items-center shadow-lg">
              <SearchIcon className="text-white" size={24} />
            </Button>
          </motion.div>

          <motion.div
            className="flex justify-center mt-4 md:mt-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <Button className="w-full max-w-[642.4px] h-12 md:h-14 rounded-full py-3 md:py-4 px-6 md:px-8 gap-2 bg-accent-color-700 text-primary-50 font-[600] text-base md:text-lg leading-6">
              Browse Experts
            </Button>
          </motion.div>
        </motion.div>

        {/* Right images - hidden on mobile */}
        <div className="hidden lg:flex lg:flex-col">
          <div>
            <Image src="/assets/images/hero/hero-three.png" width={188} height={199} alt="hero-one" />
          </div>
          <div className="">
            <Image src="/assets/images/hero/hero-triangle.png" width={60} height={60} alt="hero-one" />
          </div>
          <div>
            <Image src="/assets/images/hero/hero-four.png" width={188} height={199} alt="hero-one" />
          </div>
        </div>
      </div>
    </div>
  )
}

