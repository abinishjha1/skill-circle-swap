
import { Star, MapPin, Calendar, Award, Edit, Save, X, Plus } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { User } from "@/types";
import SkillList from "./SkillList";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface UserProfileProps {
  user: User;
  isCurrentUser?: boolean;
  isEditing?: boolean;
  setIsEditing?: (editing: boolean) => void;
  refetchProfile?: () => void;
}

const UserProfile = ({ 
  user, 
  isCurrentUser = false, 
  isEditing = false, 
  setIsEditing = () => {}, 
  refetchProfile = () => {} 
}: UserProfileProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: user.name,
    bio: user.bio || "",
    location: user.location || "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      // Fix TypeScript error by casting from to the correct table name
      const { error } = await supabase
        .from('profiles')
        .update({
          name: formData.name,
          bio: formData.bio,
          location: formData.location,
        })
        .eq('id', user.id);

      if (error) throw error;

      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      });
      
      setIsEditing(false);
      refetchProfile();
    } catch (error: any) {
      toast({
        title: "Update failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

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
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <Textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              placeholder="Tell others about yourself..."
              className="min-h-[100px]"
            />
          ) : (
            <p className="text-gray-700">{user.bio || "No bio provided yet."}</p>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold flex items-center">
          <span className="inline-block w-2 h-2 rounded-full mr-2 bg-skillswap-purple"></span>
          Skills Offered
        </h3>
        {isCurrentUser && (
          <Button variant="outline" size="sm" className="text-skillswap-purple">
            <Plus size={16} className="mr-1" />
            Add Skill
          </Button>
        )}
      </div>

      <SkillList 
        skills={user.skillsOffered}
        title=""
        isOffered={true}
        emptyMessage={isCurrentUser ? "Add skills you can teach others" : "No skills offered yet"}
      />

      <div className="flex justify-between items-center mt-8">
        <h3 className="text-xl font-semibold flex items-center">
          <span className="inline-block w-2 h-2 rounded-full mr-2 bg-skillswap-orange"></span>
          Skills Wanted
        </h3>
        {isCurrentUser && (
          <Button variant="outline" size="sm" className="text-skillswap-orange">
            <Plus size={16} className="mr-1" />
            Add Skill
          </Button>
        )}
      </div>

      <SkillList 
        skills={user.skillsWanted}
        title=""
        isOffered={false}
        emptyMessage={isCurrentUser ? "Add skills you want to learn" : "Not looking for any skills yet"}
      />
    </div>
  );
};

export default UserProfile;
