
import { User } from "@/types";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Star, Award, Edit, Save, X } from "lucide-react";

interface UserProfileHeaderProps {
  user: User;
  isCurrentUser: boolean;
  isEditing: boolean;
  formData: {
    name: string;
    location: string;
    bio: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSave: () => void;
  setIsEditing: (editing: boolean) => void;
}

const UserProfileHeader = ({
  user,
  isCurrentUser,
  isEditing,
  formData,
  handleInputChange,
  handleSave,
  setIsEditing
}: UserProfileHeaderProps) => {
  return (
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
          {isEditing ? (
            <Input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="font-bold text-xl mb-1"
            />
          ) : (
            <h2 className="text-2xl font-bold">{user.name}</h2>
          )}
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <MapPin size={14} className="mr-1" />
            {isEditing ? (
              <Input
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Your location"
                className="h-7"
              />
            ) : (
              <span>{user.location || "No location set"}</span>
            )}
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
        isEditing ? (
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              <X size={16} className="mr-1" />
              Cancel
            </Button>
            <Button onClick={handleSave}>
              <Save size={16} className="mr-1" />
              Save
            </Button>
          </div>
        ) : (
          <Button variant="outline" onClick={() => setIsEditing(true)}>
            <Edit size={16} className="mr-1" />
            Edit Profile
          </Button>
        )
      ) : (
        <Button className="bg-skillswap-purple hover:bg-skillswap-purple-dark">
          Contact
        </Button>
      )}
    </div>
  );
};

export default UserProfileHeader;
