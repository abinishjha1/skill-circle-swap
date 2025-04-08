
import Navbar from "@/components/Navbar";
import UserProfile from "@/components/UserProfile";
import { getCurrentUser } from "@/utils/mockData";

const Profile = () => {
  const currentUser = getCurrentUser();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">Your Profile</h1>
        <UserProfile user={currentUser} isCurrentUser={true} />
      </div>
    </div>
  );
};

export default Profile;
