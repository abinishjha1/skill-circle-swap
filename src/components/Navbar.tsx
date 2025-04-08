
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { User, MessageSquare, Search, Users, Bell, Menu } from "lucide-react";
import { getCurrentUser } from "@/utils/mockData";
import { useState } from 'react';

const Navbar = () => {
  const currentUser = getCurrentUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <Link to="/" className="text-2xl font-bold flex items-center">
              <span className="text-gradient">Skill</span>
              <span className="text-skillswap-orange">Swap</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-skillswap-purple transition-colors font-medium">
              Home
            </Link>
            <Link to="/matches" className="text-gray-600 hover:text-skillswap-purple transition-colors font-medium">
              Matches
            </Link>
            <Link to="/chat" className="text-gray-600 hover:text-skillswap-purple transition-colors font-medium">
              Messages
            </Link>
            <Link to="/explore" className="text-gray-600 hover:text-skillswap-purple transition-colors font-medium">
              Explore
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {/* Notification Bell */}
            <Button variant="ghost" size="icon" className="rounded-full relative">
              <Bell size={20} className="text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-skillswap-orange text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">3</span>
            </Button>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Menu size={20} className="text-gray-600" />
              </Button>
            </div>
            
            {/* User Profile */}
            <Link to="/profile">
              <div className="flex items-center space-x-2">
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-medium">{currentUser.name}</p>
                  <p className="text-xs text-gray-500">View Profile</p>
                </div>
                <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-skillswap-purple/20 hover:border-skillswap-purple transition-colors">
                  <img 
                    src={currentUser.avatar} 
                    alt={currentUser.name} 
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </Link>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 mt-3 border-t border-gray-100 animate-fade-in">
            <div className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className="text-gray-600 hover:text-skillswap-purple px-2 py-1 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/matches" 
                className="text-gray-600 hover:text-skillswap-purple px-2 py-1 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Matches
              </Link>
              <Link 
                to="/chat" 
                className="text-gray-600 hover:text-skillswap-purple px-2 py-1 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Messages
              </Link>
              <Link 
                to="/explore" 
                className="text-gray-600 hover:text-skillswap-purple px-2 py-1 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Explore
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
