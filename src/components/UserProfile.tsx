
import { Star, MapPin, Calendar, Award, Edit, Save, X, Plus } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { User, Skill, SkillCategory, SkillLevel } from "@/types";
import SkillList from "./SkillList";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";

interface UserProfileProps {
  user: User;
  isCurrentUser?: boolean;
  isEditing?: boolean;
  setIsEditing?: (editing: boolean) => void;
  refetchProfile?: () => void;
}

interface SkillFormValues {
  name: string;
  category: SkillCategory;
  description: string;
  level: SkillLevel;
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

  const skillForm = useForm<SkillFormValues>({
    defaultValues: {
      name: "",
      category: "Technology",
      description: "",
      level: "Intermediate",
    },
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
      // This is a mock update since we're using mock data
      // In a real app with Supabase, we would update the profiles table
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
      const values = skillForm.getValues();
      console.log("Adding new skill:", values, "isOffered:", isOffered);
      
      // In a real app, we would add the skill to the database
      const newSkill: Skill = {
        id: `skill-${Date.now()}`,
        name: values.name,
        category: values.category,
        description: values.description,
        level: values.level,
      };
      
      // Update local state to reflect the new skill
      if (isOffered) {
        user.skillsOffered = [...user.skillsOffered, newSkill];
        setAddingOfferedSkill(false);
      } else {
        user.skillsWanted = [...user.skillsWanted, newSkill];
        setAddingWantedSkill(false);
      }
      
      skillForm.reset();
      
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

  const SkillFormDialog = ({ isOffered }: { isOffered: boolean }) => (
    <Dialog 
      open={isOffered ? addingOfferedSkill : addingWantedSkill} 
      onOpenChange={(open) => isOffered ? setAddingOfferedSkill(open) : setAddingWantedSkill(open)}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isOffered ? 'Add Skill to Offer' : 'Add Skill You Want to Learn'}</DialogTitle>
        </DialogHeader>
        <Form {...skillForm}>
          <div className="grid gap-4 py-4">
            <FormField
              control={skillForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skill Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., JavaScript" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={skillForm.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <ScrollArea className="h-[200px]">
                        <SelectItem value="Technology">Technology</SelectItem>
                        <SelectItem value="Design">Design</SelectItem>
                        <SelectItem value="Business">Business</SelectItem>
                        <SelectItem value="Language">Language</SelectItem>
                        <SelectItem value="Music">Music</SelectItem>
                        <SelectItem value="Cooking">Cooking</SelectItem>
                        <SelectItem value="Fitness">Fitness</SelectItem>
                        <SelectItem value="Arts & Crafts">Arts & Crafts</SelectItem>
                        <SelectItem value="Academic">Academic</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </ScrollArea>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={skillForm.control}
              name="level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skill Level</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                      <SelectItem value="Expert">Expert</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={skillForm.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Briefly describe your skill or what you want to learn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => isOffered ? setAddingOfferedSkill(false) : setAddingWantedSkill(false)}>
              Cancel
            </Button>
            <Button onClick={() => handleAddSkill(isOffered)}>
              Add Skill
            </Button>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  );

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
          <Button 
            variant="outline" 
            size="sm" 
            className="text-skillswap-purple"
            onClick={() => setAddingOfferedSkill(true)}
          >
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
          <Button 
            variant="outline" 
            size="sm" 
            className="text-skillswap-orange"
            onClick={() => setAddingWantedSkill(true)}
          >
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

      {isCurrentUser && (
        <>
          <SkillFormDialog isOffered={true} />
          <SkillFormDialog isOffered={false} />
        </>
      )}
    </div>
  );
};

export default UserProfile;
