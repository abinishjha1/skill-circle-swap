
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

interface HeroSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const HeroSection = ({ searchQuery, setSearchQuery }: HeroSectionProps) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/explore?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section className="relative overflow-hidden py-24 px-4">
      <div className="absolute inset-0 hero-gradient"></div>
      <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-10 bg-repeat-space"></div>
      
      <div className="container mx-auto text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
          Share Knowledge, <span className="text-skillswap-orange">Grow Together</span>
        </h1>
        <p className="text-white/90 text-lg md:text-xl mb-10 max-w-2xl mx-auto animate-slide-up">
          Exchange skills with others in your community. Teach what you know, learn what you don't.
        </p>
        
        <div className="max-w-md mx-auto relative glass-effect rounded-full p-1 animate-scale-in">
          <Input
            type="text"
            placeholder="What do you want to learn?"
            className="pl-12 py-6 bg-transparent border-0 text-base rounded-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Search className="absolute left-4 top-4 text-gray-400" />
          <Button 
            className={`${isMobile ? 'w-full mt-2' : 'absolute right-1 top-1'} bg-skillswap-orange hover:bg-skillswap-orange/90 rounded-full button-glow`}
            onClick={handleSearch}
          >
            Search
          </Button>
        </div>
        
        <div className="flex items-center justify-center gap-8 mt-12 text-white">
          <div className="flex flex-col items-center">
            <div className="text-3xl font-bold">500+</div>
            <div className="text-sm text-white/80">Skills Shared</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-3xl font-bold">1.2k+</div>
            <div className="text-sm text-white/80">Active Users</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-3xl font-bold">5k+</div>
            <div className="text-sm text-white/80">Skills Exchanged</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
