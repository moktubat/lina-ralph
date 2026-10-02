import Approach from "@/components/page/Home/Approach";
import DeeperPattern from "@/components/page/Home/DeeperPattern";
import Hero from "@/components/page/Home/Hero";
import Problem from "@/components/page/Home/Problem";
import Transformation from "@/components/page/Home/Transformation";

export default function Home() {
  return (
    <main>
      <Hero />
      <Problem />
      <DeeperPattern />
      <Approach />
      <Transformation />
    </main>
  );
}
