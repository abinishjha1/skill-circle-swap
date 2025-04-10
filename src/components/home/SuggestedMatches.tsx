
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User } from "@/types";

interface SuggestedMatchesProps {
  users: User[];
}

const SuggestedMatches = ({ users }: SuggestedMatchesProps) => {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="section-title">Suggested Matches for You</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {users.map((user, index) => (
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
  );
};

export default SuggestedMatches;
