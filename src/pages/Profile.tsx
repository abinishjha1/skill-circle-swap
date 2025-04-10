
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skill, User } from "@/types";
import UserProfile from "@/components/UserProfile";
import { useAuth } from "@/contexts/AuthContext";
import { getCurrentUser } from "@/utils/mockData";
import { supabase } from "@/integrations/supabase/client";

const Profile = () => {
  const { user: authUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const fetchUserProfile = async () => {
    if (!authUser) return;
    
    try {
      // Fix TypeScript error by using proper type casting
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authUser.id)
        .single();
      
      if (profileError) throw profileError;
      
      // Get offered skills
      const { data: offeredSkills, error: offeredError } = await supabase
        .from('skills')
        .select('*')
        .eq('user_id', authUser.id)
        .eq('is_offered', true);
      
      if (offeredError) throw offeredError;
      
      // Get wanted skills
      const { data: wantedSkills, error: wantedError } = await supabase
        .from('skills')
        .select('*')
        .eq('user_id', authUser.id)
        .eq('is_offered', false);
      
      if (wantedError) throw wantedError;
      
      // Make sure data is properly null checked
      if (profileData) {
        const userData: User = {
          id: profileData.id,
          name: profileData.name || "New User",
          avatar: profileData.avatar || "/placeholder.svg",
          bio: profileData.bio || "",
          location: profileData.location || "",
          rating: profileData.rating || 0,
          skillsOffered: offeredSkills?.map((skill: any) => ({
            id: skill.id,
            name: skill.name,
            category: skill.category as any,
            description: skill.description,
            level: skill.level as any,
          })) || [],
          skillsWanted: wantedSkills?.map((skill: any) => ({
            id: skill.id,
            name: skill.name,
            category: skill.category as any,
            description: skill.description,
            level: skill.level as any,
          })) || [],
          memberSince: profileData.member_since || new Date().toISOString(),
          isPremium: profileData.is_premium || false,
        };
        
        setUser(userData);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      // Fallback to mock data if there's an error
      setUser(getCurrentUser());
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchUserProfile();
  }, [authUser]);
  
  if (isLoading) {
    return <div className="container mx-auto p-4 flex justify-center items-center h-screen">Loading...</div>;
  }
  
  if (!user) {
    return <div className="container mx-auto p-4">User not found</div>;
  }
  
  return (
    <div className="min-h-screen bg-gray-50 pt-16 pb-12">
      <div className="container mx-auto px-4">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-6">
            <UserProfile 
              user={user} 
              isCurrentUser={true} 
              isEditing={isEditing} 
              setIsEditing={setIsEditing}
              refetchProfile={fetchUserProfile}
            />
          </TabsContent>
          
          <TabsContent value="reviews">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Reviews</h2>
              <p className="text-gray-500">You haven't received any reviews yet.</p>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
              <p className="text-gray-500">Account settings coming soon.</p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
