interface ProgressIndicatorProps {
    currentStep: number
    totalSteps: number
  }
  
  export default function ProgressIndicator({ currentStep, totalSteps }: ProgressIndicatorProps) {
    return (
      <div className="flex flex-col items-center h-full">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className={`w-4 h-4 rounded-full ${
                index + 1 === currentStep ? "bg-orange-500" : index + 1 < currentStep ? "bg-orange-300" : "bg-gray-200"
              }`}
            />
            {index < totalSteps - 1 && (
              <div className={`w-0.5 h-24 ${index + 1 < currentStep ? "bg-orange-300" : "bg-gray-200"}`} />
            )}
          </div>
        ))}
      </div>
    )
  }
  
  