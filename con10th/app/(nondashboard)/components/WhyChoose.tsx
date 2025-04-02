import Image from "next/image"
import { User, MessageSquare, DollarSign } from "lucide-react"
import Link from "next/link"

export default function WhyChooseSection() {
  return (
    <section className="w-full md:py-12 md:px-24 border-b border-gray-200">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          {/* Left Column - Content */}
          <div className="w-full lg:w-1/2 space-y-8">
            <h2 className="text-3xl md:text-5xl font-[600] text-primary-700">Why Choose Con10th?</h2>

            <div className="space-y-6">
              {/* Feature 1 */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-500">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-accent-color-700">Vetted Experts</h3>
                  <p className="text-gray-600 mt-1">Access A Curated Network Of Skilled Professionals.</p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-500">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-accent-color-700">Seamless Communication</h3>
                  <p className="text-gray-600 mt-1">Efficient Tools For Project Management And Communication.</p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-500">
                  <DollarSign className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-accent-color-700">No Hidden Fees</h3>
                  <p className="text-gray-600 mt-1">Completely Transparent Process.</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="" className="text-center bg-accent-color-700 hover:bg-accent-color-800 text-primary-50 px-8 py-4 gap-3 md:text-lg rounded-full h-auto w-full sm:min-w-[220px]">
                Find Experts
              </Link>
              <Link
                className="text-center border-primary-200 bg-primary-100 hover:bg-primary-200 text-primary-700 px-8 py-4 rounded-full h-auto w-full sm:min-w-[220px] md:text-lg"
                href={"/auth/register?role=expert"}
              >
                Become an Expert
              </Link>
            </div>

          </div>

          {/* Right Column - Image */}
          <div className="w-full lg:w-1/2">
            <div className="relative w-full aspect-square max-w-[503.46px] h-[438px] mx-auto">
              <Image
                src="/assets/images/hero/howitwork.png"
                alt="Expert connecting with clients"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

