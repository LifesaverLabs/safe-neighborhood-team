import { Clock, Users, Shield, Code, Heart, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: Clock,
    title: "Rapid Response",
    description: "Connect neighbors who can respond in seconds or minutes, not the 8-15 minutes typical for professional EMS."
  },
  {
    icon: Users,
    title: "Community-Powered",
    description: "Anyone can help. From trained responders to neighbors willing to knock on a door or simply be present."
  },
  {
    icon: Shield,
    title: "Capability Matching",
    description: "Intelligent dispatch matches emergencies with neighbors who have specific skills, equipment, or willingness to help."
  },
  {
    icon: Code,
    title: "Open Source",
    description: "MIT licensed code. Transparent, auditable, and freely available for communities worldwide."
  },
  {
    icon: Heart,
    title: "Volunteer-Driven",
    description: "Built by volunteers motivated by civic duty to strengthen community resilience and emergency response."
  },
  {
    icon: AlertCircle,
    title: "Complements 911",
    description: "Coordinates with professional emergency services, not replacing them. For life-threatening emergencies, call 911 first."
  }
];

const Features = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container px-4 mx-auto">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-foreground">
            Modern-Day Minutemen & Minutewomen
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Building a network of neighbors ready to respond at a moment's notice—with skills, equipment, or simply their presence
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="border-border hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mb-4 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
