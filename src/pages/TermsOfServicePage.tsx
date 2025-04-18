
export default function TermsOfServicePage() {
  return (
    <div className="container py-8 md:py-12 max-w-4xl">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tighter md:text-4xl">Terms of Service</h1>
        <p className="text-muted-foreground">Last updated: April 18, 2025</p>
        
        <section className="mt-8 space-y-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">1. Terms</h2>
            <p className="text-muted-foreground">
              By accessing our website, you agree to be bound by these terms of service and comply with all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">2. Disclaimer</h2>
            <p className="text-muted-foreground">
              The calculators and information provided on this website are for general information purposes only. They should not be relied upon or used as the sole basis for making decisions without consulting primary, more accurate, more complete, or more timely sources of information.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">3. Limitations</h2>
            <p className="text-muted-foreground">
              We shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your access to, or use of, the site. You expressly agree that your use of the site is at your sole risk.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">4. Medical Disclaimer</h2>
            <p className="text-muted-foreground">
              The health calculators and information on this website are not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
