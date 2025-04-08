
import { Skill } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getSkillCategoryColor, getSkillLevelBadge } from "@/utils/mockData";

interface SkillCardProps {
  skill: Skill;
  isOffered?: boolean;
}

const SkillCard = ({ skill, isOffered = true }: SkillCardProps) => {
  const categoryColor = getSkillCategoryColor(skill.category);
  const levelBadge = getSkillLevelBadge(skill.level);
  
  return (
    <Card className={`card-hover ${isOffered ? 'border-l-4 border-l-skillswap-purple' : 'border-l-4 border-l-skillswap-orange'}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{skill.name}</CardTitle>
          <Badge variant="outline" className={categoryColor}>
            {skill.category}
          </Badge>
        </div>
        <CardDescription>
          {skill.description || `${skill.level} level skills in ${skill.category}`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <Badge variant="outline" className={levelBadge}>
            {skill.level}
          </Badge>
          <span className={`text-sm font-medium ${isOffered ? 'text-skillswap-purple' : 'text-skillswap-orange'}`}>
            {isOffered ? 'Offering' : 'Seeking'}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillCard;
