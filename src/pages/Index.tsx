
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { mockSkills, mockUsers } from "@/utils/mockData";
import HeroSection from "@/components/home/HeroSection";
import FeaturedSkills from "@/components/home/FeaturedSkills";
import HowItWorks from "@/components/home/HowItWorks";
import SuggestedMatches from "@/components/home/SuggestedMatches";
import Testimonials from "@/components/home/Testimonials";
import CtaSection from "@/components/home/CtaSection";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const featuredSkills = mockSkills.slice(0, 4);
  const suggestedMatches = mockUsers.slice(1, 4);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <HeroSection searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <FeaturedSkills skills={featuredSkills} />
      <HowItWorks />
      <SuggestedMatches users={suggestedMatches} />
      <Testimonials />
      <CtaSection />
    </div>
  );
};

export default Index;
