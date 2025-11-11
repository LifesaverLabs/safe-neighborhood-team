import Hero from "@/components/Hero";
import Features from "@/components/Features";
import GetInvolved from "@/components/GetInvolved";
import About from "@/components/About";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <Features />
      <About />
      <GetInvolved />
      <Footer />
    </div>
  );
};

export default Index;
