
import { User, Skill } from "@/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import UserProfileHeader from "./profile/UserProfileHeader";
import SkillFormDialog from "./profile/SkillFormDialog";
import SkillSection from "./profile/SkillSection";

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
  const [addingOfferedSkill, setAddingOfferedSkill] = useState(false);
  const [addingWantedSkill, setAddingWantedSkill] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      // Mock update since we're using mock data
      console.log("Updating user profile with data:", formData);
      
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

  const handleAddSkill = async (isOffered: boolean) => {
    try {
      // In a real app, we would add the skill to the database
      const newSkill: Skill = {
        id: `skill-${Date.now()}`,
        name: "", // This would come from the form
        category: "Technology", // This would come from the form
        description: "", // This would come from the form
        level: "Intermediate", // This would come from the form
      };
      
      // Update local state to reflect the new skill
      if (isOffered) {
        user.skillsOffered = [...user.skillsOffered, newSkill];
        setAddingOfferedSkill(false);
      } else {
        user.skillsWanted = [...user.skillsWanted, newSkill];
        setAddingWantedSkill(false);
      }
      
      toast({
        title: "Skill added",
        description: `Your ${isOffered ? 'offered' : 'wanted'} skill has been added successfully.`,
      });
      
      refetchProfile();
    } catch (error: any) {
      toast({
        title: "Failed to add skill",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <UserProfileHeader 
            user={user}
            isCurrentUser={isCurrentUser}
            isEditing={isEditing}
            formData={formData}
            handleInputChange={handleInputChange}
            handleSave={handleSave}
            setIsEditing={setIsEditing}
          />
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

      <SkillSection
        title="Skills Offered"
        skills={user.skillsOffered}
        isOffered={true}
        isCurrentUser={isCurrentUser}
        emptyMessage={isCurrentUser ? "Add skills you can teach others" : "No skills offered yet"}
        onAddSkillClick={() => setAddingOfferedSkill(true)}
      />

      <SkillSection
        title="Skills Wanted"
        skills={user.skillsWanted}
        isOffered={false}
        isCurrentUser={isCurrentUser}
        emptyMessage={isCurrentUser ? "Add skills you want to learn" : "Not looking for any skills yet"}
        onAddSkillClick={() => setAddingWantedSkill(true)}
      />

      {isCurrentUser && (
        <>
          <SkillFormDialog 
            isOffered={true}
            isOpen={addingOfferedSkill}
            setIsOpen={setAddingOfferedSkill}
            onAddSkill={handleAddSkill}
          />
          <SkillFormDialog 
            isOffered={false}
            isOpen={addingWantedSkill}
            setIsOpen={setAddingWantedSkill}
            onAddSkill={handleAddSkill}
          />
        </>
      )}
    </div>
  );
};

export default UserProfile;
