
import { Star, MapPin, Calendar, Award } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User } from "@/types";
import SkillList from "./SkillList";

interface UserProfileProps {
  user: User;
  isCurrentUser?: boolean;
}

const UserProfile = ({ user, isCurrentUser = false }: UserProfileProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img 
                  src={user.avatar} 
                  alt={user.name}
                  className="w-20 h-20 rounded-full object-cover border-2 border-white shadow"
                />
                {user.isPremium && (
                  <Badge className="absolute -bottom-1 -right-1 bg-skillswap-orange border-2 border-white">
                    <Award size={12} className="mr-1" />
                    PRO
                  </Badge>
                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <MapPin size={14} className="mr-1" />
                  <span>{user.location}</span>
                </div>
                <div className="flex items-center mt-1">
                  <div className="flex items-center text-yellow-500">
                    <Star size={16} className="fill-current" />
                    <span className="ml-1 font-medium">{user.rating}</span>
                  </div>
                  <div className="flex items-center ml-4 text-sm text-gray-500">
                    <Calendar size={14} className="mr-1" />
                    <span>Member since {new Date(user.memberSince).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {isCurrentUser ? (
              <Button variant="outline">Edit Profile</Button>
            ) : (
              <Button className="bg-skillswap-purple hover:bg-skillswap-purple-dark">
                Contact
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">{user.bio}</p>
        </CardContent>
      </Card>

      <SkillList 
        skills={user.skillsOffered}
        title="Skills Offered"
        isOffered={true}
        emptyMessage={isCurrentUser ? "Add skills you can teach others" : "No skills offered yet"}
      />

      <SkillList 
        skills={user.skillsWanted}
        title="Skills Wanted"
        isOffered={false}
        emptyMessage={isCurrentUser ? "Add skills you want to learn" : "Not looking for any skills yet"}
      />
    </div>
  );
};

export default UserProfile;
