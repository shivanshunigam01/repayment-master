import { LoanCalculator } from "@/components/LoanCalculator";
import { InfoSection } from "@/components/InfoSection";
import { ComparisonTable } from "@/components/ComparisonTable";
import { ThemeToggle } from "@/components/ThemeToggle";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <ThemeToggle />
      <LoanCalculator />
      <InfoSection />
      <ComparisonTable />
    </div>
  );
};

export default Index;
