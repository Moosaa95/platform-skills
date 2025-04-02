"use client"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

// Define the structure for each step
interface Step {
  number: number
  title: string
  description: string
}

// Steps for Client
const clientSteps: Step[] = [
  {
    number: 1,
    title: "Browse Experts",
    description:
      "Discover top professionals across various industries and find the perfect match for your project needs.",
  },
  {
    number: 2,
    title: "Message & Discuss",
    description:
      "Reach Out To Experts Directly, Discuss Your Project Details, And Align On Expectations—No Intermediaries, Just Seamless Collaboration.",
  },
  {
    number: 3,
    title: "Get Work Done",
    description: "Once You Find The Right Expert, Kick Off Your Project With Confidence And Bring Your Ideas To Life.",
  },
]

// Steps for Experts
const expertSteps: Step[] = [
  {
    number: 1,
    title: "Set Up Profile",
    description:
      "Create a compelling profile that showcases your skills, experience, and expertise to attract potential clients.",
  },
  {
    number: 2,
    title: "Get Discovered",
    description: "Let Clients Find You Based On Your Expertise—No Need To Bid Or Compete For Jobs.",
  },
  {
    number: 3,
    title: "Start Working",
    description:
      "When A Client Reaches Out, Discuss Project Details, Agree On Terms, And Get Started On Delivering Great Results.",
  },
]

export default function HowItWorks() {
  return (
    <section className="w-full py-16">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-primary-700 text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          How It Works
        </motion.h2>

        <div className="max-w-5xl mx-auto space-y-8">
          {/* For Client Section */}
          <StepsSection sectionTitle="For Client" steps={clientSteps} delay={0.1} />

          {/* For Experts Section */}
          <StepsSection sectionTitle="For Experts" steps={expertSteps} delay={0.3} />
        </div>
      </div>
    </section>
  )
}

/** Reusable StepsSection Component */
interface StepsSectionProps {
  sectionTitle: string
  steps: Step[]
  delay: number // Delay for the section animation
}

function StepsSection({ sectionTitle, steps, delay }: StepsSectionProps) {
  return (
    <motion.div
      className="mb-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
    >
      {/* Section container with border */}
      <div className="rounded-lg p-6">
        <motion.h3
          className="text-xl font-semibold text-accent-color-700 text-center mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: delay + 0.2 }}
        >
          {sectionTitle}
        </motion.h3>

        {/* Steps container - horizontal layout */}
        <div className="flex flex-col md:flex-row justify-between items-start">
          {steps.map((step, index) => {
            const isLastStep = index === steps.length - 1
            return (
              <div key={step.number} className="flex flex-col items-center w-full md:w-1/3 px-4 mb-8 md:mb-0">
                {/* Step number and arrow */}
                <div className="flex items-center w-full justify-center mb-6">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full border border-accent-color-700 flex items-center justify-center text-accent-color-700 text-xl font-medium">
                      {step.number}
                    </div>

                    {!isLastStep && (
                      <div className="hidden md:flex items-center absolute top-1/2 left-full -translate-y-1/2">
                        <div className="w-[250px] h-0.5 bg-orange-300 relative">
                          <ArrowRight className="text-orange-500 absolute -right-2 -translate-y-1/2 top-1/2" size={16} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Step content */}
                <h4 className="text-xl font-medium text-primary-700 mb-2 text-center">{step.title}</h4>
                <p className="text-base text-gray-600 text-center">{step.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}

