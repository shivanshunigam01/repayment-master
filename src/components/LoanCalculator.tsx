import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

type RepaymentType = "principal_interest" | "interest_only";
type PaymentFrequency = "weekly" | "fortnightly" | "monthly";

export function LoanCalculator() {
  const [repaymentType, setRepaymentType] =
    useState<RepaymentType>("principal_interest");
  const [loanTerm, setLoanTerm] = useState(30);
  const [interestRate, setInterestRate] = useState(5.89);
  const [loanAmount, setLoanAmount] = useState(300000);
  const [paymentFrequency, setPaymentFrequency] =
    useState<PaymentFrequency>("weekly");
  const [repaymentAmount, setRepaymentAmount] = useState(0);

  const calculateRepayment = () => {
    const principal = loanAmount;
    const annualRate = interestRate / 100;
    const years = loanTerm;

    if (repaymentType === "interest_only") {
      const monthlyInterest = (principal * annualRate) / 12;
      const weeklyInterest = (principal * annualRate) / 52;
      const fortnightlyInterest = (principal * annualRate) / 26;

      switch (paymentFrequency) {
        case "weekly":
          setRepaymentAmount(weeklyInterest);
          break;
        case "fortnightly":
          setRepaymentAmount(fortnightlyInterest);
          break;
        case "monthly":
          setRepaymentAmount(monthlyInterest);
          break;
      }
    } else {
      // Principal & Interest calculation
      const monthlyRate = annualRate / 12;
      const numberOfPayments = years * 12;

      const monthlyPayment =
        (principal *
          (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

      switch (paymentFrequency) {
        case "weekly":
          setRepaymentAmount((monthlyPayment * 12) / 52);
          break;
        case "fortnightly":
          setRepaymentAmount((monthlyPayment * 12) / 26);
          break;
        case "monthly":
          setRepaymentAmount(monthlyPayment);
          break;
      }
    }
  };

  useEffect(() => {
    calculateRepayment();
  }, [repaymentType, loanTerm, interestRate, loanAmount, paymentFrequency]);

  const handleLoanAmountChange = (value: string) => {
    const numValue = parseInt(value.replace(/,/g, ""));
    if (!isNaN(numValue)) {
      setLoanAmount(numValue);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-AU", {
      style: "currency",
      currency: "AUD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatLoanAmount = (amount: number) => {
    return new Intl.NumberFormat("en-AU").format(amount);
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            HOME LOAN REPAYMENT CALCULATOR
          </h1>
          {/* <p className="text-lg text-muted-foreground">
            See your estimated repayments per week/fortnight/month
          </p> */}
        </motion.div>

        {/* Main Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
        >
          {/* Calculator Card */}
          <div className="lg:col-span-3 bg-calculator-bg border border-calculator-border rounded-2xl p-8 shadow-lg">
            <h2 className="text-xl font-semibold mb-6 text-card-foreground">
              Home Loan Repayment Calculator
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column - Input Fields */}
              <div className="space-y-6">
                <div>
                  <Label
                    htmlFor="repayment-type"
                    className="text-sm font-medium text-card-foreground"
                  >
                    Repayment type
                  </Label>
                  <Select
                    value={repaymentType}
                    onValueChange={(value: RepaymentType) =>
                      setRepaymentType(value)
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="principal_interest">
                        Principal & Interest
                      </SelectItem>
                      <SelectItem value="interest_only">
                        Interest Only
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label
                    htmlFor="loan-term"
                    className="text-sm font-medium text-card-foreground"
                  >
                    Loan term
                  </Label>
                  <Select
                    value={loanTerm.toString()}
                    onValueChange={(value) => setLoanTerm(parseInt(value))}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10 years</SelectItem>
                      <SelectItem value="15">15 years</SelectItem>
                      <SelectItem value="20">20 years</SelectItem>
                      <SelectItem value="25">25 years</SelectItem>
                      <SelectItem value="30">30 years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label
                    htmlFor="interest-rate"
                    className="text-sm font-medium text-card-foreground"
                  >
                    Interest rate
                  </Label>
                  <div className="relative mt-1">
                    <Input
                      id="interest-rate"
                      type="number"
                      step="0.01"
                      value={interestRate}
                      onChange={(e) =>
                        setInterestRate(parseFloat(e.target.value) || 0)
                      }
                      className="pr-16"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                      % p.a.
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column - Loan Amount & Results */}
              <div className="space-y-6">
                <div>
                  <Label
                    htmlFor="loan-amount"
                    className="text-sm font-medium text-card-foreground"
                  >
                    Estimated loan amount
                  </Label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                      $
                    </span>
                    <Input
                      id="loan-amount"
                      type="text"
                      value={formatLoanAmount(loanAmount)}
                      onChange={(e) => handleLoanAmountChange(e.target.value)}
                      className="pl-8 text-lg font-medium text-primary"
                    />
                  </div>
                  <div className="mt-4">
                    <Slider
                      value={[loanAmount]}
                      onValueChange={(value) => setLoanAmount(value[0])}
                      max={1000000}
                      min={50000}
                      step={5000}
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Your estimated repayments would be
                  </p>
                  <motion.div
                    key={repaymentAmount}
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="text-4xl font-bold text-amount text-purple-700"
                  >
                    {formatCurrency(repaymentAmount)}
                  </motion.div>

                  <div className="flex gap-2">
                    {(
                      ["weekly", "fortnightly", "monthly"] as PaymentFrequency[]
                    ).map((freq) => (
                      <Button
                        key={freq}
                        variant={
                          paymentFrequency === freq ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => setPaymentFrequency(freq)}
                        className={`capitalize ${
                          paymentFrequency === freq
                            ? "bg-button-active text-white"
                            : "bg-button-inactive text-card-foreground hover:bg-button-active hover:text-white"
                        }`}
                      >
                        {freq}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-cta-bg rounded-2xl p-6 text-center shadow-lg"
          >
            <h3 className="text-xl font-bold text-cta-text mb-3">
              Ready for the next step?
            </h3>
            <p className="text-sm text-cta-text/90 mb-6">
              Check your eligibility with 26 lenders online, instantly.
            </p>
            <Button
              className="w-full bg-white text-primary hover:bg-gray-100 font-semibold"
              size="lg"
            >
              Apply now
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
