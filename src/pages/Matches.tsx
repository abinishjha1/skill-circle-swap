
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MatchCard from "@/components/MatchCard";
import { useAuth } from "@/contexts/AuthContext";
import { Match } from "@/types";
import { mockMatches } from "@/utils/mockData";
import { useToast } from "@/hooks/use-toast";

const Matches = () => {
  const { user: authUser } = useAuth();
  const [matches, setMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("active");
  const { toast } = useToast();
  
  const fetchMatches = async () => {
    if (!authUser) return;
    
    try {
      // Currently using mock data instead of Supabase due to database configuration issues
      setMatches(mockMatches);
    } catch (error) {
      console.error("Error fetching matches:", error);
      toast({
        title: "Error loading matches",
        description: "Please try again later",
        variant: "destructive"
      });
      // Fallback to mock data if there's an error
      setMatches(mockMatches);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchMatches();
  }, [authUser]);
  
  if (isLoading) {
    return <div className="container mx-auto p-4 flex justify-center items-center h-screen">Loading matches...</div>;
  }

  // These filters should work correctly with the mock data structure
  const pendingMatches = matches.filter(match => match.status === 'Pending');
  const activeMatches = matches.filter(match => match.status === 'Accepted');
  const completedMatches = matches.filter(match => match.status === 'Completed');
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pt-16 pb-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Your Matches</h1>
        
        <Tabs defaultValue={activeTab} onValueChange={handleTabChange}>
          <TabsList className="mb-8">
            <TabsTrigger value="active">Active ({activeMatches.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({pendingMatches.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedMatches.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active" className="space-y-6">
            {activeMatches.length === 0 ? (
              <p className="text-gray-500 p-4 text-center">You don't have any active matches yet.</p>
            ) : (
              activeMatches.map(match => 
                <MatchCard 
                  key={match.id} 
                  match={{
                    ...match,
                    profiles: mockMatches[0].profiles,
                    matchedProfiles: mockMatches[0].matchedProfiles,
                    offeredSkill: mockMatches[0].offeredSkill,
                    wantedSkill: mockMatches[0].wantedSkill
                  }} 
                  currentUserId={authUser?.id || ''}
                />
              )
            )}
          </TabsContent>
          
          <TabsContent value="pending" className="space-y-6">
            {pendingMatches.length === 0 ? (
              <p className="text-gray-500 p-4 text-center">No pending match requests.</p>
            ) : (
              pendingMatches.map(match => 
                <MatchCard 
                  key={match.id} 
                  match={{
                    ...match,
                    profiles: mockMatches[0].profiles,
                    matchedProfiles: mockMatches[0].matchedProfiles,
                    offeredSkill: mockMatches[0].offeredSkill,
                    wantedSkill: mockMatches[0].wantedSkill
                  }} 
                  currentUserId={authUser?.id || ''}
                />
              )
            )}
          </TabsContent>
          
          <TabsContent value="completed" className="space-y-6">
            {completedMatches.length === 0 ? (
              <p className="text-gray-500 p-4 text-center">You haven't completed any matches yet.</p>
            ) : (
              completedMatches.map(match => 
                <MatchCard 
                  key={match.id} 
                  match={{
                    ...match,
                    profiles: mockMatches[0].profiles,
                    matchedProfiles: mockMatches[0].matchedProfiles,
                    offeredSkill: mockMatches[0].offeredSkill,
                    wantedSkill: mockMatches[0].wantedSkill
                  }} 
                  currentUserId={authUser?.id || ''}
                />
              )
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Matches;
