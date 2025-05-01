import { SymptomChecker } from "@/components/symptom-checker/symptom-checker";

export default function SymptomCheckerPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="flex flex-col items-center space-y-4 text-center mb-10">
        <h1 className="font-heading text-3xl md:text-4xl font-bold tracking-tight">
          Symptom Checker
        </h1>
        <p className="text-muted-foreground text-lg max-w-[700px]">
          Get insights about your symptoms and potential conditions. Quick, confidential, and easy to use.
        </p>
      </div>
      <div className="max-w-4xl mx-auto">
        <SymptomChecker />
      </div>
    </div>
  );
}
