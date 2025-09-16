import { motion } from "framer-motion";

export function InfoSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="max-w-6xl mx-auto px-4 py-12"
    >
      {/* <div className="bg-calculator-bg border border-calculator-border rounded-2xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-card-foreground mb-6">
          How to use our home loan repayment calculator
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <p className="text-card-foreground">
              Our home loan repayment calculator makes it easy to estimate your mortgage repayments. 
              Simply enter your loan details and see instant results for weekly, fortnightly, or monthly payments.
            </p>
            
            <div className="space-y-3">
              <h3 className="font-semibold text-card-foreground">Key features:</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Real-time calculation as you adjust values</li>
                <li>• Principal & Interest or Interest Only options</li>
                <li>• Flexible loan terms from 10 to 30 years</li>
                <li>• Interactive slider for loan amount</li>
                <li>• Multiple payment frequency options</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-accent rounded-lg p-6">
            <h3 className="font-semibold text-accent-foreground mb-3">Example calculation:</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Loan amount:</span>
                <span className="font-medium">$300,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Interest rate:</span>
                <span className="font-medium">5.89% p.a.</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Loan term:</span>
                <span className="font-medium">30 years</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Repayment type:</span>
                <span className="font-medium">Principal & Interest</span>
              </div>
              <hr className="my-3" />
              <div className="flex justify-between font-semibold text-primary">
                <span>Weekly repayment:</span>
                <span>$409.91</span>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </motion.div>
  );
}
