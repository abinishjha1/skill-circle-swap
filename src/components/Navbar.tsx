
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { User, MessageSquare, Search, Users, Bell, Menu, LogOut } from "lucide-react";
import { useState } from 'react';
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const getUserInitials = () => {
    if (!user) return "U";
    const name = user.user_metadata?.name || user.email || "";
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
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
            {user && (
              <>
                <Link to="/matches" className="text-gray-600 hover:text-skillswap-purple transition-colors font-medium">
                  Matches
                </Link>
                <Link to="/chat" className="text-gray-600 hover:text-skillswap-purple transition-colors font-medium">
                  Messages
                </Link>
                <Link to="/explore" className="text-gray-600 hover:text-skillswap-purple transition-colors font-medium">
                  Explore
                </Link>
              </>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {!user ? (
              <Button 
                onClick={() => navigate('/auth')}
                className="bg-skillswap-purple hover:bg-skillswap-purple-dark"
              >
                Sign In
              </Button>
            ) : (
              <>
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
                
                {/* User Profile Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="p-0 hover:bg-transparent">
                      <div className="flex items-center space-x-2">
                        <div className="hidden sm:block text-right">
                          <p className="text-sm font-medium">{user.user_metadata?.name || user.email}</p>
                          <p className="text-xs text-gray-500">View Profile</p>
                        </div>
                        <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-skillswap-purple/20 hover:border-skillswap-purple transition-colors flex items-center justify-center">
                          <Avatar>
                            <AvatarImage src={user.user_metadata?.avatar_url} alt={user.user_metadata?.name || ""} />
                            <AvatarFallback>{getUserInitials()}</AvatarFallback>
                          </Avatar>
                        </div>
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate('/profile')}>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/matches')}>
                      <Users className="mr-2 h-4 w-4" />
                      <span>Matches</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/chat')}>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      <span>Messages</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && user && (
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
              <Button 
                variant="ghost" 
                className="justify-start px-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                onClick={() => {
                  handleSignOut();
                  setMobileMenuOpen(false);
                }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
