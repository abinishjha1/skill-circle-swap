
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import SkillCard from "@/components/SkillCard";
import { mockSkills, mockUsers, getCurrentUser } from "@/utils/mockData";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const featuredSkills = mockSkills.slice(0, 4);
  const suggestedMatches = mockUsers.slice(1, 4);
  const currentUser = getCurrentUser();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-skillswap-purple-light to-skillswap-purple py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Share Knowledge, <span className="text-skillswap-orange">Grow Together</span>
          </h1>
          <p className="text-white/90 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Exchange skills with others in your community. Teach what you know, learn what you don't.
          </p>
          
          <div className="max-w-md mx-auto relative">
            <Input
              type="text"
              placeholder="What do you want to learn?"
              className="pl-10 py-6 bg-white/95 text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-3 text-gray-400" />
            <Button className="absolute right-1 top-1 bg-skillswap-orange hover:bg-skillswap-orange/90">
              Search
            </Button>
          </div>
        </div>
      </section>
      
      {/* Featured Skills */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-6">Featured Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredSkills.map((skill) => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="bg-white py-12 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">How SkillSwap Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="card-hover">
              <CardContent className="pt-6 text-center">
                <div className="bg-skillswap-purple/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-skillswap-purple">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">List Your Skills</h3>
                <p className="text-gray-600">
                  Share what you can teach and what you want to learn.
                </p>
              </CardContent>
            </Card>
            
            <Card className="card-hover">
              <CardContent className="pt-6 text-center">
                <div className="bg-skillswap-purple/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-skillswap-purple">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Get Matched</h3>
                <p className="text-gray-600">
                  Our system finds people who have complementary skill sets.
                </p>
              </CardContent>
            </Card>
            
            <Card className="card-hover">
              <CardContent className="pt-6 text-center">
                <div className="bg-skillswap-purple/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-skillswap-purple">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Exchange & Learn</h3>
                <p className="text-gray-600">
                  Connect and schedule sessions to exchange knowledge.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Suggested Matches */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-6">Suggested Matches for You</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {suggestedMatches.map((user) => (
              <Card key={user.id} className="card-hover overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <img 
                      src={user.avatar} 
                      alt={user.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold">{user.name}</h3>
                      <p className="text-sm text-gray-500">{user.location}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-sm text-gray-600 mb-1">Offers:</div>
                    <div className="flex flex-wrap gap-2">
                      {user.skillsOffered.map((skill) => (
                        <span key={skill.id} className="skill-badge truncate max-w-[120px]">
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-sm text-gray-600 mb-1">Wants:</div>
                    <div className="flex flex-wrap gap-2">
                      {user.skillsWanted.map((skill) => (
                        <span key={skill.id} className="skill-badge-wanted truncate max-w-[120px]">
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <Button className="w-full mt-2 bg-skillswap-purple hover:bg-skillswap-purple-dark">
                    View Profile <ArrowRight size={16} className="ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
