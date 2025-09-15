import { motion } from "framer-motion";

export function ComparisonTable() {
  const comparisonData = [
    { loanAmount: 200000, rate3: 311, rate4: 357, rate5: 407, rate6: 460 },
    { loanAmount: 300000, rate3: 466, rate4: 536, rate5: 610, rate6: 689 },
    { loanAmount: 400000, rate3: 621, rate4: 714, rate5: 814, rate6: 919 },
    { loanAmount: 500000, rate3: 777, rate4: 893, rate5: 1017, rate6: 1149 },
    { loanAmount: 600000, rate3: 932, rate4: 1071, rate5: 1221, rate6: 1379 },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatLoanAmount = (amount: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="max-w-6xl mx-auto px-4 py-12"
    >
      <div className="bg-calculator-bg border border-calculator-border rounded-2xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-card-foreground mb-6">
          How interest rates affect your repayments
        </h2>
        
        <p className="text-muted-foreground mb-6">
          Compare weekly repayments for different loan amounts and interest rates (30-year term, Principal & Interest):
        </p>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-card-foreground">
                  Loan Amount
                </th>
                <th className="text-center py-3 px-4 font-semibold text-card-foreground">
                  3.0% p.a.
                </th>
                <th className="text-center py-3 px-4 font-semibold text-card-foreground">
                  4.0% p.a.
                </th>
                <th className="text-center py-3 px-4 font-semibold text-card-foreground">
                  5.0% p.a.
                </th>
                <th className="text-center py-3 px-4 font-semibold text-card-foreground">
                  6.0% p.a.
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, index) => (
                <motion.tr
                  key={row.loanAmount}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  className="border-b border-border hover:bg-accent/50 transition-colors"
                >
                  <td className="py-3 px-4 font-medium text-card-foreground">
                    {formatLoanAmount(row.loanAmount)}
                  </td>
                  <td className="py-3 px-4 text-center text-muted-foreground">
                    {formatCurrency(row.rate3)}
                  </td>
                  <td className="py-3 px-4 text-center text-muted-foreground">
                    {formatCurrency(row.rate4)}
                  </td>
                  <td className="py-3 px-4 text-center text-muted-foreground">
                    {formatCurrency(row.rate5)}
                  </td>
                  <td className="py-3 px-4 text-center text-muted-foreground">
                    {formatCurrency(row.rate6)}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <p className="text-sm text-muted-foreground mt-4">
          * All calculations are estimates and for illustrative purposes only. Actual repayments may vary.
        </p>
      </div>
    </motion.div>
  );
}