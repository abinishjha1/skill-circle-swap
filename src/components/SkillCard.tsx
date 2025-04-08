
import { Skill } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getSkillCategoryColor, getSkillLevelBadge } from "@/utils/mockData";
import { BookOpen, Star, Users } from "lucide-react";

interface SkillCardProps {
  skill: Skill;
  isOffered?: boolean;
}

const SkillCard = ({ skill, isOffered = true }: SkillCardProps) => {
  const categoryColor = getSkillCategoryColor(skill.category);
  const levelBadge = getSkillLevelBadge(skill.level);
  
  return (
    <Card className={`card-hover overflow-hidden shadow-md border-none`}>
      <div className={`h-1 w-full ${isOffered ? 'bg-gradient-to-r from-skillswap-purple to-skillswap-purple-light' : 'bg-gradient-to-r from-skillswap-orange to-skillswap-orange-light'}`}></div>
      <CardHeader className="pb-2 relative">
        <div className="absolute top-1 right-1">
          <Badge variant="outline" className={categoryColor}>
            {skill.category}
          </Badge>
        </div>
        <CardTitle className="text-lg">{skill.name}</CardTitle>
        <CardDescription className="line-clamp-2">
          {skill.description || `${skill.level} level skills in ${skill.category}`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-1">
            <Star className={`h-4 w-4 ${isOffered ? 'text-skillswap-purple' : 'text-skillswap-orange'}`} />
            <span className="text-sm font-medium">{skill.level}</span>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5 text-gray-500" />
              <span className="text-xs text-gray-500">4 Members</span>
            </div>
            
            <div className="flex items-center gap-1">
              <BookOpen className="h-3.5 w-3.5 text-gray-500" />
              <span className="text-xs text-gray-500">8 Sessions</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
          <span className={`text-sm font-medium px-2 py-0.5 rounded-full ${isOffered ? 'bg-skillswap-purple/10 text-skillswap-purple' : 'bg-skillswap-orange/10 text-skillswap-orange'}`}>
            {isOffered ? 'Offering' : 'Seeking'}
          </span>
          
          <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-800">
            View Details
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillCard;
