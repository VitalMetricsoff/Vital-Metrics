import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Mail } from "lucide-react";
import { Helmet } from 'react-helmet-async';

export default function ContactUsPage() {
  const { toast } = useToast();

  return (
    <>
      <Helmet>
        <title>Contact Us | VitalMetrics Support</title>
        <meta name="description" content="Get in touch with the VitalMetrics team. Contact us for support, feedback, or any questions about our medical calculators." />
      </Helmet>
      <div className="container py-8 md:py-12 max-w-4xl">
        <div className="space-y-12">
          {/* Hero Section with Quote */}
          <div className="relative overflow-hidden rounded-2xl bg-slate-900 px-6 py-12 md:px-12 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-900/90"></div>
            <div className="relative">
              <h1 className="text-3xl font-bold text-white mb-6">Contact Us</h1>
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
          <div className="flex flex-col md:flex-row gap-8">
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
              <h2 className="text-2xl font-semibold">Our Mission</h2>
              <p className="text-muted-foreground">
                At VitalMetrics, we're dedicated to empowering healthcare professionals with accurate, 
                evidence-based calculation tools. Our goal is to make medical calculations more accessible 
                and efficient, ultimately improving patient care.
              </p>
              <div className="space-y-4">
                <h3 className="font-medium">Get in Touch</h3>
                <p className="text-sm text-muted-foreground">
                  Whether you have questions about our calculators, suggestions for improvements, or 
                  would like to collaborate, we'd love to hear from you.
                </p>
                <div className="flex flex-col gap-2">
                  <Button variant="outline" asChild>
                    <a href="mailto:doc.aravind.k@gmail.com">
                      Send us an Email
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/about">
                      Learn More About Us
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
