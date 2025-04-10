
import { Card, CardContent } from "@/components/ui/card";

const Testimonials = () => {
  return (
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
  );
};

export default Testimonials;
