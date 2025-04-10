
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import UserProfile from "@/components/UserProfile";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { User, Skill } from "@/types";
import { Button } from "@/components/ui/button";

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  
  const { data: profile, isLoading, error, refetch } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      if (!user) throw new Error("User not authenticated");
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error) throw error;
      
      // Get skills offered
      const { data: skillsOffered, error: skillsOfferedError } = await supabase
        .from('skills')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_offered', true);
      
      if (skillsOfferedError) throw skillsOfferedError;
      
      // Get skills wanted
      const { data: skillsWanted, error: skillsWantedError } = await supabase
        .from('skills')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_offered', false);
      
      if (skillsWantedError) throw skillsWantedError;
      
      return {
        id: data.id,
        name: data.name,
        avatar: data.avatar,
        bio: data.bio || '',
        location: data.location || '',
        rating: data.rating || 0,
        skillsOffered: skillsOffered.map((skill: any): Skill => ({
          id: skill.id,
          name: skill.name,
          category: skill.category as any,
          description: skill.description,
          level: skill.level as any
        })),
        skillsWanted: skillsWanted.map((skill: any): Skill => ({
          id: skill.id,
          name: skill.name,
          category: skill.category as any,
          description: skill.description,
          level: skill.level as any
        })),
        memberSince: data.member_since,
        isPremium: data.is_premium
      } as User;
    },
    enabled: !!user
  });
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto py-8 px-4">
          <h1 className="text-2xl font-bold mb-6">Your Profile</h1>
          <div className="animate-pulse">
            <div className="h-60 bg-gray-200 rounded-lg mb-6"></div>
            <div className="h-40 bg-gray-200 rounded-lg mb-6"></div>
            <div className="h-40 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (error || !profile) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto py-8 px-4">
          <h1 className="text-2xl font-bold mb-6">Your Profile</h1>
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
            <p>Error loading profile. Please try again later.</p>
            <Button onClick={() => refetch()} className="mt-2">
              Retry
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">Your Profile</h1>
        <UserProfile 
          user={profile} 
          isCurrentUser={true} 
          isEditing={isEditing} 
          setIsEditing={setIsEditing}
          refetchProfile={refetch}
        />
      </div>
    </div>
  );
};

export default Profile;
