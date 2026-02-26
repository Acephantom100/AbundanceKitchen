import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import heroChildren from "@/assets/hero-children.jpg";

const HeroSection = () => {
  return (
    <section className="relative">
      {/* Hero with Image Background */}
      <div 
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${heroChildren})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Dark overlay for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/85 via-[#1a1a1a]/80 to-[#0a0a0a]/90" />
        
        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 text-center">
          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/30 rounded-full px-5 py-2.5 mb-8"
          >
            <span className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse" />
            <span className="text-white text-sm font-medium tracking-wide">Serving 45+ communities across Tamil Nadu</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold text-white leading-tight mb-8 drop-shadow-lg"
          >
            Because Every Forgotten Child{" "}
            <span className="text-primary drop-shadow-md">Deserves a Fighting Chance</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed max-w-4xl mx-auto mb-12"
          >
            We walk the lanes of Chennai's slums—standing with daily-wage families, 
            single parents, and the overlooked. Through <strong>food</strong>, <strong>clothing</strong>, 
            and <strong>education</strong>, we quietly lift lives from survival to stability.
          </motion.p>

          {/* Quick Impact Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-8 md:gap-16 mb-12"
          >
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-serif font-bold text-primary">3,000+</p>
              <p className="text-white/70 text-sm mt-1">Monthly Kits Distributed</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-serif font-bold text-primary">1,000</p>
              <p className="text-white/70 text-sm mt-1">Children Equipped</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-serif font-bold text-primary">95%+</p>
              <p className="text-white/70 text-sm mt-1">Direct to Beneficiaries</p>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <a
              href="#donate"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-[hsl(130,18%,38%)] text-white font-semibold rounded-lg transition-colors shadow-lg"
            >
              Support Our Mission
            </a>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-white/50"
          >
            <ChevronDown className="w-10 h-10" />
          </motion.div>
        </motion.div>
      </div>

    </section>
  );
};

export default HeroSection;
