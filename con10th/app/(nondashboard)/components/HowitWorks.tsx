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
    description:
      "Once You Find The Right Expert, Kick Off Your Project With Confidence And Bring Your Ideas To Life.",
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
    description:
      "Let Clients Find You Based On Your Expertise—No Need To Bid Or Compete For Jobs.",
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
    <section className="w-full flex justify-center items-center py-16 border-2">
      <div className="w-full container px-4 mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-primary-900 text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          How It Works
        </motion.h2>

        {/* For Client Section */}
        <div className="w-full mx-auto flex justify-center items-center flex-col">
          <StepsSection
            sectionTitle="For Client"
            steps={clientSteps}
            arrowColor="text-orange-500"
            borderColor="border-orange-500"
            textColor="text-orange-500"
            delay={0.1}
          />

          {/* For Experts Section */}
          <StepsSection
            sectionTitle="For Experts"
            steps={expertSteps}
            arrowColor="text-orange-500"
            borderColor="border-orange-500"
            textColor="text-orange-500"
            delay={0.3}
          />
        </div>
      </div>
    </section>
  )
}

/** Reusable StepsSection Component */
interface StepsSectionProps {
  sectionTitle: string
  steps: Step[]
  arrowColor: string     // e.g., "text-orange-500"
  borderColor: string    // e.g., "border-orange-500"
  textColor: string      // e.g., "text-orange-500"
  delay: number          // Delay for the section animation
}

function StepsSection({
  sectionTitle,
  steps,
  arrowColor,
  borderColor,
  textColor,
  delay,
}: StepsSectionProps) {
  return (
    <motion.div
      className="mb-20"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
    >
      <motion.h3
        className={`text-xl font-semibold ${textColor} text-center mb-10`}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: delay + 0.2 }}
      >
        {sectionTitle}
      </motion.h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step, index) => {
          const isLastStep = index === steps.length - 1
          return (
            <motion.div
              key={step.number}
              className="flex flex-col items-center md:items-start"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: delay + index * 0.2 }}
              viewport={{ once: true }}
            >
              {/* Step Number + Arrow */}
              <div className="relative mb-6">
                <div
                  className={`w-16 h-16 rounded-full border-2 ${borderColor} flex items-center justify-center ${textColor} text-2xl font-bold`}
                >
                  {step.number}
                </div>
                {!isLastStep && (
                  <div className="hidden md:flex absolute top-1/2 left-full items-center -translate-y-1/2">
                    <div className="w-[400px] h-0.5 bg-orange-500" />
                    <ArrowRight className={`${arrowColor} -ml-1`} />
                  </div>
                )}
              </div>

              {/* Step Title & Description */}
              <h4 className="text-xl font-semibold text-primary-900 mb-3 text-center md:text-left">
                {step.title}
              </h4>
              <p className="text-gray-600 text-center md:text-left">
                {step.description}
              </p>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
