
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, ArrowRight, Sparkles, Users, Clock, Star } from "lucide-react";
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
      <section className="relative overflow-hidden py-24 px-4">
        <div className="absolute inset-0 hero-gradient"></div>
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-10 bg-repeat-space"></div>
        
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
            Share Knowledge, <span className="text-skillswap-orange">Grow Together</span>
          </h1>
          <p className="text-white/90 text-lg md:text-xl mb-10 max-w-2xl mx-auto animate-slide-up">
            Exchange skills with others in your community. Teach what you know, learn what you don't.
          </p>
          
          <div className="max-w-md mx-auto relative glass-effect rounded-full p-1 animate-scale-in">
            <Input
              type="text"
              placeholder="What do you want to learn?"
              className="pl-12 py-6 bg-transparent border-0 text-base rounded-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-4 top-4 text-gray-400" />
            <Button className="absolute right-1 top-1 bg-skillswap-orange hover:bg-skillswap-orange/90 rounded-full button-glow">
              Search
            </Button>
          </div>
          
          <div className="flex items-center justify-center gap-8 mt-12 text-white">
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold">500+</div>
              <div className="text-sm text-white/80">Skills Shared</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold">1.2k+</div>
              <div className="text-sm text-white/80">Active Users</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold">5k+</div>
              <div className="text-sm text-white/80">Skills Exchanged</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Skills */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="section-title">Featured Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredSkills.map((skill, index) => (
              <div key={skill.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <SkillCard skill={skill} />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="bg-white py-16 px-4">
        <div className="container mx-auto">
          <h2 className="section-title text-center mx-auto mb-12">How SkillSwap Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="card-hover relative overflow-hidden border-none shadow-lg">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-skillswap-purple to-skillswap-purple-light"></div>
              <CardContent className="pt-6 text-center">
                <div className="bg-skillswap-purple/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                  <Sparkles className="text-skillswap-purple h-7 w-7" />
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-skillswap-orange flex items-center justify-center text-white font-bold text-sm">1</div>
                </div>
                <h3 className="text-xl font-semibold mb-2">List Your Skills</h3>
                <p className="text-gray-600">
                  Share what you can teach and what you want to learn.
                </p>
              </CardContent>
            </Card>
            
            <Card className="card-hover relative overflow-hidden border-none shadow-lg">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-skillswap-purple to-skillswap-purple-light"></div>
              <CardContent className="pt-6 text-center">
                <div className="bg-skillswap-purple/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                  <Users className="text-skillswap-purple h-7 w-7" />
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-skillswap-orange flex items-center justify-center text-white font-bold text-sm">2</div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Get Matched</h3>
                <p className="text-gray-600">
                  Our system finds people who have complementary skill sets.
                </p>
              </CardContent>
            </Card>
            
            <Card className="card-hover relative overflow-hidden border-none shadow-lg">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-skillswap-purple to-skillswap-purple-light"></div>
              <CardContent className="pt-6 text-center">
                <div className="bg-skillswap-purple/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                  <Clock className="text-skillswap-purple h-7 w-7" />
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-skillswap-orange flex items-center justify-center text-white font-bold text-sm">3</div>
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
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="section-title">Suggested Matches for You</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {suggestedMatches.map((user, index) => (
              <Card key={user.id} className="card-hover border-none shadow-lg overflow-hidden animate-fade-in" style={{ animationDelay: `${index * 0.15}s` }}>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-skillswap-orange to-skillswap-orange-light"></div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative">
                      <img 
                        src={user.avatar} 
                        alt={user.name}
                        className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
                      />
                      {user.isPremium && (
                        <div className="absolute -bottom-1 -right-1 bg-skillswap-orange text-white p-0.5 rounded-full">
                          <Star size={10} className="fill-current" />
                        </div>
                      )}
                    </div>
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
                  
                  <Button className="w-full mt-2 bg-gradient-to-r from-skillswap-purple to-skillswap-purple-dark hover:from-skillswap-purple-dark hover:to-skillswap-purple button-glow">
                    View Profile <ArrowRight size={16} className="ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white py-16 px-4">
        <div className="container mx-auto">
          <h2 className="section-title text-center mx-auto mb-12">What Our Users Say</h2>
          
          <div className="flex flex-col md:flex-row gap-6 items-stretch">
            <Card className="card-hover flex-1 shadow-lg border-none overflow-hidden">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="mb-4 text-skillswap-orange">
                  {"★".repeat(5)}
                </div>
                <p className="italic text-gray-600 mb-4 flex-grow">
                  "SkillSwap helped me learn piano while teaching Spanish. The connections I've made are invaluable!"
                </p>
                <div className="flex items-center mt-auto pt-4 border-t border-gray-100">
                  <img 
                    src="/placeholder.svg" 
                    alt="User" 
                    className="w-10 h-10 rounded-full mr-3" 
                  />
                  <div>
                    <div className="font-medium">Sarah L.</div>
                    <div className="text-sm text-gray-500">Language Teacher</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="card-hover flex-1 shadow-lg border-none overflow-hidden">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="mb-4 text-skillswap-orange">
                  {"★".repeat(5)}
                </div>
                <p className="italic text-gray-600 mb-4 flex-grow">
                  "As a developer, I was able to trade coding lessons for graphic design skills. The platform made it seamless."
                </p>
                <div className="flex items-center mt-auto pt-4 border-t border-gray-100">
                  <img 
                    src="/placeholder.svg" 
                    alt="User" 
                    className="w-10 h-10 rounded-full mr-3" 
                  />
                  <div>
                    <div className="font-medium">Marcus T.</div>
                    <div className="text-sm text-gray-500">Software Engineer</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="card-hover flex-1 shadow-lg border-none overflow-hidden">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="mb-4 text-skillswap-orange">
                  {"★".repeat(5)}
                </div>
                <p className="italic text-gray-600 mb-4 flex-grow">
                  "I've been teaching yoga and learning marketing. SkillSwap has opened up new career opportunities for me!"
                </p>
                <div className="flex items-center mt-auto pt-4 border-t border-gray-100">
                  <img 
                    src="/placeholder.svg" 
                    alt="User" 
                    className="w-10 h-10 rounded-full mr-3" 
                  />
                  <div>
                    <div className="font-medium">Jayden K.</div>
                    <div className="text-sm text-gray-500">Yoga Instructor</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 px-4 overflow-hidden">
        <div className="absolute inset-0 hero-gradient opacity-90"></div>
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your Skill Exchange Journey?</h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Join our community today and begin trading your expertise for skills you want to learn.
          </p>
          <Button className="bg-white text-skillswap-purple hover:bg-gray-100 px-8 py-6 text-lg font-medium button-glow">
            Get Started Now
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
