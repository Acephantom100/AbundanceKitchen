import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { UtensilsCrossed, Shirt, GraduationCap, ArrowRight } from "lucide-react";
import foodImage from "@/assets/food-distribution.jpeg";
import clothingImage from "@/assets/clothing-distribution.jpeg";
import educationImage from "@/assets/children-stationery.jpeg";

const pillars = [
  {
    icon: UtensilsCrossed,
    title: "Food",
    subtitle: "Feeding Children of Slums",
    description:
      "We serve simple, nutritious, home-style meals—rice, dal, vegetables, eggs—food that feels like something a mother would cook. Meals are delivered consistently through a trusted volunteer network, turning hunger into hope—one plate at a time.",
    image: foodImage,
    stats: "45 slums and villages served",
  },
  {
    icon: Shirt,
    title: "Clothing",
    subtitle: "Dignity Through Decent Attire",
    description:
      "We collect new and gently used clothes along with school stationery. Every item is carefully sorted, processed, and sanitized to ensure it's clean and dignified. No child should skip school or feel lesser because they lack decent clothing.",
    image: clothingImage,
    stats: "1,000 children equipped",
  },
  {
    icon: GraduationCap,
    title: "Education",
    subtitle: "Walking With the Left Behind",
    description:
      "We focus on average and below-average students from vulnerable backgrounds—the kids who are often overlooked. Through mentoring, guidance, and targeted support, we steer them toward real, sustainable livelihoods with dignity.",
    image: educationImage,
    stats: "Career pathways in 6+ trades",
  },
];

const ThreePillars = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="what-we-do" className="py-24 bg-secondary">
      <div ref={ref} className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-4">
            What We Do
          </p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Three Pillars of Service
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Abundance Kitchen stands firmly on three service lines. They are distinct, 
            but tightly woven—often the same child or family touches all three.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="bg-card rounded-2xl overflow-hidden border border-border shadow-card hover:shadow-hover transition-shadow group"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img 
                  src={pillar.image}
                  alt={pillar.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-foreground/20" />
                <div className="absolute top-4 left-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white shadow-lg">
                    <pillar.icon className="w-6 h-6" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-2xl font-serif font-semibold text-foreground mb-1">
                    {pillar.title}
                  </h3>
                  <p className="text-primary font-medium text-sm">{pillar.subtitle}</p>
                </div>
                
                <p className="text-muted-foreground leading-relaxed">
                  {pillar.description}
                </p>

                <div className="pt-4 border-t border-border flex items-center justify-between">
                  <span className="text-sm font-medium text-primary">{pillar.stats}</span>
                  <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ThreePillars;
