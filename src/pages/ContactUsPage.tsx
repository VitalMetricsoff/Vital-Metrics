import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Mail } from "lucide-react";

export default function ContactUsPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Open default email client with pre-filled email
    window.location.href = `mailto:doc.aravind.k@gmail.com?subject=VitalMetrics Contact: ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message)}\n\nFrom: ${encodeURIComponent(formData.email)}`;
    
    toast({
      title: "Opening Email Client",
      description: "Your default email client will open with a pre-filled message.",
    });
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="container py-8 md:py-12 max-w-4xl">
      <div className="space-y-12">
        {/* Hero Section with Quote */}
        <div className="relative overflow-hidden rounded-2xl bg-slate-900 px-6 py-12 md:px-12 text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-900/90"></div>
          <div className="relative">
            <blockquote className="mx-auto max-w-2xl text-white">
              <p className="font-serif text-lg md:text-xl italic">
                "The good physician treats the disease; the great physician treats the patient who has the disease."
              </p>
              <footer className="mt-4 text-sm text-slate-400">
                — Sir William Osler
              </footer>
            </blockquote>
          </div>
        </div>

        {/* Contact Section */}
        <div className="grid md:grid-cols-[1.2fr_2px_1fr] gap-8 items-start">
          {/* Founder Info */}
          <div className="space-y-8">
            <div className="flex flex-col items-center text-center">
              <div className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-slate-200 dark:border-slate-800 mb-4">
                <img
                  src={import.meta.env.BASE_URL + 'founder.jpg'}
                  alt="Dr. Aravind Kumar"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="space-y-1">
                <h2 className="text-2xl font-bold">Dr. Aravind Kumar</h2>
                <p className="text-lg text-muted-foreground">Founder of VitalMetrics.in</p>
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-base text-muted-foreground leading-relaxed text-center">
                Thank you for your interest in VitalMetrics. As the founder, I'm committed to providing 
                healthcare professionals with reliable and efficient calculation tools.
              </p>
              <div className="flex items-center justify-center gap-2 text-base">
                <Mail className="h-5 w-5 text-primary" />
                <a 
                  href="mailto:doc.aravind.k@gmail.com"
                  className="text-primary hover:underline font-medium"
                >
                  doc.aravind.k@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden md:block w-[2px] h-full bg-border self-stretch"></div>

          {/* Mission Statement */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Our Commitment</h3>
            <div className="space-y-4">
              <p className="text-base text-muted-foreground leading-relaxed">
                VitalMetrics.in is dedicated to transforming medical calculations through technology. 
                Our platform offers precise, evidence-based tools that streamline clinical workflows 
                and enhance decision-making.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                We continuously update our calculators based on the latest medical research and 
                guidelines, ensuring healthcare professionals have access to reliable tools for 
                optimal patient care.
              </p>
              <div className="pt-4">
                <a 
                  href="/founder"
                  className="text-base text-primary hover:underline inline-flex items-center"
                >
                  Learn more about our mission →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
