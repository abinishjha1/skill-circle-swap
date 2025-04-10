
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User } from "@/types";
import UserProfile from "@/components/UserProfile";
import { useAuth } from "@/contexts/AuthContext";
import { getCurrentUser } from "@/utils/mockData";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const { user: authUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  const fetchUserProfile = async () => {
    if (!authUser) return;
    
    try {
      // Currently using mock data due to database configuration
      const currentUser = getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast({
        title: "Error loading profile",
        description: "Please try again later",
        variant: "destructive"
      });
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
