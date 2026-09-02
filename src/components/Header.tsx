import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "./Logo";
const links = [{ href: "/#what-we-do", label: "Our work" }, { href: "/#about", label: "Our people" }, { href: "/blog", label: "Journal" }, { href: "/#transparency", label: "Transparency" }];
export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => { setOpen(false); }, [location]);
  useEffect(() => {
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape" && open) { setOpen(false); menuButton.current?.focus(); } };
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, [open]);
  return <>
    <a href="#main-content" className="skip-link">Skip to content</a>
    <header className="site-header"><nav className="site-container header-inner" aria-label="Main navigation">
      <Logo isScrolled />
      <div className="desktop-nav">{links.map(link => <Link key={link.href} to={link.href} aria-current={location.pathname === "/blog" && link.href === "/blog" ? "page" : undefined}>{link.label}</Link>)}</div>
      <div className="flex items-center gap-2"><Button asChild className="header-donate"><Link to="/#donate">Support us <ArrowUpRight aria-hidden="true" /></Link></Button><Button ref={menuButton} className="mobile-toggle" variant="ghost" size="icon" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button></div>
    </nav>{open && <nav id="mobile-navigation" className="mobile-nav site-container" aria-label="Mobile navigation">{links.map(link => <Link key={link.href} to={link.href} onClick={() => setOpen(false)}>{link.label}</Link>)}</nav>}</header>
  </>;
}
