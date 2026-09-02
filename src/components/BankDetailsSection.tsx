import { useState } from "react";
import { Check, Copy, ArrowUpRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
const details = [["Account name", "Abundance Kitchen"], ["Account number", "200002569009"], ["IFSC", "ESFB0001131"], ["Bank", "Equitas Small Finance Bank"], ["Branch", "KK Nagar"]];
export default function BankDetailsSection() {
  const [copied, setCopied] = useState("");
  const [message, setMessage] = useState("");
  async function copy(label: string, value: string) {
    try { await navigator.clipboard.writeText(value); setCopied(label); setMessage(`${label} copied.`); }
    catch { setMessage("Copy wasn’t available. Please select and copy the details manually."); }
  }
  return <section id="donate" className="donate-section site-section"><div className="site-container donate-layout">
    <div><h2>A small act.<br />A meaningful difference.</h2><p className="text-lg mt-6 leading-relaxed">Help support meals, clothing, and opportunities to learn. You can contribute by bank transfer or speak with the team about volunteering and partnerships.</p><div className="donate-guidance"><h3>Before you transfer</h3><p>Confirm these account details directly with the team and check the beneficiary name in your banking app.</p><p>For a receipt or questions about documentation, contact the team. Never share a banking password or one-time code.</p></div><Button asChild variant="outline" size="lg"><a href="mailto:alwynjosephp@gmail.com?subject=Abundance%20Kitchen%20donation%20enquiry"><Mail aria-hidden="true" /> Ask about donating <ArrowUpRight aria-hidden="true" /></a></Button></div>
    <div className="bank-card"><div className="bank-card-heading"><span className="eyebrow">Direct bank transfer</span><h3>Abundance Kitchen</h3><p>Details provided on the organization’s existing website.</p></div><dl>{details.map(([label, value]) => <div className="bank-row" key={label}><div><dt>{label}</dt><dd>{value}</dd></div><Button variant="ghost" size="icon" onClick={() => copy(label, value)} aria-label={`Copy ${label.toLowerCase()}`}>{copied === label ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}</Button></div>)}</dl><p className="text-base min-h-6 mt-3" role="status">{message}</p><p className="bank-note">Bank transfers happen through your bank. This website does not collect card or banking credentials.</p></div>
  </div></section>;
}
