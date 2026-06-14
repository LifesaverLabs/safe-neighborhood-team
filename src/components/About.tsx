import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, ExternalLink } from "lucide-react";

const About = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container px-4 mx-auto">
        <div className="max-w-4xl mx-auto">
          <h2 className="mb-8 text-4xl font-bold text-center text-foreground">
            About the Project
          </h2>
          
          <div className="space-y-6 mb-12">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  The Vision
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p className="mb-4">
                  Average EMS response time is 8-15 minutes. For cardiac arrest, drowning, or overdose, survival windows are often 3-5 minutes. Neighbor 911™ creates a network of "Minute Responders"—neighbors ready to help before professional responders arrive.
                </p>
                <p>
                  Everyone can be a hero. You don't need special training to save a life. Sometimes the most powerful intervention is simply showing up—knocking on a door for a wellness check, being an active bystander, or staying with someone until help arrives.
                </p>
              </CardContent>
            </Card>




            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  Organized by Lifesaver Labs PBC
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p className="mb-4">
                  Neighbor 911™ is organized by <strong>Lifesaver Labs Public Benefit Corporation</strong>, a legal structure that allows us to pursue both profit and public benefit while maintaining accountability to our social mission.
                </p>
                <p>
                  We are currently seeking funding through contributions, grants, seed funding, and partnerships.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row justify-center">
            <a
              href="mailto:team@lifesaverlabs.org"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-medium text-primary-foreground bg-primary rounded-lg hover:opacity-90 transition-opacity"
            >
              Contact the Team
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
