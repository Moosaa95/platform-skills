import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface PromoSectionProps {
  variant: "client" | "expert"
  label: string
  title: string
  description: string
  buttonText: string
  buttonLink: string
  imageSrc: string
  imageAlt?: string
  className?: string
}

export default function PromoSection({
  variant,
  label,
  title,
  description,
  buttonText,
  buttonLink,
  imageSrc,
  imageAlt = "Professional working on laptop",
  className,
}: PromoSectionProps) {
  // Define styles based on variant
  const styles = {
    client: {
      container: "bg-primary-900",
      button: "bg-orange-500 hover:bg-orange-600 text-white",
    },
    expert: {
      container: "bg-orange-500",
      button: "bg-white hover:bg-gray-100 text-primary-900",
    },
  }

  const currentStyle = styles[variant]

  console.log("CURRENT", currentStyle);
  

  return (
    <section className={cn("w-full overflow-hidden rounded-lg", className)}>
      <div className="flex flex-col md:flex-row">
        {/* Content Side */}
        <div
          className={`w-full md:w-1/2 ${currentStyle.container} text-white p-8 md:p-12 lg:p-16 flex flex-col justify-center`}
        >
          <div className="max-w-xl">
            <p className="text-lg opacity-90 mb-4">{label}</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{title}</h2>
            <p className="text-base md:text-lg opacity-90 mb-8">{description}</p>
            <Link href={buttonLink}>
              <Button className={`${currentStyle.button} px-8 py-6 rounded-full h-auto text-base font-medium`}>
                {buttonText}
              </Button>
            </Link>
          </div>
        </div>

        {/* Image Side */}
        <div className="w-full md:w-1/2 h-[300px] md:h-auto relative">
          <Image src={imageSrc || "/placeholder.svg"} alt={imageAlt} fill className="object-cover" priority />
        </div>
      </div>
    </section>
  )
}

