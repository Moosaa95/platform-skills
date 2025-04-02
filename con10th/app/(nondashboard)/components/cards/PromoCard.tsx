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

  const styles = {
    client: {
      container: "bg-primary-700",
      label: "text-gray-500",
      title: "text-white",
      description: "text-white",
      button: "bg-orange-500 hover:bg-orange-600 text-white",
    },
    expert: {
      container: "bg-orange-500",
      label: "text-primary-800",
      title: "text-primary-800",
      description: "text-primary-800",
      button: "bg-white hover:bg-gray-100 text-primary-900",
    },
  }

  const currentStyle = styles[variant]

  return (
    <section className={cn("w-full overflow-hidden rounded-xl mb-6", className)}>
      <div className="flex flex-col md:flex-row">
        {/* Content Side */}
        <div
          className={`w-full md:w-1/2 ${currentStyle.container} text-white p-8 md:p-12 flex flex-col justify-center`}
        >
          <div className="max-w-xl">
            <p className={`text-sm font-medium ${currentStyle.label} mb-2`}>{label}</p>
            <h2 className={`text-2xl md:text-3xl lg:text-4xl font-bold mb-4 ${currentStyle.title}`}>{title}</h2>
            <p className={`text-sm md:text-base opacity-90 mb-6 leading-relaxed ${currentStyle.description}`}>{description}</p>
            <Link href={buttonLink}>
              <Button className={`${currentStyle.button} px-8 py-3 rounded-full text-sm font-medium`}>
                {buttonText}
              </Button>
            </Link>
          </div>
        </div>

        {/* Image Side */}
        <div className="w-full md:w-1/2 h-[250px] md:h-auto relative">
          <Image src={imageSrc || "/placeholder.svg"} alt={imageAlt} fill className="object-cover" priority />
        </div>
      </div>
    </section>
  )
}

