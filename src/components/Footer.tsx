import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Logo from "./Logo";
export default function Footer() {
  return <footer className="site-footer"><div className="site-container">
    <div className="footer-grid"><div><Logo /><p>Enough to eat.<br />A chance to thrive.</p><span className="text-sm">Food · Clothing · Education</span></div>
    <div><h2>Explore</h2><nav aria-label="Footer navigation"><Link to="/#what-we-do">Our work</Link><Link to="/#about">Our people</Link><Link to="/blog">Community journal</Link><Link to="/#transparency">Transparency</Link></nav></div>
    <div><h2>Talk to the team</h2><p>Chennai, Tamil Nadu, India</p><a className="break-all" href="mailto:alwynjosephp@gmail.com">alwynjosephp@gmail.com <ArrowUpRight size={14} /></a><a href="tel:+919884662222">+91 98846 62222</a><p className="text-sm">Questions before donating? Please reach out.</p></div></div>
    <div className="footer-bottom"><p>© {new Date().getFullYear()} Abundance Kitchen</p><div className="flex gap-6"><Link to="/privacy">Privacy</Link><Link to="/admin/blog">Editor sign in</Link></div></div>
  </div></footer>;
}
