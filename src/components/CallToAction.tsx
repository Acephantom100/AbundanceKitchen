import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Heart, Mail, Phone, ArrowRight, Users } from "lucide-react";
import communityHelp from "@/assets/community-help.jpeg";

const CallToAction = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section 
      className="py-24 relative overflow-hidden"
      style={{
        backgroundImage: `url(${communityHelp})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#1F1F1F]/90" />

      <div ref={ref} className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm mb-6">
            <Heart className="w-8 h-8 text-primary" />
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-6">
            One Plate. One Uniform.{" "}
            <span className="text-primary">One Child's Future.</span>
          </h2>
          
          <p className="text-xl text-white/80 leading-relaxed mb-4 max-w-2xl mx-auto">
            Partner with us to transform lives. Every contribution—no matter the size—creates 
            ripples of change across communities.
          </p>

          <p className="text-white/60 mb-10">
            <strong className="text-primary">95%+ of every donation</strong> goes directly to those we serve.
          </p>
        </motion.div>

        {/* Donation Options */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-10"
        >
          <a
            href="#donate"
            className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary hover:bg-[hsl(130,18%,38%)] text-white font-semibold rounded-xl shadow-lg transition-all hover:scale-105"
          >
            <Heart className="w-5 h-5" />
            Donate Now
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="mailto:alwynjosephp@gmail.com?subject=Partnership Inquiry"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-foreground transition-colors"
          >
            <Users className="w-5 h-5" />
            Partner With Us
          </a>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-8 pt-8 border-t border-white/20"
        >
          <a href="mailto:alwynjosephp@gmail.com" className="flex items-center gap-2 text-white/70 hover:text-primary transition-colors">
            <Mail className="w-4 h-4" />
            alwynjosephp@gmail.com
          </a>
          <a href="tel:+919884662222" className="flex items-center gap-2 text-white/70 hover:text-primary transition-colors">
            <Phone className="w-4 h-4" />
            +91-9884662222
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
