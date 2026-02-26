import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Heart, Target, Sparkles } from "lucide-react";

const MissionSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="mission" className="py-24 bg-background">
      <div ref={ref} className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4" />
            Our Purpose
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
            Driven by Compassion, Guided by Purpose
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="bg-card rounded-3xl p-8 md:p-10 shadow-card border border-border"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Heart className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-foreground">Our Mission</h3>
            </div>
            
            <p className="text-muted-foreground leading-relaxed text-lg mb-6">
              To stand by the children and families the world forgets—feeding the hungry, 
              clothing them with dignity, and walking with "average" and left-behind students 
              until they build a stable, hopeful life.
            </p>
            
            <div className="bg-secondary rounded-xl p-5 border-l-4 border-primary">
              <p className="text-foreground font-medium text-lg italic">
                "We exist so that no child's future is decided by an empty plate, 
                a torn shirt, or an unpaid school fee."
              </p>
            </div>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-card rounded-3xl p-8 md:p-10 shadow-card border border-border"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Target className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-foreground">Our Vision</h3>
            </div>
            
            <p className="text-muted-foreground leading-relaxed text-lg mb-6">
              A world where no child goes to sleep hungry, no child is forced out of school 
              because of poverty, and no human being is made to feel invisible.
            </p>
            
            <div className="bg-secondary rounded-xl p-5 border-l-4 border-primary">
              <p className="text-foreground font-medium text-lg italic">
                "Abundance is not luxury. It is enough—enough food, clothing, and support so a 
                child born at the bottom can step onto the first rungs of the ladder."
              </p>
            </div>
          </motion.div>
        </div>

        {/* 2035 Goals */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 bg-[#1F1F1F] rounded-3xl p-8 md:p-12 text-center"
        >
          <h3 className="text-white text-2xl md:text-3xl font-serif font-bold mb-4">
            Our Bold Vision for 2035
          </h3>
          <p className="text-white/70 max-w-2xl mx-auto mb-10">
            Growing from the seeds we've planted today to creating massive, measurable impact across India.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-serif font-bold text-primary mb-2">500K</p>
              <p className="text-white/70 text-sm">Meals Per Day</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-serif font-bold text-primary mb-2">750</p>
              <p className="text-white/70 text-sm">Slums & Villages</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-serif font-bold text-primary mb-2">1M</p>
              <p className="text-white/70 text-sm">Lives Impacted</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-serif font-bold text-primary mb-2">95%+</p>
              <p className="text-white/70 text-sm">Direct to People</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MissionSection;
