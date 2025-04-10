
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RepeatIcon } from "lucide-react";
import { getSkillCategoryColor } from "@/utils/mockData";
import { MatchStatus } from "@/types";

interface MatchCardProps {
  match: {
    id: string;
    userId: string;
    matchedUserId: string;
    skillOfferedId: string;
    skillWantedId: string;
    matchedAt: string;
    status: MatchStatus;
    profiles: any;
    matchedProfiles: any;
    offeredSkill: any;
    wantedSkill: any;
  };
  currentUserId: string;
}

const MatchCard = ({ match, currentUserId }: MatchCardProps) => {
  const isCurrentUserInitiator = match.userId === currentUserId;
  const matchedUser = isCurrentUserInitiator ? match.matchedProfiles : match.profiles;
  const skillOffered = isCurrentUserInitiator ? match.offeredSkill : match.wantedSkill;
  const skillWanted = isCurrentUserInitiator ? match.wantedSkill : match.offeredSkill;
  
  if (!matchedUser || !skillOffered || !skillWanted) return null;
  
  const userInitials = matchedUser.name
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase();
  
  // Helper function to get status color
  const getMatchStatusColor = (status: MatchStatus): string => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Accepted':
        return 'bg-green-100 text-green-800';
      case 'Completed':
        return 'bg-blue-100 text-blue-800';
      case 'Declined':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage src={matchedUser.avatar} alt={matchedUser.name} />
              <AvatarFallback>{userInitials}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{matchedUser.name}</h3>
              <p className="text-sm text-gray-500">{matchedUser.location}</p>
            </div>
          </div>
          <Badge className={getMatchStatusColor(match.status)}>
            {match.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-xs text-gray-500 mb-1">You Offer</p>
            <Badge variant="outline" className={getSkillCategoryColor(skillOffered.category)}>
              {skillOffered.name}
            </Badge>
          </div>
          <div className="mx-2">
            <RepeatIcon className="h-5 w-5 text-gray-400" />
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">You Receive</p>
            <Badge variant="outline" className={getSkillCategoryColor(skillWanted.category)}>
              {skillWanted.name}
            </Badge>
          </div>
        </div>
        <p className="text-xs text-gray-500">
          Matched on {new Date(match.matchedAt).toLocaleDateString()}
        </p>
      </CardContent>
      <CardFooter className="bg-gray-50 border-t">
        <Link 
          to={`/chat?thread=${match.id}`}
          className="text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          Message {matchedUser.name}
        </Link>
      </CardFooter>
    </Card>
  );
};

export default MatchCard;
