
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Users, Clock } from "lucide-react";

const HowItWorks = () => {
  return (
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
  );
};

export default HowItWorks;
