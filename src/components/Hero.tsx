import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-emergency-response.jpg";
import { useEffect, useState } from "react";

const Hero = () => {
  const [seconds, setSeconds] = useState(90);

  useEffect(() => {
    if (seconds <= 0) return;
    
    const timer = setInterval(() => {
      setSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  const scrollToGetInvolved = () => {
    document.getElementById("get-involved")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Neighbors responding to emergency - one knocking urgently on door, another administering CPR" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
      </div>
      
      {/* Countdown Timer */}
      <div className="absolute top-8 right-8 z-20 bg-primary text-primary-foreground px-6 py-4 rounded-lg shadow-lg border-2 border-primary-foreground/20 animate-fade-in">
        <div className="text-sm font-medium mb-1 opacity-90">Response Time</div>
        <div className="text-5xl font-bold tabular-nums tracking-tight">
          {formatTime(seconds)}
        </div>
      </div>

      <div className="container relative z-10 px-4 py-20 mx-auto text-center">
        <h1 className="mb-6 text-5xl font-bold text-primary-foreground md:text-6xl lg:text-7xl">
          Neighbor 911™
        </h1>
        <p className="mb-4 text-xl text-primary-foreground/90 md:text-2xl max-w-3xl mx-auto">
          Community-based emergency response in minutes, not hours
        </p>
        <p className="mb-8 text-lg text-primary-foreground/80 max-w-2xl mx-auto">
          An open source platform connecting neighbors to respond to emergencies faster than traditional services
        </p>
        <div className="flex flex-col gap-4 sm:flex-row justify-center">
          <Button 
            size="lg" 
            variant="secondary"
            onClick={scrollToGetInvolved}
            className="text-lg"
          >
            Get Involved
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="text-lg bg-background/10 border-primary-foreground/30 text-primary-foreground hover:bg-background/20"
            asChild
          >
            <a href="https://github.com/LifesaverLabs/Neighbor911" target="_blank" rel="noopener noreferrer">
              View on GitHub
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
