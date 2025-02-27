// // // app/page.tsx
// // export default function Home() {
// //     return (
// //       <div className="min-h-screen bg-white">
// //         {/* Navigation */}
// //         <nav className="fixed top-0 w-full bg-white shadow-sm z-50">
// //           <div className="container mx-auto px-4 py-4 flex items-center justify-between">
// //             <div className="flex items-center space-x-8">
// //               <h1 className="text-2xl font-bold text-blue-600">ConfOth</h1>
// //               <div className="hidden md:flex space-x-6">
// //                 <a href="#" className="text-gray-600 hover:text-blue-600">Home</a>
// //                 <a href="#" className="text-gray-600 hover:text-blue-600">Hire a Talent</a>
// //                 <a href="#" className="text-gray-600 hover:text-blue-600">Freelance Now</a>
// //               </div>
// //             </div>
// "use client"
// import Image from "next/image";
// import { motion } from "framer-motion";

            
// //             <div className="flex items-center space-x-4">
// //               <a href="#" className="text-gray-600 hover:text-blue-600">Login Now</a>
// //               <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700">
// //                 Join ConfOth
// //               </button>
// //             </div>
// //           </div>
// //         </nav>
  
// //         {/* Hero Section */}
// //         <div className="pt-32 pb-20 bg-gradient-to-b from-blue-50 to-white">
// //           <div className="container mx-auto px-4 text-center">
// //             <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
// //               Welcome To The Future of Work
// //             </h1>
            
// //             <div className="mb-12">
// //               <span className="text-4xl font-bold text-blue-600">Con10th</span>
// //               <span className="text-4xl font-bold text-gray-600 mx-4">|</span>
// //               <span className="text-3xl font-semibold text-gray-600">
// //                 FREELANCING MADE EASY!
// //               </span>
// //             </div>
  
// //             <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
// //               Conf0th Connects You With Skilled Professionals Across Industries -
// //               <span className="font-semibold text-blue-600"> Baton, Designers, Developers, Marketers</span>, 
// //               And More - To Bring Your Projects To Life.
// //             </p>
  
// //             {/* CTA Buttons */}
// //             <div className="flex flex-col md:flex-row gap-4 justify-center">
// //               <button className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg hover:bg-blue-700">
// //                 Search To Find Freelancers Jobs, Or Services
// //               </button>
// //               <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full text-lg hover:bg-blue-50">
// //                 Find Talent
// //               </button>
// //               <button className="bg-green-500 text-white px-8 py-4 rounded-full text-lg hover:bg-green-600">
// //                 Excome a Freelancer
// //               </button>
// //             </div>
// //           </div>
// //         </div>
  
// //         {/* Add additional sections here */}
        
// //         <footer className="bg-gray-100 py-8 mt-20">
// //           <div className="container mx-auto px-4 text-center text-gray-600">
// //             <p>© 2024 ConfOth. All rights reserved.</p>
// //           </div>
// //         </footer>
// //       </div>
// //     );
// //   }


// export default function Hero() {
//   return (
//     <div className="relative h-screen">
//       <Image alt="" src="/assets/images/hero-bg.jpg" fill priority className="object-cover object-center" />
//       <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="absolute top-1/3 transform -translate-x-1/2 w-full text-white text-center"
//         >
//           <div className="max-w-4xl mx-auto px-16 sm:px-12">
//             <h1 className="text-5xl font-bold text-white mb-4">
//               Welcome To The Future of Work
//             </h1>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   )

// }

"use client"

import { motion } from "framer-motion"
import { Search } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Hero() {
  return (
    <div className="relative min-h-[600px] bg-[#0A1628] overflow-hidden">
      {/* Dotted pattern */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-20">
        <div className="grid grid-cols-5 gap-2">
          {[...Array(25)].map((_, i) => (
            <div key={i} className="w-1 h-1 bg-white rounded-full" />
          ))}
        </div>
      </div>

      {/* Curved lines */}
      <svg className="absolute top-0 left-0 w-full h-full" style={{ zIndex: 0 }}>
        <path
          d="M 100 200 Q 200 100, 300 200 T 500 200"
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeDasharray="5,5"
        />
      </svg>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          {/* Client • Talent text */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="text-white opacity-80">Client</span>
            <span className="text-[#FF4D00] text-2xl">•</span>
            <span className="text-white opacity-80">Talent</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Discover Talent That Suits You!</h1>

          {/* Subheading */}
          <p className="text-lg text-white/70 mb-8">
            Team up with a huge network of freelancers and get stuff done
            <br />– whether you need something quick or a major overhaul.
          </p>

          {/* Search bar */}
          <div className="flex flex-col sm:flex-row items-center gap-4 max-w-2xl mx-auto mb-8">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Search To Find Freelancers"
                className="w-full h-12 pl-4 pr-10 rounded-full bg-white text-gray-900"
              />
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-[#FF4D00] hover:bg-[#FF4D00]/90 text-white px-8 py-6 rounded-full text-lg">
              Find Talent
            </Button>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white/10 px-8 py-6 rounded-full text-lg"
            >
              Post a Job
            </Button>
          </div>
        </motion.div>

        {/* Floating images */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute top-20 left-10 w-32 h-32 rounded-3xl overflow-hidden"
        >
          <Image
            src="/assets/images/lo.jpg"
            alt="Team member 1"
            width={128}
            height={128}
            className="object-cover"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="absolute top-40 right-10 w-32 h-32 rounded-full overflow-hidden"
        >
          <Image
            src="/assets/images/lo.jpg"
            alt="Team member 2"
            width={128}
            height={128}
            className="object-cover"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="absolute bottom-20 right-32 w-32 h-32 rounded-3xl overflow-hidden"
        >
          <Image
            src="/assets/images/lo.jpg"
            alt="Team member 3"
            width={128}
            height={128}
            className="object-cover"
          />
        </motion.div>

        {/* Geometric shapes */}
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute top-40 right-40 w-8 h-8"
        >
          <div className="w-full h-full border-2 border-white/20 rounded-full" />
        </motion.div>

        <motion.div
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute bottom-40 left-40 w-8 h-8"
        >
          <div className="w-full h-full border-2 border-purple-500/20 rotate-45" />
        </motion.div>
      </div>
    </div>
  )
}

