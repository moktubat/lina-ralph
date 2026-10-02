import Approach from "@/components/page/Home/Approach";
import DeeperPattern from "@/components/page/Home/DeeperPattern";
import Hero from "@/components/page/Home/Hero";
import Problem from "@/components/page/Home/Problem";

export default function Home() {
  return (
    <main>
      <Hero />
      <Problem />
      <DeeperPattern />
      <Approach />
    </main>
  );
}
