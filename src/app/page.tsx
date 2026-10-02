import About from "@/components/page/Home/About";
import Approach from "@/components/page/Home/Approach";
import Conversation from "@/components/page/Home/Conversation";
import DeeperPattern from "@/components/page/Home/DeeperPattern";
import Faq from "@/components/page/Home/FAQ";
import FinalCta from "@/components/page/Home/FinalCta";
import Hero from "@/components/page/Home/Hero";
import Problem from "@/components/page/Home/Problem";
import Services from "@/components/page/Home/Services";
import Testimonials from "@/components/page/Home/Testimonials";
import Transformation from "@/components/page/Home/Transformation";

export default function Home() {
  return (
    <main>
      <Hero />
      <Problem />
      <DeeperPattern />
      <Approach />
      <Transformation />
      <Services />
      <Conversation />
      <About />
      <Testimonials />
      <Faq />
      <FinalCta />
    </main>
  );
}
