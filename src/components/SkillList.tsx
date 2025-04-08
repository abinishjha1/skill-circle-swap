
import { Skill } from "@/types";
import SkillCard from "./SkillCard";

interface SkillListProps {
  skills: Skill[];
  title: string;
  isOffered?: boolean;
  emptyMessage?: string;
}

const SkillList = ({
  skills,
  title,
  isOffered = true,
  emptyMessage = "No skills listed yet"
}: SkillListProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold flex items-center">
        <span className={`inline-block w-2 h-2 rounded-full mr-2 ${isOffered ? 'bg-skillswap-purple' : 'bg-skillswap-orange'}`}></span>
        {title}
      </h3>
      
      {skills.length === 0 ? (
        <p className="text-gray-500 text-sm italic">{emptyMessage}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skills.map((skill) => (
            <SkillCard key={skill.id} skill={skill} isOffered={isOffered} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillList;
