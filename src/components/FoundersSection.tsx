import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Users } from "lucide-react";
import alwynImage from "@/assets/alwyn.jpeg";
import clementImage from "@/assets/clement.jpeg";

const FoundersSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 bg-secondary">
      <div ref={ref} className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Users className="w-4 h-4" />
            Who We Are
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            The People Behind the Mission
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Two lives dedicated to quiet service, two decades of walking alongside the forgotten.
          </p>
        </motion.div>

        {/* Founder Cards */}
        <div className="space-y-16">
          {/* Alwyn Joseph */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="bg-card rounded-3xl overflow-hidden shadow-card border border-border"
          >
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="bg-secondary flex items-center justify-center p-6">
                <img 
                  src={alwynImage} 
                  alt="Alwyn Joseph - Founder & Director" 
                  className="w-full h-full min-h-[400px] object-cover object-top rounded-2xl"
                />
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium inline-block mb-4 w-fit">
                  Founder & Director
                </div>
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-6">
                  Alwyn Joseph
                </h3>
                
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Alwyn's journey into social impact began when he founded <strong className="text-foreground">Hope India Foundation</strong> to 
                    combat corruption using the Right to Information Act, driven by a belief that transparency and accountability are the 
                    first steps toward justice.
                  </p>
                  <p>
                    During the <strong className="text-foreground">COVID-19 lockdown</strong>, he led efforts to provide monthly groceries to daily wage workers, 
                    witnessing firsthand the brutal reality of slum children battling hunger and families living one missed 
                    paycheck away from crisis. That season of quiet suffering became the seed for Abundance Kitchen.
                  </p>
                  <p>
                    Today, Abundance Kitchen is active through a <strong className="text-foreground">volunteer-led network across 45 slums and villages</strong> in Tamil Nadu.
                    With <strong className="text-foreground">95%+ of every rupee reaching beneficiaries</strong> directly—and often covering overheads himself—Alwyn's 
                    unwavering focus continues to transform lives, one meal and one child at a time.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Clement Barnabas */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-card rounded-3xl overflow-hidden shadow-card border border-border"
          >
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="p-8 lg:p-12 flex flex-col justify-center order-2 lg:order-1">
                <div className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium inline-block mb-4 w-fit">
                  Co-Founder & Ground Partner
                </div>
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-6">
                  Clement Barnabas
                </h3>
                
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    If Abundance Kitchen has a heartbeat on the ground, it is found in the quiet, steady life of 
                    <strong className="text-foreground"> Clement Barnabas</strong>. For years, he has been a constant presence among the communities we 
                    serve—offering routine assistance with food, clothing, and daily support to families on the margins.
                  </p>
                  <p>
                    His commitment was tested during the <strong className="text-foreground">devastating floods and cyclone of 2015</strong>. While many fled, 
                    Clement became a beacon of hope: providing food, clothing, accommodation, and basic necessities to 
                    families who had lost everything—giving them safety and security in the middle of chaos.
                  </p>
                  <p>
                    Instead of distancing himself, <strong className="text-foreground">Clement chose to live among them</strong>—sharing 
                    their streets, struggles, and stories. His life of quiet sacrifice ensures that every meal, 
                    every piece of clothing, and every child we support is seen not as a "case" but as a neighbor.
                  </p>
                </div>
              </div>
              <div className="bg-secondary order-1 lg:order-2 flex items-center justify-center p-6">
                <img 
                  src={clementImage} 
                  alt="Clement Barnabas - Ground Operations" 
                  className="w-full h-full min-h-[400px] object-cover object-top rounded-2xl"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FoundersSection;
