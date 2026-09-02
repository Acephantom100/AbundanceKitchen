import { useState } from "react";
import { Copy, Mail, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const email = "alwynjosephp@gmail.com";
export default function DonationContactDialog({ purpose = "donation" }: { purpose?: "donation" | "transparency" }) {
  const transparency = purpose === "transparency";
  const subject = encodeURIComponent(`Abundance Kitchen ${purpose} enquiry`);
  const [message, setMessage] = useState("");

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setMessage("Email address copied. Paste it into your email service to contact Alwyn.");
    } catch {
      setMessage("Copy isn’t available in this browser. Select the email address above and copy it manually.");
    }
  }

  return <Dialog onOpenChange={() => setMessage("")}>
    <DialogTrigger asChild>{transparency
      ? <button type="button" className="text-link">Ask the team <ArrowUpRight size={16} aria-hidden="true" /></button>
      : <Button variant="outline" size="lg"><Mail aria-hidden="true" /> Ask about donating <ArrowUpRight aria-hidden="true" /></Button>}
    </DialogTrigger>
    <DialogContent className="donation-contact">
      <DialogHeader className="text-left space-y-3">
        <DialogTitle>{transparency ? "Ask the Abundance Kitchen team" : "Talk to Alwyn about donating"}</DialogTitle>
        <DialogDescription className="text-lg leading-relaxed">{transparency ? "Contact Alwyn about the organization’s registration, documentation, or how donations are used." : "Ask about bank details, receipts, or how your support can help."}</DialogDescription>
      </DialogHeader>
      <div className="contact-email">
        <strong>{email}</strong>
        <Button variant="outline" onClick={copyEmail}><Copy aria-hidden="true" /> Copy email address</Button>
        <p className="contact-note" role="status">{message}</p>
      </div>
      <div className="contact-actions">
        <Button asChild><a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${subject}`} target="_blank" rel="noopener noreferrer">Open Gmail <ArrowUpRight aria-hidden="true" /></a></Button>
        <Button asChild variant="outline"><a href={`mailto:${email}?subject=${subject}`}><Mail aria-hidden="true" /> Open email app</a></Button>
      </div>
      <p className="contact-note">No email app set up? Use Gmail in your browser, or copy the address into any email service. You’ll review and send the message yourself.</p>
    </DialogContent>
  </Dialog>;
}
