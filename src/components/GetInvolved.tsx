import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Code, Palette, Users, Briefcase, Heart, DollarSign, GraduationCap, Lightbulb } from "lucide-react";

const roles = [
  { value: "engineering", label: "Engineering", icon: Code },
  { value: "design", label: "Design", icon: Palette },
  { value: "volunteering", label: "Volunteering", icon: Heart },
  { value: "product", label: "Product Management", icon: Briefcase },
  { value: "partnership", label: "Partnership", icon: Users },
  { value: "advising", label: "Advising", icon: GraduationCap },
  { value: "funding", label: "Funding", icon: DollarSign },
  { value: "other", label: "Other", icon: Lightbulb }
];

const GetInvolved = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.role) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Determine the API endpoint based on environment
      const apiUrl = import.meta.env.VITE_CLOUD_FUNCTION_URL || 
        (import.meta.env.DEV 
          ? 'http://localhost:8081' // Local Functions Framework for development
          : 'https://us-central1-neighbor911usa-landing-page.cloudfunctions.net/submitInterest');

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        toast({
          title: "Thank you for your interest!",
          description: result.message || "We'll be in touch soon to discuss how you can contribute to Neighbor 911.",
        });

        // Reset form
        setFormData({ name: "", email: "", role: "", message: "" });
      } else {
        toast({
          title: "Submission failed",
          description: result.error || "Please try again later.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Network error",
        description: "Unable to submit form. Please check your connection and try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="get-involved" className="py-20 bg-muted/50">
      <div className="container px-4 mx-auto">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-foreground">
            Help Build Neighbor 911™
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            This is an open source project built by volunteers. We need help from people with diverse skills and backgrounds.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 max-w-5xl mx-auto">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-foreground">Ways to Contribute</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {roles.map((role) => {
                const Icon = role.icon;
                return (
                  <Card key={role.value} className="border-border">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <CardTitle className="text-lg">{role.label}</CardTitle>
                      </div>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>

            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle>Current Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>• <strong>Volunteer-based:</strong> All contributions are currently unpaid</p>
                <p>• <strong>Seeking funding:</strong> We're actively looking for financial support</p>
                <p>• <strong>Open source:</strong> MIT licensed code, trademark protected brand</p>
                <p>• <strong>Public Benefit Corp:</strong> Organized to serve community needs</p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-border">
            <CardHeader>
              <CardTitle>Express Your Interest</CardTitle>
              <CardDescription>
                Let us know how you'd like to contribute to this project
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">How would you like to help? *</Label>
                  <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role.value} value={role.value}>
                          {role.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message (Optional)</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your experience and how you'd like to contribute..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default GetInvolved;
