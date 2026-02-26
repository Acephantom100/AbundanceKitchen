import { Heart, Mail, MapPin, Phone, HandHeart } from "lucide-react";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer>
      {/* Main Footer */}
      <div className="bg-[#152A45] text-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {/* Brand */}
            <div>
              <div className="mb-4">
                <Logo isScrolled={false} />
              </div>
              <p className="text-white/60 leading-relaxed mb-4 italic">
                Because every forgotten child deserves a fighting chance. 
              </p>
              <p className="text-primary text-sm font-semibold mb-4">
                Section 80G Registered Nonprofit
              </p>
              <p className="text-white/40 text-sm flex items-center gap-2">
                <HandHeart className="w-4 h-4 text-primary" />
                <strong>Food</strong> • <strong>Clothing</strong> • <strong>Education</strong>
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-lg mb-4 text-white">Quick Links</h4>
              <nav className="flex flex-col gap-3">
                <a href="#mission" className="text-white/60 hover:text-primary transition-colors">
                  Our Vision
                </a>
                <a href="#what-we-do" className="text-white/60 hover:text-primary transition-colors">
                  What We Do
                </a>
                <a href="#impact" className="text-white/60 hover:text-primary transition-colors">
                  Impact
                </a>
                <a href="#about" className="text-white/60 hover:text-primary transition-colors">
                  Who We Are
                </a>
                <a href="#donate" className="text-white/60 hover:text-primary transition-colors">
                  Support Us
                </a>
              </nav>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-lg mb-4 text-white">Get In Touch</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div className="text-white/60 text-sm">
                    <p className="mb-1">Chennai, Tamil Nadu</p>
                    <p>India</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <a href="mailto:sfgclemennt@gmail.com" className="text-white/60 hover:text-white transition-colors text-sm">
                    sfgclemennt@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <a href="tel:+919884662222" className="text-white/60 hover:text-white transition-colors text-sm">
                    +91-9884662222
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm">
              © {new Date().getFullYear()} Abundance Kitchen. All rights reserved.
            </p>
            <p className="text-white/40 text-sm flex items-center gap-2">
              Made with <Heart className="w-4 h-4 text-primary fill-primary/30" /> for those who need it most
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
