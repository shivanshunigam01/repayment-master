"use client";

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

export default function LoanCalculator() {
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
    <div className="min-h-screen flex items-center justify-center px-4 bg-white dark:bg-[#141B24]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl bg-white dark:bg-[#141B24] border border-gray-200 dark:border-gray-700 rounded-2xl p-8 shadow-lg"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#0A2A66] dark:text-white mb-2">
            Home Loan Repayment Calculator
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            See your estimated repayments per week/fortnight/month
          </p>
        </div>

        {/* Calculator Form */}
        <div className="grid md:grid-cols-2 gap-8 text-gray-800 dark:text-white">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Repayment Type */}
            <div>
              <Label htmlFor="repayment-type">Repayment type</Label>
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
                  <SelectItem value="interest_only">Interest Only</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Loan Term */}
            <div>
              <Label htmlFor="loan-term">Loan term</Label>
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

            {/* Interest Rate */}
            <div>
              <Label htmlFor="interest-rate">Interest rate</Label>
              <div className="relative mt-1">
                <Input
                  id="interest-rate"
                  type="number"
                  step="0.01"
                  value={interestRate}
                  onChange={(e) =>
                    setInterestRate(parseFloat(e.target.value) || 0)
                  }
                  className="pr-16 bg-white dark:bg-[#1F2937] text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-300">
                  % p.a.
                </span>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Loan Amount */}
            <div>
              <Label htmlFor="loan-amount">Estimated loan amount</Label>
              <div className="relative mt-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-300">
                  $
                </span>
                <Input
                  id="loan-amount"
                  type="text"
                  value={formatLoanAmount(loanAmount)}
                  onChange={(e) => handleLoanAmountChange(e.target.value)}
                  className="pl-8 text-lg font-medium text-gray-800 dark:text-white bg-white dark:bg-[#1F2937] border border-gray-300 dark:border-gray-600 rounded-lg"
                />
              </div>
              <div className="mt-4">
                <Slider
                  value={[loanAmount]}
                  onValueChange={(value) => setLoanAmount(value[0])}
                  max={1000000}
                  min={50000}
                  step={5000}
                />
              </div>
            </div>

            {/* Repayment Result */}
            <div className="space-y-4">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Your estimated repayments would be
              </p>
              <motion.div
                key={repaymentAmount}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="text-4xl font-bold text-[#0A2A66] dark:text-white"
              >
                {formatCurrency(repaymentAmount)}
              </motion.div>

              {/* Frequency Buttons */}
              <div className="flex gap-2">
                {(
                  ["weekly", "fortnightly", "monthly"] as PaymentFrequency[]
                ).map((freq) => (
                  <Button
                    key={freq}
                    variant={paymentFrequency === freq ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPaymentFrequency(freq)}
                    className={`capitalize ${
                      paymentFrequency === freq
                        ? "bg-primary text-white"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-primary hover:text-white"
                    }`}
                  >
                    {freq}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
