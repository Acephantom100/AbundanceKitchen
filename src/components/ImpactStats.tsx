import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Package, Users, Percent } from "lucide-react";

const stats = [
  { 
    icon: MapPin,
    number: "45+", 
    label: "Slums & Villages", 
    description: "Active volunteer network across Tamil Nadu" 
  },
  { 
    icon: Package,
    number: "3,000+", 
    label: "Monthly Grocery Kits", 
    description: "Distributed to families in need" 
  },
  { 
    icon: Users,
    number: "1,000", 
    label: "Children Supported", 
    description: "Equipped for school with supplies" 
  },
  { 
    icon: Percent,
    number: "95%+", 
    label: "Direct Impact", 
    description: "Of every donation reaches beneficiaries" 
  },
];

const ImpactStats = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="impact" className="py-20 bg-secondary">
      <div ref={ref} className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-4">
            Measurable Impact
          </p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Real Numbers. Real Lives Changed.
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Every rupee given is turned into something tangible: a plate of food, a set of clothes, 
            a child who feels seen, and a future nudged closer to stability.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-card border border-border rounded-xl p-6 text-center shadow-card hover:shadow-hover transition-shadow"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4">
                <stat.icon className="w-7 h-7 text-primary" />
              </div>
              <div className="text-4xl md:text-5xl font-serif font-bold text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-foreground font-semibold mb-1">{stat.label}</div>
              <div className="text-sm text-muted-foreground">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;
