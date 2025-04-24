import { Helmet } from 'react-helmet-async';

export default function PrivacyPolicyPage() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | VitalMetrics</title>
        <meta name="description" content="Learn about how VitalMetrics protects your privacy and handles your data. Read our comprehensive privacy policy." />
      </Helmet>
      <div className="container py-8 md:py-12 max-w-4xl">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tighter md:text-4xl">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: April 18, 2025</p>
          
          <section className="mt-8 space-y-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Information We Collect</h2>
              <p className="text-muted-foreground">
                We collect information that you provide directly to us when using our health calculators. This includes:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Health metrics and measurements you input into our calculators</li>
                <li>Device information and usage statistics</li>
                <li>Information you provide when contacting us</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">How We Use Your Information</h2>
              <p className="text-muted-foreground">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Provide and improve our health calculation services</li>
                <li>Respond to your comments and questions</li>
                <li>Send you related information and updates</li>
                <li>Monitor and analyze usage patterns</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Data Security</h2>
              <p className="text-muted-foreground">
                We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions about our Privacy Policy, please contact us through our contact page.
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
