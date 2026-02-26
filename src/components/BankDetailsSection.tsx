import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Building2, Copy, Check, Banknote } from "lucide-react";
import { useState } from "react";
import ImagePlaceholder from "./ImagePlaceholder";

const BankDetailsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const bankDetails = {
    bankName: "Equitas Small Finance Bank",
    accountName: "Abundance Kitchen",
    accountNumber: "200002569009",
    ifscCode: "ESFB0001131",
    branch: "KK Nagar",
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const DetailRow = ({ label, value, fieldKey }: { label: string; value: string; fieldKey: string }) => (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-foreground font-medium">{value}</p>
      </div>
      <button
        onClick={() => copyToClipboard(value, fieldKey)}
        className="p-2 hover:bg-secondary rounded-lg transition-colors"
        aria-label={`Copy ${label}`}
      >
        {copiedField === fieldKey ? (
          <Check className="w-4 h-4 text-primary" />
        ) : (
          <Copy className="w-4 h-4 text-muted-foreground" />
        )}
      </button>
    </div>
  );

  return (
    <section id="donate" className="py-24 bg-background">
      <div ref={ref} className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Banknote className="w-4 h-4" />
            Support Our Mission
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Make a Donation
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Your contribution directly reaches those who need it most. 95% of every rupee goes straight to beneficiaries.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-8"
        >
          {/* Bank Transfer */}
          <div className="bg-card rounded-2xl p-6 md:p-8 shadow-card border border-border">
            <h3 className="text-xl font-serif font-bold text-foreground mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-primary" />
              </div>
              Bank Transfer Details
            </h3>
            
            <div className="space-y-1">
              <DetailRow label="Account Name" value={bankDetails.accountName} fieldKey="accountName" />
              <DetailRow label="Account Number" value={bankDetails.accountNumber} fieldKey="accountNumber" />
              <DetailRow label="IFSC Code" value={bankDetails.ifscCode} fieldKey="ifscCode" />
              <DetailRow label="Bank Name" value={bankDetails.bankName} fieldKey="bankName" />
              <DetailRow label="Branch" value={bankDetails.branch} fieldKey="branch" />
            </div>
          </div>

          {/* QR Code & Other Options */}
          <div className="bg-card rounded-2xl p-6 md:p-8 shadow-card border border-border">
            <h3 className="text-xl font-serif font-bold text-foreground mb-6">
              Scan to Donate
            </h3>
            
            {/* QR Code Placeholder */}
            <div className="bg-secondary rounded-xl p-6 text-center mb-6">
              <ImagePlaceholder 
                label="Upload UPI QR Code" 
                aspectRatio="square" 
                className="max-w-[180px] mx-auto"
              />
            </div>

            {/* Contact for large donations */}
            <div className="pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground">
                For large donations or corporate partnerships, please contact us at{" "}
                <a href="mailto:sfgclemennt@gmail.com" className="text-primary hover:underline font-medium">
                  sfgclemennt@gmail.com
                </a>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Trust Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 bg-primary/10 rounded-xl p-5 flex items-start gap-4 border border-primary/20"
        >
          <Banknote className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-foreground mb-1">Committed to Transparency</p>
            <p className="text-muted-foreground text-sm">
              We ensure that 95%+ of every donation goes directly to beneficiaries. Administrative costs 
              are often covered personally by our founders to maximize impact.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BankDetailsSection;
