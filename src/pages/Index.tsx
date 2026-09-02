import { Link } from "react-router-dom";
import { ArrowUpRight, HeartHandshake, MapPin, Utensils, Shirt, GraduationCap } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BankDetailsSection from "@/components/BankDetailsSection";
import { Button } from "@/components/ui/button";
import community from "@/assets/community-help.jpeg";
import food from "@/assets/food-distribution.jpeg";
import clothing from "@/assets/clothing-distribution.jpeg";
import education from "@/assets/children-stationery.jpeg";
import alwyn from "@/assets/founder-window-original.jpeg";
import clement from "@/assets/founder-microphone-original.jpeg";

const programs = [
  { title: "A meal. A little relief.", category: "Food", icon: Utensils, image: food, alt: "A food distribution supported by Abundance Kitchen", text: "Home-style meals and grocery support for children and families, coordinated with volunteers in their own communities." },
  { title: "The dignity of enough.", category: "Clothing", icon: Shirt, image: clothing, alt: "Clothing distribution in an Abundance Kitchen community", text: "New and gently used clothing, school uniforms, and everyday essentials that help children feel ready for the day." },
  { title: "Room for a brighter future.", category: "Education", icon: GraduationCap, image: education, alt: "Children with school supplies from Abundance Kitchen", text: "School supplies, mentoring, and practical pathways for young people who need a little more support to keep learning." },
];

export default function Index() {
  return <>
    <Header />
    <main id="main-content">
      <section className="home-hero site-container">
        <div className="hero-copy">
          <p className="eyebrow"><MapPin size={14} aria-hidden="true" /> Rooted in Tamil Nadu, India</p>
          <h1>Enough to eat.<br />A chance to <em>thrive.</em></h1>
          <p className="hero-description">Food, clothing, and education. Simple things that make a world of difference to a child—and the family beside them.</p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg"><a href="#donate">Support the work <HeartHandshake aria-hidden="true" /></a></Button>
            <Button asChild variant="outline" size="lg"><a href="#what-we-do">See what we do <ArrowUpRight aria-hidden="true" /></a></Button>
          </div>
        </div>
        <figure className="hero-photo">
          <img src={community} alt="Community support work by Abundance Kitchen" fetchPriority="high" width="900" height="1100" />
          <figcaption><p>Showing up, together.</p></figcaption>
        </figure>
      </section>
      <section id="what-we-do" className="site-section site-container">
        <div className="section-heading"><div><h2>Everyday needs.<br />Extraordinary possibility.</h2></div><p>We work alongside families, meeting immediate needs while helping children build a more secure future.</p></div>
        <div className="program-grid">{programs.map(({icon: Icon, ...program}) => <article className="program-card" key={program.category}>
          <img src={program.image} alt={program.alt} loading="lazy" width="600" height="450" />
          <div className="program-content"><p className="eyebrow"><Icon size={16} aria-hidden="true" /> {program.category}</p><h3>{program.title}</h3><p>{program.text}</p></div>
        </article>)}</div>
      </section>
      <section id="mission" className="mission-band"><div className="site-container mission-layout">
        <div><h2>Abundance isn’t luxury.<br />It is <em>enough.</em></h2></div>
        <div><p>Enough food. Enough clothing. Enough support for a young person to take their next step with confidence.</p><p>Abundance Kitchen grew from the founders’ relief work during the COVID-19 lockdown. Today, the mission continues through local volunteers and a shared belief: nobody should be made to feel invisible.</p><a className="text-link" href="#about">Meet the people behind the work <ArrowUpRight size={17} aria-hidden="true" /></a></div>
      </div></section>
      <section id="impact" className="site-section site-container">
        <div className="section-heading"><div><p className="eyebrow">Our impact</p><h2>People behind the numbers.</h2></div><p>These milestones come from the founders’ account of the work. They are not live counters or independently audited totals.</p></div>
        <div className="milestones">
          <div><strong>45</strong><h3>Communities reached</h3><p>Slums and villages across Tamil Nadu, according to the founders’ account.</p></div>
          <div><strong>3,000+</strong><h3>Monthly grocery kits</h3><p>Coordinated during the COVID-19 relief effort—not a statement of current monthly volume.</p></div>
          <div><strong>3</strong><h3>Connected areas of care</h3><p>Food, clothing, and education, with volunteers at the heart of the work.</p></div>
        </div>
        <div className="transparency-note" id="transparency"><HeartHandshake aria-hidden="true" /><div><h3>Trust starts with clear answers.</h3><p>Want to understand a donation, the organization’s registration, or how support is used? Contact the team before giving. Public financial reports and registration documents are not yet available on this site.</p><a className="text-link" href="mailto:alwynjosephp@gmail.com?subject=Abundance%20Kitchen%20transparency%20enquiry">Ask the team <ArrowUpRight size={16} aria-hidden="true" /></a></div></div>
      </section>
      <section id="about" className="team-section site-section"><div className="site-container">
        <div className="section-heading"><div><h2>A shared commitment.<br />A personal responsibility.</h2></div><p>Abundance Kitchen was founded by Alwyn Joseph and Clement Barnabas, building on years of community service together.</p></div>
        <div className="team-grid">
          <article><img className="founder-alwyn" src={alwyn} alt="Alwyn Joseph" loading="lazy" decoding="async" width="1600" height="1200" /><div><p className="eyebrow">Founder & director</p><h3>Alwyn Joseph</h3><p>Alwyn helped organize grocery relief for daily-wage families during the pandemic. That experience became the foundation for Abundance Kitchen’s ongoing work.</p></div></article>
          <article><img className="founder-clement" src={clement} alt="Clement Barnabas" loading="lazy" decoding="async" width="1080" height="1088" /><div><p className="eyebrow">Co-founder & ground partner</p><h3>Clement Barnabas</h3><p>Clement works alongside local communities, helping connect food, clothing, and practical support with the people who need them.</p></div></article>
        </div>
      </div></section>
      <section className="site-container stories-callout"><div><h2>The work continues.<br />Follow the stories.</h2><p>Visit our journal for published updates from the team.</p></div><Button asChild variant="outline" size="lg"><Link to="/blog">Explore the journal <ArrowUpRight aria-hidden="true" /></Link></Button></section>
      <BankDetailsSection />
    </main><Footer />
  </>;
}
