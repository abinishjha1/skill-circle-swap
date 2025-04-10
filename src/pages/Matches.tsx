
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MatchCard from "@/components/MatchCard";
import { useAuth } from "@/contexts/AuthContext";
import { Match, User, Skill } from "@/types";
import { supabase } from "@/integrations/supabase/client";
import { getCurrentUser, mockMatches } from "@/utils/mockData";

const Matches = () => {
  const { user: authUser } = useAuth();
  const [matches, setMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const fetchMatches = async () => {
    if (!authUser) return;
    
    try {
      // Fix TypeScript error by casting to the proper table
      const { data, error } = await supabase
        .from('matches')
        .select(`
          *,
          profiles!matches_user_id_fkey(*),
          matched_profiles:profiles!matches_matched_user_id_fkey(*),
          offered_skills:skills!matches_skill_offered_id_fkey(*),
          wanted_skills:skills!matches_skill_wanted_id_fkey(*)
        `)
        .or(`user_id.eq.${authUser.id},matched_user_id.eq.${authUser.id}`);
      
      if (error) throw error;
      
      if (data) {
        const formattedMatches: Match[] = data.map((match: any) => {
          // Map database records to app types
          return {
            id: match.id,
            userId: match.user_id,
            matchedUserId: match.matched_user_id,
            skillOfferedId: match.skill_offered_id,
            skillWantedId: match.skill_wanted_id,
            matchedAt: match.matched_at,
            status: match.status as any,
            user: mapProfileToUser(match.profiles),
            matchedUser: mapProfileToUser(match.matched_profiles),
            skillOffered: mapSkill(match.offered_skills),
            skillWanted: mapSkill(match.wanted_skills)
          };
        });

        setMatches(formattedMatches);
      }
    } catch (error) {
      console.error("Error fetching matches:", error);
      // Fallback to mock data if there's an error
      setMatches(mockMatches);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Helper functions to map database records to app types
  const mapProfileToUser = (profile: any): User => {
    if (!profile) return {} as User;
    return {
      id: profile.id,
      name: profile.name,
      avatar: profile.avatar || "/placeholder.svg",
      bio: profile.bio || "",
      location: profile.location || "",
      rating: profile.rating || 0,
      skillsOffered: [],
      skillsWanted: [],
      memberSince: profile.member_since,
      isPremium: profile.is_premium
    };
  };
  
  const mapSkill = (skill: any): Skill => {
    if (!skill) return {} as Skill;
    return {
      id: skill.id,
      name: skill.name,
      category: skill.category as any,
      description: skill.description || "",
      level: skill.level as any
    };
  };
  
  useEffect(() => {
    fetchMatches();
  }, [authUser]);
  
  if (isLoading) {
    return <div className="container mx-auto p-4 flex justify-center items-center h-screen">Loading matches...</div>;
  }

  const pendingMatches = matches.filter(match => match.status === 'Pending');
  const activeMatches = matches.filter(match => match.status === 'Accepted');
  const completedMatches = matches.filter(match => match.status === 'Completed');
  
  return (
    <div className="min-h-screen bg-gray-50 pt-16 pb-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Your Matches</h1>
        
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="active">Active ({activeMatches.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({pendingMatches.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedMatches.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active" className="space-y-6">
            {activeMatches.length === 0 ? (
              <p className="text-gray-500 p-4 text-center">You don't have any active matches yet.</p>
            ) : (
              activeMatches.map(match => <MatchCard key={match.id} match={match} />)
            )}
          </TabsContent>
          
          <TabsContent value="pending" className="space-y-6">
            {pendingMatches.length === 0 ? (
              <p className="text-gray-500 p-4 text-center">No pending match requests.</p>
            ) : (
              pendingMatches.map(match => <MatchCard key={match.id} match={match} />)
            )}
          </TabsContent>
          
          <TabsContent value="completed" className="space-y-6">
            {completedMatches.length === 0 ? (
              <p className="text-gray-500 p-4 text-center">You haven't completed any matches yet.</p>
            ) : (
              completedMatches.map(match => <MatchCard key={match.id} match={match} />)
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Matches;
