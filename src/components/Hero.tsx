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
  const [showNaybor, setShowNaybor] = useState(false);
  const [neighborSeconds, setNeighborSeconds] = useState(30);
  const [proSeconds, setProSeconds] = useState(270);
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));

  const heroScenarios = [
    {
      image: heroEmergency,
      alt: "Collage of emergency situations: CPR, wellness checks, overdose response, active bystander support, AED delivery, and pet rescue",
      title: "Emergency Response",
      subtitle: "CPR • Overdose • Wellness Checks • Crisis Support",
    },
    {
      image: heroConsentWellness,
      alt: "Neighbor conducting supportive wellness check for consent conflict situation",
      title: "Consent Conflict Wellness Check",
      subtitle: "Supporting neighbors in sensitive domestic situations with Safeword™",
    },
    {
      image: heroLostDog,
      alt: "Neighbors working together to safely catch a lost dog",
      title: "Lost Pet Recovery",
      subtitle: "Community search and safe reunification",
    },
    {
      image: heroApartment,
      alt: "Urban apartment neighbors responding to emergency in hallway",
      title: "Apartment Emergency Response",
      subtitle: "Immediate neighbor assistance in residential buildings",
    },
    {
      image: heroWellness,
      alt: "Police officer and neighbor conducting wellness check together",
      title: "Wellness Check Support",
      subtitle: "Checking on neighbors who may need help",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setNeighborSeconds((prev) => {
        if (prev < 90) {
          return prev + 1;
        }
        return prev;
      });

      setProSeconds((prev) => {
        if (prev < 540) {
          // 9 minutes = 540 seconds
          return prev + 1;
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
    return `${mins}:${remainingSecs.toString().padStart(2, "0")}`;
  };

  const formatNeighborTime = (secs: number) => {
    if (secs >= 45) {
      const startTime = formatTime(45);
      const endTime = formatTime(secs);
      return (
        <>
          <span className="text-green-600">{startTime}</span>
          {" - "}
          {endTime}
        </>
      );
    }
    return formatTime(secs);
  };

  const formatProTime = (secs: number) => {
    if (secs > 300) {
      // After 5:00
      const startTime = formatTime(300);
      const endTime = formatTime(secs);
      return `${startTime} - ${endTime}`;
    }
    return formatTime(secs);
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
        <div
          className={`mb-2 transition-colors duration-500 ${neighborSeconds >= 90 ? "text-green-600" : "text-foreground"}`}
        >
          <div className="text-xs font-medium mb-0.5 opacity-90">Neighbor Response Time*</div>
          <div className="text-3xl font-bold tabular-nums tracking-tight">{formatNeighborTime(neighborSeconds)}</div>
        </div>
        <div className="border-t pt-2 mb-2 border-red-200">
          <div className="text-xs font-medium mb-0.5 opacity-90 animate-pulse-red">EMS Avg Response Time</div>
          <div className="text-3xl font-bold tabular-nums tracking-tight animate-pulse-red">
            {formatProTime(proSeconds)}
          </div>
        </div>
        <div className="text-[10px] opacity-70 text-foreground border-t border-border pt-1.5">
          *Ideal conditions at service maturity
        </div>
      </div>

      <div className="container relative z-10 px-4 py-20 mx-auto text-center">
        <h1 className="mb-6 text-5xl font-bold text-primary-foreground md:text-6xl lg:text-7xl">Neighbor 911™</h1>
        <p className="mb-4 text-xl text-primary-foreground/90 md:text-2xl max-w-3xl mx-auto">
          Emergency neighbor first first responders racing to you in under 90 seconds to 3 minutes, not 6 - 10 minutes
        </p>
        <p className="mb-6 sm:mb-8 text-sm sm:text-base lg:text-lg text-primary-foreground/80 max-w-2xl mx-auto px-2">
          A platform connecting neighbors to respond to emergencies faster than traditional services
        </p>

        {/* Response Time Counter - Mobile/Tablet: below text, Large screens: hidden */}
        <div className="lg:hidden mb-6 sm:mb-8 inline-block bg-background/90 backdrop-blur-sm px-3 py-2 sm:px-4 sm:py-3 rounded-lg shadow-lg border-2 border-border animate-fade-in max-w-[90vw]">
          <div
            className={`mb-2 transition-colors duration-500 ${neighborSeconds >= 90 ? "text-green-600" : "text-foreground"}`}
          >
            <div className="text-xs font-medium mb-0.5 opacity-90">Neighbor Response Time*</div>
            <div className="text-3xl font-bold tabular-nums tracking-tight">{formatNeighborTime(neighborSeconds)}</div>
          </div>
          <div className="border-t pt-2 mb-2 border-red-200">
            <div className="text-xs font-medium mb-0.5 opacity-90 animate-pulse-red">Pro Avg Response Time</div>
            <div className="text-3xl font-bold tabular-nums tracking-tight animate-pulse-red">
              {formatProTime(proSeconds)}
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
        </div>
      </div>
    </section>
  );
};

export default Hero;
