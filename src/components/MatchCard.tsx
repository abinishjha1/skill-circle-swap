
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Exchange, ArrowRight, MessageSquare } from "lucide-react";
import { Match, User, Skill } from "@/types";
import { getMatchedUser, getMatchedSkill, getMatchStatusColor } from "@/utils/mockData";

interface MatchCardProps {
  match: Match;
  currentUserId: string;
}

const MatchCard = ({ match, currentUserId }: MatchCardProps) => {
  const matchedUser = getMatchedUser(match, currentUserId);
  const skillOffered = getMatchedSkill(match, true);
  const skillWanted = getMatchedSkill(match, false);
  const statusColor = getMatchStatusColor(match.status);
  
  if (!matchedUser || !skillOffered || !skillWanted) {
    return null;
  }

  return (
    <Card className="card-hover overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <img 
              src={matchedUser.avatar} 
              alt={matchedUser.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
            />
            <div>
              <h3 className="font-semibold text-base">{matchedUser.name}</h3>
              <p className="text-sm text-gray-500">{matchedUser.location}</p>
            </div>
          </div>
          <Badge className={statusColor}>
            {match.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mt-2 text-sm">
          <div className="skill-badge truncate max-w-[120px]">
            {skillOffered.name}
          </div>
          <div className="flex items-center px-2">
            <ArrowRight size={16} className="text-gray-400" />
          </div>
          <div className="skill-badge-wanted truncate max-w-[120px]">
            {skillWanted.name}
          </div>
        </div>
        <p className="text-gray-600 mt-3 text-sm">
          Matched on {new Date(match.matchedAt).toLocaleDateString()}
        </p>
      </CardContent>
      <CardFooter className="pt-2 flex justify-between">
        {match.status === 'Pending' ? (
          <>
            <Button variant="outline" size="sm" className="flex-1 mr-2">
              Decline
            </Button>
            <Button className="flex-1 bg-skillswap-purple hover:bg-skillswap-purple-dark">
              Accept
            </Button>
          </>
        ) : (
          <Link to={`/chat?thread=${matchedUser.id}`} className="w-full">
            <Button variant="outline" size="sm" className="w-full">
              <MessageSquare size={16} className="mr-2" />
              Message
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
};

export default MatchCard;
