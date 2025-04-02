import PromoSection from "./cards/PromoCard"


export default function ClientExpertSections() {
  // Common image for both sections
  const workingImage = "/assets/images/hero/expert.png"

  return (
    <div className="w-fullpy-8 md:py-12">
      {/* Client Section */}
      <div className="container px-4 mx-auto space-y-1">
        <PromoSection
          variant="client"
          label="For Client"
          title="Find Experts, Get Work Done"
          description="Trusted By Businesses Of All Sizes, We Connect You With Top Experts Ready To Bring Your Projects To Life. Whether You're A Startup Or An Enterprise, Our Platform Helps You Find The Right Professional With Ease."
          buttonText="Find an Expert"
          buttonLink="/experts"
          imageSrc={workingImage}
        />

        {/* Divider */}
        {/* <div className="w-full h-10 bg-blue-50 flex items-center justify-center border-t border-b border-blue-100">
          <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">1512 × 510.61 Hug</div>
        </div> */}

        {/* Expert Section */}
        <PromoSection
          variant="expert"
          label="For Experts"
          title="Showcase Your Expertise & Get Hired"
          description="Join A Platform That Lets Clients Find And Connect With You Directly. No Job Bidding—Just Real Opportunities From Businesses Looking For Skilled Professionals Like You."
          buttonText="Join as an Expert"
          buttonLink="/auth/register?role=expert"
          className="text-black"
          imageSrc={workingImage}
        />
      </div>
    </div>
  )
}

