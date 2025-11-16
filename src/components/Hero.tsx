import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import heroEmergency from "@/assets/hero-emergency-collage.jpg";
import heroConsentWellness from "@/assets/hero-consent-wellness.jpg";
import heroLostDog from "@/assets/hero-lost-dog.jpg";
import heroApartment from "@/assets/hero-apartment-emergency.jpg";
import heroWellness from "@/assets/hero-wellness-check.jpg";
import { useEffect, useState, useRef } from "react";

const Hero = () => {
  const [neighborSeconds, setNeighborSeconds] = useState(0);
  const [emsSeconds, setEmsSeconds] = useState(0);
  const [showNaybor, setShowNaybor] = useState(false);
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));

  const heroScenarios = [
    {
      image: heroEmergency,
      alt: "Collage of emergency situations: CPR, wellness checks, overdose response, active bystander support, AED delivery, and pet rescue",
      title: "Emergency Response",
      subtitle: "CPR • Overdose • Wellness Checks • Crisis Support"
    },
    {
      image: heroConsentWellness,
      alt: "Naybor conducting supportive wellness check for consent conflict situation",
      title: "Consent Conflict Wellness Check",
      subtitle: "Supporting naybors in sensitive domestic situations with Safeword™"
    },
    {
      image: heroLostDog,
      alt: "Naybors working together to safely catch a lost dog",
      title: "Lost Pet Recovery",
      subtitle: "Community search and safe reunification"
    },
    {
      image: heroApartment,
      alt: "Urban apartment naybors responding to emergency in hallway",
      title: "Apartment Emergency Response",
      subtitle: "Immediate naybor assistance in residential buildings"
    },
    {
      image: heroWellness,
      alt: "Police officer and naybor conducting wellness check together",
      title: "Wellness Check Support",
      subtitle: "Checking on naybors who may need help"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setNeighborSeconds((prev) => {
        if (prev < 90) {
          return prev + 1;
        }
        return prev;
      });
      
      setEmsSeconds((prev) => {
        if (prev < 540) { // 9 minutes = 540 seconds
          return prev + 1;
        }
        // Reset both when EMS reaches 540
        if (prev >= 540) {
          setNeighborSeconds(0);
          return 0;
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const titleTimer = setInterval(() => {
      setShowNaybor((prev) => !prev);
    }, 2000);

    return () => clearInterval(titleTimer);
  }, []);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  const scrollToGetInvolved = () => {
    document.getElementById("get-involved")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[500px] sm:min-h-[600px] lg:min-h-[700px] flex items-center justify-center overflow-hidden">
      <Carousel 
        plugins={[plugin.current]}
        className="w-full h-full absolute inset-0"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {heroScenarios.map((scenario, index) => (
            <CarouselItem key={index}>
              <div className="relative min-h-[500px] sm:min-h-[600px] lg:min-h-[700px] flex items-center justify-center">
                <img 
                  src={scenario.image} 
                  alt={scenario.alt}
                  className="w-full h-full object-cover absolute inset-0 bg-black"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
                <div className="hidden md:block absolute top-4 left-4 lg:top-8 lg:left-8 z-10 text-left">
                  <h2 className="text-xl lg:text-3xl xl:text-4xl font-bold text-primary-foreground mb-1 lg:mb-2">
                    {scenario.title}
                  </h2>
                  <p className="text-sm lg:text-base xl:text-lg text-primary-foreground/80 max-w-xs lg:max-w-md">
                    {scenario.subtitle}
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2 sm:left-4 z-20" />
        <CarouselNext className="right-2 sm:right-4 z-20" />
      </Carousel>
      
      {/* Response Time Counter - Large screens: top-right absolute, Mobile/Tablet: hidden */}
      <div className="hidden lg:block absolute top-4 right-4 xl:top-8 xl:right-8 z-20 bg-background/90 backdrop-blur-sm px-3 py-2 xl:px-4 xl:py-3 rounded-lg shadow-lg border-2 border-border animate-fade-in">
        <div className={`mb-2 transition-colors duration-500 ${neighborSeconds >= 90 ? 'text-green-600' : 'text-foreground'}`}>
          <div className="text-xs font-medium mb-0.5 opacity-90">Naybor Response Time*</div>
          <div className="text-2xl xl:text-3xl font-bold tabular-nums tracking-tight">
            {formatTime(neighborSeconds)}
          </div>
        </div>
        <div className={`border-t pt-2 mb-2 transition-colors duration-500 ${emsSeconds > 90 ? 'text-red-600 border-red-200' : 'text-foreground border-border'}`}>
          <div className="text-xs font-medium mb-0.5 opacity-90">EMS Avg Response Time</div>
          <div className="text-2xl xl:text-3xl font-bold tabular-nums tracking-tight">
            {formatTime(emsSeconds)}
          </div>
        </div>
        <div className="text-[10px] opacity-70 text-foreground border-t border-border pt-1.5">
          *Ideal conditions at service maturity
        </div>
      </div>

      <div className="container relative z-10 px-4 py-12 sm:py-16 lg:py-20 mx-auto text-center">
        <h1 className="mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary-foreground">
          {showNaybor ? "Naybor 911™" : "Neighbor 911™"}
        </h1>
        <p className="mb-4 text-xl text-primary-foreground/90 md:text-2xl max-w-3xl mx-auto">
          Emergency neighbor first first responders racing to you in density⁵ under 90 seconds to 3 minutes, not 6 - 10 minutes
        </p>
        <p className="mb-6 sm:mb-8 text-sm sm:text-base lg:text-lg text-primary-foreground/80 max-w-2xl mx-auto px-2">
          An open source platform connecting naybors to respond to emergencies faster than traditional services
        </p>
        
        {/* Response Time Counter - Mobile/Tablet: below text, Large screens: hidden */}
        <div className="lg:hidden mb-6 sm:mb-8 inline-block bg-background/90 backdrop-blur-sm px-3 py-2 sm:px-4 sm:py-3 rounded-lg shadow-lg border-2 border-border animate-fade-in max-w-[90vw]">
          <div className={`mb-2 transition-colors duration-500 ${neighborSeconds >= 90 ? 'text-green-600' : 'text-foreground'}`}>
            <div className="text-xs font-medium mb-0.5 opacity-90">Naybor Response Time*</div>
            <div className="text-2xl sm:text-3xl font-bold tabular-nums tracking-tight">
              {formatTime(neighborSeconds)}
            </div>
          </div>
          <div className={`border-t pt-2 mb-2 transition-colors duration-500 ${emsSeconds > 90 ? 'text-red-600 border-red-200' : 'text-foreground border-border'}`}>
            <div className="text-xs font-medium mb-0.5 opacity-90">EMS Avg Response Time</div>
            <div className="text-2xl sm:text-3xl font-bold tabular-nums tracking-tight">
              {formatTime(emsSeconds)}
            </div>
          </div>
          <div className="text-[10px] opacity-70 text-foreground border-t border-border pt-1.5">
            *Ideal conditions at service maturity
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row justify-center px-2">
          <Button 
            size="lg" 
            variant="secondary"
            onClick={scrollToGetInvolved}
            className="text-base sm:text-lg w-full sm:w-auto"
          >
            Get Involved
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="text-base sm:text-lg w-full sm:w-auto bg-secondary md:bg-background/30 md:backdrop-blur-sm border-primary-foreground/50 text-primary-foreground hover:bg-secondary/90 md:hover:bg-background/40"
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
