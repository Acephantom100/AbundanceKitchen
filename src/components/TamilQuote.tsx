import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const TamilQuote = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="py-16 bg-[#1F1F1F]">
      <div ref={ref} className="max-w-4xl mx-auto px-6 text-center">
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          {/* Tamil Quote */}
          <p className="text-2xl md:text-3xl lg:text-4xl font-serif text-white leading-relaxed">
            "வறியார்க்கொன்று ஈவதே ஈகை; மற்றெல்லாம்
            குறியெதிர்ப்பை நீர துடைத்து."
          </p>
          
          {/* English Translation */}
          <p className="text-lg md:text-xl text-primary font-medium">
            "To give even a single thing to the poor — that alone is charity;
            all other giving is but measured with an eye on return."
          </p>
          
          <footer className="pt-4">
            <p className="text-white/80 text-base font-medium">
              — Thiruvalluvar, Thirukkural (Kural 221)
            </p>
          </footer>
        </motion.blockquote>
      </div>
    </section>
  );
};

export default TamilQuote;
