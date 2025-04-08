
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { User, MessageSquare, Search, Users } from "lucide-react";
import { getCurrentUser } from "@/utils/mockData";

const Navbar = () => {
  const currentUser = getCurrentUser();

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <Link to="/" className="text-2xl font-bold text-skillswap-purple flex items-center">
            <span className="text-skillswap-orange">Skill</span>
            Swap
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-600 hover:text-skillswap-purple transition-colors">
            Home
          </Link>
          <Link to="/matches" className="text-gray-600 hover:text-skillswap-purple transition-colors">
            Matches
          </Link>
          <Link to="/chat" className="text-gray-600 hover:text-skillswap-purple transition-colors">
            Messages
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <div className="md:hidden flex space-x-2">
            <Link to="/" className="p-2 text-gray-600 hover:text-skillswap-purple">
              <Search size={20} />
            </Link>
            <Link to="/matches" className="p-2 text-gray-600 hover:text-skillswap-purple">
              <Users size={20} />
            </Link>
            <Link to="/chat" className="p-2 text-gray-600 hover:text-skillswap-purple">
              <MessageSquare size={20} />
            </Link>
          </div>
          <Link to="/profile">
            <Button variant="ghost" className="rounded-full p-0 w-10 h-10">
              <img 
                src={currentUser.avatar} 
                alt={currentUser.name} 
                className="rounded-full"
              />
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
