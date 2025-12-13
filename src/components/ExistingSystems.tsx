import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, CheckCircle2, Globe, Heart } from "lucide-react";

const ExistingSystems = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="container px-4 mx-auto">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-foreground">
              Good Neighbor First-Responder Systems Already Work
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Don't wait for Naybor SOS™ to launch. These proven systems are operational <strong>right now</strong> in select regions,
              dispatching trained neighbors to cardiac arrests alongside emergency services. They demonstrate that community
              first-response works and saves lives.
            </p>
          </div>

          {/* PulsePoint Card */}
          <Card className="mb-6 border-2 border-primary/20 hover:border-primary/40 transition-all">
            <CardHeader>
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <CardTitle className="text-2xl mb-2 flex items-center gap-2">
                    <Heart className="w-6 h-6 text-red-500" />
                    PulsePoint
                  </CardTitle>
                  <CardDescription className="text-base flex items-center gap-2 flex-wrap">
                    <Globe className="w-4 h-4" />
                    <span className="font-semibold">Coverage:</span> United States, Canada, and expanding internationally
                  </CardDescription>
                </div>
                <Button asChild variant="default" size="lg">
                  <a href="https://www.pulsepoint.org/" target="_blank" rel="noopener noreferrer" className="gap-2">
                    Visit PulsePoint
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                PulsePoint is a <strong>proven, operational system</strong> that alerts CPR-trained citizens to nearby cardiac
                emergencies happening in public spaces. When someone suffers sudden cardiac arrest, every second counts—and
                PulsePoint notifies nearby trained responders who can start CPR and use AEDs before ambulances arrive.
              </p>

              <div className="grid md:grid-cols-2 gap-4 pt-2">
                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">Real-Time Cardiac Arrest Alerts</p>
                    <p className="text-sm text-muted-foreground">Dispatches trained neighbors to public cardiac emergencies</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">Works with 911/EMS</p>
                    <p className="text-sm text-muted-foreground">Integrated directly with emergency dispatch centers</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">AED Locator Map</p>
                    <p className="text-sm text-muted-foreground">Crowdsourced registry of public AED locations</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">Proven Life-Saving Impact</p>
                    <p className="text-sm text-muted-foreground">Thousands of cardiac arrests attended by citizen responders</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground italic mb-4">
                  <strong>🏆 PulsePoint demonstrates the Naybor SOS™ thesis:</strong> Trained neighbors can respond to emergencies
                  faster than traditional EMS and save lives. If your region has PulsePoint, download it today.
                </p>
                <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                  <p className="text-sm font-semibold text-foreground mb-2">
                    🤝 Open Partnership Proposal
                  </p>
                  <p className="text-sm text-muted-foreground mb-3">
                    We believe PulsePoint and Naybor SOS™ could work together to expand community first-response beyond cardiac arrest.
                  </p>
                  <Button asChild variant="outline" size="sm" className="w-full sm:w-auto">
                    <a
                      href="https://docs.google.com/document/d/149mQrWS_XVK1WBnAvvsgzM7JdGM31qONQogMvKitpJY/edit?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="gap-2"
                    >
                      Read Partnership Proposal: PulsePoint Foundation × Lifesaver Labs
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* GoodSAM Card */}
          <Card className="mb-8 border-2 border-primary/20 hover:border-primary/40 transition-all">
            <CardHeader>
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <CardTitle className="text-2xl mb-2 flex items-center gap-2">
                    <Heart className="w-6 h-6 text-red-500" />
                    GoodSAM
                  </CardTitle>
                  <CardDescription className="text-base flex items-center gap-2 flex-wrap">
                    <Globe className="w-4 h-4" />
                    <span className="font-semibold">Coverage:</span> United Kingdom, Europe, and expanding globally
                  </CardDescription>
                </div>
                <Button asChild variant="default" size="lg">
                  <a href="https://www.goodsamapp.org/ukAndEu" target="_blank" rel="noopener noreferrer" className="gap-2">
                    Visit GoodSAM
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                GoodSAM (Smartphone Activated Medics) is a <strong>fully operational system</strong> used by emergency services
                across the UK and Europe to alert nearby medical professionals and trained volunteers to cardiac arrests and
                other medical emergencies. It's integrated into national emergency response infrastructure.
              </p>

              <div className="grid md:grid-cols-2 gap-4 pt-2">
                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">Emergency Responder Network</p>
                    <p className="text-sm text-muted-foreground">Alerts off-duty medical professionals and trained volunteers</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">NHS & Emergency Services</p>
                    <p className="text-sm text-muted-foreground">Officially integrated with UK ambulance services</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">Multiple Emergency Types</p>
                    <p className="text-sm text-muted-foreground">Cardiac arrest, choking, and other life-threatening situations</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">Global Expansion</p>
                    <p className="text-sm text-muted-foreground">Active in multiple countries with government partnerships</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground italic">
                  <strong>🏆 GoodSAM proves community response scales:</strong> Government-integrated neighbor response
                  systems can work at national levels. If you're in the UK or Europe, sign up to help your neighbors.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <Card className="bg-primary/5 border-primary/30">
            <CardContent className="pt-6">
              <div className="text-center max-w-3xl mx-auto">
                <h3 className="text-2xl font-bold mb-4 text-foreground">
                  Every Region Deserves This—And More
                </h3>
                <p className="text-muted-foreground mb-6">
                  PulsePoint and GoodSAM demonstrate that neighbor first-response works for cardiac arrest.
                  But <strong>Naybor SOS™ envisions something broader</strong>: a system that handles not just cardiac
                  emergencies, but wellness checks, overdose response, lost pets, domestic support, mental health crises,
                  and more—connecting <em>any neighbor</em> who can help, not just medical professionals.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    variant="default"
                    onClick={() => document.getElementById("get-involved")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    Join the Naybor SOS™ Movement
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    asChild
                  >
                    <a href="https://github.com/LifesaverLabs/NayborSOS" target="_blank" rel="noopener noreferrer" className="gap-2">
                      View Our Vision on GitHub
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ExistingSystems;
