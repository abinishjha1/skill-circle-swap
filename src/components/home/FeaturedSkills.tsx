
import SkillCard from "@/components/SkillCard";
import { Skill } from "@/types";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

interface FeaturedSkillsProps {
  skills: Skill[];
}

const FeaturedSkills = ({ skills }: FeaturedSkillsProps) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  const skillsToDisplay = isMobile ? skills.slice(0, 2) : skills;

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="section-title text-2xl font-bold">Featured Skills</h2>
          <Button 
            variant="ghost" 
            className="text-skillswap-purple hover:text-skillswap-purple-dark"
            onClick={() => navigate('/explore')}
          >
            View All
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillsToDisplay.map((skill, index) => (
            <div key={skill.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <SkillCard skill={skill} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSkills;
