import Hero from "@/app/(nondashboard)/components/Hero";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import UserType from "../(auth)/auth/user-type/page";
import PopularCategories from "./components/Skills";
import WhyChooseSection from "./components/WhyChoose";
import TopExperts from "./components/TopExperts";
import HowItWorks from "./components/HowitWorks";
import ClientExpertSections from "./components/PromoSection";

export default function Landing() {
    return (
        <>
            {/* <UserType /> */}
            <Hero />
            <PopularCategories />
            <WhyChooseSection />
            <TopExperts />
            <HowItWorks />
            <ClientExpertSections />
        </>
    )
}