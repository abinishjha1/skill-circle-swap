
import SkillCard from "@/components/SkillCard";
import { Skill } from "@/types";

interface FeaturedSkillsProps {
  skills: Skill[];
}

const FeaturedSkills = ({ skills }: FeaturedSkillsProps) => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <h2 className="section-title">Featured Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
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
