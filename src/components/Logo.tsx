import logoImage from "@/assets/logo.jpg";

interface LogoProps {
  className?: string;
  isScrolled?: boolean;
}

const Logo = ({ className = "", isScrolled = false }: LogoProps) => {
  return (
    <a href="#" className={`flex items-center gap-3 ${className}`}>
      <img
        src={logoImage}
        alt="Abundance Kitchen Logo"
        className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
      />
      <span className={`text-xl md:text-2xl font-serif font-semibold transition-colors ${
        isScrolled ? "text-foreground" : "text-white"
      }`}>
        Abundance <span className="text-primary">Kitchen</span>
      </span>
    </a>
  );
};

export default Logo;
