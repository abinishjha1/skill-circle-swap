
import { Button } from "@/components/ui/button";

const CtaSection = () => {
  return (
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
  );
};

export default CtaSection;
