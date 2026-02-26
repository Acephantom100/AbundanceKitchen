import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ShieldCheck, Heart, Users, TrendingUp } from "lucide-react";

const badges = [
  {
    icon: ShieldCheck,
    title: "Registered Nonprofit",
    description: "We are a section 80G registered nonprofit",
  },
  {
    icon: Heart,
    title: "95%+ Direct Impact",
    description: "Almost every rupee reaches beneficiaries",
  },
  {
    icon: Users,
    title: "Volunteer-Driven",
    description: "Minimal overheads, maximum reach",
  },
  {
    icon: TrendingUp,
    title: "Proven Impact",
    description: "Serving 45+ communities across Tamil Nadu",
  },
];

const TrustBadges = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="py-10 bg-card border-y border-border">
      <div ref={ref} className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {badges.map((badge, index) => (
            <motion.div
              key={badge.title}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex flex-col items-center text-center p-4 rounded-xl bg-secondary hover:bg-background transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <badge.icon className="w-6 h-6 text-primary" />
              </div>
              <p className="text-foreground font-semibold text-sm mb-1">{badge.title}</p>
              <p className="text-muted-foreground text-xs">{badge.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
