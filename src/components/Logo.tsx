import { Link } from "react-router-dom";
import logoImage from "@/assets/logo-refined.png";
interface LogoProps { className?: string; isScrolled?: boolean }
export default function Logo({ className = "", isScrolled = false }: LogoProps) {
  return <Link to="/" className={`brand ${isScrolled ? "brand-dark" : "brand-light"} ${className}`} aria-label="Abundance Kitchen home"><img src={logoImage} alt="" width="56" height="56" decoding="async" /><span>Abundance<br /><span className="brand-second">Kitchen</span></span></Link>;
}
