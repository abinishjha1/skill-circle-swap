
import { Skill } from "@/types";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import SkillList from "@/components/SkillList";

interface SkillSectionProps {
  title: string;
  skills: Skill[];
  isOffered: boolean;
  isCurrentUser: boolean;
  emptyMessage: string;
  onAddSkillClick: () => void;
}

const SkillSection = ({
  title,
  skills,
  isOffered,
  isCurrentUser,
  emptyMessage,
  onAddSkillClick
}: SkillSectionProps) => {
  return (
    <>
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold flex items-center">
          <span className={`inline-block w-2 h-2 rounded-full mr-2 ${isOffered ? 'bg-skillswap-purple' : 'bg-skillswap-orange'}`}></span>
          {title}
        </h3>
        {isCurrentUser && (
          <Button 
            variant="outline" 
            size="sm" 
            className={isOffered ? "text-skillswap-purple" : "text-skillswap-orange"}
            onClick={onAddSkillClick}
          >
            <Plus size={16} className="mr-1" />
            Add Skill
          </Button>
        )}
      </div>

      <SkillList 
        skills={skills}
        title=""
        isOffered={isOffered}
        emptyMessage={emptyMessage}
      />
    </>
  );
};

export default SkillSection;
