
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import MatchCard from "@/components/MatchCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MatchStatus } from "@/types";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const Matches = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<string>("all");
  
  const { data: matches, isLoading } = useQuery({
    queryKey: ['matches', user?.id, activeTab],
    queryFn: async () => {
      if (!user) throw new Error("User not authenticated");
      
      let query = supabase
        .from('matches')
        .select(`
          *,
          profiles!matches_user_id_fkey(id, name, avatar, location, rating, is_premium),
          matched_profiles:profiles!matches_matched_user_id_fkey(id, name, avatar, location, rating, is_premium),
          offered_skills:skills!matches_skill_offered_id_fkey(id, name, category, description, level),
          wanted_skills:skills!matches_skill_wanted_id_fkey(id, name, category, description, level)
        `)
        .or(`user_id.eq.${user.id},matched_user_id.eq.${user.id}`);
      
      if (activeTab !== "all") {
        query = query.eq('status', activeTab.charAt(0).toUpperCase() + activeTab.slice(1));
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      return data;
    },
    enabled: !!user
  });
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">Your Matches</h1>
        
        <Tabs defaultValue="all" onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="accepted">Accepted</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab}>
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="animate-pulse">
                    <div className="h-40 bg-gray-200 rounded-lg"></div>
                  </div>
                ))}
              </div>
            ) : !matches || matches.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-500">No matches found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {matches.map(match => (
                  <MatchCard 
                    key={match.id} 
                    match={{
                      id: match.id,
                      userId: match.user_id,
                      matchedUserId: match.matched_user_id,
                      skillOfferedId: match.skill_offered_id,
                      skillWantedId: match.skill_wanted_id,
                      matchedAt: match.matched_at,
                      status: match.status as MatchStatus,
                      profiles: match.profiles,
                      matchedProfiles: match.matched_profiles,
                      offeredSkill: match.offered_skills,
                      wantedSkill: match.wanted_skills
                    }} 
                    currentUserId={user!.id} 
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Matches;
